const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, LevelFormat, Header, Footer, PageNumber, BorderStyle,
  TableOfContents, PageBreak, VerticalAlign,
} = require("docx");

const FONT = "Arial", NAVY = "1D2330", RED = "C00016", GREY = "5A6270", LIGHT = "F2F3F5", LINE = "BFC4CC";

const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 21, bold: o.bold, italics: o.italics, color: o.color });
const rich = (s, o = {}) => s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(x => x.startsWith("**") ? run(x.slice(2, -2), { ...o, bold: true }) : run(x, o));
const P = (s, o = {}) => new Paragraph({ children: rich(s, o), spacing: { after: o.after ?? 120, line: 276 }, alignment: o.align });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t })] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t })] });
const B = (s, lvl = 0) => new Paragraph({ numbering: { reference: "bul", level: lvl }, children: rich(s), spacing: { after: 60, line: 264 } });
const N = (s, ref = "num") => new Paragraph({ numbering: { reference: ref, level: 0 }, children: rich(s), spacing: { after: 60, line: 264 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
function T(header, rows, widths, opt = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (txt, i, isHead, fill) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA }, borders,
    shading: isHead ? { fill: NAVY, type: ShadingType.CLEAR, color: "auto" } : fill ? { fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 }, verticalAlign: VerticalAlign.TOP,
    children: String(txt).split("\n").map(line => new Paragraph({ spacing: { after: 20 }, children: isHead ? [run(line, { bold: true, color: "FFFFFF", size: 19 })] : rich(line, { size: 19 }) })),
  });
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: header.map((h, i) => cell(h, i, true)) }),
      ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, i, false, opt.firstColFill && i === 0 ? LIGHT : (ri % 2 ? "FAFAFB" : undefined))) })),
    ],
  });
}
const FH = (t, big) => new Paragraph({ keepNext: true, spacing: { before: big ? 0 : 220, after: big ? 140 : 100 }, border: big ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: RED, space: 4 } } : undefined, children: [new TextRun({ text: t, font: FONT, size: big ? 30 : 24, bold: true, color: NAVY })] });
const gap = () => new Paragraph({ spacing: { after: 80 }, children: [] });

const title = [
  new Paragraph({ spacing: { before: 2400, after: 120 }, children: [run("TRANSDEV CANADA · MAINTENANCE", { size: 20, bold: true, color: RED })] }),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Assistant virtuel Greg Boulon", font: FONT, size: 52, bold: true, color: NAVY })] }),
  new Paragraph({ spacing: { after: 480 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 8 } }, children: [new TextRun({ text: "Plan de projet — Preuve de concept « véhicules scolaires »", font: FONT, size: 32, color: NAVY })] }),
  P("Référence : note de projet n° 551", { color: GREY }),
  P("Version 1.1 — Proposition pour revue", { color: GREY }),
  P("Date : 5 novembre 2026", { color: GREY }),
  P("Préparé par : Grégory Riley", { color: GREY }),
  P("Classification : document interne", { color: GREY }),
  new Paragraph({ children: [new PageBreak()] }),
];

const control = [
  FH("Contrôle du document", true),
  T(["Élément", "Détail"], [
    ["Titre", "Plan de projet — Assistant virtuel Greg Boulon, preuve de concept « véhicules scolaires »"],
    ["Référence", "Note de projet n° 551 (4 mai 2026)"],
    ["Version / statut", "1.1 — Proposition pour revue (remplace la version 1.0)"],
    ["Auteur", "Grégory Riley"],
    ["Revue", "Dominique (accompagnement IA et méthode) ; Henri Eckern (chef de projet)"],
    ["Approbation", "Pierre Zivec (commanditaire)"],
  ], [2400, 6960], { firstColFill: true }),
  gap(),
  FH("Historique des versions"),
  T(["Version", "Date", "Auteur", "Description"], [
    ["0.1", "2026-11-05", "G. Riley", "Brouillon de travail à la suite de la rencontre du 3 novembre 2026"],
    ["1.0", "2026-11-05", "G. Riley", "Proposition structurée soumise pour revue"],
    ["1.1", "2026-11-05", "G. Riley", "Changement d'approche : ingestion multimodale locale sans Azure (phase 0), moteur de référence, résultats d'essais, indicateurs, risques et décision D7 ajoutés"],
  ], [1100, 1500, 1500, 5260]),
  gap(),
  FH("Sommaire des modifications de la version 1.1"),
  T(["Section", "Modification"], [
    ["1, 2.2", "Constat : la solution de repli sans frais de Copilot Studio ne traite que le texte ; résultats de la phase 0 résumés"],
    ["5", "Livrable L5 (ingestion) précisé ; ajout de L7 (moteur de référence) et L8 (évaluations indépendantes)"],
    ["6", "Nouvelle architecture à deux niveaux (phase 0 sans Azure ; niveau cible Azure) ; nouvelles sections 6.2 à 6.4 (ingestion, moteur, stratégie d'essais)"],
    ["7", "Valeurs de référence mesurées : jeu d'essai à l'aveugle, fidélité d'extraction, abstention, faux refus"],
    ["8, 10", "Phase 0 ajoutée à l'échéancier ; coût de la phase 0 nul"],
    ["11", "Trois risques ajoutés : biais d'auto-évaluation, limites du texte seul, classes d'extraction faibles"],
    ["12", "Nouvelle sous-section 12.1 « Décisions prises » : décision D7"],
  ], [1500, 7860]),
  new Paragraph({ children: [new PageBreak()] }),
  FH("Table des matières", true),
  new TableOfContents("Table des matières", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({ children: [new PageBreak()] }),
];

const body = [
  H1("1. Sommaire exécutif"),
  P("Le projet Greg Boulon vise à doter les mécaniciens de Transdev Canada d'un assistant conversationnel qui facilite le diagnostic et l'accès à la documentation technique. Un premier essai dans Copilot Studio a démontré la faisabilité (réponses citant le document et la page exacts), mais sur une base documentaire très partielle."),
  P("À la suite de la rencontre du 3 novembre 2026, le projet est recentré sur une **preuve de concept (version 0.1) limitée aux véhicules scolaires du Québec**, fondée uniquement sur la documentation technique. L'intégration de l'historique de maintenance constitue une phase ultérieure distincte."),
  P("**Jalon ferme :** présentation de groupe en février 2027 (date exacte à confirmer). Les phases de réalisation et de validation requièrent environ **7 à 10 semaines** à compter de la remise en service de l'environnement Azure, actuellement désactivé. **Ce déblocage constitue le chemin critique du projet.**"),
  P("**Changement d'approche (version 1.1).** La solution de repli sans frais fondée sur Copilot Studio (connaissances SharePoint ou Dataverse) ne traite que le texte ; or la documentation de maintenance est riche en tableaux et en schémas, et ne répondrait donc pas à l'exigence multimodale du produit minimum viable. L'architecture cible (extraction selon la mise en page, verbalisation des images, Azure AI Search) demeure inchangée. En attendant la réactivation de l'abonnement Azure, une **chaîne d'ingestion multimodale locale, sans Azure, hors ligne et déterministe** (phase 0) a été réalisée sur le manuel de schémas électriques IC (1 567 pages) et évaluée par des essais indépendants (section 7.0)."),
  P("**Décisions attendues du commanditaire :** mode de remise en service d'Azure et dépense associée, périmètre documentaire de la preuve de concept, échéance du prototype et langue de départ (section 12)."),

  H1("2. Contexte et justification"),
  H2("2.1 Problématique"),
  B("Le **diagnostic** représente la principale source de perte d'efficacité en atelier : diagnostics erronés, pièces remplacées inutilement, temps de recherche prolongé. Ce constat repose sur l'expérience opérationnelle ; aucune mesure de la qualité des diagnostics n'existe à ce jour."),
  B("L'information technique est dispersée. Les mécaniciens omettent parfois de consulter la documentation, faute d'un outil qui la rende accessible rapidement. Exiger la consultation des documents suppose de fournir l'outil pour le faire, ce qui en fait aussi un **enjeu de sécurité** des interventions."),
  B("L'écart d'expertise entre mécaniciens juniors et seniors ralentit les diagnostics complexes."),
  H2("2.2 Situation actuelle"),
  B("Essai exploratoire réalisé dans Copilot Studio, retenu pour son intégration à Microsoft 365 et l'accès direct aux manuels stockés dans SharePoint."),
  B("L'agent répond à partir des manuels indexés, en citant le document et la page exacts."),
  B("La couverture reste limitée : **23 manuels indexés sur 2 785 fichiers** (131 756 pages) de la bibliothèque Manuels, la limite de 50 Mo du niveau gratuit d'Azure AI Search étant atteinte."),
  B("Depuis le 4 novembre 2026, l'abonnement Azure qui héberge le service de recherche est **désactivé** (crédit gratuit expiré). La réactivation requiert un mode de paiement, à fournir par le commanditaire."),
  B("La solution de repli sans frais (connaissances Copilot Studio à partir de SharePoint ou de Dataverse) est une recherche sur le texte seulement. Elle ne restitue ni la structure des tableaux ni le contenu des schémas, et ne satisfait pas l'exigence multimodale du produit minimum viable."),
  B("Une phase 0 sans Azure a été réalisée le 5 novembre 2026 pour lever ce blocage technique (sections 6.1 à 6.3)."),

  H1("3. Objectifs"),
  H2("3.1 Objectif d'affaires"),
  P("Réduire le temps et améliorer la qualité des diagnostics en atelier, en appuyant prioritairement les mécaniciens juniors, sans se substituer au jugement du mécanicien. L'outil fournit des pistes et la documentation de référence, jamais des consignes."),
  H2("3.2 Objectifs de la preuve de concept"),
  N("Livrer avant la présentation de groupe de février un agent v0.1 fonctionnel, couvrant les véhicules scolaires du Québec à partir de la documentation technique."),
  N("Démontrer des réponses fiables et traçables : chaque réponse cite un document et une page que le mécanicien peut ouvrir."),
  N("Établir un dispositif de mesure reproductible (jeu de test, tableau de bord) permettant de suivre la progression et de détecter les régressions d'un cycle à l'autre."),
  N("Obtenir la validation de mécaniciens seniors avant tout élargissement aux juniors."),
  N("Développer la capacité interne à conduire des projets d'IA : commencer petit, mesurer, élargir."),

  H1("4. Portée"),
  T(["Inclus dans la version 0.1", "Exclu ou reporté"], [
    ["Véhicules scolaires, Québec", "Autres familles (urbain, autocar, minibus) : après la preuve de concept"],
    ["Documentation technique : manuels, procédures, guides de dépannage, bulletins des constructeurs", "Historique de maintenance (bons de travail MIR) : phase 2"],
    ["Réponses citées (document et page)", "Véhicules électriques : volet distinct, à planifier séparément"],
    ["Une langue de départ, puis ajout de la traduction", "Maintenance préventive : valeur non démontrée compte tenu de la diversité de la flotte"],
    ["Rappels de sécurité avant toute manipulation", "Extension à l'Ontario : après le Québec (documentation non numérisée à ce jour)"],
    ["", "Données des opérations américaines : ultérieurement"],
  ], [4680, 4680]),
  gap(),
  H2("4.1 Hypothèses"),
  B("La documentation technique disponible suffit à produire une valeur mesurable avant l'intégration de l'historique de maintenance."),
  B("Les véhicules scolaires partagent une base technique largement commune (châssis, moteur, transmission, différentiel), ce qui limite le volume documentaire nécessaire."),
  B("Copilot Studio demeure la plateforme de la preuve de concept ; la base vectorielle peut être déplacée ultérieurement si un gain est démontré."),
  H2("4.2 Contraintes"),
  B("Corpus limité aux manuels hébergés dans SharePoint (Transdev)."),
  B("Un seul manuel de véhicule scolaire est présent dans SharePoint : IC (PB105 / Leeds), environ 1 567 pages, soit environ 136 Mo d'index (estimation), au-delà de la limite de 50 Mo du niveau gratuit."),
  B("Les manuels Blue Bird et Thomas, qui couvrent 135 des 193 véhicules scolaires standards, sont accessibles uniquement sur les portails des fabricants (connexion requise)."),
  B("Toute dépense ou ressource de l'entreprise requiert l'approbation du commanditaire."),
  B("La disponibilité de la ressource de réalisation est liée à la durée de son stage."),

  H1("5. Livrables"),
  T(["#", "Livrable", "Description"], [
    ["L1", "Agent v0.1 « scolaire »", "Agent Copilot Studio répondant à partir de la documentation scolaire, avec citations document et page"],
    ["L2", "Jeu de test", "Questions techniques fournies par des mécaniciens, cas déjà résolus et questions hors corpus auxquelles l'agent doit répondre qu'il ne dispose pas de l'information"],
    ["L3", "Tableau de bord des tests", "Résultats par cycle, par système et par indicateur ; suivi des régressions"],
    ["L4", "Glossaire technique", "Jargon et variantes d'écriture des mécaniciens, termes français et anglais, pour orienter la recherche"],
    ["L5", "Chaîne d'ingestion automatisée", "Découpage des PDF, reconstruction des tableaux, verbalisation des graphiques, étiquetage (modèle, année, composant), rechargement des manuels nouveaux ou mis à jour. Version locale multimodale sans Azure réalisée (phase 0) ; version Azure à la réactivation de l'abonnement"],
    ["L6", "Rapport de preuve de concept", "Résultats, enseignements et recommandation pour la phase 2, en appui à la présentation de février"],
    ["L7", "Moteur de référence local", "Moteur de questions-réponses de référence (recherche lexicale et sémantique, routes structurées, glossaire FR-EN, garde-fous), servant de banc d'essai et de point de comparaison pour l'agent Copilot Studio"],
    ["L8", "Jeux d'évaluation indépendants", "Jeu d'essai à l'aveugle rédigé à partir des images de pages, mesure de fidélité d'extraction contre un moteur indépendant, jeu de questions obligatoirement répondues"],
  ], [700, 2600, 6060]),

  H1("6. Approche et méthodologie"),
  P("Le projet suit une démarche **itérative**. Une cible de qualité est fixée dès le départ ; elle n'est généralement pas atteinte lors des premiers cycles. Chaque cycle isole la composante à améliorer :"),
  B("**Recherche :** pertinence des passages retrouvés."),
  B("**Lecture des documents :** interprétation des PDF, en particulier les tableaux et les images."),
  B("**Vocabulaire :** jargon, abréviations et variantes linguistiques."),
  P("Chaque cycle comporte quatre étapes : ajuster une seule composante, relancer le jeu de test, comparer au cycle précédent et consigner le résultat au tableau de bord. Lorsque le taux de réussite atteint **75 %**, les résultats sont ventilés par système (freins, moteur, etc.) pour cibler les faiblesses."),
  P("Avant d'automatiser l'ingestion, un échantillon de PDF est analysé manuellement afin de valider le découpage et le traitement des tableaux."),
  H2("6.1 Architecture à deux niveaux"),
  P("Pour lever la dépendance à l'environnement Azure, l'architecture est organisée en deux niveaux alimentés par une même sortie d'ingestion."),
  T(["Niveau", "Composantes", "Statut"], [
    ["Phase 0 — Ingestion multimodale locale (sans frais, hors ligne, déterministe)", "Extraction des tableaux, des graphiques et des schémas, puis enrichissement par page ; moteur de référence local pour la validation", "Réalisé et évalué sur le manuel IC"],
    ["Niveau cible — Azure", "Extraction selon la mise en page, verbalisation des images par modèle de vision, index Azure AI Search, génération des réponses dans Copilot Studio", "En attente de la réactivation de l'abonnement Azure (D1)"],
  ], [3000, 4160, 2200]),
  gap(),
  H2("6.2 Phase 0 — Ingestion multimodale locale"),
  P("La chaîne a été appliquée au manuel de schémas électriques des autobus IC BE/CE (1 567 pages, dessins vectoriels, aucune image numérisée). Elle produit un enregistrement enrichi par page, sans recours à un service infonuagique."),
  B("**Tableaux :** reconstruits à partir des coordonnées des mots et des lignes de séparation du PDF (bordures verticales et horizontales), cellules fusionnées complétées, légendes de marqueurs d'option rattachées. Résultat : **1 529 tableaux, environ 12 600 lignes**, dont **777 tableaux associés à leur propre identifiant de connecteur**."),
  B("**Tableaux des fusibles et des relais** (feuillets 2.24 à 2.34, pages PDF 64 à 74) : saisis après la détection d'une lacune initiale, ces pages ayant d'abord été omises ; le premier résultat de 100 % sur les fusibles ne portait que sur une fraction négligeable du corpus."),
  B("**Verbalisation spatiale du panneau de relais** (page PDF 64) : **36 positions sur 36** exactes par comparaison avec l'image rendue."),
  B("**Pages de schémas :** composants (nom et identifiant), fils (circuit, calibre et couleur), renvois entre feuillets (CHx_y)."),
  B("**Texte de repli :** extraction indépendante par page au moyen de l'outil poppler (pdftotext, mode « layout »), conservée comme fragment complémentaire."),
  B("**Performance :** ingestion complète de 1 567 pages en environ 2 minutes sur l'unité centrale d'un portable."),
  H2("6.3 Moteur de référence"),
  P("Le moteur de référence local sert de banc d'essai reproductible. Il comprend :"),
  B("une recherche lexicale sensible aux codes (BM25) avec pondération des titres, combinée par fusion de rangs à des plongements multilingues (MiniLM et multilingual-e5-large, comparaison en cours) ;"),
  B("des routes structurées (recherche par connecteur et cavité, recherche approchée dans les tableaux de fusibles, position de relais) qui **ajoutent** des lignes aux résultats de la recherche ;"),
  B("un glossaire français-anglais du jargon de mécanique ;"),
  B("un contrôle de périmètre : les autres constructeurs (Thomas, Blue Bird, Freightliner, Lion) entraînent une abstention explicite ;"),
  B("un refus des tentatives d'injection d'instructions et une barrière hors domaine (couples de serrage, huile, capacités, procédures), appliquée seulement en l'absence de terme électrique ;"),
  B("une barrière de preuve des valeurs : une valeur en ohms ou en volts n'est restituée que si elle figure au document ;"),
  B("des citations composées de la section, de la page imprimée et de la page PDF, la légende des options étant affichée sur les lignes de variantes."),
  H2("6.4 Stratégie d'essais"),
  P("Un jeu d'essai produit à partir de sa propre extraction ne mesure que l'autocohérence. Le dispositif repose donc sur trois mesures complémentaires : un jeu d'essai à l'aveugle, rédigé par un agent distinct à partir des seules images de pages ; une mesure de fidélité contre un moteur d'extraction indépendant ; un jeu de questions électriques contenant des mots susceptibles de déclencher à tort les barrières de refus. Le jeu à l'aveugle est scindé de façon figée : les identifiants impairs servent à la mise au point, les identifiants pairs sont conservés en réserve et rapportés une seule fois, à la fin."),
  H2("6.5 Orientations d'architecture"),
  B("Point d'accès unique, avec un coordonnateur qui oriente les demandes vers des agents spécialisés (diagnostic, réparation, puis par famille ou par composant au besoin). La segmentation du diagnostic doit rester mesurée pour conserver un volume de données suffisant par segment."),
  B("Filtrage selon le véhicule et ses composants, afin d'éviter toute indication portant sur un équipement absent du modèle concerné."),
  B("Langue enregistrée en métadonnée, pour servir la langue de l'utilisateur."),
  B("Option à évaluer : un serveur dédié (GB10, 128 Go) pour les essais, l'hébergement de bases vectorielles et l'exécution locale d'un modèle de vision destiné à verbaliser les pages purement graphiques restantes."),
  B("**Chemin de mise à l'échelle :** la même sortie d'ingestion (enregistrements enrichis par page, tableaux en format Markdown, graphiques verbalisés) alimente (a) les fichiers de connaissances de Copilot Studio dès maintenant, (b) l'index Azure AI Search à la réactivation de l'abonnement, (c) le serveur GB10 pour la verbalisation des pages graphiques restantes."),
  B("La génération des réponses par modèle de langage s'effectue dans Copilot Studio ; elle n'a pas encore été vérifiée de bout en bout."),
  H2("6.6 Phase 2 — Historique de maintenance (hors v0.1)"),
  P("La phase 2 débutera par la recherche d'**interventions similaires** dans l'historique, filtrées par classe et numéro de véhicule, l'interprétation restant au mécanicien. La qualité inégale des données historiques impose une validation préalable : une intervention passée n'est pas présumée correcte."),

  H1("7. Mesure de la performance"),
  P("Les indicateurs de sortie (qualité des réponses) sont mesurés en premier ; les indicateurs internes (étapes de traitement) suivront. Le dispositif combine des mesures automatisables et des appréciations d'utilisateurs."),
  T(["Indicateur", "Type", "Cible", "Source"], [
    ["Exactitude des réponses sur le jeu de test", "Automatisable", "85 % ; seuil de 75 % déclenchant l'analyse par système", "Tableau de bord"],
    ["Réponses citant document et page", "Automatisable", "100 %", "Vérification automatique des citations"],
    ["Valeurs de sécurité non appuyées par un document", "Automatisable", "0", "Jeu de test"],
    ["Réponse « information non disponible » lorsque la question sort du corpus", "Automatisable", "95 %", "Jeu de test"],
    ["Appréciation des mécaniciens seniors (efficace, déjà connu, inutile)", "Appréciation", "À définir en atelier de métriques", "Boucle de retour, sondage Microsoft 365"],
    ["Comparaison senior / IA sur des symptômes rapportés", "Mixte", "À définir (phase 2)", "Grille de performance"],
    ["Confiance d'évaluation agentique (note 551)", "Automatisable", "95 %", "Évaluation de l'agent"],
    ["Utilisation (note 551)", "Automatisable", "7 requêtes par site et par jour", "Phase de déploiement"],
  ], [3100, 1500, 2560, 2200]),
  gap(),
  H2("7.0 Valeurs de référence mesurées (phase 0, 5 novembre 2026)"),
  P("Les valeurs ci-dessous proviennent du moteur de référence local appliqué au manuel IC. Elles servent de base de comparaison pour l'agent Copilot Studio et de cibles pour les cycles suivants."),
  T(["Indicateur", "Valeur mesurée", "Cible proposée", "Portée et réserves"], [
    ["Taux de réussite sur le jeu d'essai à l'aveugle (45 questions : 21 FR, 24 EN, dont symptômes, multi-pages et refus)", "53 % avant mise au point ; **82 %** après correctifs", "85 % (seuil intermédiaire de 75 %)", "Jeu rédigé à partir des images de pages ; partition figée (impairs : mise au point ; pairs : réserve, rapportés une seule fois à la fin)"],
    ["Fidélité d'extraction des tableaux contre poppler (moteur indépendant)", "**95,6 %** de concordance par ligne", "97 % ou plus", "Classes faibles : tableaux de connecteurs « GAUGE » (environ 67 %), certains tableaux de description de fusibles ; en partie dues aux découpages propres à poppler ; revue visuelle en cours"],
    ["Exactitude de l'abstention (questions hors corpus ou hors périmètre)", "**10 sur 10** sur le jeu autogénéré", "95 %", "Jeu autogénéré (190 questions FR et EN), donc autocohérence seulement ; fuite connue sur le jeu à l'aveugle : un cas à refuser (ohms d'un capteur) reçoit une réponse"],
    ["Faux refus sur questions électriques contenant des mots tels que huile, pression, dérivation", "**1 sur 15** (5 sur 15 avant correctifs)", "0", "Jeu de questions obligatoirement répondues (15)"],
    ["Lignes de réponse trouvées sur le jeu autogénéré (190 questions)", "98 %", "Indicateur de contrôle", "Mesure l'autocohérence de l'extraction, non la qualité réelle"],
    ["Positions de relais correctes sur le panneau de la page PDF 64", "**36 sur 36**", "100 %", "Comparaison avec l'image rendue"],
    ["Temps de réponse local", "5 à 100 ms par question", "Informatif", "Moteur de référence seulement ; ne couvre pas la génération dans Copilot Studio"],
  ], [2900, 2000, 1700, 2760]),
  gap(),
  H2("7.1 Validation terrain"),
  B("Journée d'essai à Saint-Jean avec l'équipe de Mario et un ou deux mécaniciens spécialisés en autobus, dès que l'agent est prêt."),
  B("Rejeu de cas déjà résolus, retirés au préalable de la base, pour vérifier que l'agent retrouve le diagnostic."),
  B("Comité technique d'environ cinq mécaniciens (deux par province), qui interroge l'agent selon une fréquence à convenir."),
  B("Les mécaniciens seniors valident l'outil **avant** tout accès des juniors. Une communication présente l'outil comme une aide, afin de répondre aux craintes légitimes des équipes."),

  H1("8. Échéancier et jalons"),
  P("Les durées sont estimées à partir de **T0**, la remise en service de l'environnement Azure."),
  T(["Phase", "Contenu", "Durée estimée", "Critère de sortie"], [
    ["P0a — Ingestion multimodale locale", "Chaîne sans Azure, moteur de référence, jeux d'évaluation indépendants (manuel IC)", "Réalisé le 5 novembre 2026 ; ne dépend pas de T0", "Valeurs de référence mesurées (section 7.0)"],
    ["P0 — Cadrage", "Revue du plan, atelier de métriques, décisions du commanditaire", "1 à 2 semaines, en parallèle du déblocage", "Plan approuvé"],
    ["P1 — Fondations", "Choix du corpus, analyse manuelle des PDF, chargement, glossaire initial, collecte des questions de mécaniciens", "T0 à T0 + 3 semaines", "Corpus chargé ; l'agent répond"],
    ["P2 — Cycles v0.1", "Cycles itératifs sur le jeu de test", "T0 + 3 à T0 + 7 semaines", "Seuil de 75 % atteint ; analyse par système"],
    ["P3 — Validation seniors", "Journée de Saint-Jean, comité technique, rejeu de cas", "T0 + 7 à T0 + 10 semaines", "Retour favorable des seniors"],
    ["J — Présentation de groupe", "Démonstration et rapport de preuve de concept", "Février 2027 (date à confirmer)", "Jalon ferme"],
    ["P4 — Phase 2", "Historique de maintenance : interventions similaires", "Après février", "Décision à l'issue de P3"],
  ], [1900, 3260, 2200, 2000]),
  gap(),
  B("Le jalon de février est tenable si T0 intervient environ dix semaines avant la présentation. La phase 0 réduit le risque technique sans le supprimer : la génération des réponses dans Copilot Studio, la correspondance entre « IC PB105 » et la série BE/CE, ainsi que la journée d'essai à Saint-Jean avec validation par des seniors, restent à réaliser."),
  B("Une échéance intermédiaire pour le prototype (fin du mois) a été évoquée ; elle reste à confirmer."),
  B("La suite après février reste à préciser : passage au volet électrique après une période limitée sur le scolaire, puis ouverture du scolaire à l'Ontario, le parc québécois étant restreint."),

  H1("9. Gouvernance et rôles"),
  H2("9.1 Parties prenantes"),
  T(["Rôle", "Personne", "Responsabilités principales"], [
    ["Commanditaire", "Pierre Zivec", "Orientation, approbation du plan et des dépenses, mobilisation des mécaniciens"],
    ["Chef de projet", "Henri Eckern", "Pilotage, arbitrages, liaison avec les TI"],
    ["Réalisation", "Grégory Riley", "Conception, développement, tests, rapports d'avancement"],
    ["Accompagnement IA et méthode", "Dominique", "Méthodologie, métriques, revue technique"],
    ["Données et expertise métier", "Alex Dumenne", "Accès aux données MIR, validation métier"],
    ["Licences", "Sébastien Boudrias", "Acquisition et gestion des licences"],
    ["Validation terrain", "Équipe de Mario (Saint-Jean), comité technique", "Questions de test, appréciation des réponses"],
  ], [2300, 2500, 4560]),
  gap(),
  H2("9.2 Matrice RACI"),
  P("R = réalise, A = approuve, C = consulté, I = informé.", { color: GREY }),
  T(["Activité", "Pierre", "Henri", "Grégory", "Dominique", "Alex", "Comité"], [
    ["Approbation du plan et des dépenses", "A", "C", "R", "C", "I", "I"],
    ["Remise en service Azure et demande TI", "A", "C", "R", "I", "I", "—"],
    ["Développement de l'agent et ingestion", "I", "I", "R/A", "C", "C", "—"],
    ["Définition des indicateurs", "I", "A", "R", "C", "C", "—"],
    ["Questions de test et validation terrain", "A", "I", "R", "C", "C", "R"],
    ["Suivi hebdomadaire", "I", "A", "R", "C", "—", "—"],
  ], [3360, 1000, 1000, 1000, 1000, 1000, 1000]),
  gap(),
  H2("9.3 Cadence de suivi"),
  B("Point de suivi hebdomadaire de 30 minutes (Grégory, Dominique ; Henri au besoin)."),
  B("Séance de travail prolongée selon l'avancement, notamment pour l'atelier de métriques."),
  B("Rapport d'avancement fondé sur le tableau de bord des tests."),

  H1("10. Ressources et budget"),
  B("**Note de projet 551 :** coût estimé de 5 510,50 $ CA (licences et crédits Copilot Studio : 2 510,50 $ ; équipement : 3 000 $). Ce budget ne comprend **aucune ligne Azure AI Search**."),
  B("**Service Azure AI Search, niveau Basic** (demande TI 77048) : environ 112 $ CA par mois (prix Microsoft, Canada Centre)."),
  B("**Indexation initiale :** budget prévu dans la demande TI d'environ 650 $ CA, plafond de 1 200 $ CA. Pour le seul manuel IC (environ 1 567 pages), le coût de lecture est estimé à environ 45 $ CA."),
  B("**Phase 0 (ingestion locale) :** coût nul (aucun service infonuagique, traitement sur poste de travail). L'exécution locale d'un modèle de vision sur le serveur GB10 reste à évaluer."),
  B("**Ressources humaines :** réalisation (stage), accompagnement méthodologique, disponibilité des mécaniciens pour la validation terrain."),

  H1("11. Risques"),
  T(["Risque", "Prob.", "Impact", "Mesure d'atténuation"], [
    ["Environnement Azure non rétabli à temps", "Élevée", "Aucune démonstration possible ; jalon de février compromis", "Décision prioritaire du commanditaire (D1) ; suivi du chemin critique"],
    ["Corpus scolaire limité au manuel IC (environ 55 des 193 véhicules)", "Élevée", "Démonstration non représentative du parc (Thomas, Blue Bird)", "Décision sur l'accès aux portails des fabricants (D2) ou périmètre assumé"],
    ["Jeu de test insuffisamment exigeant", "Moyenne", "Surestimation de la performance", "Questions fournies par des mécaniciens ; rejeu de cas réels"],
    ["Qualité des documents (tableaux, images, jargon)", "Moyenne", "Réponses erronées ou incomplètes", "Analyse manuelle préalable ; glossaire ; cycles ciblés"],
    ["Valeur perçue faible par les seniors", "Moyenne", "Adoption limitée", "Mesurer aussi l'apport documentaire (sécurité, véhicules peu familiers)"],
    ["Historique de maintenance de qualité inégale (phase 2)", "Moyenne", "Pistes trompeuses", "Phase distincte ; interventions similaires seulement ; validation préalable"],
    ["Biais d'auto-évaluation : jeu d'essai construit à partir de la propre extraction du système", "Élevée", "Surestimation de la qualité (98 % d'autocohérence non représentatif)", "Jeu à l'aveugle rédigé à partir des images de pages ; partition figée mise au point / réserve ; fidélité mesurée contre un moteur indépendant"],
    ["Limites de Copilot Studio : recherche sur le texte seulement (tableaux et schémas non restitués)", "Élevée", "Exigence multimodale non satisfaite par la solution de repli sans frais", "Alimenter Copilot Studio avec les sorties enrichies (tableaux en Markdown, graphiques verbalisés) ; chemin Azure AI Search ; essai de bout en bout à réaliser"],
    ["Classes d'extraction faibles (tableaux « GAUGE », certains tableaux de fusibles ; pages purement graphiques)", "Moyenne", "Lignes erronées ou manquantes dans certaines réponses", "Revue visuelle ciblée ; verbalisation par modèle de vision (GB10) ; suivi de la fidélité par classe"],
    ["Disponibilité limitée des ressources (stage, mécaniciens)", "Moyenne", "Retards", "Planification anticipée de la journée terrain et du comité"],
  ], [2700, 900, 2500, 3260]),

  H1("12. Décisions requises"),
  T(["#", "Décision", "Responsable"], [
    ["D1", "Rétablir l'environnement Azure : réactiver l'abonnement actuel ou rediriger la demande TI 77048 vers un abonnement de l'entreprise ; approuver la dépense", "Pierre Zivec"],
    ["D2", "Périmètre documentaire de février : manuel IC seul, ou ouverture de l'accès aux manuels Thomas et Blue Bird", "Pierre Zivec"],
    ["D3", "Échéance du prototype : date intermédiaire, ou février comme seule échéance ferme", "Pierre Zivec, Henri Eckern"],
    ["D4", "Langue de départ, compte tenu de l'importance du français pour les utilisateurs", "Comité de projet"],
    ["D5", "Indicateurs et cibles définitifs (atelier de métriques)", "Henri Eckern, Dominique, Grégory Riley"],
    ["D6", "Durée consacrée au scolaire avant le volet électrique et l'extension à l'Ontario", "Pierre Zivec"],
  ], [700, 6160, 2500]),

  H2("12.1 Décisions prises"),
  T(["#", "Décision", "Statut"], [
    ["D7", "Adopter, pour la phase 0, une chaîne d'ingestion multimodale locale sans Azure (hors ligne, déterministe, sans frais) comme source commune des fichiers de connaissances Copilot Studio, du futur index Azure AI Search et du serveur GB10. L'architecture cible demeure inchangée.", "Adoptée le 5 novembre 2026 ; à porter à la connaissance du commanditaire"],
  ], [700, 6160, 2500]),

  H1("13. Alignement avec la note de projet 551"),
  P("Le présent plan précise la note 551 sans la remplacer. Les ajustements ci-dessous sont soumis à l'approbation du commanditaire."),
  T(["Élément", "Note 551", "Plan proposé"], [
    ["Périmètre", "Ateliers de Beloeil, Sudbury et Kitimat (15 utilisateurs)", "Preuve de concept scolaire, Québec ; essai terrain à Saint-Jean"],
    ["Langues", "Français, anglais, espagnol", "Une langue de départ, puis traduction"],
    ["Indicateur de qualité", "95 % de confiance d'évaluation agentique", "Maintenu ; seuil intermédiaire de 75 % pour l'analyse par système"],
    ["Sources", "Manuels, procédures et historiques", "Documentation en v0.1 ; historique en phase 2"],
    ["Budget", "5 510,50 $ CA, sans Azure AI Search", "Besoins Azure à ajouter (section 10) ; phase 0 sans frais"],
  ], [2000, 3400, 3960]),

  H1("14. Approbation"),
  T(["Rôle", "Nom", "Signature", "Date"], [
    ["Commanditaire", "Pierre Zivec", "", ""],
    ["Chef de projet", "Henri Eckern", "", ""],
  ], [2340, 2340, 2880, 1800]),
];

const doc = new Document({
  creator: "Grégory Riley", title: "Plan de projet — Greg Boulon, preuve de concept scolaire",
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 30, bold: true, color: NAVY },
        paragraph: { spacing: { before: 360, after: 140 }, keepNext: true, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RED, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 24, bold: true, color: NAVY },
        paragraph: { spacing: { before: 220, after: 100 }, keepNext: true, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }, titlePage: true },
    headers: {
      default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Greg Boulon — Plan de projet, preuve de concept scolaire", { size: 16, color: GREY })] })] }),
      first: new Header({ children: [new Paragraph({ children: [] })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
        run("Version 1.1 — Document interne — Page ", { size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY }),
        run(" de ", { size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: GREY })] })] }),
      first: new Footer({ children: [new Paragraph({ children: [] })] }),
    },
    children: [...title, ...control, ...body],
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log("written", b.length); });
