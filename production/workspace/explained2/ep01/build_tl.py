"""build_tl.py: script.py + voice/*.json -> tl.json and tl.js (window.TL): scenes, lines (absolute times, words, mouth tracks), marks.
  python3 build_tl.py      Sound (song.js) and picture (page) both read this one timeline."""
import json, os
from script import SEQ
H = os.path.dirname(os.path.abspath(__file__)); t = 0.0; scenes = []; lines = {}; marks = {}; order = []
r = lambda x: round(x, 3)
for it in SEQ:
    k = it[0]
    if k == "scene":
        if scenes: scenes[-1]["t1"] = r(t)
        scenes.append({"name": it[1], "t0": r(t)})
    elif k == "wait": t += it[1]
    elif k == "mark": marks[it[1]] = r(t)
    elif k == "chant":
        v = json.load(open(f"{H}/voice/{it[1]}.json")); lines[it[1]] = {"who": "chant", "t": r(t), "dur": v["dur"], "end": r(t + v["bar"] * 4), "bar": v["bar"], "text": v["text"],
            "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"])} for w in v["words"]], "tracks": v["tracks"]}
        order.append(it[1]); t += v["bar"] * 4
    elif k == "say":
        _, id, who, text, o = it; v = json.load(open(f"{H}/voice/{id}.json")); t += o.get("pre", .35)
        lines[id] = {"who": who, "t": r(t), "dur": v["dur"], "end": r(t + v["dur"]), "text": text, "scene": scenes[-1]["name"],
                     "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"])} for w in v["words"]], "mouth": v["mouth"], "open": v["open"], "stress": [r(t + s) for s in v["stress"]]}
        order.append(id); t += v["dur"] + o.get("post", 0)
scenes[-1]["t1"] = r(t)
TL = {"END": r(t), "FPS": 30, "scenes": scenes, "lines": lines, "order": order, "marks": marks}
json.dump(TL, open(f"{H}/tl.json", "w")); open(f"{H}/tl.js", "w").write("window.TL=" + json.dumps(TL) + ";")
for s in scenes: print(f"{int(s['t0'] // 60)}:{s['t0'] % 60:05.2f}  {s['name']:10} {s['t1'] - s['t0']:.1f}s")
print("END", TL["END"], f"= {int(t // 60)}:{t % 60:04.1f}")
