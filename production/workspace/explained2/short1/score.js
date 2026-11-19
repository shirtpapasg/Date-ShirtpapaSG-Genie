// THE SCORE of the Short "It walks. Is it ALIVE?" (P3 EP1, Round 1): the single source of truth for sound AND picture.
// The voice lines' real lengths come from voice/voice_data.js (make_voice.py); every other time is placed on the
// 108 BPM grid after them. song.js plays these events, film.js draws them: change a time here and both move.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const V = node ? require('./voice/voice_data.js') : globalThis.VOICE;
  const { m, makeClock } = MU;

  const FPS = 30;
  const FORMAT = U.pickFormat('9:16');
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const clock = makeClock({ bpm: 108, offset: 0.2 }); // 1 beat = 0.556 s; the ring timer = 9 beats = 5.0 s
  const { T, BEAT } = clock;
  const B = (n) => clock.OFFSET + n * BEAT;                 // absolute beat n
  const up = (t, div = 1) => clock.OFFSET + Math.ceil((t - clock.OFFSET) / (BEAT / div) - 1e-6) * (BEAT / div);   // the next grid line at or after t
  const near = (t, div = 2) => clock.OFFSET + Math.round((t - clock.OFFSET) / (BEAT / div)) * (BEAT / div);
  const f = (t) => Math.round(t * FPS) / FPS;               // hits sit exactly on a frame

  // ---------- the voice lines, laid end to end on the grid ----------
  const vo = {}; const say = (id, t) => { vo[id] = { id, ...V[id], t, end: t + V[id].dur }; return vo[id]; };
  const wordT = (id, w, nth = 0) => { const L = vo[id]; const hits = L.words.filter((x) => x.w.toLowerCase().replace(/[^a-z-]/g, '') === w); return L.t + (hits[nth] || hits[0]).t; };
  const sentT = (id, i) => vo[id].t + vo[id].sents[i].t;
  const ev = {};
  ev.land = f(B(0));                                        // the robot stomps in, "IS IT ALIVE?" slams
  say('h1', B(1) + 0.1);                                    // A wind-up robot. Look at it go!
  say('h2', up(vo.h1.end + 0.22, 2));                       // Point left for living. Point right for non-living.
  ev.tabL = f(near(wordT('h2', 'left') - 0.05));            // the blue LIVING tab pops (left)
  ev.tabR = f(near(wordT('h2', 'right') - 0.05));           // the orange NON-LIVING tab pops (right)
  ev.ring0 = f(up(vo.h2.end + 0.2));                        // the ring starts to drain
  const RING_BEATS = 9;
  ev.bell = f(ev.ring0 + RING_BEATS * BEAT);                // 5.0 s later: the bell, the ring snaps shut
  ev.stamp = f(ev.bell + BEAT);                             // "LOCKED IN!" stamps
  say('h3', ev.stamp + 0.2);                                // Locked in!
  ev.popB = f(up(vo.h3.end + 0.3, 2)); say('b1', ev.popB + 0.24);   // Basil's card flips: LIVING (not right)
  ev.popP = f(up(vo.b1.end + 0.2, 2)); say('p1', ev.popP + 0.24);  // Pip: NON-LIVING
  ev.popM = f(up(vo.p1.end + 0.2, 2)); say('m1', ev.popM + 0.24);  // Momo: NON-LIVING
  ev.cutBox = f(up(vo.m1.end + 0.25, 2));                       // back in the box: the evidence
  say('h4', ev.cutBox + 0.3);                               // Watch. The robot stops.
  ev.stop = f(near(sentT('h4', 1) + vo.h4.sents[1].dur + 0.12));  // the last step: clunk
  say('h5', up(ev.stop + 0.3, 2));                          // A spring inside was pushing it. Nobody winds it up, so it stays still.
  ev.window = f(near(wordT('h5', 'spring') - 0.1));         // the see-through window opens on its back
  ev.lapse0 = f(sentT('h5', 1));                            // day turns to night to day
  ev.day2 = f(up(vo.h5.end + 0.15, 2));                     // the counter clacks: DAY 2
  say('h6', ev.day2 + 0.36);                                // It does not need water, food or air. It does not grow.
  ev.icons = ['water', 'food', 'air'].map((w) => f(wordT('h6', w) - 0.04));
  ev.grow = f(sentT('h6', 1) + 0.1);
  ev.card = f(up(vo.h6.end + 0.12, 2));                     // the cream card slides up
  say('h7', ev.card + 0.3);                                 // The wind-up robot is a non-living thing.
  ev.tag = f(up(vo.h7.end + 0.2, 2));                       // the NON-LIVING tag lands on the robot: ding + chord
  ev.score = f(ev.tag + BEAT * 1.5);                        // the scoreboard comes to the centre
  ev.coin = f(ev.score + BEAT);                             // YOU +1 (if you pointed right)
  ev.coin2 = f(ev.coin + BEAT);                             // BUDDIES +1 (Pip and Momo were right)
  say('b2', ev.coin2 + 0.3);                                // Aww. So moving is not the clue!
  ev.cutBean = f(up(vo.b2.end + 0.25, 2));                      // the green bean, still
  say('h9', ev.cutBean + 0.35);                             // Some non-living things move when something pushes them.
  ev.end = f(up(vo.h9.end + 0.25, 2));                          // the end card
  say('h10', ev.end + 0.3);                                 // Watch the full episode!
  const DURATION = Math.ceil((vo.h10.end + 2.4) * FPS) / FPS;

  // ---------- the robot's steps: each one is a wood tick AND a foot landing ----------
  const steps = [];
  for (let t = ev.land, i = 0; t < ev.cutBox - 1e-6; t += BEAT / 2, i++) steps.push({ t: f(t), i, k: 1 });
  // the spring runs down: every step takes longer, then it stops in mid-step
  { let gap = BEAT / 2 * 1.15, t = steps[steps.length - 1].t + gap, i = steps.length; const n0 = i;
    while (t + gap < ev.stop - 0.2) { steps.push({ t: f(t), i, k: Math.max(0.35, 1 - (i - n0) * 0.11) }); gap *= 1.22; t += gap; i++; }
    steps.push({ t: ev.stop, i, k: 0.3, last: true }); }
  // ---------- the ring's ticks: beats, then 8ths, then 16ths over the last 3 s ----------
  const ticks = [];
  for (let b = 0; b < RING_BEATS; b++) { const div = b < 4 ? 1 : b < 7 ? 2 : 4; for (let j = 0; j < div; j++) ticks.push({ t: ev.ring0 + (b + j / div) * BEAT, strong: j === 0, left: RING_BEATS - b }); }

  // ---------- the buddies' answers ----------
  const picks = [
    { who: 'basil', t: ev.popB, line: 'b1', word: 'LIVING', side: 'L', right: false, bubble: ['Living!', 'It moves, so it’s living!'], note: 'E5' },
    { who: 'pip', t: ev.popP, line: 'p1', word: 'NON-LIVING', side: 'R', right: true, bubble: ['Non-living.', 'I saw you wind it up!'], note: 'G5' },
    { who: 'momo', t: ev.popM, line: 'm1', word: 'NON-LIVING', side: 'R', right: true, bubble: ['Non-living.', 'Does it ever get hungry?'], note: 'C6' }];

  // ---------- music: a light marimba-and-ukulele game bed in C ----------
  const S = {
    hook: [0, ev.ring0], ring: [ev.ring0, ev.bell], locked: [ev.bell, ev.popB], buddies: [ev.popB, ev.cutBox],
    evidence: [ev.cutBox, ev.card], verdict: [ev.card, ev.score], score: [ev.score, ev.cutBean], end: [ev.cutBean, DURATION] };
  // the theme motif (8th-note steps from a start time): [note, step, length in steps]
  const MOTIF = [['E5', 0, 1], ['G5', 1, 1], ['C6', 2, 2], ['A5', 4, 1], ['G5', 5, 1], ['E5', 6, 2]];
  const MOTIF2 = [['D5', 0, 1], ['F5', 1, 1], ['A5', 2, 2], ['G5', 4, 1], ['E5', 5, 1], ['C5', 6, 2]];
  const END = [['E5', 0, 1], ['G5', 1, 1], ['C6', 2, 1], ['E6', 3, 3]];
  const place = (pat, t0, tr = 0) => pat.map(([n, s, d]) => ({ t: t0 + s * BEAT / 2, dur: d * BEAT / 2, midi: m(n) + tr }));
  const bars = (a, b) => { const out = []; for (let t = up(a); t < b - BEAT * 3.5; t += BEAT * 4) out.push(t); return out; };
  const groove = [...bars(ev.land, ev.ring0), ...bars(ev.popB, ev.cutBox), ...bars(ev.score, ev.cutBean - 0.2)];   // bar starts where the bed plays
  const CH = [['C3', ['E4', 'G4', 'C5']], ['A2', ['E4', 'A4', 'C5']], ['F2', ['F4', 'A4', 'C5']], ['G2', ['D4', 'G4', 'B4']]];
  const melody = groove.flatMap((t, i) => place(i % 2 ? MOTIF2 : MOTIF, t));
  const endNotes = place(END, ev.end);

  // ---------- named moments (render.js stills @bell, verify) ----------
  const markers = {
    land: { t: ev.land, sync: 'av' }, tabL: ev.tabL, tabR: ev.tabR, ring: ev.ring0,
    bell: { t: ev.bell, sync: 'av' }, stamp: { t: ev.stamp, sync: 'av' },
    basil: { t: ev.popB, sync: 'av' }, pip: { t: ev.popP, sync: 'av' }, momo: { t: ev.popM, sync: 'av' },
    box: ev.cutBox, stop: { t: ev.stop, sync: 'a' }, window: ev.window, day2: { t: ev.day2, sync: 'av' },
    icons: ev.icons[0], card: ev.card, tag: { t: ev.tag, sync: 'av' }, score: ev.score,
    coin: { t: ev.coin, sync: 'av' }, bean: { t: ev.cutBean, sync: 'v' }, end: { t: ev.end, sync: 'av' } };

  // ---------- captions, word by word, from the real voice timings ----------
  const subtitles = [];
  for (const L of Object.values(vo)) {
    let k = 0;
    for (const s of L.sents) {      // one caption per sentence; a long sentence is split into two even halves
      const n = s.text.split(' ').length, ws = L.words.slice(k, k + n); k += n;
      const cut = n > 6 ? Math.ceil(n / 2) : n;
      for (const part of [ws.slice(0, cut), ws.slice(cut)]) if (part.length)
        subtitles.push({ t: L.t + part[0].t, end: L.t + part[part.length - 1].end + 0.3, who: L.who, words: part.map((w) => ({ w: w.w, t: L.t + w.t })) });
    }
  }
  subtitles.sort((a, b) => a.t - b.t);
  subtitles.forEach((s, i) => { s.text = s.words.map((w) => w.w).join(' '); if (subtitles[i + 1]) s.end = Math.min(s.end, subtitles[i + 1].t - 0.02); });

  const SCORE = { FPS, FORMAT, W, H, SAFE, DURATION, clock, T, B, BEAT, S, m, ev, vo, steps, ticks, picks, RING_BEATS, markers, subtitles, melody, endNotes, groove, CH,
    poster: { title: 'It walks. Is it ALIVE?', sub: 'Living and non-living things' } };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
