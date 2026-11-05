"""Ingest IC electrical manual -> per-page enriched records (jsonl). $0, offline, deterministic."""
import pymupdf, re, json, sys, time
from tables import extract
from graphic import relay_map
BOILER=set("""ELECTRICAL CIRCUIT DIAGRAM MANUAL|THIS PRINT IS PROVIDED ON A RESTRICTED BASIS AND IS NOT TO|BE USED IN ANY WAY DETRIMENTAL TO THE INTEREST OF|NAVISTAR, INC.|REFERENCE|RELEASE NO.|SHEET|CHK|DRAWN|NAME|PART NO.|DATE|CHANGE|REV|CIRCUIT DIAGRAM, BE,CE BUS MODELS""".split('|'))
COMP=re.compile(r'\((\d{4,5}[A-Z]?(?:-[A-Z]\d(?:/[A-Z]\d)?)?)\)')
WIRE=re.compile(r'\b([A-Z]{1,3}\d{1,4}[A-Z0-9]*(?:-[A-Z0-9]+)?)\s+(\d{1,2})(BK|WH|RD|GN|LTGN|DKGN|BL|LTBL|DKBL|OR|YE|BN|GY|PK|VI|TN|PU)\b')
XREF=re.compile(r'\bCH(\d{1,2})_(\d{1,3})\b')
def clusters(p, gap=7):
    W=[w for w in p.get_text('words') if w[4] not in BOILER]
    n=len(W); par=list(range(n))
    def f(i):
        while par[i]!=i: par[i]=par[par[i]]; i=par[i]
        return i
    idx=sorted(range(n),key=lambda i:W[i][0])
    for a in range(n):
        i=idx[a]
        for b in range(a+1,n):
            j=idx[b]
            if W[j][0]-W[i][2]>gap: break
            if W[j][1]-W[i][3]<=gap and W[i][1]-W[j][3]<=gap: par[f(i)]=f(j)
    G={}
    for i in range(n): G.setdefault(f(i),[]).append(W[i])
    out=[]
    for g in G.values():
        g.sort(key=lambda w:(round(w[1]/3),w[0]))
        t=' '.join(w[4] for w in g)
        if len(g)>=2 and len(t)<160: out.append(t)
    return out
def page_record(d,i):
    p=d[i]; raw=p.get_text(); L=[l.strip() for l in raw.split('\n') if l.strip()]
    title=''
    if len(L)>1 and L[0].startswith('ELECTRICAL CIRCUIT'):
        title=L[1]
        if not re.search(r'P\. ?\d+\s*$',title) and len(L)>2 and re.match(r'^P\. ?\d+|^[A-Z/ ,&-]+P\. ?\d+$',L[2]): title+=' '+L[2]
    m=re.match(r'^(\d+)\.(\d+)\.\s*(.*)$',title); sec=f'{m.group(1)}.{m.group(2)}' if m else ''
    chap=int(m.group(1)) if m else None
    fig=re.search(r'Figure (\d+)\s+(.*)',raw); printed=L[-1] if L and L[-1].isdigit() else None
    tabs=extract(p)
    comps=sorted(set(re.sub(r'\s+',' ',x) for x in re.findall(r'([A-Z][A-Z0-9 /&.-]{2,40})\s*\n?\((\d{4,5}[A-Z]?[^)]*)\)',raw) and [f'{a.strip()} ({b})' for a,b in re.findall(r'([A-Z][A-Z0-9/&.\- ]{2,40})\n\((\d{4,5}[A-Z]?[^)\n]*)\)',raw)]))
    body='\n'.join(l for l in L if l not in BOILER)
    flat=re.sub(r'\n',' ',body)
    wires=sorted(set(f'{a} {b}{c}' for a,b,c in WIRE.findall(re.sub(r'\n(\d{1,2}[A-Z]{2,4})\b',r' \1',body).replace('\n',' '))))
    xrefs=sorted(set(f'CH{a}_{b}' for a,b in XREF.findall(raw)))
    relays=relay_map(p)
    cl=[] if tabs and sum(len(t['rows']) for t in tabs)>8 else clusters(p)
    return dict(pdf_page=i+1,printed_page=printed,section=sec,chapter=chap,title=title,
        figure=(f'Figure {fig.group(1)} {fig.group(2).strip()}' if fig else ''),
        components=comps,wires=wires,xrefs=xrefs,tables=[t['md'] for t in tabs],
        n_table_rows=sum(len(t['rows']) for t in tabs),relay_slots=relays,label_groups=cl,text=body)
if __name__=='__main__':
    src,out=sys.argv[1],sys.argv[2]; d=pymupdf.open(src); t0=time.time()
    lay=open(sys.argv[3],encoding='utf-8',errors='replace').read().split('\f') if len(sys.argv)>3 else None
    with open(out,'w',encoding='utf-8') as f:
        for i in range(d.page_count):
            r=page_record(d,i)
            if lay:
                r['layout']='\n'.join(l.rstrip() for l in lay[i].split('\n')
                                      if l.strip() and l.strip() not in BOILER and 'RESTRICTED BASIS' not in l and 'DETRIMENTAL' not in l)
            f.write(json.dumps(r,ensure_ascii=False)+'\n')
    print('pages',d.page_count,'secs',round(time.time()-t0))
