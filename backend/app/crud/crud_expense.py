from sqlalchemy.orm import Session
from app.models.expense_event import ExpenseEvent
from app.schemas.expense import ExpenseEventCreate

class CRUDExpenseEvent:
    def create(self, db: Session, event: ExpenseEventCreate) -> ExpenseEvent:
        obj = ExpenseEvent(**event.dict())
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

expense_crud = CRUDExpenseEvent()

