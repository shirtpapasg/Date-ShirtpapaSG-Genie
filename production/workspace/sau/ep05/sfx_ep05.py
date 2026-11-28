"""ep05/sfx_ep05.py: the extra sounds EP05 needs (a school bell, children playing, a hen, a frying egg, a heartbeat...).
All synthesised here with numpy, nothing copyrighted, the same on every run. They are written next to the shared library as
sfx/ep05_<name>.wav, which is where build_tl.py looks; sfx_lib.py itself is not touched.
    /home/user/heart-tts/venv/bin/python ep05/sfx_ep05.py          (run once before build_tl.py on a fresh checkout)
  ep05_bell 1.9 s   an electric school bell         ep05_kids 4.6 s   children bursting out to play: whoops and chatter
  ep05_laugh 1.1 s  a child's laugh (ha-ha-ha-ha)   ep05_run 1.9 s    quick running steps outdoors
  ep05_cluck 1.0 s  a hen: bok, bok, b'gawk         ep05_peck 0.2 s   a beak hitting the feed trough
  ep05_gulp 0.45 s  a swallow                       ep05_crack 0.3 s  an egg cracking
  ep05_sizzle 2.6 s an egg frying                   ep05_munch 1.0 s  three chews
  ep05_heart 3.0 s  a heartbeat, four lub-dubs      ep05_horn 1.8 s   a ship's horn
  ep05_leaf 1.2 s   a soft, wet "bloop" through the leaf's skin
"""
import numpy as np, wave, os, sys
SR = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sfx")
def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 6) / (1 + (f / hi) ** 6); return np.fft.irfft(X * m, len(x))
def noise(n, rs): return rs.standard_normal(n)
def env(t, a, d): return np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / d)
def put(buf, x, at): i = int(at * SR); n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n]
def voice(f0s, d, rs, formants=((800, 1), (1300, .7), (2900, .35)), breath=.08):
    """a vowel-like sound: a pulse wave following the pitch curve f0s (list of Hz), shaped by formants"""
    t = T(d); f = np.interp(t, np.linspace(0, d, len(f0s)), f0s) * (1 + .012 * np.sin(2 * np.pi * 6 * t))
    ph = 2 * np.pi * np.cumsum(f) / SR; src = sum(np.sin(k * ph) / k ** .8 for k in range(1, 14)) + breath * 6 * noise(len(t), rs)
    y = sum(g * bp(src, c * .82, c * 1.2) for c, g in formants)
    return y * np.minimum(1, t / .025) * np.minimum(1, (d - t) / .05)
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def bell(rs):
    t = T(1.9); strike = (np.sin(2 * np.pi * 27 * t) > .2).astype(float); strike = np.convolve(strike, np.ones(40) / 40, "same")
    y = sum(a * np.sin(2 * np.pi * f * t + p) for f, a, p in ((1480, .5, 0), (2090, 1, 1), (2960, .8, 2), (3830, .5, .5), (5210, .3, 1.3), (640, .25, 0)))
    y = y * (.35 + .65 * strike) + .25 * bp(noise(len(t), rs), 2500, 7000) * strike
    return norm(y * np.minimum(1, t / .01) * np.minimum(1, (1.9 - t) / .25), .5)
def kids(rs):
    b = np.zeros(int(SR * 4.6))
    for i in range(26):
        at = rs.uniform(0, 3.9) * (.35 + .65 * rs.uniform()) + .05 * i; d = rs.uniform(.18, .55); f0 = rs.uniform(380, 640)
        shape = [(1, 1.35, 1.1), (1, 1.5, 1.45), (1.2, 1, .8), (1, 1.25, 1.25, 1)][rs.integers(4)]
        fm = [((850, 1), (1500, .7), (3100, .4)), ((420, 1), (2400, .7), (3300, .4)), ((600, 1), (1100, .8), (2900, .3))][rs.integers(3)]
        put(b, voice([f0 * k for k in shape], d, rs, fm) * rs.uniform(.25, 1), min(at, 4.0))
    for at in (1.1, 2.0, 2.9):                                           # a few giggles in the crowd
        for k in range(4): put(b, voice([rs.uniform(520, 600) * (1 - .05 * k)] * 2, .09, rs, ((900, 1), (1600, .8), (3000, .5)), .2) * .5, at + k * .15)
    t = T(4.6); b += .05 * np.max(np.abs(b)) * bp(noise(len(t), rs), 500, 2500) * (.6 + .4 * np.sin(2 * np.pi * 3.1 * t))
    return norm(b * np.minimum(1, t / .5) * np.minimum(1, (4.6 - t) / .9), .42)
def laugh(rs):
    b = np.zeros(int(SR * 1.1))
    for k in range(6): put(b, voice([560 * (1 - .06 * k), 500 * (1 - .06 * k)], .1, rs, ((950, 1), (1700, .8), (3100, .5)), .25) * (1 - .1 * k), .03 + k * .165)
    return norm(b, .5)
def run(rs):
    b = np.zeros(int(SR * 1.9))
    for k in range(8):
        t = T(.16); y = np.sin(2 * np.pi * (150 - 300 * t) * t) * np.exp(-t / .03) + .5 * bp(noise(len(t), rs), 700, 3500) * np.exp(-t / .015)
        put(b, y * (.8 + .2 * (k % 2)), .02 + k * .23)
    return norm(b, .42)
def cluck(rs):
    b = np.zeros(int(SR * 1.0))
    for at, d, f0 in ((0, .09, (420, 520)), (.2, .09, (430, 540)), (.42, .1, (440, 560)), (.58, .36, (520, 820, 610))):
        put(b, voice(list(f0), d, rs, ((1100, 1), (1900, .9), (3200, .5)), .12), at)
    return norm(b, .5)
def peck(rs):
    t = T(.2); y = np.sin(2 * np.pi * 900 * t) * np.exp(-t / .012) + .7 * np.sin(2 * np.pi * 320 * t) * np.exp(-t / .03) + .5 * bp(noise(len(t), rs), 1500, 6000) * np.exp(-t / .006)
    return norm(y, .6)
def gulp(rs):
    t = T(.45); f = np.interp(t, [0, .14, .2, .45], [330, 170, 150, 520]); y = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(t, .02, .16)
    y += .5 * np.sin(4 * np.pi * np.cumsum(f) / SR) * env(t, .02, .1); return norm(y, .55)
def crack(rs):
    t = T(.3); y = bp(noise(len(t), rs), 1800, 9000) * (np.exp(-t / .008) + .6 * np.exp(-np.maximum(0, t - .07) / .02) * (t > .07) + .35 * np.exp(-np.maximum(0, t - .13) / .03) * (t > .13))
    y += .5 * np.sin(2 * np.pi * 1300 * t) * np.exp(-t / .01); return norm(y, .6)
def sizzle(rs):
    t = T(2.6); y = bp(noise(len(t), rs), 3500, 12000) * (.55 + .45 * np.abs(bp(noise(len(t), rs), 4, 30)) * 6)
    pops = np.zeros(len(t))
    for _ in range(46):
        tt = T(.03); put(pops, np.sin(2 * np.pi * rs.uniform(1500, 4500) * tt) * np.exp(-tt / .004) * rs.uniform(.3, 1), rs.uniform(.05, 2.4))
    y = norm(y, 1) * .6 + pops * .8; return norm(y * np.minimum(1, t / .08) * np.minimum(1, (2.6 - t) / .7), .4)
def munch(rs):
    b = np.zeros(int(SR * 1.0))
    for k in range(3):
        t = T(.2); y = bp(noise(len(t), rs), 350, 2600) * env(t, .012, .05) * (.6 + .4 * np.sign(np.sin(2 * np.pi * 55 * t)))
        y += .6 * np.sin(2 * np.pi * (190 - 250 * t) * t) * np.exp(-t / .05); put(b, y, .03 + k * .3)
    return norm(b, .55)
def heart(rs):
    b = np.zeros(int(SR * 3.0))
    for k in range(4):
        for at, f, g in ((0, 62, 1), (.2, 82, .7)):
            t = T(.22); y = np.sin(2 * np.pi * f * t) * env(t, .012, .06) + .55 * np.sin(2 * np.pi * f * 3 * t) * env(t, .008, .035) + .3 * bp(noise(len(t), rs), 150, 500) * env(t, .005, .02)
            put(b, y * g, .05 + k * .72 + at)
    return norm(b, .6)
def horn(rs):
    t = T(1.8); y = sum(np.sin(2 * np.pi * f * k * t * (1 + .002 * np.sin(2 * np.pi * 5 * t))) / k for f in (116, 147) for k in range(1, 9))
    return norm(bp(y, 100, 1800) * np.minimum(1, t / .12) * np.minimum(1, (1.8 - t) / .5), .42)
def leaf(rs):
    t = T(1.2); f = np.interp(t, [0, .5, 1.2], [520, 180, 320]); y = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(t, .08, .35)
    y += .35 * bp(noise(len(t), rs), 300, 1500) * env(t, .2, .3)
    for at in (.55, .7, .82): tt = T(.12); put(y, .5 * np.sin(2 * np.pi * (600 + 2400 * tt) * tt) * np.exp(-tt / .03), at)
    return norm(y, .45)
ALL = dict(bell=bell, kids=kids, laugh=laugh, run=run, cluck=cluck, peck=peck, gulp=gulp, crack=crack, sizzle=sizzle, munch=munch, heart=heart, horn=horn, leaf=leaf)
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in ALL.items():
        if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
        y = fn(np.random.default_rng(abs(hash(name)) % 1000 if False else sum(map(ord, name))))
        w = wave.open(os.path.join(OUT, f"ep05_{name}.wav"), "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype("<i2").tobytes()); w.close(); print(f"ep05_{name}: {len(y) / SR:.2f} s, peak {np.max(np.abs(y)):.2f}")
