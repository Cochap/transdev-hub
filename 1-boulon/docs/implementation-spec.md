# BOULON RAG Build — Step-by-Step Spec
**Written:** 2026-09-22 (Tuesday), updated same day as Greg works through hands-on Azure setup | **For:** Greg Riley | **Plain language throughout.** This is the execution-level detail behind the plan already saved in "Copilot Studio + RAG - Implementation Plan and Reference Guide." Full running timeline lives in "Project Timeline - Time Keeper Log." Full Copilot Studio agent architecture/state lives in "BOULON Maintenance AI - Continuity Log."

---

## How to read this
Each step is written as a small, checkable unit. Steps are grouped into the four phases from the main plan.

---

## PHASE 1 — THE PILOT

### Step 1.1 — Confirm the pilot document list
**Status: still open, non-blocking.**

### Step 1.2 — Get real Azure pricing numbers
**Status: done.**

### Step 1.3 — Set up the Azure account and core resources
**Status: all done.**

### Step 1.4 — Load the pilot manuals into the cloud folder
**Status: done.**

### Step 1.5 — Build the search index — **all done and verified.** See prior entries; index `multimodal-rag-1790098589411` built, 23 PDFs indexed (2 excluded by tier limit, 2 truncated at 262K chars), real test query confirmed correct multimodal retrieval.

### Step 1.6 — Add the "don't guess" safety layer
**What:** stop the agent from answering ungrounded, and force it to say "I don't have that — check with a person" when nothing relevant is retrieved.
**Settings to change on the BOULON agent (Agent settings → Generative AI → Knowledge):**
1. Turn **"Allow ungrounded responses" OFF.**
2. Confirm the "search only selected sources" behavior is intentional per source (see Step 1.7 below — this interacts with which knowledge sources exist).
3. Add an abstention instruction to the agent's custom instructions field: *"You are a maintenance assistant that answers only using information retrieved from the connected manuals. If the retrieved information does not clearly answer the question, respond: 'I don't have that information — please check with a qualified technician or supervisor.' Never guess or fill in missing steps from general knowledge, even if you believe you know the answer. Every factual claim must cite its source."*
**Status: Done (2026-09-22) — settings + instructions complete. (Corrected 2026-09-23: the verification layer flagged in Step 1.9 is not built yet; what's done here is the grounding settings only — see review-architecture.md C2)**

### Step 1.7 — Retire the Tier 1 flow/topic and connect Azure AI Search
**Decision (2026-09-22): retire the Tier 1 exact-match system.** It was a stopgap built before real RAG existed, querying a small manually-typed SharePoint list ("BOULON - Parts Lookup Pilot") — not an authoritative source. The verified Azure AI Search pilot already returns exact values (tool lists, durations, part references) verbatim, with a citation back to the source manual, which the old flow never provided. Full reasoning logged in the Continuity Log.

**All the concrete steps, in order:**

1. **Disable the "Part Number Lookup" topic.** In Copilot Studio → open the BOULON agent → Topics → open "Part Number Lookup" → toggle it off (disable, don't delete — reversible).
2. **Disable the "BOULON Exact Part Lookup" flow's connection to the agent.** In Copilot Studio → Actions (or wherever the flow is registered as an agent action) → find "BOULON Exact Part Lookup" → disable/remove it as an agent action. The underlying Power Automate flow itself can stay untouched in Power Automate — we're only disconnecting it from the agent.
3. **Disable the "Get items" tool.** It's hardcoded to only the "BOULON - Parts Lookup Pilot" SharePoint list and has no other use once the flow above is disabled — turn it off too, same place tools are managed on the agent.
4. ~~**Leave the existing SharePoint knowledge source (the manuals folder) turned ON, for now.**~~ **(Superseded 2026-09-23 — see review-architecture.md H2):** no fallback is needed during testing, but a coverage list must be published before wider rollout so mechanics know which manuals are in BOULON and which they still access via paper/SharePoint. Don't re-enable SharePoint for mechanics — publish coverage instead. Rollout rule: use BOULON only after full library indexed and has passed the golden set.
5. **Add Azure AI Search as a new knowledge source.** In Copilot Studio → open the BOULON agent → Knowledge → "Add knowledge" (or "+ Add") → choose **Azure AI Search** as the source type.
6. **Authenticate.** Enter the Search service endpoint (`https://boulon-pilot-search.search.windows.net`) and the admin/query API key already collected in Step 1.3e.
7. **Select the index.** Pick `boulon-pilot-index` from the list it shows.
8. **Confirm field mapping.** The wizard should auto-detect content/title/citation fields since the index was built through Azure's own Import wizard — accept the defaults unless something looks obviously wrong (tell me what you see if it asks you to map fields manually and it's not obvious).
9. **Name and describe this knowledge source carefully** — this matters because the agent's orchestration is generative (it picks tools/sources by matching name+description, not fixed rules). Suggested text:
   - **Name:** `BOULON Manuals (AI Search Pilot)`
   - **Description:** `Multimodal search over a pilot set of 25 BOULON maintenance manuals, including text, tables, and diagrams. Use for maintenance procedures, part identification, troubleshooting, specs, and diagrams.`
10. **Save.**
11. **Test in the built-in Test panel** (see Step 1.8 for the exact test questions) before considering this step done.

**Status: ready to start — steps 1–4 first (retire the old system), then steps 5–11 (connect the new one), then Step 1.6's settings.**

### Step 1.8 — Test the pilot against real questions
Run the five validated question types plus new hard-case (table/diagram) questions, in the live agent this time (not just Search Explorer).

**Concrete tests to run once Step 1.7 is done:**
- **T1:** Type exactly: `Is part number HK98-0021 in the Baultar manual, and what is it?` — expect a real match with a citation to the Baultar manual (this part number was already confirmed present during earlier Tier 2 testing).
- **T2:** Type exactly: `What is part number 12052641 used for in the Proheat manual?` — same idea, using a second already-confirmed real part number.
- **T3 (must-abstain test):** Type exactly: `What's the part number for the pipe fitting in the Orion manual, part 080808082?` — expect the agent to say "I don't have that information" or equivalent, because no Orion manual is indexed. (Corrected 2026-09-23: this is a test of correct abstention, not a real lookup.)
- **T4 (needs one thing from you first):** to properly compare the new system against the old flow's actual coverage, I don't have visibility into what's actually in the "BOULON - Parts Lookup Pilot" SharePoint list — paste 2-3 real rows from it (part name + part number) here, and I'll turn those into the same kind of exact-match test so we confirm nothing the old flow could do got lost.
- Report back exactly what each test returns (or send a screenshot) — a real match with a citation is a pass; anything else, tell me the literal question and answer so I can diagnose it.

**Status: not started — blocked on Step 1.7 being done first, plus T4 needs the SharePoint list rows from you.**

**Phase 1 is complete when:** the pilot passes its tests, or produces a clear, specific list of what's not working yet.

---

## PHASE 2 — FIRST SPECIALIST
**Status: Under review (2026-09-23).** Original plan called for specialist agents split by topic (parts, troubleshooting, safety). Architecture review (review-architecture.md H3) recommends one agent + one index instead, handling question types via answer-format instructions rather than agent splits. Rationale: every specialist would read the same manuals, so the split adds routing errors, delay, and duplicated rules without safety benefit. **Decision pending Henri's approval.** If approved, Phase 2 becomes: "Full corpus indexing + golden set development + mechanic pilot group" (see review-architecture.md §"Schedule realism"). (Corrected 2026-09-23: see review-architecture.md.)

---

## Next actions
1. **In Copilot Studio, work through Step 1.7's steps 1–4** (disable Part Number Lookup topic, disable the flow's connection to the agent, disable the Get items tool, confirm SharePoint knowledge source stays on).
2. **Then work through Step 1.7's steps 5–11** (add Azure AI Search as a knowledge source, using the endpoint/key/index above).
3. **Apply Step 1.6's settings** (turn off "Allow ungrounded responses," add the abstention instruction) either before or right after connecting the new source.
4. **Run T1, T2, T3 from Step 1.8** in the live agent's test panel and send me what comes back.
5. **Paste 2-3 real rows from the "BOULON - Parts Lookup Pilot" SharePoint list** so I can write T4 and confirm nothing the old flow could do got lost in the switch.
