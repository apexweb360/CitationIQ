# ApexLaunch — Local Engineering Context
# This project adheres to the ApexWeb360 Global Engineering Standards
# defined in ~/CODING/CLAUDE.md. Rules defined here act as local overrides or additions.

## Project Overview
- **Name:** ApexLaunch
- **Purpose:** Internal launch scaffold for ApexWeb360 client projects, wiring FastAPI, React, Supabase, and Stripe into a deployable baseline.
- **Stack:** FastAPI + React + Supabase + Stripe

## Local Overrides
None, all global standards from `~/CODING/CLAUDE.md` apply as-is.

## Project-Specific Notes
- Routes live in `backend/routes/`, services in `backend/services/`, no exceptions.
- Frontend fetch calls go in `frontend/src/services/` only.
- Framer Motion required for all animated UI elements.
