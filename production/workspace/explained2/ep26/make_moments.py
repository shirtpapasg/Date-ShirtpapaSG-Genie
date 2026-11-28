"""make_moments.py: EP26's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method; EP22's script).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries for EP26 two parts; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP26_P1" / "EP26_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words (script section 7).
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out), and "Your score, key words and next
time" at the score-hand scene. EP24 + EP25 retire the classic zAUE_ZuxcDs (23B)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
M, CHM, L72 = "O.magProps", "CH.makingMagnets", "lab:p3-7-2"
PARTS = {1: [("m401", "The question: which bar is a magnet?", []),
             ("m402", "Round 1: which answer gets full marks?", []),
             ("m602", "Meet the CECL Genie", []),
             ("m702", "Look closer: what Basil's answer missed", []),
             ("m801p", "HOLD ON! Evidence or Concept?", []),
             ("m902", "Build a full answer: C, E, C, L", [])],
         2: [("n401", "Question one: a fair test", []),
             ("n402", "Round 1: does it need a Choice?", []),
             ("n602", "Your turn: Evidence, Concept, Link", []),
             ("n701", "Showdown: which part is missing?", []),
             ("n902", "The most common mistake: add the Link", []),
             ("n1201", "Find the CECL Genie in TheOneApp", [])]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP26, the CECL exam-skills special, for TheOneApp videos.js P3 after upload: add two entries on the Study Skills shelf like EP0 (topic 'Study Skills', keys []), numbered as the app needs ('26A' / '26B' here). Nothing is replaced.", "replaces": [], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what, keys in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": keys, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"26{'AB'[P - 1]}", "art": ["🧞", "🧞"][P - 1], "topic": "Study Skills", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP26_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, the Genie in TheOneApp and key words" if P == 2 else "Your score, key words and next time"]); ch[f"EP26_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP26_P{P}", ch[f"EP26_P{P}"])
