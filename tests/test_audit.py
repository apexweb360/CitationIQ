# tests/test_audit.py — CitationIQ Backend Unit Tests
# Run: pytest tests/ -v

import sys
import os
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from models.audit import AuditRequest, AuditTier
from services.prompts import generate_prompts
from services.scoring import score_engine, score_overall, generate_recommended_actions


# ──────────────────────────────────────────────
# AuditRequest model
# ──────────────────────────────────────────────

def test_audit_request_defaults():
    req = AuditRequest(
        business_name="Acme HVAC",
        website="https://acmehvac.com",
        service_area="Houston, TX",
        services=["HVAC", "AC repair"],
    )
    assert req.tier == AuditTier.FREE
    assert req.competitors == []


def test_audit_request_pro_tier():
    req = AuditRequest(
        business_name="Acme HVAC",
        website="https://acmehvac.com",
        service_area="Houston, TX",
        services=["HVAC"],
        tier=AuditTier.PRO,
        competitors=["Cool Air Houston", "Texas HVAC Pros"],
    )
    assert req.tier == AuditTier.PRO
    assert len(req.competitors) == 2


# ──────────────────────────────────────────────
# Prompt generation
# ──────────────────────────────────────────────

def test_generate_prompts_returns_correct_count():
    prompts = generate_prompts(["HVAC", "AC repair"], "Houston, TX", limit=10)
    assert len(prompts) == 10


def test_generate_prompts_contain_service_and_location():
    prompts = generate_prompts(["dentist"], "Katy, TX", limit=5)
    for p in prompts:
        assert "dentist" in p.lower() or "Katy" in p


def test_generate_prompts_respects_limit():
    prompts = generate_prompts(["roofing"], "Cypress, TX", limit=3)
    assert len(prompts) <= 3


# ──────────────────────────────────────────────
# Scoring
# ──────────────────────────────────────────────

def test_score_engine_zero_mentions():
    assert score_engine(0, 20) == 0


def test_score_engine_full_mentions():
    score = score_engine(20, 20)
    assert score == 100


def test_score_engine_partial():
    score = score_engine(5, 20)
    assert 0 < score < 100


def test_score_engine_zero_prompts():
    # Edge case: no prompts fired should return 0, not divide by zero
    assert score_engine(0, 0) == 0


def test_score_overall_weighted():
    scores = {"chatgpt": 80, "gemini": 60, "perplexity": 70, "claude": 50}
    overall = score_overall(scores)
    assert 0 <= overall <= 100


def test_score_overall_empty():
    assert score_overall({}) == 0


def test_recommended_actions_low_score():
    actions = generate_recommended_actions(30, ["faq_schema", "local_citations"])
    assert len(actions) > 0
    assert any("GEO" in a or "Google" in a or "citation" in a.lower() for a in actions)


def test_recommended_actions_high_score():
    actions = generate_recommended_actions(90, [])
    assert len(actions) > 0
