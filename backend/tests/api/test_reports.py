import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from datetime import datetime

from app.main import app
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


def test_get_all_reports(auth_headers):
    # This mock object simulates a database record that our service would return.
    mock_event_record = MagicMock()
    mock_event_record.id = 1
    mock_event_record.agent = "test-agent"
    mock_event_record.action = "test-action"
    mock_event_record.cost = 1.0
    mock_event_record.rule_version = "v1"
    mock_event_record.explanation = "test explanation"
    mock_event_record.chain_hash = "abcde12345"
    mock_event_record.created_at = datetime.utcnow()

    # We patch the service function that our API endpoint calls.
    with patch("app.api.v1.reports.report_service.get_tenant_reports") as mock_get_reports:
        mock_get_reports.return_value = [mock_event_record]

        response = client.get("/api/v1/reports", headers=auth_headers)

        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 1
        assert data["records"][0]["id"] == 1
        
        # Verify the service was called correctly by the API layer.
        mock_get_reports.assert_called_once()