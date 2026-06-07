# services/audit_service.py — CitationIQ Visibility Engine
# Orchestrates prompt generation, AI engine queries, scoring, and report assembly.
# All business logic lives here. Routes are thin orchestrators only.

import asyncio
import uuid
from typing import List

from models.audit import AuditRequest, AuditResult, AuditTier, EngineResult
from services.prompts import generate_prompts
from services.scoring import score_engine, score_overall, generate_recommended_actions
from services.ai_engines import openai_engine, gemini_engine, perplexity_engine, anthropic_engine
from config import settings

# Engines included per tier
ENGINES_BY_TIER = {
    AuditTier.FREE:    ["chatgpt", "perplexity"],
    AuditTier.PRO:     ["chatgpt", "gemini", "perplexity", "claude"],
    AuditTier.MONITOR: ["chatgpt", "gemini", "perplexity", "claude"],
}

ENGINE_MODULES = {
    "chatgpt":    openai_engine,
    "gemini":     gemini_engine,
    "perplexity": perplexity_engine,
    "claude":     anthropic_engine,
}

# Prompts per tier
PROMPTS_BY_TIER = {
    AuditTier.FREE:    10,
    AuditTier.PRO:     settings.PROMPTS_PER_AUDIT,
    AuditTier.MONITOR: settings.PROMPTS_PER_AUDIT,
}


async def run_audit(request: AuditRequest) -> AuditResult:
    """
    Main entry point. Fires prompts at all relevant AI engines concurrently,
    scores results, and returns a structured AuditResult.
    """
    audit_id = str(uuid.uuid4())
    engines = ENGINES_BY_TIER[request.tier]
    prompt_limit = PROMPTS_BY_TIER[request.tier]
    prompts = generate_prompts(request.services, request.service_area, limit=prompt_limit)

    # Run all engines concurrently
    engine_tasks = {
        engine: _query_engine(engine, prompts, request.business_name)
        for engine in engines
    }
    engine_raw = await asyncio.gather(*engine_tasks.values())
    engine_results_map = dict(zip(engine_tasks.keys(), engine_raw))

    # Build per-engine results
    engine_results: List[EngineResult] = []
    engine_scores: dict = {}

    for engine_name, (mentions, sample_citations, top_competitors) in engine_results_map.items():
        score = score_engine(mentions, len(prompts))
        engine_scores[engine_name] = score
        engine_results.append(EngineResult(
            engine=engine_name,
            score=score,
            mentions=mentions,
            prompts_fired=len(prompts),
            sample_citations=sample_citations[:3],
            top_competitors=top_competitors[:5],
        ))

    overall = score_overall(engine_scores)

    # Determine missing authority signals (placeholder — wire to real checks later)
    missing_signals = _detect_missing_signals(overall, request)
    actions = generate_recommended_actions(overall, missing_signals)

    # Competitor scores (stub for free tier; real competitor audit in Pro)
    competitor_scores = {}
    if request.tier != AuditTier.FREE and request.competitors:
        competitor_scores = {name: 0 for name in request.competitors}  # TODO: run sub-audits

    return AuditResult(
        audit_id=audit_id,
        business_name=request.business_name,
        overall_score=overall,
        engine_results=engine_results,
        top_citation_sources=[],        # TODO: parse domains from AI responses
        missing_authority_signals=missing_signals,
        recommended_actions=actions,
        competitor_scores=competitor_scores,
        tier=request.tier,
    )


async def _query_engine(
    engine_name: str,
    prompts: List[str],
    business_name: str,
) -> tuple[int, List[str], List[str]]:
    """
    Runs all prompts against a single engine with concurrency control.
    Returns (mention_count, sample_citation_prompts, top_competitor_names).
    """
    module = ENGINE_MODULES[engine_name]
    sem = asyncio.Semaphore(settings.MAX_CONCURRENT_QUERIES)

    async def bounded_query(prompt: str) -> bool:
        async with sem:
            return await module.query(prompt, business_name)

    results = await asyncio.gather(*[bounded_query(p) for p in prompts])

    mentions = sum(results)
    sample_citations = [p for p, hit in zip(prompts, results) if hit][:3]

    return mentions, sample_citations, []  # competitor extraction TODO


def _detect_missing_signals(overall_score: int, request: AuditRequest) -> List[str]:
    """
    Placeholder: returns likely missing signals based on score.
    Future: wire to website crawler / schema checker / GBP API.
    """
    signals = []
    if overall_score < 60:
        signals.append("faq_schema")
        signals.append("local_citations")
        signals.append("ai_answer_content")
    if overall_score < 40:
        signals.append("review_volume")
    return signals
