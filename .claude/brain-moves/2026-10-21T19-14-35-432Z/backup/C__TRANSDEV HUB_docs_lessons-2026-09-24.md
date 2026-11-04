# Lessons, 2026-09-24

Every failure today, its fix, and where the fix is enforced.

| # | What went wrong | Fix | Enforced in |
|---|---|---|---|
| 1 | The Azure ticket was called "ready" while it asked for **Canada East**, a region with no AI enrichment. Greg caught it only by asking "are we SURE?" | Region check of every resource (DNS lookups + portal) against Microsoft Learn. The ticket moved to Canada Central | Memory `feedback-purchase-verify-100`; skill `boulon-approval-package` (new checklist); `docs/azure-region-check-2026-09-24.md` |
| 2 | The one-time indexing cost was estimated on 09-23 but left out of the ticket | Monthly and one-time costs now go in the same request | Skill `boulon-approval-package`, checklist item 3 |
| 3 | Fixes came one at a time (v2 → v3 → v4 → v5), which looked like scope creep and cost Greg time | Present a request once, complete, after the full check | Skill `boulon-approval-package`, checklist item 6 |
| 4 | I said our AI models weren't "sold" in Canada Central because the price list didn't show them. The official table showed that was half wrong (the embedding model IS available there; gpt-5-mini isn't) | Use only authoritative sources (official availability tables, a real test) before claiming something is blocked | Memory `feedback-authoritative-evidence` |
| 5 | I proposed an Entra app registration without checking Greg's rights | Verify access first, and always give a fallback that needs no admin | Memory `feedback-verify-access-first` |
| 6 | Ticket v4/v5 mixed a managed identity (badge) for one connection with keys for the others. A reviewer's pushback caught it | One connection style for everything; recommendation is all keys (A) for now | Skill `boulon-approval-package`, checklist item 4 |
| 7 | The ticket used unexplained terms ("keyless billing", "billing PDF reading to boulon-pilot-ai"). Greg: "i literally cant send this ticket unless i understand everything about it" | Plain analogies (electricity meter, restaurant tab, ID badge). Every ticket line must be understandable to Greg | Skill `boulon-approval-package`, checklist item 5 |
| 8 | The 16:45 end-of-day reminder fired once, I deferred it because Greg was mid-ticket, and it never came back. Greg: "your reminder failed to execute anything" | The hook now fires on every message until the end-of-day skill writes `.claude/hooks/.eod-done`, and tells Claude to run the skill in the same turn | `.claude/hooks/eod-reminder.js`; skill `boulon-end-of-day` step 7b |
| 9 | "PreToolUse:Write hook error" after save-session worried Greg | It's GateGuard's first-write checkpoint, not a failure. Session, memory, skills and hooks folders are now exempt | `.claude/settings.json` (`GATEGUARD_EXEMPT_GLOBS`); skill `ecc-operating-notes` |
| 10 | A first reviewer pushback (use "Cognitive Services Contributor") was wrong. Contributor has no data permissions | Checked the role definitions on Microsoft's built-in roles page before answering | Memory `feedback-authoritative-evidence` (same principle) |

## What worked
- DNS lookups of the endpoints revealed each resource's region with no Azure access. The pilot search service turned out to be in East US.
- Greg's 3 portal checks (locations, API kind, his role) turned inferences into confirmed facts in 5 minutes.
- Pulling Microsoft's price list with `curl --ssl-no-revoke` works on the company network (Node's built-in fetch fails on the corporate certificate).

## Learn-eval
Done by hand in this end-of-day. Saved today: a global skill (`azure-search-index-projection-parent-fields`), project skills (`ecc-operating-notes`, plus updates to `boulon-agent-testing`, `boulon-approval-package` and `boulon-end-of-day`), and memories (`feedback-verify-access-first`, `feedback-purchase-verify-100`, `feedback-authoritative-evidence`).
