// song.js: the whole soundtrack of P4 EP1 "The Great Bike Breakdown" (the P4 "Scoop Parade" family composed for the pilot EP27, unchanged, plus the
// series' own EP1-10 calm bed and micro-world pad; never Kampong Walk). The P4 EP1 one-shots (pedal whirr, grass thump, helmet bonk, rope hiss,
// chain clicks, freewheel, spanner, bells, Heart's hint #2) are added at the end of the one-shot table. Below, EP27's notes on the music:
//   node song.js 1        reads cues_p1.json (sound_cues.js) and tl_p1.json -> out/mix_p1.wav (-16 LUFS)
// Synth = the series' own audio engine (audio/: dsp, instruments, mix; from short1). Ambiences and a few one-shots from the sau sfx library.
// THE MUSIC (composed for EP27, the start of the P4 era; not Kampong Walk, not a copy of an existing song):
//   "Scoop Parade", the P4 theme: F major, 112 BPM, 8 bars (F | Dm7 | Bb | C7 | F | Am7 | Bb | C): electric-piano offbeats, a bouncy plucked
//     bass (root, fifth, octave walk-ups), kick on 1 and 3, soft claps on 2 and 4, shaker eighths, and a glockenspiel hook (bars 1-8 of every
//     16; the other 8 bars a marimba answer), so it is catchy but leaves room for the voices.
//   the lite bed (teaching): the same chords on the electric piano, the bass on 1 and 3, a glockenspiel note every other bar.
//   the tense bed (the deadline): D minor (Dm | Bb | Gm | A), a ticking clock (tick, tock), a pizzicato ostinato in eighths, a low string pad
//     that rises over four bars, a soft timpani each four bars.
//   the party finale: the theme with brass stabs, a warm string pad and bigger claps.
//   the journey pad: EP1-EP10's micro-world pad (unchanged), and no other music under it.
//   the stings: "plan goes wrong" (a sad trombone: four falling brass notes, the last one wobbling), the slow-motion replay cue (a reversed
//     whoosh into a deep slowed hit, a low pad, slow heartbeats), the title sting, the level-up fanfare.
// SMOOTH (SERIES_FORMAT 9, 24-25 Nov): ONE bar clock for the whole video (every bed is laid on the same global grid from t = 0, so a bed that
// stops resumes on the beat); every change of bed is a 0.8 s crossfade (each bed's gain envelope ramps over 0.8 s centred on the scene
// change); the music ducks under every voice line; the countdown is silent but for the ticks and the bell.
const path = require('path'), fs = require('fs');
const { SR, Bus, reverb } = require('./audio/dsp'); const I = require('./audio/instruments'); const MIX = require('./audio/mix'); const { m } = require('./music');
const PART = process.argv[2] || 1;
const C = JSON.parse(fs.readFileSync(path.join(__dirname, `cues_p${PART}.json`))), TL = JSON.parse(fs.readFileSync(path.join(__dirname, `tl_p${PART}.json`)));
const DUR = C.END + .2, N = Math.ceil(DUR * SR), bus = () => new Bus(N), SFX = path.join(__dirname, '..', '..', 'sau', 'sfx');
const voice = bus(), amb = bus(), verb = bus(), wonder = bus(), game = bus();
const BPM = 112, BEAT = 60 / BPM, BAR = 4 * BEAT, FADE = .8;
const beds = {}; const B = (name) => (beds[name] = { drums: bus(), bass: bus(), keys: bus(), lead: bus(), pad: bus(), brass: bus() });
// ---------- voices
for (const id of TL.order) MIX.loadAudio(path.join(__dirname, 'voice', id + '.wav'), { at: TL.lines[id].t, length: DUR }).mixInto(voice, TL.lines[id].who === 'heart' ? 1 : TL.lines[id].who === 'chant' ? (TL.lines[id].gain || .8) : .78);
// ---------- the bar clock and the beds' envelopes
const barsIn = (regs) => { const out = new Set(); for (const [a, b] of regs) for (let k = Math.floor((a - FADE) / BAR); k * BAR < b + FADE; k++) if (k >= 0) out.add(k); return [...out].sort((x, y) => x - y); };
function envelope(regs) { const e = new Float32Array(N); for (const [a, b] of regs) { const i0 = Math.max(0, Math.round((a - FADE / 2) * SR)), i1 = Math.min(N, Math.round((b + FADE / 2) * SR));
    for (let i = i0; i < i1; i++) { const t = i / SR, g = Math.min(1, (t - (a - FADE / 2)) / FADE, ((b + FADE / 2) - t) / FADE); if (g > e[i]) e[i] = g; } } return e; }
const applyEnv = (b, e) => { for (let i = 0; i < N; i++) { const g = e[i] * e[i] * (3 - 2 * e[i]); b.L[i] *= g; b.R[i] *= g; } };
const hz = (n) => 440 * Math.pow(2, ((typeof n === 'number' ? n : m(n)) - 69) / 12);
// ---------- "Scoop Parade": chords and the hook
const CH = [[41, [57, 60, 65]], [38, [57, 60, 65]], [34, [58, 62, 65]], [36, [58, 60, 64]], [41, [57, 60, 65]], [33, [55, 60, 64]], [34, [58, 62, 65]], [36, [55, 60, 64]]];
// the hook (8 bars, eighth-note steps 0..7; [midi, step, length in eighths])
const HOOK = [[[72, 0, 2], [77, 2, 2], [81, 4, 1], [79, 5, 1], [77, 6, 2]], [[74, 0, 2], [77, 2, 2], [81, 4, 2], [84, 6, 2]], [[86, 0, 1], [84, 1, 1], [82, 2, 2], [81, 4, 2], [77, 6, 2]], [[79, 0, 3], [76, 3, 2], [72, 5, 3]],
  [[72, 0, 2], [77, 2, 2], [81, 4, 1], [79, 5, 1], [77, 6, 2]], [[76, 0, 2], [79, 2, 2], [84, 4, 2], [88, 6, 2]], [[86, 0, 2], [84, 2, 1], [82, 3, 1], [81, 4, 2], [79, 6, 2]], [[77, 0, 6], [72, 6, 1], [74, 7, 1]]];
const ANSWER = [[[65, 0], [69, 1], [72, 2], [69, 3]], [[62, 0], [65, 1], [69, 2], [72, 3]], [[62, 0], [65, 1], [70, 2], [65, 3]], [[64, 0], [67, 1], [70, 2], [72, 3]]];
const K = I.kick({ punch: .55, tail: .22 }), CL = I.clap({ decay: .12 }), SH = [I.shaker(.7, 31), I.shaker(1, 32)];
function themeBar(bd, k, o = {}) { const t0 = k * BAR, [root, ch] = CH[k % 8], full = o.full !== false;
  // drums
  if (full) for (let s = 0; s < 8; s++) { const t = t0 + s * BEAT / 2; if (s === 0 || s === 4 || (s === 3 && k % 2)) bd.drums.addMono(K, t, s === 3 ? .3 : .5); if (s === 2 || s === 6) { bd.drums.addMono(CL, t, o.party ? .42 : .26); verb.addMono(CL, t, .06); } bd.drums.addMono(SH[s % 2], t, s % 2 ? .1 : .06, s % 2 ? .3 : -.3); }
  // bass: root, fifth, octave walk
  const bp = full ? [[0, 0], [1.5, 7], [2, 12], [3, 7], [3.5, 5]] : [[0, 0], [2, 7]];
  for (const [b, iv] of bp) bd.bass.addMono(I.pizz(root + 12 + iv, { seed: 40 + b * 2 }), t0 + b * BEAT, b === 0 ? .55 : .42);
  // electric piano: a soft chord on 1, offbeat stabs
  ch.forEach((n, i) => bd.keys.addMono(I.epiano(n, BAR * .9, { index: 1.2, decay: 1.4 }), t0 + i * .01, full ? .07 : .1, (i - 1) * .25));
  if (full) for (const b of [.5, 1.5, 2.5, 3.5]) ch.forEach((n, i) => bd.keys.addMono(I.epiano(n + 12, .25, { index: 1.8, decay: 3 }), t0 + b * BEAT + i * .006, .05, (i - 1) * .3));
  // the lead: the hook (8 of 16 bars) or the marimba answer
  if (o.lead !== false) { if (full && k % 16 < 8) for (const [n, s, d] of HOOK[k % 8]) { const x = I.musicBox(n, { decay: .9 + .15 * d }); bd.lead.addMono(x, t0 + s * BEAT / 2, .16, .15); verb.addMono(x, t0 + s * BEAT / 2, .05); }
    else if (full) for (const [n, b] of ANSWER[k % 4]) { const x = I.marimba(n + 12, { thock: .3 }); bd.lead.addMono(x, t0 + b * BEAT + BEAT / 2, .14, -.2); }
    else if (k % 2 === 0) { const x = I.musicBox(ch[2] + 12, { decay: 1.6 }); bd.lead.addMono(x, t0, .09); verb.addMono(x, t0, .06); } }
  // the party: brass stabs and a warm string pad
  if (o.party) { for (const b of [0, 1.5]) ch.forEach((n, i) => bd.brass.addMono(I.brassNote(n + 12, .32, { stab: true, seed: 50 + i }), t0 + b * BEAT, .06));
    ch.forEach((n) => bd.pad.addMono(I.strings(n, BAR * .98, { attack: .3, release: .6, seed: 60 + n }), t0, .05)); } }
// ---------- the tense bed (D minor)
const TCH = [[38, [62, 65, 69]], [34, [62, 65, 70]], [31, [62, 67, 70]], [33, [61, 64, 69]]];
function tenseBar(bd, k) { const t0 = k * BAR, [root, ch] = TCH[k % 4];
  for (let s = 0; s < 4; s++) { bd.drums.addMono(I.woodTick(s % 2 ? .8 : 1.15), t0 + s * BEAT, s % 2 ? .22 : .3, .2); }
  const ost = [0, 0, 12, 0, 3, 0, 7, 0]; ost.forEach((iv, s) => bd.bass.addMono(I.pizz(root + 12 + iv, { seed: 70 + s }), t0 + s * BEAT / 2, s === 0 ? .5 : .32));
  const lift = (k % 4) / 4; ch.forEach((n, i) => { const { L, R } = I.padNote(n - 12, BAR * 1.02, { cutoff: 600 + 900 * lift, attack: .4, release: .5 }); bd.pad.addStereo(L, R, t0 + i * .01, .06); });
  if (k % 4 === 0) { const x = I.timpani(root + 12, { decay: 1.0 }); bd.drums.addMono(x, t0, .35); } }
// ---------- lay the beds on the one bar clock
const R = C.R;
{ const b = B('theme'); for (const k of barsIn(R.theme)) themeBar(b, k); }
{ const b = B('lite'); for (const k of barsIn(R.lite)) themeBar(b, k, { full: false }); }
{ const b = B('party'); for (const k of barsIn(R.party)) themeBar(b, k, { party: true }); }
{ const b = B('tense'); for (const k of barsIn(R.tense)) tenseBar(b, k); }
for (const [name, bd] of Object.entries(beds)) { const e = envelope(R[name]); for (const x of Object.values(bd)) applyEnv(x, e); }
// ---------- the journey pad (EP1-EP10's micro-world: a slow warm pad with soft bell tones, no rhythm)
for (const [a, b] of R.wonder) { const prog = [['D3', 'A3', 'F#4', 'A4'], ['B2', 'F#3', 'D4', 'A4'], ['G2', 'D3', 'B3', 'G4'], ['A2', 'E3', 'C#4', 'A4']]; const step = 5.6;
  for (let t = a, i = 0; t < b; t += step, i++) { const d = Math.min(step + 1.6, b - t + 1.2); for (const n of prog[i % 4]) { const { L, R: Rr } = I.padNote(m(n), d, { cutoff: 700, attack: 1.6, release: 2.2, detune: .16 }); wonder.addStereo(L, Rr, t, .16); }
    for (let k = 0; k < 3; k++) { const x = I.bell(440 * Math.pow(2, (m(prog[i % 4][2 + (k % 2)]) + 12 - 69) / 12), .9, 1.6, 2.0); wonder.addMono(x, t + 1.2 + k * 1.5, .05, k % 2 ? .4 : -.4); verb.addMono(x, t + 1.2 + k * 1.5, .06); } } }
{ const e = new Float32Array(N); for (const [a, b] of R.wonder) for (let i = Math.max(0, Math.round(a * SR)); i < Math.min(N, Math.round((b + 1.2) * SR)); i++) { const t = i / SR; e[i] = Math.min(1, (t - a) / 1.2, (b + 1.2 - t) / 1.5); } applyEnv(wonder, e); }
// ---------- ambiences
const sfxLen = {}; const loop = (file, a, b, g, fade = 1.0, into = amb) => { const x0 = MIX.loadAudio(path.join(SFX, file), { at: 0, length: 60 }); let len = 0; for (let i = x0.L.length - 1; i > 0; i--) if (Math.abs(x0.L[i]) > 1e-4) { len = i / SR; break; } len = Math.max(1, len - .15);
  for (let t = a; t < b; t += len) { const x = MIX.loadAudio(path.join(SFX, file), { at: t, length: DUR }); const i0 = Math.round(a * SR), i1 = Math.round(b * SR);
    for (let i = Math.round(t * SR); i < Math.min(N, Math.round((t + len + .15) * SR)); i++) { const e = Math.min(1, (i - i0) / (fade * SR), (i1 - i) / (fade * SR)); if (e <= 0) continue; into.L[i] += x.L[i] * g * e; into.R[i] += x.R[i] * g * e; } } };
const P = {};
// cicadas in the afternoon sun: a soft fast rim roll that swells and fades (synth, as EP18's)
P.cicada = (t, d = 2.4, g = 1) => { for (let x = 0; x < d; x += .018) amb.addMono(I.rim(1.25 + .05 * Math.sin(x * 40), 400 + Math.round(x * 100)), t + x, .03 * g * Math.sin(Math.PI * x / d), .5); };
// P4 EP1: the void deck on a Saturday morning (mynahs, a koel far off, children at the playground, a lift chime now and then, a bicycle bell far
// off) and the park connector / rain tree (birds, wind in the leaves, a far road)
const koel = (t) => { for (const [d, f0, f1] of [[0, 620, 760], [.42, 700, 900]]) { const n = Math.round(.32 * SR), x = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const u = i / n; ph += 2 * Math.PI * (f0 + (f1 - f0) * u) / SR; x[i] = Math.sin(ph) * Math.sin(Math.PI * u) * .5; } amb.addMono(x, t + d, .035, -.6); verb.addMono(x, t + d, .03); } };
for (const [a, b] of R.deck) { loop('ep08_birds.wav', a, b, .07); loop('ep05_kids.wav', a, b, .03, 1.5); for (let t = a + 3, i = 0; t < b - 2; t += 11 + 3 * (i % 3), i++) koel(t);
  for (let t = a + 7, i = 0; t < b - 3; t += 23 + 5 * (i % 2), i++) MIX.loadAudio(path.join(SFX, 'chime.wav'), { at: t, length: DUR }).mixInto(amb, .02);
  for (let t = a + 14, i = 0; t < b - 2; t += 29, i++) { const x = I.bell(2350, .25, 1.4, 2.0); amb.addMono(x, t, .025, .6); amb.addMono(x, t + .18, .02, .6); } }
for (const [a, b] of R.park) { loop('ep07_birds.wav', a, b, .07); loop('wind.wav', a, b, .03, 1.5); for (let t = a; t < b; t += 1.0) amb.addMono(I.noiseSweep(1.1, 120, 140, { q: .5, pink: true }), t, .012, 0); }
// the series calm bed (EP1-10's read-along bed: one soft chord a bar and a music-box note), here in F on the same bar clock
const calm = bus();
for (const [a, b] of R.calm) for (let k = Math.max(0, Math.floor(a / BAR)); k * BAR < b; k++) { const t = k * BAR, [root, ch] = CH[[0, 2, 1, 3][k % 4] * 2 % 8];
  for (const n of ch) { const { L, R: Rr } = I.padNote(n, BAR * .95, { cutoff: 900, attack: .5, release: 1.2 }); calm.addStereo(L, Rr, t, .07); }
  calm.addMono(I.pizz(root + 12, { seed: k }), t, .3); const x = I.musicBox(ch[k % 3] + 12, { decay: 1.2 }); calm.addMono(x, t + BEAT * 2, .12, .2); verb.addMono(x, t + BEAT * 2, .08); }
{ const e = envelope(R.calm); applyEnv(calm, e); }
// ---------- one-shots
const mar = (n, t, g = .5, o = {}) => { const x = I.marimba(typeof n === 'number' ? n : m(n), o); game.addMono(x, t, g); verb.addMono(x, t, g * .35); };
const chordAt = (t, notes, g = .1, d = 2.2) => { for (const n of notes) { const { L, R: Rr } = I.padNote(m(n), d, { cutoff: 1500, attack: .03, release: 1.4 }); game.addStereo(L, Rr, t, g); } };
const sfx = (t, f, g, into = game) => MIX.loadAudio(path.join(SFX, f), { at: t, length: DUR }).mixInto(into, g);
const RISE = ['C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6', 'E6', 'G6', 'A6', 'C7'];
Object.assign(P, {
  titlesting: (t) => { [['F4', .5], ['A4', .45], ['C5', .45], ['F5', .5]].forEach(([n, g]) => { const x = I.brassNote(m(n), .7); game.addMono(x, t + .7, g * .4); verb.addMono(x, t + .7, g * .15); }); ['C5', 'F5', 'A5', 'C6', 'F6'].forEach((n, i) => mar(n, t + i * .06, .35)); const c = I.crash(7); game.addMono(c, t + .7, .18); },
  slam: (t, v) => { game.addMono(K, t, .8); game.addMono(I.thud(80, .1), t, .8); if (v === 2) { const c = I.crash(4); game.addMono(c, t, .12); } },
  whoosh: (t) => { game.addMono(I.noiseSweep(.45, 500, 3200, { q: 1.3 }), t - .1, .2); },
  whooshout: (t) => { game.addMono(I.noiseSweep(.8, 300, 3000, { q: 1.4 }), t, .2); game.addMono(I.pop(900, 91), t + .95, .4); },
  clockpop: (t) => { game.addMono(I.pop(1600, 11), t, .4); [0, .12, .24].forEach((d, i) => game.addMono(I.woodTick(1.2 + i * .1), t + .1 + d, .3)); },
  sizzle: (t) => { sfx(t, 'ep05_sizzle.wav', .08); P.cicada(t + .2, 2.0, 1.2); },
  uhoh: (t) => { [['E4', 0], ['C4', .22]].forEach(([n, d]) => { const x = I.marimba(m(n), { decay: .5 }); game.addMono(x, t + d, .3); }); },
  cardpop: (t, v) => { game.addMono(I.pop(1300 + 200 * v, 20 + v), t, .5); mar(['F5', 'A5', 'C6'][v % 3], t, .35, { thock: .5 }); },
  tick: (t, v) => { if (v) { game.addMono(I.woodTick(1.1), t, .95); game.addMono(I.thud(150, .04), t, .35); } else game.addMono(I.woodTick(1.6), t, .26); },
  bell: (t) => { const b1 = I.bell(1568, .5, 1.4, 2.0), b2 = I.bell(2349, .35, 1.0, 2.0); game.addMono(b1, t, .42); game.addMono(b2, t, .18); verb.addMono(b1, t, .25); },
  stamp: (t) => { game.addMono(I.thud(72, .12), t, .95); game.addMono(I.thwack ? I.thwack() : I.thud(120, .05), t, .22); },
  pick: (t, v) => { game.addMono(I.paperFwip(1.1, 3 + v), t - .09, .12); game.addMono(I.pop(1700, 5 + v), t, .5); mar(['F5', 'A5', 'C6'][v % 3], t, .45, { thock: .5 }); },
  dash: (t) => { sfx(t, 'ep05_run.wav', .2); game.addMono(I.noiseSweep(.6, 400, 2600, { q: 1.5 }), t, .16); },
  step: (t, v) => { game.addMono(I.woodTick(.7), t, .14 * (v || 1)); game.addMono(I.thud(140, .03), t, .12 * (v || 1)); },
  flop: (t) => { game.addMono(I.thud(85, .14), t, .9); game.addMono(I.noiseSweep(.4, 900, 300, { q: .6, pink: true }), t, .14); sfx(t + .35, 'ep07_pant.wav', .14); },
  // "plan goes wrong": a sad trombone (four falling brass notes; the last one long, a slightly detuned twin makes it wobble)
  sadtrombone: (t) => { [['A3', 0, .28], ['G#3', .32, .28], ['G3', .64, .28]].forEach(([n, d, l]) => { const x = I.brassNote(m(n), l, { bright: .7 }); game.addMono(x, t + d, .32); verb.addMono(x, t + d, .1); });
    const a = I.brassNote(m('F#3'), 1.2, { bright: .6 }), b = I.brassNote(m('F#3') + .35, 1.2, { bright: .6, seed: 22 }); game.addMono(a, t + .96, .26); game.addMono(b, t + .96, .16); verb.addMono(a, t + .96, .1); },
  cloth: (t) => { game.addMono(I.paperFwip(.6, 160), t, .16); game.addMono(I.noiseSweep(.4, 1800, 700, { q: .6, pink: true }), t + .05, .06); },
  heatwhoosh: (t) => { game.addMono(I.noiseSweep(1.0, 300, 900, { q: .8, pink: true }), t, .1); const x = I.padNote(m('A3'), 1.2, { cutoff: 900, attack: .2, release: .6 }); game.addStereo(x.L, x.R, t, .05); },
  tag: (t, v) => { const d = I.ting(88); game.addMono(d, t, .55); verb.addMono(d, t, .25); game.addMono(I.thud(95, .07), t, .45); if (!v) { chordAt(t, ['F4', 'A4', 'C5', 'F5'], .09); ['C5', 'F5', 'A5'].forEach((n, i) => mar(n, t + i * .07, .28)); } else ['A4', 'F4'].forEach((n, i) => mar(n, t + i * .12, .28)); },
  rimshot: (t) => { game.addMono(I.tom(180, .1, 3), t, .3); game.addMono(I.tom(140, .12, 4), t + .12, .3); game.addMono(I.crash(9), t + .26, .08); game.addMono(K, t + .26, .3); },
  flap: (t, i) => { game.addMono(I.paperFwip(.7 + .1 * (i % 2), 200 + i), t, .08, -.3); },
  plip: (t, v) => { const x = I.bell(2300 - 300 * (v || 0), .06, 1.4, 1.6); game.addMono(x, t, .16); verb.addMono(x, t, .08); game.addMono(I.pop(2600, 231), t, .12); },
  plipslow: (t) => { const x = I.bell(700, .6, 1.4, 1.6); game.addMono(x, t, .2); verb.addMono(x, t, .25); game.addMono(I.thud(60, .3), t, .4); },
  rewind: (t) => { sfx(t, 'ep08_rewind.wav', .25); game.addMono(I.noiseSweep(.45, 3000, 400, { q: 1.2 }), t, .16); },
  // the slow-motion replay cue: a reversed whoosh up into a deep slowed hit, a low pad under it, slow heartbeats
  slowmo: (t) => { game.addMono(I.noiseSweep(1.0, 200, 2400, { q: 1.1, shape: (x) => x * x }), t - .6, .18); game.addMono(I.subBoom(2.4, 70, 30), t + .4, .5); const x = I.timpani(m('C2'), { decay: 2 }); game.addMono(x, t + .4, .5); verb.addMono(x, t + .4, .3);
    const p = I.padNote(m('C3'), 5, { cutoff: 380, attack: .8, release: 1.6 }); game.addStereo(p.L, p.R, t + .4, .12); for (let k = 0; k < 4; k++) { game.addMono(I.thud(55, .14), t + 1.2 + k * 1.3, .4); game.addMono(I.thud(50, .1), t + 1.5 + k * 1.3, .28); } },
  tagpop: (t, v) => { game.addMono(I.pop(1500 + 300 * v, 120 + v), t, .4); mar(v ? 'C6' : 'F5', t, .3); },
  shrink: (t) => { game.addMono(I.noiseSweep(1.1, 2600, 240, { q: 1.6 }), t, .2); const x = I.bell(660, 1.2, 1.2, 2.0); verb.addMono(x, t + .7, .12); },
  warmswell: (t) => { const x = I.padNote(m('F3'), 3, { cutoff: 800, attack: 1, release: 1.2 }); wonder.addStereo(x.L, x.R, t, .08); },
  coldtwinkle: (t) => { ['E7', 'B6', 'G#6', 'E6'].forEach((n, i) => { const x = I.musicBox(m(n), { decay: 1.4 }); wonder.addMono(x, t + i * .09, .07, .4); verb.addMono(x, t + i * .09, .06); }); },
  softwhoo: (t, i) => { wonder.addMono(I.noiseSweep(1.4, 260, 520, { q: .7, pink: true }), t, .05, -.6 + .2 * (i % 4)); },
  slowdown: (t) => { [['A4', 0], ['F4', .5], ['D4', 1.1]].forEach(([n, d]) => { const x = I.musicBox(m(n), { decay: 2 }); wonder.addMono(x, t + d, .1); verb.addMono(x, t + d, .1); }); },
  softpop: (t, v) => { game.addMono(I.pop(900 + 160 * (v || 0), 11 + (v || 0)), t, .3); mar(RISE[(v || 0) % 6], t, .16); },
  freezerdoor: (t) => { game.addMono(I.thud(120, .06), t, .4); sfx(t + .05, 'hum.wav', .04); },
  bag: (t) => { for (let k = 0; k < 4; k++) game.addMono(I.paperFwip(1.4 + .2 * k, 300 + k), t + k * .07, .1); },
  curious: (t) => { ['F4', 'A4', 'B4'].forEach((n, i) => { const x = I.marimba(m(n) + 12, { decay: .6 }); game.addMono(x, t + i * BEAT / 2, .28 + i * .05); verb.addMono(x, t + i * BEAT / 2, .2); }); },
  timelapse: (t) => { for (let k = 0; k < 24; k++) game.addMono(I.woodTick(1.4 + .02 * k), t + k * .14, .12); game.addMono(I.noiseSweep(3.2, 500, 1500, { q: .8 }), t, .05); },
  pour: (t, i) => { for (let k = 0; k < 5 - i; k++) { const x = I.pop(500 + 60 * k + 40 * i, 300 + k + i * 10); game.addMono(x, t + k * .09, .14); } },
  win: (t) => { game.addMono(I.thud(72, .12), t, .8); ['C5', 'F5', 'A5', 'C6'].forEach((n, i) => mar(n, t + i * .06, .42)); sfx(t + .05, 'sparkle.wav', .1); },
  clink: (t) => { const a = I.bell(2100, .14, 2.5, 2.7); game.addMono(a, t, .25); verb.addMono(a, t, .15); game.addMono(I.rim(1.3, 2), t, .3); },
  lower: (t) => { for (let k = 0; k < 6; k++) game.addMono(I.rim(.6 + .05 * k, 400 + k), t + k * .15, .1); },
  snap: (t) => { game.addMono(I.thud(180, .04), t, .6); game.addMono(I.rim(2.0, 9), t, .45); const x = I.bell(1900, .2, 2.4, 2.7); game.addMono(x, t, .2); verb.addMono(x, t, .15); },
  rise: (t, v) => { mar(RISE[v % RISE.length], t, .4); game.addMono(I.pop(1300 + 120 * v, 50 + v), t, .3); },
  sparkle: (t) => { ['C6', 'E6', 'G6', 'C7'].forEach((n, i) => { const x = I.musicBox(m(n)); game.addMono(x, t + i * .05, .13); verb.addMono(x, t + i * .05, .1); }); },
  lid: (t) => { game.addMono(I.thud(160, .05), t, .6); game.addMono(I.paperFwip(.8, 11), t, .2); },
  cheerhit: (t) => { ['F5', 'A5', 'C6', 'F6'].forEach((n, i) => mar(n, t + i * .05, .4)); game.addMono(CL, t + .2, .4); sfx(t + .1, 'ep05_laugh.wav', .06); },
  fanclick: (t) => { game.addMono(I.rim(2.2, 320), t, .45); game.addMono(I.woodTick(2.4), t + .01, .25); },
  fanrun: (t, d) => { for (let x = 0; x < d; x += .5) game.addMono(I.noiseSweep(.6, 220, 260, { q: .6, pink: true }), t + x, .05 * Math.min(1, x / .5) * Math.min(1, (d - x) / .6)); },
  turn: (t) => { game.addMono(I.thud(140, .05), t, .3); game.addMono(I.paperFwip(.6, 12), t, .12); },
  coin: (t, v) => { [0, .13].forEach((d, i) => { const c = I.ting(93 + i * 2, { gap: .06 }); game.addMono(c, t + d, .55); verb.addMono(c, t + d, .22); }); },
  levelup: (t) => { [['F4', 0], ['A4', .1], ['C5', .2], ['F5', .3]].forEach(([n, d]) => { const x = I.brassNote(m(n), .25, { stab: true }); game.addMono(x, t + d, .22); }); const x = I.brassNote(m('A5'), .8); game.addMono(x, t + .42, .2); verb.addMono(x, t + .42, .1); sfx(t + .4, 'sparkle.wav', .08); },
  // Heart mystery hint #1: one tiny digital blip under the logo's flicker (quiet; most will not notice it)
  blip: (t) => { for (let k = 0; k < 3; k++) game.addMono(I.pop(3200 + 400 * k, 500 + k), t + k * .03, .06); },
  term: (t) => { ['C6', 'E6', 'G6', 'C7'].forEach((n, i) => { const x = I.musicBox(m(n), { decay: 1.8 }); game.addMono(x, t + i * .1, .18); verb.addMono(x, t + i * .1, .18); }); game.addMono(I.noiseSweep(.35, 600, 2600, { q: 1.2 }), t - .1, .1); },
  paper: (t) => { game.addMono(I.paperFwip(.7, 9), t, .3); game.addMono(I.paperFwip(1, 10), t + .15, .2); },
  glow: (t, v) => { const x = I.musicBox(m(['F6', 'A6', 'C7'][v % 3]), { decay: 1.6 }); game.addMono(x, t, .24); verb.addMono(x, t, .2); mar(['F5', 'A5', 'C6'][v % 3], t, .28); },
  sting: (t) => { ['C5', 'F5', 'A5', 'C6', 'F6'].forEach((n, i) => mar(n, t + i * .075, .38)); game.addMono(CL, t + .38, .4); game.addMono(I.thud(90, .08), t + .38, .5); },
  drum: (t, v) => { game.addMono(I.tom(130 - 14 * v, .3, 7 + v), t, .9); game.addMono(K, t, .7); },
  blast: (t) => { for (const [n, g] of [['F4', .5], ['A4', .45], ['C5', .45], ['F5', .5], ['A5', .4]]) { const x = I.brassNote(m(n), .9); game.addMono(x, t, g * .5); verb.addMono(x, t, g * .2); }
    const c = I.crash(11), c2 = I.crash(12); game.addMono(c, t, .3); game.addMono(c2, t + .02, .18, .5); verb.addMono(c, t, .15); game.addMono(K, t, 1.0); game.addMono(I.thud(70, .14), t, .9); game.addMono(I.pop(1800, 131), t, .8);
    ['F5', 'A5', 'C6', 'F6', 'A6', 'C7'].forEach((n, i) => mar(n, t + i * .045, .5, { decay: .7 })); chordAt(t, ['F4', 'A4', 'C5', 'F5', 'A5'], .12, 3.0); },
  scratch: (t) => { game.addMono(I.scratch ? I.scratch(.35) : I.noiseSweep(.35, 2000, 300), t, .35); },
  clapper: (t) => { game.addMono(I.woodTick(.5), t, .9); game.addMono(I.thud(200, .03), t, .6); },
  // ---- P4 EP1
  whirr: (t, d) => { for (let x = 0; x < d; x += .09) game.addMono(I.rim(1.6 + .2 * Math.min(1, x / 1.2), 600 + Math.round(x * 50)), t + x, .07 * Math.min(1, x / .4)); game.addMono(I.noiseSweep(Math.max(.4, d), 700, 1800, { q: .9 }), t, .05); },
  thump: (t) => { game.addMono(I.thud(80, .16), t, .9); game.addMono(I.noiseSweep(.5, 800, 260, { q: .6, pink: true }), t, .16); },
  bonk: (t) => { game.addMono(I.tom(320, .08, 31), t, .4); game.addMono(I.woodTick(1.8), t, .2); },
  rustle: (t) => { for (let k = 0; k < 4; k++) game.addMono(I.paperFwip(1.2 + .2 * k, 70 + k), t + k * .12, .08); },
  pat: (t) => { game.addMono(I.thud(140, .05), t, .45); game.addMono(I.thud(140, .05), t + .22, .35); },
  roll: (t) => { for (let k = 0; k < 10; k++) game.addMono(I.rim(1.4 + .03 * k, 900 + k), t + k * .2, .06); const x = I.bell(2350, .15, 1.4, 2.0); game.addMono(x, t + .1, .08); },
  ropetie: (t) => { for (let k = 0; k < 3; k++) game.addMono(I.paperFwip(.8 + .2 * k, 140 + k), t + k * .15, .12); },
  lift: (t) => { game.addMono(I.thud(200, .04), t, .3); game.addMono(I.rim(1.0, 77), t + .05, .2); },
  ropehiss: (t) => { game.addMono(I.noiseSweep(1.2, 2200, 3400, { q: 2 }), t, .1); for (let k = 0; k < 8; k++) game.addMono(I.rim(2.2, 300 + k), t + k * .14, .05); },
  twitch: (t) => { game.addMono(I.rim(1.2, 51), t, .25); },
  zip: (t) => { game.addMono(I.noiseSweep(.35, 900, 5200, { q: 2.2, shape: (x) => x }), t, .3); },
  flopsoft: (t) => { game.addMono(I.thud(110, .08), t, .55); game.addMono(I.paperFwip(.6, 9), t, .2); },
  chainclick: (t, v) => { game.addMono(I.rim(v ? 2.4 : 2.0, 400 + Math.round(t * 10) % 50), t, v ? .09 : .13); },
  metalhum: (t) => { game.addMono(I.noiseSweep(2.5, 160, 260, { q: .6, pink: true }), t, .08); },
  clunk: (t, v) => { game.addMono(I.thud(v ? 140 : 110, .07), t, v ? .25 : .55); game.addMono(I.rim(.9, 12), t, v ? .1 : .3); verb.addMono(I.rim(.9, 12), t, .1); },
  freewheel: (t, d) => { for (let x = 0, g = 0; x < d; x += .055 + x * .03, g++) game.addMono(I.rim(2.6, 700 + g), t + x, .1 * Math.exp(-x / d * 1.5)); },
  warmchord: (t) => { chordAt(t, ['F4', 'A4', 'C5', 'F5'], .1, 2.4); },
  squeak: (t) => { game.addMono(I.noiseSweep(.25, 2400, 1800, { q: 3 }), t, .12); },
  sadnote: (t) => { const a = I.brassNote(m('F#3'), .9, { bright: .6 }); game.addMono(a, t, .24); verb.addMono(a, t, .1); },
  spanner: (t) => { game.addMono(I.rim(1.9, 81), t, .3); game.addMono(I.rim(2.3, 82), t + .07, .2); },
  bellting: (t) => { const a = I.bell(2350, .5, 1.4, 2.0), b = I.bell(3520, .3, 1.0, 2.0); game.addMono(a, t, .4); game.addMono(b, t, .12); verb.addMono(a, t, .2); },
  // Heart mystery hint #2: one tiny second "ting" an octave up with a digital edge (a short bit-crushed blip), quiet; most will not notice it
  hint: (t) => { const a = I.bell(4700, .18, 1.6, 2.0); for (let i = 0; i < a.length; i++) a[i] = Math.round(a[i] * 6) / 6; game.addMono(a, t, .07); game.addMono(I.pop(5200, 509), t + .02, .03); },
  softtick: (t) => { game.addMono(I.woodTick(1.3), t, .22); },
  go: (t) => { [['F5', 0], ['A5', .1], ['C6', .2]].forEach(([n, d]) => mar(n, t + d, .3)); },
  farbell: (t) => { const x = I.bell(2600, .2, 1.4, 2.0); amb.addMono(x, t, .03, .7); amb.addMono(x, t + .2, .025, .7); },
  jogstep: (t, v) => { game.addMono(I.thud(150, .03), t, .08 * (v || 1)); },
  heartbeat: (t) => { game.addMono(I.thud(55, .14), t, .32); game.addMono(I.thud(50, .1), t + .2, .22); },
  breathe: (t) => { game.addMono(I.noiseSweep(.7, 500, 1400, { q: .6, pink: true }), t, .06); },
  hop: (t, i) => { game.addMono(I.thud(170, .04), t, .3); game.addMono(I.paperFwip(.9, 200 + i), t, .06); },
  deskbell: (t) => { const a = I.bell(1975, .7, 1.4, 2.0), b = I.bell(2960, .45, 1.0, 2.0); game.addMono(a, t, .45); game.addMono(b, t, .18); verb.addMono(a, t, .25); },
  boing: (t) => { game.addMono(I.boing(), t, .5); },
});
let miss = new Set(); C.ev.forEach((e, i) => { if (P[e.k]) P[e.k](e.t, e.v, i); else miss.add(e.k); }); if (miss.size) console.log('no sound for', [...miss]);
// ---------- mix: the music ducks under every voice line; the ambience and the journey pad duck a little
const music = []; for (const bd of Object.values(beds)) music.push(...Object.values(bd));
MIX.duck(music, voice, { depth: .62, release: .3 }); MIX.duck([amb], voice, { depth: .4, release: .3 }); MIX.duck([wonder], voice, { depth: .35, release: .5 }); MIX.duck([game], voice, { depth: .25, release: .2 });
MIX.duck([calm], voice, { depth: .4, release: .3 });
const stems = { amb, wonder, game, voice, calm, verb: reverb(verb, { room: .7, damp: .4 }) }; const GAIN = { amb: 2.0, wonder: .85, game: .75, voice: 2.3, calm: 1.5, verb: .9 };
const BG = { drums: .5, bass: .55, keys: 1.6, lead: .9, pad: 1.4, brass: 1.0 };
for (const [name, bd] of Object.entries(beds)) for (const [k, x] of Object.entries(bd)) { stems[name + '_' + k] = x; GAIN[name + '_' + k] = BG[k] * (name === 'lite' ? .9 : name === 'tense' ? 1.5 : 1); }
const mix = MIX.mixdown(stems, GAIN, { stemDir: process.env.STEMS ? path.join(__dirname, "out", "stems") : null }); MIX.highpass(mix, 30);
MIX.fadeOut(mix, C.END - 1.2, C.END - .05);
const M = MIX.master(mix, .8, .78, { lufs: -16 });   // ceiling .78: true peak <= -1.5 dBTP after AAC (it measured -1.2 with .84)
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true }); MIX.writeWav(path.join(__dirname, 'out', `mix_p${PART}.wav`), mix);
console.log(`wrote out/mix_p${PART}.wav (${DUR.toFixed(2)} s${M && M.lufs !== undefined ? `, ${M.lufs.toFixed(1)} LUFS` : ''})`);
