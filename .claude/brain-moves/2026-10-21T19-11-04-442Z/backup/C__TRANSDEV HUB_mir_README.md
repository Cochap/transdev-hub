# MIR export analyzer

A small tool that reads the work-order export Alex sends and, in a few minutes, tells us how good the data is (how much text is usable, how many repeat repairs, how big the search index would be). It only uses Node.js, which is already installed. It installs nothing and uses no internet.

## Run it on the real export (3 steps)

1. Save each table Alex sends as a **CSV file** (a plain-text table; in Excel: File > Save As > "CSV UTF-8") named after the table, for example `TBONS.csv`, `PlainteDet.csv`, `VEHICUL.csv`, `TBONSMEC.csv`, `TBONSDET.csv`, `A_CodeReparationExclu.csv`, `A_CodeRaisonExclu.csv`. Put them all in the folder `C:\TRANSDEV HUB\mir\export`.
2. Open a terminal in `C:\TRANSDEV HUB\mir` and run: `node analyze-export.js export`
3. Open the report it names at the end: `C:\TRANSDEV HUB\mir\report.md` (a Markdown file is a plain text file with simple tables; Notepad or VS Code opens it).

Excel files (.xlsx) cannot be read directly; the tool tells you if that is all it finds.

## Try it on fake data first

`node make-fixtures.js` creates invented files in `mir\fixtures`. Then `node analyze-export.js fixtures --out fixtures\report-synthetic.md --json fixtures\metrics-synthetic.json` analyzes them, and `node make-fixtures.js --check` compares the report's numbers with the numbers hidden in the fake data on purpose (all should say PASS). The first line of a report made from fake data says so.

## Good to know

- The report shows counts, percentages, codes and their descriptions. It never shows the texts the mechanics wrote.
- Columns that identify a person (for example NOMFULL, ALIAS, SALAIRE) are skipped while reading and only listed by name in section 7.
- Missing tables or columns are listed in section 7, never hidden.
- "Usable text" means at least 15 characters and not a throwaway word such as "OK", "réparé" or "idem". You can change the 15 and the list of throwaway words at the top of `analyze-export.js`.
- The vector memory section is an **estimate**, not a measurement.
- What the "Exclu" flags mean is unknown; the report only shows which codes carry them.
