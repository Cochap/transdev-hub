# Azure AI Search limits & pricing for BOULON — research notes (2026-09-23)

> **Claude correction (2026-09-23):** the service is on the **Free** tier, not Basic. That is confirmed from live servicestats: a 50 MB per-index storage limit and 3 indexes/indexers. So the 262,144-character cut-off is Free's ~256K limit, **not** a config override (the indexer JSON has no override). Free can't be upgraded in place ("You can't switch to or from Free"), so moving to Basic means a new service plus a rebuilt index. See `index-facts.md`.

Plain-language terms: a **tier** (or SKU) is the size/power level you pick for the Azure AI Search service (Free, Basic, S1, S2...) — like choosing a car engine size. A **blob** is a file stored in Azure Blob Storage. The **indexer** is the process that reads blobs and pulls text out of them ("document cracking"). A **skillset** is a pipeline of AI steps (skills) that run on that text/images, e.g. Document Intelligence Layout (turns a PDF into structured text/markdown), image verbalization (an AI model writes a caption for each image), and embeddings (turn text into vectors for semantic search). A **search unit (SU)** is the billing block for the Dedicated pricing model (replicas × partitions).

## 1. Indexer limits by tier

Source: [Service Limits for Tiers and SKUs](https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity#source-file-limits-for-blob-like-indexers) (Microsoft Learn, updated 2026-09-16).

| Tier | Max blob (file) size | Max characters extracted per document |
|---|---|---|
| Free | 16 MB | 256,000 |
| **Basic** | **16 MB** | **512,000** |
| S1 | 128 MB | 4,000,000 |
| S2 | 256 MB | 8,000,000 |
| S3 | 256 MB | 16,000,000 |
| L1 / L2 | 256 MB | 4,000,000 |

- **262,144 characters is not Basic's documented cap.** Basic's cap is 512,000. 262,144 = 256 × 1,024, which looks like an explicit `maxDocumentContentCharactersToExtract` value someone set in the indexer's JSON configuration (or a legacy default), not the tier ceiling. **Flag: check the indexer definition** — if that setting is simply removed or raised to 512,000, the two truncated PDFs may stop truncating at zero extra cost, before any tier change.
- **16,777,216 bytes = exactly 16 MB**, which does match Basic's documented blob-size cap, so the two excluded files (103 MB, 23 MB) genuinely exceed Basic. Only S1 and above raise this (128 MB, then 256 MB) — S1 alone is enough to fit both excluded files.
- Which tier gives 262,144 chars: none, officially — see above. Which tiers raise the real cap: S1 (4M, 8× Basic), S2 (8M), S3 (16M).

## 2. Document Intelligence Layout skill — its own limits

Source: [Document Layout skill reference](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout#data-limits) and [Document Intelligence service limits](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/service-limits?view=doc-intel-4.0.0) (both Microsoft Learn).

- Free (F0) Document Intelligence: 4 MB file / 2 pages processed. Paid (S0): **500 MB file / up to 2,000 pages**.
- These limits are separate from, and much larger than, the Azure AI Search indexer limits above. The docs explicitly say: "indexing is subject to the indexer limits of your search service tier" — meaning **the Search tier's blob-size cap is the actual bottleneck for BOULON today, not Document Intelligence.** Raising the Search tier (not Document Intelligence) is what fixes the two excluded files.
- The skill also has its own soft limit: if a single document takes more than 5 minutes to process in Document Intelligence, the skill times out — and you're still billed for the attempt.

## 3. Pricing, region, and tier changes

Source: [Azure Retail Prices API](https://prices.azure.com/api/retail/prices) (live Microsoft billing data, queried 2026-09-23) and [Choose a pricing model and service tier](https://learn.microsoft.com/en-us/azure/search/search-sku-tier#tier-changes) (Microsoft Learn).

| Tier | Canada Central (CAD/hr) | Canada Central (CAD/mo, 730 hrs) | Canada East (CAD/hr) | Canada East (CAD/mo) |
|---|---|---|---|---|
| Basic | $0.1540 | ~$112.42 | $0.1400 | ~$102.20 |
| S1 | $0.5123 | ~$373.98 | $0.4657 | ~$339.96 |
| S2 | $2.0491 | ~$1,495.84 | (not queried) | — |

- Canada Central got a **rate increase effective 2025-09-01** (new "CC" meter). Canada East is still on the older, lower rate. This likely explains why the project's ~$615 CAD/6-month Basic estimate matches Canada East (~$613 CAD for 6 months) almost exactly — **flag: confirm which region the BOULON service actually runs in**, since Canada Central would cost ~10% more.
- **Tier changes are in place**: per Microsoft, "Existing search services can switch between Basic and Standard (S1, S2, and S3) tiers" — no new service or full rebuild is required, provided the current service doesn't exceed the target tier's limits and the region has capacity. However, previously truncated/excluded documents will need their indexer **re-run** (not a full new service) to pick up the fuller content once on a bigger tier.

## 4. Multimodal skillset cost drivers at 100+ manuals

- **Document Intelligence Layout, pay-as-you-go (S0):** $13.8605 CAD per 1,000 pages (Azure Retail Prices API, Canada Central, 2026-09-23) — about **$0.0139 CAD/page**. This applies through the Search skill too; Microsoft's docs confirm the Layout skill itself is billed at this "Foundry Tools Standard price" once past the free allowance ([skill reference](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout)).
- **Free enrichment allowance:** built-in skills (including the Document Layout skill) get **20 free transactions per indexer per day**; beyond that you must attach a billable Foundry/AI Services resource ([Attach Resource to Skillset for Billing](https://learn.microsoft.com/en-us/azure/search/cognitive-search-attach-cognitive-services#free-enrichments)). At 100+ manuals this allowance is trivial — a single indexing run blows past 20 documents immediately, so essentially all pages are billed.
- **Chat-completion image verbalization and text-embedding-3-small** run through Azure AI Foundry/Azure OpenAI, billed per token separately from Azure AI Search and Document Intelligence. **I could not verify current per-token rates for these two models against an official Microsoft source in this pass** — flag for follow-up against the Azure OpenAI/AI Foundry pricing page before finalizing a full cost model.

## 5. Recommendation: split-on-Basic vs. move to S1

Assumption: 100 manuals × 300 pages average = 30,000 pages per full indexing pass. Document Intelligence cost is the same on either tier: 30,000 pages × $13.8605/1,000 ≈ **$416 CAD**, one-time per full pass (re-indexing only changed manuals costs proportionally less). All Search-tier figures below use Canada East rates (closest match to the pilot's $615 CAD/6-month figure); no separate USD→CAD conversion was needed since Azure's own API returned CAD prices directly.

| Option | 6-month Search cost (CAD) | 12-month Search cost (CAD) | Notes |
|---|---|---|---|
| **Stay on Basic, split oversized PDFs** | ~$613 | ~$1,226 | Cheapest. Needs one-time engineering to split the 2 current oversized files, plus recurring effort every time a future manual exceeds 16 MB or ~512,000 characters — likely for several of the 600+-page manuals. Ongoing labor cost, not shown here. |
| **Move to S1** | ~$2,040 | ~$4,080 | ~3.3× the Search cost, but removes the 16 MB and low-character ceilings almost entirely (128 MB, 4,000,000 characters) — no more splitting engineering as the corpus grows to 100+ manuals. In-place tier change, per Microsoft's own guidance above. |

Against the **$5,000 CAD total project budget**, a full 12 months on S1 (~$4,080) plus Document Intelligence (~$416) plus untracked Azure OpenAI image/embedding costs would consume essentially the entire budget by itself. Basic + splitting stays well inside budget but shifts cost into ongoing engineering labor as manuals grow past today's 23.

**Suggested path:** (1) first check the indexer's `maxDocumentContentCharactersToExtract` setting — it may already be safe to raise to Basic's real 512,000-character cap at $0 cost; (2) split just the 2 currently-excluded PDFs and stay on Basic through the rest of the pilot; (3) budget for a move to S1 once the manual count or the frequency of 600+-page/oversized manuals makes repeated splitting too costly in labor — re-evaluate this tradeoff once the AI Foundry (chat completion + embedding) costs are also priced in.

## Flags — not fully verified

- Exact current per-token pricing for chat-completion image verbalization and text-embedding-3-small in AI Foundry (Canada region) — not confirmed against an official source in this pass.
- Which Azure region (Canada Central vs. Canada East) the BOULON search service actually runs in — inferred from cost match, not confirmed directly.
- Whether `maxDocumentContentCharactersToExtract` is explicitly set in BOULON's indexer JSON (likely, given the 262,144 figure) — needs a direct look at the indexer definition to confirm.
