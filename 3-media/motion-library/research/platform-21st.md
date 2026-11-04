# 21st.dev as a motion-UI research platform for an agent (checked 2026-10-01)

Method: `curl.exe -sL --ssl-no-revoke` on the .md twins. Everything below was read directly unless marked UNVERIFIED.

## 1. Free vs paid (https://21st.dev/pricing.md, https://21st.dev/mcp.md)
- Free (Hobby, $0): full marketplace browsing, unlimited UI Inspirations, unlimited SVG logo search, "2 free copies / day", 5 Design Bug Bot reviews. No MCP numbers beyond that.
- Builder $6/mo (yearly) or $8 (quarterly): unlimited installs and "unlimited MCP component retrieval". Builder+AI $15-60/mo adds 500-2,000 AI credits (for `generate`). Team $7.50/seat.
- MCP tools (mcp.md; says list is "a representative slice", authoritative list = server `tools/list`, not fetched):
  - `search`: free, metadata only (no code).
  - `get_component`: "paid retrieval" (code). Free tier = 2 copies/day per pricing.md.
  - `get_inspiration`: search reranked by a project's Design Context. Free/paid status not stated in mcp.md (pricing says Inspirations unlimited on free) - UNVERIFIED for MCP.
  - `search_logo`: free, unlimited.
  - `generate`: "paid on the free tier" (needs AI credits).
- Component pages say "Free accounts get a limited number of installs per day" (no number there; 2/day from pricing.md).

## 2. Size of the motion subset (tag pages, .md)
Counts are inconsistent on the pages themselves (blurb count vs "N components available"); list shows only first 60.
- text-animation: blurb "33", page "200 available"
- animation: blurb "304", "200 available"
- hero: blurb "284", "200 available"
- background: blurb "40", "200 available"
- scroll: blurb "37", "73 available"
- hover: blurb "75", "142 available"
- Whole catalog: "12,000+ components" (mcp.md/llms.txt). Also /s/animated tag and libraries: Aceternity UI, Magic UI, Motion Primitives, Kokonut UI (llms.txt).
Examples: Blur Reveal, Vertical Cut Reveal, Text Along Path (text-animation); Sonar Grid, Shiny Button (animation); Jade Sky, ibelick Background snippets (background); Stacking Cards, Smooth Scroll, Marquee (scroll); Holo Card, Animated Tooltip (hover).
The lists have no motion-intensity, speed, or "subtle" rating; many are flashy (shiny, holo, 3D, scroll-locked video).

## 3. What an agent receives per component page (.md)
Only ~800 bytes: title, one-line description, author, library, LICENSE, tags, npm dependencies (sometimes missing), live-preview URL (not a screenshot), install command. NO source code, NO video/image, NO props or timing values in the markdown. Code needs `get_component` (MCP, paid beyond quota) or `npx shadcn add "https://21st.dev/r/<author>/<slug>?api_key=$API_KEY_21ST"`.
Five samples:
1. tom_ui/blur-reveal: MIT, deps motion, tags Text Animation/Blur/Reveal.
2. cnippet-dev/m-vertical-cut-reveal-2: license "no-license", no deps listed.
3. danielpetho/text-along-path: MIT, motion (scroll-driven or loop).
4. ibelick/background-snippets (radial black violet): license "unknown", no tags, no deps.
5. hyperiux/shiny-button: "mit", tags Button/CSS/Hover, no deps listed.
Licence/dependency tally of first 60 in list (fetched each page):
- text-animation (60): unknown 20, mit/MIT 35, no-license 4 (of 60: 0 AGPL). Deps: motion 30, framer-motion 11, gsap 3 (+@gsap/react 2); 16 list none.
- hero (55 of 60 fetched): unknown 30, mit/MIT 17, no-license 8, AGPL-3.0 1 (do not use). Deps: lucide-react 19, framer-motion 11, next 6, motion 5, gsap 4.
- background (60): unknown 31, mit/MIT 25, no-license 3, "Aceternity License" 1. Deps: motion 3, framer-motion 2, three 1; most list none (pure CSS/Tailwind). "three" also appears in 1 hero component.

## 4. Licensing for commercial use
No platform-wide licence statement found in llms.txt/pricing.md (grep for licen/commercial/terms returned nothing in llms.txt). Licence is a per-component field set by the author. Roughly 1/3 of sampled components are "unknown" or "no-license" (no-license = all rights reserved by default in law). Only MIT-tagged ones are clearly safe; an agent must filter on `License: MIT/mit`. Terms of service not read - UNVERIFIED.

## 5. Setup
- `npx @21st-dev/cli@latest init --client claude` writes/prints MCP config (endpoint https://21st.dev/api/mcp, header x-api-key or Bearer). Needs a 21st account and API key created at https://21st.dev/mcp, pasted by the user. Needs Node/npx (Node v24 is installed on this PC). No admin install is needed in principle (npx, user-level config); company-PC network/policy not tested. OAuth 2.1 alternative documented at /auth.md.
- Tag/component .md pages need NO key and no account (worked here with curl).

## 6. Weaknesses / failure modes
- Markdown pages give no visual and no code: an agent cannot judge "restrained, soft" motion from metadata; needs preview render (browser) or code retrieval.
- Free code retrieval ~2/day: not enough to compare candidates; effectively requires Builder ($6-8/mo) for an agent workflow.
- Inconsistent counts; list capped at 60 per tag page in markdown.
- Licence gaps (unknown/no-license ~1/3; one AGPL in hero).
- Quality varies (community, mixed authorship); many components are showy, not soft. Many depend on lucide-react/next/gsap/other libs beyond motion.
- Paywalled pieces and the API-key-in-URL install pattern: key appears in the shell command/URL (keep out of logs).

## Verdict
Good SINGLE discovery index (huge, free metadata, agent-friendly .md and MCP), but not sufficient alone for soft-motion curation: it lacks visual/intensity data and has a licence/quality spread. Best used with a paid Builder tier ($6/mo) or screenshots of live previews, filtered to MIT and the motion/framer-motion dependency.

Sources: https://21st.dev/pricing.md, /mcp.md, /llms.txt, /community/components/s/{text-animation,animation,hero,background,scroll,hover}.md, component .md pages listed above.
