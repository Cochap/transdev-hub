---
title: Overview — Greg's business world
type: overview
status: current
updated: 2026-09-30
sources: [../../CLAUDE.md, ../docs/continuity-log.md]
---

**Bottom line:** Greg Riley leads BOULON, an AI assistant that helps Transdev Quebec mechanics find manual procedures, and is now extending it to diagnosis help from maintenance history. Everything here hangs off that.

## What the business is
- **[[transdev-quebec]]** is the employer: a bus/transit maintenance operation. Mechanics need fast, correct answers from 3,000+ manuals.
- **[[boulon]]** is the project: a Copilot Studio agent (GPT-4.1) answering from manuals stored in Azure AI Search, with citations and a "don't guess" rule. See [[rag]] for how it works in plain words.
- **Phase 1** = [[phase-1-manuals-pilot]] (manual Q&A, 25-manual pilot, waiting on the paid search tier).
- **Phase 2** = [[phase-2-cmms-diagnosis]] (diagnosis help from MIR work-order history, via [[alex-dumenne]]).

## Who matters
[[greg-riley]] (lead/builder) · [[henri]] (overseer) · [[pierre-zivec]] (approves spending, set Phase 2 direction) · [[alex-dumenne]] (MIR data) · [[samir-macarem]] (West CMMS, later).

## Where things are blocked right now (2026-09-30)
- [[azure-ticket-77048]]: IT has not yet created the paid search service. No update as of 2026-09-30 09:05.
- MIR access request sent to Alex on 2026-09-29; he is usually in on Tuesdays and Thursdays.

## How Greg likes to work
See [[greg-working-style]] and the [[rules-index]].

## Related
[[index]] · [[open-questions]] · [[azure-search-index]] · [[copilot-studio-agent]]

## Second project (added 2026-10-27)
[[workshop-segmentation]]: Greg was assigned a classification project for Transdev Canada bus maintenance workshops (ID card, three segments, maturity grid). Separate from BOULON. Start at [[workshop-segmentation-debrief-v0-1]].
