---
name: boulon-report-pipeline
description: Use when producing a progress report, presentation or approval page about BOULON for Henri or others. Runs the proven multi-agent pipeline (historian ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ technical writer ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ plain-language writer ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ storyboard reviewer ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ motion pass), then Claude publishes and handles comments.
---
# BOULON report pipeline (proven 2026-09-23)

1. **Historian** (general-purpose agent, can write files): updates `1-boulon/docs/timeline-master.md` + `1-boulon/docs/test-ledger.md` from ALL sources: logs, `recovery/`, `1-boulon/tests/results/`, Greg's corrections. Estimates are marked. Henri is the overseer.
2. **Technical writer** (general-purpose): a chapter-by-chapter copy deck with every number cited ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ `1-boulon/docs/report-copy-technical.md`. Claude checks the limits against Microsoft Learn.
3. **Plain-language writer** (`ecc:marketing-agent`, read-only, so Claude saves its output): the final copy in Greg's voice, with technical terms glossed in 5ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“10 words ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ `1-boulon/docs/report-copy-final.md`.
4. **Storyboard reviewer** (general-purpose): builds the page from the `boulon-approval-package` template and runs the `attention-architecture` checklist, with the storyboard kept as a CSS comment.
5. **Motion pass** (general-purpose): deck cards + living connectors, one-time scroll reveals, animated timeline / chat / rails.
6. Claude publishes, then answers artifact comments in their threads and resolves them.

Rules:
- No future dates to Henri.
- The story always runs from Sep 14/15 (access / start), never "3 days".
- Explain every cost change: what, why, one-time vs monthly.
- Diagrams and tables are never dropped to save money.
- Read-only agents (architect, planner, marketing) can't write files: Claude saves their output.
