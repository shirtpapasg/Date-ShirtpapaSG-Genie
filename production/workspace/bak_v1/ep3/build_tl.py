import json, re, subprocess, os
S = os.path.dirname(os.path.abspath(__file__))
al = json.load(open(S + "/align_ep3.json"))
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
KW = [("parts1", "blade", "LEAF BLADE", "#2dc653"), ("parts2", "stalk", "LEAF STALK", "#a0522d"), ("parts2", "main", "MAIN VEIN", "#3a86ff"),
      ("parts3", "smaller", "SMALLER VEINS", "#00b4d8"), ("veins1", "parallel", "PARALLEL VEINS", "#ff9f1c"), ("veins2", "net", "NET VEINS", "#7b61ff"),
      ("ask", "questions", "ASK QUESTIONS", "#f72585"), ("habit1", "twominute", "TWO-MINUTE RULE", "#06d6a0"), ("habit2", "mind", "MIND MAP", "#ef476f")]
SHORT = {}
kws = [{"t": cues[sid][w], "label": lab, "short": SHORT.get(lab, lab), "col": col} for sid, w, lab, col in KW]
bursts = sorted([cues["parts3"]["four"], cues["quiz2"]["net#2"] if "net#2" in cues["quiz2"] else cues["quiz2"]["net"], cues["close"]["comments"]])
scenes = []
for s in segs:
    if not scenes or scenes[-1]["scene"] != s["scene"]: scenes.append({"scene": s["scene"], "t0": s["t0"], "t1": s["t1"]})
    else: scenes[-1]["t1"] = s["t1"]
json.dump({"END": END, "segs": [{k: v for k, v in s.items() if k != "words"} for s in segs], "caps": caps, "cues": cues, "kws": kws, "bursts": bursts, "scenes": scenes}, open(S + "/tl.json", "w"))
print("END", END); [print(x["scene"], x["t0"], x["t1"]) for x in scenes]; [print(k["label"], k["t"]) for k in kws]
