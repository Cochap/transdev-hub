# Resume section: Transdev Canada (draft v1, 2026-10-07)

Built with the `resume-tailoring` skill (varunr89/resume-tailoring-skill, 766 stars, MIT, markdown only, installed in `.claude/skills/resume-tailoring`). Its rule: truth-preserving. Reframe and emphasize, never invent.

**Status:** the original job posting was not in the project files and not found online. Bullets are written from your real work. When you paste the posting, I re-tune the keywords and ordering.

## Paste-ready section

**Transdev Canada** | Quebec | Sep 2026 to present (co-op internship 2 of 2, BTM program)

**Performance Intern, Maintenance Operations** (primary title)
*AI Maintenance Systems Lead: BOULON project* (complementary role, same internship)

- Built BOULON, a bilingual AI assistant that answers mechanics' maintenance questions only from Transdev's own manuals, with the source cited (Microsoft Copilot Studio + Azure AI Search). Replaced an unguarded prototype that quoted internet parts sellers.
- Indexed 23 technical manuals (2,250 searchable passages, diagrams included). Cut the search failures I tracked from 11 (early versions) to 5 (final versions), none of them wrong agent answers.
- Designed and ran a 111-test evaluation record plus a 41-question golden set (41/41 correct meaning-based retrieval) and an automated citation checker that validates all 2,250 passages and 23 manual links. Every change gets re-tested before release.
- Diagnosed why 4 successive approaches failed (web-search leakage, wrong-manual answers, hand-typed lookups that could not scale) and moved the project to retrieval-augmented generation, in 9 working days.
- Prepared the pilot for 3 maintenance workshops (Beloeil QC, Sudbury ON, Kitimat BC; 5 users each; French, English, Spanish) against project KPIs of 95% evaluation confidence and 7 requests per site per day.
- Wrote the cost case and approval package for the project sponsor (about CAD 102/month search tier; project estimate CAD 5,510.50), then the IT request for Azure resources. Defined spending alerts and test-gated rollout.
- Scoped Phase 2: diagnostic help from maintenance work-order history in the company's CMMS, in coordination with the sponsor and the data owners.
- Reported weekly to the project manager and sponsor, with dated decision logs and plain-language reports for non-technical readers.

**Skills line to add:** Retrieval-augmented generation (RAG), Azure AI Search, Microsoft Copilot Studio, Power Automate, prompt and agent evaluation, test design, CMMS/maintenance data, technical documentation, stakeholder reporting, cost-benefit analysis.

## Why the second title is honest
Both lines sit under one employer and one internship. "AI Maintenance Systems Lead" names the project function, not a separate job. Keep it as a sub-line, as above. Do not list it as a second employer or a full-time title.

## Verify before sending (each came from project docs, not the posting)
| Claim | Source | Check |
|---|---|---|
| 23 manuals, 2,250 passages | 1-boulon/docs/report-copy-final.md, continuity log 1.5 | Confirm the count is still current after the Basic rebuild |
| 111 tests, 11 to 5 failures | 1-boulon/docs/test-ledger.md | Failures were search probes, not agent answers |
| 41/41 golden set | continuity log P1-5 (2026-10-06) | This is the meaning-based (semantic) mode. Keyword mode was 30/41 |
| 9 working days | report-copy-final (Sep 15 to 23) | OK |
| KPIs, 3 sites, languages | 1-boulon/docs/project-brief-551.md | These are targets, not results. The pilot is not launched |
| CAD figures | brief 551, report copy | Is the budget figure OK to show externally? Your call |

## Not claimed (no evidence yet)
No money saved, no hours saved, no mechanic adoption numbers. Add them after the Oct 14 soft launch / Oct 16 gate with real counts.

## Open decisions for you
1. Paste the original posting (text or link) so I can match its wording.
2. French version? The skill can produce one.
3. Which resume file should this merge into? Share it, or I build a one-page layout (DOCX/PDF).
