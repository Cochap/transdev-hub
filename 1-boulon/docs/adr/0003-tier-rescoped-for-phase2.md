# ADR 0003: Search plan re-checked for Phase 2 (stay on Basic, one re-decision at go/no-go)

- **Status:** Proposed (Greg to confirm, then submit the v2 ticket)
- **Date:** 2026-09-24
- **Evidence:** `1-boulon/docs/phase2-scope-sizing-2026-09-24.md`, `1-boulon/docs/azure-tiers-verified-2026-09-24.md` (Microsoft price list and Learn pages, checked 2026-09-24)

## Context
ADR 0001 was sized for manuals only. At the meeting, Pierre added Phase 2 and advised that if a bigger plan will be needed, we should take it from the start.

## Options
1. **A: Basic now, with a MIR prototype as a second index, and one re-decision at go/no-go.** CAD $102.20/month.
2. B: Basic for manuals, with Phase 2 on its own service.
3. C: S1 from the start. CAD $339.96/month.

## Decision
Option A.

## Why
- Microsoft confirms Basic → S1 is an in-place switch: no rebuild, same address.
- Every realistic Quebec scenario fits Basic.
- No MIR data can be loaded until Alex provides an export and the data quality check is done, so S1 would sit idle at +$2,853/year.
- Pierre's intent (no repeated plan changes) is kept: at most one jump, sized on measured data.

## Would flip to C if
- IT requires private endpoints.
- US or all-Canada data is confirmed within 6 months.
- Copilot Studio can't filter, so more than 15 indexes would be needed.

2026-09-29: privacy/Law 25 items removed; Greg confirmed with the privacy officers and authorities that they do not apply.
