# BOULON Orchestration Plan — today → Henri sign-off
**Written:** Wed 2026-09-23 · **Planner:** `ecc:planner` · **Orchestrator:** Claude Code · **For:** Greg Riley (lead), Henri (overseer)
**Baseline:** `1-boulon/docs/review-architecture.md` + `1-boulon/docs/review-rag-pipeline.md` (both 2026-09-23). This plan replaces the old Phase 2/3 "specialist agents" plan and the dates in `1-boulon/docs/timeline.md`.

> **Claude correction (2026-09-23, after the plan was written):** the coverage check (`1-boulon/tests/results/coverage-2026-09-23.md`) shows the two "truncated" manuals have text chunks through their last indexed pages: 217 for cooling fans and 157 for Vicinity. The truncation is therefore **probably not lost content**, pending Greg's real page counts. The 2 excluded Vicinity files are still genuinely missing. So D4 (split vs tier) is about the 2 excluded files and future large manuals, not the truncated ones.

## Overview
BOULON stays **one Copilot Studio agent reading one Azure AI Search index**, with no specialist agents. Safety comes from measurement:
- a **coverage report** proves every page is searchable;
- a **golden set** of about 120 fixed questions with known answers is re-run after every change;
- an **offline claim checker** flags any number the agent states that isn't found word-for-word in a manual.

Target Henri sign-off: **Wed 2026-11-18**. Greg's time is capped at about one batched block per day, 30 minutes or less.

## Plain-language terms
- **Index:** the searchable copy of the manuals.
- **Indexer:** the Azure job that reads the PDFs into it.
- **Chunk:** one searchable slice of a manual.
- **Tier:** the Azure price level, which sets size limits.
- **Golden set:** fixed questions, each with its right answer and page.
- **Regression:** a change that quietly breaks something that worked.
- **Must-abstain question:** one where the only correct answer is "I don't have that information".
- **Query key:** a read-only password for the index. The **admin key** can change or delete things.
- **Entra ID:** Transdev's Microsoft sign-in.
- **Gate:** a checkpoint that must pass before the next phase.
- **ADR:** a short dated decision record, in `docs/decisions/`.

## Target architecture
- Mechanics sign in with Entra ID (mechanics group only), in Teams or on the web.
- The BOULON agent (GPT-4.1) has strict grounding, one abstention wording, an exact-quote rule for numbers, and a coverage list ("manual X is not in BOULON yet").
- The agent reaches the index with the **query key** only.
- The index holds all current manuals, with readable titles, page numbers, and language and revision tags.
- The indexer fails loudly (`maxFailedItems: 0`), detects deletions, and runs on demand.
- A blob folder `current-manuals` holds the manuals, with oversized PDFs split. Greg owns it.
- Claude works offline: coverage report, golden run and claim checker. Results go to `1-boulon/tests/results/`, then to Henri.
- A live second-check model is built **only if** the offline data shows unsupported claims above the target (D6).

---

## Daily cadence (every business day)
| Time | Who | What | ECC |
|---|---|---|---|
| 08:30 | Claude | Resume context and write today's `TODAY.md` with **one batched Greg block** (exact clicks, exact strings, pass criteria, what to send back) | `ecc:resume-session` |
| 08:45 | Claude | **G-index run:** all golden questions against the index directly (0 Greg time). Failures are triaged before Greg's block. | `ecc:verification-loop` |
| 10:00 | **Greg** | **Greg block (30 min or less):** portal clicks, Test panel runs, yes/no decisions | none |
| 10:30–16:00 | Claude | Build, analyse, document. After any agent change, run **G-smoke** (15 agent questions). | per step |
| 16:30 | Claude | Update `continuity-log.md` and `timeline.md`, write ADRs, save the session | `ecc:save-session`, `ecc:living-docs-governance` |
| Fri 16:00 | Claude | Capture repeated workflows as project skills; send a 5-line weekly status | `ecc:learn`, `ecc:skill-create` |

**Golden runs:**
- **G-index:** daily, and after every index or skillset change.
- **G-smoke:** 15 agent answers after any instruction or setting change.
- **G-full:** all agent answers, scored by the claim checker. Every Thursday and at every gate.

---

## Phases and steps

### Phase 0: Reset the baseline (Wed 09-23 to Thu 09-24)
| ID | What | Owner | Effort | Depends | Done when | ECC |
|---|---|---|---|---|---|---|
| 0.1 | Apply the review's 16 doc corrections | Claude | 1.5 h | none | No contradictions across docs; changes logged | `ecc:living-docs-governance` (in progress via `ecc:doc-updater`) |
| 0.2 | Greg answers D1–D3 and D12–D14 | Greg | 10 min | 0.1 | ADRs written | `ecc:architecture-decision-records` |
| 0.3 | Silent-failure check on `1-boulon/tests/run-pilot-tests.ps1` (an Azure error must never count as a pass) | Claude | 30 min | none | The script fails loudly on HTTP errors | `ecc:silent-failure-hunter` |
| 0.4 | Key hygiene: which key Copilot Studio uses; `.env` is private and not synced to a shared folder | Claude + Greg (2 min) | 30 min | none | Findings logged; fix scheduled in 4.1 | `ecc:security-scan` |
| 0.5 | Close the Orion pressure-release item (SharePoint era) | Greg | 15 min | none | Logged as evidence | `ecc:ai-regression-testing` |
| 0.6 | Agent-side T1–T3, the Tesla test, and one citation screenshot (does it show a page?) | Greg | 20 min | none | 5 screenshots scored | `ecc:verification-loop` |

### Phase 1: Measurement foundation (Thu 09-24 to Tue 10-06) → G0: baseline numbers exist
| ID | What | Owner | Effort | Depends | Done when | ECC |
|---|---|---|---|---|---|---|
| 1.1 | **Coverage report:** highest indexed page against real page count for all 25 files. Needs a **read-only 30-day SAS token** (a temporary read-only key for the blob folder) or Greg's page counts. | Claude (Greg 5 min) | 3 h | 0.4 | Re-runnable with one command; the 4 problem files flagged | `ecc:verification-loop` (first version done: `1-boulon/tests/results/coverage-2026-09-23.md`) |
| 1.2 | **Golden set v0 (30 questions):** the reviewer's 8, T1–T4, must-abstain probes (Tesla, Orion, off-topic, French question on an English-only manual) | Claude | 3 h | 0.3 | `tests/golden/golden-v0.jsonl`; G-index runs clean or known failures listed | `ecc:eval-harness`, `ecc:ai-regression-testing` |
| 1.3 | Hybrid/semantic mode in the harness, so Claude's queries match what the agent should see | Claude | 2 h | 1.2 | Keyword and hybrid results side by side | `ecc:docs-lookup` |
| 1.4 | **Agent-answer collection:** check Copilot Studio's evaluation/test sets, Direct Line and the Copilot Studio Kit; fall back to a paste template | Claude | 2 h | none | Method chosen; G-smoke takes Greg 15 min or less | `ecc:docs-lookup`, `ecc:deep-research` |
| 1.5 | **Offline claim checker (Step 1.9):** every number or part number must appear word-for-word in a passage retrieved for that question | Claude | 1 day | 1.2, 1.4 | Seeded bad answers are caught; false-alarm rate reported | `ecc:ai-regression-testing`, `ecc:mle-reviewer` |
| 1.6 | **Mechanic questions:** Claude drafts a FR/EN request; Greg sends it to 3–5 mechanics for 10 real questions each | Greg (10 min) | 10 min | none | 30 or more questions by Fri 10-02 | none |
| 1.7 | **Golden set v1 (~120):** 60 answerable, 20 cross-language, 25 must-abstain, 15 safety/torque. Greg spot-checks 10. | Claude (Greg 20 min) | 1.5 days | 1.2, 1.6 | Slice counts met; every item has a source page | `ecc:eval-harness`, `ecc:mle-reviewer` |
| 1.8 | **Henri targets memo:** proposed thresholds with the sample-size reasoning | Claude → Henri | 2 h | 1.7 | Henri approves (D5) **before** G1 | `ecc:mle-reviewer`, `ecc:santa-method` |
| 1.9 | **Baseline G-full** on the current pilot | Claude + Greg | 1 h Greg (0 if automated) | 1.5, 1.7 | `tests/results/baseline-<date>.md` gives a score per slice | `ecc:verification-loop` |

### Phase 2: Fix the pilot (Fri 09-25 to Fri 10-09) → G1: pilot meets Henri's targets
| ID | What | Owner | Effort | Depends | Done when | ECC |
|---|---|---|---|---|---|---|
| 2.1 | Verify tier limits and prices, the GPT-4.1 retirement date and the Layout skill defaults; 6/12-month cost model for Basic + splitting vs a higher tier | Claude | 3 h | none | Every figure sourced and dated | `ecc:deep-research`, `ecc:docs-lookup` (research agent already running) |
| 2.2 | **Split vs tier decision (D4)** | Claude recommends, Greg decides | 1 h + 10 min | 2.1, 1.1 | ADR signed | `ecc:council`, `ecc:architecture-decision-records` |
| 2.3 | **Torque-table fix:** skillset change so tables come out as markdown tables, tested on Vicinity p.22 | Claude drafts, Greg approves | 4 h + 10 min | 2.1 | M6 Class 12.9 → 15 Nm with rows intact, confirmed by an independent check | `ecc:docs-lookup`, `ecc:santa-method` |
| 2.4 | Indexer hardening: `maxFailedItems: 0`, deletion detection, readable titles, page in the citation if missing | Claude, Greg approves | 3 h | 2.2 | Failures show as failures; citation shows manual and page | `ecc:verification-loop` |
| 2.5 | Copilot Studio settings: semantic toggle, strictest moderation, one abstention wording, coverage-list rule, exact-quote rule, answer-language rule | Claude writes, Greg pastes | 2 h + 20 min | 0.2 | G-smoke passes; text saved in `1-boulon/docs/agent-instructions.md` | `ecc:ai-regression-testing` |
| 2.6 | Re-index the pilot with the fixes, then coverage, G-index and G-full | Claude (Greg 10 min) | 0.5 day | 2.2–2.5 | Vicinity files in; **G1 passes** | `ecc:verification-loop`, `ecc:ai-regression-testing` |
| 2.7 | French analyzer, only if the cross-language slice misses its target | Claude | 2 h if needed | 2.6 | Data-driven ADR (D7) | `ecc:architecture-decision-records` |

### Phase 3: Full corpus (Tue 10-13 to Fri 10-23) → G2: all current manuals covered and golden set passes
| ID | What | Owner | Effort | Depends | Done when | ECC |
|---|---|---|---|---|---|---|
| 3.1 | Re-index and retirement runbook: one `current-manuals` folder, `<vehicle>_<system>_<rev>.pdf` naming, deletions propagate | Claude | 3 h | G1 | Runbook written; project skill `boulon-reindex` created | `ecc:skill-create` |
| 3.2 | **Greg uploads the full library** from Claude's exact list; Claude splits oversized PDFs locally if D4 = split | Greg | 1–2 h | 3.1 | Blob count matches the list | none |
| 3.3 | Re-run the RAG pipeline review before the full re-index | Claude | 1 h | 2.6 | No new CRITICAL findings | `ecc:rag-pipeline-reviewer` |
| 3.4 | Full re-index run, watched with stall and error alerts | Claude | 0.5–1 day unattended | 3.2, 3.3 | 0 failures | `ecc:loop-operator` |
| 3.5 | Full coverage, G-full, +30 golden items for the new manuals | Claude (+Greg) | 1 day | 3.4 | **G2:** 100% coverage and targets met; coverage list published to the agent | `ecc:verification-loop`, `ecc:eval-harness` |

### Phase 4: Access, monitoring, mechanic pilot (Mon 10-19 to Fri 11-06) → G3
| ID | What | Owner | Effort | Depends | Done when | ECC |
|---|---|---|---|---|---|---|
| 4.1 | Query key in Copilot Studio; remove the SAS token | Greg (Claude script) | 20 min | 3.4 | Agent works on the query key; agent on the query key | `ecc:security-reviewer` |
| 4.2 | Entra sign-in limited to a mechanics security group | Greg + IT | 30 min + IT wait | start 10-07 | A non-member is blocked | `ecc:security-reviewer` |
| 4.4 | Thumbs up/down; weekly review of every thumbs-down and every "I don't know"; no-citation rate and abstention rate | Claude (Greg 5 min) | 2 h + 1 h/week | 4.1 | First weekly report | `ecc:agent-evaluator` |
| 4.5 | **Mechanic pilot 10-26 → 11-06**, 3–5 mechanics, one-page FR/EN guide | Greg invites, Claude writes | 30 min | G2, 4.2 | Every thumbs-down reviewed | `ecc:agent-evaluator` |
| 4.6 | Live-verification decision (D6) from the data | Claude recommends, Greg + Henri decide | 1 h | 4.5 | ADR; if yes, about 1 week of build | `ecc:council`, `ecc:mle-reviewer` |

### Phase 5: Henri sign-off (Mon 11-09 → Wed 11-18) → G4
| ID | What | Owner | Effort | Depends | Done when | ECC |
|---|---|---|---|---|---|---|
| 5.1 | Final G-full and coverage on the frozen setup | Claude + Greg | 0.5 day | G3 | Results frozen | `ecc:verification-loop` |
| 5.2 | Sign-off pack (results vs targets, coverage, ADR index, open risks, runbook), reviewed by two independent checkers | Claude | 1 day | 5.1 | Both reviewers pass it | `ecc:santa-method` |
| 5.3 | Henri deck (10 slides or fewer) | Claude | 3 h | 5.2 | Greg approves | `pptx` |
| 5.4 | Sign-off meeting | Greg + Henri | 1 h | 5.3 | Signed, or a dated fix list | `ecc:architecture-decision-records` |
| 5.5 | Handover skills (re-index, golden run, weekly review) | Claude | 2 h | 5.4 | Saved; continuity log closed out | `ecc:learn`, `ecc:skill-create` |

---

## Day-by-day: next 10 business days
| Day | Claude | Greg block | Golden runs |
|---|---|---|---|
| **Wed 09-23** | 0.1 doc corrections (running) · 0.3 silent-failure check · 1.2 golden v0 · 16:30 ADRs and save | 0.6 screenshots · D1–D3, D12–D14 (10 min) · 0.5 Orion (15 min) | G-index on v0 at end of day |
| **Thu 09-24** | 0.4 key check · 1.1 coverage (full) · 1.3 hybrid mode | SAS token or page counts (5 min) · 1.6 send mechanic request (10 min) | G-index · first G-full on v0 (Greg 20 min) |
| **Fri 09-25** | 1.4 agent-collection research · 2.1 cost model · weekly `ecc:learn` | Read the coverage report (10 min) | G-index |
| **Mon 09-28** | 1.5 claim checker, day 1 · 2.3 table-fix draft | Semantic toggle and moderation check (10 min) | G-index |
| **Tue 09-29** | 1.5 finish, with seeded tests · 2.3 test on p.22 | Paste new instructions, 2.5 (15 min) | G-index · G-smoke |
| **Wed 09-30** | 2.2 split-vs-tier council · 2.4 hardening config | Read the D4 memo (10 min) | G-index |
| **Thu 10-01** | 1.7 golden v1 · D4 ADR | **Decide D4**; approve 2.3/2.4 (15 min) | G-index · **G-full** |
| **Fri 10-02** | Golden v1 with mechanic questions · 1.8 targets memo · weekly `ecc:learn` | Spot-check 10 golden items (20 min) · send memo to Henri | G-index |
| **Mon 10-05** | Apply D4 · prepare the re-index | Tier change or split upload (20 min) | G-index |
| **Tue 10-06** | 2.6 pilot re-index · 1.9 baseline G-full · status for Henri | Trigger the indexer if needed (5 min) · Henri D5 due | **G-full v1 = baseline** |

## Weekly after 10-06
| Week | Focus | Greg load | Gate |
|---|---|---|---|
| 10-07 → 10-09 | Finish Phase 2; 2.7 if needed; send IT the request for 4.2 (in French) | 45 min | **G1 Fri 10-09** |
| 10-13 → 10-16 (10-12 is Thanksgiving) | 3.1 runbook, 3.2 upload, 3.3 review, D10 pilot names | 2–2.5 h | none |
| 10-19 → 10-23 | 3.4 full re-index, 3.5 coverage and G-full, 4.1 query key, 4.4 feedback | 1 h | **G2 Fri 10-23** |
| 10-26 → 11-06 | 4.5 mechanic pilot, Thursday G-full, weekly review, 4.6 on 11-06 | 30 min/week | **G3 Fri 11-06** |
| 11-09 → 11-18 | 5.1–5.5 | 1.5 h | **G4 Wed 11-18** |

Greg's estimated total time to sign-off: **about 10 hours.**

---

## Decision register
| ID | Decision | Who | Needed by | Claude's recommendation |
|---|---|---|---|---|
| D1 | Finish testing and fixes before loading all 100+ manuals | Greg | 09-23 | **Agree.** Today's limits would repeat at 100+. |
| D2 | Rule for manuals not in the index | Greg | 09-23 | The agent says "That manual is not in BOULON yet — use the paper/SharePoint copy". Mechanics use BOULON only after G2. SharePoint stays off. |
| D3 | One agent, one index, no specialists | Greg → Henri | 09-23 / 10-02 | **Adopt.** Add a connected agent only for a new data source (e.g. CMMS) or a new permission need. |
| D4 | ~~Split PDFs vs a higher tier~~ **Revised 2026-09-23:** leave Free → create a **Basic** service; Claude rebuilds the index there with fixes; split the 2 oversized Vicinity PDFs | Greg | **ASAP (this week)** | **Basic + split.** The service is on Free: 90% full, can be deleted if inactive, can't be upgraded in place. Basic is about $102–112 CAD/month. S1 is about $4,080 CAD/year and would use most of the budget. Pick Canada East (cheaper since Canada Central's Sept 2025 price rise). |
| D5 | Sign-off targets | Henri | 10-06 | 0 unsupported safety/spec numbers · 100% cited · 95% or better correct abstention · 85% or better correct on answerable · 100% coverage · 2-week pilot |
| D6 | Build a live second-check model | Greg + Henri | 11-06 | Only if the data shows unsupported claims above target |
| D7 | French analyzer | Greg | 10-09 | Only if the cross-language slice misses its target |
| D10 | Pilot mechanics | Greg | 10-16 | Mix French and English speakers; include the 1.6 contributors |
| D11 | Keep the "Safety first" opener | Henri | 10-06 | Replace with a short safety line on safety or torque answers only |
| D12 | Claude may install small, named, standard local tools (e.g. a PDF page counter or splitter) | Greg | 09-23 | Yes, each one logged |
| D13 | Greg as named manual owner | Greg | 09-23 | Yes |
| D14 | Single abstention wording | Greg | 09-23 | "I don't have that information in BOULON's manuals — please check with a qualified technician or supervisor." |

## Top risks and mitigations
| Risk | Mitigation |
|---|---|
| A flattened table pairs the wrong torque with a bolt size | 2.3 fix with two independent checks; 15 safety/torque golden items with a target of 0 unsupported; exact-quote rule |
| Silent exclusion comes back at 100+ manuals | `maxFailedItems: 0`, a coverage report on every re-index, and G2 needs 100% |
| Greg becomes the bottleneck | One batched block a day, every click pre-written; 1.4 tries to automate |
| Agent answers can't be pulled automatically | 15-question G-smoke; G-full weekly only; paste template |
| The tier breaks the budget | Verified cost model before D4; monthly spend check |
| The admin key leaks or stays in use | 4.1 query-key swap; SAS token expiry; security review |
| Henri's calendar | Book 11-18 now; targets agreed by 10-06 |
| GPT-4.1 retirement | Check in 2.1; run G-full on any replacement model first |
| One bad answer costs mechanics' trust | Release only after G2; thumbs-down reviewed weekly; visible page citation |

## Success criteria
- [ ] 100% page coverage for every current manual (G2)
- [ ] Golden set v1 meets every D5 target at G1, G2 and G4
- [ ] 0 unsupported safety or spec numbers
- [ ] Query key, Entra sign-in, mechanics group
- [ ] 2-week mechanic pilot done; every thumbs-down closed
- [ ] Re-index runbook and project skills exist; Greg can run them
- [ ] Henri signs off against the agreed targets, with the ADR trail

*Assumptions: 09-30 (National Day for Truth and Reconciliation) is a working day; Thanksgiving, Mon 10-12, is off.*
