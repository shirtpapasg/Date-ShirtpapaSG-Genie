"""make_voice.py: every spoken line of EP22 (engine copied from EP21, which is EP20's, unchanged; only this header and EXTRA changed) -> voice/<id>.wav (48 kHz mono) + voice/<id>.json (word times, mouth track).
  /home/user/heart-tts/venv/bin/python make_voice.py
Heart  = Kokoro af_heart, the episodes' recipe (sau/voice.py: pitch swing x1.6, -21.7 dB), at the NEW PACE (teacher 20 Nov, as EP6):
         speed .90 with .5 s between sentences; a sentence that says a new term (opts "term") is said a little slower (x.93) and is
         followed by at least .65 s; the journeys are slower (.85), 1.0 s between sentences and softer (-2.5 dB, opts "soft");
         "Now you know!" excited: faster, +3 semitones, wider swing, +3 dB.
Buddies = the Character Voice Kit voices exactly as in characters/sprites/talk_voice.py (voice_maker.CHARACTERS, -18 dB RMS), 12% slower.
Chant  = EP7's call and response (CHANT in script.py): each buddy says each call and answer, stretched to one length so the three land
         together; the call on the bar line, the answer at ANS_AT of the bar; Basil leads the call (a little louder).
sg_pron: every Heart and buddy text goes through ../sg_pron.py (needs_fix -> speak_line) (Sungei Buloh, Semakau, "live", "fragile",
         "mantis", "prolegs", "Aedes"). EP22: see STATE.md and ../pron_clips/Heart_ep22_new_words.mp3 for the words checked (no new entry:
         Kokoro's own phonemizer says "magnetised" mˈæɡnɪtˌaɪzd, "stroke" stɹˈoʊk, "magnetic object" with the noun "OB-ject", "woodpecker"
         wˈʊdpɛkɚ, "screwdriver" skɹˈuːdɹaɪvɚ, "chopstick" tʃˈɑːpstɪk, as the dictionary does).
Respelling: script opts "pron" {text: spoken as} re-spells words for ONE line (the caption keeps the script's words). EP22: none.
Word times: pocketsphinx forced alignment (sau/build_tl.py's method); a line it cannot align is spread by word length.
Existing files are kept (safe to re-run after a restart); a line whose text or options changed is recorded again."""
import os, sys, json, re, wave, subprocess, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
H = os.path.dirname(os.path.abspath(__file__)); SPR = os.path.join(H, "..", "characters", "sprites"); sys.path.insert(0, SPR); sys.path.insert(0, H)
import voice_maker as vm, talk_voice as tv
from script import SEQS, PRON, CHANT, CHANT_CAPS
SEQ = SEQS[1] + SEQS[2]
import pocketsphinx
from pocketsphinx import Decoder
D = "/home/user/heart-tts"; SR = 24000; V = f"{H}/voice"; os.makedirs(V, exist_ok=True)
sys.path.insert(0, os.path.join(H, ".."))
from sg_pron import needs_fix, speak_line   # the teacher's approved pronunciations (../PRONUNCIATION.md): Sungei Buloh, Semakau, "live"
class _FixK:
    """Kokoro, but any text with a name or word on the pronunciation list is said through sg_pron.speak_line (Heart and the buddies)."""
    def __init__(self, k): self.k = k
    def create(self, text, voice="af_heart", speed=1.0, lang="en-us", **kw):
        if not kw.get("is_phonemes") and needs_fix(text): return speak_line(self.k, text, voice=voice, speed=speed, lang=lang)
        return self.k.create(text, voice=voice, speed=speed, lang=lang, **kw)
    def __getattr__(self, n): return getattr(self.k, n)     # get_voice_style etc. go straight to Kokoro
_k = None
def K():
    global _k
    if _k is None: _k = _FixK(vm.load(D + "/kokoro.onnx", D + "/voices.bin"))
    return _k
sents = lambda t: [p for p in re.split(r"(?<=[.!?])\s+", t) if p.strip()]
LINE_PRON = {}   # this line's own respellings (script opts "pron"), set while the line is recorded and aligned
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

def buddy(who, text, gap=.16):   # gap: silence between sentences (a Mark Sentence card with two sentences: script opts "gap")
    c = dict(vm.CHARACTERS[who]); c["speed"] = c["speed"] * .88   # EP6/EP8: about 12% slower than default (teacher, 20 Nov)
    x, sr = vm.speak(K(), pron(text), c, gap=gap + .06, para_gap=0)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98), sr

def stretch(x, sr, dur):
    snd = parselmouth.Sound(x, sr); f = dur / (len(x) / sr)
    return call(snd, "Lengthen (overlap-add)", 75, 600, f).values[0] if abs(f - 1) > .02 else x

BAR = 3.2   # EP14's chant: one line per bar (clap at 0, clap at 1/4, stomp at 1/2): the call on the first clap ("Day, night!",
            # "Egg, chick!", "Change, repeat!"), the answer ("Round and round!", "Round and round!", "That's a cycle!") on the stomp
ANS_AT = [.5, .5, .5]
# call and response: line 1, a bar for the viewers ("YOUR TURN!"), line 2, a bar, line 3, a bar. No all-together bar (script segment 11).
SLOTS = [(0, 0), (1, 2), (2, 4)]; NBARS = 6; NCALL = 3
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
def chant(id):
    """EP14: "Day, night! Round and round!" / "Egg, chick! Round and round!" / "Change, repeat! That's a cycle!":
    the call from the bar line, the answer at ANS_AT of the bar (EP7's form). Basil leads the first beat of each line (his call is a little louder)."""
    qs, dq = phrase_set([c[0] for c in CHANT], cap=CHANT_CAPS[0]); ans, da = phrase_set([c[1] for c in CHANT], cap=CHANT_CAPS[1])
    n = int(BAR * NBARS * SR) + SR // 2; tracks = {w: np.zeros(n) for w in qs}; words = []
    def put(w, z, at):
        a = int(at * SR); z = z[: n - a]; tracks[w][a: a + len(z)] += z
    for k, (p, bar) in enumerate(SLOTS):
        t0 = bar * BAR + .02; ta = bar * BAR + BAR * ANS_AT[p]
        for w in qs: put(w, qs[w][p] * (1.3 if w == "basil" else 1), t0); put(w, ans[w][p], ta)
        for txt, at, d in ((CHANT[p][0], t0, dq[p]), (CHANT[p][1], ta, da[p])):
            ws = txt.split()
            for j, wd in enumerate(ws): words.append({"w": wd, "a": round(at + j * d / len(ws), 3), "b": round(at + (j + 1) * d / len(ws), 3), "slot": k})
    write_group(id, tracks, n, words, {"text": " ".join(q + " " + a for q, a in CHANT), "bar": BAR, "slots": SLOTS, "nbars": NBARS, "ncall": NCALL, "len": BAR * NBARS})
def unison(id, text):
    ph, durs = phrase_set([text]); n = int((durs[0] + .25) * SR); tracks = {}
    for w in ph: y = np.zeros(n); z = ph[w][0][:n - 480]; y[480: 480 + len(z)] = z; tracks[w] = y
    ws = text.split(); words = [{"w": wd, "a": round(.01 + j * durs[0] / len(ws), 3), "b": round(.01 + (j + 1) * durs[0] / len(ws), 3)} for j, wd in enumerate(ws)]
    write_group(id, tracks, n, words, {"text": text, "len": durs[0] + .1})

def onset(x, sr, thr=.02):
    i = np.where(np.abs(x) > thr * np.abs(x).max())[0]; return i[0] / sr
def shout(text):
    """Heart's happy "Now you know!" (note 16): several takes, the brightest one; pitched up; "know!" is longer and RISES (x1.4 -> x1.8);
    returns the audio (24 kHz), and where "know" starts (s)."""
    best = None
    for spd in (.98, 1.04, 1.1):
        for txt in (text, text.replace("!", "!!"), "Now you KNOW!"):
            a, sr = K().create(txt, voice="af_heart", speed=spd, lang="en-us"); x = a.astype(np.float64); idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 480]
            snd = parselmouth.Sound(x, SR); f0 = snd.to_pitch(time_step=.01, pitch_floor=120, pitch_ceiling=600).selected_array["frequency"]; f0 = f0[f0 > 0]
            X = np.abs(np.fft.rfft(x * np.hanning(len(x)))); fr = np.fft.rfftfreq(len(x), 1 / SR); cen = float((X * fr).sum() / X.sum())
            score = cen / 1000 + (np.percentile(f0, 90) - np.percentile(f0, 10)) / 100 + np.median(f0) / 200      # bright, lively, high
            if best is None or score > best[0]: best = (score, x, spd, txt)
    _, x, spd, txt = best; print("   shout take:", txt, "speed", spd, "score", round(best[0], 2))
    sf.write(f"{V}/_shout_raw.wav", up48(x, SR).astype(np.float32), 48000, subtype="PCM_16")
    words, ok = align_raw("now you know", f"{V}/_shout_raw.wav"); kn = words[2]["a"] if ok else len(x) / SR * .52; D = len(x) / SR
    snd = parselmouth.Sound(x, SR); m = call(snd, "To Manipulation", 0.01, 120, 600)
    pt = call(m, "Extract pitch tier"); med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=600), "Get quantile", 0, 0, 0.5, "Hertz")
    # everything up three semitones with a wider swing; from "know" on, a rise from x1.4 to x1.8 of the median
    call(pt, "Formula", f"{med * 1.19} * 2 ^ (1.9 * log2(self / {med}))")
    call(pt, "Remove points between", kn - .01, D)                              # "KNOW!": a drawn, rising contour (x1.4 -> x1.8 of her median)
    for u, k in ((0, 1.38), (.18, 1.46), (.45, 1.58), (.75, 1.72), (1, 1.82)): call(pt, "Add point", kn + u * (D - kn - .02), med * k)
    call([pt, m], "Replace pitch tier")
    dt = call("Create DurationTier", "d", 0, D); call(dt, "Add point", 0, 1.0); call(dt, "Add point", max(.01, kn - .01), 1.0); call(dt, "Add point", kn + .02, 1.5); call(dt, "Add point", D, 1.6)
    call([dt, m], "Replace duration tier"); y = call(m, "Get resynthesis (overlap-add)").values[0]
    sp = y[np.abs(y) > .003]; y = np.clip(y * (10 ** ((-21.7 + 4.5) / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98)
    return y, kn + .005 - .0, words
def align_raw(text, wav):
    return align(text, wav)
def crowd(id, text, hid):
    """the three buddies shout it with Heart: each take is stretched so its "know" lands with hers, a doubled copy a few cents apart and a
    few ms late (a light chorus = a happy crowd), then a short "Yay!" from each. -> voice/<id>.wav + per-buddy tracks for the mouths"""
    hv = json.load(open(f"{V}/{hid}.json")); kn = hv["know"]; Dh = hv["dur"]; n = int((Dh + 1.5) * SR); tracks = {}; rng = np.random.default_rng(5)
    for i, who in enumerate(("pip", "basil", "momo")):
        a, _ = buddy(who, "Now you"); b, _ = buddy(who, "know!"); y, _ = buddy(who, "Yay!")
        tr = lambda x: (lambda idx: x[idx[0]: idx[-1] + 400])(np.where(np.abs(x) > .02)[0]); a, b, y = tr(a), tr(b), tr(y)
        a = stretch(a, SR, max(.2, kn - .03)); b = stretch(b, SR, max(.3, Dh - kn + .05))
        # "know!" rises too
        snd = parselmouth.Sound(b, SR); m = call(snd, "To Manipulation", 0.01, 100, 700); pt = call(m, "Extract pitch tier"); Db = len(b) / SR
        call(pt, "Formula", f"self * (1.12 + 0.28 * (x / {Db}))"); call([pt, m], "Replace pitch tier"); b = call(m, "Get resynthesis (overlap-add)").values[0]
        t = np.zeros(n); off = int((.012 + .014 * i) * SR)
        def put(x, at, g=1.0):
            s0 = int(at * SR) + off; x = x[: n - s0]; t[s0: s0 + len(x)] += x * g
        put(a, 0); put(b, kn)
        for det, late, g in ((1.03, .028, .6), (.975, .045, .5)):     # the doubling: slightly detuned, slightly late
            bb = call(parselmouth.Sound(b, SR), "Change gender", 75, 700, 1.0, 0, 1.0, 1.0).values[0] if False else np.interp(np.arange(0, len(b), det), np.arange(len(b)), b)
            put(bb, kn + late, g)
        put(y, kn + .42 + .07 * i, .8)
        tracks[who] = t
    ws = [{"w": "Now", "a": .005, "b": round(kn * .5, 3)}, {"w": "you", "a": round(kn * .5, 3), "b": round(kn, 3)}, {"w": "know!", "a": round(kn, 3), "b": round(Dh, 3)}]
    write_group(id, tracks, n, ws, {"text": text, "len": Dh + .1})

dic = set(l.split()[0].split("(")[0] for l in open(os.path.join(pocketsphinx.get_model_path(), "en-us", "cmudict-en-us.dict")))
EXTRA = {"bobs": "B AA B Z", "fragyle": "F R AE JH AY L", "letterboxes": "L EH T ER B AA K S AH Z", "ice-cream": "AY S K R IY M", "caterpillar": "K AE T ER P IH L ER", "t-shirt": "T IY SH ER T", "ice-cream": "AY S K R IY M", "aluminium": "AE L Y UW M IH N IY AH M", "kiln": "K IH L N", "ooze": "UW Z", "mould": "M OW L D", "fungi": "F AH N JH AY", "you'll": "Y UW L", "i'm": "AY M", "milks": "M IH L K S", "biscuits": "B IH S K AH T S", "noodle": "N UW D AH L", "ceramic": "S ER AE M IH K", "metals": "M EH T AH L Z", "materials": "M AH T IH R IY AH L Z", "mudskipper": "M AH D S K IH P ER", "mudskippers": "M AH D S K IH P ER Z", "warm-up": "W AO R M AH P", "non-living": "N AA N L IH V IH NG", "wind-up": "W AY N D AH P", "taogay": "T AW G EY", "cheechahk": "CH IY CH AA K", "mealworm": "M IY L W ER M",
         "lock-in": "L AA K IH N", "pe": "P IY IY", "windscreen": "W IH N D S K R IY N", "oh-pake": "OW P EY K", "mcaw": "M AH K AO", "koi": "K OY", "dragonfly": "D R AE G AH N F L AY", "goldfish": "G OW L D F IH SH", "eco-garden": "IY K OW G AA R D AH N", "it's": "IH T S", "let's": "L EH T S", "that's": "DH AE T S", "isn't": "IH Z AH N T", "momo": "M OW M OW", "pip": "P IH P",
         "aww": "AA", "recycling": "R IY S AY K L IH NG", "organiser": "AO R G AH N AY Z ER", "showdown": "SH OW D AW N", "papaya": "P AH P AY AH",
         "toa": "T OW AH", "payoh": "P AA Y OW", "mynah": "M AY N AH", "dit": "D IH T", "wines": "W AY N Z", "squish": "S K W IH SH", "buddies": "B AH D IY Z",
         "classify": "K L AE S AH F AY", "twenty-five": "T W EH N T IY F AY V", "today's": "T AH D EY Z", "sprouts": "S P R AW T S", "diversity": "D AY V ER S AH T IY", "similarities": "S IH M AH L EH R AH T IY Z", "thirty-one": "TH ER T IY W AH N", "thirty-two": "TH ER T IY T UW", "check-out": "CH EH K AW T", "pip's": "P IH P S", "plant's": "P L AE N T S", "wilting": "W IH L T IH NG", "snug": "S N AH G", "biscuit": "B IH S K AH T", "oats": "OW T S", "whoa": "W OW", "cupboard": "K AH B ER D", "kranji": "K R AA N JH IY", "touch-me-not": "T AH CH M IY N AA T", "twenty-one": "T W EH N T IY W AH N", "rematch": "R IY M AE CH", "prickles": "P R IH K AH L Z", "droops": "D R UW P S", "spores": "S P AO R Z", "reproduces": "R IY P R AH D UW S AH Z", "reproducing": "R IY P R AH D UW S IH NG", "mimosa": "M IH M OW S AH", "eyelids": "AY L IH D Z", "kittens": "K IH T AH N Z", "basil": "B AE Z AH L", "yay": "Y EY", "hatches": "HH AE CH AH Z", "inwards": "IH N W ER D Z", "responding": "R IH S P AA N D IH NG", "responded": "R IH S P AA N D AH D", "non-living": "N AA N L IH V IH NG", "mrt": "EH M AA R T IY", "pyjamas": "P AH JH AA M AH Z", "pyjama": "P AH JH AA M AH", "chinchillas": "CH IH N CH IH L AH Z", "momo's": "M OW M OW Z", "beetle's": "B IY T AH L Z", "flower-pot": "F L AW ER P AA T", "pupae": "P Y UW P IY", "wriggler": "R IH G L ER", "wrigglers": "R IH G L ER Z", "wriggles": "R IH G AH L Z",
         "basil's": "B AE Z AH L Z", "mid-air": "M IH D EH R", "non-magnetic": "N AA N M AE G N EH T IH K", "rinsed": "R IH N S T", "u-shaped": "Y UW SH EY P T",
         "pip's": "P IH P S", "lizard's": "L IH Z ER D Z", "magnet's": "M AE G N AH T S", "stationery": "S T EY SH AH N EH R IY", "underneath": "AH N D ER N IY TH",
         "needle's": "N IY D AH L Z", "netball": "N EH T B AO L", "north-south": "N AO R TH S AW TH", "seagrass": "S IY G R AE S",
         "magnetised": "M AE G N IH T AY Z D", "super-fast": "S UW P ER F AE S T", "pecks": "P EH K S", "undoes": "AH N D AH Z"}
def align(text, wav):
    toks = text.split(); ptoks = pron(text).split()
    spoken = []
    k = 0
    # the spoken (re-spelt) words, each pointing back at a token of the script text: walk both lists by position where they match in length
    if len(ptoks) == len(toks): pairs = list(enumerate(ptoks))
    else: pairs = None
    x, sr = sf.read(wav); Dn = len(x) / sr; al = []
    if pairs is not None:
        spoken = [(i, w) for i, t in pairs for w in re.findall(r"[a-z'][a-z'\-]*[a-z]|[a-z]", t.lower())]
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

bad = []
for it in SEQ:
    if it[0] == "chant":
        if not (os.path.exists(f"{V}/{it[1]}.json") and json.load(open(f"{V}/{it[1]}.json")).get("slots") == [list(x) for x in SLOTS] and json.load(open(f"{V}/{it[1]}.json")).get("bar") == BAR
                and json.load(open(f"{V}/{it[1]}.json")).get("text") == " ".join(q + " " + a for q, a in CHANT)): chant(it[1])
        continue
    if it[0] == "unison":
        if it[3].get("crowd"):
            if not (os.path.exists(f"{V}/{it[1]}.json") and json.load(open(f"{V}/{it[1]}.json")).get("crowd")):
                crowd(it[1], it[2], it[3]["crowd"]); j = json.load(open(f"{V}/{it[1]}.json")); j["crowd"] = True; json.dump(j, open(f"{V}/{it[1]}.json", "w"))
        else:
            LINE_PRON.clear(); LINE_PRON.update(it[3].get("pron", {}))
            if not (os.path.exists(f"{V}/{it[1]}.json") and json.load(open(f"{V}/{it[1]}.json")).get("text") == it[2] and json.load(open(f"{V}/{it[1]}.json")).get("pron", {}) == it[3].get("pron", {})):
                unison(it[1], it[2])
                if it[3].get("pron"): j = json.load(open(f"{V}/{it[1]}.json")); j["pron"] = it[3]["pron"]; json.dump(j, open(f"{V}/{it[1]}.json", "w"))
        continue
    if it[0] != "say": continue
    _, id, who, text, o = it; f = f"{V}/{id}.wav"; j = f"{V}/{id}.json"
    vo = {k: o[k] for k in ("speed", "gap", "term", "soft", "excited", "pron") if k in o}
    if os.path.exists(j) and json.load(open(j)).get("text") == text and json.load(open(j)).get("vo", {}) == vo and os.path.exists(f) and (not o.get("shout") or "know" in json.load(open(j))): continue
    kn = None; LINE_PRON.clear(); LINE_PRON.update(o.get("pron", {}))
    if o.get("shout"): x, kn, sw = shout(text); sr = SR
    else: x, sr = heart(text, o.get("excited", False), o.get("gap", .5), o.get("speed", .90), o.get("term", ()), o.get("soft", False)) if who == "heart" else buddy(who, text, **({"gap": o["gap"]} if "gap" in o else {}))
    x = up48(np.asarray(x, np.float64), sr); sf.write(f, x.astype(np.float32), 48000, subtype="PCM_16")
    words, ok = align(text, f)
    if kn is not None: D_ = len(x) / 48000; words = [{"w": "Now", "a": .005, "b": round(sw[1]["a"], 3)}, {"w": "you", "a": round(sw[1]["a"], 3), "b": round(kn, 3)}, {"w": "know!", "a": round(kn, 3), "b": round(D_, 3)}]; ok = True
    if not ok: bad.append(id)
    op, lv = tv.envelope(x, 48000); lvl = tv.level(x, 48000, op)
    json.dump({"who": who, "text": text, "vo": vo, "dur": round(len(x) / 48000, 3), "words": words, "aligned": ok, "fps": 30,
               "open": [round(float(v), 2) for v in op], "mouth": tv.mouth_track(lvl), "stress": tv.stresses(lv), **({"know": round(kn, 3)} if kn is not None else {})}, open(j, "w"))
    print(id, who, round(len(x) / 48000, 2), "ok" if ok else "PROPORTIONAL", flush=True)
print("not aligned:", bad)
