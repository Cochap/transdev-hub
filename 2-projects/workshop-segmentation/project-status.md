# Workshop segmentation — project status (PM file)
Updated 2026-10-27 after the kickoff interview with Greg. Source of truth for scope: `raw/Transdev_compte_rendu_et_perimetre.txt` (compte rendu v0.1). This file adds only what Greg confirmed on top of it.

## Confirmed by Greg 2026-10-27 (overrides the compte rendu's "to confirm" items)
| Item | Answer |
|---|---|
| Owner, approver, coordinator (Q02) | **Greg**. Henri and Pierre review deliverables only. |
| Team | Greg + intern **Gabriel**; Claude as PM/orchestrator. Task split Greg/Gabriel not set yet. |
| AI tools (D11, Q10) | Claude and ChatGPT both allowed for this project. |
| ID card tool (Q11, D04) | **PowerPoint**. Greg's new version is being built in a separate session; formatting and layout changes remain. Web app (`../workshop-id-card/`) = demo only. |
| Next check-in (Q18, A12) | **Thursday 2026-10-29**, with Henri and Pierre. Show: finished ID card, workbook analysis, maturity grid critique. |
| Deadline | Prepare the check-in first; year-end target not confirmed as firm. |
| Canadian workshops in scope (Q12) | Unknown. The workbook has 5: Sherbrooke, Châteauguay, Beloeil, Kelowna, Ottawa (Ottawa flagged "not in calculation"). Saint-Jean, East Angus and Drummondville are named in the meeting but have no data. |

## Material received (A01 mostly done)
In `raw/segmentation documents.zip`:
- `Segment Scoring System (Test).xlsx`: sheets Inputs, Test, Stocks. 30+ depots (Portugal, France, Canada, USA, Sweden). The Test sheet holds 1/3/5 scores per factor, a total (col AO) and segment columns (AQ, AS). Few live formulas, so the scores look typed in by hand (to check).
- `TRANSDEV Bus Maintenance Referential_2026-07-10_V1 - without safety.pptx` (117 MB).
- `Transdev Road Referential - Maturity grid.xlsx`: Intro, Dashboard, Action Plan, ID Card, 11 domain sheets (Strategy … Documentation). Segments S1 small, S2 medium/regional, S3 large/multi-site/complex.
- Still missing: the HSE supplement (A02).

## Early findings
- The workbook puts Châteauguay in segment 2; the meeting expected segment 1 because it lacks space. Raise this Thursday.

## Next actions
| # | Action | Who | For |
|---|---|---|---|
| 1 | Finish the ID card PowerPoint (layout fixes) | Greg (other session) | Thu 10-29 |
| 2 | Workbook analysis: real formulas, weights, flaws, Canadian results | Claude agent | Thu 10-29 |
| 3 | Maturity grid critique: S2 vs S3 overlap, radar, medals | Claude agent | Thu 10-29 |
| 4 | Ask Henri for the HSE supplement and the list of Canadian workshops in scope | Greg | asap |
| 5 | Split the work between Greg and Gabriel | Greg | Thu |

## Update 2026-10-28 (end of day)
| # | Action | State |
|---|---|---|
| 2 | Workbook analysis | ✅ `cloud-repo/results/01-workbook-analysis.md` |
| 3 | Maturity grid critique | ✅ `cloud-repo/results/02-maturity-critique.md` (Greg edited it). 71 of 76 questions identical for S2 and S3; no medal rule; all 9 HSE questions ticked for every segment |
| 6 | Corrected scoring model (Greg + Claude are the technical leads) | ✅ proposal `cloud-repo/results/03-scoring-v2-proposal.md`, workbook `cloud-repo/data/Segment Scoring System (v2 proposal).xlsx` (Parameters sheet, 4 switches), plain guide `cloud-repo/results/04-formula-guide.md` |
| 7 | Cloud routine on the repo | ⬜ private repo https://github.com/Cochap/workshop-segmentation created and pushed; routine save refused twice ("connect your GitHub account first"). Greg: build it at claude.ai/code/routines from `cloud-repo/tasks/routine-prompt.txt`, or drop it |
| 8 | Proposal to Pierre (~25 words, problem first) | ✅ sent by Greg; Pierre replied 14:30. Claude's reading, not confirmed by Greg: staff cap approved; complexity agreed in principle; stock per bus on hold; harsh-conditions direction open |
| 1, 4, 5 | ID card layout, Henri (HSE supplement, workshop list), Gabriel split | unchanged |

Key findings: the meeting transcript (`C:\Users\rilg01\Downloads\End transcri.txt`, not yet in `raw/`) says harsher conditions mean LOWER expectations; typed targets lean the other way. Recommended v2 setup is the most stable (2 frequent flips in 108 runs vs 4 for the original). Châteauguay is still S2 (meeting expected S1).

For the Thu 10-29 check-in: harsh-condition direction; stock out of Resources?; how to calculate complexity; Châteauguay; who set the typed targets; Beloeil 178 vs ~80 buses; Kelowna stock and the currency of Canada's stock values; AI use under the C2 classification (Henri).
Flag: `ROUTER.md` here says "this folder stays local", but `cloud-repo/` is now on private GitHub. Greg to confirm.
## Decided by Greg 2026-10-29 (morning, before the check-in)
- **Harsh conditions:** the harder the conditions, the LOWER the segment (lower expectations). Matches the meeting transcript. Workbook switch to set: "lower" (not yet changed; with all fixes it matches 10 of 20 typed targets vs 15 for "higher", which questions the targets).
- **Complexity:** directly proportional to fleet age and to number of models; higher complexity = lower segment. Greg thinks Pierre misunderstood ("pas si simple"); to clarify at the check-in. v2 keeps the hardest of the two signals.
- **Stock:** Claude's 10-28 reading ("on hold, back to original") was wrong. Pierre doubts stock value as a criterion at all (driven by geography and delivery lead time, outside the workshop's control). Plan: no revert; propose Resources = technicians + bays, stock kept on the ID card as context; Claude prepares the "no stock" scenario with the stability test.
- **AI use (D11 / C2):** not a factor for this project. Do not raise it with Henri. (Supersedes the confidentiality check below.)
- Brief: `brief-checkin-2026-10-29.md`.

## Check-in 2026-10-29 afternoon (transcript `raw/2026-10-29-checkin-transcript.txt`)
- Eckern: segment = factual constraints, medal = quality. Gabriel's point (weights are tuned to the wanted result, circular) changed his mind. Nature of work matters (small engine shop = S3; huge depot doing only small work = S1), base ratios (spare %, mechanics per vehicle) must still count. Target Segment column: ignore. Asks for a from-zero proposal; next call Fri 10-30 (30 min) or Mon.
- Proposal drafted: `proposition-segment-medaille-2026-10-30.md` (mission sets base segment, tension moves one step max, no weights; medal = same questions with levels 0-3).
- ID card to-do (web app + PowerPoint), from Eckern:
  1. Bilingual FR/EN with a switcher; the generated card follows the interface language.
  2. Remove decorative "AI" text ("une fiche claire, un atelier à la fois", "nouvelle fiche atelier"...). Call it only "fiche atelier" / "workshop ID card".
  3. One dense page, no 5 steps.
  4. Country defaults to Canada; pick a Canadian city.
  5. Label "kilométrage annuel moyen par bus".
  6. Small compact input boxes (people, shifts, operating days).
  7. Logos: Eckern sends them; align them; render as SVG (current ones blurry); workshop tool icons behind.
  8. PowerPoint: FR/EN version; ActiveX controls with no outline, yellow background on screen that turns transparent when printing, editable in normal view, prints with Ctrl+P.

## Prepared by Claude 2026-10-29 (before the check-in, nothing changed in the workbook)
- `cloud-repo/results/05-scenarios-2026-10-29.md`: no-stock scenario with Greg's direction. Only 3 depots move; Chateauguay goes S1 (as the meeting expected). Problem found: 6 of 20 depots score exactly 60 or 70, so cut-offs must be set from reference cases with the technical leads. Continuous scale tested: does not fix it.
- `cloud-repo/results/06-dictionnaire-inputs.md`: input dictionary. Workbook comments answer three open questions: stock is entered in euros; target segments are each depot's self-assessment; spare ratio = spares at worst peak / total buses. Service type and energy mix are flagged for use but unused.
- `compte-rendu-v0.2-corrections.md`: Q01-Q18 status, decisions D13-D16, actions A01-A12.
- Transcript grounding for Greg's direction: B36-B38 (climate), B46 (many models = lower expectations).
- Not committed to the repo yet.

Confidentiality check (D11, superseded 2026-10-29: not a factor): the second speaker asked that the method not go into AI, while the table above says Claude and ChatGPT are allowed. Greg to confirm with Henri. Also confirm which speaker is Pierre and which is Henri (inferred, not named in the transcript).

## End of day 2026-10-29 (routed by the automated end of day; digest `5-brain/logs/eod/2026-10-29/_digest.md`)
Built after the check-in (sessions "Good morning" and its fork):
- `warroom-2026-10-29.md` (council: computed segment is the record; manager target = "claimed segment"; 3 columns; only Pierre signs overrides, max one step).
- `cloud-repo/results/07-systeme-complet-segment-et-medaille.md`; grid copy `cloud-repo/data/Transdev Road Referential - Maturity grid - v2 GR.xlsx` (levels 0-3; original untouched; question count 67 vs 78 to redo).
- `questionnaire-travaux-sur-place.xlsx` (current; `questionnaire-niveau-maintenance*.xlsx` and `banc-essai-segmentation.xlsx` are superseded), `banc-essai-segmentation-v2.xlsx` (16 cases, 12/12), `medaille-exemple.xlsx` (120 practices, random answers).
- Proposal page "Segmenter par la mission" https://claude.ai/artifact/CERCM3N9L4UoKpvAV3yDpA (v6), grid explained https://claude.ai/artifact/NSkN343P9qyuGAyFstAdi2.
- Working hypothesis: segment = type of work on site (referential slide 41) + staffing curve (slide 52, fleet age only; the 0.8 harsh-conditions factor in the test bench is Claude's, not the referential's).

Open:
| # | Item | Who |
|---|---|---|
| 9 | Send the drafted message to Pierre asking for the real staffing-curve data | Greg (draft in the fork session) |
| 10 | Send the < 50-word system summary to Gabriel | Greg (draft in the fork session) |
| 11 | Next call with the reviewer, Fri 10-30 (30 min) or Mon: present the from-zero proposal | Greg + Gabriel |
| 12 | Questionnaire: rename "Écart" -> "Au-dessus du normal de…", "Effectif" -> "Assez de techniciens ? (Oui/Non)" | Claude, on Greg's go |
| 13 | Bronze/silver thresholds and medal weights | undecided |
| 14 | Commit today's results to the private repo | waits on Greg |
| 15 | MIR branch number -> name list | Alex |
| 16 | `Scoring test.xlsx` (vault root) -> `raw/`: proposed in `5-brain/routers/moves.json` `_proposed` | Greg's yes |

Conflict to confirm: the transcript speaker "Eckern" is read as Pierre's role in one session, while the check-in section above and the ID card session attribute the logos and the from-zero request to Henri. Greg to say who Eckern is.

## 2026-11-03 — single workbook and new medal thresholds
- `segmentation-atelier.xlsx` (one workbook, 5 steps + Paramètres) shown to Gabriel: "pas pire".
- Medal thresholds changed (Greg + Gabriel): **gold** = total ≥ 90 % and weakest pillar ≥ 75 %; **silver** = 75 % / 60 %; **bronze** = every workshop below silver (bronze is the bottom group, no "no medal" case). Gold no longer 100/100 (unrealistic). To confirm with Pierre.
- Sample C03 (random answers): S2 bronze (74 % / 54 %); with 7 technicians S1 silver (88 % / 69 %).
- Thresholds written into the open `segmentation-atelier.xlsx` via live Excel (Paramètres C9:C14) and saved; weakest-pillar red flag now uses the silver floor.
- Pierre on the staffing curve (11-03): no formula, "un truc classique du métier", he drew it on a whiteboard. Curve stays a placeholder until rebuilt with him.
