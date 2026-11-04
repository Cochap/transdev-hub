---
title: D22 — option A, connect everything by keys
type: decision
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/it-requests/2026-09-24-azure-search-plan.md]
---

**Bottom line:** when [[greg-riley]] sent the Azure ticket on 2026-09-25 he chose option A, all connections by key (like the pilot), instead of keyless (managed identity) connections.

- Why it is safe: option A works with keys either way, so if the sent text still contains the managed-identity lines (system-assigned identity, Cognitive Services User role) that is harmless.
- Keys are pasted into `.env` by Greg only and never written in docs ([[azure-search-index]]).
- Keyless billing would have had "no region requirements" on paper, but was dropped for PDF reading because Document Intelligence does not exist in Canada East ([[decision-d4b-canada-central]]).
- The D22 label itself comes from [[decision-register]]; the ticket file states "option A (all keys)". Exact D22 wording beyond that: (unverified).

## Related
[[azure-ticket-77048]] · [[it-request-2026-09-24-azure-search-plan]]
