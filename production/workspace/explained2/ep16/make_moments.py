"""make_moments.py: EP16's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 16A / 16B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP16_P1" / "EP16_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.cycles", "CH.animalCycles"]
PARTS = {1: [("e501", "Round 1: what will the tadpole grow into?"),
             ("e601p", "Where do tadpoles come from? A frog lays eggs"),
             ("e604", "Frog eggs in a clump of clear jelly, each dark dot an egg"),
             ("e608", "Frog eggs have a jelly-like covering: it protects them and keeps them wet"),
             ("e701", "Journey: be a frog egg, hatch into a tadpole and grow into a frog"),
             ("e802", "The young of the frog is called a tadpole"),
             ("e805", "A tadpole does not look like the adult frog"),
             ("e901p", "HOLD ON! Is a tadpole with legs a new stage? No: three stages"),
             ("e1001", "A life cycle with three stages: the egg, the young and the adult"),
             ("e1101p", "A hen and her chicks: does every young animal look different?"),
             ("e1104", "Look at the body parts, not the colour: a chick looks like the adult"),
             ("e1201", "Some young animals look like their parents, while some do not")],
         2: [("f401", "Round 1: a little grasshopper with no wings: young or adult?"),
             ("f501", "A young grasshopper beside an adult: six legs, two feelers, no wings yet"),
             ("f504", "A young grasshopper is called a nymph"),
             ("f601", "The life cycle of a grasshopper has three stages"),
             ("f701m", "An empty grasshopper skin on the grass: why?"),
             ("f705", "The outer skin is hard and cannot stretch, so it gets too tight"),
             ("f801", "Journey: be the nymph, shed your skin and grow wings"),
             ("f901", "Shedding the old outer skin to grow bigger is called moulting"),
             ("f1001", "As a young insect grows, it sheds its outer skin: moulting"),
             ("f1101", "Showdown: the cockroach's young looks like the adult"),
             ("f1108", "Cockroach eggs are found in an egg case")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP16, for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.cycles and the animal life-cycle chapter's constant: check its real name in videos.js, CH.animalCycles is a placeholder), set url "
       "to the uploaded video ids. The classic P3 no. 10 (2Atm-edXKVk) stays until EP17 is live (upload.json has no replaces).", "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"16{'AB'[P - 1]}", "art": ["🐸", "🦗"][P - 1], "topic": "Life Cycles", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP16_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP16_P{P}"] = cl
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP16_P{P}", ch[f"EP16_P{P}"])
