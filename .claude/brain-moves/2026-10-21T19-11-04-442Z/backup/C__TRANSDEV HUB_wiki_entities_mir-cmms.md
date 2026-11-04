---
title: MIR (Quebec CMMS)
type: entity
status: current
updated: 2026-09-30
sources: [../../CLAUDE.md, ../../docs/phase2-plan-cmms.md]
---

MIR is Transdev Quebec's CMMS (computerized maintenance management system, the software logging every vehicle's repairs; "GMAO" in French). Source data for [[phase-2-cmms-diagnosis]]. Access is arranged directly with [[alex-dumenne]] (no IT ticket). The West counterpart is Hexagone/A-Tune ([[samir-macarem]]). An older CMMS mention in the agent instructions was removed ([[retired-items]]).

## Related
[[transdev-quebec]]

## Added 2026-09-30 (from the meeting and Phase 2 docs)
- In service 10+ years; work orders since 2014; [[alex-dumenne]] has access ([[meeting-2026-09-24-pierre]]).
- Same source feeds the budget team's zero-based budget work; BOULON is not a financial tool ([[phase-2-risks-and-flip-conditions]]).
- Unknowns still open: whether MIR has a symptom field or only free text, where it is hosted (an on-premises SQL cannot be read directly by Azure), volume and corrective share ([[phase2-plan-cmms]], [[phase2-scope-sizing-2026-09-24]]).
- Current ask: full read-only access or a complete export since 2014, sent 2026-09-29 ([[it-request-2026-09-29-mir-questions-alex]]). Planned index: `boulon-workorders-mir` ([[phase-2-architecture]]).
- Sibling system: [[hexagone-a-tune]].
