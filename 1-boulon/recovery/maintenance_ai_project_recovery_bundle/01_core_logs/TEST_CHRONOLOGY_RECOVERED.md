# Maintenance AI / BOULON, Greg — recovered test chronology

## Original state
- Existing Copilot Studio MVP named **BOULON, Greg**.
- Model at audit: GPT-4.1.
- Purpose: vehicle diagnostics, maintenance and repairs using internal manuals/handbooks and purported CMMS data.
- One broad SharePoint knowledge source for maintenance manuals.
- Initially: **no tools, no triggers, no child agents, no topics, no suggested prompts**.
- Instructions claimed CMMS lookup capability even though no CMMS tool was actually connected.
- Initially **Use information from the Web = ON** and **Allow ungrounded responses = ON**.
- Official source was left OFF.
- Broad SharePoint scope and no meaningful source filters.

## Key tests and findings
### 1. Vehicle specification question
The agent answered a vehicle-specification/VIN question using a **Vicinity** manual rather than the Grande West manual being investigated.
Finding: source selection was not reliably constrained.

### 2. Part number 1000-1259 — Web ON
Prompt: `who manufactures part number 1000-1259 and whats the description and whats the filename`
The agent returned public-web brake-pad results (Quality-Built / MPA Electrical; BuyBrakes / FinditParts) and said the part was not in internal manuals.
Finding: uncontrolled web fallback.
Action: **Use information from the Web → OFF**.

### 3. Part number 1000-1259 — Web OFF
Same prompt.
The agent shifted to internal SharePoint but returned the wrong New Flyer source (`1359parts.pdf`) and an incorrect `Hose, Drain` association.
Finding: web was one problem, but internal retrieval itself was also unreliable.

### 4. Explicit Grande West source, part 1000-4270
Prompt explicitly named `GRANDE WEST-2019-partsmanual`.
The agent cited the correct PDF but claimed the part was absent.
User manually confirmed the part **does exist**.
Finding: even correct-source targeting did not guarantee correct retrieval.

### 5. Airtronic D2/D4 on a 2019 Grande West
The agent found an internal Espar Airtronic manual and generated a detailed inspection procedure.
Problems:
- it did not establish that the generic component manual applied to the specific Grande West installation;
- it added an unsupported 30–45 minute estimate.
Finding: applicability boundaries and unsupported synthesis needed control.

### 6. Fictional part `GW-9999-ABC`
The agent did not invent a torque value.
Finding: useful abstention behavior, but it still overstated the completeness of its search.

### 7. Ground truth: Grande West `1000-4520`
Manually verified in the Grande West parts manual:
- Part number: `1000-4520`
- Description: `BOLT M22 X 1.5 - 130 MM, HEXAGON HEAD, CLASS 10.9, PHOSPHATING`
- Qty: 2
- Item: 1
- Printed page: 162/713
This became a known-answer acceptance case.

## Part Number Lookup topic built
Flow:
`Trigger → Question → Custom Search → Set variable value → Message`

Variables:
- `Topic.PartNumber` (string)
- `Topic.SearchResults` (table)
- `Topic.ExactMatches` (table)

Custom Search output fields:
- Content
- ContentLocation
- KnowledgeName
- KnowledgeType
- Title

Exact-match Power Fx:
`Filter(Topic.SearchResults, Topic.PartNumber in Content)`

Observed:
- `1000-1259`: raw search returned unrelated New Flyer numerical-index content and filename matches, but no verified exact match.
- `1000-4520`: 15 search results, 0 exact matches.
- Filename + number contextual query: 19 search results, 0 exact matches.
Finding: filtering after semantic retrieval cannot recover an exact identifier if the correct chunk was never retrieved.

## Pilot pivot
A smaller 19-page **Valeo ETL Thermo Plus** parts manual was selected as the next controlled pilot instead of continuing against a 700+ page manual.

Candidate acceptance cases:
- `20819B` → Grid, page 5
- `11118536D` → Fuel pump 20–35 kW / kit, page 10
- invented negative `VALEO-TEST-99999` → should return not verified, not a corpus-wide absence claim

## Architectural conclusion reached
Two retrieval jobs should be separated:
1. Manual/procedure Q&A: semantic/hybrid page-level retrieval with citations.
2. Exact part-number lookup: deterministic exact lookup in a structured index (SharePoint List / Dataverse or similar Microsoft-native store).

See `BOULON_Greg_MVP_Audit.md` for the recommended recovery plan.
