---
title: Phase 2 — diagnosis from maintenance history
type: project
status: current
updated: 2026-09-30
sources: [../../docs/phase2-plan-cmms.md, ../../docs/meeting-2026-09-24-pierre.md, ../../docs/continuity-log.md]
---

**Bottom line:** help mechanics find the cause of a breakdown faster by using past work orders, phrased as "we recommend checking first". Direction set by [[pierre-zivec]] on 2026-09-24 to close the junior/senior gap and cut needless parts.

- Start with MIR Quebec ([[mir-cmms]]) via [[alex-dumenne]]; Hexagone/US later via [[samir-macarem]]. Fleets are never mixed (filters by type and region).
- A separate model for expert mechanics is planned (D15–D18, see [[decision-register]]).
- Request to Alex (2026-09-29, French): full read-only access or a complete export since 2014; no question list. Fields, quality and volume are worked out from the data ([[feedback-direct-asks]]).
- No privacy, anonymization or IT-ticket steps ([[feedback-no-invented-compliance]]).
- Plan in `1-boulon/docs/phase2-plan-cmms.md`; sizing in `1-boulon/docs/phase2-scope-sizing-2026-09-24.md`.

## Related
[[boulon]] · [[phase-1-manuals-pilot]]

## Added 2026-09-30 (from the Phase 2 docs)
- **Plan steps A to F** (discovery, data access, data quality, prototype, expert evaluation, go/no-go): [[phase2-plan-cmms]]. Draft, not approved. Architecture: [[phase-2-architecture]]; evaluation: [[phase-2-evaluation-plan]]; what fits on the search plan: [[phase-2-sizing-scenarios]]; risks: [[phase-2-risks-and-flip-conditions]].
- **Decisions:** [[decision-d15-d18-phase2-direction]], [[decision-adr-0002-phase2-cmms-diagnosis]], [[decision-d4a-pick-plan-once]].
- **Pierre's goals:** close the junior/senior gap, cut needless parts swaps, share knowledge across depots ([[meeting-2026-09-24-pierre]]).
- **Plan tier:** stay on Basic for the prototype, re-decide once at go/no-go ([[decision-adr-0003-tier-rescoped-for-phase2]], [[azure-search-tiers]]).
- **Second data source:** [[hexagone-a-tune]] after the about 2026-10-05 go-live.
- Superseded: the 21-question MIR list ([[it-request-2026-09-24-mir-access]]) gave way to the direct request of 2026-09-29 ([[it-request-2026-09-29-mir-questions-alex]]).
- Phase 2 future needs outside the ticket: Azure OpenAI Regional in Canada East, an expert-only agent with a security group, and a named payer for running costs ([[phase2-scope-sizing-2026-09-24]]).
