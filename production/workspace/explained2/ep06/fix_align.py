"""fix_align.py: for a line pocketsphinx could not align, place each sentence in its own stretch of speech (Heart leaves a clear gap
between sentences), then spread that sentence's words by length.  python3 fix_align.py f502"""
import sys, json, re, numpy as np, soundfile as sf
for id in sys.argv[1:]:
    j = json.load(open(f"voice/{id}.json")); x, sr = sf.read(f"voice/{id}.wav"); env = np.convolve(np.abs(x), np.ones(480) / 480, "same") > .01
    segs = []; on = None
    for i in range(0, len(env), 240):
        if env[i] and on is None: on = i
        if not env[i] and on is not None:
            if segs and (on - segs[-1][1]) / sr < .3: segs[-1][1] = i
            else: segs.append([on, i])
            on = None
    if on is not None: segs.append([on, len(env)])
    sents = [s for s in re.split(r"(?<=[.!?])\s+", j["text"]) if s]
    if len(segs) != len(sents): print(id, "segments", len(segs), "sentences", len(sents), "- left as it is"); continue
    words = []
    for (a, b), s in zip(segs, sents):
        toks = s.split(); tot = sum(len(t) + 2 for t in toks); c = a / sr
        for t in toks: L = (b - a) / sr * (len(t) + 2) / tot; words.append({"w": t, "a": round(c, 3), "b": round(c + L * .9, 3)}); c += L
    j["words"] = words; j["aligned"] = "by sentence"; json.dump(j, open(f"voice/{id}.json", "w")); print(id, "placed by sentence:", len(sents), "sentences")
