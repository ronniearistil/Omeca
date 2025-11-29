from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func # ✅ Added for counting stats

from app.core.database import get_db
from app.models.expense_event import ExpenseEvent, ExpenseStatus
from app.models.reconciliation_result import ReconciliationResult

# Keep your existing service/schema imports
from app.services.rule_engine import classify_expense, detect_exceptions
from app.schemas.reconciliation import (
    ReconciliationResultCreate,
    ReconciliationResultRead
)

# ✅ FIX: Removed 'prefix' here. We control it in api.py
router = APIRouter(tags=["L2 - Reconciliation"])

# --- NEW: THE SCOREBOARD (Dashboard Metric) ---
@router.get("/status")
def get_reconciliation_status(db: Session = Depends(get_db)):
    """
    Returns the live metrics for the frontend dashboard.
    Calculates the % of expenses that have been successfully reconciled.
    """
    # 1. Total Volume
    total_events = db.query(func.count(ExpenseEvent.id)).scalar()
    
    # 2. Reconciled Count (We count 'CLASSIFIED' as success for now)
    reconciled_count = db.query(func.count(ExpenseEvent.id)).filter(
        ExpenseEvent.status == ExpenseStatus.CLASSIFIED
    ).scalar()

    # 3. Exceptions
    exception_count = db.query(func.count(ExpenseEvent.id)).filter(
        ExpenseEvent.status == ExpenseStatus.EXCEPTION
    ).scalar()

    # 4. Calculate Rate
    if total_events > 0:
        recon_rate = round((reconciled_count / total_events) * 100, 1)
    else:
        recon_rate = 100.0

    # 5. Get recent feed
    recent_results = db.query(ReconciliationResult).order_by(
        ReconciliationResult.created_at.desc()
    ).limit(5).all()

    return {
        "metrics": {
            "reconciliation_rate": recon_rate,
            "total_volume": total_events,
            "auto_reconciled": reconciled_count,
            "exceptions": exception_count
        },
        "latest_reconciliations": [
            {
                "id": r.id,
                "status": r.status,
                "confidence": r.confidence,
                "gl_account": r.gl_account
            } for r in recent_results
        ]
    }

# --- EXISTING: THE WORKER (Manual Trigger) ---
@router.post("/", response_model=ReconciliationResultRead)
def run_reconciliation(payload: ReconciliationResultCreate, db: Session = Depends(get_db)):
    event = db.query(ExpenseEvent).filter_by(id=payload.expense_event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="ExpenseEvent not found")

    gl, dept, project, confidence = classify_expense(event)
    exceptions = detect_exceptions(event)

    result = ReconciliationResult(
        expense_event_id=event.id,
        gl_account=gl,
        department=dept,
        project=project,
        confidence=confidence,
        exceptions=exceptions,
        status="review" if exceptions else "approved",
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    return result
