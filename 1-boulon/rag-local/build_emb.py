import os, time, sys
from rag import Engine, load_pages
from eval_blind import CFG
HERE = os.path.dirname(os.path.abspath(__file__))
for emb in sys.argv[1:]:
    t0 = time.time(); p = os.path.join(HERE, f"emb-{emb}.npy")
    if os.path.exists(p): os.remove(p)
    e = Engine(load_pages(), *CFG[emb], cache=p)
    print(emb, "chunks", len(e.chunks), "secs", round(time.time() - t0), flush=True)
