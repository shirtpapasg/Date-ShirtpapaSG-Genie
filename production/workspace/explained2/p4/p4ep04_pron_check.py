"""p4ep04_pron_check.py (P4 EP4, 28 Nov 2026): measures the clips p4ep04_voice_tests.py made in /dev/shm/p4ep04/vt.
  1. Voices: pitch (median, 5-95% range in semitones), formants F1-F3 (medians over voiced frames) and the MFCC distance from each Spike
     candidate to each of the cast, all saying the same line (c104).
  2. Pronunciations (the method of P4 EP3's pron_check.py): pocketsphinx makes a forced choice between spellings, (a) on the word alone and
     (b) inside the whole script line (a JSGF grammar of the line with the word's alternatives), and lists the phones it hears (allphone).
     In the line pass a hyphenated word is two grammar words, so the pause between its halves is measured too ("spine-like", "non-woody").
     A child / robot / Heart voice is moved to an adult range first (Praat Change gender), as EP3.
  /home/user/heart-tts/venv/bin/python p4ep04_pron_check.py"""
import os, re, wave, subprocess, tempfile, numpy as np, parselmouth
from parselmouth.praat import call
from pocketsphinx import Decoder, get_model_path
MP = get_model_path(); D = "/dev/shm/p4ep04/vt"; HMM = os.path.join(MP, "en-us", "en-us")
CMU = {}
for l in open(os.path.join(MP, "en-us", "cmudict-en-us.dict")):
    w, *ph = l.split(); w = w.split("(")[0]; CMU.setdefault(w, " ".join(ph))
EXTRA = {"mint's": "M IH N T S", "bendy": "B EH N D IY", "aiyoh": "AY Y OW", "lah": "L AA", "isn't": "IH Z AH N T", "i'm": "AY M",
         "live": "L IY V", "lives": "L IY V Z"}          # "live" / "lives": sg_pron says "leev" (the teacher's approved entry)

def norm(path):
    s = parselmouth.Sound(path); f0 = call(s.to_pitch(), "Get quantile", 0, 0, .5, "Hertz")
    if f0 and f0 == f0 and f0 > 180: s = call(s, "Change gender", 75, 600, .86, 150, 1.0, 1.0)
    t = tempfile.mktemp(suffix=".wav"); s.save(t, "WAV"); return t
def raw16(path):
    n = norm(path); t = tempfile.mktemp(suffix=".wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", n, "-af", "adelay=300,apad=pad_dur=0.3", "-ar", "16000", "-ac", "1", t], check=True)
    w = wave.open(t, "rb"); r = w.readframes(w.getnframes()); os.remove(t); os.remove(n); return r

def decode(path, dic_lines, gram):
    dic = tempfile.mktemp(suffix=".dict"); open(dic, "w").write("".join(dic_lines))
    g = tempfile.mktemp(suffix=".gram"); open(g, "w").write("#JSGF V1.0;\ngrammar g;\npublic <s> = " + gram + ";\n")
    d = Decoder(hmm=HMM, dict=dic, jsgf=g, loglevel="FATAL", samprate=16000)
    d.start_utt(); d.process_raw(raw16(path), full_utt=True); d.end_utt(); h = d.hyp()
    segs = [(s.word, s.start_frame / 100, (s.end_frame + 1) / 100) for s in d.seg()]
    os.remove(dic); os.remove(g); return (h.hypstr if h else ""), segs

def word_choice(path, variants):
    """variants: {name: phones}: the word alone."""
    names = list(variants); h, _ = decode(path, [f"v{i} {variants[n]}\n" for i, n in enumerate(names)], " | ".join(f"v{i}" for i in range(len(names))))
    return names[int(h[1:])] if h else "?"

def line_choice(path, before, variants, after):
    """The whole line: plain words before / after (CMU dict or EXTRA) and the alternatives {name: [(part, phones), ...]} in between.
    Returns (the chosen name, the pause in s between the chosen alternative's parts, or None for a one-part alternative)."""
    lines, plain = [], {}
    for w in before + after:
        if w not in plain: plain[w] = f"p{len(plain)}"; lines.append(f"{plain[w]} {EXTRA.get(w) or CMU[w]}\n")
    names = list(variants); alts = []
    for i, n in enumerate(names):
        toks = []
        for j, (_, ph) in enumerate(variants[n]): toks.append(f"v{i}x{j}"); lines.append(f"v{i}x{j} {ph}\n")
        alts.append(" ".join(toks))
    gram = " ".join([plain[w] for w in before] + ["( " + " | ".join(alts) + " )"] + [plain[w] for w in after])
    h, segs = decode(path, lines, gram)
    m = re.search(r"v(\d+)x0", h)
    if not m: return "?", None
    i = int(m.group(1)); parts = [s for s in segs if s[0].startswith(f"v{i}x")]
    gap = round(parts[1][1] - parts[0][2], 3) if len(parts) > 1 else None
    line_choice.last = [(variants[names[i]][j][0], round(b - a, 2)) for j, (_, a, b) in enumerate(parts)]
    return names[i], gap

def allphone(path):
    d = Decoder(hmm=HMM, allphone=os.path.join(MP, "en-us", "en-us-phone.lm.bin"), lw=2.0, beam=1e-20, pbeam=1e-20, loglevel="FATAL", samprate=16000)
    d.start_utt(); d.process_raw(raw16(path), full_utt=True); d.end_utt(); return " ".join(s.word for s in d.seg() if s.word not in ("SIL", "+SPN+", "+NSN+"))

def voice_stats(path):
    s = parselmouth.Sound(path); p = s.to_pitch(time_step=.01, pitch_floor=60, pitch_ceiling=500); f = p.selected_array["frequency"]; f = f[f > 0]
    med = float(np.median(f)); rng = 12 * np.log2(np.percentile(f, 95) / np.percentile(f, 5))
    fm = call(s, "To Formant (burg)", 0.01, 5, 5500, 0.025, 50); ts = p.xs()[p.selected_array["frequency"] > 0]
    F = [float(np.nanmedian([call(fm, "Get value at time", k, t, "Hertz", "Linear") for t in ts])) for k in (1, 2, 3)]
    mf = call(s, "To MFCC", 12, 0.015, 0.005, 100.0, 100.0, 0.0); M = np.array(call(mf, "To Matrix").values)[1:13]   # c1..c12 (no energy)
    return med, rng, F, M.mean(axis=1)

if __name__ == "__main__":
    print("== 1. Voices (all saying c104) ==")
    V = {}
    for n in ["spike_A", "spike_B", "spike_C", "cast_glitch", "cast_chilli", "cast_lim", "cast_pip", "cast_basil", "cast_momo"]:
        f = f"{D}/{n}_c104.wav"; V[n] = voice_stats(f); m, r, F, _ = V[n]
        print(f"{n:12s} F0 median {m:6.1f} Hz  range {r:4.1f} st  F1 {F[0]:5.0f}  F2 {F[1]:5.0f}  F3 {F[2]:5.0f}")
    print("MFCC distance (bigger = more different timbre):")
    cast = [n for n in V if n.startswith("cast_")]
    print(" " * 9 + "".join(f"{c[5:]:>8s}" for c in cast) + "   B/C")
    for s in ["spike_A", "spike_B", "spike_C"]:
        others = [o for o in ["spike_A", "spike_B", "spike_C"] if o != s]
        print(f"{s:9s}" + "".join(f"{np.linalg.norm(V[s][3] - V[c][3]):8.1f}" for c in cast) + "   " + " ".join(f"{np.linalg.norm(V[s][3] - V[o][3]):.1f}" for o in others))
    print("cast to cast, nearest pair:", min(((np.linalg.norm(V[a][3] - V[b][3]), a, b) for a in cast for b in cast if a < b)))

    print("\n== 2. Pronunciations ==")
    WORD = {"cactus": {"KAK-tus": "K AE K T AH S", "KAK-tie": "K AE K T AY"},
            "cacti": {"KAK-tie": "K AE K T AY", "KAK-tee": "K AE K T IY", "KAK-tus": "K AE K T AH S"},
            "spine-like": {"SPINE-like": "S P AY N L AY K", "SPINE-ee-like": "S P AY N IY L AY K"},
            "non-woody": {"NON-woody": "N AA N W UH D IY", "N-O-N woody": "EH N OW EH N W UH D IY"},
            "butterfly pea": {"pea (PEE)": "B AH T ER F L AY P IY", "pay": "B AH T ER F L AY P EY"},
            "Doctor Basil": {"Doctor": "D AA K T ER B EY Z AH L", "Drive": "D R AY V B EY Z AH L"}}
    for f, w in [("w_cactus_heart", "cactus"), ("w_cacti_pip", "cacti"), ("w_spinelike_pip", "spine-like"), ("w_nonwoody_momo", "non-woody"),
                 ("w_butterflypea_basil", "butterfly pea"), ("w_doctorbasil_basil", "Doctor Basil")]:
        p = f"{D}/{f}.wav"; print(f"{f:24s} heard as: {word_choice(p, WORD[w]):14s} phones: {allphone(p)}")
    S = lambda t: [x for x in re.sub(r"[^a-z' ]", " ", t.lower()).split()]
    LINE = [("cactus_heart_l403", "a", {"cactus": [("cactus", "K AE K T AH S")], "cacti": [("cacti", "K AE K T AY")]}, "lives in dry places its leaves are shaped like spines to reduce water loss"),
            ("cactus_basil_p303", "two a", {"cactus": [("cactus", "K AE K T AH S")], "cacti": [("cacti", "K AE K T AY")]}, "isn't even a real plant so it hardly needs anything"),
            ("cacti_pip_p301", "two", {"KAK-tie": [("cacti", "K AE K T AY")], "KAK-tee": [("cacti", "K AE K T IY")], "KAK-tus": [("cacti", "K AE K T AH S")]}, "live in dry places so they need lots of light and only a little water"),
            ("spinelike_pip_l408", "spike already has leaves", {"spine-like": [("spine", "S P AY N"), ("like", "L AY K")], "spine-ee-like": [("spine", "S P AY N IY"), ("like", "L AY K")]}, "leaves"),
            ("spinelike_heart_w506", "a cactus stores water in its thick stem and its", {"spine-like": [("spine", "S P AY N"), ("like", "L AY K")], "spine-ee-like": [("spine", "S P AY N IY"), ("like", "L AY K")]}, "leaves lose very little"),
            ("nonwoody_momo_t804", "and this mint's stem is soft and bendy a", {"NON-woody": [("non", "N AA N"), ("woody", "W UH D IY")], "N-O-N woody": [("non", "EH N OW EH N"), ("woody", "W UH D IY")]}, "stem"),
            ("nonwoody_heart_hk", "woody", {"NON-woody": [("non", "N AA N"), ("woody", "W UH D IY")], "N-O-N woody": [("non", "EH N OW EH N"), ("woody", "W UH D IY")]}, ""),
            ("butterflypea_basil_t805", "the", {"butterfly PEE": [("butterfly", "B AH T ER F L AY"), ("pea", "P IY")], "butterfly PAY": [("butterfly", "B AH T ER F L AY"), ("pea", "P EY")]}, "has a weak stem it coils round the pole to climb up to more light a climber"),
            ("doctorbasil_basil_c102", "", {"Doctor": [("doctor", "D AA K T ER"), ("basil", "B EY Z AH L")], "Drive": [("drive", "D R AY V"), ("basil", "B EY Z AH L")]}, "is in i'm an expert at plants"),
            ("doctorbasil_dr_basil", "", {"Doctor": [("doctor", "D AA K T ER"), ("basil", "B EY Z AH L")], "Drive": [("drive", "D R AY V"), ("basil", "B EY Z AH L")]}, "is in"),
            ("lim_s601", "", {"EYE-yoh": [("aiyoh", "AY Y OW")], "AY-yo (day)": [("aiyoh", "EY Y OW")]}, "cactus in the bathroom put here lah my corridor got sun"),
            ("lim_s601_own", "", {"EYE-yoh": [("aiyoh", "AY Y OW")], "AY-yo (day)": [("aiyoh", "EY Y OW")]}, "cactus in the bathroom put here lah my corridor got sun")]
    for who in ("spike_A", "spike_B", "spike_C"):
        for tag in ("c110", "c110_own"):
            LINE.append((f"{who}_{tag}", "", {"I AM (strong)": [("i", "AY"), ("am", "AE M")], "I am (weak)": [("i", "AY"), ("am", "AH M")], "I'm": [("i'm", "AY M")]}, "a plant thank you"))
    for f, pre, var, post in LINE:
        ch, gap = line_choice(f"{D}/{f}.wav", S(pre), var, S(post))
        print(f"{f:26s} in the line heard as: {ch:16s}" + (f" pause between the parts {gap:.2f} s" if gap is not None else "") + "  durations " + " ".join(f"{w} {d:.2f}" for w, d in getattr(line_choice, "last", [])))
