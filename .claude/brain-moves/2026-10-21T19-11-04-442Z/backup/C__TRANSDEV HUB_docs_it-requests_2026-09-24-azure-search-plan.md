# IT request: Azure AI Search Basic + PDF-reading resource + one-time indexing budget (v5, 2026-09-24 ~16:55)

Approver: **Pierre Zivec** (surname confirmed by Greg 16:05). Evidence file for every region and compatibility fact: `docs/azure-region-check-2026-09-24.md`.

**Status: SENT by Greg on 2026-09-25, option A (all keys).** Waiting on IT. The ticket number and IT's replies will come from the morning email digest (`OneDrive - TRANSDEV\BOULON-inbox`). This file is the v5 draft: if the sent text still had the managed-identity lines, that's harmless, because option A works with keys either way.

**Version history:**
- **v5 (16:55).** Two changes:
  - Greg asked about the one-time cost, which is now in the same ticket, so no second ticket is needed.
  - Checking that cost on Microsoft's price list showed that **Document Intelligence (the PDF-reading AI) isn't sold in Canada East at all**: 0 price meters there, 13.8605 CAD per 1,000 pages in Canada Central. So billing PDF reading to `boulon-pilot-ai` (Canada East) isn't 100% safe even keyless. The ticket now asks for one pay-per-use AI resource in **Canada Central**, next to the search service. That satisfies every Microsoft rule (key and keyless). `boulon-pilot-ai` keeps the embedding and chat models.
- **v4 (16:15):** keyless billing to `boulon-pilot-ai`. Replaced by v5.
- **v3 (15:50):** region Canada East → Canada Central (no AI enrichment in Canada East).
- **v2 (13:45):** Phase 2 scope added; manual count 3,052.

**FR (to submit):**

Objet : Demande d'approbation – Azure AI Search Basic et ressources associées (projet BOULON, phases 1 et 2)

Bonjour,

Dans le cadre du projet BOULON (assistant de maintenance IA de Transdev Québec, sous la supervision d'Henri Eckern), je demande la création de deux ressources Azure et l'approbation d'un budget ponctuel d'indexation. Pierre Zivec a donné son accord de principe en réunion le 24 septembre et approuvera ce billet.

Ressources demandées (groupe de ressources existant **BOULON-PILOT-RG**, abonnement « Azure subscription 1 », le même que le pilote) :
1. **Service Azure AI Search, forfait Basic, région Canada Centre.** À la création, merci d'activer l'**identité managée affectée par le système** (System assigned managed identity).
2. **Ressource Azure AI services (Microsoft Foundry), type d'API AIServices, niveau S0, région Canada Centre.** Elle sert uniquement à facturer la lecture des PDF (Document Intelligence). Paiement à l'usage, **aucun frais mensuel fixe**. Merci d'attribuer à l'identité managée du service de recherche le rôle **Cognitive Services User** (Utilisateur Cognitive Services) sur cette ressource.

Les ressources existantes restent telles quelles : le compte de stockage **boulonpilotstorage** et la ressource **boulon-pilot-ai** (modèles d'IA déjà déployés).

Coûts :
- **Mensuel :** environ 112,42 $ CAD par mois au maximum pour le service Basic (Canada Centre, prix Microsoft du 24 septembre), facturé à l'heure, sans contrat. S1 coûterait 373,98 $ CAD par mois, sans besoin démontré.
- **Ponctuel (indexation des manuels) :** estimé à environ 650 $ CAD, avec un **plafond de 1 200 $ CAD**. Il s'agit surtout de la lecture des pages par Document Intelligence (13,86 $ CAD par 1 000 pages, deux passages par page : texte et images), plus l'extraction des images et les modèles d'IA (quelques dizaines de dollars). L'estimation porte sur environ 20 000 pages ; le plafond couvre jusqu'à environ 40 000 pages. Un essai sur un seul fichier mesure le coût réel avant l'indexation complète.
- **Alertes de dépenses :** 150 $ CAD par mois sur le service de recherche, et une alerte à 1 200 $ CAD sur le budget ponctuel.

Justification :
- Le service gratuit actuel est plein à 90 % avec 23 manuels. L'inventaire compte 3 052 fichiers, dont une bibliothèque de base de 150 à 300 manuels.
- **Portée évaluée, phases 1 et 2.** Manuels + un prototype MIR tiennent sur Basic (15 Go d'espace et 5 Go de vecteurs par partition, 15 index).
- **Pas de gaspillage si le projet grandit.** Microsoft confirme qu'un service Basic passe au forfait S1 **sur place**, sans reconstruction et sans changer d'adresse. Le forfait sera réévalué une seule fois, à la décision go/no-go.
- **Région Canada Centre :** selon la documentation Microsoft, Canada Est n'offre ni l'enrichissement par IA ni Document Intelligence, dont le projet a besoin pour lire les PDF. Canada Centre offre les deux, et les données restent au Canada.
- Le service gratuit reste en place jusqu'à ce que Basic réussisse tous les tests. Aucune autre ressource n'est créée sans approbation.

Greg Riley – Stagiaire, projet BOULON

**EN (gloss):**
- Two new resources in the existing resource group BOULON-PILOT-RG (same subscription as the pilot):
  - Azure AI Search Basic in Canada Central, with its system-assigned managed identity turned on.
  - An Azure AI services (Foundry) resource, API kind AIServices, S0, in Canada Central. It only pays for PDF reading, is pay-per-use with no fixed fee, and gets the Cognitive Services User role for the search service's identity.
- Storage and `boulon-pilot-ai` are unchanged.
- **Monthly:** up to CAD $112.42 (Basic, Canada Central), with a $150/month alert.
- **One-time indexing:** about CAD $650, with a **CAD $1,200 ceiling** and an alert at that amount. Most of it is Document Intelligence at CAD 13.86 per 1,000 pages, with 2 passes (text, and images). Image extraction and the AI models add a few tens of dollars. The estimate assumes ~20,000 pages; the ceiling covers ~40,000. A 1-file trial measures the real cost first.
- Why Canada Central: Microsoft lists neither AI enrichment nor Document Intelligence in Canada East. Canada Central has both, and data stays in Canada.
- Pierre approved it in principle on 09-24.

**One-time cost working (CAD, Azure Retail Prices API 2026-09-24, Canada Central):**
| Item | Unit price | ~20k pages (estimate) | ~40k pages (ceiling) |
|---|---|---|---|
| Document Layout, 2 passes | 13.8605 / 1,000 pages | 554 | 1,109 |
| Image extraction (Search) | 1.3861 / 1,000 images, assuming ≈1 image per page | 28 | 55 |
| Image descriptions, gpt-5-mini | ≈0.00076 per image (1,000 tokens in, 150 out) | 15 | 30 |
| Embeddings | text-embedding-3-small | <5 | <10 |
| **Total** | | **≈602, rounded up to 650** | **≈1,204, ceiling 1,200** |

Page count basis: the core-library estimate in `docs/manuals-inventory-2026-09-23.md` ($277 for one pass at 13.86/1,000 ≈ 20,000 pages; range 10k–40k). The exact page count is Friday's task and will be measured in the 1-file trial. If the real count would exceed the ceiling, index in stages or drop the second (image) pass for text-only manuals.

**When this ticket would change to S1:** Alex's numbers show a MIR history of more than about 300,000 work orders that must all be searchable from day 1. Even then, an in-place upgrade later works.
