"""make_moments.py: EP24's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method; EP22's script).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries for EP24 two parts; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP24_P1" / "EP24_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words (script section 7).
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out), and "Your score, key words and next
time" at the score-hand scene. EP24 + EP25 retire the classic zAUE_ZuxcDs (23B)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
M, CHM, L72 = "O.magProps", "CH.makingMagnets", "lab:p3-7-2"
PARTS = {1: [("m401", "Round 1: is Basil's test fair?", [M, CHM, L72]),
             ("m501", "Journey: be a steel paper clip", [M, CHM]),
             ("m601", "Two things changed: an unfair test", [CHM, L72]),
             ("m702", "Look closer: which variable did it?", [CHM, L72]),
             ("m705m", "A fair test: change only one thing", [CHM, L72]),
             ("m801m", "HOLD ON! The magnet race: the same height", [CHM, M]),
             ("m902", "Make it fair: only the nail changed", [CHM, L72]),
             ("m904b", "An experiment answers a question", [CHM, L72])],
         2: [("n401", "Round 1: Momo's plan, X and Y. Fair?", [CHM, L72]),
             ("n503b", "A prediction", [CHM, L72]),
             ("n602", "Our plan: changed, kept the same, measured", [CHM, L72]),
             ("n701", "Showdown: Pip's plan card", [CHM, L72]),
             ("n801", "Journey: a paper clip, counted again and again", [CHM]),
             ("n902", "Repeat the test: reliable results", [CHM, L72])]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP24, for TheOneApp videos.js P3 after upload: EP24 (fair tests) and EP25 (magnets everywhere) together replace the classic zAUE_ZuxcDs ('23B' in videos.js today: fair tests and magnets everywhere). Add EP24's two entries now; remove '23B' only when EP25 is in the app too (its fair-test moments -> EP24's, its magnets-everywhere moments -> EP25's). Keys are videos.js constant names (CH.makingMagnets, O.magProps) and strings as the old entry used; check them against videos.js when the app is updated.", "replaces": ["zAUE_ZuxcDs"], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what, keys in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": keys, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"24{'AB'[P - 1]}", "art": ["⚖️", "🔁"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP24_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP24_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP24_P{P}", ch[f"EP24_P{P}"])
