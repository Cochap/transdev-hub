---
title: Torque tables (flattened table risk)
type: concept
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/review-rag-pipeline.md, ../../1-boulon/docs/index-facts.md, ../../1-boulon/docs/test-ledger.md]
---

**Bottom line:** a confirmed CRITICAL safety finding: the Vicinity Service Manual p.22 torque table was extracted as plain text with no row or column separators, so bolt sizes and torque values run together; it must be fixed before wider rollout.

Plain words: if a table loses its structure, a mechanic or the AI could pair the wrong torque with the wrong bolt.

## Facts
- Stored text: `…DiameterPitch (mm)kNNmM30.503.171.9M40.705.544.4M50.808.978.9M61.0012.715M81.2523.1…` meaning, for M6: pitch 1.00, 12.7 kN, 15 Nm. Zero pipes, line breaks or table tags (confirmed on raw data 2026-09-23) ([[review-rag-pipeline]]).
- Fix: keep tables as markdown tables in the Document Intelligence Layout skill output, or add a table-preserving step, then re-index; golden G11 (structure) waits for v2 ([[golden-set]]).
- Semantic search still returned the right passage for G7 (M6 class 12.9 is 15 Nm per the PDF), but the answer text must be recorded verbatim because of the flattening.
- Other torque facts in the golden set: MCU nuts 17.4 ft-lb (23.5 Nm); Vicinity wiper motor crank 22 to 27 Nm.
- Content conflict: Lion says never grease wheel nuts; Vicinity says oil the studs; answer per model ([[phase-1-manuals-pilot]]).

## Related
[[chunking]] · [[review-findings-rag-pipeline]] · [[azure-search-index]]
