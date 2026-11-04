---
title: Source — Lessons of 2026-09-24
type: source
status: current
updated: 2026-09-30
sources: [../../docs/lessons-2026-09-24.md]
---

**Bottom line:** ten failures, mostly around the Azure ticket (wrong region, missing one-time cost, unclear wording), each with its enforced fix.

Plain words: the day the Azure purchase ticket went through five versions. The lessons are about checking every resource's region against official tables, bundling costs in one request, and writing ticket lines Greg fully understands.

## Key facts
- The ticket was called ready while asking for Canada East, which has no AI enrichment; it moved to Canada Central after a region check of every resource (DNS lookups plus portal).
- The one-time indexing cost had been left out of the ticket; monthly and one-time costs now go together.
- One connection style for everything (all keys, option A) instead of mixing managed identity and keys.
- Never claim something is blocked from indirect evidence: the embedding model IS available in Canada Central, gpt-5-mini is not.
- Verify Greg's access rights before proposing a solution that needs them.
- The 16:45 end-of-day reminder now repeats until the end-of-day skill writes a marker file.
- What worked: DNS lookups revealed each resource's region (the pilot search service is in East US); Microsoft's price list pulls with `curl --ssl-no-revoke` on the company network ([[company-it-constraints]]).

## Related
[[lessons-learned]] · [[azure-ticket-77048]] · [[tier-limits]]
