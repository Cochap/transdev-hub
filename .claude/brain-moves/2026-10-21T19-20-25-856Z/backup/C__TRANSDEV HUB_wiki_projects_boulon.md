---
title: BOULON
type: project
status: current
updated: 2026-09-30
sources: [../../CLAUDE.md, ../../1-boulon/docs/continuity-log.md, ../../1-boulon/docs/rag-plan-reference.md]
---

**Bottom line:** BOULON is an AI maintenance assistant for [[transdev-quebec]] mechanics. A [[copilot-studio-agent]] (GPT-4.1) answers only from retrieved manual text in [[azure-search-index]], cites the manual, and says "I don't have that information" instead of guessing ([[rag]]).

## Scope
A holistic assistant for engineers and mechanics: procedures, diagnostics, torque/safety values and diagrams. **Not mainly a part-number lookup tool** ([[rules-index]]). Diagrams are non-negotiable (2026-09-23): pages are read twice, tables kept plus diagrams described.

## Phases
1. [[phase-1-manuals-pilot]]: manual Q&A. Pilot live on the free search tier, waiting on the paid tier ([[azure-ticket-77048]]).
2. [[phase-2-cmms-diagnosis]]: "we recommend checking first" from maintenance history ([[mir-cmms]]).

## People and governance
Lead [[greg-riley]] · overseer [[henri]] · spending approval [[pierre-zivec]]. Budget CAD 5,000, Greg's discretion. Launch target Fri 2026-10-16 is an internal plan date (not shared with Henri, see [[rules-index]]).

## Daily views
BOULON HQ page (`boulon-hq.html`, local Control room at http://127.0.0.1:4777). The continuity log is the chronological record; this wiki is the compiled layer.

## Tooling and how Claude works here
[[boulon-hq-control-room]] (daily page and local panel) · [[ecc-plugin]] · [[skills-catalog]] · [[claude-operating-model]] · [[rebuild-v2-pipeline]] (draft paid-tier index) · [[launch-plan-oct16]] (internal plan). Side workstreams: [[geotab-launch-film-project]], [[learning-research-prd-workstream]].

## Related
[[overview]] · [[decision-register]] · [[open-questions]]
