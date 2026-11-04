# Geotab at Transdev: 60 s explainer. Script and shot plan v2 (2026-11-03)
Changes from v1: the history section and the V2 bus count are dropped. Every Geotab fact now comes from geotab.com (crawled 2026-11-03, sources below). "Live at Transdev Canada" still rests on Greg's instruction (`1-boulon/docs/geotab-launch-film-prompt.md`).

## Sources (geotab.com, 2026-11-03)
- S1 /about/: about 6 million vehicles and assets connected; 100 billion data points a day.
- S2 home page: the GO device plugs into the OBD II port, with no mandatory antennas or wire-splicing. It records location, speed, idling and distance. The AI dash cam flags distraction, tailgating and rolling stops.
- S3 /vehicle-tracking-device/: 4G LTE modem; monitors seat belts.
- S4 /fleet-maintenance/: remote diagnostics, fault prioritization, maintenance reminders, work orders.
- S5 /fleet-safety/: "can reduce collisions by up to 40%" (Geotab's own claim); a major collision is 2.5 G or more.
- S6 /platform-overview/: the MCP Connector lets you query the fleet "inside ChatGPT, Claude, or Copilot."
- The public-transit page returns 404, so nothing here is bus-specific from Geotab.

## Option A (recommended): "It was warning us" (~175 words, about 56 s)
1. You think a bus breaks down without warning. It doesn't.
2. Every day, Geotab reads 100 billion data points from about 6 million vehicles. [S1]
3. The thing that listens is called Geotab.
4. It's a small box plugged into the bus's diagnostic port. No antennas, no cut wires. [S2]
5. It watches four things: where the bus is, how it's driven, how the engine feels, and when it needs service.
6. So how does it work?
7. Over 4G, each bus sends its location, speed, idling and distance to one live map. [S2, S3]
8. Tailgating, harsh braking, or no seat belt? The driver gets AI coaching. [S2, S3, S5]
9. An engine fault code? A work order lands in the mechanics' queue, and reminders roll in before the next service. [S4]
10. At Transdev Canada, dispatchers see the whole fleet at once, and one rule reaches every bus in one move.
11. Geotab says its safety tools can cut collisions by up to 40 percent. [S5]
12. So that bus that broke down "without warning"? It was warning us the whole time. Now someone is listening.
13. What would your bus tell you today?

### Shot plan A
| Time | Line | Place (empty plate) | Action | Text in the world |
|---|---|---|---|---|
| 0-1.6 | 1a | roadside bus stop, bus with hood up, smoke puff | viewer character (code-drawn arms) shrugs | stop sign: "WITHOUT WARNING" |
| 1.6-3 | 1b | same, push in 3% | red X over the sign | — |
| 3-8 | 2 | city at night seen from above, buses and trucks | icons pop one per word; counter rolls to 100,000,000,000 | billboard: "DATA POINTS TODAY" |
| 8-11 | 3 | dark stage, spotlight on a small grey box | box bounces in with squash | hanging sign typed: "GEOTAB" |
| 11-18 | 4 | bus cab, low angle under the dashboard | mechanic's hand (code arm) plugs the box in; puff | tag on the port: "DIAGNOSTIC PORT" |
| 18-24 | 5 | workshop wall, 4 hooks | 4 items land on labelled boards | "WHERE" "HOW DRIVEN" "ENGINE" "SERVICE" |
| wipe | | white splat + whoosh | | |
| 24-25.5 | 6 | #5b3fa6 headline, turning gears | "?" pops x3 | "SO HOW DOES IT WORK?" |
| 25.5-29 | 7 | dispatch room, plate's own wall screen | dispatcher at desk (side view) watches dots light up | screen: live map |
| 29-32 | 8 | bus cab seen from behind | driver brakes, dash tablet glows | dash screen: "COACHING: KEEP YOUR DISTANCE" |
| 32-36 | 9 | garage chalkboard | mechanic turns, chalk hand scribbles | "WORK ORDER: FAULT CODE" / "SERVICE DUE" |
| wipe | | white splat + whoosh | | |
| 36-41 | 10 | depot yard, the whole fleet | dispatcher taps once, every bus blinks; "!" over drivers | hanging board: "ONE RULE. EVERY BUS." |
| 41-46 | 11 | intersection, two buses stop safely | pedestrians jump back, then wave | road sign: "UP TO 40% FEWER COLLISIONS*" (*Geotab claim) |
| 46-55 | 12 | the opening bus stop, bus running fine | viewer turns, "!" pops, nods | stop sign retyped: "IT WAS WARNING US" |
| 55-58 | 13 | same, 2% drift | viewer looks at camera | sign holds: "WHAT WOULD YOUR BUS TELL YOU?" |

## Option B: "Ask your fleet" (AI angle)
- Hook: "You think fleet data lives in a dashboard nobody opens." A red X goes on "nobody opens".
- Turn: with Geotab's MCP Connector, a dispatcher types a question in Claude or Copilot and the fleet answers. [S6]
- Close: "If your buses could answer one question, what would you ask?"

## Option C: "A crash has a number" (safety angle)
- Hook: "You think a crash is just a crash." Red X.
- Turn: Geotab logs a major collision at 2.5 G or more. Its dash cam spots tailgating and phone use before anything happens, and coaching shows the riskiest events first. [S5, S2]
- Close: "What's your bus's G-force today?"
