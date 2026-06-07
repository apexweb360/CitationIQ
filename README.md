# CitationIQ

AI Visibility Intelligence for Local Businesses.

Measures how often a business is cited by AI engines (ChatGPT, Gemini, Perplexity, Claude, Grok) and benchmarks visibility against competitors.

## Stack
- Python 3.12 (FastAPI)
- React / Framer Motion
- Supabase + Stripe
- Deployed on Vercel

## Setup
1. Copy `.env.example` to `.env` and fill in all values.
2. Run the setup script: `./setup.sh`
   - Creates `.venv`, installs Python deps, installs Node deps, initializes git.

## Commands
```bash
make dev-back    # start FastAPI server (port 8000)
make dev-front   # start React dev server (port 3000)
make test        # run pytest + vitest
make install     # reinstall all dependencies
make clean       # remove build artifacts and venv
```

## Structure
```
backend/
  main.py                   # thin orchestrator
  config.py                 # all env vars loaded once
  routes/
    audit.py                # POST /api/v1/audit — submit audit job
    report.py               # GET  /api/v1/report/{id} — fetch report
  services/
    audit_service.py        # orchestrates the visibility engine
    scoring.py              # AI Visibility Score algorithm
    prompts.py              # prompt templates per vertical/location
    ai_engines/
      openai_engine.py      # ChatGPT queries
      gemini_engine.py      # Google Gemini queries
      perplexity_engine.py  # Perplexity queries
      anthropic_engine.py   # Claude queries
  models/
    audit.py                # AuditRequest / AuditResult schemas
frontend/
  src/
    pages/Home.jsx          # landing page
    components/             # Hero, SearchShift, VisibilityScore, etc.
    services/               # all fetch() calls live here only
```

## Engineering Standards
- Business logic lives in `backend/services/`, never in `backend/routes/`
- All fetch() calls live in `frontend/src/services/`, never in components
- Every API call has try/catch with user-facing error feedback
- Semantic commits: feat, fix, docs, test, refactor, chore
