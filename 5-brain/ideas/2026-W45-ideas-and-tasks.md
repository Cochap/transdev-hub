# Week of 2026-11-02: ideas, tasks, dropped items
Started Mon 2026-11-02 13:45 from `2026-W44-ideas-and-tasks.md`, `5-brain/handoffs/2026-10-29-eod-handoff.md` and `5-brain/logs/eod/2026-10-29/_digest.md`. No Claude sessions Fri 10-30 to Sun 11-01 (empty `_index.json`). Status: ✅ done · 🟡 started · ⬜ not started · 💤 dropped.

## 1. Finished last week (W44, 10-26 to 10-29)
| What | Where |
|---|---|
| Workshop ID card web app: FR/EN export, % spare, cycle in years, map from location | https://claude.ai/artifact/NK4HrpNshyytjdEYYwCf7u |
| Bilingual PowerPoint ID card (language ribbon, SVG icons, print-clean fields) + Henri's change list applied | `2-projects/workshop-id-card/powerpoint/Workshop_ID_Card_Fiche_atelier.pptm`, `henri-changes-2026-10-29.md` |
| Claude as PM for segmentation (status file) | `2-projects/workshop-segmentation/project-status.md` |
| Raw-documents process (`raw/` then wiki ingest) | `CLAUDE.md` map |
| Full-context end of day → morning hand-off | `5-brain/handoffs/` |
| Check-in transcript saved | `2-projects/workshop-segmentation/raw/2026-10-29-checkin-transcript.txt` |
| War-room council verdict | `2-projects/workshop-segmentation/warroom-2026-10-29.md` |
| Segment + medal system written | `cloud-repo/results/07-systeme-complet-segment-et-medaille.md` |
| Grid copy v2 GR (0-3 levels, original untouched) | `cloud-repo/data/Transdev Road Referential - Maturity grid - v2 GR.xlsx` |
| Questionnaire, test bench v2 (16 cases, 12/12), medal example (120 practices) | `2-projects/workshop-segmentation/*.xlsx` |
| Proposal page v6 + grid explained | https://claude.ai/artifact/CERCM3N9L4UoKpvAV3yDpA, https://claude.ai/artifact/NSkN343P9qyuGAyFstAdi2 |
| RAG radar skill + weekly task + seeded knowledge web (40 items); last30days lane working | `1-boulon/docs/rag-radar/` |
| World Monitor `wm` fixed (10/10 sources) | `C:\Users\rilg01\bin\wm.cmd` |
| Segmentation voice skill, HQ Projects tab | `.claude/skills/segmentation-voice/`, `boulon-hq.html` |

## 2. Done today (Mon 11-02)
- ✅ Renamed "Écart" → "Au-dessus du normal de…" and "Effectif" → "Assez de techniciens ? (Oui/Non)" in `banc-essai-segmentation-v2.xlsx` (sheet Cas, N4/O4). Column O now answers Oui/Non; the segment formula (column R) and the Tests count were updated to match. Not recalculated here (Excel COM blocked): open once in Excel to refresh. Backup `backup-banc-essai-segmentation-v2-2026-10-29.xlsx`. (The labels were never in `questionnaire-travaux-sur-place.xlsx`.)
- ✅ RAG radar Monday run: 13 new, 12 updated (`1-boulon/docs/rag-radar/runs/2026-11-02.md`). Friday routine suggester: 4 cards on `5-brain/routines/recos/2026-11-02.html` (waits on your picks).
- ✅ Workshop ID card web app: city-search fix, live on https://claude.ai/artifact/NK4HrpNshyytjdEYYwCf7u (city search checked signed-out; generate one card there before sending).
- ✅ Workshop ID card PowerPoint rebuilt (backgrounds, values, French units, sample 10 %), E2E-tested with its macros: `2-projects/workshop-id-card/powerpoint/Workshop_ID_Card_Fiche_atelier.pptm`.
- 🟡 Send both to Henri (link + .pptm; tips: Enable Content, ribbon Print) and ask for logos: Greg.
- 🟡 Marketing skills scout: options listed (Anthropic Marketing plugin, coreyhaines31/marketingskills, Product Marketing, Hyper, Windsor.ai): Greg picks.

## 3. Open, carried over (what waits on whom)
| # | Item | Waits on |
|---|---|---|
| T1 | Send Pierre the staffing-curve question (draft ready) | Greg sends |
| T2 | Send Gabriel the < 50-word system pitch (draft ready) | Greg sends |
| T3 | Segmentation call (Fri 10-30 or Mon): did it happen? | Greg says |
| T4 | Call one-pager from `07-systeme-complet…` in S1/S2/S3 wording | Claude, after T3 |
| T5 | Medal: bronze/silver thresholds and weights; finish the cut-off medal explanation | Claude |
| T6 | Redo grid question count (67 found vs 78) | Claude |
| T7 | Commit 10-29 results to private repo Cochap/workshop-segmentation | Claude |
| T8 | Web ID card: re-check Canada default, km label, SVG logos | Claude |
| T9 | Henri's real logos | Henri |
| T10 | Who is "Eckern"? / meaning of "enlève le chapitre deux" | Greg says |
| T11 | Move `Scoring test.xlsx` to segmentation `raw/`; 5 brain proposals in `5-brain/improvements.md` | Greg's yes |
| T12 | RAG radar: load 41 golden questions into Copilot Studio Evaluations | Claude |
| T13 | `wm` modes inside the terminal (I23) | Greg's yes |
| T14 | Ticket 77048 (IT) | IT (no nudge) |
| — | W44 section 2 items D2-D9 still "you decide" | Greg |

## 4. Parked ideas
- ⬜ 2026-11-02: all-in-one marketing skills for Claude (brand identity, SEO, campaigns, scheduling, creative automation). Researched in session "Weekly task completion review"; ~10 ECC skills already installed; only paid tools schedule posts. Waits on Greg's pick.

## 5. Tue 11-03 (end of day)
- ✅ MVP scope = school-bus manuals only (`1-boulon/docs/mvp-school-bus-2026-11-03.md`); 🟡 final file list waits on the text scan.
- ⬜ Professional methodology document + project charter from the DIX30 transcript (transcription running).
- ✅ Single guided segmentation workbook `segmentation-atelier.xlsx`; medal thresholds set. 🟡 Greg sends the Pierre message; face-to-face on curve points.
- ✅ Geotab explainer v1 rendered; 🟡 Greg listens to the sound.
- 🟡 Self-improvement skills inventory (22 skills, Keep proposals): Greg decides. ⬜ Save draft skill scheduled-routine-audit: Greg says yes or no.

## 6. Wed 11-04 (end of day)
- ✅ MVP class = STANDARD SCHOOL (193 vehicles). Scan done 2,976/2,976: only `IC Leeds/IC bus 2016-2024.pdf` in SharePoint (~136 MB est., > 50 MB Free). 🟡 Greg decides the subscription path (Disabled; #77048 targets it). Rules: complete manual per bus; no maker-website manuals.
- ✅ Hub on private GitHub `Cochap/transdev-hub`; `cloud-sync.ps1` + 3 Windows tasks. 🟡 GitHub Actions routines wait on Greg: `claude setup-token` -> Actions secret. ⬜ Greg: keep or revoke `HUB_TOKEN`; ⬜ D11 segmentation on GitHub needs an approval answer.
- ✅ Morning brief skill, interest map, 2 lexicons, 23 wiki pages. ⬜ Greg picks a community skill (`microsoft/skills`, `tech-digest`).
- ⬜ DIX30: Greg reruns Whisper at home; then notes + charter (Claude).
- ⬜ Idea (passing): OpenWispr desktop app install, never answered.
- ✅ VoiceStudio fixed (one launch). ⬜ Greg: permanent `UV_SYSTEM_CERTS=1`?

## 7. Thu 11-05 (end of day)
- ✅ DIX30 transcript, minutes, formal plan v1.0 (.docx) and v1.1 (.docx). ⬜ Greg reviews, re-listens 10 timestamps, sends to Dominique. ⬜ Pierre: 5 proposed changes to brief 551.
- ✅ $0 Copilot Studio SharePoint path verified (page citations). ✅ Azure MCP + microsoft/skills installed. ⬜ Test Azure MCP inside Claude after restart.
- 🟡 Idea (Greg, 12:59): Azure-free multimodal RAG keeping tables — built as Phase 0 (82% blind retrieval); end-to-end answer test pending; D7 waits on Greg's yes.
- ⬜ Idea (passing, 13:06): "news deep research" tools scan — not started.
- 🟡 ThinkStation PGX arrived: Greg borrows USB keyboard/mouse, does guide Parts 1-3; ⬜ French IT network request (Claude drafts on yes).
- ⬜ Unanswered from the morning: "guide me on the claude github secret again"; "point me back" to open decisions.
