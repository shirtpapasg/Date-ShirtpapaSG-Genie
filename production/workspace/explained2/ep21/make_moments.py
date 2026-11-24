"""make_moments.py: EP21's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 21A / 21B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP21_P1" / "EP21_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene. EP21 retires the classic 6zA-Adh7QqU (upload.json `replaces`; its fourth moment, "A free magnet finds North",
pp. 110-112, is EP21's): its moments in videos.js are replaced by these (and EP20's) once EP21 is live.
v2 (2026-11-24): Part 1 speaks from 0.825 s; this writes chapters keys "EP21_P1_v2" and "EP21_P2_v2" (Part 2 re-rendered from unchanged code; the live keys are left alone)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.interactions", "CH.magnets"]
PARTS = {1: [("m501", "Round 1: where does a hanging magnet stop?"),
             ("m601", "Journey: be the hanging magnet, spun round and round"),
             ("m701", "The answer: it stops the same way every time"),
             ("m801p", "Is it the goalpost that turns the magnet?"),
             ("m802", "Look closer: the same line in three places"),
             ("m805m", "Freely suspended: hanging so that it can turn freely"),
             ("m806b", "The North-South direction"),
             ("m901b", "HOLD ON! Basil lays the magnet on a bench. Is it free?"),
             ("m1001m", "How does the magnet know which way is North?"),
             ("m1003", "Look closer: fly up and see the whole Earth"),
             ("m1005", "Earth behaves like a magnet")],
         2: [("n401", "Round 1: a bar magnet near a compass. What happens?"),
             ("n501", "Journey: be the compass needle"),
             ("n601", "The answer: the needle turns towards or away"),
             ("n602b", "The needle is the small magnet inside a compass"),
             ("n702", "Look closer: turn the compass round. What stays still?"),
             ("n704m", "A compass helps us find the direction"),
             ("n801", "Showdown: Momo's compass checklist, find the line to fix"),
             ("n902", "Look closer: a ship at night and a hiker in fog"),
             ("n905p", "A freely suspended magnet can tell the direction")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
OLD = {1: "625GU5q6NSc", 2: "wqEoqdTPJqk"}
out = {"_note": "v2 (2026-11-24): Part 1 re-rendered with the cold open SPEAKING (Heart from 0.825 s, SERIES_FORMAT 11 item 1); Part 1's times are 5.475 s earlier and its url is the NEW Part 1 (upload_v2.json, chapters key EP21_P1_v2); Part 2 is re-rendered from unchanged code (its times are the live " + OLD[2] + "'s; v2 for one continuous music bed, chapters key EP21_P2_v2). " + "EP21, for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.interactions and CH.magnets are placeholders: check the real names in videos.js), set url to the uploaded video ids. EP21 retires the "
       "classic 6zA-Adh7QqU: remove its entry (and its moments) from videos.js when these go in.", "replaces": ["6zA-Adh7QqU"], "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"21{'AB'[P - 1]}", "art": ["🧲", "🧭"][P - 1], "topic": "Magnets", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP21_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch.__setitem__(f"EP21_P{P}_v2", cl); P == 2 and print("P2 times unchanged; live key", OLD[2], "matches:", ch.get(OLD[2]) == cl)
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for e in out["entries"]:
    for m in e["moments"]:
        assert len(m["what"]) <= 64, m
        assert not any(w in m["what"].lower() for w in NEG), m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
print(f"EP21_P1_v2", ch[f"EP21_P1_v2"]); print("old live P1 key", OLD[1], ch.get(OLD[1]))
