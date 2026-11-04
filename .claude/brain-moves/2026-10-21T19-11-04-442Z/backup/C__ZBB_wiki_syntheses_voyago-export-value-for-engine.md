---
type: synthesis
tags: [voyago, accuracy, ranges, inflation-index, vehicle-fields]
sources: [audit/export_value_test.py, audit/ci_coverage_voyago.py, audit/ci_year_swing_scan.py, audit/out/*.txt (git-ignored), raw/data/mir-voyago-2026-10-20/, external: C:/TRANSDEV HUB/data/mir-export/dump/]
updated: 2026-10-20
---
# Can the Voyago export (and unused vehicle fields) make the engine more accurate? (2026-10-20)

Rolling next-year tests, 2022-2025 (Voyago starts 2021), pooled Québec + Voyago with a cost level per source ([[voyago-pooling-test]]). Aggregates only.

## 1. Voyago does not improve Québec predictions
Québec test rows by class, Québec-only model vs pooled with a level per source (fleet error / typical vehicle error): commercial car 26% / 48% vs 38% / 53%; mini school 19% / 55% vs 35% / 58%; service 23% / 70% vs 32% / 67%; standard school 29% / 46% vs 32% / 47%; mini other unchanged (about 9% / 37%). Where Voyago overlaps a thin Québec class it makes things worse (different cost regime). Classes with no Voyago vehicles (coach, midi, urban, industrial, electric school) move only through the shared level.
Odometer coverage: Voyago vehicles cover the same odometer ranges as Québec in every shared class (e.g. standard school median 146k vs 151k km); no new range is added. Service is the one exception (Voyago median 238k vs 117k) but its cost level differs.

## 2. Unused vehicle fields add only 1-3 points
Control (class, start km, km, source) vs extra fields from `VEHICUL`, same learner and seed ([[ceiling-test]] method), typical vehicle error:

| Tested on | Control | + age, model | + depot (LIEU) | + company | + fuel | + weight | + make | All |
|---|---|---|---|---|---|---|---|---|
| Québec | 37.0% | 36.1% | 35.1% | 36.1% | 35.7% | 36.1% | 36.0% | 34.8% |
| Voyago | 44.4% | 43.3% | 42.4% | 41.4% | 42.8% | 42.8% | 43.2% | 41.5% |

Depot and company are the most useful (about 1 to 2 points each); the rest are close to nothing. Fleet-total differences of 1 to 3 points between versions are within the noise of four test years. These fields are not in the fleet template (class, start km, distance). Engine hours (`HRSINSPECT`) are filled for 51% of Québec work orders but 0.9% of Voyago, so they cannot serve as a common driver. Purchase price fields are empty.

## 3. The stated 80% ranges are too narrow for large fleets
Share of random fleets whose actual total fell inside the 80% range (current calibration `s_year` = 0.076, from Québec 2019-2025):

| Fleet size | Québec | Voyago |
|---|---|---|
| 1 | 74% | 67% |
| 20 | 83% | 69% |
| 100 | 73% | 61% |
| 400 | 62% | 53% |

Cause: a cost-level swing shared by the whole database. Whole-source log errors by year, Québec / Voyago: 2022 −0.16 / −0.16, 2023 −0.12 / −0.25, 2024 +0.02 / +0.01, 2025 +0.08 / +0.05 (both over-predicted in 2022-23, same direction). Std of the yearly error: Québec 0.111, Voyago 0.141.
Scan of `s_year`: **0.10 gives 77-84% coverage on Québec at every fleet size** (range for 100 vehicles widens from ±16% to ±19%); **Voyago needs about 0.16** (±27%, coverage 69-84%). Caveat: only four test years.

## 4. The parts inflation index looks too steep for 2022-2023
At a fixed class mix, cost per km year over year, Québec / Voyago: real 2025 $: 2022 −10% / −11%, 2023 −10% / −18%; **nominal: 2022 −3% / −3%, 2023 −2% / −10%**. The index (`FACTOR_2025`) assumes parts prices rose 16.8% in 2022 and 14.6% in 2023, yet Transdev's own nominal cost per km fell. Index-adjusted yearly swings are larger than nominal ones (std 2019-2025: Québec 7.2 vs 5.9, Voyago 13.3 vs 11.7). The dip itself is real in both databases even without the index (nominal fall in 2022-23), cause unknown (fleet renewal, new parts contract, warranty: see [[open-questions]]).

## What it means
- Voyago's value is **budgeting Voyago** (fleet total about 13% off with its own level), not improving Québec.
- The cheapest real improvements are about **honesty of the ranges** (raise `s_year`, per source) and **checking the inflation index** against Transdev's own costs, not new data or new features.
- Not applied: `ci_params.json` and the index are unchanged; both need Greg's decision.
