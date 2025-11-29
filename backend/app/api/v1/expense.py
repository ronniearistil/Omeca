# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# 
# from app.core.database import get_db
# from app.schemas.expense import ExpenseEventCreate, ExpenseEventRead
# from app.models.expense_event import ExpenseEvent, ExpenseStatus
# 
# 
# router = APIRouter(prefix="/expenses", tags=["L1 - Expense Events"])
# 
# 
# @router.post("/", response_model=ExpenseEventRead)
# def ingest_expense_event(payload: ExpenseEventCreate, db: Session = Depends(get_db)):
#     event = ExpenseEvent(
#         source_system=payload.source_system,
#         transaction_id=payload.transaction_id,
#         amount=payload.amount,
#         currency=payload.currency,
#         merchant_name=payload.merchant_name,
#         merchant_category_code=payload.merchant_category_code,
#         raw_payload=payload.raw_payload,
#         status=ExpenseStatus.NEW,
#     )
# 
#     db.add(event)
#     db.commit()
#     db.refresh(event)
# 
#     return event

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.expense_event import ExpenseEvent, ExpenseStatus
# Ensure schemas match what you likely created in Step 1
from app.schemas.expense import ExpenseEventCreate, ExpenseEventRead

# ✅ FIX: Remove 'prefix="/expenses"' here. 
# We let api.py handle the prefix so we don't get double URLs.
router = APIRouter(tags=["L1 - Expense Events"]) 

@router.post("/", response_model=ExpenseEventRead)
def ingest_expense_event(payload: ExpenseEventCreate, db: Session = Depends(get_db)):
    event = ExpenseEvent(
        source_system=payload.source_system,
        transaction_id=payload.transaction_id,
        amount=payload.amount,
        currency=payload.currency,
        merchant_name=payload.merchant_name,
        merchant_category_code=payload.merchant_category_code,
        raw_payload=payload.raw_payload,
        status=ExpenseStatus.NEW,
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event