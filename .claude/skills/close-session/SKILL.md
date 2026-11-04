---
name: close-session
model: sonnet
description: Use when Greg wants to close, archive or delete a Claude session before end of day ("close this session", "I'm done with this one", "can I delete this", "wrap this up"). Extracts everything worth keeping from that one session into the second brain, writes a ledger line, and says whether it is safe to archive or delete. Full day-close is boulon-end-of-day.
---
# Close one session safely (session hygiene)

Goal: nothing in the session is lost, nothing is stored twice, and the next session starts lean from files, not from history. After this runs, deleting the session costs nothing.

## Steps
1. **Pick the session.** Default: the current one. Otherwise by title or id from `mcp__ccd_session_mgmt__list_sessions` (load via ToolSearch).
2. **Freeze a copy.** Run `node 5-brain/scripts/eod-gather-sessions.js` (today). It writes the trimmed transcript to `5-brain/logs/eod/<date>/<id>.md` and `_index.json`. That file survives the session being deleted, and end of day will still find it.
3. **Digest it.** Under 15k chars: read it yourself. Longer: one `model: sonnet` helper with the brief from `boulon-end-of-day` section 0 step 4 (ALL items a to m: unfinished requests (k), don't-retry (l) and ideas (m) included). Append (m) to this week's ideas file now. Save the result as `5-brain/logs/eod/<date>/<id>.digest.md` (first line: `Closed <HH:MM> by close-session`); end of day merges this file instead of re-reading the session.
4. **Route it now,** using the table in `boulon-end-of-day` section 1 (decisions to continuity log or ADR, facts to the right doc, corrections to memory, rules to `5-brain/routers/workspace.md`, brain-level decisions to `5-brain/decisions/log.md`, open items to `RESUME.md` and the HQ "Your move" card). Update an existing file before creating a new one.
5. **Keep the map true.** If the session created files or folders: `node 5-brain/scripts/brain.js build` then `audit` (0 unrouted, 0 stale, 0 map gaps). New kind of thing or new recurring question: add a row to `CLAUDE.md`.
6. **Ledger.** Append one line to `5-brain/logs/closed-sessions.md` (create with a heading and a header row if missing): `date | title | session id | routed to (files) | open items | safe to archive? (yes/no)`.
7. **Say it plainly,** full absolute paths (C:\TRANSDEV HUB\...): what was saved where, open items (and who they wait on), safe to archive yes/no, and a one-line starter prompt for the next session if the work continues.

## What this skill never does
Never archives or deletes the session itself (Greg does, or says so). Never runs the full end-of-day. Never writes keys. If the session still has unfinished work, say "not safe to close" and put the open thread in `RESUME.md` first.

## Hygiene rules (the habit)
- One task per session; new task, new session. Name the session (title) so the ledger is readable.
- Close when the task is done, when the topic changes, or when the session gets long and slow (many files read, repeated re-explaining, compaction warnings). Do not keep a session open "just in case": state lives in files (`CLAUDE.md` map, `RESUME.md`, continuity log, memory).
- Order: close-session, then archive (reversible), then delete after a week if nothing was missed. Delete only when the ledger says routed.
- Mid-task: do not close; run `ecc:save-session` or put the thread in `RESUME.md`, then start fresh.
- Never delete a session that shows open items in the ledger, or one that is running.
- End of day reads the ledger, so closed sessions are not routed twice and still appear in "Sessions today".
