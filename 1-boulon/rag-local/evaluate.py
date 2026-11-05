"""Run golden-ic set against the engine. Metrics per slice: page@1, page@5, answer-in-top5 (regex), abstain accuracy, latency."""
import json, re, sys, time, os
from collections import defaultdict
from rag import Engine, load_pages
HERE = os.path.dirname(os.path.abspath(__file__))

def run(engine, G, mode, k=5, verbose=False):
    S = defaultdict(lambda: defaultdict(int)); fails = []; lat = []
    for q in G['questions']:
        t0 = time.time(); a = engine.answer(q['ask'], k=k, mode=mode); lat.append(time.time() - t0)
        sl = q['slice'].split('/')[0] + '/' + (q['slice'].split('/')[1] if '/' in q['slice'] else '')
        S[sl]['n'] += 1
        if q.get('abstain'):
            ok = a['status'].startswith('abstain'); S[sl]['abstain_ok'] += ok
            if not ok: fails.append((q['id'], q['ask'], 'answered', a.get('citation', '')[-30:]))
            continue
        if a['status'].startswith('abstain'):
            S[sl]['false_abstain'] += 1; fails.append((q['id'], q['ask'], 'false_abstain', '')); continue
        hits = a['hits']; pages = q.get('pages')
        if pages:
            S[sl]['p@1'] += hits[0]['pdf_page'] in pages
            S[sl]['p@5'] += any(h['pdf_page'] in pages for h in hits[:5])
        else:
            S[sl]['p@1'] += 1; S[sl]['p@5'] += 1
        rx = re.compile(q['expect'])
        ans_txt = "\n".join(a.get('rows', []))
        in_rows = bool(rx.search(ans_txt)); in_top = any(rx.search(h['chunk']) for h in hits[:k])
        S[sl]['answer_rows'] += in_rows; S[sl]['ans@5'] += in_top
        if not in_rows: fails.append((q['id'], q['ask'], 'rows_miss' if in_top else 'retrieval_miss', [h['pdf_page'] for h in hits[:3]], pages[:4] if pages else None))
    return S, fails, lat

def report(S, lat, label):
    print(f"\n=== {label}  (median latency {sorted(lat)[len(lat)//2]*1000:.0f} ms, p95 {sorted(lat)[int(len(lat)*.95)]*1000:.0f} ms)")
    tot = defaultdict(int)
    for sl, d in sorted(S.items()):
        n = d['n']
        if sl.startswith('ABSTAIN'):
            print(f"{sl:28s} n={n:3d} abstain_ok={d['abstain_ok']}/{n}")
        else:
            print(f"{sl:28s} n={n:3d} page@1={d['p@1']/n:5.0%} page@5={d['p@5']/n:5.0%} ans@5={d['ans@5']/n:5.0%} answer_rows={d['answer_rows']/n:5.0%} false_abstain={d['false_abstain']}")
        for kk, v in d.items(): tot[kk] += v
    na = sum(d['n'] for s, d in S.items() if not s.startswith('ABSTAIN'))
    print(f"{'ALL answerable':28s} n={na:3d} page@1={tot['p@1']/na:5.0%} page@5={tot['p@5']/na:5.0%} ans@5={tot['ans@5']/na:5.0%} answer_rows={tot['answer_rows']/na:5.0%} false_abstain={tot['false_abstain']}")

if __name__ == "__main__":
    G = json.load(open(os.path.join(HERE, sys.argv[1] if len(sys.argv) > 1 else "golden-ic-v0.json"), encoding="utf-8"))
    modes = sys.argv[2].split(",") if len(sys.argv) > 2 else ["bm25"]
    emb = os.environ.get("EMB")  # e.g. minilm | e5l
    cfg = {"minilm": ("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2", os.path.expanduser("~/.cache/emb/minilm")),
           "e5l": ("intfloat/multilingual-e5-large", os.path.expanduser("~/.cache/emb/e5l"))}
    t0 = time.time()
    e = Engine(load_pages(), *(cfg[emb] if emb else (None, None)), cache=os.path.join(HERE, f"emb-{emb}.npy") if emb else None)
    print("index build s", round(time.time() - t0, 1), "chunks", len(e.chunks))
    for m in modes:
        S, F, lat = run(e, G, m); report(S, lat, f"{m} {emb or ''}")
        json.dump(F, open(os.path.join(HERE, f"fails-{m}-{emb or 'none'}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
        print("fails:", len(F)); [print("  ", f) for f in F[:25]]
