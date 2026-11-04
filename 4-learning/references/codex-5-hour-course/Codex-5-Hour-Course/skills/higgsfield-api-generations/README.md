# Higgsfield API Generations

A student-ready Codex and Claude Code skill for generating images and videos through the pay-as-you-go Higgsfield API.

## Quick install for Codex

1. Copy this entire folder to `.agents/skills/higgsfield-api-generations/` in your project, or to `%USERPROFILE%\.codex\skills\higgsfield-api-generations\` for a personal install.
2. Add this to the project’s `.env`:

   ```env
   HIGGSFIELD_API_KEY=YOUR_KEY_ID:YOUR_KEY_SECRET
   ```

3. Ask Codex: “Use Higgsfield API Generations to list the video models I can access.”
4. Ask Codex to estimate before generating if you want to review the price first.

Seedance 2.5 is the default video model. Soul 2 Standard is the default image model. Paid submissions require an explicit generation request, outputs are downloaded locally, and every result includes its cost basis.

Read [references/student-setup.md](references/student-setup.md) for the full setup and [SKILL.md](SKILL.md) for the workflow.
