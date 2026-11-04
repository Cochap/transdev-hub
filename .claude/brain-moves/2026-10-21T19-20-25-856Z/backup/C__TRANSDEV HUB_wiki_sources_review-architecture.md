---
title: Source — Architecture review
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/review-architecture.md]
---

**Bottom line:** the reviewing agent `ecc:architect` judged the foundation sound but the safety story overstated; Phase 1 should not close until truncation, the missing verification layer and the lack of a golden set are fixed.

Plain words: on 2026-09-23 an architecture specialist read every doc and the live index exports and ranked issues as CRITICAL, HIGH, MEDIUM and LOW. Details of each finding are on [[review-findings-architecture]].

## Key facts
- Verdict: Azure AI Search plus Copilot Studio is the right base. Recommended target architecture is one agent, one index, no specialist agents, and measured safety (coverage report, cited answers, a re-run question set).
- Proposed targets for Henri to set: 0 unsupported safety or spec numbers, 100 percent of answers cited, at least 95 percent correct abstention, at least 85 percent correct on answerable questions, and a 2-week pilot with 3 to 5 mechanics.
- Proposed golden set: about 120 questions (about 60 answerable, 20 cross-language, 25 must-abstain, 15 safety or torque). See [[golden-set]].
- Query key (read-only) for Copilot Studio; admin key only for Claude's configuration reads.
- 16 doc corrections listed; many are already applied in the docs (for example index name, "23 indexed of 25 uploaded").
- Its proposed schedule (golden set about 10-09, full corpus about 10-23, mechanic pilot 10-26 to 11-06, Henri sign-off mid to late November) was later replaced by the internal 2026-10-16 plan ([[project-history]]).

## Related
[[review-findings-architecture]] · [[abstention]] · [[phase-1-manuals-pilot]]
