---
name: playwright-film-setup
description: Playwright 1.63 installed in C:\TRANSDEV HUB\film on 2026-09-29 at Greg's explicit request; Geotab launch film prompt v3 and Transdev brand values
metadata:
  type: project
---

Greg explicitly told Claude on 2026-09-29 to install Playwright for the Geotab launch product-film. It was installed with `npm install playwright` inside `C:\TRANSDEV HUB\film` only (no admin, nothing system-wide). Chromium already existed in `%LOCALAPPDATA%\ms-playwright`. Smoke test and brand pull both worked.

**Why:** the film template says to pull real logos, fonts and UI screenshots with Playwright.
**How to apply:** use `node` scripts in `film/`; this does not change the IT-ticket rule for other installs ([[company-it-constraints]]). Film accent = Transdev red `#DB0717` (purple `#392150` secondary, font Karbon), not Geotab's. Prompt draft: `docs/geotab-launch-film-prompt.md` (v3, flow C).
