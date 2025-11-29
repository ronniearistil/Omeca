from datetime import datetime
from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class ReconciliationResult(Base):
    __tablename__ = "reconciliation_results"

    id = Column(Integer, primary_key=True, index=True)

    expense_event_id = Column(Integer, ForeignKey("expense_events.id"), nullable=False)
    expense_event = relationship("ExpenseEvent")

    # Auto Classification
    gl_account = Column(String, nullable=True)
    department = Column(String, nullable=True)
    project = Column(String, nullable=True)

    # Rule Engine Outputs
    confidence = Column(Float, nullable=False)
    exceptions = Column(JSON, nullable=True)  # list of rule failures

    status = Column(String, default="review")  # review, approved, rejected

    created_at = Column(DateTime, default=datetime.utcnow)
