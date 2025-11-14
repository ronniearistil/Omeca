# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# 
# from app.core.database import get_db
# from app.core.security import get_tenant_id
# from app.crud import crud_metrics
# from app.schemas import metrics
# 
# router = APIRouter()
# 
# @router.get(
#     "/summary",
#     summary="Governance metrics for current tenant",
#     response_model=metrics.MetricsSummary
# )
# def get_governance_metrics(
#     tenant_id: str = Depends(get_tenant_id),
#     db: Session = Depends(get_db),
# ):
#     try:
#         summary_data = crud_metrics.get_governance_summary(db=db, tenant_id=tenant_id)
#         return summary_data
#         
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Metrics query failed: {str(e)}")


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_tenant_id
# use the existing CRUD module for metrics
from app.crud import crud_metrics
from app.schemas import metrics

router = APIRouter()

@router.get(
    "/summary",
    summary="Governance metrics for current tenant",
    response_model=metrics.MetricsSummary
)
def get_governance_metrics(
    tenant_id: str = Depends(get_tenant_id),
    db: Session = Depends(get_db),
):
    try:
        # call CRUD function to fetch governance summary
        summary_data = crud_metrics.get_governance_summary(db=db, tenant_id=tenant_id)
        return summary_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metrics query failed: {str(e)}")

