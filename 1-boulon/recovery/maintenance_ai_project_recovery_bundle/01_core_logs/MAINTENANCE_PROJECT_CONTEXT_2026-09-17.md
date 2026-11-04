# Maintenance AI — continuity log and audit
**Prepared:** 2026-09-17 (Thursday)  
**Coverage:** Work in this conversation through 2026-09-16; reconstructs earlier maintenance work where needed.  
**Status:** Handoff record, not evidence of production readiness.  

## 1. Operating mandate and preferences
- User delegated project-management direction to assistant: set next executable action, keep momentum, avoid circular checks, state what is verified versus assumed, and produce concise progress summaries for overseer Eric.
- Implement maintenance agent/agent team **strictly in Microsoft Copilot Studio**; use Microsoft-native tools/integrations as needed. SharePoint contains the controlled source manuals. Do not redesign the system around generic standalone AI agent frameworks.
- Maintenance answers must come from approved manuals/protocols; distinguish exact evidence, equipment/model applicability, inference, and unknown. No unsupported parts, torque, procedures, safety advice, times, or manufacturer claims. Operational deployment requires safety and document-version controls.
- Separate workstream: a genuinely animated SaaS/tech-style motion graphic presenting the full project sprint roadmap and gates; **rendered video, not PPTX with notes about animations**.

## 2. Existing agent and configuration (user-reported, not remotely inspected)
- Existing MVP: Copilot Studio agent **BOULON, Greg**, model GPT-4.1 at audit; description: vehicle diagnostics/maintenance/repairs with internal manuals, handbooks, CMMS data. Two dashboard warnings noted but not investigated.
- One SharePoint knowledge source: `Manuels d'entretien QC` (later screenshots show source label `Manuels` within raw Custom Search results). Manuals organized by vehicle/manufacturer/system; very large corpus with 700+ page Grande West manual and others.
- No tools, triggers, child agents, or topics at initial inspection. Existing instructions refer to CMMS access although **no CMMS tool was present**. Do not claim real CMMS querying exists.
- Changes made during testing: **Use information from the Web = OFF; Allow ungrounded responses = OFF**. Official source switch left OFF. Knowledge-source URL narrowed from higher-level `Greg Boulon` to `Manuels de service/Manuels` per discussion; user ran tests afterward, but persisted configuration should be reconfirmed only if genuinely necessary.
- Important: turning off ungrounded responses does NOT verify factual support when an irrelevant knowledge citation exists.

## 3. Evidence and test history
- General vehicle specification query cited a Vicinity manual despite user testing Grande West; this shows source not constrained, but the original question did not explicitly name Grande West, so avoid claiming the agent violated an explicit source requirement in that exact question.
- `1000-1259` without document name: with web ON agent returned outside brake-pad sellers. With web OFF it cited New Flyer `1359parts.pdf` and attributed an incorrect `Hose, Drain` description; user inspected and said number/description did not match. With ungrounded OFF or narrowed source it still produced New Flyer `1259parts.pdf` and unverified manufacturer association. Filenames containing `1259` are not proof of exact number.
- Explicit `GRANDE WEST-2019-partsmanual` query for `1000-4270`: agent cited correct PDF but said part absent; user explicitly confirmed it DOES appear. **This is a factual failure, not a pass.**
- Airtronic D2/D4 on Grande West: retrieved an internal Espar component manual and offered vehicle-specific guidance without showing installation applicability; also gave unsupported 30–45 minute estimate. It was **not** a valid clean knowledge-absence test because component documentation exists elsewhere.
- Fictional `GW-9999-ABC` torque question: agent did not invent torque; it nevertheless claimed exhaustive search without evidence; score only as observed refusal of torque value.
- Grande West ground truth user screenshot: `1000-4520`, description **BOLT M22 X 1.5 - 130 MM, HEXAGON HEAD, CLASS 10.9, PHOSPHATING**, qty 2, item 1, printed p. 162/713, PDF `GRANDE WEST-2019-partsmanual.pdf`, engine mount right/curb side section. Manufacturer of bolt NOT independently established. SharePoint search for number returned relevant manual among 4 files, but does not prove what snippet was indexed.
- Copilot topic created: phrase trigger (`part number lookup`, `part nb lookup` also triggered in tests); Question asks number, stores text `Topic.PartNumber`; Custom Search input originally `Topic.PartNumber`, output `Topic.SearchResults` table with required string columns `Content`, `ContentLocation`, `KnowledgeName`, `KnowledgeType`, `Title`; Set variable value `Topic.ExactMatches = Filter(Topic.SearchResults, Topic.PartNumber in Content)` accepted; compact debug Message prints requested identifier and counts using `CountRows(...)`.
- For `1000-1259`, previous raw results include unrelated New Flyer numerical indexes / filenames and no exact retrieved excerpt. For `1000-4520`, query part number alone returned **15 results, 0 exact matches**; contextual filename + number returned **19 results, 0 exact matches**. Earlier raw run once returned [] for both, indicating variable retrieval behavior. No demonstrated successful exact-match lookup.
- A contextual search-input change once coincided with browser freeze; freezing cause **not determined**. Reverted to a saved configuration and later re-ran a filename + number experiment without success. Do not assume freeze root cause.
- Debug output containing full SearchResults can be huge; use counts and small bounded excerpts rather than printing entire tables.
- Last confirmed Copilot state after tests: topic Trigger → Question → Custom Search → Set variable value → Message; no successful end-user exact-match flow. Search input may currently still be the last *temporary filename + PartNumber* formula; **verify once before further tests**. Do not assume it was reverted after last experiment.
- Agent continued to generate a post-topic response in some tests even after diagnostic Message; safe final response routing has NOT been implemented or verified.

## 4. Pilot pivot
- User supplied `Valeo ETL Thermo Plus.pdf`, 19 pages; chosen to reduce debugging surface versus 713-page Grande West document. It is a parts list covering Thermo plus 230/300/350 and Rail variants, rev. 11/2019, ID DOK40121.
- Existing source-backed candidate tests: `20819B` = grid, item 1, p. 5; `11118536D` = fuel pump 20–35 kW / kit, p. 10 (recheck exact row in PDF before making final expected-answer assertion); invented negative `VALEO-TEST-99999` should yield **not verified in retrieved evidence**, not a corpus-wide absence claim.
- Whether **this exact Valeo PDF** is inside the Copilot-connected SharePoint scope was asked but never answered. This is first blocker for the Valeo pilot.

## 5. Initial project sprint and stage-gate plan (planning, not completion claims)
- Sprint 0: existing MVP inventory, requirements, knowledge configuration, baseline tests. Gate: known configuration + documented test evidence.
- Sprint 1: grounding controls, retrieval failure diagnosis, explicit source/applicability handling. Gate: no uncontrolled web, evidence-based answer/abstention behavior; **gate NOT passed merely by switching settings**.
- Sprint 2: small document pilot (Valeo), known-answer and negative tests, verify searchable content and source scope. Gate: repeatable exact retrieval on pilot entries.
- Sprint 3: controlled part-number lookup; deterministic exact identifier check plus correctly adjacent description, document, page and model applicability. Gate: positive, negative, collision and regression tests pass; no unsupported associations.
- Sprint 4: wider evaluation, safety/governance, versioning and manager demo, rollout decision. No production release until measured acceptance and overseer approval.
- Potential later: diagnostics, procedures, safety escalation, structured asset/CMMS lookup, subagents only if justified. The native SharePoint Custom Search may be inadequate for exact lookup; **structured Microsoft-native index (e.g. SharePoint list/Dataverse with source/page metadata) is an architectural option, not yet built or tested**.

## 6. Motion presentation workstream — audit of 2026-09-16
- User wanted a full animated presentation of the entire sprint plan, gates and PM reporting, with SaaS/tech motion-design-system visuals.
- Delivered three PPTX files in conversation (`maintenance_ai_pm_overview.pptx`, `maintenance_ai_sprint_motion_plan.pptx`, `maintenance_ai_animated_motion_deck_v2.pptx`); user observed these were **static**. Previous assistant inaccurately presented these as animated; do not call them successful animated deliverables.
- Research pointed to **Remotion + React/TypeScript**, with Codex to implement and render an actual 1920×1080 MP4; Motion Canvas considered alternative. A 10–15 s motion proof with actual temporal animation should precede a full 60–90 s film. Motion design language: dark navy, cyan, mint verification, amber gates, animated diagram connections and restrained transitions.
- Created `MAINTENANCE_AI_REMOTION_HANDOFF.md`, existing downloadable Markdown in this conversation. It proposes `codeverbojan/remotion-cinematic` and other candidate templates. **Template availability/license/current compatibility were not verified here; do not blindly execute `npx degit` or claim dependencies installed.**
- NO verified Remotion installation, render, MP4, preview, Codex execution, or successful real animation in this conversation. This is outstanding.
- Real deliverables required: verified motion template/license, storyboard with scene timings, source project, short rendered and inspected motion proof, finished MP4, optional editable PPTX secondary. The user authorized PM direction; avoid merely dumping generic handoff when actual tools can build.

## 7. PM communication and work preferences
- Overseer **Eric**: concise, humble, factual update (completed / key finding / current focus / next milestone); no unnecessary jargon or inflated claims. Presentation intro completed in earlier work but user wanted possible tweaks; no confirmation an email/update was actually sent to Eric.
- Report at meaningful milestones or roughly every 1–2 weeks, not every experiment. Track test question, source ground truth, output/citation, verdict and next owner/action.
- Assistant should give **specific immediate next step in each build response**, avoid redundant screenshots/confirmations, avoid repeated speculative fixes and avoid claiming success before tests.

## 8. Recommended first actions in a NEW conversation
1. **Motion track** (if priority): read this log and `MAINTENANCE_AI_REMOTION_HANDOFF.md`, verify candidate Remotion template/license and build environment, create actual working Remotion source and 10–15 s MP4 proof; inspect rendered frames and movement, then finish full sprint plan film. Never label static slides animated.
2. **Maintenance track** (if priority): ask once whether exact Valeo file exists in connected SharePoint path; verify latest Custom Search input; run two known Valeo parts and a negative with a compact diagnostic, or build a structured index if native search still cannot retrieve exact excerpts. Do not issue physical repair instructions from unverified excerpts.
3. Keep workstreams separate in reporting and deliverable status. Eric update is a draft only until actually sent.

## 9. Context-clearing note
This Markdown is the portable project log. Download/save it before deleting this chat and attach it in a new conversation. ChatGPT Memory may synthesize some context but is not a reliable verbatim project log. No claim is made that persistent Memory was directly edited or this log was uploaded into a remote repository or SharePoint.
