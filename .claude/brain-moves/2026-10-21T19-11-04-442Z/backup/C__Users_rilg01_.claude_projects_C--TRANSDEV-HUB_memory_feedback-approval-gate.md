---
name: feedback-approval-gate
description: Steps that spend money or request company resources get a story-driven approval package for Henri first; never direct "go click Create"
metadata:
  type: feedback
---
Before any step that costs money or requests company resources: flag it, build the request with the project skill `boulon-approval-package`, and make "send it to Henri" the move. Build steps come only after Greg confirms approval.
The package must tell a story that someone with **no project context** understands in 2 minutes: SaaS style, motion, whiteboard sketches, plain words, concise. It must not read like a technical memo.

**Why:** on 2026-09-23 I gave Greg steps to create a paid service with no approval. Then my first request (a dense Claude Doc) was "usable for another AI, not for someone who hasn't followed the project". Greg narrowed the scope: money and resources only; security changes are NOT in this rule.
**How to apply:** the template is `requests/basic-tier-request.html` (https://claude.ai/artifact/TBMF4xCyCiCcCycp2HuULV). Related: [[feedback-step-by-step]].
