"""Export enriched knowledge for Copilot Studio / Azure AI Search.
1) IC-enriched.pdf : page N = structured text of original page N (tables as rows, relay map, components, wires,
   legends), so page-level citations in Copilot Studio point at the same page as the real manual.
2) chunks.jsonl   : search-ready records (id, pdf_page, printed_page, section, title, kind, content) for Azure AI Search.
"""
import json, os, re, pymupdf
from rag import load_pages, chunks_from_page, MANUAL
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, "export"); os.makedirs(OUT, exist_ok=True)
P = load_pages()
doc = pymupdf.open()
with open(os.path.join(OUT, "chunks.jsonl"), "w", encoding="utf-8") as cj:
    for r in P:
        parts = [f"{MANUAL}", f"PDF page {r['pdf_page']} | printed page {r['printed_page']} | section {r['section']}", r['title'], r['figure'], ""]
        for kind, txt in chunks_from_page(r):
            if kind == "layout": continue
            parts.append(txt.split("\n", 1)[1] if "\n" in txt else txt); parts.append("")
            cj.write(json.dumps(dict(id=f"ic-p{r['pdf_page']}-{kind}-{len(parts)}", pdf_page=r['pdf_page'], printed_page=r['printed_page'],
                                     section=r['section'], title=r['title'], kind=kind, content=txt), ensure_ascii=False) + "\n")
        text = "\n".join(parts)
        if len(text) < 400 and r.get('layout'): text += "\n" + r['layout'][:3000]
        page = doc.new_page(width=612, height=792)
        fs = 7.5
        while fs >= 4 and page.insert_textbox(pymupdf.Rect(28, 28, 584, 770), text, fontsize=fs, fontname="cour") < 0:
            fs -= 0.5
        if fs < 4:
            page.insert_textbox(pymupdf.Rect(28, 28, 584, 770), text[:9000], fontsize=4, fontname="cour")
doc.set_metadata({"title": "IC BE/CE Circuit Diagram Manual - enriched text companion (BOULON)", "author": "BOULON pipeline"})
doc.save(os.path.join(OUT, "IC-enriched.pdf"), deflate=True, garbage=3)
print("pages", doc.page_count, "MB", round(os.path.getsize(os.path.join(OUT, "IC-enriched.pdf")) / 1e6, 1))
