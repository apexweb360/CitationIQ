# main.py — Thin Orchestrator
# Wires routes and starts the server. No business logic here.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import audit
from config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI Visibility Intelligence for Local Businesses",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audit.router, prefix="/api/v1")
