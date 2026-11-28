"""make_voice.py: every spoken line of promo film 4 -> voice/<id>.wav (48 kHz mono) + voice/<id>.json (word times, mouth track).
  /home/user/heart-tts/venv/bin/python make_voice.py
The engine is the "TheOneApp, Explained" one (explained2/ep20/make_voice.py, copied unchanged: heart(), buddy(), unison(), align()):
Heart  = Kokoro af_heart, the episodes' recipe (pitch swing x1.6, -21.7 dB) at a promo pace (speed .95, .4 s between sentences).
Buddies = the Character Voice Kit voices (voice_maker.CHARACTERS, -18 dB RMS), 12% slower, as the episodes.
Trio   = the three buddies together ("We need a scientist. We need you."), stretched to one length (the episodes' unison()).
Every Heart and buddy text goes through ../../explained2/sg_pron.py. Existing files are kept; a changed line is recorded again."""
import os, sys, json, re, wave, subprocess, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
H = os.path.dirname(os.path.abspath(__file__)); E2 = os.path.join(H, "..", "..", "explained2"); SPR = os.path.join(E2, "characters", "sprites")
sys.path.insert(0, SPR); sys.path.insert(0, H); sys.path.insert(0, E2)
import voice_maker as vm, talk_voice as tv
from script import LINES, PRON
import pocketsphinx
from pocketsphinx import Decoder
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
LINE_PRON = {}
def pron(t):
    for a, b in list(PRON.items()) + list(LINE_PRON.items()): t = t.replace(a, b)
    return t
def up48(x, sr):
    if sr == 48000: return x
    n = int(len(x) * 48000 / sr); X = np.fft.rfft(x); Y = np.zeros(n // 2 + 1, complex); m = min(len(X), len(Y)); Y[:m] = X[:m]
    return np.fft.irfft(Y, n) * (n / len(x))

def heart(text, excited=False, gap=.5, spd=.90, terms=(), soft=False):
    """EP6/EP8 (teacher, 20 Nov: 5% slower): speed .90, .5 s between sentences. A sentence that says a NEW TERM is said a little slower
    (x.93) and is followed by at least .65 s, so the term can land. soft: the journeys, 2.5 dB quieter."""
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

def buddy(who, text, gap=.16, pace=1.0):   # pace: x speed for one line (film 4 p01, a quick aside)   # gap: silence between sentences (a Mark Sentence card with two sentences: script opts "gap")
    c = dict(vm.CHARACTERS[who]); c["speed"] = c["speed"] * .88 * pace   # EP6/EP8: about 12% slower than default (teacher, 20 Nov)
    x, sr = vm.speak(K(), pron(text), c, gap=gap + .06, para_gap=0)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98), sr

def stretch(x, sr, dur):
    snd = parselmouth.Sound(x, sr); f = dur / (len(x) / sr)
    return call(snd, "Lengthen (overlap-add)", 75, 600, f).values[0] if abs(f - 1) > .02 else x

def phrase_set(texts, cap=None):
    """each buddy says each text; every text is stretched to one length so the three land together. -> {who: [audio]}, durations"""
    raw = {}
    for who in ("pip", "basil", "momo"):
        raw[who] = []
        for ph in texts:
            x, sr = buddy(who, ph); idx = np.where(np.abs(x) > .02)[0]; raw[who].append(x[idx[0]: idx[-1] + 600])
    durs = [min((cap[i] if isinstance(cap, list) else cap) or (1.42 if len(texts) > 1 else 9), float(np.median([len(raw[w][i]) / SR for w in raw]))) for i in range(len(texts))]
    return {w: [stretch(x, SR, durs[i]) for i, x in enumerate(raw[w])] for w in raw}, durs
def write_group(id, tracks, n, words, extra):
    for who, y in tracks.items(): sf.write(f"{V}/{id}_{who}.wav", up48(y[:n], SR).astype(np.float32), 48000, subtype="PCM_16")
    mix = sum(sf.read(f"{V}/{id}_{w}.wav")[0] for w in ("pip", "basil", "momo")) * .62
    sf.write(f"{V}/{id}.wav", np.clip(mix, -.98, .98).astype(np.float32), 48000, subtype="PCM_16")
    out = {"who": "chant", "dur": round(len(mix) / 48000, 3), "fps": 30, "tracks": {}, "words": words, **extra}
    for w in ("pip", "basil", "momo"):
        x, sr = sf.read(f"{V}/{id}_{w}.wav"); op, lv = tv.envelope(x, sr); out["tracks"][w] = tv.mouth_track(tv.level(x, sr, op))
    json.dump(out, open(f"{V}/{id}.json", "w")); print(id, out["dur"], flush=True)
def unison(id, text):
    ph, durs = phrase_set([text]); n = int((durs[0] + .25) * SR); tracks = {}
    for w in ph: y = np.zeros(n); z = ph[w][0][:n - 480]; y[480: 480 + len(z)] = z; tracks[w] = y
    ws = text.split(); words = [{"w": wd, "a": round(.01 + j * durs[0] / len(ws), 3), "b": round(.01 + (j + 1) * durs[0] / len(ws), 3)} for j, wd in enumerate(ws)]
    write_group(id, tracks, n, words, {"text": text, "len": durs[0] + .1})

dic = set(l.split()[0].split("(")[0] for l in open(os.path.join(pocketsphinx.get_model_path(), "en-us", "cmudict-en-us.dict")))
EXTRA = {"bobs": "B AA B Z", "fragyle": "F R AE JH AY L", "letterboxes": "L EH T ER B AA K S AH Z", "ice-cream": "AY S K R IY M", "caterpillar": "K AE T ER P IH L ER", "t-shirt": "T IY SH ER T", "ice-cream": "AY S K R IY M", "aluminium": "AE L Y UW M IH N IY AH M", "kiln": "K IH L N", "ooze": "UW Z", "mould": "M OW L D", "fungi": "F AH N JH AY", "you'll": "Y UW L", "i'm": "AY M", "milks": "M IH L K S", "biscuits": "B IH S K AH T S", "noodle": "N UW D AH L", "ceramic": "S ER AE M IH K", "metals": "M EH T AH L Z", "materials": "M AH T IH R IY AH L Z", "mudskipper": "M AH D S K IH P ER", "mudskippers": "M AH D S K IH P ER Z", "warm-up": "W AO R M AH P", "non-living": "N AA N L IH V IH NG", "wind-up": "W AY N D AH P", "taogay": "T AW G EY", "cheechahk": "CH IY CH AA K", "mealworm": "M IY L W ER M",
         "lock-in": "L AA K IH N", "pe": "P IY IY", "windscreen": "W IH N D S K R IY N", "oh-pake": "OW P EY K", "mcaw": "M AH K AO", "koi": "K OY", "dragonfly": "D R AE G AH N F L AY", "goldfish": "G OW L D F IH SH", "eco-garden": "IY K OW G AA R D AH N", "it's": "IH T S", "let's": "L EH T S", "that's": "DH AE T S", "isn't": "IH Z AH N T", "momo": "M OW M OW", "pip": "P IH P",
         "aww": "AA", "recycling": "R IY S AY K L IH NG", "organiser": "AO R G AH N AY Z ER", "showdown": "SH OW D AW N", "papaya": "P AH P AY AH",
         "toa": "T OW AH", "payoh": "P AA Y OW", "mynah": "M AY N AH", "dit": "D IH T", "wines": "W AY N Z", "squish": "S K W IH SH", "buddies": "B AH D IY Z",
         "classify": "K L AE S AH F AY", "twenty-five": "T W EH N T IY F AY V", "today's": "T AH D EY Z", "sprouts": "S P R AW T S", "diversity": "D AY V ER S AH T IY", "similarities": "S IH M AH L EH R AH T IY Z", "thirty-one": "TH ER T IY W AH N", "thirty-two": "TH ER T IY T UW", "check-out": "CH EH K AW T", "pip's": "P IH P S", "plant's": "P L AE N T S", "wilting": "W IH L T IH NG", "snug": "S N AH G", "biscuit": "B IH S K AH T", "oats": "OW T S", "whoa": "W OW", "cupboard": "K AH B ER D", "kranji": "K R AA N JH IY", "touch-me-not": "T AH CH M IY N AA T", "twenty-one": "T W EH N T IY W AH N", "rematch": "R IY M AE CH", "prickles": "P R IH K AH L Z", "droops": "D R UW P S", "spores": "S P AO R Z", "reproduces": "R IY P R AH D UW S AH Z", "reproducing": "R IY P R AH D UW S IH NG", "mimosa": "M IH M OW S AH", "eyelids": "AY L IH D Z", "kittens": "K IH T AH N Z", "basil": "B AE Z AH L", "yay": "Y EY", "hatches": "HH AE CH AH Z", "inwards": "IH N W ER D Z", "responding": "R IH S P AA N D IH NG", "responded": "R IH S P AA N D AH D", "non-living": "N AA N L IH V IH NG", "mrt": "EH M AA R T IY", "pyjamas": "P AH JH AA M AH Z", "pyjama": "P AH JH AA M AH", "chinchillas": "CH IH N CH IH L AH Z", "momo's": "M OW M OW Z", "beetle's": "B IY T AH L Z", "flower-pot": "F L AW ER P AA T", "pupae": "P Y UW P IY", "wriggler": "R IH G L ER", "wrigglers": "R IH G L ER Z", "wriggles": "R IH G AH L Z",
         "basil's": "B AE Z AH L Z", "mid-air": "M IH D EH R", "non-magnetic": "N AA N M AE G N EH T IH K", "rinsed": "R IH N S T", "u-shaped": "Y UW SH EY P T",
         "pip's": "P IH P S", "lizard's": "L IH Z ER D Z", "magnet's": "M AE G N AH T S", "stationery": "S T EY SH AH N EH R IY", "underneath": "AH N D ER N IY TH"}
def align(text, wav):
    toks = text.split(); ptoks = pron(text).split()
    spoken = []
    k = 0
    # the spoken (re-spelt) words, each pointing back at a token of the script text: walk both lists by position where they match in length
    if len(ptoks) == len(toks): pairs = list(enumerate(ptoks))
    else: pairs = None
    x, sr = sf.read(wav); Dn = len(x) / sr; al = []
    if pairs is not None:
        spoken = [(i, w) for i, t in pairs for w in re.findall(r"[a-z0-9'][a-z0-9'\-]*[a-z0-9]|[a-z0-9]", t.lower())]   # digits kept (film 4: "100", EXTRA)
        spoken = [(i, "fragyle" if w == "fragile" else w) for i, w in spoken]   # align "fragile" to the FRAJ-ile sound sg_pron makes (the dictionary has FRAJ-uhl)
        w16 = wav[:-4] + "_16k.wav"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", w16], check=True)
        try:
            d = Decoder(samprate=16000, loglevel="FATAL")
            for w in set(w for _, w in spoken if w not in dic):
                if w in EXTRA: d.add_word(w, EXTRA[w], True)
                else: print("   no pronunciation for", w)
            d.set_align_text(" ".join(w for _, w in spoken))
            data = wave.open(w16, "rb"); raw = data.readframes(data.getnframes())
            d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
            al = [(s.word, s.start_frame / 100, (s.end_frame + 1) / 100) for s in d.seg() if s.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
        except Exception as e: print("   align error", e)
        if len(al) != len(spoken):   # EP20: one retry with .3 s of silence before and after (a one-word line, "Attraction.", failed without it)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-af", "adelay=300|300,apad=pad_dur=0.3", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", w16], check=True)
            try:
                d = Decoder(samprate=16000, loglevel="FATAL")
                for w in set(w for _, w in spoken if w not in dic):
                    if w in EXTRA: d.add_word(w, EXTRA[w], True)
                d.set_align_text(" ".join(w for _, w in spoken))
                data = wave.open(w16, "rb"); raw = data.readframes(data.getnframes())
                d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
                al2 = [(s.word, max(0, s.start_frame / 100 - .3), min(Dn, (s.end_frame + 1) / 100 - .3)) for s in d.seg() if s.word not in ("<s>", "</s>", "<sil>", "(NULL)")]
                if len(al2) == len(spoken) or len(al2) > len(al): al = al2
            except Exception as e: print("   align retry error", e)
        os.remove(w16)
    if pairs is not None and al and 2 <= len(al) < len(spoken) and all(re.sub(r"\(\d+\)$", "", a[0]) == w for a, (_, w) in zip(al, spoken)):
        # EP20: the aligner stopped early (Momo's high voice: "...not in the middle!" ended on "the"). Keep the words it found; the last one
        # it found and the missing ones share that last span by their length. Reported as PARTIAL in voice.log (word times only: the mouth
        # track comes from the audio itself).
        k = len(al) - 1; a0, b0 = al[k][1], al[k][2]; rest = spoken[k:]; tot = sum(len(w) + 1 for _, w in rest); c = a0; al = al[:k]
        for _, w in rest: L_ = (b0 - a0) * (len(w) + 1) / tot; al.append((w, round(c, 3), round(c + L_, 3))); c += L_
        print("   PARTIAL alignment: the last", len(rest), "words spread over the last span")
    tw = {}
    if pairs is not None and al and len(al) == len(spoken):
        for (ti, _), (_, a, b) in zip(spoken, al):
            if ti not in tw: tw[ti] = [a, b]
            else: tw[ti][1] = b
        ok = True
    else:
        # by sentence: silences between sentences are long, so find them and spread each sentence's words inside its own span
        ok = False; tot = sum(len(t) + 2 for t in toks); c = 0.05
        for i, t in enumerate(toks): L = (Dn - .1) * (len(t) + 2) / tot; tw[i] = [c, c + L * .85]; c += L
    last = 0
    for i in range(len(toks)):
        if i not in tw: tw[i] = [last, last]
        last = tw[i][1]
    return [{"w": t, "a": round(tw[i][0], 3), "b": round(tw[i][1], 3)} for i, t in enumerate(toks)], ok


EXTRA.update({"100": "W AH N HH AH N D R AH D", "theoneapp": "DH AH W AH N AE P", "ooh": "UW", "goggles": "G AA G AH L Z", "let's": "L EH T S"})
bad = []
for id, who, text, o in LINES:
    j = f"{V}/{id}.json"; f = f"{V}/{id}.wav"
    vo = {k: o[k] for k in ("speed", "gap", "pace") if k in o}
    if os.path.exists(j) and os.path.exists(f) and json.load(open(j)).get("text") == text and json.load(open(j)).get("vo", {}) == vo: continue
    LINE_PRON.clear()
    if who == "trio":
        unison(id, text); jj = json.load(open(j)); jj["who"] = "trio"; jj["vo"] = vo; json.dump(jj, open(j, "w")); print(id, "trio", jj["dur"], flush=True); continue
    if who == "heart": x, sr = heart(text, False, o.get("gap", .4), o.get("speed", .95))
    else: x, sr = buddy(who, text, pace=o.get("pace", 1.0))
    x = up48(np.asarray(x, np.float64), sr); sf.write(f, x.astype(np.float32), 48000, subtype="PCM_16")
    saved = dict(PRON); PRON.clear(); words, ok = align(text, f); PRON.update(saved)   # align on the script's own words ("theoneapp" is in EXTRA)
    if not ok: bad.append(id)
    op, lv = tv.envelope(x, 48000); lvl = tv.level(x, 48000, op)
    json.dump({"who": who, "text": text, "vo": vo, "dur": round(len(x) / 48000, 3), "words": words, "aligned": ok, "fps": 30,
               "open": [round(float(v), 2) for v in op], "mouth": tv.mouth_track(lvl), "stress": tv.stresses(lv)}, open(j, "w"))
    print(id, who, round(len(x) / 48000, 2), "ok" if ok else "PROPORTIONAL", flush=True)
print("not aligned:", bad)
