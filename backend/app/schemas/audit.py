# app/schemas/audit.py
from pydantic import BaseModel
from typing import Optional

class AuditCertificationRequest(BaseModel):
    narrative: str
    reason_code: Optional[str] = None  # optional classification code


class AuditCertificationResponse(BaseModel):
    event_id: int
    audit_status: str
    message: str = "Certification recorded"
