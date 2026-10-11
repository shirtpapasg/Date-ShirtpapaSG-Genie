# Reference matcher for the documented semantics; checks the bank for false positives / misses.
import json, re, sys
B = json.load(open(sys.argv[1]))
EMO = re.compile('[\U0001F000-\U0001FAFF☀-⛿✀-✒✔✖-❖❘-➿️‍⬀-⯿]')
def stem(w):
    if len(w) > 4 and w.endswith('ies'): return w[:-3] + 'y'
    if len(w) > 4 and w.endswith(('ses', 'xes', 'zes', 'ches', 'shes')): return w[:-2]
    if len(w) > 3 and w.endswith('s') and not w.endswith('ss'): return w[:-1]
    return w
def norm(s):
    s = s.lower()
    for a in ['➜', '→', '->', '=>', '➡', '⟶', '⇒']: s = s.replace(a, ' to ')   # arrows BEFORE emoji: ➜ ➡ sit in emoji ranges
    s = ''.join(c for c in s if c in '✓✗≠' or not EMO.match(c))
    s = s.replace('&&', ' \x00 ').replace('&', ' and ')
    s = re.sub(r"[^\w✓✗≠\x00 ]+", ' ', s)
    return ' '.join(stem(w) for w in s.split())
def has(text, phrase):
    t, p = ' ' + norm(text) + ' ', ' ' + norm(phrase) + ' '
    return p in t
def hit(m, node, branch=''):
    ctx = node + ' | ' + branch
    if m.get('inBranch') and not has(branch, m['inBranch']): return False
    for d in m['detect']:
        parts = [x.strip() for x in d.split('&&')]
        if len(parts) > 1: ok = all(has(ctx, p) for p in parts)
        else: ok = has(node, d)
        if ok and not any(has(ctx, u) for u in m.get('unless', [])): return d
    return False
bad = 0
for cid, ch in B.items():
    if cid.startswith('_'): continue
    nodes = []
    for b in ch['app']:
        nodes.append((b['branch'], ''))
        for k in b['keys']: nodes.append((k, b['branch']))
        for a in b['aliases']: nodes.append((a, ''))
        for k, al in b['keyAliases'].items():
            for a in al: nodes.append((a, b['branch']))
    for v in ch['video']:
        for r in v['raw'] + [v['term']]:
            nodes.append((r, v.get('under') or v.get('videoParent') or ''))
            nodes.append((r, v.get('videoParent') or ''))
    for m in ch['mixups']:
        for n, br in nodes:
            d = hit(m, n, br)
            if d and m['kind'] == 'wording':
                print(f'(expected wording nudge) {cid}: {n!r} -> {m["src"]}')
            elif d:
                bad += 1; print(f'FALSE POSITIVE? {cid}: node {n!r} (branch {br!r}) hits {m["src"]} via {d!r}')
# positive probes: each mixup should fire on at least one plain-language example
probes = {
 'heat': [('Cold flows into the ice', ''), ('heat flows from cold to hot', 'Heat flows'), ('It is a non-conductor', ''),
          ('Temperature is a measure of heat', ''), ('Metals are cold', ''), ('The fur traps heat', ''),
          ('mass increases', 'Gaining or losing heat'), ('Ice loses heat and melts', ''), ('gets bigger', 'Gaining or losing heat'),
          ('Good conductor', '')],
 'matter': [('Air has no mass', ''), ('Cutting reduces mass', ''), ('fixed shape', 'Liquid'), ('definite volume', 'Gas'),
            ('same volume same mass', ''), ('Repeat the experiment', 'How scientists investigate'), ('Liquids keep their shape', '')],
 'light': [('Light from our eyes', ''), ('A shadow is a reflection', ''), ('translucent ➜ no shadow', 'Shadows'),
           ('closer to the screen = bigger', 'Shadows'), ('We can see in the dark', '')],
 'plants': [('Roots absorb food', 'Roots'), ('Stem stores food', ''), ('Leaves breathe', ''), ('Cactus has no leaves', '')],
 'digestive': [('Digestion starts in the stomach', ''), ('absorbs digested food', 'Stomach'), ('Big intestine', ''),
               ('absorbs water from digested food', 'Large intestine'), ('Lungs pump blood', '')],
 'magnets': [('Like poles attract', ''), ('Magnets attract all metals', ''), ('iron attracts the magnet', '')],
 'lifecycles': [('pupa', 'Grasshopper & cockroach'), ('has wings', 'Insects')],
 'materials': [('Heavy things sink', '')],
 'living': [('has wings and feelers', 'Insects')],
}
negs = {
 'heat': [("Cold doesn't flow", ''), ('Heat flows from hot to cold', ''), ('poor conductor of heat', ''), ('Good conductors of heat', ''),
          ('Heat is NOT temperature', ''), ('Volume goes up, mass stays the same', '')],
 'matter': [("Shape doesn't change mass", ''), ('SHAPE ≠ MASS', ''), ('no fixed shape', 'Liquid'), ('takes the shape of its container', 'Liquid'),
            ('Repeat the experiment and find the average', '')],
 'light': [('object further from screen ➜ bigger', 'Shadows'), ('We cannot see in the dark', ''), ('nearer the light, bigger the shadow', 'Shadows')],
 'magnets': [('Unlike poles attract', ''), ('Like poles repel', ''), ('magnet attracts iron', ''), ('Not all metals are magnetic', '')],
 'digestive': [('Breaks food into smaller pieces', 'Mouth'), ('Digested food is absorbed into the blood', 'Small intestine'),
               ('Absorbs water from undigested food', 'Large intestine'), ('digestion begins in the mouth', 'Mouth')],
 'lifecycles': [('six legs, has wings', 'Insects'), ('pupa', 'Butterfly & beetle')],
}
for cid, ps in probes.items():
    for n, br in ps:
        if not any(hit(m, n, br) for m in B[cid]['mixups']): bad += 1; print(f'MISSED {cid}: {n!r} ({br})')
for cid, ps in negs.items():
    for n, br in ps:
        for m in B[cid]['mixups']:
            d = hit(m, n, br)
            if d: bad += 1; print(f'NEG HIT {cid}: {n!r} ({br}) -> {m["src"]} via {d!r}')
print('problems:', bad)
