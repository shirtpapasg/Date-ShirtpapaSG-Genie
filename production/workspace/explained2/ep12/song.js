// song.js: the whole soundtrack of EP12 (EP1's engine, as EP5; EP8 added the canteen ambience, library one-shots; EP10 the sea wash; EP11 the tank's soft bubbles (`tank`); EP12 uses `birds` softly outdoors (the walkway, the car park), `tank` at the aquarium shop, and adds three synth sounds: the mynah's two-note call, a bright metal clang and its long slow-motion ring) -> out/mix.wav. Every sound comes from an event in cues.json (dump_cues.js), every voice line
// from tl.json. Synth = the animation-studio plugin's audio engine (audio/, copied from short1/engine/audio); ambiences from the sau
// sfx library (rain, birds). Sound palette = STYLE_GUIDE section 12.   node song.js
const path = require('path'), fs = require('fs');
const { SR, Bus, reverb } = require('./audio/dsp'); const I = require('./audio/instruments'); const MIX = require('./audio/mix'); const { m } = require('./music');
const PART = process.argv[2] || 1;
const C = JSON.parse(fs.readFileSync(path.join(__dirname, `cues_p${PART}.json`))), TL = JSON.parse(fs.readFileSync(path.join(__dirname, `tl_p${PART}.json`)));
const DUR = C.END + .2, N = Math.ceil(DUR * SR), bus = () => new Bus(N), SFX = path.join(__dirname, '..', '..', 'sau', 'sfx');
const voice = bus(), drums = bus(), bass = bus(), keys = bus(), uke = bus(), pad = bus(), game = bus(), amb = bus(), verb = bus(), calm = bus(), wonder = bus();
const BPM = 104, BEAT = 60 / BPM;
// ---------- voices
for (const id of TL.order) MIX.loadAudio(path.join(__dirname, 'voice', id + '.wav'), { at: TL.lines[id].t, length: DUR }).mixInto(voice, TL.lines[id].who === 'heart' ? 1 : TL.lines[id].who === 'chant' ? (TL.lines[id].gain || .8) : .78);
// ---------- the game bed: marimba, ukulele, claps, in C (short1's theme), only inside the groove regions
const CH = [['C3', ['E4', 'G4', 'C5']], ['A2', ['E4', 'A4', 'C5']], ['F2', ['F4', 'A4', 'C5']], ['G2', ['D4', 'G4', 'B4']]];
const MOTIF = [['E5', 0, 1], ['G5', 1, 1], ['C6', 2, 2], ['A5', 4, 1], ['G5', 5, 1], ['E5', 6, 2]], MOTIF2 = [['D5', 0, 1], ['F5', 1, 1], ['A5', 2, 2], ['G5', 4, 1], ['E5', 5, 1], ['C5', 6, 2]], MOTIF3 = [['C5', 0, 1], ['E5', 2, 1], ['G5', 3, 1], ['E5', 4, 2], ['D5', 6, 2]];
const K = I.kick({ punch: .6, tail: .2 }), CL = I.clap({ decay: .1 }), SH = [I.shaker(.7, 15), I.shaker(1, 16)];
let barN = 0;
if (C.R.outro) C.R.groove.push(C.R.outro);
for (const [a, b] of C.R.groove) for (let t0 = a, bi = 0; t0 + BEAT * 3.2 < b; t0 += BEAT * 4, bi++, barN++) { const [root, chord] = CH[bi % 4];
  for (let s = 0; s < 8; s++) { const t = t0 + s * BEAT / 2; if (t > b - .1) break;
    if (s === 0 || s === 4) drums.addMono(K, t, .5); if (s === 2 || s === 6) { drums.addMono(CL, t, .3); verb.addMono(CL, t, .1); }
    drums.addMono(SH[s % 2], t, s % 2 ? .12 : .07, s % 2 ? .3 : -.3);
    if (s % 2 === 0) bass.addMono(I.pizz(m(root) + (s === 4 ? 7 : s === 6 ? 12 : 0), { seed: s }), t, .5);
    if (s % 2 === 1) chord.forEach((n, i) => uke.addMono(I.guitar(m(n) + 12, .22, { bright: .7, sustain: .985, seed: i + s }), t + i * .012, .16, .25)); }
  const pat = [MOTIF, MOTIF2, MOTIF, MOTIF3][barN % 4]; for (const [n, s, d] of pat) { const t = t0 + s * BEAT / 2; if (t > b - .2) break; const x = I.marimba(m(n), { thock: .25 }); keys.addMono(x, t, .34, -.15); verb.addMono(x, t, .1); } }
// ---------- the calm bed: one soft chord a bar and a music-box note
for (const [a, b] of C.R.calm) for (let t = a, i = 0; t + 1 < b; t += BEAT * 4, i++) { const [root, chord] = CH[[0, 2, 1, 3][i % 4]];
  for (const n of chord) { const { L, R } = I.padNote(m(n), Math.min(BEAT * 3.8, b - t), { cutoff: 900, attack: .5, release: 1.2 }); calm.addStereo(L, R, t, .07); }
  calm.addMono(I.pizz(m(root) + 12, { seed: i }), t, .3); const x = I.musicBox(m(chord[i % 3]) + 12, { decay: 1.2 }); calm.addMono(x, t + BEAT * 2, .12, .2); verb.addMono(x, t + BEAT * 2, .08); }
// ---------- the micro-world: a slow warm pad with soft bell tones, no rhythm
for (const [a, b] of C.R.wonder) { const prog = [['D3', 'A3', 'F#4', 'A4'], ['B2', 'F#3', 'D4', 'A4'], ['G2', 'D3', 'B3', 'G4'], ['A2', 'E3', 'C#4', 'A4']]; const step = 5.6;
  for (let t = a, i = 0; t < b; t += step, i++) { const d = Math.min(step + 1.6, b - t + 1.2); for (const n of prog[i % 4]) { const { L, R } = I.padNote(m(n), d, { cutoff: 700, attack: 1.6, release: 2.2, detune: .16 }); wonder.addStereo(L, R, t, .16); }
    for (let k = 0; k < 3; k++) { const x = I.bell(m(prog[i % 4][3 - (k % 2)]) * 0 + 440 * Math.pow(2, (m(prog[i % 4][2 + (k % 2)]) + 12 - 69) / 12), .9, 1.6, 2.0); wonder.addMono(x, t + 1.2 + k * 1.5, .05, k % 2 ? .4 : -.4); verb.addMono(x, t + 1.2 + k * 1.5, .06); } } }
// ---------- ambiences
const loop = (file, a, b, g, fade = .6) => { const len = { 'rain.wav': 5, 'ep07_birds.wav': 5, 'ep08_birds.wav': 5.6, 'ep05_kids.wav': 4.6, 'sea_wash.wav': 5 }[file]; for (let t = a; t < b; t += len - .15) { const x = MIX.loadAudio(path.join(SFX, file), { at: t, length: DUR }); const i0 = Math.round(a * SR), i1 = Math.round(b * SR);
    for (let i = Math.round(t * SR); i < Math.min(N, Math.round((t + len) * SR)); i++) { const e = Math.min(1, (i - i0) / (fade * SR), (i1 - i) / (fade * SR)); if (e <= 0) continue; amb.L[i] += x.L[i] * g * e; amb.R[i] += x.R[i] * g * e; } } };
for (const [a, b] of C.R.rain) loop('rain.wav', a, b, .5);
for (const [a, b] of C.R.birds) loop('ep08_birds.wav', a, b, .16);   // EP12: softly outdoors (the walkway, the car park)
for (const [a, b] of (C.R.sea || [])) loop('sea_wash.wav', a, b, .14, 1.0);   // EP10: small waves at the beach shelter, East Coast Park
for (const [a, b] of (C.R.tank || [])) for (let t = a + .3, i = 0; t < b - .5; t += 1.3 + .9 * ((i * 7) % 5) / 5, i++) MIX.loadAudio(path.join(SFX, 'bubble.wav'), { at: t, length: DUR }).mixInto(amb, .045 + .02 * (i % 3) / 2);   // EP11: the goldfish tank's soft bubbles (the living room)
for (const [a, b] of (C.R.canteen || [])) loop('ep05_kids.wav', a, b, .1, 1.0);   // EP8: the school canteen at recess, children far away
// ---------- v3 (teacher, 22 Nov: "no sound effects of shoppers, laughter, bells… the quality indeed dipped"): a living place bed under every
// real-place scene, low and ducked under speech, crossfading between places. Walkway: shoppers murmuring, a child's laugh now and then, a
// trolley rattling past, the checkout scanner's beep, the door chime. Aquarium shop: the filter bubbling and its hum. Car park: wind in the
// rain tree, a car passing far off (the birds are the BD regions above). Library sounds only (../../sau/sfx), each loaded once.
{ const LIB = {}, lib = (f) => LIB[f] || (LIB[f] = MIX.loadAudio(path.join(SFX, f), {}));
  const put = (f, t, g, pan = 0) => { const x = lib(f), i0 = Math.round(t * SR), a = (pan + 1) * Math.PI / 4, gl = Math.cos(a) * Math.SQRT2, gr = Math.sin(a) * Math.SQRT2; for (let i = 0; i < x.n && i0 + i < N; i++) { if (i0 + i < 0) continue; amb.L[i0 + i] += x.L[i] * g * gl; amb.R[i0 + i] += x.R[i] * g * gr; } };
  const PL = PART == 1 ? { walk: { cold: 1, board: 1, title: .5, game: .45, trolley: 1, lcjob: .45, things: 1, lcmetal: .45, glass: .8, fabric: 1, metalans: .8, holdon: .35, fishnext: .8, tankrow: .7, waitw: .9, pullout: .8, liz: 1, cliff: .35 }, tank: { fishnext: .6, lctank: 1, tankrow: .8 } }
    : { park: { place: 1, game: .45, boot: 1, lcbottles: .45, bottleans: .8, lccar: .45, waitw: .9, show: .3, fix: .3, board: .3, liz: 1, dare: .5 } };
  const env = (map) => { const e = new Float32Array(N); for (const sc of TL.scenes) { const g = map[sc.name] || 0; if (!g) continue; const i0 = Math.round(sc.t0 * SR), i1 = Math.min(N, Math.round(sc.t1 * SR)); for (let i = i0; i < i1; i++) e[i] = g; }
    const out = new Float32Array(N), w = Math.round(.6 * SR); let acc = 0; for (let i = 0; i < N; i++) { acc += e[i] - (i - w >= 0 ? e[i - w] : 0); out[i] = acc / w; } return out; };   // a 0.6 s crossfade between places
  const bed = (f, len, E, g) => { const x = lib(f), L = Math.round((len - .15) * SR); for (let s0 = 0; s0 < N; s0 += L) { let any = false; for (let i = s0; i < Math.min(N, s0 + x.n); i += 4800) if (E[i] > .01) { any = true; break; } if (!any) continue;
      for (let i = 0; i < x.n && s0 + i < N; i++) { const k = E[s0 + i] * g * Math.min(1, i / 7200, (x.n - i) / 7200); if (k <= 0) continue; amb.L[s0 + i] += x.L[i] * k; amb.R[s0 + i] += x.R[i] * k; } } };
  const every = (E, a, b, seed, fn) => { const r = (k) => { const v = Math.sin(k * 127.1 + seed * 311.7) * 43758.5453; return v - Math.floor(v); }; for (let t = 1 + r(0) * a, k = 1; t < DUR - 1; t += a + (b - a) * r(k), k++) { const g = E[Math.round(t * SR)]; if (g > .3) fn(t, g, r(k + 50)); } };
  if (PL.walk) { const E = env(PL.walk); bed('ep05_kids.wav', 4.6, E, .075); bed('ep05_kids.wav', 4.6, E.map((v, i) => E[Math.min(N - 1, i + 2.3 * SR | 0)]), .045);
    every(E, 9, 15, 1, (t, g, r) => put('ep05_laugh.wav', t, .07 * g, r * 1.4 - .7));                      // a child laughs somewhere
    every(E, 6, 10, 2, (t, g, r) => { put('ep03_beep.wav', t, .018 * g, .7); put('ep03_beep.wav', t + .32, .015 * g, .7); });   // the checkout scanner
    every(E, 15, 22, 3, (t, g) => put('ep05_bell.wav', t, .03 * g, -.5));                                    // the automatic door's chime
    every(E, 11, 17, 4, (t, g, r) => { put('ep03_roll.wav', t, .028 * g, r < .5 ? -.6 : .6); put('footsteps.wav', t + .4, .05 * g, r < .5 ? -.3 : .3); }); }   // a trolley rattles past, steps
  if (PL.tank) { const E = env(PL.tank); bed('hum.wav', 5.2, E, .03); every(E, .22, .55, 5, (t, g, r) => put('bubble.wav', t, (.02 + .02 * r) * g, r * 1.2 - .6)); }   // the filter bubbling
  if (PL.park) { const E = env(PL.park); bed('wind.wav', 6, E, .05); every(E, 13, 20, 6, (t, g, r) => put('pass_by.wav', t, .055 * g, r < .5 ? -.7 : .7)); every(E, 19, 27, 7, (t, g) => put('ep05_kids.wav', t, .035 * g, .4)); }   // wind in the rain tree, a far car, children on the linkway
  // foley the v2 mix did not have: the boot's lid (P2), the watering can's stream (P2), bottles clinking as the bag goes in
  if (PART == 2) { if (TL.marks.bootshut) put('door_open.wav', TL.marks.bootshut - .5, .25, -.2); if (TL.marks.pour) for (let k = 0; k < 4; k++) put('splash.wav', TL.marks.pour + .1 + k * .55, .05, .2); if (TL.marks.bagin2) put('ep03_clink.wav', TL.marks.bagin2 + .05, .12, -.2); }
}
for (const [a, b] of C.R.night) for (let t = a + .2; t < b - .3; t += .42) for (let j = 0; j < 3; j++) amb.addMono(I.bell(4300 + (j % 2) * 180, .022, .6, 1.5), t + j * .055, .04, ((t * 7) % 2) - 1);
for (const [a, b] of C.R.roll) for (let t = a; t < b; t += .07) game.addMono(I.tom(92, .08, (t * 100) | 0), t, .07 + .1 * (t - a) / (b - a));
// ---------- one-shots
const hz = (n) => 440 * Math.pow(2, (m(n) - 69) / 12);
const RISE = ['C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6', 'E6', 'G6', 'A6', 'C7'], PICK = ['E5', 'G5', 'C6'];
const mar = (n, t, g = .5, o = {}) => { const x = I.marimba(typeof n === 'number' ? n : m(n), o); game.addMono(x, t, g); verb.addMono(x, t, g * .35); };
const chordAt = (t, notes, g = .1, d = 2.2) => { for (const n of notes) { const { L, R } = I.padNote(m(n), d, { cutoff: 1500, attack: .03, release: 1.4 }); pad.addStereo(L, R, t, g); } };
const P = {
  // EP12: the mynah's two-note call (a bright whistle up, then down); the trolley's metal CLANG (a bright ring + a thud); the same, long and low (slow motion)
  mynah: (t) => { [[2650, 0], [1980, .2]].forEach(([f, d]) => { const x = I.bell(f, .09, 1.1, 1.4); amb.addMono(x, t + d, .09, .4); verb.addMono(x, t + d, .06); }); amb.addMono(I.whistle(.18), t + .38, .04, .4); },
  clang: (t) => { const a = I.bell(620, .9, 2.2, 2.7), b = I.bell(1490, .5, 2.8, 3.1); game.addMono(a, t, .34); game.addMono(b, t, .16); verb.addMono(a, t, .18); game.addMono(I.thud(120, .07), t, .6); game.addMono(I.rim(1.2, 61), t, .3); },
  clangslow: (t) => { const a = I.bell(310, 2.6, 1.1, 2.7), b = I.bell(745, 1.8, 1.4, 3.1); wonder.addMono(a, t, .3); wonder.addMono(b, t, .12); verb.addMono(a, t, .2); wonder.addMono(I.thud(70, .2), t, .5); },
  koel: (t) => { for (let j = 0; j < 2; j++) { const x = I.whistle(.3); amb.addMono(x, t + j * .42, .05 + .02 * j, -.5); verb.addMono(x, t + j * .42, .05); } },
  mrt: (t) => { amb.addMono(I.noiseSweep(3.2, 90, 260, { q: .8, pink: true }), t, .1, .4); },
  clink: (t) => { game.addMono(I.bell(2100, .12, 2.5, 2.7), t, .2); game.addMono(I.thud(180, .04), t, .5); game.addMono(I.rim(1.3, 2), t, .3); },
  jingle: (t) => { [0, .05, .11].forEach((d, i) => game.addMono(I.bell(3100 + i * 420, .1, 2, 3.1), t + d, .09)); game.addMono(I.thud(140, .05), t, .35); },
  tap: (t) => { game.addMono(I.woodTick(1.7), t, .5); },
  potthud: (t) => { game.addMono(I.thud(70, .14), t, .9); game.addMono(I.thwack(), t, .12); },
  rustle: (t) => { game.addMono(I.paperFwip(.8, 4), t - .05, .3); game.addMono(I.shaker(1, 9), t + .03, .3); game.addMono(I.thud(120, .05), t, .4); },
  set: (t) => { game.addMono(I.thud(110, .06), t, .6); game.addMono(I.woodTick(.7), t, .5); },
  ratchet: (t, v, i) => { game.addMono(I.rim(1.5 + .1 * (i % 2), i), t, .35); game.addMono(I.woodTick(2), t + .03, .2); },
  step: (t, v) => { const g = v === undefined ? 1 : (typeof v === 'number' && v < 1 ? v : 1); game.addMono(I.woodTick(.7), t, .2 * g); game.addMono(I.rim(1, 3), t, .04 * g); },
  clunk: (t) => { game.addMono(I.thud(140, .05), t, .5); game.addMono(I.woodTick(.45), t, .5); game.addMono(I.bell(380, .25, 3.5, 2.7), t + .05, .05); },
  lid: (t) => { game.addMono(I.thud(160, .05), t, .7); game.addMono(I.rim(.9, 5), t, .5); game.addMono(I.pop(900, 3), t + .02, .3); },
  clack: (t) => { game.addMono(I.woodTick(.5), t, .8); game.addMono(I.thud(210, .03), t, .6); game.addMono(I.rim(.8, 3), t, .3); },
  whirr: (t, v) => { const d = v || .5; for (let x = 0; x < d; x += .055) game.addMono(I.woodTick(.9 + x), t + x, .25); },
  lowdrum: (t, v) => { const x = I.timpani(m('C2'), { decay: 1.3 }); game.addMono(x, t, .8 * (v || 1)); verb.addMono(x, t, .3 * (v || 1)); game.addMono(I.subBoom(1.2, 60, 34), t, .35 * (v || 1)); },
  pluck: (t, v) => { const x = I.pizz(m('C4') + v); game.addMono(x, t, .5); verb.addMono(x, t, .2); },
  pop: (t, v) => { game.addMono(I.pop(1400 + 200 * (v || 0), 7 + (v || 0)), t, .5); },
  softpop: (t, v) => { game.addMono(I.pop(900 + 160 * (v || 0), 11 + (v || 0)), t, .34); mar(RISE[(v || 0) % 6], t, .16); },
  whoosh: (t) => { game.addMono(I.noiseSweep(.45, 500, 3200, { q: 1.3 }), t - .1, .2); },
  slam: (t, v) => { game.addMono(K, t, .9); game.addMono(I.thud(80 - 6 * v, .11), t, .9); game.addMono(I.thwack(), t, .16); if (v === 2) { const c = I.crash(4); game.addMono(c, t, .12); } },
  cardL: (t) => { game.addMono(I.pop(1500, 1), t, .5, -.6); mar('E5', t, .3); }, cardR: (t) => { game.addMono(I.pop(1900, 2), t, .5, .6); mar('G5', t, .3); },
  tick: (t, v) => { game.addMono(I.woodTick(v ? 1.25 : 1.5), t, v ? .7 : .42); },
  bell: (t) => { const b1 = I.bell(1568, .5, 1.4, 2.0), b2 = I.bell(2349, .35, 1.0, 2.0); game.addMono(b1, t, .42); game.addMono(b2, t, .18); verb.addMono(b1, t, .25); },
  peep: (t) => { const x = I.whistle(.28); game.addMono(x, t, .16); game.addMono(x, t + .34, .14); verb.addMono(x, t, .08); const b1 = I.bell(1568, .4, 1.2, 2.0); game.addMono(b1, t, .2); },
  bellicon: () => {},
  stamp: (t) => { game.addMono(I.thud(72, .12), t, .95); game.addMono(I.thwack(), t, .22); },
  pick: (t, v) => { game.addMono(I.paperFwip(1.1, 3 + v), t - .09, .12); game.addMono(I.pop(1700, 5 + v), t, .55); mar(PICK[v % 3], t, .5, { thock: .5 }); },
  tag: (t, v) => { const d = I.ting(88); game.addMono(d, t, .6); verb.addMono(d, t, .3); game.addMono(I.thud(95, .07), t, .5); if (!v) { chordAt(t, ['C4', 'E4', 'G4', 'C5']); ['C5', 'E5', 'G5'].forEach((n, i) => mar(n, t + i * .07, .28)); } },
  sting: (t) => { ['G4', 'C5', 'E5', 'G5', 'C6'].forEach((n, i) => mar(n, t + i * .075, .4)); game.addMono(CL, t + .38, .4); game.addMono(I.thud(90, .08), t + .38, .5); },
  pip: (t, v) => { mar(RISE[v + 1], t, .5, { thock: .5 }); game.addMono(I.pop(1500 + 200 * v, 20 + v), t, .3); },
  slap: (t) => { game.addMono(CL, t, .9); game.addMono(I.thwack(), t, .4); verb.addMono(CL, t, .3); ['C5', 'E5', 'G5', 'C6'].forEach((n, i) => mar(n, t + i * .04, .3)); },
  chek: (t, v) => { const g = v || 1; for (let j = 0; j < 2; j++) { game.addMono(I.rim(2.1, 40 + j), t + j * .14, .34 * g, .5); game.addMono(I.woodTick(2.6), t + j * .14, .24 * g, .5); } },
  boop: (t, v) => { game.addMono(I.tom(196 - (v || 0) * 22, .11), t, .3); game.addMono(I.pop(700, 30 + (v || 0)), t, .18); },
  bikebell: (t) => { for (let j = 0; j < 2; j++) { const x = I.bell(2637, .5, 1.6, 2.0); amb.addMono(x, t + j * .22, .09, -.6); verb.addMono(x, t + j * .22, .06); } },
  rise: (t, v) => { mar(RISE[v % RISE.length], t, .42); game.addMono(I.pop(1300 + 120 * v, 50 + v), t, .32); },
  hop: (t, v) => { game.addMono(I.thud(150 + 12 * v, .04), t, .4); game.addMono(I.pop(800 + 90 * v, 60 + v), t, .22); },
  chime: (t) => { ['E6', 'G6', 'C7'].forEach((n, i) => { const x = I.musicBox(m(n), { decay: 1.6 }); game.addMono(x, t + i * .09, .16); verb.addMono(x, t + i * .09, .14); }); },
  chime2: (t, v) => { const x = I.musicBox(m(v ? 'G6' : 'E6'), { decay: 1.6 }); game.addMono(x, t, .22); verb.addMono(x, t, .18); game.addMono(I.pop(1200, 70 + v), t, .25); },
  drum: (t, v) => { game.addMono(I.tom(130 - 14 * v, .3, 7 + v), t, .9); game.addMono(K, t, .7); mar(['G4', 'G4', 'G4'][v], t, .3); },
  cymbal: (t) => { const c = I.crash(6); game.addMono(c, t, .2); verb.addMono(c, t, .1); game.addMono(K, t, .9); ['C5', 'E5', 'G5', 'C6'].forEach((n, i) => mar(n, t + i * .03, .4)); },
  roundcard: (t) => { game.addMono(I.noiseSweep(.3, 500, 2800, { q: 1.3 }), t - .05, .16); game.addMono(I.thud(80, .11), t + .12, .9); game.addMono(K, t + .12, .8); ['C5', 'G5'].forEach((n, i) => mar(n, t + .12 + i * .1, .4)); },
  window: (t) => { game.addMono(I.paperFwip(1.3, 5), t - .05, .14); game.addMono(I.pop(1100, 6), t, .4); },
  morning: (t) => { for (let j = 0; j < 3; j++) amb.addMono(I.whistle(.07 + .03 * j), t + j * .17, .04, .5 - j * .3); },
  coin: (t, v) => { const c = I.ting(v ? 89 : 93, { gap: .06 }); game.addMono(c, t, v ? .5 : .7); verb.addMono(c, t, .3); game.addMono(I.pop(2200, 41), t, .4); },
  coin2: (t, v) => { [0, .13].forEach((d, i) => { const c = I.ting((v ? 89 : 93) + i * 2, { gap: .06 }); game.addMono(c, t + d, .6); verb.addMono(c, t + d, .25); }); },
  shrink: (t) => { game.addMono(I.noiseSweep(1.1, 2600, 240, { q: 1.6 }), t, .2); const x = I.bell(660, 1.2, 1.2, 2.0); verb.addMono(x, t + .7, .12); },
  drip: (t, v) => { const x = I.bell(1900 + 260 * (v % 4), .09, 1.2, 1.5); wonder.addMono(x, t, .05, (v % 3) - 1); verb.addMono(x, t, .09); wonder.addMono(I.pop(2400, 80 + v), t, .06, (v % 3) - 1); },
  creak: (t) => { for (let j = 0; j < 7; j++) wonder.addMono(I.rim(.5 + j * .05, 90 + j), t + j * .1 + j * j * .006, .08 + .01 * j); },
  crack: (t, v) => { wonder.addMono(I.woodTick(.55), t, v ? .3 : .5); wonder.addMono(I.thud(170, .05), t, .3); wonder.addMono(I.rim(.7, 12), t + .03, .2); verb.addMono(I.woodTick(.55), t, .25); },
  stretch: (t) => { wonder.addMono(I.noiseSweep(4.5, 220, 520, { q: 2.2, pink: true }), t, .1); },
  whooshout: (t) => { game.addMono(I.noiseSweep(.8, 300, 3000, { q: 1.4 }), t, .2); game.addMono(I.pop(900, 91), t + .95, .5); },
  scribble: (t) => { game.addMono(I.scribble(.7, 31), t, .3); },
  rub: (t) => { game.addMono(I.scribble(.5, 33), t, .18); game.addMono(I.noiseSweep(.5, 800, 1200, { q: .8 }), t, .06); },
  clap: (t, v) => { const g = v === undefined ? 1 : v; drums.addMono(CL, t, .75 * g); verb.addMono(CL, t, .2 * g); }, stomp: (t, v) => { const g = v === undefined ? 1 : v; drums.addMono(K, t, .95 * g); drums.addMono(I.thud(70, .12), t, .8 * g); },
  turn: (t, v) => { game.addMono(I.pop(1600, 120 + v), t, .5); mar(['G5', 'A5', 'C6', 'D6'][v % 4], t, .4, { thock: .5 }); },
  sparkle: (t) => { ['C6', 'E6', 'G6', 'C7'].forEach((n, i) => { const x = I.musicBox(m(n)); game.addMono(x, t + i * .05, .14); verb.addMono(x, t + i * .05, .12); }); game.addMono(CL, t + .28, .5); },
  slide: (t) => { game.addMono(I.paperFwip(.9, 6), t, .22); game.addMono(I.thud(130, .05), t + .34, .4); },
  squeak: (t) => { const x = I.whistle(.12); game.addMono(x, t, .09); game.addMono(I.pop(1900, 95), t, .25); },
  knock: (t) => { game.addMono(I.woodTick(.6), t, .8); game.addMono(I.thud(190, .04), t, .6); },
  flip: (t) => { game.addMono(I.paperFwip(1.2, 8), t, .2); game.addMono(I.pop(1300, 96), t + .08, .35); },
  paper: (t) => { game.addMono(I.paperFwip(.7, 9), t, .3); game.addMono(I.paperFwip(1, 10), t + .15, .2); },
  leafrise: (t) => { ['C5', 'D5', 'E5', 'G5', 'A5', 'C6'].forEach((n, i) => { const x = I.musicBox(m(n), { decay: 1.2 }); game.addMono(x, t + i * .36, .13); verb.addMono(x, t + i * .36, .12); }); },
  reveal: (t) => { game.addMono(I.noiseSweep(.5, 400, 3200, { q: 1.2 }), t - .1, .18); chordAt(t + .1, ['C4', 'E4', 'G4', 'C5', 'E5'], .13, 3.2); ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'].forEach((n, i) => mar(n, t + .1 + i * .06, .45)); const c = I.crash(8); game.addMono(c, t + .1, .14); game.addMono(K, t + .1, .9);
    ['C3', 'G3', 'E4', 'G4', 'C5'].forEach((n, i) => uke.addMono(I.guitar(m(n) + 12, 1.6, { bright: .6, seed: i }), t + .1 + i * .02, .2)); },
  curious: (t) => { ['F4', 'A4', 'B4'].forEach((n, i) => { const x = I.marimba(m(n) + 12, { decay: .6 }); game.addMono(x, t + i * BEAT / 2, .3 + i * .05); verb.addMono(x, t + i * BEAT / 2, .25); }); },
  term: (t) => { ['C6', 'E6', 'G6', 'C7'].forEach((n, i) => { const x = I.musicBox(m(n), { decay: 1.8 }); game.addMono(x, t + i * .1, .2); verb.addMono(x, t + i * .1, .2); }); game.addMono(I.noiseSweep(.35, 600, 2600, { q: 1.2 }), t - .1, .1); chordAt(t, ['C4', 'G4', 'E5'], .06, 1.8); },
  // EP8: a sound from the sau library (v = {f: file, g: gain, bus}); a comic boing; a ceramic "tok"; a soft bubble; the "pomf" of the sole press; cloth; a sheep's "baa"; a rubber-band twang
  sfx: (t, v) => { const B = { game, amb, wonder }[v.bus || 'game'] || game; MIX.loadAudio(path.join(SFX, v.f), { at: t, length: DUR }).mixInto(B, v.g || .3); },
  boing: (t) => { for (let k = 0; k < 6; k++) { const x = I.pizz(m('C3') + 7 - k * 1.5 + 12 * Math.exp(-k), { seed: 140 + k }); game.addMono(x, t + k * .045, .22 * (1 - k * .12)); } game.addMono(I.pop(500, 141), t, .2); },
  tok: (t) => { game.addMono(I.woodTick(1.1), t, .6); const x = I.bell(1240, .18, 3.0, 2.4); game.addMono(x, t, .14); verb.addMono(x, t, .08); },
  bubble: (t, v) => { const x = I.pop(420 + 70 * ((v || 0) % 4), 150 + (v || 0)); wonder.addMono(x, t, .18, ((v || 0) % 3) - 1); verb.addMono(x, t, .08); },
  pomf: (t) => { game.addMono(I.thud(90, .16), t, .8); game.addMono(I.noiseSweep(.25, 900, 300, { q: .7, pink: true }), t, .12); },
  cloth: (t) => { game.addMono(I.paperFwip(.6, 160), t, .18); game.addMono(I.noiseSweep(.4, 1800, 700, { q: .6, pink: true }), t + .05, .06); },
  baa: (t) => { for (let k = 0; k < 9; k++) { const x = I.pizz(m('A3') + (k % 2 ? .4 : -.4), { seed: 170 + k }); amb.addMono(x, t + k * .055, .07); } },
  twang: (t) => { const x = I.guitar(m('E3'), .9, { bright: .9, sustain: .99, seed: 181 }); game.addMono(x, t, .4); verb.addMono(x, t, .15); game.addMono(I.pop(300, 182), t, .2); },
  shelfpop: (t, v) => { game.addMono(I.pop(1500 + 150 * v, 110 + v), t, .6); mar(RISE[3 + v], t, .4, { thock: .5 }); },
  glow: (t, v) => { const x = I.musicBox(m(['E6', 'G6', 'C7'][v % 3]), { decay: 1.6 }); game.addMono(x, t, .26); verb.addMono(x, t, .22); mar(['E5', 'G5', 'C6'][v % 3], t, .3); },
  // note 16: the big happy hit exactly on "know!": brass, a cymbal splash, a confetti pop, a bright chord (the "yay!" is in the buddies' voices)
  blast: (t) => { for (const [n, g] of [['C4', .5], ['E4', .45], ['G4', .45], ['C5', .5], ['E5', .4]]) { const x = I.brassNote(m(n), .9); game.addMono(x, t, g * .5); verb.addMono(x, t, g * .2); }
    const c = I.crash(11), c2 = I.crash(12); game.addMono(c, t, .3); game.addMono(c2, t + .02, .18, .5); verb.addMono(c, t, .15); game.addMono(K, t, 1.0); game.addMono(I.thud(70, .14), t, .9); game.addMono(I.pop(1800, 131), t, .8); game.addMono(I.pop(2400, 132), t + .05, .5, .6); game.addMono(I.pop(1300, 133), t + .09, .5, -.6); game.addMono(CL, t, .7);
    ['C5', 'E5', 'G5', 'C6', 'E6', 'G6', 'C7'].forEach((n, i) => mar(n, t + i * .045, .5, { decay: .7 })); chordAt(t, ['C4', 'E4', 'G4', 'C5', 'E5'], .12, 3.0); ['C3', 'G3', 'E4', 'G4', 'C5'].forEach((n, i) => uke.addMono(I.guitar(m(n) + 12, 1.6, { bright: .6, seed: i }), t + i * .015, .24)); },
  cheep: (t, v) => { for (let j = 0; j < 2; j++) { const x = I.bell(3300 + 240 * ((v || 0) % 3) + j * 320, .05, 1.2, 1.6); game.addMono(x, t + j * .09, .11, ((v || 0) % 3 - 1) * .5); verb.addMono(x, t + j * .09, .05); } },
  final: (t) => { game.addMono(I.thud(80, .1), t, .7); game.addMono(CL, t, .5); [['E5', 0], ['G5', 1], ['C6', 2], ['E6', 3]].forEach(([n, s]) => mar(n, t + s * BEAT / 2, .5, { decay: .7 }));
    ['C3', 'G3', 'E4', 'G4', 'C5'].forEach((n, i) => uke.addMono(I.guitar(m(n) + 12, 1.6, { bright: .6, seed: i }), t + i * .02, .22)); chordAt(t, ['C4', 'E4', 'G4', 'D5'], .09, 2.6); const c = I.crash(9); game.addMono(c, t, .1); },
};
let miss = new Set(); C.ev.forEach((e, i) => { if (P[e.k]) P[e.k](e.t, e.v, i); else miss.add(e.k); }); if (miss.size) console.log('no sound for', [...miss]);
// ---------- mix: music ducks under every voice line; the calm bed and ambience duck a little
MIX.duck([drums, bass, keys, uke, pad], voice, { depth: .64, release: .3 }); MIX.duck([calm, amb], voice, { depth: .4, release: .3 }); MIX.duck([wonder], voice, { depth: .35, release: .5 }); MIX.duck([game], voice, { depth: .3, release: .2 });
const stems = { drums, bass, keys, uke, pad, calm, wonder, game, amb, voice, verb: reverb(verb, { room: .7, damp: .4 }) };
const GAIN = { drums: .42, bass: .5, keys: .7, uke: 2.1, pad: 1.6, calm: 1.5, wonder: .85, game: .75, amb: 1, voice: 2.3, verb: .9 };
const mix = MIX.mixdown(stems, GAIN, { stemDir: process.env.STEMS ? path.join(__dirname, "out", "stems") : null }); MIX.highpass(mix, 30);
MIX.fadeOut(mix, C.END - 1.6, C.END - .05);   // the outro music fades at the very end
const M = MIX.master(mix, .8, undefined, { lufs: -16 });
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true }); MIX.writeWav(path.join(__dirname, 'out', `mix_p${PART}.wav`), mix);
console.log(`wrote out/mix_p${PART}.wav (${DUR.toFixed(2)} s${M && M.lufs !== undefined ? `, ${M.lufs.toFixed(1)} LUFS` : ''})`);
