"""finish.py: out/video_p1.mp4 + out/mix.wav -> film4.mp4 (1920x1080, 30 fps, AAC 192k, about -16 LUFS), film4.srt (the captions,
sentence by sentence, from the aligned words), contact.jpg (one frame every 5 s, 4 x 4).   python3 finish.py"""
import json, subprocess, os
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H); TL = json.load(open("tl.json"))
run = lambda *a: subprocess.run(list(a), check=True)
# render.js joins its chunks with -c copy, which gave a broken stream here (mismatched H.264 headers): join them again, re-encoded
run("ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", "out/chunks_p1/list.txt", "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-r", "30", "out/video_p1.mp4")
run("ffmpeg", "-y", "-loglevel", "error", "-i", "out/video_p1.mp4", "-i", "out/mix.wav", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", "out/_f.mp4")
os.replace("out/_f.mp4", "film4.mp4")
D = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", "film4.mp4"], capture_output=True, text=True).stdout); print("film4.mp4", round(D, 2), "s")
def ft(t): h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60; return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")
cues = []
for id in TL["order"]:
    L = TL["lines"][id]; ws = L["words"]; cur = []
    for i, w in enumerate(ws):
        cur.append(w)
        if w["w"][-1] in ".!?" or i == len(ws) - 1: cues.append([cur[0]["a"], cur[-1]["b"] + .3, " ".join(x["w"] for x in cur)]); cur = []
cues.sort()
i = 0
while i < len(cues) - 1:
    if cues[i + 1][0] - cues[i][0] < .6: cues[i + 1] = [cues[i][0], max(cues[i][1], cues[i + 1][1]), cues[i][2] + " " + cues[i + 1][2]]; del cues[i]
    else: i += 1
for i in range(len(cues) - 1): cues[i][1] = max(cues[i][0] + .4, min(cues[i][1], cues[i + 1][0] - .02))
open("film4.srt", "w").write("\n".join(f"{i + 1}\n{ft(a)} --> {ft(b)}\n{t}\n" for i, (a, b, t) in enumerate(cues))); print(len(cues), "captions -> film4.srt")
os.makedirs("out/sheet", exist_ok=True)
ts = [2.5 + 5 * k for k in range(int((D - 2.5) // 5) + 1)][:16]
for k, t in enumerate(ts): run("ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", "film4.mp4", "-frames:v", "1", "-vf", "scale=480:270", f"out/sheet/s_{k:02d}.png")
run("ffmpeg", "-y", "-loglevel", "error", "-pattern_type", "glob", "-i", "out/sheet/s_*.png", "-vf", "tile=4x4", "-frames:v", "1", "-q:v", "3", "contact.jpg"); print(len(ts), "frames -> contact.jpg (t =", ", ".join(f"{t:g}" for t in ts) + ")")
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", "film4.mp4", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
print([l.strip() for l in r.splitlines() if l.strip().startswith(("I:", "Peak:", "LRA:"))][-3:])
