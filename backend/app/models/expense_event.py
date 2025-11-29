from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, Enum
from app.core.database import Base
import enum


class ExpenseStatus(str, enum.Enum):
    NEW = "new"
    CLASSIFIED = "classified"
    EXCEPTION = "exception"
    POSTED = "posted"


class ExpenseEvent(Base):
    __tablename__ = "expense_events"

    id = Column(Integer, primary_key=True, index=True)
    source_system = Column(String, nullable=False)  # ramp, brex, amex, manual-upload
    transaction_id = Column(String, nullable=False, unique=True)

    amount = Column(Float, nullable=False)
    currency = Column(String, default="USD")

    merchant_name = Column(String, nullable=True)
    merchant_category_code = Column(String, nullable=True)

    timestamp = Column(DateTime, default=datetime.utcnow)

    raw_payload = Column(JSON, nullable=True)

    status = Column(Enum(ExpenseStatus), default=ExpenseStatus.NEW)
