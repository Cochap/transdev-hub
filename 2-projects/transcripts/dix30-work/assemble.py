import glob, os, sys
out_dir, dest = sys.argv[1], sys.argv[2]
rows = []
for f in sorted(glob.glob(os.path.join(out_dir, "c*.tsv*"))):
    with open(f, encoding="utf-8") as fh:
        for line in fh:
            p = line.rstrip("\n").split("\t")
            if len(p) == 3 and p[2].strip():
                rows.append((float(p[0]), float(p[1]), p[2].strip()))
rows.sort()
def ts(s):
    s = int(s); return f"{s//3600:01d}:{s%3600//60:02d}:{s%60:02d}"
def srt(s):
    ms = int(round(s*1000)); return f"{ms//3600000:02d}:{ms%3600000//60000:02d}:{ms%60000//1000:02d},{ms%1000:03d}"
base = os.path.join(dest, "Quartier DIX30 2")
with open(base + ".txt", "w", encoding="utf-8") as t:
    t.write("# Transcription — réunion Quartier DIX30, 2026-11-03 (76 min)\n")
    t.write("# Source : C:\\Users\\rilg01\\Downloads\\Quartier DIX30 2.m4a\n")
    t.write("# Outil : faster-whisper large-v3-turbo (int8, CPU), français, transcrit le 2026-11-05. Brut, non relu : noms propres et termes techniques à vérifier.\n\n")
    for a, b, x in rows:
        t.write(f"[{ts(a)}] {x}\n")
with open(base + ".srt", "w", encoding="utf-8") as s:
    for i, (a, b, x) in enumerate(rows, 1):
        s.write(f"{i}\n{srt(a)} --> {srt(b)}\n{x}\n\n")
print(len(rows), "segments; last at", ts(rows[-1][1]) if rows else "-")
final = sorted(os.path.basename(f) for f in glob.glob(os.path.join(out_dir, "c*.tsv")))
print("final chunks:", len(final), final)
print("partial chunks:", [os.path.basename(f) for f in glob.glob(os.path.join(out_dir, "c*.part"))])
prev = 0.0
for a, b, x in rows:
    if a - prev > 20: print(f"GAP {ts(prev)} -> {ts(a)} ({a-prev:.0f}s)")
    if b - a > 15 and len(x.split()) < (b - a) * 1.2: print(f"THIN {ts(a)}-{ts(b)} ({b-a:.0f}s, {len(x.split())} words): {x[:60]}")
    prev = b
