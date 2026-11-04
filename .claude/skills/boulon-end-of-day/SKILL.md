---
name: boulon-end-of-day
model: sonnet
description: Use when Greg says "end of day" (or around 16:45, or the scheduled routine fires). Reads EVERY Claude Code conversation of the day (all projects), routes what was said into the second brain (numbered folders 1-boulon to 9-archive), checks the health of the brain itself (map, routers, hops, memory, clutter), runs the continuous-improvement loop (learn-eval, repeated corrections, improvement backlog), then closes the day (HQ, RESUME.md, ecc:save-session). For closing ONE session mid-day use close-session instead.
---
# End of day: close the day AND improve the brain

The day's truth is the conversations, not only the logs. Gather them, route what they produced, then ask: did the brain make today's work easier or harder, and what one change would help tomorrow?

The brain (map: `CLAUDE.md`): `1-boulon/` BOULON · `2-projects/` pointers · `3-media/` · `4-learning/` · `5-brain/` (routers, scripts, logs, context, decisions, improvements) · `9-archive/`. Root keeps only `CLAUDE.md`, `RESUME.md`, `boulon-hq.html`, `ROUTER.md`, `AGENTS.md`, `.env*`, `.claude/`.

## 0a. Guard and time budget (do this first, every run)
1. Run `node 5-brain/scripts/eod-lock.js start`. It prints one word: `GO` (continue), `RUNNING` (another end of day started under 60 minutes ago: stop, say so in one line, touch nothing), `DONE` (today is already closed: stop unless Greg asked for a re-run in his own words), `EARLY` (before 15:30, a catch-up fired at app start: close only past days that have no hand-off, then stop; never write today into `.eod-done`).
2. Greg starts at 16:30 and leaves at 17:00. Budget: sections 0, 1 and 4 (the close) within 25 minutes. Sections 2 and 3 run in SHORT form Monday-Thursday (marked below); the full form runs on Friday, or when Greg asks for "full end of day".
3. Time savers: never re-read extracts of earlier end-of-day runs, scheduled routines or auto-summaries (the gather script already drops them); one helper per long session, all launched in ONE message; never `python -` (hangs); no `/ecc:learn-eval`, `/ecc:save-session` or hop test on short days.
4. Last step of section 4: `node 5-brain/scripts/eod-lock.js done` (writes `.eod-done`, removes the lock). On an error, still run `node 5-brain/scripts/eod-lock.js release` so tomorrow is not blocked.

## 0. Gather every session of the day
1. Run `node 5-brain/scripts/eod-gather-sessions.js` (add `YYYY-MM-DD` for a past day). It writes one trimmed file per session to `5-brain/logs/eod/<date>/` plus `_index.json`. Extracts survive even if a session is later deleted.
2. Read `5-brain/logs/closed-sessions.md` (ledger written by `close-session`). Sessions already listed there are routed: do not read their extract or launch a helper, and do not route them again. Instead paste their `<id>.digest.md` (written by `close-session`, items a to m) into today's `_digest.md`, so their failures, corrections, don't-retry items, unfinished requests and ideas still feed sections 3 and 4; list them in "Sessions today". Exception: if the session kept going after its close (its extract continues past the close-session run), read and digest only that later part. No `<id>.digest.md` (closed before 2026-11-04): read the extract as usual.
3. Cross-check with `mcp__ccd_session_mgmt__list_sessions` (load via ToolSearch): any session with `lastActivityAt` today missing from the index is read with `search_session_transcripts` or `export_transcript`. Sessions started by other sessions (`startedBy`) count. The current session counts.
4. Read each file not already covered by step 2. Under 15k chars: read yourself. Longer: one `model: sonnet` helper per session, in parallel, brief: "Read <file>. Return: (a) one-line purpose, (b) decisions Greg made, (c) new facts, (d) work done + files changed, (e) open items / waiting on whom, (f) failures and fix, (g) corrections or preferences Greg stated about how Claude should work, (h) anything for Greg's learning, (i) anything that was hard to find in the workspace (blind search, wrong folder, more than 3 hops), (j) new files or folders created and where, (k) every request Greg made that was interrupted, unanswered or only half done (quote it), (l) approaches that failed and must not be retried, (m) every new idea Greg floated (even in passing, or starting "idea:"), with its status. Append (m) to this week's `5-brain/ideas/<year>-W<week>-ideas-and-tasks.md` (section 1, or section 4 if not started). No keys, nothing sensitive." Combine into `5-brain/logs/eod/<date>/_digest.md`.
5. Skip sessions that only repeat the end-of-day prompt.

## 1. Route what was produced
| What | Goes to |
|---|---|
| BOULON status, fix tracker, new standing rules | `1-boulon/docs/continuity-log.md` (section 3, 4, 6; section 1 for rules) |
| What was done, blockers, who we wait on | `1-boulon/docs/timeline.md` end-of-day row (each session by title) |
| Failure, fix, where enforced | `1-boulon/docs/lessons-YYYY-MM-DD.md` |
| Decision Henri could audit | `1-boulon/docs/adr/NNNN-*.md` (`ecc:architecture-decision-records`) |
| Brain/AIOS-level decision (layout, rules, tooling) | `5-brain/decisions/log.md` |
| Standing rule | one place only: `5-brain/routers/workspace.md` (Standing rules); mirror BOULON ones in continuity log section 1 |
| Greg's corrections, preferences | memory `C:\Users\rilg01\.claude\projects\C--TRANSDEV-HUB\memory\` (update an existing file first; one line in `MEMORY.md`) |
| People facts | `5-brain/context/people.md` |
| ZBB sessions (cwd `C:\ZBB`) | `C:\ZBB\wiki\log.md` + matching wiki page; follow `C:\ZBB\CLAUDE.md`; aggregate facts only |
| Learning sessions | `4-learning/LEARNING.md` log; new concept card in `4-learning/matrix-cheatsheet.html`, republish with its `url` |
| DAILY DIGEST / news | one timeline line; BOULON-relevant ideas to continuity log section 3 |
| Drafts for colleagues, tickets | timeline row with status (sent / draft / waiting); French rules apply |
| Work Greg must do tomorrow | HQ "Your move" card |
| No home | continuity log section 6 "Unfiled", and say so in the reply |

Rules: never write keys; never contradict brief 551 (log the conflict); respect ZBB data rules; if sessions disagree, record both and flag it.

## 2. Brain health (the second brain checks itself)
SHORT form (Mon-Thu): item 1 only, plus a map row for anything new today (item 2). Write the other checks as one line "deferred to Friday" in `5-brain/improvements.md`.
Full form (Friday or on request): do all of these, fix what is safe, list what needs Greg.
1. **Routed:** `node 5-brain/scripts/brain.js build` then `audit`. Target: 0 unrouted, 0 stale, 0 map gaps.
2. **Map up to date:** every new project, folder, file kind, skill or recurring question from today (digest item j) has a row in `CLAUDE.md` section 1 or 2. Add it. `CLAUDE.md` stays a map: no rules, about 120 lines or fewer.
3. **Hop test:** take up to 3 questions Greg actually asked today (digest item i first). Trace each using only `CLAUDE.md` and routers. Count router opens. Target: 3 or fewer from `CLAUDE.md`, no blind search. If worse: add a keyword to the map row, or a direct deep link. Log results in `5-brain/improvements.md` under "Map test log".
4. **Clutter:** anything new at the vault root, or in a numbered folder where it does not belong, or any folder over about 60 files with no sub-grouping, is proposed (not moved) as an entry in `5-brain/routers/moves.json` for `brain-move.js plan`. Moves need Greg's yes.
5. **Memory and rules:** `MEMORY.md` stays one line per memory; merge duplicates; a rule that lives in two places gets one home and a pointer; a memory contradicted by today's sessions is corrected or deleted.
6. **Sessions:** list sessions now safe to archive: extract exists and routed, no open items. Never archive or delete for Greg unless he says so.

## 3. Continuous improvement
SHORT form (Mon-Thu): only item 2 for corrections Greg stated today (promote a repeat to memory) and item 4 (one backlog line). Full form: all items.
1. Run `/ecc:learn-eval` on the WHOLE WEEK's digests (every `5-brain/logs/eod/<date>/_digest.md` since the last full-form run, Monday to today; Mon-Thu never run it), not only today's; skip what is already a skill or memory. If a past day has no `_digest.md` (missed run), digest its extracts first.
2. Calibrate pass (same idea as the `calibrate` skill, over ALL of today's digests): a correction that appears twice (today or in `5-brain/improvements.md` history) is promoted to memory, a skill edit, or a map row. A workaround done by hand 3 times is a skill candidate (the Friday `routine-recos` task also collects these).
3. `/note list`: if 3 or more notes are parked on skills, offer `/note apply`.
4. Update `5-brain/improvements.md`: new proposals under "Open" (date, what, why, evidence, size S/M/L), mark applied ones, move declined ones. Apply automatically only the safe kind (map rows, router rebuild, memory dedupe, ledger notes). Skill edits, folder moves and rule changes: propose, apply on Greg's yes.
5. Keep the loop honest: each day's reply says what got easier or harder in the brain (hop test numbers) and the one change proposed for tomorrow.

## 4. Close the day
1. BOULON HQ: "Your move" becomes tomorrow's first action in full tutorial format (`boulon-greg-steps`); update headline and feed; republish with `url` https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9 (`boulon-hq-update`).
2. Hand-offs register: `5-brain/handoffs/INDEX.md` lists the newest hand-off per area. Today's sessions may have written new ones (`C:\ZBB\docs\HANDOFF-*.md`, `5-brain/handoffs/`, other project folders): update the table row to point at the newest, and never leave two "newest". `RESUME.md` must link to that table, and say which areas had NO activity today. `RESUME.md`: where we are, what waits on Greg, Claude's next steps, links to HQ, report, logs; "Sessions today" list (title, project, one-line outcome, safe to archive yes/no).
3. Write the morning hand-off `5-brain/handoffs/<date>-eod-handoff.md` in the `/ecc:resume-session` briefing sections, every section filled in: one block per active project with WHAT WE'RE BUILDING, WORKING (with file paths), IN PROGRESS, NOT STARTED, WHAT NOT TO RETRY (digest item l), UNFINISHED GREG REQUESTS (digest item k, quoted), OPEN QUESTIONS, NEXT STEP, CONTEXT TO LOAD (paths of the digest, extracts and status files). Copy it to `~/.claude/session-data/<date>-eod-session.tmp` so `/ecc:resume-session` also finds it. Then run `ecc:save-session` (Friday / full form only; the .tmp copy above is what resume-session reads). Also update the "Morning hand-off" row in `5-brain/handoffs/INDEX.md` to today's date: the morning check reads the newest hand-off file, so a missing file breaks tomorrow. The automatic ECC summaries in session-data hold only task titles, so they never count as the hand-off.
4. Run `node 5-brain/scripts/eod-lock.js done` (writes today's date to `.claude/hooks/.eod-done`, removes `.eod-running`, stops the reminder hook `.claude/hooks/eod-reminder.js`). Only after the hand-off file exists (the script refuses otherwise).
5. Reply to Greg, full absolute paths for every file (C:\TRANSDEV HUB\...): sessions read (count, titles); what went where (one line per destination); brain health (audit result, hop test numbers, clutter proposals); improvements applied and proposed (needs yes); sessions safe to archive; unfiled items; tomorrow's first 2-3 actions.

## Scheduled run
Task `boulon-end-of-day-routine` fires weekdays 16:10 (plus up to 3 min jitter) so the close is done by about 16:35. If Greg says "end of day" himself while it runs, the lock answers `RUNNING`: tell him it is in progress and link the run. If the app was closed it runs at next launch (`EARLY` guard); `eod-reminder.js` (from 16:40, lock-aware) is the backup.
