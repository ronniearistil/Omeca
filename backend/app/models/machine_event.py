# # app/models/machine_event.py
# from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Index
# from datetime import datetime
# import hashlib
# from app.core.database import Base
# 
# class MachineEvent(Base):
#     __tablename__ = "machine_events"
# 
#     id = Column(Integer, primary_key=True, index=True)
#     tenant_id = Column(String(64), nullable=False, index=True)
#     agent = Column(String(100), nullable=False)
#     action = Column(String(100), nullable=False)
#     cost = Column(Float, nullable=False)
#     rule_version = Column(String(50), nullable=False)
#     explanation = Column(Text, nullable=False)
#     chain_hash = Column(String(256), nullable=False)
#     created_at = Column(DateTime, default=datetime.utcnow)
# 
#     __table_args__ = (
#         Index("ix_machine_events_tenant_created", "tenant_id", "created_at"),
#     )
# 
#     @staticmethod
#     def compute_hash(prev_hash: str, tenant_id: str, event_data: dict) -> str:
#         """
#         Tenant-scoped SHA-256 hash chain.
#         Including tenant_id ensures cross-tenant tamper is impossible.
#         """
#         payload = (
#             f"{tenant_id}|{prev_hash}|"
#             f"{event_data['agent']}|{event_data['action']}|{event_data['cost']}|"
#             f"{event_data['rule_version']}|{event_data['explanation']}"
#         )
#         return hashlib.sha256(payload.encode()).hexdigest()

# app/models/machine_event.py
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Index, Enum
from sqlalchemy.orm import relationship  # ✅ ADD THIS LINE
from datetime import datetime
import hashlib
import enum
from app.core.database import Base

# --- NEW: Define the enumeration for audit status ---
class AuditStatusEnum(str, enum.Enum):
    PENDING = "Pending"
    AUDITED = "Audited"
    ESCALATED = "Escalated"
# --- END NEW ---

class MachineEvent(Base):
    __tablename__ = "machine_events"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(String(64), nullable=False, index=True)
    agent = Column(String(100), nullable=False)
    action = Column(String(100), nullable=False)
    cost = Column(Float, nullable=False)
    rule_version = Column(String(50), nullable=False)
    
    # --- RENAMED: from 'explanation' for clarity ---
    rule_narrative = Column(Text, nullable=False)
    
    chain_hash = Column(String(256), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # --- NEW: Field to track interactive workflow state ---
    audit_status = Column(
        Enum(AuditStatusEnum), 
        nullable=False, 
        default=AuditStatusEnum.PENDING, 
        index=True
    )

    __table_args__ = (
        Index("ix_machine_events_tenant_created", "tenant_id", "created_at"),
    )

    # ✅ ADD THIS RELATIONSHIP FIX
    audit_logs = relationship(
        "AuditLog",
        back_populates="machine_event",
        cascade="all, delete-orphan"
    )

    @staticmethod
    def compute_hash(prev_hash: str, tenant_id: str, event_data: dict) -> str:
        """
        Tenant-scoped SHA-256 hash chain.
        Including tenant_id ensures cross-tenant tamper is impossible.
        """
        payload = (
            f"{tenant_id}|{prev_hash}|"
            f"{event_data['agent']}|{event_data['action']}|{event_data['cost']}|"
            f"{event_data['rule_version']}|{event_data['rule_narrative']}"
        )
        return hashlib.sha256(payload.encode()).hexdigest()
