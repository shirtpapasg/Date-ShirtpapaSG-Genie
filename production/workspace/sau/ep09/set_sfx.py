# ep09/set_sfx.py: writes the sound cues of EP09 into ep09_segments.json (only "sfx"; the narration text is never touched)
import json
F = 'ep09/ep09_segments.json'; d = json.load(open(F))
SFX = {
 'h0': [['ep09_buzz', .15], ['ep09_zip', 4.22], ['ep09_slap', 4.3], ['thud', 4.32]],
 'hook': [['ep09_buzz', 0], ['stinger', 5.9], ['ep09_swarm', 9.0]],
 'news': [['pop', 2.7], ['pop', 7.5], ['chime', 8.4], ['click', 13.0], ['ep09_swarm', 13.3], ['stinger', 14.5]],
 'm1': [['pad_wonder', 0], ['hum', 0], ['bubble', .7], ['bubble', 1.5], ['reveal', 2.4], ['pop', 2.9], ['pop', 3.1], ['sparkle', 3.4], ['whoosh', 4.5]],
 'm2': [['ep08_birds', 0], ['ep09_wings', .2], ['click', 1.1], ['flash', 1.2], ['ep09_swarm', 1.4], ['pass_by', 2.2], ['chime', 2.4]],
 'm3': [['ep09_wings', 0], ['pass_by', .4], ['pass_by', 1.0], ['pass_by', 1.5], ['pass_by', 1.95], ['whoosh', 2.4], ['pad_wonder', 2.9], ['footsteps', 3.3], ['footsteps', 4.5], ['pass_by', 4.9], ['ding', 3.6]],
 'm4': [['ep09_wings', 0], ['reveal', 2.5], ['pop', 2.7], ['pop', 3.2], ['sparkle', 3.9], ['chime', 3.95]],
 'm5': [['pad_tension', 0], ['ep09_zip', .9], ['thud', 1.6]] + [['ep09_plink', 1.8 + .2 * i] for i in range(6)] + [['ep09_zip', 3.0]] + [['ep09_tick', 3.35 + 1.55 * i / 7] for i in range(7)] + [['boom', 5.02], ['stinger', 5.1]],
 'm6': [['pad_wonder', 0], ['ep07_birds', 0]] + [['pop', 1.0 + .35 * i] for i in range(7)] + [['chime', 2.9], ['sparkle', 3.6]],
 'textbook': [['pop', 8.0], ['pop', 8.5], ['pop', 9.2], ['pop', 9.7], ['bubble', 12.3]],
 'dengue': [['ding', 1.3], ['ep09_zip', 6.9], ['ep09_zip', 8.4]],
 'try': [['splash', 8.6], ['splash', 8.9], ['sparkle', 9.6]],
 'think': [['ep09_swarm', 2.9]],
}
for s in d['segments']:
    if s['id'] in SFX: s['sfx'] = [[n, round(t, 2)] for n, t in SFX[s['id']]]
json.dump(d, open(F, 'w'), indent=1, ensure_ascii=False)
