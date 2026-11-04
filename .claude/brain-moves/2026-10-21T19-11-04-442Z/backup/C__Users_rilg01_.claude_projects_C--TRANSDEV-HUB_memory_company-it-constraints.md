---
name: company-it-constraints
description: Greg works on a locked Transdev PC — no admin rights; any software install needs an IT ticket with justification; his own terminal access is blocked
metadata:
  type: user
---
Greg is on a company-managed Transdev machine:
- He has no administrator rights.
- Installing any software, even free standard tools like Node.js, needs an **IT ticket with a written justification**.
- Terminal use outside Claude is blocked for him.
- He knows of no workarounds and doesn't want any.

**Why:** said explicitly on 2026-09-23, after I told him to "download and install Node.js".
**How to apply:**
- Never tell Greg to install or download software directly. Draft the IT ticket (in French, with an English gloss) and the justification instead, and save it in `docs/it-requests/`.
- Suggest checking the company's self-service software portal first.
- Never suggest bypassing IT controls: no portable installs, no user-folder tricks.
- Plan work so it doesn't depend on a pending install.

**Update 2026-10-07:** Greg says the project now has much more latitude and may be approved for almost anything defensible (GPU, self-hosting, installs). Still draft the French ticket + justification; do not rule options out in advance. See [[feedback-open-to-heavy-options]].

Related: [[feedback-approval-gate]], [[greg-working-style]].
