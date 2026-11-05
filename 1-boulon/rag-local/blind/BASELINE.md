# Blind baseline (run once, untuned, 2026-11-05)
Engine: BM25 + connector/fuse/relay routes + OOD gate.
ALL 24/45 = 53%. dev(odd ids)=13/23, test(even ids)=11/22.
Rule from here: tune only on odd ids; even ids are held out and reported once at the end.

## Final (2026-11-05, end of day)
- Dev (odd ids, tuned on): 21/23 = 91% (baseline 13/23).
- **Held-out (even ids): 17/22 = 77%** (baseline 11/22 = 50%). Caveat: B44 (refuse) was seen while debugging the ohms gate.
- Held-out misses: B14, B20 (FR diagram questions: wire by function, termination resistor value), B22, B26, B28 (table rows found only by function name, no connector number in the question).
- Embedding comparison: MiniLM dense 44%, hybrid 78% vs BM25+routes 82% (same stage). e5-large: 4.4 s/chunk on this CPU (~6 h full index) -> deferred to GB10 / Azure.
