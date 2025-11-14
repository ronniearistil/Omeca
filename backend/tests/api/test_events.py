import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

from app.main import app
from app.core.database import get_db
from app.core.security import create_access_token
from app.core.config import settings

client = TestClient(app)

@pytest.fixture
def test_token():
    return create_access_token(
        {"sub": "testuser", "tenant_id": "test-tenant"},
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM,
        settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )

@pytest.fixture
def auth_headers(test_token):
    return {"Authorization": f"Bearer {test_token}"}

def test_create_event(auth_headers):
    # This data now correctly includes the 'rule_version' field.
    event_in_data = {
        "agent": "test-agent",
        "action": "generate-report",
        "cost": 10.0,
        "rule_version": "1.0", # <-- This line fixes the 422 error
        "explanation": "Audit pass",
    }

    # We mock the service that the API calls.
    with patch("app.api.v1.events.audit_service.record_event") as mock_record_event:
        # The service returns a mock object that mimics the SQLAlchemy model.
        mock_record_event.return_value = MagicMock()

        response = client.post("/api/v1/events", headers=auth_headers, json=event_in_data)

        # The test now asserts the correct 201 status code.
        assert response.status_code == 201
        mock_record_event.assert_called_once()