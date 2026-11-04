# Hand-off: Workshop ID Card (web app + PowerPoint), 2026-10-29 evening
Paused mid-fix at Greg's request. Nothing is uploaded or sent.

## 1. Start here
| What | File |
|---|---|
| Every change Henri asked for (meeting 2026-10-29) + status | `2-projects/workshop-id-card/henri-changes-2026-10-29.md` |
| Folder map | `2-projects/workshop-id-card/ROUTER.md` |
| Meeting transcript | pasted in chat only (not saved in `raw/` yet) |

## 2. Web app: `2-projects/workshop-id-card/dist/`
| File | What changed |
|---|---|
| `index.html`, `style.css`, `app.js` | One page (5 sections, no steps), FR/EN switcher in the header drives form + card, no decorative text, Canada only, "Kilomètre annuel en moyenne par bus", card title "Fiche atelier" / "Workshop ID Card", card default "Canada" |
| `assets/icons/` (+ `ROUTER.md`) | 24 SVG icons drawn over the blurry ones in `card.png`. Positions = `ICONS` list in `app.js` (measured in card units). `transdev.svg` is a rejected redraw: do not use |
| `../backup-2026-10-29/` | app.js / index.html / style.css before today's rewrite |
| Local test | `node` static server on port 4791 serving `dist/` (city search needs the live site: the city files are not local) |

**Still to do (web)**
- **A13 not satisfied:** number boxes must be really small, several per row (`style.css`: `.fields` grid and `.field.small input`).
- **A16 judged "botched":** centre every icon on its column header, same size per row (edit `ICONS` in `app.js`).
- Upload `index.html`, `app.js`, `style.css` and `assets/icons/` to the Sites project (see the parent ROUTER).

## 3. PowerPoint: `2-projects/workshop-id-card/powerpoint/`
| File | What it is |
|---|---|
| `Workshop_ID_Card_Fiche_atelier.pptm` | ONE bilingual fillable card. Fields = yellow text boxes (Normal view). Ribbon tab "Fiche atelier / ID Card": Français, English, Update, Tick, Highlight, Print. Ctrl+P hides the yellow (Backstage onShow/onHide) |
| `build-fillable-card.ps1` | Rebuilds the .pptm from the untouched original `OneDrive - TRANSDEV\Documents\workshop id slide - fillable.pptm`. Run it with a UTF-8 BOM copy (PowerShell 5.1 needs it) and kill `POWERPNT.EXE` first |
| `test-macros.vbs` | Opens a copy and runs RefreshAll / SetLanguage FR / SetFieldFill / EN, then exports PNG previews (open with a window or the macros act on nothing) |
| `preview_*.png` | Renders from the previous build (older than the latest fixes) |

**State when paused:** the latest build-script edits (ticks placed at a fixed offset inside each box, centred shift/day labels via TextFrame2, smaller energy icons) were saved, but the build was stopped before it finished. **Rebuild, then check the render.**

**Still to do (PowerPoint)**
- Check boxes aligned in columns and rows, and level with their labels. Contract type is done; Conditions, Energy, Shifts and Days are not verified. The red tick is a separate shape `tick_<name>`, not inside `chk_<name>`.
- Fields overlapping borders: inset 4 pt and max 20 pt high was added. Verify on the render.
- Original Transdev logo is back (FleetLogo_1 / ShopLogo_1 no longer swapped). Verify.
- Ctrl+P hides the yellow: added, **not tested by hand**. Test: open the file, Enable Content, Ctrl+P, look at the preview.
- Click-test every ribbon button (not possible from Claude).

## 4. Gotchas met today
- PowerShell variable names ignore case (`$t` = `$T`).
- `’` breaks PowerShell strings.
- VBA allows only 24 line continuations.
- Leftover `POWERPNT.EXE` makes COM hang.
- npm is blocked by the proxy (SELF_SIGNED_CERT).
- The built-in browser refuses localhost; use Chrome DevTools MCP.
