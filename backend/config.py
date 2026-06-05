# config.py — Environment & Settings
# All env vars loaded once here. Import settings, never os.getenv() directly elsewhere.

from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "_template"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    STRIPE_SECRET_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
