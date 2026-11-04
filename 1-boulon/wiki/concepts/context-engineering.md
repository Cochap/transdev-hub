---
title: Context engineering
type: concept
status: current
updated: 2026-11-04
sources: [../../../4-learning/interests/briefs/2026-11-04-briefing.html, ../../../4-learning/interests/lexicon-ai-ml.md]
---

**Bottom line:** context engineering means deciding exactly what goes into the model's prompt and what stays out; the only sources so far are one LangChain post and two lexicon lines, so this page is short and its BOULON link is an inference.

## Plain definition (as the sources define it)
- **Context engineering** = "deciding exactly what goes into the model's prompt and what stays out" (lexicon `4-learning/interests/lexicon-ai-ml.md`, branch 2.2).
- **Offloading** = "storing big tool output outside the prompt and passing only a pointer" (same lexicon).
- Source item (brief 2026-11-04): LangChain, "Context engineering starts with retrieval" (2026-10-23): "Search before reading; offload big results to files and pass pointers; treat retrieved text as untrusted." https://langchain.com/blog/context-engineering-starts-with-retrieval (`4-learning/interests/briefs/2026-11-04-briefing.html`; the post itself not opened by me).

## How it shows up in BOULON
- BOULON's prompt is assembled by Copilot Studio from the agent instructions plus the retrieved chunks ([[copilot-studio-agent]]); the levers Greg controls are the instruction text, how many and which chunks arrive ([[retrieval-selection-gap]]) and how chunks are cut ([[chunking]]). That mapping is an inference, not stated in the LangChain item.
- "Treat retrieved text as untrusted" matches the instruction rules BOULON already tracks (injection, off-topic) in the live agent instructions, `1-boulon/docs/continuity-log.md` entry 2026-10-06 16:00 (rules block v2b); no separate source ties the two.
- Related idea in the radar: Tessera keeps every evidence unit self-describing (page title, section path, table headers) so it still makes sense when lifted into a prompt (knowledge web `#tessera`, `1-boulon/docs/rag-radar/knowledge-web.md`).
- Agent-level context topics (harness, memory, sandbox) belong to the orchestration branch of [[greg-interest-map]], not this page.

## Go deeper
- https://langchain.com/blog/context-engineering-starts-with-retrieval

## Related
[[retrieval-selection-gap]] · [[agentic-retrieval]] · [[chunking]] · [[rag]] · [[rag-field-map]] · [[greg-interest-map]]
