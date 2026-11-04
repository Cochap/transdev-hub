---
type: synthesis
tags: [audit, accuracy, method, fair-test]
sources: [audit/fair_test.py, audit/out/fair_test.pkl (local only), raw/legacy-code/mega_script_v3.py, raw/data/Données_PB.csv, external: C:/TRANSDEV HUB/data/mir-export/dump/ (aggregates only)]
updated: 2026-10-15
---
# Fair test: Matteo's method vs ours, same data, same protocol

Question (Greg, 2026-10-15): we used different data from Matteo's; is our tool more or less accurate, and is that due to the method or the data?

**Protocol** (`audit/fair_test.py`): same MIR vehicle-years as the v3 engine (non-maintenance excluded), rolling one-year-ahead 2019-2025 (learn on years < Y, predict Y). 3,918 test vehicle-years, 3,650 inside the old model's recommended range (`BEST_XMAX`).
- **NEW**: v3 engine ([[budget-calculation-v2]]).
- **M-FAITHFUL**: Matteo's pipeline rebuilt on the same data: km since the vehicle's first reading (`Distance_cum`, [[defect-list]] D13), 10,000 km bins, CPK/HPK = cost in bin / 10,000, class average over vehicles, degree 15 (4 for E STANDARD SCHOOL), budget integrated from the real odometer.
- **M-ODOMETER**: same but bins on the real odometer (isolates the curve).
- **M-ORIGINAL**: the original Données_PB curves (Matteo's data, in-sample for these years). Its target was all costs, not maintenance only, so against this maintenance-only actual it reads about 5-8% high (inferred from [[model-audit]]).

## Results (inside the old model's recommended range)
| Method | Mean fleet error per year | Worst year | Median vehicle error | Vehicles within ±25% |
|---|---|---|---|---|
| **NEW** | **5.0%** | **11.2%** | **38.6%** | **32.9%** |
| M-ODOMETER | 99.8% | 541% | 41.6% | 31.4% |
| M-FAITHFUL | explodes (10⁷ %) | — | 59.3% | 22.0% |
| M-ORIGINAL (own data, in-sample) | 10.8% | 23.0% | 47.2% | 28.8% |

Fleet error by year, NEW vs M-ORIGINAL: 2019 +0.1/+6.0, 2020 −4.8/−0.7, 2021 −1.9/−2.8, 2022 +11.2/+8.9, 2023 +10.3/+19.5, 2024 +4.8/+23.0, 2025 −2.0/+14.5.

## What it means
1. **The method is the main cause.** Given the same data and asked to predict a year it has not seen, Matteo's method breaks down: the degree-15 curve explodes whenever a class has fewer data (M-ODOMETER explodes for INDUSTRIAL in 2020 and MIDI in 2022-2024; M-FAITHFUL nearly every year). Its own curves look acceptable only because they were fitted on all years at once (in-sample).
2. **His "km since first seen" axis makes it worse** (M-FAITHFUL vs M-ODOMETER: median vehicle error 59% vs 42%).
3. **When it does not explode, the curve itself is close to ours** (median vehicle error 41.6% vs 38.6%). The gain is mostly stability, plus the yearly level and class calibration.
4. **The data difference is not what makes ours better.** On identical data our method wins on every measure; against Matteo's own in-sample curves it still has half the fleet error (5.0% vs 10.8%, part of which is his all-costs target).
5. Remaining caveat: Matteo's raw extraction (3,568 vehicles) is not accessible, so his method on his exact data cannot be replayed out of sample.
