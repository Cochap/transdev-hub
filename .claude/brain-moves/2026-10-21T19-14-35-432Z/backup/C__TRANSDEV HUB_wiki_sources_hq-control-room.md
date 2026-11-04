---
title: Source — BOULON HQ Control room
type: source
status: current
updated: 2026-09-30
sources: [../../docs/hq-control-room.md]
---

**Bottom line:** describes the local Control room panel (built 2026-09-25) that sits on top of Greg's BOULON HQ page: live numbers, skill buttons, run history. Details in [[boulon-hq-control-room]].

## What the source says
- Opens at http://127.0.0.1:4777; the session-start hook starts it, or double-click `hq\start-hq.cmd`. The online claude.ai page is unchanged and read-only.
- Idea taken from a Chase AI YouTube video (2026-09-24, interface section at 19:59); transcripts were blocked so the mechanism comes from his blog posts. Headless Claude (`claude -p`) runs each button. His warning: the dashboard is packaging, the value is in skills and memory.
- Files: `hq/server.js` (localhost only, random code per start, other hosts get 403), `hq/hq-local.js`, `hq/runs.jsonl`, `.claude/hooks/session-start.js`.
- Auto buttons (headless Claude on Sonnet): Morning check, Read the email digest, Refresh BOULON HQ; Golden-set test (PowerShell, no AI cost, disabled until a real key is in `.env`). Copy-command buttons: `/boulon-end-of-day`, `/ecc:save-session`, `/boulon-report-pipeline`, `/boulon-agent-testing`. "Ask Claude" runs read-only (plan mode).
- Verified 2026-09-25: panel loads, foreign requests refused, one Ask Claude run took about 90 seconds at about $0.34. The three auto buttons had not yet been run from a button.

## Related
[[boulon-hq-control-room]] · [[claude-operating-model]] · [[skill-boulon-hq-update]]
