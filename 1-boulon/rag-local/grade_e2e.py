"""Grade generated answers end to end: correctness (must_contain), refusal, citation page, language, grounding
(every code-like token in the answer must exist in the context given to the generator = no hallucinated values)."""
import json, re, os, sys
from collections import Counter
HERE = os.path.dirname(os.path.abspath(__file__))
setdir, gold, gen = sys.argv[1], sys.argv[2], sys.argv[3]
G = {q['id']: q for q in json.load(open(os.path.join(HERE, setdir, gold), encoding="utf-8"))['questions']}
A = {a['id']: a['answer'] for a in json.load(open(os.path.join(HERE, setdir, gen), encoding="utf-8"))['answers']}
ctx_all = open(os.path.join(HERE, setdir, "contexts.md"), encoding="utf-8").read()
blocks = dict(re.findall(r"=== QUESTION (\w+) ===\n(.*?)(?=\n\n=== QUESTION |\Z)", ctx_all, re.S))
REF = re.compile(r"je n'ai pas cette information|i don't have that information|not in the ic manual|pas dans le manuel", re.I)
FRW = re.compile(r"\b(le|la|les|est|du|des|pour|sur|fil|fusible|relais|c'est|dépend)\b", re.I)
CODE = re.compile(r"\b(?=[A-Z0-9-]*\d)(?=[A-Z0-9-]*[A-Z])[A-Z0-9]{2,}(?:-[A-Z0-9]+)*\b")
S = Counter(); rows = []
for qid, q in G.items():
    a = A.get(qid, ""); ctx = blocks.get(qid, "").upper(); refused = bool(REF.search(a))
    if q['type'] == 'refuse':
        ok = refused; S['refuse_n'] += 1; S['refuse_ok'] += ok; rows.append((qid, 'refuse', ok, '')); continue
    S['n'] += 1
    miss = [t for t in q['must_contain'] if t.upper() not in a.upper()]
    correct = not refused and not miss
    pages = re.findall(r"PDF p\.?\s*(\d+)", a); cite_ok = any(int(p) in q['pages'] for p in pages)
    lang_ok = (q['lang'] == 'fr') == bool(len(FRW.findall(a)) >= 2) or refused
    halluc = [c for c in set(CODE.findall(a.upper())) if c not in ctx and not re.fullmatch(r"\d+[A-Z]?|C\d|P\d+|CH\d+|\d+C1", c)]
    S['correct'] += correct; S['cite'] += cite_ok; S['lang'] += lang_ok; S['refused_wrongly'] += refused; S['halluc'] += bool(halluc)
    rows.append((qid, q['type'], correct, f"miss={miss} halluc={halluc} cite={pages}"))
n = S['n']
print(f"answerable n={n}: correct={S['correct']/n:.0%}  cited-correct-page={S['cite']/n:.0%}  right-language={S['lang']/n:.0%}  wrongly-refused={S['refused_wrongly']}  answers-with-ungrounded-codes={S['halluc']}")
print(f"refuse n={S['refuse_n']}: ok={S['refuse_ok']}")
for r in rows:
    if not r[2]: print("  FAIL", r)
