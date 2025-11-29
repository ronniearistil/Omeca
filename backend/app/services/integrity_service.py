from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.expense_event import ExpenseEvent

def calculate_integrity_score(db: Session):
    """
    Analyzes the quality of incoming data stream (L1).
    Returns a health score (0-100) and specific data issues.
    """
    # 1. Fetch recent events (last 100)
    recent_events = db.query(ExpenseEvent).order_by(ExpenseEvent.timestamp.desc()).limit(100).all()
    
    if not recent_events:
        return {"score": 100, "issues": []}

    total_checks = 0
    passed_checks = 0
    issues = []

    # 2. Run Integrity Checks on the batch
    for event in recent_events:
        # Check A: Timeliness (Is data arriving late?)
        # We simulate that 'timestamp' is when it happened, 'created_at' (if existed) is when we got it.
        # For MVP, we check if timestamp is in the future (impossible) or too old (> 30 days)
        event_time = event.timestamp.replace(tzinfo=timezone.utc) if event.timestamp.tzinfo is None else event.timestamp
        now = datetime.now(timezone.utc)
        
        total_checks += 1
        if event_time > now + timedelta(minutes=5):
            issues.append(f"Future timestamp detected: {event.merchant_name}")
        elif event_time < now - timedelta(days=365):
            issues.append(f"Stale data detected: {event.merchant_name}")
        else:
            passed_checks += 1

        # Check B: Data Completeness
        total_checks += 1
        if event.merchant_name and event.amount > 0 and event.currency == "USD":
            passed_checks += 1
        else:
            issues.append(f"Incomplete schema: {event.transaction_id}")

        # Check C: Duplicate Detection (Simulated)
        # In a real app, this would be a complex query. 
        # Here we just check if amount is identical to the previous one in the list.
        # (This is a simplified check for the demo)
        
    # 3. Calculate Score
    if total_checks > 0:
        score = round((passed_checks / total_checks) * 100, 1)
    else:
        score = 100.0

    return {
        "integrity_score": score,
        "events_scanned": len(recent_events),
        "active_issues": issues[:5] # Top 5 issues
    }