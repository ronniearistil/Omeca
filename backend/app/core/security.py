from datetime import datetime, timedelta, UTC
from jose import jwt, JWTError
# ADD Request to imports from fastapi
from fastapi import HTTPException, status, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings
from typing import Optional

# -------------------------------------------------------------------
# JWT Creation and Verification Utilities (Unchanged)
# -------------------------------------------------------------------

def create_access_token(data: dict, secret_key: str, algorithm: str, expires_minutes: int):
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret_key, algorithm=algorithm)

def verify_token(token: str, secret_key: str, algorithm: str):
    try:
        return jwt.decode(token, secret_key, algorithms=[algorithm])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

# -------------------------------------------------------------------
# Tenant Extraction Dependency (Updated for OPTIONS requests)
# -------------------------------------------------------------------

# Revert to default auto_error=True for stricter checking on non-OPTIONS requests
security = HTTPBearer(auto_error=True)

# Add 'request: Request' parameter to access the request method
async def get_tenant_id(request: Request, credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[str]:
    """
    Extracts tenant_id from a valid Bearer JWT token.
    Explicitly allows OPTIONS requests to pass through without authentication.
    """
    # --- THIS IS THE NEW FIX ---
    # If it's a CORS preflight request, allow it through immediately.
    if request.method == "OPTIONS":
        return None
    # --- END NEW FIX ---

    # For all other methods (GET, POST, etc.), enforce authentication
    if credentials is None:
        # This should now only happen if auto_error=False, but we keep it for safety
        # With auto_error=True, FastAPI handles the 403 if no header is present
         raise HTTPException(
             status_code=status.HTTP_403_FORBIDDEN,
             detail="Not authenticated"
         )

    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        tenant_id = payload.get("tenant_id")
        if not tenant_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="tenant_id missing in token")
        return tenant_id
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")