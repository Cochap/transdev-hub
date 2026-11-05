"""Electrical questions containing words the out-of-domain/injection gates match: must NOT abstain."""
from rag import Engine, load_pages
Q=["oil pressure sensor connector circuit","air pressure switch wire color","replace the hazard fuse, what amp?","brake light relay location",
   "low coolant sensor circuit","capteur de pression d'huile, quel fil?","fusible du klaxon","fuel level sender wire","park brake switch wire",
   "interrupteur de frein de stationnement, quel fil?","stop arm bypass switch","coolant level sensor connector","starter relay circuit",
   "how is the wiper motor wired?","comment est alimenté le moteur d'essuie-glace?"]
e=Engine(load_pages()); bad=0
for q in Q:
    a=e.answer(q,mode="bm25"); ok=not a['status'].startswith('abstain'); bad+=not ok
    print('OK ' if ok else 'BAD', a['status'], '|', q, '|', (a.get('rows') or [''])[0][:70])
print('false abstain', bad, '/', len(Q))
