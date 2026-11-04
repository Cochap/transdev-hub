---
title: Abstention (the "don't guess" rule)
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/implementation-spec.md, ../../docs/rag-plan-reference.md, ../../docs/review-architecture.md, ../../docs/test-ledger.md]
---

**Bottom line:** BOULON must say "I don't have that information" when the manuals do not support an answer; today this is done by settings plus instructions and proven by must-abstain tests, not by a built verification layer.

Plain words: the AI is not allowed to fill gaps from general knowledge, because a wrong torque value or part number can cause harm. Nothing can eliminate hallucination completely, so the goal is cited answers or an honest "not found, ask a person" ([[rag-plan-reference]]).

## Facts
- Step 1.6: "Allow ungrounded responses" OFF plus an abstention instruction (wording in [[implementation-spec]]). Web search is also OFF.
- Not built: a second check confirming each claim ([[review-findings-architecture]] C2). Offline verification via the golden set is the recommended route; live verification only if data shows unsupported claims.
- Fix 2 / D14: a bilingual "don't know" line in the Secours (Fallback) topic; passed 2026-09-23.
- Must-abstain tests: Orion part 080808082 (no Orion manual indexed) and a Tesla Model 3 lug-nut torque; both SAFE-ABSTAIN ([[test-ledger]], [[golden-set]]).
- Older lesson: the fictional part GW-9999-ABC got no torque value but the agent claimed an exhaustive search it could not prove.
- Proposed target: at least 95 percent correct abstention (Henri sets final numbers).
- Gap: the agent cannot tell "manual missing" from "information missing"; a coverage list is planned (H2).

## Related
[[copilot-studio-agent]] · [[rag]]

See also in the field: [[rag-evaluation]] (DeclineCraft: rewriting, reranking and iterative search can lower correct "I don't know") · [[agentic-retrieval]] · [[rag-field-map]] · [[greg-interest-map]]
