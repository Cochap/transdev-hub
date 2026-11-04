---
title: BOULON HQ and the Control room
type: entity
status: current
updated: 2026-09-30
sources: [../../docs/hq-control-room.md, ../../../.claude/skills/boulon-hq-update/SKILL.md, ../../../CLAUDE.md]
---

**Bottom line:** BOULON HQ is Greg's one daily page (what to do next, progress, latest test scores). The Control room is an extra panel that only appears when the page is opened on Greg's own PC, with buttons that run BOULON skills.

## BOULON HQ (the page)
A single HTML file (`boulon-hq.html`) published as a claude.ai artifact (https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9). It replaced TODAY.md on 2026-09-23. Claude refreshes it after every exchange using [[skill-boulon-hq-update]]; always republish with the existing `url` or a duplicate page appears. Its shape: headline, progress, one "Your move" action in tutorial format ([[skill-boulon-greg-steps]]), decisions, latest scores, a short "later" list and a feed naming the ECC tools used ([[ecc-plugin]]).

## Control room (the local panel)
Built 2026-09-25. A small local server (`1-boulon/hq/server.js`) at http://127.0.0.1:4777 serves the page plus `1-boulon/hq/hq-local.js`. It listens only on this PC, uses a random code per start and refuses other hosts. It shows live numbers (latest golden-set score, tests in the ledger, active fix-tracker rows, age of the email digest, search service up/down, whether a real key is present by length only, ECC's cost estimate) and buttons:
- Run by themselves as headless Claude on Sonnet: Morning check, Read the email digest, Refresh BOULON HQ. Golden-set test is a PowerShell script with no AI cost, disabled until a real key is in `.env`.
- Copy a command for the Claude window (need the conversation): `/boulon-end-of-day`, `/ecc:save-session`, `/boulon-report-pipeline`, `/boulon-agent-testing`.
- "Ask Claude": read-only (plan mode). One test run cost about $0.34 and took about 90 seconds.
Starts automatically via the session-start hook or `1-boulon\hq\start-hq.cmd`. Idea from a Chase AI video; his caution, kept here: the dashboard is packaging, the value is the skills and memory underneath ([[claude-operating-model]]).

Not yet run from a button as of 2026-09-25: the three auto buttons. Not built: automation forecast, key-tester button, agent tests without Greg.

Sources: [[hq-control-room]], [[skill-boulon-hq-update]].

## Related
[[boulon]] · [[skills-catalog]] · [[greg-riley]]
