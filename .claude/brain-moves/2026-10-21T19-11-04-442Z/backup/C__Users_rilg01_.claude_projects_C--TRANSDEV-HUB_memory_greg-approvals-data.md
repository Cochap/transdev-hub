---
name: greg-approvals-data
description: "Greg is the approver for BOULON working decisions (ask him, not Henri); manuals are not private; no anonymization unless Greg asks; agent sign-in may be off for testing"
metadata:
  node_type: memory
  pinned: false
  originSessionId: dba9cba0-878c-4bfd-863e-fafbcce09f9d
  modified: 2026-09-24T19:00:27.828Z
---

On 2026-09-24 Greg set how approvals and data sensitivity work on BOULON.

- **Ask Greg directly.** Don't route factual questions or working approvals through Henri. Greg said: "ask me thats a waste of time to go through henri". Examples: approver names, which Azure subscription, whether a setting can change. Henri is only needed where Greg says so.
- **The OEM manuals are not private.** Greg: "these documents are not private whatsoever". Don't treat them as sensitive when deciding on agent sign-in, test copies or sharing.
- **No anonymization work unless Greg asks for it.** He said: "no need for anonymization either unless i tell you so". Don't add anonymization steps or Law 25 gates to plans on my own initiative. If a step would put employee personal data (for example mechanics' names in MIR work orders) somewhere new, say it once in one plain sentence, suggest the zero-effort option (leave the name columns out of the export), and move on.
- **Keep the live agent's "Authenticate with Microsoft" sign-in ON.** Greg and Henri approved switching it off. But Copilot Studio warned that "No authentication" blocks publishing to the Teams app store, which launch needs, so it stays on. Test the live agent with Copilot Studio's built-in **Evaluation** tab instead: a CSV of `Question`,`Expected response`, max 100 cases, results exported as CSV. The CSV lives in `tests/copilot-eval/`.
- **Private network connections (private endpoints) aren't a Transdev requirement at this site,** per Greg. Don't size plans around them.
- **Claude Code's permission settings:** Greg wants bypassPermissions as the default mode. It's set in the user file (`C:\Users\rilg01\.claude\settings.json`) and in the project file. The block on editing settings came only from **auto mode's** safety classifier ("Self-Modification", denied 3 times on 2026-09-24). That is not a permanent rule, so don't call it one. In auto mode, give Greg a paste block. In bypass mode, just make the edit.
