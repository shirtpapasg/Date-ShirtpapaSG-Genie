"""mix.py: the new voices over each film's own music and effects -> film<N>_v2.mp4 (the picture copied, not re-encoded).
  python3 mix.py <N> <original.mp4> <no_vocals.wav> <vocals.wav>
- the bed: the film's own soundtrack with the old voices taken out (Demucs htdemucs_ft, vocals / no_vocals).
- each line starts where the old line started (the start refined on the old vocal stem's onset). A line longer than the time until the
  next line (less .12 s) is sped up with ffmpeg atempo, at most x1.15; anything still longer runs on into the gap (reported).
- the bed ducks 4 dB under the new voices (80 ms attack, 350 ms release); master: -16 LUFS integrated, true peak <= -1 dBFS.
Writes lines_film<N>.json (start/end refined, "new_start"/"new_end"/"tempo" added) and work/film<N>_mix.wav."""
import sys, os, json, subprocess, numpy as np, soundfile as sf, re
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H); os.makedirs("work", exist_ok=True)
N, SRC, BED, VOC = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]; SR = 48000
J = json.load(open(f"lines_film{N}.json")); L = J["lines"]
bed, sr = sf.read(BED, always_2d=True); assert sr == SR; old, _ = sf.read(VOC, always_2d=True); n = len(bed)
# the old voice's loudness, 10 ms frames: refine each line's start to its onset near the caption/Whisper start
env = np.sqrt(np.convolve(old.mean(1) ** 2, np.ones(480) / 480, "same"))[::480]; edb = 20 * np.log10(env + 1e-9); top = np.percentile(edb, 99)
for ln in L:
    a = ln.get("start_rough", ln["start"]); ln["start_rough"] = a; b = ln.get("end_rough", ln["end"]); ln["end_rough"] = b
    i0, i1 = max(0, int((a - .3) * 100)), int(min(b, a + 1.8) * 100); seg = edb[i0:i1] > top - 26
    run = np.convolve(seg.astype(int), np.ones(5, int), "valid"); hit = np.where(run == 5)[0]   # 50 ms of voice in a row
    if len(hit): ln["start"] = round((i0 + hit[0]) / 100, 2)
    j0, j1 = int((b - .4) * 100), min(len(edb), int((b + .5) * 100)); seg = edb[j0:j1]; hit = np.where(seg > top - 26)[0]
    if len(hit): ln["end"] = round((j0 + hit[-1]) / 100, 2)
def atempo(x, f):
    sf.write("work/_a.wav", x, SR, subtype="FLOAT")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "work/_a.wav", "-af", f"atempo={f:.4f}", "work/_b.wav"], check=True)
    return sf.read("work/_b.wav")[0]
vox = np.zeros(n); report = []
for k, ln in enumerate(L):
    x, _ = sf.read(f"voice/f{N}_{k:02d}.wav"); d = len(x) / SR
    nxt = L[k + 1]["start"] if k + 1 < len(L) else n / SR - .3; slot = nxt - ln["start"] - .12; f = 1.0
    if d > slot: f = min(1.15, d / slot); x = atempo(x, f); d = len(x) / SR
    s = int(ln["start"] * SR); e = min(n, s + len(x)); vox[s:e] += x[:e - s]
    ln["new_start"], ln["new_end"], ln["tempo"] = ln["start"], round(ln["start"] + d, 2), round(f, 3)
    if f > 1.001 or d > slot: report.append(f'{k:02d} {ln["speaker"]}: "{ln["text"]}" {d:.2f}s in a {slot:.2f}s slot, x{f:.3f}' + (" (runs on)" if d > slot + .01 else ""))
# duck the bed under the new voices
blk = 480; nb = n // blk + 1; vb = np.array([np.sqrt(np.mean(vox[i * blk:(i + 1) * blk] ** 2) + 1e-12) for i in range(nb)])
tgt = np.where(vb > 10 ** (-45 / 20), 10 ** (-4 / 20), 1.0)
tgt = np.minimum.reduce([np.roll(tgt, -s_) for s_ in range(0, 9)])   # start ducking 80 ms before a voice
gb = np.ones(nb); a_, r_ = 1 - np.exp(-1 / 8), 1 - np.exp(-1 / 35)      # 80 ms attack, 350 ms release (10 ms blocks)
for i in range(1, nb): gb[i] = gb[i - 1] + (tgt[i] - gb[i - 1]) * (a_ if tgt[i] < gb[i - 1] else r_)
g = np.interp(np.arange(n), np.arange(nb) * blk + blk / 2, gb)
mix = bed * g[:, None] + vox[:, None] * 1.0
sf.write(f"work/film{N}_pre.wav", mix, SR, subtype="FLOAT")
# master: loudnorm two-pass (linear), -16 LUFS, true peak -1.5 (headroom for AAC)
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"work/film{N}_pre.wav", "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
m = json.loads(r[r.rfind("{"):])
af = f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"work/film{N}_pre.wav", "-af", af + ",aresample=48000", "-ar", "48000", "-c:a", "pcm_s24le", f"work/film{N}_mix.wav"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", SRC, "-i", f"work/film{N}_mix.wav", "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                "-movflags", "+faststart", f"film{N}_v2.mp4"], check=True)
json.dump(J, open(f"lines_film{N}.json", "w"), indent=1)
print("\n".join(report) or "no line sped up")
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"film{N}_v2.mp4", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
print([l.strip() for l in r.splitlines() if l.strip().startswith(("I:", "Peak:"))][-2:])
