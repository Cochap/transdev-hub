---
type: synthesis
tags: [audit, defects, m1, m2-input]
sources: [raw/legacy-code/mega_script_v3.py, raw/data/Données_PB.csv, audit/method_review.py, audit/reality_check.py, external: C:/TRANSDEV HUB/data/mir-export/dump/ (aggregates only)]
updated: 2026-10-14
---
# Defect list (M1 → M2 input)

Status after M2/v3 (2026-10-14), see [[budget-calculation-v2]]. v3 also fixed two engine-v2 issues found by Greg: flat curves from a too-cautious selection rule, and a class with no recent data falling back to the fleet average. Earlier status: **fixed in engine** D1, D2, D4, D5, D6 (as ranges), D7 (setting), D8, D10, D11, D12, D13; **improved** D3 (class rates rebuilt from MIR; per-class error still varies year to year); **open** D9 (only relevant to the old model).

Evidence and numbers: [[model-audit]]. Priority: P1 = wrong budgets now, P2 = material bias, P3 = minor.

| # | Defect | Evidence | Impact | Proposed fix (M2) | Priority |
|---|---|---|---|---|---|
| D13 | **Bins use km driven since the vehicle's first work order in the extraction (`Distance_cum`), not the vehicle's odometer**, but the app's input `Start_Km` is the real odometer | Handover: "[Distance_cum] is the cumulative value of the [Distance] value for a vehicle over time … useful for the bins" (ZBB Documentation.docx) | A bus already at 500,000 km in 2014 is counted in bin 0. High-km bins hold only vehicles followed since new or since 2014, so the curve's x-axis is not the odometer the user enters | Bin on the real odometer (M2 does this from MIR `ODOINSPEC`) | P1 (inferred from the doc; the M code is in the missing .pbix) |
| D1 | Degree-15 curve explodes or goes negative past the recommended km | COACH $55/km at 1.05 × xmax; test1.csv coach $448k for 100,000 km; out-of-range vehicle-years +500,000% | One old vehicle can dominate a fleet budget | Replace the curve (D4); beyond the data, hold the last reliable value flat and flag it in the export | P1 |
| D2 | Parts too high (+15 to +25%) and labour hours too low (−23%); they offset at fleet level | Reality check (all cost definitions, full-year check) | Parts/labour split wrong; any rate change breaks the balance | Rebuild CPK/HPK levels from actual costs and real hours (MIR) | P1 |
| D3 | Class bias: MINI SCHOOL about −33%, SERVICE −25 to −46% | Reality check | These fleets are under-budgeted | Recalibrate per class; report a confidence range per class | P2 |
| D4 | Degree-15 fit is numerically unstable (raw km up to 1.5 M) and no better than simple methods | Leave-one-bin-out; TAKE-only refit errors 10²–10⁸ % | Fragile to any data update | Use "connect the dots" interpolation or low-degree fit on scaled km | P2 |
| D5 | No inflation to the budget year | Costs are in 2025 $ | 2026 parts ≈ 7% too low (2025 rate 7.55%) | Add a budget-year inflation setting | P2 |
| D6 | Single-vehicle budgets are imprecise (32% within ±25%) | Reality check | Misleading per-vehicle figures | Present per-vehicle results with a range; emphasise fleet totals | P2 |
| D7 | Hourly rate hard-coded 65 (workbook says 75) | Implied rate 63 $/h in 2025 | ±3–6% on budget | Keep 65 as default, editable setting; confirm what TOT_MDOEUV represents | P3 |
| D8 | Fit uses all bins up to ~1.5 M km even where xmax is 250 k; TAKE flag ignored | Code | Sparse high-km data bends the in-range curve | Fit only on reliable bins | P3 |
| D9 | No inflation factor for 2014 (data starts 2014-04) | Inflation table | Unknown | Check how 2014 was handled; add the factor or drop 2014 | P3 |
| D10 | Bin value placed at bin start, not middle | Code | ~5,000 km shift; small | Place at bin middle | P3 |
| D11 | Negative amounts (credits, reversals) made positive in cleaning | Handover; MIR: absolute values raise actual parts by about 5% | Overstates costs a few % | Keep credits signed | P3 |
| D12 | CPK = bin cost ÷ 10,000 km rather than km actually driven in the bin (suspected) | Handover method description | Unknown; not testable from Données_PB without the raw extraction | Rebuild CPK from real km if levels are rebuilt (D2) | P3 (suspected) |
