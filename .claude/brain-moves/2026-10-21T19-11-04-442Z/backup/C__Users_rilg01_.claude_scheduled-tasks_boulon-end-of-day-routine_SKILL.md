---
name: boulon-end-of-day-routine
description: Weekdays 16:45: read all of today's Claude sessions and close the BOULON day
---

Working folder: C:\TRANSDEV HUB. Read CLAUDE.md and docs/continuity-log.md, then run the project skill boulon-end-of-day in full (read .claude/skills/boulon-end-of-day/SKILL.md and follow every step). Step 0 is mandatory: run `node scripts/eod-gather-sessions.js`, read every Claude Code session of today across all projects (BOULON, ZBB, DAILY DIGEST), and route the information to the places in the skill's routing table. Finish by writing today's date to .claude/hooks/.eod-done and giving Greg the summary (sessions read, what went where, unfiled items, tomorrow's first actions). Never write or print keys.