# Writes kwbank_draft.md (readable tables) from kwbank_draft.json.
import json
SP = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad'
D = json.load(open(SP + '/kwbank_draft.json'))
ORDER = [k for k in D if not k.startswith('_')]

MISMATCH = {
 'plants': [
  'Key words are short verbs in the videos, full jobs in the app: "anchor" = Hold the plant firmly to the ground; "absorb" = Absorb water and dissolved mineral salts; "holds upright" = Hold the plant upright to get light; "transports" = Transport food, water and mineral salts…; "gases in & out" = Take in and give out gases.',
  'Middle word: EP4 "PLANT PARTS" and EP1 "SYSTEM" vs the app\'s "Plant System". EP4 also says "STEMS" (plural) for the app\'s "Stem".',
  'EP1 maps BIKE / BODY / TREE. Only TREE > roots, leaves fits this chapter. BIKE (pedals, chain) and BODY (lungs, heart) are extras.',
  'EP3 is a map of one LEAF: 4 PARTS (blade, stalk, main vein, smaller veins), 2 VEIN PATTERNS (parallel, net), DIFFERENCES (edge, shape, colour, texture). The app has none of it, so all extras.',
  'EP4 adaptations are all extras: spines (cactus), woody / non-woody, climbing, creepers, storage roots, roots in water, stores water, green stem makes food, stem cutting.',
  'App key "Transport food, water and mineral salts to different parts of the plant" is 71 characters. The maker allows 60, so the chip needs the short text "Transport food, water and mineral salts" (keyShort).',
 ],
 'digestive': [
  'EP5 middle word is "HUMAN BODY SYSTEMS" with five branches. Only DIGESTIVE fits this chapter. RESPIRATORY and CIRCULATORY belong to the P5 Circulatory System poster (respcirc). SKELETAL and MUSCULAR have no poster. All are extras here.',
  'Mouth: video gives PARTS ("teeth · saliva · tongue"); the app gives JOBS ("Breaks food into smaller pieces", "Mixes food with digestive juice"). Teeth and saliva map; tongue is extra.',
  'Stomach: video "mixes with juices"; the app says "Churns the food up" and "Breaks food down into simpler substances". "Simpler substances" is only in the EP6 key-word panel. "Mixes … juice" is the app\'s MOUTH wording, so the match must be scoped to the branch.',
  'Small intestine: "digestion ends" = "Digestion is completed here"; "into blood" = "Digested food is absorbed into the blood". Same meaning, different words.',
  'Large intestine: the video says "absorbs water" but leaves out "from undigested food", which is an exam point (mixups.digestive#53). "Waste leaves the body" is not in any video map; the nearest is the key word RECTUM + ANUS.',
  'EP6 stops at the stomach on purpose (Part 1). Only EP7 has all five parts.',
 ],
 'matter': [
  'The structure is different. The video branches HAS MASS and TAKES UP SPACE are app KEY WORDS ("Mass", "Volume") under the app branch "All matter has". The words "All matter has" are never used in a video.',
  'EP9 uses ✓/✗ shorthand ("shape ✓ volume ✓", "shape ✗ volume ✓", "shape ✗ volume ✗") and says "definite" where the app says "Fixed". Liquid "shape ✗" = "Takes the shape of its container". The Gas key "Fills up the whole container" is never shown in a video.',
  'The app branch "Changing state" (Gains heat / Loses heat) is in no Matter video. Change of state only appears in Heat EP22.',
  'Video extras with no app term: NOT MATTER (light, shadow, heat, sound); units (kg, g, cm³, ml); the electronic balance and its rules; the measuring cylinder and eye level; squeeze / compressed; helium; the EP12 branch HOW SCIENTISTS INVESTIGATE (hypothesis, fair test, change 1 variable, measure).',
  'Middle word: EP9 "STATES OF MATTER" vs "Matter".',
  'Detection caution: the word "heat" under NOT MATTER (EP8) must not earn credit for Changing state > Gains heat.',
 ],
 'light': [
  'Light SOURCES (NATURAL SOURCES / MAN-MADE SOURCES: Sun, stars, lightning, fireflies, jellyfish, glow-worms, bulbs, candles, torches, fireworks) is a branch in all five Light videos. The Light poster has no sources branch, so all extras.',
  'The videos have no "Light travels" branch. "light travels in STRAIGHT lines" sits UNDER SHADOWS, and only in the EP15 scene, not in the phone map.',
  'The videos have no "Reflection" branch. "reflected from objects" sits UNDER HOW WE SEE. "Mirrors reflect best" is never shown. "No light means no seeing" is never shown in a map.',
  'Shadows: "opaque ➜ dark shadow" ≈ "Light is blocked". "translucent ➜ less dark" is extra. Size: the video gives two rules (nearer the light ➜ bigger; further from the screen ➜ bigger); the app gives only "Nearer the light, bigger the shadow". Shape: the video says "the part facing the light"; the app says "Same shape as the object". Outdoor shadows (longest morning + evening, shortest noon) are extra.',
  'The videos add sub-branch headings (SHADOW SIZE, SHADOW SHAPE, OUTDOOR SHADOWS), which makes a 3-level map. The app has these ideas as key words.',
 ],
 'heat': [
  'Branches: the videos use TEMPERATURE / HEAT (energy) / HEAT FLOW / CONDUCTORS / EFFECTS OF HEAT. The app uses Heat flows / Temperature / Good conductors of heat / Poor conductors of heat / Gaining or losing heat.',
  'HEAT (energy) / "a form of ENERGY" (EP19-22) has no app branch. It is an extra until step (d) adds "Heat is a form of energy" (afterD).',
  '"gain heat ➜ temperature rises", "lose heat ➜ temperature falls" (EP19) and "temperature change" (EP22): the app\'s Gaining or losing heat keys are only expand / contract / change state, so a temperature change is not an app key. These fit the proposed (d) branch.',
  'CONDUCTORS is one video branch ("good: metals", "poor: glass · plastic · wood · air"). The app has two branches, and the video leaves out "of heat" (mixups.heat#6 wording tip). "Heat travels through them quickly / slowly" is never shown. Glass and polystyrene are extras (they are poor conductors, but not app words).',
  'Temperature: the video map shows "measured in °C", "thermometer" and three thermometer types. The definition appears only in the EP19 key-word panel ("TEMP: HOW HOT OR COLD"). App: "How hot or cold something is" (step d changes it to "an object is") and "Measured with a thermometer". °C, the thermometer types, bulb fully in and the data logger are extras.',
  'Heat flow: "hot ➜ cold" and "stops when temperatures are equal" vs "From hotter to colder" and "Until both are the same temperature". Same meaning, different words. Sources of heat (Sun, Earth) is extra, and only in the scene and narration.',
  'EFFECTS OF HEAT = "Gaining or losing heat". "expansion + contraction" = "Expands when heated" + "Contracts when cooled". "change of state" = "Can change state".',
 ],
}
FLAGS = [
 '**Possible factual issue (Light poster), not changed:** Shadows key "Same shape as the object". EP17 teaches, correctly, that the shape depends on the part of the object facing the light: a cone can cast a triangle or a circle. A safer wording would be along the lines of "Shape of the side facing the light". This is for a reviewer or the teacher to decide.',
 '**Definition rule, outside the posters (needs the teacher\'s approval to change):** in mixups.js, the heat card #3 "ok" text says "Temperature is a measure of how hot something is." In misconceptions.js, M-03 "wrong" says "temperature measures how hot or cold something is". After step (d) the poster says "how hot or cold an object is". mixups.js may only change with the teacher\'s approval, and misconceptions.js feeds the marking prompt, so neither was touched.',
 '**Step (d) layout:** the poster draws 6 branches already (Electrical System and Forces have 6), so a 6th Heat branch "Heat is a form of energy" fits. The bank carries it as `proposed:true`, with suggested key words "Gain heat: temperature rises" / "Lose heat: temperature falls". These match EP19. Adjust them if (d) lands with different words.',
 '**Coverage gap, not an error:** the Light poster has no light-sources branch (natural / man-made), but it is P4 syllabus and in every Light video (EP13-17). Left alone, as agreed. Sources are accepted as extras.',
 '**Chip length:** one app key is longer than the maker\'s 60-character field (Plant System > Stem, 71 characters). `keyShort` gives "Transport food, water and mineral salts".',
 '**Mix-up candidates that are NOT in misconceptions.js / mixups.js** (in `mixupCandidates`, off by default): matter "light / heat / sound is matter" (EP8); light "the Moon is a source of light" (EP14 exam box); living "a car is living because it moves" (TOPICS outcome).',
]

def esc(s): return str(s).replace('|', '\\|').replace('\n', ' ')
def ad(a): return a['branch'] + (' > ' + a['key'] if a.get('key') else '')
L = []
w = L.append
m = D['_meta']
w('# Key-word bank (draft): "Check my map"\n')
w('App wording (Mind Lab `TOPICS` in mindmap.html, origin/main 67c3545) is the **master**. The P4 video wording is aligned to it. '
  'Sources for each episode N: the phone mind map (`mm/eps.json`), the `S.mindmap` scene (`epN/epNb.html`) and the key-word panel labels (`epN/tl.json` kws). '
  'P3 chapters list app terms only. Machine-readable copy: `kwbank_draft.json` (built by `kwbank_build.py`, checked by `kwbank_selftest.py`).\n')
w('**Checks run:** every phone-map label and every key-word-panel label in EP1-22 is aligned or listed as a habit label. '
  'Every `means` is a real app term. App branches and keys equal TOPICS, except the step (d) change. No mix-up fires on any app term, app alias or video term, apart from the intended "of heat" wording nudges. Every mix-up fires on a plain-language example. Correct look-alikes do not fire ("cold doesn\'t flow", "unlike poles attract", "further from screen ➜ bigger", "shape ≠ mass").\n')
w('## Conventions\n')
for k in ['meansKind', 'partial', 'afterD', 'detect', 'normalise', 'matchOrder', 'proposed']:
    v = m[k]
    w(f'- **{k}**: ' + (', '.join(f'`{a}` = {b}' for a, b in v.items()) if isinstance(v, dict) else esc(v)))
w('- JSON per chapter: `app:[{branch, keys, aliases, keyAliases, rank, hint, proposed?, keyShort?, changed?}]`, '
  '`video:[{ep, eps, term, type:"branch"|"keyword", means, meansKind, under?, videoParent?, meansAll?, partial?, afterD?, note?, src, raw[], chip?}]`, '
  '`videoCentre:[…same…]`, `centreAliases`, `extras:[{term, eps, note?}]`, `mixups:[{detect[], say, src, kind:"mixup"|"wording", unless?, inBranch?, note?}]`, '
  '`mixupsSkipped`, `mixupCandidates?`, `habitLabelsSkipped`. The top-level `_meta` key holds these notes. Skip keys starting with "_", as mixups.js does with `_exp`.\n')

w('## Summary\n')
w('| Chapter | Level | Episodes | App branches | Video terms aligned | Extras | Mix-ups (+ candidates) |')
w('|---|---|---|---|---|---|---|')
for c in ORDER:
    ch = D[c]
    al = sum(1 for v in ch['video'] if v['meansKind'] != 'extra')
    w(f"| {c} ({ch['title']}) | {ch['lv']} | {', '.join(map(str, ch['eps'])) or '-'} | {len(ch['app'])}"
      f"{' (1 proposed)' if any(b.get('proposed') for b in ch['app']) else ''} | {al} | {len(ch['extras'])} | "
      f"{len(ch['mixups'])}{' + ' + str(len(ch.get('mixupCandidates', []))) if ch.get('mixupCandidates') else ''} |")
w('')
w('## Flags for the teacher / reviewer\n')
for f in FLAGS: w('- ' + f)
w('')

for c in ORDER:
    ch = D[c]
    w(f"## {ch['title']} (`{c}`, {ch['lv']})" + (f" | videos EP{ch['eps'][0]}-{ch['eps'][-1]}" if ch['eps'] else ' | no P4 videos (P3: app terms only)') + '\n')
    w(f"Big idea: *{esc(ch['idea'])}*  ·  Middle word accepts: {', '.join(ch['centreAliases'])}\n")
    if c in MISMATCH:
        w('### Mismatches, video vs app\n')
        for x in MISMATCH[c]: w('- ' + x)
        w('')
    w('### App master wording\n')
    w('| Rank | Branch | Key words | Also accepted (branch / keys) | Hint if missing |')
    w('|---|---|---|---|---|')
    for b in sorted(ch['app'], key=lambda b: b['rank']):
        keys = '<br>'.join(esc(k) + (f" *(chip: {esc(b['keyShort'][k])})*" if b.get('keyShort', {}).get(k) else '')
                           + (f" *(was: {esc(b['changed']['from'])})*" if b.get('changed', {}).get('to') == k else '') for k in b['keys'])
        acc = esc(', '.join(b['aliases'])) + '<br>' + '<br>'.join(f"*{esc(k)}*: {esc(', '.join(a))}" for k, a in b['keyAliases'].items() if a)
        w(f"| {b['rank']} | **{esc(b['branch'])}**{' *(proposed, step d)*' if b.get('proposed') else ''} | {keys} | {acc} | {esc(b['hint'])} |")
    w('')
    if ch['video']:
        w('### Video wording that maps to the app\n')
        w('| Ep | Video term | Type | Under (video) | Means (app) | Kind | Note |')
        w('|---|---|---|---|---|---|---|')
        for v in ch['videoCentre'] + ch['video']:
            if v['meansKind'] == 'extra': continue
            mean = ' + '.join(v['meansAll']) if v.get('meansAll') else v['means']
            if v['meansKind'] == 'idea': mean = '(big idea)'
            if v.get('under') and v['meansKind'] == 'key': mean = f"{v['under']} > {mean}"
            eps = ','.join(map(str, v['eps']))
            note = (('≈ partial. ' if v.get('partial') else '') + (f"After (d): {ad(v['afterD'])}. " if v.get('afterD') else '') + v.get('note', ''))
            w(f"| {eps} | {esc(v['term'])} | {v['type']} | {esc(v.get('videoParent', ''))} | {esc(mean)} | {v['meansKind']} | {esc(note)} |")
        w('')
        w('### Extras: video terms with no app equivalent (accept them; never hint at them)\n')
        w('| Ep(s) | Term | Note |')
        w('|---|---|---|')
        for e in ch['extras']:
            note = (f"After (d): {ad(e['afterD'])}. " if e.get('afterD') else '') + e.get('note', '')
            w(f"| {','.join(map(str, e['eps']))} | {esc(e['term'])} | {esc(note)} |")
        w('')
        hs = '; '.join(f"EP{k}: {', '.join(v)}" for k, v in ch['habitLabelsSkipped'].items())
        w(f'Habit / channel labels in the key-word panels (not science, left out of the bank): {hs}\n')
    w('### Mix-ups (friendly flag; positive "Exam tip" wording)\n')
    w('| Source | Kind | Detect (whole words, normalised) | Unless | Only in branch | Say |')
    w('|---|---|---|---|---|---|')
    for x in ch['mixups']:
        w(f"| {esc(x['src'])} | {x['kind']} | {esc('; '.join(x['detect']))} | {esc('; '.join(x.get('unless', [])))} | {esc(x.get('inBranch', ''))} | {esc(x['say'])} |")
    w('')
    if ch.get('mixupCandidates'):
        w('Candidates, **not in misconceptions.js / mixups.js** (need the teacher\'s approval):\n')
        for x in ch['mixupCandidates']:
            w(f"- detect: {esc('; '.join(x['detect']))}; say: {esc(x['say'])} *(from {esc(x['src'])})*")
        w('')
    if ch.get('mixupsSkipped'):
        w('Left out (they cannot be detected in a map, or belong to another chapter): ' + '; '.join(ch['mixupsSkipped']) + '\n')

open(SP + '/kwbank_draft.md', 'w').write('\n'.join(L) + '\n')
json.dump({c: MISMATCH.get(c, []) for c in ORDER}, open(SP + '/kwbank_mismatch.json', 'w'), ensure_ascii=False, indent=1)
print('ok', len(L), 'lines')
