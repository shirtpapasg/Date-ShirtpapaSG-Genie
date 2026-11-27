"""make_music.py OUT.wav SECONDS END_HIT: "Buddy Bounce", an original upbeat loop for the promo (never Kampong Walk).
Built on the vault's music composer (secondbrain/tools/kits/relax-music-composer.py: its rhodes, pad, bass, soft kick and brush
voices), sped up to 120 bpm in C major (I-V-vi-IV) with a mallet tune, hand claps and hi-hats added here. The tune ends on a
big final chord at END_HIT seconds (the end card) and rings out. 48 kHz stereo WAV."""
import sys, numpy as np, soundfile as sf
src = open("/home/user/secondbrain/tools/kits/relax-music-composer.py").read().split("D = sys.argv[1]")[0]
K = {}; exec(src, K)                       # the composer's instrument voices (no renders run)
SR = K["SR"]; hz = K["hz"]; rhodes = K["rhodes"]; pad = K["pad"]; bass = K["bass"]; kick = K["soft_kick"]; brush = K["brush"]
rng = np.random.default_rng(7)
OUT, DUR, HIT = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
BPM = 120; B = 60 / BPM; BAR = 4 * B

def mallet(m, d, v):                        # marimba-ish: fundamental + 4th partial, quick decay
    n = int(d * SR); t = np.arange(n) / SR; f = hz(m)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 7) + .35 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 22) + .12 * np.sin(2 * np.pi * 10 * f * t) * np.exp(-t * 40)
    return v * s * np.minimum(1, t / .002)
def glock(m, d, v):
    n = int(d * SR); t = np.arange(n) / SR; f = hz(m)
    return v * (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 6)) * np.exp(-t * 3.2) * np.minimum(1, t / .002)
def clap(v):
    n = int(.22 * SR); t = np.arange(n) / SR; s = rng.standard_normal(n); s = np.diff(s, prepend=0); s = np.diff(s, prepend=0) * .5
    env = sum(np.exp(-np.maximum(0, t - o) * 60) * (t >= o) for o in (0, .011, .023)) / 2 + np.exp(-t * 18) * .6
    return v * s * env
def hat(v, open_=False):
    n = int((.25 if open_ else .06) * SR); t = np.arange(n) / SR; s = rng.standard_normal(n); s = np.diff(np.diff(s, prepend=0), prepend=0) * .3
    return v * s * np.exp(-t * (14 if open_ else 70))
def crash(v):
    n = int(2.6 * SR); t = np.arange(n) / SR; s = rng.standard_normal(n); s = np.diff(s, prepend=0)
    return v * s * np.exp(-t * 1.6) * np.minimum(1, t / .004)

PROG = [(36, [60, 64, 67]), (35, [59, 62, 67]), (33, [57, 60, 64]), (29, [57, 60, 65])]       # C  G/B  Am  F
TUNE = [[(0, 76), (.5, 79), (1, 81), (1.5, 79), (2, 76), (3, 72)], [(0, 74), (.5, 76), (1, 79), (2, 71), (3, 74)],
        [(0, 72), (.5, 76), (1, 81), (1.5, 79), (2, 76), (3, 79)], [(0, 81), (.5, 79), (1, 77), (1.5, 76), (2, 74), (3, 79)]]
TUNE2 = [[(0, 84), (1, 83), (1.5, 81), (2, 79), (3, 76)], [(0, 79), (.5, 81), (1, 83), (2, 86), (3, 83)],
         [(0, 84), (.5, 83), (1, 81), (2, 76), (2.5, 79), (3, 81)], [(0, 81), (.5, 79), (1, 77), (1.5, 76), (2, 77), (2.5, 79), (3, 79)]]
L = int((HIT + 3.2) * SR); buf = np.zeros((L, 2))
def add(sig, t, pan=0.):
    i = int(t * SR)
    if i >= L or t < 0: return
    n = min(len(sig), L - i); buf[i:i + n, 0] += sig[:n] * (1 - pan); buf[i:i + n, 1] += sig[:n] * (1 + pan)
nb = int(np.ceil(HIT / BAR)); t0 = HIT - nb * BAR          # bars run up to the hit, so the hit lands on a downbeat
for b in range(nb):
    T = t0 + b * BAR; root, ch = PROG[b % 4]; intro = b == 0; tune = (TUNE if (b // 4) % 2 == 0 else TUNE2)[b % 4]
    add(pad([m - 12 for m in ch], BAR + 1.2, .05), T)
    for q in range(8):                                   # bouncy bass: root, root, octave, root ...
        m = root + (12 if q in (2, 6) else 0) + (7 if q == 5 else 0); add(bass(m, B * .45, .26), T + q * B / 2)
    for q in (1, 3):                                     # off-beat mallet chords
        for k, m in enumerate(ch): add(mallet(m, .5, .07), T + (q + .5) * B + k * .008, pan=(k - 1) * .3)
    if not intro:
        for q in range(4): add(kick(.34), T + q * B)
        for q in (1, 3): add(clap(.11), T + q * B, pan=.1)
        for q in range(8): add(hat(.05 if q % 2 else .03, open_=(q == 7)), T + q * B / 2, pan=-.3)
        for bt, m in tune: add(mallet(m, .9, .16), T + bt * B, pan=-.15); add(glock(m + 12, .8, .03), T + bt * B, pan=.25)
    else:
        for bt, m in TUNE[3][:4]: add(mallet(m, .6, .1), T + bt * B)
    if b == nb - 1:                                      # a drum fill into the hit
        for k in range(4): add(clap(.07 + .02 * k), T + 3 * B + k * B / 4)
# the final hit: C major, everything together
for m in (48, 60, 64, 67, 72, 76, 79, 84): add(mallet(m, 2.8, .09), HIT); add(glock(m + 12, 2.5, .015), HIT)
add(pad([48, 55, 60, 64], 3.0, .09), HIT); add(bass(36, 2.6, .35), HIT); add(kick(.45), HIT); add(crash(.06), HIT)
# a light room, as the composer does
irn = int(1.2 * SR); t = np.arange(irn) / SR; ir = rng.standard_normal((irn, 2)) * np.exp(-t / .35)[:, None] * .012; ir[0] = 1
wet = np.stack([np.fft.irfft(np.fft.rfft(buf[:, c], L + irn) * np.fft.rfft(ir[:, c], L + irn))[:L] for c in (0, 1)], 1)
mix = .8 * buf + .2 * wet; mix = np.tanh(mix * 1.1) / 1.1
fade = np.ones(L); e = int((HIT + 3.0) * SR); fade[e:] = 0; ft = int(HIT * SR) + int(1.6 * SR); fade[ft:e] = np.linspace(1, 0, e - ft)
mix *= fade[:, None]; mix /= np.abs(mix).max() * 1.12
mix = mix[:int(DUR * SR)] if DUR * SR < L else np.vstack([mix, np.zeros((int(DUR * SR) - L, 2))])
y = np.stack([np.interp(np.arange(int(len(mix) * 48000 / SR)) * SR / 48000, np.arange(len(mix)), mix[:, c]) for c in (0, 1)], 1)
sf.write(OUT, y.astype(np.float32), 48000, subtype="FLOAT"); print(OUT, round(len(y) / 48000, 2), "s, hit at", HIT, "bars", nb)
