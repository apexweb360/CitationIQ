# utils/api.py — External API Client Wrappers
# All clients initialized once here. Import where needed, never re-initialize.

import os
from utils.logger import get_logger

logger = get_logger(__name__)

# Supabase
try:
    from supabase import create_client
    from config import settings
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        logger.info("Supabase client initialized.")
    else:
        supabase = None
        logger.warning("Supabase env vars missing. Client not initialized.")
except Exception as e:
    supabase = None
    logger.error(f"Supabase init failed: {e}")

# Add Stripe, Firecrawl clients below using the same guard pattern
