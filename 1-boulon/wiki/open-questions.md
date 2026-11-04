---
title: Open questions and contradictions
type: overview
status: open
updated: 2026-09-30
sources: [../docs/continuity-log.md]
---

- When will IT act on [[azure-ticket-77048]]? (Greg checks the portal daily.)
- What does MIR contain, and will [[alex-dumenne]] grant access? ([[phase-2-cmms-diagnosis]])
- What happens when a mechanic asks about a manual outside the pilot? Needs a decision before wider rollout ([[phase-1-manuals-pilot]]).
- Does "Greg Boulon" in old docs mean the project name BOULON mistranscribed? Check with Greg.
- Does the Power Automate "Execute Agent" route work with sign-in ON? Unverified ([[boulon-testing]]).
- Was the sent ticket text the v5 file? Harmless either way.
- Old Orion answer's pressure-release line: was it sourced from the manual?
- Contradiction noted: CLAUDE.md says Basic in Canada Central ≈ CAD 112/month; the D4 memo said about 102 in Canada East. Newer (Central, 112) wins ([[decision-d4-paid-search-tier]]).

## Related
[[overview]]

## Added 2026-09-30 (Phase 2 and Azure docs ingest)
- Contradiction resolved: the Phase 2 plan doubted in-place Basic to S1. [[azure-tiers-verified-2026-09-24]] says it is in place; only Free to Basic is not ([[azure-search-tiers]]).
- Contradiction: ADR 0001/0003 and the D4 memo price Basic at CAD 102.20 (Canada East); the ticket asks Canada Central at CAD 112.42. Newer (Central) wins ([[decision-d4b-canada-central]]).
- Which Canada Central meter (old or "CC", about 10% higher) will a new service be billed on? Unverified.
- Is [[decision-adr-0003-tier-rescoped-for-phase2]] still "Proposed", or confirmed by Greg now that the ticket was sent? Status in the ADR index is Proposed.
- Does the Copilot Studio connector support filters and per-index permissions? Unverified ([[phase-2-architecture]]).
- Does IT require private endpoints? It would force S1 from day 1 ([[phase-2-risks-and-flip-conditions]]).
- Where is MIR hosted and how many work orders are there? Needed to size Phase 2 ([[phase-2-sizing-scenarios]]).
- Which subscription or budget pays for Azure and for Phase 2 running costs? Not stated ([[meeting-2026-09-24-pierre]]).
- Is the pilot storage account really in Canada East (inferred from DNS)? ([[azure-resources-inventory]]).
- Does gpt-5-mini deploy regionally in Canada East, and what is the Free-tier vector quota? Unverified ([[azure-tiers-verified-2026-09-24]]).
- The third Canadian CMMS tool named in the meeting (Ontario?) is unidentified ([[hexagone-a-tune]]).

## Added 2026-09-30 (plans, HQ, skills, rebuild v2 ingest)
- Superseded: target sign-off Wed 2026-11-18 ([[orchestration-plan]]) replaced by Fri 2026-10-16 ([[plan-to-oct16]], 2026-09-23). Newer wins; the 10-16 plan is internal only ([[launch-plan-oct16]]).
- Superseded: [[resume-2026-09-24]] says the Azure ticket was NOT submitted; it was sent on 2026-09-25 with option A ([[azure-ticket-77048]]). Newer wins.
- The launch plan's dates (Basic service by 09-24, Gate A 10-01, Gate B 10-09) have slipped because IT has not created the service. Has Greg re-dated the plan? Not stated in any source ([[launch-plan-oct16]]).
- Contradiction: [[plan-to-oct16]] says create Basic in Canada East; the ticket asks Canada Central (Document Intelligence has no price meters in Canada East, [[rebuild-v2-pipeline]]). Newer (Central) wins.
- Root `CLAUDE.md` still lists the Power Automate email digest as a live route, but Greg dropped it on 2026-09-29 ([[howto-email-digest]], [[feedback-no-tedious-power-automate]]). Should `CLAUDE.md` and [[skill-boulon-morning-check]] be updated?
- Does Copilot Studio actually read the `title` and `url` fields for citations? Unverified; first test is the 1-file trial on Basic ([[rebuild-v2-pipeline]]).
- Will page numbers come through for text chunks in markdown mode? Unverified ([[rebuild-v2-pipeline]]).
- Does deletion tracking work on chunked indexes? Microsoft says soft delete does not apply to one-to-many indexing; unverified for v2.
- Have the three HQ Control room auto buttons (Morning check, Read the email digest, Refresh BOULON HQ) been run from a button? Not as of 2026-09-25 ([[boulon-hq-control-room]]).
- What were the results and Greg's ratings of the 2026-09-30 learning videos? Not in any source yet ([[learning-research-prd-workstream]]).
- Who requested the Geotab launch film, for what audience and by when? Not stated ([[geotab-launch-film-project]]).

## Added 2026-09-30 (docs ingest: timelines, reviews, index facts)
- Superseded: the master timeline and reports quote Basic in Canada East at about 102 CAD per month; newer facts say Canada East lacks AI enrichment and the ticket asks for Canada Central (112 CAD per CLAUDE.md). Newer wins ([[tier-limits]], [[lessons-2026-09-24]]).
- Superseded: the ChatGPT-era log names the overseer "Eric"; Greg confirmed on 2026-09-23 it is Henri ([[recovery-bundle]]).
- Superseded: docs naming index `boulon-pilot-index`; the real name is `multimodal-rag-1790098589411` ([[index-facts]]).
- Superseded: the old Phase 2 "specialist agents" plan; Phase 2 is now [[phase-2-cmms-diagnosis]] ([[implementation-spec]]).
- Open: does Copilot Studio use the semantic re-ranker? The setting is not shown in the UI ([[semantic-reranker]]).
- Open: the index-facts chunk table lists 24 files but the total says 23; recount needed ([[index-facts]]).
- Open: whether truncated manuals lose their later pages; coverage check showed text reaching p.217 and p.157 like the images, so "truncation loss" is unverified until real page counts are known ([[test-ledger]]).
- Open: Tier 1 (V4) tests and Valeo tests left no recorded inputs or results; the legacy list rows tested later were not in the index ([[project-history]]).
- Open: fleet list (which bus families are still in service) is still needed to fix the core library ([[manuals-library]]).

## Added 2026-10-07 from project brief 551
- Who holds the documentation for the Sudbury (ON) and Kitimat (BC) workshops? The measured library is the Quebec Manuels folder only. Source: [[project-brief-551]].
- Spanish is required by the brief and untested.
- The brief budget (CAD 5,510.50, 3-month licence horizon, no Azure AI Search line) differs from the Constitution's CAD 5,000 note: which governs?
- What does "auto-analyse" (self-analysis quality, 1 per request) mean in the KPI?

## Added 2026-10-27 from workshop segmentation debrief
Source: [[workshop-segmentation-debrief-v0-1]]; project: [[workshop-segmentation]].
- Open: meeting date and who validates the debrief (Q01); who officially owns the project and approves each deliverable (Q02).
- Open: which files, versions and tabs are the reference; the exact list of allowed inputs and which ID card fields feed the calculation (Q03, Q04).
- Open: definitions of actual, funded and vacant staff; how to compute spare ratio, bus count, usable bays, fleet averages (Q05, Q06).
- Open: how to encode severe conditions and fleet diversity with existing fields; is the score 0 to 3, thresholds and edge-case rules (Q07, Q08).
- Open: accepted margin of human review and how to document it (Q09).
- Open: which tools, spaces and recipients are allowed for this confidential material; the debrief was drafted with ChatGPT (Q10, [[workshop-segmentation-ground-rules]]).
- Open: PowerPoint confirmed? print format and units; web app prototype vs PowerPoint ([[workshop-id-card]]) (Q11).
- Open: which Canadian workshops, data date, validators; maturity revision depth and bronze/silver/gold criteria; no-certificate and one-year rules; mandatory HSE requirements (Q12 to Q15).
- Open: is year-end ranking still the target, with what resources; who talks to France and when; was a Thursday afternoon follow-up really agreed (only in a garbled transcript) (Q16 to Q18).

- Hybrid search score: 36/41 (2026-09-24, [[golden-set]]) vs 35/41 (2026-10-06, diy-vs-azure-stack.md). Different runs or a typo? See [[hybrid-search]].
