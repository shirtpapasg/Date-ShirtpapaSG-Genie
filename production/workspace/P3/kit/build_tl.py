"""Timeline for one episode: segment times, voice.wav, captions, cues, key-word pops, confetti bursts, scenes.

build(D, al, cfg) is called by prep_p3.py with the aligned segments (welcome and bye included) and the episode config.
Timing rules (identical to the finished P4 episodes):
  0.5 s silence before the first segment; 0.55 s between segments of the same scene, 1.0 s on a scene change,
  1.2 s before the goodbye, 4.9 s between quiz1 and quiz2 (the 4-second "Think!" countdown);
  END = goodbye start + 3.6 s (the goodbye plays over the 4 s end card, which is not in "scenes").
"""
import json, re, subprocess

INTRO, GAP_SAME, GAP_SCENE, GAP_END, GAP_QUIZ, END_HOLD = 0.5, 0.55, 1.0, 1.2, 4.9, 3.6


def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]))


def cue_table(segs):
    """{seg id: {word: t, word#n: t}}: word = token lowercased with everything but a-z and ' removed; plain word = first time"""
    cues = {}
    for s in segs:
        cs = {}
        for w in s["words"]:
            k = re.sub(r"[^a-z']", "", w["t"].lower())
            n2 = 1
            while f"{k}#{n2}" in cs: n2 += 1
            cs[f"{k}#{n2}"] = w["a"]
            if n2 == 1: cs[k] = w["a"]
        cues[s["id"]] = cs
    return cues


def brand_captions(caps):
    """spoken "The One App" shows on screen as the brand name "TheOneApp" (may straddle two caption lines: keep it on the first)"""
    flat = [(ci, w) for ci, cp in enumerate(caps) for w in cp["w"]]
    for i in range(len(flat) - 2):
        (c0, w0), (c1, w1), (c2, w2) = flat[i:i + 3]
        if [w0["t"], w1["t"]] == ["The", "One"] and w2["t"].startswith("App"):
            w0.update(t="TheOne" + w2["t"], b=w2["b"]); w1["drop"] = w2["drop"] = 1; caps[c0]["t1"] = max(caps[c0]["t1"], w2["b"])
    for cp in caps: cp["w"] = [w for w in cp["w"] if not w.get("drop")]
    return [cp for cp in caps if cp["w"]]


def build(D, al, cfg, log=print):
    t = INTRO; segs = []; parts = [("sil", INTRO)]
    for i, s in enumerate(al):
        if i:
            g = GAP_SAME if al[i - 1]["scene"] == s["scene"] else GAP_SCENE
            if s["scene"] == "end": g = GAP_END
            if al[i - 1]["id"] == "quiz1" and s["id"] == "quiz2": g = GAP_QUIZ
            parts.append(("sil", g)); t += g
        d = dur(f"{D}/aud/{s['id']}.wav")
        words = [{"t": w["t"], "a": round(t + w["a"], 3), "b": round(t + w["b"], 3)} for w in s["words"]]
        segs.append({"id": s["id"], "scene": s["scene"], "t0": round(t, 3), "t1": round(t + d, 3), "words": words})
        parts.append(("seg", s["id"])); t += d
    assert segs[-1]["scene"] == "end"
    END = round(segs[-1]["t0"] + END_HOLD, 3)
    # narration track (24 kHz mono, like the TTS)
    inputs = []
    for k, v in parts:
        if k == "sil": inputs += ["-f", "lavfi", "-t", f"{v:.3f}", "-i", "anullsrc=r=24000:cl=mono"]
        else: inputs += ["-i", f"{D}/aud/{v}.wav"]
    n = len(parts)
    fc = "".join(f"[{i}:a]" for i in range(n)) + f"concat=n={n}:v=0:a=1,apad,atrim=0:{END}[out]"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + inputs + ["-filter_complex", fc, "-map", "[out]", f"{D}/voice.wav"], check=True)
    # captions: chunks of <= 5 words, break after punctuation
    chunks = []
    for s in segs:
        cur = []
        for w in s["words"]:
            cur.append(w)
            if w["t"][-1] in ".,?!" or len(cur) >= 5: chunks.append(cur); cur = []
        if cur: chunks.append(cur)
    caps = []
    for i, c in enumerate(chunks):
        t0 = c[0]["a"] - .06
        nxt = chunks[i + 1][0]["a"] - .06 if i + 1 < len(chunks) else c[-1]["b"] + .6
        caps.append({"t0": round(t0, 3), "t1": round(min(nxt, c[-1]["b"] + .7), 3), "w": c})
    cues = cue_table(segs)
    short = cfg.get("short", {})
    kws = [{"t": cues[k[0]][k[1]], "label": k[2], "short": k[4] if len(k) > 4 else short.get(k[2], k[2]), "col": k[3]} for k in cfg["kw"]]
    kws.sort(key=lambda k: k["t"])   # shelf slots fill top-down in order of appearance
    bursts = sorted(cues[sid][w] for sid, w in cfg.get("bursts", []))
    scenes = []
    for s in segs:
        if s["scene"] == "end": continue
        if not scenes or scenes[-1]["scene"] != s["scene"]: scenes.append({"scene": s["scene"], "t0": s["t0"], "t1": s["t1"]})
        else: scenes[-1]["t1"] = s["t1"]
    tl = {"END": END, "segs": [{k: v for k, v in s.items() if k != "words"} for s in segs], "caps": caps, "cues": cues, "kws": kws, "bursts": bursts, "scenes": scenes}
    tl["caps"] = brand_captions(tl["caps"])
    json.dump(tl, open(f"{D}/tl.json", "w"))
    return tl
