"""make_moments.py: EP23's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method; EP22's script).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries for EP23's two parts; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP23_P1" / "EP23_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words (script section 7).
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out), and "Your score, key words and next
time" at the score-hand scene. EP23 RETIRES the classic GNQn_TeCRgg (videos.js now numbers it '23A'; its partner zAUE_ZuxcDs is '23B')."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
M, CHM, L1B = "O.magProps", "CH.makingMagnets", "lab:p3-7-1b"
PARTS = {1: [("m401", "Round 1: take the battery away. Stay or drop?", [M, CHM, L1B]),
             ("m501", "Journey: be the iron nail in a coil", [M, CHM, L1B]),
             ("m601", "Take the battery away: the clips drop", [M, L1B]),
             ("m603m", "The electrical method", [CHM, M, "mix:electrical:16", L1B]),
             ("m702", "On and off: an electromagnet", [CHM, M, "mix:electrical:16"]),
             ("m801m", "HOLD ON! Stay safe: batteries only", [CHM, L1B]),
             ("m902", "What makes it a magnet: both ends joined", [CHM, "mix:electrical:16", L1B]),
             ("m905b", "Coil: neat turns of wire round the nail", [CHM, "mix:electrical:16", L1B])],
         2: [("n401", "Round 1: ten turns or twenty?", [CHM, M, "mix:electrical:20", L1B]),
             ("n501", "Journey: be a steel bolt", [CHM, M, "mix:electrical:20"]),
             ("n601", "More turns of wire", [CHM, M, "mix:electrical:20", L1B]),
             ("n705", "An electromagnet in the school bell", [M, "mix:electrical:20"]),
             ("n801", "Showdown: Momo's poster", [CHM, M]),
             ("n804b", "Iron and steel can be made into magnets", [CHM, M]),
             ("n902", "More batteries", [CHM, "mix:electrical:20", L1B]),
             ("n904p", "The number of batteries", [CHM, "mix:electrical:20", L1B])]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP23, for TheOneApp videos.js P3 after upload: the classic GNQn_TeCRgg ('23A' in videos.js today, 'Turn A Nail Into A Magnet, Two "
       "Ways (Part A)') is RETIRED by EP22 + EP23: remove it and add EP23's two entries in its place (renumber as the app needs: the classic "
       "'23B' zAUE_ZuxcDs stays until EP24/EP25). Its moments go: 'The electrical method: an electromagnet' -> EP23 P1 'The electrical method'; "
       "'Making a magnet stronger' -> EP23 P2 'More turns of wire'; 'Try it on experiments 7.1A and 7.1B' -> EP22 P1's stroke moment (7.1A) and "
       "EP23 P2 'More batteries' (7.1B); 'Quiz: take the battery away and the clips fall' -> EP23 P1 'Take the battery away: the clips drop'; "
       "'The stroke method' moments -> EP22's. Keys are videos.js constant names (CH.makingMagnets, O.magProps) and strings as the old entry used.",
       "replaces": ["GNQn_TeCRgg"], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what, keys in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": keys, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"23{'AB'[P - 1]}", "art": ["🔋", "🏗️"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP23_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP23_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP23_P{P}", ch[f"EP23_P{P}"])
