// sound_cues.js: EP0's sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP22, every sound hangs on the SAME mark the picture uses (script.py lists them). The old music beds (groove,
// calm, wonder) are still listed here (R.groove / R.calm / R.wonder) so song.js runs as it always has; ../add_lofi.py then replaces them with
// the ONE Kampong Walk bed (SERIES_FORMAT 9) after the part is finished. Every effect and ambience stays.
// THE PLACE (both parts): the void deck study corner of an HDB block (R.deck, EP18's: the fan's soft hum, children far off, birds, a far bus)
// with its own one-shots: a lift's far-off ding, a ball bouncing at the playground, the auntie's market trolley rolling past, birds in the
// rain tree, the crow's soft caw (Part 1); at night (Part 2, Monday evening) crickets from the grass (R.night) and the lift's hum; on Thursday
// the rain on the void deck's edge (R.rain); the pencils' scratch, the poster's soft turn on its easel, the tablet's taps.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|fix|dare|nextq|puzzle|later)$/, CALM = /^(void|plans|rules|lasttime|week|lc|mark|kwrecap|cliff|memtest|app|space|pages|pullout|waitw)/;
  for (const s of TL.scenes) { if (s.name === "garden") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^lc[a-z]/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the memory test's 4 s quiet: no music under it (only the void deck's soft ambience): the bed is cut there
  if (mk("quiet0") !== undefined) { const a = mk("quiet0") - .3, b = mk("quiet1") + .2; for (const key of ["groove", "calm"]) R[key] = R[key].flatMap(([p, q]) => (b <= p || a >= q) ? [[p, q]] : [[p, a], [b, q]].filter(([u, v]) => v - u > 1)); }
  // the place's bed under every void-deck scene, joined across short gaps; at night the crickets, on Thursday the rain
  { const VDN = PART === 1 ? ["void", "title", "plans", "rules", "holdon", "cliff", "puzzle", "r1", "later", "memtest"] : ["week", "app1", "app2", "app3", "show", "fix", "waitw", "pullout", "space", "pages"];
    for (const sc of TL.scenes) if (VDN.includes(sc.name)) { const last = R.deck[R.deck.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R.deck.push([sc.t0, sc.t1]); }
    R.deck = R.deck.filter(([a, b]) => b - a > 1);
    if (PART === 2) { for (const n of ["week", "app1", "app2", "app3", "show", "fix", "waitw"]) if (S[n]) R.night.push([S[n].t0, S[n].t1]); for (const n of ["pullout", "space"]) if (S[n]) R.rain.push([S[n].t0, S[n].t1]); }
    if (PART === 1 && S.cliff) R.birds.push([S.cliff.t0, S.cliff.t1]); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "a202h" : "b201h"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  if (mk("board") !== undefined) E(mk("board") + .1, "chime");
  // goals, countdown
  const G3 = PART === 1 ? ["a302b", "a303b", "a304b"] : ["b302m", "b303m", "b304m"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 5, "a405h", ["a406p", "a407m", "a408b"]); lock("hold", 5, null, []); if (has("a702h")) E(W("a702h", "hold") - .1, "stamp"); }
  else { lock("r1", 3, "b402h", ["b403p", "b404m", "b405b"]); lock("show", 5, "b603h", []); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, k === "coin2" ? "coin2" : "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  if (PART === 1 && has("a703h")) E(W("a703h", "one") - .1, "coin");
  // Part 1: the puzzle (the pencil's scratch as each letter is written in, a tick), the cloth, the THINK!, the memory test (the cloth lifts,
  // "needle" fades), the copying (pencil scratches), the poster's soft turn on its easel, the blank sheet sliding, the crow's soft caw
  if (PART === 1) {
    for (const k of ["fill1", "fill2", "fill3"]) if (mk(k) !== undefined) { E(mk(k) - .2, "scribble"); E(mk(k) + .1, "softpop", 1); }
    if (mk("cloth") !== undefined) E(mk("cloth") + .1, "cloth");
    if (mk("latertag") !== undefined) E(mk("latertag"), "softpop", 2);
    if (mk("think") !== undefined) E(mk("think") + .05, "tag", 1);
    if (S.lcmaps) { E(mk("slide") - .3, "paper"); for (const k of ["chooses"]) if (mk(k) !== undefined) [0, .6, 1.2, 1.9, 2.5, 3.1].forEach((d, i) => { E(mk(k) + d - .1, "scribble"); E(mk(k) + d + .3, "glow", i % 3); }); if (mk("stops") !== undefined) E(mk("stops") + .1, "curious"); }
    if (S.lcmem) { [0, 1].forEach((j) => [0, .35, .7, 1.05, 1.4].forEach((d) => E((j ? mk("basl") + .1 : mk("pipl") + .1) + d, "scribble"))); if (mk("needle") !== undefined) E(mk("needle") + .1, "whoosh"); if (mk("lift") !== undefined) { E(mk("lift"), "cloth"); E(mk("lift") + .5, "sparkle"); } }
    if (mk("try") !== undefined) [-1.4, -.6, .2].forEach((d) => E(mk("try") + d, "scribble"));
    if (mk("turn") !== undefined) { E(mk("turn") + .1, "flip"); E(mk("sheet") + .2, "slide"); }
    if (S.void) { E(1.4, "lift"); E(3.6, "caw"); }
    if (S.game) E(S.game.t0 + 1.6, "caw");
    if (S.liz) E(W("a802h", "crow") + .6, "caw");
    if (S.cliff && has("a903h")) { E(LT("a903h") - .2, "lowdrum"); }
    if (mk("part2") !== undefined) E(mk("part2") - .1, "slam", 1);
    if (S.nextq) ["c1", "c2", "c3"].forEach((k, i) => E(mk(k) - .05, "softpop", i));
  } else {
    // Part 2: the tablet's soft taps on the app's buttons (Mind Maps, Make my own mind map, the chapter, Start a new mind map, each box Basil
    // types, Mark my mind map, Compare with the poster, Back to my mind map), the ticks popping in (the app's own pace, 130 ms), the missing
    // row's gentle "hm", the poster's draw-on, the strike and the marker's squeak on the rewrite, the journey, the pencils' race next Monday
    for (const k of ["tapmm", "tapmine", "pickch", "tapstart", "tapmark", "compare", "backto", "mark2"]) if (mk(k) !== undefined) E(mk(k) + .15, "click");
    for (const k of ["br1", "br2", "br3", "br4"]) if (mk(k) !== undefined) [0, .5, 1.0].forEach((d) => E(mk(k) + d, "tap"));
    if (mk("ticks") !== undefined) for (let i = 0; i < 12; i++) E(mk("ticks") + .1 + i * .26, "pop", i % 3);
    if (mk("mark2") !== undefined) for (let i = 0; i < 14; i++) E(mk("mark2") + .7 + i * .26, "pop", i % 3);
    if (mk("missing") !== undefined) E(mk("missing"), "curious");
    if (mk("thereitis") !== undefined) E(mk("thereitis") + .1, "sparkle");
    if (mk("addit") !== undefined) [0, .8, 1.6].forEach((d) => E(mk("addit") + d, "tap"));
    ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike") + .1, "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); }
    if (S.garden) { E(mk("gin") + .3, "creak"); for (const k of ["grow1", "grow2"]) E(mk(k) + .3, "stretch"); for (const k of ["walk1", "walk2"]) { E(mk(k), "leafrise"); [0, .5, 1.0, 1.5].forEach((d) => E(mk(k) + d, "step", .5)); } for (const k of ["clear1", "wide"]) E(mk(k), "chime"); }
    if (mk("rowtue") !== undefined) ["tue", "thu"].forEach((k, i) => E(mk("rowtue") + i * .8, "softpop", i));
    if (mk("draw0") !== undefined) for (let d = 0; d < 2.8; d += .45) { E(mk("draw0") + d, "scribble"); }
    if (S.week) { E(S.week.t0 + .6, "lift"); }
    if (S.liz) E(W("b1102h", "cat") + .5, "mrrp");
    if (S.dare) ["d1", "d2", "d3"].forEach((k, i) => E(mk(k) - .05, "pluck", i * 4));
  }
  // the void deck's life: the lift's far-off ding, a ball bouncing at the playground, the trolley rolling past (day scenes only)
  { const DAY = PART === 1 ? ["void", "plans", "rules", "holdon", "cliff"] : ["pages"]; TL.scenes.filter((sc) => DAY.includes(sc.name) && sc.t1 - sc.t0 > 5).forEach((sc, i) => { E(sc.t0 + 2.2, "bounce"); if (i % 2) E(sc.t0 + 4.0, "lift"); if (sc.t1 - sc.t0 > 9) R.roll.push([sc.t0 + 6, sc.t0 + 8]); }); }
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) if (k.big) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["a504m", "a505m"], ["a707b", "a708b"]] : [["b511p", "b512p"], ["b803b", "b804b"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "a801h" : "b1101h"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { const L = PART === 1 ? "a802h" : "b1102h"; E(S.liz.t0 + .1, "whoosh"); E(W(L, HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // no ambience one-shot under a countdown (only the ticks keep time); the night's crickets (a steady chirp) and the rain pause there too
  { const W2 = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]);
    for (const key of ["night", "rain"]) R[key] = R[key].flatMap(([p, q]) => { let segs = [[p, q]]; for (const [x, y] of W2) segs = segs.flatMap(([u, v]) => (y <= u || x >= v) ? [[u, v]] : [[u, x], [y, v]].filter(([a, b]) => b - a > 1)); return segs; }); }
  { const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "lift", "bounce", "caw", "tap", "scribble"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
