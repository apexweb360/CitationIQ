# services/ai_engines/anthropic_engine.py — Claude Visibility Queries

import re
import anthropic
from config import settings

_client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)


async def query(prompt: str, business_name: str) -> bool:
    """
    Fire a single recommendation prompt at Claude.
    Returns True if business_name appears in the response.
    """
    try:
        message = await _client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            system="You are a local business recommendation assistant. List specific business names when asked for recommendations.",
            messages=[{"role": "user", "content": prompt}],
        )
        answer = message.content[0].text if message.content else ""
        return _business_mentioned(business_name, answer)
    except Exception:
        return False


def _business_mentioned(business_name: str, text: str) -> bool:
    pattern = re.compile(re.escape(business_name), re.IGNORECASE)
    return bool(pattern.search(text))
