---
title: D4a — if the plan must change, jump once to a big enough one
type: decision
status: current
updated: 2026-09-30
sources: [../../1-boulon/docs/meeting-2026-09-24-pierre.md, ../../1-boulon/docs/phase2-scope-sizing-2026-09-24.md]
---

**Bottom line:** [[pierre-zivec]]'s advice on 2026-09-24: if the search plan has to change again for Phase 2, go straight to one big enough that it will not need another change ("si tu dois ensuite rechanger de plan, change directement pour un plan assez supérieur").

How it was applied: because Basic to S1 is an in-place switch with no rebuild, the scope review kept Basic now and allows exactly one jump at go/no-go, sized on measured MIR numbers ([[decision-adr-0003-tier-rescoped-for-phase2]]). Buying S1 now would add about CAD 237.76/month unused ([[azure-cost-figures]]). The one thing that would force S1 on day 1 is IT requiring private endpoints ([[phase-2-risks-and-flip-conditions]]).

## Related
[[decision-d4-paid-search-tier]] · [[azure-search-tiers]] · [[meeting-2026-09-24-pierre]]
