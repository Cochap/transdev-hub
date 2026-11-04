# Hand-off — Quartier DIX30 meeting transcription (2026-11-03, 16:05)

## Goal
Transcribe the meeting (FR) → organize notes → draft a project charter.

## State
- Whisper installed (user-level): `python -m pip install --user openai-whisper` (torch 2.15 CPU).
- Model `turbo` downloaded manually to `C:\Users\rilg01\.cache\whisper\large-v3-turbo.pt` (1.6 GB).
  Python download failed on the corporate cert (CERTIFICATE_VERIFY_FAILED) → use `curl.exe --ssl-no-revoke`.
- Audio: `C:\Users\rilg01\Downloads\Quartier DIX30 2.m4a` (76 min).
- Transcription started 15:17, python PID 4900. Whisper writes files ONLY at the end (no partial save).
- Output folder: `C:\TRANSDEV HUB\2-projects\transcripts\` (`Quartier DIX30 2.txt/.srt/.vtt/.tsv/.json`).

## Resume
1. If `2-projects\transcripts\Quartier DIX30 2.txt` exists → done; go to step 3.
2. If not (PC shut down / process killed), rerun (≈1–1.5 h on CPU):
   `python -m whisper "C:\Users\rilg01\Downloads\Quartier DIX30 2.m4a" --model turbo --language fr --output_dir "C:\TRANSDEV HUB\2-projects\transcripts" --output_format all --fp16 False`
3. Ask Claude: "organize the DIX30 transcript into notes (decisions, actions, questions, people) and draft the project charter".

## From home
The files live on this work PC only. Leave the PC on (lid open, plugged in, not shut down) so the run finishes; remote in or resume tomorrow.

## Update 2026-11-04 15:50: stopped at work, Greg runs it at home
- Work-PC run (09:28 to 15:50, PID 8148) stopped by Greg; no output was written (Whisper saves only at the end).
- Run at home with live progress (`-u` = unbuffered, shows each transcribed line with timestamps out of 76:00):
  `python -u -m whisper "C:\Users\rilg01\Downloads\Quartier DIX30 2.m4a" --model turbo --language fr --output_dir "C:\TRANSDEV HUB\2-projects\transcripts" --output_format all --fp16 False --verbose True`
- Progress = the last timestamp shown divided by 76:00. Leave the PC plugged in with sleep off.
- Then Greg does a quality review; then Claude: notes → project charter (lexicon `4-learning/interests/lexicon-project-management.md`).
