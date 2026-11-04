---
title: Retrieval-selection gap (top-k and the context budget)
type: concept
status: current
updated: 2026-11-04
sources: [../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../4-learning/interests/lexicon-ai-ml.md, ../../docs/research-2026-10-07/d1-awesome-papers.md, ../../docs/rag-radar/knowledge-web.md]
---

**Bottom line:** a wrong answer is not always a search failure; one source found that half of failed answers had the right chunk retrieved and then dropped before the prompt, so test the number of passages passed on (top-k) and the reranker before blaming the index.

## Plain definition (as the sources define it)
- **Selection gap** = "the right chunks were retrieved but dropped before reaching the answer prompt"; **Top-k** = "how many search results get passed on to the answer model" (lexicon `4-learning/interests/lexicon-ai-ml.md`, branch 1.1, from https://www.kapa.ai/blog/retrieval-bottleneck).
- The kapa.ai post (2026-10-26) "Retrieval's bottleneck is moving from finding to selecting": "34% of correct chunks never reached the answer model. Top-5 to top-10 raised recall 14% but cost precision." Brief 2026-11-04 summary: "Half of failed answers had the right chunk found, then dropped before the answer. Points at top-k and reranking, not the index." (`4-learning/interests/briefs/2026-11-04-briefing.html`; the brief's own figures, I have not opened the kapa.ai page.)

## How it shows up in BOULON
- Brief advice: "test the agent's top-k and reranker before blaming the index". What top-k Copilot Studio uses for BOULON is not stated in these sources (unverified); and whether Copilot Studio uses the semantic re-ranker at all is an open check ([[semantic-reranker]], [[review-findings-rag-pipeline]]).
- The retrieval check scores whether the right passage is in the top 5 of the index ([[golden-set]], [[hybrid-search]]); the selection step happens after that, inside the agent, so the two must be tested separately. The community checklist agrees: measure "retrieval apart from generation" (knowledge web `#dev-5-rag-mistakes`).
- A ready test from the 2026-10-07 papers review, idea 5: "Cap retrieved pages: answer the 5 procedure questions with the top 3, 5 and 8 chunks. Pass: the setting with all steps present and fewest wrong-source errors. Cost: free" (`1-boulon/docs/research-2026-10-07/d1-awesome-papers.md`). MMLongBench-Doc supports it: "don't paste whole manuals in".
- Related study: when only the top passage is retrieved, uncertainty-based hallucination detection weakens (arXiv 2610.22615, `#uncertainty-hallucination`); a page-image study found a larger image-token budget (1K to 32K) improved accuracy 15.22 points (`#loc-multimodal-rag`).
- Context budget in practice: [[context-engineering]] (offloading big results, pointers instead of text). Chunk size interacts with top-k: [[chunking]].
- Open WebUI v0.12.0 lets you see and edit the text the model actually searches for each file, "useful to see why a table answers badly" (`#open-webui`).

## Go deeper
- https://www.kapa.ai/blog/retrieval-bottleneck
- https://arxiv.org/abs/2610.22615 (uncertainty and retrieved passages)

## Related
[[hybrid-search]] · [[context-engineering]] · [[agentic-retrieval]] · [[rag-evaluation]] · [[golden-set]] · [[rag-field-map]] · [[greg-interest-map]]
