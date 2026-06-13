# utils/db.py — Hybrid Storage Engine (Supabase + In-Memory Fallback)
# Provides stateless database storage in production and zero-config fallback for local development.

from typing import Optional
from models.audit import AuditStatusResponse
from utils.api import supabase
from utils.logger import get_logger

logger = get_logger(__name__)

# Fallback in-memory job store for zero-config local runs
_local_jobs: dict[str, dict] = {}


def save_job(audit_id: str, status_resp: AuditStatusResponse) -> None:
    """
    Saves/Upserts an audit job's status. Uses Supabase if configured,
    otherwise falls back to the local in-memory store.
    """
    try:
        # Pydantic v2 uses model_dump, fallback to dict() for v1
        if hasattr(status_resp, "model_dump"):
            data_dict = status_resp.model_dump()
        else:
            data_dict = status_resp.dict()
    except Exception as e:
        logger.error(f"Failed to serialize job {audit_id}: {e}")
        return

    if supabase is not None:
        try:
            payload = {
                "id": data_dict["audit_id"],
                "status": data_dict["status"],
                "progress": data_dict["progress"],
                "result": data_dict["result"],
            }
            # Upsert into audits table
            supabase.table("audits").upsert(payload).execute()
            return
        except Exception as e:
            logger.error(
                f"Supabase upsert failed for job {audit_id}: {e}. "
                "Falling back to local in-memory store."
            )

    # Fallback/default store
    _local_jobs[audit_id] = data_dict


def get_job(audit_id: str) -> Optional[AuditStatusResponse]:
    """
    Retrieves an audit job's status by ID. Queries Supabase if configured,
    otherwise retrieves from the local in-memory store.
    """
    data_dict = None

    if supabase is not None:
        try:
            res = supabase.table("audits").select("*").eq("id", audit_id).execute()
            if res.data and len(res.data) > 0:
                row = res.data[0]
                data_dict = {
                    "audit_id": row["id"],
                    "status": row["status"],
                    "progress": row["progress"],
                    "result": row["result"],
                }
        except Exception as e:
            logger.error(
                f"Supabase select failed for job {audit_id}: {e}. "
                "Falling back to local in-memory store."
            )

    if data_dict is None:
        data_dict = _local_jobs.get(audit_id)

    if data_dict is None:
        return None

    try:
        return AuditStatusResponse(**data_dict)
    except Exception as e:
        logger.error(f"Failed to reconstruct AuditStatusResponse for job {audit_id}: {e}")
        return None
