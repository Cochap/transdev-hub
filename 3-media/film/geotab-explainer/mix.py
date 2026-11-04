"""Synth music bed + SFX on events.json, music ducked 10.5 dB under the voice, mix to -14 LUFS, mux with film-silent.mp4."""
import numpy as np, soundfile as sf, librosa, pyloudnorm as pyln, json, os, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); SR = 48000
vo, _ = librosa.load(os.path.join(HERE, 'audio', 'vo.wav'), sr=SR)
ev = json.load(open(os.path.join(HERE, 'events.json')))
END = max(len(vo) / SR + 1.3, ev[-1]['t'] + 1.5); N = int(END * SR)
rng = np.random.default_rng(7); T = lambda d: np.arange(int(d * SR)) / SR
env = lambda d, a, r: np.minimum(1, T(d) / a) * np.exp(-T(d) / r)

# ---- music: light, curious documentary bed (pluck arpeggio + soft pad + brushed tick), 104 BPM, Dmaj-Bm-G-A
bpm = 104; beat = 60 / bpm; mus = np.zeros(N)
chords = [[62, 66, 69, 74], [59, 62, 66, 71], [55, 59, 62, 67], [57, 61, 64, 69]]
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
def pluck(f, d=.5):
    t = T(d); return (np.sin(2 * np.pi * f * t) + .35 * np.sin(4 * np.pi * f * t) + .12 * np.sin(6 * np.pi * f * t)) * np.exp(-t * 7)
pattern = [0, 2, 1, 3, 2, 1, 3, 2]
for bar in range(int(END / (4 * beat)) + 1):
    ch = chords[bar % 4]
    for i, k in enumerate(pattern):
        s = int((bar * 4 + i * .5) * beat * SR); n = pluck(hz(ch[k] + 12)) * .22
        if s < N: mus[s:s + len(n)] += n[:N - s]
    s = int(bar * 4 * beat * SR); d = 4 * beat; t = T(d)
    pad = sum(np.sin(2 * np.pi * hz(m) * t) for m in ch[:3]) * np.minimum(1, t / .6) * np.minimum(1, (d - t) / .6) * .05
    b = np.sin(2 * np.pi * hz(ch[0] - 24) * t) * np.exp(-t * 1.2) * .25
    if s < N: e = min(N, s + len(t)); mus[s:e] += (pad + b)[:e - s]
    for q in range(8):
        s2 = int((bar * 4 + q * .5 + .25) * beat * SR); h = rng.normal(0, 1, int(.05 * SR)) * np.exp(-T(.05) * 90) * .03
        if s2 < N: mus[s2:s2 + len(h)] += h[:N - s2]

# ---- duck: music sits 10.5 dB under the voice inside every phrase
hop = 1024; vr = librosa.feature.rms(y=np.pad(vo, (0, max(0, N - len(vo))))[:N], frame_length=4096, hop_length=hop)[0]
mr = librosa.feature.rms(y=mus, frame_length=4096, hop_length=hop)[0] + 1e-6
speaking = vr > np.percentile(vr, 40)
vl = np.median(vr[speaking]); target = np.where(speaking, vl * 10 ** (-10.5 / 20), vl * 10 ** (-7 / 20))
g = target / np.median(mr); g = np.convolve(g, np.ones(9) / 9, 'same')
mus *= np.interp(np.arange(N), np.arange(len(g)) * hop, g)
fade = np.ones(N); fl = int(1.2 * SR); fade[-fl:] = np.linspace(1, 0, fl); mus *= fade

# ---- SFX
def sfx(kind):
    if kind == 'pop': t = T(.09); return np.sin(2 * np.pi * (900 - 5000 * t) * t) * np.exp(-t * 45) * .5
    if kind == 'tick': t = T(.025); return rng.normal(0, 1, len(t)) * np.exp(-t * 300) * .25 + np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 250) * .15
    if kind == 'whoosh':
        t = T(.4); n = rng.normal(0, 1, len(t)); n = np.convolve(n, np.ones(12) / 12, 'same'); return n * np.sin(np.pi * t / .4) ** 2 * .35
    if kind == 'drop': t = T(.3); return np.sin(2 * np.pi * (500 - 1100 * t) * t) * env(.3, .005, .08) * .45
    if kind == 'hit': t = T(.35); return (np.sin(2 * np.pi * 70 * t) * .8 + rng.normal(0, 1, len(t)) * np.exp(-t * 40) * .4) * env(.35, .002, .12) * .6
    if kind == 'ding': t = T(1.0); return (np.sin(2 * np.pi * 1318 * t) + .4 * np.sin(2 * np.pi * 2637 * t)) * env(1.0, .003, .35) * .25
fx = np.zeros(N)
def place(t, x):
    s = int(t * SR)
    if 0 <= s < N: fx[s:s + len(x)] += x[:N - s]
for e in ev:
    if e['type'] == 'type':
        for k in range(14): place(e['t'] + k / 30, sfx('tick') * (.7 + .3 * rng.random()))
    else: place(e['t'], sfx(e['type']))

mix = np.pad(vo, (0, N - len(vo))) + mus + fx * .55
meter = pyln.Meter(SR)
for _ in range(4):  # normalise, then soft-limit peaks (tanh above -1.5 dBFS), repeat until it lands on -14
    mix = pyln.normalize.loudness(mix, meter.integrated_loudness(mix), -14.0)
    c = .84; mix = np.where(np.abs(mix) > c, np.sign(mix) * (c + (1 - c) * np.tanh((np.abs(mix) - c) / (1 - c))), mix)
print('LUFS', round(meter.integrated_loudness(mix), 2), 'peak', round(float(np.max(np.abs(mix))), 3), 'dur', round(N / SR, 2))
sf.write(os.path.join(HERE, 'audio', 'mix.wav'), mix, SR)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(HERE, 'film-silent.mp4'), '-i', os.path.join(HERE, 'audio', 'mix.wav'),
                '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-shortest', os.path.join(HERE, 'geotab-explainer-v1.mp4')], check=True)
print('wrote geotab-explainer-v1.mp4')
