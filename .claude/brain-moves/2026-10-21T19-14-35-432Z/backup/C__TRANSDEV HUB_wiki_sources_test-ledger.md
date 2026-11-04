---
title: Source — Complete test ledger
type: source
status: current
updated: 2026-09-30
sources: [../../docs/test-ledger.md]
---

**Bottom line:** 111 tests recorded, only 70 valid (41 were setup errors). Since the Azure pilot started, no wrong agent answer has been recorded; the open defects are in citations and one flattened torque table.

Plain words: the ledger lists every test anyone ran on BOULON, with the exact question, expected result, actual result and what changed because of it. Verdicts: PASS, FAIL, PARTIAL (answer right but something else wrong, like the citation), SAFE-ABSTAIN (correctly said "I don't have that").

## Key facts
- Totals: 35 PASS, 13 SAFE-ABSTAIN, 6 PARTIAL, 57 FAIL (41 setup or infrastructure errors, 16 real answer or retrieval failures). Valid tests: 70.
- Real failures by phase: 11 in V0 to V2 (SharePoint era), 5 on 2026-09-23 from probing the search index directly (keyword-mode misses, flattened torque table, English keyword probe). See [[boulon-testing]].
- Setup errors included a wrong key (403), a wrong index name (404), the agent not being published, and the sign-in setting blocking Direct Line (`IntegratedAuthenticationNotSupportedInChannel`).
- Turning points: web search returned internet brake-pad sellers for part 1000-1259 (V0); with web off the agent cited the wrong New Flyer file (V1); filtering after search could not recover a chunk that was never retrieved (V2).
- Golden v0 (10 questions) on 2026-09-23: semantic 10/10, hybrid 9/10, keyword 8/10. Golden v1 (43 questions, 41 run) on 2026-09-24: semantic 41/41, hybrid 36/41, keyword 30/41. See [[golden-set]] and [[semantic-reranker]].
- Test-script fixes on 2026-09-24 13:38: a match from the wrong manual now fails; real semantic errors show as ERROR.
- Content finding (T7): the Lion wheel sheet says never grease the nuts while the Vicinity manual says oil the studs, so answers must name the vehicle model ([[phase-1-manuals-pilot]]).
- T4: three legacy list rows (Valeo 2711011A p.12, 20818B p.5, 11113052A p.5) are not in the current index; added as golden L1 to L3 for the full library.
- Not run yet: Valeo acceptance tests (V3); a semantic re-ranker check inside Copilot Studio (closed because the setting is not shown in the UI).
- Open: the Orion pressure-release line (#16) was never verified against the manual ([[open-questions]]).

## Related
[[project-history]] · [[abstention]] · [[citation-projection]] · [[torque-tables]]
