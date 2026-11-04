---
name: transdev-pc-shell-quirks
model: haiku
description: "Use when a shell, HTTPS or file-edit command fails or hangs on Greg's locked Transdev PC: SELF_SIGNED_CERT_IN_CHAIN, CRYPT_E_NO_REVOCATION_CHECK, CERTIFICATE_VERIFY_FAILED, `python` hanging, a string replace that silently matches nothing, reading Outlook, or `Read` on a PDF failing with pdftoppm not installed ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the known causes and the working alternative for each."
metadata:
  origin: auto-extracted
---

# Transdev PC shell quirks

**Extracted:** 2026-09-25 (from sessions 2026-09-23 to 09-25)
**Context:** Windows 11, no admin rights, corporate TLS inspection, Git Bash + Windows PowerShell 5.1.

## Problem
Ordinary commands fail or hang here for machine-specific reasons, and each one cost a retry cycle while Greg waited.

## Solution
| Symptom | Cause | Use instead |
|---|---|---|
| Node `fetch` fails with `SELF_SIGNED_CERT_IN_CHAIN` | Corporate TLS inspection | `curl --ssl-no-revoke ...` or PowerShell `Invoke-RestMethod` |
| `curl` fails with `CRYPT_E_NO_REVOCATION_CHECK` | Revocation server blocked | `curl --ssl-no-revoke` |
| Python `urllib`/`requests` fails with `CERTIFICATE_VERIFY_FAILED` | Python doesn't trust the corporate CA | PowerShell `Invoke-RestMethod` (uses the Windows store) |
| `python` hangs with no output until the 2-minute timeout | `python` is the Microsoft Store stub, not a real Python | Use `node` for scripts; never call `python` |
| `s.replace("...\n...")` or `includes()` finds nothing in `boulon-hq.html` or a doc | File has CRLF line endings | Normalize first: `s = s.replace(/\r\n/g, '\n')`, or use the Edit tool |
| Paths with backslashes get mangled in `node -e "..."` or sed | Double-quote/backtick escaping through bash | Write the script to `$CLAUDE_JOB_DIR/tmp/x.js` with a quoted heredoc (`<<'EOF'`) and run it |
| A "key doesn't match" or 401/403 alarm | Script read `.env` by line number, or Notepad closed unsaved | Parse `.env` by key name; check key length (Azure Search keys are 52 characters) without printing the value |
| Outlook COM (`Outlook.Application`) fails with `MK_E_UNAVAILABLE` | Greg uses the new Outlook (`olk.exe`), which has no COM interface | Reach mail through a Power Automate flow that writes to OneDrive (`C:\Users\rilg01\OneDrive - TRANSDEV\`), not locally |
| `Read` on a PDF fails with `pdftoppm is not installed` | Read renders PDF pages through poppler's `pdftoppm`, which isn't installed | Use `pdftotext` from Git Bash (`/mingw64/bin/pdftotext`): `pdftotext -raw "file.pdf" out.txt`, then Read or Grep the text file. `-layout` is fine for running text but interleaves columns in field/column tables (names and labels end up misaligned); use `-raw` for those and check a few rows before trusting a mapping. `pdfinfo` is not installed |

Never print keys while diagnosing. Show only length, key names, or HTTP status.

## Added 2026-11-04 (VoiceStudio runtime setup)
- `uv` fails with `invalid peer certificate: UnknownIssuer`: uv uses its own Mozilla roots, not the Windows store. Set `UV_SYSTEM_CERTS=1`.
- VoiceStudio region "auto" checks `github.com` with Node `fetch`. That check fails here because of TLS inspection, so the app thinks the network is "restricted" and switches to the `gh-proxy.com` China mirror. Override with `UV_PYTHON_INSTALL_MIRROR=https://github.com/astral-sh/python-build-standalone/releases/download`.
- Fix used: launch `C:\Users\rilg01\AppData\Local\Programs\VoiceStudio\VoiceStudio.exe` with both variables set for that process only. Setup resumes on its own and the backend reports healthy on :3900.

## When to Use
Any failing or hanging shell, network or scripted file edit on this PC, before retrying the same command.

## Added 2026-10-06
- Inline `node - <<EOF` heredocs with mixed quotes or accents can fail with "unexpected EOF": write the script to a file (Write tool) and run it. Backslashes in regex literals can be lost: use `path.sep`.
- Claude in Chrome: `Page.captureScreenshot` times out and the viewport reads 0x0 here; use `read_page`, `find` and same-origin `fetch` from `javascript_tool` instead of screenshots.
- OneDrive Files On-Demand: reading a cloud-only PDF stalls on the first read; about 4 MB per second once hydrating, so batch jobs run in the background.
