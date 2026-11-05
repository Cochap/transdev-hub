"""Build the grounded-generation packet for each question: exactly what a generator (Copilot Studio / Azure OpenAI)
would receive -- answer rows from the engine + the full text of the top-k cited pages. Output: <set>/contexts.md"""
import json, os, sys
from rag import Engine, load_pages
HERE = os.path.dirname(os.path.abspath(__file__))
setdir, gold = sys.argv[1], sys.argv[2]
G = json.load(open(os.path.join(HERE, setdir, gold), encoding="utf-8"))
e = Engine(load_pages()); out = []
for q in G['questions']:
    a = e.answer(q['ask'], k=4, mode="bm25")
    out.append(f"\n\n=== QUESTION {q['id']} ===\n{q['ask']}\n--- ENGINE STATUS: {a['status']}")
    if a['status'].startswith('abstain'):
        out.append(f"ENGINE MESSAGE: {a['text']}"); continue
    out.append("ANSWER ROWS:\n" + "\n".join(a.get('rows', [])))
    for h in a['hits'][:4]:
        r = e.pages[h['pdf_page']]
        struct = "\n".join(t.split("\n", 1)[1] if "\n" in t else t for p, k, t in e.chunks if p == h['pdf_page'] and k != "layout")
        lay = r.get('layout', '')
        body = struct[:6000] + ("\n[PAGE TEXT, column-aligned]\n" + lay[:max(2500, 9000 - min(len(struct), 6000))] if lay else "")
        out.append(f"--- SOURCE: PDF p.{h['pdf_page']} / printed p.{r['printed_page']} / §{r['section']} {r['title']}\n{body}")
open(os.path.join(HERE, setdir, "contexts.md"), "w", encoding="utf-8").write("\n".join(out))
print("questions", len(G['questions']), "chars", sum(len(x) for x in out))
