"""highlights.py: qa/highlights.jpg, 10 labelled stills from the final renders (the v2 cast, the reasons, the fixes)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; f1 = ImageFont.truetype(F, 26); ft = ImageFont.truetype(F, 34)
S = [(1, 4.5, "P1 0:04  Cold open: the garden pond at dawn, the v2 cast in proportion; Pip waves hello"),
     (1, 103.0, "P1 1:43  Look closer: one egg in its jelly, JELLY-LIKE COVERING pops; the book strip"),
     (1, 157.5, "P1 2:37  The answer: Momo confident (right), Pip and Basil shy (wrong)"),
     (1, 190.0, "P1 3:10  HOLD ON! countdown: Pip's row big in the ring, Pip worried, YOU cross arms"),
     (1, 253.5, "P1 4:13  Chick + hen look alike, tadpole + frog do not: the verdict"),
     (1, 286.0, "P1 4:46  The tree frog on the tap; Momo's fun fact: its foam nest"),
     (2, 78.0, "P2 1:18  Look closer: the adult's long wings, NO wings yet on the nymph"),
     (2, 134.5, "P2 2:14  Why the skin comes off: the hard outer skin goes too tight"),
     (2, 216.0, "P2 3:36  Showdown countdown: Pip's homework big, Pip worried"),
     (2, 240.5, "P2 4:00  The egg case: two neat rows of eggs; EGG CASE")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep16_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 20), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP16 (v2 cast): highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
