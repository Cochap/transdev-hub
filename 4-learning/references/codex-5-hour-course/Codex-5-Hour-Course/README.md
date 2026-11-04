# Codex 5-Hour Course Resource Pack

Start by opening **START-HERE.html** in your browser, or read this file.

## What is included

| Resource | Location |
| --- | --- |
| AIOS starter workspace, including all six skills | `kits/aios/` |
| Hyperframes video-editing student kit, including 14 skills | `kits/hyperframes/` |
| Scrollcraft website design skill and supporting files | `kits/scrollcraft/` |
| Higgsfield API Generations skill | `skills/higgsfield-api-generations/` |
| First Client SOP, 8 pages | `guides/First-Client-SOP.pdf` |
| How to Price AI Solutions: The Complete Masterclass, 27 pages | `guides/AI-Pricing-Masterclass.pdf` |
| Community, repositories, wiki instructions, channels, and tools | `RESOURCE-LINKS.md` or `START-HERE.html` |
| Major course chapter timestamps | `COURSE-CHAPTERS.txt` |

There are **22 unique skills**. AIOS and Hyperframes include separate Codex and Claude Code copies of the same skills. Those copies are not additional skills.

## Open your first workspace

1. Extract the entire ZIP. On Windows, choose a short folder path, such as `C:\Courses`, to avoid long-path errors.
2. Open `kits/aios` as a project in Codex.
3. Ask: **Use the onboard skill to help me set up my AI operating system.** You can also select `$onboard`.
4. Use `$grill-me` to capture more context, `$link` to make sources findable, `$audit` to check your setup, `$level-up` to improve it, and `$3d-brain` to explore your knowledge.

The kit's README has the full setup. Its `.agents/skills` folder is included in this ZIP, even if your file browser hides folders beginning with a dot.

## Add Higgsfield or Scrollcraft to your project

Copy the **whole skill folder**, including scripts and references. Do not copy only SKILL.md.

| Skill | Folder to copy | Destination inside your Codex project |
| --- | --- | --- |
| Higgsfield | `skills/higgsfield-api-generations` | `.agents/skills/higgsfield-api-generations` |
| Scrollcraft | `kits/scrollcraft/plugins/nateherk-design/skills/scroll-craft` | `.agents/skills/scroll-craft` |

You can ask Codex to do this: **Install the Higgsfield and Scrollcraft skills from this course resource folder into my current project's .agents/skills directory. Keep every supporting file, and preserve any existing skills.**

Then ask to use the skill by name. Read the Higgsfield README and Scrollcraft README before using their tools. Scrollcraft's public package calls the skill `scroll-craft`; the course calls it Scrollcraft. They are the same resource.

Higgsfield needs your own API credential and funded API balance. Its helper includes a cost-only preflight. Scrollcraft can use your own assets; generated assets are optional. Check your provider's current prices before generating.

## Edit videos with Hyperframes

Open `kits/hyperframes` as its own project in Codex. Read its `README.md` and `docs/TOOLS-AND-API-KEYS.md`.

Because you already extracted the kit, skip the README's `git clone` step. In a terminal opened in `kits/hyperframes`, run:

```sh
npm ci
npm run setup
npm test
```

The kit requires Node.js 22 or newer, Git, FFmpeg/ffprobe, and Chrome or Chromium. Setup checks your tools. Then ask: **Use edit-video to edit my recording at [path]. Keep my meaning, show me the proposed cuts, and produce a draft for review.**

Use `short-form-edit` for reels and Shorts. The included showcase videos and historical teaching examples show how the workflows fit together. Bring your own footage for your projects. Some historical examples reference source media that is not bundled; start with the self-contained demo described in the README.

## Guides and online resources

The First Client SOP and AI Pricing Masterclass are included as PDFs. The community courses, Karpathy wiki instructions, second channel, Hyperagent offer, and agency roadmap destination are linked in the resource guide.

Join the free Skool community and open **Classroom → AI Skills** or **Classroom → All YouTube Resources** for updates. Look for **7 Day AIS Challenge** and **Build Your AI OS** for the additional courses mentioned in the video. Some classrooms may have a community-level requirement.

The OPAA agency link opens a course-information signup page. The separate First Client SOP is the free PDF included here.

## Versions and attribution

This pack contains the public student releases retrieved on September 20, 2026. Their original documentation, licenses, attribution, and third-party notices remain with each kit. Use the repository links for updates. An offline pack cannot freeze online services, model availability, event dates, or promotional offers.

`SOURCES.json` records the included releases. `MANIFEST-SHA256.txt` lists checksums for the files in this pack.
