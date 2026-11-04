---
title: Golden set and test method
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/test-ledger.md, ../../tests/results/golden_2026-09-24_1338.md]
---

A fixed list of questions with known right answers, rerun after every index or agent change (the regression check). Golden v1: 43 questions from real passages (23 answerable, 10 must-abstain, 10 torque/safety, 8 cross-language); 41 usable on index v1. Results: semantic 41/41, hybrid 36/41, keyword 30/41. **Pass condition:** answer right AND citation names the actual manual; an index-name citation is a FAIL. Every proposed test states the literal input, where to run it, pass vs red flag, and what to report back ([[rules-index]]). Test ledger: 111 tests, 70 valid, 16 real failures. How to run: [[boulon-testing]].

## Related
[[phase-1-manuals-pilot]] · [[azure-search-index]]

## Added 2026-09-30 (history and method details)
- Origin: the RAG review proposed 8 questions from real passages (G1 to G7 plus a must-abstain); golden v0 ran 10 questions (8 answerable plus A1 Orion and A2 Tesla) on 2026-09-23: semantic 10/10, hybrid 9/10, keyword 8/10 ([[review-findings-rag-pipeline]], [[test-ledger]]).
- The architecture review proposed a full set of about 120 (about 60 answerable, 20 cross-language, 25 must-abstain, 15 safety or torque) and targets for Henri to set: 0 unsupported safety or spec numbers, 100 percent cited, at least 95 percent correct abstention, at least 85 percent correct ([[review-findings-architecture]]).
- Golden v1 on 2026-09-24: G11 (torque table structure) and G12 (citation fields) are skipped until v2; L1 to L3 (legacy Valeo part rows) must pass once the full library is loaded.
- Retest 2026-09-24 13:38 after test-script fixes: T1 to T3 PASS; keyword 30/41, hybrid 36/41, semantic 41/41, 0 errors.
- Why semantic matters: [[semantic-reranker]]. Pass rules: [[abstention]], [[citation-projection]], [[torque-tables]].

See also in the field: [[rag-evaluation]] (graders, abstention scoring, numeric checks) · [[rag-field-map]] · [[greg-interest-map]]
