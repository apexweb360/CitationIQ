# main.py — Thin Orchestrator
# Wires routes and starts the server. No business logic here.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import example
from config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(example.router, prefix="/api/v1")
