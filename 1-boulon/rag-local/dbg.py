from rag import *; e=Engine(load_pages())
e.link_fuses([]); print('fuse index keys',len(e._fidx), list(e._fidx)[:12])
print(e.link_fuses([dict(pdf_page=101)]))
