# Geotab telematics launch film for Transdev Canada: prompt, draft v3 (2026-09-29)

v3 keeps the original "Product-film brief: one container, never cuts" text word for word. Changed: the product lines, the accent (Transdev), and the `<structure>` sequence (flow C, chosen after testing four flows on the beat grid).

```text
<inputs>
Product: Geotab telematics (https://www.geotab.com), "One platform for optimal fleet performance." Launch film for Transdev Canada.
Pull the real logos, fonts and UI screenshots from geotab.com and transdev.ca with Playwright. The brand colors and the one accent come from Transdev.
Music: synthesize an original track in code at 120 BPM.
Format: 1920x1080 (16:9).
</inputs>

<direction>
Product-film UI motion. One container never cuts: every state is the same element changing
size, radius and fill while its content swaps behind a short blur. A cursor drives every change.
Warm neutral canvas, one accent. Springs with at most a tiny overshoot.
Banned: bouncy easing, glows, gradients on UI chrome, particle bursts, dead time.
</direction>

<structure>
120 BPM, 8 bars, something happens on every beat.
logo → live map: the whole fleet appears at the same time → cursor selects one bus: location and speed open in the side panel
→ speeding, harsh braking and seat belt events land one per beat → AI driver coaching is sent
→ cursor lassos the fleet, one rule applied to every bus in one move
→ engine fault code toast → work order lands in the mechanics' queue → maintenance reminders roll in for 5 buses
→ "Copy report link" toast → logo.
</structure>

<build>
1. One HTML file, one canvas, window.seek(t). No CSS transitions, no timers, no carried state.
2. Closed-form springs. A value with many targets = sum of one spring per change.
3. Text inside a morphing container enters after the morph starts, leaves before the next one.
4. Tab indicators: leading and trailing edges on different springs so they stretch.
5. Beat grid from the track (numpy/librosa). Start on a downbeat. UI sounds on measured peaks.
6. Render in headless Chrome at 60 fps, 4 subframes per frame, blended for motion blur.
</build>

<gotchas>
Never use will-change on anything the camera scales (blurry text).
The last frame must equal the first, cursor position and velocity included.
</gotchas>

<start>
Show me the state list on the beat grid before writing code.
</start>
```

## Transdev brand, pulled with Playwright from transdev.ca (2026-09-29)
| Item | Value |
|---|---|
| Accent (the one highlight) | Transdev red `#DB0717` (rgb 219, 7, 23): header, headings, buttons |
| Secondary (used sparingly, not a second accent) | dark purple `#392150` (rgb 57, 33, 80) |
| Neutrals | black, white |
| Font | Karbon (from the site) |
| Logo | `https://www.transdev.ca/wp-content/themes/transdev/assets/images/logo_blanc.svg` (white version) |

## Flows tested on the 32-beat grid (120 BPM, 8 bars, half a second per beat)
Checks come from the original template's own pattern: 32 beats exactly, logo at start and end, text readable at 1.5 words per beat, no run of 3 similar alerts, one big "many things at once" move in the middle (the original's "recolor every Sign up button"), one in the opening, and every feature covered.
| Flow | Idea | Result |
|---|---|---|
| A Feature tour | map, then one alert after another | 4/7: three alerts in a row, nothing big in the middle, 6/9 features |
| B One bus, one shift | follow a single bus | 4/7: no "many at once" moment, 6/9 features |
| C Fleet-wide move | map, alerts, coaching, lasso the fleet, fault, work order, reminders, share | 7/7, 9/9 features |
| D Three roles | dispatcher, safety manager, mechanic | 5/7: no middle peak, 7/9 features |
Limits of this test: it checks structure, not taste. The real test is the rendered storyboard.

## Beat map for flow C (draft, 32 beats)
| Beats | Bar | What happens |
|---|---|---|
| 1-2 | 1 | Logo, container morphs into the map card |
| 3-6 | 1-2 | The whole fleet appears at the same time |
| 7-9 | 2-3 | Cursor selects a bus; location and speed open in the side panel |
| 10-12 | 3 | Speeding, harsh braking, seat belt: one event per beat |
| 13-15 | 4 | AI driver coaching sent |
| 16-19 | 4-5 | Cursor lassos the fleet; one rule applied to every bus (the peak) |
| 20-22 | 5-6 | Engine fault code toast |
| 23-25 | 6 | Work order lands in the mechanics' queue |
| 26-28 | 7 | Maintenance reminders roll in for 5 buses |
| 29-30 | 8 | "Copy report link" toast |
| 31-32 | 8 | Back to the logo (last frame = first frame) |

## Geotab features used (all named on geotab.com/products/platform-overview and the fleet pages)
Live map and location, speed, speeding, harsh braking, seat belt, AI driver coaching and safety, engine fault codes and remote diagnostics, work orders, maintenance reminders, fleet reports. Assumed live at Transdev Canada on Greg's instruction (2026-09-29).

## Playwright setup (2026-09-29)
Installed at Greg's request inside `C:\TRANSDEV HUB\3-media\film` only (`npm install playwright`, version 1.63.0). No admin rights used, nothing system-wide. Chromium was already present in the browser cache. Smoke test passed: loaded geotab.com and took a screenshot.
Real Geotab UI images found so far: `new-mygeotab-platform-ui.png` (1500x808) on the platform page; two large maintenance screens on the Fleet Maintenance page. The fleet-safety page showed no large images, so safety and map screens may need to come from Geotab's videos or support site.
