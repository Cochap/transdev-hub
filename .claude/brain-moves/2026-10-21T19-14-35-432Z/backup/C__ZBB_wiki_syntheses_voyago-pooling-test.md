---
type: synthesis
tags: [voyago, validation, accuracy, pooling]
sources: [raw/data/mir-voyago-2026-10-20/, external: C:/TRANSDEV HUB/data/mir-export/dump/, audit/voyago_pool_build.py, audit/voyago_pool_test.py, audit/voyago_pool_test2.py]
updated: 2026-10-20
---
# Does adding Voyago help? Pooling test (2026-10-20)

**Question (Greg):** Matteo pooled Voyago with Québec. Does more data make our predictions better?

**Method.** Same rolling "next year" test as [[budget-calculation-v2]], test years 2022-2025 (Voyago starts in 2021). Same rows scored every time; total = parts + 65 x hours; non-maintenance work excluded, odometer rule on, vehicles without a class left out. Voyago vehicle ids are offset by 10,000,000 so the engine never mixes a Québec and a Voyago vehicle that share an id ([[mir-voyago-export-2026-10-20]]). Pooled data: 11,433 vehicle-years (Québec 5,496, Voyago 5,937). Curve types chosen on years before 2022 with each setup's own data.

| Trained on | Tested on | Fleet total off (avg abs) | Typical vehicle off |
|---|---|---|---|
| Québec only | Québec | 9.8% | 42.1% |
| Québec + Voyago, one shared level | Québec | 10.8% | 41.5% |
| Québec + Voyago, own level per source | Québec | 9.7% | 43.0% |
| Québec only | Voyago | 82.7% | 80.5% |
| Québec + Voyago, one shared level | Voyago | 37.0% | 57.4% |
| Québec + Voyago, own level per source | Voyago | 12.8% | 49.7% |
| Voyago only (2023-2025) | Voyago | 11.5% | 50.8% |

## Findings
- **More data did not improve Québec.** 9.8% to 10.8% (shared level) or 9.7% (own level): no real change. Vehicle-level error stays at 41-43%. Pooling helped coaches and industrial vehicles but hurt mini school and commercial car.
- **Voyago is a different cost regime.** A Québec-trained model over-predicts Voyago by 83% (Voyago spends less per km for the same class, see the source page). With one shared cost level the pooled model is still 37% off.
- **A separate cost level per source fixes the fleet total** (Voyago 37% to 12.8%; 2024 and 2025 within 5%). A Voyago-only model does about as well (11.5%), so pooling the curves adds little over two separate models.
- **The per-vehicle error does not move with more data** (about 42% Québec, about 50% Voyago). The limit is not volume; it is what we know about each vehicle (planned vs unplanned work, vehicle details). This supports the proposed next step in [[budget-calculation-v2]] (ceiling test, then planned/unplanned split).
- Weakest class counts: only 41 Québec commercial-car test rows over 4 years, so class-level numbers there are noisy (inferred).

## Caveats
- Only 4 test years; Voyago's 2021 is a partial ramp-up (718 vehicle-years vs 1,426 in 2025), so its early levels may be unreliable (inferred).
- Level correction uses the last year's actual/predicted ratio per source (same idea as the Québec forecast level); not yet in the app.

## Recommendation (not yet decided)
Treat Québec and Voyago as separate cost levels. Add a Voyago fleet option to the app only if the supervisors want Voyago budgeted ([[open-questions]]). Do not expect better accuracy from pooling.
