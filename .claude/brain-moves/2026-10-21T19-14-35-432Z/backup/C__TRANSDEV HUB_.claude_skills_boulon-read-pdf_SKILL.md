---
name: boulon-read-pdf
model: haiku
description: Use whenever Greg gives a PDF, a scan or a document image to read or ingest, or when the Read tool fails on a PDF (pdftoppm not installed, text extraction returns empty because the file is a scan). Tries pdftotext, then the anthropic-skills:pdf skill, then renders the pages with pdf.js in the built-in browser. Then routes the file as a source of truth.
---
# Read a PDF or a scan on Greg's PC

Order matters: cheapest first.

1. **Text layer?** `pdftotext -layout "<file>" out.txt` from Git Bash. Real text means you are done: Read or Grep the text. Output of 0 to a few bytes means a scan (no text layer).
2. **The `anthropic-skills:pdf` skill.** It lives in `C:/Users/rilg01/.claude/skills/synced/<id>/pdf/SKILL.md` and may not appear in the skill list (the list drops descriptions when it overflows). Invoke it by name, or read that SKILL.md and follow it.
3. **Scan fallback, proven 2026-10-07 on the project brief 551:**
   - Inspect: structure and image layers (`/Filter` names). Fax-style masks (CCITT) cannot be decoded by hand.
   - Run `node .claude/skills/boulon-read-pdf/viewer/serve.js "<pdf>" 4789` in the background.
   - In the built-in browser (a new tab, not the Chrome extension): open `http://127.0.0.1:4789/?p=1&s=1.3`. `p` = page number, `s` = scale. The pane downloads PDFs instead of showing them and `file://` cannot be screenshotted, which is why pdf.js is used.
   - Wait about 10 seconds. A screenshot taken during rendering times out: wait and retry. The pane is about 560 px wide: a scale of 1.3 shows the left part of a letter page; scroll right or lower `s` for the rest. `resize_window` emulation shrinks the picture, so leave it at desktop.
   - Read each page, double-check numbers by arithmetic, state that the text is read from a scan.
   - Stop the server and close the tab when done.
4. **Never** send the document to an outside service. Keep the original.

## Then route it
- Copy the original to `docs/source-of-truth/<date>-<slug>.pdf`.
- Transcribe to `docs/<slug>.md` with a "What changes for BOULON" table; mark anything cut off as unverified.
- Update CLAUDE.md (pointer, who is who), the continuity log (rule, open items, history), `docs/timeline.md`, a wiki source page and index, a memory note, BOULON HQ and the costs document if money or scope changed.
- On a conflict with older docs, the new source wins and the conflict goes in the log.
