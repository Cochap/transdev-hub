---
name: llm-wiki
description: Use when ingesting a source into the wiki, querying the wiki, linting it, or when the user says "ingest", "add to wiki", "what does the wiki say", "lint the wiki", or "supervisor summary". Karpathy LLM-wiki workflows for this project (raw/ -> wiki/ governed by CLAUDE.md).
---

# LLM Wiki workflows

Pattern: raw sources (immutable) -> wiki (LLM-owned, compounding) -> schema (CLAUDE.md). Conventions live in CLAUDE.md; this skill holds the step-by-step workflows. Page templates are in `templates/`.

## Orient (start of every wiki session)
1. Read `wiki/index.md` and `wiki/overview.md`.
2. Recent history: `grep "^## \[" wiki/log.md | tail -5`.
3. Read `wiki/questions/open-questions.md`.

## Ingest (one source at a time, user stays involved)
1. Identify the file in `raw/` (never edit it; if text conversion is needed, convert to a scratch location, not raw/). PDFs: poppler is installed (see docs/setup-notes.md); if Read fails on a PDF, restart the app or use pdftotext / pdftoppm into the scratchpad. For markdown with images, read the text first, then view key images separately.
2. Read it fully. Discuss 3-5 key takeaways with the user BEFORE writing; let them steer emphasis.
3. Write `wiki/sources/<kebab-name>.md` from `templates/source.md`.
4. Create or update every related entity/concept page (typically 5-15). Add `[[links]]` both ways.
5. Flag contradictions with `> CONFLICT:` citing both sources; add new unknowns to `open-questions.md` and close answered ones.
6. Update `wiki/index.md` (link + one-line summary + source count).
7. Append `## [YYYY-MM-DD] ingest | <title>` to `wiki/log.md` listing pages touched.
8. Report the pages touched. Do not batch-ingest unless the user asks.
Sensitive data: never copy raw work-order rows or costs into the wiki; record schema, aggregates and anonymized examples only.

## Query
1. Orient, then read index -> relevant pages -> answer with `[[page]]` citations and raw-source references.
2. If the answer is a reusable analysis, comparison or discovery, file it as `wiki/syntheses/<name>.md`, add it to the index, log it as `query`.
3. Say when the wiki cannot answer and suggest a source to ingest.

## Lint (on request, or suggest after ~10 ingests)
Check: contradictions, stale/superseded claims, orphan pages (no inbound links), concepts mentioned without a page, missing cross-links, missing frontmatter, index entries that don't match files, data gaps. Fix mechanical issues, list judgment calls for the user, suggest new questions/sources. Log as `lint`.

## Supervisor summary
Generate `wiki/syntheses/supervisor-summary.md`: plain language, no jargon, no raw data, what the tool does, problems found, options, recommendation status. Publish only on request, only as a private page.

## Carry-over to another project
Copy `.claude/skills/llm-wiki/` and the "LLM Wiki" + "Data rules" sections of CLAUDE.md, create `raw/` and `wiki/` with `index.md`, `log.md`, `overview.md`, then adapt entity/concept categories to the new domain.
