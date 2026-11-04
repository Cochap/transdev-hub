# Meeting 2026-09-24 (Pierre, Henri, Greg): BOULON outcomes

Source: call transcript pasted by Greg. The intern's segment at the start (Gabriel, bus route and depot optimization) is out of scope and ignored. The transcript captures Pierre's side only; Greg's words are missing, and Henri speaks rarely. The speaker label "ZIVEC" is Pierre ("Pierre, il a dit…").

## Decisions
| # | Decision | Pierre's words (short quote) |
|---|---|---|
| D4 | **Paid search plan approved in principle.** Pierre approves it through an official IT ticket. Greg sorts it out with Henri. | "C'est 100 balles par mois, ce n'est pas du tout le sujet… il faut qu'on tente." / "il faut faire un ticket que je l'approuve. Tu vois avec Henri." |
| D4a | If the plan has to change again (for the maintenance-history phase), go straight to a plan big enough that it won't need another change. | "si tu dois ensuite rechanger de plan, change directement pour un plan assez supérieur" |
| D15 | **Phase 2 = Transdev's maintenance history (CMMS / GMAO).** Target: help diagnose corrective (unplanned) repairs. From the symptom the driver reports, propose likely causes and the recommended diagnostic method, as guidance ("we recommend looking at this first"), never as certainty. | "on propose qu'est-ce que ça peut être… et surtout quelle est la méthode qu'on recommande pour faire le diagnostic" |
| D16 | Two models: the current safe manuals-based one, and a riskier history-based one, first opened to a few expert mechanics who check it for hallucinations. | "à disposition de quelques mécaniciens experts pour qu'ils testent" |
| D17 | Start with **MIR (Quebec, work orders since 2014)** through **Alex Dumenne**. Hexagone / A-Tune and the US data (Samir Macarem, project manager) come later, likely November, after the go-live. Don't disturb Samir before then. | "Commençons avec MIR" |
| D18 | Don't mix fleets: filter by equipment type and region. Letting the user choose "Quebec / Canada / everything + manuals" is a nice-to-have, not needed now. | "on fait une IA pour Ford, on n'a pas envie d'avoir dedans Toyota" |

## Why (Pierre's goals)
- Close the gap between junior and senior mechanics ("expérience assistée").
- Cut costs. Diagnosis is the most expensive part: sometimes 5 parts get changed and only the 5th fixes the problem.
- Share knowledge across depots ("two depots away, someone solved it last year").
- Transdev-wide interest; Canada is ahead on this; the tool could be shared with the US once it's reliable.

## Risks Pierre named
- Hallucination on diagnosis: Greg can't judge it, so expert mechanics do.
- Data quality: the work orders were entered for history and finance, never for analysis ("garbage in"). A closed work order doesn't prove the diagnosis was right.
- Not a financial tool: it's separate from the zero-based budget work, even though both use the same MIR source.

## Facts about the CMMS systems
- **MIR:** Quebec CMMS, in service 10+ years; work orders since 2014. Alex Dumenne has access.
- **Hexagone (new name: A-Tune):** the West. A Canadian instance goes live on about Oct 5 (in "a week and a half"). The US instance's history is **not** migrated: millions of work orders. Alex Dumenne's team plans a data dump into a data lake, so they don't have to keep paying US licences.
- A third Canadian tool was mentioned; the name is unclear in the transcript (Ontario?). To confirm.
- Transit and paratransit are common to the US and Canada; school buses are Canada-only (Ontario, Quebec).

## Actions
| Who | What | When |
|---|---|---|
| Greg | See Alex Dumenne (office at the back, Seb's team; in on Tuesdays and Thursdays): "Pierre said I'll need you for access to the MIR database." | **Today (Thursday)** if possible |
| Greg | IT ticket for the paid search plan, approved by Pierre (draft: `1-boulon/docs/it-requests/2026-09-24-azure-search-plan.md`) | Today |
| Greg | IT ticket for MIR access (draft: `1-boulon/docs/it-requests/2026-09-24-mir-access.md`) | After talking to Alex |
| Henri | Put Greg in touch with Samir Macarem | Later (after the go-live) |
| Claude | Phase 2 plan (planner agent), decision records, test-script fixes, v2 fix | In progress |

## Open questions
- The sign-in question (relaxing it during the build) doesn't appear in the transcript. Did Greg ask it? What was the answer?
- Which Azure subscription or budget pays? Pierre approves the ticket, but the billing route isn't stated.
- An aside in the intern segment suggests Pierre, and maybe Henri, are at a seminar next week. The IT ticket needs Pierre's approval: submit it today.
- "Greg Boulon" in the transcript may be the transcription of "BOULON" (the project name). CLAUDE.md lists "Greg Boulon" as a former owner: check.
- The CMMS references removed from the agent's instructions on 09-22: their "revisit condition" is now in sight (Phase 2).
