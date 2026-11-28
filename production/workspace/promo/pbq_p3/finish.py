"""finish.py REVIEW_DIR: after compose.py h and v. Writes, for each cut: a 720p preview, a poster (the end-card frame),
QA contact sheets (one frame every 2 s), and checks (length, size, fps, loudness, true peak, black/frozen frames) to checks.json."""
import sys, os, json, subprocess, re
H = os.path.dirname(os.path.abspath(__file__)); os.chdir(H); OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
CUTS = {"16x9": ("pbq_p3_promo_16x9", "1280:720"), "9x16": ("pbq_p3_promo_9x16", "720:1280")}
def run(a): return subprocess.run(a, capture_output=True, text=True)
res = {}
for k, (name, sc) in CUTS.items():
    f = f"{name}.mp4"
    if not os.path.exists(f): continue
    pr = json.loads(run(["ffprobe", "-v", "error", "-show_entries", "format=duration,size:stream=codec_type,width,height,r_frame_rate,nb_frames", "-of", "json", f]).stdout)
    v = [s for s in pr["streams"] if s["codec_type"] == "video"][0]; dur = float(pr["format"]["duration"])
    e = run(["ffmpeg", "-nostats", "-i", f, "-af", "ebur128=peak=true", "-f", "null", "-"]).stderr; summ = e[e.rindex("Summary:"):]
    I = float(re.search(r"I:\s+(-?[\d.]+) LUFS", summ).group(1)); TP = float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", summ).group(1))
    bl = run(["ffmpeg", "-nostats", "-i", f, "-vf", "blackdetect=d=0.1:pix_th=0.06", "-an", "-f", "null", "-"]).stderr
    fz = run(["ffmpeg", "-nostats", "-i", f, "-vf", "freezedetect=n=0.0005:d=1.5", "-an", "-f", "null", "-"]).stderr
    res[k] = dict(file=os.path.join(H, f), seconds=round(dur, 2), size=f"{v['width']}x{v['height']}", fps=v["r_frame_rate"], frames=v.get("nb_frames"),
                  MB=round(int(pr["format"]["size"]) / 1e6, 2), LUFS=I, true_peak_dBTP=TP,
                  black=re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", bl), frozen=re.findall(r"freeze_start: ([\d.]+)", fz))
    pv = f"{OUT}/{name}_720p.mp4"
    subprocess.run(["flock", "/tmp/explained_render.lock", "ffmpeg", "-v", "error", "-y", "-i", f, "-vf", f"scale={sc}:flags=lanczos", "-r", "30", "-c:v", "libx264",
                    "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", pv], check=True)
    res[k]["preview_MB"] = round(os.path.getsize(pv) / 1e6, 2)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{dur - 1.6:.2f}", "-i", f, "-frames:v", "1", "-q:v", "3", f"{OUT}/{name}_poster.jpg"], check=True)
    tile = "6x5" if k == "16x9" else "8x2"; w = 480 if k == "16x9" else 270
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f, "-vf", f"select=not(mod(n\\,120)),scale={w}:-1,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:"
                    f"text='%{{pts\\:hms}}':x=4:y=4:fontsize=16:fontcolor=yellow:box=1:boxcolor=black,tile={tile}", "-frames:v", "1", "-q:v", "3", f"{OUT}/qa_{name}_every2s.jpg"], check=True)
json.dump(res, open(f"{OUT}/checks.json", "w"), indent=1); print(json.dumps(res, indent=1))
