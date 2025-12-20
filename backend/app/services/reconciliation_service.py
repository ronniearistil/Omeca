import random
import hashlib
import json
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.expense_event import ExpenseEvent, ExpenseStatus
from app.models.reconciliation_result import ReconciliationResult
from app.models.audit_log import AuditLog 

# L2 CONFIGURATION
GL_ACCOUNTS = ["6001-Software", "6002-Hosting", "5001-Travel", "5002-Meals"]
DEPARTMENTS = ["Eng", "Sales", "Marketing", "G&A"]

def generate_governance_proof(event_id, status, gl_account, reason):
    """
    Creates a SHA-256 hash of the decision.
    """
    proof_string = f"{event_id}|{status}|{gl_account}|{reason}|{datetime.now(timezone.utc)}"
    return hashlib.sha256(proof_string.encode()).hexdigest()

def run_auto_reconciliation(db: Session):
    """
    V2 Engine: Now generates Governance Proofs (L3)
    """
    # 1. Fetch un-processed events
    expenses = db.query(ExpenseEvent).filter(ExpenseEvent.status == ExpenseStatus.NEW).limit(50).all()
    
    processed_count = 0
    
    for expense in expenses:
        # --- THE RULES ENGINE ---
        exceptions_list = []
        confidence = 1.0
        recon_status = "approved"
        
        if expense.amount > 4000:
            exceptions_list.append("Amount exceeds auto-approval threshold ($4k)")
            confidence -= 0.5
            recon_status = "review"

        if float(expense.amount).is_integer() and expense.amount > 100:
            exceptions_list.append("Round number detected")
            confidence -= 0.3
            recon_status = "review"

        if not expense.merchant_name:
            exceptions_list.append("Missing merchant name")
            confidence = 0.0
            recon_status = "rejected"

        # --- L2 RESULT ---
        gl_choice = random.choice(GL_ACCOUNTS) if recon_status == "approved" else None
        dept_choice = random.choice(DEPARTMENTS) if recon_status == "approved" else None
        
        recon_result = ReconciliationResult(
            expense_event_id=expense.id,
            gl_account=gl_choice,
            department=dept_choice,
            project="Omeca_MVP",
            confidence=max(confidence, 0.0),
            exceptions=exceptions_list,
            status=recon_status,
            created_at=datetime.now(timezone.utc)
        )
        db.add(recon_result)

        # --- L3 GOVERNANCE PROOF ---
        proof_hash = generate_governance_proof(
            expense.id, recon_status, gl_choice, str(exceptions_list)
        )
        
        audit_entry = AuditLog(
            entity_type="ExpenseEvent",
            entity_id=str(expense.id),
            action=f"L2_Reconciliation_{recon_status.upper()}",
            actor="Omeca_Auto_Engine",
            
            # ✅ THE FIX IS HERE: We use 'created_at', NOT 'timestamp'
            created_at=datetime.now(timezone.utc),
            
            details={
                "gl": gl_choice, 
                "confidence": confidence,
                "proof_hash": proof_hash 
            }
        )
        db.add(audit_entry)

        # --- UPDATE L1 STATUS ---
        if recon_status == "approved":
            expense.status = ExpenseStatus.CLASSIFIED
        else:
            expense.status = ExpenseStatus.EXCEPTION
            
        processed_count += 1
    
    db.commit()
    return processed_count