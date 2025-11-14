# app/services/rule_engine.py
from __future__ import annotations
from datetime import datetime
from typing import Dict, Any

DEFAULT_RULE_VERSION = "v1.2.0"
COST_LIMIT = 15.0  # simple exemplar policy for MVP

def evaluate_event(event: Dict[str, Any], rule_version: str | None = None) -> Dict[str, Any]:
    """
    Returns a standardized, versioned explainability payload for a machine event.

    Schema:
    {
      "rule_version": "v1.2.0",
      "rule_id": "COST_LIMIT_POLICY",
      "input": { "agent": str, "action": str, "cost": float },
      "evaluation": {
        "passed": bool,
        "threshold": float,
        "reason": str
      },
      "timestamp": "ISO-8601 UTC"
    }
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
