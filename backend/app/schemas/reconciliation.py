from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class ReconciliationResultCreate(BaseModel):
    expense_event_id: int


class ReconciliationResultRead(BaseModel):
    id: int
    expense_event_id: int
    gl_account: Optional[str]
    department: Optional[str]
    project: Optional[str]
    confidence: float
    exceptions: Optional[Any]
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
