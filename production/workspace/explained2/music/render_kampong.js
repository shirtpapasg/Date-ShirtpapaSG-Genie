// render_kampong.js: renders the app's lofi tune "Kampong Walk" to music/kampong_walk.wav (48 kHz, stereo, 16-bit), a seamless loop.
//   NODE_PATH=$(npm root -g) node render_kampong.js [/path/to/theoneapp] [passes=16]
// It plays the app's OWN code, unchanged: theoneapp/tunes.js (STUDY_TUNES.start(ac, bus, 0) = Kampong Walk: 84 bpm, swing .18, the
// walking bass, the swung piano chords, the melody on bells and piano on alternate passes, the per-note timing and loudness wobble) into
// the same output chain as index.html's study-music engine (mPlay: the bus at .225, a 6 kHz low-pass Q .4, a 2.4 s room at .34 wet).
// It runs in headless Chromium on an OfflineAudioContext. tunes.js schedules its bars from a 150 ms setInterval against
// ac.currentTime; here setInterval is captured and the same tick is called at OfflineAudioContext.suspend() points every 0.4 s of audio
// time, so every bar is scheduled exactly as the live player schedules it (0.6 s ahead).
// The loop: `passes` passes of the 8-bar tune (16 = 128 bars = 365.7 s; an even number so bells and piano alternate across the seam).
// Everything that rings on after the last bar (note tails, both reverbs) is folded onto the start, so the file repeats without a click.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const APP = process.argv[2] || '/home/user/theoneapp', PASSES = +(process.argv[3] || 16);
const OUT = path.join(__dirname, 'kampong_walk.wav'), SR = 48000;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', (e) => console.log('PAGEERR', e.message)); p.on('console', (m) => console.log('page:', m.text()));
  await p.setContent('<!doctype html><html><body></body></html>');
  await p.evaluate(() => { window.__ticks = []; window.setInterval = (fn) => { window.__ticks.push(fn); return 1; }; window.clearInterval = () => {}; });
  await p.addScriptTag({ content: fs.readFileSync(path.join(APP, 'tunes.js'), 'utf8') });
  const info = await p.evaluate(async ({ SR, PASSES }) => {
    const k = STUDY_TUNES.pieces.findIndex((x) => x.name === 'Kampong Walk'); if (k < 0) throw new Error('no Kampong Walk in tunes.js');
    const bpm = STUDY_TUNES.pieces[k].bpm, BAR = 4 * 60 / bpm, BARS = PASSES * 8, START = 0.1, LOOP = BARS * BAR, TAIL = 7, TOTAL = START + LOOP + TAIL;
    const ac = new OfflineAudioContext(2, Math.ceil(TOTAL * SR), SR);
    // index.html mPlay(): the same chain, the bus held at its playing level (.225) instead of the 2.5 s fade-in
    const bus = ac.createGain(); bus.gain.value = 0.225;
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6000; lp.Q.value = 0.4;
    const verb = ac.createConvolver(); const len = ac.sampleRate * 2.4, ib = ac.createBuffer(2, len, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ib.getChannelData(c); for (let j = 0; j < len; j++) d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / len, 2.6) * 0.5; }
    verb.buffer = ib; const wet = ac.createGain(); wet.gain.value = 0.34;
    bus.connect(lp); lp.connect(ac.destination); lp.connect(verb); verb.connect(wet); wet.connect(ac.destination);
    // tunes.js begins at ac.currentTime + 0.1 (= START here) and calls tick() at once, then every 150 ms
    STUDY_TUNES.start(ac, bus, k); const tick = window.__ticks[window.__ticks.length - 1];
    const STEP = 0.4, lastStart = START + (BARS - 1) * BAR;   // stop ticking once the last wanted bar is scheduled (bar BARS never is)
    for (let t = STEP; t + 0.6 <= START + BARS * BAR && t < TOTAL; t += STEP) ac.suspend(t).then(() => { tick(); ac.resume(); });
    const buf = await ac.startRendering(); window.__buf = buf;
    return { bpm, BAR, BARS, START, LOOP, TOTAL, lastStart, frames: buf.length };
  }, { SR, PASSES });
  console.log('rendered', info);
  const L = new Float32Array(info.frames), R = new Float32Array(info.frames), CH = SR * 10;
  for (let o = 0; o < info.frames; o += CH) {
    const s = await p.evaluate(({ o, CH }) => { const b = window.__buf, n = Math.min(CH, b.length - o), x = new Float32Array(2 * n), l = b.getChannelData(0), r = b.getChannelData(1);
      for (let i = 0; i < n; i++) { x[2 * i] = l[o + i]; x[2 * i + 1] = r[o + i]; }
      const u = new Uint8Array(x.buffer); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); }, { o, CH });
    const raw = Buffer.from(s, 'base64'), x = new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
    for (let i = 0; i < x.length / 2; i++) { L[o + i] = x[2 * i]; R[o + i] = x[2 * i + 1]; }
  }
  await b.close();
  // the loop: from 0.05 s (bar 0's earliest jittered note is >= 0.086 s) for exactly BARS bars; fold the rest onto the start
  const a = Math.round(0.05 * SR), n = Math.round(info.LOOP * SR), lo = new Float32Array(n), ro = new Float32Array(n);
  for (let i = 0; i < n; i++) { lo[i] = L[a + i]; ro[i] = R[a + i]; }
  for (let i = a + n, j = 0; i < info.frames; i++, j++) { lo[j % n] += L[i]; ro[j % n] += R[i]; }
  let pk = 0; for (let i = 0; i < n; i++) pk = Math.max(pk, Math.abs(lo[i]), Math.abs(ro[i]));
  const g = Math.pow(10, -1 / 20) / pk;   // peak -1 dBFS (the level is set in the episode mix, not here)
  const data = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) { data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, lo[i] * g)) * 32767), 4 * i); data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, ro[i] * g)) * 32767), 4 * i + 2); }
  const h = Buffer.alloc(44); h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22);
  h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  fs.writeFileSync(OUT, Buffer.concat([h, data]));
  console.log(`wrote ${OUT}: ${(n / SR).toFixed(2)} s loop (${info.BARS} bars at ${info.bpm} bpm), peak normalised by ${(20 * Math.log10(g)).toFixed(1)} dB`);
})().catch((e) => { console.error(e); process.exit(1); });
