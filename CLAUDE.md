# CitationIQ — Local Engineering Context
# This project adheres to the ApexWeb360 Global Engineering Standards
# defined in ~/CODING/CLAUDE.md. Rules defined here act as local overrides or additions.

## Project Overview
- **Name:** CitationIQ
- **Purpose:** B2B SaaS platform for automated AI visibility auditing and competitor benchmarking. Measures how often a business is cited by AI engines (ChatGPT, Gemini, Perplexity, Claude, Grok) and scores visibility against competitors.
- **Stack:** FastAPI + React + Supabase + Stripe
- **Business Model:** Freemium audit → paid reports → monthly monitoring subscription

## Architecture
- **Visibility Engine:** Python pipeline that fires structured recommendation prompts at multiple AI APIs and parses citation data
- **Scoring:** AI Visibility Score (0–100) broken down per engine
- **Reports:** Credit-score-style output with competitor benchmarking and recommended actions
- **Frontend:** React SPA — audit intake form, score dashboard, report view
- **Backend:** FastAPI — thin orchestrator, thick services pattern
- **Database & Storage:** Hybrid persistence layer (`backend/utils/db.py`). Uses Supabase table `audits` if API keys are configured, otherwise falls back to a thread-safe local in-memory store.

## Local Overrides
None — all global standards from `~/CODING/CLAUDE.md` apply as-is.

## Project-Specific Notes
- Routes live in `backend/routes/`, services in `backend/services/`, no exceptions.
- Frontend fetch calls go in `frontend/src/services/` only.
- Geolocation API calls must use `frontend/src/services/geoService.js` only.
- Framer Motion required for all animated UI elements.
- All AI API calls live in `backend/services/ai_engines/` — one module per engine.
- AI clients in `backend/services/ai_engines/` must be lazy-initialized at query time.
- Standardized logging (`from utils.logger import get_logger`) must be used inside AI engine exception handlers to log tracebacks instead of failing silently.
- Audit status updates and reads must query the hybrid storage manager (`backend/utils/db.py`).
- Prompt templates live in `backend/services/prompts.py`.
- Scoring logic lives in `backend/services/scoring.py`.

