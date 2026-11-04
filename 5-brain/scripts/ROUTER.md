# ROUTER — scripts
Open only the line you need. Every child of this folder is listed below.

## Contents
- `rag-radar/` — rag-radar helper files: last30days query plan (2 files) → ROUTER.md
- `brain-move.js` — Safe move + relink for the second brain. Plain Node, no installs.
- `brain.js` — Second-brain router builder + audit. Plain text only, no database.
- `build-skill-manifest.ps1` — Lists every skill/command Claude can use on this PC (live sources only, no translated or mirro…
- `classify-all-skills.ps1` — Asks Jev (via model-router.ps1 -Classify) about every skill in data\routing\skills-raw.json,
- `cloud-sync.ps1` — Two-way sync between C:\TRANSDEV HUB and GitHub Cochap/transdev-hub (branch main, no PRs).
- `eod-gather-sessions.js` — Gathers every Claude Code conversation from one local day (default today) across ALL projects
- `eod-lock.js` — End-of-day guard: stops two end-of-day runs working on the same files, and catch-up runs
- `last30days-run.py` — runs the last30days plugin engine with truststore (fixes the corporate-certificate error on Python 3.14); used by the rag-radar routine
- `make-recos-page.js` — Builds the Friday routine-suggestions page: cards with a cart that copies Greg's picks back to…
- `map-check.js` — CLAUDE.md must map the WHOLE vault: every top-level item is named in it, and every path it cit…
- `model-router.ps1` — ps1 script
- `patch-root-finders.js` — One-off (2026-10-21): make scripts independent of how deep they sit, so folders can move.
- `setup-openrouter.ps1` — ps1 script
- `sync-skill-routing.ps1` — Passive upkeep for model routing. Silent when nothing changed.
