"""compare_ep1.py P: qa/ep1_compare_pP.jpg, matching moments side by side (left EP1, the benchmark; right EP17), one row per kind of scene
(SERIES_FORMAT 10.6: "would a 9-year-old on a phone see what matters as clearly as in EP1?")."""
import sys, json, subprocess, os
from PIL import Image, ImageDraw, ImageFont
P = sys.argv[1]; m14 = json.load(open(f'tl_p{P}.json')); m1 = json.load(open(f'../ep01/tl_p{P}.json'))
S14 = {s['name']: s for s in m14['scenes']}; K14 = m14['marks']; K1 = m1['marks']; S1 = {s['name']: s for s in m1['scenes']}
mid = (lambda S, n, u=.5: S[n]['t0'] + (S[n]['t1'] - S[n]['t0']) * u)
ROWS = {'1': lambda: [('cold open (a real place)', mid(S1, 'cold', .6), 4.6), ('hidden animal / the game', mid(S1, 'game', .4), mid(S14, 'game', .45)), ('goals read by a buddy', mid(S1, 'goals', .6), mid(S14, 'goals', .7)),
              ('lock-in countdown', K1['ring0_1'] + 2.2, K14['ring0_r1'] + 1.5), ('look-closer', mid(S1, 'r1ev', .5), mid(S14, 'lclegs', .6)), ('Mark Sentence', mid(S1, 'mark1', .6), mid(S14, 'mark1', .5)),
              ('journey (be the thing)', mid(S1, 'shrink', .5), mid(S14, 'shrink', .6)), ('HOLD ON! / countdown 2', K1['ring0_2'] + 2.2, K14['ring0_hold'] + 2.2), ('hidden-animal reveal', mid(S1, 'liz1', .6), mid(S14, 'liz', .75)), ('Now you know!', mid(S1, 'nyk', .7), mid(S14, 'nyk', .7))],
        '2': lambda: [('calm recap', mid(S1, 'recapline', .5), 4.5), ('the chant', mid(S1, 'chant', .5), mid(S14, 'chant', .5)), ('lock-in countdown', K1['ring0_3'] + 2.2, K14['ring0_r1'] + 2.5), ('look-closer (time-lapse)', mid(S1, 'day30', .5), mid(S14, 'lcwriggler', .4)),
              ('Mark Sentence', mid(S1, 'mark2', .6), mid(S14, 'mark1', .5)), ('board scene', mid(S1, 'piles', .5), mid(S14, 'lcplate', .8)), ('Showdown countdown', K1['ring0_4'] + 2.5, K14['ring0_show'] + 2.5), ('hidden-animal reveal', mid(S1, 'cicak', .6), mid(S14, 'liz', .75)), ('Now you know!', mid(S1, 'nyk', .7), mid(S14, 'nyk', .7))]}[P]()
os.makedirs('qa/_cmp', exist_ok=True)
def grab(f, t, out): subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', f'{t:.2f}', '-i', f, '-frames:v', '1', '-vf', 'scale=640:360', out], check=True); return Image.open(out)
W, H, LH = 640, 360, 34; sheet = Image.new('RGB', (2 * W + 30, len(ROWS) * (H + LH) + 50), (18, 14, 46)); d = ImageDraw.Draw(sheet)
try: f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
except Exception: f = ImageFont.load_default()
d.text((10, 12), f'EP1 (benchmark) Part {P}', fill=(255, 214, 10), font=f); d.text((W + 30, 12), f'EP17 Part {P}', fill=(255, 214, 10), font=f)
for i, (lab, t1, t14) in enumerate(ROWS):
    y = 50 + i * (H + LH); d.text((10, y), f'{lab}   EP1 {t1:.1f} s  |  EP17 {t14:.1f} s', fill=(255, 255, 255), font=f)
    sheet.paste(grab(f'../ep01/ep01_part{P}.mp4', t1, f'qa/_cmp/a{i}.jpg'), (0, y + LH - 4)); sheet.paste(grab(f'ep17_part{P}.mp4', t14, f'qa/_cmp/b{i}.jpg'), (W + 30, y + LH - 4))
sheet.save(f'qa/ep1_compare_p{P}.jpg', quality=82); print(f'qa/ep1_compare_p{P}.jpg')
