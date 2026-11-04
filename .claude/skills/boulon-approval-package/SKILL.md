---
name: boulon-approval-package
description: Use whenever a BOULON step needs money or company resources approved (Azure services, tier upgrades, paid tools, licences). Builds the request for Henri as a story-driven, SaaS-style one-page artifact that someone with no project context understands in 2 minutes.
---
# BOULON approval package

**Reader:** Henri or anyone above him. Assume they don't know what BOULON is, what we did this week, or any technical words.
**Goal:** they understand and can say yes in 2 minutes.

Before designing, load the user-level skill `attention-architecture` and run its checklist.

## Story arc (always this order, one idea per chapter)
0. **Progress story first**, whenever the request is also a report: where we started, what changed (name the technical approach and give a plain gloss, e.g. keyword retrieval ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ RAG, with the benefits), and a dated timeline of real events (done / now / next). Henri judges Greg's reporting from this.
1. **Hero:** a one-line headline stating the situation ("BOULON works. It has run out of room."), one plain sentence of context, and the ask as a price chip marked "Decision needed".
2. **What BOULON does:** a whiteboard sketch (mechanic ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ BOULON ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ manuals ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ answer) plus one real question-and-answer example.
3. **Proof it works:** 3 big numbers, each with a plain label.
4. **The problem:** one visual metaphor (a full tank, 1 box against the 15 needed) and one or two sentences.
5. **Options:** at most 3 cards. The recommended one is highlighted; the others have a one-line reason.
6. **The cost:** a short bill (3 lines, with the total), then 3 safety nets (cancel any time, spending alert, no double paying).
7. **What I need from you:** at most 3 numbered questions (approve? who pays? what process?).
8. **Footer:** prepared by Greg Riley, the date, and the price source.

## Style (keep it consistent: copy `1-boulon/requests/basic-tier-request.html` as the template)
- SaaS / high-tech look: white or light panels, Transdev red `#E2001A` as the only accent, big bold "Plus Jakarta Sans" headlines, and "Caveat" handwriting for whiteboard notes.
- Motion that guides the eye: the hero rises in, the ask chip pulses, bars fill, sketch lines draw, boxes pop. Everything is visible at rest, and all motion is off when the viewer has turned motion down (prefers-reduced-motion).
- Plain language only. No jargon like index, tier, SKU, embedding, SLA or vector. Sentences under 20 words. Numbers rounded, in CAD.
- Every number must be checked against a real source first (pricing API, Microsoft docs, our own test results). No invented figures.
- Light and dark themes, and it must work on a phone.

## Motion standard
Apply the "Motion patterns Greg approved" section of the `attention-architecture` skill: deck cards with living connectors, a one-time scroll reveal, animated timelines, chat scenes and progress rails.

## No projections
Never show future dates, deadlines or launch targets to Henri unless he asks. Next steps are undated ("After your approval: Step 1ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦").

## Sourcing
Versions and dates come only from `1-boulon/docs/timeline-master.md` and `1-boulon/docs/test-ledger.md`, which were built from all the chat and version logs. Never invent a date or version.

## Delivery
- Save to `requests/<topic>-request.html` and publish with the Artifact tool.
- Give Greg: the link; the steps to share it (the Share menu on the page); and a short Teams message in French with an English gloss.
- No build steps until Greg confirms the approval.
- Scope: money and company resources only. Security or settings changes are not part of this skill unless Greg asks.

## Before calling any ticket or request "ready" (added 2026-09-24)
The Azure search ticket was called ready 4 times while it still had region, billing and scope problems. Greg: "i need you to be 100% sure our ticket gets us exactly what we need." Before saying "ready to submit":
1. Inventory every existing resource the request touches: name, type, region, API kind. Use DNS lookups of the endpoints plus portal facts Greg confirms. Mark each fact as confirmed or inferred.
2. Check every link between the new and the existing resources against the official Microsoft Learn page (region rules, key vs managed identity, roles, tier features). Use official availability tables, never a missing price-list line (memory `feedback-authoritative-evidence`).
3. Put the monthly AND one-time costs in the same ticket, so no second ticket is needed.
4. Pick ONE connection style (all keys or all managed identity), never a mix.
5. Write the ticket so Greg understands every line: no unexplained Azure terms. He won't send what he doesn't understand.
6. Present the whole thing once, complete. Don't reveal fixes one at a time.
