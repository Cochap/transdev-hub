# Phase 0 — Design Assumptions Log
**Written:** 2026-09-22 (Tuesday) | **Purpose:** a plain record of what this design was based on, so it can be shown to Henri later and defended on its own terms — not a research document, a log of decisions and the reasoning behind them.

This skips a separate scoping meeting. Instead, Phase 0 is built from what Greg already knows about the job plus what's been learned about BOULON so far, written down as explicit assumptions. If any of these turn out wrong, this is the list to correct — not a reason to distrust everything downstream of it.

## Assumption 1 — What mechanics/engineers actually need help with
Based on the current tool's usage and testing so far, the four most likely real needs are:
1. **Part lookup** — already built and tested (current V1). (Corrected 2026-09-23: V1 reference is stale; see continuity-log.md.)
2. **Troubleshooting/diagnostics** — "why is this doing X" style questions.
3. **Procedure walkthroughs** — step-by-step "how do I do X" guidance.
4. **Safety/PPE guidance** — what protective steps a procedure requires (this is already the subject of the one open verification item from V1 testing — the PPE/depressurization line).
**Not yet confirmed with Henri or a wider group of mechanics** — this is Greg's and my best read of the job, not a survey result. Flagged so it's treated as a working assumption, not a finding. **Review 2026-09-23:** unvalidated; needs 10 real questions each from 3–5 mechanics to seed the golden set. See review-architecture.md C3.

## Assumption 2 — There is no strict Microsoft-only limitation
Copilot Studio is the base platform. Stronger models, Azure services, and outside tools can be used wherever they help. This removes any self-imposed limit from earlier framing of the project.

## Assumption 3 — Budget and ownership
$5,000 CAD is available, specifically for this project, for Greg to allocate as needed. This is treated as real spending room for a pilot, not a hypothetical number.

## Assumption 4 — Hallucination cannot be fully eliminated with today's technology
Checked directly (2026-09-22, adversarial research pass): no credible, independently verified method — commercial or academic — eliminates AI hallucination completely. This includes checking specifically for "zero hallucination" claims; the closest one found (an academic proposal) explicitly describes hallucination as "containable," not eliminable, in its own text. OpenAI's own published research states current-generation language models will never reach 100% accuracy on open-ended questions. The realistic, honest goal is: every claim must be traceable to a real cited source, and the assistant must say "not found — escalate to a person" rather than guess. This is treated as a hard constraint on the design, not a shortfall to apologize for.

## Assumption 5 — Azure AI Search (with a lightweight verification/abstention step) is the right retrieval approach for this project
Checked directly against alternatives (GraphRAG, fine-tuning on the manuals, standalone fact-checking layers) given this project's actual constraints — one non-expert builder, $5,000 CAD, 100+ long manuals with tables and diagrams, Copilot Studio as the platform. Azure AI Search plus mandatory citations and a cheap verification/abstention pass is the best fit; the alternatives either cost too much to set up for this budget, aren't usable inside Copilot Studio without heavy custom engineering, or (for fine-tuning specifically) are a poor technical fit for exact-spec lookups like torque values and part numbers. **Review 2026-09-23:** half holds. Azure AI Search is correct; the verification/abstention pass is settings + instructions only, not a built second-check layer. See review-architecture.md C2.

## Assumption 6 — No custom code-level setup is needed to get this working
Copilot Studio now has a point-and-click way to connect an Azure AI Search index as a knowledge source — no hand-built conversation logic required for basic use. The harder, code-based path is only needed later, if very specific custom control is ever required. This meaningfully lowers the estimated effort from the original plan. **Review 2026-09-23:** revise. Basic connection is point-and-click; but live verification, page citations, PDF splitting, and re-index automation do require custom code. See review-architecture.md H5, C2.

## Assumption 7 — Pilot scope: broader than "small," short of "everything"
Original plan assumed a small pilot (10-20 manuals) was safest. Checked directly against testing everything at once: neither extreme is right for this project. The better fit is roughly 25-35 manuals, deliberately chosen to include the hardest cases (a very long manual, a table-heavy one, a diagram-heavy one), not just convenient ones. Reasoning: the setup work is mostly the same regardless of document count, so a bigger pilot doesn't cost much more effort — but a tiny pilot risks a false "it works" result that fails once the harder manuals are added later, while doing all 100+ up front risks having to redo that work across the whole set if the first attempt at organizing/chunking the documents needs fixing. **Review 2026-09-23:** revise. The hardest cases (large Vicinity manuals) were truncated or excluded by the Basic tier's 16 MB limit, so the pilot did not actually stress-test them. See review-architecture.md C1, H5.

## What this log is for
When this design is shown to Henri later, each build decision should be traceable back to one of these seven numbered assumptions. If a decision doesn't trace back to one, that's a sign it needs its own justification before going further.
