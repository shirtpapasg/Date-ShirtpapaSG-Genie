import json, re, subprocess, os
S = os.path.dirname(os.path.abspath(__file__))
al = json.load(open(S + "/align_ep13.json"))
INTRO, GAP_SAME, GAP_SCENE, OUTRO = 0.5, 0.35, 0.8, 4.0
dur = lambda f: float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
t = INTRO; segs = []; parts = [("sil", INTRO)]
for i, s in enumerate(al):
    if i:
        g = GAP_SAME if al[i-1]["scene"] == s["scene"] else GAP_SCENE
        parts.append(("sil", g)); t += g
    d = dur(f"{S}/aud/{s['id']}.wav")
    words = [{"t": w["t"], "a": round(t + w["a"], 3), "b": round(t + w["b"], 3)} for w in s["words"]]
    segs.append({"id": s["id"], "scene": s["scene"], "t0": round(t, 3), "t1": round(t + d, 3), "words": words})
    parts.append(("seg", s["id"])); t += d
END = round(t + OUTRO, 3)
# audio
fl = []; inputs = []
for k, v in parts:
    if k == "sil": inputs += ["-f", "lavfi", "-t", f"{v:.3f}", "-i", "anullsrc=r=24000:cl=mono"]
    else: inputs += ["-i", f"{S}/aud/{v}.wav"]
n = len(parts)
fc = "".join(f"[{i}:a]" for i in range(n)) + f"concat=n={n}:v=0:a=1,apad,atrim=0:{END}[out]"
subprocess.run(["ffmpeg","-loglevel","error","-y"] + inputs + ["-filter_complex", fc, "-map", "[out]", f"{S}/voice.wav"], check=True)
# captions: chunks of <=5 words, break on punctuation
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
    nxt = chunks[i+1][0]["a"] - .06 if i + 1 < len(chunks) else c[-1]["b"] + .6
    caps.append({"t0": round(t0, 3), "t1": round(min(nxt, c[-1]["b"] + .7), 3), "w": c})
# cue lookup: first time a word appears in a segment
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
KW = [("energy", "energy", "ENERGY", "#ff9f1c"), ("energy", "forms", "FORMS OF ENERGY", "#f77f00"), ("sources", "source", "SOURCE OF LIGHT", "#e9c46a"),
      ("sources", "natural", "NATURAL", "#06d6a0"), ("sources", "manmade", "MAN-MADE", "#3a86ff"), ("natural", "star", "THE SUN IS A STAR", "#f77f00"), ("natural", "lightning", "LIGHTNING", "#7209b7"),
      ("living", "fireflies", "LIVING LIGHT", "#38b000"), ("edison", "persistence", "PERSISTENCE", "#e63946"), ("habit1", "celebrate", "CELEBRATE SMALL WINS", "#ff9f1c")]
SHORT = {"SOURCE OF LIGHT": "LIGHT SOURCE", "THE SUN IS A STAR": "SUN = STAR", "CELEBRATE SMALL WINS": "CELEBRATE"}
kws = [{"t": cues[sid][w], "label": lab, "short": SHORT.get(lab, lab), "col": col} for sid, w, lab, col in KW]
bursts = sorted([cues["natural"]["star"], cues["quiz2"]["manmade"], cues["close"]["people"]])
scenes = []
for s in segs:
    if not scenes or scenes[-1]["scene"] != s["scene"]: scenes.append({"scene": s["scene"], "t0": s["t0"], "t1": s["t1"]})
    else: scenes[-1]["t1"] = s["t1"]
json.dump({"END": END, "segs": [{k: v for k, v in s.items() if k != "words"} for s in segs], "caps": caps, "cues": cues, "kws": kws, "bursts": bursts, "scenes": scenes}, open(S + "/tl.json", "w"))
print("END", END); [print(x["scene"], x["t0"], x["t1"]) for x in scenes]; [print(k["label"], k["t"]) for k in kws]
