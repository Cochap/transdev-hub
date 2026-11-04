# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-09-06 - Audit evidence and routing maintenance

**Decision:** Ship audit rubric v2 and a small /link skill. Audit scores working evidence across the Four Cs, checks operating-manual routing and freshness, and passes one concrete gap into /level-up. A selected repair can improve an existing workflow instead of creating another skill.

**Why:** File counts, configured keys, named rituals, and recent edits do not prove an operational AIOS. Source findability and freshness need explicit checks.

**Alternatives considered:** Keeping presence-based scoring or requiring a hot cache. Neither reliably establishes retrieval quality or successful execution.

## 2026-09-06 - Portable skills and automatic audit history

**Decision:** Ship all four skills for Claude Code and Codex, with bundled resources, matching operating manuals, and a script for regenerating Codex copies. Audit reports are saved automatically, preserve previous runs, and track findings across comparable inspections.

**Why:** Students need the same shared guidance when switching assistants and evidence of actual improvements over time. Intentional runtime adaptations, unknown verification, and confirmed defects are reported separately.

## 2026-09-06 - Portable 3D Brain skill

**Decision:** Add `/3d-brain` for Claude Code and Codex. Ask for a name and categories, map selected local folders, and scaffold a bundled, configurable application with spherical placement, Cinema, and interactive growth replay.

**Why:** Shipping the working renderer preserves the intended appearance and interactions across AIOS installations. A prose-only prompt would produce inconsistent recreations. User config and graph data remain local; the public package includes only code, documentation, dependency notices, and fictional test inputs.

## 2026-09-06 - Add ongoing context interviews

**Decision:** Adapt Herk-2's grill-me skill for the student kit and ship matching Claude/Codex packages. Save every answer to brainstorms/, preserve resumable Q&A history, and update canonical context only with confirmed facts during requested context-building sessions.

**Why:** Onboarding is an initial snapshot. Ongoing interviews capture changing priorities, decisions, and preferences while keeping tentative ideas distinct from current business facts.

## 2026-10-21 - CLAUDE.md is a complete map; vault in numbered folders

**Decision:** CLAUDE.md maps every query (by area, by kind of question, every top-level item) and holds no rules. The vault is organised as 1-boulon, 2-projects, 3-media, 4-learning, 5-brain, 9-archive. The audit fails on map gaps. End of day also checks brain health; close-session closes single sessions.

**Why:** Greg wants Claude to find anything in few hops without blind searches, and lean sessions that hand off through files.

## 2026-10-21 - Pointer routers, safe moves, plugins inside the brain

**Decision:** ZBB, Daily Digest and motion-reel-kit stay in their own folders and get pointer routers in 2-projects/ (not junctions). The duplicate worldmonitor clone in the brain was deleted (the DAILY DIGEST copy has Greg's .env and setup notes). The Codex 5-hour course and the AIOS kit moved into 4-learning/references/. Any future move goes through 5-brain/scripts/brain-move.js (plan, apply with smoke tests and automatic rollback, undo); scripts find the brain root by walking up to CLAUDE.md. Plugins (ECC, 292 skills) are copied to 5-brain/plugins and CLAUDE_CODE_PLUGIN_CACHE_DIR points there (active after an app restart); skills stay in .claude/skills (Claude Code has no custom skills path). ARMS v2 level 3 tools adopted: calibrate (upstream robonuggets/calibrate, MIT), note, routine-recos with a Friday 15:30 scheduled task.

**Why:** Greg wants one centralised brain, no scattered skills or plugins, and moves that cannot silently break routing. Rehearsal of the move tool on a copy rolled back twice and caught real bugs before the real run.

## 2026-10-21 - Skill model routing via Jev (OpenRouter)

**Decision:** every skill call is routed to a model size by `typesafe/jev-router` through OpenRouter. Simple fixed-step skills are pinned to Haiku in their frontmatter; high-stakes skills have a Sonnet floor; the registry of all 439 skills and commands lives in `.claude/model-routing.json`; a PreToolUse hook on Skill routes each call; a quiet SessionStart hook classifies only new skills. With no key, picks fall back to Sonnet. The key is stored for Greg's Windows user and never printed. Every pick is logged to `5-brain/logs/model-routing.jsonl`.

**Why:** Greg wants the right model size per job without running scripts by hand (see memory feedback-model-routing). Only simulated hook calls were tested; the real hook is confirmed after an app restart.

## 2026-10-28 - Rules in CLAUDE.md; HQ for every project; end-of-day hand-off format

**Decision:** (1) Greg placed two rules in `CLAUDE.md` under "Rules of engagement" (answer only from files and cite the file name; otherwise "No data found in files."). CLAUDE.md stays the map, and rules Greg names for it live there; `5-brain/routers/workspace.md` keeps a pointer, not a copy. (2) The HQ update (`boulon-hq-update`) runs after every exchange for every project (workshop segmentation, ZBB, learning), not only BOULON; HQ got a Projects tab. (3) End of day writes `5-brain/handoffs/<date>-eod-handoff.md` in the `/ecc:resume-session` briefing format and the morning check reads it by name; the automatic ECC session-data files are no longer trusted as the hand-off.

**Why:** Greg: "he literally said to place them in your claude.md" and "that line is not a hard limitier"; "how come boulon hq is not up to date?"; the 10-28 morning check missed the previous day's context because the save files held only task titles.
