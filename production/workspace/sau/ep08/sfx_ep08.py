"""ep08/sfx_ep08.py: the extra sounds EP08 (the crocodile's food chain, Sungei Buloh) needs. All synthesised with numpy, nothing
copyrighted, the same on every run. Written as sfx/ep08_<name>.wav, where build_tl.py looks; sfx_lib.py is not touched.
    /home/user/heart-tts/venv/bin/python ep08/sfx_ep08.py
  ep08_birds 5.6 s   dawn chorus in the mangroves      ep08_lap 3.0 s     small waves lapping on mud
  ep08_rewind 1.0 s  a tape spinning backwards         ep08_ff 1.3 s      a tape fast-forwarding, ending in a click
  ep08_snap 0.6 s    jaws snapping shut                ep08_hop 0.3 s     a wet slap: a mudskipper landing on mud
  ep08_scuttle 1.3 s quick crab feet on roots          ep08_nibble 0.7 s  two small crunchy bites of a leaf
  ep08_glide 3.0 s   slow water sliding past a big body
"""
import numpy as np, wave, os, sys
SR = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sfx")
def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 6) / (1 + (f / hi) ** 6); return np.fft.irfft(X * m, len(x))
def put(buf, x, at): i = int(at * SR); n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n]
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def fade(y, a, b): t = np.arange(len(y)) / SR; d = len(y) / SR; return y * np.minimum(1, t / a) * np.minimum(1, (d - t) / b)
def chirp(f0, f1, d, bend=1.0):
    t = T(d); f = f0 + (f1 - f0) * (t / d) ** bend; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 1.5
def birds(rs):
    b = np.zeros(int(SR * 5.6))
    for i in range(34):                                   # several birds, each with its own little phrase
        at = rs.uniform(.1, 5.0); kind = rs.integers(3); g = rs.uniform(.25, 1)
        if kind == 0:
            for k in range(rs.integers(2, 5)): put(b, g * chirp(rs.uniform(2600, 3400), rs.uniform(3800, 4800), .07), at + k * .11)
        elif kind == 1:
            for k in range(3): put(b, g * chirp(4200 - 300 * k, 2600 - 200 * k, .12, .6), at + k * .17)
        else:
            t = T(.35); put(b, g * .8 * np.sin(2 * np.pi * (3100 * t + 40 * np.sin(2 * np.pi * 28 * t))) * np.sin(np.pi * t / .35), at)
    for at in (.9, 3.4):                                  # a koel-like rising call, far away
        for k in range(3): put(b, .5 * chirp(900 + 120 * k, 1500 + 150 * k, .28, 1.6), at + k * .36)
    t = T(5.6); b += .02 * bp(rs.standard_normal(len(t)), 2000, 9000)
    return norm(fade(b, .6, 1.0), .34)
def lap(rs):
    t = T(3.0); n = bp(rs.standard_normal(len(t)), 250, 2400)
    sw = (.5 + .5 * np.sin(2 * np.pi * .9 * t - 1.2)) ** 3 + .5 * (.5 + .5 * np.sin(2 * np.pi * 1.7 * t)) ** 4
    y = n * sw
    for at in rs.uniform(.2, 2.6, 9): tt = T(.09); put(y, 2.2 * np.sin(2 * np.pi * (500 + 2500 * tt) * tt) * np.exp(-tt / .02), at)
    return norm(fade(y, .4, .7), .3)
def glide(rs):
    t = T(3.0); n = bp(rs.standard_normal(len(t)), 120, 900) * (.6 + .4 * np.sin(2 * np.pi * .7 * t))
    y = n + .5 * np.sin(2 * np.pi * 58 * t) * (.5 + .5 * np.sin(2 * np.pi * .5 * t))
    for at in rs.uniform(.2, 2.6, 7): tt = T(.12); put(y, 1.2 * np.sin(2 * np.pi * (300 + 1600 * tt) * tt) * np.exp(-tt / .03), at)
    return norm(fade(y, .7, .8), .3)
def tape(rs, d, f0, f1, click):
    t = T(d); k = t / d; f = f0 * (f1 / f0) ** k                       # the squeal of the tape racing over the head
    ph = 2 * np.pi * np.cumsum(f) / SR; y = np.sign(np.sin(ph)) * .25 + np.sin(ph * 1.5) * .3
    chat = .5 + .5 * np.sign(np.sin(2 * np.pi * np.cumsum(18 + 50 * k) / SR))   # the chatter, speeding up
    y = bp(y, 500, 6000) * (.45 + .55 * chat) + .5 * bp(rs.standard_normal(len(t)), 1500, 8000) * (.3 + .7 * k)
    y += .5 * np.sin(2 * np.pi * np.cumsum(90 + 260 * k) / SR)          # the motor (so a phone speaker still hears body)
    y = fade(y, .04, .03)
    if click: tt = T(.08); put(y, 3 * (np.sin(2 * np.pi * 1900 * tt) * np.exp(-tt / .006) + np.sin(2 * np.pi * 240 * tt) * np.exp(-tt / .02)), d - .09)
    return norm(y, .5)
def rewind(rs): return tape(rs, 1.0, 700, 2600, True)
def ff(rs): return tape(rs, 1.3, 1100, 3600, True)
def snap(rs):
    t = T(.6); y = bp(rs.standard_normal(len(t)), 900, 7000) * np.exp(-t / .012)                 # the clack of teeth
    y += 1.2 * np.sin(2 * np.pi * (170 - 160 * t) * t) * np.exp(-t / .07)                          # the thump of the jaws
    y += .5 * bp(rs.standard_normal(len(t)), 300, 1500) * np.exp(-t / .12) * (t > .02)              # water thrown up
    return norm(y, .72)
def hop(rs):
    t = T(.3); y = bp(rs.standard_normal(len(t)), 400, 3000) * np.exp(-t / .025) + .9 * np.sin(2 * np.pi * (260 - 420 * t) * t) * np.exp(-t / .04)
    tt = T(.1); put(y, .5 * np.sin(2 * np.pi * (500 + 2600 * tt) * tt) * np.exp(-tt / .025), .09)
    return norm(y, .5)
def scuttle(rs):
    b = np.zeros(int(SR * 1.3))
    for k in range(22):
        tt = T(.04); put(b, (np.sin(2 * np.pi * rs.uniform(1700, 2600) * tt) + .6 * bp(rs.standard_normal(len(tt)), 1500, 7000)) * np.exp(-tt / .007) * rs.uniform(.5, 1), .02 + k * .056 + rs.uniform(0, .012))
    return norm(b, .42)
def nibble(rs):
    b = np.zeros(int(SR * .7))
    for k in range(2):
        t = T(.22); y = bp(rs.standard_normal(len(t)), 900, 6000) * np.exp(-t / .03) * (.5 + .5 * np.sign(np.sin(2 * np.pi * 70 * t)))
        y += .5 * np.sin(2 * np.pi * (420 - 500 * t) * t) * np.exp(-t / .04); put(b, y, .02 + k * .3)
    return norm(b, .5)
ALL = dict(birds=birds, lap=lap, glide=glide, rewind=rewind, ff=ff, snap=snap, hop=hop, scuttle=scuttle, nibble=nibble)
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in ALL.items():
        if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
        y = fn(np.random.default_rng(sum(map(ord, name))))
        w = wave.open(os.path.join(OUT, f"ep08_{name}.wav"), "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype("<i2").tobytes()); w.close(); print(f"ep08_{name}: {len(y) / SR:.2f} s, peak {np.max(np.abs(y)):.2f}")
