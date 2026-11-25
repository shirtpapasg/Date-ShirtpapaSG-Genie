"""make_moments.py: EP27's app time-stamps and YouTube chapters from the render timeline (TIMESTAMP_AUDIT.md method; as EP22's).
  python3 make_moments.py   -> app_moments.json (TheOneApp videos.js P3 entry "27": the P3-to-P4 Bridge, one video)
                             + production/youtube/chapters_p3.json key "EP27" (the main session swaps in the video id)
Each moment: `at` = 1.5 s before the idea's first spoken line, floored to the second; `what` carries the idea's own words.
YouTube chapters: Intro at 0:00, the moments (one less than 10 s after the previous chapter is left out of the chapter list only), and
"Key words, see you in P4 and a blooper" at the read-along."""
import json, math, os
H = os.path.dirname(os.path.abspath(__file__)); Y = os.path.join(H, "../../../youtube/chapters_p3.json")
K = ["O.heat", "CH.heat"]
IDS = [("e101", "The problem: the party is in 20 minutes and it is 33 degrees"),
       ("e201p", "Pick the fix: run faster, fan it, or wrap it in wool?"),
       ("e301", "Fix 1: Pip runs. Heat flows out of his tummy into the ice cream"),
       ("e401", "Fix 2: fan the ice cream"),
       ("e501", "The slow-motion replay"),
       ("e601", "Look closer: warm air at 33 degrees, ice cream at minus 18"),
       ("e602b", "Heat flows from a hotter place to a colder place"),
       ("e701m", "Fix 3: wrap the box in a wool scarf"),
       ("e704", "Journey: be a bit of air trapped in the wool"),
       ("e805b", "Wool and trapped air are poor conductors of heat"),
       ("e901m", "A fair test: no wrapper, a plastic bag or wool"),
       ("e1001", "The rescue, and a magnet at the drain"),
       ("e1101", "The party: is the ice cream still frozen?"),
       ("e1201", "The words that earn marks"),
       ("e1301", "The P3 year, and coming up in Primary 4")]
UP = json.load(open(os.path.join(H, "upload.json")))
mmss = lambda s: f"{int(s) // 60}:{int(s) % 60:02d}"
tl = json.load(open(os.path.join(H, "tl_p1.json"))); ms = []
for id, what in IDS:
    L = tl["lines"][id]; ms.append({"at": mmss(max(0, math.floor(L["t"] - 1.5))), "what": what, "keys": K, "_line": id, "_t": round(L["t"], 2)})
out = {"_note": "EP27 (the P3-to-P4 Bridge, one video), for TheOneApp videos.js P3 after upload: ADD as one entry (nothing is retired); replace the keys' "
       "strings by the constants (O.heat and CH.heat are placeholders: check the real names in videos.js; heat is a P4 topic, so it may sit under "
       "the P3 finale or the first P4 row), set url to the uploaded video id.", "replaces": [],
       "entries": [{"no": "27", "art": "🍦", "topic": "Heat (P3 to P4)", "title": UP["parts"][0]["title"].split(" | ")[0], "len": mmss(round(tl["END"])),
                    "url": "https://www.youtube.com/watch?v=<EP27>", "moments": ms}]}
ch = json.load(open(Y)); cl = [["0:00", "Intro"]]; last = 0
for m in ms[1:]:
    s = int(m["at"].split(":")[0]) * 60 + int(m["at"].split(":")[1])
    if s - last >= 10: cl.append([m["at"], m["what"]]); last = s
fin = next(s for s in tl["scenes"] if s["name"] == "kwrecap")
if math.floor(fin["t0"]) - last < 10: cl.pop()
cl.append([mmss(math.floor(fin["t0"])), "Key words, see you in P4 and a blooper"]); ch["EP27"] = cl
NEG = ("not ", "no ", "wrong", "never", "can't", "cannot", "don't", "won't")
for m in ms: assert len(m["what"]) <= 64, m
json.dump(out, open(os.path.join(H, "app_moments.json"), "w"), indent=1, ensure_ascii=False)
json.dump(ch, open(Y, "w"), indent=1, ensure_ascii=False)
print("27", out["entries"][0]["len"], [m["at"] for m in ms]); print("EP27", ch["EP27"])
