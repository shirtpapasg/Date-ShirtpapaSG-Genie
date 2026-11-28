"""highlights.py: qa/highlights.jpg, 10 labelled stills from EP17's final renders."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; f1 = ImageFont.truetype(F, 26); ft = ImageFont.truetype(F, 34)
S = [(1, 4.6, "P1 0:04  Dawn at the lime plant: the caterpillar munching"),
     (1, 82.6, "P1 1:22  The answer: it looks nothing like a butterfly"),
     (1, 110.6, "P1 1:50  Look closer: six true legs and the PROLEGS"),
     (1, 193.0, "P1 3:13  HOLD ON! countdown: Pip worried, clues on top"),
     (1, 237.5, "P1 3:57  Inside the pupa: the butterfly comes out"),
     (2, 48.0, "P2 0:48  Round 1: three picture cards, Basil worried"),
     (2, 76.2, "P2 1:16  Look closer: the wriggler's little tube"),
     (2, 186.5, "P2 3:06  DENGUE: calm, cared for; only some carry it"),
     (2, 226.0, "P2 3:46  Tip it out: the loop's tiles go dim"),
     (2, 296.5, "P2 4:56  The dare into EP18: the same life cycle?")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep17_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 20), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP17: highlights for review (the caterpillar, the pupa, the mosquito)", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
