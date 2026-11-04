# TRANSDEV HUB — THE MAP (every query about this workspace starts here)
This file is a map, not a rulebook. Find your question below, open the file or router it names, then stop. Never search the whole tree first. Every folder has a `ROUTER.md` listing every child. Not found below → `grep -ri "<term>" --include=ROUTER*.md` (router lines describe every file), then `ROUTER.md` (root). `node 5-brain/scripts/brain.js audit` fails if anything in the vault or this map is missing.

## 1. By project / area (open the router, then its folders)
| Area | Contains | Open |
|---|---|---|
| BOULON | maintenance AI: Phase 1 manuals Q&A, Phase 2 diagnosis from MIR history; Copilot Studio, Azure AI Search, index, tests, costs, IT tickets, Henri reports | `5-brain/routers/boulon.md` (read `1-boulon/docs/continuity-log.md` first); `/boulon-data` |
| ZBB | budget tool in `C:\ZBB`; model data, Power BI | `5-brain/routers/zbb.md`, `2-projects/zbb/ROUTER.md`; `/zbb-data` |
| Daily Digest | AI-news app (worldmonitor) in `C:\Users\rilg01\DAILY DIGEST` | `5-brain/routers/digest.md`, `2-projects/daily-digest/ROUTER.md`; `/digest-data` |
| Media & motion | films, Playwright frames, motion library for Anouk, motion-reel-kit | `5-brain/routers/media.md`, `2-projects/motion-reel/ROUTER.md`; `film/`, `motion-library/`; `/motion-data` |
| Learning | AI-engineering course, quizzes, cheat sheet | `5-brain/routers/learning.md`; `4-learning/LEARNING.md`, `learning/`; `/learning-data` |
| Career | résumé, job postings | `5-brain/routers/career.md`, `1-boulon/docs/resume-transdev-section.md` |
| Workspace | rules, skills, hooks, model routing, end-of-day, HQ, AIOS kit, brain build, locked-PC quirks | `5-brain/routers/workspace.md` |
| External projects (pointers) | ZBB, Digest, motion-reel | `2-projects/ROUTER.md` |

## 2. By kind of question
| Question | Open |
|---|---|
| Where are we, what's next, what waits on Greg? | `RESUME.md`, `1-boulon/docs/continuity-log.md` (Status), `boulon-hq.html` |
| A decision or "why did we choose X" (approval gate, tier, scope) | `1-boulon/docs/continuity-log.md` (§1 Constitution + History), `1-boulon/docs/adr/`, `5-brain/decisions/log.md`, `wiki/decisions/` |
| A rule, "how should Claude behave" | `5-brain/routers/workspace.md` (Standing rules), `1-boulon/docs/continuity-log.md` §1 |
| Greg's preferences / memory | `C:\Users\rilg01\.claude\projects\C--TRANSDEV-HUB\memory\MEMORY.md` (index of all memories) |
| What happened on a past day / session | `5-brain/logs/eod/`, `1-boulon/docs/timeline.md`, `1-boulon/docs/timeline-master.md`, `1-boulon/docs/lessons-2026-09-23.md` and the other dated `1-boulon/docs/lessons-*.md` |
| Schedule, Today, Week | `boulon-hq.html` (Today and Week tabs), `hq/`, `1-boulon/docs/hq-control-room.md` |
| Scope, KPIs, budget promised | `1-boulon/docs/project-brief-551.md` (source of truth) |
| Costs, Azure tiers and limits | `1-boulon/docs/cost-breakdown-2026-10-06.md`, `1-boulon/docs/d4-tier-decision.md`, `1-boulon/docs/azure-tiers-verified-2026-09-24.md` |
| Search index, chunking, rebuilds | `1-boulon/docs/index-facts.md`, `rebuild/`, `recovery/` |
| Agent instructions | `1-boulon/docs/agent-instructions.md` |
| Tests and results | `tests/`, `1-boulon/docs/test-ledger.md`; skill `boulon-agent-testing` |
| IT tickets, approval packages (French) | `requests/`, `1-boulon/docs/it-requests/`; skill `boulon-approval-package` |
| MIR data, tables TBONS TBONSDET TBONSMEC VEHICUL A_CODE*, work-order export | `1-boulon/data/ROUTER.md` → `1-boulon/data/mir-export/dump/`, `mir/`, `1-boulon/docs/mir-data-map.md` |
| Research, viability, reviews | `1-boulon/docs/research-2026-10-07/`, `1-boulon/docs/research-2026-10-15/`, `1-boulon/docs/research-prds/`, `1-boulon/docs/viability-check-2026-10-06.md` |
| Explaining to Henri / reports | `1-boulon/docs/explainer-for-henri.md`, skill `boulon-report-pipeline` |
| People, who's who | `5-brain/context/people.md` |
| Business concepts, entities, wiki | `wiki/index.md` (schema `wiki/CLAUDE.md`) |
| Skills, hooks, settings, model routing | `.claude/ROUTER.md` (`.claude/settings.json`, `.claude/hooks/`, `.claude/skills/`, `.claude/model-routing.json`), `5-brain/scripts/model-router.ps1`, `5-brain/logs/model-routing.jsonl` |
| End of day / morning | skills `boulon-end-of-day`, `boulon-morning-check`; `5-brain/scripts/eod-gather-sessions.js`; `5-brain/logs/eod/` |
| Keys and secrets | `.env` (never open, print or ask in chat), template `.env.example`, git rules `.gitignore` |
| Third-party code, course repos, frameworks | `4-learning/references/ROUTER.md` |
| Router and brain machinery | `ROUTER.md`, `ROUTER-2.md`, `5-brain/routers/ROUTER.md`, `5-brain/routers/brain.config.json`, `5-brain/routers/moves.json`, `5-brain/scripts/brain.js`, `5-brain/scripts/ROUTER.md` |
| Other agents' entry file | `AGENTS.md` |
| Which skill fits? | skill `boulon-skill-finder` |

## 3. Every top-level item (nothing in the vault is unmapped)
- **Folders:** `.claude/` config+skills · `archives/` retired · `audits/` /audit reports · `brainstorms/` /grill-me files · `context/` about-Greg, people · `data/` MIR export · `decisions/` AIOS decision log · `docs/` BOULON docs · `film/` launch-film scripts · `hq/` control-room server · `learning/` tutor notebook · `logs/` routing + eod extracts · `mir/` export analyzer · `motion-library/` · `projects/` external-project pointers · `rebuild/` index rebuilds · `recovery/` pre-migration bundle · `references/` third-party · `requests/` IT/approval pages · `routers/` area routers · `scripts/` tooling · `tests/` BOULON tests · `wiki/` business wiki
- **AIOS kit files:** `5-brain/aios-intake.md`, `5-brain/connections.md`, `5-brain/EXPANSIONS.md`, `AGENTS.md`
- **Hand-off and plans:** `RESUME.md`, `4-learning/LEARNING.md`, `boulon-hq.html`
- **Chrome bookmark cleanup 2026-10-07 (personal):** `bookmark-*.ps1`, `chrome-*.json`, `chrome-*.png`, `9-archive/chrome-cleanup-2026-10-07/chrome-bookmarks-organized.html`, `9-archive/chrome-cleanup-2026-10-07/organize-account-bookmarks.ps1`, `3-media/library-size-helper.html`; `chrome-full-backup-20261007-162721/` is personal browsing data, do not open
- **Strays / leftovers:** `undefined/` (tool-made, clean up), `worldmonitor/` (empty leftover), `.ruff_cache/` (cache, ignore)
- **Secrets and git:** `.env`, `.env.example`, `.gitignore`
- **Routers:** `ROUTER.md`, `ROUTER-2.md`, `CLAUDE.md` (this map)
