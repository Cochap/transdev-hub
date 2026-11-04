---
title: Geotab launch film (Transdev Canada)
type: entity
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/geotab-launch-film-prompt.md]
---

**Bottom line:** a planned 32-beat promotional video for the launch of Geotab telematics (vehicle tracking and fleet data) at Transdev Canada, built as code and rendered to video. The prompt is at draft v3 (2026-09-29); no film has been rendered yet according to the source.

## What it is
- One HTML canvas driven by `window.seek(t)`, rendered in headless Chrome at 60 fps; original music synthesized at 120 BPM, 1920x1080. A single container never cuts: it changes size, radius and fill while content swaps, driven by a cursor.
- Sequence (flow C, scored 7/7 checks and 9/9 features on the beat grid): logo, live fleet map, select one bus, speeding / harsh braking / seat belt events, AI driver coaching, lasso the fleet and apply one rule to all, engine fault toast, work order in the mechanics' queue, maintenance reminders for 5 buses, copy-report toast, back to logo (last frame equals first).
- Brand: Transdev red `#DB0717` as the one accent, purple `#392150` sparingly, font Karbon, white logo from transdev.ca.
- Tooling: Playwright 1.63.0 in `C:\TRANSDEV HUB\3-media\film` (installed 2026-09-29 at Greg's request, no admin rights). Geotab features are assumed live at Transdev Canada on Greg's instruction.
- Image gap: real Geotab map and safety screens were not found on the pages checked; they may need Geotab's videos or support site.

Source: [[geotab-launch-film-prompt]]. Workstream view: [[geotab-launch-film-project]].

## Related
[[geotab-launch-film-project]] · [[transdev-quebec]] · [[company-it-constraints]]
