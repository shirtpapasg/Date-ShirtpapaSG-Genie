// sound.js: the soundtrack of promo film 4, made in code (the explained2 audio kit: explained2/ep20/audio), timed from tl.json.
//   node sound.js  -> out/mix.wav (48 kHz stereo, about -16 LUFS integrated)
// A music bed in six moods (the Station theme; the mystery; the quiz's build and its answer; the happy earning bounce; the Versus drive;
// the Station theme again, triumphant), ducked under the voices; foley on the marks; the voices (voice/<id>.wav) on their lines.
const path = require('path'), fs = require('fs');
const AU = path.join(__dirname, '..', '..', 'explained2', 'ep20', 'audio');
const { SR, Bus, reverb } = require(path.join(AU, 'dsp.js'));
const I = require(path.join(AU, 'instruments.js'));
const { master, duck, loadAudio, writeWav, highpass, lufs } = require(path.join(AU, 'mix.js'));
const TL = JSON.parse(fs.readFileSync(path.join(__dirname, 'tl.json')));
const END = TL.END + .2, N = Math.ceil(END * SR), MK = TL.marks, LT = (id) => TL.lines[id].t, LE = (id) => TL.lines[id].end, SCN = {}; TL.scenes.forEach((s) => SCN[s.name] = s);
const W = (id, w) => { const x = TL.lines[id].words.find((q) => q.w.toLowerCase().replace(/[^a-z]/g, '') === w); return x ? x.a : LT(id); };
const music = new Bus(N), sfx = new Bus(N), vox = new Bus(N);
const add = (bus, b, t, g = 1, pan = 0) => { if (!b) return; if (b.L) bus.addStereo(b.L, b.R, t, g); else bus.addMono(b, t, g, pan); };
const m2 = (n) => n;   // midi numbers as written

/* ---------- the music ---------- */
const BPM = 100, BEAT = 60 / BPM, BAR = BEAT * 4;
// chords as midi triads (root position + octave doubling where it helps)
const CH = { F: [53, 57, 60], Am: [57, 60, 64], Bb: [58, 62, 65], C: [60, 64, 67], Dm: [50, 53, 57], Gm: [55, 58, 62], A: [57, 61, 64], Eb: [51, 55, 58], G: [55, 59, 62], Csus: [60, 65, 67] };
function pad(t0, t1, prog, g = .16, o = {}) { let i = 0; for (let t = t0; t < t1 - .05; t += BAR, i++) { const c = CH[prog[i % prog.length]], d = Math.min(BAR, t1 - t);
  for (const n of c) add(music, I.padNote(n, d, { cutoff: o.cut || 1400, attack: .5, release: 1.0 }), t, g / c.length); add(music, I.bass(c[0] - 12, d * .95, { bright: .4 }), t, g * .55); } }
function arp(t0, t1, prog, g = .09, o = {}) { let i = 0; for (let t = t0; t < t1 - .05; t += BAR, i++) { const c = CH[prog[i % prog.length]], seq = [0, 1, 2, 1, 0, 2, 1, 2];
  for (let k = 0; k < 8; k++) { const tt = t + k * BEAT / 2; if (tt >= t1) break; const n = c[seq[k]] + 12 + (k === 6 ? 12 : 0); add(music, o.inst === 'marimba' ? I.marimba(n) : o.inst === 'pluck' ? I.pluck(n, { decay: .22 }) : I.musicBox(n, { decay: 1.0 }), tt, g, (k % 2 ? .35 : -.35)); } } }
function drums(t0, t1, g = .3, o = {}) { for (let t = t0; t < t1 - .02; t += BAR) for (let b = 0; b < 4; b++) { const tb = t + b * BEAT; if (tb >= t1) break;
  if (b === 0 || b === 2 || o.four) add(music, I.kick({ punch: .9 }), tb, g); if (b === 1 || b === 3) add(music, I.clap(), tb, g * .55, .1);
  for (let h = 0; h < 2; h++) add(music, I.hat(false, 5 + b * 2 + h), tb + h * BEAT / 2, g * .22, .3); if (o.shaker) add(music, I.shaker(.6), tb + BEAT * .75, g * .3, -.3); } }
function melody(t0, notes, g = .1, inst = 'bell') { for (const [beat, n, d] of notes) { const t = t0 + beat * BEAT;
  add(music, inst === 'brass' ? I.brassNote(n, d * BEAT, { stab: d < .6 }) : inst === 'strings' ? I.strings(n, d * BEAT, { attack: .08 }) : I.epiano(n, d * BEAT), t, g); } }
const S = (n) => SCN[n];
// 1 the Station (F major, music box sparkle over a warm pad)
pad(0, S('station').t1, ['F', 'Am', 'Bb', 'C'], .2); arp(.4, S('station').t1, ['F', 'Am', 'Bb', 'C'], .07);
melody(1.2, [[0, 72, 1.5], [1.5, 74, .5], [2, 77, 2], [4, 76, 1], [5, 74, 1], [6, 72, 2]], .055);
// 2 the mystery (D minor, sparse pizzicato and a low pad)
{ const a = S('mystery').t0, b = S('mystery').t1; pad(a, b, ['Dm', 'Bb', 'Gm', 'A'], .15, { cut: 900 });
  for (let t = a + BEAT; t < b - .2; t += BEAT) { const k = Math.round((t - a) / BEAT); if (k % 2) continue; const c = CH[['Dm', 'Bb', 'Gm', 'A'][Math.floor((t - a) / BAR) % 4]]; add(music, I.pizz(c[k % 3] + 12), t, .1, k % 4 ? .3 : -.3); } }
// 3 the quiz: a ticking build to TAP TO BEGIN, a held breath, then the answer's bright F major
{ const a = S('quiz').t0, tp = MK.tap, pk = MK.pick, b = S('quiz').t1; pad(a, tp, ['Dm', 'Bb', 'C', 'A'], .13, { cut: 1100 });
  for (let t = a; t < pk; t += BEAT / 2) add(music, I.woodTick(1 + .1 * ((t - a) / (pk - a))), t, .08 * (.5 + .5 * (t - a) / (pk - a)), .2);
  for (let t = tp; t < pk; t += BEAT) add(music, I.bass(38, BEAT * .8, { bright: .7 }), t, .12);
  add(music, I.noiseSweep(pk - tp, 300, 4000, { q: 1.5, shape: (x) => x * x }), tp, .05);
  pad(MK.tick, b, ['F', 'C', 'Bb', 'F'], .18); arp(MK.tick, b, ['F', 'C', 'Bb', 'F'], .06, { inst: 'pluck' }); }
// 4-6 earning, the shop, the dressing room: a happy bounce (F major, marimba, light drums)
{ const a = S('days').t0, b = S('games').t0; const prog = ['F', 'Dm', 'Bb', 'C']; pad(a, b, prog, .12); arp(a, b, prog, .08, { inst: 'marimba' }); drums(a, b, .2, { shaker: true });
  for (let t = a, i = 0; t < b - .05; t += BAR, i++) for (let k = 0; k < 4; k++) add(music, I.bass(CH[prog[i % 4]][0] - 12 + (k === 3 ? 7 : 0), BEAT * .7, { bright: .8 }), t + k * BEAT, .1); }
// 7-8 into the games and Versus: driving drums, a supersaw stab, a brass fanfare at the win
{ const a = S('games').t0, b = S('end').t0, prog = ['Dm', 'Bb', 'F', 'C']; drums(a, b, .26, { four: true });
  for (let t = a, i = 0; t < b - .05; t += BAR, i++) { const c = CH[prog[i % 4]]; for (let k = 0; k < 8; k++) add(music, I.bass808(c[0] - 12, BEAT * .4), t + k * BEAT / 2, .09);
    for (const n of c) add(music, I.supersaw(n + 12, BEAT * .3, { cutoff: 3000 }), t, .035); add(music, I.supersaw(c[2] + 12, BEAT * .3, { cutoff: 3000 }), t + BEAT * 2.5, .03); }
  pad(a, b, prog, .08); const w = MK.win; melody(w, [[0, 65, .5], [.5, 69, .5], [1, 72, 1], [2, 77, 2.5]], .16, 'brass'); add(music, I.crash(), w, .18); }
// 9 the end: the Station theme, triumphant, then a long final chord
{ const a = S('end').t0, b = TL.END; const prog = ['F', 'Am', 'Bb', 'C']; pad(a, MK.logo, prog, .17); arp(a, MK.logo, prog, .07); drums(a, MK.logo, .22, { shaker: true });
  melody(a + .2, [[0, 72, 1], [1, 74, 1], [2, 77, 2], [4, 79, 1], [5, 77, 1], [6, 81, 2], [8, 79, 1], [9, 77, 1], [10, 76, 1], [11, 77, 2]], .07, 'strings');
  for (const n of [41, 53, 57, 60, 65, 69, 72]) add(music, I.padNote(n, b - MK.logo - 1, { cutoff: 2400, attack: .3, release: 2.5 }), MK.logo, .05);
  add(music, I.strings(77, b - MK.logo - 1.5, { attack: .4 }), MK.logo + .2, .05); add(music, I.crash(), MK.logo, .14); }
// the music fades in at the very start and out over the last two seconds
music.applyGain((t) => Math.min(1, t / .6) * (t > END - 2.4 ? Math.max(0, (END - .2 - t) / 2.2) : 1));

/* ---------- the foley ---------- */
const ding = (t, g = .2, base = 84) => { add(sfx, I.bell(440 * Math.pow(2, (base - 69) / 12), .35, 1.2, 2), t, g); add(sfx, I.bell(440 * Math.pow(2, (base + 4 - 69) / 12), .4, 1.2, 2), t + .09, g); };
const chime = (t, g = .1) => [84, 88, 91, 96].forEach((n, i) => add(sfx, I.musicBox(n, { decay: .8 }), t + i * .06, g, (i - 1.5) * .3));
const pops = (t, g = .15, p = 1800) => add(sfx, I.pop(p), t, g);
const whoosh = (t, d = .5, g = .12, up = true) => add(sfx, I.noiseSweep(d, up ? 400 : 3000, up ? 3500 : 300, { q: .9 }), t, g);
// 1-2 the train arrives and stops; the door chime and slide; footsteps; the grey reveal; the dark shop
add(sfx, I.noiseSweep(2.2, 200, 900, { q: .6, pink: true, shape: (x) => Math.sin(Math.PI * Math.min(1, x * 1.2)) }), MK.trainIn, .16);
add(sfx, I.noiseSweep(.7, 2600, 1200, { q: 2.5, shape: (x) => 1 - x }), MK.trainStop - .5, .05);
ding(MK.doors - .3, .09, 79); add(sfx, I.noiseSweep(.5, 900, 500, { q: 1 }), MK.doors, .1);
for (let k = 0; k < 4; k++) add(sfx, I.woodTick(.7), MK.stepOut + .1 + k * .33, .05, .2);
add(sfx, I.bwomp(), LT('m01') + .1, .08);
add(sfx, I.subBoom(1.4, 60, 30), W('b01', 'dark'), .12);
chime(W('h02', 'earned'), .06);
// 3 the quiz: cards pop, TAP, the tap, the magnet, the tick, the coins
for (let i = 0; i < 3; i++) pops(MK.cards + i * .18, .12, 1500 + i * 300);
whoosh(MK.tap - .2, .5, .1); add(sfx, I.tvClick(), MK.pick, .2); pops(MK.pick + .02, .14, 2400);
add(sfx, I.boing(), MK.tick - .25, .1); add(sfx, I.glass(3), MK.tick, .08); ding(MK.tick, .14, 84); chime(MK.tick + .1, .07);
for (let i = 0; i < 10; i++) add(sfx, I.ting(91 + (i % 3) * 2, { gap: .06 }), MK.coins + .35 + i * .07, .05, (i % 2 ? .3 : -.3));
// 4 day by day: a soft whoosh per day, a coin ping each time the till fills
{ const a = SCN.days.t0, D = SCN.days.t1 - a; whoosh(a, .6, .08); whoosh(a + D * .5, .6, .08);
  for (const e of [.12, .3, .58, .78]) { for (let i = 0; i < 4; i++) add(sfx, I.ting(93, { gap: .05 }), a + e * D + .1 + i * .07, .045); ding(a + e * D + .5, .07, 91); } }
// 5 the Gift Shop: the lights flicker on, the screen rises, the tap, ka-ching
{ const on = MK.shopOn; for (let i = 0; i < 4; i++) add(sfx, I.tvClick(), on + .05 + i * .08, .06); chime(on + .45, .09); whoosh(on + .95, .4, .08);
  add(sfx, I.tvClick(), MK.bought - .45, .18); ding(MK.bought, .16, 88); for (let i = 0; i < 8; i++) add(sfx, I.ting(96, { gap: .04 }), MK.bought + .05 + i * .05, .05); }
// 5b the legendary looks (v3): the marquee sparkle, the curtains' swish, snow sparkles and sleigh-bell-like glints for Winter Wonderland,
// a whoosh as the stage turns, then the Rocket Pack's ignition rumble and a rising shimmer for the Space Explorer
{ const tl = W('h08', 'legendary'), tw = W('h08', 'winter'), to = W('h08', 'or'), tr = W('h08', 'rocket');
  whoosh(SCN.legend.t0, .45, .08, false);
  chime(tl - .15, .1); for (let i = 0; i < 8; i++) add(sfx, I.ting(96 + (i % 4) * 2, { gap: .05 }), tl - .1 + i * .045, .045, (i % 2 ? .4 : -.4));
  add(sfx, I.noiseSweep(.8, 1800, 500, { q: .7, pink: true, shape: (x) => Math.sin(Math.PI * x) }), tl + .25, .07);   // the curtains open
  for (let i = 0; i < 14; i++) add(sfx, I.ting(98 + [0, 3, 7, 10][i % 4], { gap: .05 }), tw - .2 + i * .11, .03 + .015 * (i % 3), (i % 2 ? .5 : -.5));   // snow sparkles
  [84, 88, 91, 96, 100].forEach((n, i) => add(sfx, I.musicBox(n, { decay: 1.2 }), tw + .05 + i * .09, .07, (i - 2) * .25));
  whoosh(to - .25, .55, .14, true); add(sfx, I.noiseSweep(.5, 3000, 400, { q: .9 }), to + .2, .06);
  add(sfx, I.noiseSweep(1.6, 120, 520, { q: .5, pink: true, shape: (x) => Math.min(1, x * 4) * (1 - x * .5) }), tr - .1, .12); add(sfx, I.subBoom(1.0, 70, 40), tr, .08);
  for (let i = 0; i < 6; i++) add(sfx, I.musicBox(79 + i * 4, { decay: .7 }), tr + .2 + i * .07, .05, (i - 2.5) * .2); }
// 6 the Dressing Room: colours swirl in, the goggles unlock, the spin
{ const tc = W('b03', 'colours'), ty = W('b03', 'yours'), tsp = W('h05', 'spin'); add(sfx, I.noiseSweep(.9, 600, 6000, { q: 2 }), tc, .07); chime(tc + .2, .07);
  pops(ty, .16, 2200); ding(ty + .05, .14, 88); chime(ty + .15, .08); whoosh(tsp, 1.6, .07); add(sfx, I.boing(), W('h05', 'take') + .1, .06); }
// 7 the games: footsteps, the hero shine
{ const a = SCN.games.t0; for (let k = 0; k < 5; k++) add(sfx, I.woodTick(.8), a + .1 + k * .3, .06, -.3); chime(a + 1.6, .09); whoosh(a, .4, .08); }
// 8 Versus: whoosh in, the motors, Pip's buzzer, your clank and ding, the win
{ const a = SCN.versus.t0; whoosh(a, .5, .1); whoosh(a + 2.4, .45, .1); pops(MK.question, .12, 1400);
  add(sfx, I.noiseSweep(1.4, 180, 260, { q: 4, shape: (x) => Math.sin(Math.PI * x) }), MK.drop, .06);
  add(sfx, I.pulse(43, .35, { duty: .5 }), MK.pipGrab + .35, .06); add(sfx, I.pulse(41, .4, { duty: .5 }), MK.pipGrab + .5, .06);
  add(sfx, I.thwack(), MK.youGrab, .06); ding(MK.youGrab + .35, .15, 88); chime(MK.youGrab + .45, .08);
  for (let i = 0; i < 12; i++) pops(MK.win + .1 + i * .09, .06, 1200 + 150 * (i % 5)); pops(LT('m03') - .15, .1, 2000); chime(LT('h06') - .1, .07); }
// 9 the end: fireworks, the three words, the logo shimmer
{ const a = SCN.end.t0 + .2; [[0, 1], [.6, .8], [1.3, 1], [2.0, .7], [2.6, .9], [3.3, .8], [4.0, 1], [4.8, .8], [5.6, .9], [6.3, .7]].forEach(([d, s], i) => { add(sfx, I.launchWhistle(.5, 30 + i), a + d - .55, .035, (i % 2 ? .4 : -.4)); add(sfx, I.fireworkBurst(29 + i, s), a + d, .07, (i % 2 ? .4 : -.4)); });
  for (const id of ['m04', 'b04', 'p05']) pops(LT(id) - .05, .13, 1700); chime(MK.logo, .1); ding(W('h07', 'theoneapp'), .1, 89); }

/* ---------- the voices ---------- */
for (const id of TL.order) { const L = TL.lines[id]; const b = loadAudio(path.join(__dirname, 'voice', id + '.wav')); vox.addStereo(b.L, b.R, L.t, L.gain || 1); }   // gain: script.py opts (p01, a quieter aside)

/* ---------- the mix ---------- */
const room = new Bus(N); music.mixInto(room, .22); sfx.mixInto(room, .15); const wet = reverb(room, { room: .8 });
duck([music], vox, { depth: .62, release: .3, threshold: .03 });
const out = new Bus(N); music.mixInto(out, 1); wet.mixInto(out, 2.2); sfx.mixInto(out, 1); vox.mixInto(out, 1.55);
highpass(out, 30);
{ const v = new Bus(N); vox.mixInto(v, 1.55); const m = new Bus(N); music.mixInto(m, 1); wet.mixInto(m, 2.2); const f = new Bus(N); sfx.mixInto(f, 1); console.log('stems LUFS (before master): voices', lufs(v).toFixed(1), 'music', lufs(m).toFixed(1), 'sfx', lufs(f).toFixed(1)); }
const r = master(out, .8, .84, { lufs: -16 }); console.log('master', r);
writeWav(path.join(__dirname, 'out', 'mix.wav'), out); console.log('out/mix.wav', (N / SR).toFixed(2), 's');
