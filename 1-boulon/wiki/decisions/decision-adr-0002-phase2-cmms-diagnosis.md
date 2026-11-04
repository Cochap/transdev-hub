---
title: ADR 0002 — Phase 2 is diagnosis help from maintenance history
type: decision
status: current
updated: 2026-09-30
sources: [../../docs/adr/0002-phase2-cmms-diagnosis.md, ../../docs/meeting-2026-09-24-pierre.md, ../../docs/phase2-plan-cmms.md]
---

**Bottom line:** Accepted 2026-09-24 (direction set by [[pierre-zivec]]): from a driver's symptom, BOULON proposes likely causes and the recommended diagnostic method ("check this first"), never as certainty. It is the written form of [[decision-d15-d18-phase2-direction]].

## Decision
- A separate, expert-only agent tested by expert mechanics.
- MIR (Quebec) first via [[alex-dumenne]]; Hexagone/A-Tune later via [[samir-macarem]] (Henri makes the intro, likely November, after the about Oct 5 go-live) ([[hexagone-a-tune]]).
- Results filtered by vehicle type and region; fleets never mixed.

## Why
Manuals say how to repair; work-order history says what usually caused a given symptom on Transdev's own fleet.

## Consequences
New resources needed later: see [[phase2-scope-sizing-2026-09-24]], "Other Phase 2 needs".

2026-09-29: privacy/Law 25 items were removed from the ADR; Greg confirmed with privacy officers and authorities that they do not apply ([[feedback-no-invented-compliance]]).

## Related
[[phase-2-cmms-diagnosis]] · [[source-adr-0002]] · [[phase-2-architecture]]
