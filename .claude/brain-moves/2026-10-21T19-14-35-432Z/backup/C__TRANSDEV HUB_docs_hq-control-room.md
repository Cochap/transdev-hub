# BOULON HQ Control room (built 2026-09-25)

**What it is:** BOULON HQ opened on Greg's PC at **http://127.0.0.1:4777** gets a *Control room* panel: live numbers, buttons that run BOULON skills, a read-only "Ask Claude" box, the live log of the current run and a run history. The online page (claude.ai link) is unchanged and read-only.

**How to open it:** it starts automatically when a Claude session opens (session-start hook). By hand: double-click `hq\start-hq.cmd`.

## Where the idea comes from
Chase AI, "This NEW Jev + Claude OS Just Changed Every AI Workflow" (YouTube, 2026-09-24; the visual interface section starts at 19:59). YouTube blocked every automated transcript route, so the mechanism comes from Chase AI's own blog posts on the same "agentic OS" setup, not from the video's audio:
- Each dashboard button runs Claude Code headless (`claude -p` with the skill's prompt).
- On screen: run history, upcoming automations, usage, quick links.
- His warning: the dashboard is only packaging. The value is in the skills and memory underneath.

The "Jev" part (a separate decision-model product) is deliberately left out.

## How it works
| Piece | File | Role |
|---|---|---|
| Local server | `hq/server.js` | Listens only on 127.0.0.1:4777. Serves `boulon-hq.html` plus the panel, reports numbers from project files, runs a fixed list of actions. A random code per start blocks requests from other web pages |
| Panel | `hq/hq-local.js` | Only loaded by the local server, never on the published page |
| Run history | `hq/runs.jsonl`, `hq/runs/*.log` | One line per run (action, times, ok, cost, summary) and the full log |
| Auto-start | `.claude/hooks/session-start.js` | Starts the server if it isn't running |

**Buttons that run by themselves** (headless Claude on Sonnet, per Greg's model rule): Morning check, Read the email digest, Refresh BOULON HQ. Also the Golden-set test, which is a PowerShell script with no AI cost, disabled until a real search key is in `.env`.
**Buttons that copy a command** for the Claude window: `/boulon-end-of-day`, `/ecc:save-session`, `/boulon-report-pipeline` and `/boulon-agent-testing`. They need the conversation, so a background run would miss the context.
**Ask Claude:** runs read-only (plan mode).

Background runs set `BOULON_HQ_RUN=1`, so the hooks don't push them into the morning check or end of day. Only one run at a time.

## Numbers shown
- Latest golden-set score (`tests/results/golden_*.md`)
- Tests in `docs/test-ledger.md`
- "Active" rows in the continuity log fix tracker
- Age of the latest email digest
- Search service status (a request without a key: 401 = up)
- Whether a real key is present (checked by length only)
- ECC's cost estimate (`~/.claude/metrics/costs.jsonl`): pay-per-use prices, not a bill

## Verified 2026-09-25
- Page and panel load (headless Edge screenshot).
- Requests without the code, or from another host, are refused (403).
- One real "Ask Claude" run completed in about 90 seconds at about $0.34, with the right answer and nothing in the project changed.
- The session-start hook started the server by itself.
- **Not yet run from a button:** Morning check, Read the email digest, Refresh BOULON HQ (they spend Claude usage and publish; first real use will tell).

## Next ideas (not built)
Upcoming-automation forecast (the 6:00 digest, the 16:45 reminder); a button to run the key tester once it exists; agent tests without Greg (Evaluation tab / Power Automate).
