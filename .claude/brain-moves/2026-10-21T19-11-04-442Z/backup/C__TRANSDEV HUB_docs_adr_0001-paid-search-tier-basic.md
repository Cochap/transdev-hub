# ADR 0001: Move from Free to the paid Basic search plan (D4)

- **Status:** Accepted (approved in principle by Pierre on 2026-09-24; becomes official when he approves the IT ticket)
- **Date:** 2026-09-24
- **Deciders:** Pierre (spending), Henri (oversight), Greg (lead)

## Context
The Free Azure AI Search service is 90% full with 23 manuals. It cuts each file off after about 262,000 characters, and Microsoft can delete it if it sits unused. The library has 3,052 files (core 150–300). Details: `docs/d4-tier-decision.md`.

## Options
1. Stay on Free: not possible, because it's already full.
2. **Basic** (CAD $102.20/month, Canada East).
3. S1 (CAD $339.96/month).
4. Serverless (priced since 2026-09-13; caps vectors at 300 MB per index).

## Decision
Basic, in Canada East, with a $150/month spending alert. Free stays running until Basic passes every test.

## Why
It is the smallest plan that holds the full library. Pierre: « 100 balles par mois, ce n'est pas du tout le sujet ». D4a: if the plan must change again, jump straight to one big enough. See ADR 0003.

## Consequences
- Needs an IT ticket (`docs/it-requests/2026-09-24-azure-search-plan.md`).
- The v2 rebuild (`rebuild/v2/`) runs on Basic.
