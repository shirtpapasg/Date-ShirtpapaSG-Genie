"""build_tl.py: script.py + voice/*.json -> tl_p<part>.json and tl_p<part>.js (window.TL): scenes, lines (absolute times, words, mouth tracks), marks.
  python3 build_tl.py 1|2      Sound (song.js) and picture (page) both read this one timeline."""
import json, os, sys
from script import SEQS
PART = int(sys.argv[1]) if len(sys.argv) > 1 else 1; SEQ = SEQS[PART]
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
        v = json.load(open(f"{H}/voice/{it[1]}.json")); lines[it[1]] = {"who": "chant", "t": r(t), "dur": v["dur"], "end": r(t + v["len"]), "bar": v["bar"], "slots": v["slots"], "nbars": v["nbars"], "ncall": v.get("ncall", 4), "text": v["text"], "gain": .8,
            "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"]), "slot": w["slot"]} for w in v["words"]], "tracks": v["tracks"]}
        order.append(it[1]); t += v["len"]
    elif k == "unison":
        _, id, text, o = it; v = json.load(open(f"{H}/voice/{id}.json"))
        if o.get("sync"):    # together with the line just before it (Heart and the buddies shout it at the same time)
            p = lines[order[-1]]; lines[id] = {"who": "chant", "t": p["t"], "dur": v["dur"], "end": r(p["t"] + v["len"]), "text": text, "gain": .95 if o.get("crowd") else .7,
                "words": [{"w": w["w"], "a": r(p["t"] + w["a"]), "b": r(p["t"] + w["b"])} for w in v["words"]], "tracks": v["tracks"]}
            order.append(id); t = max(t, p["t"] + v["len"]); continue
        t += o.get("pre", .3)
        lines[id] = {"who": "chant", "t": r(t), "dur": v["dur"], "end": r(t + v["len"]), "text": text, "gain": .34 if o.get("quiet") else .8,
            "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"])} for w in v["words"]], "tracks": v["tracks"]}
        order.append(id); t += v["len"] + o.get("post", 0)
    elif k == "say":
        _, id, who, text, o = it; v = json.load(open(f"{H}/voice/{id}.json"))
        if o.get("after"): t = lines[o["after"][0]]["t"] + o["after"][1]     # onsets a fixed time apart (every line's speech starts 5 ms into its file)
        else: t += max(.16, o.get("pre", .35) * .75)
        lines[id] = {"who": who, "t": r(t), "dur": v["dur"], "end": r(t + v["dur"]), "text": text, "scene": scenes[-1]["name"],
                     "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"])} for w in v["words"]], "mouth": v["mouth"], "open": v["open"], "stress": [r(t + s) for s in v["stress"]], **({"know": r(t + v["know"])} if "know" in v else {})}
        order.append(id); t += v["dur"] + o.get("post", 0) * .75
scenes[-1]["t1"] = r(t)
TL = {"END": r(t), "FPS": 30, "scenes": scenes, "lines": lines, "order": order, "marks": marks}
TL["PART"] = PART
json.dump(TL, open(f"{H}/tl_p{PART}.json", "w")); open(f"{H}/tl_p{PART}.js", "w").write("window.TL=" + json.dumps(TL) + ";")
for s in scenes: print(f"{int(s['t0'] // 60)}:{s['t0'] % 60:05.2f}  {s['name']:10} {s['t1'] - s['t0']:.1f}s")
print("END", TL["END"], f"= {int(t // 60)}:{t % 60:04.1f}")
