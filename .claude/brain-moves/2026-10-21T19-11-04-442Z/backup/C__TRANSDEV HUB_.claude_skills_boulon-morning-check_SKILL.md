---
name: boulon-morning-check
description: "Use when Greg opens a new BOULON session (\"good morning\", \"new session\", \"prep the workspace\") ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â reads the hand-off and overnight inbox digest, checks services and keys, fixes log drift, and refreshes BOULON HQ without asking Greg for status."
metadata:
  origin: auto-extracted
---

# BOULON morning check

**Extracted:** 2026-09-25
**Context:** First exchange of each BOULON day. Greg wants to arrive to a ready workspace, not be asked what happened.

## Problem
Each morning Claude re-derived the state by hand and then asked Greg for things it could look up, such as ticket numbers or colleagues' replies.

## Solution
1. Read `RESUME.md`, then `docs/continuity-log.md` Ãƒâ€šÃ‚Â§3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“4, then the end of `docs/timeline.md`.
2. Read the overnight inbox digest, if present: `C:\Users\rilg01\OneDrive - TRANSDEV\BOULON-inbox\` (newest file). Pull out ticket numbers and statuses, replies from Henri, Pierre, Alex and IT, and approvals. Log them. Never ask Greg to relay what the digest already says (memory `feedback-self-serve-status`).
3. Check the Azure search service. A request without a key should return 401, which means the service is up. Check the `.env` key length (52 characters = a real key) without printing it. A placeholder is fine when no Azure step is planned today.
4. Scan the log for garbled table rows (for example a `| 1.9 |` repeated inside one cell) and repair them.
5. Confirm `.claude/hooks/.eod-done` holds a past date, so today's 16:45 reminder fires.
6. Refresh BOULON HQ (`boulon-hq-update`): set a new `today` block, flip `week` states, clear finished items. Publish with the `url`.
7. Add a dated line to the timeline running log.
8. Reply with a short summary, then the next actions (memory `feedback-scannable-endings`).

## When to Use
The first message of a BOULON day, or after a restart.
