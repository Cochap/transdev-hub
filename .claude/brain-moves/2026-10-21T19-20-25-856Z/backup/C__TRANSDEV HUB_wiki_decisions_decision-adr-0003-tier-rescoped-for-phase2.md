---
title: ADR 0003 — Stay on Basic, one re-decision at go/no-go
type: decision
status: proposed
updated: 2026-09-30
sources: [../../1-boulon/docs/adr/0003-tier-rescoped-for-phase2.md, ../../1-boulon/docs/phase2-scope-sizing-2026-09-24.md, ../../1-boulon/docs/azure-tiers-verified-2026-09-24.md]
---

**Bottom line:** Proposed 2026-09-24 (awaiting Greg's confirmation and the v2 ticket): choose Option A, Basic now with a MIR prototype as a second index, and re-decide the tier once at go/no-go on measured data.

## Options
A: Basic now plus MIR as a second index, one re-decision (CAD 102.20/month on the East meter). B: Basic for manuals, Phase 2 on its own service. C: S1 from the start (CAD 339.96/month).

## Why A
- Basic to S1 is an in-place switch: no rebuild, same address.
- Every realistic Quebec scenario fits Basic ([[phase-2-sizing-scenarios]]).
- No MIR data can load until [[alex-dumenne]] provides an export and data quality is checked; S1 would sit idle at +CAD 2,853/year.
- [[pierre-zivec]]'s intent (no repeated changes) holds: at most one jump ([[decision-d4a-pick-plan-once]]).

## Would flip to C if
IT requires private endpoints; US or all-Canada data is confirmed within 6 months; Copilot Studio cannot filter so more than 15 indexes are needed ([[phase-2-risks-and-flip-conditions]]).

**Note:** prices in this ADR use the Canada East meter; the ticket later switched to Canada Central (Basic 112.42, S1 373.98) ([[decision-d4b-canada-central]]). Same 2026-09-29 note: privacy/Law 25 lines removed.

## Related
[[azure-search-tiers]] · [[source-adr-0003]] · [[decision-adr-0001-paid-search-tier-basic]]
