# Protocole de test : aide au diagnostic à partir de l'historique MIR

Pour : Alex Dumenne. De : Greg Riley. Brouillon à discuter ensemble.

Alex, tes doutes sont sérieux. Le volume de texte brut est un vrai risque, et le texte des bons de travail est souvent bruité. Je ne veux pas te convaincre : je veux un test juste, que tu aides à bâtir.

## La question

Pour un symptôme donné sur un modèle donné, le système trouve-t-il la bonne première chose à vérifier?

## Trois candidats, sur les mêmes cas

1. **Recherche + statistiques calculées d'avance** (notre plan). Le modèle ne reçoit que les quelques passages que la recherche retourne pour chaque question, jamais toute la base. Les comptes sont faits avant, parce qu'un agent de conversation ne sait pas compter de façon fiable.
2. **Statistiques seules** : « la cause la plus fréquente ». C'est le seuil à battre.
3. **Modèle entraîné sur les champs structurés** (ton idée), si les données le permettent.

Côté volume : un index peut contenir jusqu'à 24 milliards de documents (niveaux Basic et S1). La vraie limite est la mémoire vectorielle : 5 Go par partition sur Basic (jusqu'à 3 partitions) et 35 Go sur S1. On estime ça dès que ton export arrive.

## Les cas réservés

On garde de côté 40 à 60 cas récents dont la cause est confirmée. Ils restent hors du système. **Tu choisis ces cas.**

## Ce qu'on mesure

- La bonne cause dans la première suggestion, et dans les trois premières.
- Règle de sécurité : zéro recommandation dangereuse.
- Couples de serrage et spécifications : jamais répondus à partir de l'historique. On renvoie toujours au manuel.

## Ce qui nous ferait changer d'approche

D'abord on mesure ton export : quelle part des champs cause et correctif est vide ou triviale (« OK », « réparé »)? Si c'est la majorité, la recherche sur le texte ne tiendra pas, et on se rabat sur les champs structurés (candidat 3) ou on arrête. Si le candidat 2 fait aussi bien que les autres, on garde le plus simple. Le seuil exact de « majorité » : à confirmer avec toi.

## Ton rôle

- Choisir les cas réservés.
- Juger les résultats : la première vérification proposée est-elle la bonne et sûre?

Si une de ces étapes te semble injuste, dis-le-moi : on ajuste avant de commencer.
