"""make_moments.py: EP17's app time-stamps and YouTube chapters from the render timelines (TIMESTAMP_AUDIT.md method).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entries 17A / 17B; keys as the videos.js constant names)
                             + production/youtube/chapters_p3.json keys "EP17_P1" / "EP17_P2" (the main session swaps in the video ids)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of YouTube's list only), and
"Your score, key words and next time" at the score-hand scene.
v2 (2026-11-24): Part 1 speaks from 0.825 s; this writes chapters key "EP17_P1_v2" (Part 1 only; the live keys are left alone)."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.cycles", "CH.animalCycles"]
PARTS = {1: [("a501", "Round 1: is the caterpillar a nymph like the young grasshopper?"),
             ("a601", "A caterpillar looks nothing like a butterfly"),
             ("a702", "Count the caterpillar's legs: six legs at the front"),
             ("a705", "The stumps at the back are called prolegs"),
             ("a706b", "Prolegs have tiny hooks that grip the twig"),
             ("a802", "Journey: be a butterfly egg, hatch, munch, moult and grow"),
             ("a901", "The butterfly larva is also called a caterpillar"),
             ("a1001p", "HOLD ON! The pupa is busy inside its case"),
             ("a1005", "This stage is called the pupa"),
             ("a1101", "Inside the pupal case, the body changes into a butterfly"),
             ("a1105", "The pupal case splits and out comes the adult butterfly"),
             ("a1201", "The butterfly has four stages: egg, larva, pupa and adult"),
             ("a1203", "The young of these animals look different from the adult")],
         2: [("b401", "Round 1: what comes after the wriggler?"),
             ("b501", "Wrigglers hang just under the water's surface"),
             ("b502p", "A little tube at the tail end lets the wriggler get air"),
             ("b505", "The mosquito larva is also called a wriggler"),
             ("b602", "Journey: be a mosquito egg, a wriggler, a pupa, then an adult"),
             ("b701", "After the wriggler comes the pupa"),
             ("b706", "A life cycle with four stages: egg, larva, pupa and adult"),
             ("b801", "Showdown: check Basil's homework on the mosquito"),
             ("b806", "Only some kinds of mosquitoes spread dengue"),
             ("b807m", "Dengue is a sickness that gives people a high fever"),
             ("b904", "Mosquito eggs are laid in stagnant water"),
             ("b905b", "Stagnant water is still water that nobody changes"),
             ("b906", "Tip out still water to stop new mosquitoes"),
             ("b909", "Remove breeding spots in our schools and homes")]}
BAD = ("not", "no", "never", "wrong", "don't", "doesn't", "isn't", "cannot", "can't", "mistake", "fail", "bad")
for P in PARTS:
    for id, what in PARTS[P]:
        assert len(what) <= 64, what
        assert not any(w.strip("?!.,:;'") in BAD for w in what.lower().split()), what
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
OLD = {1: "TKO73GxJVB0", 2: "6rVLGfilVXQ"}
out = {"_note": "v2 (2026-11-24): Part 1 re-rendered with the cold open SPEAKING (Heart from 0.825 s, SERIES_FORMAT 11 item 1); Part 1's times are 5.475 s earlier and its url is the NEW Part 1 (upload_v2.json, chapters key EP17_P1_v2); Part 2 is unchanged (live " + OLD[2] + "). " + "EP17, for TheOneApp videos.js P3 after upload: paste as two entries, replace keys' strings by the constants "
       "(O.cycles, CH.animalCycles), set url to the uploaded video ids. With EP16 these two parts replace the classic P3 no 10 "
       "(2Atm-edXKVk, 'A Tadpole Has No Legs. So How Does It Become A Frog?'), which upload.json retires.", "entries": []}
ch = json.load(open(Y))
for P, ids in PARTS.items():
    tl = json.load(open(os.path.join(H, f"tl_p{P}.json"))); ms = []
    for id, what in ids:
        L = tl["lines"][id]; ms.append({"at": mmss(math.floor(L["t"] - 1.5)), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
    part = UP["parts"][P - 1]
    out["entries"].append({"no": f"17{'AB'[P - 1]}", "art": ["🦋", "🦟"][P - 1], "topic": "Life Cycles", "title": part["title"].split(" | ")[0].replace("(Part 1)", "(Part A)").replace("(Part 2)", "(Part B)"),
                           "len": mmss(round(tl["END"])), "url": f"https://www.youtube.com/watch?v=<EP17_P{P}>", "moments": ms})
    fin = next(s for s in tl["scenes"] if s["name"] == "final"); cl = [["0:00", "Intro"]]; last = 0
    for m in ms:
        s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
        if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
    if math.floor(fin["t0"]) - last < 10: cl.pop()
    cl.append([mmss(math.floor(fin["t0"])), "Your score, key words and next time"]); (ch.__setitem__(f"EP17_P{P}_v2", cl) if P == 1 else print("P2 unchanged; live key", OLD[2], "matches:", ch.get(OLD[2]) == cl))
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
for e in out["entries"]: print(e["no"], e["len"], [m["at"] for m in e["moments"]])
print(f"EP17_P1_v2", ch[f"EP17_P1_v2"]); print("old live P1 key", OLD[1], ch.get(OLD[1]))
