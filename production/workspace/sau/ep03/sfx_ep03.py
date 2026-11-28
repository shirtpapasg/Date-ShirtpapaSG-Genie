"""ep03/sfx_ep03.py: the extra sounds EP03 needs (a drink can's journey). All synthesised here with numpy, nothing copyrighted,
the same on every run. Written next to the shared library as sfx/ep03_<name>.wav, where build_tl.py looks; sfx_lib.py is not touched.
    /home/user/heart-tts/venv/bin/python ep03/sfx_ep03.py          (run once before build_tl.py on a fresh checkout)
  ep03_gulp 1.3 s     three swallows                     ep03_clink 0.35 s   a finger flicks an empty can
  ep03_beep 0.3 s     the scanner reads the mark         ep03_coin 0.7 s     a coin drops out and rings
  ep03_crunch 0.7 s   a can is crushed                   ep03_clatter 4.0 s  hundreds of cans tumbling in a truck
  ep03_clank 0.4 s    a steel can snaps on to a magnet   ep03_belt 6.0 s     a conveyor belt running
  ep03_press 2.4 s    a press squeezes, then thuds       ep03_stamp 0.45 s   a cutter or press comes down: ka-chunk
  ep03_roll 2.2 s     heavy rollers turning              ep03_slide 0.5 s    a can slides into the machine
"""
import numpy as np, wave, os, sys
SR = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sfx")
def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** 6) / (1 + (f / hi) ** 6); return np.fft.irfft(X * m, len(x))
def put(buf, x, at): i = int(at * SR); n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n] if n > 0 else 0
def norm(x, peak): return x / (np.max(np.abs(x)) + 1e-9) * peak
def ring(fs, d, dec, rs=None):
    t = T(d); return sum(a * np.sin(2 * np.pi * f * t + i) * np.exp(-t * dec * (1 + .25 * i)) for i, (f, a) in enumerate(fs))
def clink(rs, k=1.0, d=.35): return ring([(2150 * k, 1), (3480 * k, .8), (5230 * k, .6), (7400 * k, .3), (980 * k, .35)], d, 22) + .4 * bp(rs.standard_normal(int(SR * d)), 3000, 9000) * np.exp(-T(d) * 90)
def gulp(rs):
    b = np.zeros(int(SR * 1.3))
    for at in (.05, .47, .9):
        t = T(.26); f = 190 + 520 * (t / .26) ** 2; y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .26) ** 2
        put(b, y + .15 * bp(rs.standard_normal(len(t)), 300, 1200) * np.sin(np.pi * t / .26), at)
    return norm(b, .45)
def beep(rs):
    t = T(.3); y = np.where(t < .12, np.sin(2 * np.pi * 1320 * t), np.sin(2 * np.pi * 1760 * t)) * np.minimum(1, t / .005) * np.minimum(1, (.3 - t) / .03) * (np.abs(t - .125) > .012)
    return norm(y + .3 * np.sign(y), .4)
def coin(rs):
    b = np.zeros(int(SR * .7)); put(b, ring([(3950, 1), (5270, .8), (7100, .5), (9300, .3)], .65, 7), .04); put(b, .6 * ring([(4180, 1), (6020, .6)], .3, 18), 0)
    put(b, .5 * bp(rs.standard_normal(int(SR * .03)), 2500, 9000), 0); return norm(b, .5)
def crunch(rs, d=.7):
    n = int(SR * d); t = T(d); y = np.zeros(n)
    for i in range(34):
        at = rs.uniform(0, d * .7) ** 1.3; L = int(SR * rs.uniform(.008, .04)); x = bp(rs.standard_normal(L + 64), rs.uniform(900, 2500), rs.uniform(4000, 9000))[:L] * np.exp(-np.arange(L) / L * 4)
        put(y, x * rs.uniform(.4, 1), at)
    y += .7 * ring([(1900, 1), (3100, .7), (4700, .5)], d, 30) + 1.2 * np.sin(2 * np.pi * 85 * t) * np.exp(-t * 16)
    return norm(y, .7)
def clatter(rs):
    d = 4.0; b = np.zeros(int(SR * d)); t = T(d)
    for i in range(150):
        at = rs.uniform(0, d - .3); put(b, clink(rs, rs.uniform(.55, 1.5), .22) * rs.uniform(.15, .7), at)
    for i in range(30): put(b, crunch(rs, .3) * rs.uniform(.1, .3), rs.uniform(0, d - .4))
    low = bp(rs.standard_normal(len(t)), 60, 260) * (.6 + .4 * np.sin(2 * np.pi * 1.7 * t)); b = norm(b, 1) * np.minimum(1, t / .3) * np.minimum(1, (d - t) / .5) + .45 * norm(low, 1) * np.minimum(1, t / .4) * np.minimum(1, (d - t) / .6)
    return norm(b, .5)
def clank(rs):
    y = ring([(640, 1), (1510, .8), (2390, .6), (3900, .4)], .4, 16); y[:int(SR * .012)] += bp(rs.standard_normal(int(SR * .012) + 0), 800, 6000) * 2
    return norm(y + .8 * np.sin(2 * np.pi * 120 * T(.4)) * np.exp(-T(.4) * 25), .6)
def belt(rs):
    d = 6.0; t = T(d); y = bp(rs.standard_normal(len(t)), 90, 420) * (.7 + .3 * np.sin(2 * np.pi * 7 * t)) + .35 * np.sin(2 * np.pi * 96 * t) + .2 * np.sin(2 * np.pi * 192 * t)
    tick = (np.sin(2 * np.pi * 5.5 * t) > .97) * bp(rs.standard_normal(len(t)), 1500, 5000); y = norm(y, 1) + .5 * norm(tick, 1)
    return norm(y * np.minimum(1, t / .5) * np.minimum(1, (d - t) / .8), .22)
def press(rs):
    d = 2.4; t = T(d); b = np.zeros(len(t)); k = np.clip(t / 1.8, 0, 1)
    f = 70 + 150 * k; whine = np.sin(2 * np.pi * np.cumsum(f) / SR) * (.3 + .7 * k) * (t < 1.85)
    grind = bp(rs.standard_normal(len(t)), 500, 5000) * k ** 2 * (t < 1.85) * (.5 + .5 * np.abs(np.sin(2 * np.pi * 9 * t)))
    b += .5 * whine + .45 * norm(grind, 1)
    for i in range(16): put(b, crunch(rs, .25) * .35, .3 + 1.5 * (i / 16) ** .7)
    th = (np.sin(2 * np.pi * 55 * T(.55)) + .6 * np.sin(2 * np.pi * 110 * T(.55)) + .5 * np.sin(2 * np.pi * 240 * T(.55)) * np.exp(-T(.55) * 30)) * np.exp(-T(.55) * 9); put(b, 1.6 * th, 1.85)
    return norm(b, .75)
def stamp(rs):
    d = .45; t = T(d); y = (np.sin(2 * np.pi * 95 * t) + .7 * np.sin(2 * np.pi * 210 * t)) * np.exp(-t * 20); y[:int(SR * .02)] += bp(rs.standard_normal(int(SR * .02)), 600, 5000) * 1.5
    b = np.zeros(len(t)); put(b, y, .08); put(b, .5 * clink(rs, .8, .3), .1); put(b, .5 * bp(rs.standard_normal(int(SR * .07)), 400, 3000) * np.linspace(0, 1, int(SR * .07)) ** 2, 0); return norm(b, .65)
def roll(rs):
    d = 2.2; t = T(d); y = bp(rs.standard_normal(len(t)), 50, 300) * (.6 + .4 * np.sin(2 * np.pi * (4 + 5 * t / d) * t)) + .5 * np.sin(2 * np.pi * (60 + 40 * t / d) * t)
    sq = bp(rs.standard_normal(len(t)), 1800, 4200) * (t / d) ** 3 * .5
    return norm((norm(y, 1) + sq) * np.minimum(1, t / .3) * np.minimum(1, (d - t) / .25), .5)
def slide(rs):
    d = .5; t = T(d); y = bp(rs.standard_normal(len(t)), 1200, 6000) * np.sin(np.pi * t / d) ** 2 * (.6 + .4 * np.sin(2 * np.pi * 40 * t)); b = norm(y, .5); put(b, .5 * clink(rs, .7, .15), .34); return norm(b, .45)
ALL = {"gulp": gulp, "clink": lambda rs: norm(clink(rs), .5), "beep": beep, "coin": coin, "crunch": crunch, "clatter": clatter, "clank": clank, "belt": belt, "press": press, "stamp": stamp, "roll": roll, "slide": slide}
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for i, (name, fn) in enumerate(ALL.items()):
        if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
        x = np.clip(fn(np.random.default_rng(300 + i)), -1, 1); w = wave.open(os.path.join(OUT, f"ep03_{name}.wav"), "wb")
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype("<i2").tobytes()); w.close(); print("ep03_" + name, round(len(x) / SR, 2), "s")
