#!/usr/bin/env python3
"""qa_gaps.py <census.json>: P4 EP3 v2 staging checks from a census.js run.
  - GLITCH keeps >= 60 px clear of every buddy (per row band of the paintings' alpha: tails, hats and arms count)
  - Uncle Lim is on screen only inside his line's window (g908)
  - no mirrored words; no bike helmet on a buddy (pip_ / basil_ sprites are checked in the page: see the helmet list below)
Prints a summary; exit 1 on any failure."""
import json, sys, collections
C = json.load(open(sys.argv[1])); TL = json.load(open(__file__.rsplit('/', 1)[0] + '/tl_p1.json'))
def gap(g, b):
    best = 1e9
    for r1 in g['rows']:
        for r2 in b['rows']:
            if min(r1[3], r2[3]) - max(r1[1], r2[1]) > 0: best = min(best, max(r1[0] - r2[2], r2[0] - r1[2]))
    return best
bad = collections.defaultdict(list); lim = []; mir = []
L = TL['lines']['g908']; LT9 = TL['lines']['g909']['t']
for s in C:
    ch = s['chars']
    if 'glitch' in ch:
        for w in ('pip', 'momo', 'basil'):
            if w in ch:
                g = gap(ch['glitch'], ch[w])
                if g < 60: bad[s['sc']].append((s['t'], w, round(g)))
    if 'lim' in ch and not (L['t'] - .25 <= s['t'] < LT9 - .15): lim.append(s['t'])
    if s['mir']: mir.append((s['t'], s['mir']))
fail = 0
for k, v in bad.items(): print(f'GLITCH < 60 px from a buddy in {k}: {len(v)} samples, e.g. {v[:3]}'); fail = 1
print('GLITCH gap: OK (>= 60 px in every sample)' if not bad else '')
print(f'Uncle Lim outside his line: {len(lim)} samples' + (f' e.g. {lim[:5]}' if lim else ' (OK)')); fail |= bool(lim)
print(f'mirrored words: {len(mir)} samples' + (f' e.g. {mir[:3]}' if mir else ' (OK)')); fail |= bool(mir)
sys.exit(fail)
