"""ep06/sfx_ep06.py: the extra sounds EP06 (digestion) needs. All synthesised with numpy, nothing copyrighted, the same on every run.
Written next to the shared library as sfx/ep06_<name>.wav, which is where build_tl.py looks; sfx_lib.py itself is not touched.
    /home/user/heart-tts/venv/bin/python ep06/sfx_ep06.py
  ep06_clink 0.3 s   a spoon touching a plate          ep06_chomp 0.4 s   teeth coming together: thump and crunch
  ep06_squish 0.8 s  one wet muscle squeeze            ep06_gurgle 2.6 s  a tummy gurgle: low bubbles
  ep06_slurp 0.9 s   water being drawn away            ep06_plop 0.5 s    plop into water
  ep06_flush 2.8 s   a toilet flush: rush, swirl, glug
"""
import numpy as np, wave, os
SR = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sfx")
def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 6) / (1 + (f / hi) ** 6); return np.fft.irfft(X * m, len(x))
def put(buf, x, at): i = int(at * SR); n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n]
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def sweep(f): return np.sin(2 * np.pi * np.cumsum(f) / SR)
def edges(x, d, a=.004, r=.03): t = T(d)[:len(x)]; return x * np.minimum(1, t / a) * np.minimum(1, np.maximum(0, d - t) / r)

def clink(rs):
    t = T(.3); y = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in ((2650, 1, .05), (4130, .6, .035), (6200, .3, .02)))
    return norm(y, .4)
def chomp(rs):
    t = T(.4); y = sweep(np.interp(t, [0, .1, .4], [150, 70, 55])) * np.exp(-t / .07)
    y += .45 * sweep(np.interp(t, [0, .1, .4], [300, 180, 150])) * np.exp(-t / .05)
    y += .7 * bp(rs.standard_normal(len(t)), 700, 5200) * (np.exp(-t / .018) + .5 * np.exp(-np.maximum(0, t - .06) / .03) * (t > .06))
    y += .4 * np.sin(2 * np.pi * 1900 * t) * np.exp(-t / .006)
    return norm(y, .7)
def squish(rs):
    t = T(.8); e = np.sin(np.pi * np.minimum(1, t / .7)) ** 2
    y = bp(rs.standard_normal(len(t)), 220, 1300) * e * (.6 + .4 * np.sin(2 * np.pi * (34 - 20 * t) * t))
    y = y / np.max(np.abs(y)) + .9 * sweep(np.interp(t, [0, .35, .8], [70, 130, 60])) * e
    y += .5 * sweep(np.interp(t, [0, .35, .8], [210, 390, 180])) * e
    return norm(y, .55)
def gurgle(rs):
    b = np.zeros(int(SR * 2.6))
    for k in range(16):
        d = rs.uniform(.07, .16); t = T(d); f0 = rs.uniform(150, 420)
        put(b, edges(sweep(np.linspace(f0, f0 * rs.uniform(1.3, 1.9), len(t))), d, .006, .04) * rs.uniform(.4, 1), rs.uniform(0, 2.3))
    t = T(2.6); b = b / np.max(np.abs(b)) + .5 * sweep(70 + 25 * np.sin(2 * np.pi * 1.7 * t)) * (.5 + .5 * np.sin(2 * np.pi * .8 * t)) ** 2
    return norm(edges(b, 2.6, .05, .4), .45)
def slurp(rs):
    t = T(.9); e = np.minimum(1, t / .1) * np.minimum(1, (.9 - t) / .12)
    y = bp(rs.standard_normal(len(t)), 500, 3000) * e * (.5 + .5 * np.sin(2 * np.pi * 26 * t)); y = y / np.max(np.abs(y)) * .6
    y += sweep(np.interp(t, [0, .9], [260, 760])) * e * .5 + .3 * sweep(np.interp(t, [0, .9], [520, 1500])) * e
    return norm(y, .4)
def plop(rs):
    t = T(.5); y = sweep(np.interp(t, [0, .03, .13, .5], [420, 230, 760, 900])) * np.minimum(1, t / .004) * np.exp(-t / .07)
    y += .5 * sweep(np.interp(t, [0, .5], [110, 70])) * np.exp(-t / .06)
    y += .35 * bp(rs.standard_normal(len(t)), 1500, 7000) * np.exp(-np.maximum(0, t - .05) / .08) * (t > .05)
    return norm(y, .7)
def flush(rs):
    d = 2.8; t = T(d); e = np.minimum(1, t / .12) * np.interp(t, [0, 1.3, 2.3, d], [1, .9, .35, 0])
    y = bp(rs.standard_normal(len(t)), 250, 5000) * e * (.7 + .3 * np.sin(2 * np.pi * np.cumsum(np.interp(t, [0, d], [11, 4])) / SR))
    y = y / np.max(np.abs(y)); y += .35 * bp(rs.standard_normal(len(t)), 90, 400) * e / .3 * .3
    b = np.zeros(len(t))
    for k, at in enumerate((1.75, 1.98, 2.18, 2.36, 2.5)):
        tt = T(.2); put(b, edges(sweep(np.linspace(330 - 30 * k, 150 - 12 * k, len(tt))), .2, .01, .08), at)
    return norm(y + .9 * b, .6)

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for i, (name, fn) in enumerate((("clink", clink), ("chomp", chomp), ("squish", squish), ("gurgle", gurgle), ("slurp", slurp), ("plop", plop), ("flush", flush))):
        y = fn(np.random.default_rng(600 + i)); p = os.path.join(OUT, f"ep06_{name}.wav")
        with wave.open(p, "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype("<i2").tobytes())
        print("wrote", p, round(len(y) / SR, 2), "s")
