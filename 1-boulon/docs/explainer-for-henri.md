# Why BOULON Moved to a RAG Framework — Plain-Language Explainer
**For:** sharing with Henri and other non-technical stakeholders who just want to understand what changed and why. No jargon left unexplained.

---

## 1. What BOULON had before

Picture a chatbot with two ingredients:

- **A general-purpose AI brain** — trained on a huge amount of public information, but with no special knowledge of Transdev's specific buses, coaches, or maintenance manuals.
- **A basic document connector to SharePoint** — the folder where our real manuals live. This let the AI "peek into" the folder and pull out text that seemed related to a question, a bit like a smarter version of Ctrl+F across a stack of PDFs.

That combination worked reasonably well for simple, plainly-worded questions. But it had two real weaknesses that got worse as the manual library grew:

1. **It struggled with anything that wasn't plain paragraph text** — tables (torque specs, parts lists) and diagrams (wiring schematics, exploded-view drawings) are common in 600+ page technical manuals, and basic document search doesn't "read" those the way it reads a sentence.
2. **When it couldn't find a clean answer, it would sometimes fill the gap with general knowledge** instead of saying "I don't know" — because nothing was forcing it to stick strictly to what the real manuals actually say.

## 2. What "RAG" actually is, in plain terms

**RAG stands for Retrieval-Augmented Generation.** Broken into its two halves:

- **Retrieval** = before answering anything, build a proper, searchable index of the real documents — like a librarian who has read every manual page by page and organized it by meaning, not just by matching exact words.
- **Augmented Generation** = when a question comes in, first pull the most relevant real passages from that index, then have the AI write its answer using only those passages — with a citation pointing back to exactly where it came from.

The key shift: instead of the AI answering from "what it generally knows" or a shallow keyword search, it's now required to answer from "what these specific documents actually say," and to show its work.

## 3. The building blocks we're now using

| Piece | Plain-language role |
|---|---|
| **Azure AI Search** | The smart index/search engine — this is the "librarian." It breaks every manual into searchable chunks and understands meaning, not just exact wording. |
| **Multimodal indexing** | The upgrade that lets the librarian also "read" diagrams and screenshots, writing a plain-English description of what's in them, so a wiring diagram or a flowchart becomes searchable too — not just plain paragraphs. |
| **Azure AI Foundry** | Hosts the two AI models doing the work: one that turns text into a "meaning fingerprint" for searching (the embedding model), and one that writes the final answer in plain language (the chat model). |
| **Copilot Studio** | The front door — same chat interface mechanics already use. RAG is a backend upgrade behind that same interface, not a new tool for them to learn. |
| **The grounding/safety layer** | A rule forcing the AI to only answer from retrieved real passages, and to say "I don't have that — check with a person" rather than guess, when nothing relevant is found. |

## 4. A concrete example — a made-up company, to show how this scales

Imagine **Aurora Freight**, a trucking company with 200 driver manuals and 50 mechanic repair guides — thousands of pages total.

**Without RAG:** their chatbot either can't read the manuals live at all, or does a basic keyword search that misses anything phrased even slightly differently than the manual's exact wording, and misses tables and diagrams entirely. As Aurora Freight adds more manuals over time, this basic approach gets slower and less reliable — and the AI increasingly papers over gaps with generic trucking knowledge that may not match Aurora's specific trucks.

**With RAG:** Aurora Freight builds one properly indexed library from all its manuals, including descriptions of diagrams like wiring schematics. Every driver or mechanic question gets answered by first finding the exact real passages, then generating a response strictly from those, with a link back to the exact manual and page. As Aurora Freight keeps adding manuals, the system scales cleanly — new documents just get added to the index, and answer quality doesn't degrade the way a basic keyword search would.

## 5. Applying that to BOULON

Same shape, our real numbers: 100+ maintenance manuals, many 600+ pages, full of tables and diagrams that the old basic search genuinely struggled with. Our "questions" come from mechanics diagnosing and repairing buses and coaches — often needing an exact spec, an exact part number, or a diagram description, not a vague summary.

RAG lets BOULON scale to the full manual library reliably, correctly read the diagrams and tables that used to be a blind spot (already tested and confirmed working, not just a theoretical promise), and reduces the risk of the AI confidently making something up — which matters a lot when the guidance is maintenance and safety-related.

## 6. Cost and scope, briefly

All of this fits inside BOULON's existing $5,000 CAD project budget — the pilot (Azure AI Search plus the AI models, running for about 6 months) comes to roughly $615 CAD, a small fraction of that budget. Nothing about mechanics' day-to-day experience changes — they still talk to the same Copilot Studio chat interface. RAG is the upgrade happening underneath it.
