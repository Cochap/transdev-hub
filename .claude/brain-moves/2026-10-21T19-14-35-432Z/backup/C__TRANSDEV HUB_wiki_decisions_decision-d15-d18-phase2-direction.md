---
title: D15 to D18 — Phase 2 direction (2026-09-24 meeting)
type: decision
status: current
updated: 2026-09-30
sources: [../../docs/meeting-2026-09-24-pierre.md, ../../docs/adr/0002-phase2-cmms-diagnosis.md]
---

**Bottom line:** four decisions from the 2026-09-24 meeting with [[pierre-zivec]] that define Phase 2: use the maintenance history, keep the safe manuals model separate, start with MIR, never mix fleets.

| # | Decision | Pierre's words (short) |
|---|---|---|
| D15 | Phase 2 = Transdev maintenance history (CMMS/GMAO); help diagnose corrective (unplanned) repairs: likely causes and recommended method, as guidance not certainty | "quelle est la méthode qu'on recommande pour faire le diagnostic" |
| D16 | Two models: the current safe manuals one and a riskier history-based one, first opened to a few expert mechanics who check hallucinations | "à disposition de quelques mécaniciens experts" |
| D17 | Start with MIR (Quebec, since 2014) through [[alex-dumenne]]; Hexagone/A-Tune and US later via [[samir-macarem]], likely November; do not disturb Samir before the go-live | "Commençons avec MIR" |
| D18 | Do not mix fleets: filter by equipment type and region; a Quebec/Canada/all selector is nice-to-have only | "on fait une IA pour Ford… pas Toyota" |

Formalised in [[decision-adr-0002-phase2-cmms-diagnosis]]. Architecture: [[phase-2-architecture]].

## Related
[[phase-2-cmms-diagnosis]] · [[decision-register]] · [[meeting-2026-09-24-pierre]]
