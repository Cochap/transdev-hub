# Project brief 551: "Assistant virtuel Greg Boulon" (Note de projet)

**Bottom line:** this is the project's founding document and now the source of truth. It sets 3 workshops in 3 provinces (15 users), 3 languages (FR, EN, ES), a 3-month licence horizon, and an estimated project cost of CAD 5,510.50 that has no Azure AI Search line.

Original scan (3 pages, no text layer): `docs/source-of-truth/2026-05-04-note-de-projet-551.pdf`. Read by Claude on 2026-10-07 from the scan; names and amounts were checked against the arithmetic of the budget table, but check them against the paper before quoting them outside the project. Where the scan is cut off, it says so.

## Header (page 1)
- Transdev "Projet de performance" (Performance project). Document: NOTE DE PROJET / PROJECT BRIEF. N/Ref **551**.
- Date: **4 May 2026**. Status: the field is partly cut off on the scan (reads "Initial...").
- Purpose of the document: formalise the project launch through a first approval ("GO"), established and sent by the project initiator, to present the project's main characteristics and give a global, structured view.
- **Project Sponsor (Responsable du succes du projet): Pierre Zivec.** **Project Manager (Chef de projet): Henri Eckern.**
- **Project team: Henri Eckern, Matteo D'Alena.**
- **Stakeholders:** provincial maintenance directors; maintenance teams across Canada.

## ASSISTANT VIRTUEL 'GREG BOULON' ('GREG BOLT' IN ENGLISH)
**Challenge.** Mechanics increasingly struggle to reach technical information: it is fragmented across many sources and often hard to use quickly. That can slow diagnostics, raise vehicle downtime and create risks of error. The project should better use and structure existing knowledge to steer teams toward reliable diagnostic leads, improve workshop productivity and strengthen the quality of interventions.

**Objectives.** Give mechanics an AI agent that supports their daily diagnostic and maintenance work. It lets them quickly find the relevant information from **manuals, procedures and histories (historiques)** and guides them to diagnostic leads suited to the situation. Reduce search and analysis time, speed up decisions in the workshop and improve the overall quality of work by using technical knowledge already in the organisation.

**Scope (perimetre).** Maintenance workshops and their technicians in these zones:
- Atelier de **BELOEIL (QC)**: 5 users
- Atelier de **SUDBURY (ON)**: 5 users
- Atelier de **KITIMAT (BC)**: 5 users

**Deliverables.** The main deliverable is an AI agent named **Greg Boulon (Greg Bolt in English)**, **integrated into existing Office tools**. It relies on technical knowledge available in digital form (manufacturer manuals, PDF documents, procedures and so on) to answer mechanics' questions simply and operationally. It is available in **French, English and Spanish**.

**Approach and feasibility.** Feasible by using Copilot Studio capabilities to structure and exploit the existing technical knowledge.

## Page 2
**Dependencies / constraints.** Depends strongly on the availability and quality of information (manuals, procedures, histories) in digital form. Needs access to the tools (Copilot Studio) and the licences. Can be deployed progressively, integrating with current tools and enriching the knowledge base over time.

**KPI and performance measurement (ICP):**
- Agentic evaluation rate: objective **95% confidence** (Taux d'evaluation agentique).
- Usage rate: objective **7 requests per location per day** ("DLR" as printed).
- Self-analysis quality: objective **1 self-analysis per request (positive)**. The meaning of "auto-analyse" is not explained in the brief (Unknown).
- Impact if not delivered: **Low** (Faible).

**Estimated costs and budget (all amounts in CAD).** Note on the sheet: 1 MS Copilot credit = CAD 0.01362.
| Line | Amount (CAD) |
| --- | --- |
| MS Copilot Studio licence, Creator (1 x 3 months) | 600.00 |
| MS Copilot credits driven by knowledge (tenant graph rounding) | 1,100.00 |
| MS Copilot credits driven by knowledge (non-tenant, files) | 20.00 |
| MS Copilot credits driven by agent tools | 250.00 |
| MS Copilot credits driven by agent flows | 15.00 |
| 10% overspend allowance ("cost control is very opaque") | 198.50 |
| Estimated taxes (QST/PST) | 327.00 |
| **Estimated cost of software** | **2,510.50** |
| Kiosks or equipment for the user experience ("to be defined as placeholder") | 3,000.00 |
| **Estimated cost of hardware** | **3,000.00** |
| Time spent (9 days FTE + 9 days FTE intern) | N/A |
| **Estimated project cost** | **5,510.50** |
The arithmetic checks: 600 + 1,100 + 20 + 250 + 15 = 1,985; plus 10% = 2,183.50; plus taxes 327.00 = 2,510.50; plus 3,000 = 5,510.50.

**Planning phases:**
1. Collect the digital documentation of all the workshops concerned (2 weeks)
2. Launch the agent's knowledge training (1 week)
3. Trials and proof of the self-analysis quality (1 week)
4. Deployment to the test zones (1 week)
5. Trial and quality-proof phase (4-6 weeks)
6. Lessons learned (REX)
No calendar dates are given.

**Risk assessment reference:** see Annex 1; see risk sheet "551 GREG BOULON" (that sheet was not provided). Related programs: MS Teams, MS Copilot, MS Copilot Studio. Interdependencies: none.

## Page 3
- **Assessment of IT/IS/BI involvement level:** Licence acquisition and management: **Sebastien Boudrias**. Licence management: IT. Rest: TBD.
- **Annex 1, project risks** (heat map and table, generic template; sheet 551 not provided). Critical categories: project resourcing gaps (project team experience High, project manager availability High, familiarity with the team High, team skills High); stakeholder engagement (communication approach High; commitment and sponsor advocacy Low); external risk (third-party vendors, regulatory, macroeconomic, political, technology: rated Low to Medium). Not critical: project definition; project complexity (level of technology change rated High, the rest Low to Medium).

## What changes for BOULON (Claude's reading, 2026-10-07)
| # | Finding | Effect |
| --- | --- | --- |
| 1 | **"Greg Boulon" is the assistant's name** (Greg Bolt in English), not a previous project owner | CLAUDE.md corrected; the old note in the log is superseded |
| 2 | **Scope is 3 workshops, 3 provinces, 15 users**: Beloeil (QC), Sudbury (ON), Kitimat (BC) | Our measured library (131,756 pages) is the Quebec Manuels folder only. Phase 1 of the brief says collect the documentation of ALL concerned workshops; nothing in the project files shows the Sudbury and Kitimat documents were collected. The fleet-list question must cover all three sites |
| 3 | **Languages: French, English and Spanish** | Spanish is not tested anywhere; the English name is "Greg Bolt" |
| 4 | **The brief's budget (CAD 5,510.50) has no Azure AI Search line**, and its software horizon is 3 months | Ticket 77048 (Basic, about CAD 112/month) and the one-time reading (about CAD 2,400 to 4,200, estimates) sit outside it. The project's own "CAD 5,000 budget" note (Constitution) differs from 5,510.50. A budget conversation with the sponsor is needed |
| 5 | **Usage KPI: 7 requests per location per day** | About 21 questions a day for 3 sites, about 630 a month: under the semantic ranker's 1,000 free requests, so search serving cost is negligible. The cost is ingestion, not use |
| 6 | **KPIs: 95% agentic evaluation confidence; self-analysis** | Our gate targets (0 unsupported numbers, 100% cited, 95% correct "I do not have that", 85% correct) should be mapped to these; "self-analysis" needs a definition |
| 7 | **Histories (historiques) are in the objective** | Tier 2 is part of the original scope. Greg parked it on 2026-10-06; that stays his call |
| 8 | **Delivery inside existing Office tools** (Teams, Copilot) | Channel and sign-in choices follow from that |
| 9 | **People**: Sponsor Pierre Zivec; Project Manager Henri Eckern; team Henri Eckern and Matteo D'Alena; licences Sebastien Boudrias | Greg Riley is not named in the brief |
| 10 | **Planning**: 2 + 1 + 1 + 1 + (4-6) weeks, then lessons learned; no calendar dates | Greg's internal dates (plan-to-oct16) are his own |
