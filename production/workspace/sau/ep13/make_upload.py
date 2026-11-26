"""ep13/make_upload.py: the captions (ep13.srt, short1.srt, short2.srt) from the timelines, and ep13/upload_ep13.json (sau_upload.py's
VIDEOS format; it reads epNN/upload_epNN.json) with chapters timed from ep13_tl.json (the final cut).
"hold": true: sau_upload.py uploads an entry ONLY when it is named (sau-ep13, sau-ep13-s1, sau-ep13-s2). Nothing is uploaded here.
Schedule (teacher, 26 Nov: "3 Dec OK"): episode Thu 3 Dec, Short 1 Fri 4 Dec, Short 2 Mon 7 Dec 2026, 5 pm SGT.
    python3 ep13/make_upload.py   (from workspace/sau)"""
import json, os
H = os.path.dirname(os.path.abspath(__file__)); SAU = os.path.dirname(H)
def ts(x): x = max(0, x); return f"{int(x // 3600):02d}:{int(x % 3600 // 60):02d}:{int(x % 60):02d},{int(round(x % 1 * 1000)) % 1000:03d}"
for v in ('ep13', 'short1', 'short2'):
    tv = json.load(open(f'{H}/{v}_tl.json')); out = []
    for i, c in enumerate(tv['caps'], 1): out.append(f"{i}\n{ts(c['t0'])} --> {ts(c['t1'])}\n{' '.join(w['t'] for w in c['w'])}\n")
    ny = next((x for x in tv['segs'] if x['scene'] == 'nyk'), None)
    if ny: out.append(f"{len(out) + 1}\n{ts(ny['t0'])} --> {ts(ny['t1'] + 1.5)}\nNow you know!\n")
    open(f'{H}/{v}.srt', 'w').write("\n".join(out)); print(v, 'srt', len(out), 'captions, END', tv['END'])
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
        "watch the warm water slide back east, taking the warm, wet air that builds the rain clouds with it. That is El Niño. Find out what makes this one a Super El Niño, name the "
        "water cycle (evaporation and condensation), see how a drier year made the haze worse here in Singapore, and what El Niño is doing to "
        "the weather in India and the USA. Then be a weather detective with two cups of water.\n\n" + "\n".join(ch) +
        "\n\nSources:\n"
        "- NOAA Climate Prediction Center, ENSO Diagnostic Discussion, 12 November 2026: a strong to very strong El Niño is likely through "
        "January to March 2027 (cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml)\n"
        "- Meteorological Service Singapore (NEA) news release, 29 May 2026: El Niño conditions expected in the second half of 2026, with "
        "warmer and drier weather from June to October (nea.gov.sg)\n"
        "- National Environment Agency, Haze Situation Update, 9 October 2026: 24-hour PSI 135 to 192, Unhealthy (nea.gov.sg)\n"
        "- India Meteorological Department, end of the 2026 south-west monsoon (30 September 2026): 759.4 mm against a normal of 868.6 mm, "
        "12.6% below normal, the weakest since 2015 (as reported by Indian news)\n"
        "- NOAA Climate Prediction Center, winter outlook update for December 2026 to February 2027 (19 November 2026): wetter than usual "
        "across the south, warmer than usual across the north (noaa.gov)\n"
        "- How El Niño works: NOAA, Understanding El Niño (noaa.gov/understanding-el-nino)" + FOOT)
V = [{"id": "sau-ep13", "hold": True, "file": f"{SAU}/ep13/ep13.mp4", "thumb": f"{SAU}/ep13/thumb_ep13.jpg", "at": "2026-12-03T09:00:00Z",
      "title": "Super El Niño! Why Is Singapore So Hot And Dry? | TheOneApp, Explored EP13",
      "desc": desc,
      "tags": ["el nino", "super el nino", "trade winds", "water cycle", "evaporation", "condensation", "haze", "PSI", "monsoon", "weather",
               "primary 4 science", "primary 5 science", "singapore", "theoneapp explored"],
      "_ok": "Teacher 26 Nov 2026: four checks answered, title, EP13 and 3 Dec OK. Upload only after the teacher has watched the render."},
     {"id": "sau-ep13-s1", "hold": True, "file": f"{SAU}/ep13/short1.mp4", "thumb": f"{SAU}/ep13/thumb_short1.jpg", "at": "2026-12-04T09:00:00Z",
      "title": "Where Did Singapore's Rain Go? #Shorts",
      "desc": "Be a gust of the trade wind over the Pacific Ocean. When you grow weaker, the warm water slides back east, and so do the rain clouds. "
              "That is El Niño. Watch the full episode: Super El Niño! Why Is Singapore So Hot And Dry? (TheOneApp, Explored EP13)" + FOOT,
      "tags": ["el nino", "trade winds", "weather", "singapore", "shorts", "theoneapp explored"]},
     {"id": "sau-ep13-s2", "hold": True, "file": f"{SAU}/ep13/short2.mp4", "thumb": f"{SAU}/ep13/thumb_short2.jpg", "at": "2026-12-07T09:00:00Z",
      "title": "Only 2 °C? How A Super El Niño Changes The World's Weather #Shorts",
      "desc": "The middle of the Pacific is more than two degrees Celsius warmer than usual: a Super El Niño. Across a whole ocean, that is a huge "
              "amount of heat. This year India's monsoon brought about one-eighth less rain, and the USA expects a wetter south and a warmer north this winter. "
              "Watch the full episode: Super El Niño! Why Is Singapore So Hot And Dry? (TheOneApp, Explored EP13)\n\nSources: NOAA Climate Prediction Center "
              "(12 and 19 November 2026); India Meteorological Department (30 September 2026)" + FOOT,
      "tags": ["super el nino", "el nino", "monsoon", "india", "usa", "weather", "shorts", "theoneapp explored"]}]
json.dump(V, open(f'{H}/upload_ep13.json', 'w'), indent=1, ensure_ascii=False); print("\n".join(ch)); print(len(desc), 'chars')
