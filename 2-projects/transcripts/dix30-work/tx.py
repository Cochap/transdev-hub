import sys, time
from faster_whisper import WhisperModel
model_dir, out_dir, threads = sys.argv[1], sys.argv[2], int(sys.argv[3])
chunks = sys.argv[4:]
m = WhisperModel(model_dir, device="cpu", compute_type="int8", cpu_threads=threads)
for c in chunks:
    idx = int(c[-6:-4]); off = idx * 600
    name = f"{out_dir}/c{idx:02d}.tsv"
    t0 = time.time()
    import wave, numpy as np
    w=wave.open(c,'rb'); a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768.0; w.close()
    segs, info = m.transcribe(a, language="fr", beam_size=1, vad_filter=True,
        condition_on_previous_text=False,
        initial_prompt="Réunion Transdev, Quartier DIX30.")
    with open(name + ".part", "w", encoding="utf-8") as f:
        for s in segs:
            f.write(f"{s.start+off:.1f}\t{s.end+off:.1f}\t{s.text.strip()}\n"); f.flush()
    import os; os.replace(name + ".part", name)
    print(f"done c{idx:02d} in {time.time()-t0:.0f}s", flush=True)
