# routes/audit.py — Audit Submission & Status
# Thin orchestrator: validates input, calls service, returns result.
# No business logic here.

from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.audit import AuditRequest, AuditResult, AuditStatusResponse
from services import audit_service
from utils import db
from utils.logger import get_logger

logger = get_logger(__name__)
router = APIRouter()


@router.post("/audit", response_model=AuditStatusResponse, status_code=202)
async def submit_audit(request: AuditRequest, background_tasks: BackgroundTasks):
    """
    Submit an audit job. Returns immediately with audit_id and status=pending.
    Processing runs in the background.
    """
    import uuid
    audit_id = str(uuid.uuid4())

    # Create pending entry
    job = AuditStatusResponse(
        audit_id=audit_id,
        status="pending",
        progress=0,
    )
    db.save_job(audit_id, job)

    background_tasks.add_task(_run_audit_job, audit_id, request)
    return job


@router.get("/audit/{audit_id}", response_model=AuditStatusResponse)
async def get_audit_status(audit_id: str):
    """Poll for audit progress and results."""
    job = db.get_job(audit_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Audit not found")
    return job


async def _run_audit_job(audit_id: str, request: AuditRequest):
    """Background task: runs the audit and updates job store."""
    job = db.get_job(audit_id)
    if not job:
        logger.error(f"Cannot run audit job {audit_id}: Job not found in storage.")
        return

    job.status = "running"
    job.progress = 10
    db.save_job(audit_id, job)

    try:
        result = await audit_service.run_audit(request)
        job.status = "complete"
        job.progress = 100
        job.result = result
        db.save_job(audit_id, job)
    except Exception as e:
        logger.exception(f"Background audit job failed for audit_id {audit_id}: {e}")
        job.status = "failed"
        job.progress = 0
        db.save_job(audit_id, job)

