"""ep07/sfx_ep07.py: the extra sounds EP07 needs (an oxygen molecule's journey). All synthesised here with numpy, nothing copyrighted,
the same on every run. Written next to the shared library as sfx/ep07_<name>.wav, where build_tl.py looks; sfx_lib.py is not touched.
    /home/user/heart-tts/venv/bin/python ep07/sfx_ep07.py          (run once before build_tl.py on a fresh checkout)
  ep07_whistle 0.6 s  a PE teacher's whistle            ep07_run 2.9 s      fast steps on grass, slowing to a stop
  ep07_pant 1.3 s     two quick breaths in and out      ep07_heart 0.5 s    one heartbeat: ba-dum
  ep07_sniff 1.1 s    a breath in through the nose      ep07_exhale 1.4 s   a breath out: whoosh
  ep07_squish 0.5 s   squeezing through a thin wall     ep07_flow 5.0 s     blood rushing along, with a soft pulse
  ep07_birds 5.0 s    a school field: a few birds       ep07_twitch 0.6 s   a springy muscle twitch
"""
import numpy as np, wave, os
SR = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sfx")
def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 6) / (1 + (f / hi) ** 6); return np.fft.irfft(X * m, len(x))
def put(buf, x, at):
    i = int(at * SR); n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n]
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def env(t, a, d): return np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / d)
def thump(f0, d, dec):
    t = T(d); f = f0 * (1 + 1.2 * np.exp(-t * 40)); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * dec)
def heart(rs):
    b = np.zeros(int(SR * .5)); lub = thump(58, .22, 16) + .5 * thump(116, .22, 22) + .25 * thump(230, .22, 40); dub = thump(74, .2, 20) + .5 * thump(150, .2, 26) + .25 * thump(290, .2, 46)
    put(b, lub, 0); put(b, .75 * dub, .16); return norm(b, .8)
def whistle(rs):
    t = T(.6); tr = 1 + .25 * np.sin(2 * np.pi * 38 * t); y = np.sin(2 * np.pi * 2850 * t + 1.2 * np.sin(2 * np.pi * 38 * t)) * tr + .3 * np.sin(2 * np.pi * 5700 * t)
    y += .25 * bp(rs.standard_normal(len(t)), 2000, 6000); return norm(y * np.minimum(1, t / .02) * np.minimum(1, (.6 - t) / .08), .4)
def run(rs):
    b = np.zeros(int(SR * 2.9)); at = 0.05; gap = .2
    for i in range(13):
        t = T(.16); y = thump(95, .16, 30) * .8 + bp(rs.standard_normal(len(t)), 900, 5000) * np.exp(-t * 45) * .7
        put(b, y * (1 if i % 2 else .85), at); at += gap
        if i >= 9: gap *= 1.35
    return norm(b, .5)
def breathn(rs, d, lo, hi, up):
    t = T(d); n = rs.standard_normal(len(t)); k = t / d; c = lo + (hi - lo) * (k if up else 1 - k)
    y = np.zeros(len(t)); step = 2048
    for i in range(0, len(t), step):
        seg = n[i:i + step * 2]; cc = c[min(i + step, len(t) - 1)]
        w = bp(seg, cc * .6, cc * 1.5) * np.hanning(len(seg)); y[i:i + len(seg)] += w[:len(y) - i]
    return y * np.sin(np.pi * k) ** .8
def pant(rs):
    b = np.zeros(int(SR * 1.3))
    for at, up in ((0, True), (.33, False), (.66, True), (.98, False)): put(b, breathn(rs, .3, 700, 1900, up) * (.8 if up else 1), at)
    return norm(b, .42)
def sniff(rs): return norm(breathn(rs, 1.1, 500, 2600, True), .45)
def exhale(rs): return norm(breathn(rs, 1.4, 400, 2200, False) + .4 * breathn(rs, 1.4, 150, 500, False), .5)
def squish(rs):
    t = T(.5); f = 240 + 520 * np.sin(np.pi * t / .5) ** 2; y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .5) ** 2
    return norm(y + .5 * bp(rs.standard_normal(len(t)), 500, 2500) * np.sin(np.pi * t / .5) ** 2, .45)
def flow(rs):
    t = T(5.0); n = rs.standard_normal(len(t)); pulse = .6 + .4 * np.sin(2 * np.pi * 1.6 * t) ** 2
    y = (bp(n, 120, 700) * 1.0 + bp(n, 700, 2600) * .35) * pulse; return norm(y * np.minimum(1, t / .5) * np.minimum(1, (5 - t) / .8), .22)
def birds(rs):
    b = np.zeros(int(SR * 5.0))
    for at, f0 in ((.3, 3200), (.55, 3600), (1.7, 2700), (1.95, 3000), (2.2, 2700), (3.4, 3900), (3.6, 3500), (4.4, 3000)):
        t = T(.14); f = f0 * (1 + .18 * np.sin(2 * np.pi * 9 * t + rs.random())); put(b, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .14) ** 2, at)
    b += .12 * bp(rs.standard_normal(len(b)), 300, 1500) * (.7 + .3 * np.sin(2 * np.pi * .3 * T(5.0)))
    return norm(b * np.minimum(1, T(5.0) / .3) * np.minimum(1, (5 - T(5.0)) / .8), .16)
def twitch(rs):
    t = T(.6); f = 140 + 260 * np.exp(-t * 9); return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * (1 + .5 * np.sin(2 * np.pi * 28 * t)), .5)
SOUNDS = dict(heart=heart, whistle=whistle, run=run, pant=pant, sniff=sniff, exhale=exhale, squish=squish, flow=flow, birds=birds, twitch=twitch)
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in SOUNDS.items():
        rs = np.random.default_rng(sum(map(ord, name)) + 7); y = np.clip(fn(rs), -1, 1)
        with wave.open(os.path.join(OUT, f"ep07_{name}.wav"), "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes())
        print(f"ep07_{name}.wav {len(y) / SR:.2f} s")
