# # app/models/audit_log.py
# # SQLAlchemy model for audit actions performed by users.
# 
# from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Index, Enum as SQLEnum
# from sqlalchemy.sql import func
# from sqlalchemy.orm import relationship
# import enum
# 
# from app.core.database import Base
# from .machine_event import MachineEvent # For relationship
# 
# # Types of actions an auditor can take.
# class AuditActionEnum(str, enum.Enum):
#     CERTIFY = "Certify"
#     ESCALATE = "Escalate"
#     COMMENT = "Comment"
#     REJECT = "Reject"
# 
# class AuditLog(Base):
#     __tablename__ = "audit_log"
# 
#     id = Column(Integer, primary_key=True, index=True)
#     event_id = Column(Integer, ForeignKey("machine_events.id"), nullable=False, index=True)
#     tenant_id = Column(String(64), nullable=False, index=True) # Denormalized for query convenience
#     user_id = Column(String(255), nullable=False, index=True) # ID of the auditor
# 
#     action_type = Column(SQLEnum(AuditActionEnum, name="audit_action_enum"), nullable=False)
#     narrative = Column(Text, nullable=False) # Auditor's justification/comment.
#     reason_code = Column(String(100))        # Optional classification code.
# 
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
# 
#     # Relationship to the MachineEvent being audited.
#     machine_event = relationship("MachineEvent", back_populates="audit_logs")
# 
#     __table_args__ = (
#         Index("ix_audit_log_tenant_user_created", "tenant_id", "user_id", "created_at"),
#     )

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Index, JSON, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

# --- 1. PRESERVE THE ENUM ---
class AuditActionEnum(str, enum.Enum):
    CERTIFY = "Certify"
    ESCALATE = "Escalate"
    COMMENT = "Comment"
    REJECT = "Reject"

class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(Integer, primary_key=True, index=True)

    # --- 2. NEW UNIVERSAL FIELDS (For L2/L3 Proofs) ---
    entity_type = Column(String(50), nullable=True)  # e.g., "ExpenseEvent"
    entity_id = Column(String(255), nullable=True)   # e.g., "1024"
    action = Column(String(100), nullable=True)      # e.g., "L2_Reconcile_Approve"
    actor = Column(String(255), nullable=True)       # e.g., "Omeca_Auto_Engine"
    details = Column(JSON, nullable=True)            # Stores the SHA-256 Proof

    # --- 3. LEGACY FIELDS (Made Nullable) ---
    # We allow these to be Null so the L2 Engine can write logs without them
    event_id = Column(Integer, ForeignKey("machine_events.id"), nullable=True, index=True)
    tenant_id = Column(String(64), nullable=True, index=True)
    user_id = Column(String(255), nullable=True, index=True) 

    # We allow nulls here to support the new string-based actions
    action_type = Column(SQLEnum(AuditActionEnum, name="audit_action_enum"), nullable=True)
    
    narrative = Column(Text, nullable=True)
    reason_code = Column(String(100), nullable=True)

    # We revert this back to 'created_at' to match your original schema and Index
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # --- 4. RELATIONSHIP ---
    # We use the string "MachineEvent" instead of importing the class
    # This prevents the "ImportError / Circular Import" crash
    machine_event = relationship("MachineEvent", back_populates="audit_logs")

    __table_args__ = (
        Index("ix_audit_log_tenant_user_created", "tenant_id", "user_id", "created_at"),
    )
