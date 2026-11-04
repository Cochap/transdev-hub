# TRANSDEV HUB — THE MAP (every query about this workspace starts here)
This file is a map, not a rulebook. Find your question below, open the file or router it names, then stop. Never search the whole tree first. Every folder has a `ROUTER.md` listing every child. Not found below → `grep -ri "<term>" --include=ROUTER*.md` (router lines describe every file), then `ROUTER.md` (root). `node scripts/brain.js audit` fails if anything in the vault or this map is missing.

## 1. By project / area (open the router, then its folders)
| Area | Contains | Open |
|---|---|---|
| BOULON | maintenance AI: Phase 1 manuals Q&A, Phase 2 diagnosis from MIR history; Copilot Studio, Azure AI Search, index, tests, costs, IT tickets, Henri reports | `routers/boulon.md` (read `docs/continuity-log.md` first); `/boulon-data` |
| ZBB | budget tool in `C:\ZBB`; model data, Power BI | `routers/zbb.md`, `projects/zbb/ROUTER.md`; `/zbb-data` |
| Daily Digest | AI-news app (worldmonitor) in `C:\Users\rilg01\DAILY DIGEST` | `routers/digest.md`, `projects/daily-digest/ROUTER.md`; `/digest-data` |
| Media & motion | films, Playwright frames, motion library for Anouk, motion-reel-kit | `routers/media.md`, `projects/motion-reel/ROUTER.md`; `film/`, `motion-library/`; `/motion-data` |
| Learning | AI-engineering course, quizzes, cheat sheet | `routers/learning.md`; `LEARNING.md`, `learning/`; `/learning-data` |
| Career | résumé, job postings | `routers/career.md`, `docs/resume-transdev-section.md` |
| Workspace | rules, skills, hooks, model routing, end-of-day, HQ, AIOS kit, brain build, locked-PC quirks | `routers/workspace.md` |
| External projects (pointers) | ZBB, Digest, motion-reel | `projects/ROUTER.md` |

## 2. By kind of question
| Question | Open |
|---|---|
| Where are we, what's next, what waits on Greg? | `RESUME.md`, `docs/continuity-log.md` (Status), `boulon-hq.html` |
| A decision or "why did we choose X" (approval gate, tier, scope) | `docs/continuity-log.md` (§1 Constitution + History), `docs/adr/`, `decisions/log.md`, `wiki/decisions/` |
| A rule, "how should Claude behave" | `routers/workspace.md` (Standing rules), `docs/continuity-log.md` §1 |
| Greg's preferences / memory | `C:\Users\rilg01\.claude\projects\C--TRANSDEV-HUB\memory\MEMORY.md` (index of all memories) |
| What happened on a past day / session | `logs/eod/`, `docs/timeline.md`, `docs/timeline-master.md`, `docs/lessons-2026-09-23.md` and the other dated `docs/lessons-*.md` |
| Schedule, Today, Week | `boulon-hq.html` (Today and Week tabs), `hq/`, `docs/hq-control-room.md` |
| Scope, KPIs, budget promised | `docs/project-brief-551.md` (source of truth) |
| Costs, Azure tiers and limits | `docs/cost-breakdown-2026-10-06.md`, `docs/d4-tier-decision.md`, `docs/azure-tiers-verified-2026-09-24.md` |
| Search index, chunking, rebuilds | `docs/index-facts.md`, `rebuild/`, `recovery/` |
| Agent instructions | `docs/agent-instructions.md` |
| Tests and results | `tests/`, `docs/test-ledger.md`; skill `boulon-agent-testing` |
| IT tickets, approval packages (French) | `requests/`, `docs/it-requests/`; skill `boulon-approval-package` |
| MIR data, tables TBONS TBONSDET TBONSMEC VEHICUL A_CODE*, work-order export | `data/ROUTER.md` → `data/mir-export/dump/`, `mir/`, `docs/mir-data-map.md` |
| Research, viability, reviews | `docs/research-2026-10-07/`, `docs/research-2026-10-15/`, `docs/research-prds/`, `docs/viability-check-2026-10-06.md` |
| Explaining to Henri / reports | `docs/explainer-for-henri.md`, skill `boulon-report-pipeline` |
| People, who's who | `context/people.md` |
| Business concepts, entities, wiki | `wiki/index.md` (schema `wiki/CLAUDE.md`) |
| Skills, hooks, settings, model routing | `.claude/ROUTER.md` (`.claude/settings.json`, `.claude/hooks/`, `.claude/skills/`, `.claude/model-routing.json`), `scripts/model-router.ps1`, `logs/model-routing.jsonl` |
| End of day / morning | skills `boulon-end-of-day`, `boulon-morning-check`; `scripts/eod-gather-sessions.js`; `logs/eod/` |
| Keys and secrets | `.env` (never open, print or ask in chat), template `.env.example`, git rules `.gitignore` |
| Third-party code, course repos, frameworks | `references/ROUTER.md` |
| Router and brain machinery | `ROUTER.md`, `ROUTER-2.md`, `routers/ROUTER.md`, `routers/brain.config.json`, `routers/moves.json`, `scripts/brain.js`, `scripts/ROUTER.md` |
| Other agents' entry file | `AGENTS.md` |
| Which skill fits? | skill `boulon-skill-finder` |

## 3. Every top-level item (nothing in the vault is unmapped)
- **Folders:** `.claude/` config+skills · `archives/` retired · `audits/` /audit reports · `brainstorms/` /grill-me files · `context/` about-Greg, people · `data/` MIR export · `decisions/` AIOS decision log · `docs/` BOULON docs · `film/` launch-film scripts · `hq/` control-room server · `learning/` tutor notebook · `logs/` routing + eod extracts · `mir/` export analyzer · `motion-library/` · `projects/` external-project pointers · `rebuild/` index rebuilds · `recovery/` pre-migration bundle · `references/` third-party · `requests/` IT/approval pages · `routers/` area routers · `scripts/` tooling · `tests/` BOULON tests · `wiki/` business wiki
- **AIOS kit files:** `aios-intake.md`, `connections.md`, `EXPANSIONS.md`, `AGENTS.md`
- **Hand-off and plans:** `RESUME.md`, `LEARNING.md`, `boulon-hq.html`
- **Chrome bookmark cleanup 2026-10-07 (personal):** `bookmark-*.ps1`, `chrome-*.json`, `chrome-*.png`, `chrome-bookmarks-organized.html`, `organize-account-bookmarks.ps1`, `library-size-helper.html`; `chrome-full-backup-20261007-162721/` is personal browsing data, do not open
- **Strays / leftovers:** `undefined/` (tool-made, clean up), `worldmonitor/` (empty leftover), `.ruff_cache/` (cache, ignore)
- **Secrets and git:** `.env`, `.env.example`, `.gitignore`
- **Routers:** `ROUTER.md`, `ROUTER-2.md`, `CLAUDE.md` (this map)
