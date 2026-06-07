# services/scoring.py — AI Visibility Score Algorithm
# Converts raw citation counts into a 0–100 score per engine and overall.

from typing import List


# Engine weights for overall score (must sum to 1.0)
ENGINE_WEIGHTS = {
    "chatgpt":   0.30,
    "gemini":    0.25,
    "perplexity": 0.25,
    "claude":    0.10,
    "grok":      0.10,
}


def score_engine(mentions: int, prompts_fired: int) -> int:
    """
    Score a single engine: (mentions / prompts_fired) * 100, capped at 100.
    Applies a slight curve so 1 mention out of 20 prompts = ~10 (not 5).
    """
    if prompts_fired == 0:
        return 0
    raw = mentions / prompts_fired
    # Curve: sqrt gives partial credit for low-but-nonzero visibility
    import math
    curved = math.sqrt(raw)
    return min(100, round(curved * 100))


def score_overall(engine_scores: dict) -> int:
    """
    Weighted average across engines.
    engine_scores: {"chatgpt": 72, "gemini": 61, ...}
    """
    total = 0.0
    weight_sum = 0.0
    for engine, score in engine_scores.items():
        weight = ENGINE_WEIGHTS.get(engine, 0.0)
        total += score * weight
        weight_sum += weight
    if weight_sum == 0:
        return 0
    return round(total / weight_sum)


def generate_recommended_actions(
    overall_score: int,
    missing_signals: List[str],
) -> List[str]:
    """
    Returns a priority-ordered list of recommended actions based on score
    and what authority signals are absent.
    """
    actions = []

    if overall_score < 40:
        actions.append("Create service-area GEO pages for each key service and city.")
        actions.append("Claim and fully optimize your Google Business Profile.")

    if "faq_schema" in missing_signals:
        actions.append("Add FAQ schema markup to service pages.")

    if "local_citations" in missing_signals:
        actions.append("Earn citations from local authority sites (chamber of commerce, local news, industry associations).")

    if "ai_answer_content" in missing_signals:
        actions.append("Publish AI-answer-style content: direct answers to common customer questions.")

    if overall_score < 70:
        actions.append("Build backlinks from local business directories (BBB, Yelp, Angi).")

    if "review_volume" in missing_signals:
        actions.append("Increase Google review count — AI engines surface businesses with strong review signals.")

    if not actions:
        actions.append("Maintain current citation presence with quarterly content updates.")

    return actions
