---
title: Source — skill transdev-pc-shell-quirks
type: source
status: current
updated: 2026-09-30
sources: [../../.claude/skills/transdev-pc-shell-quirks/SKILL.md]
---

**Bottom line:** the project skill (extracted 2026-09-25) listing why ordinary commands fail or hang on Greg's locked Transdev PC, and what to use instead. Catalogued in [[skills-catalog]]; context in [[company-it-constraints]].

| Symptom | Use instead |
|---|---|
| Node `fetch` fails `SELF_SIGNED_CERT_IN_CHAIN` (corporate TLS inspection) | `curl --ssl-no-revoke` or PowerShell `Invoke-RestMethod` |
| `curl` fails `CRYPT_E_NO_REVOCATION_CHECK` | `curl --ssl-no-revoke` |
| Python `CERTIFICATE_VERIFY_FAILED` | PowerShell `Invoke-RestMethod` |
| `python` hangs until timeout (it is the Microsoft Store stub) | use `node`, never `python` |
| String replace finds nothing in `boulon-hq.html` (CRLF line endings) | normalise line endings, or use the Edit tool |
| Backslash paths mangled in `node -e` or sed | write the script to a file with a quoted heredoc |
| Key "mismatch" alarms | parse `.env` by key name; check length (Azure Search keys are 52 characters) without printing |
| Outlook COM fails `MK_E_UNAVAILABLE` (new Outlook has no COM) | mail via a Power Automate flow writing to OneDrive, not locally |

Never print keys while diagnosing; show only length, key names or HTTP status.

## Related
[[skills-catalog]] · [[company-it-constraints]] · [[claude-operating-model]]
