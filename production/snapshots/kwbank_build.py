# Builds kwbank_draft.json + kwbank_draft.md: the per-chapter key-word bank for
# "Check my map". App (Mind Lab TOPICS) wording is the master; P4 video wording is
# aligned to it. Run: python3 -I kwbank_build.py  (from anywhere; paths absolute)
import json, re, sys, unicodedata

SP = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
TOPICS = {t['id']: t for t in json.load(open(SP + '/topics.json'))}
INV = {int(k): v for k, v in json.load(open(SP + '/kw_inventory.json')).items()}

# ---------------------------------------------------------------- helpers
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿️‍⬀-⯿]')
def strip_emoji(s):
    # keep ✓ ✗ ➜ (meaningful in the video labels)
    keep = {'✓', '✗', '➜'}
    return ''.join(ch if ch in keep or not EMOJI.match(ch) else '' for ch in s).strip()

def norm(s):
    s = strip_emoji(s).lower()
    s = s.replace('&', ' and ').replace('➜', ' to ').replace('→', ' to ').replace('->', ' to ')
    s = re.sub(r'[^\w✓✗≠ ]+', ' ', s)
    s = ' '.join(w[:-1] if len(w) > 3 and w.endswith('s') and not w.endswith('ss') else w for w in s.split())
    return s.strip()

HABIT = {  # study-habit / channel labels in the key-word panels: not science, not in the bank
    1: ['HABIT STACKING', 'MIND MAP'], 2: ['MAKE IT OBVIOUS', 'MIND MAP'], 3: ['TWO-MINUTE RULE', 'MIND MAP'],
    4: ['PERSEVERANCE', 'MAKE IT SATISFYING'], 5: ['NEVER MISS TWICE'], 6: ['PLAN TIME + PLACE'], 7: ['MAKE IT EASY'],
    8: ['I AM A SCIENTIST'], 9: ['HABIT TRACKER'], 10: ['MAKE IT ATTRACTIVE'], 11: ['STUDY BUDDY'],
    12: ['TREAT IT LIKE AN EXPERIMENT'], 13: ['PERSISTENCE', 'CELEBRATE SMALL WINS'], 14: ['EXAM TIP', 'TEACH IT'],
    15: ['SPACE IT OUT'], 16: ['REMOVE DISTRACTIONS'], 17: ['TEST YOURSELF'], 18: ['MEASURE PROGRESS'],
    19: ['ONE-SENTENCE SUMMARY'], 20: ['NAME THE DIRECTION'], 21: ['LINK TO REAL LIFE'], 22: ['BIG PICTURE REVIEW'],
}

def V(eps, term, typ, kind, means=None, under=None, parent=None, src='map', raw=None, note=None,
      meansAll=None, afterD=None, partial=False):
    """one video term. typ: 'branch' (a branch / sub-branch heading in the video mind map)
    or 'keyword' (a sub-branch leaf or a key-word panel label). kind: what it means in the
    app: 'branch' | 'key' | 'centre' | 'idea' | 'extra'."""
    eps = [eps] if isinstance(eps, int) else list(eps)
    e = {'ep': eps[0], 'eps': eps, 'term': strip_emoji(term), 'type': typ,
         'means': 'extra' if kind == 'extra' else means, 'meansKind': kind}
    if under: e['under'] = under
    if parent: e['videoParent'] = strip_emoji(parent)
    if meansAll: e['meansAll'] = meansAll
    if partial: e['partial'] = True
    if afterD: e['afterD'] = afterD
    if note: e['note'] = note
    e['src'] = src
    e['raw'] = raw if raw is not None else [term]
    if kind != 'extra':
        e['chip'] = '📺 ' + e['term'] + ' = ' + (' + '.join(meansAll) if meansAll else means)
    return e

def A(branch, aliases, keys, rank, hint, proposed=False):
    """app branch: keys = {key: [aliases]} in TOPICS order"""
    return {'branch': branch, 'aliases': aliases, 'keys': list(keys.keys()),
            'keyAliases': keys, 'rank': rank, 'hint': hint, **({'proposed': True} if proposed else {})}

def M(detect, say, src, kind='mixup', unless=None, inBranch=None, note=None):
    m = {'detect': detect, 'say': say, 'src': src, 'kind': kind}
    if unless: m['unless'] = unless
    if inBranch: m['inBranch'] = inBranch
    if note: m['note'] = note
    return m

B = {}

# ======================================================================= PLANTS
L, S_, R = 'Leaves', 'Stem', 'Roots'
K_MF, K_GAS = 'Make food', 'Take in and give out gases'
K_UP, K_TR = 'Hold the plant upright to get light', 'Transport food, water and mineral salts to different parts of the plant'
K_ANC, K_ABS = 'Hold the plant firmly to the ground', 'Absorb water and dissolved mineral salts'
B['plants'] = {
 'eps': [1, 2, 3, 4],
 'centreAliases': ['plant system', 'plant parts', 'parts of a plant', 'plant', 'system', 'tree'],
 'app': [
  A(L, ['leaf', 'leaves'], {
     K_MF: ['make food', 'makes food', 'makes its own food', 'make their own food', 'food maker', 'photosynthesis'],
     K_GAS: ['gases in and out', 'gases in & out', 'take in gases', 'give out gases', 'takes in and gives out gases',
             'exchange of gases', 'gas exchange', 'gases']}, 1,
    'Add a branch for the leaves. What job do leaves do for the plant?'),
  A(R, ['root', 'roots'], {
     K_ANC: ['anchor', 'anchors', 'anchors the plant', 'holds the plant firmly', 'holds the plant in the ground',
             'holds the plant in place', 'grips the soil'],
     K_ABS: ['absorb', 'absorbs', 'absorb water', 'absorbs water', 'takes in water', 'take in water', 'mineral salts',
             'water and mineral salts', 'absorb water and mineral salts']}, 2,
    'Add a branch for the roots. What two jobs do roots do?'),
  A(S_, ['stem', 'stems'], {
     K_UP: ['holds upright', 'hold upright', 'holds the plant up', 'keeps the plant upright', 'supports the plant',
            'support', 'holds up the leaves'],
     K_TR: ['transport', 'transports', 'carries water', 'carries food', 'carries food and water', 'transports water',
            'transports food', 'moves water and food', 'water-carrying tubes', 'food-carrying tubes']}, 3,
    'Add a branch for the stem. How does the stem help the plant?'),
 ],
 'videoCentre': [
  V(1, 'SYSTEM', 'branch', 'idea', means=TOPICS['plants']['idea'], note='EP1 is a general "systems" map (bike, body, tree).'),
  V(2, 'PLANT SYSTEM', 'branch', 'centre', means='Plant System'),
  V(3, '🍃 LEAF', 'branch', 'branch', means=L, raw=['LEAF', '🍃 LEAF'], note='EP3 zooms in on one leaf: the whole map sits under the Leaves branch.'),
  V(4, 'PLANT PARTS', 'branch', 'centre', means='Plant System'),
 ],
 'video': [
  # EP1
  V(1, '🚲 BIKE', 'branch', 'extra', note='A non-living example of a system.'),
  V(1, 'pedals', 'keyword', 'extra', parent='BIKE'), V(1, 'chain', 'keyword', 'extra', parent='BIKE'),
  V(1, '🧍 BODY', 'branch', 'extra', note='Human body as a system: see Digestive System / Circulatory System (P5) maps.'),
  V(1, 'lungs', 'keyword', 'extra', parent='BODY', note='See Circulatory System (respcirc, P5).'),
  V(1, 'heart', 'keyword', 'extra', parent='BODY', note='See Circulatory System (respcirc, P5).'),
  V(1, '🌳 TREE', 'branch', 'centre', means='Plant System', note='A tree is a plant system.'),
  V(1, 'roots', 'keyword', 'branch', means=R, parent='TREE'),
  V(1, 'leaves', 'keyword', 'branch', means=L, parent='TREE'),
  V(1, 'PARTS', 'keyword', 'idea', means=TOPICS['plants']['idea'], src='kw'),
  V(1, 'WORK TOGETHER', 'keyword', 'idea', means=TOPICS['plants']['idea'], src='kw'),
  V(1, 'SYSTEM', 'keyword', 'centre', means='Plant System', src='kw'),
  V(1, 'FUNCTION', 'keyword', 'idea', means=TOPICS['plants']['idea'], src='kw', note='Function = the job a part does. The app\'s key words are the jobs.'),
  V(1, 'ONE PART FAILS → SYSTEM AFFECTED', 'keyword', 'extra', src='kw', raw=['ONE PART FAILS → SYSTEM AFFECTED', 'ONE PART FAILS'],
    note='Systems idea. Close to the app outcome "Predict what happens to a plant with its stem cut".'),
  V(1, 'RESPIRATORY SYSTEM', 'keyword', 'extra', src='kw', note='See Circulatory System (respcirc, P5).'),
  # EP2
  V([2, 4], '🍃 LEAVES', 'branch', 'branch', means=L, src='map+scene'),
  V(2, 'make food', 'keyword', 'key', means=K_MF, under=L, parent='LEAVES', src='map+scene'),
  V(2, 'gases in & out', 'keyword', 'key', means=K_GAS, under=L, parent='LEAVES', src='map+scene'),
  V(2, '🌿 STEM', 'branch', 'branch', means=S_, src='map+scene'),
  V(4, '🌿 STEMS', 'branch', 'branch', means=S_, src='map+scene'),
  V(2, 'holds upright', 'keyword', 'key', means=K_UP, under=S_, parent='STEM', src='map+scene'),
  V(2, 'transports', 'keyword', 'key', means=K_TR, under=S_, parent='STEM', src='map+scene'),
  V([2, 4], '🥕 ROOTS', 'branch', 'branch', means=R, src='map+scene'),
  V(2, 'anchor', 'keyword', 'key', means=K_ANC, under=R, parent='ROOTS', src='map+scene'),
  V(2, 'absorb', 'keyword', 'key', means=K_ABS, under=R, parent='ROOTS', src='map+scene'),
  V(2, 'LEAVES', 'keyword', 'branch', means=L, src='kw'),
  V(2, 'GASES', 'keyword', 'key', means=K_GAS, under=L, src='kw'),
  V(2, 'STEM', 'keyword', 'branch', means=S_, src='kw'),
  V(2, 'TRANSPORT', 'keyword', 'key', means=K_TR, under=S_, src='kw'),
  V(2, 'ROOTS', 'keyword', 'branch', means=R, src='kw'),
  V(2, 'ABSORB', 'keyword', 'key', means=K_ABS, under=R, src='kw'),
  V(2, 'MINERAL SALTS', 'keyword', 'key', means=K_ABS, under=R, src='kw', meansAll=[K_ABS, K_TR]),
  # EP3 (centre LEAF)
  V(3, '4 PARTS', 'branch', 'extra', note='Parts of a leaf. The Leaves branch has no leaf-part key words.'),
  V(3, 'blade', 'keyword', 'extra', parent='4 PARTS', raw=['blade · stalk', 'blade']),
  V(3, 'stalk', 'keyword', 'extra', parent='4 PARTS', raw=['blade · stalk', 'stalk']),
  V(3, 'main vein', 'keyword', 'extra', parent='4 PARTS', raw=['main vein · smaller veins', 'main vein']),
  V(3, 'smaller veins', 'keyword', 'extra', parent='4 PARTS', raw=['main vein · smaller veins', 'smaller veins']),
  V(3, '2 VEIN PATTERNS', 'branch', 'extra'),
  V(3, 'parallel', 'keyword', 'extra', parent='2 VEIN PATTERNS'), V(3, 'net', 'keyword', 'extra', parent='2 VEIN PATTERNS'),
  V(3, 'DIFFERENCES', 'branch', 'extra', note='How leaves differ.'),
  V(3, 'edge', 'keyword', 'extra', parent='DIFFERENCES', raw=['edge · shape', 'edge']),
  V(3, 'shape', 'keyword', 'extra', parent='DIFFERENCES', raw=['edge · shape', 'shape']),
  V(3, 'colour', 'keyword', 'extra', parent='DIFFERENCES', raw=['colour · texture', 'colour']),
  V(3, 'texture', 'keyword', 'extra', parent='DIFFERENCES', raw=['colour · texture', 'texture']),
  *[V(3, t, 'keyword', 'extra', src='kw') for t in ['LEAF BLADE', 'LEAF STALK', 'MAIN VEIN', 'SMALLER VEINS', 'PARALLEL VEINS', 'NET VEINS']],
  *[V(3, t, 'keyword', 'extra', src='kw', note='Science process skill.') for t in ['OBSERVE', 'ASK', 'INVESTIGATE']],
  # EP4
  V(4, 'spines (cactus)', 'keyword', 'extra', parent='LEAVES', note='Adaptation: a cactus\'s spines are its leaves (M-46).'),
  V(4, 'woody', 'keyword', 'extra', parent='STEMS', raw=['woody · non-woody', 'woody']),
  V(4, 'non-woody', 'keyword', 'extra', parent='STEMS', raw=['woody · non-woody', 'non-woody']),
  V(4, 'climbing', 'keyword', 'extra', parent='STEMS'),
  V(4, 'storage', 'keyword', 'extra', parent='ROOTS', note='Storage roots (e.g. carrot).'),
  V(4, 'in water', 'keyword', 'extra', parent='ROOTS', note='Roots that grow in water.'),
  *[V(4, t, 'keyword', 'extra', src='kw') for t in ['WOODY STEM', 'NON-WOODY STEM', 'STORES WATER', 'SPINES = LEAVES',
                                                    'CLIMBERS', 'CREEPERS', 'STORAGE ROOTS', 'STEM CUTTING']],
  V(4, 'GREEN STEM MAKES FOOD', 'keyword', 'extra', src='kw', raw=['GREEN STEM MAKES FOOD', 'GREEN STEM = FOOD'],
    note='Related to Leaves > Make food, but about the stem. Accept, no credit for the Leaves branch.'),
 ],
 'mixups': [
  M(['roots absorb food', 'roots take in food', 'absorb food', 'absorbs food', 'takes in food from the soil',
     'food from the soil', 'food from soil', 'gets food from the soil', 'absorb nutrients', 'absorbs nutrients',
     'takes in nutrients', 'soil gives food', 'plants eat soil'],
    'Exam tip: roots absorb water and dissolved mineral salts. The leaves make the plant\'s food.',
    'M-20 + mixups.plants#38'),
  M(['roots only hold', 'only hold the plant', 'roots just hold'],
    'Exam tip: roots do two jobs. They hold the plant firmly and absorb water and mineral salts.', 'M-21'),
  M(['stem stores food', 'stems store food', 'stem keeps food', 'stem stores the food'],
    'Exam tip: the stem transports water and food to all parts of the plant.', 'mixups.plants#39'),
  M(['stomata take in', 'stomata takes in', 'stomata absorb', 'stomata breathe'],
    'Exam tip: stomata are tiny openings. They allow gases to enter and leave the leaf.', 'mixups.plants#40',
    note='Stomata are not on the P4 poster; kept because the chapter is P4/P5.'),
  M(['breathe out oxygen', 'breathes out oxygen', 'breathe in carbon dioxide', 'breathes in carbon dioxide',
     'plants breathe', 'leaves breathe'],
    'Exam tip: plants respire like all living things. Leaves take in and give out gases.', 'M-23'),
  M(['cactus has no leaves', 'cactus has no leaf', 'cactus no leaves', 'cactus does not have leaves',
     "cactus doesn't have leaves", 'spines are not leaves', 'cactus is not a plant'],
    'Exam tip: a cactus is a plant. Its spines are its leaves.', 'M-46'),
 ],
 'mixupsSkipped': ['M-22 (bark, P5; not map-shaped)', 'mixups.plants#42, #44 (answer-writing for one question type)'],
}

# ==================================================================== DIGESTIVE
MO, GU, ST, SI, LI = 'Mouth', 'Gullet', 'Stomach', 'Small intestine', 'Large intestine'
dk = {b['t']: b['k'] for b in TOPICS['digestive']['b']}
K_DB, K_SP, K_MJ = dk[MO]
K_PD, = dk[GU]
K_CH, K_SS = dk[ST]
K_DC, K_AB = dk[SI]
K_AW, K_WL = dk[LI]
B['digestive'] = {
 'eps': [5, 6, 7],
 'centreAliases': ['digestive system', 'digestion', 'human digestive system'],
 'app': [
  A(MO, ['mouth'], {
     K_DB: ['digestion begins', 'digestion starts', 'digestion begins in the mouth', 'starts digestion'],
     K_SP: ['teeth', 'chew', 'chews', 'chewing', 'smaller pieces', 'breaks food into small pieces', 'bite', 'grind'],
     K_MJ: ['saliva', 'digestive juice', 'mixes with saliva', 'mixes food with saliva']}, 1,
    'Start where food goes in. Add a branch for the mouth.'),
  A(SI, ['small intestine', 'small gut'], {
     K_DC: ['digestion ends', 'digestion ends here', 'digestion is completed', 'digestion completed', 'completes digestion',
            'digestion finishes'],
     K_AB: ['into blood', 'into the blood', 'absorbed into blood', 'absorbed into the blood', 'absorbs digested food',
            'absorption', 'absorbs food', 'absorbed into the bloodstream']}, 2,
    'Add the small intestine. This is where digested food goes into the blood.'),
  A(ST, ['stomach'], {
     K_CH: ['churns', 'churn', 'churning', 'mixes with juices', 'mixes food with digestive juices', 'squeezes and mixes'],
     K_SS: ['simpler substances', 'breaks food down', 'digests food', 'simpler food']}, 3,
    'Add a branch for the stomach. What does it do to the food?'),
  A(LI, ['large intestine'], {
     K_AW: ['absorbs water', 'absorb water', 'takes in water', 'water from undigested food'],
     K_WL: ['waste leaves the body', 'waste', 'rectum', 'anus', 'rectum and anus', 'removes waste', 'faeces', 'feces']}, 4,
    'Add the large intestine. What does it take back from the food that is left?'),
  A(GU, ['gullet', 'oesophagus', 'esophagus', 'food pipe', 'foodpipe'], {
     K_PD: ['pushes food down', 'push food down', 'carries food to the stomach', 'moves food to the stomach',
            'squeezes food down']}, 5,
    'Add the gullet. It joins the mouth to the stomach.'),
 ],
 'videoCentre': [
  V(5, 'HUMAN BODY SYSTEMS', 'branch', 'extra', raw=['HUMAN BODY SYSTEMS', 'HUMAN BODY', 'SYSTEMS'],
    note='EP5 maps all five body systems; the Digestive System is one branch of it.'),
  V([6, 7], 'DIGESTIVE SYSTEM', 'branch', 'centre', means='Digestive System', raw=['DIGESTIVE SYSTEM', 'DIGESTIVE', 'SYSTEM']),
 ],
 'video': [
  # EP5
  V(5, '🫁 RESPIRATORY', 'branch', 'extra', note='See Circulatory System (respcirc, P5).'),
  V(5, '❤️ CIRCULATORY', 'branch', 'extra', note='See Circulatory System (respcirc, P5).'),
  V(5, '🦴 SKELETAL', 'branch', 'extra', note='No Mind Lab poster (Recitation topic only).'),
  V(5, '💪 MUSCULAR', 'branch', 'extra', note='No Mind Lab poster.'),
  V(5, '🍽️ DIGESTIVE', 'branch', 'centre', means='Digestive System'),
  *[V(5, t, 'keyword', 'extra', src='kw') for t in ['MODEL', 'RESPIRATORY SYSTEM', 'EXCHANGE OF GASES', 'CIRCULATORY SYSTEM',
                                                    'SKELETAL SYSTEM', 'FEMUR', 'MUSCULAR SYSTEM', 'CONTRACT / RELAX']],
  V(5, 'DIGESTIVE SYSTEM', 'keyword', 'centre', means='Digestive System', src='kw'),
  # EP6 / EP7 map
  V([6, 7], '👄 MOUTH', 'branch', 'branch', means=MO, src='map+scene'),
  V(6, 'teeth', 'keyword', 'key', means=K_SP, under=MO, parent='MOUTH', raw=['teeth · saliva · tongue', 'teeth']),
  V(6, 'saliva', 'keyword', 'key', means=K_MJ, under=MO, parent='MOUTH', raw=['teeth · saliva · tongue', 'saliva'],
    note='Saliva is the digestive juice in the mouth.'),
  V(6, 'tongue', 'keyword', 'extra', parent='MOUTH', raw=['teeth · saliva · tongue', 'tongue'],
    note='A part, not a job. Accept under Mouth.'),
  V(7, 'digestion begins', 'keyword', 'key', means=K_DB, under=MO, parent='MOUTH', src='map+scene'),
  V([6, 7], '⬇️ GULLET', 'branch', 'branch', means=GU, src='map+scene'),
  V([6, 7], 'pushes food down', 'keyword', 'key', means=K_PD, under=GU, parent='GULLET', src='map+scene'),
  V([6, 7], '🌀 STOMACH', 'branch', 'branch', means=ST, src='map+scene'),
  V([6, 7], 'mixes with juices', 'keyword', 'key', means=K_CH, under=ST, parent='STOMACH', src='map+scene', partial=True,
    note='Closest app key: churning mixes food with digestive juices. Scope to the Stomach branch: under Mouth it means "Mixes food with digestive juice".'),
  V(7, '🌀 SMALL INTESTINE', 'branch', 'branch', means=SI, src='map+scene'),
  V(7, 'digestion ends', 'keyword', 'key', means=K_DC, under=SI, parent='SMALL INTESTINE', src='map+scene',
    raw=['digestion ends + into blood', 'digestion ends']),
  V(7, 'into blood', 'keyword', 'key', means=K_AB, under=SI, parent='SMALL INTESTINE', src='map+scene',
    raw=['digestion ends + into blood', 'into blood']),
  V(7, 'LARGE INTESTINE', 'branch', 'branch', means=LI, src='map+scene'),
  V(7, 'absorbs water', 'keyword', 'key', means=K_AW, under=LI, parent='LARGE INTESTINE', src='map+scene',
    note='App adds "from undigested food" (mixups.digestive#53).'),
  # EP6 kws
  V(6, 'DIGESTION', 'keyword', 'idea', means=TOPICS['digestive']['idea'], src='kw'),
  V(6, 'SIMPLER SUBSTANCES', 'keyword', 'key', means=K_SS, under=ST, src='kw'),
  V(6, 'TEETH', 'keyword', 'key', means=K_SP, under=MO, src='kw'),
  V(6, 'MORE SURFACE EXPOSED', 'keyword', 'extra', src='kw', raw=['MORE SURFACE EXPOSED', 'MORE SURFACE'],
    note='Why chewing helps digestion.'),
  V(6, 'SALIVA', 'keyword', 'key', means=K_MJ, under=MO, src='kw'),
  V(6, 'DIGESTION BEGINS IN MOUTH', 'keyword', 'key', means=K_DB, under=MO, src='kw', raw=['DIGESTION BEGINS IN MOUTH', 'BEGINS IN MOUTH']),
  V(6, 'GULLET', 'keyword', 'branch', means=GU, src='kw'),
  V(6, 'WINDPIPE', 'keyword', 'extra', src='kw', note='Respiratory system; food goes down the gullet, not the windpipe.'),
  V(6, 'STOMACH', 'keyword', 'branch', means=ST, src='kw'),
  V(6, 'DIGESTIVE JUICES', 'keyword', 'key', means=K_MJ, under=MO, src='kw', meansAll=[K_MJ, K_CH],
    note='In the mouth (saliva) and in the stomach.'),
  # EP7 kws
  V(7, 'SMALL INTESTINE', 'keyword', 'branch', means=SI, src='kw'),
  V(7, 'MORE DIGESTIVE JUICES', 'keyword', 'key', means=K_DC, under=SI, src='kw', partial=True,
    raw=['MORE DIGESTIVE JUICES', 'MORE JUICES'], note='Why digestion is completed in the small intestine.'),
  V(7, 'DIGESTION ENDS HERE', 'keyword', 'key', means=K_DC, under=SI, src='kw', raw=['DIGESTION ENDS HERE', 'DIGESTION ENDS']),
  V(7, 'ABSORBED INTO BLOOD', 'keyword', 'key', means=K_AB, under=SI, src='kw', raw=['ABSORBED INTO BLOOD', 'INTO BLOOD']),
  V(7, 'LARGE INTESTINE', 'keyword', 'branch', means=LI, src='kw'),
  V(7, 'ABSORBS WATER', 'keyword', 'key', means=K_AW, under=LI, src='kw'),
  V(7, 'RECTUM + ANUS', 'keyword', 'key', means=K_WL, under=LI, src='kw', partial=True,
    note='Where the waste leaves the body.'),
  V(7, 'FIBRE', 'keyword', 'extra', src='kw'), V(7, 'MALNOURISHED', 'keyword', 'extra', src='kw'),
 ],
 'mixups': [
  M(['digestion starts in the stomach', 'digestion begins in the stomach', 'digestion only in the stomach',
     'digestion happens only in the stomach', 'only the stomach digests', 'digestion starts in stomach'],
    'Exam tip: digestion begins in the mouth. It is completed in the small intestine.', 'M-24'),
  M(['digestion begins', 'digestion starts'], 'Exam tip: digestion begins in the mouth. It is completed in the small intestine.',
    'M-24', inBranch=ST, unless=['mouth']),
  M(['absorbed in the stomach', 'stomach absorbs', 'into the blood in the stomach'],
    'Exam tip: digested food is absorbed into the blood in the small intestine.', 'M-25'),
  M(['absorb', 'absorbs', 'absorbed', 'into blood', 'into the blood'],
    'Exam tip: digested food is absorbed into the blood in the small intestine.', 'M-25', inBranch=ST),
  M(['digestion breaks food into smaller pieces', 'digestion is breaking food into smaller pieces',
     'digestion means breaking food into smaller pieces', 'digestion: smaller pieces', 'digestion = smaller pieces',
     'digestion to smaller pieces'],
    'Exam tip: digestion breaks food down into simpler substances, not just smaller pieces.', 'mixups.digestive#52',
    note='Match within ONE node only: "Breaks food into smaller pieces" under Mouth is correct (teeth).'),
  M(['water from digested food', 'water from the digested food'],
    'Exam tip: the large intestine absorbs water from the undigested food.', 'mixups.digestive#53'),
  M(['big intestine'], 'Exam tip: its name is the large intestine.', 'mixups.digestive#59', kind='wording'),
  M(['lungs pump blood', 'lungs pump', 'lung pumps'],
    'Exam tip: the heart pumps blood. The lungs take in oxygen and give out carbon dioxide.', 'M-26',
    note='For EP5-style "body systems" maps made under this chapter.'),
  M(['mouth is part of the respiratory system', 'respiratory && mouth'],
    'Exam tip: the mouth belongs to the digestive system. Air goes in through the nose and the windpipe.', 'mixups.respcirc#55',
    note='For EP5-style maps. "&&" = both in the same node or the node and its branch.'),
  M(['breathing tube', 'circulation system'], 'Exam tip: use the exact names: windpipe, circulatory system.',
    'mixups.respcirc#59', kind='wording'),
 ],
 'mixupsSkipped': ['mixups.digestive#54 (less blood -> less absorption; question-specific)', 'M-27 (respiratory; P5 chapter)'],
}

# ======================================================================= MATTER
SO, LQ, GA, AM, CS = 'Solid', 'Liquid', 'Gas', 'All matter has', 'Changing state'
B['matter'] = {
 'eps': [8, 9, 10, 11, 12],
 'centreAliases': ['matter', 'states of matter', 'three states of matter', '3 states of matter'],
 'app': [
  A(AM, ['all matter has', 'matter has', 'properties of matter', 'what matter has'], {
     'Mass': ['mass', 'has mass', 'have mass'],
     'Volume': ['volume', 'takes up space', 'take up space', 'occupies space', 'has volume', 'space']}, 1,
    'What does all matter have? Add a branch for it.'),
  A(SO, ['solid', 'solids'], {
     'Fixed shape': ['fixed shape', 'definite shape', 'keeps its shape', 'own shape', 'shape ✓'],
     'Fixed volume': ['fixed volume', 'definite volume', 'volume ✓']}, 2,
    'Add a branch for solids. Think about shape and volume.'),
  A(LQ, ['liquid', 'liquids'], {
     'Takes the shape of its container': ['takes the shape of its container', 'takes the shape of the container',
                                          'shape of the container', 'no fixed shape', 'no definite shape', 'shape ✗'],
     'Fixed volume': ['fixed volume', 'definite volume', 'volume ✓']}, 3,
    'Add a branch for liquids. Think about shape and volume.'),
  A(GA, ['gas', 'gases'], {
     'Fills up the whole container': ['fills up the whole container', 'fills the container', 'fills up the container',
                                      'fills the whole container', 'fills any container', 'spreads out to fill'],
     'No fixed shape or volume': ['no fixed shape or volume', 'no fixed shape', 'no fixed volume', 'no definite shape',
                                  'no definite volume', 'shape ✗ volume ✗', 'volume ✗']}, 4,
    'Add a branch for gases. Think about shape and volume.'),
  A(CS, ['changing state', 'change of state', 'changes of state', 'change state', 'state change', 'melting', 'freezing'], {
     'Gains heat': ['gains heat', 'gain heat', 'gaining heat', 'heated', 'when heated'],
     'Loses heat': ['loses heat', 'lose heat', 'losing heat', 'cooled', 'when cooled']}, 5,
    'Matter can change state. What makes it change?'),
 ],
 'videoCentre': [
  V([8, 10, 11, 12], 'MATTER', 'branch', 'centre', means='Matter'),
  V(9, 'STATES OF MATTER', 'branch', 'centre', means='Matter', raw=['STATES OF MATTER', 'STATES OF', 'MATTER'],
    note='Its three branches are the app branches Solid, Liquid, Gas.'),
 ],
 'video': [
  V([8, 10, 11, 12], '⚖️ HAS MASS', 'branch', 'key', means='Mass', under=AM, src='map+scene',
    note='Video BRANCH = app KEY WORD (under "All matter has"). Accept as a branch.'),
  V(8, 'kg, g', 'keyword', 'extra', parent='HAS MASS', raw=['kg, g', 'kg, g · use a balance'], note='Units of mass.'),
  V(8, 'use a balance', 'keyword', 'extra', parent='HAS MASS', raw=['use a balance', 'kg, g · use a balance']),
  V([8, 10, 11, 12], '📦 TAKES UP SPACE', 'branch', 'key', means='Volume', under=AM, src='map+scene',
    note='Video BRANCH = app KEY WORD (under "All matter has"). Accept as a branch.'),
  V([8, 11], 'volume', 'keyword', 'key', means='Volume', under=AM, parent='TAKES UP SPACE', src='map+scene'),
  V(8, '✗ NOT MATTER', 'branch', 'extra', src='map+scene', raw=['✗ NOT MATTER', 'NOT MATTER ✗'],
    note='Light, shadow, heat and sound are not matter. Its "heat" must NOT count as Changing state > Gains heat.'),
  V(8, 'light', 'keyword', 'extra', parent='NOT MATTER', raw=['light · shadow', '💡 light']),
  V(8, 'shadow', 'keyword', 'extra', parent='NOT MATTER', raw=['light · shadow', '👤 shadow']),
  V(8, 'heat', 'keyword', 'extra', parent='NOT MATTER', raw=['heat · sound', '🔥 heat']),
  V(8, 'sound', 'keyword', 'extra', parent='NOT MATTER', raw=['heat · sound', '🔊 sound']),
  V(8, 'MATTER', 'keyword', 'centre', means='Matter', src='kw'),
  V(8, 'MASS', 'keyword', 'key', means='Mass', under=AM, src='kw'),
  V(8, 'BALANCE', 'keyword', 'extra', src='kw'),
  V(8, 'VOLUME', 'keyword', 'key', means='Volume', under=AM, src='kw'),
  V(8, 'NOT MATTER', 'keyword', 'extra', src='kw'),
  V(8, 'AIR HAS MASS', 'keyword', 'key', means='Mass', under=AM, src='kw', raw=['AIR HAS MASS', 'AIR: MASS'], partial=True,
    note='Air is a gas, and it has mass.'),
  V(8, 'AIR TAKES UP SPACE', 'keyword', 'key', means='Volume', under=AM, src='kw', raw=['AIR TAKES UP SPACE', 'AIR: SPACE'], partial=True),
  V(8, 'AIR IS MATTER', 'keyword', 'idea', means=TOPICS['matter']['idea'], src='kw'),
  # EP9
  V(9, '🧊 SOLID', 'branch', 'branch', means=SO, src='map+scene'),
  V(9, 'shape ✓', 'keyword', 'key', means='Fixed shape', under=SO, parent='SOLID', raw=['shape ✓ volume ✓', 'shape ✓  volume ✓  squeeze ✗']),
  V(9, 'volume ✓', 'keyword', 'key', means='Fixed volume', under=SO, parent='SOLID', raw=['shape ✓ volume ✓', 'shape ✓  volume ✓  squeeze ✗']),
  V(9, 'squeeze ✗', 'keyword', 'extra', parent='SOLID', raw=['squeeze ✗', 'shape ✓  volume ✓  squeeze ✗'], note='Cannot be compressed.'),
  V(9, '💧 LIQUID', 'branch', 'branch', means=LQ, src='map+scene'),
  V(9, 'shape ✗', 'keyword', 'key', means='Takes the shape of its container', under=LQ, parent='LIQUID',
    raw=['shape ✗ volume ✓', 'shape ✗  volume ✓  squeeze ✗'], note='No fixed shape.'),
  V(9, 'volume ✓', 'keyword', 'key', means='Fixed volume', under=LQ, parent='LIQUID', raw=['shape ✗ volume ✓', 'shape ✗  volume ✓  squeeze ✗']),
  V(9, 'squeeze ✗', 'keyword', 'extra', parent='LIQUID', raw=['squeeze ✗', 'shape ✗  volume ✓  squeeze ✗'], note='Cannot be compressed.'),
  V(9, '💨 GAS', 'branch', 'branch', means=GA, src='map+scene'),
  V(9, 'shape ✗ volume ✗', 'keyword', 'key', means='No fixed shape or volume', under=GA, parent='GAS',
    raw=['shape ✗ volume ✗', 'shape ✗  volume ✗  squeeze ✓']),
  V(9, 'squeeze ✓', 'keyword', 'extra', parent='GAS', raw=['squeeze ✓', 'shape ✗  volume ✗  squeeze ✓'], note='Can be compressed.'),
  V(9, '3 STATES OF MATTER', 'keyword', 'branch', means=SO, meansAll=[SO, LQ, GA], src='kw', raw=['3 STATES OF MATTER', '3 STATES']),
  V(9, 'DEFINITE SHAPE', 'keyword', 'key', means='Fixed shape', under=SO, src='kw', note='definite = fixed'),
  V(9, 'DEFINITE VOLUME', 'keyword', 'key', means='Fixed volume', under=SO, src='kw', note='Solid and Liquid.'),
  V(9, 'SOLID', 'keyword', 'branch', means=SO, src='kw'), V(9, 'LIQUID', 'keyword', 'branch', means=LQ, src='kw'),
  V(9, 'GAS', 'keyword', 'branch', means=GA, src='kw'),
  V(9, 'GAS CAN BE COMPRESSED', 'keyword', 'extra', src='kw', raw=['GAS CAN BE COMPRESSED', 'GAS: SQUEEZABLE']),
  V(9, 'HELIUM', 'keyword', 'extra', src='kw'),
  # EP10
  V(10, 'kg and g', 'keyword', 'extra', parent='HAS MASS', src='map+scene', note='Units of mass.'),
  V(10, 'electronic balance', 'keyword', 'extra', parent='HAS MASS', src='map+scene'),
  V(10, '3 rules: flat · ON when empty · zero/tare', 'keyword', 'extra', parent='HAS MASS', src='scene'),
  *[V(10, t, 'keyword', 'extra', src='kw', raw=r) for t, r in [
     ('KILOGRAMS (kg)', ['KILOGRAMS (kg)']), ('GRAMS (g)', ['GRAMS (g)']), ('ELECTRONIC BALANCE', ['ELECTRONIC BALANCE', 'E-BALANCE']),
     ('FLAT + STEADY', ['FLAT + STEADY']), ('READS ZERO', ['READS ZERO']), ('ZERO ERROR', ['ZERO ERROR']),
     ('TARE BUTTON', ['TARE BUTTON']), ('SUBTRACT', ['SUBTRACT']), ('AIR: 11 g', ['AIR: 11 g'])]],
  # EP11
  V(11, 'cm³ and ml', 'keyword', 'extra', parent='TAKES UP SPACE', raw=['volume: cm³ and ml', 'cm³ and ml (1 cm³ = 1 ml)'],
    note='Units of volume.'),
  V(11, 'measuring cylinder', 'keyword', 'extra', parent='TAKES UP SPACE', raw=['measuring cylinder', 'measuring cylinder · eye level']),
  V(11, 'eye level', 'keyword', 'extra', parent='TAKES UP SPACE', src='scene', raw=['measuring cylinder · eye level']),
  *[V(11, t, 'keyword', 'extra', src='kw', raw=r) for t, r in [
     ('MEASURING CYLINDER', ['MEASURING CYLINDER', 'MEAS. CYLINDER']), ('MORE ACCURATE', ['MORE ACCURATE']), ('cm³', ['cm³']),
     ('ml', ['ml']), ('1 cm³ = 1 ml', ['1 cm³ = 1 ml']), ('FLAT SURFACE', ['FLAT SURFACE']), ('EYE LEVEL', ['EYE LEVEL']),
     ('BOTTOM OF THE CURVE', ['BOTTOM OF THE CURVE', 'READ THE BOTTOM']), ('WATER RISES', ['WATER RISES'])]],
  # EP12
  V(12, '🔬 HOW SCIENTISTS INVESTIGATE', 'branch', 'extra', note='Experimental skills (mixups._exp applies to every chapter).'),
  V(12, 'hypothesis', 'keyword', 'extra', parent='HOW SCIENTISTS INVESTIGATE', src='map+scene'),
  V(12, 'fair test', 'keyword', 'extra', parent='HOW SCIENTISTS INVESTIGATE', raw=['fair test: change 1 variable', 'fair test']),
  V(12, 'change 1 variable', 'keyword', 'extra', parent='HOW SCIENTISTS INVESTIGATE',
    raw=['fair test: change 1 variable', 'change 1 variable, keep the rest']),
  V(12, 'measure (e.g. mass)', 'keyword', 'extra', parent='HOW SCIENTISTS INVESTIGATE', src='scene'),
  *[V(12, t, 'keyword', 'extra', src='kw', raw=r) for t, r in [
     ('HYPOTHESIS', ['HYPOTHESIS']), ('PREDICTION FROM WHAT YOU KNOW', ['PREDICTION FROM WHAT YOU KNOW', 'PREDICTION']),
     ('FAIR TEST', ['FAIR TEST']), ('CHANGE ONLY 1 VARIABLE', ['CHANGE ONLY 1 VARIABLE', 'CHANGE 1 THING']),
     ('MEASURED VARIABLE', ['MEASURED VARIABLE', 'MEASURE']), ('RESULTS SUPPORT HYPOTHESIS', ['RESULTS SUPPORT HYPOTHESIS', 'SUPPORTED ✓'])]],
  V(12, "SHAPE DOESN'T CHANGE MASS", 'keyword', 'extra', src='kw', raw=["SHAPE DOESN'T CHANGE MASS", 'SHAPE ≠ MASS'],
    note='Related to Mass (M-14). Must NOT trigger the M-14 mix-up (negated).'),
 ],
 'mixups': [
  M(['gas has no mass', 'gases have no mass', 'air has no mass', 'air has no weight', 'air weighs nothing', 'gas weighs nothing',
     'air is not matter', 'gas is not matter', 'gases are not matter', 'air is nothing', 'air does not take up space',
     "air doesn't take up space", 'gas does not take up space', 'gases do not take up space', 'air takes up no space'],
    'Exam tip: air is matter. It has mass and takes up space.', 'M-13'),
  M(['breaking reduces mass', 'less mass when broken', 'cutting reduces mass', 'mass changes with shape', 'shape changes mass',
     'changing shape changes mass', 'less matter when broken', 'smaller pieces have less mass'],
    'Exam tip: changing the shape does not change the mass. The amount of matter stays the same.', 'M-14',
    unless=['not', "doesn't", 'does not', 'no', '≠']),
  M(['liquid has a fixed shape', 'liquids have a fixed shape', 'liquid has a definite shape', 'liquids have a definite shape',
     'liquids keep their shape', 'liquid keeps its shape'],
    'Exam tip: a liquid has no fixed shape. It takes the shape of its container.', 'M-15'),
  M(['fixed shape', 'definite shape', 'own shape', 'keeps its shape', 'shape ✓'],
    'Exam tip: a liquid has no fixed shape. It takes the shape of its container.', 'M-15', inBranch=LQ,
    unless=['no', 'not', 'without', '✗']),
  M(['fixed volume', 'definite volume', 'volume ✓', 'fixed shape', 'definite shape', 'shape ✓'],
    'Exam tip: a gas has no fixed shape and no fixed volume. It fills up the whole container.', 'M-13 (wrong: "A gas ... fills its container") + TOPICS Gas keys',
    inBranch=GA, unless=['no', 'not', 'without', '✗']),
  M(['same volume same mass', 'same size same mass', 'same volume means same mass', 'same size means same mass',
     'same volume so same mass'],
    'Exam tip: two things can take up the same space but have different masses.', 'M-44', unless=['not', "doesn't", 'does not']),
  M(['loses heat and melts', 'lose heat and melt', 'lost heat and melted', 'melts when it loses heat', 'melts when cooled',
     'lose heat to melt', 'gains heat and freezes', 'gain heat and freeze', 'freezes when heated', 'freezes when it gains heat',
     'gain heat to freeze'],
    'Exam tip: ice gains heat and melts. Water loses heat and freezes.', 'mixups.water#9',
    note='Card is keyed "water" (P5); the same idea is on this poster (Changing state).'),
  M(['repeat the experiment', 'repeat experiment', 'do it again'],
    'Exam tip: repeat the experiment and find the average.', 'mixups._exp#75', unless=['average'],
    note='For an EP12-style "How scientists investigate" branch.'),
  M(['amount of water', 'size of', 'type of'],
    'Exam tip: name something you can measure, like the volume of water.', 'mixups._exp#76', kind='wording',
    note='Only inside an investigate / fair-test branch (match the parent text: investigate, fair test, variable).'),
 ],
 'mixupsSkipped': ['mixups._exp#77-80 (answer-writing; not map-shaped)'],
 'mixupCandidates': [
  M(['light is matter', 'heat is matter', 'sound is matter', 'shadow is matter', 'light has mass', 'heat has mass', 'sound has mass'],
    'Exam tip: light, heat, sound and shadows are not matter. They have no mass.', 'video EP8 (NOT MATTER box)',
    unless=['not', 'no', "isn't"], note='NOT in misconceptions.js / mixups.js: needs the teacher\'s approval.'),
 ],
}

# ======================================================================== LIGHT
LT, SH, RF, HS = 'Light travels', 'Shadows', 'Reflection', 'How we see'
K_SL = 'In straight lines'
K_BL, K_NB, K_SS2 = 'Light is blocked', 'Nearer the light, bigger the shadow', 'Same shape as the object'
K_BO, K_MI = 'Light bounces off surfaces', 'Mirrors reflect best'
K_EN, K_NL = 'Light enters our eyes', 'No light means no seeing'
B['light'] = {
 'eps': [13, 14, 15, 16, 17],
 'centreAliases': ['light'],
 'app': [
  A(LT, ['light travels', 'how light travels'], {
     K_SL: ['straight lines', 'straight line', 'in a straight line', 'travels straight', 'travels in straight lines']}, 1,
    'Add the big idea: how does light travel?'),
  A(HS, ['how we see', 'seeing', 'how do we see'], {
     K_EN: ['enters our eyes', 'enters the eyes', 'enter the eyes', 'enters the eye', 'into our eyes', 'into the eyes',
            'reaches our eyes', 'light must enter the eyes'],
     K_NL: ['no light no seeing', 'cannot see in the dark', "can't see in the dark", 'cannot see without light',
            'need light to see', 'no light cannot see']}, 2,
    'Add a branch for how we see. Where must the light go?'),
  A(SH, ['shadow', 'shadows'], {
     K_BL: ['light is blocked', 'blocks light', 'blocks the light', 'blocked', 'opaque', 'opaque blocks all light'],
     K_NB: ['nearer the light bigger', 'closer to the light bigger', 'near the light bigger', 'light closer bigger',
            'nearer the light bigger shadow', 'object nearer the light bigger', 'shadow size', 'size'],
     K_SS2: ['same shape', 'shadow shape', 'shape of the object', 'part facing the light', 'outline of the object', 'shape']}, 3,
    'Add a branch for shadows. How does a shadow form?'),
  A(RF, ['reflection', 'reflect', 'reflects', 'reflected'], {
     K_BO: ['bounces off', 'bounce off', 'light bounces', 'reflected from objects', 'reflected off', 'light is reflected',
            'reflects light'],
     K_MI: ['mirror', 'mirrors', 'shiny surfaces']}, 4,
    'Add a branch for reflection. What happens when light hits a surface?'),
 ],
 'videoCentre': [V([13, 14, 15, 16, 17], '💡 LIGHT', 'branch', 'centre', means='Light', raw=['LIGHT', '💡 LIGHT'])],
 'video': [
  # EP13
  V([13, 14], '🌿 NATURAL SOURCES', 'branch', 'extra', src='map+scene',
    note='Light sources. The Light poster has no "sources of light" branch.'),
  V([15, 16, 17], '🌿 NATURAL', 'branch', 'extra', src='map+scene', note='Short form of NATURAL SOURCES.'),
  V(13, 'Sun', 'keyword', 'extra', parent='NATURAL SOURCES', raw=['Sun · lightning', 'Sun (a star) · other stars']),
  V(13, 'other stars', 'keyword', 'extra', parent='NATURAL SOURCES', src='scene', raw=['Sun (a star) · other stars']),
  V(13, 'lightning', 'keyword', 'extra', parent='NATURAL SOURCES', src='map+scene', raw=['Sun · lightning', 'lightning']),
  V(13, 'fireflies', 'keyword', 'extra', parent='NATURAL SOURCES', src='map+scene', raw=['fireflies', 'fireflies · jellyfish · glow-worms']),
  V(13, 'jellyfish', 'keyword', 'extra', parent='NATURAL SOURCES', src='scene', raw=['fireflies · jellyfish · glow-worms']),
  V(13, 'glow-worms', 'keyword', 'extra', parent='NATURAL SOURCES', src='scene', raw=['fireflies · jellyfish · glow-worms']),
  V([13, 14], '🏭 MAN-MADE SOURCES', 'branch', 'extra', src='map+scene'),
  V([15, 16, 17], '🏭 MAN-MADE', 'branch', 'extra', src='map+scene'),
  V(13, 'light bulbs', 'keyword', 'extra', parent='MAN-MADE SOURCES', src='map+scene'),
  V(13, 'fireworks', 'keyword', 'extra', parent='MAN-MADE SOURCES', src='scene'),
  V(13, 'candles', 'keyword', 'extra', parent='MAN-MADE SOURCES', src='map+scene', raw=['candles · torches']),
  V(13, 'torches', 'keyword', 'extra', parent='MAN-MADE SOURCES', src='map+scene', raw=['candles · torches']),
  V(13, 'ENERGY', 'keyword', 'extra', src='kw', note='See Energy Conversion (P6).'),
  V(13, 'FORMS OF ENERGY', 'keyword', 'extra', src='kw', note='See Energy Conversion (P6).'),
  *[V(13, t, 'keyword', 'extra', src='kw', raw=r) for t, r in [
     ('SOURCE OF LIGHT', ['SOURCE OF LIGHT', 'LIGHT SOURCE']), ('NATURAL', ['NATURAL']), ('MAN-MADE', ['MAN-MADE']),
     ('THE SUN IS A STAR', ['THE SUN IS A STAR', 'SUN = STAR']), ('LIGHTNING', ['LIGHTNING']), ('LIVING LIGHT', ['LIVING LIGHT'])]],
  # EP14
  V([14, 15, 16, 17], '👁️ HOW WE SEE', 'branch', 'branch', means=HS, src='map+scene'),
  V(14, 'light must ENTER the eyes', 'keyword', 'key', means=K_EN, under=HS, parent='HOW WE SEE', src='scene'),
  V(14, 'directly from a source', 'keyword', 'key', means=K_EN, under=HS, parent='HOW WE SEE', src='map+scene', partial=True,
    note='Light from a source enters the eyes directly.'),
  V(14, 'reflected from objects', 'keyword', 'key', means=K_BO, under=RF, parent='HOW WE SEE', src='map+scene',
    meansAll=[K_BO, K_EN], note='Video puts reflection UNDER How we see; the app has its own Reflection branch.'),
  V(14, 'the Moon reflects sunlight', 'keyword', 'extra', parent='HOW WE SEE', src='scene',
    note='An example of reflection: accept, related to Reflection.'),
  V(14, 'LIGHT MUST ENTER THE EYES', 'keyword', 'key', means=K_EN, under=HS, src='kw', raw=['LIGHT MUST ENTER THE EYES', 'ENTERS EYES']),
  V(14, 'SEEN DIRECTLY', 'keyword', 'key', means=K_EN, under=HS, src='kw', partial=True),
  V(14, 'LIGHT FALLS ON THE OBJECT', 'keyword', 'key', means=K_BO, under=RF, src='kw', partial=True,
    raw=['LIGHT FALLS ON THE OBJECT', 'FALLS ON'], note='Light falls on the object and is reflected into our eyes.'),
  V(14, 'REFLECTION', 'keyword', 'branch', means=RF, src='kw'),
  V(14, 'MOON: NOT A SOURCE', 'keyword', 'extra', src='kw', raw=['MOON: NOT A SOURCE', 'MOON ≠ SOURCE']),
  V(14, 'BORROWED SUNLIGHT', 'keyword', 'extra', src='kw'),
  # EP15
  V([15, 16, 17], '👤 SHADOWS', 'branch', 'branch', means=SH, src='map+scene'),
  V(15, 'light travels in STRAIGHT lines', 'keyword', 'key', means=K_SL, under=LT, parent='SHADOWS', src='scene',
    note='Video puts it UNDER Shadows; the app has its own "Light travels" branch.'),
  V(15, 'opaque ➜ dark shadow', 'keyword', 'key', means=K_BL, under=SH, parent='SHADOWS', src='map+scene', partial=True,
    raw=['opaque ➜ dark shadow', 'opaque ➜ DARK shadow'], note='Opaque objects block all the light.'),
  V(15, 'translucent ➜ less dark', 'keyword', 'extra', parent='SHADOWS', src='map+scene',
    raw=['translucent ➜ less dark', 'translucent ➜ LESS DARK shadow'], note='The poster has no translucent key word.'),
  V(15, 'OPAQUE', 'keyword', 'key', means=K_BL, under=SH, src='kw', partial=True),
  V(15, 'TRANSLUCENT', 'keyword', 'extra', src='kw'), V(15, 'TRANSPARENT', 'keyword', 'extra', src='kw'),
  V(15, 'SHADOW', 'keyword', 'branch', means=SH, src='kw'),
  V(15, 'LIGHT TRAVELS IN STRAIGHT LINES', 'keyword', 'key', means=K_SL, under=LT, src='kw',
    raw=['LIGHT TRAVELS IN STRAIGHT LINES', 'STRAIGHT LINES']),
  V(15, 'THREE-CARD TEST', 'keyword', 'extra', src='kw', raw=['THREE-CARD TEST', '3-CARD TEST']),
  V(15, 'OPAQUE BLOCKS ALL LIGHT', 'keyword', 'key', means=K_BL, under=SH, src='kw', raw=['OPAQUE BLOCKS ALL LIGHT', 'OPAQUE BLOCKS']),
  V(15, 'LESS DARK SHADOW', 'keyword', 'extra', src='kw', raw=['LESS DARK SHADOW', 'LESS DARK']),
  # EP16
  V([16, 17], '📏 SHADOW SIZE', 'branch', 'key', means=K_NB, under=SH, parent='SHADOWS', src='scene', raw=['📏 SHADOW SIZE', '📏 size'],
    partial=True, note='Sub-branch heading under SHADOWS.'),
  V(16, 'nearer the light ➜ bigger', 'keyword', 'key', means=K_NB, under=SH, parent='SHADOWS', src='map+scene',
    raw=['size: nearer the light ➜ bigger', 'object NEARER the light ➜ BIGGER']),
  V(16, 'further from screen ➜ bigger', 'keyword', 'extra', parent='SHADOWS', src='map+scene',
    raw=['size: further from screen ➜ bigger', 'object FURTHER from screen ➜ BIGGER'],
    note='The poster gives only the light-distance rule. Correct science: accept.'),
  V(16, 'SCREEN', 'keyword', 'extra', src='kw'), V(16, 'TWO DISTANCES', 'keyword', 'extra', src='kw'),
  V(16, 'LIGHT CLOSER = BIGGER', 'keyword', 'key', means=K_NB, under=SH, src='kw', raw=['LIGHT CLOSER = BIGGER', 'LIGHT CLOSER']),
  V(16, 'SCREEN FURTHER = BIGGER', 'keyword', 'extra', src='kw', raw=['SCREEN FURTHER = BIGGER', 'SCREEN FURTHER']),
  V(16, 'BOTH DISTANCES CHANGE', 'keyword', 'extra', src='kw', raw=['BOTH DISTANCES CHANGE', 'BOTH CHANGE']),
  V(16, 'RAY MODEL', 'keyword', 'extra', src='kw', note='Uses straight-line travel (Light travels).'),
  # EP17
  V(17, '🔺 SHADOW SHAPE', 'branch', 'key', means=K_SS2, under=SH, parent='SHADOWS', src='scene', partial=True),
  V(17, 'the part facing the light', 'keyword', 'key', means=K_SS2, under=SH, parent='SHADOWS', src='map+scene', partial=True,
    raw=['shape: the part facing the light', 'depends on the part FACING the light'],
    note='More exact than the poster: the shape depends on the part facing the light (a cone can cast a circle).'),
  V(17, '☀️ OUTDOOR SHADOWS', 'branch', 'extra', parent='SHADOWS', src='scene'),
  V(17, 'longest morning + evening', 'keyword', 'extra', parent='SHADOWS', src='map+scene',
    raw=['outdoor: longest morning + evening, shortest noon', 'LONGEST: morning + evening']),
  V(17, 'shortest noon', 'keyword', 'extra', parent='SHADOWS', src='map+scene',
    raw=['outdoor: longest morning + evening, shortest noon', 'SHORTEST: noon']),
  V(17, 'SHADOW SHAPE', 'keyword', 'key', means=K_SS2, under=SH, src='kw', partial=True),
  V(17, 'PART FACING THE LIGHT', 'keyword', 'key', means=K_SS2, under=SH, src='kw', partial=True,
    raw=['PART FACING THE LIGHT', 'PART FACING LIGHT']),
  *[V(17, t, 'keyword', 'extra', src='kw', raw=r) for t, r in [
     ('SIDE = TRIANGLE', ['SIDE = TRIANGLE', 'TRIANGLE']), ('BASE = CIRCLE', ['BASE = CIRCLE', 'CIRCLE']),
     ('SUN LOW = LONG SHADOW', ['SUN LOW = LONG SHADOW', 'SUN LOW = LONG']), ('NOON = SHORTEST', ['NOON = SHORTEST']),
     ('SUNDIAL', ['SUNDIAL'])]],
 ],
 'mixups': [
  M(['light from our eyes', 'light from the eyes', 'light from eyes', 'eyes give out light', 'eyes give light',
     'eyes send out light', 'eyes send light', 'eyes shoot light', 'eyes produce light', 'light comes out of our eyes',
     'from eyes to object', 'from the eyes to the object'],
    'Exam tip: light enters our eyes. Our eyes do not give out light.', 'M-16', unless=['not', "don't", 'do not']),
  M(['shadow is a reflection', 'shadows are reflections', 'shadow is reflected', 'shadow reflects', 'shadow is made by reflection'],
    'Exam tip: a shadow forms where light is blocked. It is not a reflection.', 'M-17', unless=['not', "isn't"]),
  M(['translucent && no shadow', 'translucent && not cast', "translucent && doesn't cast", 'translucent && does not cast',
     'translucent && cannot cast', 'translucent && no shadows'],
    'Exam tip: translucent things let some light through, so they cast a less dark shadow.', 'M-18'),
  M(['closer to the screen && bigger', 'nearer the screen && bigger', 'nearer to the screen && bigger',
     'near the screen && bigger', 'closer to screen && bigger', 'further from the light && bigger',
     'farther from the light && bigger', 'away from the light && bigger', 'further from the torch && bigger',
     'nearer the light && smaller', 'closer to the light && smaller'],
    'Exam tip: nearer the light, bigger the shadow. Nearer the screen, smaller the shadow.', 'M-19',
    note='"further from screen && bigger" is CORRECT (EP16) and must not trigger.'),
  M(['eyes adjust', 'eyes get used to the dark', 'see in the dark', 'see in total darkness', 'see in complete darkness',
     'can see without light', 'see without light'],
    'Exam tip: with no light at all, we cannot see. Light must enter our eyes.', 'M-45',
    unless=['cannot', "can't", 'not', 'no light no']),
 ],
 'mixupsSkipped': [],
 'mixupCandidates': [
  M(['moon is a source', 'moon gives out light', 'moon gives light', 'moon makes light', 'moon produces light', 'moon shines by itself'],
    'Exam tip: the Moon is not a source of light. It reflects light from the Sun.', 'video EP14 exam box',
    unless=['not', "isn't", 'reflect'], note='NOT in misconceptions.js / mixups.js: needs the teacher\'s approval.'),
 ],
}

# ========================================================================= HEAT
HF, TE, GC, PC, GL = 'Heat flows', 'Temperature', 'Good conductors of heat', 'Poor conductors of heat', 'Gaining or losing heat'
HE = 'Heat is a form of energy'   # proposed by step (d)
K_HC, K_EQ = 'From hotter to colder', 'Until both are the same temperature'
K_HOW_OLD, K_HOW = 'How hot or cold something is', 'How hot or cold an object is'
K_TH = 'Measured with a thermometer'
K_ME, K_QU = 'Metals', 'Heat travels through them quickly'
K_PW, K_SLW = 'Plastic, wood and air', 'Heat travels through them slowly'
K_EX, K_CO, K_CS = 'Expands when heated', 'Contracts when cooled', 'Can change state'
K_GR, K_LF = 'Gain heat: temperature rises', 'Lose heat: temperature falls'   # proposed
heat_app = [
  A(HF, ['heat flow', 'heat flows', 'flow of heat', 'heat transfer', 'heat moves', 'direction of heat flow'], {
     K_HC: ['hotter to colder', 'hot to cold', 'from hot to cold', 'higher temperature to lower temperature',
            'warmer to cooler', 'from a hotter place to a colder place'],
     K_EQ: ['same temperature', 'temperatures are equal', 'stops when equal', 'stops when temperatures are equal',
            'until equal', 'until both are the same', 'equal temperature']}, 1,
    'Add the big idea: which way does heat flow?'),
  A(TE, ['temperature', 'temp'], {
     K_HOW_OLD: ['how hot or cold', 'how hot or cold an object is', 'how hot or cold something is', 'how hot something is',
                 'degree of hotness'],
     K_TH: ['thermometer', 'measured with a thermometer', 'use a thermometer', 'lab thermometer', 'laboratory thermometer',
            'digital thermometer', 'clinical thermometer']}, 2,
    'Add a branch for temperature. What does it tell us?'),
  A(HE, ['heat is a form of energy', 'form of energy', 'heat is energy', 'heat (energy)', 'heat energy', 'energy'], {
     K_GR: ['gain heat temperature rises', 'gains heat temperature rises', 'temperature rises', 'temperature increases',
            'gain heat to temperature rises'],
     K_LF: ['lose heat temperature falls', 'loses heat temperature falls', 'temperature falls', 'temperature drops',
            'temperature decreases', 'lose heat to temperature falls']}, 3,
    'What is heat? Add a branch that says heat is a form of energy.', proposed=True),
  A(GC, ['good conductor', 'good conductors', 'good conductor of heat', 'conductors of heat'], {
     K_ME: ['metal', 'metals', 'iron', 'steel', 'copper', 'aluminium', 'aluminum', 'silver'],
     K_QU: ['heat travels quickly', 'conducts heat quickly', 'heat passes through quickly', 'heat flows through quickly', 'quickly',
            'fast']}, 4,
    'Add good conductors of heat. Which materials let heat through quickly?'),
  A(PC, ['poor conductor', 'poor conductors', 'poor conductor of heat', 'heat insulator', 'insulator', 'insulators'], {
     K_PW: ['plastic', 'wood', 'air', 'glass', 'polystyrene', 'wool', 'rubber', 'cloth', 'fabric', 'cork'],
     K_SLW: ['heat travels slowly', 'conducts heat slowly', 'heat passes through slowly', 'slowly', 'slow']}, 5,
    'Add poor conductors of heat. Which materials let heat through slowly?'),
  A(GL, ['gaining or losing heat', 'gain or lose heat', 'effects of heat', 'effect of heat', 'heating and cooling',
         'when heated or cooled'], {
     K_EX: ['expand', 'expands', 'expansion', 'expands when heated', 'volume up', 'volume increases'],
     K_CO: ['contract', 'contracts', 'contraction', 'contracts when cooled', 'volume down', 'volume decreases'],
     K_CS: ['change of state', 'changes state', 'change state', 'state change', 'melt', 'melts', 'melting', 'freeze',
            'freezes', 'boil', 'boils', 'evaporate', 'condense']}, 6,
    'What happens to things when they gain or lose heat? Add a branch.'),
]
# step (d): the Temperature key word changes to "an object"
heat_app[1]['keys'] = [K_HOW, K_TH]
heat_app[1]['keyAliases'] = {K_HOW: heat_app[1]['keyAliases'][K_HOW_OLD], K_TH: heat_app[1]['keyAliases'][K_TH]}
B['plants']['app'][2]['keyShort'] = {K_TR: 'Transport food, water and mineral salts'}
heat_app[1]['changed'] = {'from': K_HOW_OLD, 'to': K_HOW, 'why': 'step (d): full MOE definition'}
heat_app[2]['note'] = ('Proposed by step (d). The key words are a suggestion that also matches EP19; '
                       'if (d) lands with different key words, update this entry to match the poster.')
B['heat'] = {
 'eps': [18, 19, 20, 21, 22],
 'centreAliases': ['heat'],
 'app': heat_app,
 'videoCentre': [V([18, 19, 20, 21, 22], '🔥 HEAT', 'branch', 'centre', means='Heat', raw=['HEAT', '🔥 HEAT'])],
 'video': [
  # EP18
  V([18, 19, 20, 21, 22], '🌡️ TEMPERATURE', 'branch', 'branch', means=TE, src='map+scene'),
  V(18, 'measured in °C', 'keyword', 'extra', parent='TEMPERATURE', src='map+scene',
    note='The unit. Do not credit "Measured with a thermometer" from the word "measured" alone.'),
  V(18, 'thermometer', 'keyword', 'key', means=K_TH, under=TE, parent='TEMPERATURE', src='map+scene',
    raw=['thermometer', 'with a THERMOMETER']),
  V(18, 'digital · infrared · laboratory', 'keyword', 'extra', parent='TEMPERATURE', src='scene',
    note='Three types of thermometer: related to "Measured with a thermometer".'),
  V(18, 'TEMPERATURE', 'keyword', 'branch', means=TE, src='kw'),
  V(18, 'DEGREES CELSIUS (°C)', 'keyword', 'extra', src='kw', raw=['DEGREES CELSIUS (°C)', '°C']),
  V(18, 'THERMAL CAMERA', 'keyword', 'extra', src='kw'),
  V(18, 'THERMOMETER', 'keyword', 'key', means=K_TH, under=TE, src='kw'),
  *[V(18, t, 'keyword', 'key', means=K_TH, under=TE, src='kw', partial=True, note='A type of thermometer.')
    for t in ['DIGITAL THERMOMETER', 'INFRARED THERMOMETER', 'LAB THERMOMETER']],
  V(18, 'BULB FULLY IN', 'keyword', 'extra', src='kw'), V(18, 'DATA LOGGER', 'keyword', 'extra', src='kw'),
  # EP19
  V([19, 20], '⚡ HEAT (energy)', 'branch', 'extra', src='map+scene', afterD={'branch': HE},
    note='No poster branch today. After step (d) it means "Heat is a form of energy".'),
  V([21, 22], '⚡ HEAT', 'branch', 'extra', src='map+scene', afterD={'branch': HE}, note='Short form of HEAT (energy).'),
  V(19, 'a form of ENERGY', 'keyword', 'extra', parent='HEAT (energy)', src='scene', afterD={'branch': HE}),
  V(19, 'gain heat ➜ temperature rises', 'keyword', 'branch', means=GL, parent='HEAT (energy)', src='map+scene', partial=True,
    raw=['gain heat ➜ temperature rises', 'GAIN heat ➜ temperature RISES'], afterD={'branch': HE, 'key': K_GR},
    note='The poster\'s Gaining or losing heat keys are expand / contract / change state; "temperature rises" is not one of them.'),
  V(19, 'lose heat ➜ temperature falls', 'keyword', 'branch', means=GL, parent='HEAT (energy)', src='map+scene', partial=True,
    raw=['lose heat ➜ temperature falls', 'LOSE heat ➜ temperature FALLS'], afterD={'branch': HE, 'key': K_LF}),
  V(19, 'HEAT: A FORM OF ENERGY', 'keyword', 'extra', src='kw', raw=['HEAT: A FORM OF ENERGY', 'HEAT: FORM OF ENERGY'],
    afterD={'branch': HE}),
  V(19, 'GAIN HEAT ➜ RISES', 'keyword', 'branch', means=GL, src='kw', partial=True, raw=['GAIN HEAT ➜ RISES', 'GAIN ➜ RISES'],
    afterD={'branch': HE, 'key': K_GR}),
  V(19, 'LOSE HEAT ➜ FALLS', 'keyword', 'branch', means=GL, src='kw', partial=True, raw=['LOSE HEAT ➜ FALLS', 'LOSE ➜ FALLS'],
    afterD={'branch': HE, 'key': K_LF}),
  V([19, 20], 'HEAT FLOWS HOT ➜ COLD', 'keyword', 'key', means=K_HC, under=HF, src='kw', raw=['HEAT FLOWS HOT ➜ COLD', 'HOT ➜ COLD']),
  V(19, 'TEMP: HOW HOT OR COLD', 'keyword', 'key', means=K_HOW, under=TE, src='kw'),
  V(19, 'ROOM TEMPERATURE', 'keyword', 'extra', src='kw', raw=['ROOM TEMPERATURE', 'ROOM TEMP']),
  V(19, 'SURROUNDINGS', 'keyword', 'extra', src='kw'),
  # EP20
  V([20, 21, 22], '➡️ HEAT FLOW', 'branch', 'branch', means=HF, src='map+scene'),
  V(20, 'hot ➜ cold', 'keyword', 'key', means=K_HC, under=HF, parent='HEAT FLOW', src='map+scene', raw=['hot ➜ cold', 'HOT ➜ COLD']),
  V(20, 'stops when temperatures are equal', 'keyword', 'key', means=K_EQ, under=HF, parent='HEAT FLOW', src='map+scene',
    raw=['stops when temperatures are equal', 'stops when temperatures are EQUAL']),
  V(20, 'sources: Sun · Earth', 'keyword', 'extra', parent='HEAT FLOW', src='scene', raw=['sources: ☀️ Sun · 🌍 Earth'],
    note='Sources of heat. In the scene and the narration, not in the phone map.'),
  V(20, "COLD DOESN'T FLOW", 'keyword', 'key', means=K_HC, under=HF, src='kw', raw=["COLD DOESN'T FLOW", 'NO COLD FLOW'],
    note='The M-01 correction. Must NOT trigger the "cold flows" mix-up (negated).'),
  V(20, 'STOPS WHEN EQUAL', 'keyword', 'key', means=K_EQ, under=HF, src='kw', raw=['STOPS WHEN EQUAL', 'STOPS AT EQUAL']),
  *[V(20, t, 'keyword', 'extra', src='kw', raw=r, note='Line-graph skills.') for t, r in [
     ('HORIZONTAL AXIS', ['HORIZONTAL AXIS', 'HORIZ. AXIS']), ('VERTICAL AXIS', ['VERTICAL AXIS']), ('DATA POINT', ['DATA POINT'])]],
  V(20, 'SOURCE OF HEAT', 'keyword', 'extra', src='kw', raw=['SOURCE OF HEAT', 'HEAT SOURCE']),
  V(20, 'HOT SPRINGS', 'keyword', 'extra', src='kw'),
  # EP21
  V([21, 22], '🥄 CONDUCTORS', 'branch', 'branch', means=GC, meansAll=[GC, PC], src='map+scene',
    note='One video branch = two poster branches. Wording tip: add "of heat" (mixups.heat#6).'),
  V(21, 'good: metals', 'keyword', 'key', means=K_ME, under=GC, parent='CONDUCTORS', src='map+scene', meansAll=[GC, K_ME],
    raw=['good: metals', 'GOOD: metals']),
  V(21, 'poor: glass · plastic · wood · air', 'keyword', 'key', means=K_PW, under=PC, parent='CONDUCTORS', src='map+scene',
    meansAll=[PC, K_PW], raw=['poor: glass · plastic · wood · air', 'POOR: glass · plastic · wood · AIR'],
    note='"glass" is extra (not on the poster); plastic, wood and air match.'),
  V(21, 'MATERIAL MATTERS', 'keyword', 'extra', src='kw', raw=['MATERIAL MATTERS', 'MATERIAL']),
  V(21, 'WAX ROD TEST', 'keyword', 'extra', src='kw'),
  V(21, 'GOOD CONDUCTOR', 'keyword', 'branch', means=GC, src='kw', raw=['GOOD CONDUCTOR', 'GOOD COND.'],
    note='Wording tip: "good conductor OF HEAT" (mixups.heat#6).'),
  V(21, 'METALS', 'keyword', 'key', means=K_ME, under=GC, src='kw'),
  V(21, 'POOR CONDUCTOR', 'keyword', 'branch', means=PC, src='kw', raw=['POOR CONDUCTOR', 'POOR COND.'],
    note='Wording tip: "poor conductor OF HEAT".'),
  V(21, 'AIR = POOR CONDUCTOR', 'keyword', 'key', means=K_PW, under=PC, src='kw', raw=['AIR = POOR CONDUCTOR', 'AIR: POOR']),
  V(21, 'POLYSTYRENE', 'keyword', 'key', means=K_PW, under=PC, src='kw', partial=True, note='Another poor conductor of heat.'),
  # EP22
  V(22, '✨ EFFECTS OF HEAT', 'branch', 'branch', means=GL, src='map+scene'),
  V(22, 'temperature change', 'keyword', 'branch', means=GL, parent='EFFECTS OF HEAT', src='scene', partial=True,
    afterD={'branch': HE}, note='Same idea as EP19 gain/lose heat -> temperature rises/falls.'),
  V(22, 'expansion', 'keyword', 'key', means=K_EX, under=GL, parent='EFFECTS OF HEAT', src='map+scene', raw=['expansion + contraction']),
  V(22, 'contraction', 'keyword', 'key', means=K_CO, under=GL, parent='EFFECTS OF HEAT', src='map+scene', raw=['expansion + contraction']),
  V(22, 'change of state', 'keyword', 'key', means=K_CS, under=GL, parent='EFFECTS OF HEAT', src='map+scene'),
  V(22, 'EXPAND = VOLUME UP', 'keyword', 'key', means=K_EX, under=GL, src='kw', raw=['EXPAND = VOLUME UP', 'EXPAND']),
  V(22, 'CONTRACT = VOLUME DOWN', 'keyword', 'key', means=K_CO, under=GL, src='kw', raw=['CONTRACT = VOLUME DOWN', 'CONTRACT']),
  V(22, 'BALL + RING', 'keyword', 'extra', src='kw'),
  V(22, 'GASES EXPAND MOST', 'keyword', 'extra', src='kw', raw=['GASES EXPAND MOST', 'GAS: MOST']),
  V(22, 'EXPANSION GAPS', 'keyword', 'extra', src='kw', raw=['EXPANSION GAPS', 'GAPS']),
  V(22, 'CHANGE OF STATE', 'keyword', 'key', means=K_CS, under=GL, src='kw', raw=['CHANGE OF STATE', 'STATE CHANGE']),
  V(22, 'MELT', 'keyword', 'key', means=K_CS, under=GL, src='kw'),
 ],
 'mixups': [
  M(['cold flows', 'cold flow', 'flow of cold', 'cold moves', 'cold travels', 'cold goes into', 'cold enters', 'cold passes',
     'cold spreads', 'coldness flows', 'cold to hot', 'colder to hotter', 'cold energy'],
    'Exam tip: only heat flows, from the hotter thing to the colder thing. Cold does not flow.', 'M-01',
    unless=['not', "doesn't", 'does not', 'no', 'never', "isn't"]),
  M(['non-conductor', 'non conductor', 'nonconductor', 'stops heat', 'stop heat', 'blocks heat', 'block heat',
     'does not conduct heat', "doesn't conduct heat", 'no heat passes', 'heat cannot pass', 'does not let heat through',
     "doesn't let heat through"],
    'Exam tip: say "poor conductor of heat". Heat still passes through it, only slowly.', 'M-02 + mixups.heat#2'),
  M(['temperature is heat', 'temperature measures heat', 'temperature is a measure of heat', 'measure of heat', 'measures heat',
     'heat is temperature', 'heat is the same as temperature', 'heat equals temperature', 'heat and temperature are the same',
     'thermometer measures heat'],
    'Exam tip: heat is a form of energy. Temperature is how hot or cold an object is.', 'M-03 + mixups.heat#3',
    unless=['not', "isn't", 'is not', '≠']),
  M(['metals are cold', 'metal is cold', 'metals are colder', 'metal is colder', 'metals are naturally cold'],
    'Exam tip: metal only feels cold. It is a good conductor of heat, so it takes heat away from your hand quickly.', 'M-04'),
  M(['traps heat', 'trap heat', 'trapped heat', 'trapping heat', 'blanket gives heat', 'blanket adds heat', 'blankets give heat',
     'fur gives heat', 'adds heat to'],
    'Exam tip: fur and blankets trap AIR. Air is a poor conductor of heat, so heat is lost more slowly.', 'M-05 + mixups.heat#1'),
  M(['mass increases', 'more mass', 'gains mass', 'mass goes up', 'mass gets bigger', 'gets heavier', 'becomes heavier',
     'heavier when heated', 'loses mass when cooled'],
    'Exam tip: when something expands, its volume goes up. Its mass stays the same.', 'M-06', unless=['not', 'same']),
  M(['loses heat and melts', 'lose heat and melt', 'lost heat and melted', 'melts when it loses heat', 'melts when cooled',
     'lose heat to melt', 'gains heat and freezes', 'gain heat and freeze', 'freezes when heated', 'freezes when it gains heat',
     'gain heat to freeze'],
    'Exam tip: ice gains heat and melts. Water loses heat and freezes.', 'mixups.water#9',
    note='Card is keyed "water" (P5); the same idea is on this poster (Can change state).'),
  M(['becomes bigger', 'gets bigger', 'grows bigger', 'becomes smaller', 'gets smaller', 'shrinks'],
    'Exam tip: use the science words: it expands when heated and contracts when cooled.', 'mixups.heat#7', kind='wording',
    unless=['expand', 'contract']),
  M(['good conductor', 'good conductors', 'poor conductor', 'poor conductors', 'conductors'],
    'Exam tip: write it in full: good conductor of heat, poor conductor of heat.', 'mixups.heat#6', kind='wording',
    unless=['of heat', 'heat'], note='Check the node AND its branch for "heat" before showing this.'),
 ],
 'mixupsSkipped': ['mixups.heat#4 (bubble: name what expands)', 'mixups.heat#5 (gain heat FROM what)',
                   'M-43 (ring and ball: which object)', 'M-11 (temperature steady while melting; P5 water)'],
}

# ===================================================================== P3 (app only)
def app_from_topics(tid, aliases, ranks, hints):
    out = []
    for i, b in enumerate(TOPICS[tid]['b']):
        al = aliases.get(b['t'], ([], {}))
        out.append(A(b['t'], al[0], {k: al[1].get(k, []) for k in b['k']}, ranks[i], hints[i]))
    return out

B['living'] = {
 'eps': [], 'centreAliases': ['living and non-living', 'living things', 'living & non-living', 'living'],
 'app': app_from_topics('living', {
   'Living things need': (['living things need', 'needs', 'what living things need'],
                          {'Water': ['water'], 'Food': ['food'], 'Air': ['air', 'oxygen']}),
   'Living things can': (['living things can', 'characteristics of living things', 'what living things can do'],
                         {'Grow': ['grow', 'grows', 'growth'], 'Respond to changes': ['respond', 'responds to changes', 'response', 'react to changes'],
                          'Reproduce': ['reproduce', 'reproduces', 'reproduction', 'have young', 'make young']}),
   'Plants': (['plant', 'plants'], {'Flowering plants': ['flowering', 'flowering plant', 'flowers'],
                                     'Non-flowering plants': ['non-flowering', 'non flowering', 'fern', 'ferns', 'moss', 'mosses']}),
   'Animals': (['animal', 'animals'], {'Mammals, birds, fish': ['mammal', 'mammals', 'bird', 'birds', 'fish'],
                                        'Reptiles, amphibians': ['reptile', 'reptiles', 'amphibian', 'amphibians'],
                                        'Insects': ['insect', 'insects']}),
   'Other groups': (['other groups', 'fungi and bacteria', 'microorganisms'],
                    {'Fungi': ['fungi', 'fungus', 'mushroom', 'mushrooms', 'mould', 'mold', 'yeast'], 'Bacteria': ['bacteria', 'bacterium']}),
  }, [1, 2, 3, 4, 5], [
   'What do all living things need? Add a branch.', 'What can all living things do? Add a branch.',
   'Add a branch for plants. What two groups are there?', 'Add a branch for animals and their groups.',
   'Some living things are not plants or animals. Add a branch for them.']),
 'video': [], 'videoCentre': [],
 'mixups': [
  M(['wings', 'feelers', 'antennae'],
    'Exam tip: an insect has six legs and three body parts. Other animals can have wings and feelers too.',
    'mixups.lifecycles#62 (cross-listed)', inBranch='Insects',
    unless=['six legs', '6 legs', 'three body parts', '3 body parts', 'three parts', '3 parts'],
    note='Shown only when an Insects node gives wings/feelers but not six legs / three body parts.'),
 ],
 'mixupsSkipped': ['No Living-and-Non-Living entries exist in misconceptions.js or mixups.js.'],
 'mixupCandidates': [
  M(['car is living', 'cars are living', 'moves so it is living', 'it moves so it is alive', 'fire is living'],
    'Exam tip: moving is not enough. A living thing also grows, responds to changes and reproduces.',
    'TOPICS outcome ("why a car moves but is still non-living")', unless=['not', 'non'],
    note='NOT in misconceptions.js / mixups.js: needs the teacher\'s approval.'),
 ],
}
B['materials'] = {
 'eps': [], 'centreAliases': ['diversity of materials', 'materials', 'properties of materials'],
 'app': app_from_topics('materials', {
   'Strength': (['strength', 'strong'], {'Holds heavy loads': ['holds heavy loads', 'holds heavy things', 'strong', 'does not break easily'],
                                          'Breaks easily': ['breaks easily', 'weak', 'fragile']}),
   'Flexibility': (['flexibility', 'flexible'], {'Bends without breaking': ['bends without breaking', 'bends easily', 'flexible', 'bendy'],
                                                 'Stiff and keeps its shape': ['stiff', 'rigid', 'keeps its shape', 'not flexible']}),
   'Float or sink': (['float or sink', 'floating', 'sinking', 'floats or sinks'], {'Floats on water': ['floats', 'float', 'floats on water'],
                                                                                  'Sinks in water': ['sinks', 'sink', 'sinks in water']}),
   'Waterproof': (['waterproof', 'water resistant'], {'Keeps water out': ['keeps water out', 'waterproof', 'does not absorb water', 'does not let water through'],
                                                      'Soaks water up': ['soaks water up', 'soaks up water', 'absorbs water', 'absorbent']}),
   'Lets light through': (['lets light through', 'allows light through', 'light passes through'],
                          {'Clear enough to see through': ['clear', 'transparent', 'see-through', 'see through'],
                           'Blocks the light': ['blocks light', 'blocks the light', 'opaque', 'does not let light through']}),
  }, [1, 2, 3, 4, 5], [
   'Add a branch for strength. Which materials are strong?', 'Add a branch for flexibility. Which materials bend?',
   'Add a branch: does it float or sink?', 'Add a branch for waterproof materials.', 'Add a branch: does it let light through?']),
 'video': [], 'videoCentre': [],
 'mixups': [
  M(['heavy things sink', 'heavy objects sink', 'heavy sinks', 'heavier sinks', 'light things float', 'light objects float',
     'lighter floats', 'light floats', 'heavy things cannot float', 'heavy objects cannot float'],
    'Exam tip: floating does not depend on weight alone. It depends on the material.', 'M-33', unless=['not']),
 ],
 'mixupsSkipped': ['M-34 (one useful property): not detectable in a map.',
                   'No Materials entries in mixups.js.'],
}
B['lifecycles'] = {
 'eps': [], 'centreAliases': ['life cycles', 'life cycle', 'lifecycles'],
 'app': app_from_topics('lifecycles', {
   'Flowering plant': (['flowering plant', 'plant', 'plant life cycle'],
                       {'Seed': ['seed', 'seeds'], 'Young plant': ['young plant', 'seedling'], 'Adult plant': ['adult plant', 'mature plant']}),
   'Butterfly & beetle': (['butterfly', 'beetle', 'butterfly and beetle', 'four stages', '4 stages', 'four-stage', 'mosquito'],
                          {'Egg': ['egg', 'eggs'], 'Larva': ['larva', 'larvae', 'caterpillar', 'grub'],
                           'Pupa': ['pupa', 'pupae', 'chrysalis', 'cocoon'], 'Adult': ['adult']}),
   'Grasshopper & cockroach': (['grasshopper', 'cockroach', 'grasshopper and cockroach', 'three stages', '3 stages', 'three-stage'],
                               {'Egg': ['egg', 'eggs'], 'Nymph': ['nymph', 'nymphs', 'young'], 'Adult': ['adult']}),
   'Frog': (['frog', 'frogs'], {'Egg': ['egg', 'eggs', 'frogspawn'], 'Tadpole (the young)': ['tadpole', 'tadpoles', 'froglet'],
                                'Adult frog': ['adult frog', 'adult', 'frog']}),
   'Chicken': (['chicken', 'hen'], {'Egg': ['egg', 'eggs'], 'Chick': ['chick', 'chicks'], 'Adult hen': ['adult hen', 'hen', 'adult chicken', 'rooster']}),
  }, [1, 2, 3, 4, 5], [
   'Add the flowering plant. What stages does it go through?', 'Add a four-stage life cycle, like the butterfly.',
   'Add a three-stage life cycle, like the grasshopper.', 'Add the frog. What is its young called?',
   'Add the chicken. What hatches from the egg?']),
 'video': [], 'videoCentre': [],
 'mixups': [
  M(['pupa', 'pupae', 'larva', 'larvae', 'caterpillar', 'chrysalis'],
    'Exam tip: grasshoppers and cockroaches have three stages: egg, nymph, adult. There is no larva or pupa.', 'M-28 + M-29',
    inBranch='Grasshopper & cockroach', unless=['no', 'not']),
  M(['all insects have a pupa', 'all insects have pupa', 'every insect has a pupa', 'all insects have four stages',
     'all insects have 4 stages'],
    'Exam tip: some insects have three stages (egg, nymph, adult), with no pupa.', 'M-28'),
  M(['wings', 'feelers', 'antennae'],
    'Exam tip: an insect has six legs and three body parts. Other animals can have wings and feelers too.', 'mixups.lifecycles#62',
    inBranch='Insects', unless=['six legs', '6 legs', 'three body parts', '3 body parts', 'three parts', '3 parts'],
    note='Only if the pupil made an "Insects" branch.'),
  M(['oil stops air entering', 'oil blocks air', 'oil stops air from entering', 'oil stops air going into the water',
     'oil stops oxygen entering the water'],
    'Exam tip: the oil stops the larvae and pupae from taking in air at the water\'s surface.', 'mixups.lifecycles#63'),
  M(['continuity of its kind', 'continuity of their kind'],
    'Exam tip: many eggs are laid because some are eaten or do not hatch. This way, some survive.', 'mixups.lifecycles#64'),
  M(['information from parents', 'information is passed', 'information passed down'],
    'Exam tip: the young get their characteristics from their parents.', 'mixups.lifecycles#66', kind='wording'),
 ],
 'mixupsSkipped': ['mixups.lifecycles#65 (rain stopped, numbers rise; question-specific)'],
}
B['magnets'] = {
 'eps': [], 'centreAliases': ['magnets', 'magnet'],
 'app': app_from_topics('magnets', {
   'A magnet can': (['a magnet can', 'magnet can', 'what magnets do'], {'Push': ['push', 'pushes'], 'Pull': ['pull', 'pulls']}),
   'Two poles': (['two poles', '2 poles', 'poles'], {'North pole': ['north pole', 'north', 'n pole'], 'South pole': ['south pole', 'south', 's pole']}),
   'Poles together': (['poles together', 'like and unlike poles'],
                      {'Unlike poles attract': ['unlike poles attract', 'opposite poles attract', 'different poles attract',
                                                'north and south attract', 'n and s attract'],
                       'Like poles repel': ['like poles repel', 'same poles repel', 'north and north repel', 'south and south repel',
                                            'n and n repel', 's and s repel']}),
   'Magnetic materials': (['magnetic materials', 'magnetic', 'attracted to magnets'],
                          {'Iron and steel': ['iron', 'steel', 'nickel', 'cobalt'],
                           'Not copper or plastic': ['non-magnetic', 'not magnetic', 'copper', 'plastic', 'aluminium', 'aluminum',
                                                     'wood', 'glass', 'not attracted']}),
   'Making a magnet': (['making a magnet', 'make a magnet', 'make magnets'],
                       {'Stroke method': ['stroke', 'stroking', 'stroke method'],
                        'Electrical method': ['electrical method', 'electric', 'electromagnet', 'coil of wire']}),
  }, [3, 2, 1, 4, 5], [
   'What can a magnet do? Add a branch.', 'Add a branch for the two poles.', 'What happens when two poles meet? Add a branch.',
   'Which materials does a magnet attract? Add a branch.', 'How can we make a magnet? Add a branch.']),
 'video': [], 'videoCentre': [],
 'mixups': [
  M(['all metals are magnetic', 'all metals', 'attracts all metals', 'attracts metal', 'attract metal', 'attracts metals',
     'attract metals', 'magnets attract metal', 'copper is magnetic', 'aluminium is magnetic', 'aluminum is magnetic',
     'attracts copper', 'attracts aluminium', 'attracts aluminum', 'attracts gold', 'attracts silver'],
    'Exam tip: magnets attract magnetic materials like iron and steel. Not all metals are magnetic.', 'M-35 + mixups.magnets#24',
    unless=['not', 'only some', 'non']),
  M(['like poles attract', 'same poles attract', 'unlike poles repel', 'opposite poles repel', 'different poles repel',
     'north and north attract', 'south and south attract', 'north and south repel', 'n and n attract', 's and s attract',
     'n and s repel', 'stronger pole attracts'],
    'Exam tip: unlike poles attract. Like poles repel.', 'M-36',
    note='Whole-word matching is essential: "unlike poles attract" contains "like poles attract".'),
  M(['attracted the magnet', 'attracts the magnet', 'attract the magnet', 'iron attracts', 'steel attracts', 'iron attracted'],
    'Exam tip: write it this way round: the iron is attracted to the magnet.', 'mixups.magnets#25', kind='wording'),
 ],
 'mixupsSkipped': ['mixups.magnets#26 (balance reading; question-specific)'],
}

# ---------------------------------------------------------------- finish + checks
ORDER = ['plants', 'digestive', 'matter', 'light', 'heat', 'living', 'materials', 'lifecycles', 'magnets']
problems = []
for cid in ORDER:
    ch = B[cid]
    t = TOPICS[cid]
    ch_out = {'title': t['t'], 'lv': t['lv'], 'idea': t['idea']}
    ch_out.update(ch)
    # app branches must equal TOPICS (except the proposed branch and the (d) key change)
    tb = {b['t']: b['k'] for b in t['b']}
    order = [b['t'] for b in t['b']]
    real = sorted([b for b in ch['app'] if not b.get('proposed')], key=lambda b: order.index(b['branch']) if b['branch'] in order else 99)
    ch['app'] = real + [b for b in ch['app'] if b.get('proposed')]
    for b in real:
        if b['branch'] not in tb: problems.append(f'{cid}: app branch not in TOPICS: {b["branch"]}')
        else:
            exp = list(tb[b['branch']])
            if cid == 'heat' and b['branch'] == TE: exp = [K_HOW if k == K_HOW_OLD else k for k in exp]
            if b['keys'] != exp: problems.append(f'{cid}/{b["branch"]}: keys {b["keys"]} != TOPICS {exp}')
    if set(tb) - {b['branch'] for b in real}: problems.append(f'{cid}: TOPICS branches missing {set(tb) - {b["branch"] for b in real}}')
    # every means must exist in the app
    names = {b['branch'] for b in ch['app']} | {k for b in ch['app'] for k in b['keys']}
    for v in ch['video'] + ch['videoCentre']:
        if v['meansKind'] in ('branch', 'key'):
            for m in (v.get('meansAll') or [v['means']]):
                if m not in names: problems.append(f'{cid} ep{v["ep"]} {v["term"]}: means "{m}" not an app term')
        if v.get('under') and v['under'] not in names: problems.append(f'{cid}: under "{v["under"]}" unknown')
    B[cid] = ch_out

# coverage: every phone-map label and every key-word panel label of every episode is aligned
covered = {}
for cid in ORDER:
    for v in B[cid]['video'] + B[cid]['videoCentre']:
        for r in v['raw'] + [v['term']]:
            for e in v['eps']:
                covered.setdefault(e, set()).add(norm(r))
for ep, inv in INV.items():
    want = [inv['c']] + [b[0] for b in inv['b']] + [s for b in inv['b'] for s in b[1]] + [k[0] for k in inv['kws']]
    for w in want:
        if w in HABIT.get(ep, []): continue
        if norm(w) not in covered.get(ep, set()): problems.append(f'EP{ep}: not aligned: {w!r}')
    if inv['ch'] not in B or ep not in B[inv['ch']]['eps']: problems.append(f'EP{ep}: chapter {inv["ch"]} not listing it')

# habit labels really exist
for ep, hs in HABIT.items():
    labels = [k[0] for k in INV[ep]['kws']]
    for h in hs:
        if h not in labels: problems.append(f'EP{ep}: habit label {h!r} not in kws')

# extras lists
for cid in ORDER:
    ch = B[cid]
    ex = {}
    for v in ch['video']:
        if v['meansKind'] == 'extra':
            k = norm(v['term'])
            if k not in ex:
                ex[k] = {'term': v['term'], 'eps': list(v['eps']), **({'note': v['note']} if v.get('note') else {}),
                         **({'afterD': v['afterD']} if v.get('afterD') else {})}
            else:
                ex[k]['eps'] = sorted(set(ex[k]['eps']) | set(v['eps']))
    ch['extras'] = list(ex.values())
    ch['habitLabelsSkipped'] = {str(e): HABIT[e] for e in ch['eps']}

# chip text must fit the maker's 60-character field
for cid in ORDER:
    for b in B[cid]['app']:
        for k in b['keys']:
            if len(k) > 60: problems.append(f'NOTE {cid}/{b["branch"]}: key is {len(k)} chars (> 60, LIMITS.text): {k}')

meta = {
 'what': 'Per-chapter key-word bank for "Check my map". App (Mind Lab TOPICS in mindmap.html) wording is the master. '
         'P4 video wording (eps 1-22: phone mind map in mm/eps.json, the S.mindmap scene in epNb.html, the key-word panel '
         'labels in epN/tl.json) is aligned to it. P3 chapters have app terms only.',
 'built': 'origin/main 67c3545 (mindmap.html TOPICS, misconceptions.js, mixups.js)',
 'meansKind': {'branch': 'an app branch', 'key': 'an app key word (see "under")', 'centre': 'the chapter itself (middle word)',
               'idea': 'the chapter\'s big idea (TOPICS.idea)', 'extra': 'no app equivalent: accept, never hint at it'},
 'partial': 'true = close but not the same idea; credit it, but do not count it as a full match in the "you got right" lines if a better match exists',
 'afterD': 'what the term will mean once step (d) adds "Heat is a form of energy" to the Heat poster',
 'detect': 'a phrase, matched on WHOLE WORDS after normalising (see "normalise"). "a && b" = both phrases in the same node, '
           'or in the node plus its branch. "unless": skip if any of these is in the same node (or its branch). '
           '"inBranch": only test sub-branches of a branch that matches that app branch.',
 'normalise': 'lower-case; FIRST arrows ➜ → -> => ➡ ⟶ ⇒ -> " to " (➜ and ➡ are in emoji ranges); then drop emoji (keep ✓ ✗ ≠); '
              '"&" -> "and"; other punctuation (= : · + , . ( ) \' etc.) -> space; collapse spaces; simple plural on both sides '
              '(-ies -> y; -ses/-xes/-zes/-ches/-shes -> drop "es"; else drop a final s, not ss). Reference: kwbank_selftest.py norm().',
 'matchOrder': 'for each pupil node: (1) exact video term / raw (normalised) of this chapter; (2) app keys and keyAliases of the branch '
               'the node sits under; (3) the longest alias anywhere in the chapter. Several app terms can share a short alias '
               '("temperature", "volume ✓", "shape ✗"), so the longest / in-branch match wins.',
 'proposed': 'heat > "Heat is a form of energy" is NOT on the poster yet (step d). Do not hint at it before the poster has it.',
}
out = {'_meta': meta, **{cid: B[cid] for cid in ORDER}}
json.dump(out, open(SP + '/kwbank_draft.json', 'w'), ensure_ascii=False, indent=1)
print('\n'.join(problems) if problems else 'all checks passed')
print('video entries:', {c: len(B[c]['video']) for c in ORDER})
