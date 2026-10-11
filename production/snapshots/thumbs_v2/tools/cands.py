"""Show up to 4 candidate frames (2x2, each 960x540) with a 200-px source grid, to choose frame times and crops.
usage: python3 cands.py SRC_DIR OUT.jpg EP T1 [T2 T3 T4]
"""
import glob, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

src, out, ep = sys.argv[1], sys.argv[2], int(sys.argv[3])
times = [float(t) for t in sys.argv[4:8]]
vid = [f for f in glob.glob(f"{src}/P4_EP{ep:02d}_*.mp4") if "_part" not in f][0]
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 26)
sheet = Image.new("RGB", (1920, 1080), (30, 30, 30))
cache = os.path.join(os.path.dirname(out), "cand_cache")
os.makedirs(cache, exist_ok=True)
for i, t in enumerate(times):
    fp = f"{cache}/ep{ep:02d}_{t:07.2f}.png"
    if not os.path.exists(fp):
        subprocess.run(["nice", "-n", "10", "ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", vid, "-frames:v", "1", fp], check=True)
    im = Image.open(fp).convert("RGB").resize((960, 540), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    for x in range(200, 1920, 200):
        d.line([(x / 2, 0), (x / 2, 540)], fill=(255, 0, 255), width=1)
        d.text((x / 2 + 2, 2), str(x), fill=(255, 0, 255), font=font)
    for y in range(200, 1080, 200):
        d.line([(0, y / 2), (960, y / 2)], fill=(0, 200, 255), width=1)
        d.text((2, y / 2 + 2), str(y), fill=(0, 200, 255), font=font)
    d.rectangle([800, 500, 960, 540], fill=(0, 0, 0))
    d.text((808, 505), f"{t:.2f}", fill=(255, 255, 0), font=big)
    sheet.paste(im, ((i % 2) * 960, (i // 2) * 540))
sheet.save(out, quality=85)
