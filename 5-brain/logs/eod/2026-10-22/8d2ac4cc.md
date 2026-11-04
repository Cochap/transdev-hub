# ZBB PRESENTATION DECK — C--ZBB — C:\ZBB
session 8d2ac4cc-509f-4670-aa2d-a0f393416cb5

[13:26] GREG: create a structured presentation deck for zbb. supervisors care about risk, cost and effiency. executive summary lead with the bbusiness impact explain how this ai tested and developed backend improves on the original budgeting tool. the high level archritecture, use simple process diagram or flowchart. break the complex backend into simple funcitonal blocks. the trust and control layer, adress the ai black box problem, explain how i test the backend, prevent hallucinated numbers and audit the financial data. avoid jargon, lead with numbers and specific examples. use visuals, diagrams, flowcharts, tables, animations, data flow diagrams, etc.

[13:29] CLAUDE: Drafting the deck now: I have the numbers (accuracy tests, defect list, test results). I'll build it as a local HTML file, since it holds Transdev cost figures.

[13:33] CLAUDE: Renders well. Checking the diagram slides.

[13:37] CLAUDE: Slides render correctly at laptop size. Wrapping up.

[13:37] CLAUDE: The deck is ready: [ZBB-supervisor-deck.html](docs/deck/ZBB-supervisor-deck.html). It has 13 slides. Open it in any browser and move between slides with the arrow keys or the buttons. I checked it in the browser at laptop size and it displays correctly.

I kept it as a local file and didn't publish it as a web link, because it contains Transdev cost figures and the project's data rules keep those off shared pages.

**What's in it**
1. **Title**, with headline numbers: 492k work orders and no AI-generated numbers in any budget.
2. **Executive summary**, leading with business impact:
   - **Risk:** the old tool budgeted $448,062 for one coach for one year, when the real cost was about $41,700.
   - **Accuracy:** the fleet total is off by about 6% a year when predicting years the engine never saw.
   - **Range:** 8 times out of 10, a 100-bus fleet lands within ±15% of its budget.
   - One card each on cost, efficiency and control.
3. **Old tool vs new engine**, a table of 7 changes, each with why it matters.
4. **Architecture flowchart**, with moving arrows: MIR export → clean → one row per bus per year → same dollars → cost curve → budget and range.
5. **The six blocks in plain words**, each with a real example (a school bus at $27,505, with a range of $10,645 to $71,071).
6. **Accuracy bar chart** comparing the old method, the old curves, the simple "last year's $/km" rule and the new engine.
7. **Risk chart** showing how the range shrinks as the fleet grows: 1 bus, 4 buses, 1 […]

[14:04] GREG: youre still failing to provide quite heavy context. for ex, your first ex in what changed, you sy why it matters, you say, a bus at 200k was budgeted as if at 150000, but YOU DIDNT EXLAIN WHY. THATS LITERALLY THE GOAL OF THAT COLUMN. WHY DOES IT GET BUDGETED AS IF AT 150000, YOU DIDNT PROVIDE ENOUGH OF ITS DATA TO EXPLAIN WHY IT WOULD END UP THERE. THAT EXPLANATION LITERALLY MAKES NO SENSE. as for labour hours previously estimated from dollars. show  a darn example of how that would be established, then show a darn example of how thatd be done for us. like thats literally all im asking for everything. what in the hlll is an "impossible odometer, what in the fuck constitutes as that you cant just drop that in there and assume the people listening know what that means. as for confidence

[14:16] CLAUDE: The new slides render properly. Saving your feedback so I keep to this standard from now on.

[14:20] CLAUDE: You were right. Those lines were claims with nothing behind them, and the 200k/150k one was also stated wrong. The "What changed" table is now an overview slide plus one slide per change. Each walks through a real case: the old way step by step with the arithmetic, then our way on the same case, then the measured effect. The deck is still [ZBB-supervisor-deck.html](docs/deck/ZBB-supervisor-deck.html), now 20 slides, and every slide fits a laptop screen.

- **A. Mileage (corrected).**
  - Bus A's first work order in MIR shows 50,917 km, and the old tool treated that as zero.
  - In April 2025 its real odometer reads 208,393 km. The tool computes 208,393 − 50,917 = 157,476, so Bus A's 2025 repair bills are filed in the 150k–160k km group.
  - The bus wasn't "budgeted as if at 150k", as the old slide said. Its costs were filed under the wrong mileage. The 150k point on the old chart mixes buses truly at 150k with older, costlier ones like Bus A, so any budget read from that chart picks up the wrong buses' costs.
  - This affects 41% of vehicles, the ones already past 100,000 km when MIR first saw them.
- **B. Curve.** Five real school-bus years with two lines drawn through them. The bendy curve hits every past point, then reads $1.50/km at 300k km where the straight line reads $0.50. In the old tool this produced the coach budgeted at $448,062 against about $41,700.
- **C. Refunds.** $500 repair plus a −$100 credit: the old tool counted $600, we count $400. Across MIR this infla […]

[14:48] GREG: jaimerais quon fasse une copie du supervisor deck, seulement en francais, avec un example TRES CONCRET ET TRES VISUEL ET UNE HISTOIRE A-Z, pour chacun des problemes concret quon a trouve avec lancien outils, suivi par une slide TRES VISUEL, AVEC LAIDE DES VISUELS OU DE RECREATION QUE NOUS ON FAIT STYLE CLAUDE DESIGN EXPLAINER, AVEC DES EXAMPLES DE DONNEES OU UN STORYLINE TRES OBVIOUS AVEC DES DONNEES CLAIREMENT IDENTIFIE QUI NOUS SUIVENT A TRAVERS, pour expliquer le nouvel outils

[14:58] CLAUDE: Everything fits. Visual check of the key story slides:

[15:00] CLAUDE: La version française est prête : [ZBB-presentation-superviseurs-FR.html](docs/deck/ZBB-presentation-superviseurs-FR.html). Elle a 28 diapos, tout en français ; on navigue avec les flèches. J'ai vérifié que chaque diapo tient sur un écran de portable, et j'ai regardé de près quelques-unes des diapos d'histoire. Elle reste en fichier local parce qu'elle contient des chiffres Transdev. La version anglaise n'a pas changé.

**Les personnages** (diapo 3) : quatre vrais véhicules du MIR, avec des noms anonymes et une étiquette de couleur qui revient à chaque fois qu'ils apparaissent.
- **Bus A** : autobus scolaire, vu pour la première fois au MIR à 50 917 km, et à 208 393 km en 2025.
- **Autocar B** : vu pour la première fois avec 1 607 495 km au compteur.
- **Bus C** : un relevé tapé une fois à 569 591 km.
- **Bus D** : autobus à budgéter pour 2026, de 100 000 à 150 000 km.

**Pour chacun des 7 problèmes** : une diapo rouge qui raconte l'histoire du début à la fin, puis une diapo verte qui montre la correction en image.
- **A, le kilométrage** : deux règles graduées. Bus A glisse de 208 393 à 157 476 km et tombe dans le mauvais tiroir. Côté correction, sa facture tombe dans le bon tiroir, avec un visuel de 100 carrés dont 41 en rouge.
- **B, la courbe** : les 5 vrais points, et la courbe à virages qui s'emballe jusqu'à 1,50 $/km. Côté correction, le test des autobus cachés en 3 étapes.
- **C, les crédits** : un bon de travail où le −100 $ devient +100 $.
- **D, les heures** : le ca […]

[15:18] GREG: ca va etre la premiere fois depuis le debut de mon stage que je vais elivrer un livrable a henri et ca me rend anxieu. juste lui envoyer le fait que jai un mvp qqui arrange quelques problemes du ancien zbb me semble tlm dontant puisquil faut que je lui explique les changements que jai fait a ce phenomene black box et me reppaler de tout les points ainsi de comprendre exactement comment ca marche et le communiquer a qqn pour lui le faire comprendre. peux tu resumer les problemes quil avait avec lancient en mot cles super simples comme ca je peux les ecrirers dans mon carnets et les pratiquers pour men rappeler. jaimerais envoyer un txto a henri dici la fin de la journee pour lui envoyer / inviter a venir essayer la demo, etre pres a lui expliquer les changement que jai fait, et le but, cest detre capable de convey la meme information qui est dans le supervisor deck, mais sans que jaie le besoin de men servir

[15:18] CLAUDE: C'est normal d'être anxieux pour un premier livrable. Bonne nouvelle : tu n'as pas à tout retenir. Tu as besoin de **7 mots**, d'**un exemple par mot**, et d'**une phrase sur l'IA**. Le reste, tu l'as déjà compris en le construisant.

## Pour ton carnet : les 7 problèmes

| # | Mot-clé | L'ancien outil… | Ton exemple | Nous |
|---|---|---|---|---|
| A | **Mauvais zéro** | comptait les km à partir du jour où le MIR voit le bus pour la première fois | Bus à 208 000 km rangé à 157 000 | vrai odomètre |
| B | **Courbe folle** | courbe à 15 virages, qui s'emballe | Autocar : 448 000 $ au lieu de 42 000 $ | courbe simple, testée sur des bus cachés |
| C | **Crédit = dépense** | rendait les remboursements positifs | 500 $ − 100 $ = 600 $ ?! | 400 $ |
| D | **Heures devinées** | dollars ÷ un chiffre fixe | 10 h réelles → 7,9 h | heures du mécano |
| E | **Prix 2025** | pas d'inflation vers l'année budgétée | 10 000 $ au lieu de 10 755 $ | +7,55 % |
| F | **Odomètre impossible** | gardait les fautes de frappe | 678 km par jour pendant 6 ans | 4 tests de bon sens |
| G | **Un seul chiffre** | aucune idée du risque | « 27 505 $ » point final | + fourchette : 1 bus ≈ 0,4× à 2,6× ; 100 bus ≈ ±15 % |

**Truc pour retenir l'ordre : « Zéro, Courbe, Crédit, Heures, Prix, Odomètre, Fourchette ».** C'est l'ordre dans lequel une facture traverse l'outil :
1. Où est le bus ? (A, le zéro)
2. Quelle courbe ? (B)
3. Combien a coûté la facture ? (C, le crédit)
4. Combien d'heures ? (D)
5. En dollars  […]

[15:56] GREG: cest pas qe jai ma premiere version de zbb, cest que je crois avoir une version qui pourrait reelement servir doutils final, si toi aussi claude tu le confirmes, elle corrige en effet plusieurs probleme de lancien outil, pas besoins dexamples on gardera ca pour quand on est face a face, pis moi shui pas si certain si jpeux le confirmer que chaqeu chiffre est verificable jusquaux bons de travails, sans laide de lintelligence artificiel ofc, so jprefere pas y dire ca, il reste po mal juste la fin daujourdhui ou demain a la semaine, faq ca sonne robotique dy dire comme ca, pis y dire que je lui montre sur un vrai example, cest quand meme obvious, mais ca sera pas langle quon va prendre pour la presentation faque lache

[15:56] CLAUDE: Mon avis honnête : **oui, c'est un vrai candidat pour l'outil final**, pas juste un prototype. Le moteur corrige les défauts majeurs de l'ancien, il est testé, et il se fait pas battre par la règle simple là où ça compte (les dépôts, les contrats, les véhicules). Avant de dire « c'est l'outil final », il reste quatre choses à régler :

1. **Le test 2026 sous scellé** n'est pas encore évalué. C'est lui qui confirme que l'outil tient sur une année qu'il n'a jamais vue.
2. **Les 13 tests navigateur** sont à relancer (le navigateur de test est à réinstaller).
3. **Le taux horaire** (65 $ ou 75 $) attend une réponse des finances.
4. **Les derniers changements du moteur** ne sont pas encore enregistrés dans git.

Rien de ça ne t'empêche de lui proposer la démo. Ça te donne une phrase honnête : « je pense que ça peut devenir l'outil final, il me reste à valider quelques points ».

Le texto, version plus naturelle :

> Salut Henri ! Je pense avoir une version du ZBB qui pourrait vraiment servir d'outil final. Elle règle plusieurs problèmes de l'ancien. Aurais-tu un moment d'ici la fin de la semaine pour venir l'essayer ? J'aimerais avoir ton avis.

Si vous êtes plus formels ensemble, remplace « Salut » par « Bonjour » et passe au « vous ».

[15:58] GREG: ok bah utilise le plugin de playwright pour faire le test 2026 sous scelle ainsi que les 13 tests navigateur, apres ca, jveux que du reverse engineer le look/design/flow/feel dune appli qui accompli des fonctions similaires, pis dappliquer le visuels a lapp pouir le rendre comme un app quun tech unicorn startup sortirait

[16:01] CLAUDE: Meanwhile, I'll read the current app to plan the redesign.

[16:07] CLAUDE: Now the restyle: theme, header, cards, range bar and chart colours.

[16:19] CLAUDE: The app is loading in the preview with the new look. I'm checking the first screen.

[16:20] CLAUDE: The new look works: dark "Total" card with the lime number, segmented tabs, and the range shown as a bar. Now I'll rewrite the browser tests for the 4-tab app.

[16:33] CLAUDE: The page wouldn't finish loading. That's probably because the font loads from Google Fonts, which hangs on the Transdev network. I'm removing it: the app should work offline anyway.

[16:44] CLAUDE: The browser tests are still running in the background, about 27 checks with a real browser for each. I'll report when they finish.
