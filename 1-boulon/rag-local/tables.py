import re
HDR={'CAV','CIRCUIT','GA','COLOR','TERMINAL','SEAL/SLV','FUSE','RELAY','DESCRIPTION','LOCATION','RATING','WIRE','R/D','FUSE/RELAY','RATING(A)','CONNECTED','BREAKERS','NOTES','CURRENT'}
CAVRE=re.compile(r'^[A-Z]{0,2}\d{0,3}[A-Z]?[!*#&%$+@^?]*(-[A-Z]{0,2}\d{1,3})?$')
NOTE=('@','*','#','!','&','%','$','+')
def lines_of(ws,tol=2.0):
    ws=sorted(ws,key=lambda w:((w[1]+w[3])/2,w[0])); rows=[]
    for w in ws:
        yc=(w[1]+w[3])/2
        if rows and abs(rows[-1]['yc']-yc)<=tol: rows[-1]['w'].append(w)
        else: rows.append({'yc':yc,'w':[w]})
    for r in rows: r['w'].sort(key=lambda w:w[0])
    return rows
def _groups(hdr):
    hdr=sorted(hdr,key=lambda w:w[0]); G=[[hdr[0]]]
    for w in hdr[1:]:
        names=[x[4] for x in G[-1]]
        if w[0]-G[-1][-1][2]>170 or w[4] in names: G.append([w])
        else: G[-1].append(w)
    return [g for g in G if len(g)>=3]
def hlines(p):
    H=[]
    for dr in p.get_drawings():
        for it in dr['items']:
            if it[0]=='l':
                a,b=it[1],it[2]
                if abs(a.y-b.y)<0.6 and abs(a.x-b.x)>8: H.append((min(a.x,b.x),max(a.x,b.x),a.y))
            elif it[0]=='re':
                r=it[1]
                if r.height<1.2 and r.width>8: H.append((r.x0,r.x1,(r.y0+r.y1)/2))
                elif r.width>8 and r.height>4: H+= [(r.x0,r.x1,r.y0),(r.x0,r.x1,r.y1)]
    return H
def extract(p):
    ws=p.get_text('words'); rows=lines_of(ws); out=[]; HL=None; VL=None
    for i,r in enumerate(rows):
        hdr=[w for w in r['w'] if w[4].upper() in HDR]
        if len(hdr)<3: continue
        for g in _groups(hdr):
            m=[g[0]]
            for w in g[1:]:
                if (m[-1][4],w[4]) in (('CURRENT','RATING'),('FUSE','DESCRIPTION')) and w[0]-m[-1][2]<12: m[-1]=(m[-1][0],min(m[-1][1],w[1]),w[2],max(m[-1][3],w[3]),m[-1][4]+' '+w[4])+tuple(m[-1][5:])
                else: m.append(w)
            g=m
            cols=[w[4] for w in g]; xs=[w[0] for w in g]; cs=[(w[0]+w[2])/2 for w in g]
            left=g[0][0]-15; right=g[-1][2]+45
            body=[]; notes=[]; lasty=r['yc']; rh=None; innotes=False
            for r2 in rows[i+1:]:
                ins=[w for w in r2['w'] if left-30<=w[0]<=right]
                if not ins:
                    if r2['yc']-lasty>(rh or 12)*2.5: break
                    continue
                if len([w for w in ins if w[4].upper() in HDR])>=3: break
                gap=r2['yc']-lasty
                if rh is None and not innotes: rh=gap
                if gap>max(rh or 8,6)*2.6: break
                txt=' '.join(w[4] for w in ins)
                if innotes or ins[0][4].startswith(NOTE) or txt.startswith(('NOTE','AND ','W/','N/')) or (cols[0]=='CAV' and not CAVRE.match(ins[0][4]) and ins[0][4] not in ('-','–')):
                    innotes=True; notes.append(txt); lasty=r2['yc']
                    if len(notes)>8: break
                    continue
                if not body and cols[0]=='CAV' and not CAVRE.match(ins[0][4]): continue
                cells=ins
                body.append({'y':r2['yc'],'c':cells}); lasty=r2['yc']
            if body:
                if VL is None: VL=vlines(p)
                body=_rivers(body,g,VL,r['yc'],lasty)
                cols=[w[4] for w in g] if len(body[0]['c'])==len(g) else _hdrs(body,g)
                if 'CURRENT' in cols and 'RATING' in cols and cols.index('RATING')==cols.index('CURRENT')+1:
                    k=cols.index('CURRENT'); cols=cols[:k]+['CURRENT RATING']+cols[k+2:]; body=[dict(y=b['y'],c=b['c'][:k]+[(b['c'][k]+' '+b['c'][k+1]).strip()]+b['c'][k+2:]) for b in body]
                if HL is None: HL=hlines(p)
                c0=(g[0][0]+g[0][2])/2
                ys=sorted(y for (a,b,y) in HL if a<=c0<=b and r['yc']<y<lasty+20)
                body=_fill(body,ys)
                if cols[0] in ('R/D','BREAKERS','LOCATION','RELAY'):
                    last=''
                    for c in body:
                        if c[0] in ('','-'): c[0]=last
                        else: last=c[0]
                if 'FUSE DESCRIPTION' in cols or ('FUSE' in cols and 'DESCRIPTION' in cols):
                    if 'FUSE' in cols:
                        k=cols.index('FUSE'); cols=cols[:k]+['FUSE DESCRIPTION']+cols[k+2:]
                        body=[c[:k]+[(c[k]+' '+c[k+1]).strip()]+c[k+2:] for c in body]
                    if cols[-1]=='RATING':
                        for c in body:
                            m=re.search(r'\s(\d+(?:\.\d+)?A)$',c[-2])
                            if m and not c[-1]: c[-1]=m.group(1); c[-2]=c[-2][:m.start()]
                            m=re.search(r'^(.*?)\s*(\d+(?:\.\d+)?A)$',c[-1])
                            if m and m.group(1): c[-2]=(c[-2]+' '+m.group(1)).strip(); c[-1]=m.group(2)
                            if c[-1] and not re.match(r'^\d+(\.\d+)?A$',c[-1]): c[-2]=(c[-2]+' '+c[-1]).strip(); c[-1]=''
                for j,cn in enumerate(cols[:-1]):
                    if 'RATING' in cn:
                        for c in body:
                            mm=re.match(r'^([\d./]+A?)\s+(.+)$',c[j])
                            if mm: c[j]=mm.group(1); c[j+1]=(mm.group(2)+' '+c[j+1]).strip()
                cap=[x for x in rows[max(0,i-2):i] if any(left<=w[0]<=right for w in x['w']) and r['yc']-x['yc']<16]
                caption=' '.join(w[4] for x in cap for w in x['w'] if left<=w[0]<=right)
                md=(('Table: '+caption+chr(10)) if caption else '')+'| '+' | '.join(cols)+' |\n|'+'---|'*len(cols)+'\n'+'\n'.join('| '+' | '.join(c)+' |' for c in body)
                if notes: md+='\nLegend: '+' ; '.join(notes)
                out.append({'bbox':(left,r['yc'],right,lasty),'cols':cols,'rows':body,'notes':notes,'md':md})
    return out

def _fill(body,ys=()):
    if len(ys)>=2:
        cell=lambda y: sum(1 for v in ys if v<y)
        lab={}
        for b in body:
            if b['c'][0]: lab.setdefault(cell(b['y']),b['c'][0])
        out=[]
        for b in body:
            c=list(b['c'])
            if c[0] and not any(c[1:]) and len(body)>1: continue
            if not c[0]: c[0]=lab.get(cell(b['y']),'')
            out.append(c)
        return out
    labels=[b for b in body if b['c'][0] and not any(b['c'][1:])]
    full=[b for b in body if b['c'][0] and any(b['c'][1:])]
    anchors=labels+full
    out=[]
    for b in body:
        if b in labels and len(body)>1: continue
        c=list(b['c'])
        if not c[0] and anchors:
            a=min(anchors,key=lambda a:abs(a['y']-b['y'])); c[0]=a['c'][0]
        out.append(c)
    return out

def vlines(p):
    V=[]
    for dr in p.get_drawings():
        for it in dr['items']:
            if it[0]=='l':
                a,b=it[1],it[2]
                if abs(a.x-b.x)<0.6 and abs(a.y-b.y)>4: V.append((a.x,min(a.y,b.y),max(a.y,b.y)))
            elif it[0]=='re':
                r=it[1]
                if r.width<1.2 and r.height>4: V.append(((r.x0+r.x1)/2,r.y0,r.y1))
    return V
def _rivers(body,g,VL=(),y0=0,y1=0):
    """Column separators = x-gaps (>=6pt) not covered by any data word; then cells by separators.
    Falls back to header boundaries if rivers give a different column count than headers."""
    W=[w for b in body for w in b['c']]
    lo=min(w[0] for w in W); hi=max(w[2] for w in W)
    cov=[0]*(int(hi-lo)+2)
    for w in W:
        for x in range(int(w[0]-lo),int(w[2]-lo)+1): cov[x]=1
    seps=[]; x=0
    while x<len(cov):
        if cov[x]==0:
            st=x
            while x<len(cov) and cov[x]==0: x+=1
            if x-st>=6: seps.append(lo+(st+x)/2)
        x+=1
    hb=[(g[j-1][2]+g[j][0])/2 for j in range(1,len(g))]
    # vertical rules inside the table, covering >=50% of its height
    H=max(y1-y0,1); xs={}
    for (x,a,b) in VL:
        if lo-4<x<hi+4:
            ov=max(0,min(b,y1+4)-max(a,y0-8))
            if ov>0: xs[round(x)]=xs.get(round(x),0)+ov
    vr=sorted(x for x,c in xs.items() if c>=0.5*H and lo+3<x<hi-3)
    vr=[x for i,x in enumerate(vr) if i==0 or x-vr[i-1]>3]
    if len(vr)>=len(g)-1 and len(g)>1:
        use=sorted(min(vr,key=lambda v:abs(v-h)) for h in hb)
        if len(set(use))<len(use): use=seps if len(seps)==len(g)-1 else hb
    else:
        use=seps if len(seps)==len(g)-1 else hb
    out=[]
    for b in body:
        cells=['']*(len(use)+1)
        for w in b['c']:
            cw=w[0]+1
            k=sum(1 for s_ in use if cw>=s_)
            cells[k]=(cells[k]+' '+w[4]).strip()
        out.append(dict(y=b['y'],c=cells))
    return out
def _hdrs(body,g): return [w[4] for w in g]
