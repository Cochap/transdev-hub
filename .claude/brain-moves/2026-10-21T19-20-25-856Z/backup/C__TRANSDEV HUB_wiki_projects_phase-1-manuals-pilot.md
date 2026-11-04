---
title: Phase 1 — manuals pilot
type: project
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/continuity-log.md, ../../1-boulon/docs/implementation-spec.md, ../../1-boulon/docs/test-ledger.md, ../../1-boulon/docs/index-facts.md]
---

**Bottom line:** the manual Q&A works on a 25-manual pilot (index tests all pass; agent answers are safe), but citations show the index name instead of the manual, and the free search tier is full. The fix is the v2 rebuild on the paid tier, which waits on [[azure-ticket-77048]].

## State of the steps (from the continuity log)
- Done: pricing, Azure resources, manual upload, index [[azure-search-index]] (23 PDFs indexed, 2 excluded for size, 2 truncated), the "don't guess" layer, retirement of the old exact-lookup tier ([[retired-items]]).
- Step 1.8 testing: 111 tests logged; golden set of 41 questions: semantic search 41/41, hybrid 36/41, keyword 30/41. See [[golden-set]].
- Step 1.9: move to paid Basic tier and rebuild (v2). Blocked on IT.

## Known open issues
Citations show the index name (v2 fixes); Vicinity p.22 torque table was flattened (v2 layout skill keeps tables); Lion and Vicinity manuals conflict on wheel-nut greasing so answers must name the model; nothing covers manuals outside the pilot (by design during testing).

## Related
[[boulon]] · [[decision-d4-paid-search-tier]] · [[copilot-studio-agent]]

## Added 2026-09-30 (from the docs ingest)
- Full dated history and agent versions V0 to V6: [[project-history]]. Test evidence: 111 tests, 70 valid, no wrong agent answer since the Azure pilot ([[test-ledger]]).
- Architecture review (CRITICAL: truncation, unbuilt verification layer, no golden set) and RAG review (CRITICAL: flattened torque table, two excluded manuals): [[review-findings-architecture]], [[review-findings-rag-pipeline]].
- Library measured at 3,052 files, 6.95 GB, 101 files over 16 MB: [[manuals-library]]. Limits: [[tier-limits]].
- Step 1.6 is settings plus instructions only; the verification layer is not built ([[abstention]]). Step 1.7 sub-step "leave SharePoint ON" is Superseded (2026-09-23): SharePoint is not re-enabled; a coverage list comes before rollout.
- Superseded: the old plan's Phase 2 "specialist agents" and Phase 1 target of about 2026-09-25; the internal plan is launch 2026-10-16 with Gates A (10-01), B (10-09), C (10-16) ([[timeline-master]]).
- Lessons: [[lessons-learned]].
