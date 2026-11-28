"""ep06/set_silent.py: sets the picture-only shots' lengths and sound cues, and the camera moves, in ep06_segments.json.
It never touches a narrated segment's text."""
import json, os
f = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ep06_segments.json"); d = json.load(open(f))
SIL = {
 "h0": (5.0, [["ep05_kids", 0], ["ep06_clink", .8], ["ep06_chomp", 3.3], ["ep05_munch", 3.65]]),
 "d1": (5.0, [["pad_wonder", 0], ["ep06_chomp", .9], ["splash", .98], ["ep06_chomp", 1.95], ["splash", 2.03], ["ep06_chomp", 3.0], ["splash", 3.08], ["ep06_squish", 3.7], ["whoosh", 4.4]]),
 "d2": (4.0, [["ep05_gulp", 0], ["ep06_squish", .02], ["ep06_squish", 1.12], ["pass_by", 1.7], ["ep06_squish", 2.22], ["ep06_squish", 3.32], ["pad_wonder", 3.85]]),
 "d3": (5.0, [["splash", 0], ["tank_swirl", .2], ["ep06_gurgle", 1.0], ["bubble", 2.4], ["ep06_gurgle", 3.0], ["bubble", 4.2]]),
 "d4": (7.0, [["pass_by", .3], ["pass_by", 1.3], ["pop", 2.5], ["pop", 2.8], ["sparkle", 3.9], ["pad_wonder", 3.55], ["sparkle", 4.6], ["reveal", 3.75], ["ep06_squish", 5.6], ["pass_by", 6.1]]),
 "d5": (5.0, [["ep06_slurp", .4], ["ep06_slurp", 1.3], ["ep06_slurp", 2.2], ["ep06_squish", 2.9], ["ep06_slurp", 3.2], ["ep06_squish", 3.8], ["thud", 4.3]]),
 "d6": (3.5, [["riser", .25], ["deep", 0]]),
 "d7": (4.5, [["ep06_plop", .6], ["splash", .64], ["click", 2.35], ["ep06_flush", 2.45]]),
}
SHOTS = {"news": [["flush", 1.6, 330, 290], ["deep", 1.45, 520, 560], ["plants", 1.5, 800, 420], ["some", 1.35, 940, 380], ["forty", 1.1, 620, 465]]}
for s in d["segments"]:
    if s["id"] in SIL: s["silent"], s["sfx"] = SIL[s["id"]]
    if s["id"] in SHOTS: s["shots"] = SHOTS[s["id"]]
d["close"]["rows"][0][2] = "breaks"
json.dump(d, open(f, "w"), indent=1, ensure_ascii=False); print("ok")
