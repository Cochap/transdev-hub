# MIR access (Quebec CMMS): talking points for Alex + IT ticket (draft, 2026-09-24)

> **SUPERSEDED 2026-09-29** by `docs/it-requests/2026-09-29-mir-questions-alex.md` (8 questions, French). No IT ticket is needed (access comes directly from Alex), and the privacy/Law 25 items never applied. Kept for history only; don't use.

## 1. What to say to Alex Dumenne (in person, today if he's in)
> « Salut Alex, je suis Greg, stagiaire sur BOULON, l'assistant IA de maintenance. Pierre m'a dit : "Je vais avoir besoin de toi pour accéder à la base de données MIR." L'idée : utiliser l'historique des bons de travail pour aider les mécaniciens à diagnostiquer les pannes. Est-ce que tu aurais 15 minutes pour m'expliquer comment la base est faite, et quel ticket TI je dois ouvrir pour avoir un accès en lecture seule ? »

Questions to ask him (write down the answers; 12 questions, from the Phase 2 plan):
1. What export format is possible (CSV, Excel, a database view, an API)? Is there a **read-only** access path?
2. Is there a field list and a data dictionary (what each field means)?
3. What volume: how many work orders per year since 2014, how many garages, how many vehicles?
4. Which fields are free text (driver complaint, mechanic notes, correction)? In which language?
5. Are there separate fields for **symptom / cause / correction**? Or failure, component or system codes (for example VMRS)?
6. How are vehicles coded (unit number, make, model, year, type: school bus, urban bus, coach)? Is there a unit → model table?
7. Are corrective and preventive work orders flagged separately? A road call vs a planned job?
8. Where are the parts replaced, labour hours and dates opened/closed?
9. Which fields hold names or employee IDs? Can they be removed **before** the export?
10. Can we get a small sample first (for example 1,000 corrective work orders, one site, one model)?
11. Can the export be refreshed later, and how often?
12. Is there a known data-quality issue (a migration break, codes that changed)?

## 1b. Extra questions for Alex (added 2026-09-24 after the scope review; these decide the Azure plan size)
13. **Total volume:** « Combien de bons de travail au total depuis 2014, et quelle part est corrective (réparations, pas l'entretien préventif) ? » *(The plan size depends mostly on this number.)*
14. **Size of one work order:** « Longueur moyenne du texte libre par bon ? Un bon a-t-il plusieurs lignes ou tâches ? »
15. **Attachments:** « Y a-t-il des pièces jointes (photos, PDF, formulaires numérisés) ? » *(If yes, reading them costs money and uses a lot more space.)*
16. **Where MIR runs:** « MIR est-il hébergé chez nous (serveur SQL interne) ou dans le nuage du fournisseur ? Existe-t-il déjà un extrait (budget, lac de données) ? » *(Azure can't read an in-house database directly; an in-house server would need an extra step, such as an export file or Data Factory.)*
17. **Daily changes:** « Combien de bons sont créés ou modifiés par jour ? Un bon fermé peut-il changer ? Y a-t-il une colonne "dernière modification" ? Les bons annulés sont-ils supprimés ? »
18. **Regions:** « Quels dépôts et régions sont dans MIR ? La région est-elle un champ ? »
19. **Other personal data:** « En plus des noms : numéros d'employé, noms de chauffeurs dans le texte, infos passagers (transport adapté), incidents, plaques ? »
20. **Where the extract lands:** « L'extrait peut-il être déposé directement dans un stockage Azure Canada Est, et pas sur un portable ? »
21. **Data owner:** « Qui est le propriétaire des données MIR et peut autoriser cet usage ? »

## 2. IT ticket (FR, to submit after talking to Alex; fill in what he says)
Objet : Demande d'accès en lecture seule – données MIR (projet BOULON)

Bonjour,

Dans le cadre du projet BOULON (assistant de maintenance IA de Transdev Québec, supervision : Henri Eckern), je demande un accès **en lecture seule** à un extrait des bons de travail de MIR, à la demande de Pierre. Personne-ressource : Alex Dumenne.

Objectif : évaluer si l'historique de maintenance peut aider au diagnostic des pannes (maintenance corrective).
Portée demandée : [échantillon / format convenu avec Alex].
Protection des données : les noms des employés seront retirés ou anonymisés avant toute analyse ; les données brutes restent dans l'environnement Azure de Transdev (région Canada) ; seuls des extraits anonymisés sont utilisés pour l'analyse, y compris par l'assistant IA de développement.

Merci,
Greg Riley – Stagiaire, projet BOULON

**EN (gloss):** Read-only access to a MIR work-order extract, requested by Pierre, contact Alex Dumenne. Purpose: test whether maintenance history helps diagnose breakdowns. Employee names removed or anonymized; raw data stays in Transdev's Azure (Canada region); only anonymized extracts are analysed, including by the AI development assistant (corrected 2026-09-24: the old wording "no data leaves Microsoft" was false, because Claude runs outside Microsoft).

Note: work orders contain employees' names = personal information (Quebec's Law 25). Anonymization is a precondition, not a detail.
