---
title: Source — Timeline and time-keeper log
type: source
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/timeline.md]
---

**Bottom line:** the running time log for the RAG build, from 2026-09-22 to 2026-09-29, with planned versus actual dates for every step.

Plain words: this is Claude's "time-keeper" file. It lists each step's target dates and what actually happened, plus raw dated log entries (newest first). It complements [[timeline-master]], which is the version-by-version history.

## Key facts
- 2026-09-22: Azure account created; Steps 1.3 to 1.5 done the same day. The indexer finished with Success, 23/23 documents, 0 errors, 4 warnings. Claude could not reach Azure from the web workspace, so Greg built the index with the Import and vectorize data wizard. `gpt-4o-mini` was deprecated, so `gpt-5-mini` replaced it.
- Greg decided not to spend time splitting the 2 oversized PDFs (103 MB and 23 MB) at that point.
- 2026-09-23: moved to Claude Code; Azure became reachable; Step 1.8 testing started about six days ahead of schedule. Fixes 1 and 2 applied; agent published; decisions D3, D12, D13, D14 made; D4 set to paid Basic, awaiting Henri's approval.
- 2026-09-24: the Azure ticket went v2 to v5. Region moved from Canada East to Canada Central (Canada East lacks AI enrichment per Microsoft). Final form: Basic in Canada Central, a pay-per-use PDF-reading AI resource, and a one-time indexing budget of about 650 dollars (ceiling 1,200). See [[azure-ticket-77048]] and [[decision-d4-paid-search-tier]].
- 2026-09-25: ticket sent by Greg (option A, keys); BOULON HQ control room built.
- 2026-09-29: automatic morning check found no new logged work since 2026-09-25 13:45 and no IT reply known.
- Original Phase 1 target was 2026-10-05, re-dated to about 2026-09-25; Phase 2 and 3 targets were 2026-10-13 and early November under the old specialist-agent plan. **Superseded:** the specialist split was replaced; see [[review-findings-architecture]] and [[phase-2-cmms-diagnosis]].

## Related
[[project-history]] · [[phase-1-manuals-pilot]] · [[open-questions]]
