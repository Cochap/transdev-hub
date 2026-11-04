---
name: routine-recos
description: Friday routine suggester (ARMS Routines level 3). Reads this week's Claude sessions, finds jobs Greg did by hand three or more times, and turns each into a short card on a page with a cart he copies back. Runs every Friday 15:30 as a scheduled task, or on demand with "suggest routines". Changes nothing until Greg picks.
---
# Routine recos: routines that suggest routines

Goal: every Friday, spot the jobs Greg keeps doing by hand and offer to automate them, so the system gets a little better every week. Based on the ARMS v2 guide (`4-learning/references/arms-agentic-os-v2-guide.pdf`, Routines level 3).

## Steps
1. Gather the week: `node 5-brain/scripts/eod-gather-sessions.js --week` (one folder per day in `5-brain/logs/eod/`; read each `_index.json`, then the session files).
2. List what is already automated so nothing is suggested twice: `.claude/skills/*/SKILL.md` names and descriptions, the scheduled tasks (`mcp__scheduled-tasks__list_scheduled_tasks`), and the previous pages in `5-brain/routines/recos/`.
3. Find repeats: the same kind of request or the same steps done **3 or more times** this week by Greg or by Claude on his behalf (reports, status lookups, message drafts, file clean-ups, checks, copy-paste jobs, re-explaining the same thing). Ignore one-offs and anything a skill or routine already covers. If a job repeated but only Greg can do it (click steps in Copilot Studio, sending messages), suggest the nearest thing Claude can prepare.
4. Write at most 5 cards to a JSON file (`5-brain/routines/recos/<date>.json`): `title`, `what` (one sentence), `when` (schedule or trigger), `saves` (time or steps saved), `kind` (`passive` = only pings when something is worth flagging, `active` = hands over an output to review; prefer passive), `model` (smallest that can do it, haiku by default), `cost` (rough tokens a week; say "estimate"), `evidence` (which sessions and how many times).
5. Build the page: `node 5-brain/scripts/make-recos-page.js 5-brain/routines/recos/<date>.json`. Open `5-brain/routines/recos/<date>.html` for Greg (use the Browser pane or tell him the path).
6. Ping Greg only if there is at least one card ("N routines I would add, page ready"). With no cards, write the page anyway, say nothing more.
7. Change nothing else. When Greg pastes his picks back: show the plan and cost first, then create only those (scheduled tasks via the scheduled-tasks tool, cost-capped, passive where possible), log each in `5-brain/logs/calibrate-log.md`, and add them to `1-boulon/docs/timeline.md`.

## Rules
- Never create or change a routine in this skill; it only suggests.
- Keep keys, personal data and sensitive Transdev data out of the cards.
- Plain language, no jargon; each card readable in ten seconds.
- Every routine suggested must have a cost line, labelled Estimate.
