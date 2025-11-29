from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.integrity_service import calculate_integrity_score

router = APIRouter(tags=["L1 - Operational Integrity"])

@router.get("/score")
def get_data_integrity_health(db: Session = Depends(get_db)):
    """
    Returns the L1 Data Health Score.
    Used by the dashboard to show 'System Assurance'.
    """
    health_data = calculate_integrity_score(db)
    
    return {
        "status": "healthy" if health_data["integrity_score"] > 90 else "degraded",
        "metrics": health_data
    }