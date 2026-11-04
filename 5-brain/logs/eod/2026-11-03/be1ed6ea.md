# Scholar buses chatbot MVP — C--TRANSDEV-HUB — C:\TRANSDEV HUB
session be1ed6ea-8ff9-4ce9-ac1d-950afbe42252

[15:18] GREG: i just finished my meeting with pierre seb alex henri and the new ai consultant and weve established an entire new scope for the project. im waiting after another chat to finish creating a transcript and plan on using the transcript to support and fill the gaps from our current documentation and scope of the project, and make 1 final proper professional practice and professional methodology document though i dont know this industry terminology so itd be important you search on it first and determine what wed prepare, using the transcripted info and anything else we know. while i wait for this mega trasncript to be generated, my idea is that we immediately get started on the mvp, which hsa changed to the chatbot being fed only on the scholar busses manuals and procedures. the mvp is considered complete once its been fed on that, and that it remains to our discretion if we want to action the steps to get the Workorders concerning that type of bus integrated into the knowledge layer and model a reponse model for that too

[15:24] CLAUDE: Checking which manual folders in the measured library are school-bus brands, then I'll lay out the MVP.

[15:29] CLAUDE: I saved the new MVP scope and worked out which manuals it covers. The real limit is the search tier, not the size of the manuals.

## What the MVP covers
In the library count from 2026-10-06 (`1-boulon/tests/results/library-measure-2026-10-06.jsonl`), two folders look like school-bus manuals:

| Folder | Files | Pages | School bus? |
|---|---|---|---|
| LION | 44 | 696 | Likely. Lion makes the LionC school bus, but some files may cover other Lion models. |
| IC Leeds | 1 | 1,567 | Not sure. IC Bus makes school buses, but I can't confirm this folder is one. |
| **Total** | **45** | **2,263** | |

- **Size (estimate):** about 197 MB of search index, give or take 25%. The current free index is capped at 50 MB and is already full. So the MVP needs the paid Basic tier, which is still with IT on ticket #77048.
- **Cost (estimate):** about CAD 63 one time to read the manuals in. That is well inside the ticket budget.
- **Already done:** 16 of the Lion procedure sheets are already in the test index.
- **Build order:** confirm the folders → split the 4 oversized files → rebuild on Basic → write a school-bus test question set → tell the agent to answer only from school-bus manuals → test → MVP done.

Everything is in [mvp-school-bus-2026-11-03.md](1-boulon/docs/mvp-school-bus-2026-11-03.md), with a dated entry in [continuity-log.md](1-boulon/docs/continuity-log.md).

## What the methodology document is usually called
From a first search:
- **Project charter:** the formal document that  […]

[15:32] GREG: so the goal here is creating an mvp based on les bus scolaires, whatever were able to fit inside thats only related to scolaire. we have to clearly know which documents in the sharepoint constitute as manuals for autobus scolaire, and make those the central focus of this iteration. we want to remove the current knowledge layer from the chatbot, and replace it with the aforementioned. ask me questions until youre 97% certain you can complete what im asking for

[15:39] CLAUDE: The manuals are in `OneDrive - TRANSDEV\Manuels`. I'm starting a background text scan of every PDF to count school-bus mentions in each file, and the folder names will get checked too.

[15:40] CLAUDE: While the scan runs, I'm checking which models sit under each vehicle-type code, and looking at the "Aide recherche information technique autobus" folder.

[15:44] CLAUDE: Scan restarted. Meanwhile I'm checking the "Aide recherche" folder, since it has Bluebird and Thomas subfolders that weren't in the October count.

[15:45] CLAUDE: These .docx guides probably say where the Blue Bird and Thomas manuals actually live, maybe on the manufacturers' portals. Reading them now.

[15:55] CLAUDE: While the scan runs, I'm writing your decisions into the MVP file.

[15:59] CLAUDE: I can't name the final school-bus file list yet. The text scan of all 2,976 SharePoint PDFs is still running, and I'll pick it up as soon as it finishes.

## What's settled
- **What counts as a school bus:** the MIR vehicle table (`VEHICUL.csv`) labels type code 15 "SCOLAIRE", which makes it a fact, not a guess. Type 15 covers Blue Bird Vision (74 units), Saf-T-Liner C2 (56, Freightliner and Thomas), IC PB105 and IC Leeds (55) and Lion (3). The 106 LionC eLion units are coded type 23 (electric), so they're out, as you chose.
- **Blue Bird and Thomas manuals are not in SharePoint.** The guides in `Manuels\Aide recherche information technique autobus\` say they're on the manufacturers' portals. Those wait until later, as you chose.
- **Rule for including a file:** its own text has to be about school buses. That applies to component manuals too.
- Everything is written down in [mvp-school-bus-2026-11-03.md](1-boulon/docs/mvp-school-bus-2026-11-03.md).

## Risks before we replace anything
1. **There may be very little left.** The LION folder probably covers the LionC, which you excluded, and the IC Leeds folder is a single 1,567-page file. With only type 15 counting and SharePoint only, the MVP could end up with almost nothing. The scan will tell us how much.
2. **The free search tier has two limits.** It holds 50 MB, and it can only process about 20 documents per day. So loading 40 files takes 2 to 3 days.
3. **Deleting the current index can't be undone.** The settings are backe […]
