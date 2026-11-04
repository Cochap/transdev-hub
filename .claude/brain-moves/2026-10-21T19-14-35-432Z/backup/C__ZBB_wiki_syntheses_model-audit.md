---
type: synthesis
tags: [audit, model, accuracy, m1]
sources: [raw/legacy-code/mega_script_v3.py, raw/data/Données_PB.csv, raw/data/test1.csv, audit/legacy_model.py, audit/method_review.py, audit/mir_profile.py, audit/reality_check.py, audit/reality_final.py, external: C:/TRANSDEV HUB/data/mir-export/dump/ (aggregates only), external: Downloads/veripep 2022-10-14.pdf (MIR data dictionary)]
updated: 2026-10-14
---
# Model audit (M1)

Plan: `.claude/plans/zbb-m1-data-model-audit.plan.md`. Données_PB is trusted as input (Greg, 2026-10-14). Figures below are aggregates from `audit/` scripts.

## Step 1: legacy model reproduced
`audit/legacy_model.py` reproduces [[mega-script-v3]] exactly: 84 cases (10 classes × starts × distances, plus test1.csv) give a max relative difference of 0.

## Step 2: method review on Données_PB (interim)
Leave-one-bin-out, scored inside [0, BEST_XMAX], error = Count-weighted MAPE of total $/km (CPK + 65 × HPK).

| Class | Legacy deg 15 | Quadratic | Neighbour interp. | Flat average |
|---|---|---|---|---|
| COACH | 14.6 | 14.5 | 14.1 | 15.2 |
| COMMERCIAL CAR | 10.7 | 7.7 | 6.5 | 15.8 |
| E STANDARD SCHOOL | 28.5 | 12.0 | 13.3 | 30.4 |
| INDUSTRIAL | 20.4 | 31.4 | 22.9 | 30.6 |
| MIDI | 14.0 | 13.5 | 16.7 | 33.8 |
| MINI OTHER | 18.0 | 16.7 | 19.9 | 22.6 |
| MINI SCHOOL | 11.7 | 9.5 | 11.8 | 16.2 |
| SERVICE | 86.6 | 24.0 | 26.7 | 24.3 |
| STANDARD SCHOOL | 5.5 | 7.9 | 6.1 | 11.3 |
| URBAN LOW FLOOR | 9.7 | 10.3 | 10.5 | 21.9 |
| Median | 14.3 | 12.8 | 13.7 | 22.3 |

Reading: **in the middle of the range** the legacy curve is about as good as simpler methods, except SERVICE (87%) and E STANDARD SCHOOL (28%). **The problem is instability:** refitting degree 15 on TAKE=YES bins only (a reasonable change) gives errors of 100% to 10⁸%, i.e. the curve shape is driven by numerical conditioning, not by the data.

## Edge behaviour (defect)
Legacy total $/km vs the data near the recommended maximum (last 5 bins):

| Class | Data near xmax | Curve at 0.9 / 1.0 / 1.05 × xmax |
|---|---|---|
| COACH | 0.42 | 0.83 / 1.59 / **55.5** |
| INDUSTRIAL | 0.29 | 0.61 / 0.06 / **−0.02** |
| E STANDARD SCHOOL | 0.77 | 0.47 / 0.41 / 0.38 |

- In test1.csv one coach at 1.45 M → 1.55 M km is budgeted **$448k for 100,000 km** (97% of that test budget). The app only warns; it still adds the amount.
- INDUSTRIAL goes negative just past its limit; E STANDARD SCHOOL underestimates the high-km end by about half.

## Code-level causes (inferred from code)
- `polyfit` degree 15 on raw km (up to 1.5 M): ill-conditioned (numpy warns "RankWarning").
- Fit uses all bins up to ~1.5 M km even where xmax is 250 k (COMMERCIAL CAR), so sparse high-km bins bend the curve inside the range.
- Bin CPK is placed at the bin start, not its middle (≈5,000 km shift; small effect, inferred).

## Hourly rate and inflation (step 2, done)
- Labour is 18–41% of a typical year's budget (one vehicle, 50,000 km, mid-life). Moving the rate from 65 to 75 $/h raises the budget by **+2.8% (URBAN LOW FLOOR) to +6.3% (E STANDARD SCHOOL)**. Which rate is right is still open ([[open-questions]]).
- Costs are in 2025 dollars ([[inflation-adjustment]]); nothing inflates them to the budget year. With 2025 parts inflation at 7.55%, a 2026 parts budget is understated by roughly that much (inferred, if the rate persists).
- The inflation table starts at 2015, but the data starts in 2014-04: how 2014 work orders were adjusted is unknown ([[open-questions]]).

## Step 3: MIR work orders profile (BOULON export, read-only)
Source: `C:/TRANSDEV HUB/data/mir-export/dump/`, script `audit/mir_profile.py` (aggregates only).
- 426,883 work orders, 2014–2026 (about 30–40k per year); 2,516 vehicles; 1.27 M labour lines (real hours `TEMPSREEL` filled on 91%).
- Parts $ filled on 48% of work orders (many work orders have labour only), labour $ on 75%; negatives about 1%.
- **Odometer:** `ODOAVIE` is filled on only 12%, but `ODOINSPEC` is filled on 98.5% and behaves like a real odometer (rises over time; 1.7% of steps go down). 9,726 of 10,802 vehicle-years have at least 3 readings and positive km. Median 37,700 km/year; the top 10% (> 209,000 km/year) need filtering.
- **Vehicle class:** `TYPEVEC` is a numeric code with no lookup, but `TYPEAUTRE` holds the MIR type names (URBAIN, SCOLAIRE, COACH, VÉHICULE ÉLECTRIQUE…) that [[vehicle-class-mapping]] maps to ZBB classes. 867 vehicles are "VEHICULE DISPOSE" (disposed) and need their class from model/description.
- Verdict: **enough data for the reality check** (step 4).

## Step 4: reality check against actual MIR costs
Scripts `audit/reality_check.py` (vehicle-years, ZBB predictions) and `audit/reality_final.py` (cost definitions). A **vehicle-year** is one vehicle over one calendar year (2015–2025). km = last − first `ODOINSPEC` reading that year; ZBB budget = the class curve over that km; actual = MIR costs in 2025 $ (ZBB inflation factors) and real hours (`TBONSMEC.TEMPSREEL`) × 65 $/h. The **recommended range** is the class's `BEST_XMAX` km.
- **Column meanings** (MIR data dictionary `veripep 2022-10-14.pdf`, TBONS section; descriptions re-aligned with field names, so (inferred) from order): TOT_PIECES/PIECEA = parts cost / adjusted; TOT_MDOEUV/MDOEUA = labour cost / adjusted; TOT_SSUPP/SSUPPA = shop supply / adjusted; TOT_PARTINT/PARTIA = external-job parts / adjusted; TOT_TIMEINT = "external-job time" (sums to 12 M, so the unit is unclear).
- Actual parts = TOT_PIECEA + TOT_PARTIA + TOT_SSUPPA (Matteo's "internal + external parts + shop supply", adjusted). **Headline uses signed amounts** (real spending); Matteo's absolute-value rule is a variant.
- Sample: 4,059 usable vehicle-years (class known, ≥3 readings, 5,000–150,000 km), 3,877 inside the range. Only 4,699 of 9,182 vehicle-years could be classed: 867 disposed vehicles have no type and are excluded.

Fleet, inside the recommended range:

| Cost definition | ZBB total vs actual | Parts | Hours | Vehicles within ±25% |
|---|---|---|---|---|
| Real spending (signed) | **+7.9%** | +25% | −23% | 32% |
| Matteo's cleaning (negatives made positive) | +1.8% | +15% | −23% | 33% |
| Signed + external-job "time" counted as $ | +1.6% | +25% | −23% | 31% |
| Signed, vehicles with readings spanning ≥330 days (2,497) | +8.0% | +26% | −25% | 35% |

By class (real spending, inside range; full-year check in brackets):

| Class | Vehicle-years | ZBB total | Parts | Hours |
|---|---|---|---|---|
| URBAN LOW FLOOR | 796 | +10% (+10%) | +26% | −23% |
| STANDARD SCHOOL | 726 | +13% (0%) | +35% | −12% |
| MINI OTHER | 702 | −2% (−1%) | +14% | −24% |
| COACH | 557 | +14% (+16%) | +31% | −21% |
| E STANDARD SCHOOL | 366 | +8% (+9%) | +40% | −23% |
| MIDI | 249 | +3% (0%) | +24% | −33% |
| SERVICE | 245 | **−25% (−46%)** | −12% | −47% |
| MINI SCHOOL | 207 | **−33% (−36%)** | −24% | −42% |
| COMMERCIAL CAR | 21 | −23% | −12% | −38% |
| INDUSTRIAL | 8 | +38% | +112% | −39% |

- Fleet total by year (earlier definition) ranges from −15% to +7%: year-to-year swings are large.
- **Outside the recommended range** (182 vehicle-years): ZBB is off by about +500,000% (curve blow-up); "connect the dots" is −1%.
- **Implied hourly rate** (labour $ ÷ real hours): 29 $/h (2015) → 63 $/h (2025). 65 is consistent with current data; 75 is not supported (if TOT_MDOEUV is the internal labour charge, (inferred)).
- An earlier pass (unadjusted columns, parts + supplies only) suggested parts +46%; that was a definition error and is superseded.

## Verdict (plain language)
1. **For a whole fleet, inside the recommended km range, ZBB is close: within about 2–8% of real spending**, but partly by luck: **parts are 15–25% too high and labour hours about 23% too low**, and the two errors offset.
2. **For a single vehicle it is unreliable:** about 1 vehicle in 3 lands within ±25% of its actual cost.
3. **Two classes are clearly under-budgeted:** MINI SCHOOL (about −33%) and SERVICE (−25% to −46%).
4. **Any vehicle past the recommended km makes the budget meaningless.**
5. A much simpler curve ("connect the dots") does as well inside the range and stays sane outside it.

The result is probably **flattering to ZBB**: it is in-sample (Données_PB was built from the same years), and the excluded disposed vehicles are mostly old, high-km vehicles, where ZBB is weakest. Limits: in-sample (Données_PB built from the same years), a different MIR extraction from Matteo's (2,516 vs 3,568 vehicles), km per year from first/last reading. See [[defect-list]].

## Independent cross-check (second session, 2026-10-14, `audit/backtest.py`)
A separate run built from scratch (window = first to last odometer reading per vehicle-year; disposed vehicles classed via model; 5,545 vehicle-years) agrees with the reality check above: in range, ZBB total = **1.14 × actual** (same bias with a simple slice average, so it is a level problem, D2), and out of range the degree-15 curve is off by factors of thousands (D1). Flipping negative amounts adds +5.8% to MIR parts (D11).
