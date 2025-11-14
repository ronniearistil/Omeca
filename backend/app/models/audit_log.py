# app/models/audit_log.py
# SQLAlchemy model for audit actions performed by users.

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Index, Enum as SQLEnum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base
from .machine_event import MachineEvent # For relationship

# Types of actions an auditor can take.
class AuditActionEnum(str, enum.Enum):
    CERTIFY = "Certify"
    ESCALATE = "Escalate"
    COMMENT = "Comment"
    REJECT = "Reject"

class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("machine_events.id"), nullable=False, index=True)
    tenant_id = Column(String(64), nullable=False, index=True) # Denormalized for query convenience
    user_id = Column(String(255), nullable=False, index=True) # ID of the auditor

    action_type = Column(SQLEnum(AuditActionEnum, name="audit_action_enum"), nullable=False)
    narrative = Column(Text, nullable=False) # Auditor's justification/comment.
    reason_code = Column(String(100))        # Optional classification code.

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship to the MachineEvent being audited.
    machine_event = relationship("MachineEvent", back_populates="audit_logs")

    __table_args__ = (
        Index("ix_audit_log_tenant_user_created", "tenant_id", "user_id", "created_at"),
    )
