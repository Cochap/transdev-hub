# Greg's Business Wiki — Schema

This is an LLM-maintained wiki (Karpathy "LLM Wiki" pattern, gist 442a6bf5). **Claude writes it, Greg reads it.** Greg never has to do bookkeeping.

## Three layers
1. **Raw sources (immutable, never edited by the wiki):** `../docs/`, `../tests/`, `../recovery/`, `../rebuild/`, `../../RESUME.md`, meeting transcripts, anything Greg drops in `raw/`. The wiki only *reads* them.
2. **The wiki (`wiki/`, owned by Claude):** markdown pages below.
3. **This schema:** how pages are named, linked, ingested, queried and linted. Claude and Greg co-evolve it.

## Folders
| Folder | Holds | Filename |
|---|---|---|
| `entities/` | people, organizations, systems, tools, resources | `kebab-case.md` |
| `concepts/` | ideas, methods, terms (RAG, golden set, approval gate…) | `kebab-case.md` |
| `projects/` | BOULON phases, workstreams, deliverables | `kebab-case.md` |
| `decisions/` | one page per decision (D-numbers, ADRs); date goes in frontmatter | `decision-slug.md` |
| `sources/` | one summary page per raw source | `slug.md` |
| `rules/` | Greg's standing rules and preferences | `kebab-case.md` |
| `raw/` | new material Greg drops in to be ingested | any |
| root | `index.md`, `log.md`, `overview.md`, `open-questions.md`, `CLAUDE.md` | |

## Page format
Every page starts with YAML frontmatter:
```
---
title: Human title
type: entity | concept | project | decision | source | rule | overview
status: current | retired | proposed | open
updated: YYYY-MM-DD
sources: [relative paths to raw files, or source pages]
---
```
Then: a one-paragraph plain-language summary, details, a **Related** section of `[[wikilinks]]`. Link with Obsidian style `[[page-name]]` (filename without .md). Every page must have at least one inbound and one outbound link.

## Rules of the wiki
- **Plain language first.** Explain any technical term in the same page the first time it appears (Greg's standing rule).
- **Cite the ORIGINAL source (Greg, 2026-11-04: "ALWAYS"). Every factual claim links the original article, repo, doc URL or raw file path inline, never only a summary page. Every factual claim names its raw source (path in `sources:` frontmatter or inline). No source → mark `(unverified)`.
- **Never invent.** Do not add legal, privacy, compliance, approval or IT-process requirements unless Greg or a named Transdev person stated them, or an official source is cited. (Greg's correction, 2026-09-29.)
- **Keys and secrets never go in the wiki.**
- **Contradictions:** never silently overwrite. Keep the newer fact, move the old one to a "Superseded" line with its date and source, and list it in `open-questions.md` if unresolved.
- **Retired things stay** with `status: retired`, what replaced them and the revisit condition.
- **Dates** are absolute (`2026-09-30`), never "yesterday".
- **Write for scanning:** Greg has ADHD and reads endings first. Put a one-line "Bottom line" at the top of long pages.

## Operations
**Ingest** (new source or new session facts): read it → write/refresh its `sources/` page → update every entity/concept/project/decision page it touches (a source often touches 5–15 pages) → update `index.md` → append to `log.md`.
**Query:** read `index.md` first, open the relevant pages, answer with `[[links]]`. If the answer is a valuable synthesis, file it back as a new page.
**Lint** (weekly or on request): find contradictions, stale claims, orphan pages (no inbound links), missing pages for names mentioned often, pages with no sources; write findings to `log.md` and fix what's safe.

## index.md and log.md
- `index.md`: catalog of every page, grouped by folder, one line each. Updated on every ingest. Read first on every query.
- `log.md`: append-only, newest at the bottom, each entry starts `## [YYYY-MM-DD] ingest|query|lint|edit | Title`.

## Relationship to the project
`../docs/continuity-log.md` remains the *chronological* record for BOULON. This wiki is the *compiled, cross-linked* layer on top of it. After each `boulon-hq-update` the session should also run an ingest of any new durable facts here.
