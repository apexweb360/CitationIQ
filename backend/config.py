# config.py — Environment & Settings
# All env vars loaded once here. Import settings, never os.getenv() directly elsewhere.

from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "CitationIQ"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    # Stripe
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # AI Engine API Keys
    OPENAI_API_KEY: str = ""        # ChatGPT visibility queries
    ANTHROPIC_API_KEY: str = ""     # Claude visibility queries
    GEMINI_API_KEY: str = ""        # Google Gemini visibility queries
    PERPLEXITY_API_KEY: str = ""    # Perplexity visibility queries

    # Audit Engine Settings
    PROMPTS_PER_AUDIT: int = 20     # number of recommendation prompts fired per audit
    MAX_CONCURRENT_QUERIES: int = 5 # parallel AI engine calls

    class Config:
        env_file = ".env"

settings = Settings()
