"""highlights.py: qa/highlights.jpg, 14 labelled stills from the final renders (the places, the look-closers, the journeys, the reasons)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; ft = ImageFont.truetype(F, 34)
S = [(1, 4.6, "P1 0:04  Cold open: the science room, THE POLES BOARD (empty); Basil's paw swishes through the gap"),
     (1, 102.5, "P1 1:42  Be the top ring magnet: you float, the push comes up at you (magenta)"),
     (1, 150.6, "P1 2:30  Look closer: the clips bunch at BOTH ends; Basil shy (his guess, the middle)"),
     (1, 183.0, "P1 3:03  Every shape has two poles: a ring's on its two flat sides"),
     (1, 216.0, "P1 3:36  HOLD ON! countdown: the floating ring, YOU cross your arms, Pip thinking"),
     (1, 226.0, "P1 3:46  The flip: CLICK, it snaps down; Pip shy through the whole fix"),
     (1, 253.0, "P1 4:13  Look closer: two red ends, one rolls away, the gap never closes"),
     (2, 75.0, "P2 1:15  Be a toy train carriage: the engine rolls away untouched (a push)"),
     (2, 101.0, "P2 1:41  The answer: Momo and Pip confident, Basil shy to the end of the answer"),
     (2, 124.0, "P2 2:04  Look closer: WHICH POLES FACE? box by box (UNLIKE POLES attract)"),
     (2, 148.0, "P2 2:28  The rings' payoff: two North poles face each other, like poles repel"),
     (2, 202.6, "P2 3:22  The fix: line 3 struck and rewritten; Pip shy, Basil and Momo confident"),
     (2, 231.5, "P2 3:51  The repel test: one end of bar B pushes the magnet away"),
     (2, 309.0, "P2 5:09  The dare: a bar magnet hanging on a string, spinning. Where does it stop?")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep20_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 18), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP20 (v2 cast): highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
