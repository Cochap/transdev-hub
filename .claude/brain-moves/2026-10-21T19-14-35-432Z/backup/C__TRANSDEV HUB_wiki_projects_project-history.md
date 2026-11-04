---
title: BOULON project history (V0 to V6, from 2026-09-08)
type: project
status: current
updated: 2026-09-30
sources: [../../docs/timeline-master.md, ../../docs/timeline.md, ../../docs/test-ledger.md, ../../recovery/maintenance_ai_project_recovery_bundle/README_FIRST.md, ../../recovery/maintenance_ai_project_recovery_bundle/01_core_logs/TEST_CHRONOLOGY_RECOVERED.md]
---

**Bottom line:** BOULON went from an inherited, unguarded SharePoint agent (V0, 2026-09-15) to a grounded Azure AI Search agent (V5 on 2026-09-22, V6 on 2026-09-23) in about nine working days; since then the work is waiting on the paid search tier.

Plain words: "version" means a snapshot of how the Copilot Studio agent was configured. Each version fixed a symptom until the real problem (how the agent searched) was found and [[rag]] replaced it. Dates with a tilde in the sources are estimates and are marked "est." here.

## Versions
| Ver | Dates | What it was | Why it ended |
|---|---|---|---|
| V0 | est. 2026-09-08 to 09-15 (Greg got access 09-14, started 09-15) | Inherited agent: one SharePoint source (7.79 GB), web search ON, ungrounded ON, GPT-4.1, instructions claimed CMMS access that did not exist | Part 1000-1259 returned public brake-pad sellers |
| V1 | est. by 2026-09-16 | Web OFF, ungrounded OFF, source URL narrowed to `Manuels de service/Manuels` | Internal retrieval itself was wrong (cited `1359parts.pdf` "Hose, Drain"; said part 1000-4270 absent though present) |
| V2 | 2026-09-16 | Custom Search "Part Number Lookup" topic: search, then exact text filter | 15 to 19 results, 0 exact matches; filtering after search cannot recover a chunk never retrieved |
| V3 | 2026-09-16 to 09-17 | Plan to pilot on a 19-page Valeo ETL Thermo Plus manual | Never run; set aside |
| V4 | est. 2026-09-17 to 09-21 | Tier 1 exact lookup: hand-typed SharePoint list "BOULON - Parts Lookup Pilot", tool "Get items", flow "BOULON Exact Part Lookup", plus SharePoint generative answers | Accurate only for typed rows; retired 2026-09-22 ([[retired-items]]) |
| V5 | 2026-09-22 | Azure AI Search only: index `multimodal-rag-1790098589411`, 23 of 25 PDFs, 2,250 chunks, hybrid plus semantic, Free tier | Fixes applied 09-23 |
| V6 | 2026-09-23 (current) | Fix 1 (bold part numbers, spaced citations), Fix 2 / D14 (bilingual "don't know" line), agent published | Citations still show the index name until the v2 rebuild |

## Dated timeline
- 2026-02-10 (est.): original SharePoint folder created; source last modified by Henri Eckern's account.
- 2026-09-08: Greg starts. 2026-09-14: access to the agent. 2026-09-15: work begins.
- 2026-09-16: Custom Search topic run (09:48); formal MVP audit; three static PM decks delivered.
- 2026-09-17: ChatGPT-era hand-off log.
- 2026-09-22: Azure account created, models and storage set up, 25 manuals uploaded, index built by Greg (wizard), Tier 1 retired, SharePoint retired as a source.
- 2026-09-23: moved to Claude Code; index tests; architecture and RAG reviews ([[review-findings-architecture]], [[review-findings-rag-pipeline]]); golden set v0; Fix 1, Fix 2; manuals inventory ([[manuals-library]]); decisions D3, D12, D13, D14 and D4 (paid Basic, pending approval); agent published.
- 2026-09-24: golden set v1 (43 questions); Azure ticket v2 to v5; region moved to Canada Central ([[tier-limits]]); Phase 2 direction set ([[phase-2-cmms-diagnosis]]).
- 2026-09-25: ticket sent ([[azure-ticket-77048]]).
- 2026-09-29: no IT reply known.
- Planned (internal): Gate A 2026-10-01, Gate B 2026-10-09, soft launch 2026-10-13 to 10-15, launch 2026-10-16.

## Lessons
See [[lessons-learned]]. Test evidence: [[test-ledger]]; golden set: [[golden-set]].

## Related
[[phase-1-manuals-pilot]] · [[boulon]] · [[timeline-master]] · [[recovery-bundle]]
