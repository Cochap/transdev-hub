from rag import *; e=Engine(load_pages())
for q in ["Dans quel bloc et quelle position est le relais du bras d'arrêt (stop arm) sur le panneau électrique?",'calibre du fusible des feux de détresse','fuse ratting for hazzard lights']:
  print(expand_query(q)); a=e.answer(q,mode='bm25'); print('->',a['status'],a.get('route'),a.get('rows',[])[:3])
