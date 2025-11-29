from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.audit_log import AuditLog
from app.models.expense_event import ExpenseEvent, ExpenseStatus

router = APIRouter(tags=["L3 - Governance"])

@router.get("/proofs")
def get_governance_metrics(db: Session = Depends(get_db)):
    """
    Returns the Verification State of the system.
    Shows how many L2 decisions have been cryptographically proved.
    """
    # 1. Total Reconciled Events (The Denominator)
    reconciled_volume = db.query(func.count(ExpenseEvent.id)).filter(
        ExpenseEvent.status != ExpenseStatus.NEW
    ).scalar()

    # 2. Total Proofs Generated (The Numerator)
    proof_count = db.query(func.count(AuditLog.id)).filter(
        AuditLog.actor == "Omeca_Auto_Engine"
    ).scalar()

    # 3. Verification Rate
    if reconciled_volume > 0:
        verification_rate = round((proof_count / reconciled_volume) * 100, 1)
        verification_rate = min(verification_rate, 100.0)
    else:
        verification_rate = 100.0

    # 4. Latest Proofs (Feed)
    # ✅ FIX: Changed 'timestamp' to 'created_at' to match the Model
    recent_proofs = db.query(AuditLog).filter(
        AuditLog.actor == "Omeca_Auto_Engine"
    ).order_by(AuditLog.created_at.desc()).limit(5).all()

    return {
        "verification_rate": verification_rate,
        "total_proofs": proof_count,
        "ledger_status": "immutable",
        "latest_blocks": [
            {
                "id": log.id,
                "action": log.action,
                # Handle cases where details might be missing
                "hash_preview": log.details.get("proof_hash", "N/A")[:16] + "..." if log.details else "N/A",
                # ✅ FIX: Changed 'timestamp' to 'created_at'
                "timestamp": log.created_at 
            } for log in recent_proofs
        ]
    }