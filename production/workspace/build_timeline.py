import json, re, subprocess
TEMPO = 1.10
GAP_MAX, GAP_KEEP, CLIP_GAP = 0.45, 0.32, 0.35
al = json.load(open("align.json")); asr = json.load(open("asr/asr.json"))
clean = lambda w: re.sub(r"\(\d+\)", "", w)
def words_of(k):
    src = asr if k == "b0" else al
    return [(clean(w), a, b) for w, a, b in src[k] if not w.startswith("<") and not w.startswith("[")]
segs = []; out_t = 0.0; filt = []; idx = 0
for n, k in enumerate(["b0", "b1", "b2", "b3"]):
    ws = words_of(k)
    dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"audio/{k}.wav"]))
    # keep-intervals: speech with long gaps capped
    keeps = []; cur0 = max(0, ws[0][1] - .15)
    for (w1, a1, b1), (w2, a2, b2) in zip(ws, ws[1:]):
        if a2 - b1 > GAP_MAX:
            keeps.append((cur0, b1 + GAP_KEEP / 2)); cur0 = a2 - GAP_KEEP / 2
    keeps.append((cur0, min(dur, ws[-1][2] + .25)))
    base = out_t
    def mp(t, keeps=keeps, base=base):
        acc = 0
        for a, b in keeps:
            if t < a: return base + acc / TEMPO
            if t <= b: return base + (acc + t - a) / TEMPO
            acc += b - a
        return base + acc / TEMPO
    kept = sum(b - a for a, b in keeps)
    segs.append({"k": k, "t0": base, "t1": base + kept / TEMPO,
                 "words": [{"w": w, "a": round(mp(a), 3), "b": round(mp(b), 3)} for w, a, b in ws],
                 "map": None})
    segs[-1]["raw"] = [[round(a,3), round(mp(a),3)] for a in [x / 10 for x in range(0, int(dur * 10) + 1)]]
    for a, b in keeps:
        filt.append(f"[{n}:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[s{idx}]"); idx += 1
    out_t = base + kept / TEMPO
    if k != "b3":
        filt.append(f"aevalsrc=0:d={CLIP_GAP * TEMPO:.3f}:s=48000:c=stereo[s{idx}]"); idx += 1
        out_t += CLIP_GAP
fc = ";".join(filt) + ";" + "".join(f"[s{i}]" for i in range(idx)) + f"concat=n={idx}:v=0:a=1,aformat=channel_layouts=stereo,atempo={TEMPO}[out]"
cmd = ["ffmpeg","-hide_banner","-loglevel","error","-y"] + sum([["-i", f"audio/{k}.wav"] for k in ["b0","b1","b2","b3"]], []) + ["-filter_complex", fc, "-map", "[out]", "audio/v2.wav"]
subprocess.run(cmd, check=True)
real = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0","audio/v2.wav"]))
for s in segs: print(s["k"], round(s["t0"],2), "->", round(s["t1"],2))
print("audio total", real, "planned", round(out_t,2))
json.dump({"segs": segs, "total": real}, open("timeline.json", "w"))
