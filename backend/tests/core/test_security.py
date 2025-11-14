import pytest
from datetime import timedelta
from fastapi import HTTPException
from jose import jwt

from app.core.security import create_access_token, verify_token
from app.core.config import settings

def test_create_access_token():
    """
    Tests that a token is created successfully and contains the correct data.
    """
    data = {"sub": "testuser", "tenant_id": "test-tenant"}
    token = create_access_token(
        data,
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM,
        settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Decode the token without verification to inspect its contents
    payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])

    assert payload["sub"] == data["sub"]
    assert payload["tenant_id"] == data["tenant_id"]
    assert "exp" in payload

def test_verify_valid_token():
    """
    Tests that a valid, unexpired token passes verification.
    """
    data = {"sub": "testuser"}
    token = create_access_token(
        data,
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM,
        expires_minutes=15
    )
    
    payload = verify_token(token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
    assert payload["sub"] == data["sub"]

def test_verify_expired_token():
    """
    Tests that an expired token raises an HTTPException.
    """
    # Create a token that expired 1 minute ago
    data = {"sub": "testuser"}
    expired_token = create_access_token(
        data,
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM,
        expires_minutes=-1
    )

    # The 'with pytest.raises(...)' block expects an exception to be thrown.
    # The test passes if the expected exception is raised.
    with pytest.raises(HTTPException) as excinfo:
        verify_token(expired_token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
    
    # Optionally, assert details about the exception
    assert excinfo.value.status_code == 401
    assert "Invalid or expired token" in excinfo.value.detail

def test_verify_invalid_token_signature():
    """
    Tests that a token with an invalid signature raises an HTTPException.
    """
    data = {"sub": "testuser"}
    # Create a token with the correct secret key
    token = create_access_token(
        data,
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM,
        expires_minutes=15
    )

    # Attempt to verify it with the WRONG secret key
    with pytest.raises(HTTPException):
        verify_token(token, "WRONG_SECRET_KEY", settings.JWT_ALGORITHM)