# from sqlalchemy.orm import Session
# from sqlalchemy import text
# 
# def get_governance_summary(db: Session, tenant_id: str) -> dict:
#     query = text("""
#         SELECT
#             COUNT(*) AS total_events,
#             COALESCE(SUM(cost), 0) AS total_cost,
#             COUNT(CASE WHEN LOWER(explanation) LIKE '%pass%' THEN 1 END) AS pass_count,
#             COUNT(CASE WHEN LOWER(explanation) LIKE '%fail%' THEN 1 END) AS fail_count
#         FROM machine_events
#         WHERE tenant_id = :tenant_id
#     """)
#     result = db.execute(query, {"tenant_id": tenant_id}).fetchone()
# 
#     total_events = result.total_events or 0
#     pass_count = result.pass_count or 0
#     fail_count = result.fail_count or 0
#     total_cost = float(result.total_cost or 0)
# 
#     compliance_percent = (pass_count / total_events) * 100 if total_events > 0 else 0
#     audit_pass_percent = compliance_percent
# 
#     return {
#         "tenant_id": tenant_id,
#         "total_cost": total_cost,
#         "total_events": total_events,
#         "compliance_percent": round(compliance_percent, 2),
#         "audit_pass_percent": round(audit_pass_percent, 2),
#     }

from sqlalchemy.orm import Session
from sqlalchemy import text

def get_governance_summary(db: Session, tenant_id: str) -> dict:
    """
    Fetches governance metrics for a tenant.
    This is now updated to query the new 'audit_status' enum
    instead of doing a slow text search on the narrative field.
    """

    # --- THIS QUERY IS NOW FIXED ---
    query = text("""
        SELECT
            COUNT(*) AS total_events,
            COALESCE(SUM(cost), 0) AS total_cost,
            
            -- Count 'AUDITED' as pass
            COUNT(CASE WHEN audit_status = 'AUDITED' THEN 1 END) AS pass_count,
            
            -- Count 'PENDING' or 'ESCALATED' as fail
            COUNT(CASE WHEN audit_status != 'AUDITED' THEN 1 END) AS fail_count
            
        FROM machine_events
        WHERE tenant_id = :tenant_id
    """)
    result = db.execute(query, {"tenant_id": tenant_id}).fetchone()

    total_events = result.total_events or 0
    pass_count = result.pass_count or 0
    fail_count = result.fail_count or 0
    total_cost = float(result.total_cost or 0)

    compliance_percent = (pass_count / total_events) * 100 if total_events > 0 else 0
    audit_pass_percent = compliance_percent

    return {
        "tenant_id": tenant_id,
        "total_cost": total_cost,
        "total_events": total_events,
        "compliance_percent": round(compliance_percent, 2),
        "audit_pass_percent": round(audit_pass_percent, 2),
    }