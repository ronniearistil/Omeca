# app/api/v1/audit.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.machine_event import MachineEvent, AuditStatusEnum
from app.models.audit_log import AuditLog, AuditActionEnum
from app.schemas.audit import AuditCertificationRequest, AuditCertificationResponse

router = APIRouter(prefix="/audit", tags=["Audit"])

@router.post("/{event_id}/certify", response_model=AuditCertificationResponse)
def certify_event(event_id: int, payload: AuditCertificationRequest, db: Session = Depends(get_db)):
    """Certify an event, record audit log, and update audit status."""
    event = db.query(MachineEvent).filter(MachineEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    # Record audit action
    log_entry = AuditLog(
        event_id=event.id,
        tenant_id=event.tenant_id,
        user_id="system",  # TODO: replace with real user once auth added
        action_type=AuditActionEnum.CERTIFY,
        narrative=payload.narrative,
        reason_code=payload.reason_code
    )
    db.add(log_entry)

    # Update event status
    event.audit_status = AuditStatusEnum.AUDITED
    db.add(event)
    db.commit()
    db.refresh(event)

    return AuditCertificationResponse(
        event_id=event.id,
        audit_status=event.audit_status.value,
        message="Certification recorded"
    )
