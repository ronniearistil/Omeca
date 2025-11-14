# from fastapi import FastAPI
# from app.api.v1.api import api_router
# from fastapi.middleware.cors import CORSMiddleware
# 
# app = FastAPI(title="Melucra API", version="0.1.0")
# 
# # This is the correct and final CORS configuration.
# # It explicitly allows your frontend at localhost:5173 to make requests.
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# 
# # This includes all your API routes (events, reports, metrics) under the /api/v1 prefix.
# app.include_router(api_router, prefix="/api/v1")
# 
# @app.get("/health")
# def health_check():
#     return {"status": "ok", "service": "melucra-backend"}

# from fastapi import FastAPI
# from app.api.v1.api import api_router
# from fastapi.middleware.cors import CORSMiddleware
# # --- Add these imports for the token generation ---
# from app.core.security import create_access_token
# from app.core.config import settings
# # --- End added imports ---
# 
# app = FastAPI(title="Melucra API", version="0.1.0")
# 
# # CORS Configuration (already correct)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# 
# # Include API routes (already correct)
# app.include_router(api_router, prefix="/api/v1")
# 
# @app.get("/health")
# def health_check():
#     return {"status": "ok", "service": "melucra-backend"}
# 
# # --- Add this NEW block to generate a development token ---
# @app.get("/generate-token-for-dev", tags=["Development"])
# def generate_dev_token():
#     """Temporary endpoint for developers to get a valid JWT token."""
#     token_data = {"sub": "rony", "tenant_id": "test-tenant"}
#     token = create_access_token(
#         data=token_data,
#         secret_key=settings.JWT_SECRET_KEY,
#         algorithm=settings.JWT_ALGORITHM,
#         expires_minutes=60*24 # Set token to expire in 1 day for convenience
#     )
#     return {"access_token": token, "token_type": "bearer"}

from fastapi import FastAPI
from app.api.v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware
# --- Add these imports for the token generation ---
from app.core.security import create_access_token
from app.core.config import settings
# --- End added imports ---

app = FastAPI(title="Melucra API", version="0.1.0")

# --- UPDATED: CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --- END CORS UPDATE ---

# Include API routes (already correct)
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "melucra-backend"}

# --- Development Token Endpoint ---
@app.get("/generate-token-for-dev", tags=["Development"])
def generate_dev_token():
    """Temporary endpoint for developers to get a valid JWT token."""
    token_data = {"sub": "rony", "tenant_id": "test-tenant"}
    token = create_access_token(
        data=token_data,
        secret_key=settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
        expires_minutes=60 * 24  # 1 day for convenience
    )
    return {"access_token": token, "token_type": "bearer"}
