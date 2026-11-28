"""make_moments.py (P4 EP2 "Help! I'm Wilting!", 27 Nov 2026): the app time-stamps and the YouTube chapters from the render timeline
(TIMESTAMP_AUDIT.md method, as P4 EP1 v2).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P4 entry no. 2: REPLACES the old P4 EP02 loaPYprOWDQ)
                             + production/youtube/chapters_p3.json key "P4EP02" (the same file and format; the main session renames the key to
                               the new video id after upload, as it did for P4 EP1 v2)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; at most 9 moments, plain positive wording of at most 64
characters. Keys: the script's section 12, checked against /home/user/theoneapp (read-only): O.plant and O.transport (videos.js), 'M-20',
'M-21', 'mix:plants:38/39/40' (videos.js), 'lab:p4-1-1', 'lab:p4-1-2', 'lab:p4-1-4' ("What If A Part Stopped Working?") and 'lab:p4-2-3'
(bench ids in api/_labs-p4.js). videos.js has no CH.* key for P4's Plant System (the script suggests CH.plantSystem: 'Plant System')."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
IDS = [("f201", "Pick the fix: check every part, water it more, or feed it?", ["O.plant", "'lab:p4-1-4'"]),
       ("u406", "A plant makes its own food in its leaves, using light", ["O.plant", "'M-20'", "'mix:plants:38'", "'lab:p4-1-2'"]),
       ("d501", "Look closer: the leaves, the stem, the soil and the roots", ["O.plant", "'mix:plants:40'", "'lab:p4-1-1'", "'lab:p4-1-2'"]),
       ("x601", "Wet soil, thirsty plant: roots need air to absorb water", ["O.plant", "'M-21'", "'mix:plants:38'", "'lab:p4-1-4'"]),
       ("s651", "A plant is a system: one part stops, the whole plant is affected", ["O.plant", "'lab:p4-2-3'"]),
       ("r701", "The real fix: holes in the pot; water when the top is dry", ["'lab:p4-1-4'"]),
       ("j801", "Be a drop of water: the stem transports water, salts and food", ["O.plant", "O.transport", "'mix:plants:39'"]),
       ("m901", "The words that earn marks: roots, stem and leaves", ["O.plant", "'lab:p4-1-2'"])]
BAD = ("never", "wrong", "mistake")
for k, w, _ in IDS: assert len(w) <= 64 and not any(b in w.lower().replace(",", " ").split() for b in BAD), w
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
tl = json.load(open(os.path.join(H, "tl_p1.json"))); ms = []
for id, what, keys in IDS:
    L = tl["lines"][id]; ms.append({"at": mmss(max(0, math.floor(L["t"] - 1.5))), "what": what, "keys": keys, "_line": id, "_t": round(L["t"], 2)})
out = {"_note": "P4 EP2 'Help! I'm Wilting!' (the new P4 style, one video), for TheOneApp videos.js after upload: it REPLACES the P4 entry no. 2 (the old video loaPYprOWDQ, 'The 3-Part Team Inside Every Plant'): swap the whole entry and put the new url in. Moments: 1.5 s before each idea's first line (tl_p1.json). Suggested: CH.plantSystem: 'Plant System' (videos.js has no CH key for it yet).",
       "replaces": ["loaPYprOWDQ"],
       "entries": [{"no": 2, "art": "🌶️", "topic": "Plant System", "title": UP["parts"][0]["title"].split(" | ")[0], "len": mmss(round(tl["END"])),
                    "url": "https://www.youtube.com/watch?v=<P4EP02>", "moments": ms}]}
ch = json.load(open(Y)); cl = [["0:00", "The problem: watered every day, still wilting"]]; last = 0
CHAP = [("f201", "Pick the fix: 1, 2 or 3?"), ("w301", "Fix 2: more water (oh no)"), ("u401", "Fix 3: a balanced lunch?"), ("d501", "Look closer: leaves, stem, soil and roots"),
        ("x601", "The twist: wet soil, thirsty plant?"), ("s651", "A plant is a system"), ("g451", "GLITCH: show me the data!"), ("r701", "The real fix, tested"),
        ("j801", "Be a drop of water: root, stem, leaf"), ("m901", "The words that earn marks")]
for lid, what in CHAP:
    m = {"at": mmss(max(0, math.floor(tl["lines"][lid]["t"] - 1.5))), "what": what}
    s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
    if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
fin = next(s for s in tl["scenes"] if s["name"] == "kwrecap")
if math.floor(fin["t0"]) - last < 10: cl.pop()
cl.append([mmss(math.floor(fin["t0"])), "Key words, Now you know! and a blooper"]); ch["P4EP02"] = cl
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
print("P4 2", out["entries"][0]["len"], [m["at"] for m in ms]); print("P4EP02", ch["P4EP02"])
