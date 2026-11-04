# Demande IT — outils pour VoiceStudio (projet local)
*IT request draft. French for IT, English gloss under each section. Not sent yet; Greg decides.*

**Date :** 2026-10-27
**Demandeur :** Greg Riley (gregory.riley@transdev.com)
**Projet :** VoiceStudio, open-source app de synthèse vocale locale (github.com/debpalash/VoiceStudio, licence open source). Code cloné dans `C:\TRANSDEV HUB\2-projects\voicestudio`.

## Objet
Installer les outils de développement nécessaires pour faire fonctionner VoiceStudio en local sur le poste de Greg.
*Subject: install the developer tools needed to run VoiceStudio locally.*

## Logiciels demandés
| Outil | Pourquoi | Version requise |
|---|---|---|
| **Bun** | gestionnaire de paquets et lanceur de l'application Electron (`bun install`, `bun run dev`) | dernière stable |
| **uv** | gestionnaire de l'environnement Python du backend (`uv.lock`) | dernière stable |
| **Python** | le backend | 3.11 minimum (3.11 recommandé; Python 3.14 déjà présent) |
| **Visual Studio Build Tools (C++)** | compilation de certaines dépendances natives Windows | seulement si l'installation Electron l'exige |

*Bun = JS package manager and Electron launcher; uv = Python env manager for the backend; Build Tools only if a native dependency needs compiling.*

## Espace disque et réseau
- Environ **5 Go** libres pour PyTorch (version CPU) et les dépendances Python.
- Téléchargement de modèles vocaux ensuite (taille variable, plusieurs Go selon le moteur choisi).
- Accès requis à : `github.com`, `pypi.org`, `files.pythonhosted.org`, `registry.npmjs.org`, `download.pytorch.org`, `huggingface.co`.
- *About 5 GB disk; access to GitHub, PyPI, npm, PyTorch and Hugging Face.*

## Justification
**[À COMPLÉTER PAR GREG : le but professionnel précis du prototype et le lien avec son travail.]**
Le moteur est prévu pour tourner en local, sans compte ni clé d'API en mode local. À confirmer avant envoi : aucune donnée Transdev ne sort du poste.
*[GREG TO FILL IN: the specific business purpose and link to his work; I have not invented one.] Local-mode engine, no account or API key expected; confirm before sending that no Transdev data leaves the PC.*

## Ce qui est déjà fait (sans installation)
- Code source cloné (lecture seule, aucun logiciel installé).
- Skills Claude de VoiceStudio copiés dans l'espace de travail (`C:\TRANSDEV HUB\.claude\skills\`).
- *Source and Claude skills are in place; nothing installed yet.*

## Action demandée à Greg
Soumettre ce texte au portail IT (ou à Henri, selon la procédure) et joindre la liste ci-dessus. Vérifier d'abord le portail de logiciels en libre-service.
*Greg submits via the IT portal first, then the ticket.*
