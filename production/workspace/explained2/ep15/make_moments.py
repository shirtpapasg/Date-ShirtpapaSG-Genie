"""make_moments.py: EP15's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 15A / 15B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP15_P1" / "EP15_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.cycles", "CH.plantCycles"]
PARTS = {1: [("g501", "Round 1: what does a mango seed grow into first?"),
             ("g602m", "Observing: look again and again, not only twice"),
             ("g701", "We use our five senses to gather information about plants"),
             ("g801", "Through the window in the pot: the root grows first, then the shoot"),
             ("g804m", "New mango leaves are red at first, then turn green"),
             ("g807", "A seed grows into a young plant first"),
             ("g808", "A young plant: a thin stem, a few leaves, no flowers or fruits"),
             ("g901", "Journey: be the mango seed, the root goes down, the shoot goes up"),
             ("g1001", "The seed grew into a young plant"),
             ("g1101p", "Measure the height of a plant with a ruler"),
             ("g1201", "HOLD ON! Measuring from the table is not fair"),
             ("g1204p", "Put the zero of the ruler on the soil: the plant is 12 cm")],
         2: [("j401", "Round 1: an old mango tree in flower: which stage is it in?"),
             ("j501", "A young plant beside an adult plant: thin stem or thick trunk"),
             ("j506", "The young plant grew into an adult plant with flowers and fruits"),
             ("j508", "Only the adult plant has flowers and fruits"),
             ("j601m", "Where do new mango seeds come from? Not the roots"),
             ("j603", "Journey: be a mango flower that grows into a mango with a seed inside"),
             ("j801b", "New seeds grow inside the fruits, not in the roots"),
             ("j803p", "Seed, young plant, adult plant, and its fruits bring new seeds"),
             ("j806", "There are three stages in the life cycle of a plant"),
             ("j901", "Showdown: the adult plant is not the last stage"),
             ("j906", "The stages in a life cycle are repeated: no first or last stage"),
             ("j1001m", "Life cycles repeat so a kind of plant does not disappear"),
             ("j1005", "Singapore's seed bank keeps seeds safe"),
             ("j1101", "A seed bank stores seeds safely until they are needed")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
out = {"_note": "EP15 (v2 cast redo), for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.cycles, CH.plantCycles), set url to the uploaded video ids. These two parts replace the classic entry no 15 "
       "(RVRoaWWKjEM, 'What Happens After You Plant A Seed? Round And Round'), which upload.json retires.", "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"15{'AB'[P - 1]}", "art": ["🥭", "🌳"][P - 1], "topic": "Life Cycles", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP15_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch[f"EP15_P{P}"] = cl
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
for P in (1, 2): print(f"EP15_P{P}", ch[f"EP15_P{P}"])
