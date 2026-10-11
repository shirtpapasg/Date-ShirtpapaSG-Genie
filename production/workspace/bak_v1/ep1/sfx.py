import json, subprocess
tl = json.load(open("tl.json")); END = tl["END"]
ev = []
for k in tl["kws"]: ev += [("pop", k["t"]), ("whoosh", k["t"] + 1.9)]
for b in tl["bursts"]: ev.append(("ding", b))
src = {"pop": "sine=f=880:d=0.12,volume=0.5,afade=t=out:st=0.02:d=0.1,asetrate=44100*1.2,aresample=44100",
       "whoosh": "anoisesrc=d=0.5:c=pink:a=0.35,bandpass=f=1200:w=900,afade=t=in:d=0.15,afade=t=out:st=0.2:d=0.3",
       "ding": "sine=f=1318:d=0.6,volume=0.35,afade=t=out:st=0.05:d=0.55"}
inputs, fl = [], []
for i, (k, t) in enumerate(ev):
    inputs += ["-f", "lavfi", "-i", src[k]]
    fl.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=mono,adelay={int(t*1000)}:all=1[e{i}]")
fl.append("".join(f"[e{i}]" for i in range(len(ev))) + f"amix=inputs={len(ev)}:normalize=0,apad,atrim=0:{END}[out]")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y"] + inputs + ["-filter_complex", ";".join(fl), "-map", "[out]", "sfx.wav"], check=True)
print("sfx events", len(ev))
