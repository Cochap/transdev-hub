---
title: Workshop segmentation project (bus maintenance workshops, Transdev Canada)
type: project
status: current
updated: 2026-10-28
sources: [../sources/workshop-segmentation-debrief-v0-1.md, ../../../2-projects/workshop-segmentation/raw/Transdev_compte_rendu_et_perimetre.txt]
---

**Bottom line:** assigned to Greg on 2026-10-27. Make expectations of Canadian bus maintenance workshops comparable and fair to their means: an ID card per workshop, a three-segment classification, and a bronze/silver/gold maturity grid inside each segment. Separate from [[boulon]]; no dependency on it was stated.

## Plain-language idea
Hotels come in ranges: a budget hotel and a luxury hotel are judged against different expectations. Workshops differ the same way (building, staff, fleet, climate). A small workshop with few resources can be excellent for its segment; a big one can underperform in its own. Source: [[workshop-segmentation-debrief-v0-1]].

## Deliverables (as discussed, scope not yet validated)
| Lot | What | State at the meeting |
|---|---|---|
| L1 Workshop ID card | printable sign for the garage entrance, manual entry, stable layout; PowerPoint preferred | clear need; tool to confirm. See [[workshop-id-card]] |
| L2 Segmentation model | explainable score from the existing inputs, ratios and weights proposed by the team, then technical review | formula, ratios, weights, thresholds still to develop or review |
| L3 Maturity grid | expectations per segment, position as bronze, silver or gold | existing grid to analyse; depth of revision to confirm |
| L4 Method file | recommendation by the debrief writer: document definitions, calculations, versions, results | derived, to confirm |

Rules and boundaries: [[workshop-segmentation-ground-rules]]. Concepts: [[workshop-segment-vs-maturity]].

## Who (observed in the meeting, not an approved responsibility chart)
- [[pierre-zivec]]: business explanations and examples; proposed final authority on the model and scope (to confirm).
- [[henri]]: shares the material; proposed coordination and receipt of deliverables (to confirm).
- [[greg-riley]] and other contributors: analysis, build (split to decide).
- Provincial technical managers: review the Canadian rankings. Workshop managers: supply their workshop data. France: works in parallel; later comparison.

## Next steps named at the meeting
Receive the material (presentation pack, ID card, Excel matrix, maturity grid, a separate HSE supplement), read the reference, list the input fields, build the ID card, analyse the existing matrix, then test the proposal on Canadian workshop data and compare with France. A wish to rank the workshops before year end was voiced; no firm date exists.

## Status 2026-10-27
- Debrief v0.1 ingested; awaiting review by participants and a v0.2 correction round.
- An ID card web app prototype was started the same day in a separate session: `2-projects/workshop-id-card/` (see [[workshop-id-card]]).
- Waiting on: the meeting material, the HSE supplement, named owners, workshop list, delivery date.

## Status 2026-10-28
- Workbook analysis, maturity critique, a v2 scoring proposal and a step-by-step formula guide are done: `2-projects/workshop-segmentation/cloud-repo/results/01` to `04`, workbook `cloud-repo/data/Segment Scoring System (v2 proposal).xlsx`. Greg and Claude act as the technical leads for weights and thresholds; each model change goes to Pierre first as a short proposal. Source: `5-brain/logs/eod/2026-10-28/_digest.md`.
- Meeting transcript (`C:\Users\rilg01\Downloads\End transcri.txt`, not yet in `raw/`): harsher conditions mean LOWER expectations. This contradicts the typed targets in the workbook, which lean higher; open for the 2026-10-29 check-in.
- Pierre (reply 2026-10-28, as read by Claude, not yet confirmed by Greg): staff cap approved; complexity agreed in principle; stock per bus on hold; direction open. Space without mechanics is useless; stock depends on geography and delivery lead time.
- The working files are on a private GitHub repo (`Cochap/workshop-segmentation`). Check-in with Henri and Pierre on 2026-10-29.

## Open questions (full list in [[open-questions]])
Q01 meeting date and who validates the debrief; Q02 official owner and approver; Q03 reference files and versions; Q04 exact allowed inputs; Q05 definitions of actual, funded and vacant staff; Q08 is the score 0 to 3 and what thresholds; Q10 which tools and spaces are allowed for this information.

## Related
[[workshop-segmentation-debrief-v0-1]] · [[workshop-id-card]] · [[workshop-segment-vs-maturity]] · [[workshop-segmentation-ground-rules]] · [[overview]] · [[index]]
