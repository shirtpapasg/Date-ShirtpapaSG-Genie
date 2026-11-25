"""make_moments.py: EP22's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 20A / 20B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP22_P1" / "EP22_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene. EP22 retires nothing (EP23 retires the classic GNQn_TeCRgg)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.interactions", "CH.magnets"]
PARTS = {1: [("m501", "Round 1: stroke an iron nail again and again. What happens?"),
             ("m601", "Journey: be the iron nail and feel the strokes"),
             ("m701", "The answer: the stroked nail attracts the clips"),
             ("m704b", "The stroke method makes a magnet"),
             ("m802", "Look closer: was the nail a magnet already?"),
             ("m805", "Magnetised: Pip's nail has been made into a magnet"),
             ("m901b", "HOLD ON! Basil tests his nail. What did he miss?"),
             ("m905s", "Test the nail with the magnet put away"),
             ("m1002", "Look closer: copper, foil, a chopstick and a steel screwdriver"),
             ("m1005p", "A magnetic object can be magnetised")],
         2: [("n401", "Round 1: back and forth, or one way?"),
             ("n501", "Journey: be a steel paper clip"),
             ("n601", "The answer: one way makes the stronger nail magnet"),
             ("n702", "Look closer: lift the magnet up and away, back to the head"),
             ("n705m", "Same direction: stroke the same way every time"),
             ("n801", "Showdown: Pip's poster, find the line to fix"),
             ("n806b", "Same pole: use the same end of the magnet every time"),
             ("n902", "Look closer: ten, twenty and thirty strokes"),
             ("n905p", "More strokes make a stronger magnet")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP22, for TheOneApp videos.js P3 after upload: ADD as two entries (no video is retired by EP22: the classic GNQn_TeCRgg stays "
       "until EP23 is live), replace keys' strings by the constants (O.interactions and CH.magnets are placeholders: check the real names in "
       "videos.js), set url to the uploaded video ids.", "replaces": [], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"22{'AB'[P - 1]}", "art": ["🧲", "🎣"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP22_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP22_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP22_P{P}", ch[f"EP22_P{P}"])
