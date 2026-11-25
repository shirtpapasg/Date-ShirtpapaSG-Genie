"""make_moments.py: EP25's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method; EP22's script).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries for EP25 two parts; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP25_P1" / "EP25_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words (script section 7).
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out), and "Your score, key words and next
time" at the score-hand scene. EP24 + EP25 retire the classic zAUE_ZuxcDs (23B)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
M, CHM, L72 = "O.magProps", "CH.makingMagnets", "lab:p3-7-2"
PARTS = {1: [("m401", "Round 1: what keeps the fridge door closed?", [M, CHM]),
             ("m501", "Journey: be the magnetic strip in the fridge door", [M, CHM]),
             ("m602p", "A magnetic strip inside the fridge door", [M, CHM]),
             ("m801b", "HOLD ON! Is a shiny aluminium frame magnetic?", [M]),
             ("m902", "A magnetic whiteboard: a steel sheet inside", [M, CHM]),
             ("m905", "A magnetic doorstop", [M, CHM])],
         2: [("n401", "Round 1: aluminium clips in the fishing game", [M, L72]),
             ("n602", "The scrapyard crane: an electromagnet", [M, CHM]),
             ("n701", "Showdown: design a magnet toy (like poles push)", [M, L72]),
             ("n801", "Journey: be a floating train", [M, CHM]),
             ("n902", "A maglev train: the magnets repel", [M, CHM]),
             ("n904", "An MRI scanner", [M, CHM]),
             ("n1001s", "Magnets interacting", [M])]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP25, for TheOneApp videos.js P3 after upload: with EP24 it replaces the classic zAUE_ZuxcDs ('23B': fair tests and magnets everywhere): remove '23B' once EP24 and EP25 are both in the app (its fair-test moments -> EP24's, its magnets-everywhere moments -> EP25's). Keys as the videos.js constant names; check against videos.js when the app is updated.", "replaces": ["zAUE_ZuxcDs"], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what, keys in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": keys, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"25{'AB'[P - 1]}", "art": ["🧊", "🚄"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP25_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and goodbye" if P == 2 else "Your score, key words and next time"]); ch[f"EP25_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP25_P{P}", ch[f"EP25_P{P}"])
