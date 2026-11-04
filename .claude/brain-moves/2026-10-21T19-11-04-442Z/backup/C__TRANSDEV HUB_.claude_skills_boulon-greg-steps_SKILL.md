---
name: boulon-greg-steps
model: haiku
description: Use whenever a BOULON reply asks Greg to do anything by hand (Copilot Studio, Azure portal, SharePoint, .env). Formats the action as a full click-by-click tutorial with bilingual UI labels, copyable text, and a pass/red-flag test.
---
# Greg action tutorial format

## 0. Money gate ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â check this FIRST
Does the step spend money, request a company resource (a new or upgraded Azure service, a paid tool, a licence), or install software on Greg's locked company PC?
For a software install: draft an IT ticket (in French, with an English gloss) plus a justification into `docs/it-requests/`. Never give direct download or install steps.
If yes, don't give build steps yet. Use the `boulon-approval-package` skill to make the request for Henri, and make "send the request" Greg's move. Build steps come only after Greg confirms approval.

Greg is non-technical, and his Copilot Studio UI is in **French**. A one-line pointer is never enough.

For every action:
1. **Header:** what it does, how long it takes, and which app.
2. **Numbered steps**, one click each:
   - Start from the URL (copilotstudio.microsoft.com, portal.azure.com, ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦).
   - Name each button/tab in English with the French label: **Topics** (Rubriques), **System** (SystÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me), **Save** (Enregistrer), **Settings** (ParamÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨tres), **Knowledge** (Connaissances), **Test** (Tester).
   - Say what should appear after the step, so he knows he's in the right place.
   - If there's a risk, like erasing the wrong thing, say how to avoid it.
3. **Paste blocks:** the exact text in its own code block. On BOULON HQ it gets a Copy button.
4. **Test:** the exact input string, where to type it, and what counts as pass, what counts as a red flag, and what to reply in chat.
5. If I haven't seen a label myself, write "should be called X; if not, send a screenshot".

Known French system topics: DÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©but de la conversation (conversation start), En cas d'erreur (on error), Fin de la conversation (end of conversation), Optimisation conversationnelle (conversational boosting, the knowledge search), Plusieurs rubriques correspondent (several topics match), RÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©affecter (hand off to a person), RÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©initialiser la conversation (reset conversation), Se connecter (sign in), **Secours (fallback: "no answer")**.

The same tutorial goes in chat AND in the BOULON HQ "Your move" block.
