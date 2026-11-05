# ThinkStation PGX — beginner guide, step by step

> Hardware facts below come from general knowledge of the Lenovo PGX / NVIDIA GB10 family, not from hub files. **Check each one against the quick-start card in the box.** Project uses come from `pgx-integration-plan-2026-11-05.md`.

## Part 0: what the box is, in 4 lines
- It's a **small, very powerful computer** built to run AI models **at your desk** instead of in the cloud (Azure).
- Its "brain" is an NVIDIA **GB10** chip with **128 GB of memory**, enough to hold big AI models.
- It runs **Linux** (NVIDIA DGX OS, based on Ubuntu), not Windows. You won't use it like your laptop.
- **For BOULON:** it reads the manuals, searches them, and answers questions, all on-site with no monthly bill.

Think of it as a **private mini-Azure that sits on your desk**.

---

## Part 1: unbox and plug in (15 min)
1. In the box: the PGX, the power adapter (USB-C), and a **quick-start card**. Keep the card; it may have a sticker with a Wi-Fi name and password.
2. Find a monitor with **HDMI**, a **USB keyboard** and a **USB mouse** (the ones from your desk are fine).
3. Connect the HDMI cable from the PGX to the monitor.
4. Plug the keyboard and mouse into the PGX.
5. **Don't plug in a network cable yet.** IT hasn't approved it.
6. Plug in the power adapter. It starts on its own, or press the power button.

✅ **Pass:** a setup screen appears on the monitor.
🚩 **Red flag:** black screen after 3 minutes → try another HDMI port or monitor.

## Part 2: first-time setup (20 min, all on screen)
Follow the setup wizard:
1. **Language / Langue** → English (the tools are easier to search for in English).
2. **Keyboard / Clavier** → Canadian French or US, whichever matches your keyboard.
3. **Network / Réseau** → **Skip / Ignorer** (no corporate network until IT says yes).
4. **Time zone / Fuseau horaire** → Montreal / Toronto (Eastern).
5. **Create user / Créer un utilisateur:** pick a name (e.g. `greg`) and a password. **Write the password down on paper.** Claude never sees or types it.
6. Accept the license (yours to read). Let it finish and reboot.

✅ **Pass:** you see a desktop and you can log in.

## Part 3: say hello to the machine (5 min)
1. Open **Terminal** (the black window icon, or press `Ctrl+Alt+T`).
2. Type this and press Enter:
   ```bash
   nvidia-smi
   ```
✅ **Pass:** a table appears with "GB10" or an NVIDIA GPU name. That's the AI chip saying "I'm here".
🚩 **Red flag:** "command not found" → take a photo and send it to me.

**Stop here on day 1.** The machine works. 🎉

---

## Part 4: the IT question (wait ~days)
The PGX needs internet once to download AI models (several GB). Two options:
- **A (proper):** French ticket to IT asking to connect it to the network. I'll draft it.
- **B (meanwhile):** I prepare everything on your laptop. You download the models where internet is allowed and bring them over on a USB drive.

## Part 5: install the AI "engine" (30 min, once it has internet)
1. In Terminal:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```
   (**Ollama** = an app that runs AI models and lets other programs ask them questions.)
2. Download a model:
   ```bash
   ollama pull llama3.3:70b
   ```
   (exact model chosen from the RAG radar first)
3. Talk to it:
   ```bash
   ollama run llama3.3:70b
   ```
   Type: `Explique en 2 phrases ce qu'est un disjoncteur.`

✅ **Pass:** it answers in French in a few seconds. You now have your own private ChatGPT.

## Part 6: plug BOULON into it (with me, week 1–2)
| Step | What it means for you | Who |
|---|---|---|
| Copy `1-boulon/rag-local/` to the PGX (USB drive) | Brings the manuals and the search code over | You plug in, I give the command |
| Rebuild the search index on the chip | 6 h on the laptop → minutes | Me |
| Re-run the blind test (today: 17/22 = 77 %) | Proves it's at least as good | Me |
| Vision model on the diagram pages | Fixes the wiring-diagram misses | Me |
| Full answer generated locally | The piece never tested in Copilot | Me, then you test |

## What you'll learn along the way (one at a time, only when needed)
1. **Terminal**: typing commands instead of clicking. You'll copy-paste what I give you.
2. **SSH**: controlling the PGX from your laptop. Saves you the extra monitor later.
3. **Model**: the AI "brain file" Ollama runs.
4. **Quantization**: compressing a model so it fits in memory.
