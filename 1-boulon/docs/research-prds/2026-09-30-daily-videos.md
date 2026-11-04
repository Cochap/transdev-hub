# Research PRD: today's 5 learning videos (2026-09-30)

> **What a research PRD is.** A PRD (product requirements document) says *what done looks like* before any work starts. A research PRD applies the same idea to a research agent. Instead of "find me good videos", the agent gets the goal, who it's for, hard pass/fail filters, how to verify, the exact output shape, a budget, and examples of what was already rejected. The agent can then check its own work against the PRD before handing it back, and Claude can grade the result against the same document. Each section below is one of those parts.

## 1. Objective (the decision this research serves)
Give Greg exactly **5 videos to watch today** that raise his own skill at building BOULON and bring new applications into the project.

## 2. User and context
- **User:** Greg Riley, BOULON's builder. He already knows current models (GPT-6 Astra, Jev) and Claude Code basics, including Routines. The content is for **his** knowledge, never for managers.
- **Stack:**
  - Copilot Studio agent (GPT-4.1) with an Azure AI Search RAG knowledge source (PDF bus manuals).
  - Next: a rebuild with 100+ manuals using Document Intelligence Layout, text-embedding-3-small and gpt-5-mini. Then Phase 2, which adds maintenance work-order history (structured and free-text).
  - He works in Claude Code with the ECC plugin.
- **Style he likes:** engaging YouTube tutorials and short explainers on one specific subject.

## 3. Scope
**In:**
- **Research-agent PRDs, specs and briefs:** how to write them, and spec-driven agent work. At least 1 video, because Greg asked to learn this today.
- **Azure AI Search and Foundry IQ methods:** knowledge bases, agentic retrieval, layout and table chunking, hybrid search, filters.
- **RAG methods for technical manuals and maintenance records.**
- **New agent and orchestration patterns for Claude Code** that ECC doesn't already cover.
- **Practical integrations of new cheap models** (for example Jev) into a RAG pipeline.

**Out:**
- premium-model tutorials
- "what is X" explainers
- news roundups
- manager or ROI content
- eval and skill-building tutorials (ECC covers these)
- anything older than about 60 days, unless it is the best available on the PRD topic (see filter 1)

## 4. Acceptance criteria (every pick must pass all of them)
1. **New:** published on or after 2026-08-01. Exception: for the PRD topic, one older video is allowed if nothing newer is good, and it must be marked as the exception.
2. **In scope:** changes how BOULON is built or run, or how Greg directs agents. It must not require a pricier model.
3. **Not ECC:** ECC's existing agents and skills don't already do it.
4. **Method, not explainer:** the viewer comes away able to *do* something.
5. **Verified:** title, channel and URL are confirmed together via YouTube oEmbed (`https://www.youtube.com/oembed?url=<url>&format=json`). The publish date is confirmed, or marked "date unverified".
6. **Not a repeat:** see section 7.

## 5. Deliverable (exact shape)
Exactly 5 picks, ranked. For each pick:
- **Title** · **Channel** · **Date** · **URL** · **Verified** (yes / via search)
- **You'll learn:** 1 line
- **BOULON application:** 1 concrete line
- **Passes because:** 1 line naming criteria 1 to 4

If fewer than 5 pass honestly, return fewer and state which criterion blocked the rest. No padding.

## 6. Budget and stop rule
Sonnet, at most about 35 tool calls. Stop once 5 picks pass, or once the budget is spent.

## 7. Already seen or rejected (don't return these)
- Seen: Foundry IQ: the future of RAG (h1n19QCPc1I, rated 8.5/10) · Why Your AI Agent Needs Foundry IQ Knowledge Bases (3RzJvmKklJM) · Azure AI Search Serverless (pKmuyd_CV2Y)
- Rejected: GPT-6 Astra tutorials · Claude Code Routines · Claude skills and eval tutorials · "What is Jev" · Copilot monthly roundups · John Savill weekly updates · Copilot Studio harness video (premium models)

## 8. After delivery (how Claude grades it)
Claude checks every pick against section 4 and removes any that fail. Greg rates each video out of 10, and the ratings update the filters in the next PRD.
