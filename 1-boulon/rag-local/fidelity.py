"""Extraction fidelity: compare every reconstructed table row against poppler `pdftotext -layout` (independent engine).
A row agrees when its non-first cells appear, in order, on ONE layout line of the same page
(first cell may be a merged/filled-down cell, so it only has to appear on the page)."""
import json, re, os, random, sys
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__))
P = [json.loads(l) for l in open(os.path.join(HERE, "pages.jsonl"), encoding="utf-8")]
tot = ok = 0; bad = []; by = Counter(); byok = Counter()
for r in P:
    lines = [re.sub(r"\s+", " ", l).strip() for l in r.get('layout', '').split("\n")]
    page = " ".join(lines)
    for t in r['tables']:
        L = [l for l in t.split("\n") if l.startswith("|")]
        if len(L) < 3: continue
        hdr = " | ".join(c.strip() for c in L[0].strip("|").split("|"))
        for l in L[2:]:
            cells = [c.strip() for c in l.strip("|").split("|")]
            rest = [c for c in cells[1:] if c and c not in ("-",)]
            if not rest: continue
            tot += 1; by[hdr] += 1
            rx = re.compile(r".*?".join(r"(?<![A-Z0-9])" + re.escape(c) + r"(?![A-Z0-9])" for c in rest))
            first_ok = (not cells[0]) or cells[0] in page or re.sub(r"[^A-Z0-9]", "", cells[0]) in re.sub(r"[^A-Z0-9]", "", page)
            if first_ok and any(rx.search(x) for x in lines):
                ok += 1; byok[hdr] += 1
            else:
                bad.append((r['pdf_page'], hdr, l))
print(f"rows checked {tot}, agree {ok} = {ok/tot:.2%}")
for h, n in by.most_common(12): print(f"  {byok[h]/n:6.1%}  n={n:5d}  {h}")
random.seed(1); sample = random.sample(bad, min(25, len(bad)))
json.dump(bad, open(os.path.join(HERE, "fidelity-disagree.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
for s in sample[:25]: print("  DIS", s[0], s[2][:110])
