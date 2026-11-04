# Divine Beauty by Anouk: Design System (draft v0.1)

Built 2026-10-01. Structure follows the sections of Material 3 Styles (color, typography, shape, spacing, elevation, icons, motion). Content follows Anouk's own direction.

Open `design-preview.html` to see it live. The values live in `design-tokens.json`; `build-system.ps1` turns them into `tokens.css` and the preview.

## Where the content comes from

The controlling source is `ZERO Cloud Handoff 2026-10-01` in the ZERO repo (Cochap/zero-shadowmind, `03 Projects/Divine Beauty by Anouk`). It overrides older briefs marked "locked". This build also read the Visual Direction & Build Prep v2, the Animated Design-System Sheet Plan v1, the Motion Lab Options v1, the Brand & Aesthetic Intake v1, and the CSS of the existing animated design sheet. Nothing in that repo was changed.

Every value carries a status so nobody mistakes a guess for a decision:

| Status | Meaning |
|---|---|
| user-reference | Named by Greg or Anouk (plum `#1D001D`, wine `#550527`, The Seasons font, olive reference). |
| candidate | Taken from the existing ZERO sheet. Production tokens are not final. |
| hypothesis | A range proposed in the Motion Lab Options, to be compared. |
| borrowed-m3 | Published on m3.material.io: the duration ladder and the standard-accelerate curve. |
| proposed | Added here to complete the system. Needs review. |
| open | Undecided, left empty on purpose (icons). |

## What was borrowed from Material 3, and what was not

Borrowed: the structure (named roles and a token ladder), the duration ladder from 50 ms to 1000 ms, and one exit curve. Not borrowed: the Google look, the bouncy "expressive" spring system, or the 4-feel idea from earlier in this session.

## What changed from the earlier work in this folder

`catalogue.html` (the sources list) still stands. `pick-your-feel.html` and `motion-sheet.html` are superseded. They were built on four invented moods and placeholder palettes that do not match Anouk's direction, and they allowed bouncy motion that the brand rules out. Keep them only as history.

## Findings worth acting on

1. **Magenta on olive fails contrast** at 1.14:1 (needs 3:1 even for large text). The existing sheet sets its hero italic this way. Use ivory or plum on olive, or put magenta on ivory (4.74:1, passes).
2. **Labels at 10 px** in the existing sheet are below a readable floor. This system sets 12 px.
3. **Font:** the sheet uses a sans (Inter) for labels, but the handoff says The Seasons throughout. The system follows the handoff.

## Not decided (do not guess)

- The Seasons licence and embedding rights.
- Exact production colour tokens, especially olive (an approximation of NCS S 6030-G70Y).
- Icon style.
- All motion values, until the Motion Lab compares them.
- Real orchid, lace and portfolio assets (the preview uses stand-ins).

## Boundaries

This system does not authorize changing the active website, the Next.js rebuild, installing any animation library, or building the Motion Lab. Those need separate approval, as stated in the handoff.

## Next steps

1. Anouk and Greg review the preview and mark what to change.
2. Resolve the font licence and lock the colour tokens.
3. If approved, build the Motion Lab so the hypothesis values can be compared side by side.
