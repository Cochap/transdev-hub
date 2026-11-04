# React Bits through the shadcn MCP as a single motion platform

Research date: 2026-10-01. Method: raw registry JSON and GitHub source fetched with curl. Computations were run locally on the downloaded files. WebFetch was not needed.

## Verdict

React Bits via the shadcn MCP is a good single platform for finding and installing motion, but not for searching it by meaning. The agent should read `https://reactbits.dev/llms.txt` first to pick, then use the MCP only to view and install. It also needs a hand-made "restrained" shortlist, because only about 20 of the 33 text animations avoid WebGL, GSAP or physics, and nothing in the data marks an effect as subtle.

## 1. React Bits' "own MCP"

- **React Bits has no MCP server of its own.** The docs page is `src/docs/McpServer.jsx` in the repo DavidHDev/react-bits. It says React Bits "encourages the use of the shadcn MCP server" and links to `ui.shadcn.com/docs/mcp`.
- **Setup (verbatim from that file):**
  1. Add the registry to `components.json`: `{"registries": {"@react-bits": "https://reactbits.dev/r/{name}.json"}}`.
  2. Run `npx shadcn@latest mcp init --client claude`. Cursor and vscode work the same way.
  3. Restart the client.
- **Key:** none is needed for the free library. Only the paid Pro registry needs a license key.
- **Install URL pattern (llms.txt):** `npx shadcn@latest add https://reactbits.dev/r/<Component>-<JS|TS>-<CSS|TW>`, for example `SplitText-TS-TW`.
- **Example prompts on the page:** "Show me all the available backgrounds", "Add the Dither background...", "Add a new section which fades in on scroll using FadeContent".
- **llms.txt:** `https://reactbits.dev/llms.txt` (86 KB) is a machine-readable index. It is grouped into Text Animations, Animations, Components, Micro and Backgrounds. Each entry has a one-line description and the CLI name. It also has a Key Dependencies note.
- **Unverified:** the live docs page is a single-page app, so I read the source instead of the rendered page.

## 2. shadcn MCP server

Source: `packages/shadcn/src/mcp/index.ts` on the main branch of shadcn-ui/ui. The installed CLI version may differ.

Launch with `npx shadcn@latest mcp`. It needs a `components.json` and no key.

| Tool | Purpose |
|---|---|
| `get_project_registries` | List the registries configured in `components.json` |
| `list_items_in_registries` | List items, with `registries`, `types`, `limit` (default 100) and `offset` |
| `search_items_in_registries` | Fuzzy search with `query`, plus the same filters |
| `view_items_in_registries` | Item detail with file contents, e.g. `@react-bits/SplitText-TS-TW` |
| `get_item_examples_from_registries` | Demo code, searched by patterns like `accordion-demo` |
| `get_add_command_for_items` | Returns the `shadcn add` command |
| `get_audit_checklist` | Post-install checklist |

**Can it search by meaning?** No, only fuzzy text.
- The tool description says "fuzzy matching against item names and descriptions".
- The implementation is `packages/registry/src/registry/search.ts`. It uses the `fuzzysort` library with `keys: ["name","title","description"]`.
- fuzzysort matches characters in order. It does not understand meaning.
- The `types` filter uses the registry `type` field. It does not use categories or tags.
- Since July 2026, registries may opt in to server-side search (changelog "2026-07-dynamic-search"). React Bits is a static registry, so it does not use this.

**Local simulation:** I ran fuzzysort with the same keys over the four downloaded registries (approximate, since the threshold used by shadcn is unknown).
- "subtle text reveal" returned 28 hits. The top 4 were all `Noise` (a film-grain overlay), not a text reveal.
- "text reveal" put Magic UI's `text-reveal` first.
- "blur text" found `BlurText`.
- Result: exact component words work, and vague adjectives such as "subtle", "soft" or "gentle" mostly add noise.

## 3. React Bits catalogue

Source: `https://reactbits.dev/r/registry.json` (852 items). This is 213 distinct components times 4 variants: JS-CSS, JS-TW, TS-CSS and TS-TW. Every item has `type: registry:component`. Items have **no category or tags field**. Category exists only in llms.txt and in the repo folders.

| Category | Components |
|---|---|
| Text Animations | 33 |
| Animations | 40 |
| Components (UI) | 47 |
| Micro | 34 |
| Backgrounds | 59 |
| **Total** | **213** |

The repo folder counts (`src/content/*`) match: 33, 40, 47, 34 and 59.

Dependency buckets from the `dependencies` array of the JS-CSS variant (the TS-TW variant was identical for all Text Animations):

| Category | None | Motion only | GSAP | WebGL / 3D / physics |
|---|---|---|---|---|
| Text Animations (33) | 9 | 11 | 10 | 3 |
| Animations (40) | 14 | 1 | 9 | 16 |
| Components (47) | 15 | 8 | 13 | 8 (3 other) |
| Micro (34) | 3 | 20 (several also pull an icon pack) | 0 | 2 (9 other, mostly the hugeicons icon pack) |
| Backgrounds (59) | 5 | 0 | 2 | 52 |

Across the five categories, 46 components have no dependency and 52 use ogl.

### Text Animations: every component and its dependencies

- **No dependency (9):** CurvedLoop, DepthText, EchoText, FuzzyText, GlitchText, ParticleText, SplitFlapText, TechText, TextPressure.
  - Some of these may be canvas-based.
  - I did not inspect ParticleText, FuzzyText and TextPressure for canvas code, so I cannot say whether they are subtle.
- **Motion (11):** BlurText, CircularText, CountUp, DecryptedText, GradientText, RotatingText, ScrollVelocity, ShinyText, TextCursor, TrueFocus, VariableProximity.
- **GSAP (10):** FoldText, MaskedHeading, ScrambledText, ScrollFloat, ScrollReveal, StrokeText, TextLoop, TextType, plus Shuffle and SplitText (which also need `@gsap/react`).
- **Other (3):** ASCIIText (three), FallingText (matter-js), WarpText (ogl).

So 20 of 33 text animations need no dependency or only Motion.

### Spot check: registry dependencies vs real imports (12 components, TS-TW variant)

| Component | Dependencies | Imports found | Match |
|---|---|---|---|
| BlurText | motion | motion/react | yes |
| ShinyText | motion | motion/react | yes |
| CountUp | motion | motion/react | yes |
| GradientText | motion | motion/react | yes |
| SplitText | gsap, @gsap/react | gsap, ScrollTrigger, gsap/SplitText, @gsap/react | yes |
| ScrollReveal | gsap | gsap, ScrollTrigger | yes |
| TextType | gsap | gsap | yes |
| CurvedLoop | none | react only | yes |
| FadeContent | gsap | gsap, ScrollTrigger | yes |
| AnimatedContent | gsap | gsap, ScrollTrigger | yes |
| Magnet | none | react only | yes |
| GlareHover | none | react only | yes |

Registry descriptions average 90 characters. All 852 items have one.

The Animations category is the most useful for restraint:
- FadeContent, AnimatedContent and ScrollReveal are GSAP and ScrollTrigger based.
- Magnet, GlareHover, ClickSpark, StarBorder and Noise have no dependency.

## 4. Pro tier and the Agent Kit

Source: `https://pro.reactbits.dev/llms.txt`, which describes itself as the authoritative source.

- **Agent Kit:** 20 items of design skills (8), page prompts (9) and recipes (3).
  - The skills named include Apple Minimal, Luxury Serif, Editorial, Swiss Grid, Corporate Trust, Playful Motion, Neobrutalism and Terminal Dark.
  - Terminal Dark is free.
  - The prompts cover landing-page types, including a Fitness page aimed at booked trials.
  - The recipes assemble full pages from Pro blocks.
  - The kit is design direction for whole pages. It is not a motion picker.
  - The 20th item is a setup skill ("React Bits Pro Skill", served by the Pro registry) that teaches the agent how to install Pro; it ships with the Starter tier.
- **Pricing, one-time with lifetime updates:** Starter $129, Pro $249, Ultimate $349. Annual plans are $79, $149 and $199.
  - Starter includes the 150 Pro components only.
  - Pro adds 280 page blocks, 300 app UI screens, the Agent Kit and the Landing Builder.
  - Ultimate adds 15 templates.
  - The Agent Kit is therefore in the Pro tier ($249) or above, except for the free skill and the setup skill.
- Pro is a separate license-keyed registry. Pro install commands use `@reactbits-pro/<slug>`, per the Pro llms.txt. The free llms.txt example uses a different namespace (`@reactbits-starter/`); this was not reconciled.
- **Pro has Booking-relevant items?** Not checked in detail. The pro-manifest JSON is at `https://www.reactbits.dev/pro-manifest.json`.

## 5. Alternatives via the same shadcn MCP

Registry JSON fetched directly. Fields counted per item.

| | Items | Types | Description | Other metadata | Notes |
|---|---|---|---|---|---|
| **React Bits** `reactbits.dev/r/registry.json` | 852 (213 x 4 variants) | all `registry:component` | 100%, avg 90 chars | none | The category exists only in llms.txt. |
| **Magic UI** `magicui.design/r/registry.json` | 250 | 78 ui, 170 example, 1 style, 1 lib | 247 of 250 with description, avg 57 chars | none | 31 items use motion. The examples are `registry:example`, which suits `get_item_examples`. |
| **Animate UI** `animate-ui.com/r/registry.json` | 580 | 573 ui, 5 hook, 1 style, 1 lib | 579 of 580, avg 43 chars | `meta` on 367 items | Mostly motion (366 items). Of the 259 items with `meta.keywords`, the ones I checked were icons; I checked only 4 items. `demoProps` appears on 108 items. 25 items have "text" in the name. |
| **Cult UI** `cult-ui.com/r/registry.json` | 307 | 154 ui, 153 component | 171 of 307, avg 43 chars | none | Many items have no description. |

- None of the four has categories or tags in the registry JSON.
- fuzzysort searches only name, title and description. The Animate UI keywords cannot be searched through the MCP, but they can be seen with `view`.
- By metadata quality for agent search, React Bits is best (full, longer descriptions, plus llms.txt).
- Animate UI has the cleanest "motion by default" library (Motion only) and the most items.
- Magic UI has the highest-quality component set for text reveals, and its example items help.
- Mixing registries in one MCP search is possible because the tool searches all configured registries when none is named. The risk is name collisions, and noisy results because the React Bits copies fill the results.

## 6. Real weaknesses

1. There is no semantic search. "subtle text reveal" returned `Noise` first in my simulation.
2. Each React Bits component appears four times. Searches return four near-identical rows, so use the `-TS-TW` suffix (or whichever variant fits) when viewing.
3. No category or tag field in the registry. Filtering by `types` does nothing for React Bits. The agent has to read llms.txt.
4. Restraint is not encoded. Most of the catalogue is loud: 52 of 59 backgrounds are WebGL, and many Animations and Components are 3D, particle or physics based.
5. Many "text" items are spectacle: ASCIIText, FallingText, WarpText, GlitchText, DecryptedText and similar. Only a hand-picked shortlist is soft.
6. GSAP is the most common animation dependency (35 components). Check the GSAP license (SplitText is a GSAP plugin). Not verified here.
7. The license in the README badge is "MIT + Commons Clause". Check what that allows before reuse in commercial work.
8. Pro is license-gated and cannot be found through the free MCP. The Agent Kit design skills are for whole landing pages.
9. Some components pull extra packages, such as an icon pack in Micro and `@chakra-ui/react` in one Component, so an install can pull unneeded packages.
10. I did not test prefers-reduced-motion or accessibility for any component.

## Sources

- https://reactbits.dev/r/registry.json
- https://reactbits.dev/llms.txt
- https://pro.reactbits.dev/llms.txt
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/docs/McpServer.jsx
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/README.md
- https://api.github.com/repos/DavidHDev/react-bits/git/trees/main?recursive=1
- https://reactbits.dev/r/<Name>-TS-TW.json (12 components)
- https://ui.shadcn.com/docs/mcp.md
- https://raw.githubusercontent.com/shadcn-ui/ui/main/packages/shadcn/src/mcp/index.ts
- https://raw.githubusercontent.com/shadcn-ui/ui/main/packages/registry/src/registry/search.ts
- https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/content/docs/changelog/2026-07-dynamic-search.mdx
- https://magicui.design/r/registry.json
- https://animate-ui.com/r/registry.json
- https://www.cult-ui.com/r/registry.json
