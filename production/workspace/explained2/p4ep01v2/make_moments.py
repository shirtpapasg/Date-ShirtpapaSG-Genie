"""make_moments.py (P4 EP1 v2 "The Great Void Deck Race", 26 Nov 2026: the v2 lines; chapters key P4EP01V2; at most 9 moments, plain positive
wording of at most 64 characters). v1's header: P4 EP1's app time-stamps and YouTube chapters from the render timeline (TIMESTAMP_AUDIT.md method; as EP27's).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P4 entry no. 1: REPLACES the old P4 EP01 FOvUezOZJbo)
                             + production/youtube/chapters_p3.json key "P4EP01" (the same file and format as the P3 keys)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
Keys: the real TheOneApp videos.js constants and ids (read-only from /home/user/theoneapp/videos.js): 'lab:p4-2-1', 'lab:p4-2-3', 'lab:p4-1-2',
'lab:p4-1-1' (the benches the old EP01 entry and the P4 README use), O.respCirc (the body look-closer shows the heart beating and the lungs
breathing faster: the respiratory and circulatory systems' outcome, which videos.js now has; the script's draft said O.digestive) and O.plant.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of the chapter list only), and
"Key words, Now you know! and a blooper" at the read-along."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
KEYS = {"c101": [], "f201": ["'lab:p4-2-3'"], "b401": ["'lab:p4-2-1'", "'lab:p4-1-2'"], "k601": ["'lab:p4-2-1'", "'lab:p4-1-2'"], "r707": ["'lab:p4-2-1'"],
        "l801": ["'lab:p4-2-1'", "'lab:p4-1-2'"], "j901": ["'lab:p4-2-1'"], "v1006": ["'lab:p4-2-3'", "'lab:p4-1-2'"], "e1102": ["O.respCirc", "'lab:p4-2-1'"], "e1103": ["O.plant", "'lab:p4-1-1'"]}
IDS = [("f201", "Pick the fix: pedal faster, all three parts, or chain and brakes"),
       ("b401", "Each part has a job: the bell warns people you are coming"),
       ("k601", "The brakes help a bike slow down and stop safely"),
       ("r707", "The chain joins the pedals to the back wheel"),
       ("l801", "Look closer: every part has its own function"),
       ("j901", "Be a chain link: the parts interact"),
       ("v1006", "When one part stops, the whole bike is likely to be affected"),
       ("e1102", "Your body is made up of systems too"),
       ("e1103", "A tree is a system: roots, stem and leaves")]
BAD = ("not", "no", "never", "wrong", "cannot", "mistake")
for k, w in IDS: assert len(w) <= 64 and not any(b in w.lower().replace(",", " ").split() for b in BAD), w
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
tl = json.load(open(os.path.join(H, "tl_p1.json"))); ms = []
for id, what in IDS:
    L = tl["lines"][id]; ms.append({"at": mmss(max(0, math.floor(L["t"] - 1.5))), "what": what, "keys": KEYS[id], "_line": id, "_t": round(L["t"], 2)})
out = {"_note": "P4 EP1 v2 'The Great Void Deck Race' (the new P4 style, one video; it replaces the v1 build p4ep01 too), for TheOneApp videos.js after upload: it REPLACES the P4 entry no. 1 (the old video FOvUezOZJbo, 'Your Bike, Your Body And A Tree Are All The Same Thing'): swap the whole entry, keep no. 1. The keys are the real videos.js constants and ids, written here as strings: paste O.respCirc / O.plant WITHOUT quotes and the 'lab:...' ids WITH their quotes. Set url to the uploaded video id. Suggested (not in videos.js yet, as the P4 README says): CH.humanSystem / CH.plantSystem.",
       "replaces": ["FOvUezOZJbo"],
       "entries": [{"no": 1, "art": "🐌", "topic": "Systems", "title": UP["parts"][0]["title"].split(" | ")[0], "len": mmss(round(tl["END"])),
                    "url": "https://www.youtube.com/watch?v=<P4EP01V2>", "moments": ms}]}
ch = json.load(open(Y)); cl = [["0:00", "The problem: Basil is sitting in an ice box"]]; last = 0
CHAP = [("f201", "Pick the fix: 1, 2 or 3?"), ("p209", "Ten minutes earlier: the bell"), ("n501", "The chain (and a snail)"), ("k601", "The brakes and the runaway bike"), ("r701", "The race (and a twist)"),
        ("l801", "Look closer: every part has a function"), ("j901", "Be a link of a bike chain: the parts interact"), ("v1001", "Putting it back together: what is a system?"), ("e1101", "Your body and a tree are systems too")]
for lid, what in CHAP:
    m = {"at": mmss(max(0, math.floor(tl["lines"][lid]["t"] - 1.5))), "what": what}
    s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
    if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
fin = next(s for s in tl["scenes"] if s["name"] == "kwrecap")
if math.floor(fin["t0"]) - last < 10: cl.pop()
cl.append([mmss(math.floor(fin["t0"])), "Key words, Now you know! and a blooper"]); ch["P4EP01V2"] = cl
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
print("P4 1", out["entries"][0]["len"], [m["at"] for m in ms]); print("P4EP01V2", ch["P4EP01V2"])
