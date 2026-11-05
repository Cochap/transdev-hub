from rag import *; e=Engine(load_pages())
for q in ["Which circuit is on cavity 1 of connector 10175?","Quel fil sur la cavité 3 du connecteur 10177?"]:
    a=e.answer(q,mode='bm25'); print(q); [print('  ',r) for r in a['rows'][:4]]; print('  cite:',a['citation'][:160])
