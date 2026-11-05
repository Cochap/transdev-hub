"""BOULON local multimodal RAG (Azure-free reference engine).
Chunks = page summary + each reconstructed table + relay map, rolled up to page for citation.
Retrieval = BM25 (code-aware tokens) + multilingual dense embeddings, fused with RRF.
"""
import json, re, os, pickle, sys, math
import numpy as np
from rank_bm25 import BM25Okapi

HERE = os.path.dirname(os.path.abspath(__file__))
MANUAL = "IC Bus BE/CE Series Electrical Circuit Diagram Manual MY2016-2024, rev. 7 (March 2024)"
MANUAL_FILE = "OneDrive - TRANSDEV/Manuels/IC Leeds/IC bus 2016-2024.pdf"

# --- glossary FR -> EN (mechanic jargon; meeting: "le jargon passe par un glossaire") ---
GLOSS = {
 "fusible": "fuse", "fusibles": "fuse", "calibre": "rating gauge ga", "ampérage": "rating", "amperage": "rating",
 "relais": "relay", "fil": "wire circuit", "fils": "wire circuit", "câble": "wire circuit", "cable": "wire circuit",
 "couleur": "color", "broche": "cav pin", "broches": "cav pin", "cavité": "cav", "borne": "terminal",
 "connecteur": "connector", "prise": "connector", "masse": "ground", "mise à la terre": "ground",
 "essuie-glace": "wiper", "essuie-glaces": "wiper", "lave-glace": "washer", "feux": "lights light", "feu": "light lamp",
 "phare": "headlight headlamp", "phares": "headlight headlamp", "clignotant": "turn signal flasher", "clignotants": "turn signal flasher",
 "détresse": "hazard", "porte": "door", "portière": "door", "bras d'arrêt": "stop arm", "bras": "arm", "arrêt": "stop",
 "démarreur": "starter crank", "démarrage": "start starter crank", "batterie": "battery", "alternateur": "alternator",
 "chauffage": "heater", "chaufferette": "heater", "dégivreur": "defroster defrost", "klaxon": "horn", "avertisseur": "horn",
 "plafonnier": "dome light", "éclairage": "light illumination", "recul": "backup back-up reverse", "marche arrière": "reverse backup",
 "frein": "brake", "freins": "brake", "frein de stationnement": "park brake parking brake", "stationnement": "park parking",
 "moteur": "engine motor", "transmission": "transmission xmsn", "boîte": "transmission", "capteur": "sensor", "sonde": "sensor",
 "température": "temp temperature", "pompe": "pump", "ventilateur": "fan blower", "climatisation": "a/c air conditioning", "clim": "a/c",
 "interrupteur": "switch", "commutateur": "switch", "bouton": "switch button", "tableau de bord": "dash instrument panel cluster",
 "faisceau": "harness", "épissure": "splice", "schéma": "diagram circuit", "élévateur": "lift", "fauteuil roulant": "wheelchair lift",
 "enfant": "child", "vérification": "check", "alarme": "alarm", "minuterie": "timer", "rétroviseur": "mirror", "radio": "radio",
 "marqueur": "marker", "gabarit": "clearance marker", "plaque": "license plate", "noir": "bk black", "blanc": "wh white",
 "rouge": "rd red", "vert": "gn green", "vert pâle": "ltgn", "bleu": "bl blue", "bleu pâle": "ltbl", "bleu foncé": "dkbl",
 "orange": "or", "jaune": "ye yellow", "brun": "bn brown", "gris": "gy gray", "rose": "pk pink", "violet": "vi", "mauve": "vi",
 "bloc": "block", "boîte à fusibles": "fuse block box panel", "panneau": "panel", "allumage": "ignition", "clé": "key ignition",
 "coupe-batterie": "master disconnect", "sectionneur": "master disconnect", "urgence": "emergency", "sortie de secours": "emergency exit",
 "toit": "roof hatch", "trappe": "hatch", "siège": "seat", "chauffe-moteur": "block heater coolant heater", "pédale": "pedal",
 "accélérateur": "accelerator throttle", "vitesse": "speed", "compteur": "speedometer gauge", "jauge": "gauge", "carburant": "fuel",
 "brouillard": "fog", "antibrouillard": "fog", "miroir": "mirror", "miroirs": "mirror", "chauffant": "heated", "chauffants": "heated",
 "motorisé": "power", "motorisés": "power", "lumière de marche": "step light", "marche": "step", "marchepied": "step",
 "essuie": "wiper", "dégivrage": "defrost defog", "buée": "defog", "lecture": "reading", "intérieur": "interior dome",
 "électrique": "electric", "électrovanne": "solenoid", "stroboscopique": "strobe", "strobe": "strobe", "gyrophare": "strobe beacon",
 "ampoule": "bulb lamp", "lumière": "light lamp", "lumières": "lights", "feux stop": "stop lamp brake light", "plaque": "license plate",
 "disjoncteur": "breaker circuit breaker", "disjoncteurs": "breaker", "contrôleur": "controller", "module": "module",
 "embrayage": "clutch", "ventilo": "fan", "alimentation": "feed power", "alimente": "feeds power", "marche pas": "inoperative",
 "chauffeur": "driver", "conducteur": "driver", "pin": "cav", "pine": "cav", "plug": "connector", "terre": "ground", "solénoïde": "solenoid", "diode": "diode", "résistance": "resistor",
}
COLORS = {"BK","WH","RD","GN","LTGN","DKGN","BL","LTBL","DKBL","OR","YE","BN","GY","PK","VI","TN","PU"}
OTHER_MAKES = re.compile(r"\b(thomas|blue ?bird|freightliner|saf-?t-?liner|lion ?c?|elion|micro ?bird|girardin|nova ?bus|new ?flyer|prevost|mci)\b", re.I)

TOK = re.compile(r"[a-z0-9à-ÿ]+(?:[-/][a-z0-9à-ÿ]+)*")
def tokens(s):
    s = s.lower(); out = []
    for t in TOK.findall(s):
        out.append(t)
        if '-' in t or '/' in t:
            out += [x for x in re.split(r"[-/]", t) if x]
        m = re.match(r"^(\d+)(bk|wh|rd|gn|ltgn|dkgn|bl|ltbl|dkbl|or|ye|bn|gy|pk|vi|tn|pu)$", t)  # 16ltbl -> 16 ltbl
        if m: out += [m.group(1), m.group(2)]
    return out

def expand_query(q):
    ql = q.lower(); add = []
    for fr in sorted(GLOSS, key=len, reverse=True):
        if re.search(r"(?<![a-zà-ÿ])" + re.escape(fr) + r"(?![a-zà-ÿ])", ql):
            add.append(GLOSS[fr])
    return q + (" " + " ".join(add) if add else "")

def chunks_from_page(r):
    head = f"{r['title']} | {r['figure']} | printed page {r['printed_page']}"
    out = []
    summ = [head]
    if r['components']: summ.append("Components: " + "; ".join(r['components']))
    if r['relay_slots']: summ.append("Relay map: " + "; ".join(r['relay_slots']))
    if r['wires']: summ.append("Wires (circuit gauge+color): " + "; ".join(r['wires']))
    if r['xrefs']: summ.append("See also sheets: " + ", ".join(r['xrefs']))
    if r['label_groups']: summ.append("Labels: " + " / ".join(r['label_groups'][:80]))
    if not r['tables'] and not r['label_groups']: summ.append(r['text'][:3000])
    out.append(("page", "\n".join(summ)))
    for t in r['tables']:
        out.append(("table", head + "\n" + t))
    if r.get('layout'):  # independent poppler -layout rendering: fallback for anything the table parser missed
        out.append(("layout", head + "\n" + re.sub(r"[ ]{3,}", "  |  ", r['layout'])[:6000]))
    return out

def load_pages(path=os.path.join(HERE, "pages.jsonl")):
    return [json.loads(l) for l in open(path, encoding="utf-8")]

class Engine:
    def __init__(self, pages, emb_model=None, emb_dir=None, cache=None):
        self.pages = {r['pdf_page']: r for r in pages}
        self.chunks = []  # (pdf_page, kind, text)
        for r in pages:
            for k, t in chunks_from_page(r): self.chunks.append((r['pdf_page'], k, t))
        self.bm25 = BM25Okapi([tokens(t) for _, _, t in self.chunks], k1=1.2, b=0.6)
        self.vocab = set(t for _, _, tx in self.chunks for t in tokens(tx))
        self.tbm25 = BM25Okapi([tokens(self.pages[p]['title'] + ' ' + self.pages[p]['figure']) for p, _, _ in self.chunks], k1=1.2, b=0.3)
        self.emb = None
        if emb_model:
            from fastembed import TextEmbedding
            self.model = TextEmbedding(emb_model, specific_model_path=emb_dir)
            self.prefix_q, self.prefix_d = ("query: ", "passage: ") if "e5" in emb_model else ("", "")
            if cache and os.path.exists(cache):
                self.emb = np.load(cache)
            else:
                v = np.array(list(self.model.embed([self.prefix_d + t[:2000] for _, _, t in self.chunks], batch_size=32)))
                self.emb = v / np.linalg.norm(v, axis=1, keepdims=True)
                if cache: np.save(cache, self.emb)

    def search(self, q, k=5, mode="hybrid", expand=True):
        qx = expand_query(q) if expand else q
        n = len(self.chunks); ranks = []
        if mode in ("bm25", "hybrid"):
            s = self.bm25.get_scores(tokens(qx)); ranks.append((np.argsort(-s)[:200], s))
            ts = self.tbm25.get_scores(tokens(qx)); ranks.append((np.argsort(-ts)[:200], ts))
        if mode in ("dense", "hybrid") and self.emb is not None:
            qv = np.array(list(self.model.embed([self.prefix_q + q])))[0]; qv /= np.linalg.norm(qv)
            s = self.emb @ qv; ranks.append((np.argsort(-s)[:200], s))
        fused = {}
        for order, _ in ranks:
            for rank, i in enumerate(order):
                fused[i] = fused.get(i, 0) + 1.0 / (60 + rank)
        # exact code boost: tokens that look like codes (letters+digits) present verbatim
        codes = [t for t in tokens(q) if re.search(r"\d", t) and re.search(r"[a-z]", t) or re.fullmatch(r"\d{5}", t)]
        if codes:
            for i in list(fused):
                tl = self.chunks[i][2].lower()
                hit = sum(1 for c in codes if re.search(r"(?<![a-z0-9])" + re.escape(c) + r"(?![a-z0-9])", tl))
                fused[i] += 0.02 * hit
        pages = {}
        for i, sc in sorted(fused.items(), key=lambda x: -x[1]):
            p = self.chunks[i][0]
            if p not in pages: pages[p] = (sc, i)
            if len(pages) >= k: break
        bm = ranks[0][1] if ranks else None
        return [dict(pdf_page=p, score=round(sc, 4), chunk=self.chunks[i][2], kind=self.chunks[i][1],
                     bm25=float(bm[i]) if bm is not None and mode != "dense" else None) for p, (sc, i) in pages.items()]

    STOP = {"what","the","is","for","of","which","quel","quelle","est","le","la","les","du","de","des","a","on","in","sur","au","et","fil","wire","circuit","connector","connecteur","cavity","cav","rating","fuse","relay","block","position","color","gauge","ga","couleur","calibre","pin","lights","light"}
    def answer(self, q, k=5, mode="hybrid"):
        """Deterministic answer card: scope guard, retrieval, best table/relay rows, citation. No LLM."""
        if OTHER_MAKES.search(q) and not re.search(r"\bic\b", q, re.I):
            return dict(status="abstain_scope", text="Je n'ai pas cette information : le corpus MVP couvre seulement le manuel IC Bus BE/CE (2016-2024). / I don't have that information for that make.")
        anchored = bool(ELEC_ANCHOR.search(q))
        if INJECTION.search(q) and not (anchored and not OVERRIDE.search(q) and re.search(r"\b(switch|interrupteur|relay|relais|circuit)\b", q, re.I)):
            return dict(status="abstain_refuse", text="Je réponds seulement à partir des manuels approuvés, avec citation. Je ne peux pas ignorer ces règles ni expliquer comment contourner un dispositif de sécurité. / I only answer from the approved manuals and cannot bypass safety devices.")
        if OUT_OF_DOMAIN.search(q) and not anchored:
            return dict(status="abstain_domain", text="Je n'ai pas cette information : le manuel IC disponible est un manuel de schémas électriques (fusibles, relais, connecteurs, fils). Il ne contient pas de couples de serrage, capacités, pressions ni procédures mécaniques. / Not in the electrical circuit manual.")
        routes = [r_ for r_ in (self.route_connector(q) or self.route_connector_name(q), self.route_fuse(q), self.route_relay_slot(q)) if r_]
        hits = self.search(q, k, mode=mode)
        if not routes and (not hits or self.low_confidence(q, hits)):
            return dict(status="abstain_low", text="Je n'ai pas cette information dans le manuel IC. / I don't have that information.", hits=hits)
        if not self.unit_evidence(q, hits, routes):
            return dict(status="abstain_value", text="Je n'ai pas cette valeur dans le manuel IC (aucune valeur avec cette unité dans les pages trouvées). / That value is not printed in the IC manual.", hits=hits)
        if routes:
            # routes ADD precise rows; retrieval still supplies context (routes alone were too greedy on the blind set)
            rp = []
            for r_ in routes:
                for h in r_['hits'][:2]:
                    if h['pdf_page'] not in rp: rp.append(h['pdf_page'])
            merged = [dict(pdf_page=p, score=1.0, chunk="\n".join(t for pp, _, t in self.chunks if pp == p), kind="routed", bm25=None) for p in rp[:3]]
            merged += [h for h in hits if h['pdf_page'] not in rp][:max(0, k - len(merged))]
            hits = merged
        qx = expand_query(q); qt = set(tokens(qx)); strong = {t for t in qt if re.search(r"\d", t)} | {t for t in qt if t not in self.STOP and len(t) > 2}
        cav = re.search(r"(?:cavity|cavit[ée]|cav|pin|broche)\s*#?\s*([a-z]?\d{1,2}[a-z]?)\b", q, re.I)
        cand = []
        for rank, h in enumerate(hits[:3]):
            for (p, kind, txt) in self.chunks:
                if p != h['pdf_page']: continue
                for line in txt.split(chr(10)):
                    is_row = line.startswith("|") and not line.startswith("|---") and not line.startswith("| CAV") and not line.startswith("| LOCATION")
                    pre = next((x for x in ("Relay map: ", "Components: ", "Wires (circuit gauge+color): ") if line.startswith(x)), None)
                    if not (is_row or pre): continue
                    parts = line[len(pre):].split("; ") if pre else [line]
                    for part in parts:
                        lt = set(tokens(part)); sc = len(strong & lt) * 2 + len(qt & lt) * 0.5 - rank * 0.3
                        if cav and is_row:
                            first = part.strip("|").split("|")[0].strip().lower()
                            sc += 4 if re.sub(r"[^a-z0-9]", "", first) == cav.group(1).lower() else -2
                        if sc > 1: cand.append((sc, p, part))
        cand.sort(key=lambda x: -x[0]); seen = set(); rows = []
        for sc, p, part in cand:
            if part in seen: continue
            seen.add(part); rows.append(f"{part}  [PDF p.{p}]")
            if len(rows) >= 4: break
        rrows = [x for r_ in routes for x in r_['rows']]
        rows = [self.annotate(x) for x in list(dict.fromkeys(rrows + rows))[:8]]
        top = hits[0]; r = self.pages[top['pdf_page']]
        cite = f"{MANUAL}, §{r['section']} « {r['title']} », page imprimée {r['printed_page']} (PDF p. {r['pdf_page']})"
        return dict(status="answer", rows=rows, citation=cite, hits=hits, route="+".join(r_['route'] for r_ in routes) or None)

    UNITS = {"ohm": r"\d\s*(?:OHMS?|Ω|K?OHM)", "ohms": r"\d\s*(?:OHMS?|Ω)", "résistance": r"\d\s*(?:OHMS?|Ω)", "resistance": r"\d\s*(?:OHMS?|Ω)",
             "volt": r"\d\s*V(?:OLTS?|DC)?\b", "volts": r"\d\s*V(?:OLTS?|DC)?\b", "voltage": r"\d\s*V(?:OLTS?|DC)?\b", "tension": r"\d\s*V(?:OLTS?|DC)?\b"}  # temperatures are conditions, not the asked value
    def annotate(self, row):
        """Variant rows: append the legend meaning of the option marker(s) in the first cell (e.g. '1!' -> '! = W/ADDITIONAL BACK UP LT...')."""
        m = re.search(r"\[(?:connector \w+, )?PDF p\.(\d+)\]", row)
        if not m or not row.startswith("|"): return row
        first = row.strip("|").split("|")[0].strip(); mk = re.sub(r"^[A-Z]{0,2}\d{0,3}[A-Z]?", "", first)
        if not mk: return row
        body = row[:m.start()].strip()
        for (p, kind, txt) in self.chunks:
            if p != int(m.group(1)) or kind != "table" or body not in txt: continue
            leg = next((l for l in txt.split(chr(10)) if l.startswith("Legend:")), "")
            items = [s.strip() for s in leg[len("Legend:"):].split(" ; ")]
            hit = [s for s in items if s.split(" ")[0] == mk]
            if hit: return f"{row}  (option {mk} = {hit[0][len(mk):].strip()})"
            return f"{row}  (option {mk}: see legend under the table)"
        return row

    def unit_evidence(self, q, hits, routes):
        """Value questions (ohms, volts, temperatures): the unit must be printed near a query term in retrieved context; else abstain."""
        ql = q.lower(); need = [rx for u, rx in self.UNITS.items() if re.search(r"(?<![a-zà-ÿ])" + re.escape(u) + r"(?![a-zà-ÿ])", ql)]
        if not need: return True
        qt = {t for t in tokens(expand_query(q)) if t in self.vocab and t not in self.STOP and t not in GENERIC and len(t) > 2}
        for h in hits[:3]:
            for line in h['chunk'].split(chr(10)):
                subj = qt - set(self.UNITS) - {"isb", "diesel", "engine", "bus", "read", "should", "many"}
                for rx in need:
                    for mm in re.finditer(rx, line, re.I):
                        win = line[max(0, mm.start() - 60): mm.end() + 60]
                        if subj & set(tokens(win)): return True
        return False

    def route_connector(self, q):
        """Structured lookup: connector id (5 digits) + cavity/wire code -> exact rows from that connector's composite tables."""
        ids = re.findall(r"\b(\d{5})\b", q)
        if not ids: return None
        cav = re.search(r"(?:cavity|cavit[ée]|cav|pin|broche|position)\s*#?\s*([a-z]{0,2}\d{1,3}[a-z]?)\b", q, re.I)
        codes = [t.upper() for t in re.findall(r"\b([A-Za-z]{1,3}\d{1,4}[A-Za-z0-9]*(?:-[A-Za-z0-9]+)?)\b", q) if not re.fullmatch(r"\d+", t)]
        if not cav and not codes: return None
        rows = []
        for (p, kind, txt) in self.chunks:
            if kind != "table": continue
            title = self.pages[p]['title']
            cm = re.search(r"^Connector (\d{5})[A-Z]?:", txt, re.M)   # table bound to its own connector label
            if cm:
                if cm.group(1) not in ids: continue
            elif not any(i in title for i in ids) or "CONNECTOR" not in title.upper(): continue
            for line in txt.split(chr(10)):
                if not line.startswith("|") or line.startswith("|---") or line.startswith("| CAV"): continue
                cells = [c.strip() for c in line.strip("|").split("|")]
                ok = False
                if cav and re.sub(r"[^A-Z0-9]", "", cells[0].upper()) == cav.group(1).upper(): ok = True
                if codes and any(c in cells for c in codes): ok = True if not cav else ok
                if ok: rows.append((p, line))
        if not rows: return None
        pages = sorted({p for p, _ in rows}); r = self.pages[pages[0]]
        legend = []
        for p in pages:
            for (pp, kind, txt) in self.chunks:
                if pp == p and kind == "table" and any(l in txt for _, l in rows if _ == p):
                    legend += [l for l in txt.split(chr(10)) if l.startswith("Legend:")]
        cite = "; ".join(f"§{self.pages[p]['section']} « {self.pages[p]['title']} », page imprimée {self.pages[p]['printed_page']} (PDF p. {p})" for p in pages)
        hits = [dict(pdf_page=p, score=1.0, chunk="\n".join(l for pp, l in rows if pp == p), kind="table", bm25=None) for p in pages]
        return dict(status="answer", route="connector_lookup", rows=[f"{l}  [PDF p.{p}]" for p, l in rows[:8]], legend=sorted(set(legend))[:3],
                    citation=f"{MANUAL}, {cite}", hits=hits)

    def route_connector_name(self, q):
        """No connector number: match question words against each table's bound connector name/location, then the cavity row."""
        cav = re.search(r"(?:cavity|cavit[ée]|cav|pin|pine|broche|position)\s*#?\s*([a-z]{0,2}\d{1,3}[a-z]?)\b", q, re.I)
        if not cav or re.search(r"\b\d{5}\b", q): return None
        import difflib
        qt = [t for t in dict.fromkeys(tokens(expand_query(q))) if t in self.vocab and t not in self.STOP and t not in GENERIC and len(t) > 2 and not re.search(r"\d", t)]
        if not qt: return None
        scored = []
        for (p, kind, txt) in self.chunks:
            if kind != "table": continue
            m = re.search(r"^Connector (\d{5}[A-Z]?): (.*)$", txt, re.M)
            if not m: continue
            nt = set(tokens(m.group(2))) - {"connector", "located", "at"}
            if not nt: continue
            sc = sum(1 for t in qt if t in nt or any(difflib.SequenceMatcher(None, t, x).ratio() >= 0.85 for x in nt))
            if sc >= 2: scored.append((sc, p, txt, m.group(1)))
        if not scored: return None
        scored.sort(key=lambda x: -x[0]); top = scored[0][0]
        rows = []
        for sc, p, txt, cid in [s for s in scored if s[0] == top][:3]:
            for line in txt.split(chr(10)):
                if line.startswith("|") and not line.startswith(("|---", "| CAV")):
                    c0 = line.strip("|").split("|")[0].strip()
                    if re.sub(r"[^A-Z0-9]", "", c0.upper()) == cav.group(1).upper(): rows.append((p, f"{line}  [connector {cid}, PDF p.{p}]"))
        if not rows: return None
        pages = list(dict.fromkeys(p for p, _ in rows))
        return dict(status="answer", route="connector_name", rows=[r_ for _, r_ in rows][:6],
                    hits=[dict(pdf_page=p, score=1.0, chunk="", kind="table", bm25=None) for p in pages])

    def route_fuse(self, q):
        """Fuse-chart lookup: fuzzy match of query terms against FUSE DESCRIPTION rows (typo tolerant, FR via glossary)."""
        if not re.search(r"\b(fuse|fusible|fusibles|fuze|amp|ampérage|amperage|rating)\b", q, re.I): return None
        import difflib
        qx = expand_query(q)
        qt = [t for t in tokens(qx) if t not in self.STOP and t not in GENERIC and len(t) > 2 and not re.fullmatch(r"\d+a?", t)]
        if not qt: return None
        best = []
        for (p, kind, txt) in self.chunks:
            rd = "| R/D | FUSE/RELAY" in txt or "| BREAKERS |" in txt
            if kind != "table" or ("FUSE DESCRIPTION" not in txt and not rd): continue
            for line in txt.split(chr(10)):
                if not line.startswith("|") or line.startswith(("|---", "| R/D", "| BREAKERS", "| LOCATION")): continue
                if not rd and not line.startswith("| F") and not re.match(r"^\| [A-Z]?\d", line): continue
                cells = [c.strip() for c in line.strip("|").split("|")]
                if len(cells) < 2: continue
                desc = cells[-1] if rd else cells[1]
                dt = [t for t in tokens(desc) if t not in self.STOP] or tokens(desc)
                if not dt: continue
                sc = 0.0
                for t in qt:
                    m = max((difflib.SequenceMatcher(None, t, d).ratio() for d in dt), default=0)
                    sc += m if m >= 0.8 else 0
                cov = sc / len(dt)
                if sc >= 0.8 and cov >= 0.5: best.append((sc + cov, p, line))
        if not best: return None
        best.sort(key=lambda x: -x[0]); top = best[0][0]
        keep = [(p, l) for s, p, l in best if s >= top - 0.01][:6]
        pages = sorted({p for p, _ in keep})
        cite = "; ".join(f"§{self.pages[p]['section']} « {self.pages[p]['title']} », page imprimée {self.pages[p]['printed_page']} (PDF p. {p})" for p in pages)
        hits = [dict(pdf_page=p, score=1.0, chunk="\n".join(l for pp, l in keep if pp == p), kind="table", bm25=None) for p in pages]
        return dict(status="answer", route="fuse_lookup", rows=[f"{l}  [PDF p.{p}]" for p, l in keep], citation=f"{MANUAL}, {cite}", hits=hits)

    def route_relay_slot(self, q):
        """Relay panel graphic (verbalized spatially): 'block B5 position R1' or 'where is the stop arm relay on the panel'."""
        if not re.search(r"\b(relay|relais)\b", q, re.I) or not re.search(r"\b(block|bloc|position|panel|panneau|slot|emplacement)\b", q, re.I): return None
        slot = re.search(r"\b(B\d{1,2})\b.*?\b(R\d)\b", q, re.I)
        qx = expand_query(q); qt = [t for t in dict.fromkeys(tokens(qx)) if t not in self.STOP and t not in GENERIC and len(t) > 2 and t in self.vocab]
        out = []
        for r in self.pages.values():
            for s_ in r['relay_slots']:
                m = re.match(r"Relay block (B\d+) position (R\d): (.*)", s_)
                if slot:
                    if m.group(1).upper() == slot.group(1).upper() and m.group(2).upper() == slot.group(2).upper(): out.append((9, r['pdf_page'], s_))
                else:
                    lab = set(tokens(m.group(3))); sc = sum(1 for t in qt if t in lab)
                    if sc and sc >= len(lab) * 0.6: out.append((sc, r['pdf_page'], s_))
        if not out: return None
        out.sort(key=lambda x: -x[0]); top = out[0][0]; keep = [(p, s_) for sc, p, s_ in out if sc == top][:6]
        p = keep[0][0]; r = self.pages[p]
        return dict(status="answer", route="relay_slot", rows=[f"{s_}  [PDF p.{pp}]" for pp, s_ in keep],
                    citation=f"{MANUAL}, §{r['section']} « {r['title']} », page imprimée {r['printed_page']} (PDF p. {p})",
                    hits=[dict(pdf_page=p, score=1.0, chunk="\n".join(s_ for _, s_ in keep), kind="page", bm25=None)])

    def low_confidence(self, q, hits):
        """Abstain when no domain-specific query term occurs in the top chunk."""
        qt = [t for t in dict.fromkeys(tokens(expand_query(q))) if t not in self.STOP and len(t) > 2 and t not in GENERIC and t in self.vocab]
        top = set(tokens(" ".join(h['chunk'] for h in hits[:2])))
        overlap = [t for t in qt if t in top]
        return len(overlap) == 0 or (len(qt) >= 3 and len(overlap) / len(qt) < 0.34)

INJECTION = re.compile(r"(ignore|oublie|forget|disregard).{0,30}(instruction|consigne|rule|règle)|developer mode|mode développeur|\b(bypass|contourner|désactiver la sécurité|shunt(er)? (le|la|the) (sécurité|safety|interlock))\b", re.I)
ELEC_ANCHOR = re.compile(r"\b(sensor|sender|switch|connector|wire|wiring|wired|circuit|fuse|amp|relay|pin|cavity|splice|harness|solenoid|capteur|sonde|interrupteur|connecteur|fil|fils|fusible|relais|broche|cavité|faisceau)\b", re.I)
OVERRIDE = re.compile(r"(ignore|oublie|forget|disregard).{0,30}(instruction|consigne|rule|règle)|developer mode|mode développeur|how (do|can) i bypass|comment contourner", re.I)
OUT_OF_DOMAIN = re.compile(r"\b(clear(ing)? (the )?(fault )?codes?|effacer|efface|reset (the )?codes?|réinitialiser|à quelle fréquence|how often|torque|couple de serrage|couple|lug nut|écrou|huile|oil|lubricant|graisse|grease|capacity|capacité|pressure|pression|tire|pneu|pneus|brake pads?|plaquettes?|garnitures?|pushrod|course de tige|replace|remplacer|démonter|remove the|install the|téléphone|phone number|concessionnaire|dealer|price|prix|warranty|garantie|interval|intervalle|vidange)\b", re.I)

GENERIC = {"how","does","do","can","bus","autobus","the","what","where","when","replace","use","utiliser","quoi","comment","with","from","and","pour","une","des","est","quel","quelle","quels","sont","dans","this","that","your","you","answer","question","manual","manuel","page","general","knowledge"}

if __name__ == "__main__":
    e = Engine(load_pages())
    for q in sys.argv[1:]:
        a = e.answer(q); print("Q:", q); print(json.dumps({k: v for k, v in a.items() if k != 'hits'}, ensure_ascii=False, indent=1))
        for h in a.get('hits', [])[:3]: print("  ", h['pdf_page'], h['score'], h['chunk'][:90].replace("\n", " "))
