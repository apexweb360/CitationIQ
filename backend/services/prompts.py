# services/prompts.py — Prompt Templates for AI Visibility Engine
# Generates recommendation prompts that mirror real user queries to AI engines.

from typing import List


# Prompt templates — {service} and {location} are substituted at runtime
RECOMMENDATION_TEMPLATES = [
    "Best {service} in {location}",
    "Top {service} near {location}",
    "Who are the best {service} companies in {location}?",
    "Recommend a {service} in {location}",
    "Which {service} should I hire in {location}?",
    "{service} near me {location}",
    "Most trusted {service} in {location}",
    "Highly rated {service} {location}",
    "{location} {service} recommendations",
    "Who do people use for {service} in {location}?",
    "Local {service} experts in {location}",
    "Affordable {service} in {location}",
    "Emergency {service} {location}",
    "Licensed {service} in {location}",
    "{service} with best reviews in {location}",
    "Who is the best {service} contractor in {location}?",
    "Find a reliable {service} in {location}",
    "{service} companies people trust in {location}",
    "Top-rated local {service} {location}",
    "Best reviewed {service} near {location}",
]


def generate_prompts(
    services: List[str],
    service_area: str,
    limit: int = 20,
) -> List[str]:
    """
    Generate a deduplicated list of recommendation prompts for an audit.
    Rotates through services and templates up to `limit` prompts.
    """
    prompts: List[str] = []

    for template in RECOMMENDATION_TEMPLATES:
        for service in services:
            prompt = template.format(service=service, location=service_area)
            prompts.append(prompt)
            if len(prompts) >= limit:
                return prompts

    return prompts[:limit]
