---
type: concept
tags: [budget, model, m2, engine]
sources: [zbb_engine/mir.py, zbb_engine/model.py, zbb_engine/select.py, zbb_engine/levels.py, zbb_engine/engine.py, audit/rolling_m2.py, audit/final_m2.py, external: C:/TRANSDEV HUB/data/mir-export/dump/ (aggregates only)]
updated: 2026-10-14
---
# Budget calculation v2 (M2 engine)

Replaces the legacy method ([[budget-calculation]]) after the [[model-audit]]. Code: `zbb_engine/`. Every rule below is in the code; nothing is hidden in a Power BI file.

## Data rules (zbb_engine/mir.py)
- Source: MIR export (BOULON dump, read-only). Odometer = `ODOINSPEC` > 0; readings below the vehicle's running maximum are dropped.
- **Vehicle-year** = one vehicle in one calendar year (2015–2025) with ≥3 readings and 1,000–200,000 km. km = last − first reading. **Costs and hours count only work orders dated after the first reading and up to the last one**, so cost and km cover the same period.
- Parts = `TOT_PIECEA + TOT_PARTIA + TOT_SSUPPA` (adjusted parts, external-job parts, shop supplies), **signed** (credits stay negative), in 2025 $. Hours = real hours `TBONSMEC.TEMPSREEL`.
- Class from `TYPEAUTRE` with Matteo's MIR → HxGN table; **disposed vehicles get the most common class of active vehicles with the same model** (e.g. disposed Nova LFS → URBAN LOW FLOOR). Result: 5,720 vehicle-years, 1,390 vehicles (was 4,059 in M1).
- **Bins are on the real odometer**, fixing [[defect-list]] D13. There are no hard cut-offs (no TAKE flag, no hand-set maximum); uncertainty is shown instead.

## Curve fitting (zbb_engine/model.py)
Each vehicle-year is used as the **range** it drove: the curve r(x) must satisfy cost ≈ integral of r over [start, end]. Fitted by weighted least squares (weight = km). Beyond the data (95th percentile of odometers) the curve is **held flat and the vehicle is flagged**.

## Choosing the curve (zbb_engine/select.py)
Candidates: polynomial degree 0–15 on scaled km, and "connect the dots" (50k / 100k knots). Rule: vehicle-grouped 5-fold cross-validation repeated 3 times; pick the **simplest** curve whose error is not meaningfully worse than the best (paired one-standard-error rule). BIC (Greg's partner's method) is computed alongside.
- Both methods pick **degree 0–3 for almost every class**; MINI OTHER parts is the exception (degree 9, both methods). Degree 15 is never meaningfully better and is catastrophic for small classes.
- BIC assumes equal noise everywhere; with costs whose noise grows with their size it can pick a slightly too-bendy curve (seen in a synthetic test), so cross-validation decides.

## Shape vs yearly level (zbb_engine/levels.py)
Cost per km swings from year to year **by about the same amount at every odometer** (2023–2024 check: predicted/actual 1.10–1.34 in every km band). So the curve is fitted on all years with a per-year **cost level** (an internal Transdev cost index), and budgets use the latest year's level.

Measured level (2025 = 1.00; parts in 2025 $ after the parts index):

| Year | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Parts | 1.11 | 1.10 | 1.18 | 1.23 | 1.20 | 1.27 | 1.19 | 1.01 | 0.89 | 0.91 | 1.00 |
| Hours | 1.00 | 0.95 | 0.93 | 0.95 | 1.04 | 1.19 | 1.09 | 0.88 | 0.86 | 0.82 | 1.00 |

Reading: after the parts index, older years still look 10–27% more expensive than 2025, so **the index rises faster than Transdev's actual parts cost per km** (inferred; alternative causes are fleet changes or data completeness). 2020–2021 (COVID, fewer km) are the most expensive per km for both parts and hours.

## Budget and ranges (zbb_engine/engine.py, settings.json)
Budget per vehicle = integral of the class curves from its start odometer over its distance; parts × (1 + inflation)^(budget year − 2025); hours × hourly rate. Settings file: hourly rate 65, budget year 2026, parts inflation 7.55%/yr, ranges.
- **Vehicle range** = 10th–90th percentile of actual/predicted from the rolling test: about ×0.4 to ×2.6 (wide; one vehicle's cost is very unpredictable).
- **Fleet range** = ×0.84 to ×1.14 (from the rolling test's fleet errors).

## How it performs (rolling one-year-ahead test, 2019–2025; audit/rolling_m2.py)
| Method | Mean fleet error per year | Worst year | Median vehicle error |
|---|---|---|---|
| Old ZBB, all vehicles | meaningless (blow-ups every year) | — | 41–49% |
| Old ZBB, only vehicles inside its range | 8.7% (in-sample, so flattered) | 19% | — |
| **New engine** (shape + level) | **8.9%** | 19% | 42–45% |
| Benchmark: last year's $/km by class × km | 7.6% | 14% | 45–53% |

Conclusions: for the fleet total, the new engine is **as accurate as the old one on normal vehicles, and as good as a simple "last year's cost per km" benchmark**; its gains are no blow-ups, a correct parts/labour split, every rule visible, and honest ranges. Year-to-year swings of 10–20% set the floor; no curve removes them. The odometer curve matters when a fleet's age mix differs from last year (new contract, renewal).

## Refinement round (2026-10-14, audit/refine_m2.py)
Each idea was kept only if it beat the current engine on the rolling 2019–2025 test. Because the same years were used to compare many ideas, results are slightly optimistic; 2025 is reported separately.

**Non-maintenance work removed (setting `exclude_non_maintenance`).** MIR reason codes (`DATA_RAIS`) and repair codes (`DATA_COD`) on labour lines (TBONSMEC) and parts lines (TBONSDET) identify work that is not vehicle maintenance. Excluded: reasons ACC (accident), ABUS (abuse), ADM (administrative), LAV (washing), PROJ (projects); repair codes ENT (shop/tool/building upkeep), NET (shop cleaning), FOR (training), ADM, LAV, 900/901/903 (end of work, breaks, fetching vehicles). About 10% of hours and 8% of parts $. The MIR "Exclu" flags in the A_Code tables are all off, so they could not be used. This changes the target to maintenance-only cost (accidents budgeted separately).

| Method (non-maintenance removed) | Mean fleet error | Worst year | 2025 | Median vehicle error | Vehicles within ±25% |
|---|---|---|---|---|---|
| Engine before refinements | 7.0% | 18.1% | −7.8% | 41.6% | 31.5% |
| + class level + vehicle & model history | 6.8% | 17.6% | −6.7% | **40.4%** | 31.9% |
| **+ blend with last year's cost per km (kept)** | **6.0%** | 15.3% | **−4.6%** | **40.4%** | 31.9% |
| Benchmark alone (last year's $/km × km) | 5.8% | 13.0% | −2.5% | 49.1% | 26.5% |

(With non-maintenance work included, the same engine scored 8.1% fleet / 40.5% vehicle.)

Tried and dropped: capping one-off huge repairs when fitting shapes (no gain); averaging the last two years' level (no change, since each year's level already sits on its own data).

**Where the floor is.** What remains is mainly 2022 (+15%) and 2023 (+11%), when real costs dropped at every odometer: a level change nothing in this data predicts. Single vehicles stay about 40% off in a typical case: one vehicle's repairs are largely chance. The engine is now about as good as the plain benchmark on fleet totals and much better per vehicle, with an odometer curve that handles fleets whose age mix changes.

**New optional inputs** for the fleet file: `Unit` (MIR unit number, uses that vehicle's history) and `Model` (uses the model's history). Without them the engine falls back to the class curve.

## v3 (2026-10-14): curve choice and calibrated ranges
**Why:** Greg found the v2 INDUSTRIAL curve flat ("inelastic"). Cause: v2 judged candidates on single vehicle-years, whose cost per km varies x0.4 to x3, so the noise hid the odometer effect and the one-standard-error rule fell back to flat lines. Band averages from MIR show cost per km rising 2-5x with odometer in almost every class (e.g. STANDARD SCHOOL 0.15 -> 0.78 $/km).

**Curve choice (zbb_engine/select.py):**
- Candidates: polynomials degree 1-5 (scaled km); **monotone** piecewise-linear curves with 3/4/5/6/8 knots (never decrease with odometer; non-negative least squares); **fleet-wide monotone shape x one class level** (`pooled`). Degree 0 and 15 are scored for the record only.
- Test: 5-fold CV grouped by vehicle, repeated 4 times; error = km-weighted squared gap between predicted and actual cost per km of the held-out vehicles in 6 odometer bands, relative to the class mean (what a budget needs).
- Rule: candidates not distinguishable from the best (paired fold-by-fold gap within one standard error) -> simplest wins (fewest parameters, then monotone/fleet shape). Plausibility: never negative in the data range; classes with < 50 vehicles use monotone or fleet shape only. BIC on band totals reported.
- Result (parts): flat is 4-14x worse than the pick in large classes (URBAN LOW FLOOR 16.9% vs 1.2%, COACH 13.3% vs 2.8%). Picks: COACH monotone 3 knots; URBAN LOW FLOOR degree 3; STANDARD SCHOOL monotone 6 knots; MIDI degree 2; MINI SCHOOL degree 1; MINI OTHER, COMMERCIAL CAR, E STANDARD SCHOOL fleet shape; SERVICE degree 2; INDUSTRIAL monotone 3 knots (fits flat: its band averages 0.27-0.94 $/km jump around with 24 vehicles).

**Class benchmark fix:** class level and "last year's cost per km" now come from each class's most recent year with >= 10 vehicle-years, at today's level (INDUSTRIAL has none after 2022; v2 silently used the fleet-wide average for it).

**Rolling test 2019-2025 (v3):** fleet error 5.8% (benchmark 5.8%, v2 6.0%), median vehicle error 38.1% (v2 40.4%), 33.3% of vehicles within +-25%. Per class and km band (zbb_engine/verify.json): band error better or equal to the old ZBB in all 10 classes; class totals mixed (old in-sample and without its blow-ups).

**Calibrated ranges (audit/calibrate_ci.py, zbb_engine/ci_params.json):** log(actual/budget) ~ N(0, s_year^2 + sum_i (w_i s_veh,i)^2), w_i = vehicle's share of the budget. s_year = 0.076 (year-to-year swing, all vehicles at once), s_veh per class 0.52 (URBAN LOW FLOOR) to 1.14 (SERVICE). 80% range: 1 vehicle x0.45-x2.1, 10 vehicles +-25%, 50 +-13%, 200+ +-10%. Calibrated on 2019-2022, coverage on 2023-2025: 76-83% for 2-20 vehicles (target 80%), higher for large fleets (only 3 test years).

**App (M3):** `app/zbb_app.py` (Streamlit, bound to localhost), launcher `run_zbb.bat`; pages: fleet budget, one vehicle, curves & comparison, check it yourself, settings, about. Deck simulator reproduces the engine exactly (30 reference cases + a 3-vehicle fleet, differences < 1e-15).

## Bins vs intervals (2026-10-15, audit/bins_test.py)
Rolling 2019-2025, curve only. Intervals: fleet error 6.4%/yr, median vehicle 40.0%, class x km-band 15.7%. Km-weighted 10k bins: 6.8% / 39.7% / 15.2% (25k and 50k bins almost identical). Practical tie: properly averaged bins (total cost / total km driven in the bin, each bin weighted by its km) are equivalent to fitting on intervals. Matteo's problem was averaging per vehicle (each vehicle counted the same), dividing by the full 10,000 km, unweighted bins and degree 15, not the bins themselves ([[fair-test-method-vs-data]]). Intervals kept.
