# services/ai_engines/gemini_engine.py — Google Gemini Visibility Queries

import re
import google.generativeai as genai
from config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)
_model = genai.GenerativeModel("gemini-1.5-flash")


async def query(prompt: str, business_name: str) -> bool:
    """
    Fire a single recommendation prompt at Gemini.
    Returns True if business_name appears in the response.
    """
    try:
        response = await _model.generate_content_async(
            f"You are a local business recommendation assistant. {prompt}",
            generation_config={"max_output_tokens": 300, "temperature": 0.3},
        )
        answer = response.text or ""
        return _business_mentioned(business_name, answer)
    except Exception:
        return False


def _business_mentioned(business_name: str, text: str) -> bool:
    pattern = re.compile(re.escape(business_name), re.IGNORECASE)
    return bool(pattern.search(text))
