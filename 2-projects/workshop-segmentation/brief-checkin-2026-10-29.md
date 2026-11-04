# Brief — check-in segmentation avec Henri et Pierre (jeu. 2026-10-29, après-midi)
Sources : `5-brain/handoffs/2026-10-28-eod-handoff.md`, `5-brain/logs/eod/2026-10-28/_digest.md` et extrait `017011e7.md` (propositions et réponse de Pierre), `2-projects/workshop-segmentation/project-status.md`, `cloud-repo/results/01` à `04`. Positions de Greg du 2026-10-29 (matin) intégrées.

## Le but en une ligne
Faire valider **le sens** (conditions difficiles et complexité vont dans le même sens), **clarifier la complexité** avec Pierre, et **ouvrir la discussion sur le stock** avec un plan concret.

## Ordre du jour (suit la « relecture recommandée » du compte rendu, section 13)
1. Valider la séparation segment / maturité et les 3 livrables (2 min).
2. Valider la **liste des inputs** : `cloud-repo/results/06-dictionnaire-inputs.md`.
3. Le sens du modèle, la complexité, le stock : points 1 à 3 ci-dessous, chiffres dans `cloud-repo/results/05-scenarios-2026-10-29.md`.
4. Les **cas de référence** pour fixer les limites (`05`, section 7).
5. Suite : responsables, HSE, calendrier. Corrections du compte rendu dans `compte-rendu-v0.2-corrections.md`.

## Ouverture (à dire tel quel)
> « On a passé le classeur de scoring au peigne fin. On a trouvé des erreurs de formule, on a une v2 corrigée et plus stable, et on a une position claire sur le sens du modèle. Il reste à régler le stock ensemble. »

## Ce qu'on a fait (3 points)
1. **Analyse du classeur** (`results/01`) : 5 erreurs concrètes.
   - Le score « propriétaire de flotte » lit la ligne suivante (Lens, Metz faux ; aucun dépôt canadien touché).
   - L'onglet Test n'est pas relié à Inputs (Beloeil et Eguilles diffèrent déjà).
   - Le drapeau « inclure » est ignoré : Ottawa, marqué « non », sort quand même S3.
   - Une valeur manquante donne 1 sans avertissement.
   - L'onglet Stocks est mélangé (valeurs pas alignées sur les dépôts).
2. **Critique de la grille de maturité** (`results/02`) : **71 des 76 questions** sont identiques pour S2 et S3 ; aucune règle de médaille ; les 9 questions HSE sont cochées pour tous les segments.
3. **Modèle v2** (`results/03`, guide `results/04`, classeur v2) : sur 108 essais de stabilité, la v2 recommandée a **2 bascules fréquentes** contre **4** pour l'original.

## Point 1 — Conditions difficiles : notre position (décidé par Greg)
**Plus les conditions sont difficiles, plus le segment est bas** (attentes moins hautes). C'est aussi ce qui a été dit en réunion (« Ici, il fait moins 25 l'hiver... »).
> « Un atelier qui travaille dans une tornade ne peut pas avoir les mêmes attentes qu'un atelier dans des conditions idéales. Donc conditions plus dures, segment plus bas. »

À savoir avant d'y aller : les segments cibles saisis dans le classeur penchent dans l'autre sens (sans stock, 9 dépôts sur 20 collent avec « plus bas », 13 sur 20 avec « plus haut »). Mais le classeur lui-même dit que chaque dépôt a saisi sa cible « selon sa compréhension » : **ce sont des auto-évaluations**, pas une référence.

Piège de vocabulaire : le classeur et le compte rendu disent « segment 3 = complexe ». Préciser : complexe veut dire **l'organisation qu'on attend de l'atelier**, pas les conditions qu'il subit.

## Point 2 — Complexité : clarifier (Pierre a probablement mal compris)
Pierre a répondu « oui… pas si simple » à calculer. Le calcul est en fait direct :
- **Parc plus vieux = plus complexe = segment plus bas.**
- **Plus de modèles = plus complexe = segment plus bas.**
- Notre seul changement : on garde **le signal le plus complexe des deux**, pour qu'un parc jeune ne cache plus 25 modèles.
> « La complexité, c'est simple : plus le parc est vieux ou plus il y a de modèles, plus c'est complexe, et plus le segment descend. On retient juste le pire des deux. »

C'est le même sens que les conditions difficiles : tout ce qui rend le travail plus dur baisse les attentes.

## Point 3 — Stock : nouvelle lecture de la réponse de Pierre
**Ce qu'il a écrit :** « je suis pas sûr, j'aime pas ce paramètre, on va s'en reparler… la valeur de stock a des facteurs exogènes comme la situation géo, le lead time pour se faire livrer ».

**Ma lecture d'hier (à corriger) :** « stock par bus en attente, on revient au stock original ». C'était une erreur : Pierre ne compare pas « par bus » et « total ». Il doute du **stock lui-même comme critère**, quelle que soit l'unité. Revenir au total garderait le paramètre qu'il n'aime pas, en plus du double comptage de la taille.

**Ce qu'il dit vraiment :** la valeur du stock dépend surtout de choses que l'atelier ne contrôle pas. Un atelier éloigné, avec de longs délais de livraison, doit garder plus de pièces. Un gros stock ne veut donc pas dire un atelier plus grand ou mieux équipé.

**Plan d'action proposé :**
1. **Ne rien changer au classeur avant la réunion** (pas de retour au stock original).
2. **Proposer en réunion :** retirer le stock du calcul des Ressources (Ressources = techniciens + baies), et garder le stock sur la fiche d'identité comme **information de contexte**, avec la situation géographique et le délai de livraison.
3. **Montrer l'effet chiffré** (fait, `results/05`) : sans stock, seulement 3 dépôts changent, et **Châteauguay passe en S1, exactement ce que la réunion attendait** (faute de place). Le stock douteux de Kelowna n'a plus d'effet.
4. **Si Pierre veut garder un indicateur de pièces :** chercher un critère qui dépend de l'atelier, par exemple le taux de rupture de pièces. À confirmer : on ne sait pas si cette donnée existe.

> « Pour le stock, je pense que tu as raison : sa valeur dépend surtout de la géographie et des délais, pas de l'atelier. On propose de le sortir du calcul et de le garder comme info sur la fiche. »

Déjà acquis : **plafond techniciens** approuvé par Pierre (« avoir de la place sans mécaniciens ne sert à rien »).

## Point 4 — Les limites 60 / 70 : les fixer avec des cas de référence
Avec notre sens, **6 dépôts sur 20 tombent pile sur 60 ou 70**, dont Beloeil et Kelowna. Au moindre changement de poids ou de limite, ils changent de segment. Une échelle continue ne règle pas le problème (testé).
> « Plutôt que de choisir les limites nous-mêmes, on propose de fixer ensemble quelques ateliers de référence, puis de placer les limites pour qu'ils tombent au bon endroit. »

Cas de référence tirés de la réunion : Châteauguay S1, Saint-Jean S2, Drummondville S2, Colombie-Britannique S3 (à confirmer), East Angus petit. **Demander les données** de Saint-Jean, Drummondville et East Angus.

## Point 4b — Le cercle des cibles (conseil ECC, `warroom-2026-10-29.md`)
Proposer 3 colonnes : **segment calculé / segment revendiqué / décision finale (raison, qui)**. Une dérogation est signée par Pierre, d'au plus un segment, et comptée. Un dépôt voulu S3 sans l'équipement S3 reste au segment calculé, avec le drapeau « S3 revendiqué, non atteint ». Critères d'équipement cumulatifs : v2 (aucun champ aujourd'hui).
> « Le modèle calcule, Pierre tranche, et chaque écart est écrit. Un atelier qu'on veut en S3 sans l'équipement, on le note comme objectif, pas comme segment. »

## Point 4c — La vision finale : segment et médaille sur une seule échelle (`cloud-repo/results/07-systeme-complet-segment-et-medaille.md`)
Le test sur les 3 audits d'exemple montre que **le même atelier obtient un meilleur score en S3 qu'en S1** : les deux systèmes ne se parlent pas.
Proposition : chaque question a 3 niveaux (pratiqué, maîtrisé, piloté) ; le segment fixe le niveau attendu (cumulatif) ; la médaille mesure l'atteinte de ce niveau, avec une porte sécurité ; **l'or d'un segment ≈ le bronze du suivant**. Un gestionnaire qui veut S3 le prouve par un audit S3.
> « On propose une seule échelle : le segment dit quelle barre, la médaille dit à quelle hauteur on la passe. Un atelier or en S1 est déjà en route vers S2. »
Demander : un pilote sur un domaine (Planification) avec Pierre et 2 ateliers canadiens.

## Point 5 — Inputs : deux champs à trancher
Le type de service et le mix énergétique sont marqués « à utiliser » dans le classeur, mais aucune formule ne s'en sert. Le mix énergétique pourrait compter dans la complexité (plusieurs filières = plusieurs compétences).
> « On garde ou on enlève le type de service et le mix énergétique ? »

## À confirmer (si le temps le permet)
- Beloeil : 178 bus ou environ 80 ? (À 80 bus, son score passe de 60 à 68 : même segment, mais plus solide.)
- Kelowna : stock de 7 856 € (environ 66 € par bus). Le stock se saisit en euros (dit le classeur) ; la valeur reste douteuse.
- Techniciens : on compte les effectifs réels, pas les postes financés ?
- Quels ateliers canadiens sont dans le périmètre (Saint-Jean, East Angus, Drummondville n'ont pas de données).
- Henri : le supplément HSE.

## À éviter
- Ne pas présenter la v2 comme validée : ce sont des **propositions**.
- Ne pas défendre le stock par bus : on s'aligne sur le doute de Pierre.

## À apporter
- `cloud-repo/results/05-scenarios-2026-10-29.md` (nouveau : sens « plus bas », sans stock, Canada, limites)
- `cloud-repo/results/06-dictionnaire-inputs.md` (nouveau : liste des inputs à valider)
- `compte-rendu-v0.2-corrections.md` (nouveau : questions fermées, décisions datées, actions)
- `cloud-repo/results/03-scoring-v2-proposal.md` et `04-formula-guide.md`
- Le classeur `cloud-repo/data/Segment Scoring System (v2 proposal).xlsx` (onglet Parameters : 4 interrupteurs)
- La fiche d'identité PowerPoint : `C:\Users\rilg01\OneDrive - TRANSDEV\Documents\workshop id slide - fillable.pptm`

## Après la réunion
Envoie-moi les réponses en vrac. J'active seulement ce qui est approuvé dans le classeur (sens « plus bas », complexité, stock), je refais le test de stabilité et je mets le guide à jour.
