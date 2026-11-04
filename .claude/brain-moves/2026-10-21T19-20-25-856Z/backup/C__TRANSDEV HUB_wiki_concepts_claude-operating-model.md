---
title: Greg's Claude operating model
type: concept
status: current
updated: 2026-09-30
sources: [../../CLAUDE.md, ../../.claude/skills/ecc-operating-notes/SKILL.md, ../../.claude/skills/boulon-end-of-day/SKILL.md, ../../.claude/skills/boulon-morning-check/SKILL.md, ../../1-boulon/docs/hq-control-room.md, ../../1-boulon/docs/research-prds/2026-09-30-daily-videos.md]
---

**Bottom line:** how work gets done with Claude on BOULON: the strongest model orchestrates and checks, cheaper helper models do the legwork, ECC helpers are called by Claude on its own, and each day has a fixed open and close.

## 1. Model routing
The strongest model (the main session) orchestrates, decides and checks. Helper agents doing research, file reading or transcript work run on cheaper models, chosen explicitly on every call: Haiku for mechanical finding and extraction, Sonnet for reading, summarising, web research and drafting. Opus stays only where the result is a decision [[pierre-zivec]] or [[henri]] will rely on. Key numbers from helpers are double-checked before Greg sees them. The Control room's headless buttons run on Sonnet for the same reason ([[boulon-hq-control-room]]). ECC's own helpers carry preset models, and generic helpers default to Sonnet, but the rule is still to set `model` each time ([[skill-ecc-operating-notes]]). (Greg stated this rule on 2026-09-24; the detail lives in his pinned memory, not in a raw doc.)

## 2. ECC-first, on Claude's initiative
Claude calls ECC agents and skills whenever they fit and never asks Greg to pick or pre-assigns them ([[ecc-plugin]]). Written briefs to research agents follow the research-PRD pattern ([[learning-research-prd-workstream]]); `ecc:prompt-optimizer` sharpens a brief first.

## 3. Daily routine
- **Open:** `boulon-morning-check` reads the hand-off (`RESUME.md`), log and inbox digest if any, checks services, fixes log drift and refreshes HQ, without asking Greg for status ([[skill-boulon-morning-check]]).
- **During:** after every exchange, `boulon-hq-update` refreshes BOULON HQ and mirrors durable facts into the continuity log; wiki ingest follows per the wiki schema ([[skill-boulon-hq-update]]).
- **Close:** `boulon-end-of-day` (about 16:45): logs, timeline, lessons, skill and memory updates, tomorrow's first action on HQ, `RESUME.md`, `ecc:save-session`, then writes `.claude/hooks/.eod-done` to silence the reminder hook ([[skill-boulon-end-of-day]]). Next morning `ecc:resume-session`.
- Never tell Greg to close or restart Claude before the save step has run.

## 4. Communication rules
Plain language, click-by-click tutorials with EN+FR labels ([[skill-boulon-greg-steps]]), endings that stand on their own, no invented compliance steps ([[feedback-no-invented-compliance]]).

## Related
[[skills-catalog]] · [[greg-working-style]] · [[rules-index]]
