# TRANSDEV HUB — THE MAP (every query about this workspace starts here)
This file is a map, not a rulebook. Find your question below, open the file or router it names, then stop. Never search the whole tree first. Every folder has a `ROUTER.md` listing every child. Not found below → `grep -ri "<term>" --include=ROUTER*.md` (router lines describe every file), then `ROUTER.md` (root). `node 5-brain/scripts/brain.js audit` fails if anything in the vault or this map is missing.

## Rules of engagement
1. Answer ONLY based on my files. Always cite the file name where you found the information.
2. If the answer is not in the files, state clearly: "No data found in files." Do not guess or make up facts.

## 1. By project / area (open the router, then its folders)
| Area | Contains | Open |
|---|---|---|
| BOULON | maintenance AI: Phase 1 manuals Q&A, Phase 2 diagnosis from MIR history; Copilot Studio, Azure AI Search, index, tests, costs, IT tickets, Henri reports; NEW SCOPE 2026-11-03: MVP = school-bus (scolaire) manuals only | `5-brain/routers/boulon.md` (read `1-boulon/docs/continuity-log.md` first); MVP `1-boulon/docs/mvp-school-bus-2026-11-03.md`; `/boulon-data` |
| ZBB | budget tool in `C:\ZBB`; model data, Power BI | `5-brain/routers/zbb.md`, `2-projects/zbb/ROUTER.md`; `/zbb-data` |
| Daily Digest | AI-news app (worldmonitor) in `C:\Users\rilg01\DAILY DIGEST`; terminal dashboard: type `wm` (launchers `C:\Users\rilg01\bin\wm.cmd`, `worldmonitor.cmd`) | `5-brain/routers/digest.md`, `2-projects/daily-digest/ROUTER.md`; `/digest-data` |
| Meeting transcripts (Whisper, French) | DIX30 meeting 2026-11-03 → notes → project charter / methodology doc | `2-projects/transcripts/`, hand-off `5-brain/handoffs/2026-11-03-dix30-transcription-handoff.md` |
| Media & motion | films (Geotab explainer `3-media/film/geotab-explainer/`), Playwright frames, motion library for Anouk, motion-reel-kit | `5-brain/routers/media.md`, `2-projects/motion-reel/ROUTER.md`; `3-media/film/`, `3-media/motion-library/`; `/motion-data` |
| Learning | AI-engineering course, quizzes, cheat sheet | `5-brain/routers/learning.md`; `4-learning/LEARNING.md`, `4-learning/`; `/learning-data` |
| Workshop segmentation | NEW 2026-10-27, not BOULON: Transdev Canada bus workshop ID card, 3 segments, bronze/silver/gold maturity; kickoff debrief; scoring workbook v2, results 01-04, formula guide (private GitHub repo Cochap/workshop-segmentation) | `2-projects/workshop-segmentation/ROUTER.md` (raw docs go in `2-projects/workshop-segmentation/raw/`; working repo `2-projects/workshop-segmentation/cloud-repo/results/` and `2-projects/workshop-segmentation/cloud-repo/data/`; meeting transcripts not yet in raw: `C:\Users\rilg01\Downloads\End transcri.txt`), wiki `1-boulon/wiki/projects/workshop-segmentation.md`; ID card app `2-projects/workshop-id-card/ROUTER.md` |
| Career | résumé, job postings | `5-brain/routers/career.md`, `1-boulon/docs/resume-transdev-section.md` |
| Workspace | rules, skills, hooks, model routing, end-of-day, HQ, AIOS kit, brain build, locked-PC quirks | `5-brain/routers/workspace.md` |
| External projects (pointers) | ZBB, Digest, motion-reel | `2-projects/ROUTER.md` |

## 2. By kind of question
| Question | Open |
|---|---|
| Greg's ideas, tasks with subtasks, dropped items (weekly) | `5-brain/ideas/` (newest `<year>-W<week>-ideas-and-tasks.md`; end of day appends) |
| Where are we, what's next, what waits on Greg? | `RESUME.md`, `1-boulon/docs/continuity-log.md` (Status), `boulon-hq.html` |
| Resume from yesterday / any hand-off, resume note, saved session (ALL projects, one table) | `5-brain/handoffs/INDEX.md` (newest hand-off per area incl. ZBB and the saved sessions), then `/ecc:resume-session` |
| Meeting prep (people, numbers, pain points) | `1-boulon/docs/meeting-prep-2026-10-22-ai-maintenance-catalogue.md`, `5-brain/context/people.md` |
| A decision or "why did we choose X" (approval gate, tier, scope) | `1-boulon/docs/continuity-log.md` (§1 Constitution + History), `1-boulon/docs/adr/`, `5-brain/decisions/log.md`, `1-boulon/wiki/decisions/` |
| A rule, "how should Claude behave" | `5-brain/routers/workspace.md` (Standing rules), `1-boulon/docs/continuity-log.md` §1 |
| Greg's interests, learning briefs, lexicons (AI/ML, project management) | `4-learning/interests/interest-map.md` (trunk), `4-learning/interests/lexicon-ai-ml.md`, `4-learning/interests/lexicon-project-management.md`, `4-learning/interests/briefs/`; skill `morning-brief`; wiki `1-boulon/wiki/concepts/greg-interest-map.md` |
| Greg's preferences / memory | `C:\Users\rilg01\.claude\projects\C--TRANSDEV-HUB\memory\MEMORY.md` (index of all memories) |
| What happened on a past day / session | `5-brain/logs/eod/`, `1-boulon/docs/timeline.md`, `1-boulon/docs/timeline-master.md`, `1-boulon/docs/lessons-2026-09-23.md` and the other dated `1-boulon/docs/lessons-*.md` |
| Schedule, Today, Week | `boulon-hq.html` (Today and Week tabs), `1-boulon/hq/`, `1-boulon/docs/hq-control-room.md` |
| Scope, KPIs, budget promised | `1-boulon/docs/project-brief-551.md` (source of truth) |
| Costs, Azure tiers and limits | `1-boulon/docs/cost-breakdown-2026-10-06.md`, `1-boulon/docs/d4-tier-decision.md`, `1-boulon/docs/azure-tiers-verified-2026-09-24.md` |
| Search index, chunking, rebuilds | `1-boulon/docs/index-facts.md`, `1-boulon/rebuild/`, `1-boulon/recovery/` |
| Agent instructions | `1-boulon/docs/agent-instructions.md` |
| Tests and results | `1-boulon/tests/`, `1-boulon/docs/test-ledger.md`; skill `boulon-agent-testing` |
| IT tickets, approval packages (French) | `1-boulon/requests/`, `1-boulon/docs/it-requests/`; skill `boulon-approval-package` |
| MIR data, tables TBONS TBONSDET TBONSMEC VEHICUL A_CODE*, work-order export | `1-boulon/data/ROUTER.md` → `1-boulon/data/mir-export/dump/`, `1-boulon/mir/`, `1-boulon/docs/mir-data-map.md` |
| Research, viability, reviews | `1-boulon/docs/research-2026-10-07/`, `1-boulon/docs/research-2026-10-15/`, `1-boulon/docs/research-prds/`, `1-boulon/docs/viability-check-2026-10-06.md` |
| Latest self-hosted RAG tools, community advances, RAG knowledge web (weekly) | `1-boulon/docs/rag-radar/knowledge-web.md` (Leaders table), newest `1-boulon/docs/rag-radar/runs/`; skill `rag-radar`, task `rag-radar-weekly` (Mon 08:15); community lane = last30days plugin via `5-brain/scripts/last30days-run.py`; decisions `5-brain/brainstorms/2026-10-29-last30days-in-rag-radar.md` |
| Explaining to Henri / reports | `1-boulon/docs/explainer-for-henri.md`, skill `boulon-report-pipeline` |
| People, who's who | `5-brain/context/people.md` |
| Business concepts, entities, wiki | `1-boulon/wiki/index.md` (schema `1-boulon/wiki/CLAUDE.md`) |
| Skills, hooks, settings, model routing | `.claude/ROUTER.md` (`.claude/settings.json`, `.claude/hooks/`, `.claude/skills/`, `.claude/model-routing.json`), `5-brain/scripts/model-router.ps1`, `5-brain/logs/model-routing.jsonl` |
| End of day / morning | skills `boulon-end-of-day` (whole day + brain health), `boulon-morning-check`; `5-brain/scripts/eod-gather-sessions.js`; `5-brain/logs/eod/` |
| Closing, archiving or deleting ONE session (do this first) | skill `close-session`; ledger `5-brain/logs/closed-sessions.md` |
| Brain improvement backlog, hop-test log, what to fix next | `5-brain/improvements.md` |
| Keys and secrets | `.env` (never open, print or ask in chat), template `.env.example`, git rules `.gitignore` |
| Third-party code, course repos, frameworks | `4-learning/references/ROUTER.md` |
| Router and brain machinery | `ROUTER.md`, `5-brain/routers/ROUTER.md`, `5-brain/routers/brain.config.json`, `5-brain/routers/moves.json`, `5-brain/scripts/brain.js`, `5-brain/scripts/ROUTER.md` |
| Other agents' entry file | `AGENTS.md` |
| Which skill fits? | skill `boulon-skill-finder` |

## 3. Every top-level item (nothing in the vault is unmapped)
- **Numbered homes:** `1-boulon/` (docs, tests, hq, data, mir, wiki, rebuild, recovery, requests) · `2-projects/` (pointer routers: zbb, daily-digest, motion-reel) · `3-media/` (film, motion-library, library-size-helper.html) · `4-learning/` (LEARNING.md, matrix-cheatsheet.html, references/ third-party) · `5-brain/` (routers, scripts, logs, context, decisions, audits, brainstorms, aios-intake.md, connections.md, EXPANSIONS.md) · `9-archive/` (chrome-cleanup-2026-10-07, undefined, archives)
- **Root files:** `CLAUDE.md` (this map) · `AGENTS.md` · `RESUME.md` hand-off · `boulon-hq.html` HQ page · `ROUTER.md` · `.env`, `.env.example`, `.gitignore` (secrets and git rules; never open `.env`)
- **Config:** `.claude/` (settings, hooks, skills, model routing)
- **Leftovers:** `.ruff_cache/` cache (ignore) · `Scoring test.xlsx` (segmentation referential criteria, attached 2026-10-29; move to `2-projects/workshop-segmentation/raw/` proposed in `5-brain/routers/moves.json` `_proposed`, waits on Greg)
- **Moving things:** edit `5-brain/routers/moves.json`, then `node 5-brain/scripts/brain-move.js plan` and `apply` (backs up, relinks every reference, rolls back on failure; `undo --run <id>`)
