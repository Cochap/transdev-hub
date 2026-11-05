# BOULON — Proposition de plan de projet (squelette v0.1) — BROUILLON INTERNE

> **Remplacé par la version formelle 1.0 :** `1-boulon/docs/plan-projet-boulon-poc-scolaire-v1.0.docx` (2026-11-05). Ce brouillon est conservé pour la traçabilité : chaque fait y renvoie à son repère dans la transcription. Ne pas diffuser.

**Assistant virtuel Greg Boulon : preuve de concept « véhicules scolaires »**
Version 0.1, 2026-11-05. Rédigé par Grégory Riley, à affiner en duo avec Dominique (consultant).
Base : réunion du 2026-11-03 (Pierre Zivec, Henri Eckern, Alex Dumenne, Sébastien Boudrias, Dominique, Grégory). Transcription : `2-projects/transcripts/Quartier DIX30 2.txt`, avec les repères `[h:mm:ss]` cités ci-dessous.
Document de référence : note de projet 551 du 4 mai 2026 (`1-boulon/docs/project-brief-551.md`). Ce plan ne la remplace pas : il propose des ajustements, listés à la section 12.

> **Statut :** proposition. Tout ce qui n'a pas été dit en réunion est marqué **Proposition**. Les chiffres sont marqués **Mesuré**, **Estimation** ou **Inconnu**.

---

## 1. Contexte et besoin
- **Principale perte d'efficacité en atelier : le diagnostic.** Il y a des mauvais diagnostics et des pièces changées pour rien. C'est un constat d'expérience, sans mesure `[0:40:14]`.
- Il n'existe **aucune mesure de la qualité des diagnostics** des mécaniciens aujourd'hui `[0:56:16]`. La situation de référence est donc **Inconnue**.
- **Accès à la documentation :** les mécaniciens oublient de consulter les documents en pensant savoir. Si on exige la consultation, il faut fournir l'outil (« comme une checklist d'aviation ») `[0:56:55]`.
- **Situation actuelle :** l'essai a été lancé « en freestyle » sur Copilot Studio, parce que l'outil est intégré à Office et que les manuels sont sur SharePoint `[0:21:00]`.
  - L'agent actuel répond sur le contenu des manuels indexés, avec le document exact et la page exacte `[0:22:25]`. Le plafond de l'index gratuit (50 Mo) a été atteint `[0:24:24]`. **Mesuré :** 23 PDF indexés (725 pages) sur 2 785 fichiers uniques de la bibliothèque (131 756 pages). En réunion, on a dit « environ 50 » manuels sur « 900 » `[0:22:19]`.

## 2. Objectifs
- **Objectif ultime :** aider les mécaniciens, juniors d'abord, à gagner du temps et de la qualité sur le diagnostic. Il s'agit de « bridger » le junior vers le senior `[0:08:13]` `[0:40:14]`. L'outil est une **aide**, il ne remplace pas l'expérience `[0:35:24]`.
- **Objectif de cette phase :** une **preuve de concept v0.1** sur les véhicules scolaires du Québec, fondée sur la documentation, dans Copilot Studio `[1:06:09]` `[1:07:59]`. Elle doit fonctionner, même imparfaitement, avant la **présentation de groupe de février** `[0:49:46]`.
- **Objectif d'apprentissage :** « apprivoiser les projets IA ». On commence petit, on mesure, puis on élargit `[0:47:51]` `[0:26:15]`.

## 3. Portée
| Dans la portée (v0.1) | Hors portée pour l'instant |
|---|---|
| Véhicules **scolaires** (accord de Pierre `[0:46:05]`) ; Québec d'abord (récapitulatif de Dominique `[1:06:45]`) | Maintenance préventive (valeur jugée douteuse, flotte trop diversifiée) `[0:41:13]` |
| **Documentation** : manuels, procédures, guides de dépannage `[1:07:59]` | Bons de travail / historique MIR : **phase 2** `[0:52:36]` `[0:55:21]` |
| Réponses citées : document et page ouvrables par le mécanicien `[0:20:14]` | Véhicules électriques : piste séparée, plus tard `[0:47:01]` |
| Une langue d'abord, puis la traduction `[1:00:42]` `[1:03:33]` | Base de données américaine : « dans un deuxième temps » `[0:43:02]` |
| | Urbain, autocar et autres familles : après la preuve de concept `[0:27:37]` |

## 4. Livrables
1. **Agent v0.1 « scolaire »** dans Copilot Studio, avec citations document + page.
2. **Jeu de questions de test** (« golden set ») scolaire, avec des questions de mécaniciens `[0:50:04]` et des questions où l'agent doit répondre « je n'ai pas l'information ».
3. **Tableau de bord des tests** : résultats par cycle, régressions visibles `[1:14:44]`.
4. **Glossaire du jargon mécanique** (ex. « brake », « brakes », « brk ») pour orienter le modèle `[1:00:00]` `[1:04:39]`.
5. **Scripts d'ingestion** : découpage des PDF, tags par modèle, année et composant, rechargement automatique des manuels nouveaux ou mis à jour `[0:15:09]` `[0:31:54]`.
6. **Rapport de preuve de concept** pour la présentation de février.

## 5. Méthode : cycles itératifs
Il faut se fixer une cible de qualité ; elle n'est généralement pas atteinte aux premiers cycles. À chaque cycle, on regarde quelle composante améliorer `[0:59:16]` :
- **recherche** (ramène-t-elle des passages non pertinents ?) ;
- **lecture des PDF** (les tableaux et images sont-ils mal interprétés ?) ;
- **vocabulaire** (jargon, abréviations).

Chaque cycle comprend les étapes suivantes (**Proposition**) :
1. ajuster une seule composante ;
2. relancer le jeu de test ;
3. comparer au cycle précédent ;
4. consigner le résultat dans le tableau de bord.

Au **seuil de 75 % de réussite**, on découpe les résultats par système (freins, moteur, etc.) pour cibler les faiblesses `[0:48:28]`.

**Première étape suggérée :** faire analyser quelques PDF par un humain (texte, tableaux, images) avant d'automatiser `[0:30:00]`.

## 6. Mesure du succès
Mesurer d'abord la **sortie**, ensuite les étapes internes `[1:13:49]`. Il y a deux types de métriques, subjectives et automatisables ; les deux sont utiles `[1:14:13]`.

| Métrique | Type | Source | Cible |
|---|---|---|---|
| Bonnes / mauvaises réponses sur le jeu de test (ex. « 40 bonnes, 37 mauvaises ») | Automatisable | Tableau de bord `[1:14:30]` | 75 % pour le découpage par système `[0:48:28]` ; cibles Gate B ci-dessous (Proposition) |
| Réponses citées (document + page) | Automatisable | `check-citations.js` (existe) | 100 % (Gate B) |
| Valeurs de sécurité non appuyées par un document | Automatisable | Jeu de test | 0 (Gate B) |
| « Je n'ai pas l'information » quand c'est hors corpus | Automatisable | Jeu de test | 95 % (Gate B) |
| Avis des seniors : « efficace / pas efficace », « on le savait déjà » | Subjective | Mécaniciens seniors, boucle de retour, sondage Microsoft 365 (oui / non / en partie) `[0:34:08]` `[0:36:27]` `[0:54:22]` | Inconnu : à définir en séance de travail `[1:13:55]` |
| Grille de test diagnostic : symptôme → réponse du senior vs réponse de l'IA (vrais/faux positifs) | Mixte | Grille de performance `[0:36:41]` | Phase 2 |

- **Note :** la note 551 fixe un taux d'évaluation agentique de 95 %. Le seuil de 75 % évoqué en réunion sert à déclencher le découpage par système ; il ne remplace pas la cible de 95 %. À confirmer avec Pierre (section 12).
- **Méthodes de test terrain :**
  - **Journée à Saint-Jean** avec l'équipe de Mario et un ou deux mécaniciens spécialisés en autobus, dès que le modèle est prêt `[0:50:37]`.
  - **Rejouer des cas déjà résolus**, retirés du système, pour voir si l'agent les retrouve `[0:51:19]`.
  - **Comité technique** d'environ 5 mécaniciens, 2 par province, qui interroge le système régulièrement `[0:52:15]`. La fréquence est à confirmer : « une heure tous les trois jours ? »

## 7. Phases (sans dates calendaires sauf février)
Les durées sont comptées en semaines **après le déblocage Azure** (S+1 = première semaine après la levée du blocage n° 1 de la section 10).

| Phase | Contenu | Durée (Estimation) | Condition de sortie |
|---|---|---|---|
| **P0 Cadrage** | Affiner ce plan en duo ; valider les métriques (séance de travail) `[1:13:55]` `[1:15:01]` | 1 à 2 semaines, en parallèle du déblocage | Plan approuvé par Pierre |
| **P1 Fondations** | Choisir le corpus scolaire ; analyse humaine de quelques PDF ; chargement ; premiers termes du glossaire ; questions de mécaniciens | S+1 à S+3 | Corpus chargé, agent répond |
| **P2 Cycles v0.1** | Cycles itératifs sur le jeu de test (section 5) | S+3 à S+7 | Seuil de 75 % atteint, puis découpage par système |
| **P3 Validation par les seniors** | Journée Saint-Jean, comité technique, cas rejoués ; les seniors valident **avant** tout accès des juniors `[0:37:18]` `[0:38:09]` | S+7 à S+10 | Retour senior favorable |
| **P4 Présentation de groupe — février (ferme)** `[0:49:46]` | Démonstration et rapport de preuve de concept | Date exacte : Inconnue | — |
| **P5 Phase 2 : historique** | D'abord la recherche d'**interventions similaires**, interprétées par le mécanicien `[0:18:14]` ; filtre par classe et numéro de véhicule `[1:09:18]` | Après février | Décision après P3 |

**Lecture du calendrier (Estimation) :**
- P1 à P3 prennent environ **7 à 10 semaines après le déblocage Azure**.
- Février tient donc si le déblocage arrive environ 10 semaines avant la présentation. **Le blocage Azure est le chemin critique.**
- Les durées s'inspirent de la note 551 : 2 semaines de collecte, 1 de chargement, 1 d'essais, 1 de déploiement, 4 à 6 d'essai.
- L'échéance « fin du mois ? » pour le prototype n'a pas été fixée en réunion `[0:49:23]`.
- **À confirmer avec Pierre :** il semble dire « pas 12 mois sur le scolaire : un mois sur le scolaire, et après l'électrique » `[0:46:50]` (passage réécouté, encore peu clair). Il a aussi dit qu'après le Québec, il faudra ouvrir le scolaire à l'Ontario, parce que le scolaire au Québec est limité en taille `[0:51:55]`. Ces deux points changent la suite après février.

## 8. Architecture (pistes, à valider)
- **Un point d'accès unique** et un **coordonnateur** qui oriente vers des **sous-agents spécialisés** : diagnostic vs réparation, puis par famille ou par composant `[0:09:22]` `[0:29:41]`.
  - Pierre met en garde : ne pas trop segmenter le diagnostic, sinon il y aura trop peu de données par segment `[0:13:37]`.
- **Filtrage par véhicule :** utiliser la liste des véhicules et de leurs composantes pour ne pas suggérer un voyant ou un composant absent du modèle `[0:15:28]` `[0:16:40]`.
- **Langue :** la langue en métadonnée ; une langue d'abord, la traduction ensuite `[1:04:07]`.
- **Base vectorielle :** Azure AI Search aujourd'hui. Un ordinateur dédié GB10 (128 Go) est une piste pour tester et déplacer la base une fois le modèle Copilot fonctionnel `[0:23:07]` `[1:10:00]`.

## 9. Parties prenantes et gouvernance
| Rôle | Personne |
|---|---|
| Commanditaire (sponsor) | Pierre Zivec |
| Chef de projet | Henri Eckern |
| Réalisation (stage) | Grégory Riley |
| Accompagnement IA / méthode | Dominique (consultant) |
| Données MIR, expertise | Alex Dumenne |
| Licences | Sébastien Boudrias |
| Tests terrain | Équipe de Mario (Saint-Jean) ; comité technique (2 mécaniciens par province) |

- **Cadence de suivi :** **30 minutes par semaine** `[1:12:39]`. Une séance plus longue est possible dans deux semaines, selon l'avancement `[1:13:16]`.
- **Accompagnement du changement :** les seniors ont une « crainte légitime ». Il faut présenter l'outil comme une aide `[0:38:16]`.

## 10. Blocages actuels (au 2026-11-05)
| Blocage | Preuve | Ce qu'il faut |
|---|---|---|
| L'abonnement Azure du pilote est **désactivé** (crédit gratuit expiré) ; la recherche est arrêtée | Vérifié le 2026-11-04 (`continuity-log.md`) | Réactiver l'abonnement ou utiliser un abonnement de l'entreprise |
| Le ticket TI **77048** (niveau Basic) vise ce même abonnement | `1-boulon/docs/it-requests/2026-09-24-azure-search-plan.md` | Rediriger le ticket |
| Un **seul manuel scolaire** dans SharePoint : IC (PB105 / Leeds), environ 1 567 pages | Mesuré, scan du 2026-11-04 | L'index gratuit (50 Mo) ne le contient pas en entier (environ 136 Mo, Estimation) : échantillon ou niveau Basic |
| Les manuels **Blue Bird et Thomas** (135 des 193 véhicules scolaires standard, Mesuré) sont sur les portails des fabricants, avec connexion | `mvp-school-bus-2026-11-03.md` | Décision d'accès. Pierre a cité l'exemple « Thomas 2016, freins, page 712 » `[0:57:48]` |
| L'Ontario n'a pas de documentation numérique `[1:01:06]` | Réunion | Hors v0.1 (Québec d'abord) |

## 11. Risques principaux
| Risque | Probabilité | Impact | Réponse (Proposition) |
|---|---|---|---|
| Blocage Azure non levé | Élevée | Rien à démontrer ; février menacé | Décision 1 de la section 12 ; c'est le chemin critique (section 7) |
| Corpus scolaire limité à IC (environ 55 des 193 véhicules, Estimation) | Élevée | La démonstration ne couvre pas Thomas / Blue Bird | Décider de l'accès aux portails ou assumer le périmètre IC |
| Questions de test trop faciles | Moyenne | Fausse confiance | Questions de mécaniciens et cas rejoués |
| Qualité des données (PDF, tableaux, jargon) | Moyenne | Mauvaises réponses | Analyse humaine des PDF, glossaire, cycles |
| Seniors : « on le savait déjà » | Moyenne | Valeur perçue nulle pour eux | Mesurer aussi l'accès documentaire (sécurité, véhicules rares) `[0:58:23]` |
| Historique bruité en phase 2 | Moyenne | Pollution des réponses | Phase 2 séparée, interventions similaires seulement |

## 12. Décisions demandées et écarts avec la note 551
**Décisions demandées :**
1. **Pierre :** réactiver l'abonnement Azure du pilote, ou rediriger le ticket 77048 vers un abonnement de l'entreprise ? Approbation de la dépense.
2. **Pierre :** pour février, accepte-t-on un prototype sur les manuels IC seulement, ou ouvre-t-on l'accès aux manuels Thomas / Blue Bird ?
3. **Pierre / Henri :** la fin du mois est-elle une échéance pour le prototype, ou février est-il la seule date ferme ?
4. **Tous :** les métriques de sortie et leurs cibles (séance de travail avec Dominique).
5. **Tous :** quelle langue d'abord ? En réunion, il a été dit qu'il est important de supporter le français directement `[1:00:32]`, mais aussi de commencer dans une seule langue, puis d'ajouter la traduction `[1:00:42]`. La note 551 prévoit français, anglais et espagnol.

**Écarts avec la note 551 (proposés, non décidés) :**
| Note 551 | Réunion du 2026-11-03 |
|---|---|
| 3 ateliers : Beloeil, Sudbury, Kitimat | Preuve de concept scolaire, Québec d'abord ; essai terrain à Saint-Jean |
| Français, anglais, espagnol | Une langue d'abord, puis la traduction |
| Taux d'évaluation agentique de 95 % | Seuil intermédiaire de 75 % pour découper par système |
| Manuels et historiques ensemble | Manuels d'abord (v0.1), historique en phase 2 |
| Budget de 5 510,50 $ CA, sans ligne Azure AI Search | Non discuté : à revoir avec la décision 1 |

## 13. Approbation
| Rôle | Nom | Décision | Date |
|---|---|---|---|
| Commanditaire | Pierre Zivec | | |
| Chef de projet | Henri Eckern | | |
