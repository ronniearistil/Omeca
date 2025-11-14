from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import json

from app.core.database import get_db
from app.core.security import get_tenant_id
# --- Assuming your service is in app.services.audit_service ---
# If this import fails, let me know the correct path
from app.services import audit_service 
from app.models.machine_event import MachineEvent

router = APIRouter(redirect_slashes=False)

# --- Pydantic Schema for creating an event (FIXED) ---
class MachineEventIn(BaseModel):
    agent: str
    action: str
    cost: float
    rule_version: str
    # --- FIXED: Use new field name ---
    rule_narrative: str

# --- API Endpoint to CREATE an event ---
@router.post("/", status_code=status.HTTP_201_CREATED, summary="Ingest a machine event")
def ingest_event(
    event: MachineEventIn,
    tenant_id: str = Depends(get_tenant_id),
    db: Session = Depends(get_db),
):
    try:
        # Pass the dump (which now has 'rule_narrative') to the service
        stored_event = audit_service.record_event(db, tenant_id, event.model_dump())
        return stored_event
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Event ingestion failed: {str(e)}")

# --- API Endpoint to GET a specific event (FIXED) ---
@router.get("/{event_id}", summary="Get detailed event with full explanation")
def get_event_detail(
    event_id: int,
    tenant_id: str = Depends(get_tenant_id),
    db: Session = Depends(get_db),
):
    event = (
        db.query(MachineEvent)
        .filter(MachineEvent.id == event_id, MachineEvent.tenant_id == tenant_id)
        .first()
    )
    if not event:
        raise HTTPException(status_code=404, detail="Event not found for this tenant.")

    # --- FIXED: Read from rule_narrative ---
    try:
        explanation_data = json.loads(event.rule_narrative)
    except (json.JSONDecodeError, TypeError):
        explanation_data = {"raw": event.rule_narrative}

    return {
        "id": event.id,
        "tenant_id": event.tenant_id,
        "agent": event.agent,
        "action": event.action,
        "cost": event.cost,
        "rule_version": event.rule_version,
        "chain_hash": event.chain_hash,
        "created_at": event.created_at.isoformat(),
        # --- FIXED: Return both new fields ---
        "rule_narrative": explanation_data, # Send parsed data
        "audit_status": event.audit_status
    }