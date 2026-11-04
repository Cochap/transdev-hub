---
title: Source — skill boulon-approval-package
type: source
status: current
updated: 2026-09-30
sources: [../../.claude/skills/boulon-approval-package/SKILL.md]
---

**Bottom line:** the project skill for any step needing money or company resources approved: builds a story-driven one-page artifact for Henri that someone with no context understands in 2 minutes. Catalogued in [[skills-catalog]].

- Story arc in fixed order: progress story, hero headline plus price chip marked "Decision needed", what BOULON does, proof (3 numbers), the problem, at most 3 option cards, the cost (3-line bill plus 3 safety nets), at most 3 questions, footer with preparer, date and price source.
- Style: copy `1-boulon/requests/basic-tier-request.html`; Transdev red `#E2001A` as the only accent, Plus Jakarta Sans and Caveat fonts, motion that respects reduced-motion, no jargon, sentences under 20 words, numbers in rounded CAD, every number checked against a real source.
- No projections: never show future dates or launch targets to Henri unless he asks. This is why [[launch-plan-oct16]] is marked internal.
- Dates and versions come only from `1-boulon/docs/timeline-master.md` and `1-boulon/docs/test-ledger.md`.
- Before calling any ticket "ready" (added 2026-09-24, after the Azure ticket was called ready 4 times with region, billing and scope problems): inventory every touched resource with its real region, check links against official Microsoft Learn pages, put monthly and one-time costs in the same ticket, pick ONE connection style, make every line understandable to Greg, present it once complete. See [[azure-ticket-77048]].
- Delivery: `requests/<topic>-request.html`, publish, give Greg the link, sharing steps and a short Teams message in French with an English gloss. No build steps until Greg confirms approval.

## Related
[[skills-catalog]] · [[azure-ticket-77048]] · [[henri]]
