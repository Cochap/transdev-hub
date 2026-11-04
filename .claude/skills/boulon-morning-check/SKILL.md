---
name: boulon-morning-check
description: "Use when Greg opens a new BOULON session (\"good morning\", \"new session\", \"resume from yesterday\", \"prep the workspace\"), or when the session-start hook says so. Reads the newest end-of-day hand-off and digest, the overnight inbox digest, checks services and keys, fixes log drift, and refreshes BOULON HQ without asking Greg for status."
metadata:
  origin: auto-extracted
---

# BOULON morning check

**Extracted:** 2026-09-25
**Context:** First exchange of each BOULON day. Greg wants to arrive to a ready workspace, not be asked what happened.

## Problem
Each morning Claude re-derived the state by hand and then asked Greg for things it could look up, such as ticket numbers or colleagues' replies.

## Solution
0. Load the last day the way `/ecc:resume-session` does, but from the files that hold the real context. Last closed day D = the date of the NEWEST `5-brain/handoffs/*-eod-handoff.md` file (not `.eod-done` alone: a catch-up or failed run can leave the two out of step; if they disagree, say so in one line and use the newest hand-off). If D is more than one workday ago, also read the `_digest.md` of every day between D and today in `5-brain/logs/eod/`. If yesterday (a workday) has extracts but no hand-off, the close failed: say so first and offer to run it now (`node 5-brain/scripts/eod-lock.js start` guards it). Read in this order, all of them, before replying: (a) `5-brain/handoffs/D-eod-handoff.md`; (b) `5-brain/logs/eod/D/_digest.md`; (c) in full, every extract in `5-brain/logs/eod/D/` whose session is NOT safe to archive, and look for Greg requests that were interrupted or never answered; (d) the status file `5-brain/handoffs/INDEX.md` names for each area active on D (ZBB included). Do NOT rely on `~/.claude/session-data/*.tmp`: those are automatic ECC summaries (task titles only, "Notes for Next Session: -"), and the newest one is usually this morning's own session. When Greg asks for meeting or progress prep, group the progress of ALL projects (BOULON, ZBB, Digest, learning), not only BOULON.
1. Read `RESUME.md`, then `1-boulon/docs/continuity-log.md` section 3-4, then the end of `1-boulon/docs/timeline.md`.
2. Read the overnight inbox digest, if present: `C:\Users\rilg01\OneDrive - TRANSDEV\BOULON-inbox\` (newest file). Pull out ticket numbers and statuses, replies from Henri, Pierre, Alex and IT, and approvals. Log them. Never ask Greg to relay what the digest already says (memory `feedback-self-serve-status`).
3. Check the Azure search service. A request without a key should return 401, which means the service is up. Check the `.env` key length (52 characters = a real key) without printing it. A placeholder is fine when no Azure step is planned today.
4. Scan the log for garbled table rows (for example a `| 1.9 |` repeated inside one cell) and repair them.
5. Confirm `.claude/hooks/.eod-done` holds a past date and remove a leftover `.claude/hooks/.eod-running` from yesterday (`node 5-brain/scripts/eod-lock.js release`), so today's 16:10 close is not blocked.
6. Refresh BOULON HQ (`boulon-hq-update`): set a new `today` block, flip `week` states, clear finished items. Publish with the `url`.
7. Add a dated line to the timeline running log.
8. Reply with the `/ecc:resume-session` briefing for each active project (PROJECT, WHAT WE'RE BUILDING, CURRENT STATE, WHAT NOT TO RETRY, UNFINISHED GREG REQUESTS, OPEN QUESTIONS, NEXT STEP), then the service checks in 3 lines, then the next actions (memory `feedback-scannable-endings`).

## When to Use
The first message of a BOULON day, or after a restart.
