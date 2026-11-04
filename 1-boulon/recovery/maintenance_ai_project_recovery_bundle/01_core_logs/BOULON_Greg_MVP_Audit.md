# BOULON, Greg — Copilot Studio MVP audit and same-day recovery plan

Audit date: 2026-09-16  
Scope: read-only inspection of the existing Copilot Studio agent, with emphasis on reliable retrieval from vehicle/fleet maintenance manuals and exact part-number lookup.

## Executive finding

The agent is not failing because it needs a better prompt. It currently mixes two retrieval jobs that need different mechanisms:

1. **Manual questions and procedures** need page-level semantic/hybrid retrieval with citations.
2. **Part numbers** need deterministic exact lookup against a structured field.

The present broad SharePoint URL source is a weak fit for both. The current `Part Number Lookup` topic makes the problem worse: it searches knowledge, filters the returned snippets, and then only displays match counts. It never returns the matching part, manual, or page.

For an end-of-day MVP, do not re-index the entire manual estate. Build a small, validated pilot that proves both paths with two or three manuals and a compact structured parts index.

## Current configuration observed

| Area | Current state | Consequence |
|---|---|---|
| Agent | `BOULON, Greg`, Draft, not published | No production channel is live |
| Model | GPT-4.1 | Usable for MVP; not the primary retrieval problem |
| Orchestration | Generative orchestration on | Appropriate for manual Q&A |
| Knowledge | One broad SharePoint source named `Manuels`; status Ready | Large mixed corpus, weak scope control |
| Knowledge filters | None | No make/model/year/document/revision restriction |
| Official source | Appears off | Not the root cause, but validated manuals should eventually be marked authoritative |
| Tenant graph semantic grounding | On | Helps semantic retrieval, not deterministic identifier matching |
| Ungrounded responses | Off | Good reliability control |
| Web search | Off | Good for private maintenance knowledge |
| Tools | None | No structured part lookup and no CMMS connection |
| Connected agents | None | No issue for MVP |
| Authentication | Microsoft Entra ID | Correct for private SharePoint content |
| Multi-tenant | Off | Correct |
| Direct Line secured access | Appears off | Do not expose a custom/public web channel until secured |
| Primary language | French (Canada) | Copilot Studio reports conversational boosting unavailable and content moderation unsupported for this primary language |
| Evaluation | Batch Evaluation unavailable under the current license | Use a manual regression sheet today |
| Channels | Microsoft 365 / Teams available; other channels license-gated | Publish the MVP only to an authenticated Microsoft channel |
| Instructions | Promise manuals, handbooks, and CMMS data | CMMS is not connected, so this overstates capability |

## Defect in the existing Part Number Lookup topic

Current flow:

1. Ask for `PartNumber`.
2. Run Custom search over knowledge into `SearchResults`.
3. Set `ExactMatches` to `Filter(Topic.SearchResults, Topic.PartNumber in Content)`.
4. Display only the requested value and counts.

Problems:

- Semantic retrieval must first choose a chunk containing the identifier; exact filtering after retrieval cannot recover a chunk that was never retrieved.
- The topic does not return `Content`, `Title`, `ContentLocation`, page, description, or applicability.
- It has no normalization rule for spaces, dashes, or case.
- It has no make/model/year/revision disambiguation.
- It has no verified/not-verified safety state.

## Fastest reliable MVP today

### 1. Freeze the pilot scope — 10 minutes

Use only two or three known manuals. Recommended ground-truth set:

- Valeo Thermo Plus manual: `20819B` should return `Grid`, page 5.
- Valeo Thermo Plus manual: `11118536D` should return `Fuel pump kit`, page 10.
- Grande West 2019 parts manual: `1000-4520` should return `Bolt M22 x 1.5 - 130mm, Class 10.9`, page 162.

Put copies in a dedicated SharePoint pilot folder. Do not point the MVP at the full `Manuels` hierarchy.

### 2. Create page-cited manual knowledge — approximately 30–60 minutes plus indexing

In **Add knowledge**, use **Upload files > SharePoint** and select only the pilot folder/files. This path copies the selected content into Dataverse, chunks/vector-indexes it, and supports page-level citations for PDFs. Keep the existing broad SharePoint URL source out of the pilot answer path while testing.

For scanned PDFs, OCR them before ingestion. A status of `Ready` is not proof that a protected, oversized, poorly scanned, or permission-inaccessible document is retrievable.

### 3. Build a deterministic PartsIndex — 30–60 minutes for a seeded MVP

Create a SharePoint List or Dataverse table named `PartsIndex` with these minimum fields:

| Field | Purpose |
|---|---|
| `PartNumberRaw` | Verbatim identifier from the manual |
| `PartNumberNormalized` | Uppercase alphanumeric value with spaces and punctuation removed |
| `Description` | Verbatim part description |
| `Manufacturer` | Equipment manufacturer |
| `Model` | Equipment model/family |
| `YearFrom`, `YearTo` | Applicability range |
| `ManualTitle` | Source manual |
| `ManualRevision` | Version/effective date |
| `PageNumber` | Exact printed/PDF page used |
| `SourceUrl` | Permission-controlled link to the manual |
| `Verified` | Boolean controlled by a human reviewer |

Seed the table with the three known examples and enough additional rows to demonstrate a real workflow. This is the MVP index; bulk extraction of every manual is a follow-on ingestion job.

### 4. Replace the topic's semantic part lookup with equality lookup — 30–45 minutes

Use a Copilot Studio tool/agent flow to normalize the user input and query `PartsIndex` by exact equality. Return:

- exact part number;
- verbatim description;
- manufacturer/model/year applicability;
- manual title, revision, and page;
- clickable source link;
- verification state.

Behavior rules:

- Zero rows: say **“Part number not verified in the indexed pilot manuals”** and escalate; do not guess.
- One row: return the structured record and citation.
- Multiple rows: ask for manufacturer/model/year before choosing.
- Never autocorrect or silently substitute a similar part number.

Keep the current Custom search topic only as a temporary diagnostic. If it must remain today, at minimum add a branch that displays the exact matching `Content`, `Title`, and `ContentLocation`; counts alone are not a usable answer.

### 5. Tighten the agent contract — 10 minutes

Remove claims that it can query CMMS until a CMMS tool exists. Add these rules to the instructions:

- For parts, require an exact structured match and repeat the identifier verbatim.
- For procedures, cite manual title, revision, and PDF page.
- Confirm make, model, year, and configuration when applicability could differ.
- If the source does not explicitly support the answer, say it is not verified and escalate to a senior technician or manufacturer support.
- Never infer torque values, capacities, wiring pinouts, safety limits, or part substitutions.

### 6. Run a small release gate — 20 minutes

Because batch Evaluation is unavailable, manually test and record at least:

- the three positive part-number cases above;
- one unknown part number;
- one ambiguous number with two applicable models;
- one procedural question with a page citation;
- one question whose answer is absent, which must abstain;
- one user without source permission, which must not receive restricted content.

Pass criteria: exact identifier and description, correct equipment applicability, accessible citation, and no answer when evidence is missing.

### 7. Publish narrowly

Publish only to an authenticated Microsoft 365 or Teams channel for the pilot. Do not expose a custom web/Direct Line channel while secured access is off. Confirm the required Copilot Studio/Microsoft 365 licensing before promising wider deployment.

## What not to spend time on today

- Do not reorganize the entire 7.79 GB SharePoint library.
- Do not expect prompt wording or the `Official source` toggle to repair missed identifiers.
- Do not build a full custom Azure AI Search ingestion pipeline before the pilot passes.
- Do not ingest every manual before establishing document identity, revision, equipment applicability, and test cases.

## Production path after the MVP

Move the full corpus to Azure AI Search when Azure access, ownership, and operations are ready. Use:

- page/section-aware chunks rather than arbitrary fixed chunks;
- OCR/layout extraction for scanned pages, tables, and diagrams;
- hybrid keyword + vector retrieval with semantic reranking;
- a dedicated normalized exact-match field for part numbers;
- filterable manufacturer, model, year, document type, revision, effective date, language, and ACL fields;
- source URL and page fields for citations;
- Entra ID integration and query-time permission enforcement;
- scheduled incremental indexing and a regression suite.

Copilot Studio supports Azure AI Search as a formal knowledge connection. It should be added through **Data sources > Azure AI Search** using a supported connection, preferably Entra ID—not improvised endpoint configuration.

## Microsoft references

- Copilot Studio quotas and SharePoint limits: https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas
- Unstructured data knowledge sources: https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-unstructured-data
- Copilot Studio RAG guidance: https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/retrieval-augmented-generation
- Azure AI Search as a Copilot Studio knowledge source: https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search
- Custom knowledge sources and result schema: https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/custom-knowledge-sources

## Recommended next action

Authorize a controlled implementation pass in this order: add the dedicated pilot knowledge source, create/attach the deterministic part lookup, update the topic and instructions, run the six release tests, then publish to Teams/Microsoft 365. Do not change the full corpus or publish externally during that pass.
