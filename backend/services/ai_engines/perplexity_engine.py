# services/ai_engines/perplexity_engine.py — Perplexity Visibility Queries
# Perplexity uses an OpenAI-compatible REST API.

import re
import httpx
from config import settings

PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"
HEADERS = {
    "Authorization": f"Bearer {settings.PERPLEXITY_API_KEY}",
    "Content-Type": "application/json",
}


async def query(prompt: str, business_name: str) -> bool:
    """
    Fire a single recommendation prompt at Perplexity.
    Returns True if business_name appears in the response.
    """
    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {
                "role": "system",
                "content": "You are a local business recommendation assistant. List specific business names.",
            },
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 300,
        "temperature": 0.3,
    }
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(PERPLEXITY_API_URL, json=payload, headers=HEADERS)
            resp.raise_for_status()
            data = resp.json()
            answer = data["choices"][0]["message"]["content"] or ""
            return _business_mentioned(business_name, answer)
    except Exception:
        return False


def _business_mentioned(business_name: str, text: str) -> bool:
    pattern = re.compile(re.escape(business_name), re.IGNORECASE)
    return bool(pattern.search(text))
