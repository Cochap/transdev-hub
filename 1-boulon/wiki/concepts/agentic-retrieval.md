---
title: Agentic retrieval (query planning and adaptive routing)
type: concept
status: current
updated: 2026-11-04
sources: [../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../4-learning/interests/lexicon-ai-ml.md, ../../docs/rag-radar/knowledge-web.md, ../../docs/rag-radar/runs/2026-11-02.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md]
---

**Bottom line:** agentic retrieval lets a model plan, split or repeat searches instead of doing one lookup; the sources say it costs more and can quietly reduce honest "I don't know" answers, so the useful ideas are to spend planning only when needed and to track abstention separately.

## Plain definition (as the sources define it)
- **Retrieval reasoning effort** = "how much LLM planning Azure AI Search spends per question (none, low, medium, auto)"; "auto" = "light pass first, LLM query planning only when grounding is weak" (lexicon `4-learning/interests/lexicon-ai-ml.md`; brief 2026-11-04 item citing https://learn.microsoft.com/azure/search/whats-new, an older Aug 2026 page, not in Monday's radar).
- **Adaptive routing (agent gating)** = "a small classifier decides whether a question needs the heavy agent path" (RouteDRAG, https://arxiv.org/abs/2610.36444, brief 2026-11-04): easy questions take a short path, hard ones the agent loop; "better scores, fewer calls".
- **Iterative RAG** = the model asks for up to two more searches (DeclineCraft, https://arxiv.org/abs/2610.28340).

## How it shows up in BOULON
- Today BOULON does a single retrieval step through Copilot Studio's native Azure AI Search knowledge source ([[copilot-studio-agent]], [[azure-search-index]]); generative orchestration (the AI decides which tool or source answers) is a Copilot setting (`1-boulon/docs/research-2026-10-15/diy-vs-azure-stack.md`, "More terms").
- The brief calls Azure's reasoning-effort knobs "the Azure-side cost vs quality switch for the school-bus MVP" (brief 2026-11-04). The MVP scope is in `1-boulon/docs/mvp-school-bus-2026-11-03.md` ([[phase-1-manuals-pilot]]).
- Caution, measured by others (DeclineCraft, 27 LLMs): iterative RAG lowered correct abstention in 30 of 40 setups (mean 46.4%) while accuracy barely moved (68.5% to 69.3%); query rewriting plus reranking lowered it for all 12 models tested; "thinking" mode for 8 of 13 (knowledge web `#declinecraft`). Lesson recorded by the radar: every ranking or orchestration change must report the abstention rate ([[abstention]], [[rag-evaluation]]).
- Evidence-sufficiency check: RAGFlow v1.0.0-rc3 added a decision model "within the agentic tool loop" that judges whether enough was found before answering, "close to BOULON's honest 'I don't know'" (`#ragflow`; release candidate).
- Failure signal: LARA scores retrieval, engagement and outcome separately; "users rephrase 44% of the time when answers are weak" (https://arxiv.org/abs/2610.30423, brief 2026-11-04). Counting rephrased questions in Copilot Studio transcripts is "a free failure signal" (see [[rag-evaluation]]).
- Phase 2 (diagnosis from past work orders) is the more likely home for multi-step retrieval: [[phase-2-architecture]].

## Tools in the knowledge web
RouteDRAG `#routedrag` (paper); Dify v1.18.0 opt-in beta "Agent Knowledge Base" with retrieval traces `#dify`; LangGraph (stateful agent workflows) `#langgraph`; Haystack `#haystack`; DSPy (optimizes prompts and pipelines) `#dspy`. All in `1-boulon/docs/rag-radar/knowledge-web.md`; all "learning only" for BOULON.

## Go deeper
- Azure AI Search what's new (agentic retrieval knobs): https://learn.microsoft.com/azure/search/whats-new
- RouteDRAG https://arxiv.org/abs/2610.36444 . LARA https://arxiv.org/abs/2610.30423 . DeclineCraft https://arxiv.org/abs/2610.28340

## Related
[[retrieval-selection-gap]] · [[context-engineering]] · [[rag-evaluation]] · [[graphrag]] · [[abstention]] · [[rag-field-map]] · [[greg-interest-map]]
