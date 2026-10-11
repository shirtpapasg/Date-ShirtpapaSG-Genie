import sys
from PIL import Image
out, *fs = sys.argv[1:]
cols = 2 if len(fs) > 1 else 1; rows = (len(fs) + cols - 1) // cols
W, H = 960, 540
g = Image.new("RGB", (W * cols, H * rows), "white")
for i, f in enumerate(fs): g.paste(Image.open(f).resize((W, H)), ((i % cols) * W, (i // cols) * H))
g.save(out, quality=80)
