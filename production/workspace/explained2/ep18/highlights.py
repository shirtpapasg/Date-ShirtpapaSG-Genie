"""highlights.py: qa/highlights.jpg, 10 labelled stills from the final renders (the v2 cast, the reasons, the fixes)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; f1 = ImageFont.truetype(F, 26); ft = ImageFont.truetype(F, 34)
S = [(1, 5.5, "P1 0:05  Cold open: our void deck on LIFE CYCLE DAY, the COMPARE FRAME; Momo waves hello"),
     (1, 111.5, "P1 1:51  Look closer: SAME and DIFFERENT strips; Momo's two similarities land; Momo surprised"),
     (1, 155.5, "P1 2:35  Be a raindrop: the mosquito's pupa, one more stage (dots, never numbers)"),
     (1, 172.0, "P1 2:52  The answer: three dots and four; Pip confident, Momo shy, Basil's ? (right card, wrong reason)"),
     (1, 229.0, "P1 3:49  HOLD ON! countdown: Pip's sheet in the ring, Pip worried, YOU cross arms"),
     (1, 256.5, "P1 4:16  The young beside their parents: one same, one different"),
     (1, 291.9, "P1 4:52  The cicada on the board's easel leg; Basil's fun fact: 17 years underground"),
     (2, 98.5, "P2 1:38  Be an egg: a new egg, the golden circle goes round"),
     (2, 133.0, "P2 2:13  Look closer: the finger goes round; day and night; NO FIRST OR LAST STAGE"),
     (2, 175.5, "P2 2:55  Showdown countdown: Momo's homework big, Momo worried"),
     (2, 212.5, "P2 3:32  Same stages, still different: the wriggler and the mealworm"),
     (2, 232.3, "P2 3:52  The lime butterfly lays one tiny egg: the cycle goes on")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep18_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 20), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP18 (v2 cast): highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
