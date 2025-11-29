from sqlalchemy.orm import Session
from app.schemas.expense import ExpenseEventCreate
from app.crud.crud_expense import expense_crud

def ingest_expense_event(db: Session, event: ExpenseEventCreate):
    return expense_crud.create(db, event)
