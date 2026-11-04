---
title: Launch plan to Friday 2026-10-16 (internal)
type: project
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/plan-to-oct16.md, ../../1-boulon/docs/orchestration-plan.md, ../../.claude/skills/boulon-approval-package/SKILL.md]
---

**Bottom line:** INTERNAL plan, not shared with Henri. It aims to launch [[boulon]] Phase 1 with Henri's sign-off on Fri 2026-10-16, about 7 hours of Greg's time. Do not show these dates to Henri unless he asks ([[skill-boulon-approval-package]] "no projections" rule). As of 2026-09-30 the plan is behind: the paid search tier it needed by 09-24 is still waiting on IT ([[azure-ticket-77048]]).

## Shape
| Day | Planned outcome |
|---|---|
| Wed 09-23 to Fri 09-25 | Publish agent, first automatic run; decide D1 and D4; create Basic in Canada East (since revised to Canada Central, see [[azure-ticket-77048]]); mechanics' 5-question request |
| Mon 09-28 to Thu 10-01 | New v2 index on Basic ([[rebuild-v2-pipeline]]); pilot files indexed; agent pointed at Basic with read-only key; **Gate A** 10-01 |
| Fri 10-02 to Fri 10-09 | Golden set to about 40; targets memo; big files split; full library uploaded; Henri 30-minute targets meeting 10-06; coverage check; **Gate B** 10-09 |
| Tue 10-13 to Thu 10-15 | Fixes, mechanics-only sign-in (depends on IT), soft launch to 3-5 mechanics 10-14, final golden run |
| Fri 10-16 | **Gate C:** Henri sign-off |

Gate B proposed targets: 0 unsupported safety/spec numbers, 100% cited, at least 95% correct abstention, at least 85% correct. Mon 10-12 is Thanksgiving.

## Slippage and what changed
The plan assumed the Basic service on 09-24. It is waiting on IT, so Gates A and B cannot be met on their dates. No new dates have been set by the sources (unverified whether Greg has re-dated it). Phase 2 direction (diagnosis from maintenance history) was set on 2026-09-24 and is tracked in [[phase-2-cmms-diagnosis]].

## Superseded
Earlier target: Wed 2026-11-18 sign-off with a 2-week mechanic pilot ([[orchestration-plan]], replaced 2026-09-23). Kept for the phase list, decision register and risk table. Also listed in [[open-questions]].

## Post-launch ("Phase 2" in this plan's own wording)
Full claim checker, golden set grown to 120, 2-week pilot review, live second-check decision, upgrade to S1 if needed. Not to be confused with the project's [[phase-2-cmms-diagnosis]].

Sources: [[plan-to-oct16]].

## Related
[[phase-1-manuals-pilot]] · [[decision-register]] · [[golden-set]]
