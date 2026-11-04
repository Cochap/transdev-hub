---
title: Source — research PRD for 5 daily learning videos
type: source
status: current
updated: 2026-09-30
sources: [../../docs/research-prds/2026-09-30-daily-videos.md]
---

**Bottom line:** a written brief (a "research PRD": goal, filters, output shape, budget) handed to a research agent to find exactly 5 videos for Greg to watch on 2026-09-30. See [[learning-research-prd-workstream]].

## What the source says
- Goal: 5 videos that raise Greg's skill at building BOULON and bring new applications; for Greg's own knowledge, never for managers.
- In scope: research-agent PRDs and specs (at least 1 video), Azure AI Search and Foundry IQ methods, RAG for manuals and maintenance records, new Claude Code orchestration patterns ECC lacks, cheap-model integrations.
- Out: premium-model tutorials, "what is X", news roundups, manager/ROI content, eval and skill tutorials (ECC covers those), content older than about 60 days (one exception allowed for the PRD topic).
- Six acceptance criteria: new (on or after 2026-08-01), in scope, not ECC, method not explainer, verified via YouTube oEmbed, not a repeat.
- Output: exactly 5 ranked picks with title, channel, date, URL, what you learn, BOULON application, why it passes; fewer if fewer pass. Budget: Sonnet, about 35 tool calls.
- Already-seen and rejected lists; afterwards Claude grades each pick and Greg rates each out of 10 to tune the next PRD.

## Related
[[learning-research-prd-workstream]] · [[claude-operating-model]]
