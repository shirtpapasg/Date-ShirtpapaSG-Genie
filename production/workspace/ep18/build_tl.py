import json, re, subprocess, os
S = os.path.dirname(os.path.abspath(__file__))
al = json.load(open(S + "/align_ep18.json"))
INTRO, GAP_SAME, GAP_SCENE, OUTRO = 0.5, 0.55, 1.0, 4.0
dur = lambda f: float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
t = INTRO; segs = []; parts = [("sil", INTRO)]
for i, s in enumerate(al):
    if i:
        g = GAP_SAME if al[i-1]["scene"] == s["scene"] else GAP_SCENE
        if s["scene"] == "end": g = 1.2
        if al[i-1]["id"] == "quiz1" and s["id"] == "quiz2": g = 4.9   # 4-second countdown to think before the answer
        parts.append(("sil", g)); t += g
    d = dur(f"{S}/aud/{s['id']}.wav")
    words = [{"t": w["t"], "a": round(t + w["a"], 3), "b": round(t + w["b"], 3)} for w in s["words"]]
    segs.append({"id": s["id"], "scene": s["scene"], "t0": round(t, 3), "t1": round(t + d, 3), "words": words})
    parts.append(("seg", s["id"])); t += d
END = round(segs[-1]["t0"] + 3.6 if segs[-1]["scene"] == "end" else t + OUTRO, 3)
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
KW = [("temp", "temperature", "TEMPERATURE", "#e63946"), ("temp", "celsius", "DEGREES CELSIUS (°C)", "#f77f00"), ("camera", "thermal", "THERMAL CAMERA", "#ff006e"),
      ("types", "thermometer", "THERMOMETER", "#3a86ff"), ("types", "digital", "DIGITAL THERMOMETER", "#06d6a0"), ("types", "infrared", "INFRARED THERMOMETER", "#7209b7"), ("types", "laboratory", "LAB THERMOMETER", "#d00000"),
      ("lab", "bulb", "BULB FULLY IN", "#00b4d8"), ("logger", "logger", "DATA LOGGER", "#6c757d"), ("habit1", "measure", "MEASURE PROGRESS", "#ff9f1c")]
SHORT = {"DEGREES CELSIUS (°C)": "°C", "MEASURE PROGRESS": "TRACK SCORES"}
kws = [{"t": cues[sid][w], "label": lab, "short": SHORT.get(lab, lab), "col": col} for sid, w, lab, col in KW]
bursts = sorted([cues["hook"]["mixed"], cues["quiz2"]["laboratory"], cues["close"]["yes"]])
scenes = []
for s in segs:
    if s["scene"] == "end": continue
    if not scenes or scenes[-1]["scene"] != s["scene"]: scenes.append({"scene": s["scene"], "t0": s["t0"], "t1": s["t1"]})
    else: scenes[-1]["t1"] = s["t1"]
json.dump({"END": END, "segs": [{k: v for k, v in s.items() if k != "words"} for s in segs], "caps": caps, "cues": cues, "kws": kws, "bursts": bursts, "scenes": scenes}, open(S + "/tl.json", "w"))
print("END", END); [print(x["scene"], x["t0"], x["t1"]) for x in scenes]; [print(k["label"], k["t"]) for k in kws]
