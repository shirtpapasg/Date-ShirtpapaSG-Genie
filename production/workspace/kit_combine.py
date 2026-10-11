import json, glob, os, re
S = os.path.dirname(os.path.abspath(__file__))
def t0(n, sid): return next(s["t0"] for s in json.load(open(f"{S}/ep{n}/tl.json"))["segs"] if s["id"] == sid)
fmt = lambda t: f"{int(t) // 60}:{int(t) % 60:02d}"
add = {15: ("define", "What is a shadow? Light travels in straight lines", "The three-card test"),
       16: ("rule1", "Rules 1 and 2: move the torch, move the screen", "Moving the ball changes both distances")}
for p in [f"{S}/p4/YOUTUBE_UPLOAD_KIT.md"] + glob.glob(f"{S}/p4/kit_ep1[56].md"):
    s = open(p).read()
    for n, (sid, title, before) in add.items():
        if title in s: continue
        s = re.sub(rf"(\n)(\d+:\d\d {re.escape(before)})", lambda m: f"\n{fmt(t0(n, sid))} {title}\n{m.group(2)}", s, count=1)
    open(p, "w").write(s)
