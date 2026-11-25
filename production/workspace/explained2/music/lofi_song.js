// lofi_song.js: runs an episode's OWN song.js (unchanged on disk) with Kampong Walk as the music bed, and writes the mix to <out.wav>.
//   node lofi_song.js <epdir> <part> <out.wav> [bed.wav]
// song.js is read and patched in memory only (three anchors, each must match once, or this stops):
//   1. after `const C = JSON.parse(...)`: the old music regions are emptied (C.R.groove, C.R.calm and the outro groove), so the game bed
//      and the calm bed are gone; every sound effect, ambience, roll, voice and chant stays. C.R.wonder is KEPT (teacher, 2026-11-25: "for
//      shrink down scenes, the music should pause, like a quiet journey in the first few episodes"): the episode's own micro-world pad (a
//      slow warm pad, soft bells, no rhythm) plays in every journey, and Kampong Walk fades out going in and back in after the pull-out.
//   2. before `const mix = MIX.mixdown(`: the Kampong Walk bus is added to the stems (see addBed).
//   3. the final writeWav goes to <out.wav>, and the levels are reported.
// SERIES_FORMAT.md "Background music (Kampong Walk)" is the rule this follows.
const Module = require('module'), path = require('path'), fs = require('fs');
const [EP, PART, OUT, BED_ARG] = process.argv.slice(2);
if (!EP || !PART || !OUT) { console.error('usage: node lofi_song.js <epdir> <part> <out.wav> [bed.wav]'); process.exit(2); }
const EPDIR = path.resolve(EP), BED = path.resolve(BED_ARG || path.join(__dirname, 'kampong_walk.wav'));
// the levels (SERIES_FORMAT.md): the bed under speech at about -28 LUFS short-term, about 4 dB higher in the gaps
const UNDER_VOICE_LUFS = +(process.env.LOFI_UNDER || -28), DEPTH = +(process.env.LOFI_DEPTH || 0.4);
const FADE_IN = 3.0, FADE_OUT = 4.0, DIP_OUT = 0.8, DIP_IN = 1.5;   // every dip is a smooth (smoothstep) fade, never a cut
const J_OUT = 1.2, J_IN = 1.5;   // a journey: Kampong Walk is gone by the start of "Be a ...! Shrink down. Quietly." and comes back after the pull-out
const { SR, Bus } = require(path.join(EPDIR, 'audio', 'dsp')); const MIX = require(path.join(EPDIR, 'audio', 'mix'));
// LOFI_CEILING (add_lofi.py sets it only when the AAC file's true peak came out over -1.5 dBTP): a lower limiter ceiling than song.js's .84
if (process.env.LOFI_CEILING) { const orig = MIX.master; MIX.master = (b, drive, ceiling, o) => orig(b, drive, +process.env.LOFI_CEILING, o); }

// short-term loudness (3 s, K-weighted, ungated, BS.1770 48 kHz coefficients as audio/mix.js lufs) every 0.5 s: [{t (window centre), lufs}]
function shortTerm(L, R, gain = 1) {
  const kw = (x) => { const y = new Float64Array(x.length); let x1 = 0, x2 = 0, y1 = 0, y2 = 0, z1 = 0, z2 = 0, w1 = 0, w2 = 0;
    for (let i = 0; i < x.length; i++) { const xi = x[i] * gain; const v = 1.53512485958697 * xi - 2.69169618940638 * x1 + 1.19839281085285 * x2 + 1.69065929318241 * y1 - 0.73248077421585 * y2;
      x2 = x1; x1 = xi; y2 = y1; y1 = v; const u = v - 2 * z1 + z2 + 1.99004745483398 * w1 - 0.99007225036621 * w2; z2 = z1; z1 = v; w2 = w1; w1 = u; y[i] = u * u; } return y; };
  const a = kw(L), b = kw(R), cum = new Float64Array(L.length + 1); for (let i = 0; i < L.length; i++) cum[i + 1] = cum[i] + a[i] + b[i];
  const W = 3 * SR, H = SR / 2, out = []; for (let s = 0; s + W <= L.length; s += H) out.push({ t: (s + W / 2) / SR, s, lufs: -0.691 + 10 * Math.log10((cum[s + W] - cum[s]) / W + 1e-20) }); return out;
}
// the journey spans of a part: [[start, end]] (see addBed)
function journeys(C, TL) { const W = C.R.wonder || [], sc = TL.scenes, cov = (s) => W.some(([a, b]) => Math.min(b, s.t1) - Math.max(a, s.t0) > 0.5);
  const isJ = (s) => /^(waitw|shrink|pullout)$/.test(s.name) || cov(s); let sp = [];
  for (const s of sc) { if (!isJ(s)) continue; const last = sp[sp.length - 1]; if (last && s.t0 - last[1] < 0.05) { last[1] = Math.max(last[1], s.t1); last[2].push(s.name); } else sp.push([s.t0, s.t1, [s.name]]); }
  for (const [a, b] of W) { const o = sp.find((x) => a < x[1] && b > x[0]); if (o) { o[0] = Math.min(o[0], a); o[1] = Math.max(o[1], b); o[3] = 1; } else sp.push([a, b, ['wonder'], 1]); }
  return sp.filter((x) => x[3] || x[2].includes('shrink')).map((x) => [x[0], x[1]]).sort((p, q) => p[0] - q[0]); }
const median = (a) => { if (!a.length) return NaN; const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };
const smooth = (x) => x * x * (3 - 2 * x);

const S = { info: {} };
global.__LOFI = {
  strip(C) { S.removed = { groove: (C.R.groove || []).length, calm: (C.R.calm || []).length, outro: !!C.R.outro }; S.wonderKept = (C.R.wonder || []).length;
    C.R.groove = []; C.R.calm = []; C.R.outro = null; },   // C.R.wonder stays: the journey's own pad
  addBed({ C, TL, voice, stems, GAIN, N }) {
    // the loop, repeated for the whole part
    const r = require('child_process').spawnSync('ffmpeg', ['-v', 'error', '-i', BED, '-f', 'f32le', '-ac', '2', '-ar', String(SR), '-'], { maxBuffer: 2 ** 31 });
    if (r.status !== 0) throw new Error('could not decode ' + BED);
    const x = new Float32Array(r.stdout.buffer.slice(r.stdout.byteOffset, r.stdout.byteOffset + r.stdout.length)), n = x.length / 2;
    const bed = new Bus(N); for (let i = 0; i < N; i++) { const j = (i % n) * 2; bed.L[i] = x[j]; bed.R[i] = x[j + 1]; }
    // the shape: fade in from 0, fade out to the end; silent under every countdown, the clapped chant, and the "Now you know!" shout
    const END = C.END, env = new Float32Array(N).fill(1), dips = [];
    for (const k of Object.keys(TL.marks)) if (k.startsWith('ring0_') && TL.marks['bell_' + k.slice(6)] !== undefined) dips.push(['countdown ' + k.slice(6), TL.marks[k] - 0.12, TL.marks['bell_' + k.slice(6)] + 0.45]);
    const beats = C.ev.filter((e) => e.k === 'clap' || e.k === 'stomp').map((e) => e.t).sort((a, b) => a - b);
    for (let i = 0; i < beats.length;) { let j = i; while (j + 1 < beats.length && beats[j + 1] - beats[j] < 2.5) j++; if (j > i) dips.push(['chant', beats[i] - 0.3, beats[j] + 1.0]); i = j + 1; }
    const nyk = TL.order.map((id) => TL.lines[id]).filter((L) => /now you know/i.test(L.text || '')).sort((a, b) => a.t - b.t)[0];
    if (nyk) { const bl = C.ev.find((e) => e.k === 'blast' && e.t >= nyk.t - 1 && e.t <= nyk.end + 2); dips.push(['now you know', nyk.t - 0.1, (bl ? bl.t : nyk.end) + 1.2]); }
    // the journeys (2026-11-25): silent from the start of the "Be a ...!" scene (waitw) through the shrink-down to the end of the pull-out,
    // where the episode's own wonder pad plays. A span = consecutive waitw / shrink / pullout scenes and any scene the C.R.wonder pad covers
    // (EP0 Part 2's journey scene is "garden"), merged with the wonder regions themselves; kept only if it holds a shrink or a wonder region.
    for (const sp of journeys(C, TL)) dips.push(['journey', sp[0], sp[1], J_OUT, J_IN]);
    for (let i = 0; i < N; i++) { const t = i / SR; let g = Math.min(1, smooth(Math.min(1, t / FADE_IN)), smooth(Math.max(0, Math.min(1, (END - 0.05 - t) / FADE_OUT))));
      for (const [, a, b, fo = DIP_OUT, fi = DIP_IN] of dips) { if (t >= a - fo && t < a) g = Math.min(g, smooth((a - t) / fo)); else if (t >= a && t <= b) g = 0; else if (t > b && t < b + fi) g = Math.min(g, smooth((t - b) / fi)); }
      env[i] = g; bed.L[i] *= g; bed.R[i] *= g; }
    // the checks the teacher asked for (2026-11-24, EP19's old beds "sounded disjointed"): ONE bed, never restarted (the loop runs on in
    // time through every dip; its seam is folded, so a wrap is not a restart), and no hard cut: no 50 ms step of the shape over 0.2
    let cuts = 0; for (let i = SR / 20; i < N; i += SR / 20) if (Math.abs(env[i] - env[i - SR / 20]) > 0.2) cuts++;
    S.continuity = { beds: 1, beat_restarts: 0, hard_cuts: cuts, loop_wraps: Math.floor((N - 1) / n), dips: dips.length };
    // the duck: the same envelope-follower ducker as the old music (audio/mix.js duck), slower to come back so it never pumps between words
    const before = { L: Float32Array.from(bed.L), R: Float32Array.from(bed.R) };
    MIX.duck([bed], voice, { depth: DEPTH, attack: 0.03, release: 0.6, threshold: 0.02 });
    const dg = new Float32Array(N); for (let i = 0; i < N; i += 64) { const a = Math.abs(before.L[i]) + Math.abs(before.R[i]); dg[i] = a > 1e-6 ? (Math.abs(bed.L[i]) + Math.abs(bed.R[i])) / a : NaN; }
    // the level: the master drive the part would get WITHOUT the bed, then the bed set so it sits at UNDER_VOICE_LUFS under speech
    const probe = MIX.mixdown(stems, GAIN); MIX.highpass(probe, 30); MIX.fadeOut(probe, C.END - 1.6, C.END - .05); const d0 = MIX.master(probe, .8, undefined, { lufs: -16 }).drive;
    const cls = (w) => { let e1 = true, gs = []; for (let i = w.s; i < w.s + 3 * SR; i += 64 * 50) { if (env[i] < 0.999) e1 = false; if (!Number.isNaN(dg[i - (i % 64)])) gs.push(dg[i - (i % 64)]); }
      if (!e1 || !gs.length) return 'shaped'; const m = gs.reduce((a, v) => a + v, 0) / gs.length; return m < 1 - 0.9 * DEPTH ? 'voice' : m > 1 - 0.15 * DEPTH ? 'gap' : 'mixed'; };
    const st0 = shortTerm(bed.L, bed.R, d0); st0.forEach((w) => { w.c = cls(w); });
    const u0 = median(st0.filter((w) => w.c === 'voice').map((w) => w.lufs));
    const g = Math.pow(10, (UNDER_VOICE_LUFS - u0) / 20);
    stems.lofi = bed; GAIN.lofi = g; S.bed = bed; S.st0 = st0; S.g = g; S.stems = stems; S.GAIN = GAIN; S.jspans = journeys(C, TL);
    S.info = { dips: dips.map(([k, a, b]) => [k, +a.toFixed(2), +b.toFixed(2)]), wonder_kept: S.wonderKept, rule: 'journey-pause 2026-11-25', drive_without_bed: +d0.toFixed(3), bed_gain: +g.toFixed(4), depth_db: +(20 * Math.log10(1 - DEPTH)).toFixed(1) };
  },
  done(mix, M) {
    const d = (M && M.drive) || (MIX.master.last && MIX.master.last.drive), st = shortTerm(S.bed.L, S.bed.R, S.g * d);
    const pick = (c) => st.filter((w, i) => S.st0[i].c === c).map((w) => w.lufs);
    S.info.final_lufs = M && M.lufs !== undefined ? +M.lufs.toFixed(2) : null; S.info.drive = +d.toFixed(3);
    S.info.bed_under_voice_lufs_s = +median(pick('voice')).toFixed(1); S.info.bed_in_gaps_lufs_s = +median(pick('gap')).toFixed(1);
    S.info.bed_loudest_lufs_s = +Math.max(...st.map((w) => w.lufs)).toFixed(1); S.info.removed = S.removed;
    S.info.windows = { voice: pick('voice').length, gap: pick('gap').length }; S.info.continuity = S.continuity;
    // inside each journey (its 3 s windows wholly inside the span): Kampong Walk's loudest short-term level (silent: -inf, shown as null)
    // and the wonder pad's median level, both as they sit in the final master
    const sw = S.stems.wonder ? shortTerm(S.stems.wonder.L, S.stems.wonder.R, S.GAIN.wonder * d) : [];
    S.info.journeys = S.jspans.map(([a, b]) => { const inJ = (w) => w.t - 1.5 >= a && w.t + 1.5 <= b, bl = st.filter(inJ).map((w) => w.lufs), wl = sw.filter(inJ).map((w) => w.lufs), mx = Math.max(...bl);
      return { span: [+a.toFixed(2), +b.toFixed(2)], kampong_max_lufs_s: mx > -70 ? +mx.toFixed(1) : null, wonder_pad_median_lufs_s: wl.length ? +median(wl).toFixed(1) : null }; });
    console.log('LOFI ' + JSON.stringify(S.info));
  },
  out: path.resolve(OUT),
};
let src = fs.readFileSync(path.join(EPDIR, 'song.js'), 'utf8');
const patch = (re, f) => { const m = src.match(new RegExp(re.source, re.flags.replace('g', '') + 'g')); if (!m || m.length !== 1) throw new Error(`song.js anchor ${re} matched ${m ? m.length : 0} times (need exactly 1)`); src = src.replace(re, f); };
patch(/^const C = JSON\.parse\(.*$/m, (s) => s + '\n__LOFI.strip(C);');
patch(/^const mix = MIX\.mixdown\(/m, (s) => '__LOFI.addBed({ C, TL, voice, stems, GAIN, N });\n' + s);
patch(/MIX\.writeWav\(path\.join\(__dirname, 'out', `mix_p\$\{PART\}\.wav`\), mix\);/, () => 'MIX.writeWav(__LOFI.out, mix); __LOFI.done(mix, M);');
const file = path.join(EPDIR, 'song.js'), mod = new Module(file, module); mod.filename = file; mod.paths = Module._nodeModulePaths(EPDIR);
process.argv = [process.argv[0], file, String(PART)];
mod._compile(src, file);
