"""make_moments.py: EP18's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 16A / 16B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP18_P1" / "EP18_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene.
v2 (2026-11-24): Part 1 speaks from 0.825 s; this writes chapters keys "EP18_P1_v2" and "EP18_P2_v2" (Part 2 re-rendered from unchanged code; the live keys are left alone)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.cycles", "CH.animalCycles"]
PARTS = {1: [("k501", "Round 1: frog and mosquito, the same life cycle?"),
             ("k601m", "Momo found two things that are the same"),
             ("k603", "What is the same are similarities; what is different are differences"),
             ("k701", "Journey: be a raindrop, count the stages of the frog and the mosquito"),
             ("k802", "The answer: they are different, three stages and four"),
             ("k806", "Observable characteristics: we can see them and count them"),
             ("k901", "Similar because the young do not look like the adults; different in the number of stages"),
             ("k1001p", "HOLD ON! Frog and grasshopper: three stages each, exactly the same?"),
             ("k1101", "The young beside their parents: the tadpole and the nymph"),
             ("k1106", "We use observable characteristics to find similarities and differences")],
         2: [("d401", "Round 1: which came first, the chicken or the egg?"),
             ("d601", "Journey: be an egg, hatch, grow and lay an egg of your own"),
             ("d406", "The answer: neither, it goes round and round"),
             ("d701", "Put your finger anywhere on the loop: you always come back"),
             ("d703", "The stages are repeated, so there is no first or last stage"),
             ("d801", "Showdown: the mosquito and the mealworm beetle, four stages each"),
             ("d902", "Same stages, still different: compare their physical features"),
             ("d905", "Observable characteristics include the number of stages and the physical features"),
             ("d1001", "Why life cycles matter: living things of the same kind continue")]}
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
OLD = {1: "MnDMkHAvOjc", 2: "f2MG82O_9sA"}
out = {"_note": "v2 (2026-11-24): Part 1 re-rendered with the cold open SPEAKING (Heart from 0.825 s, SERIES_FORMAT 11 item 1); Part 1's times are 5.475 s earlier and its url is the NEW Part 1 (upload_v2.json, chapters key EP18_P1_v2); Part 2 is re-rendered from unchanged code (its times are the live " + OLD[2] + "'s; v2 for one continuous music bed, chapters key EP18_P2_v2). " + "EP18, for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.cycles and the animal life-cycle chapter's constant: check its real name in videos.js, CH.animalCycles is a placeholder), set url "
       "to the uploaded video ids. EP18 replaces the classic P3 no. 11 (xaCprQPXVYY, upload.json replaces / retire_old): take that old entry out of videos.js when these go in.", "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"18{'AB'[P - 1]}", "art": ["🐸", "🐔"][P - 1], "topic": "Life Cycles", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP18_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); ch.__setitem__(f"EP18_P{P}_v2", cl); P == 2 and print("P2 times unchanged; live key", OLD[2], "matches:", ch.get(OLD[2]) == cl)
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
print(f"EP18_P1_v2", ch[f"EP18_P1_v2"]); print("old live P1 key", OLD[1], ch.get(OLD[1]))
