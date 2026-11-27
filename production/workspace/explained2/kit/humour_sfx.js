// humour_sfx.js: the series default for COMIC sound effects (teacher, 27 Nov 2026, on the live P4 EP1: "humour are ok. Just make the sound
// effects for humour louder. Dont be shy."). Every humour event is rendered on its own, measured, and set ABOVE_DB above the dialogue
// around it (the median level of the lines within WIN s), never quieter than its old level; the humour bus is then
//   - ducked under the voice (DUCK_UNDER_VOICE): a gag never sits on top of a spoken word;
//   - peak-limited on its own (a 3 ms lookahead limiter at LIMIT) so the master limiter does not squash the voice;
//   - and the music / ambience beds duck under it (BED_DUCK), so it punches through.
// The voice is never touched. Use from an episode's song.js:
//   const HS = require('../kit/humour_sfx'); const hb = HS.render(C.ev, P, HS.HUMOUR, { setBus, N, SR, voice, voiceGain, lines });
//   then MIX.duck(beds, hb, { depth: HS.DEFAULTS.BED_DUCK }) and add hb to the stems with GAIN = the old sfx bus gain.
const DEFAULTS = { ABOVE_DB: 3, MIN_GAIN: 1, MAX_GAIN: 10, WIN: 8, DUCK_UNDER_VOICE: .6, BED_DUCK: .5, LIMIT: .9 };
// the comic events (sound_cues keys): stings, flops, slapstick hits, comic sound-words, the pigeon gags, the snail-cam jokes
const HUMOUR = new Set(["sadtrombone", "kazoo", "kazoobwop", "pigeonkoo", "pigeontakeoff", "pigeonland", "flutter", "clink", "sproing", "splash",
  "whoosh", "whooshbig", "clang", "clatter", "boing", "bonk2", "toot", "squelch", "squelchslow", "whirr", "whiff", "plip", "slurp", "brrr",
  "rimshot", "clap", "chainheap"]);
const LEN = { sadtrombone: 2.6, pigeonkoo: .8, pigeontakeoff: 1.0, pigeonland: .5, whirr: 4.4, squelchslow: 1.6, toot: .6, splash: 1.4 };
function rmsActive(L, R, a, b) { let pk = 0; for (let i = a; i < b; i++) pk = Math.max(pk, Math.abs(L[i] + R[i]) / 2); const th = pk * .1; let s = 0, n = 0;
  for (let i = a; i < b; i++) { const v = (L[i] + R[i]) / 2; if (Math.abs(v) > th) { s += v * v; n++; } } return n ? Math.sqrt(s / n) : 0; }
// ev: the cue events; P: the handlers (they draw into whatever bus setBus(b) makes current); returns { bus, report }
function render(ev, P, set, { setBus, makeBus, N, SR, voice, voiceGain, sfxGain, lines, o = {} }) {
  const D = { ...DEFAULTS, ...o }, tmp = makeBus(), hb = makeBus(), report = [];
  const lineLv = lines.map((l) => ({ t: l.t, end: l.end, lv: rmsActive(voice.L, voice.R, Math.round(l.t * SR), Math.min(N, Math.round(l.end * SR))) * voiceGain }));
  for (const e of ev) { if (!set.has(e.k) || !P[e.k]) continue;
    const a = Math.max(0, Math.round((e.t - .05) * SR)), b = Math.min(N, Math.round((e.t + (LEN[e.k] || 1.2) + (e.k === "sadtrombone" ? (e.v || 2) : 0)) * SR));
    setBus(tmp); P[e.k](e.t, e.v); setBus(null);
    const lv = rmsActive(tmp.L, tmp.R, a, b) * sfxGain;
    const near = lineLv.filter((l) => Math.abs(l.t - e.t) < D.WIN || Math.abs(l.end - e.t) < D.WIN).map((l) => l.lv).filter((x) => x > 0).sort((x, y) => x - y);
    const dlg = near.length ? near[Math.floor(near.length / 2)] : lineLv.map((l) => l.lv).sort((x, y) => x - y)[Math.floor(lineLv.length / 2)];
    const g = lv > 0 ? Math.min(D.MAX_GAIN, Math.max(D.MIN_GAIN, dlg * Math.pow(10, D.ABOVE_DB / 20) / lv)) : 1;
    const end = Math.min(N, b + Math.round(2 * SR));   // tails (reverbs, long samples) go along at the same gain
    for (let i = a; i < end; i++) { hb.L[i] += tmp.L[i] * g; hb.R[i] += tmp.R[i] * g; tmp.L[i] = 0; tmp.R[i] = 0; }
    report.push({ t: e.t, k: e.k, gainDb: +(20 * Math.log10(g)).toFixed(1), beforeDbReDialogue: +(20 * Math.log10(lv / dlg)).toFixed(1) }); }
  return { bus: hb, report, D };
}
// a 3 ms lookahead peak limiter (stereo-linked), in place
function limit(b, ceiling, SR) { const la = Math.round(.003 * SR), rel = Math.exp(-1 / (.08 * SR)); let g = 1; const n = b.n;
  const need = new Float32Array(n); for (let i = 0; i < n; i++) { const p = Math.max(Math.abs(b.L[i]), Math.abs(b.R[i])); need[i] = p > ceiling ? ceiling / p : 1; }
  const mn = new Float32Array(n); { const q = []; for (let i = n - 1; i >= 0; i--) { while (q.length && need[q[q.length - 1]] >= need[i]) q.pop(); q.push(i); while (q[0] > i + la) q.shift(); mn[i] = need[q[0]]; } }
  for (let i = 0; i < n; i++) { const tgt = mn[i]; g = tgt < g ? tgt : tgt + (g - tgt) * rel; b.L[i] *= g; b.R[i] *= g; } }
module.exports = { DEFAULTS, HUMOUR, render, limit };
