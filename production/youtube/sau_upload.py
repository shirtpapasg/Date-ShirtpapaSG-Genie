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
    if not os.path.exists(tl): return ''
    tl = json.load(open(tl)); out = []
    for s in tl['scenes']:
        if s['scene'] in names:
            t = 0 if not out else max(0, int(s['t0'] - .4)); out.append(f"{t // 60}:{t % 60:02d} {names[s['scene']]}")
    return "\n".join(out)
FOOT = ("\n\nTheOneApp, Explored: one real news story every Thursday, and the science from your textbook (Primary 3 to Primary 6, Singapore). "
        "The sister series of TheOneApp, Explained.\n\n#TheOneAppExplored #PrimaryScience #Singapore")
EP1_CH = chapters(f"{SAU}/ep01/ep01_tl.json", {"hook": "Where did the haze go?", "welcome": "Today you'll learn", "news": "The headline", "peat": "Follow one tiny particle", "recap": "Its journey", "tiny": "How small is PM2.5?",
    "lungs": "Your nose and lungs (P5 respiratory system)", "wind": "Why the haze went away", "impact": "People and the environment (P6)", "try": "Try this at home", "think": "Think about it", "close": "Remember"})
EP2_CH = chapters(f"{SAU}/ep02/ep02_tl.json", {"hook": "No oil, no gas", "answer": "Last week's answer: N95 vs cloth", "welcome": "Today you'll learn", "today": "93 out of 100",
    "seabed": "You are a tiny bit of natural gas", "recap1": "Your journey", "convert": "Energy changes (P6)", "try": "Be an energy detective", "think": "Think about it", "close": "Remember"})
EP2B_CH = chapters(f"{SAU}/ep02b/ep02b_tl.json", {"hook2": "No oil, no coal, no gas", "sun": "Part 1's answer: gas started as sunlight", "welcome": "Today you'll learn", "history": "From 1965 to today",
    "news": "The news: less gas from Indonesia", "povSpace": "Be a ray of sunlight", "options": "Solar and our neighbours", "nuclear": "Could nuclear power us?", "think": "Think about it", "close": "Remember"})
EP3_CH = chapters(f"{SAU}/ep03/ep03_tl.json", {"hook": "Bin it or bring it back?", "answer": "Last time's answer: rooftop solar", "welcome": "Today you'll learn", "news": "The news: 10 cents back",
    "returnMachine": "You are a drink can", "recap": "Your journey", "textbook": "Metals and magnets (P3)", "matters": "Why it matters", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP3B_CH = chapters(f"{SAU}/ep03b/ep03b_tl.json", {"hook": "Down the chute", "answer": "Part 1's answer", "welcome": "Today you'll learn", "news": "The news: our only landfill",
    "kitchen": "You are a takeaway box", "recap": "Your journey", "textbook": "Reduce, reuse, recycle (P6)", "act": "What you can do", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP4_CH = chapters(f"{SAU}/ep04/ep04_tl.json", {"hook": "Where does the rain come from?", "answer": "Last time's answer: the greasy box", "welcome": "Today you'll learn", "news": "The news: the monsoon",
    "home": "You are a water molecule", "recap": "Your journey", "cycle": "The water cycle (P4)", "salt": "Is rain salty?", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP5_CH = chapters(f"{SAU}/ep05/ep05_tl.json", {"hook": "Where does your energy come from?", "answer": "Last time's answer: drying clothes", "welcome": "Today you'll learn", "news": "The news: Singapore's food goals",
    "povSun": "You are sunlight", "recap": "Your journey", "photo": "Photosynthesis and food chains", "security": "Food security", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP6_CH = chapters(f"{SAU}/ep06/ep06_tl.json", {"hook": "Where does your food go?", "answer": "Last time's answer", "welcome": "Today you'll learn", "news": "Where does the flush go?",
    "povMouth": "You are a bit of fibre", "recap": "Your journey", "textbook": "The digestive system (P4)", "fibre": "Why fibre matters", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP7_CH = chapters(f"{SAU}/ep07/ep07_tl.json", {"hook": "Huff, puff!", "answer": "Last time's answer", "welcome": "Today you'll learn", "news": "100,000 heartbeats a day",
    "airOut": "You are oxygen", "recap": "Your journey", "textbook": "Respiratory and circulatory systems (P5)", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP8_CH = chapters(f"{SAU}/ep08/ep08_tl.json", {"hook": "An apex predator", "answer": "Last time's answer", "welcome": "Today you'll learn", "news": "Crocodiles in Singapore",
    "povCroc": "Rewind: you are the crocodile", "recap": "The rewind", "textbook": "Food chains (P6)", "bigidea": "The big idea", "try": "Try this", "think": "Think about it", "close": "Remember"})
EP9_CH = chapters(f"{SAU}/ep09/ep09_tl.json", {"hook": "Mosquitoes vs mosquitoes", "answer": "Last time's answer", "welcome": "Today you'll learn", "news": "The news: dengue in Singapore",
    "lab": "You are a Wolbachia mosquito", "recap": "Your journey", "textbook": "Life cycles (P3)", "dengue": "How dengue spreads", "try": "Try this", "think": "Think about it", "close": "Remember"})
VIDEOS = [
 {"id": "sau-trailer", "live": True, "file": f"{SAU}/trailer/trailer.mp4", "at": "2026-11-25T11:00:00Z", "title": "This Grey Sky Was A Science Lesson 🌫️ #Shorts",
  "desc": "Smoke from hundreds of kilometres away. Mosquitoes that fight dengue. A country with no oil or gas of its own. Every Thursday, TheOneApp, Explored turns one real news story into the science from your textbook." + FOOT,
  "tags": ["theoneapp explored", "primary science", "singapore", "haze", "shorts"]},
 {"id": "sau-ep01", "live": True, "file": f"{SAU}/ep01/ep01.mp4", "thumb": f"{SAU}/ep01/thumb_ep01.jpg", "at": "2026-11-26T09:00:00Z", "title": "Why Did The Haze Go Away? | TheOneApp, Explored EP1",
  "desc": "In September 2026 the sky over Singapore turned grey and smoky. By November the haze was gone. Where did it come from, and where did it go? Follow one tiny haze particle from a peat fire in Sumatra, across the sea on the south-west winds, into a child's lungs. Then Heart explains PM2.5 particles, how your nose and lungs protect you (P5 respiratory system), why the rain and the changing winds cleared the sky, and how burning forests affects the environment (P6).\n\n" + EP1_CH +
          "\n\nSources: National Environment Agency haze updates (nea.gov.sg), September to November 2026; news reports of 4 September 2026 (air quality in the unhealthy range for the first time since 2023)." + FOOT,
  "tags": ["haze", "PM2.5", "respiratory system", "primary 5 science", "primary 6 science", "singapore", "PSLE science", "theoneapp explored"]},
 {"id": "sau-ep01-s1", "file": f"{SAU}/ep01/short1.mp4", "at": "2026-11-19T09:00:00Z", "title": "How Small Is A Haze Particle? #Shorts",
  "desc": "About 30 times thinner than a strand of your hair! Watch the full episode: Why did the haze go away? (TheOneApp, Explored EP1)" + FOOT, "tags": ["haze", "PM2.5", "shorts", "theoneapp explored"]},
 {"id": "sau-ep01-s2", "file": f"{SAU}/ep01/short2.mp4", "at": "2026-11-20T09:00:00Z", "title": "Why Does Haze Only Come At Certain Times? #Shorts",
  "desc": "It's all about the wind and the rain. Watch the full episode: Why did the haze go away? (TheOneApp, Explored EP1)" + FOOT, "tags": ["haze", "monsoon", "shorts", "theoneapp explored"]},
 {"id": "sau-ep02", "live": True, "file": f"{SAU}/ep02/ep02.mp4", "thumb": f"{SAU}/ep02/thumb_ep02.jpg", "at": "2026-12-03T09:00:00Z", "title": "No Oil, No Gas: How Does Singapore Keep The Lights On? (Part 1) | TheOneApp, Explored EP2",
  "desc": "Singapore has no oil, coal or gas of its own, yet the lights always come on. In Part 1, YOU are a tiny bit of natural gas: squeezed in rock under the seabed, shooting up a well, cleaned, sent 650 km along a pipe on the seabed, burned in a power station, until your energy lights the lamp in your room. Then Heart explains the energy changes from the Primary 6 textbook: chemical potential energy to heat, kinetic and electrical energy. Part 2 is out on Sunday 22 November."
          "\n\n" + EP2_CH +
          "\n\nSources: Energy Market Authority (ema.gov.sg) energy statistics." + FOOT,
  "tags": ["energy", "natural gas", "singapore", "electricity", "primary 6 science", "energy conversion", "power station", "PSLE science", "theoneapp explored"]},
 {"id": "sau-ep02b", "file": f"{SAU}/ep02b/ep02b.mp4", "thumb": f"{SAU}/ep02b/thumb_ep02b.jpg", "at": "2026-11-22T09:00:00Z", "title": "Can Singapore Keep The Lights On? Sun, Neighbours Or Atoms (Part 2) | TheOneApp, Explored EP2",
  "desc": "Part 2: from oil-fired power stations in 1965 to natural gas today, and what Indonesia sending a little less gas by pipeline means. Then be a ray of sunlight landing on the floating solar farm at Tengeh Reservoir, electricity in a cable under the sea, and a neutron splitting a uranium atom: three ways Singapore might keep the lights on in future."
          "\n\n" + EP2B_CH +
          "\n\nSources: Energy Market Authority (ema.gov.sg) energy statistics and its 2026 feature on advanced nuclear energy; Ministry of Trade and Industry (mti.gov.sg) on low-carbon electricity imports; news reports of 24 to 26 October 2026 on Indonesia's pipeline gas." + FOOT,
  "tags": ["energy", "natural gas", "singapore", "solar", "nuclear", "electricity", "primary 6 science", "PSLE science", "theoneapp explored"]},
 {"id": "sau-ep02-s1", "file": f"{SAU}/ep02/short1.mp4", "at": "2026-11-23T09:00:00Z", "title": "Is Gas Power Secretly Sunlight? #Shorts",
  "desc": "Natural gas formed from tiny sea creatures that got their energy from the Sun. Watch the full episode: How does Singapore keep the lights on? (TheOneApp, Explored EP2, Parts 1 and 2)" + FOOT, "tags": ["energy", "natural gas", "sun", "shorts", "theoneapp explored"]},
 {"id": "sau-ep02-s2", "file": f"{SAU}/ep02/short2.mp4", "at": "2026-11-24T09:00:00Z", "title": "Could Nuclear Power Singapore? #Shorts",
  "desc": "Singapore is studying small modular reactors, but has not decided yet. Watch the full episode: How does Singapore keep the lights on? (TheOneApp, Explored EP2, Parts 1 and 2)" + FOOT, "tags": ["nuclear energy", "singapore", "energy", "shorts", "theoneapp explored"]},
 {"id": "sau-ep03", "file": f"{SAU}/ep03/ep03.mp4", "thumb": f"{SAU}/ep03/thumb_ep03.jpg", "at": "2026-11-25T09:00:00Z", "title": "10 Cents For Your Can? What Really Happens To It (Part 1) | TheOneApp, Explored EP3",
  "desc": "Since April 2026, drinks in plastic bottles and metal cans in Singapore carry a 10-cent deposit, and return machines pay it back. Be an aluminium drink can: scanned, sorted by a magnet, squashed, melted and pressed into a brand-new can. Then Heart explains metals and magnets from the Primary 3 textbook, and why recycling saves energy. Part 2 is out on Saturday 28 November."
          "\n\n" + EP3_CH + "\n\nSources: National Environment Agency (nea.gov.sg), Beverage Container Return Scheme." + FOOT,
  "tags": ["recycling", "beverage container return scheme", "10 cents", "aluminium", "magnets", "primary 3 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep03b", "file": f"{SAU}/ep03b/ep03b.mp4", "thumb": f"{SAU}/ep03b/thumb_ep03b.jpg", "at": "2026-11-28T09:00:00Z", "title": "Where Does Our Rubbish Go? Full By 2035?! (Part 2) | TheOneApp, Explored EP3",
  "desc": "Part 2: be a greasy takeaway box. Down the rubbish chute, burnt at a waste-to-energy plant in Tuas (the heat makes electricity), and the ash taken by barge to Semakau, Singapore's only landfill, expected to be full by about 2035. Then reduce, reuse and recycle right."
          "\n\n" + EP3B_CH + "\n\nSources: National Environment Agency waste statistics 2025; Ministry of Sustainability and the Environment on the lifespan of Semakau Landfill." + FOOT,
  "tags": ["recycling", "semakau landfill", "waste", "reduce reuse recycle", "primary 6 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep04", "file": f"{SAU}/ep04/ep04.mp4", "thumb": f"{SAU}/ep04/thumb_ep04.jpg", "at": "2026-12-01T09:00:00Z", "title": "Where Does All This Rain Come From? You Are A Water Molecule | TheOneApp, Explored EP4",
  "desc": "The north-east monsoon brings Singapore its wettest months. Be a water molecule leaving home in MacRitchie Reservoir: evaporate, meet friends from a puddle, the sea and a river, condense into a cloud, fall as rain and flow home through the drains. Then Heart explains the water cycle from the Primary 4 textbook, and why rain is not salty."
          "\n\n" + EP4_CH + "\n\nSources: Meteorological Service Singapore on the north-east monsoon; PUB on water catchment." + FOOT,
  "tags": ["water cycle", "evaporation", "condensation", "rain", "monsoon", "primary 4 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep05", "file": f"{SAU}/ep05/ep05.mp4", "thumb": f"{SAU}/ep05/thumb_ep05.jpg", "at": "2026-12-04T09:00:00Z", "title": "Your Food Is Sunlight?! Where Does Your Energy Come From? | TheOneApp, Explored EP5",
  "desc": "Be a bit of sunlight: caught by a leaf, turned into food by photosynthesis, stored in a grain of corn, eaten by a hen on a Singapore egg farm, and eaten by a student in the school canteen, until you help them run in the playground. Then Heart explains photosynthesis, food chains and how Singapore keeps food on our tables (food security)."
          "\n\n" + EP5_CH + "\n\nSources: Singapore Food Agency (sfa.gov.sg), Singapore Food Story 2 and Singapore Food Statistics." + FOOT,
  "tags": ["photosynthesis", "food chain", "food security", "singapore food story", "energy", "primary 5 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep06", "file": f"{SAU}/ep06/ep06.mp4", "thumb": f"{SAU}/ep06/thumb_ep06.jpg", "at": "2026-12-07T09:00:00Z", "title": "Where Does Your Food Go? Mouth To Toilet! | TheOneApp, Explored EP6",
  "desc": "Be a bit of fibre from the vegetables on your canteen plate: chewed, squeezed down the gullet, churned in the stomach, past the small intestine (where your rice and egg friends pass into the blood), through the large intestine and, plop, into the toilet. Then Heart explains the digestive system from the Primary 4 textbook, why fibre matters, and where the flush goes (NEWater)."
          "\n\n" + EP6_CH + "\n\nSources: PUB (pub.gov.sg) on used water and NEWater." + FOOT,
  "tags": ["digestive system", "digestion", "fibre", "small intestine", "primary 4 science", "newater", "singapore", "theoneapp explored"]},
 {"id": "sau-ep07", "file": f"{SAU}/ep07/ep07.mp4", "thumb": f"{SAU}/ep07/thumb_ep07.jpg", "at": "2026-12-10T09:00:00Z", "title": "You Are Oxygen! How Does Oxygen Get To Your Muscles? | TheOneApp, Explored EP7",
  "desc": "Be an oxygen molecule in the playground air: breathed in through the nose, down the windpipe, into an air sac, carried by a red blood cell, pumped by the heart to a leg muscle, where you help release energy from food. Then ride back with carbon dioxide and out of the nose. Heart explains the respiratory and circulatory systems from the Primary 5 textbook."
          "\n\n" + EP7_CH + FOOT,
  "tags": ["circulatory system", "respiratory system", "oxygen", "heart", "lungs", "primary 5 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep08", "file": f"{SAU}/ep08/ep08.mp4", "thumb": f"{SAU}/ep08/thumb_ep08.jpg", "at": "2026-12-13T09:00:00Z", "title": "What Did The Crocodile Eat? Rewind To The Sun | TheOneApp, Explored EP8",
  "desc": "A saltwater crocodile at Sungei Buloh Wetland Reserve is an apex predator. Rewind its last meal: be the crocodile, then the mudskipper it ate, the crab the mudskipper ate, the mangrove leaf the crab ate, and the sunlight the leaf caught. Then Heart explains food chains, producers, consumers, predators and prey from the Primary 6 textbook."
          "\n\n" + EP8_CH + "\n\nSources: National Parks Board (nparks.gov.sg), Sungei Buloh Wetland Reserve." + FOOT,
  "tags": ["food chain", "producer", "consumer", "predator", "prey", "sungei buloh", "primary 6 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep03-s1", "file": f"{SAU}/ep03/short1.mp4", "thumb": f"{SAU}/ep03/thumb_short1.jpg", "at": "2026-11-26T09:00:00Z", "title": "Is Your Can Worth 10 Cents? #Shorts",
  "desc": "Singapore's Beverage Container Return Scheme: a 10-cent deposit on drink cans and plastic bottles, paid back at return machines. Watch the full episode: What really happens to your drink can? (TheOneApp, Explored EP3)" + FOOT, "tags": ["recycling", "10 cents", "shorts", "theoneapp explored"]},
 {"id": "sau-ep03-s2", "file": f"{SAU}/ep03/short2.mp4", "thumb": f"{SAU}/ep03/thumb_short2.jpg", "at": "2026-11-27T09:00:00Z", "title": "How Does A Magnet Sort Cans? #Shorts",
  "desc": "Magnets attract steel but not aluminium. Watch the full episode: What really happens to your drink can? (TheOneApp, Explored EP3)" + FOOT, "tags": ["magnets", "recycling", "aluminium", "shorts", "theoneapp explored"]},
 {"id": "sau-ep03b-s1", "file": f"{SAU}/ep03b/short1.mp4", "thumb": f"{SAU}/ep03b/thumb_short1.jpg", "at": "2026-11-29T09:00:00Z", "title": "Singapore's Only Landfill Is Filling Up! #Shorts",
  "desc": "Semakau Landfill is expected to be full by about 2035. Watch the full episode: Where does our rubbish go? (TheOneApp, Explored EP3 Part 2)" + FOOT, "tags": ["semakau", "landfill", "recycling", "shorts", "theoneapp explored"]},
 {"id": "sau-ep03b-s2", "file": f"{SAU}/ep03b/short2.mp4", "thumb": f"{SAU}/ep03b/thumb_short2.jpg", "at": "2026-11-30T09:00:00Z", "title": "What Happens To Rubbish You Throw Away? #Shorts",
  "desc": "Down the chute, burnt at a waste-to-energy plant, and the ash goes to Semakau. Watch the full episode: Where does our rubbish go? (TheOneApp, Explored EP3 Part 2)" + FOOT, "tags": ["rubbish", "waste to energy", "shorts", "theoneapp explored"]},
 {"id": "sau-ep09", "file": f"{SAU}/ep09/ep09.mp4", "thumb": f"{SAU}/ep09/thumb_ep09.jpg", "at": "2026-12-16T09:00:00Z", "title": "Mosquitoes VS Mosquitoes! How Singapore Fights Dengue | TheOneApp, Explored EP9",
  "desc": "Be Wolby, a male Aedes mosquito with Wolbachia inside, released by NEA at an HDB block. Males don't bite. When Wolbachia males mate with wild females, the eggs don't hatch, so there are fewer mosquitoes and less dengue. Then Heart explains a mosquito's life cycle from the Primary 3 textbook, how dengue spreads, and how to tip out standing water."
          "\n\n" + EP9_CH + "\n\nSources: National Environment Agency (nea.gov.sg), Project Wolbachia and dengue statistics." + FOOT,
  "tags": ["dengue", "wolbachia", "mosquito", "life cycle", "primary 3 science", "singapore", "theoneapp explored"]},
 {"id": "sau-ep04-s1", "file": f"{SAU}/ep04/short1.mp4", "thumb": f"{SAU}/ep04/thumb_short1.jpg", "at": "2026-12-02T09:00:00Z", "title": "Is Rain From The Sea Salty? #Shorts",
  "desc": "When sea water evaporates, the salt stays behind, so rain is fresh water. Watch the full episode: Where does all this rain come from? (TheOneApp, Explored EP4)" + FOOT, "tags": ["water cycle", "evaporation", "rain", "shorts", "theoneapp explored"]},
 {"id": "sau-ep04-s2", "file": f"{SAU}/ep04/short2.mp4", "thumb": f"{SAU}/ep04/thumb_short2.jpg", "at": "2026-12-03T09:00:00Z", "title": "Where Does A Puddle Go? #Shorts",
  "desc": "Draw around a puddle with chalk and watch it shrink: the water evaporates into water vapour. Watch the full episode: Where does all this rain come from? (TheOneApp, Explored EP4)" + FOOT, "tags": ["evaporation", "water vapour", "shorts", "theoneapp explored"]},
 {"id": "sau-ep05-s1", "file": f"{SAU}/ep05/short1.mp4", "thumb": f"{SAU}/ep05/thumb_short1.jpg", "at": "2026-12-05T09:00:00Z", "title": "Is All Your Food Secretly Sunlight? #Shorts",
  "desc": "From the Sun, to a leaf, to a grain, to a hen, to an egg, to you. Watch the full episode: Where does your energy come from? (TheOneApp, Explored EP5)" + FOOT, "tags": ["photosynthesis", "food chain", "shorts", "theoneapp explored"]},
 {"id": "sau-ep05-s2", "file": f"{SAU}/ep05/short2.mp4", "thumb": f"{SAU}/ep05/thumb_short2.jpg", "at": "2026-12-06T09:00:00Z", "title": "Why Does Singapore Buy Food From So Many Countries? #Shorts",
  "desc": "More than 9 in 10 bites of our food come from other countries. Food security: many sources, grow more at home, store some away. Watch the full episode: Where does your energy come from? (TheOneApp, Explored EP5)" + FOOT, "tags": ["food security", "singapore", "shorts", "theoneapp explored"]},
]
done = json.load(open(os.path.join(HERE, 'sau_uploaded.json'))) if os.path.exists(os.path.join(HERE, 'sau_uploaded.json')) else {}
# "live": True = already public (the teacher made it live on 18 Nov): a replacement goes up public at once.
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
            "status": ({"privacyStatus": "public"} if v.get('live') else {"privacyStatus": "private", "publishAt": v['at']}) | {"selfDeclaredMadeForKids": True, "embeddable": True}}
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
