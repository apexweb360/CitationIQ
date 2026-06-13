# services/ai_engines/openai_engine.py — ChatGPT Visibility Queries

import re
from openai import AsyncOpenAI
from config import settings
from utils.logger import get_logger

logger = get_logger(__name__)

_client = None

def get_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    return _client

SYSTEM_PROMPT = (
    "You are a helpful local business recommendation assistant. "
    "When asked for recommendations, list specific business names with brief context. "
    "Be direct and specific."
)


async def query(prompt: str, business_name: str) -> bool:
    """
    Fire a single recommendation prompt at ChatGPT.
    Returns True if business_name appears in the response.
    """
    try:
        client = get_client()
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            max_tokens=300,
            temperature=0.3,
        )
        answer = response.choices[0].message.content or ""
        return _business_mentioned(business_name, answer)
    except Exception as e:
        logger.exception(f"OpenAI query failed for business '{business_name}': {e}")
        return False


def _business_mentioned(business_name: str, text: str) -> bool:
    """Case-insensitive check for business name in response text."""
    pattern = re.compile(re.escape(business_name), re.IGNORECASE)
    return bool(pattern.search(text))

