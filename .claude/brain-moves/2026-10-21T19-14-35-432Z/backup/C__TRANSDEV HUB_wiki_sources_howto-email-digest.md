---
title: Source — how-to: morning email digest (Power Automate)
type: source
status: retired
updated: 2026-09-30
sources: [../../docs/howto-email-digest.md, ../../CLAUDE.md]
---

**Bottom line:** a click-by-click guide (2026-09-25) to a Power Automate flow that copies keyword-matched email summaries to OneDrive `BOULON-inbox` at 6:00 each morning so Claude knows ticket numbers and replies. Greg later dropped it as too tedious ([[feedback-no-tedious-power-automate]]); treat the guide as retired reference.

## What the source says
- Scheduled cloud flow, daily 6:00: Get emails (V3), Top 50, keyword search query; Create HTML table (Received, From, Subject, Body Preview only, not the full body); Create file in `BOULON-inbox` named `digest-YYYY-MM-DD.html`.
- About 15 minutes once, cost $0 (connections included with Microsoft 365), no install. Access check in step 1: if no licence or no Create menu, stop and Claude switches to a plan not needing Power Automate.
- The session-start hook and the `boulon-morning-check` skill read the newest file ([[skill-boulon-morning-check]]).

**Status note:** root `CLAUDE.md` still lists this doc as the live digest route, but Greg dropped it (recorded in [[feedback-no-tedious-power-automate]], which also notes the Claude Microsoft 365 connector is not allowed by Transdev; see [[company-it-constraints]]).

## Related
[[feedback-no-tedious-power-automate]] · [[skill-boulon-morning-check]] · [[retired-items]]
