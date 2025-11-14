from sqlalchemy.orm import Session
from typing import List

from app.models.machine_event import MachineEvent

def get_tenant_reports(db: Session, tenant_id: str, limit: int) -> List[MachineEvent]:
    """
    Contains the database logic to fetch all machine events for a specific tenant.
    This is the "service" that our API layer will call.
    """
    return (
        db.query(MachineEvent)
        .filter(MachineEvent.tenant_id == tenant_id)
        .order_by(MachineEvent.created_at.desc())
        .limit(limit)
        .all()
    )