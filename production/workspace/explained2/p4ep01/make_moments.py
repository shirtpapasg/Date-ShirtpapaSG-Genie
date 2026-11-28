"""make_moments.py: P4 EP1's app time-stamps and YouTube chapters from the render timeline (TIMESTAMP_AUDIT.md method; as EP27's).
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
KEYS = {"e101": [], "e201p": ["'lab:p4-2-3'"], "e301": ["'lab:p4-2-3'"], "e401": ["'lab:p4-2-1'"], "e501": ["'lab:p4-2-1'", "'lab:p4-1-2'"], "e601": ["'lab:p4-2-1'"],
        "e701": ["'lab:p4-2-1'"], "e707b": ["'lab:p4-2-3'", "'lab:p4-1-2'"], "e711": ["'lab:p4-2-3'"], "e803": ["O.respCirc", "'lab:p4-2-1'"], "e807": ["O.plant", "'lab:p4-1-1'"],
        "e901": ["'lab:p4-2-1'", "'lab:p4-2-3'"]}
IDS = [("e101", "The problem: the class ride is in one hour and the bike won't move"),
       ("e201p", "Pick the fix: pedal harder, a skipping rope, or the chain?"),
       ("e301", "Fix 1: pedal harder. One part cannot do another part's job"),
       ("e401", "Fix 2: a skipping rope round the gears"),
       ("e501", "Look closer: the chain's function, teeth in the gaps"),
       ("e601", "Journey: be a link of the bike chain"),
       ("e701", "Fix 3, tested: the parts interact"),
       ("e707b", "Can it stop? Every part has its own function"),
       ("e711", "One part stops working: the system is likely to be affected"),
       ("e803", "Your body is made up of systems too"),
       ("e807", "A tree is a system: leaves, stem and roots"),
       ("e901", "The words that earn marks")]
for k, w in IDS: assert len(w) <= 70, w
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
tl = json.load(open(os.path.join(H, "tl_p1.json"))); ms = []
for id, what in IDS:
    L = tl["lines"][id]; ms.append({"at": mmss(max(0, math.floor(L["t"] - 1.5))), "what": what, "keys": KEYS[id], "_line": id, "_t": round(L["t"], 2)})
out = {"_note": "P4 EP1 (the new P4 style, one video), for TheOneApp videos.js after upload: it REPLACES the P4 entry no. 1 (the old video FOvUezOZJbo, 'Your Bike, Your Body And A Tree Are All The Same Thing'): swap the whole entry, keep no. 1. The keys are the real videos.js constants and ids, written here as strings: paste O.respCirc / O.plant WITHOUT quotes and the 'lab:...' ids WITH their quotes. The problem moment has no matching key, so its keys are empty. Set url to the uploaded video id. Suggested (not in videos.js yet, as the P4 README says): CH.humanSystem / CH.plantSystem.",
       "replaces": ["FOvUezOZJbo"],
       "entries": [{"no": 1, "art": "🚲", "topic": "Systems", "title": UP["parts"][0]["title"].split(" | ")[0], "len": mmss(round(tl["END"])),
                    "url": "https://www.youtube.com/watch?v=<P4EP01>", "moments": ms}]}
ch = json.load(open(Y)); cl = [["0:00", "Intro"]]; last = 0
for m in ms[1:]:
    s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
    if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
fin = next(s for s in tl["scenes"] if s["name"] == "kwrecap")
if math.floor(fin["t0"]) - last < 10: cl.pop()
cl.append([mmss(math.floor(fin["t0"])), "Key words, Now you know! and a blooper"]); ch["P4EP01"] = cl
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
print("P4 1", out["entries"][0]["len"], [m["at"] for m in ms]); print("P4EP01", ch["P4EP01"])
