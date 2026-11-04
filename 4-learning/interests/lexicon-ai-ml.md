# AI/ML lexicon (branch 2 of the interest map)

One line per term, plain language, where Greg met it, and the branch it belongs to. `morning-brief` appends new terms here; never duplicate (update the line instead). Sorted by branch.

| Term | Plain meaning | Branch | First seen |
|---|---|---|---|
| RAG (retrieval-augmented generation) | The bot first finds passages in your own documents, then answers only from them | 1 | BOULON, 2026-09 |
| Selection gap | The right chunks were retrieved but dropped before reaching the answer prompt | 1.1 | [kapa.ai](https://www.kapa.ai/blog/retrieval-bottleneck), brief 2026-11-04 |
| Top-k | How many search results get passed on to the answer model | 1.1 | brief 2026-11-04 |
| Reranker | A second model that re-orders search results by relevance | 1.1 | rag-radar |
| Retrieval reasoning effort | How much LLM planning Azure AI Search spends per question (none, low, medium, auto) | 1.2 | [Azure what's new](https://learn.microsoft.com/azure/search/whats-new), brief 2026-11-04 |
| Adaptive routing (agent gating) | A small classifier decides whether a question needs the heavy agent path | 1.2 | [arXiv 2610.36444](https://arxiv.org/abs/2610.36444), brief 2026-11-04 |
| Lineage schema | Fixed IDs tying a user outcome back to the exact retrieval that produced it | 1.3 | [arXiv 2610.30423](https://arxiv.org/abs/2610.30423), brief 2026-11-04 |
| Reformulation rate | How often users rephrase a question; a free signal that retrieval failed | 1.3 | brief 2026-11-04 |
| Golden set | Fixed test questions with known correct answers used to score the bot | 1.3 | BOULON tests |
| Context engineering | Deciding exactly what goes into the model's prompt and what stays out | 2.2 | [LangChain](https://langchain.com/blog/context-engineering-starts-with-retrieval), brief 2026-11-04 |
| Offloading | Storing big tool output outside the prompt and passing only a pointer | 2.2 | brief 2026-11-04 |
| Agent Skill | A folder of instructions (SKILL.md) and scripts an agent loads only when needed | 3.4 | [Anthropic](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation), brief 2026-11-04 |
| Orchestrator agent | The agent that classifies a request and routes it to specialist agents | 3.1 | [Copilot Studio ref. architecture](https://learn.microsoft.com/en-us/power-platform/architecture/reference-architectures/modernize-hr-support) |
| Asynchronous subagent | A delegated worker the parent agent does not wait on | 3.1 | [LangChain](https://langchain.com/blog/managed-deep-agents-browser-use-and-asynchronous-subagents), brief 2026-11-04 |
| On-behalf-of (delegated access) | Calls run with the signed-in user's own permissions | 3.1 | brief 2026-11-04 |
| Ambient agent | An agent triggered by events or a schedule, not by a message | 3.2 | [LangChain](https://langchain.com/blog/components-building-company-harness), brief 2026-11-04 |
| Agent harness | Everything around the model: prompts, tools, memory, identity, schedules | 3.2 | brief 2026-11-04 |
| Sandbox | An isolated place where agent code runs without touching the real system | 3.3 | NVIDIA OpenShell, brief 2026-11-04 |
