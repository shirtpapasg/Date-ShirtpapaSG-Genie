"""highlights.py: qa/highlights.jpg, 10 labelled stills from the final renders (the v2 cast, the reasons, the fixes)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; f1 = ImageFont.truetype(F, 26); ft = ImageFont.truetype(F, 34)
S = [(1, 5.5, "P1 0:05  The v2 cast in the kitchen: one size at one depth; Pip waves hello"),
     (1, 61.5, "P1 1:01  Round 1 countdown: Basil WORRIED (before the answer)"),
     (1, 174.8, "P1 2:54  Look closer: A YOUNG PLANT COMES FIRST lands, Basil cheers (learnt)"),
     (1, 178.5, "P1 2:58  The reveal: Momo and Pip shy (wrong), Basil confident (right)"),
     (1, 207.6, "P1 3:27  Be the mango seed: days tick by, water seeps in, buddies ride along"),
     (1, 266.2, "P1 4:26  HOLD ON fix: Pip points at the zero, Momo surprised (12 cm, not 20)"),
     (2, 51.0, "P2 0:51  Round 1 countdown: Basil worried; tiny flowers now branched sprays"),
     (2, 100.5, "P2 1:40  Look closer: both tags inside the panel, clear of face and verdict"),
     (2, 189.5, "P2 3:09  Showdown: the homework big for the countdown, Momo worried (thinking face)"),
     (2, 314.9, "P2 5:14  The dare: 'Three, a lizard!' Basil laughs (a funny line)")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep15_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 20), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP15 redo with the v2 cast: highlights for review", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
