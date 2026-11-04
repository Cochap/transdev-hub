# BOULON: our Azure setup (A) vs a self-hosted "DIY" open-source stack (B), 2026-10-15

For Greg. The tool list is Greg's recollection of the TikTok (@jake.lee992); the 15 frames Claude read do not show it. It is treated here as "the DIY stack to evaluate", not as the video's claim. Nothing was installed. `.env` and keys were not touched.

**Labels.** Verified = read on the page or API named in [S#] (sources at the bottom). Measured = counted in our own files. Estimate = my arithmetic from Verified inputs. Inferred = my reasoning. Unknown = not found. Prices: Azure retail prices API, Canada Central, CAD, queried 2026-10-15, month = 730 hours [S16].

**Words used.** *VM* = a rented virtual computer. *Replica* = one full copy of the search engine; more copies mean more uptime. *SLA* = the uptime promise Microsoft signs. *IaaS / PaaS* = renting a bare machine you run yourself / renting a managed service Microsoft runs. *MCP* = a standard way for an AI agent to call an outside tool. *Reranker* = a second pass that re-sorts the first search results. *RRF* = the method that merges keyword and meaning results. *Embedding* = numbers standing for a text's meaning.
**More terms.** *TLS / AES-256* = the scrambling that protects data while it travels / while it sits on disk. *Entra ID* = Microsoft's company sign-in system. *OAuth, API key* = two ways a program proves who it is (personal sign-in token / a secret password string). *OpenAPI file* = a text description of a web service. *vCPU, GiB* = processor cores, memory size. *Token* = a word-sized unit the AI reads and bills by. *Burstable* = cheap VM that can only run flat out for short periods. *Container image, Docker* = a ready-to-run software package, and the tool that runs it. *Model weights, Hugging Face* = the downloaded files of an AI model, and the website that hosts them. *Integrated vectorization* = Azure turning text into embeddings itself, at indexing and at query time. *Generative orchestration* = the Copilot setting where the AI decides which tool or source answers. *Data policy* = Transdev's admin rules on which connectors agents may use.

## 0. Answer in 6 lines
1. Hosting is about the same (A about CAD 104/month, B about CAD 103-202), but B also pays about CAD 34/month of extra Copilot credits and unpriced staff time, so B likely costs more each month (Estimate).
2. Security is clearly better on A: Microsoft patches and encrypts; on B we own the machine, and Qdrant ships open by default.
3. The deciding point is the link to Copilot Studio. A is a built-in knowledge source with manual-and-page citations. B can only reach it through a tool (MCP or custom connector) or a topic node capped at 3 results, and whether a tool shows clickable citations is Unknown.
4. Reliability: neither is "high availability" as set up. A on 1 copy has no SLA; B on one VM has a machine-level promise only.
5. Quality: A measured semantic ranking 41/41 vs hybrid 35/41 on our golden set. B has no measurement at all.
6. One real risk found on A: the free semantic ranker stops after 1,000 requests a month (section 4). Fix is almost free.

## 1. Efficiency (setup, upkeep, link to Copilot Studio)
| | A: Azure AI Search + Copilot Studio | B: DIY on a VM |
|---|---|---|
| Setup effort | Pilot index on the Free tier holds only 23 of 2,785 manuals (2,250 chunks, writes blocked); the full 131,756-page load and rebuild v2 wait on ticket 77048 (Measured, continuity log 3b). B has the same full load ahead | Build everything: ingestion, vector store, keyword side, reranker, search API, MCP wrapper, login, TLS, backups. Hours: Unknown. Needs a named technical owner (Inferred; also in c-copilot-studio-integration.md section 7) |
| Who maintains | Microsoft runs and patches the service; we configure it [S4] | Us. On IaaS the customer owns OS, apps, network controls and data [S10] |
| Copilot Studio link | Native "Azure AI Search" knowledge source; supports integrated vectorization and the semantic ranker; citations come from the URL field; only one vector index per agent [S9] | Not a native source. Three routes below |

**Can Copilot Studio call a custom search endpoint? Yes, in three ways (Verified):**
- **MCP tool.** Streamable transport only; auth none, API key or OAuth 2.0; goes through Power Platform connectors, so data policies apply [S7]. Needs generative orchestration (c-copilot-studio-integration.md section 4, Verified 2026-10-07).
- **Custom connector** (OpenAPI file) in Power Apps [S7]. Same idea, more clicks.
- **Custom data in a topic's generative-answers node.** Returns Content, ContentLocation (citation URL), Title; only the first 3 records are used; topic-level sources take priority over agent-level ones [S8]. Too narrow as the main path.

**Unknown, and decisive:** whether an answer built from an MCP tool result shows clickable manual-and-page citations. Our rule (Constitution): a test passes only if the citation names the manual. Also Inferred: the MCP address must be reachable over HTTPS from Microsoft's cloud, so IT would review an internet-facing endpoint.
Extra Copilot cost on B (Estimate): a tool call is 5 credits (c-copilot-studio-integration.md section 6, Verified); 630 questions/month x 5 x CAD 0.010856 per credit (pack price CAD 271.40 / 25,000) = about CAD 34/month, assuming one call per question.

## 2. Security
| | A | B |
|---|---|---|
| Data location | Azure region you pick; stored within that geography [S4] | Our VM disk, in a region we pick (Inferred) |
| Encryption | TLS 1.2+ in transit, AES-256 at rest, automatic [S4] | We configure it. Qdrant: login off and no TLS by default; its own page says self-deployed instances are not secure until you turn both on [S12] |
| Login | Admin keys (max 2) and query keys (max 50) [S6]; Entra ID login also possible [S4]. Copilot Studio's page says use Entra ID, not keys, and warns a faulty key connection can break the dialog for the whole environment [S9] | We pick and run it: API key (Qdrant, Verified [S12]), or none/API key/OAuth on the MCP side [S7] |
| Patching | Microsoft [S4] | Us: OS, Docker images, Python libraries, vector store. Cadence: Unknown |
| Who is responsible | Shared: Microsoft platform, we network access, auth and monitoring [S4] | Almost all of it is ours except the physical host [S10] |
| IT approves | Ticket 77048 (Basic tier), already sent | New VM and disk, an internet-facing endpoint, container images from public registries (Inferred), model weights. Hugging Face did not load from this PC (d2-tools report, Verified 2026-10-07) |
Greg says the manuals are not private, so confidentiality matters less. What still matters (Inferred): a wrong torque value served from a tampered or stale index, and an open endpoint anyone can query or overload. Docker detail: Docker Desktop needs a paid plan above 250 employees or USD 10M revenue [S13]; Transdev very likely exceeds that (Inferred), and installing it on this PC would need an IT ticket. Docker Engine on a Linux VM is open source (Inferred; the FAQ page does not state it directly).

## 3. Cost
| Line | A | B | Label |
|---|---|---|---|
| Search service or VM | Basic: CAD 0.1431/h = **CAD 104.46/month** (1 replica) | B2as_v2 (2 vCPU, 8 GiB): 0.1184/h = **86.43** | Verified price [S16, S15]; monthly = Estimate |
| Disk | included | E10 128 GB Standard SSD 14.96 + mount 1.55 = 16.51; or P10 Premium SSD 27.92 + 1.55 = 29.47 | Verified [S16] |
| **Total, small** | **about 104** | **about 103 (Standard SSD) to 116 (Premium SSD)** | Estimate |
| Roomier VM (16 GiB) | n/a | B4as_v2 (Linux, regular meter) 0.2366/h = 172.72 + P10 29.47 = **about 202** | Verified price, Estimate total |
| Extra Copilot credits for the tool route | none (native knowledge source) | about **34/month** (630 questions x 5 credits x CAD 0.010856; assumes one tool call per question) | Estimate from Verified rates |
| Managed PostgreSQL instead of a VM | n/a | B2ms compute 0.2096/h = 153.0; storage 0.1792 per GB-month | Verified [S16] |
| Semantic ranker | Free first 1,000 requests/month [S19]; then CAD 1.4166 per 1,000 [S16] | You host a reranker yourself (no per-query fee) | Verified |
| Embeddings, one-time | Azure OpenAI, "a few dollars" (combined-recommendation, project figure) | Free software, but CPU time for the whole library is Unknown; a rented GPU needs Greg's approval | Estimate / Unknown |
| Reading/OCR | same either way | same either way | per Greg |
| Public IP, backups, bandwidth, monitoring, staff hours | included or small | **Unknown** (not priced) | Unknown |
Notes. (a) Two Basic meters exist for Canada Central: `Basic` 0.1431 and `Basic CC` 0.1574 (from 2025-09-01). "CC" probably means confidential computing, which Learn says costs more [S4] (Inferred), so I used `Basic`. (b) Our specs-and-costs.html says CAD 112.42/month; the price list gives about CAD 104.46. The CAD 8 gap is unexplained and not changed here. (c) The VM sizes B2s, B2ms and B4ms are on Microsoft's end-of-life list [S14]; I priced the current Basv2 sizes [S15]. (d) Whether 8 GiB is enough for an embedding model, a reranker model and the vectors (about 0.6-0.9 GB per our review) together: Unknown, untested; hence the second row. B-series VMs are burstable, so sustained CPU work is throttled to a baseline once credits run out [S15].
Conclusion (Estimate): B does not save money on hosting. Its only saving is the reranker fee (about CAD 1/month at our volume), while the extra tool-call credits (about CAD 34/month) and unpriced staff time push B above A: roughly CAD 137-236/month vs about 105 (small VM + credits, up to roomy VM + credits, vs A).

## 4. Reliability
- **A, today (Basic, 1 replica): no SLA.** The SLA needs a paid tier with 2+ replicas for queries, 3+ for queries plus indexing; Free has none. Even on one replica, unannounced maintenance can cause brief interruptions [S1, S6].
- **A with an SLA (Estimate):** 2 replicas = CAD 208.93/month; 3 = 313.39 (Basic limit is 3 replicas [S6]). Brief 551 rates the impact of non-delivery as Low, and use is about 21 questions a day, so paying for this is a decision for Greg and Pierre; I do not recommend it now.
- **B, one VM:** Microsoft's single-VM promise is 99.9% with Premium SSD and 99.5% with Standard SSD, but I only saw this in a Microsoft blog snippet, not the SLA document: **Partial** [S20]. Either way it covers the machine being reachable, not Qdrant or our Python app staying up. B has a machine-level promise and no application-level promise; A on 1 copy has neither. Honest tie, slightly better for B on paper, worse in practice (nobody watches the app).
- **Risk found on A: semantic ranker free plan.** After the monthly free allowance, ranker requests return a billing error [S3]. Brief 551 volume is about 630 questions/month, but each golden run is 41 queries, and whether Copilot Studio sends several searches per question is Unknown. Fix: switch to the Standard plan on Basic (CAD 1.4166 per 1,000, so about CAD 0.89 for 630) [S3, S16].
- **Hybrid and reranking.** A: runs keyword and vector search in parallel and merges with RRF [S5]; the semantic ranker then re-scores the top 50 using Microsoft's multilingual models adapted from Bing, reading up to 2,048 tokens per result [S2]. **Measured (golden v1, 41 questions, right passage in top 5): semantic 41/41, hybrid 35/41, keyword 30/41** (`tests/results/golden_2026-10-06_1342.md`), on the 23-manual pilot index, so not yet shown at full-library scale. B: pgvector gives vector search on managed PostgreSQL [S11]; Learn's page says nothing on keyword fusion (Verified absence). Qdrant has auth and tuning but I did not read its hybrid docs: Unknown. BGE reranker models are multilingual and the toolkit is MIT-licensed [S18]; per-model licences and French/Spanish quality on our manuals: Unknown. Whether B could reach 41/41: Unknown, never tested.

## 5. Each named tool vs what BOULON already uses
| DIY tool | What it does | BOULON today | Verdict |
|---|---|---|---|
| pgvector + PostgreSQL | Stores and searches embeddings in a database | Azure AI Search vector index (Azure also offers pgvector, so no reason to self-host it [S11]) | Not needed |
| Qdrant | Dedicated vector database | Same index; Qdrant is open by default [S12] | Not needed |
| Chroma | Light vector database for prototypes (Inferred; not researched) | Same index | Not needed |
| Re-ranker / cross-encoder | Re-sorts top results by reading query and passage together | Semantic ranker, measured 41/41 [S2] | Already covered |
| BGE, sentence-transformers | Open embedding and reranking models | Azure OpenAI embeddings (text-embedding-3-small per multimodal review) set in the index vectorizer; query and index must use the same model [P1] | Not needed |
| LangChain, LlamaIndex, LangGraph | Code that chains search and model calls (Inferred) | Copilot Studio orchestration plus the Azure indexer and skillset | Not needed |
| FastAPI | Web API in Python | Only B needs one (to expose the MCP address) | B only |
| Streamlit | Quick web page | Brief 551 says the agent lives in existing Office tools (Teams, Copilot) | Not needed |
| Docker | Packages the pieces to run on a server | Not used; paid plan likely required on desktop [S13] | B only |
| Hybrid search | Keyword plus meaning | Already used, with RRF [S5]; hybrid alone scored 35/41 | Already covered |

## 6. Recommendation (5 lines)
1. Keep A. Do not build B: cost is equal, security and upkeep are worse, and it cannot be a native knowledge source.
2. Once Basic exists, switch the semantic ranker to the Standard plan: near-zero cost (pay-as-you-go, about CAD 1/month) but a billing change, so it needs Greg's OK and Owner/Contributor rights on the new service (his role there is unknown; if he lacks it, IT flips it).
3. One cheap experiment (Greg's click work, Claude writes the steps with `boulon-greg-steps`) settles citations through a tool: in a throwaway test agent, never the live one, add the public no-login Microsoft Learn MCP server (`https://learn.microsoft.com/api/mcp`, Streamable HTTP, no authentication [S17]) as a tool, set "Allow ungrounded responses" the same as the live agent (off), and ask exactly: `How many replicas does Azure AI Search need for an SLA on read-only workloads?`
   - Pass = the answer is shown with a clickable reference (a real citation, not a URL the model typed in its text). Red flag = answer withheld, or no reference. Report back: screenshot of the answer and its references, or "answer withheld". Cost: a few cents of credits; may be blocked by Transdev's data policy (Inferred).
4. Only if the links work, B is worth reopening, and only if a DIY reranker beats semantic 41/41 on the same golden set.
5. Ask IT nothing new for B; ticket 77048 stays the only open request.

## Sources
[S1] https://learn.microsoft.com/en-us/azure/search/search-reliability (updated 2026-08-11) [S2] https://learn.microsoft.com/en-us/azure/search/semantic-search-overview (2026-08-05) [S3] https://learn.microsoft.com/en-us/azure/search/semantic-how-to-enable-disable (2026-06-16) [S4] https://learn.microsoft.com/en-us/azure/search/search-security-built-in (2026-02-24) [S5] https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview (2026-08-31) [S6] https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity (2026-09-16) [S7] https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent (2026-05-28) [S8] https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data (2026-01-30) [S9] https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-azure-ai-search (2026-09-28) [S10] https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility (2026-08-24) [S11] https://learn.microsoft.com/en-us/azure/postgresql/extensions/how-to-use-pgvector (2026-07-10) [S12] https://qdrant.tech/documentation/security/ [S13] https://www.docker.com/pricing/faq/ [S14] https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/bv1-series (end-of-life notice) [S15] https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/basv2-series [S16] https://prices.azure.com/api/retail/prices (CAD, canadacentral, queried 2026-10-15; services Azure Cognitive Search, Virtual Machines, Storage, Azure Database for PostgreSQL) [S17] https://learn.microsoft.com/en-us/training/support/mcp (2026-05-05) [S18] https://github.com/FlagOpen/FlagEmbedding [S19] https://azure.microsoft.com/en-us/pricing/details/search/ (first 1k semantic requests free; its price cells did not render) [S20] https://azure.microsoft.com/en-us/blog/announcing-the-general-availability-of-azure-shared-disks-and-new-azure-disk-storage-enhancements/ (seen in a search snippet only). Project files: [P1] docs/multimodal-rag-review-2026-10-07.md, docs/research-2026-10-07/c-copilot-studio-integration.md, 00-combined-recommendation.md, d2-tools-datasets-and-beyond.md, docs/project-brief-551.md, docs/continuity-log.md sections 1 and 3b.
