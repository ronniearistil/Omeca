
from __future__ import annotations
from datetime import datetime
from typing import Dict, Any, List, Tuple
import random

# --- EXISTING L3 CONFIGURATION ---
DEFAULT_RULE_VERSION = "v1.2.0"
COST_LIMIT = 15.0  # simple exemplar policy for MVP

# --- NEW L2 CONFIGURATION ---
GL_ACCOUNTS = ["6001-Software", "6002-Hosting", "5001-Travel", "5002-Meals"]
DEPARTMENTS = ["Eng", "Sales", "Marketing", "G&A"]


# ==========================================
#  L3 LOGIC: MACHINE EVENTS (Existing)
# ==========================================
def evaluate_event(event: Dict[str, Any], rule_version: str | None = None) -> Dict[str, Any]:
    """
    Returns a standardized, versioned explainability payload for a machine event.
    """
    rv = rule_version or event.get("rule_version") or DEFAULT_RULE_VERSION

    # --- Example Policy: Cost limit check ---
    cost = float(event.get("cost", 0.0))
    passed = cost <= COST_LIMIT
    reason = "Cost within allowable range." if passed else f"Cost exceeded threshold of {COST_LIMIT}"

    explanation = {
        "rule_version": rv,
        "rule_id": "COST_LIMIT_POLICY",
        "input": {
            "agent": event.get("agent"),
            "action": event.get("action"),
            "cost": cost,
        },
        "evaluation": {
            "passed": passed,
            "threshold": COST_LIMIT,
            "reason": reason,
        },
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }
    return explanation


# ==========================================
#  L2 LOGIC: FINANCIAL CLOSE (New)
# ==========================================
def classify_expense(event) -> Tuple[str, str, str, float]:
    """
    Determines GL Account, Department, Project, and Confidence.
    Used by the manual API trigger.
    """
    # Simple Deterministic Logic (Mock)
    gl = random.choice(GL_ACCOUNTS)
    dept = random.choice(DEPARTMENTS)
    project = "Omeca_MVP"
    
    # Base confidence
    confidence = 0.95
    
    return gl, dept, project, confidence

def detect_exceptions(event) -> List[str]:
    """
    Returns a list of rule violations (strings) or empty list if valid.
    """
    exceptions = []
    
    # Rule 1: High Amount Check
    if event.amount > 5000:
        exceptions.append(f"Amount ${event.amount} exceeds auto-approval limit.")
        
    # Rule 2: Missing Merchant Check
    if not event.merchant_name:
        exceptions.append("Missing merchant name.")
        
    # Rule 3: Round Number Suspicion
    # Check if amount is round number > 100
    if float(event.amount).is_integer() and event.amount > 100:
        exceptions.append("Round dollar amount detected (review required).")
            
    return exceptions