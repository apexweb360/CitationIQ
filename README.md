# ApexLaunch
Built with the ApexWeb360 Code SS System.

## Stack
- Python 3.12 (FastAPI)
- React / Framer Motion
- Supabase + Stripe + Firecrawl
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
Follows the ApexWeb360 Thin Orchestrator / Thick Service pattern.
See `CLAUDE.md` for local overrides and `~/CODING/CLAUDE.md` for global standards.

## Engineering Standards
- Business logic lives in `backend/services/`, never in `backend/routes/`
- All fetch() calls live in `frontend/src/services/`, never in components
- Every API call has try/catch with user-facing error feedback
- Semantic commits: feat, fix, docs, test, refactor, chore
