# End-of-day digest: Mon 2026-11-02
6 extracts in this folder (`_index.json`); cross-checked with the app's session list (4 sessions active today, all present). No ZBB, Daily Digest or Learning sessions. PC was off Fri 10-30 to Sun 11-01, so all scheduled tasks fired at 13:32-13:35.

| Extract | Title | Project | One-line outcome | Safe to archive |
|---|---|---|---|---|
| b1c0ade3 | Weekly task completion review | workshop ID card + segmentation | morning check; W45 task list; test bench labels renamed; web app fixed and published live; PowerPoint rebuilt and E2E-tested; marketing skill scout | no (Henri send, test-bench recalc, marketing pick open) |
| 5431ca89 | Friday routine suggester | workspace | 4 routine cards on `5-brain/routines/recos/2026-11-02.html` | no (Greg's picks pending) |
| 71dac492 | RAG radar (weekly) | BOULON research | first unattended run: 13 new, 12 updated; last30days healthy on retry | yes |
| 495d5b02 | BOULON end of day (13:35 catch-up) | workspace | did not close (day had just started); wrote empty-day notes for 10-30, 10-31 | yes |
| feff3625 | (untitled) | n/a | failed auto-summary (OAuth expired) | yes |
| 3eb1c941 | BOULON end of day (16:45) | workspace | this close | yes |

## (a)-(m) combined
**Decisions Greg made**
- The Workshop ID card (web app + PowerPoint) is the only deliverable for Henri right now; the segmentation Excel is "not totally ready, we don't consider it".
- Web app goes live on the same artifact link so it "stays up" for Henri.

**Work done + files**
- `2-projects/workshop-segmentation/banc-essai-segmentation-v2.xlsx` sheet Cas: "Écart" -> "Au-dessus du normal de…", "Effectif" -> "Assez de techniciens ? (Oui/Non)"; column O now Oui/Non; segment formula (col R) and Tests count updated. Not recalculated (Excel COM blocked). Backup `backup-banc-essai-segmentation-v2-2026-10-29.xlsx`.
- Web app `2-projects/workshop-id-card/dist/app.js`: city field falls back to the typed text when the city list is missing or the town is not in it (province codes QC/ON work); launcher `dist/OUVRIR-fiche-atelier.cmd` (double-click not tested); backup `backup-2026-10-29/app.dist-before-cityfix-2026-11-02.js`; screenshots `test-shots/2026-11-02-cityfix-FR.png`, `-EN.png`.
- Published live to https://claude.ai/artifact/NK4HrpNshyytjdEYYwCf7u (same link), using the live `assets/cities-N.txt` city files; checked signed-out: loads, full city search works. Full card NOT generated on the live page. Published copy saved in `2-projects/workshop-id-card/artifact-pub/`.
- PowerPoint `2-projects/workshop-id-card/powerpoint/Workshop_ID_Card_Fiche_atelier.pptm` rebuilt from the OneDrive original (disk copy had regressed to the old version): equal-height fields centred in cells, paler yellow, values big bold red, French units switch with language, level = « Bronze », sample 40/400 (10 %), stray slide number gone. Tested via its own macros: EN -> FR -> print -> EN, typing 100/400 = 25 %, « Or » = gold medal; ribbon tab inside. Ribbon buttons not clicked by hand. Old file backed up; previews refreshed.
- RAG radar: `1-boulon/docs/rag-radar/runs/2026-11-02.md`, knowledge web +13 / ~12; raw `1-boulon/docs/rag-radar/last30days-raw/2026-11-02.md`. Top pick: Copilot Studio custom graders (shared grader library GA 11-15), status try.
- Routine recos page `5-brain/routines/recos/2026-11-02.html` (+ `.json`): HQ page check, unsent-messages reminder, company-certificate check, one end-of-day only.
- Skill scout (marketing): ~10 ECC marketing skills already installed; ranked add-ons: Anthropic Marketing plugin, coreyhaines31/marketingskills (not vetted), Product Marketing, Hyper Marketing (paid), Windsor.ai. Scheduling only via paid tools.
- Empty-day notes `5-brain/logs/eod/2026-10-30/_digest.md`, `2026-10-31/_digest.md`.

**Open items / waiting on whom**
- Greg: generate one card on the live link, then send Henri the link + the .pptm (tips: Enable Content; print with the ribbon's Imprimer/Print button). Ask Henri for logos.
- Greg: open `banc-essai-segmentation-v2.xlsx` once in Excel so it recalculates (check Tests still 12/12).
- Greg: tick routines on the recos page and paste picks back; pick a marketing option (or none).
- Carried: Pierre / Gabriel drafts unsent; segmentation call status; "Eckern"; `Scoring test.xlsx` move; ticket 77048.

**Failures and fix (-> lessons-2026-11-02)**
- Web app declared "ready" in the 14:10 reply; Greg: "the web app isnt functional". Causes: city list missing locally (required field blocked Generate); `file://` blocks the app's own files.
- PowerPoint sent at 14:36 was the wrong (regressed) file; Greg: "the backgrounds in the powerpoint are still wrong ... use thorough e2e testing and check your work".
- PowerShell 5 will not pass integers into PowerPoint position fields: cast explicitly. `param` must be the first statement. Macro tests need a visible window ("no active presentation"). A stale `~$` lock file looked like Greg had the file open.
- last30days timed out at the 5-minute limit; ~9 minutes needed. YouTube lane failed when capped at 200 s.
- Scheduled tasks bunch up at app start after a weekend off; the 13:35 end of day correctly refused to close a day that had just started.

**Corrections / preferences (g)**
- Repeat of "done means working": test the real deliverable end to end (live page, the exact file being sent) before saying ready. Second occurrence after 10-29 -> memory strengthened.
- Greg wants the visuals "visually pleasing" and formatting "standard".

**Hard to find (i)**: the 10-29 PowerPoint build was gone from disk; the build script + OneDrive original recreated it. No city list existed locally (only on the live artifact).

**New files/folders (j)**: `2-projects/workshop-id-card/artifact-pub/`, `dist/OUVRIR-fiche-atelier.cmd`, `test-shots/2026-11-02-*`, `5-brain/routines/recos/2026-11-02.{json,html}`, `rag-radar/runs/2026-11-02.md`.

**Unfinished Greg requests (k)**
- "marketing plugins or all in one marketing skills for claude ... brand identity, seo, marketing campaigns, scheduling, creative automations": options presented, no choice yet.
- "lets deliver the deliverables we can for today": deliverables ready; sending to Henri is Greg's step.

**Do not retry (l)**: opening `index.html` by double-click; a city field that requires the list; testing PowerPoint macros with a hidden window; trusting the on-disk .pptm without rendering it; last30days with a 5-minute (or 200 s) cap.

**Ideas (m)**: marketing all-in-one skills/plugins for Claude (researched, awaiting pick) -> W45 ideas.
