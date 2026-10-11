"""Turn the verified draft (kwbank_draft.json) into mymap-bank.js, with the fixes found in review."""
import json, re, sys, copy
W = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
OUT = sys.argv[1]
D = json.load(open(W + '/kwbank_draft.json'))
EMO = re.compile('[\U0001F000-\U0001FAFF☀-⛿✀-✒✔✖-❖❘-➿️‍⬀-⯿]')
def stem(w):
    if len(w) > 4 and w.endswith('ies'): return w[:-3] + 'y'
    if len(w) > 4 and w.endswith(('ses', 'xes', 'zes', 'ches', 'shes')): return w[:-2]
    if len(w) > 3 and w.endswith('s') and not w.endswith('ss'): return w[:-1]
    return w
def norm(s):
    s = s.lower()
    for a in ['➜', '→', '->', '=>', '➡', '⟶', '⇒']: s = s.replace(a, ' to ')
    s = ''.join(c for c in s if c in '✓✗≠' or not EMO.match(c))
    s = s.replace('&', ' and ')
    s = re.sub(r"[^\w✓✗≠ ]+", ' ', s)
    return ' '.join(stem(w) for w in s.split())

ORDER = ['heat', 'light', 'matter', 'digestive', 'plants', 'living', 'materials', 'lifecycles', 'magnets']

# ---------- fixes ----------
H = D['heat']
ENERGY = 'Heat is a form of energy'
GAIN, LOSE = 'Gains heat: its temperature rises', 'Loses heat: its temperature falls'
app = [a for a in H['app'] if a['branch'] != ENERGY]
energy = {
  'branch': ENERGY,
  'aliases': ['heat is a form of energy', 'a form of energy', 'form of energy', 'heat is energy', 'heat energy', 'energy'],
  'keys': [GAIN, LOSE],
  'keyAliases': {
    GAIN: ['gains heat its temperature rises', 'gain heat temperature rises', 'gains heat temperature rises', 'gain heat to temperature rises',
           'temperature rises', 'temperature increases', 'temperature goes up'],
    LOSE: ['loses heat its temperature falls', 'lose heat temperature falls', 'loses heat temperature falls', 'lose heat to temperature falls',
           'temperature falls', 'temperature drops', 'temperature decreases', 'temperature goes down'],
  },
  'rank': 3,
  'hint': 'What is heat? Add a branch: “Heat is a form of energy”.',
}
app.insert(2, energy)            # same place as on the poster: after Temperature
H['app'] = app
for v in H['video']:
    if v.get('afterD'):
        a = v.pop('afterD')
        if a.get('key'):
            v['means'] = GAIN if a['key'].startswith('Gain') else LOSE
            v['meansKind'] = 'key'; v['under'] = ENERGY; v.pop('partial', None)
        else:
            v['means'] = ENERGY; v['meansKind'] = 'branch'; v.pop('under', None)
        v.pop('meansAll', None)
# the HEAT (energy) branch and its words were extras until the poster had the branch
for v in H['video']:
    if v['term'] == 'HEAT' and v['means'] == ENERGY:
        v['partial'] = True          # the bare word: credited, not praised (it is also the middle word)
H['extras'] = [e for e in H['extras'] if not e.get('afterD')]
# "insulator": the poster says poor conductor of heat (there is no heat insulator in the syllabus; M-02)
H['mixups'].append({'detect': ['insulator', 'heat insulator', 'insulator of heat'],
                    'say': 'Exam tip: in Heat, write “poor conductor of heat”. Heat still passes through it, only slowly.',
                    'src': 'M-02 + mixups.heat#2', 'kind': 'wording'})
# M-16: the same belief, said the way pupils say it
for m in D['light']['mixups']:
    if m['src'] == 'M-16':
        m['detect'] += ['comes from our eyes', 'comes from the eyes', 'light goes out of our eyes', 'light comes out of our eyes']
# _exp#76 is about naming a variable in an experiment answer; "type of" / "size of" in a mind map is not that
D['matter']['mixups'] = [m for m in D['matter']['mixups'] if m['src'] != 'mixups._exp#76']

# ---------- the poster's order (TOPICS in mindmap.html after step d) ----------
TOP = {t['id']: t for t in json.load(open(W + '/ck/topics_now.json'))}
for cid in ORDER:
    order = [b['t'] for b in TOP[cid]['b']]
    app = D[cid]['app']
    assert sorted(a['branch'] for a in app) == sorted(order), (cid, [a['branch'] for a in app], order)
    D[cid]['app'] = sorted(app, key=lambda a: order.index(a['branch']))
    for a in D[cid]['app']:
        keys = TOP[cid]['b'][order.index(a['branch'])]['k']
        assert a['keys'] == keys, (cid, a['branch'], a['keys'], keys)

# ---------- write ----------
J = lambda x: json.dumps(x, ensure_ascii=False)
def arr(xs): return '[' + ', '.join(J(x) for x in xs) + ']'
def dedupe(xs, but=()):
    seen, out = set(norm(b) for b in but), []
    for x in xs:
        n = norm(x)
        if n and n not in seen: seen.add(n); out.append(x)
    return out

lines = []
P = lines.append
for cid in ORDER:
    c = D[cid]
    titles = [a['branch'] for a in c['app']]
    keyOf = {}
    for a in c['app']:
        for k in a['keys']: keyOf.setdefault(k, []).append(a['branch'])
    def ref(means, kind, under):
        if kind == 'branch':
            assert means in titles, (cid, means); return means
        if kind == 'key':
            br = under if under in titles and means in [k for a in c['app'] if a['branch'] == under for k in a['keys']] else None
            if not br:
                cands = keyOf.get(means, [])
                assert len(cands) == 1, (cid, means, under, cands); br = cands[0]
            return br + ' > ' + means
        raise ValueError(kind)
    P(f'  {cid}: {{')
    P(f'    title: {J(c["title"])}, lv: {J(c["lv"])}, eps: {J(c["eps"])},')
    P(f'    centre: {arr(dedupe(c["centreAliases"]))},')
    P('    b: [')
    for a in c['app']:
        P(f'      {{ t: {J(a["branch"])}, rank: {a["rank"]}, hint: {J(a["hint"])},')
        P(f'        al: {arr(dedupe(a["aliases"], [a["branch"]]))},')
        P('        k: [')
        for k in a['keys']:
            short = (a.get('keyShort') or {}).get(k)
            P(f'          {{ t: {J(k)}' + (f', short: {J(short)}' if short else '') + f', al: {arr(dedupe(a["keyAliases"].get(k, []), [k]))} }},')
        P('        ] },')
    P('    ],')
    vids = []
    for v in c['videoCentre'] + c['video']:
        if v['meansKind'] not in ('branch', 'key'): continue
        alls = v.get('meansAll')
        if alls:
            to = []
            for m in alls:
                to.append(m if m in titles else ref(m, 'key', v.get('under')))
        else:
            to = [ref(v['means'], v['meansKind'], v.get('under'))]
        chip = ('map' in v['src'] or 'scene' in v['src']) and not v.get('partial')
        flat = lambda x: ' '.join(re.sub(r"[^\w✓✗ ]+", ' ', ''.join(c for c in x.lower() if c in '✓✗' or not EMO.match(c))).split())
        if chip and len(to) == 1 and flat(v['term']) == flat(to[0].split(' > ')[-1]): chip = False   # the very same words as the poster
        vids.append({'w': v['term'], 'ep': v['eps'], 'to': to, 'p': bool(v.get('partial')), 'chip': chip,
                     'raw': dedupe(v['raw'], [v['term']])})
    # merge entries with the same words and meaning
    merged = {}
    for v in vids:
        key = (norm(v['w']), tuple(v['to']))
        if key in merged:
            m = merged[key]
            m['ep'] = sorted(set(m['ep']) | set(v['ep'])); m['chip'] = m['chip'] or v['chip']; m['p'] = m['p'] and v['p']
            m['raw'] = dedupe(m['raw'] + v['raw'], [m['w']])
        else: merged[key] = v
    P('    video: [')
    for v in merged.values():
        extra = (', p: 1' if v['p'] else '') + (', chip: 1' if v['chip'] else '') + (f', raw: {arr(v["raw"])}' if v['raw'] else '')
        P(f'      {{ w: {J(v["w"])}, ep: {J(v["ep"])}, to: {arr(v["to"])}{extra} }},')
    P('    ],')
    P('    mix: [')
    for m in c['mixups']:
        extra = ''
        if m.get('unless'): extra += f', unless: {arr(m["unless"])}'
        if m.get('inBranch'):
            assert m['inBranch'] in titles or True
            extra += f', inBranch: {J(m["inBranch"])}'
        if m['kind'] == 'wording': extra += ', wording: 1'
        P(f'      {{ src: {J(m["src"])}, d: {arr(m["detect"])}{extra},')
        P(f'        say: {J(m["say"])} }},')
    P('    ]')
    P('  },')

head = open(W + '/ck/bank_head.js', encoding='utf8').read()
open(OUT, 'w', encoding='utf8').write(head + 'export const BANK = {\n' + '\n'.join(lines).rstrip(',') + '\n};\n')
print('ok', OUT)
