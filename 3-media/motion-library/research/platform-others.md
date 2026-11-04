# Motion-reference platforms an agent can search via MCP (besides 21st.dev, React Bits)

Researched 2026-10-01. Method: WebSearch plus WebFetch/curl of vendor pages. "UNVERIFIED" marks facts I could not confirm on a primary page. Several vendor pages (lottiefiles.com/mcp, mobbin.com/changelog, businesswire) returned 403, so those facts come from search-result summaries.

## Ranking (single-catalogue candidates for REAL motion references)
1. **Awwwards-mcp (community, free)**: only one that returns real motion data (.webm recordings, filmstrips, animation-library fingerprints) from ~4,000 award-winning sites. Scraper, unofficial, personal-use licence caveat.
2. **ScreensDesign MCP (official, Pro $299/yr)**: motion from real shipped apps (recorded flows), 2,730+ apps, hosted. Whether MCP returns video/frames is UNVERIFIED.
3. **Motion AI Kit + Motion+ ($399 one-time)**: not a visual catalogue but 450+ real, copyable, source-level examples searchable by agent. Best for code you can copy; no preview video.
Honourable: LottieFiles official MCP (100,000+ free Lottie files, hosted, OAuth) is the biggest free catalogue but is icon/illustration animation, not UI-motion references.
No platform here is "Mobbin for motion". Mobbin itself has motion in flows, but its MCP appears to return static images only.

## 1. Motion AI Kit / Motion+ (motion.dev)
- Price: AI Kit free ($0, MIT: /motion skill + docs search). Motion+ Personal $399 one-time; Business per-seat/year (amount not given). Source: https://motion.dev/ai-kit, https://motion.dev/plus
- Install: `npx motion-ai` (wires skill and MCP into Claude Code, Cursor, Amp, OpenCode, Gemini CLI, Copilot). MCP URL not published on pages I read (see https://motion.dev/docs/ai-kit-install).
- MCP tools (per search summary of docs): docs search (every docs page is an MCP resource), search of example source (Motion+), MotionScore audits, CSS spring (linear()) generation, transition editor/saved transitions. Individual tool names: UNVERIFIED.
- 450+ examples: AI-ready source code of premium examples; categories on the Plus page: carousel, AnimateNumber, ticker, cursor, typewriter, ScrambleText, splitText, curtains, page transitions, hero, pricing, nav, testimonials, loading. Plus Motion UI (30 animated sections), 110+ tutorials. MIT licence on code, commercial use OK, resale needs Builder's Licence.
- Free vs paid: free = best-practice rules + docs search. Paid = 450+ example source, springs, MotionScore, transition editor.
- Agent gets: text/code, no video.  Restriction: Motion (JS lib) only.

## 2. ScreensDesign MCP and Mobbin
- ScreensDesign: hosted `https://api.screensdesign.com/v1/mcp`, OAuth or scoped API keys, 18 tools, semantic search, Claude/Cursor/ChatGPT/Codex/Windsurf. Catalogue: 2,730+ top-grossing (iOS) apps (search snippet said 2,600+). MCP only with Pro (no separate plan); fair-use rate limits. Source: https://screensdesign.com/mcp/, https://glama.ai/mcp/servers/screensdesign-com/screensdesign-agent-skill
- Price: Pro $299/yr ($24.92/mo annual), $39/mo monthly, $29 weekly per search snippet of https://screensdesign.com/pricing/ (page itself is JS, not read directly). Pro includes 200 AI answers/month.
- Recordings: the library has "recorded screens" and "user flow videos" (https://theapplaunchpad.com/blog/mobbin-vs-screensdesign/), and a free "Animation Explorer" (https://screensdesign.com/animation-explorer) to study app animations frame by frame. UNVERIFIED: whether any MCP tool returns video/frames (descriptions mention "recorded UI" matching, screenshot matching, flows). Test with a Pro trial before relying on it.
- Mobbin: official MCP `https://api.mobbin.com/mcp`, browser OAuth, paid plan required (Pro cited as EUR 10/mo yearly; free plan has no MCP). 6 tools: search_screens, search_flows, search_apps, get_app_screens, get_app_flows, get_screen_detail (returns image as base64). 621,500+ screens, 142,200+ flows. Sources: https://chatforest.com/reviews/mobbin-mcp-server/, https://www.businesswire.com/news/home/20260511053592/en/ (403 to me; via search summary).
- Mobbin motion: the site did add short videos to flows ("screens with interesting motion captured as short videos", search summary of Mobbin changelog). Mobbin MCP returning those videos: NOT confirmed; the review says static screens only. A press-release summary mentions queries like "pull-to-refresh animations from social apps" but that is marketing text. Treat as unconfirmed.

## 3. Framer and Webflow
- Framer: official External Agents connection (https://www.framer.com/agents/external/) gives Claude/Cursor/Codex access to YOUR canvas, components, CMS. Marketplace "MCP" plugin is community-built. No evidence of an agent-searchable marketplace of animated components/templates. Community: ericpjtsai/framer-mcp-server (edit sites), Unframer (React export). Verdict: no catalogue search.
- Webflow: official MCP (https://developers.webflow.com/mcp/reference/overview; blog https://webflow.com/blog/mcp-interactions). Agent can CREATE/edit GSAP-based Interactions on your site, not search a library of examples. Webflow Made-in-Webflow cloneables: no MCP found.

## 4. Spline, Rive, LottieFiles
- LottieFiles official: remote `https://mcp.lottiefiles.com/mcp`, OAuth 2.1, no API key, four GraphQL tools, "100,000+ free animations" plus your workspace. Docs https://docs.lottiefiles.com/en/platform/mcp ; page https://lottiefiles.com/mcp. Second official server: Lottie Creator MCP (draws shapes/keyframes). Price/limits and exact return payload (JSON URL vs preview): UNVERIFIED. Old community server junmer/mcp-server-lottiefiles (search, details, popular).
- Rive: official Rive MCP is bundled in Rive Editor Early Access and drives the editor (https://rive.app/docs/editor/ai/mcp). No marketplace search MCP found. Community: ODU33104/rive-mcp.
- Spline: official Spline MCP controls the editor (https://docs.spline.design/generate/spline-mcp-server); community aydinfer/spline-mcp-server needs SPLINE_API_KEY. No community-library search found.

## 5. CodePen, Codrops, Awwwards, Godly
- Awwwards-mcp (INSANE0777 / ukind, unofficial, MIT): `npx -y awwwards-mcp`, Node >= 22.13, no API key. 12 tools incl. search_sites, search_elements, get_motion_dna (animation libs, ScrollTrigger stats, easing), record_site_motion (.webm + filmstrip; needs Playwright + ffmpeg), get_site_elements (poster images + video URLs). ~4,000+ sites, 1,500+ element items, local FTS5 index refreshed weekly. Scrapes politely, respects robots.txt; "personal design-inspiration use" only. Source: https://github.com/INSANE0777/Awwwards-mcp. No official Awwwards API/MCP found.
- CodePen: no public API; community GarthDB/codepen-mcp (ingest a pen by URL, returns HTML/CSS/JS) and Apify Codepen Scraper MCP. Not a search catalogue.
- Codrops, Godly: no official MCP/API found. Both are only reachable through Kroma MCP.
- Kroma MCP (community, MIT): `SERPER_API_KEY=... npx -y @kromamcp/server`, Serper free tier 2,500 credits. 10 tools: UI inspiration (Mobbin/Godly/Awwwards), component code (shadcn, Magic UI), effects and shaders (GLSL, Framer Motion, GSAP, Three.js from CodePen, Shadertoy, Codrops), backgrounds, icons, site scraping. Live web search, so no fixed catalogue and quality varies. https://github.com/thatcreativetayo/kromamcp

## 6. Other credible finds
- Animotion MCP: 745+ CSS3 animations in 20 categories, 9,000+ SVG icons, 10 tools, `npx` setup (exact command not shown; repo https://github.com/animotion-mcp/animotion-mcp.github.io, GitHub fetch 404 for me, so UNVERIFIED beyond the listing at https://mcpservers.org/servers/animotion-mcp/animotion-mcp.github.io). Small, CSS only.
- GSAP MCP servers (community): bruzethegreat/gsap-master-mcp-server, Lillard01/GSAP-mcp, mojo-solo gsap-mcp-server: API/pattern knowledge (ScrollTrigger, SplitText), not example catalogues. Quality unvetted.
- chuk-mcp-remotion: text animations for Remotion video (generator, not reference catalogue).
- Apify "GIF Scroll Animation" MCP: records scrolling pages as GIF (capture tool, not catalogue).
- Searches for "scroll animation examples MCP" and "text animation MCP" found nothing credible beyond the above.

## Sources
https://motion.dev/ai-kit · https://motion.dev/plus · https://motion.dev/docs/ai-kit-context · https://screensdesign.com/mcp/ · https://screensdesign.com/pricing/ · https://glama.ai/mcp/servers/screensdesign-com/screensdesign-agent-skill · https://chatforest.com/reviews/mobbin-mcp-server/ · https://www.businesswire.com/news/home/20260511053592/en/Mobbin-Launches-MCP-Server-Giving-AI-Tools-621500-Real-App-Screens-to-Reference · https://www.framer.com/agents/external/ · https://developers.webflow.com/mcp/reference/overview · https://webflow.com/blog/mcp-interactions · https://lottiefiles.com/mcp · https://docs.lottiefiles.com/en/platform/mcp · https://rive.app/docs/editor/ai/mcp · https://docs.spline.design/generate/spline-mcp-server · https://github.com/INSANE0777/Awwwards-mcp · https://github.com/thatcreativetayo/kromamcp · https://github.com/GarthDB/codepen-mcp
