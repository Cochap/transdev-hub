import pymupdf,sys,collections,time
from tables import extract
d=pymupdf.open(sys.argv[1]); t0=time.time()
hdrs=collections.Counter(); ex={}; pw=set()
for i in range(d.page_count):
    for t in extract(d[i]):
        h=' | '.join(t['cols']); hdrs[h]+=1; ex.setdefault(h,i+1); pw.add(i+1)
print('secs',round(time.time()-t0),'pages with tables',len(pw))
for h,c in hdrs.most_common(40): print(c,ex[h],h)
