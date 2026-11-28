"""make_moments.py: EP0's (the mind map special's) app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries '0A' / '0B', replacing no: 0; keys [] as the old entry)
                             + production/youtube/chapters_p3.json keys "EP00A" / "EP00B" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words (script section 11).
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene. EP0 RETIRES the classic zxerWQ9zGII (videos.js no: 0)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = []
PARTS = {1: [("a401h", "Round 1: the word puzzle test"),
             ("a501h", "Look closer: read it or make it?"),
             ("a601h", "The memory test: the generation effect"),
             ("a701m", "HOLD ON! Is copying the poster making your own?"),
             ("a705b", "Memory first: draw your map with the poster closed")],
         2: [("b401h", "Round 1: who draws more next Monday?"),
             ("b501h", "Make one together in TheOneApp"),
             ("b506h", "Look closer: Mark my mind map, then check and fix"),
             ("b601p", "Showdown: memory first, then compare"),
             ("b701h", "Be an idea: why drawing it again works"),
             ("b801h", "Space it out: one day, three days, a week"),
             ("b901h", "Next Monday: two blank pages")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP0 (the mind map special), for TheOneApp videos.js P3 after upload: REPLACE the entry { no: 0, art: '🧠', topic: 'Study Skills', "
       "title: 'Make Your Own Mind Map: Remember More (P3–P6)', url: ...zxerWQ9zGII } with these two entries no: '0A' and '0B' (keys [] as now), set url to "
       "the uploaded video ids. No link to zxerWQ9zGII may stay in the app (SERIES_FORMAT 5, 23 Nov).", "replaces": ["zxerWQ9zGII"], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"0{'AB'[P - 1]}", "art": "🧠", "topic": "Study Skills", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP00_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP00{'AB'[P - 1]}"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for k in ("EP00A", "EP00B"): print(k, ch[k])
