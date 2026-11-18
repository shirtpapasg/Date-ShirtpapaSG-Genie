"""set_silent.py: the lengths and sound cues of EP04's picture-only shots, written into ep04_segments.json (the narrated text is never touched).
   python3 ep04/set_silent.py   then   $PY build_tl.py ep04/ep04_segments.json ep04/aud ep04/ep04"""
import json, os
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ep04_segments.json'); d = json.load(open(F))
SIL = {
 "h0": (6.0, [["rain", 0], ["rain", 1.6], ["boom", 1.0], ["rumble", 1.05], ["boom", 4.35]]),
 "w1": (6.5, [["pad_wonder", 0], ["splash", 1.45], ["underwater", 1.6], ["bubble", 1.8], ["pop", 2.5], ["pop", 2.7], ["pop", 2.9], ["sparkle", 3.6], ["whoosh", 5.75], ["riser", 6.05]]),
 "w2": (5.5, [["pad_wonder", 2.35], ["pop", 3.4], ["sun_whoosh", 3.4], ["wind", 3.6]]),
 "w3": (6.5, [["pop", 0.5], ["pass_by", 1.9], ["pop", 2.65], ["wind", 3.0], ["sparkle", 3.3], ["pass_by", 3.6], ["pop", 4.4]]),
 "w4": (5.0, [["wind", 0], ["pass_by", 1.0], ["splash", 1.95], ["pop", 2.1], ["splash", 3.45]]),
 "w5": (5.5, [["pad_tension", 0], ["chime", 0.4], ["wind", 1.0], ["pop", 2.9], ["pop", 3.1], ["pop", 3.3], ["bubble", 3.45], ["reveal", 4.5]]),
 "w6": (4.5, [["thud", 0.9], ["bubble", 0.95], ["thud", 1.8], ["bubble", 1.85], ["thud", 2.7], ["bubble", 2.75], ["rush", 3.0]]),
 "w7": (5.0, [["rain", 0], ["boom", 0.2], ["rush", 0.4], ["splash", 4.05], ["thud", 4.05]]),
 "w8": (5.0, [["rain", 0], ["pipe_rush", 0], ["tank_swirl", 1.4], ["splash", 4.3]]),
 "w9": (5.0, [["splash", 0.15], ["bubble", 0.5], ["bubble", 1.0], ["pop", 1.65], ["pop", 1.95], ["pop", 2.25], ["pop", 2.55], ["reveal", 2.6], ["chime", 3.0], ["sparkle", 3.4]]),
 "w10": (3.5, [["reveal", 0.2], ["chime", 1.3], ["sparkle", 2.3]]),
}
SHOTS = {"answer": [["greasy", 1.2, 420, 480], ["burnt", 1, 600, 450]],
 "n1": [["macritchie", 1.32, 340, 320], ["friends", 1.32, 860, 320], ["droplet", 1.32, 860, 600], ["rain", 1.32, 340, 600], ["home", 1, 600, 450]],
 "textbook": [["gains", 1.22, 420, 520], ["loses", 1.22, 960, 340], ["round", 1, 600, 450]],
 "salt": [["salt", 1.25, 380, 640], ["fresh", 1, 600, 450]],
 "try": [["chalk", 1.2, 560, 500], ["hour", 1, 600, 450]]}
HOLD = {}
for s in d["segments"]:
    if s["id"] in SIL: s["silent"], s["sfx"] = SIL[s["id"]]
    if s["id"] in SHOTS: s["shots"] = SHOTS[s["id"]]
    if s["id"] in HOLD: s["hold"] = HOLD[s["id"]]
json.dump(d, open(F, "w"), indent=1, ensure_ascii=False); print("ok")
