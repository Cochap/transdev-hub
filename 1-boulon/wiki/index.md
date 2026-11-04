---
title: Index
type: overview
status: current
updated: 2026-09-30
sources: []
---

**Start here.** Catalog of every wiki page, one line each. Read this first on every query. Rules for the wiki: [[CLAUDE]]. History of changes: [[log]]. Big picture: [[overview]]. Open problems: [[open-questions]].

## Top level (2)
- [[open-questions]] — When will IT act on azure-ticket-77048? (Greg checks the portal daily.)
- [[overview]] — Greg Riley leads BOULON, an AI assistant that helps Transdev Quebec mechanics find manual procedures, and is now extending it t

## Projects (7)
- [[boulon]] — BOULON is an AI maintenance assistant for transdev-quebec mechanics. A copilot-studio-agent (GPT-4.1) answers only from retriev
- [[geotab-launch-film-project]] — a side workstream (not BOULON) to produce a launch film for Geotab telematics at Transdev Canada. On 2026-09-29 the prompt reac
- [[launch-plan-oct16]] — INTERNAL plan, not shared with Henri. It aims to launch boulon Phase 1 with Henri's sign-off on Fri 2026-10-16, about 7 hours o
- [[learning-research-prd-workstream]] — a daily habit where Claude briefs a research agent with a written "research PRD" and brings Greg exactly 5 verified videos that
- [[phase-1-manuals-pilot]] — the manual Q&A works on a 25-manual pilot (index tests all pass; agent answers are safe), but citations show the index name ins
- [[phase-2-cmms-diagnosis]] — help mechanics find the cause of a breakdown faster by using past work orders, phrased as "we recommend checking first". Direct
- [[project-history]] — BOULON went from an inherited, unguarded SharePoint agent (V0, 2026-09-15) to a grounded Azure AI Search agent (V5 on 2026-09-2

## Entities (people, systems, resources) (18)
- [[alex-dumenne]] — Member of pierre-zivec's team (office at the back, Seb's team). In on Tuesdays and Thursdays. Has access to MIR, Quebec's CMMS (the software
- [[azure-resources-inventory]] — the pilot search service is in East US (the USA), not Canada, which is one reason the new paid service is being requested in Ca
- [[azure-search-index]] — The search library behind boulon. Endpoint `https://boulon-pilot-search.search.windows.net` (service in East US, Free tier: 50 MB, 3 indexes
- [[azure-ticket-77048]] — the request for a paid search service is sent and waiting on IT. No update as of 2026-09-30 09:05.
- [[boulon-hq-control-room]] — BOULON HQ is Greg's one daily page (what to do next, progress, latest test scores). The Control room is an extra panel that onl
- [[company-it-constraints]] — greg-riley works on a locked Transdev PC: no admin rights, software installs need an IT ticket with justification, his own terminal is block
- [[copilot-studio-agent]] — The live chat agent. Model GPT-4.1 (writes the replies). Only knowledge source: azure-search-index ("BOULON Manuals — AI Search Pilot"); Sha
- [[ecc-plugin]] — ECC is a bundle of hundreds of extra Claude Code helpers ("agents" are specialists Claude can call in; "skills" are repeatable
- [[geotab-launch-film]] — a planned 32-beat promotional video for the launch of Geotab telematics (vehicle tracking and fleet data) at Transdev Canada, b
- [[greg-riley]] — Project lead and builder of boulon at transdev-quebec. Non-technical background; internship began 2026-09-08, got agent access 2026-09-14, s
- [[henri]] — Project overseer for boulon (has always been Henri; an earlier mention of "Eric" was a different project's overseer named in error). Has bui
- [[hexagone-a-tune]] — the maintenance-records system for the West (new name A-Tune); a Canadian instance goes live about 2026-10-05. It is Phase 2's
- [[manuals-library]] — Transdev Quebec's manual library is 3,052 PDF/DOC files totalling 6.95 GB (measured 2026-09-23), far more than the "100+ manual
- [[mir-cmms]] — MIR is Transdev Quebec's CMMS (computerized maintenance management system, the software logging every vehicle's repairs; "GMAO" in French).
- [[pierre-zivec]] — Senior Transdev Canada maintenance leader. Approves spending (he approves the Azure IT ticket, azure-ticket-77048) and set the direction for
- [[rebuild-v2-pipeline]] — v2 is the redesigned search library (four JSON files in `1-boulon/rebuild/v2/`) that will be created once IT provides the paid Basic ser
- [[samir-macarem]] — Project manager for Hexagone / A-Tune, the West (US) CMMS. Do not contact before the go-live (about 2026-10-05). henri makes the introductio
- [[transdev-quebec]] — Greg's employer and the customer of boulon: a bus maintenance operation whose mechanics work from a library of 3,052 manual files (6.95 GB)

## Concepts (21)
- [[abstention]] — BOULON must say "I don't have that information" when the manuals do not support an answer; today this is done by settings plus
- [[azure-cost-figures]] — the running cost asked for is about CAD 112.42/month (Basic, Canada Central) plus a one-time indexing budget of about CAD 650 w
- [[azure-search-tiers]] — a "tier" is the size of search service you pay for. BOULON is on Free today, is asking for Basic, and can switch Basic to S1 in
- [[boulon-testing]] — Two layers. Index tests run from this PC straight against azure-search-index (`1-boulon/tests/run-pilot-tests.ps1`, `1-boulon/tests/run-golden.ps1`). Agent te
- [[chunking]] — chunking means cutting each manual into small searchable pieces; BOULON's pilot used the wizard's defaults, which is why tables
- [[citation-projection]] — today the agent's citations show the index name instead of the manual; the v2 rebuild fixes this by projecting the parent file'
- [[claude-operating-model]] — how work gets done with Claude on BOULON: the strongest model orchestrates and checks, cheaper helper models do the legwork, EC
- [[golden-set]] — A fixed list of questions with known right answers, rerun after every index or agent change (the regression check). Golden v1: 43 questions
- [[lessons-learned]] — 27 logged mistakes boil down to six habits: test with real evidence, measure before sizing, verify every Azure claim against an
- [[phase-2-architecture]] — Phase 2 is a second, expert-only agent reading its own MIR index (plus the manuals index) on the same Basic search service. A d
- [[phase-2-evaluation-plan]] — expert mechanics test the diagnosis helper blind against a held-out set of real cases before anything opens wider; Henri decide
- [[phase-2-risks-and-flip-conditions]] — the named risks are wrong diagnoses and poor data; the decision "stay on Basic" reopens if any flip condition below turns true.
- [[phase-2-sizing-scenarios]] — every realistic Quebec scenario fits Basic; only all-Canada full history, the US data lake, or an index-per-scope design needs
- [[rag]] — Plain words: an "open-book exam". The AI first searches the manuals for the passages that matter, then writes its answer only from those pas
- [[retired-items]] — copilot-studio-agent
- [[review-findings-architecture]] — four CRITICAL, five HIGH, five MEDIUM and five LOW findings; the big three are silent truncation, a verification layer that was
- [[review-findings-rag-pipeline]] — the retrieval design is sound, but a torque table lost its structure, two manuals are missing, two are truncated, and nothing m
- [[semantic-reranker]] — the semantic re-ranker is Microsoft's second pass that re-sorts search results by how well they answer the question; on BOULON'
- [[skills-catalog]] — a "skill" is a saved set of instructions Claude follows for a recurring job, so Greg never has to re-explain it. BOULON has nin
- [[tier-limits]] — the pilot runs on the Free tier (50 MB, 90 percent full); Basic fixes space and text limits but still has a 16 MB per-file limi
- [[torque-tables]] — a confirmed CRITICAL safety finding: the Vicinity Service Manual p.22 torque table was extracted as plain text with no row or c

## Decisions (9)
- [[decision-adr-0001-paid-search-tier-basic]] — Accepted 2026-09-24: leave the Free search plan for Basic (then written as Canada East, CAD 102.20/month), with a CAD 150/month
- [[decision-adr-0002-phase2-cmms-diagnosis]] — Accepted 2026-09-24 (direction set by pierre-zivec): from a driver's symptom, BOULON proposes likely causes and the recommended
- [[decision-adr-0003-tier-rescoped-for-phase2]] — Proposed 2026-09-24 (awaiting Greg's confirmation and the v2 ticket): choose Option A, Basic now with a MIR prototype as a seco
- [[decision-d15-d18-phase2-direction]] — four decisions from the 2026-09-24 meeting with pierre-zivec that define Phase 2: use the maintenance history, keep the safe ma
- [[decision-d22-option-a-all-keys]] — when greg-riley sent the Azure ticket on 2026-09-25 he chose option A, all connections by key (like the pilot), instead of keyl
- [[decision-d4-paid-search-tier]] — Decision (2026-09-23, revised 09-24): move from Free to paid Basic in Canada Central; split big manuals by chapter; Basic→S1 is an in-place
- [[decision-d4a-pick-plan-once]] — pierre-zivec's advice on 2026-09-24: if the search plan has to change again for Phase 2, go straight to one big enough that it
- [[decision-d4b-canada-central]] — on 2026-09-24 the search service region changed from Canada East to Canada Central, and the ticket added a pay-per-use AI servi
- [[decision-register]] — Decision register

## Greg's rules (7)
- [[feedback-direct-asks]] — When BOULON needs data or access from a colleague, prepare one direct request (full access plus the purpose), not a long list of detail ques
- [[feedback-french-requests]] — Every request greg-riley sends inside Transdev (IT tickets such as azure-ticket-77048, follow-ups, messages to alex-dumenne or henri) is wri
- [[feedback-no-invented-compliance]] — On 2026-09-29 greg-riley said the Law 25 interpretation was wrong: he checked with privacy officers and the proper authorities and none of i
- [[feedback-no-tedious-power-automate]] — On 2026-09-29 greg-riley dropped the Power Automate email digest as too tedious. Don't make multi-step hand-built flows his route to a goal.
- [[feedback-waiting-on-it]] — While azure-ticket-77048 is pending, don't push ticket nudges (they won't speed anything up). Instead tell henri what BOULON is waiting on a
- [[greg-working-style]] — greg-riley wants minimal questions, fast schedules and Claude doing the work. He has ADHD: meeting and presentation prep must be a scannable
- [[rules-index]] — plain language, Claude does the work, money goes through approval, nothing is invented, every message ends with clear next acti

## Sources (one summary per raw document) (49)
- [[adr-readme]] — the folder of decision records Henri can audit. Rule: never rewrite an accepted record; add a new one that supersedes it.
- [[assumptions-log]] — seven design assumptions written on 2026-09-22 so every build decision traces back to one; four were marked "revise" or "half h
- [[azure-limits-pricing-2026-09-23]] — first research pass on tier limits and prices; its key correction is that the pilot runs on the Free tier, not Basic. Partly re
- [[azure-region-check-2026-09-24]] — Greg asked for 100% certainty before the ticket; the check moved the new search service to Canada Central and added a Canada Ce
- [[azure-tiers-verified-2026-09-24]] — the authoritative table of tier limits and prices (Microsoft Learn plus the live price API, 2026-09-24). It settled that Basic
- [[claude-md-root]] — the repo-root instruction file every Claude session reads first. It holds the project context, who's who, key facts, standing r
- [[d4-tier-decision-source]] — the 2026-09-23 memo (architect agent as devil's advocate, checked against Microsoft Learn) recommended a Basic service in Canad
- [[ecc-value-report]] — a short 2026-09-23 report ranking which of ECC's many add-on helpers are worth using on BOULON. Most of ECC is for software tea
- [[explainer-for-henri]] — a non-technical explanation of why BOULON moved from a SharePoint connector to RAG, using a made-up trucking company, "Aurora F
- [[geotab-launch-film-prompt]] — the draft v3 (2026-09-29) of a prompt for producing a 32-beat product film for a Geotab telematics launch at Transdev Canada, p
- [[howto-email-digest]] (retired) — a click-by-click guide (2026-09-25) to a Power Automate flow that copies keyword-matched email summaries to OneDrive `BOULON-in
- [[hq-control-room]] — describes the local Control room panel (built 2026-09-25) that sits on top of Greg's BOULON HQ page: live numbers, skill button
- [[implementation-spec]] — the step-by-step Phase 1 build plan (Steps 1.1 to 1.8), written 2026-09-22 and annotated with corrections on 2026-09-23.
- [[index-facts]] — verified live from Azure on 2026-09-23: the index is `multimodal-rag-1790098589411`, holds 2,250 chunks from 23 PDFs, and sits
- [[it-request-2026-09-23-nodejs]] — Greg opened an IT ticket on 2026-09-23 to install Node.js LTS, the only install the development assistant tools (Claude Code pl
- [[it-request-2026-09-24-azure-search-plan]] — the v5 ticket text asks IT for a Basic search service plus a pay-per-use PDF-reading resource, both in Canada Central, and a on
- [[it-request-2026-09-24-mir-access]] (retired) — the original 21-question interview list and IT-ticket draft for MIR access. Marked SUPERSEDED on 2026-09-29 by it-request-2026-
- [[it-request-2026-09-29-mir-questions-alex]] — one short French message to alex-dumenne asking for full read-only access to MIR, or failing that a complete work-order export
- [[lessons-2026-09-23]] — 17 failures from the first Claude Code day, each with a fix and where the fix is now enforced (memory, skill or CLAUDE.md rule)
- [[lessons-2026-09-24]] — ten failures, mostly around the Azure ticket (wrong region, missing one-time cost, unclear wording), each with its enforced fix
- [[manuals-inventory-2026-09-23]] — the real manual library is 3,052 files and 6.95 GB, not "100+ manuals"; 101 files exceed the 16 MB limit. Recommendation (mediu
- [[meeting-2026-09-24-pierre]] — in this call pierre-zivec approved the paid search plan in principle and set the direction for Phase 2 (diagnosis help from mai
- [[orchestration-plan]] (retired) — the first full plan (2026-09-23, `ecc:planner`) from "today" to Henri's sign-off on Wed 2026-11-18. Its dates were replaced by
- [[phase2-plan-cmms]] — a draft, not approved, six-step plan (A to F) for a second, expert-only BOULON helper that suggests "check X first" from past M
- [[phase2-scope-sizing-2026-09-24]] — the review concluded: ask for Basic now, submit the ticket, and re-decide the plan once at go/no-go on measured MIR numbers. Re
- [[plan-to-oct16]] — a compressed day-by-day plan (written 2026-09-23 by `ecc:planner`) to get BOULON launched with Henri's sign-off on Fri 2026-10-
- [[rag-plan-reference]] — the original 2026-09-22 design rationale: Azure AI Search with hybrid search, deliberate table and diagram handling, cited answ
- [[rebuild-v2-readme]] — the README for the draft index v2 (prepared 2026-09-23, updated to 2026-09-25) that will run on the paid Basic service. Nothing
- [[recovery-bundle]] — the only evidence for 2026-09-08 to 09-17, recovered from a ChatGPT session: the inherited agent's settings, the first tests, a
- [[report-copy-final]] — Greg's first-person progress report: in 9 working days (2026-09-15 to 09-23) BOULON went from quoting internet brake-pad seller
- [[research-prd-daily-videos-2026-09-30]] — a written brief (a "research PRD": goal, filters, output shape, budget) handed to a research agent to find exactly 5 videos for
- [[resume-2026-09-24]] (retired) — the end-of-day hand-off written Thu 2026-09-24 about 17:20. It is a snapshot, now partly out of date: it says the Azure ticket
- [[review-architecture]] — the reviewing agent `ecc:architect` judged the foundation sound but the safety story overstated; Phase 1 should not close until
- [[review-rag-pipeline]] — `ecc:rag-pipeline-reviewer` found two CRITICAL issues (a flattened torque table, two manuals excluded by the size limit), and C
- [[skill-boulon-agent-testing]] — the project skill (a saved set of instructions Claude follows) for testing the live agent and the search index from Greg's PC.
- [[skill-boulon-approval-package]] — the project skill for any step needing money or company resources approved: builds a story-driven one-page artifact for Henri t
- [[skill-boulon-end-of-day]] — the project skill that closes the BOULON day when Greg says "end of day" (or about 16:45). Catalogued in skills-catalog; the ro
- [[skill-boulon-greg-steps]] — the project skill that formats anything Greg must do by hand as a full click-by-click tutorial with English and French button l
- [[skill-boulon-hq-update]] — the project skill run at the end of EVERY BOULON exchange to refresh Greg's BOULON HQ page and mirror durable facts into the co
- [[skill-boulon-morning-check]] — the project skill (extracted 2026-09-25) for the first exchange of each BOULON day: Claude prepares the workspace itself instea
- [[skill-boulon-report-pipeline]] — the project skill (pipeline proven 2026-09-23) for producing a progress report, presentation or approval page about BOULON for
- [[skill-ecc-operating-notes]] — the project skill explaining how the ECC plugin behaves on Greg's PC: its checkpoint hook, settings rules, helper-model default
- [[skill-transdev-pc-shell-quirks]] — the project skill (extracted 2026-09-25) listing why ordinary commands fail or hang on Greg's locked Transdev PC, and what to u
- [[source-adr-0001]] — source summary of ADR 0001. The decision content lives on decision-adr-0001-paid-search-tier-basic; the ADR index is adr-readme
- [[source-adr-0002]] — source summary of ADR 0002. The decision content lives on decision-adr-0002-phase2-cmms-diagnosis; the ADR index is adr-readme.
- [[source-adr-0003]] — source summary of ADR 0003. The decision content lives on decision-adr-0003-tier-rescoped-for-phase2; the ADR index is adr-read
- [[test-ledger]] — 111 tests recorded, only 70 valid (41 were setup errors). Since the Azure pilot started, no wrong agent answer has been recorde
- [[timeline]] — the running time log for the RAG build, from 2026-09-22 to 2026-09-29, with planned versus actual dates for every step.
- [[timeline-master]] — the single dated record of BOULON from Greg's first day (2026-09-08) to 2026-09-23, split into seven agent versions (V0 to V6),

## Added 2026-10-07
- [[project-brief-551]] (source): founding project brief, scope, KPIs, budget, people. Source of truth.

## Added 2026-10-27 (workshop segmentation project, not BOULON)
- [[workshop-segmentation]] (project): Greg's new project: ID card, three workshop segments, bronze/silver/gold maturity grid for Transdev Canada bus workshops.
- [[workshop-segmentation-debrief-v0-1]] (source): French kickoff debrief and scope statement v0.1, made with ChatGPT from the meeting transcripts; not an approved charter.
- [[workshop-segment-vs-maturity]] (concept): segment = fair expectations for the means; maturity = how well they are met.
- [[workshop-id-card]] (concept): printable garage-entrance sign; fields, format, tool choice open.
- [[workshop-segmentation-ground-rules]] (decision, proposed): instructions D01 to D12, including keep existing inputs and limit sharing with external AI tools.
