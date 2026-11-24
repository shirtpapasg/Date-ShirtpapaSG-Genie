"""make_voice.py: every line of promo films 1-3 (lines_film<N>.json) recorded again -> voice/f<N>_<k>.wav (48 kHz mono).
  /home/user/heart-tts/venv/bin/python make_voice.py [1 2 3]
The teacher (24 Nov 2026): "use the original voice and overhaul the voice for the pet buddies". The engine is promo film 4's
(../film4/make_voice.py = explained2/ep20/make_voice.py), copied unchanged: heart(), buddy(), stretch(), phrase_set(), unison():
Heart   = Kokoro af_heart, the episodes' recipe (pitch swing x1.6, -21.7 dB) at film 4's promo pace (speed .95, .4 s between sentences).
Buddies = the Character Voice Kit voices (voice_maker.CHARACTERS, -18 dB RMS), 12% slower, as the episodes.
Group   = "Pip, Momo and Basil": the three buddies, each stretched to one length (film 4's unison()), offset 0 / 25 / 50 ms.
Every text goes through ../../explained2/sg_pron.py; "TheOneApp" is read "The One App". Existing files are kept unless the text changed."""
import os, sys, json, re, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
H = os.path.dirname(os.path.abspath(__file__)); E2 = os.path.join(H, "..", "..", "explained2"); SPR = os.path.join(E2, "characters", "sprites")
sys.path.insert(0, SPR); sys.path.insert(0, E2)
import voice_maker as vm
D = "/home/user/heart-tts"; SR = 24000; V = f"{H}/voice"; os.makedirs(V, exist_ok=True)
from sg_pron import needs_fix, speak_line
class _FixK:
    def __init__(self, k): self.k = k
    def create(self, text, voice="af_heart", speed=1.0, lang="en-us", **kw):
        if not kw.get("is_phonemes") and needs_fix(text): return speak_line(self.k, text, voice=voice, speed=speed, lang=lang)
        return self.k.create(text, voice=voice, speed=speed, lang=lang, **kw)
    def __getattr__(self, n): return getattr(self.k, n)
_k = None
def K():
    global _k
    if _k is None: _k = _FixK(vm.load(D + "/kokoro.onnx", D + "/voices.bin"))
    return _k
sents = lambda t: [p for p in re.split(r"(?<=[.!?])\s+", t) if p.strip()]
PRON = {"TheOneApp": "The One App"}
def pron(t):
    for a, b in PRON.items(): t = t.replace(a, b)
    return t
def up48(x, sr):
    if sr == 48000: return x
    n = int(len(x) * 48000 / sr); X = np.fft.rfft(x); Y = np.zeros(n // 2 + 1, complex); m = min(len(X), len(Y)); Y[:m] = X[:m]
    return np.fft.irfft(Y, n) * (n / len(x))

def heart(text, excited=False, gap=.5, spd=.90, terms=(), soft=False):
    speed, swing, shift, gain = (1.02, 2.2, 2 ** (3 / 12), 3.0) if excited else (spd, 1.6, 1.0, -2.5 if soft else 0.0); parts = []
    for p in sents(pron(text)):
        has = any(tm.lower() in p.lower() for tm in terms)
        a, sr = K().create(p, voice="af_heart", speed=speed * (.93 if has else 1), lang="en-us"); x = a.astype(np.float64)
        snd = parselmouth.Sound(x, SR); m = call(snd, "To Manipulation", 0.01, 120, 500); pt = call(m, "Extract pitch tier")
        med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), "Get quantile", 0, 0, 0.5, "Hertz")
        call(pt, "Formula", f"{med * shift} * 2 ^ ({swing} * log2(self / {med}))"); call([pt, m], "Replace pitch tier")
        x = call(m, "Get resynthesis (overlap-add)").values[0]
        idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 240]
        parts += [x, np.zeros(int(SR * (max(gap, .65) if has else gap)))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
    return np.clip(x * (10 ** ((-21.7 + gain) / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98), SR

def buddy(who, text, gap=.16):
    c = dict(vm.CHARACTERS[who]); c["speed"] = c["speed"] * .88   # EP6/EP8: about 12% slower than default (teacher, 20 Nov)
    x, sr = vm.speak(K(), pron(text), c, gap=gap + .06, para_gap=0)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98), sr

def stretch(x, sr, dur):
    snd = parselmouth.Sound(x, sr); f = dur / (len(x) / sr)
    return call(snd, "Lengthen (overlap-add)", 75, 600, f).values[0] if abs(f - 1) > .02 else x

def phrase_set(texts, cap=None):
    raw = {}
    for who in ("pip", "basil", "momo"):
        raw[who] = []
        for ph in texts:
            x, sr = buddy(who, ph); idx = np.where(np.abs(x) > .02)[0]; raw[who].append(x[idx[0]: idx[-1] + 600])
    durs = [min((cap[i] if isinstance(cap, list) else cap) or (1.42 if len(texts) > 1 else 9), float(np.median([len(raw[w][i]) / SR for w in raw]))) for i in range(len(texts))]
    return {w: [stretch(x, SR, durs[i]) for i, x in enumerate(raw[w])] for w in raw}, durs

def group(text):
    """film 4's unison(): the three buddies, one length; here each a little behind the last (0 / 25 / 50 ms), summed x.62."""
    ph, durs = phrase_set([text]); n = int((durs[0] + .3) * SR); mix = np.zeros(n)
    for k, w in enumerate(("pip", "momo", "basil")):
        z = ph[w][0]; o = 480 + int(.025 * k * SR); z = z[:n - o]; mix[o: o + len(z)] += z
    return np.clip(mix * .62, -.98, .98), SR

def say(text):
    """the caption's words as spoken: a leading "..." dropped, a word in capitals ("YES!") said as a word, not spelt out"""
    t = re.sub(r"^\.+\s*", "", text.strip())
    return re.sub(r"\b[A-Z]{2,}\b", lambda m: m.group(0).capitalize(), t)

WHO = {"Heart": "heart", "Pip": "pip", "Momo": "momo", "Basil": "basil", "Pip, Momo and Basil": "group"}
if __name__ == "__main__":
    for f in (sys.argv[1:] or ["1", "2", "3"]):
        L = json.load(open(f"{H}/lines_film{f}.json"))
        for k, ln in enumerate(L["lines"]):
            id = f"f{f}_{k:02d}"; wav = f"{V}/{id}.wav"; meta = f"{V}/{id}.txt"; key = ln["speaker"] + "|" + ln["text"]
            if os.path.exists(wav) and os.path.exists(meta) and open(meta).read() == key: continue
            who = WHO[ln["speaker"]]
            if who == "heart": x, sr = heart(say(ln["text"]), False, .4, .95)
            elif who == "group": x, sr = group(say(ln["text"]))
            else: x, sr = buddy(who, say(ln["text"]))
            x = up48(np.asarray(x, np.float64), sr); sf.write(wav, x.astype(np.float32), 48000, subtype="PCM_16"); open(meta, "w").write(key)
            print(id, ln["speaker"], round(len(x) / 48000, 2), "s  (slot", round(ln["end"] - ln["start"], 2), ")", ln["text"], flush=True)
