import re
RW=re.compile(r'^R\d$'); BW=re.compile(r'^B\d{1,2}$'); NOISE=re.compile(r'^([A-Z]|\d{1,2}|NS\d)$')
def c(w): return ((w[0]+w[2])/2,(w[1]+w[3])/2)
def relay_map(p):
    W=p.get_text('words'); R=[w for w in W if RW.match(w[4])]; B=[w for w in W if BW.match(w[4])]
    if len(R)<6 or not B: return []
    vert=lambda w:(w[3]-w[1])>(w[2]-w[0])
    if sum(vert(w) for w in W if len(w[4])>3)<5: return []
    L=[w for w in W if not RW.match(w[4]) and not BW.match(w[4]) and vert(w) and len(w[4])>1]
    slots={id(r):[] for r in R}
    for w in L:
        cw=c(w)
        cand=[r for r in R if 0<cw[0]-c(r)[0]<=36 and abs(c(r)[1]-cw[1])<=32]
        if cand: slots[id(min(cand,key=lambda r:cw[0]-c(r)[0]))].append(w)
    out=[]
    for r in R:
        cr=c(r); below=[b for b in B if c(b)[1]>cr[1]-5]
        b=min(below or B,key=lambda b:abs(c(b)[0]-cr[0])*2+abs(c(b)[1]-cr[1])*0.5)
        ws=sorted(slots[id(r)],key=lambda w:(round(c(w)[0]/3),-c(w)[1]))
        lab=' '.join(w[4] for w in ws)
        if lab: out.append(f'Relay block {b[4]} position {r[4]}: {lab}')
    return sorted(set(out))
