"""make_moments.py: EP19's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 16A / 16B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP19_P1" / "EP19_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.interactions", "CH.magnets"]
PARTS = {1: [("m501", "Round 1: a steel pin or a copper wire, which will a magnet pull?"),
             ("m601m", "Is a magnet made of plastic?"),
             ("m602", "Look closer: a lodestone is a natural magnet"),
             ("m605", "Inside a magnet: usually iron or steel"),
             ("m607b", "Magnets come in lots of shapes"),
             ("m701", "Journey: be a steel pin and feel the magnet pull"),
             ("m801", "The answer: the magnet pulled the steel pin"),
             ("m901m", "HOLD ON! Too heavy to lift, so is the wok attracted?"),
             ("m1002", "Look closer in slow motion: attract means pull"),
             ("m1006", "Iron and steel are magnetic materials")],
         2: [("n401", "Round 1: the drink can or the food tin?"),
             ("n501", "Journey: be an aluminium can at a recycling plant"),
             ("n601", "The answer: the steel food tin"),
             ("n702", "Look closer: objects made of non-magnetic materials"),
             ("n705p", "Copper and aluminium are metals that are non-magnetic"),
             ("n801", "Showdown: Basil's magnet test, find the line to fix"),
             ("n901", "Our new theme: Interactions"),
             ("n904", "Look closer: how magnets interact with objects"),
             ("n906m", "Classify: sort materials into magnetic and non-magnetic")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP19, for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.interactions and CH.magnets are placeholders: check the real names in videos.js), set url to the uploaded video ids. EP19 replaces no "
       "classic video (EP20 retires VLGDU0qduEw).", "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"19{'AB'[P - 1]}", "art": ["🧲", "🥫"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP19_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP19_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP19_P{P}", ch[f"EP19_P{P}"])
