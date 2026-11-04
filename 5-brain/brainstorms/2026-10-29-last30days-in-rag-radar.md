# last30days skill in the RAG radar: Brainstorm / Discovery Notes
Date: 2026-10-29 · Goal: decide whether and how to install mvanhorn/last30days-skill and make it the search engine of the weekly rag-radar routine
Status: complete (implemented 2026-10-29)
Context sources: `.claude/skills/rag-radar/SKILL.md`, scheduled task `rag-radar-weekly`, GitHub README + CONFIGURATION.md of mvanhorn/last30days-skill (read 2026-10-29), memory: company-it-constraints, feedback-verify-access-first, feedback-approval-gate

## Facts checked before the interview (Claude, from sources)
- Repo: mvanhorn/last30days-skill, MIT, 65,843 stars, last push 2026-10-28 (GitHub API, 2026-10-29). Skill v3.31.0.
- Needs Python 3.12+ and node. PC has Python 3.14.7, uv 0.13.6, node 26.13.0 (checked 2026-10-29).
- No key needed: Reddit, Hacker News, Polymarket, GitHub. arXiv and Techmeme after first-run setup installs small CLIs. Also installs yt-dlp.
- First-run setup asks to read browser cookies (Windows: Firefox only) and offers a ScrapeCreators signup (10,000 free calls). Both can be declined.
- X, YouTube search backfill, TikTok need keys or cookies. Optional public publishing to ht-ml.app is opt-in only.
- Can search a local corpus (md/txt, PDF with pdftotext).
- Install: `/plugin marketplace add mvanhorn/last30days-skill` (auto-updates) or `npx skills add mvanhorn/last30days-skill -g`.

## Summary / key decisions
- Role: last30days is a 6th "community buzz" lane that SUPPORTS the 5 web-search helpers; it does not replace them. Every item it surfaces is still checked against a primary source before entering the web (Q1).
- Sources: **everything** (Q2): keyless sources + ScrapeCreators (YouTube backfill, TikTok, Instagram) + browser cookies for X. Full capacity.
- Goal restated by Greg (Q6): the radar must end in **improvements and recommendations** for BOULON, not just news.
- Corpus (Q6): LAST30DAYS_CORPUS_DIRS = 1-boulon/docs;1-boulon/wiki (Claude's pick, delegated by Greg).
- Install (Q5): plugin marketplace, auto-updates; tested not blocked by admin on 2026-10-29.
- X access constraints (Q3): Greg uses no Firefox on any device, so the native cookie scan (Firefox-only on Windows) is out. Any key/cookie must need re-entry at most once a week. Fits: xAI API key (set once) or manual auth_token/ct0 cookies if they last a week+ (lifetime not verified). Chosen (Q4): **B** — Greg copies X cookies auth_token + ct0 from Chrome/Edge into ~/.config/last30days/.env; routine flags "X empty" on line 1 of the weekly report; if cookies need re-entry more than weekly, switch to C (xAI key, approval package first).

## Q&A log
### Q1 - Role of last30days in the routine
- Asked: replace the helpers (A), add a 6th lane (B), or discovery-only feeder (C)?
- Captured: **B.** Greg: "i want the current workflow *supported* by last 30 days instead of replaced, to increase the effectiveness of the routine".
- Tentative / suggested: none.
- Flags: none.
### Q2 - Which sources and accounts
- Asked: keyless only (A), keyless + ScrapeCreators (B), or everything incl. browser cookies for X (C)?
- Captured: **C.** Greg: "dont tell me what lines to not cross regarding it, that undermines our full capacity. c"
- Tentative / suggested: Claude had suggested A; Greg overruled. Lesson: give facts and the trade-off, no gatekeeping language.
- Flags: none.

### Q3 - How X gets in
- Asked: Firefox cookies (A), manual auth_token+ct0 (B), xAI API key (C), or skip X for now (D)?
- Captured: Greg: "i dont use firefox at all on any of my devices. i dont want to have to reinput a key any more often than once per week." -> A is out; constraint: re-entry at most weekly.
- Tentative / suggested: C (set once) fits best; B fits only if X cookies last 1+ week (Claude's "expire every few weeks" was not verified).
- Flags: none.

### Q4 - Cookies (B) or xAI key (C)
- Asked: B now with C as fallback, or straight to C?
- Captured: **B**, "guide me" (wants step-by-step guide).
- Tentative / suggested: routine check: X empty -> say so in report line 1; >1 re-entry/week -> switch to C with approval package.
- Flags: X cookie lifetime unverified -> observe over the first weeks (Claude via report).
- Done 2026-10-29: Greg pasted X cookies into C:/Users/rilg01/.config/last30days/.env (Claude prepared the file: FROM_BROWSER=off, LAST30DAYS_MEMORY_DIR=1-boulon/docs/rag-radar/last30days-raw). Both values present, no spaces (checked by length only, never shown).

### Q5 - Install method (marketplace auto-update A vs npx fixed copy B)
- Asked: A or B?
- Captured: Greg: "wouldnt method a be blocked by my administration? test this path and record whether this is true or not, if blocked then b"
- Test result 2026-10-29 (Claude, measured): **NOT blocked.** No managed-settings.json in C:/ProgramData/ClaudeCode or C:/Program Files/ClaudeCode. `claude plugin marketplace add mvanhorn/last30days-skill` cloned over HTTPS and succeeded; `claude plugin install last30days@last30days-skill` succeeded (v3.31.0, scope user, enabled). Files land in C:/TRANSDEV HUB/5-brain/plugins (CLAUDE_CODE_PLUGIN_CACHE_DIR). -> **Method A in use** (auto-updates).
- Preflight (read-only): "Ready to research with safe defaults"; config = global .env; browser cookies off; X available (cookies picked up); sources available: reddit, x, hackernews, polymarket, github, grounding; also found an OpenRouter API key already in the environment. Not installed yet: yt-dlp, arxiv-pp-cli, techmeme-pp-cli, digg-pp-cli, gh.
- Flags: none.

### Q6 - Local corpus
- Asked: search the BOULON manuals (A), only our own notes 1-boulon/docs + 1-boulon/wiki (B), or no corpus (C)?
- Captured: Greg: "well the goal is to arrive to improvements and recommendations. choose option is best for this" -> Claude chose **B**: findings are matched against BOULON's known problems (test failures, index facts, decisions), which live in the notes; md needs no pdftotext.
- Flags: none.

### Implementation (Claude, 2026-10-29, after Q6)
- ScrapeCreators: Greg authorised the GitHub device code; key persisted (masked). Settings file also holds LAST30DAYS_CORPUS_DIRS.
- Free CLIs: yt-dlp installed (`uv tool install --system-certs yt-dlp`, 2026.10.26). Digg, arXiv, Techmeme CLIs FAILED: they need Go; `winget install GoLang.Go --scope user` -> "No applicable installer found" (machine scope = admin = IT ticket). arXiv still covered by helper E.
- Certificate: Python 3.14 rejects the corporate CA ("Basic Constraints of CA cert not marked critical"). Fix: wrapper `5-brain/scripts/last30days-run.py` injects truststore (Windows store) and runs the newest plugin engine unchanged.
- Engine needs a host-written query plan when run under Claude (LAW 7): `5-brain/scripts/rag-radar/last30days-plan.json`.
- Test run (quick, 90 s): Reddit 5 threads (r/Rag, 189 upvotes), HN 6 stories, web 4, our notes 6; X and YouTube 0; some off-topic HN hits.
- Routine: skill rag-radar step 2 lane F + report line 1 health check + Recommendations section; scheduled task prompt updated.

### Correction (2026-10-29, after Greg: "you cant tell that last30days was installed and now part of the routine if it failed to function as intended")
- Claude had declared the lane done while X and YouTube returned 0. Wrong. Root causes found and fixed, each re-tested:
  - X: the X client is a Node subprocess; the engine strips NODE_USE_SYSTEM_CA from its env, so Node rejected the corporate cert ("fetch failed"). Fix: wrapper sets NODE_OPTIONS=--use-system-ca. Then the topic "self-hosted RAG chatbots" was too narrow for X (1 post); X searches the topic string, not plan subqueries. Topic changed to "self-hosted RAG" -> 30 posts.
  - YouTube: yt-dlp works, but last30days searches by relevance and YouTube returns old videos (0-1 of 8 in window per query). Fix: `5-brain/scripts/rag-radar/youtube-month.py` uses YouTube's "This month" filter -> 80 videos in window; bare "rag" query replaced (pulled cleaning-rag skits).
  - Engine also required `--no-x-handle` for a theme topic (added).
  - OPENROUTER_API_KEY (Windows user variable, other apps) was being used by last30days for reranking; account out of credits (HTTP 402). Wrapper hides it from last30days only.
- Final test at routine settings (test3): Reddit 20, X 30, HN 13, GitHub 12, TikTok 7, Instagram 2, notes 11; plus YouTube lane 80. Not yet tested: the unattended Monday run itself.

## Open flags (pending input)
- X cookie lifetime (does it hold a week?) -> watch first weekly runs
- First unattended Monday run (2026-11-02) not yet observed -> Claude reads line 1 of the report
- Go for arXiv/Techmeme/Digg CLIs needs an IT ticket -> Greg, only if wanted
