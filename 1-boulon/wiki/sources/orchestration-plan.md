---
title: Source — orchestration plan to Henri sign-off
type: source
status: retired
updated: 2026-09-30
sources: [../../docs/orchestration-plan.md]
---

**Bottom line:** the first full plan (2026-09-23, `ecc:planner`) from "today" to Henri's sign-off on Wed 2026-11-18. Its dates were replaced by [[plan-to-oct16]] the same day; its structure, decision register (D1-D14) and gates are still useful reference.

## What the source says
- BOULON stays one Copilot Studio agent reading one Azure AI Search index, no specialist agents (D3). Safety comes from measurement: a coverage report, a golden set of about 120 fixed questions ([[golden-set]]), and an offline claim checker that flags any number not found word-for-word in a manual.
- Five phases with gates G0-G4: measurement foundation, fix the pilot, full corpus, access/monitoring/mechanic pilot (10-26 to 11-06), Henri sign-off.
- Daily cadence: Claude resumes context, runs the golden set against the index, Greg gets one batched block of 30 minutes or less, Claude writes logs and saves the session. Golden run types: G-index (daily), G-smoke (15 agent answers after any change), G-full (Thursdays and at gates).
- Decision register D1-D14, for example D4 revised 2026-09-23 to Basic plus splitting; D5 sign-off targets; D14 single abstention wording: "I don't have that information in BOULON's manuals — please check with a qualified technician or supervisor." See [[decision-register]].
- Claude's own correction inside the file: the coverage check showed the two "truncated" manuals have chunks through their last indexed pages, so truncation is probably not lost content; the two excluded Vicinity files are still missing.
- Greg's estimated time to sign-off: about 10 hours.

**Superseded:** target date 2026-11-18 replaced by 2026-10-16 ([[plan-to-oct16]], 2026-09-23). The plan also uses `TODAY.md`, retired and replaced by BOULON HQ ([[boulon-hq-control-room]]).

## Related
[[launch-plan-oct16]] · [[decision-register]] · [[ecc-plugin]]
