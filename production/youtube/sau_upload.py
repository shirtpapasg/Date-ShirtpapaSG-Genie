"""sau_upload.py: upload TheOneApp, Explored videos to YouTube, scheduled per the series rhythm, Made for Kids,
in the "TheOneApp, Explored" playlist, with chapters from each render's timeline. Writes sau_uploaded.json.
    YT_TOKEN_FILE=.yt_token.json python3 sau_upload.py [ids...]      (default: every video in VIDEOS not yet uploaded)
    python3 sau_upload.py --replace sau-ep01 ...    a new render of a video that is still scheduled (not yet public): deletes the
                                                    old upload and uploads the new file with the same details and playlist place
"""
import json, os, sys, time, urllib.request, urllib.parse, urllib.error
HERE = os.path.dirname(os.path.abspath(__file__)); SAU = os.path.join(HERE, '../workspace/sau')
API, UP = "https://www.googleapis.com/youtube/v3", "https://www.googleapis.com/upload/youtube/v3"
CLIENT = "780560926873-2jum0brhcjavtrm6f3ksab5tdk3fv0et.apps.googleusercontent.com"
TF = os.environ.get('YT_TOKEN_FILE', os.path.join(HERE, '.yt_token.json'))
def token():
    t = json.load(open(TF)); b = urllib.parse.urlencode({"client_id": CLIENT, "refresh_token": t['refresh_token'], "grant_type": "refresh_token"}).encode()
    t['access_token'] = json.load(urllib.request.urlopen(urllib.request.Request("https://oauth2.googleapis.com/token", data=b)))['access_token']; json.dump(t, open(TF, 'w')); return t['access_token']
TOK = token()
def call(method, url, params=None, body=None, raw=None, ctype="application/json", headers=False):
    if params: url += "?" + urllib.parse.urlencode(params)
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    r = urllib.request.Request(url, data=data, method=method, headers={"Authorization": "Bearer " + TOK, "Content-Type": ctype})
    with urllib.request.urlopen(r) as resp: return resp.headers if headers else (json.load(resp) if resp.length != 0 else {})
def chapters(tl, names):
    tl = json.load(open(tl)); out = []
    for s in tl['scenes']:
        if s['scene'] in names:
            t = 0 if not out else max(0, int(s['t0'] - .4)); out.append(f"{t // 60}:{t % 60:02d} {names[s['scene']]}")
    return "\n".join(out)
FOOT = ("\n\nTheOneApp, Explored: one real news story every Thursday, and the science from your textbook (Primary 3 to Primary 6, Singapore). "
        "The sister series of TheOneApp, Explained.\n\n#TheOneAppExplored #PrimaryScience #Singapore")
EP1_CH = chapters(f"{SAU}/ep01/ep01_tl.json", {"hook": "Where did the haze go?", "welcome": "Today you'll learn", "news": "The headline", "peat": "Follow one tiny particle", "recap": "Its journey", "tiny": "How small is PM2.5?",
    "lungs": "Your nose and lungs (P5 respiratory system)", "wind": "Why the haze went away", "impact": "People and the environment (P6)", "try": "Try this at home", "think": "Think about it", "close": "Remember"})
EP2_CH = chapters(f"{SAU}/ep02/ep02_tl.json", {"hook": "No oil, no gas", "answer": "Last week's answer: N95 vs cloth", "welcome": "Today you'll learn", "history": "From 1965 to today",
    "today": "93 out of 100", "news": "The news", "sun": "Gas started as sunlight", "seabed": "Follow one tiny bit of gas", "recap1": "Its journey", "convert": "Energy changes (P6)",
    "options": "Solar and our neighbours", "nuclear": "Could nuclear power us?", "try": "Be an energy detective", "think": "Think about it", "close": "Remember"})
VIDEOS = [
 {"id": "sau-trailer", "file": f"{SAU}/trailer/trailer.mp4", "at": "2026-11-25T11:00:00Z", "title": "This Grey Sky Was A Science Lesson 🌫️ #Shorts",
  "desc": "Smoke from hundreds of kilometres away. Mosquitoes that fight dengue. A country with no oil or gas of its own. Every Thursday, TheOneApp, Explored turns one real news story into the science from your textbook." + FOOT,
  "tags": ["theoneapp explored", "primary science", "singapore", "haze", "shorts"]},
 {"id": "sau-ep01", "file": f"{SAU}/ep01/ep01.mp4", "thumb": f"{SAU}/ep01/thumb_ep01.jpg", "at": "2026-11-26T09:00:00Z", "title": "Why Did The Haze Go Away? | TheOneApp, Explored EP1",
  "desc": "In September 2026 the sky over Singapore turned grey and smoky. By November the haze was gone. Where did it come from, and where did it go? Follow one tiny haze particle from a peat fire in Sumatra, across the sea on the south-west winds, into a child's lungs. Then Heart explains PM2.5 particles, how your nose and lungs protect you (P5 respiratory system), why the rain and the changing winds cleared the sky, and how burning forests affects the environment (P6).\n\n" + EP1_CH +
          "\n\nSources: National Environment Agency haze updates (nea.gov.sg), September to November 2026; news reports of 4 September 2026 (air quality in the unhealthy range for the first time since 2023)." + FOOT,
  "tags": ["haze", "PM2.5", "respiratory system", "primary 5 science", "primary 6 science", "singapore", "PSLE science", "theoneapp explored"]},
 {"id": "sau-ep01-s1", "file": f"{SAU}/ep01/short1.mp4", "at": "2026-11-27T09:00:00Z", "title": "How Small Is A Haze Particle? #Shorts",
  "desc": "About 30 times thinner than a strand of your hair! Watch the full episode: Why did the haze go away? (TheOneApp, Explored EP1)" + FOOT, "tags": ["haze", "PM2.5", "shorts", "theoneapp explored"]},
 {"id": "sau-ep01-s2", "file": f"{SAU}/ep01/short2.mp4", "at": "2026-11-30T09:00:00Z", "title": "Why Does Haze Only Come At Certain Times? #Shorts",
  "desc": "It's all about the wind and the rain. Watch the full episode: Why did the haze go away? (TheOneApp, Explored EP1)" + FOOT, "tags": ["haze", "monsoon", "shorts", "theoneapp explored"]},
 {"id": "sau-ep02", "file": f"{SAU}/ep02/ep02.mp4", "thumb": f"{SAU}/ep02/thumb_ep02.jpg", "at": "2026-12-03T09:00:00Z", "title": "No Oil, No Gas: How Does Singapore Keep The Lights On? | TheOneApp, Explored EP2",
  "desc": "Singapore has no oil, coal or gas of its own, yet the lights always come on. From oil-fired power stations in 1965 to natural gas today. Follow one tiny bit of gas from rock under the seabed, along a 650 km pipe, through a power station and into the lamp in your room. Then: what Indonesia's smaller pipeline supply means, and what could power us next: solar, clean electricity from our neighbours, even nuclear. Linked to P6 energy forms and conversion.\n\n" + EP2_CH +
          "\n\nSources: Energy Market Authority (ema.gov.sg) energy statistics and its 2026 feature on advanced nuclear energy; Ministry of Trade and Industry (mti.gov.sg) on low-carbon electricity imports; news reports of 24 to 26 October 2026 on Indonesia's pipeline gas." + FOOT,
  "tags": ["energy", "natural gas", "singapore", "electricity", "primary 6 science", "energy conversion", "solar", "nuclear", "PSLE science", "theoneapp explored"]},
 {"id": "sau-ep02-s1", "file": f"{SAU}/ep02/short1.mp4", "at": "2026-12-04T09:00:00Z", "title": "Is Gas Power Secretly Sunlight? #Shorts",
  "desc": "Natural gas formed from tiny sea creatures that got their energy from the Sun. Watch the full episode: How does Singapore keep the lights on? (TheOneApp, Explored EP2)" + FOOT, "tags": ["energy", "natural gas", "sun", "shorts", "theoneapp explored"]},
 {"id": "sau-ep02-s2", "file": f"{SAU}/ep02/short2.mp4", "at": "2026-12-07T09:00:00Z", "title": "Could Nuclear Power Singapore? #Shorts",
  "desc": "Singapore is studying small modular reactors, but has not decided yet. Watch the full episode: How does Singapore keep the lights on? (TheOneApp, Explored EP2)" + FOOT, "tags": ["nuclear energy", "singapore", "energy", "shorts", "theoneapp explored"]},
]
done = json.load(open(os.path.join(HERE, 'sau_uploaded.json'))) if os.path.exists(os.path.join(HERE, 'sau_uploaded.json')) else {}
REPLACE = sys.argv[1:2] == ['--replace']; want = (sys.argv[2:] if REPLACE else sys.argv[1:]) or [v['id'] for v in VIDEOS]
ORDER = [v['id'] for v in VIDEOS]
def save(): json.dump(done, open(os.path.join(HERE, 'sau_uploaded.json'), 'w'), indent=1)
# playlist
pl = done.get('_playlist')
if not pl:
    pl = call("POST", f"{API}/playlists", {"part": "snippet,status"}, {"snippet": {"title": "TheOneApp, Explored", "defaultLanguage": "en",
        "description": "One real news story every Thursday, and the science behind it from your textbook. Primary 3 to Primary 6, Singapore."}, "status": {"privacyStatus": "public"}})["id"]
    done['_playlist'] = pl; save(); print("playlist", pl)
for v in VIDEOS:
    if v['id'] not in want: continue
    if REPLACE and v['id'] in done:
        old = done.pop(v['id'])['videoId']; call("DELETE", f"{API}/videos", {"id": old}); save(); print("deleted old upload", v['id'], old)
    if v['id'] in done: continue
    meta = {"snippet": {"title": v['title'], "description": v['desc'], "tags": v['tags'], "categoryId": "27", "defaultLanguage": "en", "defaultAudioLanguage": "en"},
            "status": {"privacyStatus": "private", "publishAt": v['at'], "selfDeclaredMadeForKids": True, "embeddable": True}}
    try:
        h = call("POST", f"{UP}/videos", {"uploadType": "resumable", "part": "snippet,status"}, meta, headers=True)
        data = open(v['file'], 'rb').read()
        r = call("PUT", h['Location'], raw=data, ctype="video/mp4")
        vid = r['id']; done[v['id']] = {"videoId": vid, "publishAt": v['at'], "url": f"https://www.youtube.com/watch?v={vid}"}; save()
        print("uploaded", v['id'], vid, r['status'].get('privacyStatus'), r['status'].get('publishAt'))
        if v.get('thumb'):
            try: call("POST", f"{UP}/thumbnails/set", {"videoId": vid, "uploadType": "media"}, raw=open(v['thumb'], 'rb').read(), ctype="image/jpeg"); print("  thumbnail set")
            except urllib.error.HTTPError as e: print("  thumbnail failed", e.code, e.read()[:200])
        for k in range(4):
            try: call("POST", f"{API}/playlistItems", {"part": "snippet"}, {"snippet": {"playlistId": pl, "position": ORDER.index(v['id']), "resourceId": {"kind": "youtube#video", "videoId": vid}}}); print("  in playlist"); break
            except urllib.error.HTTPError as e: time.sleep(3 * (k + 1))
        time.sleep(2)
    except urllib.error.HTTPError as e:
        print("FAILED", v['id'], e.code, e.read()[:300].decode('utf8', 'ignore')); break
