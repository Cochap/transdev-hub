# Phase 2 plan: diagnosis help from maintenance history (CMMS / GMAO)

Written 2026-09-24 by the `ecc:planner` agent, after the meeting with Pierre (see `1-boulon/docs/meeting-2026-09-24-pierre.md`). **Draft, not approved.** The items marked "to verify" must be checked before anything is presented to Henri.

**Core idea.** A second helper, separate from the manuals one. The mechanic types a symptom; it answers "we recommend checking X first" and shows how often X was the real cause (in N past cases). At first only a few expert mechanics use it. The manuals agent (Phase 1) doesn't change.

## A. Discovery (no cost, no data yet)
- Greg meets Alex Dumenne with the question list in `1-boulon/docs/it-requests/2026-09-24-mir-access.md`. Nobody contacts Samir Macarem before the Hexagone go-live.
- Exit: Alex's answers in writing.
- Risks: MIR may have no "symptom" field, only free text. The budget team uses the same source: say clearly that this is "not financial".

## B. Data access
- Alex provides an export or sample directly. No IT ticket, no privacy step.
- The data stays in Azure Canada East. (2026-10-05: the rule "the tool never rates individual mechanics" is REMOVED, Greg's decision.)
- Exit: a sample received from Alex.
- **DONE 2026-10-05:** Alex sent the full export (`dump.zip`, now in `1-boulon/data/mir-export/dump/`): TBONS 426,883 work orders, TBONSDET about 4.99 M job lines, TBONSMEC 1.27 M, VEHICUL, and the two code dictionaries. Plainte / PlainteDet are empty per Alex, so they are not expected.

## C. Data quality on the sample: DROPPED (2026-10-05, Greg's decision)
- No cleaning, sorting, name or date-stamp stripping, quality report or fill-rate measurement. The data goes into Azure storage as received; any preparation happens in the Azure pipeline, not by hand here.

## D. Prototype (on the approved Basic service)
- **Separate index** `boulon-workorders-mir`, and a **separate expert agent** ("BOULON Diagnostic – pilote expert") that reads both indexes, shared only with the expert group. This is consistent with D3: a new agent only for a new data source or new permissions.
- Two kinds of records: one per work order (symptom, cause, correction, parts, region, vehicle type, model, system), plus **summaries per symptom** with statistics **calculated beforehand** (a chat AI can't count reliably across 5 search results).
- Filters: region, vehicle type, model. The agent asks which vehicle. **To verify:** whether the Copilot Studio connector supports filters. If not: one index per scope, or a Power Automate flow.
- Citation: "MIR, WO #12345, 2021, Nova LFS, Quebec" + the number of cases. Never a name.
- Rules: "we recommend checking first…"; always the number of cases; for torque and specs, send the mechanic to the manual; below N cases, say there isn't enough history.

## E. Expert-mechanic evaluation: DROPPED (2026-10-05, Greg's decision)
- There will be no expert-mechanic scoring of the agent, ever. Supersedes D16 in `1-boulon/docs/meeting-2026-09-24-pierre.md` and ADR 0002.

## F. Go / no-go
- Decision pack for Henri (undated). Options: expand, add Hexagone (through Samir, after the go-live), open to more mechanics, or stop. The US only after that, with a separate review.

## The plan tier
- Don't change tiers for the prototype: a sample of a few thousand work orders fits on Basic as a second index.
- Decide at go/no-go, based on the measured size. If a change is needed, **jump only once** (Pierre's advice): S1 ≈ $340 CAD/month (memo checked 2026-09-23), ≈ $4,080 a year, most of the $5,000 budget. That needs its own approval package.
- **To verify:** the planner says in-place Basic → S1 upgrade may not be possible on every service, which contradicts `1-boulon/docs/d4-tier-decision.md`. Check on Microsoft Learn before any memo.

## Verified 2026-10-01 (Microsoft Learn, "Service limits for tiers and SKUs", updated 2026-09-25; "Choose a pricing model and service tier", updated 2026-09-17)
- Max documents per index: **24 billion** on Basic, S1, S2 and S3. The binding limit is storage and vector memory, not document count.
- Basic (service created after 2024-04-03, in a high-capacity region such as Canada Central): 15 GB storage and 5 GB vector index per partition, up to 3 partitions. Older Basic services: 2 GB. S1: 160 GB and 35 GB per partition, up to 12 partitions.
- Default results per search: 50 (configurable); one index per request.
- **In-place switch Basic <-> S1 is supported** if the current configuration fits the target tier's limits and the region has capacity (resolves the planner's doubt; consistent with `1-boulon/docs/d4-tier-decision.md`).
- The vector memory estimate for the real work-order set must be done once Alex's export arrives (records x vector dimensions x 4 bytes, plus index overhead).

## Not verified
Filters in the Copilot Studio connector; whether Copilot Studio keeps retrieved passages across turns; the cap on passages per query in Copilot Studio.
