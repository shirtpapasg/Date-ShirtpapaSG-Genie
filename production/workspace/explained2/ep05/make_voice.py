"""make_voice.py: every spoken line of EP5 -> voice/<id>.wav (48 kHz mono) + voice/<id>.json (word times, mouth track).
  /home/user/heart-tts/venv/bin/python make_voice.py
Heart  = Kokoro af_heart, the episodes' recipe (sau/voice.py: pitch swing x1.6, -21.7 dB), but at speed .95 with .45 s between
         sentences (the recipe's .94 and .57 made the episode 8 minutes; the script asks for 6:30); the shrink is said slower (.92);
         "Now you know!" excited: faster, +3 semitones, wider swing, +3 dB).
Buddies = the Character Voice Kit voices exactly as in characters/sprites/talk_voice.py (voice_maker.CHARACTERS, -18 dB RMS).
Chant  = each buddy says each of the four phrases; every phrase is stretched to one length so the three land together.
Word times: pocketsphinx forced alignment (sau/build_tl.py's method); a line it cannot align is spread by word length.
Existing files are kept (safe to re-run after a restart)."""
import os, sys, json, re, wave, subprocess, numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
H = os.path.dirname(os.path.abspath(__file__)); SPR = os.path.join(H, "..", "characters", "sprites"); sys.path.insert(0, SPR); sys.path.insert(0, H)
sys.path.insert(0, os.path.join(H, ".."))
import voice_maker as vm, talk_voice as tv
from sg_pron import needs_fix, speak_line, to_phonemes   # "live" / "lives" = "leev" (teacher, 21 Nov), from approved phonemes
from script import SEQS, PRON, CHANT, CHANT_CAPS
SEQ = SEQS[1] + SEQS[2]
import pocketsphinx
from pocketsphinx import Decoder
D = "/home/user/heart-tts"; SR = 24000; V = f"{H}/voice"; os.makedirs(V, exist_ok=True)
_k = None
def K():
    global _k
    if _k is None: _k = vm.load(D + "/kokoro.onnx", D + "/voices.bin")
    return _k
sents = lambda t: [p for p in re.split(r"(?<=[.!?])\s+", t) if p.strip()]
def pron(t):
    for a, b in PRON.items(): t = t.replace(a, b)
    return t
def up48(x, sr):
    if sr == 48000: return x
    n = int(len(x) * 48000 / sr); X = np.fft.rfft(x); Y = np.zeros(n // 2 + 1, complex); m = min(len(X), len(Y)); Y[:m] = X[:m]
    return np.fft.irfft(Y, n) * (n / len(x))

def heart(text, excited=False, gap=.45, spd=.95):
    speed, swing, shift, gain = (1.02, 2.2, 2 ** (3 / 12), 3.0) if excited else (spd, 1.6, 1.0, 0.0); parts = []
    for p in sents(pron(text)):
        a, sr = speak_line(K(), p, voice="af_heart", speed=speed) if needs_fix(p) else K().create(p, voice="af_heart", speed=speed, lang="en-us"); x = a.astype(np.float64)
        snd = parselmouth.Sound(x, SR); m = call(snd, "To Manipulation", 0.01, 120, 500); pt = call(m, "Extract pitch tier")
        med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), "Get quantile", 0, 0, 0.5, "Hertz")
        call(pt, "Formula", f"{med * shift} * 2 ^ ({swing} * log2(self / {med}))"); call([pt, m], "Replace pitch tier")
        x = call(m, "Get resynthesis (overlap-add)").values[0]
        idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 240]
        parts += [x, np.zeros(int(SR * gap))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
    return np.clip(x * (10 ** ((-21.7 + gain) / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98), SR

class _Fix:
    """Kokoro for a buddy line with a fixed word: each sentence that has one is spoken from sg_pron's phonemes (same voice mix, same speed)."""
    def __init__(s, k): s.k = k
    def get_voice_style(s, v): return s.k.get_voice_style(v)
    def create(s, text, **kw):
        if needs_fix(text): return s.k.create(to_phonemes(text, kw.get("lang", "en-us")), voice=kw["voice"], speed=kw["speed"], lang=kw.get("lang", "en-us"), is_phonemes=True)
        return s.k.create(text, **kw)
def buddy(who, text, gap=.16, bs=.93):
    c = dict(vm.CHARACTERS[who]); c["speed"] = c["speed"] * bs   # .93: a little slower (the teacher: about 10% slower overall); .88: the slower reading pace (cards)
    x, sr = vm.speak(_Fix(K()), pron(text), c, gap=gap + .06, para_gap=0)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98), sr

def stretch(x, sr, dur):
    snd = parselmouth.Sound(x, sr); f = dur / (len(x) / sr)
    return call(snd, "Lengthen (overlap-add)", 75, 600, f).values[0] if abs(f - 1) > .02 else x

BAR = 1.65   # the chant: one phrase per bar; clap, clap, stomp
# call and response: a line, then a bar for the viewers ("YOUR TURN!"), four times; then all together once at full speed
SLOTS = [(0, 0), (1, 2), (0, 4), (1, 5)]; NBARS = 6; NCALL = 2
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
    """line 1: "Water!" on the first clap (beat 0), "Food!" on the second clap (a quarter bar), "Air!" on the stomp (half a bar).
    line 2: "Living things need all three!" as one phrase from the bar line."""
    w3, d3 = phrase_set(CHANT[0], cap=CHANT_CAPS); p2, d2 = phrase_set([CHANT[1]], cap=1.5)
    n = int(BAR * NBARS * SR) + SR // 2; tracks = {w: np.zeros(n) for w in w3}; words = []
    def put(w, z, at):
        a = int(at * SR); z = z[: n - a]; tracks[w][a: a + len(z)] += z
    for k, (p, bar) in enumerate(SLOTS):
        t0 = bar * BAR + .02
        if p == 0:
            for j, wd in enumerate(CHANT[0]):
                at = t0 + j * BAR * .25
                for w in w3: put(w, w3[w][j], at)
                words.append({"w": wd, "a": round(at, 3), "b": round(at + d3[j], 3), "slot": k})
        else:
            for w in p2: put(w, p2[w][0], t0)
            ws = CHANT[1].split()
            for j, wd in enumerate(ws): words.append({"w": wd, "a": round(t0 + j * d2[0] / len(ws), 3), "b": round(t0 + (j + 1) * d2[0] / len(ws), 3), "slot": k})
    write_group(id, tracks, n, words, {"text": " ".join(CHANT[0]) + " " + CHANT[1], "bar": BAR, "slots": SLOTS, "nbars": NBARS, "ncall": NCALL, "len": BAR * NBARS})
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
EXTRA = {"mudskipper": "M AH D S K IH P ER", "mudskippers": "M AH D S K IH P ER Z", "warm-up": "W AO R M AH P", "non-living": "N AA N L IH V IH NG", "wind-up": "W AY N D AH P", "taogay": "T AW G EY", "cheechahk": "CH IY CH AA K", "mealworm": "M IY L W ER M",
         "lock-in": "L AA K IH N", "it's": "IH T S", "let's": "L EH T S", "that's": "DH AE T S", "isn't": "IH Z AH N T", "momo": "M OW M OW", "pip": "P IH P",
         "aww": "AA", "recycling": "R IY S AY K L IH NG", "organiser": "AO R G AH N AY Z ER", "showdown": "SH OW D AW N", "papaya": "P AH P AY AH",
         "toa": "T OW AH", "payoh": "P AA Y OW", "mynah": "M AY N AH", "dit": "D IH T", "wines": "W AY N Z", "squish": "S K W IH SH", "buddies": "B AH D IY Z",
         "classify": "K L AE S AH F AY", "twenty-five": "T W EH N T IY F AY V", "today's": "T AH D EY Z", "sprouts": "S P R AW T S", "diversity": "D AY V ER S AH T IY", "similarities": "S IH M AH L EH R AH T IY Z", "thirty-one": "TH ER T IY W AH N", "thirty-two": "TH ER T IY T UW", "check-out": "CH EH K AW T", "pip's": "P IH P S", "plant's": "P L AE N T S", "wilting": "W IH L T IH NG", "snug": "S N AH G", "biscuit": "B IH S K AH T", "oats": "OW T S", "whoa": "W OW", "cupboard": "K AH B ER D", "kranji": "K R AA N JH IY", "touch-me-not": "T AH CH M IY N AA T", "twenty-one": "T W EH N T IY W AH N", "rematch": "R IY M AE CH", "prickles": "P R IH K AH L Z", "droops": "D R UW P S", "spores": "S P AO R Z", "reproduces": "R IY P R AH D UW S AH Z", "reproducing": "R IY P R AH D UW S IH NG", "mimosa": "M IH M OW S AH", "eyelids": "AY L IH D Z", "kittens": "K IH T AH N Z", "basil": "B AE Z AH L", "yay": "Y EY", "hatches": "HH AE CH AH Z", "inwards": "IH N W ER D Z", "responding": "R IH S P AA N D IH NG", "responded": "R IH S P AA N D AH D", "non-living": "N AA N L IH V IH NG"}
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
        os.remove(w16)
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
        if not (os.path.exists(f"{V}/{it[1]}.json") and "slots" in json.load(open(f"{V}/{it[1]}.json"))): chant(it[1])
        continue
    if it[0] == "unison":
        if it[3].get("crowd"):
            if not (os.path.exists(f"{V}/{it[1]}.json") and json.load(open(f"{V}/{it[1]}.json")).get("crowd")):
                crowd(it[1], it[2], it[3]["crowd"]); j = json.load(open(f"{V}/{it[1]}.json")); j["crowd"] = True; json.dump(j, open(f"{V}/{it[1]}.json", "w"))
        elif not (os.path.exists(f"{V}/{it[1]}.json") and json.load(open(f"{V}/{it[1]}.json")).get("text") == it[2]): unison(it[1], it[2])
        continue
    if it[0] != "say": continue
    _, id, who, text, o = it; f = f"{V}/{id}.wav"; j = f"{V}/{id}.json"
    if os.path.exists(j) and json.load(open(j)).get("text") == text and json.load(open(j)).get("who") == who and os.path.exists(f) and (not o.get("shout") or "know" in json.load(open(j))) and (not needs_fix(text) or json.load(open(j)).get("leev")): continue
    kn = None
    if o.get("shout"): x, kn, sw = shout(text); sr = SR
    else: x, sr = heart(text, o.get("excited", False), o.get("gap", .45), o.get("speed", .95)) if who == "heart" else buddy(who, text, bs=o.get("bs", .93))
    x = up48(np.asarray(x, np.float64), sr); sf.write(f, x.astype(np.float32), 48000, subtype="PCM_16")
    words, ok = align(text, f)
    if kn is not None: D_ = len(x) / 48000; words = [{"w": "Now", "a": .005, "b": round(sw[1]["a"], 3)}, {"w": "you", "a": round(sw[1]["a"], 3), "b": round(kn, 3)}, {"w": "know!", "a": round(kn, 3), "b": round(D_, 3)}]; ok = True
    if not ok: bad.append(id)
    op, lv = tv.envelope(x, 48000); lvl = tv.level(x, 48000, op)
    json.dump({"who": who, "text": text, "dur": round(len(x) / 48000, 3), "words": words, "aligned": ok, "fps": 30,
               **({"leev": True} if needs_fix(text) else {}), "open": [round(float(v), 2) for v in op], "mouth": tv.mouth_track(lvl), "stress": tv.stresses(lv), **({"know": round(kn, 3)} if kn is not None else {})}, open(j, "w"))
    print(id, who, round(len(x) / 48000, 2), "ok" if ok else "PROPORTIONAL", flush=True)
print("not aligned:", bad)
