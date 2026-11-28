"""make_moments.py (P4 EP3 "The Case of the Mystery Leaf", 28 Nov 2026): the app time-stamps, the YouTube chapters and upload.json from the
render timeline (TIMESTAMP_AUDIT.md method, as P4 EP2).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P4 entry no. 3: REPLACES the old P4 EP03 PNe2DU8sFTI)
                             + production/youtube/chapters_p3.json key "P4EP03" (the same file and format as P4EP02)
                             + upload.json (title, description, tags, playlists: the script's section 11)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; plain positive wording of at most 64 characters.
Keys: the script's section 12, checked against /home/user/theoneapp (read-only): O.plant (videos.js), 'lab:p4-1-1' ("A Walk Among The
Plants") and 'lab:p4-1-3' ("Looking Closely At Plants") in api/_labs-p4.js. videos.js has no CH.* key for P4's Plant System (suggest
CH.plantSystem: 'Plant System')."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
IDS = [("f201", "Pick the clue: the colour, the size, or the leaf's parts?", ["O.plant", "'lab:p4-1-3'"]),
       ("o405", "Colour and size are weak clues for telling leaves apart", ["O.plant", "'lab:p4-1-3'"]),
       ("l601", "Look closer: leaf blade, leaf stalk, main vein, smaller veins", ["O.plant", "'lab:p4-1-1'"]),
       ("j701", "Be a drop of water: the veins of a leaf (net veins)", ["O.plant"]),
       ("q801", "Parallel veins and net veins", ["O.plant", "'lab:p4-1-3'"]),
       ("q811", "Compare the edges: straight or jagged", ["O.plant", "'lab:p4-1-3'"]),
       ("m1001", "The words that earn marks: the parts of a leaf", ["O.plant", "'lab:p4-1-1'"])]
BAD = ("never", "wrong", "mistake")
for k, w, _ in IDS: assert len(w) <= 64 and not any(b in w.lower().replace(",", " ").split() for b in BAD), w
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
tl = json.load(open(os.path.join(H, "tl_p1.json"))); ms = []
for id, what, keys in IDS:
    L = tl["lines"][id]; ms.append({"at": mmss(max(0, math.floor(L["t"] - 1.5))), "what": what, "keys": keys, "_line": id, "_t": round(L["t"], 2)})
TITLE = "Which Plant Dropped This Leaf? | Parts of a Leaf, Parallel vs Net Veins | P4 Science"
out = {"_note": "P4 EP3 'The Case of the Mystery Leaf' (the new P4 style, one video), for TheOneApp videos.js after upload: it REPLACES the P4 entry no. 3 (the old video PNe2DU8sFTI, 'Read A Leaf Like A Scientist'): swap the whole entry and put the new url in. Moments: 1.5 s before each idea's first line (tl_p1.json). Suggested: CH.plantSystem: 'Plant System' (videos.js has no CH key for it yet).",
       "replaces": ["PNe2DU8sFTI"],
       "entries": [{"no": 3, "art": "🍃", "topic": "Plant System", "title": TITLE.split(" | ")[0], "len": mmss(round(tl["END"])),
                    "url": "https://www.youtube.com/watch?v=<P4EP03>", "moments": ms}]}
ch = json.load(open(Y)); cl = [["0:00", "The case of the mystery leaf"]]; last = 0
CHAP = [("a201", "Every case needs a witness"), ("f201", "Pick a clue: 1, 2 or 3?"), ("o402", "Clue 1: the colour"), ("s501", "Clue 2: the size"),
        ("l601", "Look closer: the parts of a leaf"), ("j701", "Be a drop of water inside a leaf"), ("q801", "The suspects: parallel or net veins?"),
        ("g901", "GLITCH: show me the data"), ("r951", "Did you spot the witness?"), ("m1001", "The words that earn marks"), ("k1101", "Case closed!")]
for lid, what in CHAP:
    s = max(0, math.floor(tl["lines"][lid]["t"] - 1.5))
    if s - last >= 10: cl.append([mmss(s), what]); last = s
bl = next(s for s in tl["scenes"] if s["name"] == "blooper")
cl.append([mmss(math.floor(bl["t0"])), "Blooper"]); ch["P4EP03"] = cl
chap_txt = "\n".join(f"{a} {b}" for a, b in cl)
DESC = ("A mystery leaf has landed on the buddies' Science Help Desk, and GLITCH the robot is sure it belongs to the mango tree. He has a scanner, a roll of sticky tape and a lot of confidence. Pick the clue that cracks the case: the colour, the size, or the parts of the leaf? Then follow Detective Basil as every suspect is cleared, one clue at a time.\n\n"
  "In this video:\n" + chap_txt + "\n\n"
  "Key words: leaf blade, leaf stalk, net veins, parallel veins.\n"
  "The words that earn marks: The main parts of a leaf are the leaf blade, the leaf stalk, the main vein and the smaller veins. The leaf stalk attaches the leaf to the stem. The veins can be arranged in a parallel pattern or a net pattern.\n\n"
  "For parents: children pick a clue with their fingers before each one is tested, then compare leaves part by part, side by side, like scientists. Primary 4 Science (Singapore Primary Science Syllabus 2023), Plant System: the parts of a leaf and how leaves differ. In the US, maple and oak leaves have net veins, while grass and corn have parallel veins. Also fits US NGSS 4-LS1-1 (Grade 4).\n"
  "Try it: collect three fallen leaves on your way home. Hold each up to the light. Net veins or parallel veins? Straight edge or jagged edge?\n\n"
  "TheOneApp, Explained: Singapore primary science, made fun. Play along with Pip, Basil and Momo: show fingers to lock in and see whose score is highest at the end!\n\n"
  "#PrimaryScience #Singapore #Plants #TheOneAppExplained")
TAGS = ["parts of a leaf", "leaf blade leaf stalk", "parallel veins net veins", "leaf veins for kids", "how to identify a leaf", "jagged edge straight edge",
        "primary 4 science plant system", "P4 science leaves", "grade 4 science", "science for kids", "singapore science", "theoneapp explained"]
UP = {"key": "explained-p4-ep03", "playlists": [{"id": "PLK9BW3T6kXx4", "after": "PNe2DU8sFTI"}, {"id": "PLPfEuT7l4KjI", "after": "PNe2DU8sFTI"}], "replaces": ["PNe2DU8sFTI"], "retire_old": True,
      "_note": "P4 EP3 'The Case of the Mystery Leaf' (the teacher's v2 script, OK'd 28 Nov 2026 with the script's recommendation on all 20 questions), ONE video. Public, Made for Kids (the uploader sets both). REPLACES the old P4 EP03 PNe2DU8sFTI (never deleted): with after = PNe2DU8sFTI the new video goes in right after it in both playlists, then retire_old takes the old one out of both playlists, and the old one's description gets a first line '▶ NEW VERSION: Which Plant Dropped This Leaf? <new url>'. Chapters: production/youtube/chapters_p3.json key P4EP03. App moments: p4ep03/app_moments.json (videos.js P4 entry no. 3). NOT UPLOADED by the build agent: only after the teacher's OK of the built video.",
      "parts": [{"key": "explained-p4-ep03", "file": os.path.join(H, "p4ep03.mp4"), "thumb": os.path.join(H, "thumb.jpg"), "title": TITLE, "description": DESC, "tags": TAGS}]}
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(UP, open(os.path.join(H, "upload.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
print("P4 3", out["entries"][0]["len"], [m["at"] for m in ms]); print("P4EP03", ch["P4EP03"]); print(len(TITLE), "title chars;", len(DESC), "description chars")
