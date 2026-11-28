// THE SONG of the Short: every sound comes from an event in score.js -> out/music.wav (voices + music + game sounds).
//   node song.js      STEMS=1 also writes out/stem-*.wav;  LUFS=-14 masters to a loudness target
// Sound palette = STYLE_GUIDE section 12: marimba, ukulele-like plucks and hand claps in a major key; soft wood ticks for the
// lock-in that speed up; a small bell at 0; a rubber-stamp thump; one coin "ting" per point; voices always on top.
const path = require('path');
const { SR, Bus, reverb } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
const { BEAT, DURATION, m, ev } = sc;

const N = Math.ceil(DURATION * SR);
const bus = () => new Bus(N);
const drums = bus(), bass = bus(), keys = bus(), uke = bus(), pad = bus(), robot = bus(), game = bus(), amb = bus(), verb = bus();
const panX = (x) => (x / sc.W - 0.5) * 1.1;

// ---------- voices (the real lines; their lengths set the whole timeline) ----------
const voice = bus();
for (const L of Object.values(sc.vo)) MIX.loadAudio(path.join(__dirname, 'voice', L.id + '.wav'), { at: L.t, length: DURATION }).mixInto(voice, 1);

// ---------- the game bed: only where the score says the groove plays ----------
const K = I.kick({ punch: 0.6, tail: 0.2 }), CL = I.clap({ decay: 0.1 }), SH = [I.shaker(0.7, 15), I.shaker(1, 16)];
sc.groove.forEach((t0, bi) => {
  const [root, chord] = sc.CH[bi % 4];
  for (let s = 0; s < 8; s++) {
    const t = t0 + s * BEAT / 2;
    if (s === 0 || s === 4) drums.addMono(K, t, 0.5);
    if (s === 2 || s === 6) { drums.addMono(CL, t, 0.3); verb.addMono(CL, t, 0.1); }
    drums.addMono(SH[s % 2], t, s % 2 ? 0.12 : 0.07, s % 2 ? 0.3 : -0.3);
    if (s % 2 === 0) bass.addMono(I.pizz(m(root) + (s === 4 ? 7 : s === 6 ? 12 : 0), { seed: s }), t, 0.5);
    if (s % 2 === 1) chord.forEach((n, i) => uke.addMono(I.guitar(m(n) + 12, 0.22, { bright: 0.7, sustain: 0.985, seed: i + s }), t + i * 0.012, 0.16, 0.25));   // off-beat strum
  }
});
for (const n of sc.melody) { const x = I.marimba(n.midi, { thock: 0.25 }); keys.addMono(x, n.t, 0.34, -0.15); verb.addMono(x, n.t, 0.1); }

// ---------- sparse bed under the teaching sentences: one soft chord a bar, a music-box note ----------
for (let t = ev.cutBox + BEAT * 2, i = 0; t < ev.tag - BEAT * 2; t += BEAT * 4, i++) {
  if (t > ev.lapse0 - 1 && t < ev.day2 + 0.2) continue;   // the night passes without music
  const [root, chord] = sc.CH[[1, 2, 0, 3][i % 4]];
  for (const n of chord) { const { L, R } = I.padNote(m(n), BEAT * 3.6, { cutoff: 900, attack: 0.5, release: 1.2 }); pad.addStereo(L, R, t, 0.07); }
  bass.addMono(I.pizz(m(root) + 12, { seed: i }), t, 0.3);
}

// ---------- the robot: every step is a wood tick and a tiny foot thud (it IS the percussion) ----------
for (const s of sc.steps) {
  const inRing = s.t >= ev.ring0 - 1e-3 && s.t < ev.cutBox, g = (inRing ? 0.6 : 1) * (0.5 + 0.5 * s.k);
  robot.addMono(I.woodTick(s.i % 2 ? 0.78 : 0.62), s.t, 0.5 * g, s.i % 2 ? 0.12 : -0.12);
  robot.addMono(I.rim(s.i % 2 ? 1.1 : 0.9, s.i), s.t, 0.1 * g);
  if (s.last) { robot.addMono(I.thud(140, 0.05), s.t, 0.5); robot.addMono(I.woodTick(0.45), s.t, 0.5); robot.addMono(I.bell(380, 0.25, 3.5, 2.7), s.t + 0.05, 0.05); }   // clunk + a loose spring
}
robot.addMono(I.boing(), ev.land - 0.02, 0.22); robot.addMono(I.thud(85, 0.09), ev.land, 0.75);            // it stomps in on the downbeat

// ---------- the lock-in ----------
game.addMono(I.pop(1500, 1), ev.tabL, 0.5, -0.6); game.addMono(I.marimba(m('E5')), ev.tabL, 0.3, -0.5);
game.addMono(I.pop(1900, 2), ev.tabR, 0.5, 0.6); game.addMono(I.marimba(m('G5')), ev.tabR, 0.3, 0.5);
for (const k of sc.ticks) game.addMono(I.woodTick(k.strong ? 1.25 : 1.5), k.t, k.strong ? 0.8 : 0.45);
{ const b1 = I.bell(1568, 0.5, 1.4, 2.0), b2 = I.bell(2349, 0.35, 1.0, 2.0);
  game.addMono(b1, ev.bell, 0.42); game.addMono(b2, ev.bell, 0.18); verb.addMono(b1, ev.bell, 0.25); }
game.addMono(I.thud(72, 0.12), ev.stamp, 0.95); game.addMono(I.thwack(), ev.stamp, 0.22);                   // the rubber stamp
for (const p of sc.picks) {                                                                                // a card flips: pop + a marimba note, rising
  game.addMono(I.paperFwip(1.1, p.t * 10 | 0), p.t - 0.09, 0.12);
  game.addMono(I.pop(1700, p.t * 7 | 0), p.t, 0.6); const x = I.marimba(m(p.note), { thock: 0.5 }); game.addMono(x, p.t, 0.55); verb.addMono(x, p.t, 0.2);
}

// ---------- the evidence ----------
game.addMono(I.paperFwip(1.3, 5), ev.window - 0.05, 0.14); game.addMono(I.pop(1100, 6), ev.window, 0.4);     // the window on its back
{ // night crickets, then morning birds (one night goes by)
  const n0 = ev.lapse0 + 0.25, n1 = ev.day2 - 0.75;
  for (let t = n0; t < n1; t += 0.42) for (let j = 0; j < 3; j++) amb.addMono(I.bell(4300 + (j % 2) * 180, 0.022, 0.6, 1.5), t + j * 0.055, 0.035, ((t * 7) % 2) - 1);
  for (let j = 0; j < 3; j++) amb.addMono(I.whistle(0.07 + 0.03 * j), n1 + 0.1 + j * 0.17, 0.035, 0.5 - j * 0.3);
}
game.addMono(I.woodTick(0.5), ev.day2, 0.8); game.addMono(I.thud(210, 0.03), ev.day2, 0.6); game.addMono(I.rim(0.8, 3), ev.day2, 0.3);   // the counter clacks

// ---------- the verdict ----------
ev.icons.forEach((t, i) => { game.addMono(I.tom(196 - i * 22, 0.11), t, 0.3); game.addMono(I.pop(700, 30 + i), t, 0.18); });        // three soft "no" boops
game.addMono(I.pizz(m('C4')), ev.grow, 0.3); game.addMono(I.pizz(m('C4'), { seed: 2 }), ev.grow + 0.16, 0.25);                // "it does not grow": the same note twice
game.addMono(I.paperFwip(0.8, 9), ev.card - 0.06, 0.2);
{ const d = I.ting(88); game.addMono(d, ev.tag, 0.6); verb.addMono(d, ev.tag, 0.3); game.addMono(I.thud(95, 0.07), ev.tag, 0.5);   // the tag lands: ding + a warm chord
  for (const n of ['C4', 'E4', 'G4', 'C5']) { const { L, R } = I.padNote(m(n), 2.2, { cutoff: 1500, attack: 0.03, release: 1.4 }); pad.addStereo(L, R, ev.tag, 0.1); }
  ['C5', 'E5', 'G5'].forEach((n, i) => { const x = I.marimba(m(n)); keys.addMono(x, ev.tag + i * 0.07, 0.3); verb.addMono(x, ev.tag + i * 0.07, 0.15); }); }

// ---------- the score ----------
game.addMono(I.noiseSweep(0.22, 600, 2400, { q: 1.5 }), ev.score - 0.2, 0.08);
{ const c = I.ting(93, { gap: 0.06 }); game.addMono(c, ev.coin, 0.7); verb.addMono(c, ev.coin, 0.3); game.addMono(I.pop(2200, 41), ev.coin, 0.4);
  const c2 = I.ting(89, { gap: 0.06 }); game.addMono(c2, ev.coin2, 0.5); verb.addMono(c2, ev.coin2, 0.2); }

// ---------- the question, then the end card ----------
['F4', 'A4', 'B4'].forEach((n, i) => { const x = I.marimba(m(n) + 12, { decay: 0.6 }); keys.addMono(x, ev.cutBean + 0.02 + i * BEAT / 2, 0.3 + i * 0.05); verb.addMono(x, ev.cutBean + i * BEAT / 2, 0.25); });   // a curious, unfinished phrase
{ const { L, R } = I.padNote(m('F3'), ev.end - ev.cutBean - 0.4, { cutoff: 700, attack: 0.6, release: 0.5 }); pad.addStereo(L, R, ev.cutBean + 0.2, 0.09); }
game.addMono(I.thud(80, 0.1), ev.end, 0.7); drums.addMono(CL, ev.end, 0.4);
for (const n of sc.endNotes) { const x = I.marimba(n.midi, { decay: 0.7 }); keys.addMono(x, n.t, 0.45); verb.addMono(x, n.t, 0.25); }
['C3', 'G3', 'E4', 'G4', 'C5'].forEach((n, i) => uke.addMono(I.guitar(m(n) + 12, 1.6, { bright: 0.6, seed: i }), ev.end + i * 0.02, 0.2));
for (const n of ['C4', 'E4', 'G4', 'D5']) { const { L, R } = I.padNote(m(n), DURATION - ev.end - 0.6, { cutoff: 1400, attack: 0.1, release: 1.5 }); pad.addStereo(L, R, ev.end, 0.07); }
[2, 3].forEach((b) => drums.addMono(CL, ev.end + b * BEAT, 0.25));

// ---------- mix: the music ducks under every voice line ----------
const music = [drums, bass, keys, uke, pad];
MIX.duck(music, voice, { depth: 0.62, release: 0.3 });
MIX.duck([robot, amb], voice, { depth: 0.4, release: 0.25 });
const stems = { drums, bass, keys, uke, pad, robot, game, amb, voice, verb: reverb(verb, { room: 0.7, damp: 0.4 }) };
const GAIN = { drums: 0.5, bass: 0.55, keys: 0.8, uke: 2.4, pad: 1.6, robot: 0.55, game: 0.8, amb: 1, voice: 2.3, verb: 0.9 };
const out = path.join(__dirname, 'out');
const mix = MIX.mixdown(stems, GAIN, { stemDir: process.env.STEMS ? out : null });
MIX.highpass(mix, 30);
MIX.fadeOut(mix, DURATION - 1.2, DURATION);
const M = MIX.master(mix, parseFloat(process.env.DRIVE || '0.8'), undefined, { lufs: process.env.LUFS ? parseFloat(process.env.LUFS) : -14 });
MIX.writeWav(path.join(out, 'music.wav'), mix);
console.log(`wrote out/music.wav (${DURATION.toFixed(2)}s${M && M.lufs !== undefined ? `, ${M.lufs.toFixed(1)} LUFS at drive ${M.drive.toFixed(2)}` : ''})`);
