#!/usr/bin/env python3
"""plan_shots.py (P4 EP3 v2): the DIRECTOR's shot list (teacher, 28 Nov 2026: "not to have still frames or same scene for more than 10
seconds"). Reads tl_p1.json (who speaks when) and out/census_base.json (census.js: where everyone and every card is in the BASE staging,
4 samples a second) and writes director_p1.js (window.DIRSHOTS for main.js) and qa/shotlist.txt (the readable shot list).

The rules it follows (SERIES_FORMAT.md, MOTION_GUIDE.md):
  - a shot is at most MAXSHOT (7.5) s; the picture changes at least every 10 s (qa/hold_check.py measures the video itself);
  - a cut lands just before a new speaker starts (CUTLEAD s before the first word), never inside a word;
  - the speaker's shot: a SINGLE (full figure, head near the top, off-centre towards the room) or a TWO-SHOT with the nearest other
    character; Heart (the narrator, off screen): the GROUP or a slow push-in; every shot drifts (a slow push of about 6 %), so even a
    held shot keeps moving;
  - a card that is fixed on the screen (DHUD) never covers the speaker's head in the new framing (else the framing changes or goes wide);
    a card that belongs to the scene and comes and goes stays wholly in frame;
  - no shot repeats the one before it (a jump cut): the framing changes size or place;
  - LOCK windows (the base staging already moves there, or a full-frame insert is up) get no director shot;
  - OVERRIDE shots (hand-placed) take precedence: the look-closer panel, the words that earn marks, the key-word read-along.
"""
import json, math, sys
D = __file__.rsplit('/', 1)[0] if '/' in __file__ else '.'
TL = json.load(open(f'{D}/tl_p1.json')); C = json.load(open(f'{D}/out/census_base.json'))
M = TL['marks']; LT = lambda i: TL['lines'][i]['t']; LE = lambda i: TL['lines'][i]['end']
MAXSHOT, CUTLEAD, MINSHOT = 7.5, .2, 1.4
AUTO = {'cold', 'fixcards', 'colour', 'size', 'suspects', 'glitch', 'finish', 'next', 'netveins', 'witness'}
LOCK = [(0, 3.3, 'the opening push-out from the leaf (base camera)'), (M['whip'] - .2, LT('c108') - .15, 'the whip pans (base camera)'),
        (LT('q812') - .12, M['clr2'] - .17, 'the edge trace (full frame)'),
        (M['think0'] - .1, LT('q812') - .12, 'the THINK card (full frame)'),
        (M['freeze'] - .05, LT('q809') + .1, 'the freeze frame'),
        (LT('a201') - 1.5, LT('a202') - .45, 'the witness push-in (base camera)')]
scenes = TL['scenes']
def scene_of(t):
    for s in scenes:
        if s['t0'] <= t < s['t1']: return s
    return scenes[-1]
samples = {round(s['t'] * 4): s for s in C}
def samp(t): return samples.get(round(t * 4)) or min(C, key=lambda s: abs(s['t'] - t))
def inframe(b): return b[2] > 40 and b[0] < 1880 and b[3] > 40 and b[1] < 1040 and (min(b[2], 1920) - max(b[0], 0)) > .55 * (b[2] - b[0])
def clampv(z, cx, cy): return z, min(max(cx, 960 / z), 1920 - 960 / z), min(max(cy, 540 / z), 1080 - 540 / z)
def mapb(V, b):
    z, cx, cy = V; return [(b[0] - cx) * z + 960, (b[1] - cy) * z + 540, (b[2] - cx) * z + 960, (b[3] - cy) * z + 540]
def inter(a, b): return min(a[2], b[2]) - max(a[0], b[0]) > 0 and min(a[3], b[3]) - max(a[1], b[1]) > 0
def contains(V, b, pad=10):
    m = mapb(V, b); return m[0] >= -pad and m[1] >= -pad and m[2] <= 1920 + pad and m[3] <= 1080 + pad

# --- what is on screen in a time span: characters (median box), fixed cards, transient scene cards
def span_info(t0, t1, sc):
    S = [samp(t0 + k * .25) for k in range(max(1, int((t1 - t0) * 4)))]
    S = [s for s in S if s['sc'] == sc] or S
    chars = {}
    for s in S:
        for w, c in s['chars'].items():
            if inframe(c['b']): chars.setdefault(w, []).append(c)
    med = {}
    for w, L in chars.items():
        if len(L) < .5 * len(S): continue
        L = sorted(L, key=lambda c: c['b'][0]); c = dict(L[len(L) // 2])
        if w == 'basil':   # his detective hat sits above the painting's box: frame it in (never crop the hat's crown)
            hh = .2 * (c['b'][3] - c['b'][1]); c['b'] = [c['b'][0], c['b'][1] - hh, c['b'][2], c['b'][3]]; c['h'] = [c['h'][0], c['h'][1] - hh, c['h'][2], c['h'][3]]
        med[w] = c
    fixed, trans = [], []
    allsc = [s for s in C if s['sc'] == sc]
    for s in S:
        for cd in s['cards']:
            if len(cd) == 5: fixed.append(cd[:4]); continue
            # transient: a card of this place that is NOT there for most of the scene (set dressing is)
            n = sum(1 for q in allsc[::4] if any(abs(x[0] - cd[0]) < 30 and abs(x[1] - cd[1]) < 30 and abs(x[2] - cd[2]) < 30 for x in q['cards']))
            if n < .6 * len(allsc[::4]) and (cd[2] - cd[0]) * (cd[3] - cd[1]) > 150000: trans.append(cd)
    return med, fixed, trans

def single(c, side):
    b = c['b']; bh = b[3] - b[1]; Wh = max(bh * 1.18, 1080 / 2.05); z = min(2.05, max(1.3, 1080 / Wh)); Wh = 1080 / z; Ww = 1920 / z
    cx = (b[0] + b[2]) / 2 + side * .14 * Ww; cy = b[1] - .17 * Wh + Wh / 2
    return clampv(z, cx, cy)
def fitbox(bs, zmin=1.0, zmax=1.8, pad=.1):
    l = min(b[0] for b in bs); t = min(b[1] for b in bs); r = max(b[2] for b in bs); bb = max(b[3] for b in bs)
    w, h = (r - l) * (1 + 2 * pad), (bb - t) * (1 + 2 * pad); z = max(zmin, min(zmax, 1920 / max(w, 1), 1080 / max(h, 1)))
    return clampv(z, (l + r) / 2, (t + bb) / 2 - .04 * h)

HUDBOX = [[0, 0, 400, 100], [1430, 14, 1905, 116], [1600, 116, 1905, 380]]   # the logo, the score bar, the key-word shelf (screen)
SHELF_ON = {'colour', 'size', 'lcleaf', 'netveins', 'suspects', 'kwrecap'}   # lib.js SHELF_HIDE: the shelf shows only in these
SNAIL = {'suspects': [535, 300, 600, 360]}   # the witness on the case board's corner (base frame), a face too
def ok(V, who, med, fixed, trans, sc=None):
    if V[0] <= 1.001: return True
    if who in med:
        hm = mapb(V, med[who]['h'])
        if hm[0] < 0 or hm[2] > 1920 or hm[1] < 0: return False
    # no face in the new framing ends up under a screen-fixed card or the HUD
    heads = [med[w]['h'] for w in med] + ([SNAIL[sc]] if sc in SNAIL else [])
    for h in heads:
        hm = mapb(V, h); vis = min(hm[2], 1920) - max(hm[0], 0) > .3 * (hm[2] - hm[0]) and min(hm[3], 1080) - max(hm[1], 0) > .3 * (hm[3] - hm[1])
        if not vis: continue
        core = [hm[0] + .2 * (hm[2] - hm[0]), hm[1] + .25 * (hm[3] - hm[1]), hm[2] - .2 * (hm[2] - hm[0]), hm[3]]
        if any(inter(core, f) for f in fixed + (HUDBOX if sc in SHELF_ON else HUDBOX[:2])): return False
    return all(contains(V, b) for b in trans)

def choose(kind, who, med, fixed, trans, prev, sc=None):
    """the framing for a shot: kind = 'single' | 'two' | 'group' | 'wide'"""
    others = [w for w in med if w != who]
    cands = []
    if who in med:
        c = med[who]; cxs = (c['b'][0] + c['b'][2]) / 2; side = 1 if cxs < 960 else -1
        sgl = [(single(c, side), f'{who} single'), (single(c, -side), f'{who} single')]
        near = sorted(others, key=lambda w: abs((med[w]['b'][0] + med[w]['b'][2]) / 2 - cxs))
        two = [(fitbox([c['b'], med[w]['b']], 1.15, 1.7), f'two-shot {who} + {w}') for w in near[:2]]
        cands = (sgl + two) if kind == 'single' else (two + sgl)
    if med:
        bud = [med[w]['b'] for w in med]
        cands += [(fitbox(bud, 1.12, 1.5, .06), 'group')]
    cands += [((1.0, 960, 540), 'wide')]
    for V, lab in cands:
        if not ok(V, who, med, fixed, trans, sc) or not ok(drift(V)[1], who, med, fixed, trans, sc): continue   # the start and the end of the push
        if prev and abs(V[0] - prev[0]) < .12 and math.hypot(V[1] - prev[1], V[2] - prev[2]) < 120: continue   # no jump cut
        return V, lab
    return (1.0, 960, 540), 'wide'

def drift(V, k=1.06):
    z, cx, cy = V
    if z <= 1.001: return (1.0, 960, 540), (1.09, 960, 520)   # the wide shot pushes in slowly instead of holding
    return V, clampv(z * k, cx, cy - 8)

def locked(t0, t1): return [L for L in LOCK if L[0] < t1 and L[1] > t0]

lines = [(i, TL['lines'][i]) for i in TL['order'] if i in TL['lines'] and TL['lines'][i].get('who')]
shots = []
for s in scenes:
    if s['name'] not in AUTO: continue
    t0s, t1s = s['t0'], s['t1']
    # cut points: each line start (lead) whose speaker changes; then split long shots
    cuts = [t0s]
    prevwho = None
    for i, L in lines:
        if not (t0s + .4 < L['t'] < t1s - .4): continue
        w = L['who'] if L['who'] in ('pip', 'momo', 'basil', 'glitch', 'lim') else 'heart'
        if w != prevwho and L['t'] - CUTLEAD - cuts[-1] >= MINSHOT: cuts.append(L['t'] - CUTLEAD)
        prevwho = w
    cuts.append(t1s)
    segs = []
    for a, b in zip(cuts, cuts[1:]):
        n = max(1, math.ceil((b - a) / MAXSHOT))
        # split at a word gap near the even split points
        pts = [a]
        for k in range(1, n):
            want = a + (b - a) * k / n; best = want
            for i, L in lines:
                for wd in L.get('words', []):
                    if a + MINSHOT < wd['a'] - .05 < b - MINSHOT and abs(wd['a'] - .05 - want) < abs(best - want) + 1e-9 and abs(wd['a'] - .05 - want) < 1.2: best = wd['a'] - .05
            pts.append(best)
        pts.append(b); segs += list(zip(pts, pts[1:]))
    prev = None
    for a, b in segs:
        # remove locked windows from the segment
        parts = [(a, b)]
        for la, lb, why in LOCK:
            nxt = []
            for x, y in parts:
                if lb <= x or la >= y: nxt.append((x, y)); continue
                if la > x: nxt.append((x, la))
                if lb < y: nxt.append((lb, y))
            parts = nxt
        for x, y in parts:
            if y - x < .5: continue
            spk = [L for i, L in lines if L['t'] < y and L['end'] > x]
            spk = max(spk, key=lambda L: min(L['end'], y) - max(L['t'], x)) if spk else None
            who = spk['who'] if spk else None
            med, fixed, trans = span_info(x, y, s['name'])
            if who in (None, 'heart', 'chant'): kind = 'group'
            else: kind = 'two' if (prev and prev[1].startswith(who + ' single')) else 'single'
            V, lab = choose(kind, who, med, fixed, trans, prev[0] if prev else None, s['name'])
            A, B = drift(V)
            if lab == 'wide': lab = 'wide, slow push-in'
            shots.append([round(x, 3), round(y, 3), *[round(v, 3) for v in A], *[round(v, 3) for v in B], lab, s['name'], who or '-'])
            prev = (V, lab)

# OVERRIDES (hand-placed, base-frame coordinates): pushes and rack moves where the scene is one big panel or card
OV = []
def ov(t0, t1, A, B, lab, sc): OV.append([round(t0, 3), round(t1, 3), *A, *B, lab, sc, '-'])
# the look-closer panel: a slow push into the leaf while Heart and Basil start; then the panel's own push-ins take over (from the stalk)
l = [x for x in scenes if x['name'] == 'lcleaf'][0]
ov(l['t0'] + .5, LT('l602') - .2, (1.0, 960, 540), (1.1, 900, 520), 'push-in on the look-closer panel', 'lcleaf')
ov(LT('l602') - .2, LT('l602') + 3.2, (1.16, 860, 520), (1.2, 840, 520), 'closer on the leaf blade (panel)', 'lcleaf')
ov(LT('l602') + 3.2, LT('l603') - .2, (1.0, 960, 540), (1.08, 1180, 560), 'rack to Basil beside the panel', 'lcleaf')
# the words that earn marks: a push onto the card as Pip reads, a cut to Pip, back onto the card
ov(LT('l604') + 2.4, LT('l605') - .2, (1.0, 960, 540), (1.13, 900, 520), 'push-in along the main vein (panel)', 'lcleaf')
ov(LT('l605') - .2, l['t1'], (1.12, 760, 640), (1.18, 720, 660), 'rack down to Momo peeking in', 'lcleaf')
# Uncle Lim's one line (g908): the camera cuts to him as he starts and away as GLITCH answers (he is drawn only between those two cuts)
ov(LT('g908') - .2, LT('g908') + 4.74, (1.55, 1300, 731), (1.62, 1300, 728), 'Uncle Lim (his one line)', 'glitch')
ov(LT('g908') + 4.74, LT('g909') - .2, (1.7, 1355, 762), (1.76, 1360, 758), 'two-shot GLITCH + Uncle Lim', 'glitch')
w = [x for x in scenes if x['name'] == 'words'][0]
ov(LT('m1003') - .2, LT('m1003') + 4.2, (1.0, 960, 540), (1.12, 1080, 420), 'push-in on the words card', 'words')
ov(LT('m1003') + 4.2, LT('m1003') + 8.2, (1.12, 1080, 420), (1.2, 1060, 400), 'closer on the card (the read words)', 'words')
ov(LT('m1003') + 8.2, w['t1'], (1.0, 960, 540), (1.1, 820, 600), 'rack from the card down to Pip', 'words')
k = [x for x in scenes if x['name'] == 'kwrecap'][0]
ov(k['t0'] + .3, LT('hk_net_veins') - .2, (1.0, 960, 540), (1.14, 760, 470), 'push-in on the key words', 'kwrecap')
ov(LT('hk_net_veins') - .2, k['t1'], (1.14, 760, 470), (1.0, 960, 540), 'pull back to the buddies cheering', 'kwrecap')
f = [x for x in scenes if x['name'] == 'finish'][0]
allshots = [x for x in shots if not any(o[0] < x[1] and o[1] > x[0] for o in OV)] + OV
allshots.sort(key=lambda x: x[0])
# no overlaps
for i in range(len(allshots) - 1):
    if allshots[i][1] > allshots[i + 1][0]: allshots[i][1] = allshots[i + 1][0]
allshots = [x for x in allshots if x[1] - x[0] > .2]
open(f'{D}/director_p1.js', 'w').write('// director_p1.js: written by plan_shots.py (do not edit by hand). [t0, t1, z0, cx0, cy0, z1, cx1, cy1, label, scene, speaker]\nwindow.DIRSHOTS = ' + json.dumps([x[:8] for x in allshots]) + ';\nwindow.DIRLABELS = ' + json.dumps([x[8:] for x in allshots]) + ';\n')
with open(f'{D}/qa/shotlist.txt', 'w') as fo:
    fo.write('P4 EP3 v2 shot list (director shots; between them the base staging of each scene, which already cuts and moves)\n')
    for x in allshots: fo.write(f'{x[0]:7.2f} - {x[1]:7.2f}  ({x[1] - x[0]:4.1f} s)  {x[9]:9s} {x[8]}  [zoom {x[2]:.2f} -> {x[5]:.2f}]\n')
print(len(allshots), 'director shots;', 'longest', max(x[1] - x[0] for x in allshots))
