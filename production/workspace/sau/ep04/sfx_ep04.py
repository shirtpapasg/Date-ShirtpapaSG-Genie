"""sfx_ep04.py: four extra sounds for EP04, made with the building blocks of sfx_lib.py (which this file does not change).
    /home/user/heart-tts/venv/bin/python ep04/sfx_ep04.py      writes sfx/thunder.wav, sfx/jiggle.wav, sfx/sea_wash.wav, sfx/drip.wav
build_tl.py plays sfx/<name>.wav when it exists, so run this once before build_tl.py on a fresh checkout (the wav files are not in git).
  thunder   5.0 s  a crack, then a long roll that dies away (the cold open, the fall)
  jiggle    3.4 s  a rattle that gets faster and higher, then stops dead: molecules jiggling faster as they warm up (not boiling: no bubbles)
  sea_wash  5.0 s  two slow waves washing in and out
  drip      0.3 s  one drop of water landing
"""
import os, sys
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
import sfx_lib as L
from sfx_lib import T, noise, filt, reson, sine, fade, reverb, soft, put, blip, slow, sound, SR

@sound("thunder", rms=-13)
def s_thunder():
    d = 5.0; t = T(d)
    crack = 0.9 * filt(noise(d), 500, 5000) * np.exp(-t / 0.05) + 0.5 * filt(noise(d), 900, 7000) * np.exp(-np.maximum(t - .09, 0) / 0.03) * (t > .09)
    roll = filt(noise(d, "brown"), 30, 420) * np.minimum(1, t / .05) * np.exp(-t / 1.7) * (0.45 + 0.55 * slow(d, 5))
    body = 0.9 * (reson(noise(d, "pink"), 210, 1.5) + 0.6 * reson(noise(d, "pink"), 420, 1.5)) * np.exp(-t / 1.1) * (0.4 + 0.6 * slow(d, 7))   # heard on a phone
    x = crack + 1.4 * roll + body
    for at, g in ((0.55, .7), (1.2, .5), (2.1, .35)):                         # the roll comes back in waves
        n = int((d - at) * SR); tt = np.arange(n) / SR
        put(x, (filt(noise(d - at, "brown"), 35, 300) + .6 * reson(noise(d - at, "pink"), 240, 1.5)) * np.minimum(1, tt / .08) * np.exp(-tt / .7), at, g)
    return fade(reverb(soft(x, 1.6), rt=1.6, wet=0.3, hi=2500)[:len(t)], 0.001, 1.5)

@sound("jiggle", rms=-19)
def s_jiggle():
    d = 3.4; n = int(d * SR); x = np.zeros(n); at = 0.0; k = 0
    while at < d - .05:
        p = at / d; f = 380 * (1 + 2.6 * p * p) * L.R.uniform(.92, 1.08)
        put(x, blip(f, 0.05, 0.25, 0.012), at, 0.35 + 0.65 * p); at += 0.16 * (1 - 0.86 * p) * L.R.uniform(.85, 1.15); k += 1
    t = T(d); shimmer = 0.25 * filt(noise(d, "pink"), 2500, 7000) * (t / d) ** 3
    return fade(x + shimmer[:n], 0.01, 0.004)

@sound("sea_wash", rms=-21)
def s_sea_wash():
    d = 5.0; t = T(d); env = 0.25 + 0.75 * np.sin(np.pi * ((t / 2.5) % 1)) ** 2
    x = filt(noise(d, "pink"), 250, 5000) * env + 0.5 * filt(noise(d, "brown"), 60, 400) * env
    return fade(x, 0.5, 0.9)

@sound("drip", peak=-9)
def s_drip():
    d = 0.3; x = np.zeros(int(d * SR)); put(x, blip(1250, 0.07, 0.9), 0.0, 1.0); put(x, blip(820, 0.12, 0.5), 0.045, 0.6)
    return fade(reverb(x, rt=0.3, wet=0.2)[:len(x)], 0.001, 0.08)

if __name__ == "__main__":
    for nm in ("thunder", "jiggle", "sea_wash", "drip"):
        x = L.render(nm); sf.write(os.path.join(L.OUT, nm + ".wav"), x, SR, subtype="PCM_16"); print(nm, round(len(x) / SR, 2), "s")
