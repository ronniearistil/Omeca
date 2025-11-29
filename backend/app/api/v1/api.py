# 
# from fastapi import APIRouter
# 
# # Change from importing modules to importing the 'router' object from each file directly.
# from app.api.v1.events import router as events_router
# from app.api.v1.reports import router as reports_router
# from app.api.v1.metrics import router as metrics_router
# 
# from app.api.v1.audit import router as audit_router  # ✅ NEW
# api_router = APIRouter()
# 
# # Now, we use the directly imported router objects.
# api_router.include_router(events_router, prefix="/events", tags=["Events"])
# api_router.include_router(reports_router, prefix="/reports", tags=["Reports"])
# api_router.include_router(metrics_router, prefix="/metrics", tags=["Metrics"])
# 
# api_router.include_router(audit_router, prefix="/audit", tags=["Audit"])  # ✅ NEW


from fastapi import APIRouter
from app.api.v1.events import router as events_router
from app.api.v1.reports import router as reports_router
from app.api.v1.metrics import router as metrics_router
from app.api.v1.audit import router as audit_router
from app.api.v1.expense import router as expense_router
from app.api.v1.reconciliation import router as recon_router
from app.api.v1.integrity import router as integrity_router
from app.api.v1.governance import router as governance_router

api_router = APIRouter()

api_router.include_router(events_router, prefix="/events", tags=["Events"])
api_router.include_router(reports_router, prefix="/reports", tags=["Reports"])
api_router.include_router(metrics_router, prefix="/metrics", tags=["Metrics"])
api_router.include_router(audit_router, prefix="/audit", tags=["Audit"])
api_router.include_router(expense_router, prefix="/expenses", tags=["Expenses"])
api_router.include_router(recon_router, prefix="/reconciliation", tags=["Reconciliation"])
api_router.include_router(integrity_router, prefix="/integrity", tags=["Integrity"])
api_router.include_router(governance_router, prefix="/governance", tags=["Governance"])