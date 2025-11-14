# from fastapi import APIRouter, Depends, Query
# from sqlalchemy.orm import Session
# 
# from app.core.database import get_db
# from app.core.security import get_tenant_id
# from app.services import report_service # Import our new service
# 
# router = APIRouter()
# 
# @router.get("/", summary="Export stored machine audit events")
# def get_audit_report(
#     limit: int = Query(50, description="Max number of records to return"),
#     tenant_id: str = Depends(get_tenant_id),
#     db: Session = Depends(get_db),
# ):
#     # The API layer now just calls the service layer. No more database code here!
#     events = report_service.get_tenant_reports(db=db, tenant_id=tenant_id, limit=limit)
# 
#     return {
#         "tenant_id": tenant_id,
#         "count": len(events),
#         "records": [
#             {
#                 "id": e.id,
#                 "agent": e.agent,
#                 "action": e.action,
#                 "cost": e.cost,
#                 "rule_version": e.rule_version,
#                 "explanation": e.explanation,
#                 "chain_hash": e.chain_hash,
#                 "created_at": e.created_at.isoformat(),
#             }
#             for e in events
#         ],
#     }

from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional 

from app.core.database import get_db
from app.core.security import get_tenant_id 
from app.services import report_service 

router = APIRouter(redirect_slashes=False)

@router.get("/", summary="Export stored machine audit events")
def get_audit_report(
    limit: int = Query(50, description="Max number of records to return"),
    tenant_id: Optional[str] = Depends(get_tenant_id),
    db: Session = Depends(get_db),
):
    if tenant_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        events = report_service.get_tenant_reports(db=db, tenant_id=tenant_id, limit=limit)

        # --- FIX IS HERE ---
        return {
            "tenant_id": tenant_id,
            "count": len(events),
            "records": [
                {
                    "id": e.id,
                    "agent": e.agent,
                    "action": e.action,
                    "cost": e.cost,
                    "rule_version": e.rule_version,
                    
                    # --- FIXED: Use new field names ---
                    "rule_narrative": e.rule_narrative,
                    "audit_status": e.audit_status,
                    
                    "chain_hash": e.chain_hash,
                    "created_at": e.created_at.isoformat() if e.created_at else None,
                }
                for e in events
            ],
        }
        # --- END FIX ---
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")