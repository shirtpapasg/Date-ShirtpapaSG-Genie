import sys, glob
from PIL import Image, ImageDraw
prefix, out = sys.argv[1], sys.argv[2]; ts = sys.argv[3:]
ims = [(t, Image.open(f"{prefix}_{t}.jpg").resize((640,360))) for t in ts]
for k in range(0, len(ims), 12):
    ch = ims[k:k+12]; rows = (len(ch)+2)//3
    G = Image.new("RGB", (1920, 360*rows), "white"); d = ImageDraw.Draw(G)
    for i,(t,im) in enumerate(ch):
        x,y = (i%3)*640, (i//3)*360; G.paste(im,(x,y)); d.rectangle([x,y,x+70,y+18],fill="black"); d.text((x+3,y+3),t,fill="yellow")
    G.save(f"{out}_{k//12}.jpg", quality=80)
