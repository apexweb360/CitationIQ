# models/audit.py — Pydantic Schemas for CitationIQ Audit Engine

from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from enum import Enum


class AuditTier(str, Enum):
    FREE = "free"        # baseline audit — limited prompts, no competitor data
    PRO = "pro"          # full audit — all engines, competitor benchmarking
    MONITOR = "monitor"  # recurring monthly subscription


class AuditRequest(BaseModel):
    business_name: str
    website: str
    service_area: str           # e.g. "Houston, TX"
    services: List[str]         # e.g. ["HVAC", "AC repair", "heating"]
    competitors: Optional[List[str]] = []   # optional competitor business names
    tier: AuditTier = AuditTier.FREE


class EngineResult(BaseModel):
    engine: str                 # "chatgpt" | "gemini" | "perplexity" | "claude" | "grok"
    score: int                  # 0–100
    mentions: int               # raw count of times business appeared
    prompts_fired: int          # total prompts sent to this engine
    sample_citations: List[str] # up to 3 example prompts where business appeared
    top_competitors: List[str]  # businesses that appeared instead


class AuditResult(BaseModel):
    audit_id: str
    business_name: str
    overall_score: int          # weighted average across all engines
    engine_results: List[EngineResult]
    top_citation_sources: List[str]    # domains AI seems to trust for this category
    missing_authority_signals: List[str]  # what's absent (schema, directories, GBP, etc.)
    recommended_actions: List[str]     # priority-ordered action list
    competitor_scores: dict            # {competitor_name: score}
    tier: AuditTier


class AuditStatusResponse(BaseModel):
    audit_id: str
    status: str                 # "pending" | "running" | "complete" | "failed"
    progress: int               # 0–100
    result: Optional[AuditResult] = None
