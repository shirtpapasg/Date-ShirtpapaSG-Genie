"""ep13/make_upload.py: ep13/upload_ep13.json (sau_upload.py's VIDEOS format) with chapters timed from ep13_tl.json.
"hold": true: sau_upload.py uploads it ONLY when named (sau-ep13), and only after the teacher's "go". NOT uploaded in phase 1.
Re-run after the final render so the chapter times follow the final cut.      python3 ep13/make_upload.py   (from workspace/sau)"""
import json, os
H = os.path.dirname(os.path.abspath(__file__)); SAU = os.path.dirname(H)
tl = json.load(open(f'{H}/ep13_tl.json'))
NAMES = [("corridor", "Why does it feel like an oven?"), ("povShrink", "You are the trade wind"), ("news", "The headline"), ("thermo", "What makes it super"),
         ("waterCycle", "The water cycle"), ("haze", "Here in Singapore: the haze"), ("india", "Meanwhile in India and the USA"), ("try", "Try this")]
T0 = {s['scene']: s['t0'] for s in tl['scenes']}; ch = []
for sc, name in NAMES:
    t = 0 if not ch else max(0, int(T0[sc] - .4)); ch.append(f"{t // 60}:{t % 60:02d} {name}")
FOOT = ("\n\nTheOneApp, Explored: one real news story every Thursday, and the science from your textbook (Primary 3 to Primary 6, Singapore). "
        "The sister series of TheOneApp, Explained.\n\n#TheOneAppExplored #PrimaryScience #Singapore")
desc = ("In November 2026, the end of the year, Singapore still felt like an oven. Why? Shrink down with Pip, Momo and Basil and BE a gust of the "
        "trade wind over the Pacific Ocean: push the warm water west, watch it evaporate and condense into rain clouds, then grow weaker and "
        "watch the warm water and the rain clouds slide away east. That is El Niño. Find out what makes this one a Super El Niño, name the "
        "water cycle (evaporation and condensation), see how a drier year made the haze worse here in Singapore, and what El Niño is doing to "
        "the weather in India and the USA. Then be a weather detective with two cups of water.\n\n" + "\n".join(ch) +
        "\n\nSources:\n"
        "- NOAA Climate Prediction Center, ENSO Diagnostic Discussion, 12 November 2026: a strong to very strong El Niño is likely through "
        "January to March 2027 (cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml)\n"
        "- Meteorological Service Singapore (NEA) news release, 29 May 2026: El Niño conditions expected in the second half of 2026, with "
        "warmer and drier weather from June to October (nea.gov.sg)\n"
        "- National Environment Agency, Haze Situation Update, 9 October 2026: 24-hour PSI 135 to 192, Unhealthy (nea.gov.sg)\n"
        "- India Meteorological Department, end of the 2026 south-west monsoon (30 September 2026): 759.4 mm against a normal of 868.6 mm, "
        "12.6% below normal, as reported by Indian news\n"
        "- NOAA Climate Prediction Center, winter outlook update for December 2026 to February 2027 (19 November 2026): wetter than usual "
        "across the south, warmer than usual across the north (noaa.gov)\n"
        "- How El Niño works: NOAA, Understanding El Niño (noaa.gov/understanding-el-nino)" + FOOT)
V = [{"id": "sau-ep13", "hold": True, "file": f"{SAU}/ep13/ep13.mp4", "thumb": f"{SAU}/ep13/thumb_ep13.jpg", "at": "2026-12-03T09:00:00Z",
      "title": "Super El Niño! Why Is Singapore So Hot And Dry? | TheOneApp, Explored EP13",
      "desc": desc,
      "tags": ["el nino", "super el nino", "trade winds", "water cycle", "evaporation", "condensation", "haze", "PSI", "monsoon", "weather",
               "primary 4 science", "primary 5 science", "singapore", "theoneapp explored"],
      "_ok": "NOT APPROVED: phase 1 (the teacher's four checks, title choice, episode number and date to confirm). Do not upload."}]
json.dump(V, open(f'{H}/upload_ep13.json', 'w'), indent=1, ensure_ascii=False); print("\n".join(ch)); print(len(desc), 'chars')
