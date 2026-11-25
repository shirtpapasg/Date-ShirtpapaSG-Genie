"""build_tl.py: script.py + voice/*.json -> tl_p<part>.json and tl_p<part>.js (window.TL): scenes, lines (absolute times, words, mouth tracks), marks.
  python3 build_tl.py 1|2      Sound (song.js) and picture (page) both read this one timeline.
EP22: a scene item may carry {"at": mark, "d": s} to start at a mark set earlier (a kw word inside the line just laid), so a scene can
change in the middle of a line (the cold open speaks within its first second, SERIES_FORMAT 11 item 1).
EP8 (the new pace): say opts kw = [[mark, word, nth]] put a mark at a word (a new term pops there); hold = s keeps the cursor at least
s after the line's start (a cream book strip: 3.5 s); holdw = [word, s] at least s after that word (a word strip); the item
("hold", mark, secs, gap) waits until mark + secs and at least gap after the cursor (a new term holds 2.0 s; Heart waits .6 s)."""
import json, os, sys, re
def _fake(id, text=None, kind="say"):
    p=f"{H}/voice/{id}.json"
    if os.path.exists(p): return json.load(open(p))
    ws=(text or "la la").split(); words=[]; t=0.05
    for w in ws: d=.28*max(1,len(re.sub(r"[^a-z]","",w.lower()))/4); words.append({"w":w,"a":t,"b":t+d,"slot":0}); t+=d+(.4 if w[-1] in ".!?" else .05)
    n=int(t*30)+1; return {"dur":t,"len":t,"words":words,"mouth":[1]*n,"open":[.5]*n,"stress":[],"know":t*.6,"bar":1.0,"slots":[[0,1],[2,3],[4,5]],"nbars":8,"ncall":3,"text":text or "","tracks":{}}

from script import SEQS
PART = int(sys.argv[1]) if len(sys.argv) > 1 else 1; SEQ = SEQS[PART]
H = os.path.dirname(os.path.abspath(__file__)); t = 0.0; scenes = []; lines = {}; marks = {}; order = []
r = lambda x: round(x, 3)
for it in SEQ:
    k = it[0]
    if k == "scene":   # ("scene", name) starts at the cursor; ("scene", name, {"at": mark, "d": s}) starts at a mark (+ d), e.g. a word inside the
        # line just laid (EP22: the cold open's pictures run UNDER Heart's first lines, so the episode speaks within its first second)
        t0 = marks[it[2]["at"]] + it[2].get("d", 0) if len(it) > 2 else t
        assert not scenes or scenes[-1]["t0"] < t0 <= t + 1e-6, ("scene starts out of order", it[1])
        if scenes: scenes[-1]["t1"] = r(t0)
        scenes.append({"name": it[1], "t0": r(t0)})
    elif k == "wait": t += it[1]
    elif k == "mark": marks[it[1]] = r(t)
    elif k == "hold": t = max(t + it[3], marks[it[1]] + it[2])
    elif k == "chant":
        v = _fake(it[1]); lines[it[1]] = {"who": "chant", "t": r(t), "dur": v["dur"], "end": r(t + v["len"]), "bar": v["bar"], "slots": v["slots"], "nbars": v["nbars"], "ncall": v.get("ncall", 4), "text": v["text"], "gain": .8,
            "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"]), "slot": w["slot"]} for w in v["words"]], "tracks": v["tracks"]}
        order.append(it[1]); t += v["len"]
    elif k == "unison":
        _, id, text, o = it; v = _fake(id, text)
        if o.get("sync"):    # together with the line just before it (Heart and the buddies shout it at the same time)
            p = lines[order[-1]]; lines[id] = {"who": "chant", "t": p["t"], "dur": v["dur"], "end": r(p["t"] + v["len"]), "text": text, "gain": .95 if o.get("crowd") else .7,
                "words": [{"w": w["w"], "a": r(p["t"] + w["a"]), "b": r(p["t"] + w["b"])} for w in v["words"]], "tracks": v["tracks"]}
            order.append(id); t = max(t, p["t"] + v["len"]); continue
        t += o.get("pre", .3)
        lines[id] = {"who": "chant", "t": r(t), "dur": v["dur"], "end": r(t + v["len"]), "text": text, "gain": .34 if o.get("quiet") else .8,
            "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"])} for w in v["words"]], "tracks": v["tracks"]}
        order.append(id); t += v["len"] + o.get("post", 0)
    elif k == "say":
        _, id, who, text, o = it; v = _fake(id, text)
        if o.get("after"): t = lines[o["after"][0]]["t"] + o["after"][1]     # onsets a fixed time apart (every line's speech starts 5 ms into its file)
        else: t += max(.16, o.get("pre", .35) * .75)
        lines[id] = {"who": who, "t": r(t), "dur": v["dur"], "end": r(t + v["dur"]), "text": text, "scene": scenes[-1]["name"],
                     "words": [{"w": w["w"], "a": r(t + w["a"]), "b": r(t + w["b"])} for w in v["words"]], "mouth": v["mouth"], "open": v["open"], "stress": [r(t + s) for s in v["stress"]], **({"know": r(t + v["know"])} if "know" in v else {})}
        order.append(id); t0 = t; t += v["dur"] + o.get("post", 0) * .75
        for mk, wd, *nth in o.get("kw", []):
            hits = [w for w in lines[id]["words"] if w["w"].lower().strip(".,!?:;") == wd]; marks[mk] = (hits[nth[0] if nth else 0] if hits else lines[id]["words"][0])["a"]
            if not hits: print("WARNING: no word", wd, "in", id)
        if o.get("hold"): t = max(t, t0 + o["hold"], t0 + v["dur"] + .6)   # the strip: 3.5 s on screen, and a moment after the last word
        if o.get("holdw"):
            hits = [w for w in lines[id]["words"] if w["w"].lower().strip(".,!?:;") == o["holdw"][0]]; t = max(t, (hits[0]["a"] if hits else t0) + o["holdw"][1])
scenes[-1]["t1"] = r(t)
TL = {"END": r(t), "FPS": 30, "scenes": scenes, "lines": lines, "order": order, "marks": marks}
TL["PART"] = PART
json.dump(TL, open(f"{H}/tl_p{PART}.json", "w")); print("FAKE TIMELINE (missing voices estimated)"); open(f"{H}/tl_p{PART}.js", "w").write("window.TL=" + json.dumps(TL) + ";")
if "-q" not in sys.argv:
    for s in scenes: print(f"{int(s['t0'] // 60)}:{s['t0'] % 60:05.2f}  {s['name']:10} {s['t1'] - s['t0']:.1f}s")
print("END", TL["END"], f"= {int(t // 60)}:{t % 60:04.1f}")
