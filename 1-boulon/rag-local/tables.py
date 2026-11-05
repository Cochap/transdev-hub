import re
HDR={'CAV','CIRCUIT','GA','COLOR','TERMINAL','SEAL/SLV','FUSE','RELAY','DESCRIPTION','LOCATION','RATING','WIRE'}
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
        if w[0]-G[-1][-1][2]>60 or w[4] in names: G.append([w])
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
    ws=p.get_text('words'); rows=lines_of(ws); out=[]; HL=None
    for i,r in enumerate(rows):
        hdr=[w for w in r['w'] if w[4].upper() in HDR]
        if len(hdr)<3: continue
        for g in _groups(hdr):
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
                cells=['']*len(cols)
                for w in ins:
                    c=(w[0]+w[2])/2
                    k=min(range(len(cs)),key=lambda j:abs(cs[j]-c)) if not (w[0]<=cs[0]<=w[2]) else 0
                    if w[2]-w[0]>60:  # long word: use left edge
                        k=max([j for j in range(len(xs)) if w[0]>=xs[j]-12] or [0])
                    cells[k]=(cells[k]+' '+w[4]).strip()
                body.append({'y':r2['yc'],'c':cells}); lasty=r2['yc']
            if body:
                if HL is None: HL=hlines(p)
                c0=(g[0][0]+g[0][2])/2
                ys=sorted(y for (a,b,y) in HL if a<=c0<=b and r['yc']<y<lasty+20)
                body=_fill(body,ys)
                if 'FUSE' in cols and 'DESCRIPTION' in cols:
                    k=cols.index('FUSE'); cols=cols[:k]+['FUSE DESCRIPTION']+cols[k+2:]
                    body=[c[:k]+[(c[k]+' '+c[k+1]).strip()]+c[k+2:] for c in body]
                    if cols[-1]=='RATING':
                        for c in body:
                            m=re.search(r'\s(\d+(?:\.\d+)?A)$',c[-2])
                            if m and not c[-1]: c[-1]=m.group(1); c[-2]=c[-2][:m.start()]
                            m=re.search(r'^(.*?)\s*(\d+(?:\.\d+)?A)$',c[-1])
                            if m and m.group(1): c[-2]=(c[-2]+' '+m.group(1)).strip(); c[-1]=m.group(2)
                            if c[-1] and not re.match(r'^\d+(\.\d+)?A$',c[-1]): c[-2]=(c[-2]+' '+c[-1]).strip(); c[-1]=''
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
