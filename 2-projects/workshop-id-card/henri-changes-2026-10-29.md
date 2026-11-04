# Workshop ID Card: Henri's requested changes (meeting 2026-10-29)

Source: transcript of the 2026-10-29 check-in (Henri Eckern, Gabriel Lecavalier, Greg), pasted in chat by Greg. Corrections Greg added after the meeting are marked **(Greg)**.

Status: ✅ done · 🔄 in progress · ⏳ waiting on someone · ⬜ not started

## A. Web app (form + generated card)
| # | Request (what Henri said) | Status |
|---|---|---|
| A1 | Make the whole tool bilingual. The interface was French while the card was English. "Interface en anglais et en français, peut-être un switcher" that also sets the card language automatically. | ✅ one FR/EN switcher in the header |
| A2 | Remove the "AI slop": "Une fiche claire. Un atelier à la fois.", "Nouvelle fiche atelier", "De vos réponses à votre ID Card", "Même structure, mêmes repères visuels…", every decoration. "On n'est pas chez Zara." | ✅ |
| A3 | No 5 steps: everything on one page, in sections ("rubriques"). Denser and less pretty is fine. | ✅ |
| A4 | The interface only refers to "Fiche atelier" (FR) or "Workshop ID Card" (EN). | ✅ |
| A5 | Workshop name: OK as is. | ✅ kept |
| A6 | Country: default to Canada, remove the search country; users only pick a city in Canada. | ✅ form and card show "Canada" until a city is picked |
| A7 | Segment and level ("classement"): OK as is. | ✅ kept |
| A8 | Contract: OK as is (Henri first suggested adding "Other", then dropped it). | ✅ kept |
| A9 | Fleet ownership logos: Henri will send the logos. | ⏳ Henri |
| A10 | Number of buses, number of spare buses: OK. | ✅ |
| A11 | Yearly km per bus: say it is an **average**. **(Greg): FR wording = "Kilomètre annuel en moyenne par bus"** | ✅ form + card (EN: "Avg. yearly km / bus") |
| A12 | Average age, number of models, inspection cycle, fleet energy: OK. | ✅ |
| A13 | People (technicians, total staff): small compact boxes; "no huge box to type 22". Same for shifts and operating days. | ✅ |
| A14 | Make sure everything is really FR and EN, with no mixing. | ✅ |
| A15 | Workshop ownership logos: Henri will send them. Bays, parking places: OK. "The rest is perfect." | ⏳ Henri |
| A16 | Card rendering must be clean: logos aligned properly. | ✅ icons redrawn in place; ownership logos wait on A9/A15 |
| A17 | The small workshop tools icon on the card must sit "behind" (in the background). | ✅ read as: moved before the Atelier title like the other headers; gears no longer touch "Segment". Confirm with Henri |
| A18 | Regenerate the logos/icons as SVG so they are sharp (currently blurry). **(Greg): all logos and icons, easy to modify** | ✅ 24 SVGs in `dist/assets/icons/` (Transdev mark is a redraw: replace with the official file) |

## B. PowerPoint (fillable slide)
| # | Request | Status |
|---|---|---|
| B1 | A French/English version of the Workshop ID Card slide. **(Greg): one file with a language switcher, not two files** | ✅ `powerpoint/Workshop_ID_Card_Fiche_atelier.pptm`, ribbon Français / English |
| B2 | Fields must be fillable and the card printable with Ctrl+P. **(Greg): fill in and print from the normal (edit) view, not only in Slide Show** | ✅ fields are plain text boxes |
| B3 | The fields: no outline, no background, keep only the text, editable on the slide. | ✅ |
| B4 | Ideally a yellow fill on screen that turns transparent when printing. | ✅ via ribbon Print / Highlight (plain Ctrl+P prints the yellow: PowerPoint has no print event) |
| B5 | **(Greg)** Remove "Chapter 2": the title is just "Fiche atelier" (FR) or "Workshop ID Card" (EN). | ✅ |
| B6 | **(Greg)** Country defaults to Canada (not "Saint jean, Canada"). | ✅ |
| B7 | **(Greg)** FR: "Kilomètre annuel en moyenne par bus". | ✅ |
| B8 | **(Greg)** All logos and icons as SVG. | ✅ the 12 raster pictures replaced; the rest were already SVG |

## C. Not for the tool (segmentation method, for reference)
- Segment = factual constraints (buses, bays, ratios, type of work); medal (bronze/silver/gold) = quality against what that segment should achieve.
- Gabriel challenged the weighted Excel ("you tune the weights until you get the result you want"). Henri agreed and asked Greg and Gabriel to **propose their own segmentation + medal approach** (it may include non-numeric criteria). The "target segment" column in the Excel can be ignored.
- Next talk: tomorrow (30 min) or Monday.
