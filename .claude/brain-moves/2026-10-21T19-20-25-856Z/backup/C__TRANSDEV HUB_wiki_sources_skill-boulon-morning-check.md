---
title: Source — skill boulon-morning-check
type: source
status: current
updated: 2026-09-30
sources: [../../.claude/skills/boulon-morning-check/SKILL.md]
---

**Bottom line:** the project skill (extracted 2026-09-25) for the first exchange of each BOULON day: Claude prepares the workspace itself instead of asking Greg for status. Catalogued in [[skills-catalog]].

Steps: read `RESUME.md`, continuity log sections 3-4 and the end of `1-boulon/docs/timeline.md`; read the newest overnight digest in OneDrive `BOULON-inbox` if present and log ticket numbers and replies (never ask Greg to relay them, see [[rules-index]]); check the Azure search service (a request without a key returning 401 means it is up) and the `.env` key length (52 characters = real key) without printing it; repair garbled log table rows; confirm `.claude/hooks/.eod-done` holds a past date; refresh BOULON HQ with the existing `url`; add a dated timeline line; reply with a short summary then next actions.

Note: the digest step depends on the Power Automate flow from [[howto-email-digest]], which Greg dropped ([[feedback-no-tedious-power-automate]]); skip it when no digest exists.

## Related
[[skills-catalog]] · [[claude-operating-model]] · [[howto-email-digest]]
