---
name: digest-data
description: Use when Greg asks about the Daily Digest / worldmonitor numbers, feeds, the running local app, or where its data and dashboards are. Says where each is and how to start it.
---
# Daily Digest data: where the numbers are
Project folder `C:\Users\rilg01\DAILY DIGEST\` (pointer router `2-projects/daily-digest/ROUTER.md`). The app is a third-party clone of worldmonitor.

| What | Where |
|---|---|
| Live dashboard | http://localhost:3000 after starting the dev server: launch config `worldmonitor-dev` in `DAILY DIGEST\.claude\launch.json` (`npm --prefix worldmonitor run dev`) |
| How to run the whole free stack (no Docker) | `DAILY DIGEST\worldmonitor\SETUP-FREE-STACK.md` |
| Data feeds / seed data | `DAILY DIGEST\worldmonitor\data\` (forecast-cohorts, x-accounts, telegram-channels, ...); seeders `worldmonitor\scripts\seed-*.mjs` |
| Cache / store | Garnet in `tools\garnet\` behind `tools\proxy\redis-rest-proxy.mjs` |
| Settings and keys | `worldmonitor\.env`, `.env.local` (never print) |
| What we did with it | `5-brain/logs/eod/<date>/` extracts and `1-boulon/docs/research-*` if any |

No scheduled digest output has been found yet. If asked for "today's digest", check whether the server is running first; if not, say so and offer to start it.
