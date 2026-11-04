# Brain improvement backlog (written by boulon-end-of-day, section 3)
Rule: end of day proposes; only safe changes (map rows, router rebuild, memory dedupe) are applied automatically. Skill edits, folder moves and rule changes wait for Greg's yes. Size: S / M / L.

## Open
- 2026-11-03 (EOD short form): audit 0/0/0 after map rows (school-bus MVP, transcripts, Geotab film). Hop test, clutter, memory, session checks deferred to Friday. Proposal (S): add the Whisper curl model download and the Python heredoc/-I rules to skill transdev-pc-shell-quirks (seen today in 2 sessions; needs yes).
| Date | Proposal | Why / evidence | Size |
|---|---|---|---|
| 2026-10-21 | Split `1-boulon/docs` (56 files) into subfolders (lessons, azure, timeline, research) | Flat folder is long to scan; routers describe each file but a folder hop would be clearer | M |
| 2026-10-21 | Add "Git Bash not found: set CLAUDE_CODE_GIT_BASH_PATH" to skill `transdev-pc-shell-quirks` (skill edit) | Hit in 2 sessions (ZBB, Daily Digest) in one day; each lost about an hour; Greg suspected the folder move wrongly | S |
| 2026-10-21 | Check hooks fire for real after the app restart (model-routing PreToolUse hook, sync-skill-routing SessionStart hook, `CLAUDE_CODE_PLUGIN_CACHE_DIR`) | All three were only simulated today | S |
| 2026-10-21 | Working replacement for continuous-learning-v2 observer (needs WSL2/Linux, cannot run here); candidate: the end-of-day digest plus `/ecc:learn-eval` already do this daily | Greg asked twice for autonomous continuous learning | M |
| 2026-10-28 (APPLIED 2026-11-03, `5-brain/scripts/eod-lock.js`) | End-of-day lock: at start, write `.claude/hooks/.eod-running` (date + session id); a second run (the 16:45 routine or a manual "end of day") sees it, reads the first run's files and only fills gaps | 2026-10-28: the 16:45 routine and Greg's manual run worked in parallel on the same files (status file got two update blocks; timeline, ideas, RESUME, hand-off written by different runs) | S |
| 2026-10-28 (APPLIED 2026-11-03) | `eod-gather-sessions.js`: skip auto-summary sessions (first message starts "Below is a conversation log") and earlier end-of-day runs | 4 of 9 extracts today were summaries or EOD repeats; each run re-reads them | S |
| 2026-10-28 | Copy the segmentation meeting transcripts (`C:\Users\rilg01\Downloads\End transcri.txt`, `End_otter_ai.zip`) into `2-projects/workshop-segmentation/raw/` and ingest them (needs Greg's yes: confidential, D11) | F10 was answered only after finding them in Downloads by search; map row now points there as a stopgap | S |
| 2026-10-28 | Skill `boulon-end-of-day` step 2.2 says "CLAUDE.md stays a map: no rules": change to "no rules unless Greg places them there" (skill edit) | Greg put "Rules of engagement" in CLAUDE.md on 10-28 and said the header "is not a hard limitier" | S |
| 2026-10-28 | Add to skill `transdev-pc-shell-quirks`: `npx.ps1` blocked (use `npx.cmd`), GateGuard blocks inline PowerShell (write a `.ps1`), `python -I` hides user-site openpyxl, bare `python -` hangs a Bash call (skill edit) | Hit in 2 sessions on 10-28 plus this end-of-day run; listed in `1-boulon/docs/lessons-2026-10-28.md` section 4 | S |
| 2026-10-28 | Fix `renderProjects` in `boulon-hq.html`: crashes when a project has no moves left (`x.moves[0].what`) | Found by review in session 017011e7; not yet fixed | S |
| 2026-10-29 | Set `NODE_USE_SYSTEM_CA=1` once as a Windows user environment variable (no admin) and add "Node/pip SELF_SIGNED_CERT_IN_CHAIN: NODE_USE_SYSTEM_CA=1 or --use-system-ca; pip with system certs" to skill `transdev-pc-shell-quirks` (config + skill edit) | Fixed by hand 3 times on 10-29 (World Monitor launchers, last30days X client, pip); each new Node tool will hit it again | S |
| 2026-10-29 | Copy the 10-29 check-in transcript practice to every meeting: paste-in transcripts saved straight to the project `raw/` with date in the name, and the map row lists `raw/*-transcript.txt` instead of one Downloads file | The "mega document" was searched in Downloads and `raw/` and not found; Greg pasted it | S |
| 2026-10-29 | Record meeting date AND time in the project status file when a meeting is set (segmentation next call Fri 10-30 or Mon) | Check-in time was in no file | S |
| 2026-10-29 | Add a `_proposed` list to `brain-move.js plan` output so proposed moves show without being applied | Root file `Scoring test.xlsx` proposed today in `moves.json` `_proposed` | S |
| 2026-11-02 | Add to skill `transdev-pc-shell-quirks`: PowerShell 5 + PowerPoint COM needs explicit `[single]` casts for positions; macro tests need a visible window; a `~$` lock file can be stale (check POWERPNT owner before assuming Greg has it open); never run `python` via heredoc (hung again today in end of day) (skill edit) | All hit in session "Weekly task completion review" 11-02; python hang hit again in this close | S |
| 2026-11-02 | `rag-radar` skill: raise the last30days lane timeout from 5 to 10 minutes (skill edit) | 11-02 first unattended run timed out at 5 min, retry needed ~9 min | S |
| 2026-11-02 | Pre-send check for deliverables to Henri: before "ready to send", render the exact file/link (live artifact signed-out + one full card; .pptm all views) and attach the screenshots (skill edit or checklist in `2-projects/workshop-id-card/ROUTER.md`) | Correction repeated 10-29 and 11-02 (memory `feedback-done-means-working`) | S |

| 2026-10-29 | `brain.js` build and audit: ignore Office lock files `~$*` | Today they caused 5 then 1 STALE entries that come and go while Greg has a file open in Excel/PowerPoint | S |
## Applied
| Date | Change | Result |
|---|---|---|
| 2026-10-21 | `CLAUDE.md` rewritten as a full map; `5-brain/scripts/map-check.js` added to the audit | Audit fails if any top-level item is unmapped or a cited path is missing |
| 2026-10-21 | Vault reorganised into `1-boulon` to `9-archive` | Root went from about 60 items to 6 folders plus 5 files |
| 2026-10-21 | `boulon-end-of-day` redesigned; `close-session` added | Day close now checks brain health and runs an improvement loop |
| 2026-10-21 (first real end of day) | Memory `feedback-hooks-run-immediately` added; `5-brain/routers/workspace.md` model-routing row refreshed (said 7 pinned skills); lessons 8-12 and decision log entry written | Repeated correction (hook = run, do not ask) now in memory |
| 2026-10-28 | Daily Digest launcher: `LAUNCH.cmd` / `LAUNCH.md` exist in `C:Usersilg01DAILY DIGEST`; `wm` / `worldmonitor` launchers added in `C:Usersilg01in` | Closed (was open since 10-21) |
| 2026-10-28 (EOD) | Map rows: segmentation `cloud-repo/` (results, data) and meeting-transcript location; Daily Digest `wm` launchers. Memory corrected or strengthened: `feedback-map-and-paths`, `feedback-authoritative-evidence`, `greg-working-style`, `feedback-step-by-step`, `feedback-pierre-proposal-first`. Pointer to the CLAUDE.md rules in `5-brain/routers/workspace.md` | Hop test below: 3 of today's hard finds now 0-1 opens from CLAUDE.md |
| 2026-10-29 (EOD) | Memory: 3 new (`feedback-segment-wording`, `feedback-concrete-before-showing`, `feedback-full-capacity`), `project-workshop-segmentation` updated; CLAUDE.md Leftovers row names `Scoring test.xlsx`; routers rebuilt (5 stale Office lock files) | Audit map gap closed |

## Declined
(none yet)

## Map test log (hop test, target 3 router opens or fewer from CLAUDE.md)
| Date | Question | Router opens | Blind search? | Fix |
|---|---|---|---|---|
| 2026-10-21 | Where is the TBONSMEC table? | 3 | no | none needed |
| 2026-10-21 (EOD) | Where is the approval-gate decision? | 1 (continuity-log section 1, via the "decision" row) | no | none needed |
| 2026-10-21 (EOD) | Where do I launch worldmonitor / which launch options exist? | 2 (digest router, then 2-projects/daily-digest/ROUTER.md) | no | launcher files still to be created |
| 2026-10-21 (EOD) | Where is the model-routing config? | 1 (CLAUDE.md row, then .claude/ROUTER.md) | no | none needed |
| 2026-10-28 (EOD) | Where are the segmentation meeting transcripts? | before: 2 (segmentation router, raw router) then BLIND SEARCH (they were in Downloads); after: 0 (CLAUDE.md row names the file) | yes, before | map row added; copy into `raw/` proposed |
| 2026-10-28 (EOD) | Where is the v2 scoring workbook / results? | before: 3 (segmentation router, cloud-repo router, data router); after: 0 (CLAUDE.md row names `cloud-repo/` results and data) | no | map row added |
| 2026-10-28 (EOD) | How do I start World Monitor in the terminal? | before: launchers in no router (outside the vault, created today); after: 0 (CLAUDE.md Daily Digest row) | n/a (new today) | map row added |
| 2026-10-29 (EOD) | Where is the segmentation meeting transcript ("mega document")? | before: 2 (segmentation router, raw router) + blind search in Downloads, not found, Greg pasted it; after: 1 (`raw/2026-10-29-checkin-transcript.txt` is routed in raw/ROUTER.md) | yes, before | transcript naming proposal above |
| 2026-10-29 (EOD) | When is the check-in / next call? | none: in no file | n/a | status-file proposal above; next call now in project-status.md |
| 2026-10-29 (EOD) | Where are the referential criteria (Scoring test.xlsx)? | before: unmapped at vault root; after: 0 (CLAUDE.md Leftovers row) | no | move to raw/ proposed |
| 2026-11-02 (EOD) | Which deliverables can I send Henri today? | 1 (`5-brain/ideas/` newest W45 via the weekly-ideas row) + 1 (`2-projects/workshop-id-card/ROUTER.md`) = 2 | no | none needed |
| 2026-11-02 (EOD) | How is the ID card PowerPoint rebuilt? | 2 (CLAUDE.md segmentation row -> `workshop-id-card/ROUTER.md` -> `powerpoint/ROUTER.md`, `build-fillable-card.ps1`) | no | none needed |
| 2026-11-02 (EOD) | Where are the city files the web app needs? | 2 (`workshop-id-card/ROUTER.md` -> `artifact-pub/`); not on disk in `dist/`, only on the live artifact | no | note in hand-off; consider copying `cities-N.txt` into `dist/assets/` |

## 2026-11-04 (Wed, end of day, short form)
- Audit: 0 unrouted, 0 stale; 2 map gaps (`.git`, `.github`) fixed with map rows. Hop test, clutter, memory dedupe, sessions list: deferred to Friday.
- Calibrate: "No response requested" to a real ask happened 2x today -> memory `feedback-no-empty-reply` (applied). "Work around obstacles, no IT/admin" repeated in 3 sessions; covered by existing memories.
- First use of close-session digests (f2ecf964): worked, no re-read needed.
- Open (S): the run started 16:23 and the close ran past 25 min because three long extracts (60k, 25k, 23k chars) needed helpers of ~14-20 min. Proposal: when two extracts are forks of the same title, read only the newer one (067c0a2c and 09e86e57 duplicated today). Needs Greg's yes (skill edit).
- Open (S): the school-bus scan output was not findable in the vault (digest item i). Map row now points to `1-boulon/tests/results/`? -> add `school-scan.jsonl` to the BOULON map row Friday.
