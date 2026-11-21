# ep10/set_sfx.py: writes the sound cues of EP10 into ep10_segments.json (only "sfx"; the narration text is never touched)
import json
F = 'ep10/ep10_segments.json'; d = json.load(open(F))
SFX = {
 'h0': [['ep07_birds', 0], ['footsteps', .1], ['footsteps', 1.1], ['pop', 2.05], ['ep08_nibble', 3.22], ['thud', 3.25], ['thud', 3.75], ['jiggle', 3.95], ['stinger', 3.98]],
 'hook': [['sparkle', 3.5], ['chime', 3.6], ['reveal', 4.5], ['pop', 6.1]],
 'answer': [['ep09_buzz', 2.0], ['ding', 7.4], ['ep09_zip', 10.0], ['buzz', 12.6]],
 'c1': [['pad_wonder', 0], ['whoosh', .5], ['pass_by', 1.0], ['deep', 1.3], ['bubble', 1.6], ['pop', 2.3], ['sparkle', 2.4]],
 'c2': [['ep08_scuttle', .2], ['bubble', .6], ['pop', .9], ['bubble', 1.2], ['pop', 1.4], ['ep03_crunch', 1.7], ['ep08_nibble', 2.2], ['pass_by', 2.6], ['thud', 3.5], ['pad_wonder', 4.0], ['ep05_leaf', 4.2], ['pop', 4.25], ['sparkle', 4.6]],
 'c3': [['ep08_scuttle', .5], ['ep03_slide', 1.0], ['whoosh', 1.7], ['thud', 2.85], ['ep06_plop', 3.55], ['ep06_plop', 3.95], ['ep06_plop', 4.35], ['ep06_plop', 4.75], ['hiss', 4.0], ['ep06_squish', 4.4], ['bubble', 4.9], ['chime', 5.0]],
 'c4': [['ep08_ff', .2], ['pad_wonder', .7]] + [['ep09_tick', .15 + .2 * i] for i in range(8)] + [['ding', 1.75], ['whoosh', 1.95], ['ep08_scuttle', 2.5], ['rain', 2.6], ['thud', 3.4], ['sparkle', 3.7]],
 'c5': [['drip', .0], ['splash', .5], ['bubble', .95], ['ep06_slurp', 1.6], ['ep07_squish', 2.05], ['pipe_rush', 2.6], ['pass_by', 3.0], ['pass_by', 3.4], ['flash', 3.85], ['pad_wonder', 4.0], ['chime', 4.2], ['sparkle', 4.5]],
 'c6': [['ep08_hop', .2]] + [['ep08_nibble', .62 + .6 * i] for i in range(4)] + [['ep06_chomp', 2.8], ['ep05_gulp', 3.0], ['reveal', 3.5], ['ep08_hop', 4.1], ['sparkle', 4.2]],
 'c7': [['pad_wonder', 1.5], ['pop', .55], ['pop', 1.35], ['pop', 2.15], ['pop', 2.95], ['pop', 3.75], ['chime', 4.5], ['sparkle', 5.0]],
 'news': [['ep06_clink', 2.9], ['thud', 3.9], ['stinger', 4.5], ['pop', 8.9], ['chime', 9.3], ['roar', 12.4]],
 'n1': [['pop', 3.6], ['pop', 5.7], ['pop', 8.2], ['pop', 9.4], ['pop', 13.0], ['pop', 15.9], ['pop', 17.5], ['chime', 20.1]],
 'textbook': [['pop', 5.0], ['pop', 5.8], ['pop', 7.1], ['pop', 8.8], ['chime', 12.3], ['pad_tension', 14.2], ['thud', 16.4]],
 'helpers': [['pop', 2.2], ['pop', 2.55], ['pop', 3.4], ['pop', 4.2], ['pop', 5.0], ['ep08_nibble', 9.2], ['ep08_nibble', 10.2], ['buzz', 14.9], ['chime', 16.4]],
 'security': [['ep07_birds', 0], ['pop', 5.5], ['pop', 6.1], ['pop', 8.6], ['pop', 9.2], ['buzz', 10.6], ['sparkle', 12.4], ['ep05_horn', 12.7]],
 'semakau': [['pop', .1], ['pop', 1.4], ['ep06_plop', 3.6], ['ep03_clink', 5.4], ['ding', 6.5], ['ep05_horn', 10.3], ['sea_wash', 10.3], ['ping', 10.9], ['reveal', 13.8]],
 'habit': [['pop', 2.6], ['ep06_plop', 4.0], ['ep06_plop', 4.6], ['pop', 7.15], ['pop', 8.15], ['pop', 8.85], ['pop', 10.2], ['chime', 10.6]],
 'try': [['pop', 1.6], ['thud', 3.1], ['ep05_leaf', 4.7], ['thud', 5.8], ['hiss', 6.9], ['ep08_scuttle', 7.7], ['ep09_tick', 9.6], ['ep09_tick', 9.8], ['ep09_tick', 10.0], ['sparkle', 11.2], ['buzz', 15.0]],
 'think': [['hiss', 2.6], ['reveal', 3.0]],
}
for s in d['segments']:
    if s['id'] in SFX: s['sfx'] = [[n, round(t, 2)] for n, t in SFX[s['id']]]
json.dump(d, open(F, 'w'), indent=1, ensure_ascii=False)
