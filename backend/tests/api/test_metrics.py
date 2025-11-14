import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from app.main import app
from app.core.security import create_access_token
from app.core.config import settings

client = TestClient(app)

@pytest.fixture
def test_token():
    # Fixture to create a valid token
    return create_access_token(
        {"sub": "rony", "tenant_id": "test-tenant"},
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM,
        settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )

@pytest.fixture
def auth_headers(test_token):
    # Fixture for the authorization header
    return {"Authorization": f"Bearer {test_token}"}

def test_get_governance_metrics(auth_headers):
    # Define the mock data our CRUD function should return
    mock_summary_data = {
        "tenant_id": "test-tenant",
        "total_cost": 20.0,
        "total_events": 2,
        "compliance_percent": 50.0,
        "audit_pass_percent": 50.0,
    }

    # Use 'patch' to mock the CRUD function.
    # When the API calls 'crud_metrics.get_governance_summary',
    # it will return our mock_summary_data instead of running the real query.
    with patch("app.api.v1.metrics.crud_metrics.get_governance_summary") as mock_get_summary:
        mock_get_summary.return_value = mock_summary_data

        # Call the API
        res = client.get("/api/v1/metrics/summary", headers=auth_headers)
        
        # --- Assertions ---
        assert res.status_code == 200
        
        # Check that the API returned the exact mock data
        data = res.json()
        assert data["tenant_id"] == "test-tenant"
        assert data["total_events"] == 2
        assert data["total_cost"] == 20.0
        assert data["compliance_percent"] == 50.0
        assert data["audit_pass_percent"] == 50.0

        # Verify the CRUD function was called correctly by the endpoint
        mock_get_summary.assert_called_once()

# Test Commend "pytest tests -v"