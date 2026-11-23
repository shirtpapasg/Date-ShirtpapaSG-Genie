"""make_moments.py: EP20's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 20A / 20B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP20_P1" / "EP20_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene. EP20 retires the classic VLGDU0qduEw (upload.json `replaces`): its moments in
videos.js are replaced by these once EP20 is live."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.interactions", "CH.magnets"]
PARTS = {1: [("m501", "Round 1: what holds up the floating ring, a pull or a push?"),
             ("m601", "Journey: be the top ring magnet and feel the push"),
             ("m701", "The answer: the top ring floats on a push"),
             ("m801b", "Which part of a magnet pulls the most?"),
             ("m802", "Look closer: steel paper clips bunch at the two ends"),
             ("m805p", "Every magnet has two poles: a North pole and a South pole"),
             ("m807m", "Attraction is strongest at the two poles"),
             ("m808", "Every shape of magnet has two poles"),
             ("m901p", "HOLD ON! Pip says the floating ring is broken. Is it?"),
             ("m1002", "Look closer: two bar magnets on round pencils, pull or push?"),
             ("m1005", "Magnets that push each other away repel")],
         2: [("n401", "Round 1: turn one magnet round. What happens?"),
             ("n501", "Journey: be a toy train carriage"),
             ("n601", "The answer: they pull together"),
             ("n702", "Look closer: which poles face each other?"),
             ("n703p", "Unlike poles attract"),
             ("n707b", "Like poles repel"),
             ("n709", "Why the ring floats: two like poles face each other"),
             ("n801", "Showdown: Pip's magnet test, find the line to fix"),
             ("n902", "Look closer: two grey bars, which one is the magnet?"),
             ("n906m", "The repel test: if it repels a magnet, it is a magnet")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP20, for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.interactions and CH.magnets are placeholders: check the real names in videos.js), set url to the uploaded video ids. EP20 retires the "
       "classic VLGDU0qduEw: remove its entry (and its moments) from videos.js when these go in.", "replaces": ["VLGDU0qduEw"], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"20{'AB'[P - 1]}", "art": ["🧲", "🚂"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP20_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP20_P{P}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP20_P{P}", ch[f"EP20_P{P}"])
