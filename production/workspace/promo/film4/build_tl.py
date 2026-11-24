"""build_tl.py: the film's clock. voice/<id>.json + the running order below -> tl.json + tl.js (window.TL).
TL.lines[id] = {who, text, keys, t, end, dur, words (absolute times), mouth / open / stress (or tracks for the trio)}; TL.scenes, TL.marks.
The order is a cursor: ("scene", name) starts a scene now; ("wait", s) moves on; ("line", id[, gap after]) places a line now and moves to
its end (+ gap); ("mark", name[, offset]) names a moment for the pictures and the sound."""
import json, os
from script import LINES, NAMES
H = os.path.dirname(os.path.abspath(__file__))
L = {id: (who, text, o) for id, who, text, o in LINES}
ORDER = [
    ("scene", "station"), ("mark", "music"), ("wait", 1.0), ("line", "h01", .25),
    ("mark", "trainIn", -.6), ("wait", 1.5), ("mark", "trainStop"),
    ("scene", "mystery"), ("wait", .3), ("mark", "doors"), ("wait", .5), ("mark", "stepOut"), ("wait", 1.3), ("line", "m01", .3), ("line", "p01", .3), ("mark", "shopLook", -.2), ("line", "b01", .45), ("line", "h02", .5),
    ("scene", "quiz"), ("wait", .2), ("line", "b02", .25), ("mark", "cards"), ("line", "p02", .35), ("mark", "tap"), ("line", "u01", .45),
    ("mark", "pick"), ("wait", .7), ("mark", "tick"), ("line", "h03", .3), ("mark", "coins"), ("line", "m02", .4),
    ("scene", "days"), ("wait", .3), ("line", "h04", .4), ("mark", "full", -.6),
    ("scene", "shop"), ("mark", "shopOn"), ("wait", .5), ("line", "p03", .1), ("mark", "buy", -.2), ("wait", 1.2), ("mark", "bought", -.4),
    ("scene", "dress"), ("wait", .35), ("line", "b03", .3), ("line", "h05", .1),
    ("scene", "games"), ("wait", 3.4),
    ("scene", "versus"), ("wait", .5), ("line", "p04", .2), ("mark", "question"), ("wait", .8), ("mark", "drop"), ("wait", 1.5), ("mark", "pipGrab"), ("wait", .45),
    ("mark", "youGrab"), ("wait", .75), ("mark", "win"), ("wait", .2), ("line", "m03", .35), ("line", "h06", .4),
    ("scene", "end"), ("wait", .5), ("line", "m04", .2), ("line", "b04", .2), ("line", "p05", .45), ("mark", "logo"), ("line", "h07", .3), ("wait", 3.0), ("mark", "fade"), ("wait", 1.0),
]
t = 0.0; lines = {}; scenes = []; marks = {}; order = []
for it in ORDER:
    k = it[0]
    if k == "scene":
        if scenes: scenes[-1]["t1"] = round(t, 3)
        scenes.append({"name": it[1], "t0": round(t, 3)})
    elif k == "wait": t += it[1]
    elif k == "mark": marks[it[1]] = round(t + (it[2] if len(it) > 2 else 0), 3)
    elif k == "line":
        id = it[1]; who, text, o = L[id]; v = json.load(open(f"{H}/voice/{id}.json")); d = v["dur"]
        x = {"who": "chant" if who == "trio" else who, "speaker": who, "name": NAMES[who], "text": text, "keys": o.get("keys", []), "gain": o.get("gain", 1), "t": round(t, 3), "dur": d, "end": round(t + d, 3),
             "words": [{"w": w["w"], "a": round(t + w["a"], 3), "b": round(t + w["b"], 3)} for w in v["words"]]}
        if who == "trio": x["tracks"] = v["tracks"]
        else: x.update(mouth=v["mouth"], open=v["open"], stress=[round(t + s, 3) for s in v["stress"]])
        lines[id] = x; order.append(id); t += d + (it[2] if len(it) > 2 else .3)
scenes[-1]["t1"] = round(t, 3)
TL = {"END": round(t, 3), "scenes": scenes, "marks": marks, "lines": lines, "order": order}
json.dump(TL, open(f"{H}/tl.json", "w")); open(f"{H}/tl.js", "w").write("window.TL=" + json.dumps(TL) + ";\n")
for s in scenes: print(f"{s['name']:8s} {s['t0']:6.2f} -> {s['t1']:6.2f}  ({s['t1'] - s['t0']:.2f} s)")
print("END", TL["END"])
