"""Blind set (written from page images only). Pass = every must_contain token appears in the context
the generator would see (answer rows + top-k chunks); page@k = an expected page is among top-k; refuse = abstain."""
import json, re, sys, os, time
from rag import Engine, load_pages
HERE = os.path.dirname(os.path.abspath(__file__))
CFG = {"minilm": ("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2", os.path.expanduser("~/.cache/emb/minilm")),
       "e5l": ("intfloat/multilingual-e5-large", os.path.expanduser("~/.cache/emb/e5l"))}

def norm(s): return re.sub(r"\s+", " ", s.upper())

def score(e, G, mode, k=5):
    res = []
    for q in G['questions']:
        a = e.answer(q['ask'], k=k, mode=mode)
        if q['type'] == 'refuse':
            res.append(dict(id=q['id'], type='refuse', lang=q['lang'], ok=a['status'].startswith('abstain'), status=a['status'])); continue
        if a['status'].startswith('abstain'):
            res.append(dict(id=q['id'], type=q['type'], lang=q['lang'], ok=False, page=False, status=a['status'])); continue
        hits = a.get('hits', [])[:k]
        # generator context = answer rows + FULL text (all chunks) of the top-k pages
        ctx = norm("\n".join(a.get('rows', [])) + "\n" + "\n".join(t for p, _, t in e.chunks if p in {h['pdf_page'] for h in hits}))
        miss = [t for t in q['must_contain'] if norm(t) not in ctx]
        page = any(h['pdf_page'] in q['pages'] for h in hits)
        res.append(dict(id=q['id'], type=q['type'], lang=q['lang'], ok=not miss, page=page, miss=miss, got=[h['pdf_page'] for h in hits], want=q['pages'], route=a.get('route')))
    return res

def summary(res, label):
    from collections import defaultdict
    by = defaultdict(lambda: [0, 0, 0])
    for r in res:
        for key in (r['type'], r['lang'], 'ALL'):
            by[key][0] += 1; by[key][1] += r['ok']; by[key][2] += r.get('page', r['ok'])
    print(f"\n=== BLIND {label}")
    for kk, (n, ok, pg) in sorted(by.items()):
        print(f"{kk:10s} n={n:2d} pass={ok/n:5.0%}  page@5={pg/n:5.0%}")
    return by

if __name__ == "__main__":
    G = json.load(open(os.path.join(HERE, os.environ.get("BSET","blind"), os.environ.get("BGOLD","golden-blind-v0.json")), encoding="utf-8"))
    emb = os.environ.get("EMB"); modes = (sys.argv[1] if len(sys.argv) > 1 else "bm25").split(",")
    e = Engine(load_pages(), *(CFG[emb] if emb else (None, None)), cache=os.path.join(HERE, f"emb-{emb}.npy") if emb else None)
    for m in modes:
        t0 = time.time(); res = score(e, G, m); summary(res, f"{m} {emb or ''} ({(time.time()-t0)/len(res)*1000:.0f} ms/q)")
        json.dump(res, open(os.path.join(HERE, os.environ.get("BSET","blind"), f"result-{m}-{emb or 'none'}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
        for r in res:
            if not r['ok']: print("  FAIL", r['id'], r['type'], r['lang'], r.get('status', ''), 'miss=', r.get('miss'), 'got=', r.get('got'), 'want=', r.get('want'))
