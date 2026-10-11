"""sfx.py EPDIR: sound effects track EPDIR/sfx.wav from EPDIR/tl.json (key-word pop + whoosh, confetti dings,
4 soft clock ticks during the quiz countdown, when nothing else plays)."""
import json, subprocess, sys
D = sys.argv[1] if len(sys.argv) > 1 else "."
tl = json.load(open(f"{D}/tl.json")); END = tl["END"]
ev = []
for k in tl["kws"]: ev += [("pop", k["t"]), ("whoosh", k["t"] + 1.9)]
for b in tl["bursts"]: ev.append(("ding", b))
q = next((x for x in tl["segs"] if x["id"] == "quiz1"), None)
if q:
    t0 = q["t1"] + .5; ev = [e for e in ev if not (t0 - .3 <= e[1] <= t0 + 4.2)] + [("tick", t0 + i) for i in range(4)]
src = {"pop": "sine=f=880:d=0.12,volume=0.5,afade=t=out:st=0.02:d=0.1,asetrate=44100*1.2,aresample=44100",
       "whoosh": "anoisesrc=d=0.5:c=pink:a=0.35,bandpass=f=1200:w=900,afade=t=in:d=0.15,afade=t=out:st=0.2:d=0.3",
       "tick": "aevalsrc=0.45*sin(2*PI*1400*t)*exp(-70*t)+0.25*sin(2*PI*2600*t)*exp(-120*t):s=44100:d=0.08",
       "ding": "sine=f=1318:d=0.6,volume=0.35,afade=t=out:st=0.05:d=0.55"}
inputs, fl = [], []
for i, (k, t) in enumerate(ev):
    inputs += ["-f", "lavfi", "-i", src[k]]
    fl.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=mono,adelay={int(t*1000)}:all=1[e{i}]")
fl.append("".join(f"[e{i}]" for i in range(len(ev))) + f"amix=inputs={len(ev)}:normalize=0,apad,atrim=0:{END}[out]")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + inputs + ["-filter_complex", ";".join(fl), "-map", "[out]", f"{D}/sfx.wav"], check=True)
print("sfx events", len(ev))
