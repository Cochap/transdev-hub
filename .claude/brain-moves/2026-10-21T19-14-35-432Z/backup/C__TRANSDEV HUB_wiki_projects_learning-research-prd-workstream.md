---
title: Learning and research-PRD workstream
type: project
status: current
updated: 2026-09-30
sources: [../../docs/research-prds/2026-09-30-daily-videos.md, ../../docs/hq-control-room.md]
---

**Bottom line:** a daily habit where Claude briefs a research agent with a written "research PRD" and brings Greg exactly 5 verified videos that build his own BOULON skills. The first one is dated 2026-09-30.

## What a research PRD is
A product requirements document says what "done" looks like before work starts. A research PRD gives a research agent the goal, who it is for, pass/fail filters, how to verify, the output shape, a budget and what was already rejected, so the agent can check itself and Claude can grade the result against the same page.

## The 2026-09-30 brief
- Audience: Greg only, for his knowledge, never managers. Stack: Copilot Studio agent, Azure AI Search, coming rebuild ([[rebuild-v2-pipeline]]), then [[phase-2-cmms-diagnosis]] with work-order history.
- Six filters: published on or after 2026-08-01; changes how BOULON is built or directed and needs no pricier model; not already covered by ECC ([[ecc-plugin]]); a method not an explainer; title/channel/URL verified via YouTube oEmbed; not a repeat.
- At least 1 pick must cover writing research-agent PRDs and specs (Greg asked to learn this that day). Output: exactly 5 ranked picks, fewer if fewer pass. Budget: Sonnet, about 35 tool calls ([[claude-operating-model]]).
- Afterwards Claude grades picks against the filters and Greg rates each out of 10; ratings update the next PRD.
- Already seen: three Foundry IQ / Azure AI Search videos (one rated 8.5/10). Rejected: premium-model tutorials, "what is" explainers, roundups, Copilot Studio harness video.

Results and Greg's ratings are not in the source (unverified); add when logged. Source: [[research-prd-daily-videos-2026-09-30]].

## Related
[[greg-riley]] · [[greg-working-style]] · [[boulon]]
