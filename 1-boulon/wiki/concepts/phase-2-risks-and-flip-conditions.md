---
title: Phase 2 risks and plan flip conditions
type: concept
status: current
updated: 2026-09-30
sources: [../../docs/meeting-2026-09-24-pierre.md, ../../docs/phase2-scope-sizing-2026-09-24.md, ../../docs/phase2-plan-cmms.md]
---

**Bottom line:** the named risks are wrong diagnoses and poor data; the decision "stay on Basic" reopens if any flip condition below turns true.

## Risks named by Pierre (2026-09-24)
- Hallucination on diagnosis: Greg cannot judge it, so expert mechanics do.
- Data quality: work orders were written for history and finance; a closed order does not prove the diagnosis was right.
- Not a financial tool: separate from the zero-based budget work although both use MIR.
Plan risks: MIR may have only free text and no symptom field;.

## Flip conditions for the search plan
- IT requires private endpoints: S1 from day 1 (Basic cannot use them with AI PDF reading).
- MIR has more than about 300k indexable orders and full history is wanted early: still Basic now, upgrade in place when loading.
- US or all-Canada data confirmed within 6 months: consider S1 at go/no-go.
- Microsoft reports no S1 capacity in Canada East at upgrade time: new service plus re-index (about CAD 300 to 600 once plus 1 to 2 days, from the scripted `rebuild/` files).
- Copilot Studio cannot filter: over 15 indexes, so S1.

## Related
[[decision-adr-0003-tier-rescoped-for-phase2]] · [[phase-2-sizing-scenarios]] · [[pierre-zivec]] · [[phase-2-cmms-diagnosis]]
