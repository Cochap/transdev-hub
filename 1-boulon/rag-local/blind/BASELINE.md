# Blind baseline (run once, untuned, 2026-11-05)
Engine: BM25 + connector/fuse/relay routes + OOD gate.
ALL 24/45 = 53%. dev(odd ids)=13/23, test(even ids)=11/22.
Rule from here: tune only on odd ids; even ids are held out and reported once at the end.
