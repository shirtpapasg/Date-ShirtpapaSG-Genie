"""ep13/make_upload.py: the captions (ep13.srt, short1.srt, short2.srt) from the timelines, and ep13/upload_ep13.json (sau_upload.py's
VIDEOS format; it reads epNN/upload_epNN.json) with chapters timed from ep13_tl.json (the final cut).
"hold": true: sau_upload.py uploads an entry ONLY when it is named. Nothing is uploaded here. From 27 Nov it only adds/replaces sau-ep13-v2
(the habitat version) and keeps the entries already in the file; it also writes ep13/app_moments.json (the videos.js moments).
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
NAMES = [("corridor", "Why does it feel like an oven?"), ("povShrink", "You are the trade wind"), ("povReef", "When El Niño changes habitats"), ("news", "The headline"), ("thermo", "What makes it super"),
         ("waterCycle", "The water cycle"), ("haze", "Here in Singapore: the haze"), ("india", "Meanwhile in India and the USA"), ("try", "Try this")]
T0 = {s['scene']: s['t0'] for s in tl['scenes']}; ch = []
for sc, name in NAMES:
    t = 0 if not ch else max(0, int(T0[sc] - .4)); ch.append(f"{t // 60}:{t % 60:02d} {name}")
FOOT = ("\n\nTheOneApp, Explored: one real news story every Thursday, and the science from your textbook (Primary 3 to Primary 6, Singapore). "
        "The sister series of TheOneApp, Explained.\n\n#TheOneAppExplored #PrimaryScience #Singapore")
desc = ("In November 2026, the end of the year, Singapore still felt like an oven. Why? Shrink down with Pip, Momo and Basil and BE a gust of the "
        "trade wind over the Pacific Ocean: push the warm water west, watch it evaporate and condense into rain clouds, then grow weaker and "
        "watch the warm water slide back east, taking the warm, wet air that builds the rain clouds with it. See what that does to habitats: coral reefs bleach white, sea lions and seabirds go hungry, and dry peat forests burn, taking the orangutans' home. That is El Niño. Find out what makes this one a Super El Niño, name the "
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
        "- How El Niño works: NOAA, Understanding El Niño (noaa.gov/understanding-el-nino)\n"
        "- Coral bleaching: NOAA Coral Reef Watch; global bleaching events in 1998, 2010, 2014 to 2017 and 2023 to 2025 (coralreefwatch.noaa.gov)\n"
        "- Kiritimati (Christmas Island), 2015 to 2016: about 89% of hard coral cover lost (peer-reviewed study, pmc.ncbi.nlm.nih.gov/articles/PMC11318656)\n"
        "- Galápagos, 1982 to 1983: most of that year's sea lion pups died (Trillmich and Limberger, Oecologia, 1985)\n"
        "- Indonesia, 2015: about 2.6 million hectares burned, including orangutan habitat in Borneo (CIFOR, forestsnews.cifor.org); "
        "orangutans rescued from the burnt forest (International Animal Rescue)" + FOOT)
# 27 Nov 2026: the entries already in upload_ep13.json (sau-ep13 = REexNUS6HK0, the Shorts and their v2) are history and are kept as they are.
# Only "sau-ep13-v2" (the habitat version) is written or replaced. hold: True and NO "at": not scheduled (sau_upload.py needs an "at" or a
# private-only path before it can upload this entry: the main session decides).
P = f'{H}/upload_ep13.json'; V = json.load(open(P)) if os.path.exists(P) else []
TAGS = ["el nino", "super el nino", "habitat", "coral bleaching", "orangutan", "trade winds", "water cycle", "evaporation", "condensation", "haze", "PSI",
        "monsoon", "weather", "primary 4 science", "primary 5 science", "primary 6 science", "singapore", "theoneapp explored"]
E2 = {"id": "sau-ep13-v2", "hold": True, "file": f"{SAU}/ep13/ep13_v2.mp4", "thumb": f"{SAU}/ep13/thumb_ep13.jpg",
      "title": "Super El Niño! Why Is Singapore So Hot And Dry? | TheOneApp, Explored EP13", "desc": desc, "tags": TAGS,
      "_ok": "27 Nov 2026: v2 with the habitat section (teacher: 'Both habitats are real and well researched... Make it longer is fine'), no buddy discs, "
             "red west-pointing trade winds. Replaces sau-ep13 (REexNUS6HK0, private). NOT scheduled: no 'at'. Upload only on the teacher's go."}
V = [v for v in V if v.get("id") != "sau-ep13-v2"] + [E2]
# the TheOneApp videos.js moments (NEWS entry), from the final cut
MOM = [("povShrink", "You are the trade wind"), ("povReef", "What El Niño does to habitats"), ("news", "The headline"), ("thermo", "What makes it super"),
       ("waterCycle", "The water cycle"), ("haze", "Here in Singapore: the haze"), ("india", "Meanwhile in India and the USA"), ("try", "Try this")]
mom = [{"at": f"{int(T0[sc]) // 60}:{int(T0[sc]) % 60:02d}", "what": w} for sc, w in MOM]
json.dump({"len": f"{int(tl['END']) // 60}:{int(tl['END']) % 60:02d}", "moments": mom}, open(f'{H}/app_moments.json', 'w'), indent=1, ensure_ascii=False)
print("app moments:", mom)
json.dump(V, open(f'{H}/upload_ep13.json', 'w'), indent=1, ensure_ascii=False); print("\n".join(ch)); print(len(desc), 'chars')
