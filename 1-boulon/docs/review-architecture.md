# BOULON — Architecture Review
Reviewer: `ecc:architect` (lead architect, replacing the web-era baseline) · 2026-09-23 · Sources: all `docs/`, `CLAUDE.md`, `TODAY.md`, live index exports in `1-boulon/tests/results/`.
*Note: C4 below was already fixed in TODAY.md at 10:15, before this review finished.*

## Verdict
**The foundation is sound, but the safety story is overstated.** Azure AI Search plus Copilot Studio is the right base, and the index genuinely finds exact part numbers in the right manual (T1 and T2 pass). But three things the docs call "done" or "planned" are not real yet:
- **(a)** the "verification layer" is only instructions plus one setting;
- **(b)** the biggest manuals are silently cut off or missing, and those are exactly the "hardest cases" the pilot was meant to prove;
- **(c)** there is no way to measure "grounded and cited": no golden set, no pass mark, no Henri sign-off criteria.

Phase 1 should not close until those are fixed. Phase 2 "specialist agents" should be dropped or deferred. None of this needs more than the available budget.

**Terms:**
- **Chunk:** one searchable piece of a manual.
- **Indexer:** the Azure job that reads the PDFs into the index.
- **Tier:** the Azure AI Search price level. It sets the size limits.
- **Grounded:** every claim is backed by a retrieved passage.

---
## Issues, ranked

### CRITICAL
**C1. Large manuals are silently truncated, and the two largest are missing.**
- **Evidence:** indexer status shows "Truncated extracted text to '262144' characters" for Vicinity Service Manual.pdf and for the emp-cooling-fans manual. "Vicinity Service Manual Final - 2013.pdf" (103 MB) and "Vicinity Parts Manual 2015.pdf" (23 MB) were excluded. `timeline.md` says the 4 warnings came from the 2 oversized PDFs, but 2 of the 4 are truncations. The indexer is set to `"maxFailedItems": -1`, so it reports "Success" whatever fails.
- **Impact:** everything after roughly the first 262K characters of a 600+ page manual can't be found. The Parts manual is missing. At 100+ manuals this would repeat silently.
- **Fix:**
  1. Claude writes a coverage report: the highest page indexed for each manual against its real page count.
  2. Decide between splitting the PDFs and moving to a higher tier, after verifying current limits and prices.
  3. Set `maxFailedItems` to 0.
  4. Run the coverage check on every re-index.
- **Owner:** Claude (report, config); Greg (decision).

**C2. The "verification layer" was planned, not built, yet Step 1.6 is marked Done.**
- **Evidence:** rag-plan §3.4 promises "a second, cheap check … confirms every factual claim". What was actually built is instructions plus "Allow ungrounded responses" turned off. It was estimated at "a few days" and closed the same day, which means scope was dropped.
- **Fix:** rename 1.6 to "Grounding settings + abstention instructions (done)" and add Step 1.9, "Measured verification (offline)". See the realistic path below.
- **Owner:** Claude (docs, harness); Greg (settings).

**C3. There is no golden set, no pass mark and no sign-off criteria.**
- **Evidence:** Phase 1 is done "when the pilot passes its tests, or produces a clear, specific list of what's not working", and 3.3 is only "Final review with Henri".
- **Fix:**
  - Build a golden set of about 120 questions.
  - Agree numeric targets with Henri before testing.
  - Re-run the set after every change.
- **Owner:** Greg+Claude (set); Henri (targets).

**C4. T3 would have scored a correct abstention as a failure.** This is fixed in TODAY.md: T3 is now a must-abstain test.

### HIGH
**H1. Page-level citation exists in the index but isn't verified in the agent.**
- **Evidence:** `locationMetadata.pageNumber` exists. `document_title` is the raw file name (e.g. "401483 Rev B.pdf"), and text chunks have no link back to the source PDF.
- **Fix:** Greg screenshots one agent citation. If no page is shown, put the page number into the chunk text or title, and give the manuals readable titles (vehicle, system, revision).

**H2. There is no fallback for manuals that aren't indexed.** The agent can't tell "manual missing" from "information missing".
- **Fix:** don't re-enable SharePoint for mechanics. Publish a coverage list so the agent can say "That manual is not in BOULON yet — use the paper/SharePoint copy." Rollout rule: mechanics use BOULON only after the full library is indexed and has passed the golden set.

**H3. The Phase 2/3 "connected specialist agents" split is the wrong split right now.**
- **Why:** every specialist would read the same manuals, so the split adds routing mistakes, delay, rules duplicated across agents, and much more testing. And "safety" must apply to every answer, not live in one specialist.
- **Fix:** keep **one agent and one index**, and handle question types with answer-format instructions or topics. Add a connected agent only when a different data source or permission appears (e.g. a CMMS connection). Replace Phase 2 with "Full corpus + golden set + mechanic pilot group".
- **Owner:** Claude (redesign); Henri (approve).

**H4. Access control and keys aren't designed.**
- **Fix:**
  - Copilot Studio uses a **query key** (read-only), not the admin key.
  - Claude uses the admin key for config reads only.
  - The agent requires Entra ID sign-in, limited to a mechanics group.

**H5. The full-corpus cost isn't modelled.** The $615 figure is Basic tier, pilot only, and Basic-tier limits are what caused C1.
- **Fix:** Claude produces a verified cost comparison over 6 and 12 months: Basic plus PDF splitting versus a higher tier, including image-description and embedding costs at 100+ manuals.

### MEDIUM
**M1. French/English handling is untested.** The text fields use the default analyzer (the keyword-matching rules), not a French one.
- **Fix:**
  - The golden set includes cross-language questions.
  - Answer in the user's language, but quote specs and warnings in the manual's own words.
  - Add a French analyzer only if tests show misses.
  - Check whether French-first is required under the Charter of the French Language.

**M2. There is no update, re-index or retirement process.** Indexer `schedule: null`, and old and new versions sit side by side.
- **Fix:**
  - One "current manuals" folder, with the revision in each file name.
  - Deletion detection turned on.
  - An on-demand or scheduled indexer run, followed by a golden-set re-run.
  - Greg named as the manual owner.

**M3. There's no monitoring or feedback from mechanics.**
- **Fix:**
  - Turn on thumbs up/down in Copilot Studio.
  - Review every thumbs-down and every "I don't know" weekly, and turn each into a golden-set item or a coverage fix.
  - Track the share of answers with no citation and the abstention rate.

**M4. Chunking is the wizard defaults, so tables were never handled "deliberately".** Claude audits the longest chunks and the table chunks before the full re-index. A flattened table has already been confirmed.

**M5. Hybrid plus semantic search is configured, but Copilot Studio's use of it is unverified.**
- **Fix:** compare the agent's citations with Claude's direct hybrid/semantic queries for the golden questions.

### LOW
- **L1.** Recount the index-facts table: it adds up to 24 files, but the count says 23.
- **L2.** Pick one abstention wording. The evaluation matches on it.
- **L3.** The "Safety first" opener risks people tuning it out. Ask Henri.
- **L4.** Check that GPT-4.1 has no announced retirement date in Copilot Studio.
- **L5.** The Orion pressure-release item dates from the SharePoint era. Close it and log it as evidence.

---
## Verification: the realistic path in Copilot Studio
1. **Settings (done or quick):**
   - Ungrounded answers off.
   - Content moderation at its strictest level.
   - The abstention instruction.
   - Numbers and specs quoted exactly, with a page.
2. **Offline verification (recommended now):**
   - Claude runs the golden set.
   - Agent answers are collected, pasted in by Greg or pulled automatically if a channel allows it.
   - A judge checks each claim against the passages Claude retrieves, and flags any number not found word-for-word in a passage.
   - Near-zero cost, and it gives Henri real numbers.
3. **Live verification (only if step 2 shows unsupported claims above the target):** a topic sends the draft plus the passages to gpt-5-mini, which returns supported or unsupported. Unsupported answers are replaced with the abstention. That's about a week of build work.

Do steps 1 and 2 now, and decide on step 3 from the data.

## Missing pieces — specifics
- **Golden set (~120 questions):**
  - about 60 answerable (every manual, including tables, diagrams and late pages)
  - about 20 French/English cross-language
  - about 25 must-abstain
  - about 15 safety or torque

  Each has the expected answer, source and page.
- **Proposed Henri targets (Henri sets the final numbers):**
  - 0 unsupported safety or spec numbers
  - 100% of answers cited
  - at least 95% correct abstention
  - at least 85% correct on answerable questions
  - a 2-week pilot with 3–5 mechanics, with every thumbs-down reviewed
  - a full-coverage report

## Assumptions review
| # | Holds? | Note |
|---|---|---|
| 1 Needs | Revise | Unvalidated, and "V1 part lookup" is stale. Get 10 real questions each from 3–5 mechanics for the golden set. |
| 2 No MS-only limit | Holds | Transdev IT data rules still apply. |
| 3 Budget | Holds, revise cost | $615 is Basic tier, pilot only (H5). |
| 4 No zero hallucination | Holds | |
| 5 AI Search + cheap verification | Half holds | The verification pass isn't built (C2). |
| 6 No custom code | Revise | False for live verification, page citations, splitting and re-index automation. |
| 7 Pilot with hardest cases | Revise | The hardest cases were truncated or excluded (C1). |

## Schedule realism
A 2026-09-25 Phase 1 close isn't realistic, because "ahead of plan" came from dropped scope. Proposed dates:
- Golden set and coverage fixes: about 10-09.
- Full-corpus index with coverage check: about 10-23.
- Mechanic pilot group: 10-26 to 11-06.
- Henri sign-off: mid to late November.

Specialist agents aren't scheduled.

## Doc corrections to make
1. Index name → `multimodal-rag-1790098589411` (continuity 1.5, spec 1.5 and 1.7.7).
2. "25 manuals" → "23 indexed of 25 uploaded; 2 Vicinity files excluded, 2 truncated".
3. T3 → a must-abstain test (spec 1.8).
4. Step 1.6 → "Settings + instructions done; verification layer not built".
5. Timeline: the warnings were 2 excluded plus 2 truncated, and the 1.6 owner was Greg.
6. Spec 1.7 step 4 ("Leave SharePoint ON") is superseded.
7. Spec 1.6 and 1.8 status → match the continuity log.
8. rag-plan §2, §5 and §8.4: the SharePoint and V1 references are stale.
9. rag-plan "11 tracked steps" → 8.
10. rag-plan §6 cost → "Basic tier, pilot only; full corpus pending".
11. Assumptions 1, 5, 6 and 7 → revise.
12. CLAUDE.md index name confirmed.
13. Query key for Copilot Studio; admin key only for Claude config reads.
14. ecc-value-report: security is in scope (H4).
15. index-facts: name the excluded files and recount.
16. Phase 2/3: replace specialists with "full corpus + golden set + mechanic pilot".

## Recommended target architecture
    Mechanic (Teams / web, Entra sign-in, mechanics group only)
            |
    Copilot Studio agent "BOULON"  (GPT-4.1, one agent, no specialists)
      - strict grounding + abstention + exact-quote rule
      - coverage list: "manual X is not in BOULON yet"
      - thumbs up/down --> weekly review --> golden set / fixes
            |  query key (read-only)
    Azure AI Search index (all current manuals, readable titles,
      page numbers, language + revision tags)
            ^
    Indexer (on-demand/scheduled, fails loudly, deletes retired files)
            ^
    Blob "current-manuals" (PDFs split to fit tier limits; owner: Greg)

    Claude Code (offline): coverage report + golden-set run + claim checker
      --> 1-boulon/tests/results/ --> Henri sign-off against agreed targets

One agent reading one well-maintained index is the simplest design that can be made safe. The safety is measured, not assumed:
- a coverage report proves every page of every current manual is in the index;
- every answer quotes the manual with a citation a mechanic can check (manual and page);
- a fixed question set, re-run after every change, proves the agent answers correctly and abstains when it should.

A live second-check model and specialist agents stay off the roadmap until the data shows they're needed.
