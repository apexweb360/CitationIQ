# routes/audit.py — Audit Submission & Status
# Thin orchestrator: validates input, calls service, returns result.
# No business logic here.

from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.audit import AuditRequest, AuditResult, AuditStatusResponse
from services import audit_service

router = APIRouter()

# In-memory job store for MVP — replace with Supabase in Phase 2
_jobs: dict[str, AuditStatusResponse] = {}


@router.post("/audit", response_model=AuditStatusResponse, status_code=202)
async def submit_audit(request: AuditRequest, background_tasks: BackgroundTasks):
    """
    Submit an audit job. Returns immediately with audit_id and status=pending.
    Processing runs in the background.
    """
    import uuid
    audit_id = str(uuid.uuid4())

    # Create pending entry
    _jobs[audit_id] = AuditStatusResponse(
        audit_id=audit_id,
        status="pending",
        progress=0,
    )

    background_tasks.add_task(_run_audit_job, audit_id, request)
    return _jobs[audit_id]


@router.get("/audit/{audit_id}", response_model=AuditStatusResponse)
async def get_audit_status(audit_id: str):
    """Poll for audit progress and results."""
    if audit_id not in _jobs:
        raise HTTPException(status_code=404, detail="Audit not found")
    return _jobs[audit_id]


async def _run_audit_job(audit_id: str, request: AuditRequest):
    """Background task: runs the audit and updates job store."""
    _jobs[audit_id].status = "running"
    _jobs[audit_id].progress = 10
    try:
        result = await audit_service.run_audit(request)
        _jobs[audit_id].status = "complete"
        _jobs[audit_id].progress = 100
        _jobs[audit_id].result = result
    except Exception as e:
        _jobs[audit_id].status = "failed"
        _jobs[audit_id].progress = 0
