# BOULON — Master Timeline (single source of truth)
Compiled 2026-09-23 by the project historian (Claude). **Covers:** Mon 2026-09-08 (Greg's first day) to Wed 2026-09-23, plus the planned path to launch on Fri 2026-10-16. **Test detail:** `docs/test-ledger.md` (111 tests).

**Rules used:**
- Exact dates come only from a source.
- "≈" means ESTIMATED.
- Nothing is invented. Where no source covers a period, it's listed under Gaps.

**Terms (explained once):**
- **Knowledge source**: where the agent looks things up.
- **Web search**: a Copilot Studio switch that lets the agent use the public internet.
- **Ungrounded responses**: a switch that lets the agent answer from its general AI knowledge, without a document behind the answer.
- **Topic**: a scripted conversation flow.
- **Tool**: an action the agent can call, like reading a list.
- **Flow (Power Automate)**: an automated step run outside the chat.
- **RAG** (retrieval-augmented generation): the AI first retrieves passages from the manuals, then writes its answer from them, with citations.
- **Index**: Azure AI Search's searchable copy of the manuals, cut into chunks.
- **Hybrid + semantic search**: keyword matching plus meaning-based matching, re-sorted by Microsoft's re-ranker.
- **Multimodal**: diagrams and images are described in text so they can be searched too.

---

> **Date correction (Greg, 2026-09-23):** internship started Mon Sep 8. Greg **received access to the BOULON agent on Sun Sep 14** and **started working on it Mon Sep 15**. V0/V1 work therefore runs from Sep 15, not Sep 8. Where this file says "≈Sep 8–15" for V0/V1, read **Sep 15**.

## Configuration versions

| Ver | Dates | Knowledge source | Web search | Ungrounded | Topics / tools | Model | Retrieval type |
|---|---|---|---|---|---|---|---|
| **V0** inherited agent "BOULON, Greg" | set up ≈ Feb 10, 2026 (SharePoint folder); inherited Sep 8, used ≈ Sep 8–15 (ESTIMATED) | SharePoint `Manuels d'entretien QC`, URL at `…/Greg Boulon` level (7.79 GB), no filters, Official source OFF | **ON** | **ON** | Greg: "topics that didn't work". The Sep 16–17 log says no tools/triggers/child agents; instructions claimed CMMS access that didn't exist | GPT-4.1 | SharePoint connector: semantic/keyword search chosen by Copilot |
| **V1** grounding lockdown | ≈ Sep 8–15 (ESTIMATED; already in place at the Sep 16 audit) | Same, URL narrowed to `Manuels de service/Manuels` | **OFF** | **OFF** | none relevant | GPT-4.1 | Same connector |
| **V2** Custom Search topic | Sep 16 (09:48 run recorded) | Same | OFF | OFF | Topic "Part Number Lookup": Trigger → Question (`Topic.PartNumber`) → Custom Search (`Topic.SearchResults`) → Set variable `ExactMatches = Filter(SearchResults, PartNumber in Content)` → Message (counts) | GPT-4.1 | Connector search, then an exact text filter |
| **V3** Valeo pilot pivot | Sep 16–17 | Plan only: 19-page `Valeo ETL Thermo Plus.pdf` (DOK40121, rev 11/2019). No evidence it was ever connected | OFF | OFF | Unchanged | GPT-4.1 | Planned: page-cited upload plus a structured PartsIndex |
| **V4** Tier 1 exact lookup (built by Greg + assistant) | ≈ Sep 17–21 (ESTIMATED; exact date unknown) | SharePoint manuals (generative answers, "Tier 2") + hand-typed SharePoint list **"BOULON - Parts Lookup Pilot"** | OFF | OFF | Topic "Part Number Lookup" + tool "Get items" + Power Automate flow "BOULON Exact Part Lookup" | GPT-4.1 | Exact list lookup (Tier 1) + SharePoint generative answers (Tier 2) |
| **V5** Azure AI Search RAG pilot | Sep 22 | **Azure AI Search only** ("BOULON Manuals — AI Search Pilot", index `multimodal-rag-1790098589411`, 23 of 25 PDFs, 2,250 chunks). SharePoint retired as a knowledge source | OFF | OFF | Tier 1 topic, tool and flow all OFF; system topics + "Salutations", "Au revoir merci recommencer"; CMMS lines removed; "Safety first…" opener | GPT-4.1 (replies); pipeline: `text-embedding-3-small` + `gpt-5-mini` | Hybrid (keyword + vector) + semantic config, multimodal (image descriptions), **Free tier** |
| **V6** current | Sep 23 | Same index (Free tier, 44.9/50 MB) | OFF | OFF | + Fix 1 (bold part numbers, spaced citations), Fix 2/D14 (bilingual "don't know" line in the Secours topic). **Published** (≈14:05–14:35). Sign-in: "Authenticate with Microsoft" | GPT-4.1 | Same. Citations show the index name, not the manual |

---

## Phase 0 — Arrival and inherited agent (V0) · Mon Sep 8 → ≈ Sep 15

| Date | What happened | Config | Evidence | Who |
|---|---|---|---|---|
| ≈ Feb 10, 2026 | SharePoint folder `Greg Boulon/Manuels de service` created (06:16 PM), 7.79 GB, ~30 manufacturer folders. The knowledge source "Manuels d'entretien QC" was last modified by ECKERN, Henri "7 months ago" | Pre-V0 | Screenshots 01, 02, 03, 04, 05, 06 | Henri Eckern (per SharePoint metadata) |
| **Mon Sep 8** | Greg starts the internship | V0 | Greg's statement | Greg |
| ≈ Sep 8–15 (ESTIMATED) | Greg inherits agent "BOULON, Greg": one SharePoint source, web ON, ungrounded ON, topics not working | V0 | Greg's statement; `TEST_CHRONOLOGY_RECOVERED.md` "Original state" | Previous owner (Greg Boulon); Greg |
| ≈ Sep 8–15 (ESTIMATED) | Test: vehicle spec answered from a Vicinity manual (ledger #1) | V0 | Sep 17 log §3 | Greg |
| ≈ Sep 8–15 (ESTIMATED) | **Turning point 1:** `1000-1259` returns public internet brake-pad sellers (ledger #2) | V0 | Sep 17 log §3; chronology §2; PM deck ("External web used") | Greg + ChatGPT assistant |

## Phase 1 — Grounding lockdown (V1) · ≈ Sep 8–15 (ESTIMATED)

| Date | What happened | Config | Evidence | Who |
|---|---|---|---|---|
| ≈ Sep 8–15 (ESTIMATED) | Web search → OFF; ungrounded → OFF; URL narrowed to `Manuels de service/Manuels`; Official source left OFF | V1 | Sep 17 log §2; screenshots 04/06 (source settings), 07 (empty filter panel) | Greg |
| ≈ Sep 8–15 (ESTIMATED) | **Turning point 2:** with web OFF, `1000-1259` → wrong `1359parts.pdf` "Hose, Drain", then `1259parts.pdf`. Also: `1000-4270` "absent" (false), Airtronic applicability, `GW-9999-ABC` (ledger #3–7) | V1 | Sep 17 log §3; chronology §3–6 | Greg |
| ≈ Sep 8–15 (ESTIMATED) | Ground truth `1000-4520` = p.162/713 bolt (ledger #8–9). Screenshot 20 shows a "vicinity" footer on the Grande West page, a possible reason for the Vicinity citations (observation only) | V1 | Screenshots 20, 21 | Greg |

## Phase 2 — Custom Search topic (V2) · Sep 16

| Date | What happened | Config | Evidence | Who |
|---|---|---|---|---|
| ≈ Sep 8–16 (ESTIMATED; first iteration earlier, final form by the Sep 16 09:48 run) | Topic built. First trigger phrases were "what is the part number for this item…"; later "part number lookup / find part number / …". Question → Custom Search → Set variable → Message | V2 | Screenshots 08–19 | Greg + ChatGPT assistant |
| **Sep 16, 09:48** | Topic run `1000-1259`: raw SharePoint dump, "no direct match" (ledger #11). Other runs: `[]`, 15/0, 19/0, browser freeze, revert (ledger #10, #12–14) | V2 | `RAW_Custom_Search_Test_Output_1000-1259.md`; Sep 17 log §3 | Greg |
| **Sep 16** | Formal MVP audit: split the two jobs (manual Q&A needs page-cited RAG; part numbers need an exact structured lookup). Audit notes the agent was a Draft, unpublished, French (Canada), Entra ID sign-in, Batch Evaluation unlicensed | V2 | `BOULON_Greg_MVP_Audit.md` | ChatGPT assistant |
| **Sep 16, 14:48–15:14** (file timestamps) | Three PM/motion decks delivered (static, not animated; the sprint deck says "MVP assessed, retrieval risks identified, pilot document selected"); Remotion handoff written. No video ever rendered | — | `05_pm_and_motion_artifacts/` | ChatGPT assistant |

## Phase 3 — Valeo pilot pivot (V3) · Sep 16–17

| Date | What happened | Config | Evidence | Who |
|---|---|---|---|---|
| Sep 16–17 | Pivot to the 19-page Valeo Thermo Plus manual; acceptance cases `20819B`, `11118536D`, `VALEO-TEST-99999`. First blocker (is the PDF in the connected scope?) never answered. **No run recorded** | V3 | Sep 17 log §4; screenshot 03 shows a `Valeo Thermo 300.002` folder in SharePoint | Greg + ChatGPT assistant |
| **Thu Sep 17** | Continuity log/handoff written; PM reporting to the overseer (Henri)¹ | V3 | `MAINTENANCE_PROJECT_CONTEXT_2026-09-17.md` | ChatGPT assistant |

## Phase 4 — Tier 1 exact lookup (V4) · ≈ Sep 17–21 (ESTIMATED)

| Date | What happened | Config | Evidence | Who |
|---|---|---|---|---|
| ≈ Sep 17–21 (ESTIMATED) | Greg + assistant build Tier 1: list "BOULON - Parts Lookup Pilot" (hand-typed), topic "Part Number Lookup", tool "Get items", flow "BOULON Exact Part Lookup" | V4 | Greg's statement; implementation-spec Step 1.7; continuity-log delete-zone | Greg + assistant |
| ≈ Sep 17–21 (ESTIMATED) | SharePoint generative ("Tier 2") tests: HK98-0021 confirmed present; Orion answer with a pressure-release/PPE line, unverified (ledger #15–16) | V4 | implementation-spec 1.8; continuity-log §4 | Greg |
| ≈ Sep 17–22 (ESTIMATED) | Planning moves to the Claude web workspace; Azure RAG plan + $5,000 CAD budget | V4 | `rag-plan-reference.md`, `assumptions-log.md` (written Sep 22) | Greg + Claude |

## Phase 5 — Azure AI Search RAG pilot (V5) · Tue Sep 22

| Time (EDT) | What happened | Evidence | Who |
|---|---|---|---|
| ~midday (earlier) | Live Azure pricing (~$615 CAD / 6 months budgeted) | timeline.md | Claude |
| ~morning | **Azure account created**; Steps 1.3a–c | timeline.md | Greg |
| 12:02 → 12:59 | Foundry, storage, search keys; Steps 1.3–1.4 done; 25 manuals uploaded | timeline.md | Greg |
| 13:20 | Claude can't reach Azure from the web workspace; the index is built by Greg with the Import-and-vectorize wizard; `gpt-4o-mini` deprecated → `gpt-5-mini` | timeline.md | Greg |
| afternoon | Indexer Success, 23/23 docs, 4 warnings (2 excluded >16 MB, 2 truncated at 262K characters). **BTMS test PASS** (ledger #17) | timeline.md | Greg + Claude |
| afternoon | **Turning point 3:** Tier 1 retired (topic, tool, flow); SharePoint retired as a knowledge source; CMMS lines removed; Azure AI Search is the sole source; abstention instructions | continuity-log §2, §5 | Greg |

## Phase 6 — Current (V6) · Wed Sep 23

| Time (EDT) | What happened | Evidence | Who |
|---|---|---|---|
| morning | Moved to Claude Code; Azure reachable from Greg's machine | continuity-log §6 | Greg + Claude |
| 10:01–10:44 | Index tests: 403, then real index name found; T1–T3 PASS ×4 runs; BTMS ad-hoc (ledger #18–37) | `tests/results/2026-09-23_*.md` | Claude |
| ~10:15–10:30 | ECC architecture + RAG reviews; **torque table flattened (CRITICAL)**; **service is on the Free tier, not Basic**; coverage check | review-*.md, index-facts.md, coverage-2026-09-23.md | Claude (ECC agents) |
| 10:45–10:46 | Golden set v0: first run errors (old index name); rerun **semantic 10/10, hybrid 9/10, keyword 8/10** (ledger #38–97) | golden_*.md | Claude |
| ~10:55 | Test panel: T1/T2/G8 right, citations show the index name; Orion/Tesla safe with the generic fallback (ledger #98–102) | continuity-log 11:00 | Greg |
| 11:25 | Citation rule tightened (index name = FAIL). Fix 1 applied | continuity-log | Greg |
| 12:05 | Decisions D3, D12, D13 YES; D1 leaning NO | continuity-log | Greg |
| 12:30 | **Fix 2 / D14 PASS** (ledger #103–104). Inventory: 3,052 files, 6.95 GB. Direct Line 403 | continuity-log | Greg + Claude |
| 14:05 | Blob: 25 PDFs, 181.4 MB → 44.9 MB index. Direct Line reaches the agent, but it's not published | continuity-log | Claude |
| 14:15 | Plan to launch **Fri Oct 16** | plan-to-oct16.md | Claude (ecc:planner) |
| 14:35 | **D4 = paid Basic tier (Canada East) + chapter splitting.** Agent published. Direct Line auth error (ledger #107–111) | continuity-log; agent_2026-09-23_1425.md | Greg |
| 14:50 | Correction: no paid resource is created without approval; cost request for Henri | continuity-log | Claude |
| 15:10–15:50 | Request page v2; recovery bundle added; this historian pass | continuity-log | Claude |

---

## Planned path to launch (from `docs/plan-to-oct16.md`, not yet happened)

| Date | Milestone |
|---|---|
| Thu 09-24 | D1/D4 confirmed; create the Basic service (after approval); ask mechanics for questions |
| Fri 09-25 | File list, page counts, oversize list; Document Intelligence cost verified |
| Mon 09-28 → Wed 09-30 | New index on Basic with title/page fields (fixes citations), table-friendly reading; agent repointed with the read-only key; golden run |
| **Thu 10-01** | **Gate A:** citations show manual + page; p.22 torque correct; 0 failed files |
| Fri 10-02 → Tue 10-06 | Golden set grows to ~40; full core library split and uploaded; **Henri agrees targets (10-06)** |
| Wed 10-07 → Thu 10-08 | Coverage check; IT sign-in/log requests; full golden run + number check |
| **Fri 10-09** | **Gate B:** every page searchable + Henri's targets (0 unsupported numbers, 100% cited, ≥95% correct abstain, ≥85% correct) |
| Mon 10-12 | Thanksgiving |
| Tue 10-13 → Thu 10-15 | Fixes, mechanic sign-in; soft launch to 3–5 mechanics; final golden run |
| **Fri 10-16** | **Gate C: Henri sign-off / launch** |

---

## Gaps: facts no source pins down (filled with ESTIMATES)

Greg says the recovery bundle covers Sep 8–15. The bundle has only two exact dates for that period: Sep 16 (the topic run, the audit and the decks) and Sep 17 (the handoff log). Everything else below is an estimate drawn from it.

| Fact | Best estimate | Basis |
|---|---|---|
| What happened Sep 8–15 | Inherited-agent review, web-ON and web-OFF tests (ledger #1–9), ground-truth checks, first topic iteration. ESTIMATED | Sep 17 log "reconstructs earlier maintenance work"; the sprint deck calls this "Sprint 0 Discovery & setup" and "Sprint 1 MVP audit & testing"; all of it predates the Sep 16 09:48 run |
| Web search and ungrounded switched OFF | ≈ Sep 10–15 (ESTIMATED) | Both already OFF in the Sep 16 audit; the chronology places the switch after the web-ON 1000-1259 test |
| Exact dates of tests #1–10, #12–14 | ≈ Sep 8–16 (ESTIMATED) | Logged without timestamps |
| "Broken topics" in V0 | Present at hand-over per Greg; the Sep 17 log says "no topics at initial inspection". Recorded as Greg's statement. ESTIMATED | Conflicting sources; Greg's first-hand account given priority |
| Tier 1 build (list, "Get items" tool, flow) | ≈ Sep 17–21 (ESTIMATED) | After the Sep 16 audit recommended a structured PartsIndex; before its Sep 22 retirement. Row count and tests not recorded |
| Valeo tests | Never run (ESTIMATED): superseded by Tier 1 | No result in any source |
| Move from the ChatGPT workspace to the Claude web workspace | ≈ Sep 18–22 (ESTIMATED) | The Sep 17 log is the last ChatGPT artifact; the Claude docs start Sep 22 |
| Azure account created | Sep 22, morning (source: `docs/timeline.md`) | Logged; who approved the subscription is not recorded |
| Original agent and SharePoint source set up | ≈ Feb 10, 2026 (ESTIMATED), by Henri Eckern's account | SharePoint "Created 2/10/2026" and "Modified by ECKERN, Henri" (screenshots 01–06) |
| Orion PPE line (ledger #16) | Unverified | Open check against the Orion manual |

¹ **Overseer name:** BOULON's overseer has always been **Henri** (Henri Eckern). The Sep 16–17 ChatGPT-era log and PM deck name "Eric". Greg confirmed on 2026-09-23 that this was a mis-attribution by the old assistant: Eric oversees a different project.
