# Copilot Studio integration options: cheaper or better retrieval (research, 2026-10-07)

Tags: **Verified** = page read (URL, date given), **Inferred** = my reasoning, **Unknown** = not found. All Microsoft Learn pages read 2026-10-07 (page dates in brackets).

## 1. The main finding

The CAD 1,830-3,650 problem is the **page-reading step during indexing** (Azure Document Intelligence "Layout" model, run inside Azure AI Search). Per docs\specs-and-costs.html, that is a one-time cost per page. It is not Copilot Studio, and it is not the search service. So the best route keeps Copilot Studio exactly as it is (Azure AI Search as the knowledge source) and replaces only the reader. (Inferred, from specs-and-costs.html plus the Learn pages below.)

Terms used (one sentence each):
- **Index**: the searchable copy of the manuals that Azure AI Search holds.
- **Push**: your own program uploads finished chunks into the index (Verified: Azure AI Search accepts up to 1,000 documents per upload batch and 16 MB per request, https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity [2026-09-16]).
- **Embedding**: a list of numbers that stands for the meaning of a text chunk, used for "find similar" search.
- **Vectorizer**: the index setting that turns the mechanic's question into an embedding at query time; it must use the same model as indexing (Verified, https://learn.microsoft.com/en-us/azure/search/vector-search-how-to-configure-vectorizer [2026-08-05]).
- **MCP server**: a small web service that lets an AI agent call tools in a standard way.
- **Copilot Credit**: Copilot Studio's billing unit.

## 2. What Copilot Studio accepts today (Verified)

Knowledge types (https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio [2026-07-21]): public website (25 in generative mode), uploaded documents, SharePoint (25 URLs), Dataverse, enterprise connectors. Custom data and Bing Custom Search are not supported at agent level; they work only inside a topic's "generative answers" node. Azure AI Search is added through "Featured" in Add knowledge. **Only one vector index can be added** (https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search [2026-09-28]).

Facts that matter for BOULON:
- **Citations** from Azure AI Search come from `metadata_storage_path`, or else any field holding a full URL (same page). Nothing says the index must have been built by Azure's wizard. A self-pushed index with the same fields is **Inferred** to work; it must be tested.
- Whether a `#page=N` suffix on the link survives in the citation is **Unknown**. Test it.
- Copilot Studio supports indexes using integrated vectorization and semantic ranker (Verified, same page).
- With "Allow ungrounded responses" off, an answer without an in-text citation is withheld (Verified, knowledge-copilot-studio page). Citations are not reliably returned from tool results (see section 4).
- **Conflict with current practice:** that page says to create the connection with Entra ID authentication, and warns that a faulty key-based connection can break the connection dialog for the whole environment, with no delete button. Our rule is "query key only". The dialog lists Access Key, Client Certificate, Service principal, Entra ID Integrated. Any new search service means a new connection, so this applies to every option that adds one. Greg should decide before any rebuild.
- Limits (https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas [2026-10-06]): 500 knowledge objects per agent, 512 MB per uploaded file, connector payload 5 MB, generative AI messages 50-100 requests per minute depending on tenant, model streaming timeout 5 minutes.

## 3. Native alternatives: SharePoint and uploaded files

"Upload files > SharePoint" copies files into Dataverse, indexes them there, and gives **page-level citations for PDFs** that open at the right page (Verified, https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-unstructured-data [2026-06-11]). It has no per-page reading bill from us. But, from the pages read:
- Each source holds up to 1,000 files and 50 folders; an agent uses **five sources at a time** (Verified, knowledge-unstructured-data [2026-08-26]). We have 2,785 PDFs. Whether 5 sources x 1,000 files covers them, and whether a folder-source can be many, is **Unknown**.
- Users must sign in, and need at least a Basic User licence for Power Apps or Dynamics 365 plus Dataverse read rights (Verified). That conflicts with the sign-in-off setup and may mean licensing every mechanic. Cost: **Unknown**.
- Copies consume Dataverse storage (Verified); price **Unknown**.
- Files from the SharePoint-connector option over 7 MB may fail without a Microsoft 365 Copilot licence (Verified, requirements-quotas). Our manuals are large.
- Quality on tables and diagrams: **Unknown**. Dataverse reads "text within images for certain document types like PDF" (Verified), but no accuracy figure exists.

Verdict: worth a 1-day test on 20 manuals, but the licensing, sign-in and 5-source cap make it unlikely to carry 131,756 pages.

## 4. Tools, flows, MCP, Foundry

- **Custom data / HTTP request / Power Automate**: your own endpoint returns a table of Content, ContentLocation (the citation URL) and Title. **Only the first three records are used** and it works only inside a topic's generative answers node, which takes priority over agent-level sources (Verified, https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data [2026-01-30]). Good for a small fallback, poor as the main path. HTTP node default timeout 30 s (Verified, authoring-http-node [2026-05-04]).
- **MCP**: Copilot Studio connects to an MCP server over Streamable transport only (SSE dropped Aug 2025), with none, API key or OAuth 2.0 auth, and needs generative orchestration (Verified, https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent [2026-05-28]). Wizard: Tools > Add a tool > New tool > Model Context Protocol. It goes through Power Platform connectors, so data policies apply. Statement "citations returned from a knowledge source can't be used as inputs to other tools" is Verified; the reverse, **whether a tool or MCP result shows clickable source links, is Unknown** and is the deciding risk.
- **Azure AI Search knowledge base / "agentic retrieval"**: an LLM splits a hard question into subqueries, searches in parallel, re-ranks, and returns passages with references. It reads the same index, so it does **not** cut ingestion cost. Each knowledge base exposes an MCP endpoint (tool `knowledge_base_retrieve`), preview (Verified, https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-retrieve and agentic-retrieval-overview [2026-09-16]). GA REST version 2026-04-01 covers minimal, non-LLM retrieval; LLM planning is preview (Verified). Billing is per token for ranking plus Azure OpenAI tokens for planning; Microsoft's own example: about USD 4.32 for 2,000 retrievals (Verified, an illustration, not a quote). Free monthly token allowance on the free plan (Verified).
- **Foundry IQ**: Microsoft's managed knowledge layer on top of Azure AI Search. Connects to Copilot Studio **through a Foundry agent**, which is **preview**, needs the "Activity protocol" endpoint enabled by code only (REST or Python), and works only with agents from the new Foundry portal (Verified, https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent [2026-08-26] and https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-foundry-iq [2026-07-31]). A direct "Foundry IQ as knowledge source" announcement appeared only in a search snippet; page did not load: **Unknown**.
- **Bring your own model**: Copilot Studio credit rates exclude bring-your-own-model and Foundry models, which are billed separately (Verified, requirements-messages-management [2026-08-03]). Does not touch retrieval cost.

## 5. The architecture that attacks the cost: own parser, push to the same index

1. A program on a Transdev PC (or a rented cloud GPU for a few days) reads PDFs with a free or cheap parser (for example open-source PDF layout tools), cuts chunks, keeps the page number, and builds a citation URL per chunk (the PDF link plus `#page=N`).
2. It computes embeddings and **pushes** chunks into an Azure AI Search index with the **same field names** as multimodal-rag-1790098589411 (title, url field, page label).
3. Copilot Studio stays untouched: same connection, same agent, same citation behaviour.

Embedding choice, decided by the vectorizer rule above:
- **A. Keep Azure OpenAI embeddings** (same model both sides). The vectorizer is already supported. Cost is the embedding tokens only (rate: **Unknown** here; specs-and-costs.html lists it as not yet priced for queries). Nothing runs 24/7. Lowest risk.
- **B. Self-hosted embeddings.** The query side then needs a "Custom Web API" vectorizer: an always-on HTTPS endpoint reachable from Azure (Verified as an option on the vectorizer page). Whether Copilot Studio's connection works with that vectorizer kind is **Unknown**. Needs a GPU or CPU server kept up, hardening, patching, and an IT exposure review. Not recommended for a non-technical owner.

Page numbers and tables in this route depend on the parser. This is where own work replaces Layout's "tables kept as tables"; table accuracy is the thing to test against the golden set (Inferred).

A custom Azure AI Search skill (Azure Function called per document during indexing) is an alternative that keeps Azure's indexer. Limits: default 30 s timeout, maximum 230 s, https only, up to 1,000 records per call (Verified, https://learn.microsoft.com/en-us/azure/search/cognitive-search-custom-skill-web-api [2026-07-30]). The function must be reachable from the search service, so it is more IT work than a push done from inside the network. Azure Functions Flex Consumption in Canada Central: first 100,000 GB-seconds a month free, then CAD 0.0001 per GB-second; executions priced at 0.0000 (Verified, Azure Retail Prices API, 2026-10-07). Compute is therefore negligible; the cost is the engineering.

Push limits to respect: 1,000 documents or 16 MB per batch (Verified). Indexer-style 16 MB/128 MB file limits do not apply to push, which helps with our large PDFs.

## 6. Cost lines (verified 2026-10-07)

- Copilot Credit pack: **CAD 271.40 per 25,000 credits per month** (Verified, https://www.microsoft.com/en-ca/microsoft-365-copilot/pricing/copilot-studio). Pay-as-you-go USD 0.01 per credit (snippet of the Microsoft page; CAD rate not read: partially Verified).
- Rates: generative answer 2 credits, agent action 5, tenant graph grounding 10 (Verified, requirements-messages-management). So one generative answer is about 2 credits (about CAD 0.02 at pack price, Inferred); a tool or MCP call adds 5. Retrieval via a tool roughly triples per-question cost versus a knowledge source (Inferred).
- Azure AI Search: Basic tier CAD 112.42 base, S1 higher, per specs-and-costs.html. Serverless Developer tier is preview, billing began 2026-09-13, 1 GB per index cap, 300 MB vector cap (Verified): too small for this corpus.
- Foundry/agentic retrieval: pay per token, rates not read: **Unknown**.

## 7. What a non-technical owner can maintain

Option A (push, Azure embeddings) needs one script run by the builder when manuals change; Greg's clicks are limited to the knowledge-source connection and testing. MCP, Foundry agents and custom skills need always-on services, code-only settings (Activity endpoint), and preview features that Microsoft may change. Those need a named technical owner at Transdev, not Greg.

## 8. Option table

| # | Option | What it does cheaper or better | Extra cost | Effort | Risk | 3-sentence IT defense | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | **Own parser, push into same-schema index, Azure embeddings** | Replaces the Layout reading bill (the CAD 1,830-3,650 line); keeps Copilot Studio unchanged | Embedding tokens (rate Unknown); no always-on service; optional rented GPU days | Medium: parser build, golden-set table test, one script | Table/page accuracy; `#page=` link behaviour Unknown | Nothing new is exposed to the internet; the program runs inside Transdev and only uploads text to our existing Azure resource. It removes the largest cost line without changing what mechanics see. Fallback is the existing index. | **Recommend (test first)** |
| 2 | Same, self-hosted embeddings + Custom Web API vectorizer | Cheapest per vector at scale | Server/GPU, patching; Copilot Studio support Unknown | High | Always-on endpoint; unknown compatibility | Needs an internet-reachable endpoint, which IT will question. Savings are small versus option 1. Not defensible until Option 1 proves insufficient. | Not now |
| 3 | Custom skill (Azure Function) inside indexer | Keeps Azure indexer; own parsing | Functions about free; engineering | High | Endpoint must be reachable by Azure; 230 s cap | Compute cost is near zero per the retail API. It needs one protected endpoint with Entra auth, which is standard Azure practice. More moving parts than a push. | Backup to 1 |
| 4 | Upload files > SharePoint (native) | No reading bill; native page citations | Dataverse storage (Unknown); licences Unknown | Low to try | 5-source cap, sign-in, licensing, table quality | Uses Microsoft's own pipeline and permissions, so no new software. Limits fit poorly with 2,785 PDFs. Small 20-manual test is cheap. | Test only |
| 5 | Azure AI Search knowledge base (agentic retrieval) via MCP | Better answers on multi-part questions | Tokens (Unknown) + 5 credits per tool call | Medium | Preview; citations from tool Unknown | Reads the same index, adds no new data store. Improves quality only. Preview status blocks production use. | Later |
| 6 | Foundry IQ via Foundry agent | Managed knowledge layer, quality | Foundry tokens (Unknown) | High (code-only setting) | Preview, Activity endpoint | Microsoft-managed service inside Azure. Preview and code-only setup make it a poor fit now. | Later |
| 7 | Custom data / HTTP / Power Automate | Own retrieval at topic level | Flow credits (13 per 100 actions) | Medium | Only 3 records used | Standard Power Platform feature. Too narrow for main retrieval; fine as small fallback. | No |
| 8 | Custom MCP server (own search service) | Full control of retrieval | Hosting + 5 credits per call | High | Citations Unknown; always-on | Requires hosting an authenticated endpoint. Highest maintenance for a non-technical owner. | No |
| 9 | Bring your own model | Model choice only | Billed separately | Low | Does not touch retrieval | Does not reduce the ingestion cost that is the problem. | No |

## 9. Ranked top 3

1. **Option 1: own parser, push into a same-schema index with Azure embeddings.** Only option that removes the reading bill without touching Copilot Studio. First test: one PDF pushed to a test index, then confirm the citation link opens at the right page.
2. **Option 4 pilot: Upload files > SharePoint on 20 manuals.** One-day check of native page citations and answer quality on tables; decide on licensing from the result.
3. **Option 3: custom skill in the indexer** as the backup if pushing from inside the network is refused.

Open for Greg before any rebuild: key versus Entra connection choice (section 2), because a broken connection breaks the dialog for the whole environment.
