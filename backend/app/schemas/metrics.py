# app/schemas/metrics.py
from pydantic import BaseModel, ConfigDict

class MetricsSummary(BaseModel):
    tenant_id: str
    total_cost: float
    total_events: int
    compliance_percent: float
    audit_pass_percent: float

    # Use model_config instead of class Config
    model_config = ConfigDict(from_attributes=True)