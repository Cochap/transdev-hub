---
title: MCP (Model Context Protocol)
type: concept
status: open
updated: 2026-11-04
sources: [../../docs/research-2026-10-07/c-copilot-studio-integration.md, ../../docs/research-2026-10-15/diy-vs-azure-stack.md]
---

**Bottom line:** MCP is a standard way for an AI agent to call an outside tool. Copilot Studio can connect to MCP servers and Azure AI Search knowledge bases expose one, but BOULON uses none today. The open question that blocks it: do answers from a tool show clickable manual-and-page citations?

Plain words: an **MCP server** is a small web service that lets an agent call tools in a standard way ([c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) section 1).

## Facts (Verified 2026-10-07 on Microsoft Learn pages, via the research file)
- Copilot Studio connects over Streamable transport only (SSE dropped Aug 2025); auth: none, API key or OAuth 2.0; needs generative orchestration ([[copilot-studio-orchestration]]). Wizard: Tools > Add a tool > New tool > Model Context Protocol. It goes through Power Platform connectors, so Transdev data policies apply.
- "Citations returned from a knowledge source can't be used as inputs to other tools" is Verified; whether a tool or MCP result shows clickable source links is Unknown and is the deciding risk.
- Each Azure AI Search knowledge base exposes an MCP endpoint ([[agentic-retrieval-azure]]).
- Cost: a tool or MCP call adds 5 credits; a custom MCP server also needs hosting and an internet-reachable HTTPS address that IT would review (Inferred). A custom MCP server around our own search was ranked "No" for a non-technical owner ([diy-vs-azure-stack](../../docs/research-2026-10-15/diy-vs-azure-stack.md), [c-copilot-studio-integration](../../docs/research-2026-10-07/c-copilot-studio-integration.md) section 8).

## Related
[[azure-ai-stack-map]] · [[agent-architecture-map]] · [[agent-harness]] · [[agent-skills]] · [[greg-interest-map]] · [[copilot-studio-agent]] · [[azure-search-index]] · [[phase-2-architecture]] · [[boulon]]
