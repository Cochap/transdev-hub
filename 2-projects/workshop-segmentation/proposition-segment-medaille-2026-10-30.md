# Proposition pour l'appel avec Eckern (ven. 2026-10-30 ou lun. 11-02)
Ce qu'Eckern a demandé le 2026-10-29 (`raw/2026-10-29-checkin-transcript.txt`) : « si vous deviez reprendre à zéro, comment je définis un segment, et comment je définis, au sein du segment, une médaille ? » Les cibles saisies : à ignorer. **Proposition de Greg et Gabriel, à discuter.**

## L'idée en une phrase
> **Le segment vient de ce que l'atelier fait (sa mission), corrigé par sa tension. Pas de pondérations. La médaille vient de ce qu'il fait bien, avec une barre qui monte avec le segment.**

## 1. Le segment, en 2 étapes, sans pondération
On remplace le score pondéré (qu'on peut ajuster jusqu'à obtenir le résultat voulu, le point de Gabriel) par **une règle qu'on peut lire à voix haute**.

**Étape 1 — La mission (le plus gros travail fait sur place) donne le segment de base.** C'est un fait : on coche ce que l'atelier fait.

| Mission de l'atelier | Segment de base |
|---|---|
| Entretien courant : inspections, petites réparations, pneus, freins | S1 |
| Réparations lourdes sur le véhicule : diagnostic électronique, systèmes, carrosserie | S2 |
| Révisions majeures : moteurs, transmissions, remises à neuf de composants (« major overhauls ») | S3 |

Ça règle les deux exemples d'Eckern : le petit atelier spécialisé moteurs est S3 ; l'énorme dépôt qui ne fait que de la bricole est S1.

**Étape 2 — La tension corrige d'un cran au maximum.** Eckern veut que les ratios de base comptent. On en garde trois, déjà dans le classeur :
- bus par mécanicien (la charge) ;
- % de bus de réserve (la tension) ;
- bus par baie (la place).

Règle : si **deux des trois** sont dans la zone « sous tension » (seuils à fixer ensemble), le segment descend d'un cran. Les conditions sévères et une flotte très variée comptent comme une tension de plus (décision de Greg, appuyée par la réunion du 10-27 : « Ici, il fait moins 25 l'hiver… mes attentes ne peuvent pas être les mêmes »).
- Jamais plus d'un cran. Jamais en dessous de S1.
- Chaque correction est écrite sur la fiche : « S3 → S2 : sous tension (réserve 4 %, 18 bus par mécanicien) ».

**Pourquoi c'est plus robuste :** aucun poids à régler, donc impossible de « tuner » le résultat. Si un atelier sort mal classé, on doit dire **quelle règle** est fausse, pas bouger un coefficient.

**Ce qu'il faut ajouter :** un seul champ, la mission (case à cocher). Tout le reste existe déjà.

## 2. La médaille : la même pratique vaut plus ou moins selon le segment
Eckern l'a dit lui-même : une stratégie de maintenance écrite est « waouh » en S1, un prérequis en S2, le minimum en S3. On garde **les mêmes questions** de la grille, mais chaque question a un niveau :

| Niveau | Exemple : le calendrier d'entretien |
|---|---|
| 0 Absent | Rien |
| 1 Fait | Le chef sait quoi faire cette semaine |
| 2 Écrit et suivi | Calendrier écrit, respecté |
| 3 Mesuré et amélioré | On mesure les retards et on corrige |

Le segment fixe la barre : **S1 = niveau 1, S2 = niveau 2, S3 = niveau 3** (sécurité : niveau 2 partout).

La médaille compte les questions où l'atelier atteint sa barre :
- **Sécurité d'abord :** une question de sécurité sous la barre = pas de médaille.
- **Bronze / argent / or :** selon le pourcentage de questions à la barre (seuils à fixer ensemble ; exemple pour tester : 70 / 85 / 95 %).

L'exemple du Maroc d'Eckern fonctionne : « segment 2, silver » dit tout de suite à quoi s'attendre.

## 3. Exemple de bout en bout
**Atelier X** : fait des remplacements de moteurs → **S3 de base**. Réserve 4 % et 18 bus par mécanicien → 2 tensions sur 3 → **S2**, et la fiche l'explique.
À l'audit, il atteint le niveau 2 sur 40 des 45 questions, sécurité OK → 89 % → **S2 argent**.

## 4. Ce qu'on demande à Eckern
1. La liste des missions (3 niveaux) : est-ce le bon découpage ?
2. Les trois ratios de tension : les bons, et quelle zone est « sous tension » ?
3. OK pour remplacer les pondérations par cette règle ?
4. Un pilote : 3 ateliers canadiens qu'il connaît bien, on applique la règle, il nous dit si le résultat est logique **et pourquoi** (pas « c'est un 3 parce que je le sens »).

Le pilote du classeur (niveaux 0-3, médailles) existe déjà : `cloud-repo/data/Transdev Road Referential - Maturity grid - v2 GR.xlsx`.
