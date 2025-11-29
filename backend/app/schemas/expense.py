from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime
from enum import Enum


class ExpenseStatus(str, Enum):
    new = "new"
    classified = "classified"
    exception = "exception"
    posted = "posted"


class ExpenseEventCreate(BaseModel):
    source_system: str
    transaction_id: str
    amount: float
    currency: str = "USD"
    merchant_name: Optional[str] = None
    merchant_category_code: Optional[str] = None
    raw_payload: Optional[Any] = None


class ExpenseEventRead(BaseModel):
    id: int
    source_system: str
    transaction_id: str
    amount: float
    currency: str
    merchant_name: Optional[str]
    merchant_category_code: Optional[str]
    timestamp: datetime
    status: ExpenseStatus

    class Config:
        orm_mode = True
