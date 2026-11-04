# Azure region and compatibility check for the Basic search ticket (2026-09-24, ~16:10)

Why: Greg asked for 100% certainty that the ticket buys exactly what BOULON needs, fits the current setup, and causes no incompatibility later. v2 of the ticket said Canada East, which Microsoft lists without AI enrichment. This file records every resource in use, where it is, how the new service connects to it, and the rule that governs each link.

## 1. What exists today

| Resource | Type | Region | How we know | Status |
|---|---|---|---|---|
| `boulon-pilot-search` | Azure AI Search, Free | **East US** (USA) | DNS: `boulon-pilot-search.search.windows.net` → `azsndwt.eastus.cloudapp.azure.com` | **Confirmed in portal 16:30** (BOULON-PILOT-RG, Azure subscription 1) |
| `boulonpilotstorage` | Storage account (PDFs in container `manuals`) | **Canada East** | DNS: → `blob.yq1prdstr10a.store.core.windows.net` ("yq1" = Quebec City stamp) | Inferred; Greg confirms in portal |
| `boulon-pilot-ai` | AI resource (Azure OpenAI models: text-embedding-3-small, gpt-5-mini) | **Canada East** | DNS: `.openai.azure.com` and `.cognitiveservices.azure.com` both → `…canadaeast.cloudapp.azure.com` | **Confirmed in portal 16:30** (Location: canadaeast) |
| `boulon-pilot-ai` API kind | `AIServices` (Foundry) or `OpenAI` | — | Not visible from DNS | **Confirmed: AIServices** (portal, 16:30) |
| Copilot Studio environment | Agent BOULON | **Europe** | Direct Line only answers on `europe.directline.botframework.com` (2026-09-23) | Confirmed by behaviour |

Surprise: the pilot search service is in the USA, not Canada. The new service fixes that.

## 2. The rules that decide the region (Microsoft Learn, read 2026-09-24)

1. **Canada East has no "AI enrichment"** (built-in skills such as Document Layout). Canada Central has it, plus semantic ranker, and no "high demand" flag. Source: [Supported regions](https://learn.microsoft.com/en-us/azure/search/search-region-support), ms.date 2026-08-24.
2. **Key billing:** "Your Foundry resource must be in the same region as your search service." **Keyless billing (managed identity):** "billing is keyless and doesn't have region requirements." Requirements for keyless: a managed identity on the search service, and the **Cognitive Services User** role on the Foundry resource. The resource must be API kind `AIServices` (older `CognitiveServices` still works). Source: [Attach resource to skillset for billing](https://learn.microsoft.com/en-us/azure/search/cognitive-search-attach-cognitive-services), ms.date 2026-04-24.
3. **Document Layout skill:** with a key, "Create an Azure AI Search service and Microsoft Foundry resource in the same region." With Entra ID (keyless) billing: "No same-region requirement." Source: [Document Layout skill](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout), ms.date 2026-08-08.
4. **Embedding and chat skills** call the model endpoint directly. Same region is recommended for speed, not required. Source: [Azure OpenAI Embedding skill](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-azure-openai-embedding), ms.date 2026-07-28.
5. **Free can't be upgraded.** A new service is needed: new address and keys. Source: [Service tiers](https://learn.microsoft.com/en-us/azure/search/search-sku-tier), ms.date 2026-08-04.

## 3. Options compared

| Option | Works? | Why it wins or loses |
|---|---|---|
| Canada East search | No | No AI enrichment there, so the PDF reading in v2 can't run with a key. Keyless might bypass it, but Microsoft doesn't say so clearly. Not 100%. |
| East US search (next to the pilot) | Works technically | Data leaves Canada. Rejected. |
| **Canada Central search + keyless billing to the existing `boulon-pilot-ai` (Canada East)** | **Yes, documented** | Stays in Canada. No new AI resource. Uses the models already deployed. The only cross-region link (billing) is explicitly allowed for keyless. Microsoft recommends keyless for new setups. **Chosen**, if `boulon-pilot-ai` is API kind `AIServices`. |
| Canada Central search + a new AI resource in Canada Central (key) | Yes | One more resource to create and manage, for no benefit. Fallback only if `boulon-pilot-ai` is kind `OpenAI` (an OpenAI-only resource can't pay for Document Layout). |

## 4. Every link in the chosen setup

| Link | Rule | Result |
|---|---|---|
| New search (Canada Central) → storage `boulonpilotstorage` (Canada East), reads PDFs and writes images | No region rule for public access. Claude already reads the file list from this PC, so public access is on. | OK |
| New search → `boulon-pilot-ai` for PDF-reading billing | Keyless: no region rule. Needs the managed identity plus the Cognitive Services User role (in the ticket). | OK once the role is assigned |
| New search → embedding and chat models in `boulon-pilot-ai` | Direct call by address. No region rule. | OK (same as the pilot today) |
| Copilot Studio (Europe) → new search (Canada Central) | The knowledge source is an HTTPS address plus query key. No region rule. | OK. Re-point it after v2 passes (Greg, about 5 minutes) |
| Semantic ranker (used by the 41/41 golden run) | Available in Canada Central | OK |
| Later move to S1 | In place, same region, if capacity allows | OK |

## 5. Result of Greg's portal checks (16:30)

- boulon-pilot-search: East US. boulon-pilot-ai: canadaeast, **API Kind AIServices**. Both in resource group BOULON-PILOT-RG, Azure subscription 1.
- Greg's role: **Owner** at subscription level (plus Foundry User). He could assign the Cognitive Services User role himself if IT prefers; the ticket still goes through IT because Pierre approves spending there.
- Storage location stays DNS-inferred (Canada East). It changes nothing: no rule links the search region to the storage region.
- **Verdict: every fact the ticket depends on is confirmed. Ticket v4 cleared.**

## (Before the checks) What was open

The only remaining check is 3 read-only portal checks by Greg (about 5 minutes):
- the Location of the three resources (to confirm the DNS evidence);
- the **API kind** of `boulon-pilot-ai`;
- Greg's own role on the resource group, which tells whether he can assign the role himself or IT does it.

Not a blocker, but worth noting: the Copilot Studio environment is in Europe. It doesn't affect compatibility.

## 6. v5 correction (16:55): Document Intelligence is not sold in Canada East

While pricing the one-time indexing cost (Greg's question), the Azure Retail Prices API (queried 2026-09-24) returned **0 Document Intelligence meters in Canada East**. Canada Central lists S0 Layout / Pre-built pages at CAD 13.8605 per 1,000. The full AI price list for Canada East shows only Azure OpenAI models, Speech, Translator, Content Safety, Video Indexer and Agents: no Document Intelligence, Vision or Language. That explains why Canada East has no AI enrichment.

Consequence: keyless billing "has no region requirements" on paper, but billing Document Layout pages to a resource in a region where Document Intelligence doesn't exist is not documented as working. That isn't 100%. **Decision (v5): add one AIServices S0 resource in Canada Central**, the same region as the search service and a region with Document Intelligence. It satisfies both the key rule (same region, region supports both) and the keyless rule. Pay-per-use, no fixed fee. boulon-pilot-ai stays for the models (embedding and chat skills have no region rule).

Updated option table: "Canada Central search + keyless to boulon-pilot-ai" is downgraded to "not guaranteed". "Canada Central search + new AIServices in Canada Central" is **chosen**.
