# AI-accessible design inspiration tools (researched 2026-10-01)

Legend: OFFICIAL = run by the tool's own company. COMMUNITY = third-party, unofficial (may scrape; terms risk; stability unknown). "Unknown" = I found nothing either way; not proof of "no".
Not verified: only search snippets plus a few page fetches. Pricing figures change; confirm before buying.

| Tool | AI access? | How | Returns | Pricing for AI access | Auth | Source |
|---|---|---|---|---|---|---|
| Mobbin | YES, OFFICIAL | Hosted MCP, streamable HTTP (exact endpoint not shown in what I fetched; see docs) | Natural-language search; screen images inline; screens, flows, patterns (~621k screens, 130k+ flows per press) | Pro, Team, Enterprise plans | OAuth in browser, no API key | https://docs.mobbin.com/mcp/introduction ; https://mobbin.com/mcp |
| Refero | YES, OFFICIAL | MCP `https://api.refero.design/mcp`; also a skill repo | Sites/apps, Styles (type, color, layout, spacing, DESIGN.md), Screens, Flows | Pro, Team or Lifetime; up to 8,000 tool calls per month per user | OAuth or Bearer token | https://doc.refero.design/mcp/getting-started ; https://github.com/referodesign/refero_skill |
| Page Flows | NO official (per one third-party comparison) | None found | Flow videos/screens exist on site only | Site is paid ($99/yr cited) but no AI access | n/a | https://www.lazyweb.com/compare/mobbin-vs-pageflows (search snippet), https://pageflows.com/pricing/ |
| Land-book | UNKNOWN (no official MCP found); community aggregator MCPs list "Landbook" | Community: notsointresting/design-inspiration-mcp | Browse top-rated designs | Free (community) | none stated | https://github.com/notsointresting/design-inspiration-mcp |
| Godly | UNKNOWN official; community aggregator covers it | same community server as above | Browse top-rated designs | Free (community) | none stated | https://lobehub.com/mcp/notsointresting-design-inspiration-mcp |
| Awwwards | No official; COMMUNITY MCP yes | "Awwwards-mcp", 7 tools | Filter by color hex, tag, tech, award; inline JPEG screenshots; motion study capture; design-token extraction (colors, fonts, spacing, shadows) | Free (community) | not stated | https://dev.to/7nsane/awwwards-mcp-mcp-server-that-gives-agents-design-references-from-award-winning-sites-f32 |
| Dribbble | Official API yes (not MCP); COMMUNITY MCP/scrapers yes | REST `api.dribbble.com/v2`; community MCP YonasValentin/design-inspiration-mcp-server (uses Serper Google search with site: filters) and Apify scrapers | API: shots metadata of authenticated user/public scope; community: image search results | API free to register; Serper/Apify have own paid tiers | OAuth2 app registration (official) | https://developer.dribbble.com/v2/ ; https://github.com/YonasValentin/design-inspiration-mcp-server |
| Behance | No official found; COMMUNITY scrapers only | Apify "Behance Projects Scraper" MCP; same Serper community server | Project data / search results | Apify pay-per-use (not verified) | Apify token | https://apify.com/codingfrontend/behance-projects-scraper/api/mcp |
| Pinterest | Official API v5 yes; MCP servers are COMMUNITY | e.g. aymandakirgh/pinterest-mcp (35 tools), N-Graves/pinterest-mcp-server | Boards, pins, search, analytics (needs Pinterest developer app) | Free API (approval needed, not verified) | OAuth | https://github.com/aymandakirgh/pinterest-mcp |
| Are.na | YES, OFFICIAL | Hosted MCP `https://mcp.are.na/mcp` (40+ tools from OpenAPI) | Channels, blocks (images, links), search, connect content | No pricing stated (appears free) | OAuth, personal access token, or dynamic client registration | https://github.com/aredotna/mcp |
| Figma | YES, OFFICIAL | Remote MCP: `claude mcp add --transport http figma https://mcp.figma.com/mcp` | Components, variables, layout, metadata, screenshots, Code Connect; can write to canvas. Community files: only if you can open them | Not confirmed which Figma plans/seat types are needed; check Figma help page | OAuth | https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server ; https://developers.figma.com/docs/figma-mcp-server/remote-server-installation |
| Variant | UNCERTAIN which Variant. Found: variant.art (presentation decks) has OFFICIAL MCP `https://mcp.variant.art/mcp`. I did NOT confirm variant.com (AI UI design) | variant.art: HTTP MCP, 20 tools | Create/edit/export slide decks (HTML/PDF/PPTX/JSON); not an inspiration library | not found | OAuth or scoped bearer token | https://www.variant.art/mcp |
| ScreensDesign | YES, OFFICIAL | Hosted MCP `https://api.screensdesign.com/v1/mcp`, 18 tools | 2,730+ top-grossing iOS apps: screens, UX flows, revenue signals, review analytics, App Store creatives; can generate screens | Included with ScreensDesign Pro | OAuth or scoped API key, fair-use limits | https://screensdesign.com/mcp/ |
| Siteinspire | UNKNOWN | none found | n/a | n/a | n/a | (searched, no result) |
| Collect UI | No official found; COMMUNITY MCP yes | choterifa/collectui-mcp (queries Collect UI's public backend); rayhankhilji/collectui-mcp (turns links/GIF/video into motion brief: timings, easing, palette) | Mobile UI designs, videos, metadata; motion briefs | Free (community) | none stated | https://glama.ai/mcp/servers/choterifa/collectui-mcp ; https://glama.ai/mcp/servers/rayhankhilji/collectui-mcp |
| Dark Mode Design | UNKNOWN | none found | n/a | n/a | n/a | (searched, no result) |
| SaaSFrame | UNKNOWN (no AI access found; archive is subscription) | none found | n/a | n/a | n/a | https://www.saasui.design/best-saas-ui-design-inspiration |
| Muzli | UNKNOWN for inspiration feed. Muzli blog describes an MCP giving Claude motion keyframes (their own motion tool, unclear if public) | see source | Keyframes as CSS / motion.dev code | unknown | unknown | https://muz.li/blog/claude-opus-5-5-for-designers/ |
| Lapa Ninja | UNKNOWN (free gallery, no AI access found) | none found | n/a | free to browse | n/a | https://www.saasui.design/best-saas-landing-page-inspiration |

## Up to 5 other notable tools with MCP (not on your list)
1. **Nicelydone** (OFFICIAL) - `https://mcp.nicelydone.club/mcp`, 12 tools, 212,600+ SaaS screens and 8,000+ flows with metadata plus images. Paid subscription required. OAuth 2.1. https://nicelydone.club/mcp
2. **Inspo** (free MCP) - 832 real websites, 2,320 desktop/mobile screenshots, component references, design.md files with colors/fonts/measurements. https://bettertoken.ai/en/blog/inspo-mcp-design-context/
3. **Lazyweb** - publishes a public search API over app screens, flows and A/B tests; MCP URL and pricing not confirmed. https://www.lazyweb.com/vs
4. **Design-MCP (chrismicah)** (COMMUNITY) - 6,300+ design patterns, structured. https://github.com/chrismicah/design-mcp
5. **aidesigner AI UI Design MCP** - UI generation MCP (details not verified). https://www.aidesigner.ai/ai-ui-design-mcp

## Takeaways for a website workflow
- Best official picks for web/landing-page work: Refero (styles + DESIGN.md + screens), Mobbin, Nicelydone; Are.na is free and official for your own curated boards.
- Gallery sites (Awwwards, Godly, Land-book, Dribbble, Behance) only have COMMUNITY/scraper access; check each site's terms before relying on them.
- Company-PC caveat: adding any MCP or paid plan needs approval/IT per your usual process.
