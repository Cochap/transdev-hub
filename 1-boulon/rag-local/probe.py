import pymupdf,sys,collections
d=pymupdf.open(sys.argv[1]); print(d.page_count, d.metadata)
toc=d.get_toc(); print('toc entries',len(toc)); [print(t) for t in toc[:40]]
for i in [0,5,20,100,400,800,1200,1500]:
    p=d[i]; t=p.get_text(); im=p.get_images(); dr=len(p.get_drawings())
    print('--- page',i+1,'chars',len(t),'imgs',len(im),'drawings',dr); print(t[:300].replace('\n',' | '))
