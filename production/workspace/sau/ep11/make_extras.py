"""ep11/make_extras.py: the captions (.srt) of EP11 and its two Shorts from their timelines, and ep11/upload_ep11.json, the YouTube
details in the format of youtube/sau_upload.py's VIDEOS list (it reads epNN/upload_epNN.json too). Nothing is uploaded here.
    python3 ep11/make_extras.py       (from workspace/sau)"""
import json, os
H = os.path.dirname(os.path.abspath(__file__)); SAU = os.path.dirname(H)
def ts(x): x = max(0, x); return f"{int(x // 3600):02d}:{int(x % 3600 // 60):02d}:{int(x % 60):02d},{int(round(x % 1 * 1000)) % 1000:03d}"
for v in ('ep11', 'short1', 'short2'):
    tl = json.load(open(f'{H}/{v}_tl.json')); out = []
    for i, c in enumerate(tl['caps'], 1): out.append(f"{i}\n{ts(c['t0'])} --> {ts(c['t1'])}\n{' '.join(w['t'] for w in c['w'])}\n")
    ny = next((s for s in tl['segs'] if s['scene'] == 'nyk'), None)       # the big title says it; the captions say it too
    if ny: out.append(f"{len(out) + 1}\n{ts(ny['t0'])} --> {ts(ny['t1'] + 1.5)}\nNow you know!\n")
    open(f'{H}/{v}.srt', 'w').write("\n".join(out)); print(v, 'srt', len(out), 'captions, END', tl['END'])
def chapters(tl, names):    # the same rule as sau_upload.py
    tl = json.load(open(tl)); out = []
    for s in tl['scenes']:
        if s['scene'] in names:
            t = 0 if not out else max(0, int(s['t0'] - .4)); out.append(f"{t // 60}:{t % 60:02d} {names[s['scene']]}")
    return "\n".join(out)
CH = chapters(f'{H}/ep11_tl.json', {"hook": "A hundred billion switches", "answer": "Last time's answer", "news": "The news: Nvidia, November 2026",
    "pixels": "GPUs and pixels", "hall": "CPU vs GPU: one teacher or a whole hall?", "circuit": "Switches (P5 electric circuits)",
    "countdown": "You are a grain of sand", "povLight": "Drawn with light and shadow (P4 light)", "chipMap": "Where chips are made",
    "heat": "AI, electricity and heat (P4 heat)", "try": "Try this", "think": "Think about it", "close": "Remember"})
FOOT = ("\n\nTheOneApp, Explored: one real news story every Thursday, and the science from your textbook (Primary 3 to Primary 6, Singapore). "
        "The sister series of TheOneApp, Explained.\n\n#TheOneAppExplored #PrimaryScience #Singapore")
SRC = ("\n\nSources:\n"
       "- Nvidia, Blackwell architecture (nvidia.com/en-us/data-center/technologies/blackwell-architecture): the Blackwell GPU has 208 billion transistors on two dies, so one die holds more than a hundred billion\n"
       "- Nvidia's press release of 23 November 2026, filed with the US SEC (Form 8-K), and news reports of the same day (CBS News, NPR, CNBC): Jensen Huang reinstated as CEO, 11 days after stepping down on 12 November 2026\n"
       "- Singapore Economic Development Board (edb.gov.sg/en/industries/semiconductor) and Singapore Department of Statistics (SingStat): Singapore makes about 1 in 10 of the world's chips\n"
       "- Nvidia designs its chips in the United States (Santa Clara, California); TSMC makes the newest in Taiwan (news reports, 2025-2026)\n"
       "- Wafers, crystals and clean rooms: reference articles on silicon wafers (300 mm wafers about 0.78 mm thick), the Czochralski method (crystals up to about 2 m long) and the ISO 14644 clean-room classes")
E = f'{SAU}/ep11'
V = [{"id": "sau-ep11", "hold": True, "file": f"{E}/ep11.mp4", "thumb": f"{E}/thumb_ep11.jpg", "at": "2026-11-26T09:00:00Z",
      "title": "How Do You Build A Chip That Helps AI Think? From Sand To Chip | TheOneApp, Explored EP11",
      "desc": "In November 2026, the chip company Nvidia was in the news around the world. Why does everyone watch its chips? They are the engines of today's AI. "
              "Find out how a GPU is like a whole school hall of pupils, how a chip is made of tiny switches (P5 electric circuits), and then BE a grain of sand: "
              "melted into silicon, grown into a crystal, sliced into a wafer, and drawn on with light and shadow (P4 light) until you become a chip. "
              "Plus: Singapore makes about 1 in 10 of the world's chips, and why AI data centres need cooling (P4 heat).\n\n" + CH + SRC + FOOT,
      "tags": ["computer chip", "GPU", "CPU", "transistor", "semiconductor", "silicon", "light and shadow", "heat", "primary 4 science", "primary 5 science", "singapore", "theoneapp explored"]},
     {"id": "sau-ep11-s1", "hold": True, "file": f"{E}/short1.mp4", "thumb": f"{E}/thumb_short1.jpg", "at": "2026-11-27T09:00:00Z",
      "title": "How Does Sand Become A Computer Chip? #Shorts",
      "desc": "Be a grain of sand: melted into silicon, sliced into a wafer, and drawn on with light and shadow. Watch the full episode: How do you build a chip that helps AI think? (TheOneApp, Explored EP11)" + FOOT,
      "tags": ["computer chip", "silicon", "light and shadow", "shorts", "theoneapp explored"]},
     {"id": "sau-ep11-s2", "hold": True, "file": f"{E}/short2.mp4", "thumb": f"{E}/thumb_short2.jpg", "at": "2026-11-30T09:00:00Z",
      "title": "One Teacher Or A Whole Hall? CPU vs GPU #Shorts",
      "desc": "A CPU is like one very clever teacher; a GPU is like a whole school hall of pupils, each doing one small sum at the same time. That is why GPUs help teach AI. Watch the full episode: How do you build a chip that helps AI think? (TheOneApp, Explored EP11)" + FOOT,
      "tags": ["GPU", "CPU", "AI", "shorts", "theoneapp explored"]}]
json.dump(V, open(f'{H}/upload_ep11.json', 'w'), indent=1, ensure_ascii=False); print('upload_ep11.json'); print(CH)
