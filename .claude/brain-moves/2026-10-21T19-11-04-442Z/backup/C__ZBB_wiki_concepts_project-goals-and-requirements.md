---
type: concept
tags: [goals, stakeholders, requirements, scope]
sources: [CLAUDE.md (Greg's brief, 2026-10-07), raw/docs/ZBB Documentation.pdf, external: ACCEDER AU ZBB ET INFOS.txt, external: C:/TRANSDEV HUB/docs/meeting-2026-09-24-pierre.md, Greg in chat 2026-10-14]
updated: 2026-10-14
---
# Project goals and stakeholder requirements

## Goal (Greg, from the supervisors' request)
1. **Take over the tool:** understand everything the previous intern built, using only the handover (Matteo has left).
2. **Then improve it:** appearance, speed and weight ("dense, slow, heavy and clunky"), and possibly move it off the current stack (Python + tkinter + 80 MB exe).
3. The approach (tweak, rewrite or migrate) is decided **after** understanding is complete. Understanding is now essentially done for the working version ([[takeover-brief]]).

## What the tool must keep doing (from the code and handover)
- Budget a fleet's maintenance from history: parts $ + labour hours × hourly rate, per vehicle class and odometer range ([[budget-calculation]]).
- Accept a fleet file (template CSV: CLASS, Start_Km, Distance) and a manual entry ([[fleet-template-csv]], [[zbb-app]]).
- Show the cost curves per class and compare classes ([[cpk-hpk]]).
- Warn when a vehicle runs past the reliable km range (`BEST_XMAX`).
- Bilingual users (the app's import steps are written EN + FR).

## Stakeholders
| Who | Role for ZBB | Source |
|---|---|---|
| Greg Riley | Owner now; takes over and improves the tool | Greg, 2026-10-07 |
| Supervisors | Asked the interns to understand and improve it | CLAUDE.md |
| Henri ECKERN | Supplied the inflation rates; said the tool was "Python and C" (unverified) | [[inflation-rates]], [[people-and-roles]] |
| Pierre (Pierre Zivec, senior Transdev Canada maintenance leader, BOULON sponsor) | Received the Standard School analysis; said BOULON is separate from the zero-based budget work although both use MIR | [[standard-school-analysis]], BOULON meeting 2026-09-24 |
| Matteo D'ALENA | Built it; has left; not contactable | [[people-and-roles]] |

## Requirements still unknown
- What the supervisors want changed **first** (appearance, speed, accuracy, language).
- Who runs ZBB day to day, how often, and what output they need (the app only shows pop-ups; no export).
- The right hourly rate (65 in the app, 75 in the Standard School workbook).
See [[open-questions]].

## Rules that apply
- Work-order and cost data are Transdev-sensitive: keep them on this PC or company storage (CLAUDE.md).
- No contacts about ZBB (Matteo has left; Alex is not involved). Greg is the decision-maker.

## Scope decisions
- **2026-10-20 (Greg): Voyago is out of scope** for the app and its data. The Voyago MIR export ([[mir-voyago-export-2026-10-20]]) was tested and gave no accuracy or performance gain for Québec ([[voyago-pooling-test]], [[voyago-export-value-for-engine]]); budgeting it would add cost and complexity. Raw files stay in `raw/data/` for reference.
