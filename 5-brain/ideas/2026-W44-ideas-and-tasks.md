# Week of 2026-10-26: ideas, tasks, dropped items
Gathered 2026-10-28 09:31 from every conversation since Mon 10-26 (`5-brain/logs/eod/2026-10-26/`, `2026-10-27/`, `2026-10-28/`) and the open lists in `RESUME.md` and `5-brain/improvements.md`. Status: ✅ done · 🟡 started · ⬜ not started · 💤 dropped (no one picked it up).

## 1. Ideas you had this week
| # | Idea (your words, short) | Day | Status | Where it lives |
|---|---|---|---|---|
| I1 | Install career-ops and use it to fix Anouk's résumé | Mon 10-26 | 🟡 French draft cleaned, not tailored (no job posting) | `4-learning/references/career-ops/cv.md` |
| I2 | VoiceStudio as a new project in the hub | Tue 10-27 | 🟡 installed + launched once; no use decided | `2-projects/voicestudio` |
| I3 | Workshop ID card web app coworkers can test themselves | Tue | 🟡 live, private; share + downloads untested in claude.ai | https://claude.ai/artifact/NK4HrpNshyytjdEYYwCf7u |
| I4 | Card export in FR or EN, % spare computed, cycle in years only | Tue | ✅ | same artifact |
| I5 | Ownership fields = pick-a-logo, placeholders until you send images | Tue | 🟡 web ✅; PowerPoint: "nothing pops up" when clicked (unconfirmed fix) | `.pptm` in OneDrive Documents |
| I6 | Map drawn automatically from the location typed | Tue | ✅ country/province | web + `.pptm` |
| I7 | Map pin on the actual city | Tue | ⬜ possible offline with GeoNames (~1-3 MB, Estimate); needs your OK | — |
| I8 | Fillable PowerPoint with developer controls, same look as your slide | Tue | 🟡 v2; layout polish left | `.pptm` |
| I9 | Claude as PM + agent orchestrator for segmentation, technical↔non-technical link | Tue | ✅ set up | `2-projects/workshop-segmentation/project-status.md` |
| I10 | Cloud routines run the workbook analyses from GitHub | Tue→Wed | 🟡 private repo created + pushed; routine save refused twice even after GitHub connect; analyses were run locally instead. Greg: build it at claude.ai/code/routines or drop it | `2-projects/workshop-segmentation/cloud-repo/tasks/routine-prompt.txt` |
| I11 | A clear "where do raw documents go" process for the hub | Tue | ✅ explained: each project's `raw/` folder, then `llm-wiki` ingest | `CLAUDE.md` map row |
| I12 | End of day and good morning must hand over the full context | Wed | ✅ fixed today, first real test tonight | `5-brain/handoffs/<date>-eod-handoff.md` |

## 2. Dropped or stalled (from earlier weeks, nobody moved them)
| # | Item | Since | Why stalled | Keep / drop? |
|---|---|---|---|---|
| D1 | Daily Digest launcher (`LAUNCH.cmd`) | 10-21 | ✅ exists (`C:Usersilg01DAILY DIGESTLAUNCH.cmd`, checked 10-28); plus `wm` / `worldmonitor` launchers | closed |
| D2 | Working replacement for the continuous-learning observer | 10-21 | needs WSL2; partly covered by end of day | you decide |
| D3 | Power BI ZBB report: does it open? | 10-22 | waiting on your look | you decide |
| D4 | ZBB standard school hourly rate ($65 or $75) | 10-22 | your call | you decide |
| D5 | BOULON: top 3 brands + mechanics' language | 10-20 | waiting on Sebastien | keep |
| D6 | Exo Rails: ask Sebastien what you can help with | 10-20 | not sent | you decide |
| D7 | Résumé Transdev section: needs a job posting | 10-07 | no posting | you decide |
| D8 | Split `1-boulon/docs` into subfolders | 10-21 | needs your yes | you decide |
| D9 | Learning: Lesson 8 quiz (deck built) | 10-21 | no learning since | keep |
| D10 | Ticket 77048 (IT) | 09-25 | with IT, day 33 | keep (no nudge) |

## 3. Your tasks today (Wed 10-28), with subtasks
Order = what unblocks the most first. Tomorrow's check-in content is NOT started here (you asked).
1. **Connect GitHub to Claude** (2 min). Unblocks I10.
   - Open the page the other session opened → approve → tell that session "done".
2. **Email Henri** (5 min, French). Unblocks the scope.
   - Ask for the HSE supplement.
   - Ask for the official list of Canadian workshops in scope.
3. **Decide Gabriel's share** (10 min). Possible split: Gabriel fills ID cards for the 5 depots; you do the scoring review.
4. **PowerPoint ID card** (30-45 min, with Claude).
   - Check the ownership logo click opens the choices (I5).
   - Layout polish you still want.
   - Say yes/no to the city pin (I7).
   - Untick "Trust access to the VBA project object model".
5. **Logos**: send the 4 images + the name under each (web + PowerPoint swap in one go).
6. **Test the web demo once in claude.ai** (5 min): open, download PNG and PDF, then share.
7. **Sort section 2**: mark each item keep or drop (I'll archive the drops).

## 4. Parked ideas: add new ones here as they come
- (empty: say "idea: …" in any session; end of day collects it here)

## 5. Added at end of day 2026-10-28 (from the day's sessions)
- Single correction log (one LEARNINGS-style file) instead of one memory file per correction: undecided, Greg is unsure (f0903404).
- Per-project HQ view with top 3 next moves: built as the HQ Projects tab (017011e7).
- Voice skill from Pierre's and Henri's transcript sentences: built as `.claude/skills/segmentation-voice/` (017011e7).
- Rewrite the whole 1/3/5 scoring: not built; continuous-scoring option offered, not started (017011e7).
- Per-session ponytail mode: tried, switched off, then interrupted (017011e7).
- World Monitor keys for the commands that need one: not started, waiting on which data sources matter (f0903404).
- Technicians count double (a softer staff cap): offered, undecided (017011e7).
- A dedicated agent for the segmentation project: floated, not started (017011e7).
- More differentiating maturity questions: not started; one pilot sample advised first (017011e7).
- Rename HQ and add a segmentation Phase tab: offered, not started (017011e7).

## 6. Added at end of day 2026-10-29 (from the day's sessions; digest `5-brain/logs/eod/2026-10-29/_digest.md`)
| # | Idea | Status | Where it lives |
|---|---|---|---|
| I13 | Weekly RAG radar: web of knowledge of self-hosted RAG tools | ✅ built + seeded (40 items); first Monday run 11-02 08:15 not yet observed | `1-boulon/docs/rag-radar/knowledge-web.md`, skill `rag-radar` |
| I14 | Use last30days inside the routine (community lane F) | ✅ installed, lane re-tested with every source returning results | `5-brain/scripts/last30days-run.py`, `5-brain/brainstorms/2026-10-29-last30days-in-rag-radar.md` |
| I15 | X cookies expire: "X empty" warning on report line 1; xAI key if they expire more than weekly | 🟡 warning planned; xAI key needs an approval package (costs money) | rag-radar task prompt |
| I16 | ECC war-room council on the segmentation problem | ✅ verdict saved | `2-projects/workshop-segmentation/warroom-2026-10-29.md` |
| I17 | Cumulative S1/S2/S3 criteria (S3 needs test benches, precision equipment) | 🟡 liked by the council; only possible in grid v2 (no new inputs in v1) | `cloud-repo/results/07-systeme-complet-segment-et-medaille.md` |
| I18 | Segment from type of work on site (slide 41) + staffing curve (slide 52) | 🟡 working hypothesis; curve data asked from Pierre (draft not sent) | proposal artifact https://claude.ai/artifact/CERCM3N9L4UoKpvAV3yDpA |
| I19 | Imaginary test workshops without Henri's validation | ✅ test bench v2, 16 cases, 12/12 | `2-projects/workshop-segmentation/banc-essai-segmentation-v2.xlsx` |
| I20 | Questionnaire "travaux sur place" as an Excel sheet | ✅ v1 (Écart/Effectif renaming still to do) | `2-projects/workshop-segmentation/questionnaire-travaux-sur-place.xlsx` |
| I21 | Medal example graded with random answers | ✅ 120 practices | `2-projects/workshop-segmentation/medaille-exemple.xlsx` |
| I22 | ID card: all logos as SVG; one bilingual file | ✅ PowerPoint; web app logos not re-checked; Henri's real logos awaited | `2-projects/workshop-id-card/henri-changes-2026-10-29.md` |
| I23 | World Monitor modes (tech / good news / finance) inside `wm` | ⬜ option 2 offered (small change to 2 files), not built; web modes work today | `C:\Users\rilg01\DAILY DIGEST\worldmonitor\cli\src\tui\data\store.mjs` line 16 |
