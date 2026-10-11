import sys, os, glob, math, subprocess
src, outdir, tag = sys.argv[1], sys.argv[2], sys.argv[3]   # tag like ep01
dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",src]))
size = os.path.getsize(src) / 1e6; n = max(1, math.ceil(size / 12.5))
while True:
    for f in glob.glob(f"{outdir}/{tag}_*.mp4"): os.remove(f)
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",src,"-c","copy","-map","0","-f","segment","-segment_time",f"{dur / n + .05:.2f}","-reset_timestamps","1",
                    "-segment_format_options","movflags=+faststart",f"{outdir}/{tag}_%d.mp4"], check=True)
    parts = sorted(glob.glob(f"{outdir}/{tag}_*.mp4")); big = max(os.path.getsize(p) for p in parts) / 1e6
    if big <= 14.0: break
    n += 1
print(tag, f"{size:.1f}MB", len(parts), "parts, largest", f"{big:.2f}MB")
