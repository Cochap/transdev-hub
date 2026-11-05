from rag import *; import re; e=Engine(load_pages())
q="How many ohms should the coolant temperature sensor read at 80 C on the ISB?"
hits=e.search(q,5,mode='bm25'); qt={t for t in tokens(expand_query(q)) if t in e.vocab and t not in e.STOP and t not in GENERIC and len(t)>2}
for h in hits[:3]:
    for l in h['chunk'].split(chr(10)):
        if re.search(r"\d\s*(?:OHMS?|Ω)",l,re.I): print(h['pdf_page'], qt & set(tokens(l)), l[:160])
