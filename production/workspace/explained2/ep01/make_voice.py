"""make_voice.py: every spoken line of EP1 -> voice/<id>.wav (48 kHz mono) + voice/<id>.json (word times, mouth track).
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
import voice_maker as vm, talk_voice as tv
from script import SEQS, PRON, CHANT
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
        a, sr = K().create(p, voice="af_heart", speed=speed, lang="en-us"); x = a.astype(np.float64)
        snd = parselmouth.Sound(x, SR); m = call(snd, "To Manipulation", 0.01, 120, 500); pt = call(m, "Extract pitch tier")
        med = call(snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=500), "Get quantile", 0, 0, 0.5, "Hertz")
        call(pt, "Formula", f"{med * shift} * 2 ^ ({swing} * log2(self / {med}))"); call([pt, m], "Replace pitch tier")
        x = call(m, "Get resynthesis (overlap-add)").values[0]
        idx = np.where(np.abs(x) > 0.01)[0]; x = x[max(0, idx[0] - 120): idx[-1] + 240]
        parts += [x, np.zeros(int(SR * gap))]
    x = np.concatenate(parts[:-1]); sp = x[np.abs(x) > 0.003]
    return np.clip(x * (10 ** ((-21.7 + gain) / 20) / np.sqrt(np.mean(sp ** 2))), -0.98, 0.98), SR

def buddy(who, text, gap=.16):
    c = dict(vm.CHARACTERS[who]); c["speed"] = c["speed"] * .93   # a little slower (the teacher: about 10% slower overall)
    x, sr = vm.speak(K(), pron(text), c, gap=gap + .06, para_gap=0)
    idx = np.where(np.abs(x) > .01)[0]; x = x[max(0, idx[0] - 240): idx[-1] + 2400].astype(np.float64)
    sp = x[np.abs(x) > .003]; return np.clip(x * (10 ** (-18 / 20) / np.sqrt(np.mean(sp ** 2))), -.98, .98), sr

def stretch(x, sr, dur):
    snd = parselmouth.Sound(x, sr); f = dur / (len(x) / sr)
    return call(snd, "Lengthen (overlap-add)", 75, 600, f).values[0] if abs(f - 1) > .02 else x

BAR = 1.65   # the chant: one phrase per bar; clap, clap, stomp
def chant(id):
    """three buddies in unison, each phrase stretched to the same length; returns the mix and one track per buddy"""
    tracks = {}
    for who in ("pip", "basil", "momo"):
        f = f"{V}/{id}_{who}.wav"
        if not os.path.exists(f):
            raw = []
            for ph in CHANT:
                x, sr = buddy(who, ph); idx = np.where(np.abs(x) > .02)[0]; raw.append(x[idx[0]: idx[-1] + 600])
            tracks[who] = (raw, sr)
    if tracks:
        n = int(BAR * 4 * SR) + SR // 2
        durs = [min(1.42, float(np.median([len(tracks[w][0][i]) / SR for w in tracks]))) for i in range(4)]
        for who, (raw, sr) in tracks.items():
            y = np.zeros(n)
            for i, x in enumerate(raw):
                z = stretch(x, sr, durs[i]); a = int((i * BAR + .02) * SR); z = z[: n - a]; y[a: a + len(z)] += z
            sf.write(f"{V}/{id}_{who}.wav", up48(y, SR).astype(np.float32), 48000, subtype="PCM_16")
    mix = sum(sf.read(f"{V}/{id}_{w}.wav")[0] for w in ("pip", "basil", "momo")) * .62
    sf.write(f"{V}/{id}.wav", np.clip(mix, -.98, .98).astype(np.float32), 48000, subtype="PCM_16")
    out = {"who": "chant", "text": " ".join(CHANT), "dur": round(len(mix) / 48000, 3), "bar": BAR, "fps": 30, "tracks": {}}
    words = []
    for i, ph in enumerate(CHANT):
        ws = ph.split()
        for j, w in enumerate(ws): words.append({"w": w, "a": round(i * BAR + .02 + j * 1.15 / len(ws), 3), "b": round(i * BAR + .02 + (j + 1) * 1.15 / len(ws), 3)})
    out["words"] = words
    for w in ("pip", "basil", "momo"):
        x, sr = sf.read(f"{V}/{id}_{w}.wav"); op, lv = tv.envelope(x, sr); out["tracks"][w] = tv.mouth_track(tv.level(x, sr, op))
    json.dump(out, open(f"{V}/{id}.json", "w"))
    print(id, "chant", out["dur"], flush=True)

dic = set(l.split()[0].split("(")[0] for l in open(os.path.join(pocketsphinx.get_model_path(), "en-us", "cmudict-en-us.dict")))
EXTRA = {"non-living": "N AA N L IH V IH NG", "wind-up": "W AY N D AH P", "taogay": "T AW G EY", "cheechahk": "CH IY CH AA K", "mealworm": "M IY L W ER M",
         "lock-in": "L AA K IH N", "it's": "IH T S", "let's": "L EH T S", "that's": "DH AE T S", "isn't": "IH Z AH N T", "momo": "M OW M OW", "pip": "P IH P",
         "aww": "AA", "recycling": "R IY S AY K L IH NG", "organiser": "AO R G AH N AY Z ER", "showdown": "SH OW D AW N", "papaya": "P AH P AY AH",
         "toa": "T OW AH", "payoh": "P AA Y OW", "mynah": "M AY N AH", "dit": "D IH T", "wines": "W AY N Z", "squish": "S K W IH SH", "buddies": "B AH D IY Z",
         "classify": "K L AE S AH F AY", "diversity": "D AY V ER S AH T IY", "similarities": "S IH M AH L EH R AH T IY Z"}
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
        if not os.path.exists(f"{V}/{it[1]}.json"): chant(it[1])
        continue
    if it[0] != "say": continue
    _, id, who, text, o = it; f = f"{V}/{id}.wav"; j = f"{V}/{id}.json"
    if os.path.exists(j) and json.load(open(j)).get("text") == text and os.path.exists(f): continue
    x, sr = heart(text, o.get("excited", False), o.get("gap", .45), o.get("speed", .95)) if who == "heart" else buddy(who, text)
    x = up48(np.asarray(x, np.float64), sr); sf.write(f, x.astype(np.float32), 48000, subtype="PCM_16")
    words, ok = align(text, f)
    if not ok: bad.append(id)
    op, lv = tv.envelope(x, 48000); lvl = tv.level(x, 48000, op)
    json.dump({"who": who, "text": text, "dur": round(len(x) / 48000, 3), "words": words, "aligned": ok, "fps": 30,
               "open": [round(float(v), 2) for v in op], "mouth": tv.mouth_track(lvl), "stress": tv.stresses(lv)}, open(j, "w"))
    print(id, who, round(len(x) / 48000, 2), "ok" if ok else "PROPORTIONAL", flush=True)
print("not aligned:", bad)
