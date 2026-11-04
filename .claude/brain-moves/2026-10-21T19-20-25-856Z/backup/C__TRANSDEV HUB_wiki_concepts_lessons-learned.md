---
title: Lessons learned (2026-09-23 and 2026-09-24)
type: concept
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/lessons-2026-09-23.md, ../../1-boulon/docs/lessons-2026-09-24.md]
---

**Bottom line:** 27 logged mistakes boil down to six habits: test with real evidence, measure before sizing, verify every Azure claim against an official source, write requests Greg can fully understand, bundle costs once, and never let a reminder silently drop.

Plain words: each mistake was turned into a standing rule (a memory, a skill or a CLAUDE.md line) so it does not repeat. Sources: [[lessons-2026-09-23]], [[lessons-2026-09-24]].

## Testing and evidence
- A test passes only with a correct answer AND a citation naming the manual; an index-name citation is a FAIL ([[golden-set]], [[citation-projection]]).
- Build the history from logs, not memory: master timeline plus 111-test ledger ([[project-history]], [[test-ledger]]).
- Only authoritative sources (official availability tables, a real test) may support "this is blocked" claims.

## Sizing and cost
- Measure first: the inventory found 3,052 files, not "100+" ([[manuals-library]]).
- Prove limits with pilot evidence: only the 2 files over 16 MB failed, and text was cut at 262K characters ([[tier-limits]]).
- Check every resource's region (Canada East lacks AI enrichment; moved to Canada Central); include one-time and monthly costs in one request; use one connection style (all keys) ([[azure-ticket-77048]], [[decision-d4-paid-search-tier]]).
- Verify limits on Microsoft Learn: Basic has no SLA with one replica.
- No projections in a report to Henri unless he asks.

## Working with Greg
- Every Greg action is a full click-by-click tutorial with EN and FR labels; ticket lines use plain analogies he understands.
- Money steps go through an approval package for Henri first.
- Software installs on the locked PC need an IT ticket ([[company-it-constraints]]).
- The 16:45 end-of-day reminder now repeats until the end-of-day skill writes a marker file.

## Tooling
- ECC skills do not fire on their own (skill listing overflow, no routing hook); a skill map in CLAUDE.md compensates.
- Some sub-agents cannot write files; use general-purpose agents for writing.
- Direct Line needs the Europe endpoint and a published agent; the sign-in setting blocks it (Henri decides).

## Related
[[rules-index]] · [[boulon-testing]]
