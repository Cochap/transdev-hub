# Azure AI Search tiers: verified limits and prices (2026-09-24)

Sources: Microsoft Learn pages (updated 2026-09-17 unless noted) and the live Azure Retail Prices API (queried 2026-09-24). Monthly price = hourly rate × 730 hours. **SU** (search unit) = one partition (a block of storage) × one replica (a copy of the index that answers queries). Each extra SU costs the same as the first.

## 1. Tiers: price and limits

| Tier | CAD/mo Canada East | CAD/mo Canada Central (CC meter) | USD/mo East / Central | Storage per partition | Vector quota per partition | Max indexes / indexers | Max partitions / replicas |
|---|---|---|---|---|---|---|---|
| Free | $0 | $0 | $0 | 50 MB total | UNVERIFIED | 3 / 3 | none (shared) |
| Basic | **$102.20** | $112.42 | $73.73 / $81.10 | 15 GB | 5 GB | 15 / 15 | 3 / 3 (max 9 SU)¹ |
| S1 | $339.96 | $373.98 | $245.28 / $269.81 | 160 GB | 35 GB | 50 / 50 | 12 / 12 (max 36 SU) |
| S2 | $1,359.92 | $1,495.84 | $981.12 / $1,079.23 | 512 GB | 150 GB | 200 / 200 | 12 / 12 |
| S3 | $2,719.76 | $2,991.76 | $1,962.24 / $2,158.46 | 1 TB | 300 GB | 200 / 200 | 12 / 12 |

¹ Only for Basic services created after April 3, 2024. Older Basic services get 1 partition. Storage and vector figures above are for services created after May 17, 2024 in Canada Central or Canada East.

Canada Central lists both an old meter and a "CC" meter that is about 10% higher and took effect 2025-09-01. Which meter a new service is billed on is **UNVERIFIED**. Canada East has only one meter.

**Semantic ranker** (a paid feature that re-orders search results by meaning): the Free plan gives 1,000 requests a month on every tier. The Standard plan needs Basic or higher and costs USD $1.00 (CAD $1.3861) per 1,000 requests after the free allowance. Concurrency limit: 2 requests per SU on Basic, 3 on S1.

## 2. Can a service change tier in place?

| Change | In place? | Conditions |
|---|---|---|
| Basic ↔ S1 / S2 / S3 | **Yes** | In the portal: Settings → Scale → Change Pricing Tier. The current setup must fit the target tier's limits (indexes, storage, vector quota), and the region must have no capacity constraint on the target tier. It takes up to several hours and the service stays online. The change can't be cancelled. Learn states no creation-date condition for tier changes. |
| Free → Basic (or any tier) | **No** | "You can't switch to or from Free, S3HD, L1, or L2." You must create a new service and re-index, or use Microsoft's backup/restore samples. |
| Serverless ↔ anything | **No** | Doesn't support migration to or from other tiers. |
| "Upgrade" button | Different feature | A one-time move of a service created before April 3, 2024 to bigger partitions on the same tier. It doesn't apply to a new service. |

**Verdict:** the D4 memo is right about Basic → S1. The planner's doubt holds only for Free → Basic.

## 3. Scaling Basic

| Item | Value |
|---|---|
| Extra partition or replica | Same price as one SU: CAD $102.20/mo (Canada East) each |
| Basic 3 partitions | 45 GB storage, 15 GB vector quota, CAD ~$306.60/mo |
| 5–20 GB of text plus vectors | Storage fits with 1–2 partitions. The **vector quota (5 GB per partition) usually runs out first**, so check `vectorIndexSize` as well as `storageSize`. |
| Uptime guarantee (SLA) | Needs 2 replicas for queries, 3 replicas for queries plus indexing |

## 4. Vector size rule of thumb (1M chunks, in memory)

Formula: raw size = documents × dimensions × bytes per value. Add the HNSW overhead (the extra memory the search graph uses): about 1% at 1536 dims and 0.5% at 3072 dims. Deleted or updated chunks add more until Azure cleans them up.

| Type | 1536 dims | 3072 dims |
|---|---|---|
| float32 (`Edm.Single`, 4 B) | ~6.2 GB | ~12.35 GB |
| float16 (`Edm.Half`) / `Edm.Int16` (2 B) | ~3.1 GB | ~6.2 GB |
| Scalar quantization int8 / `Edm.SByte` (1 B, 4× smaller) | ~1.5 GB + overhead | ~3.1 GB + overhead |
| Binary quantization (1 bit, "up to 28×") | ~0.19 GB + link overhead (m × 8–10 B per chunk) | ~0.38 GB + overhead |

Disk use is about 3× the in-memory size. Keeping the original full-precision vectors for rescoring (`preserveOriginals`) adds to disk use. On Basic, 1M chunks at 1536 float32 (6.2 GB) is more than one partition's 5 GB. BOULON's estimate of about 150K chunks is ~0.93 GB, which fits.

## 5. Model and skill costs (retail API, Canada East unless noted)

| Item | USD | CAD |
|---|---|---|
| text-embedding-3-small, per 1M tokens | $0.02 Global / $0.025 Regional | ~$0.028 / ~$0.035 (derived²) |
| text-embedding-3-large, per 1M tokens | $0.13 Global / $0.158 Regional | ~$0.18 / ~$0.22 (derived²) |
| gpt-5-mini Global, per 1M tokens | input $0.25, cached $0.025, output $2.00 (Batch: half price) | $0.3465 / — / $2.7721 |
| Document Intelligence Layout (Canada Central) | $10 per 1,000 pages | $13.8605 per 1,000 pages |
| Document Intelligence free tier (F0) | 500 pages/month | — |
| Search image extraction (tiered) | $1.00 / $0.80 / $0.65 per 1,000 | $1.3861 / $1.1088 / $0.9009 |
| Serverless (Canada Central) | $0.2629 per CU-hour, $0.24 per GB-month | $0.3643, $0.3327 |

² The API rounds CAD to 4 decimals per 1,000 tokens, so these CAD figures use the API's own USD→CAD ratio (1.3861).

Unverified in this row set:
- **UNVERIFIED:** a Canada East regional gpt-5-mini deployment. Only Global meters appear.
- **UNVERIFIED:** Document Intelligence in Canada East. The API returned no meters for it.

## 6. Limits for structured records (SQL, CSV, JSON work orders)

| Limit | Value |
|---|---|
| Indexer run time | 2 hours per run is what to plan for; 24 hours only in the private environment (S2 and up). On Free it is 1 minute for non-blob sources. Use a 5-minute schedule so a run continues where the last one stopped. |
| Push payload size | 16 MB per request, max 1,000 documents per batch |
| CSV (`delimitedText`) | 10 MB buffer per row; the character-extraction cap doesn't apply |
| Blob, JSON or CSV files | Basic: 16 MB per file and 512,000 characters; S1: 128 MB and 4M characters |
| Complex fields | 3,000 elements per document across all complex collections |
| Fields per index | 1,000 |
| Azure SQL indexer | One table or view only. Primary key must be a single column. Integrated change tracking needs a table with a non-clustered key. Default query timeout 5 min. Re-index at most every 5 min. On-premises SQL is not supported directly (use Data Factory). Always Encrypted columns are not supported. |
| Private endpoints | Not supported on Basic for indexers that use a skillset (S1 and up only) |

## Contradictions with project docs

1. **D4 memo, "Basic holds 15 GB":** that is per partition. A new Basic service can scale to 45 GB. The memo also leaves out the **5 GB-per-partition vector quota**, which is the more likely ceiling.
2. **D4 memo, "Basic and S1 switch in either direction":** true, but going back down only works if the service still fits Basic's limits (15 indexes, storage, vector quota).
3. **D4 memo, Serverless "price not checked":** billing started 2026-09-13 and prices are now listed (see section 5). Serverless also has a **300 MB vector cap per index**, on top of the 1 GB index cap.
4. **azure-limits-pricing §3, "Tier changes are in place":** true only between Basic and S1–S3. The correction header on that file already covers Free.
5. **Free character cap:** Learn says 256,000 characters. The observed cut-off was 262,144 (256 × 1,024). This is a small wording mismatch, not a config override.
6. **Doc Intelligence meter:** the CAD $13.8605 figure matches the "Batch Layout" meter. Standard Layout is billed as "S0 Pre-built Pages" at the same price. No cost change.
7. **Canada Central CC meter:** confirmed (+10%, from 2025-09-01), but both meters are still listed. Which one applies is UNVERIFIED.
8. **Pricing page:** the fetched summary suggested S1 scales to "9 units". Learn says 36 SU. I relied on Learn; the pricing-page wording is UNVERIFIED.

## Sources
- https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity
- https://learn.microsoft.com/en-us/azure/search/search-sku-tier
- https://learn.microsoft.com/en-us/azure/search/search-capacity-planning
- https://learn.microsoft.com/en-us/azure/search/search-how-to-upgrade
- https://learn.microsoft.com/en-us/azure/search/vector-search-index-size
- https://learn.microsoft.com/en-us/azure/search/vector-search-how-to-quantization
- https://learn.microsoft.com/en-us/azure/search/semantic-how-to-enable-disable
- https://learn.microsoft.com/en-us/azure/search/search-how-to-index-sql-database
- https://azure.microsoft.com/en-us/pricing/details/search/
- https://azure.microsoft.com/en-us/pricing/details/ai-document-intelligence/
- https://prices.azure.com/api/retail/prices (services: Azure Cognitive Search, Foundry Models, Azure Document Intelligence; USD and CAD)
