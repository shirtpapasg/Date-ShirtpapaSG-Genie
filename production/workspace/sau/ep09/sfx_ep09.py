"""ep09/sfx_ep09.py: the extra sounds EP09 (mosquitoes vs mosquitoes) needs. All synthesised with numpy, nothing copyrighted,
the same on every run. Written as sfx/ep09_<name>.wav, where build_tl.py looks; sfx_lib.py is not touched.
    /home/user/heart-tts/venv/bin/python ep09/sfx_ep09.py
  ep09_buzz 4.2 s   one mosquito whining round your ear: it comes close, goes away, comes closer
  ep09_slap 0.35 s  a hand slapping skin                ep09_zip 0.5 s    a mosquito darting off
  ep09_wings 6.0 s  our own wings, from inside (a soft, steady whine with a low flutter); loops
  ep09_swarm 3.0 s  a small cloud of mosquitoes flying out together
  ep09_tick 0.12 s  a soft clock tick (the days passing)   ep09_plink 0.25 s  a tiny egg touching water
"""
import numpy as np, wave, os
SR = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sfx")
def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / (1 + (lo / np.maximum(f, 1)) ** 6) / (1 + (f / hi) ** 6), len(x))
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def fade(y, a, b): t = np.arange(len(y)) / SR; d = len(y) / SR; return y * np.minimum(1, t / a) * np.minimum(1, (d - t) / b)
def put(buf, x, at): i = int(at * SR); n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n]
def whine(f, amp):
    """a mosquito's wing tone: a buzzy saw-like stack of harmonics on a pitch curve f (Hz per sample)"""
    ph = 2 * np.pi * np.cumsum(f) / SR
    return amp * sum(np.sin(k * ph) / k ** 1.15 for k in range(1, 9))
def buzz(rs):
    t = T(4.2); near = .18 + .82 * (.5 - .5 * np.cos(2 * np.pi * (t / 1.5) ** 1.15)) ** 1.6 * (.45 + .55 * t / 4.2)
    f = 560 + 70 * np.sin(2 * np.pi * .9 * t) + 22 * np.sin(2 * np.pi * 6.3 * t) + 60 * near
    return norm(fade(bp(whine(f, near), 380, 7000), .25, .03), .6)
def zipaway(rs):
    t = T(.5); return norm(fade(bp(whine(640 + 500 * t / .5, np.exp(-t / .16)), 400, 8000), .01, .1), .45)
def slap(rs):
    t = T(.35); y = bp(rs.standard_normal(len(t)), 700, 6500) * np.exp(-t / .018) + .8 * np.sin(2 * np.pi * (210 - 300 * t) * t) * np.exp(-t / .045)
    return norm(y + .25 * bp(rs.standard_normal(len(t)), 1500, 5000) * np.exp(-t / .09), .8)
def wings(rs):
    t = T(6.0); f = 430 + 14 * np.sin(2 * np.pi * .45 * t) + 7 * np.sin(2 * np.pi * 5.1 * t)
    y = bp(whine(f, .8 + .2 * np.sin(2 * np.pi * 1.3 * t)), 250, 3500) + .25 * np.sin(2 * np.pi * 215 * t)
    return norm(fade(y, .5, .6), .2)
def swarm(rs):
    t = T(3.0); y = np.zeros(len(t))
    for i in range(9):
        f0 = rs.uniform(470, 720); at = rs.uniform(0, .8); g = np.clip((t - at) / .3, 0, 1) * np.exp(-np.maximum(0, t - at - .8) / rs.uniform(.5, .9))
        y += whine(f0 + 40 * np.sin(2 * np.pi * rs.uniform(.6, 1.6) * t + i) + 90 * t / 3, g) * rs.uniform(.5, 1)
    return norm(fade(bp(y, 380, 7000), .1, .4), .42)
def tick(rs):
    t = T(.12); return norm(np.sin(2 * np.pi * 1500 * t) * np.exp(-t / .008) + .6 * np.sin(2 * np.pi * 380 * t) * np.exp(-t / .02), .4)
def plink(rs):
    t = T(.25); return norm(np.sin(2 * np.pi * (900 + 2600 * t) * t) * np.exp(-t / .05), .35)
ALL = dict(buzz=buzz, slap=slap, zip=zipaway, wings=wings, swarm=swarm, tick=tick, plink=plink)
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for i, (n, fn) in enumerate(ALL.items()):
        y = fn(np.random.default_rng(900 + i)); w = wave.open(os.path.join(OUT, f"ep09_{n}.wav"), "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()); w.close(); print("ep09_" + n, round(len(y) / SR, 2), "s")
