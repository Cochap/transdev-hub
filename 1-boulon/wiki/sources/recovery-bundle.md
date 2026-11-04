---
title: Source — Recovery bundle (ChatGPT-era evidence)
type: source
status: current
updated: 2026-09-30
sources: [../../recovery/maintenance_ai_project_recovery_bundle/README_FIRST.md, ../../recovery/maintenance_ai_project_recovery_bundle/MANIFEST.txt, ../../recovery/maintenance_ai_project_recovery_bundle/01_core_logs/BOULON_Greg_MVP_Audit.md, ../../recovery/maintenance_ai_project_recovery_bundle/01_core_logs/MAINTENANCE_PROJECT_CONTEXT_2026-09-17.md, ../../recovery/maintenance_ai_project_recovery_bundle/01_core_logs/TEST_CHRONOLOGY_RECOVERED.md, ../../recovery/maintenance_ai_project_recovery_bundle/02_raw_test_evidence/RAW_Custom_Search_Test_Output_1000-1259.md, ../../recovery/maintenance_ai_project_recovery_bundle/05_pm_and_motion_artifacts/MAINTENANCE_AI_REMOTION_HANDOFF.md]
---

**Bottom line:** the only evidence for 2026-09-08 to 09-17, recovered from a ChatGPT session: the inherited agent's settings, the first tests, a 2026-09-16 audit and a 2026-09-17 hand-off log. It is best-effort and may be incomplete.

Plain words: before Claude, Greg worked with a ChatGPT assistant. The bundle holds its logs, 21 screenshots, the raw 1000-1259 test output (about 357 KB, summarised here), a 19-page Valeo PDF, and three PowerPoint decks that were static, not animated.

## Key facts
- Original agent "BOULON, Greg": GPT-4.1, one broad SharePoint source, web search ON, ungrounded ON, no tools or topics at first inspection; its instructions claimed CMMS access that did not exist.
- The 2026-09-16 audit concluded the agent failed not because of the prompt but because two jobs need different mechanisms: page-level hybrid retrieval with citations for manuals, and deterministic exact lookup for part numbers. The Part Number Lookup topic filtered after search and only showed counts. **Later superseded** when Azure AI Search RAG replaced both paths ([[project-history]]).
- The audit's production path already named page-aware chunks, layout extraction, hybrid plus semantic ranking, filterable fields and a regression suite ([[chunking]], [[semantic-reranker]]).
- Raw run 2026-09-16 09:48: searching `1000-1259` returned unrelated New Flyer index pages from `1259parts.pdf`; it is not the web-ON run ([[test-ledger]]).
- Ground truth: Grande West 2019 parts manual, `1000-4520`, bolt M22 x 1.5 - 130 mm class 10.9, qty 2, printed p.162/713.
- The hand-off log names the overseer "Eric"; Greg says this was wrong and the overseer is Henri ([[henri]]).
- Motion-film workstream (Remotion): no verified render existed at that time.

## Related
[[timeline-master]] · [[boulon]]
