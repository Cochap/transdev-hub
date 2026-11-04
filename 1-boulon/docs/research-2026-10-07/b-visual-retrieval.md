# B. Visual retrieval: searching page pictures instead of (or next to) text

Research date: 2026-10-07. Money is in USD unless marked CAD. Conversion: 1 USD = 1.4226 CAD (Bank of Canada daily average, 2026-10-06, Verified at bankofcanada.ca/valet). All page counts use 131,756 pages.

Evidence tags: **Verified** = read the full paper text or the official page (URL given). **Verified (summary)** = page opened, but only through a summarising tool, so numbers are not re-checked in raw text. **Abstract only**, **Inferred** (my reasoning), **Unknown**.

Terms, once: *Embedding* = a list of numbers that stands for the meaning of a page; similar pages get similar lists. *Single vector* = one list per page. *Multi-vector (late interaction, ColBERT style)* = hundreds of small lists per page, matched piece by piece to the question (the matching step is called MaxSim). *nDCG@10* = a 0-100 score of how high the right page ranks in the top 10. *VLM* = vision-language model, an AI that reads images. *Vectorizer* = the Azure AI Search setting that turns the user's question into a vector at query time.

## 1. The short answer

1. **Page-image search is not blocked by GPUs.** ColPali needs 0.39 seconds per page on one NVIDIA L4 card (Verified, arXiv 2407.01449, Table 5). That is about 14 GPU-hours for 131,756 pages (my arithmetic), roughly USD 6 on a rented L4 at 0.44/hour (runpod.io/gpu-cloud/pricing, page dated 2026-09-27, Verified summary). The earlier dismissal for "needs GPUs" was wrong on cost. The real blockers are below.
2. **Real blocker 1, storage and matching.** ColPali stores 257.5 KB per page (Verified), about 34 GB for our library. Azure AI Search Basic gives 5 GB of vector memory per partition and up to 3 partitions (Verified, Learn limits page, updated 2026-09-25), so at most 15 GB. Our search index also has no multi-vector matching (MaxSim): the vector-query page describes only one vector per field, and fusion of several fields by RRF (rank blending) (Verified, Learn, 2026-09). So multi-vector models (ColPali, ColQwen, ColSmol, Nemotron ColEmbed) cannot sit inside the current index.
3. **Real blocker 2, answering.** Azure AI Search cannot store images (Verified, same page). Copilot Studio's GPT-4.1 answers from the text fields it receives. A picture vector only improves WHICH page is found. Each page still needs its text, or a picture description, to answer from. A wiring-diagram page can be found and cited, but the agent cannot read the diagram itself (Inferred). So visual retrieval can replace the gpt-5-mini picture-description pass for finding pages, not the text pass.
4. **The cheapest fit is a single-vector page-image model through Azure itself: Cohere Embed v4.** It is on Foundry, accepts images, and Azure AI Search has a Foundry-catalog vectorizer and an AML skill that list `Cohere-embed-v4` (Verified, Learn pages "vector-search-vectorizer-azure-machine-learning-ai-studio-catalog" and "cognitive-search-aml-skill"; both marked preview). Output is 1,536 numbers (256, 512, 1,024 also possible) per page, about 6 KB, under 1 GB for all pages (Inferred arithmetic).
5. **The deciding unknown:** whether Copilot Studio's Azure AI Search knowledge source still works when the index uses that preview vectorizer. Copilot Studio documents support for integrated vectorization and a single index (Verified, Learn knowledge-azure-ai-search, 2026-09-28) but says nothing about this vectorizer. **Unknown.** It is the first test.

## 2. Does picture search beat text search for manuals?

- **ViDoRe V3** (Verified, full text, arXiv 2601.08620): 10 datasets, about 26,000 pages, 3,099 questions in 6 languages, English and French corpora. "For a given parameter count, visual retrievers outperform textual retrievers, and late interaction methods score higher than dense methods." Questions about tables or images are harder, and mixed text-plus-image pages score lowest. Cross-language questions (for example French question, English page) score 2 to 3 points lower than same-language ones. Text rerankers beat visual rerankers.
- **DSE** (Verified, full text, arXiv 2406.11251): a screenshot embedded as one vector beats OCR text search by over 15 nDCG@10 points on slides, but tested on English only.
- **VisRAG** (Verified, full text, arXiv 2410.10594): one 2,304-number vector per page, 4.5 KB. On one A100 it encodes a page in 121 ms against 312 ms for OCR plus encoding (Table 12), so skipping OCR is faster. Tested on English.
- **MMDocIR** (Verified, summary): visual retrievers beat text ones; text built by a VLM beats plain OCR text.
- **M3DocRAG** (Verified for the IVF index, summary for the rest): ColPali plus an approximate index (Faiss IVF), run on one H100 80 GB; training data English-heavy and the authors warn about non-English.
- **VisDoMRAG** (Verified, summary): runs a text and a visual pipeline in parallel with 3 LLM calls per question. It reports 12 to 20% gains but triples answer cost, and it does not fit Copilot Studio (Inferred).
- **What none of these tested:** French bilingual truck-and-bus service manuals with torque tables and wiring diagrams. Benchmark gains do not prove gains here. **Unknown until our one-manual test.**

## 3. Model by model (what matters for us)

**ColPali / ColQwen2 / ColSmol.** Multi-vector, 128 numbers per patch (Verified). ColPali uses 1,024 patches (about 1,030 vectors); ColQwen2 up to 768 patches. ViDoRe v1 scores per the repo: ColQwen2 89.3, ColQwen2.5 89.4, ColSmol-500M 82.3, community ColQwen3 4B 90.6 (Verified, github.com/illuin-tech/colpali, summary). Licences: ColPali and ColQwen2 adapters MIT, ColQwen2 backbone Apache 2.0, so commercial use is clear (Verified, model card). **ColQwen2.5 uses the Qwen Research License; its text allows non-commercial use only and says commercial users "shall request a license" (Verified, Qwen2.5-VL-3B LICENSE page). Avoid without a licence.** Training was English-only, French works zero-shot (Verified for ColPali: TabFQuAD French tables 83.9 nDCG@5). Query encoding about 30 ms on L4. The package `colpali-engine` is flagged as deprecated in favour of Sentence Transformers 6+ (Verified, repo).

**Nemotron ColEmbed V2** (NVIDIA, 3B/4B/8B). Top of ViDoRe V3 in February 2026 (8B: 63.42 nDCG@10). Storage per million pages in fp16: 13.2 TB (3B), 3.7 TB (4B), 5.9 TB (8B), so about 0.5 to 1.7 TB for our library. A 512-number version keeps 96% of accuracy. French 0.8171 on MIRACL-Vision. CC BY 4.0 (Verified, summary of arXiv 2602.03992 HTML). Far too large for Azure AI Search; needs its own vector database (Qdrant, Vespa, Weaviate support multi-vector per the ColPali repo).

**Cohere Embed v4.** One vector per page or text, up to 128k tokens, Azure listing says languages en, fr, es, it, de and others, text 512 tokens and images up to 2 million pixels (Verified, Learn "models sold directly by Azure", updated 2026-09-23). **Conflict:** Oracle's documentation says image input is English only (Verified, docs.oracle.com). Our test must include French queries. Price: image tokens USD 0.47 per million, text 0.12 per million, Global Standard, starting 2026-02-01 (Verified, Azure Retail Prices API, meter "Embed v4 Img Glbl Tokens"). Data-zone price is higher, 0.517. Whether a Canadian region is available: Unknown. Tokens per page image are **Unknown**; only data point is 512 by 512 pixels is about 1,610 tokens (Oracle docs, not Azure).

**Azure AI Vision multimodal embeddings 4.0.** Image USD 0.10 per 1,000, text 0.014 per 1,000 (Verified summary, azure.microsoft.com pricing). 1,024 numbers, many languages for text queries, but the query text must be 1 to 70 words and image under 20 MB (Verified, Learn). It is a picture-and-caption model (CLIP style, Inferred) and probably cannot read small torque numbers. Very cheap, so worth a one-hour check, but I expect weak results on dense pages (Inferred).

**Voyage multimodal-3.5.** 1,024 numbers (256 to 2,048 possible), 32k context, takes PDFs, slides, tables, interleaved text and images (Verified, docs.voyageai.com). Price pages disagree: USD 0.12 per million tokens, and images priced per pixel at USD 0.60 per billion pixels, capped at USD 0.0012 per image, with a free allowance of 150 billion pixels (Verified summary). API only, so page pictures leave Azure. Greg has said manuals are not private, so this is allowed, but it needs an approval (Inferred).

**Jina embeddings v4.** 3.8B Qwen2.5-VL based, dense 2,048 numbers or multi-vector 128, 30+ languages (Verified, model card). **Qwen Research License, so self-hosting needs a commercial licence.** API price: Unknown (page timed out). Ranked 10th on ViDoRe V3 at 57.52 (search summary, Abstract only).

**Qwen3-VL-Embedding (2B, 8B).** Single vector with Matryoshka sizes, 30+ languages, claims parity with ColPali-style models at lower cost (arXiv 2601.04720, Abstract only). Licence: Unknown.

**NanoVDR** (arXiv 2603.12824, Abstract only): pages indexed once by a 2B model, questions encoded by a 69M text-only model, keeps 95.1% of quality. Useful idea if we ever run our own query server.

## 4. Cost for 131,756 pages (indexing once)

| Route | Basis | USD | CAD | Tag |
|---|---|---|---|---|
| (a) Rented GPU, ColPali on L4 | 0.39 s/page = 14.3 h at 0.44/h | 6 | 9 | Verified speed, Inferred total |
| (a) same, if 5 times slower (bigger model, PDF-to-image time) | 71 h | 31 | 44 | Inferred |
| (a) Azure NC4as T4 v3, Canada Central, Linux on demand | 0.584/h (Azure Retail Prices API); T4 assumed 2 times slower than L4 = 29 h | 17 | 24 | Verified rate, Inferred hours |
| (b) Cohere v4 if pages shrink to 512 by 512 | 1,610 tokens x 131,756 x 0.47/M | 100 | 142 | Inferred |
| (b) Cohere v4 if tokens grow with pixels (2 MP page) | about 12,300 tokens/page | 761 | 1,082 | Inferred; near the CAD 1,200 ceiling |
| (b) Azure Vision 4.0 | 0.10 per 1,000 images | 13 | 19 | Verified price |
| (b) Voyage multimodal-3.5 | 1 to 2 MP pages at 0.60 per billion pixels | 79 to 158 | 112 to 225 | Inferred; may be partly free |
| (c) Local GPU PC | RTX 5090: official launch price USD 1,999, street price about 5,000 (search results, Abstract only) | 2,000 to 5,000 | 2,850 to 7,100 | Not worth buying for a one-off; Dell/Lenovo quote Unknown |

Reading the table: the GPU route is 10 to 100 times cheaper than the Azure list-price reading (CAD 1,830 to 3,650). The Cohere range is wide because I do not know how many tokens one page costs; **measure it on 3 pages (cost: cents)**. PDF-to-image conversion time and a rented-GPU setup afternoon are not in these numbers (Unknown). Azure A100/H100 VM prices could not be retrieved (empty result); these VMs usually need a quota request, which means an IT ticket (Inferred).

## 5. Can Copilot Studio use it?

| Path | Works? | Tag |
|---|---|---|
| Azure AI Search vector field + Cohere v4 vectorizer, used as knowledge source | Probably, if Copilot Studio accepts the preview vectorizer | **Unknown**, test first |
| REST API tool from an OpenAPI file (calls our own endpoint, for example an Azure Function that embeds the question and queries a vector database) | Yes, but marked preview, OpenAPI v2, API key or OAuth | Verified, Learn 2026-09-13 |
| Multi-vector (ColQwen) search | Only through our own server plus the REST tool; not as the knowledge source | Inferred |
| MCP server | Copilot Studio supports MCP tools; I did not read that page | Unknown |

Cost of option "own server": an Azure Function (small) plus a vector database that handles multi-vector (for example Qdrant) on one VM, and a GPU only while indexing. Defence for IT: the GPU is rented for about a day, the server holds only public-style manuals, and the live search still runs on the approved Azure AI Search.

## 6. Cost, effort and IT defence per option

**Option 1: Cohere v4 page vectors in the existing index.** Cost CAD 140 to 1,100 (measure first). Effort: render each page to an image, embed through the AML skill, add one vector field; 1 to 2 days if the skill accepts images (**Unknown**, the Learn skill page shows text-only samples). Defence: "It is a Microsoft-hosted Foundry model billed on our existing Azure subscription, it needs no new software, and the page vector can be switched off without touching the text index." Timing: adding a vector field after the paid reading run probably forces paying for the pages again (Inferred), so decide first.

**Option 2: ColQwen2 (Apache/MIT) on a rented L4 as an offline experiment.** Cost under CAD 50 for the whole library, under CAD 5 for one manual. Effort: half a day in Python on a rented machine, not on the Transdev PC. Defence: "No install on the company PC: a rented machine runs for hours, then is deleted, and we only copy back a score sheet. It tells us the best possible gain before we spend more."

**Option 3: Voyage API.** Cost about CAD 110 to 225. Effort: 1 day, scripted. Defence: "A paid API used once on manuals that are not private, with a spend cap, to compare against the Microsoft option."

## 7. Everything evaluated

| Name | What it is | Cost for 131,756 pages | Index size | Fit with Azure AI Search / Copilot Studio | Verdict |
|---|---|---|---|---|---|
| ColPali | PaliGemma multi-vector page model, MIT | USD 6 to 31 (L4) | 257.5 KB/page, 34 GB | No MaxSim, exceeds 15 GB Basic cap; own server + REST tool | Test offline only |
| ColQwen2 | Qwen2-VL 2B multi-vector, Apache/MIT | similar to ColPali | up to 768 x 128 numbers | same as ColPali | **Best offline test model** |
| ColQwen2.5 | Qwen2.5-VL 3B | similar | similar | same; Qwen Research License bars commercial use | Avoid |
| ColSmol-500M | 500M multi-vector, score 82.3 | lowest GPU cost | about 1,135 x 128 | same | Cheap trial |
| Nemotron ColEmbed V2 | NVIDIA 3B/4B/8B, CC BY 4.0, top ViDoRe V3 | USD 20 to 60 on A100-class (Inferred) | 0.5 to 1.7 TB | needs Qdrant/Vespa | Too heavy now |
| VisRAG-Ret | MiniCPM-V single vector | GPU hours (Inferred small) | 4.5 KB/page, 0.6 GB | single vector fits; custom skill needed | Alternative, English-tested |
| M3DocRAG | ColPali + Faiss + VLM answerer | H100 reported | as ColPali | full custom pipeline | No |
| DSE | Phi-3-vision single vector | GPU hours | one vector | custom skill | Research reference |
| VisDoMRAG | text + visual, 3 LLM calls | triples answer cost | n/a | no | No |
| ViDoRe v1/V3, MMDocIR | benchmarks | free | n/a | use to design our test | Use as method |
| Cohere Embed v4 | Foundry API, single vector | CAD 140 to 1,100 | about 6 KB/page, 0.8 GB | listed in Search vectorizer + AML skill (preview); Copilot Studio untested | **Try first** |
| Azure AI Vision 4.0 | CLIP-style, 1,024 numbers | CAD 19 | 4 KB/page | native Azure; 70-word query cap | Quick check, expect weak |
| Voyage multimodal-3.5 | API single vector | CAD 112 to 225 | 4 KB at 1,024 numbers | custom skill + vectorizer | Try third |
| Jina v4 | Qwen-based, dense or multi-vector | API price Unknown | 8 KB dense | custom; self-host licence barrier | Skip unless priced |
| Qwen3-VL-Embedding | 2B/8B single vector | GPU hours | single vector | custom | Watch; licence Unknown |
| NanoVDR | text-only query student | n/a | one vector | needs own server | Idea only |

## 8. Ranked top 3: what to try first, on one manual

Use one 200 to 400 page manual that has torque tables and at least one wiring diagram, plus 20 of the existing golden-set questions (10 in French, 10 in English, 5 about tables, 5 about diagrams). Score at the search step first (is the right page in the top 5?), then the full answer.

1. **Cohere Embed v4 as a second vector field next to the text.** Steps: (a) embed 3 page images and read the billed tokens, then extrapolate; (b) embed the manual, add the field, query text-only, image-only and both (hybrid with RRF); (c) pass/fail gate: create the index with the Foundry-catalog vectorizer, attach it to a Copilot Studio test agent and ask one question; if the agent errors, the route is dead and costs only cents; (d) compare French queries to catch the English-only conflict. Success: image-plus-text finds the right page in the top 5 on at least 3 more questions than text-only, with no loss on the rest.
2. **ColQwen2 offline ceiling test on a rented L4.** Embed the same pages, run the same questions locally, and report top-5 hits. It costs under CAD 5 and shows whether any visual route is worth building. If it beats Cohere by a lot, plan the own-server route; if not, stop there.
3. **Voyage multimodal-3.5 API** on the same pages, same questions, as a price/quality cross-check, only if option 1's token bill is high or French fails.

Decide before the first paid reading run: the picture field cannot be added cheaply afterwards (Inferred).
