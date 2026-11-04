---
name: boulon-end-of-day
model: haiku
description: Use when Greg says "end of day" (or around 16:45, or the scheduled routine fires). Reads EVERY Claude Code conversation of the day (all projects, not just this one), routes what was said to the proper places (continuity log, timeline, lessons, memory, ADRs, ZBB wiki, learning notes, HQ, RESUME.md), then closes the day with ecc:save-session.
---
# End of day

The day's truth is the conversations, not only the logs. Gather them all first, then route.

## 0. Gather every session of the day
1. Run `node scripts/eod-gather-sessions.js` (add `YYYY-MM-DD` for a past day). It scans `~/.claude/projects/*` (BOULON, ZBB, DAILY DIGEST, anything), keeps sessions where Greg wrote a message that local day, and writes one trimmed file per session to `logs/eod/<date>/` plus `_index.json`.
2. Cross-check with `mcp__ccd_session_mgmt__list_sessions` (load via ToolSearch): any session with `lastActivityAt` today that is missing from the index ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ read it with `search_session_transcripts` or `export_transcript`. Sessions started from other sessions (`startedBy`) count too. The session you are in counts too (its file is in the index).
3. Read each file. Short ones (< 15k chars) you read yourself. For longer ones, spawn one sonnet helper per session (`model: sonnet`, run in parallel) with this brief: "Read <file>. Return: (a) one-line purpose, (b) decisions Greg made, (c) new facts learned, (d) work done + files changed, (e) open items / waiting on whom, (f) failures ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ fix, (g) corrections or preferences Greg stated about how Claude should work, (h) anything for Greg's learning. Quote nothing sensitive; no keys." Put the digests together in `logs/eod/<date>/_digest.md`.
4. Skip sessions that only repeat the end-of-day prompt itself.

## 1. Route each item to its place
| What the sessions produced | Goes to |
|---|---|
| BOULON status changes, fix tracker, new standing rules | `docs/continuity-log.md` Ãƒâ€šÃ‚Â§3, Ãƒâ€šÃ‚Â§4, Ãƒâ€šÃ‚Â§6 (Ãƒâ€šÃ‚Â§1 for rules) |
| What was done, by whom, blockers, who we wait on | `docs/timeline.md` end-of-day row (list each session by title) |
| Failure ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ fix ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ where enforced | `docs/lessons-YYYY-MM-DD.md` |
| A decision Henri could audit | `docs/adr/NNNN-*.md` (see `ecc:architecture-decision-records`) |
| Greg's corrections, preferences, constraints | memory (`~/.claude/projects/C--TRANSDEV-HUB/memory/`; update an existing file before creating one; add to `MEMORY.md`) |
| Something that recurred twice | update or create a project skill |
| ZBB sessions (cwd `C:\ZBB`) | `C:\ZBB\wiki\log.md` plus the matching wiki page (`index.md` lists them); follow `C:\ZBB\CLAUDE.md`; aggregate facts only, never raw rows |
| Learning sessions (course, DAILY DIGEST learning picks) | `LEARNING.md` progress log; each new concept ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ card in `learning/matrix-cheatsheet.html`, republish with its `url` |
| DAILY DIGEST / news-scan sessions | one line in the timeline row; anything with a BOULON use ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ continuity log Ãƒâ€šÃ‚Â§3 "ideas" |
| Messages drafted for colleagues, tickets | note in the timeline row with status (sent / draft / waiting); French rules apply |
| Work Greg must do tomorrow | HQ "Your move" card |
| Items with no home | continuity log Ãƒâ€šÃ‚Â§6 under "Unfiled", and say so in the final reply |

Rules: never write keys; never contradict the project brief 551 (log the conflict instead); respect the ZBB data rules; if two sessions disagree, record both and flag it.

## 1b. Keep the brain routed
Run `node scripts/brain.js build`, then `node scripts/brain.js audit`. Anything it still lists as unrouted or stale goes in the final reply. New projects or folders that appeared get a line in `routers/` and `CLAUDE.md`.

## 2. Close the day
5. Run `/ecc:learn-eval` (or do its review by hand) on the day's lessons; skip what is already a skill or memory today.
6. BOULON HQ: the "Your move" card becomes tomorrow's first action in full tutorial format (`boulon-greg-steps`). Update the headline and feed; republish with `url` https://claude.ai/artifact/JDWKdtCmSNLTUuZnZAtmB9 (`boulon-hq-update`).
7. `RESUME.md`: where we are, what's waiting on Greg, Claude's next steps, links to HQ, the report, and the logs, plus a "Sessions today" list (title, project, one-line outcome).
8. Run `ecc:save-session`.
9. Write today's date (local YYYY-MM-DD) to `.claude/hooks/.eod-done`. This stops the 16:45 reminder hook (`.claude/hooks/eod-reminder.js`).
10. Reply to Greg: sessions read (count and titles), what went where (one line per destination), anything unfiled, new skills or memories, and tomorrow's first 2ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“3 actions.

## Scheduled run
A scheduled task `boulon-end-of-day-routine` fires weekdays at 16:45 and runs this skill. If the app was closed, it runs at next launch; the `eod-reminder.js` hook is the backup.
