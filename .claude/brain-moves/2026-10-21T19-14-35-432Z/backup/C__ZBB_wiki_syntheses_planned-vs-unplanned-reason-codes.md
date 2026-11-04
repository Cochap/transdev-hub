---
type: synthesis
tags: [accuracy, reason-codes, planned-maintenance, data-gap]
sources: [audit/reason_split_build.py, audit/reason_split_test.py, audit/out/reason_split_stats.csv (git-ignored), external: C:/TRANSDEV HUB/data/mir-export/dump/ (TBONSMEC, TBONSDET, A_CODERAISONEXCLU), raw/data/mir-voyago-2026-10-20/]
updated: 2026-10-20
---
# Planned vs unplanned work: what the reason codes allow (2026-10-20)

**Goal.** Follow-up to [[ceiling-test]]: split cost into a predictable planned part and unpredictable breakdowns, so a budget can say "firm part + reserve". **Result: it cannot be built reliably yet. We do not know what the main codes mean, and the code system itself changed in 2018.**

## Dead end 1: the work-order flags are empty
`TBONS` has `CB_PLANIFIE`, `CB_NONPLANIFIE`, `CB_URGENCE` (planned / unplanned / emergency). They are 0 on 99.9% of Québec work orders and 99.5% of Voyago ones (only 239 and 495 "emergency" flags). Not usable.

## Dead end 2: the reason codes changed in 2018 and most are undocumented
Share of Québec maintenance cost by reason code (2015-2025 $; hours + parts allocated by line):

| Code | Dictionary says | Cost share overall | Years used |
|---|---|---|---|
| MP | ENTRETIENS SYSTEMATIQUES (scheduled maintenance) | 13.9% | all years (10% in 2015, 15% in 2025) |
| A/S | DEPANNAGE (breakdown service) | 3.3% | all years |
| PV | (blank) | 2.1% | all years |
| REP | REPARATION COURANTE (routine repair) | 6.6% | 2015-2017 only (about 27% of cost then) |
| REM | REMPLACER (replace) | 12.4% | 2015-2017 only (about 48% then) |
| VERIF | VERIFICATION (inspection) | 1.9% | 2015-2017 only |
| **RMP** | **not in the dictionary** | **23.3%** | 2018 onward (about 33% of cost) |
| **RDS** | **not in the dictionary** | **21.8%** | 2018 onward (about 29%) |
| **RND** | **not in the dictionary** | **13.4%** | 2018 onward (15% rising to 24%) |

- From 2018 the old repair/replace/inspect codes disappear and RMP, RDS, RND take over about 75% of the cost. This lines up with the MIR/HxGN change (inferred). Task descriptions on the labour lines are blank, so the data cannot tell us what the new codes mean.
- Only MP (scheduled) and A/S (breakdown) are clear and span all years: about 17% of cost combined.
- Voyago uses another vocabulary: VMR 34% of hours, PMS 33%, FND 14%, FLW 9%, GAR 2.5%, BRK 2.2%, CDM 1.4%, EXT 1.0% and others (meaning unknown; its dictionary has one blank row). PMS looks like preventive maintenance (inferred).
- Do not guess: a wrong label would put real money on the wrong side of the budget.

## What the one clear code shows
Predicting each code's next-year cost per vehicle with last year's class cost per km x planned km (a simple benchmark, 2019-2025):

| Code | Weighted error | Cost repeats on the same vehicle year to year (rank correlation) |
|---|---|---|
| MP (scheduled) | 51% | 0.38 |
| A/S (breakdown) | 104% | 0.45 |
| RMP / RDS / RND | 71% / 70% / 95% | 0.62 / 0.68 / 0.56 |
| All codes together | 53% | 0.59 |

Even the code that is clearly scheduled maintenance is not more predictable than the total with this benchmark (51% vs 53%). So the premise "planned work is the predictable part" is **not supported by the one planned code we can trust**. Breakdown service (A/S) is the least predictable, as expected. The unknown codes RMP, RDS and RND repeat most on the same vehicle (0.56 to 0.68), which hints that they include recurring, vehicle-specific work (inferred).

## Next
Ask Alex Dumenne (MIR access) what RMP, RDS, RND, SERV, PV and PROJ mean, why the codes changed in 2018, and what Voyago's codes mean; Greg sends, Claude drafts. Until then keep presenting fleet totals with ranges ([[ceiling-test]]).
