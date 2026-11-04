---
title: Architecture review findings (2026-09-23)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/review-architecture.md]
---

**Bottom line:** four CRITICAL, five HIGH, five MEDIUM and five LOW findings; the big three are silent truncation, a verification layer that was planned but not built, and no golden set or pass mark.

Plain words: findings from `ecc:architect`'s review of the whole BOULON design, ranked by severity. Summary page: [[review-architecture]].

## CRITICAL
- **C1 silent truncation:** two manuals cut at 262,144 characters; two excluded; the indexer is set so it reports "Success" whatever fails (`maxFailedItems: -1`). Fix: coverage report, split or higher tier, set it to 0, check on every re-index ([[tier-limits]]).
- **C2 verification layer not built:** Step 1.6 was marked done in one day; only settings plus instructions exist ([[abstention]]).
- **C3 no golden set, pass mark or sign-off criteria** ([[golden-set]]).
- **C4 T3 scored wrong:** a correct abstention would have been marked a failure; already fixed.

## HIGH
- H1 page citation exists in the index but unverified in the agent ([[citation-projection]]).
- H2 no fallback for manuals not indexed: publish a coverage list; do not re-enable SharePoint.
- H3 specialist-agent split is the wrong split: keep one agent and one index.
- H4 access control: query key for Copilot Studio, admin key for Claude only, Entra sign-in limited to a mechanics group.
- H5 full-corpus cost not modelled ([[manuals-library]]).

## MEDIUM
M1 French and English untested (add a French analyzer only if tests show misses); M2 no update or re-index process; M3 no monitoring or mechanic feedback (thumbs up/down reviewed weekly); M4 default chunking ([[chunking]], [[torque-tables]]); M5 Copilot Studio's use of semantic ranking unverified ([[semantic-reranker]]).

## LOW
L1 recount the index-facts table (24 versus 23); L2 pick one abstention wording; L3 the "Safety first" opener may be tuned out; L4 check GPT-4.1 retirement date; L5 close the Orion pressure-release item.

## Outcome
Phase 2 as specialist agents was dropped in favour of one agent plus one index ([[phase-2-cmms-diagnosis]] now covers Phase 2).

## Related
[[review-findings-rag-pipeline]] · [[phase-1-manuals-pilot]]
See also the seven assumptions it tested: [[assumptions-log]].
