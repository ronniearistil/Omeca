# app/services/audit_service.py
from sqlalchemy.orm import Session
from app.models.machine_event import MachineEvent
from app.services.rule_engine import evaluate_event   # ✅ new import

def get_last_hash(db: Session, tenant_id: str) -> str:
    """Fetch the last chain hash for a given tenant."""
    last_event = (
        db.query(MachineEvent)
        .filter(MachineEvent.tenant_id == tenant_id)
        .order_by(MachineEvent.id.desc())
        .first()
    )
    return last_event.chain_hash if last_event else "0" * 64  # Genesis hash per tenant

def record_event(db: Session, tenant_id: str, event_data: dict):
    """
    Record a machine event with explainability + tamper-evident chain.
    """
    # --- 1️⃣ Evaluate event to produce structured explanation ---
    explanation_obj = evaluate_event(event_data, event_data.get("rule_version"))
    
    # --- 2️⃣ Compute hash chain ---
    prev_hash = get_last_hash(db, tenant_id)
    chain_hash = MachineEvent.compute_hash(prev_hash, tenant_id, event_data)
    
    # --- 3️⃣ Persist event ---
    event = MachineEvent(
        tenant_id=tenant_id,
        agent=event_data["agent"],
        action=event_data["action"],
        cost=event_data["cost"],
        rule_version=event_data["rule_version"],
        explanation=str(explanation_obj),  # stored as serialized JSON string
        chain_hash=chain_hash,
    )
    
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

