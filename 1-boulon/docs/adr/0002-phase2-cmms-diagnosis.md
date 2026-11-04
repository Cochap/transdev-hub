# ADR 0002: Phase 2 = diagnosis help from maintenance history (CMMS)

- **Status:** Accepted (direction set by Pierre on 2026-09-24)
- **Date:** 2026-09-24
- **Sources:** `1-boulon/docs/meeting-2026-09-24-pierre.md` (decisions D15–D18), `1-boulon/docs/phase2-plan-cmms.md`

## Context
Manuals tell you how to repair something. The maintenance history (work orders in the CMMS/GMAO) tells you what usually caused a given symptom on our own fleet.

## Decision
- From the driver's symptom, BOULON gives the likely causes and the recommended diagnostic method ("check this first"). It never claims certainty.
- It is a separate, expert-only agent, tested by expert mechanics.
- **MIR (Quebec) first**, via Alex Dumenne. Hexagone/A-Tune (West) comes later via Samir Macarem: Henri makes the intro, likely in November, after the ~Oct 5 go-live.
- Results are filtered by vehicle type and region. Fleets are never mixed.

## Consequences
- New resources are needed later: see `1-boulon/docs/phase2-scope-sizing-2026-09-24.md`, section "Other Phase 2 needs".

2026-09-29: privacy/Law 25 items removed; Greg confirmed with the privacy officers and authorities that they do not apply.
