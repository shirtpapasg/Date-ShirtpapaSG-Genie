"""finish.py (v3): out/chunks_v3 + out/mix.wav -> film4_v3.mp4 (1920x1080, 60 fps, a soft bloom on the lights, AAC 192k, about -16 LUFS),
film4_v3.srt (the captions, sentence by sentence, from the aligned words), contact_v3.jpg (one frame every 4 s), compare_v3.jpg (film 4 v3
beside films 1-3 at similar moments), film4_v3_720.mp4 (a 720p preview under 15 MB). Copies go to the scratch folder given as argv[1].
    python3 finish.py [/abs/scratch/dir]"""
import json, subprocess, os, sys, shutil
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H); TL = json.load(open("tl.json")); FPS = 60
OUTD = sys.argv[1] if len(sys.argv) > 1 else None
run = lambda *a: subprocess.run(list(a), check=True)
dur = lambda f: float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
# join the chunks again, re-encoded (render.js's -c copy join gave mismatched H.264 headers once), with a soft bloom: the bright parts
# (lamps, windows, neon) are blurred and screened back over the frame at 35%, the glow films 1-3 have on their lights
BLOOM = "split[a][b];[b]curves=all='0/0 0.55/0 1/1',gblur=sigma=16[g];[a][g]blend=all_mode=screen:all_opacity=0.35,format=yuv420p"
run("ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", "out/chunks_v3/list.txt", "-vf", BLOOM, "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-r", str(FPS), "out/video_v3j.mp4")
run("ffmpeg", "-y", "-loglevel", "error", "-i", "out/video_v3j.mp4", "-i", "out/mix.wav", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", "out/_f.mp4")
os.replace("out/_f.mp4", "film4_v3.mp4"); D = dur("film4_v3.mp4"); print("film4_v3.mp4", round(D, 2), "s")
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
open("film4_v3.srt", "w").write("\n".join(f"{i + 1}\n{ft(a)} --> {ft(b)}\n{t}\n" for i, (a, b, t) in enumerate(cues))); print(len(cues), "captions -> film4_v3.srt")
# the contact sheet: one frame every 4 s (2, 6, 10 ...), 5 across
sh = "out/sheet_v3"; shutil.rmtree(sh, ignore_errors=True); os.makedirs(sh)
ts = [2 + 4 * k for k in range(int((D - 2) // 4) + 1)]
for k, t in enumerate(ts): run("ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", "film4_v3.mp4", "-frames:v", "1", "-vf", f"scale=384:216,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='{t}s':x=8:y=8:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.5", f"{sh}/s_{k:02d}.png")
rows = (len(ts) + 4) // 5
run("ffmpeg", "-y", "-loglevel", "error", "-pattern_type", "glob", "-i", f"{sh}/s_*.png", "-vf", f"tile=5x{rows}", "-frames:v", "1", "-q:v", "3", "contact_v3.jpg"); print(len(ts), "frames -> contact_v3.jpg")
# films 1-3 (the quality bar) beside v3 at similar moments: the Station, the story, the quiz, the shop, the end card
RV = "../revoice"; ROWS = [("Station", 5.5, 6, 4, 6), ("Story", 13.2, 18, 18, 12), ("Quiz", 30.6, 54, 30, 52), ("Shop / legendary looks", 50.2, 60, 61, 60), ("Games", 70.5, 66, 46, 40), ("End card", 84, 76, 70, 72)]
cd = "out/cmp_v3"; shutil.rmtree(cd, ignore_errors=True); os.makedirs(cd); n = 0
for name, *tt in ROWS:
    for j, (src, t) in enumerate(zip(["film4_v3.mp4", f"{RV}/film1_v2.mp4", f"{RV}/film2_v2.mp4", f"{RV}/film3_v2.mp4"], tt)):
        lab = ["Film 4 v3", "Film 1", "Film 2", "Film 3"][j] + f" {t}s" + (f" ({name})" if j == 0 else "")
        run("ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", src, "-frames:v", "1", "-vf", f"scale=480:270,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='{lab}':x=8:y=8:fontsize=16:fontcolor=white:box=1:boxcolor=black@0.55", f"{cd}/c_{n:02d}.png"); n += 1
run("ffmpeg", "-y", "-loglevel", "error", "-pattern_type", "glob", "-i", f"{cd}/c_*.png", "-vf", f"tile=4x{len(ROWS)}", "-frames:v", "1", "-q:v", "3", "compare_v3.jpg"); print("compare_v3.jpg")
# the 720p preview (under 15 MB): 60 fps, two-pass at a fixed bitrate
br = int((14.2e6 * 8 / D - 96e3) / 1000)
for ps in (1, 2):
    run("ffmpeg", "-y", "-loglevel", "error", "-i", "film4_v3.mp4", "-vf", "scale=1280:720:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-b:v", f"{br}k", "-pass", str(ps), "-passlogfile", "out/p720",
        *(["-an", "-f", "null", "/dev/null"] if ps == 1 else ["-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "film4_v3_720.mp4"]))
print("film4_v3_720.mp4", round(os.path.getsize("film4_v3_720.mp4") / 1e6, 2), "MB at", br, "kbit/s")
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", "film4_v3.mp4", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
print([l.strip() for l in r.splitlines() if l.strip().startswith(("I:", "Peak:", "LRA:"))][-3:])
r = subprocess.run(["ffmpeg", "-v", "error", "-i", "film4_v3.mp4", "-f", "null", "-"], capture_output=True, text=True); print("decode errors:", repr(r.stderr[:300]) or "none")
if OUTD:
    os.makedirs(OUTD, exist_ok=True)
    for a, b in [("film4_v3.mp4", "film4_v3.mp4"), ("film4_v3_720.mp4", "film4_v3_720.mp4"), ("contact_v3.jpg", "contact.jpg"), ("compare_v3.jpg", "compare.jpg"), ("thumb_v3.jpg", "thumb_v3.jpg"), ("film4_v3.srt", "film4_v3.srt")]:
        if os.path.exists(a): shutil.copy(a, os.path.join(OUTD, b))
    print("copied to", OUTD)
