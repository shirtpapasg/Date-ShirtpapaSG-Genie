"""sfx_lib.py: the sound library for TheOneApp, Explored. Every sound is synthesised here (numpy only), so nothing is copyrighted.

    PY=/home/user/heart-tts/venv/bin/python
    $PY sfx_lib.py                       writes every sound to sfx/<name>.wav (44.1 kHz, mono, 16 bit)
    $PY sfx_lib.py boom zap              only these
    $PY sfx_lib.py --report              also prints length, peak, loudness and where the energy sits (sub / body / air)
    $PY sfx_lib.py --sampler /tmp/sfx/sampler.wav     all sounds in a row with 0.5 s gaps (prints where each one starts)

build_tl.py plays sfx/<name>.wav when it exists and falls back to its old one-line ffmpeg sound when it does not.
Use a name in a segments file as before:  "sfx": [["pipe_rush", 0], ["pass_by", 1.2]]
Every sound is the same on every run (the random numbers are seeded by the sound's name).
Sounds are mono on purpose: build_tl.py makes a mono effects track, and mono never cancels itself on a phone speaker.
Deep sounds carry a "body" layer (150 to 600 Hz) so they are still heard on a phone or a classroom laptop.

THE SOUNDS (name, length, what it is for)

The 26 names EP01 and the Shorts already use (same character, same rough length, richer)
  pop            0.22 s  a keyword chip or label popping in
  whoosh         0.62 s  scene change swish (build_tl.py places it 0.35 s before each new scene)
  ding           1.0 s   small bell: "now you know", a right answer
  tada           1.5 s   two-hit fanfare ("ta-daa") for the end title
  rumble         4.5 s   deep earth rumble: rock, seabed, something huge moving
  bubble         0.4 s   three quick rising bubbles
  drill          2.0 s   drill bit grinding down through rock
  splash         0.75 s  something drops into water
  hiss           1.2 s   steam or gas escaping from a valve
  hum            5.2 s   mains hum (50 Hz): power station, transformer, cables
  ping           1.3 s   sonar-style ping with one echo: a place marked on a map
  roar           5.5 s   big rolling fire or furnace roar
  whirr          4.0 s   a motor or fan spinning up
  buzz           2.6 s   harsh electric buzz: live wire, overloaded socket
  zap            0.45 s  quick electric zap, falling pitch
  click          0.08 s  dry mechanical click: button, switch, shutter
  chime          2.2 s   two soft bells: a gentle "good news" moment
  cough          0.42 s  a double cough (haze, smoke)
  crackle        2.6 s   fire crackling: sparks and little pops
  breath         1.8 s   one slow breath out
  rain           5.0 s   steady rain with single drops
  wind           6.0 s   gusting wind with a faint whistle
  boom           1.8 s   big deep impact with a tail
  rush           4.0 s   gas or air rushing through a pipe, building up
  flash          1.0 s   bright burst: lightning, a camera flash, a sudden light
  deep           5.0 s   dark, slow deep-sea or deep-underground drone

First-person hero shots (the camera is the particle)
  squeeze        3.6 s   creaking rock pressure: we are gas squeezed in rock (three creaks, each tighter, then a crack)
  pipe_rush      4.0 s   rising whoosh up a well pipe: pipe rings beat past faster and faster, then we shoot out
  pass_by        0.7 s   one thing looming up and rushing past the camera (a pipe ring, a rock, a bubble, a blade)
  tank_swirl     4.0 s   watery tumble through the cleaning tank: sloshing and lots of bubbles
  ignite         1.3 s   tick, hiss, WHUMP: the gas lights
  flame_roar     5.0 s   steady blue burner flame: roar plus jet hiss
  blade_whoosh   2.7 s   heavy turbine blades swinging past, faster each time, each with a push
  turbine_spool  5.0 s   turbine spin-up whine, rising and then holding
  coil_spin      4.0 s   inside the generator: the coil sweeps past the magnets, wub-wub-wub, speeding up
  generator_hum  5.0 s   rich 50 Hz generator hum with a slow throb
  spark          0.5 s   sharp electric spark with crackle
  cable_zip      1.6 s   electricity racing along a cable: rising buzz that zips past
  lamp_click     0.9 s   switch click, then a warm glow as the lamp comes on
  power_up       1.9 s   electric swell that lands on a bright chord: lights come on across a room or a city
  sun_whoosh     2.6 s   bright, airy fly-by: sunlight streaking through space
  space_warp     3.2 s   endless rising warp through space, ending in a soft bloom
  panel_hit      1.6 s   bright glassy shimmer: sunlight landing on a solar panel
  underwater     9.0 s   muffled deep-water ambience with bubbles: the undersea cable (loops: place the next one 8 s later)
  neutron_zip    0.7 s   a tiny fast particle shooting past ("pyeew")
  split_boom     3.2 s   the atom splits: crack, deep boom, two bits fly off, then a swell of heat
  thud           0.45 s  a soft heavy landing

Story and pacing
  riser          4.0 s   tension build that stops dead, so the next sound lands hard (put the hit at 4.0 s)
  reveal         2.2 s   soft swell and shimmer: an answer appears, a text card fades in
  stinger        1.6 s   short musical hit for a big fact or number
  sparkle        1.2 s   small twinkle: a nice detail, a tick, a star
  pad_wonder     10.5 s  gentle, open music bed (wonder, discovery). Loops: place the next one 9 s later
  pad_tension    10.5 s  quiet, uneasy music bed with a slow heartbeat (a problem, a risk). Loops: place the next one 9 s later

Levels (build_tl.py adds the sounds together, render_all.sh then plays the effects track at half volume under the voice):
impacts peak near -3 dB, ordinary effects near -8 dB, long ambiences sit about 12 dB under an impact, music beds lower still.
"""
import os, sys, zlib
import numpy as np
import soundfile as sf

SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "sfx")
PI2 = 2 * np.pi
R = np.random.default_rng(0)          # set again for each sound, from its name
SOUNDS = {}                           # name -> (function, level kind, level in dB)


def sound(name, peak=None, rms=None):
    """Register a sound. peak: the highest sample, in dB. rms: the loudest 0.4 s, in dB (for long sounds and beds)."""
    def deco(fn):
        SOUNDS[name] = (fn, "peak" if rms is None else "rms", peak if rms is None else rms)
        return fn
    return deco


# ---------- building blocks ----------
def T(d): return np.arange(int(round(d * SR))) / SR
def db(x): return 20 * np.log10(max(float(x), 1e-9))
def sig(x): return 1 / (1 + np.exp(-np.clip(x, -50, 50)))
def ease(p): p = np.clip(p, 0, 1); return p * p * (3 - 2 * p)


def noise(d, color="white"):
    """White, pink (-3 dB per octave) or brown (-6 dB per octave) noise, at loudness 1."""
    n = int(round(d * SR)); x = R.standard_normal(n)
    if color != "white":
        X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1 / SR); f[0] = f[1]
        X /= np.sqrt(f) if color == "pink" else f
        X[f < 20] = 0; x = np.fft.irfft(X, n)
    return x / (x.std() + 1e-12)


def filt(x, lo=None, hi=None, n=2):
    """Band limit (smooth Butterworth-shaped slopes, no phase shift). lo: cut below, hi: cut above."""
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); f[0] = 1e-6
    if lo: X *= 1 / np.sqrt(1 + (lo / f) ** (2 * n))
    if hi: X *= 1 / np.sqrt(1 + (f / hi) ** (2 * n))
    return np.fft.irfft(X, len(x))


def reson(x, fc, q=3.0):
    """A resonant band around fc (higher q is narrower)."""
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); f[0] = 1e-6
    return np.fft.irfft(X / np.sqrt(1 + (q * (f / fc - fc / f)) ** 2), len(x))


def _stft(x, maskfn, N=1024):
    """Filter that changes over time: maskfn(frame times, frequencies) gives the gain for every frame."""
    H = N // 4; n = len(x)
    xp = np.concatenate([np.zeros(N), x, np.zeros(2 * N)])
    w = 0.5 - 0.5 * np.cos(PI2 * np.arange(N) / N)
    nf = (len(xp) - N) // H + 1
    idx = np.arange(N)[None, :] + H * np.arange(nf)[:, None]
    F = np.fft.rfft(xp[idx] * w, axis=1)
    tc = (H * np.arange(nf) + N / 2 - N) / SR
    f = np.fft.rfftfreq(N, 1 / SR); f[0] = 1e-6
    y = np.fft.irfft(F * maskfn(tc, f), N, axis=1) * w
    out = np.zeros(len(xp))
    for i in range(nf): out[i * H:i * H + N] += y[i]
    return out[N:N + n] / 1.5


def _curve(v, tc, n):
    return np.full(len(tc), float(v)) if np.isscalar(v) else np.interp(tc, np.arange(n) / SR, v)


def tvbp(x, fc, q=2.0):
    """A resonant band whose centre moves (fc is a number or one value per sample)."""
    def m(tc, f):
        c = np.maximum(_curve(fc, tc, len(x)), 20)[:, None]; qq = _curve(q, tc, len(x))[:, None]
        return 1 / np.sqrt(1 + (qq * (f[None, :] / c - c / f[None, :])) ** 2)
    return _stft(x, m)


def tvlp(x, fc, n=2):
    """A low-pass whose cut-off moves."""
    def m(tc, f):
        c = np.maximum(_curve(fc, tc, len(x)), 20)[:, None]
        return 1 / np.sqrt(1 + (f[None, :] / c) ** (2 * n))
    return _stft(x, m)


def sine(f, d=None, ph=0.0):
    if np.isscalar(f): return np.sin(PI2 * f * T(d) + ph)
    return np.sin(PI2 * np.cumsum(f) / SR + ph)


def harm(f, amps, d=None):
    """A tone with the given strengths for harmonic 1, 2, 3 ... (f is a number or one value per sample)."""
    if np.isscalar(f): f = np.full(int(round(d * SR)), float(f))
    ph = PI2 * np.cumsum(f) / SR; y = np.zeros(len(f))
    for k, a in enumerate(amps, 1):
        if a: y += a * np.sin(k * ph) * (k * f < 0.45 * SR)
    return y


def saw(f, d=None, K=24, tilt=1.0):
    """Bright buzzy tone (harmonics fall as 1/k^tilt)."""
    return harm(f, [1 / k ** tilt for k in range(1, K + 1)], d)


def tone(f, d, K=8, mellow=6.0, attack=0.008):
    """A note that starts bright and mellows (brass or plucked-string feel)."""
    t = T(d); y = np.zeros(len(t))
    for k in range(1, K + 1):
        if k * f < 0.45 * SR: y += np.sin(PI2 * k * f * t) / k * np.exp(-t * mellow * (k - 1))
    return y * np.minimum(1, t / attack)


def bell(f, d, tau=0.5, bright=1.0, ratios=(1, 2.0, 3.01, 4.17, 5.43), amps=(1, .45, .22, .12, .06)):
    """A struck bell: slightly out-of-tune overtones that die away faster the higher they are."""
    t = T(d); y = np.zeros(len(t))
    for k, (r, a) in enumerate(zip(ratios, amps)):
        if f * r < 18000: y += a * bright ** k * np.sin(PI2 * f * r * t) * np.exp(-t * (1 + 0.7 * k) / tau)
    return y * np.minimum(1, t / 0.002)


def blip(f0, d, rise=0.6, tau=None):
    """One bubble: a short note whose pitch rises."""
    t = T(d); f = f0 * (1 + rise * t / d)
    return sine(f) * np.exp(-t / (tau or d / 3.5)) * np.minimum(1, t / 0.003)


def fade(x, fin=0.005, fout=0.02):
    x = x.copy(); a = min(int(fin * SR), len(x) // 2); b = min(int(fout * SR), len(x) // 2)
    if a > 1: x[:a] *= 0.5 - 0.5 * np.cos(np.pi * np.arange(a) / a)
    if b > 1: x[-b:] *= 0.5 + 0.5 * np.cos(np.pi * np.arange(b) / b)
    return x


def put(buf, x, at, g=1.0, wrap=False):
    """Add x into buf at `at` seconds (wrap=True carries what runs off the end back to the start, for loops)."""
    i = int(round(at * SR))
    if wrap:
        idx = (i + np.arange(len(x))) % len(buf); np.add.at(buf, idx, g * x); return
    if i >= len(buf) or i < 0: return
    m = min(len(x), len(buf) - i); buf[i:i + m] += g * x[:m]


def slow(d, rate):
    """A slow random wobble between 0 and 1 (rate in Hz says how fast it wanders)."""
    x = filt(R.standard_normal(int(round(d * SR))), None, rate)
    return (x - x.min()) / (x.max() - x.min() + 1e-12)


def fftconv(a, b):
    n = len(a) + len(b) - 1; N = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(a, N) * np.fft.rfft(b, N), N)[:n]


def reverb(x, rt=0.8, wet=0.25, lo=250, hi=7000, pre=0.012, seed=7, circular=False):
    """A small room or hall: the sound is convolved with a decaying burst of noise that gets duller as it dies."""
    n = int(rt * 1.15 * SR); t = np.arange(n) / SR
    ir = np.random.default_rng(seed).standard_normal(n) * np.exp(-6.9 * t / rt)
    a = filt(ir, lo, hi); b = filt(ir, lo, hi / 3.5); m = np.clip(t / rt, 0, 1)
    ir = (a * (1 - m) + 1.6 * b * m)
    ir = np.concatenate([np.zeros(int(pre * SR)), fade(ir, 0.001, 0.05)]); ir /= np.sqrt((ir ** 2).sum())
    if circular:                                    # for loops: the tail wraps round to the start
        N = len(x); k = np.zeros(N); np.add.at(k, np.arange(len(ir)) % N, ir)
        return x + wet * np.fft.irfft(np.fft.rfft(x) * np.fft.rfft(k), N)
    y = fftconv(x, ir); y[:len(x)] = y[:len(x)] * wet + x; y[len(x):] *= wet
    return y


def comb(x, f0, fb=0.7, damp=4000.0, tail=0.4):
    """A hollow tube: the sound rings at f0 and its multiples (a pipe, a tunnel)."""
    n = len(x); xp = np.concatenate([x, np.zeros(int(tail * SR))])
    X = np.fft.rfft(xp); f = np.fft.rfftfreq(len(xp), 1 / SR)
    H = 1 / (1 - fb / np.sqrt(1 + (f / damp) ** 2) * np.exp(-2j * np.pi * f / f0))
    return np.fft.irfft(X * H, len(xp))[:n] * (1 - fb * 0.6)


def ring(x, modes):
    """Make x ring like a solid object: modes is a list of (frequency, ring time, strength)."""
    L = int(max(m[1] for m in modes) * 7 * SR); t = np.arange(L) / SR
    k = sum(a * np.sin(PI2 * f * t) * np.exp(-t / tau) for f, tau, a in modes)
    return fftconv(x, k)[:len(x)]


def vdelay(x, dly):
    """Delay x by a changing number of samples (for flanging and sweeps)."""
    n = np.arange(len(x)); return np.interp(n - dly, n, x, left=0)


def soft(x, drive=1.5):
    """Gentle saturation: makes impacts thicker without clipping."""
    return np.tanh(x * drive) / np.tanh(drive)


def pulses(rate, jitter=0.2):
    """A train of clicks at `rate` per second (one value per sample), a little uneven."""
    rate = rate * (1 + jitter * (2 * slow(len(rate) / SR, 30) - 1))
    ph = np.cumsum(rate) / SR; y = np.zeros(len(rate))
    idx = np.flatnonzero(np.diff(np.floor(ph)) > 0); y[idx] = R.uniform(0.4, 1, len(idx))
    return y


def ticks(d, count, flo, fhi, length=(0.001, 0.004), spread=0.8, when=None):
    """Lots of tiny random ticks (sparks, raindrops, fire crackle). when: a function giving each tick's time."""
    n = int(round(d * SR)); y = np.zeros(n)
    for _ in range(count):
        at = when() if when else R.uniform(0, d - 0.03)
        L = R.uniform(*length); tt = np.arange(int(L * 6 * SR) + 8) / SR
        f = np.exp(R.uniform(np.log(flo), np.log(fhi)))
        put(y, np.sin(PI2 * f * tt + R.uniform(0, 6.28)) * np.exp(-tt / L) * R.lognormal(0, spread), max(at, 0))
    return y


def swoosh(d, pk, width, flo, fhi, q=1.5, color="pink", drop=0.3, rise_slow=1.0):
    """Something rushing past: filtered noise that brightens as it nears, then drops in pitch as it leaves (Doppler)."""
    t = T(d); w = np.where(t < pk, width * rise_slow, width)
    g = np.exp(-((t - pk) / w) ** 2)
    fc = (flo + (fhi - flo) * g) * (1 - drop * sig((t - pk) / (width * 0.25)))
    return tvbp(noise(d, color), fc, q) * g, g


def loopify(core, fd):
    """Turn a seamless core (period = its length) into a clip with a fade at each end.
    Place the next copy one period later and the two fades add up to a steady sound."""
    f = int(fd * SR); x = np.concatenate([core, core[:f]])
    r = 0.5 - 0.5 * np.cos(np.pi * np.arange(f) / f); x[:f] *= r; x[-f:] *= 1 - r
    return x


# ---------- the 26 existing names, rebuilt ----------
@sound("pop", peak=-8)
def s_pop():
    d = 0.22; t = T(d)
    f = 480 + 900 * (1 - np.exp(-t / 0.010))                       # the pitch jumps up: a round, wet "pop"
    x = sine(f) * np.exp(-t / 0.032) + 0.28 * sine(f * 2.01) * np.exp(-t / 0.016)
    x += 0.45 * filt(noise(d), 2500, 9000) * np.exp(-t / 0.004)     # the snap at the front
    x += 0.35 * sine(190 - 60 * t / d) * np.exp(-t / 0.025)          # a little weight underneath
    return reverb(fade(x, 0.001, 0.03), rt=0.22, wet=0.12)[:len(t)]


@sound("whoosh", peak=-9)
def s_whoosh():
    d = 0.62
    body, g = swoosh(d, 0.33, 0.12, 380, 3400, q=1.5)
    air = filt(noise(d), 5000, 13000) * g ** 2 * 0.22
    low = tvbp(noise(d, "brown"), 110 + 240 * g, 2.0) * g * 0.9
    return fade(body + air + low, 0.03, 0.08)


@sound("ding", peak=-8)
def s_ding():
    d = 1.0; t = T(d)
    x = bell(1318.5, d, tau=0.34) + 0.35 * bell(2637, d, tau=0.18) + 0.12 * sine(659.3, d) * np.exp(-t / 0.2)
    x += 0.3 * filt(noise(d), 3000, 9000) * np.exp(-t / 0.003)
    return fade(reverb(x, rt=0.9, wet=0.2)[:len(t)], 0.001, 0.25)


def _chord(freqs, d, mellow, tau, K=8):
    t = T(d); y = np.zeros(len(t))
    for f in freqs: y += tone(f, d, K=K, mellow=mellow) * np.exp(-t / tau)
    return y


@sound("tada", peak=-5)
def s_tada():
    d = 1.5; x = np.zeros(int(d * SR))
    put(x, fade(_chord([196, 392, 587.3, 784, 987.8], 0.15, 4, 0.1) + 0.4 * bell(1568, 0.15, 0.08), 0.003, 0.03), 0, 1.25)                 # "ta"
    da = _chord([196, 392, 587.3, 784, 987.8, 1174.7, 1568], 1.3, 3.5, 0.55)                           # "daa"
    da += 0.5 * (bell(1568, 1.3, 0.5) + bell(2349.3, 1.3, 0.35) * 0.6)
    da *= 1 + 0.06 * np.sin(PI2 * 6 * T(1.3))                                                           # a little shine
    put(x, da, 0.17)
    put(x, 0.5 * filt(noise(0.1), 2000, 9000) * np.exp(-T(0.1) / 0.008), 0.17)
    put(x, 0.7 * sine(98, 0.4) * np.exp(-T(0.4) / 0.12), 0.17)
    return fade(reverb(x, rt=1.0, wet=0.2)[:len(x)], 0.002, 0.3)


@sound("rumble", rms=-14)
def s_rumble():
    d = 4.5; t = T(d)
    low = filt(noise(d, "brown"), 25, 130, n=3) * (0.55 + 0.45 * slow(d, 1.2))
    sub = 0.5 * sine(42 + 4 * np.sin(PI2 * 0.3 * t)) + 0.25 * sine(63.5, d)
    body = filt(noise(d, "pink"), 140, 520) * (0.25 + 0.75 * slow(d, 4) ** 2) * 0.75          # grinding you can hear on a phone
    stones = filt(ring(ticks(d, 26, 200, 900, (0.004, 0.012), 0.3), [(230, 0.03, 1), (540, 0.02, .6)]), None, 1200) * 0.07
    return fade(low * 0.8 + sub * 0.45 + body + stones, 0.8, 0.9)


@sound("bubble", peak=-8)
def s_bubble():
    d = 0.4; x = np.zeros(int(d * SR))
    for f, at, g, L in ((430, 0, 1, .13), (640, .1, .8, .11), (910, .19, .65, .1)):
        put(x, blip(f, L, rise=0.9), at, g); put(x, blip(f * 2.02, L * .6, rise=0.9), at, g * .15)
    x += 0.07 * filt(noise(d, "pink"), 150, 900) * fade(np.ones(len(x)), 0.02, 0.2)
    return fade(filt(x, 80, 6000), 0.002, 0.05)


@sound("drill", rms=-16)
def s_drill():
    d = 2.0; t = T(d)
    r = ease(t / 0.3) * (1 - 0.45 * ease((t - 1.5) / 0.5))                                 # spins up, then slows
    f0 = 34 + 62 * r
    motor = filt(saw(f0, K=30, tilt=0.9), None, 1800)
    chat = 0.45 + 0.55 * (0.5 + 0.5 * np.cos(PI2 * np.cumsum(13 * r + 1) / SR)) ** 2       # the bit chattering on rock
    grind = filt(noise(d, "pink"), 350, 3800) * chat * 0.8
    grit = ring(pulses(120 * r + 5, 0.5), [(820, .004, 1), (1900, .003, .7), (3300, .002, .4)]) * 0.5
    whine = 0.06 * sine(1500 * r + 300) * r
    return fade((motor * 0.5 * chat + grind + grit + whine) * (0.25 + 0.75 * r), 0.03, 0.5)


@sound("splash", peak=-6)
def s_splash():
    d = 0.75; t = T(d)
    thump = sine(150 * np.exp(-t / 0.05) + 55) * np.exp(-t / 0.045) + 0.6 * reson(noise(d, "pink"), 380, 2) * np.exp(-t / 0.06)
    spray = tvbp(noise(d, "pink"), 900 + 3600 * np.exp(-t / 0.22), 1.0) * np.minimum(1, t / 0.012) * np.exp(-t / 0.17)
    x = 0.9 * thump + spray
    for _ in range(7): put(x, blip(R.uniform(700, 2400), R.uniform(.03, .07), 0.8), R.uniform(.12, .6), R.uniform(.08, .25))
    for k in range(4): put(x, blip(R.uniform(260, 520), 0.09, 0.7), 0.1 + 0.11 * k + R.uniform(0, .03), 0.3)       # the gulp as the water closes over it
    return fade(x, 0.002, 0.2)


@sound("hiss", rms=-23)
def s_hiss():
    d = 1.2; n = noise(d); t = T(d)
    x = 0.12 * filt(n, 2500, 12000) + 0.9 * reson(n, 5200, 5) + 0.8 * reson(n, 2900, 4) + 0.25 * reson(n, 8800, 6)
    x += 0.4 * reson(noise(d), 1150, 2.5)                                                  # the pipe's own note
    return fade(x * (0.8 + 0.2 * slow(d, 25)), 0.15, 0.5)


def _hum(d, f=50.0, amps=(.8, 1, .7, .45, .4, .3, .2, .12, .1, .06)):
    return harm(f, amps, d) + 0.7 * harm(f * 1.006, amps, d)             # two sources slightly apart: a slow beat


@sound("hum", rms=-18)
def s_hum():
    d = 5.2; t = T(d)
    x = _hum(d) * (0.9 + 0.1 * np.sin(PI2 * 0.21 * t)) + 0.05 * filt(noise(d, "pink"), 200, 1500)
    x += 0.9 * filt(saw(100, d, K=30, tilt=1.1), 250, 2500) * (0.8 + 0.2 * np.sin(PI2 * 0.33 * t))      # the transformer's edge
    return fade(x, 0.8, 1.0)


@sound("ping", peak=-8)
def s_ping():
    d = 1.3; t = T(d)
    one = (sine(1568, 0.9) * np.exp(-T(0.9) / 0.22) + 0.3 * sine(1575, 0.9) * np.exp(-T(0.9) / 0.25)
           + 0.15 * sine(3136, 0.9) * np.exp(-T(0.9) / 0.09)) * np.minimum(1, T(0.9) / 0.003)
    x = np.zeros(len(t)); put(x, one, 0); put(x, filt(one, None, 2500), 0.36, 0.28)       # one soft echo
    return fade(reverb(x, rt=1.1, wet=0.28)[:len(t)], 0.001, 0.3)


@sound("roar", rms=-15)
def s_roar():
    d = 5.5; tb = slow(d, 9)
    base = filt(noise(d, "pink"), 70, 750) * (0.55 + 0.45 * tb)
    low = 0.8 * filt(noise(d, "brown"), 30, 120, n=3) * (0.65 + 0.35 * slow(d, 3))
    air = 0.1 * filt(noise(d), 1500, 5500) * tb
    licks = 0.25 * tvbp(noise(d, "pink"), 300 + 900 * slow(d, 5), 2.5) * slow(d, 6) ** 2    # tongues of flame
    return fade(base + low + air + licks, 0.4, 0.9)


@sound("whirr", rms=-16)
def s_whirr():
    d = 4.0; t = T(d)
    f = 90 + 400 * ease(t / 3.4) * (1 + 0.004 * np.sin(PI2 * 7 * t))
    x = harm(f, [1, .45, .35, .16, .1, .06]) + 0.3 * harm(f * 0.5, [1, .3])
    air = tvbp(noise(d), np.minimum(6 * f, 9000), 2.5) * 0.35 * (0.3 + 0.7 * t / d)
    return fade((x * 0.55 + air) * (0.4 + 0.6 * ease(t / 1.5)), 0.15, 0.8)


@sound("buzz", rms=-17)
def s_buzz():
    d = 2.6; t = T(d)
    x = filt(saw(100, d, K=40, tilt=0.8), None, 3200) * (0.65 + 0.35 * np.sign(np.sin(PI2 * 50 * t)))
    x += 0.5 * ticks(d, 50, 2500, 8000, (0.0005, 0.002)) * 0.12
    return fade(x * (0.85 + 0.15 * slow(d, 12)), 0.2, 0.6)


@sound("zap", peak=-6)
def s_zap():
    d = 0.45; t = T(d)
    f = 2500 * np.exp(-t / 0.11) + 420
    x = filt(saw(f, K=10), None, 7000) * np.exp(-t / 0.11) * (0.55 + 0.45 * np.sign(np.sin(PI2 * 130 * t)))
    x += 0.9 * filt(noise(d), 2000, 11000) * np.exp(-t / 0.02)
    x += 0.35 * ticks(d, 14, 2000, 7000, (0.001, 0.003), when=lambda: R.exponential(0.09))
    return fade(reverb(x, rt=0.3, wet=0.12)[:len(t)], 0.0005, 0.08)


@sound("click", peak=-8)
def s_click():
    d = 0.08; t = T(d)
    x = filt(noise(d), 1800, 7500) * np.exp(-t / 0.003) + 0.6 * sine(2200, d) * np.exp(-t / 0.006)
    x += 0.5 * sine(800, d) * np.exp(-t / 0.012)
    return fade(x, 0.0003, 0.02)


@sound("chime", peak=-9)
def s_chime():
    d = 2.2; x = np.zeros(int(d * SR))
    put(x, bell(1046.5, 2.0, tau=0.8), 0); put(x, bell(1568, 2.0, tau=0.7), 0.11, 0.8); put(x, bell(2093, 1.6, tau=0.5), 0.22, 0.35)
    x += 0.1 * sine(523.25, d) * np.exp(-T(d) / 0.5)
    return fade(reverb(x, rt=1.5, wet=0.28)[:len(x)], 0.001, 0.5)


@sound("cough", peak=-7)
def s_cough():
    d = 0.42; x = np.zeros(int(d * SR))
    for at, g, L in ((0, 1, .2), (0.17, .75, .24)):
        t = T(L); n = noise(L, "pink")
        v = (reson(n, 620, 3) + 0.7 * reson(n, 1250, 4) + 0.35 * reson(n, 2600, 3)) * np.minimum(1, t / 0.008) * np.exp(-t / 0.05)
        v += 0.5 * harm(125 - 150 * t, [1, .5, .3]) * np.exp(-t / 0.03)                    # the chest behind it
        put(x, v, at, g)
    return fade(x, 0.002, 0.05)


@sound("crackle", rms=-20)
def s_crackle():
    d = 2.6
    x = ticks(d, 130, 1500, 7000, (0.0006, 0.003), 0.6) + 1.6 * ticks(d, 16, 500, 1300, (0.003, 0.008), 0.4)
    bed = 0.9 * filt(noise(d, "pink"), 150, 1400) * (0.4 + 0.6 * slow(d, 7))
    return fade(x + bed, 0.3, 0.6)


@sound("breath", rms=-18)
def s_breath():
    d = 1.8; t = T(d); n = noise(d, "pink")
    x = tvbp(n, 1250 - 550 * t / d, 2.2) + 0.45 * tvbp(n, 2500 - 600 * t / d, 3) + 0.12 * filt(noise(d), 4500, 10000)
    return fade(x, 0.8, 0.9)


@sound("rain", rms=-24)
def s_rain():
    d = 5.0
    bed = filt(noise(d, "pink"), 700, 6000) * (0.75 + 0.25 * slow(d, 0.7))
    drops = ticks(d, 600, 1800, 6500, (0.0008, 0.004), 0.45) * 0.9
    patter = 0.35 * filt(noise(d, "pink"), 180, 650) * (0.6 + 0.4 * slow(d, 9))
    plink = np.zeros(len(bed))
    for _ in range(45): put(plink, blip(R.uniform(900, 2600), R.uniform(.02, .05), 0.5), R.uniform(0, d - .1), R.uniform(.5, 1.5))   # single drops landing in puddles
    return fade(bed + drops + patter + 0.5 * plink, 0.6, 1.0)


@sound("wind", rms=-17)
def s_wind():
    d = 6.0; gust = slow(d, 0.5); fc = 280 + 520 * slow(d, 0.4)
    x = tvbp(noise(d, "pink"), fc, 2.2) * (0.35 + 0.65 * gust)
    whistle = 0.22 * tvbp(noise(d), 2.4 * fc + 500, 14) * gust ** 2
    low = 0.3 * filt(noise(d, "brown"), 40, 150)
    return fade(x + whistle + low, 0.8, 1.0)


@sound("boom", peak=-3)
def s_boom():
    d = 1.8; t = T(d)
    sub = sine(95 * np.exp(-t / 0.12) + 38) * np.exp(-t / 0.42)
    punch = 0.8 * sine(190 * np.exp(-t / 0.03) + 62) * np.exp(-t / 0.06)
    crack = 0.55 * filt(noise(d), 700, 6000) * np.exp(-t / 0.012)
    debris = 0.6 * filt(noise(d, "pink"), 45, 800) * np.exp(-t / 0.45) * (0.6 + 0.4 * slow(d, 14))
    knock = 1.5 * (reson(noise(d, "pink"), 260, 2) + 0.6 * reson(noise(d, "pink"), 520, 2.5)) * np.exp(-t / 0.11)   # heard even on a phone
    x = soft(sub + punch + crack + debris + knock, 2.2)
    return fade(reverb(x, rt=1.0, wet=0.16, hi=3000)[:len(t)], 0.0005, 0.5)


@sound("rush", rms=-18.5)
def s_rush():
    d = 4.0; t = T(d)
    x = tvbp(noise(d, "pink"), 480 + 1000 * (t / d) ** 1.3, 1.2)
    x = x + 0.5 * comb(x, 175, 0.62) + 0.18 * filt(noise(d), 3000, 9000) * (t / d)
    x += 0.35 * filt(noise(d, "brown"), 40, 140)
    return fade(x * (0.85 + 0.15 * slow(d, 8)), 1.2, 1.0)


@sound("flash", peak=-6)
def s_flash():
    d = 1.0; t = T(d)
    x = filt(noise(d), 300, 6500) * np.exp(-t / 0.13)
    for f in (3136, 3951, 4699, 6272, 7902): x += 0.2 * sine(f * R.uniform(.995, 1.005), d) * np.exp(-t / R.uniform(.15, .4))
    x += 0.5 * sine(95, d) * np.exp(-t / 0.07)
    return fade(reverb(x, rt=0.7, wet=0.2)[:len(t)], 0.002, 0.3)


@sound("deep", rms=-16)
def s_deep():
    d = 5.0; t = T(d)
    x = filt(noise(d, "brown"), 25, 260, n=3) * (0.7 + 0.3 * np.sin(PI2 * 0.4 * t - 1.5))
    drone = sine(55, d) + 0.5 * sine(82.6, d) + 0.35 * sine(110.3, d) + 0.3 * sine(165, d) + 0.2 * sine(220.6, d) + 0.1 * sine(330.4, d)
    far = 2.2 * tvbp(noise(d, "pink"), 320 + 80 * np.sin(PI2 * 0.25 * t), 4) * (0.5 + 0.5 * slow(d, 0.6)) + 0.6 * filt(noise(d, "pink"), 250, 900)
    return fade(x + 0.45 * drone * (0.8 + 0.2 * np.sin(PI2 * 0.17 * t)) + far, 0.8, 1.0)


# ---------- first-person hero shots ----------
@sound("squeeze", rms=-13)
def s_squeeze():
    d = 3.6; t = T(d); n = len(t)
    press = filt(noise(d, "brown"), 28, 190, n=3) * (0.3 + 0.7 * (t / d) ** 1.5) + 0.4 * sine(47 + 10 * t / d) * (t / d)
    cr = np.zeros(n)
    for a, b, r0, r1, g in ((0.25, 0.95, 16, 60, .6), (1.25, 1.95, 22, 85, .8), (2.25, 3.3, 28, 150, 1.0)):   # each creak tighter
        u = np.clip((t - a) / (b - a), 0, 1); on = (t >= a) & (t <= b)
        cr += pulses((r0 + (r1 - r0) * u ** 2) * on + 0.001, 0.25) * np.sin(np.pi * u) ** 0.6 * g
    creak = ring(cr, [(170, .03, 1), (330, .022, .9), (740, .012, .9), (1520, .007, .8), (2700, .004, .5)]) + 6 * filt(fftconv(cr, noise(0.004) * np.exp(-T(0.004) / 0.001))[:n], 900, 6000)
    groan = 0.3 * harm(92 - 22 * t / d, [1, .6, .4, .25]) * slow(d, 2) * (t / d)
    x = 0.6 * press + 0.9 * creak + 1.5 * groan
    ck = T(0.25); put(x, (filt(noise(0.25), 500, 5000) * np.exp(-ck / 0.01) + sine(140, 0.25) * np.exp(-ck / 0.05)) * 1.4, 3.3)   # crack
    return fade(soft(x * 0.6, 1.2), 0.4, 0.25)


@sound("pipe_rush", rms=-11)
def s_pipe_rush():
    d = 4.0; t = T(d); p = t / d
    out = sig((t - 3.72) / 0.05)                                                 # the moment we shoot out of the top
    fc = 240 * np.exp(np.log(15) * p ** 1.3) * (1 - 0.55 * out)
    body = tvbp(noise(d, "pink"), fc, 1.5)
    tube = comb(body, 105, 0.78, damp=3000)                                       # the hollow ring of the pipe
    rph = np.cumsum(2.2 + 12 * p ** 1.6) / SR                                     # pipe rings beat past, faster and faster
    rings = (0.5 + 0.5 * np.cos(PI2 * rph)) ** 3
    tone_ = harm(70 * 2 ** (2.6 * p) * (1 - 0.4 * out), [1, .5, .3, .2, .12])
    sub = filt(noise(d, "brown"), 30, 120)
    env = (0.12 + 0.88 * p ** 1.3) * (1 - 0.97 * ease((t - 3.7) / 0.3))
    x = (body * (0.45 + 0.55 * rings) + 0.75 * tube * (0.3 + 0.7 * rings) + 0.22 * tone_ + 0.4 * sub + 0.2 * filt(noise(d), 3500, 11000) * p ** 2) * env
    return fade(x, 0.25, 0.04)


@sound("pass_by", peak=-7)
def s_pass_by():
    d = 0.7
    x, g = swoosh(d, 0.36, 0.085, 180, 1700, q=1.8, drop=0.45, rise_slow=1.5)
    x = x + 0.5 * comb(x, 140, 0.6) + 1.2 * tvbp(noise(d, "brown"), 70 + 110 * g, 2) * g
    return fade(x + 0.15 * filt(noise(d), 4000, 11000) * g ** 3, 0.03, 0.1)


@sound("tank_swirl", rms=-16)
def s_tank_swirl():
    d = 4.0; t = T(d); x = np.zeros(len(t))
    x += 0.5 * tvbp(noise(d, "pink"), 420 + 260 * np.sin(PI2 * 0.62 * t), 0.9) * (0.6 + 0.4 * np.sin(PI2 * 0.62 * t + 1))
    for at in (0.2, 1.5, 2.9):                                                     # three slow tumbles
        s, g = swoosh(1.0, 0.5, 0.2, 250, 1100, q=1.3); put(x, s, at, 0.55)
    for _ in range(70):                                                            # bubbles of every size
        f = np.exp(R.uniform(np.log(280), np.log(1700))); L = 0.02 + 30 / f * R.uniform(.8, 1.4)
        put(x, blip(f, L, rise=R.uniform(.3, 1.1)), R.uniform(0, d - .2), R.uniform(.25, .9) * (500 / f) ** 0.3)
    x += 0.3 * filt(noise(d, "brown"), 35, 160)
    return fade(filt(x, 30, 3600), 0.3, 0.6)


@sound("ignite", peak=-4)
def s_ignite():
    d = 1.3; t = T(d); x = np.zeros(len(t)); w = 0.2
    put(x, (filt(noise(0.03), 2500, 9000) * np.exp(-T(0.03) / 0.002)) * 0.5, 0.0)                    # the spark tick
    x += 0.12 * filt(noise(d), 3000, 10000) * ease(t / w) * (1 - ease((t - w) / 0.08))               # gas hissing out
    tt = np.maximum(t - w, 0); on = t >= w
    whump = sine(135 * np.exp(-tt / 0.1) + 44) * np.exp(-tt / 0.22) * on
    fw = tvbp(noise(d, "pink"), 280 + 1100 * np.exp(-((tt - 0.07) / 0.1) ** 2), 1.0) * np.minimum(1, tt / 0.04) * np.exp(-tt / 0.3) * on
    burn = 0.25 * filt(noise(d, "pink"), 90, 900) * ease((t - w - 0.1) / 0.3) * (0.6 + 0.4 * slow(d, 10))   # it keeps burning
    return fade(soft(x + 1.1 * whump + 0.9 * fw + burn, 1.4), 0.002, 0.35)


@sound("flame_roar", rms=-15)
def s_flame_roar():
    d = 5.0; t = T(d); tb = slow(d, 12)
    base = filt(noise(d, "pink"), 80, 900) * (0.7 + 0.3 * tb)
    jet = 0.55 * reson(noise(d), 3300, 2.0) * (0.8 + 0.2 * slow(d, 25))                    # the sharp hiss of a blue flame
    throb = 0.9 * filt(noise(d, "brown"), 35, 115, n=3) * (0.7 + 0.3 * np.sin(PI2 * 11 * t))
    body = 0.25 * harm(88, [1, .5, .3], d) * (0.6 + 0.4 * slow(d, 6))
    return fade(base + jet + throb + body, 0.3, 0.8)


@sound("blade_whoosh", peak=-5)
def s_blade_whoosh():
    d = 2.7; x = np.zeros(int(d * SR)); at = 0.05; gap = 0.62; k = 0
    while at < d - 0.5:
        s, g = swoosh(0.5, 0.25, 0.075, 140, 1000 + 120 * k, q=1.6, drop=0.4)
        s = s + 1.3 * tvbp(noise(0.5, "brown"), 60 + 100 * g, 2) * g
        tt = T(0.5); tu = np.maximum(tt - 0.25, 0)
        push = 0.9 * sine(110 * np.exp(-tu / 0.05) + 52) * np.exp(-tu / 0.08) * (tt >= 0.25)        # our push on the blade
        metal = 0.1 * sum(a * sine(f, 0.5) * np.exp(-tu / tau) for f, tau, a in ((412, .18, 1), (1127, .1, .6), (1893, .06, .4))) * (tt >= 0.25)
        put(x, s + push + metal, at, 0.7 + 0.05 * k); at += gap; gap = max(0.2, gap * 0.8); k += 1
    return fade(x, 0.02, 0.2)


@sound("turbine_spool", rms=-16.5)
def s_turbine_spool():
    d = 5.0; t = T(d); p = ease(t / 4.0)
    f = 68 * np.exp(np.log(17) * p) * (1 + 0.003 * np.sin(PI2 * 9 * t))
    whine = harm(f, [1, .5, .33, .2, .12, .08]) * 0.5 + 0.18 * sine(f * 2.52) + 0.3 * harm(f / 2, [1, .4])
    air = tvbp(noise(d, "pink"), 350 + 3600 * p ** 1.5, 0.9) * (0.15 + 0.85 * p)
    low = 0.5 * filt(noise(d, "brown"), 35, 150) * (0.4 + 0.6 * p)
    x = filt(whine * (0.85 - 0.3 * p), None, 7000) + 0.45 * air + low
    return fade(x * (0.2 + 0.8 * p ** 0.8), 0.2, 0.5)


@sound("coil_spin", rms=-14)
def s_coil_spin():
    d = 4.0; t = T(d); p = t / d
    ph = np.cumsum(2.6 + 10 * p ** 1.4) / SR
    am = (0.5 + 0.5 * np.cos(PI2 * ph)) ** 2                                              # each sweep past a magnet
    car = harm(100 + 40 * p, [1, .7, .5, .35, .3, .15, .15, .08])
    sw = tvbp(noise(d, "pink"), 300 + 1500 * am, 1.6) * am
    hi = 0.05 * sine(1480 + 500 * p) * am
    return fade((car * 0.5 * (0.2 + 0.8 * am) + 0.7 * sw + hi + 0.3 * sine(50, d)) * (0.5 + 0.5 * p), 0.2, 0.4)


@sound("generator_hum", rms=-16)
def s_generator_hum():
    d = 5.0; t = T(d)
    x = _hum(d, 50, (1, .9, .7, .3, .35, .28, .14, .1, .1, .06, .05, .05)) * (0.78 + 0.22 * np.sin(PI2 * 4 * t))
    x += 1.1 * filt(saw(100, d, K=30, tilt=1.0), 250, 3000) * (0.7 + 0.3 * np.sin(PI2 * 4 * t + 2))
    x += 0.03 * (sine(1500, d) + sine(1503.5, d)) + 0.05 * filt(noise(d, "pink"), 300, 2500) * (0.5 + 0.5 * np.sin(PI2 * 4 * t + 1))
    x += 0.04 * ticks(d, 30, 3000, 8000, (0.0005, 0.0015))
    return fade(x, 0.5, 0.8)


@sound("spark", peak=-5)
def s_spark():
    d = 0.5; t = T(d)
    x = 1.2 * filt(noise(d), 1500, 12000) * np.exp(-t / 0.004)
    x += 0.6 * ticks(d, 16, 1800, 8000, (0.0008, 0.003), 0.5, when=lambda: 0.28 * R.uniform() ** 2)
    x += 0.3 * filt(saw(3100 * np.exp(-t / 0.06) + 800, K=8), None, 8000) * np.exp(-t / 0.05)
    x += 0.35 * filt(saw(100, d, K=30, tilt=.8), None, 2500) * np.exp(-t / 0.1) + 0.5 * sine(160, d) * np.exp(-t / 0.02)
    return fade(reverb(x, rt=0.35, wet=0.14)[:len(t)], 0.0003, 0.1)


@sound("cable_zip", peak=-6)
def s_cable_zip():
    d = 1.6; t = T(d); pk = 1.18; p = np.clip(t / pk, 0, 1)
    f = 170 * np.exp(np.log(11) * p ** 0.8) * (1 - 0.4 * sig((t - pk) / 0.03))
    buzz = filt(saw(f, K=16), None, 7000) * (0.6 + 0.4 * np.sign(np.sin(PI2 * 100 * t)))
    air = tvbp(noise(d), np.minimum(4 * f, 8500), 2.0)
    env = np.where(t < pk, p ** 2.2, np.exp(-(t - pk) / 0.11))
    x = (0.6 * buzz + 0.8 * air + 0.4 * sine(f / 2)) * env
    x += 0.25 * ticks(d, 30, 2500, 8000, (0.0006, 0.002), when=lambda: R.uniform(0.3, 1.3)) * env
    return fade(x, 0.05, 0.1)


@sound("lamp_click", peak=-7)
def s_lamp_click():
    d = 0.9; x = np.zeros(int(d * SR)); c = T(0.06)
    put(x, reson(noise(0.06), 1300, 2) * np.exp(-c / 0.004) * 1.2 + 0.4 * sine(420, 0.06) * np.exp(-c / 0.01), 0.0, 0.6)      # press
    put(x, filt(noise(0.06), 2000, 8000) * np.exp(-c / 0.0025) + 0.8 * sine(560, 0.06) * np.exp(-c / 0.012), 0.05)            # snap
    put(x, bell(2093, 0.4, tau=0.12), 0.07, 0.12)                                                                             # the bulb's tiny "tink"
    g = T(0.82); glow = sum(a * sine(f, 0.82) for f, a in ((261.6, .5), (523.3, 1), (659.3, .7), (784, .6), (1046.5, .25)))
    put(x, glow * ease(g / 0.18) * np.exp(-np.maximum(g - 0.18, 0) / 0.3), 0.07, 0.3)                                        # warm light blooming
    return fade(x, 0.0003, 0.15)


@sound("power_up", peak=-6)
def s_power_up():
    d = 1.9; t = T(d); x = np.zeros(len(t)); p = np.clip(t / 0.9, 0, 1)
    sw = tvlp(saw(110 * 2 ** (2 * p), K=20), 300 + 5000 * p ** 2) * p ** 1.5 * (1 - ease((t - 0.9) / 0.15))
    x += 0.5 * sw * (0.7 + 0.3 * np.sign(np.sin(PI2 * 100 * t)))
    ch = sum(g * bell(f, 1.0, tau=0.5) for f, g in ((440, .8), (554.4, .6), (659.3, .7), (880, .6), (1318.5, .3)))
    put(x, ch, 0.9, 0.7); put(x, 0.8 * sine(110, 0.5) * np.exp(-T(0.5) / 0.12), 0.9)
    return fade(reverb(x, rt=1.0, wet=0.22)[:len(t)], 0.01, 0.3)


@sound("sun_whoosh", peak=-7)
def s_sun_whoosh():
    d = 2.6; t = T(d)
    air, g = swoosh(d, 1.5, 0.3, 1400, 7000, q=1.2, color="white", drop=0.35, rise_slow=2.2)
    warm = 1.2 * tvbp(noise(d, "pink"), 180 + 420 * g, 1.5) * g
    sh = np.zeros(len(t))
    for f in (2093, 2349, 3136, 3520, 4186, 4699, 6272):                                  # the glitter of light
        sh += sine(f * (1 - 0.12 * sig((t - 1.5) / 0.06)) * (1 + 0.003 * np.sin(PI2 * R.uniform(4, 7) * t)), ph=R.uniform(0, 6)) * (0.5 + 0.5 * np.sin(PI2 * R.uniform(5, 11) * t))
    return fade(0.6 * air + warm + 0.22 * sh * g ** 1.3 + 0.1 * sine(220 * (1 - 0.2 * sig((t - 1.5) / 0.08))) * g ** 2, 0.2, 0.3)


@sound("space_warp", peak=-6)
def s_space_warp():
    d = 3.2; t = T(d); p = np.clip(t / 2.8, 0, 1); pos = 3.0 * p ** 1.7
    sh = np.zeros(len(t))
    for k in range(6):                                                                    # stacked octaves: it seems to rise for ever
        o = (k + pos) % 6; sh += sine(55 * 2 ** o) * np.exp(-((o - 3) / 1.25) ** 2)
    n = noise(d, "pink"); fl = n + vdelay(n, (0.5 + 7.5 * (1 - p) ** 2) * SR / 1000)      # a sweeping "jet" swirl
    wsh = tvbp(fl, 300 * np.exp(np.log(18) * p ** 1.4), 1.3)
    env = (0.05 + 0.95 * p ** 2) * (1 - ease((t - 2.8) / 0.12))
    x = (0.35 * sh + 0.7 * wsh) * env
    b = T(0.42); put(x, sine(70 * np.exp(-b / 0.2) + 40) * np.exp(-b / 0.12) * 0.9 + 0.3 * bell(1568, 0.42, 0.2), 2.78)   # the bloom at the end
    return fade(reverb(x, rt=0.8, wet=0.15)[:len(t)], 0.3, 0.2)


@sound("panel_hit", peak=-6)
def s_panel_hit():
    d = 1.6; t = T(d); x = np.zeros(len(t))
    x += 0.8 * sine(115 * np.exp(-t / 0.05) + 68) * np.exp(-t / 0.05)                     # the landing
    x += 0.5 * filt(noise(d), 4000, 14000) * np.exp(-t / 0.004) + 0.3 * sine(4186, d) * np.exp(-t / 0.03)
    notes = [1046.5, 1174.7, 1318.5, 1568, 1760, 2093, 2349.3, 2637, 3136]                # a rising glassy scale
    for i, f in enumerate(notes): put(x, bell(f, 0.9, tau=0.3, bright=0.8), 0.02 + 0.05 * i + R.uniform(0, .012), 0.22)
    x += 0.1 * filt(noise(d), 6000, 15000) * np.minimum(1, t / 0.02) * np.exp(-t / 0.35)
    return fade(reverb(x, rt=1.2, wet=0.3)[:len(t)], 0.0005, 0.4)


@sound("underwater", rms=-18)
def s_underwater():
    P = 8.0; n = int(P * SR); t = np.arange(n) / SR
    bed = filt(noise(P, "brown"), 28, 240, n=3) * (0.7 + 0.3 * np.sin(PI2 * t / 4))
    mur = 0.9 * filt(noise(P, "pink"), 180, 620) * (0.5 + 0.5 * np.sin(PI2 * t / 8 + 2)) ** 1.5
    drone = 0.3 * sine(48, P) + 0.15 * sine(72, P) + 0.08 * sine(144, P) * (0.5 + 0.5 * np.sin(PI2 * t / 8))
    bub = np.zeros(n)
    for at in (0.8, 3.1, 5.2, 6.9):                                                       # little runs of bubbles drifting up
        f0 = R.uniform(300, 520)
        for j in range(R.integers(3, 7)):
            put(bub, blip(f0 * (1 + 0.13 * j), R.uniform(.06, .11), rise=0.6), at + 0.13 * j + R.uniform(0, .04), R.uniform(.25, .5), wrap=True)
    for _ in range(10): put(bub, blip(R.uniform(250, 800), R.uniform(.05, .1), 0.5), R.uniform(0, P), R.uniform(.08, .2), wrap=True)
    core = filt(0.8 * bed + mur + drone + 1.9 * reverb(bub, rt=0.6, wet=0.5, hi=1500, circular=True), 25, 1500)
    return loopify(core, 1.0)


@sound("neutron_zip", peak=-7)
def s_neutron_zip():
    d = 0.7; t = T(d); pk = 0.45; p = np.clip(t / pk, 0, 1)
    f = 650 * 7 ** p * (1 - 0.45 * sig((t - pk) / 0.012)) * (1 + 0.02 * np.sin(PI2 * 65 * t))
    env = np.where(t < pk, p ** 3, np.exp(-(t - pk) / 0.07))
    x = (sine(f) + 0.3 * sine(2 * f) + 0.5 * tvbp(noise(d), np.minimum(2 * f, 9000), 5)) * env
    x += 0.5 * tvbp(noise(d, "pink"), 200 + 500 * env, 2) * env                           # a little weight as it passes
    return fade(x, 0.01, 0.08)


@sound("split_boom", peak=-3)
def s_split_boom():
    d = 3.2; t = T(d)
    crack = 0.8 * filt(noise(d), 900, 9000) * np.exp(-t / 0.008) + 0.3 * sine(2100, d) * np.exp(-t / 0.02)
    sub = sine(115 * np.exp(-t / 0.13) + 38) * np.exp(-t / 0.5) + 0.7 * sine(210 * np.exp(-t / 0.03) + 70) * np.exp(-t / 0.07)
    sw = np.minimum(1, (t / 0.9) ** 1.6) * np.exp(-np.maximum(t - 0.9, 0) / 0.8)           # the heat swelling up afterwards
    heat = tvbp(noise(d, "pink"), 220 + 1000 * sw, 0.9) * sw * (0.7 + 0.3 * slow(d, 10)) + 0.5 * filt(noise(d, "brown"), 40, 200) * sw + 0.5 * harm(60 + 50 * sw, [1, .6, .4, .3, .2]) * sw
    x = soft(crack + 1.1 * sub + 0.55 * heat, 1.5)
    for at, f0 in ((0.1, 3400), (0.19, 2700)):                                            # two new bits zipping away
        z = T(0.4); x_ = sine(f0 * np.exp(-z / 0.22) + 500) * np.exp(-z / 0.1) * np.minimum(1, z / 0.01); put(x, x_, at, 0.16)
    x += 0.06 * ticks(d, 40, 3000, 9000, (0.0005, 0.002), when=lambda: 0.05 + R.exponential(0.5)) * 1.0
    return fade(reverb(x, rt=1.2, wet=0.16, hi=3500)[:len(t)], 0.0005, 0.8)


@sound("thud", peak=-5)
def s_thud():
    d = 0.45; t = T(d)
    x = sine(125 * np.exp(-t / 0.05) + 52) * np.exp(-t / 0.075) + 0.6 * filt(noise(d, "pink"), 100, 600) * np.exp(-t / 0.03)
    x += 0.2 * filt(noise(d), 1500, 5000) * np.exp(-t / 0.004) + 2.0 * reson(noise(d, "pink"), 330, 2.5) * np.exp(-t / 0.045)
    return fade(soft(x, 1.6), 0.0005, 0.15)


# ---------- story and pacing ----------
@sound("riser", rms=-12)
def s_riser():
    d = 4.0; t = T(d); p = t / d
    ns = tvbp(noise(d), 280 * np.exp(np.log(26) * p), 2.0) * p ** 1.5
    f = 110 * 2 ** (2 * p ** 1.2)
    tn = tvlp(saw(f, K=16) + 0.7 * saw(f * 1.498, K=12) + 0.5 * saw(f * 2.003, K=8), 400 + 5000 * p ** 2)
    trem = 1 - (0.15 + 0.5 * p) * (0.5 + 0.5 * np.cos(PI2 * np.cumsum(4 + 16 * p ** 2) / SR))          # the flutter speeds up
    low = 0.3 * harm(55 + 20 * p, [1, .5, .3]) * p
    return fade((0.6 * ns + 0.6 * tn * trem * (0.1 + 0.9 * p ** 1.3) + low) * (0.05 + 0.95 * p ** 1.2), 0.3, 0.03)


@sound("reveal", peak=-9)
def s_reveal():
    d = 2.2; x = np.zeros(int(d * SR)); ch = (523.25, 659.25, 784, 1174.7)
    sw = sum(bell(f, 0.75, tau=0.25) for f in ch)[::-1] * 0.35                            # a bell played backwards swells in
    put(x, sw, 0); put(x, filt(noise(0.75), 3000, 11000) * (T(0.75) / 0.75) ** 3 * 0.06, 0)
    for f in ch: put(x, bell(f, 1.4, tau=0.6, bright=0.7), 0.75, 0.3); put(x, sine(f / 2, 1.4) * np.exp(-T(1.4) / 0.5), 0.75, 0.12)
    for _ in range(7): put(x, bell(R.choice([2093, 2349.3, 2637, 3136, 3520]), 0.5, tau=0.15), R.uniform(0.8, 1.5), 0.06)
    return fade(reverb(x, rt=1.6, wet=0.33)[:len(x)], 0.05, 0.5)


@sound("stinger", peak=-4)
def s_stinger():
    d = 1.6; t = T(d)
    x = 1.0 * sine(98 * np.exp(-t / 0.08) + 49) * np.exp(-t / 0.2)
    x += 0.28 * _chord([98, 146.8, 196, 293.7, 440, 587.3], d, 5, 0.45, K=10)              # open fifths: big, neither happy nor sad
    x += 0.3 * (bell(1174.7, d, 0.45) + 0.7 * bell(1760, d, 0.35))
    x += 0.4 * filt(noise(d), 1500, 9000) * np.exp(-t / 0.01)
    return fade(reverb(soft(x, 1.3), rt=1.3, wet=0.24)[:len(t)], 0.0005, 0.4)


@sound("sparkle", peak=-10)
def s_sparkle():
    d = 1.2; x = np.zeros(int(d * SR)); sc = [2093, 2349.3, 2637, 3136, 3520, 4186, 4698.6]
    for i in range(11): put(x, bell(sc[int(R.integers(0, len(sc)))], 0.45, tau=0.14, bright=0.7), 0.05 * i + R.uniform(0, .03), R.uniform(.5, 1))
    return fade(reverb(x, rt=0.9, wet=0.3)[:len(x)], 0.001, 0.3)


def _pad(P, voices, K=(1, .35, .12, .05)):
    """A seamless chord: every pitch and every wobble fits a whole number of times into P seconds."""
    n = int(P * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for f, a in voices:
        f = round(f * P) / P
        for det, g in ((0, 1), (max(1, round(f * 0.0016 * P)) / P, .6), (-max(1, round(f * 0.0022 * P)) / P, .6)):
            v = sum(h * np.sin(PI2 * k * (f + det) * t + R.uniform(0, 6.28)) for k, h in enumerate(K, 1))
            y += a * g * v * (0.72 + 0.28 * np.cos(PI2 * int(R.integers(1, 4)) * t / P + R.uniform(0, 6.28)))
    return y


@sound("pad_wonder", rms=-22)
def s_pad_wonder():
    P = 9.0; n = int(P * SR); t = np.arange(n) / SR
    x = _pad(P, [(130.81, 1), (196, .8), (261.63, .5), (329.63, .6), (392, .5), (493.88, .4), (587.33, .3)])   # C major with a 7th and a 9th: open, curious
    x *= 0.85 + 0.15 * np.cos(PI2 * t / P)
    bl = np.zeros(n)
    for at, f in ((0.6, 1318.5), (2.1, 987.8), (3.4, 1480), (5.0, 1174.7), (6.4, 1568), (7.7, 1318.5)):          # a few far-off bell notes
        put(bl, bell(f, 2.0, tau=0.7, bright=0.6), at, 0.36, wrap=True)
    air = 0.06 * filt(noise(P), 5000, 12000) * (0.5 + 0.5 * np.cos(PI2 * 2 * t / P))
    return loopify(reverb(x + bl + air, rt=2.0, wet=0.35, circular=True), 1.5)


@sound("pad_tension", rms=-22)
def s_pad_tension():
    P = 9.0; n = int(P * SR); t = np.arange(n) / SR
    x = _pad(P, [(73.42, .8), (110, .7), (146.83, .7), (174.61, .7), (220, .5), (329.63, .4)], K=(1, .5, .25, .12))   # D minor with a 9th
    x += 0.5 * _pad(P, [(233.08, .5)]) * (0.5 - 0.5 * np.cos(PI2 * t / P))                                             # a B flat that leans in and out
    hb = np.zeros(n); b = T(0.5); th = harm(62 * np.exp(-b / 0.08) + 44, [1, .5, .35, .2]) * np.exp(-b / 0.11)
    for k in range(12): put(hb, th, 0.75 * k, 1.0, wrap=True); put(hb, th, 0.75 * k + 0.21, 0.55, wrap=True)           # a slow heartbeat, 80 a minute
    hi = 0.05 * (np.sin(PI2 * 880 * t) + np.sin(PI2 * (880 + 3 / P) * t)) * (0.5 + 0.5 * np.sin(PI2 * 54 * t / P)) * (0.5 - 0.5 * np.cos(PI2 * 2 * t / P))
    return loopify(reverb(x + 1.4 * hb + hi, rt=1.8, wet=0.3, hi=4000, circular=True), 1.5)


# ---------- rendering, levels, report ----------
def render(name):
    global R
    fn, kind, level = SOUNDS[name]
    R = np.random.default_rng(zlib.crc32(name.encode()))
    x = np.asarray(fn(), dtype=float)
    x = x - x.mean()
    x = fade(x, 0.0004, 0.008)                                   # no clicks at either end, whatever the sound did
    if kind == "peak": x *= 10 ** (level / 20) / np.abs(x).max()
    else:
        x *= 10 ** (level / 20) / loud(x)
        pk = np.abs(x).max(); top = 10 ** (-3 / 20)
        if pk > top: x = np.tanh(x / pk * 1.2) / np.tanh(1.2) * top     # tame the odd spike in a long sound
    return x


def loud(x, win=0.4):
    """The loudest 0.4 s stretch (RMS)."""
    w = min(int(win * SR), len(x)); c = np.concatenate([[0], np.cumsum(x ** 2)])
    return np.sqrt(((c[w:] - c[:-w]) / w).max())


def report(name, x):
    X = np.abs(np.fft.rfft(x)) ** 2; f = np.fft.rfftfreq(len(x), 1 / SR); tot = X.sum() + 1e-20
    band = lambda a, b: 100 * X[(f >= a) & (f < b)].sum() / tot
    cen = (X * f).sum() / tot
    return f"{name:14s} {len(x) / SR:5.2f} s  peak {db(np.abs(x).max()):6.1f} dB  loud {db(loud(x)):6.1f} dB  sub {band(0, 120):3.0f}%  body {band(120, 2000):3.0f}%  air {band(2000, 22050):3.0f}%  centre {cen:5.0f} Hz"


if __name__ == "__main__":
    args = sys.argv[1:]; rep = "--report" in args; samp = None
    if "--sampler" in args: samp = args[args.index("--sampler") + 1]; args.remove(samp)
    names = [a for a in args if not a.startswith("--")] or list(SOUNDS)
    missing = [n for n in SOUNDS if f"\n  {n} " not in __doc__]
    if missing: print("NOT IN THE HEADER LIST:", missing)
    os.makedirs(OUT, exist_ok=True); parts = []; at = 0.5
    for nm in names:
        x = render(nm); sf.write(os.path.join(OUT, nm + ".wav"), x, SR, subtype="PCM_16")
        if rep: print(report(nm, x))
        if samp: print(f"  {at:7.2f} s  {nm}"); parts += [np.zeros(SR // 2), x]; at += len(x) / SR + 0.5
    if samp:
        os.makedirs(os.path.dirname(os.path.abspath(samp)), exist_ok=True)
        sf.write(samp, np.concatenate(parts + [np.zeros(SR // 2)]), SR, subtype="PCM_16")
    print(f"{len(names)} sounds in {OUT}")
