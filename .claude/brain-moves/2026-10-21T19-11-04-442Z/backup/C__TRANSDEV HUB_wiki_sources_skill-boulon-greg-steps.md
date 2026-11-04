---
title: Source — skill boulon-greg-steps
type: source
status: current
updated: 2026-09-30
sources: [../../.claude/skills/boulon-greg-steps/SKILL.md]
---

**Bottom line:** the project skill that formats anything Greg must do by hand as a full click-by-click tutorial with English and French button labels. Catalogued in [[skills-catalog]].

- Money gate first: if the step spends money, requests a company resource or installs software on Greg's locked PC, do not give build steps. Software installs get an IT ticket draft in French (with English gloss) in `docs/it-requests/`; spending goes through [[skill-boulon-approval-package]].
- Every action: header (what, how long, which app); numbered one-click steps starting from a URL; each button in English with its French label (for example Topics / Rubriques, Save / Enregistrer, Knowledge / Connaissances, Test / Tester); say what should appear after each step; exact paste blocks; a test with literal input, pass, red flag and what to reply. If a label has not been seen, write "should be called X; if not, send a screenshot".
- Known French system topics in Copilot Studio include Début de la conversation, En cas d'erreur, Fin de la conversation, Optimisation conversationnelle, Plusieurs rubriques correspondent, Réaffecter, Réinitialiser la conversation, Se connecter, Secours (fallback, "no answer").
- The same tutorial goes in chat AND in the BOULON HQ "Your move" block.

## Related
[[skills-catalog]] · [[greg-working-style]] · [[company-it-constraints]]
