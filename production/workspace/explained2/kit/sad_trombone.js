// sad_trombone.js (P4 EP1 v2 fix pass 6, 27 Nov 2026; teacher: "when the joke is out, put a funny low music tune instead"): the series'
// ORIGINAL low "sad trombone" fail sting, synthesized here (nothing sampled or copied): a low brass tone (a band-limited saw with a brassy
// bite), a plunger-mute "wah" on every note (a resonant low-pass that opens and closes), four notes falling a semitone at a time
// (D3, C#3, C3, B2), the last one held with a widening, wobbly vibrato that sags at the end. A running gag for P4: reuse it.
//   const { sadTrombone } = require('../kit/sad_trombone'); sadTrombone(48000, 2.4)  -> Float32Array (peak .9)
//   node kit/sad_trombone.js   -> ../sau/sfx/sad_trombone.wav (2.4 s) and sad_trombone_quick.wav (0.65 s, for a short pause), 48 kHz mono
const fs = require('fs'), path = require('path');
function sadTrombone(SR = 48000, dur = 2.4, seed = 7) {
  const n = Math.round((dur + .12) * SR), x = new Float32Array(n), hz = (m) => 440 * 2 ** ((m - 69) / 12);
  const short = dur < 1.2, d1 = dur * (short ? .17 : .16), gap = dur * .015, last = dur - 3 * (d1 + gap);
  const notes = [[50, 0, d1], [49, d1 + gap, d1], [48, 2 * (d1 + gap), d1], [47, 3 * (d1 + gap), last]];
  let r = seed; const rnd = () => ((r = (r * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1;
  notes.forEach(([m, t0, d], k) => { const i0 = Math.round(t0 * SR), L = Math.round(d * SR), held = k === 3; let ph = 0, lp1 = 0, lp2 = 0, bp = 0;
    for (let i = 0; i < L + Math.round(.1 * SR) && i0 + i < n; i++) { const u = Math.min(1, i / L), tt = i / SR;
      const vib = held ? (.004 + .03 * u) * Math.sin(2 * Math.PI * (5.2 + 1.5 * u) * tt) - .045 * Math.max(0, u - .7) / .3 : .003 * Math.sin(2 * Math.PI * 5 * tt);
      const f = hz(m) * (1 + vib) * (1 + (k === 0 ? -.02 * Math.exp(-tt / .03) : -.012 * Math.exp(-tt / .03)));   // a little scoop up into each note
      ph += f / SR; let s = 0; for (let h = 1; h <= 14; h++) s += Math.sin(2 * Math.PI * h * ph) / h * (h % 2 ? 1 : .8);   // a brassy saw
      s = Math.tanh(1.6 * s) + .01 * rnd();
      // the plunger: a resonant low-pass opening "wa" and closing again ("ah" -> "oo"); the held note opens slowly and closes at the end
      const wa = held ? Math.min(1, tt / .18) * (1 - .7 * Math.max(0, u - .55) / .45) : Math.sin(Math.PI * Math.min(1, tt / (d * .95))) ** .7;
      const fc = 260 + 1300 * wa, a = 1 - Math.exp(-2 * Math.PI * fc / SR); lp1 += a * (s - lp1); lp2 += a * (lp1 - lp2); bp += .02 * ((lp1 - lp2) - bp);
      const y = lp2 + .9 * (lp1 - lp2 - bp);
      const env = Math.min(1, tt / .015) * (i < L ? 1 : Math.exp(-(i - L) / (.03 * SR))) * (held ? 1 - .25 * u : 1);
      x[i0 + i] += y * env; } });
  let mx = 0; for (const v of x) mx = Math.max(mx, Math.abs(v)); for (let i = 0; i < n; i++) x[i] *= .9 / (mx || 1); return x;
}
function writeWav(file, x, SR) { const b = Buffer.alloc(44 + x.length * 2); b.write('RIFF', 0); b.writeUInt32LE(36 + x.length * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(x.length * 2, 40);
  for (let i = 0; i < x.length; i++) b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, x[i])) * 32767), 44 + 2 * i); fs.writeFileSync(file, b); }
module.exports = { sadTrombone };
if (require.main === module) { const D = path.join(__dirname, '..', '..', 'sau', 'sfx');
  writeWav(path.join(D, 'sad_trombone.wav'), sadTrombone(48000, 2.4), 48000); writeWav(path.join(D, 'sad_trombone_quick.wav'), sadTrombone(48000, .65), 48000);
  console.log('wrote', path.join(D, 'sad_trombone.wav'), 'and sad_trombone_quick.wav'); }
