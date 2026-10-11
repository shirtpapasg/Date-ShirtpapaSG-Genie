"""Sample candidate frames from each episode's content scenes and tile them into labelled contact sheets.
usage: python3 sample_sheets.py SRC_DIR OUT_DIR EP [EP ...] [--step 4]
"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont

SKIP = {"welcome", "quiz", "exam", "habit", "mindmap", "close"}

def main():
    args = sys.argv[1:]
    step = 4.0
    if "--step" in args:
        i = args.index("--step"); step = float(args[i + 1]); del args[i:i + 2]
    src, out = args[0], args[1]
    eps = [int(a) for a in args[2:]]
    os.makedirs(out, exist_ok=True)
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
    for n in eps:
        vid = [f for f in glob.glob(f"{src}/P4_EP{n:02d}_*.mp4") if "_part" not in f][0]
        tl = json.load(open(f"{src}/ep{n}/tl.json"))
        times = []
        for sc in tl["scenes"]:
            if sc["scene"] in SKIP:
                continue
            t = sc["t0"] + 1.5
            while t < sc["t1"] - 0.5:
                times.append((round(t, 1), sc["scene"]))
                t += step
        tiles = []
        for t, name in times:
            fp = f"{out}/ep{n:02d}_{t:06.1f}.jpg"
            if not os.path.exists(fp):
                subprocess.run(["nice", "-n", "10", "ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", vid,
                                "-frames:v", "1", "-vf", "scale=384:216", "-q:v", "4", fp], check=True)
            im = Image.open(fp).convert("RGB")
            d = ImageDraw.Draw(im)
            lab = f"{t:.1f} {name}"
            d.rectangle([0, 0, 12 * len(lab) + 10, 28], fill=(0, 0, 0))
            d.text((4, 2), lab, fill=(255, 255, 0), font=font)
            tiles.append(im)
        cols = 6
        rows = (len(tiles) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * 384, rows * 216), (40, 40, 40))
        for i, im in enumerate(tiles):
            sheet.paste(im, ((i % cols) * 384, (i // cols) * 216))
        sheet.save(f"{out}/sheet_ep{n:02d}.jpg", quality=80)
        print(n, len(tiles))

if __name__ == "__main__":
    main()
