# End-of-day digest, Thu 2026-10-29
Built by the 16:45 scheduled end-of-day run (session fccbb23b). Extracts beside this file; `_index.json` lists them. Helpers (Sonnet) read the 5 long extracts; Claude read the 3 short ones. No keys or secrets below.

## Sessions
| Extract | App title | Project | One-line outcome | Safe to archive |
|---|---|---|---|---|
| b794cb22 | Good morning | workspace + segmentation | Morning check, check-in prep, war-room council, segment/medal redesign, grid copy v2 GR, proposal artifact v6 | no (medal explanation cut off; Écart/Effectif renaming sent to fork) |
| 826e5184 | Good morning (fork) | segmentation | Questionnaire `questionnaire-travaux-sur-place.xlsx`, test bench v2 (12/12), medal example (120 practices); drafts to Gabriel and Pierre (not sent) | no (Pierre and Gabriel messages unsent) |
| 704065d5 | Workshop ID card changes | segmentation (ID card) | Henri's changes applied to web app + new bilingual `Workshop_ID_Card_Fiche_atelier.pptm`; change list `henri-changes-2026-10-29.md` | no (Greg uploads 3 web files; logos from Henri) |
| 1a951f7a | Self-hosted RAG chatbot tracking routine | BOULON research | rag-radar skill + weekly task; last30days plugin installed, lane F fixed after Greg's correction (all sources returned results) | yes (Monday run is tracked in the hand-off) |
| 24f263cc | RAG radar (weekly) | BOULON research | Seed run: 40 items, top pick Copilot Studio Evaluations (MC1518085, try); report `1-boulon/docs/rag-radar/runs/2026-10-29.md` | yes |
| e8f86a95 | World monitor source errors | Daily Digest | 10/10 source errors = Node not trusting the Transdev certificate; `NODE_USE_SYSTEM_CA=1` added to `wm.cmd` and `worldmonitor.cmd`, verified; modes (tech/happy/finance) only in the web app, option 2 (add modes to `wm`) offered, not built | yes (option 2 is in ideas) |
| 3db31c9b, e619d919 | (untitled) | n/a | auto-summary runs that failed (OAuth expired) | yes |
| fccbb23b | BOULON end of day | workspace | this run | yes after it ends |

## Decisions Greg made
- Segmentation: harsher climate = LOWER segment; more fleet complexity (age, number of models) = lower segment; AI use (D11) is not a factor, do not raise it; segment and medal designed together (segment = the bar, medal = how high it is cleared); nothing shown until concrete ("pas l'air d'une idée à moitié faite"); mission can NOT come from MIR (not every location uses it) nor be declared by the shop manager; working hypothesis = segment from type of work done on site (referential slide 41) + staffing curve (slide 52); imaginary test workshops do not need Henri's validation; ask Pierre for the real curve data; propose the system to Gabriel in under 50 words.
- ID card: one bilingual file with a language switcher (web + PowerPoint); fill and print in normal view; title only "Fiche atelier" / "Workshop ID card"; country default Canada; FR label "Kilomètre annuel en moyenne par bus"; all logos rebuilt as SVG.
- RAG radar: last30days supports the 5 helpers (does not replace them); full capacity, every source on; X via Chrome/Edge cookies; marketplace install (tested not blocked); corpus = `1-boulon/docs` + `1-boulon/wiki` (Claude chose B when Greg said "choose the best").

## New facts
- Check-in transcript `2-projects/workshop-segmentation/raw/2026-10-29-checkin-transcript.txt`: segment = factual constraints, medal = quality; target-segment column ignored; weighted Excel is circular (Gabriel's point); assignment: define segment and medal "from zero"; next call Fri 10-30 (30 min) or Mon.
- Referential deck: slide 41 = 5 maintenance levels; slide 52 staffing curve uses fleet age only (one data point: 10 buses per technician at age 7); slide 11 weights 50/20/20/10 out of 300 vs workbook 35/35/20/10 out of 100. The 0.8 harsh-conditions factor in the test bench is Claude's, not the referential's.
- Targets match "higher" for 15/20 depots, "lower" 10/20; 6 of 20 depots sit exactly on 60 or 70. Stock is entered in euros; targets are self-assessments.
- MIR 2026-10-05 export: branch 13 spends 43.6% of hours on "Moteur complet"; branches are numbers, no name list (Alex).
- Council verdict (`warroom-2026-10-29.md`): computed segment is the record; manager target = "claimed segment"; 3 columns; Pierre alone signs overrides, max one step, count published.
- last30days v3.31.0 installed (user scope, auto-updates). Go-based add-ons (arXiv, Techmeme, Digg) not available. Final lane test: Reddit 20, X 30, HN 13, GitHub 12, TikTok 7, Instagram 2, notes 11; YouTube 80 via `youtube-month.py`.
- Company proxy blocks npm; built-in browser does not open localhost; PowerShell cannot call Office macros reliably (use VBScript); VBA allows 24 line continuations max.

## CONFLICT, not resolved: who is "Eckern"?
- Fork digest: Eckern = Pierre's role. `project-status.md` (check-in section) writes "Eckern sends logos" and "from Eckern" for the ID card list. The ID-card session says Henri sends the logos and Henri asked Greg + Gabriel for the proposal. The status file already says the speaker identity is inferred. Greg to confirm; nothing written to `5-brain/context/people.md`.

## Failures and fixes
- Node/pip vs Transdev certificate, hit 3 times today: World Monitor (`NODE_USE_SYSTEM_CA=1` in launchers), last30days X client (`--use-system-ca` in `5-brain/scripts/last30days-run.py`), pip (system certs).
- Claude said last30days was "installed and part of the routine" while X and YouTube returned 0 (Greg: "horrible failure"). Repeat of memory `feedback-done-means-working`.
- X returned 1 post: X client searches the topic string only; topic "self-hosted RAG" gives 30. YouTube relevance search buries new videos: "This month" filter. Lane missing `--no-x-handle`.
- ID card: blank preview (`cardText` lost in a merge), Update macro hang, small/ghost icons, French title, eaten backticks: all fixed.
- Segmentation: safety hook blocked `Scoring test.xlsx` (15:11) and an assemble step half-wrote the proposal page (restored from backup); grid read found 67 questions instead of 78 (to redo); several wrong-in-substance answers (stock reading, mission from MIR, mission declared by manager, "once a month", 5 levels, "system doesn't hold").

## Greg's corrections and preferences
- "its super confusing ... theres only s1 s2 s3, so when youre referring to level 3 so its s2 ... stop that and make it clearer" -> talk only in S1/S2/S3.
- "il faut formaliser et rendre la proposition plus concrete avant de montrer a quoi que ce soit".
- "OK WELL I NEED A VERY CLEAR MATRIX GRID ... VERY CLEAR VISUAL ... NO IDEA WHAT THE EVAL COLUMNS ARE EVEN FOR"; "focus on visual comprehension no clutter and readability"; "pas de ai slop, tres cru et straightforward".
- "ton idee se base encore sur lhallucination que le chef datelier est simplement capable dinscrire la mission... systems think".
- Copies of company documents must look hand-edited, never "entirely generated by AI"; never modify originals.
- "dont tell me what lines to not cross regarding it, that undermines our full capacity."
- "i dont want to have to reinput a key any more often than once per week."
- "you cant tell that last30days was installed and now part of the routine if it failed to function as intended."

## Hard to find (hop-test inputs)
1. The "mega document" meeting transcript (14:14): Claude searched Downloads and `raw/`; Greg pasted it. Map names `End transcri.txt`, a different file. Now saved as `raw/2026-10-29-checkin-transcript.txt`.
2. Check-in meeting time: in no file.
3. Referential criteria: in `Scoring test.xlsx` at the vault root (unmapped), caused the 15:06 confusion.
4. MIR branch number -> name mapping: absent everywhere.

## Unfinished Greg requests (quoted)
- "pour ce qui en est des medails?" / medal explanation: [A] reply cut off mid-sentence at 16:25.
- Rename "Écart" -> "Au-dessus du normal de…" and "Effectif" -> "Assez de techniciens ? (Oui/Non)": deferred to the fork, not shown done.
- "on est mieux de demander a pierre pour les donnes de la actual courbe": message drafted (50 and 25 words), not sent.
- "parfais bein jaimerais proposer ce systeme a gabriel explique y comment ca marche en dessous de 50 mots": drafted, not sent.
- "propose un action de plan" (stock): plan given, nothing applied to the workbook.
- "enleve le chapitre deux": applied to the title only; meaning of "chapitre deux" unconfirmed.
- Web app: country default / km label / SVG logos confirmed for the PowerPoint only; web app not re-checked.
- RAG radar: Go add-ons unresolved; Monday 08:15 run not yet observed.

## Do not retry
- pip or Node without the Windows certificate store; Firefox cookie scan; YouTube relevance search for recent items; bare query "rag"; X topic "self-hosted RAG chatbots"; lane without `--no-x-handle`.
- Built-in browser on localhost (use Chrome DevTools); npm/npx dev server (proxy); macros from PowerShell (use VBScript); VBA continuation chains over 24 lines; inline shell quoting for file edits.
- Segmentation: harsh conditions from the debrief summary; reverting stock to the original; target segments as truth; mission from MIR; mission declared by the manager; "heaviest work at least once a month"; slide-41 levels 2-4 in the tool; continuous scale for the boundary problem; new documents in free creative style instead of editing a copy; Henri validating imaginary cases; mixing "level 3" with S1/S2/S3.
- RAG radar: year-less GitHub dates without API/PyPI check; summariser readings for load-bearing claims; third-party trackers as primary sources.

## Ideas (also appended to `5-brain/ideas/2026-W44-ideas-and-tasks.md` section 6)
See that file.
