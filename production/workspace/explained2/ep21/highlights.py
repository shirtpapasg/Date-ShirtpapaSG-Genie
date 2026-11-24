"""highlights.py: qa/highlights.jpg, 14 labelled stills from the final renders (the places, the look-closers, the journeys, the reasons)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.abspath(__file__)); F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"; ft = ImageFont.truetype(F, 34)
S = [(1, 4.0, "P1 0:04  Cold open: the school field, the magnet spun on its string, THE SPIN CHART (empty)"),
     (1, 108.0, "P1 1:48  Be the hanging magnet: you stop with the rain tree past your red end"),
     (1, 122.5, "P1 2:02  The answer: the same way every time; Pip and Basil confident, Momo shy"),
     (1, 160.0, "P1 2:40  Look closer: the same line in three places (FREELY SUSPENDED)"),
     (1, 201.0, "P1 3:21  HOLD ON! countdown: the magnet on the bench, YOU cross your arms, Basil thinking"),
     (1, 214.0, "P1 3:34  Hung up again it turns freely and stops on the line; Basil shy, Momo nods"),
     (1, 240.0, "P1 4:00  Look closer: the whole Earth, little magnets all over the world"),
     (2, 92.5, "P2 1:32  Be the compass needle: the bar magnet's red end pushes your red end away"),
     (2, 117.0, "P2 1:57  NEEDLE: the small magnet inside a compass (Pip shy, Momo and Basil confident)"),
     (2, 134.0, "P2 2:14  Look closer: turn the compass, the letters turn, the needle stays still"),
     (2, 174.0, "P2 2:54  Showdown: Momo's compass checklist"),
     (2, 197.0, "P2 3:17  The fix: line 3 struck and rewritten; Momo shy"),
     (2, 227.0, "P2 3:47  Look closer: a ship at night, a hiker in fog: TELL THE DIRECTION"),
     (2, 298.0, "P2 4:58  The dare: an iron nail stroked with a magnet. What happens?")]
W, Hh, N = 860, 484, 2; tiles = []
for P, t, lab in S:
    f = f"{H}/out/_hl.png"; subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(t), "-i", f"{H}/ep21_part{P}.mp4", "-frames:v", "1", f], check=True)
    im = Image.open(f).convert("RGB").resize((W, Hh)); tl = Image.new("RGB", (W, Hh + 50), (250, 246, 238)); tl.paste(im, (0, 0)); ImageDraw.Draw(tl).text((10, Hh + 10), lab, font=ImageFont.truetype(F, 18), fill=(30, 26, 60)); tiles.append(tl)
os.remove(f"{H}/out/_hl.png")
rows = (len(tiles) + N - 1) // N; sh = Image.new("RGB", (N * W + (N + 1) * 12, 64 + rows * (Hh + 62)), (18, 14, 46)); d = ImageDraw.Draw(sh)
d.text((14, 14), "EP21 (v2 cast): highlights for the teacher's quick look", font=ft, fill=(255, 200, 58))
for i, tl in enumerate(tiles): sh.paste(tl, (12 + (i % N) * (W + 12), 64 + (i // N) * (Hh + 62)))
sh.save(f"{H}/qa/highlights.jpg", quality=86); print(sh.size)
