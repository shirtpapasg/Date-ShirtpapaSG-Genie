// sound_cues.js: EP24's sound plan (EP23's engine; EP24's marks; the place: the SCHOOL SCIENCE ROOM in both parts, R.room) (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP22, every sound hangs on the SAME mark the picture uses (script.py lists them).
// MUSIC (teacher, 25 Nov 2026: "For future episodes we use the original music"; SERIES_FORMAT 9): the series' own beds again, as in EP1-EP10
// (song.js: the game groove R.groove under the game scenes, the calm bed R.calm under the teaching scenes, the micro-world pad R.wonder in
// the journeys), NOT Kampong Walk (finish.sh does not run add_lofi.py). song.js keeps ONE bar clock per part (a bed always resumes on the
// beat) and every change between beds, or around a countdown, is a 0.8 s crossfade. The journeys are QUIET: no groove and no calm bed from
// the "Be a ...! Shrink down. Quietly." scene (waitw) to the end of the pull-out; the micro-world pad plays in the journey itself.
// PLACES (SERIES_FORMAT 9, "every place sounds alive"): Part 1 the COFFEE SHOP across from the scrapyard (R.deck: voices far off, birds in
// the rain trees; the fans' soft whoosh; spoons clinking in cups, the auntie calling an order, a lorry passing, the scrapyard's far clank and
// the crane's low hum); Part 2 the SCHOOL SCIENCE ROOM (R.room: a soft room hum, birds through the window; the fans, children's voices fading
// down the corridor, footsteps, a tap dripping into the sink, the old electric bell ringing at the start). Foley on every action: the wire's
// rustle as it is coiled, the tiny click at the battery, the clips' tinkle as they jump and their jingle as they drop, the crane's clank and
// the scrap's crash into the lorry, the bolt's clink, the bell's dings, the poster's paper, the strike and the rewrite.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|r1ans|fix|dare|cliff|crane|today|lab)$/, CALM = /^(lasttime|lc1q|lc2q|lcunfair|lcfair|lctable|lccount|mark|kwrecap|back|liz|cold)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 - .3, s.t1 + .4]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0, s.t1);
    if (/^lc[a-z]/.test(s.name) && !/^lc1q|^lc2q/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the place's bed (Part 1: the outdoor R.deck under every coffee-shop scene; Part 2: the indoor R.room under every science-room scene); joined across short gaps
  { const OUT = PART === 1 ? ["cold", "back", "title", "today", "answer", "lc1q", "holdon", "lc2q", "liz", "cliff", "waitw"] : ["lab", "r1ans", "lc1q", "show", "fix", "lc2q", "crane", "liz", "waitw"], key = "room";
    for (const sc of TL.scenes) if (OUT.includes(sc.name)) { const last = R[key][R[key].length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R[key].push([sc.t0, sc.t1]); }
    R[key] = R[key].filter(([a, b]) => b - a > 1); }
  // EP24: the cold open's dip (the clips' tinkle as they jump), the hook, the game, the "Last time" cards
  if (mk("dip0") !== undefined) { E(mk("dip0") + .1, "creak"); E(mk("dip0") + .25, "jingle"); E(mk("dip0") + .3, "sparkle"); }
  if (mk("hook") !== undefined) E(mk("hook") + .1, "chime");
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "m204" : "n202"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (has("m103")) ["one", "two"].forEach((w, i) => E(W("m103", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  if (mk("xy") !== undefined) E(mk("xy"), "softpop", 1);
  // goals, countdown
  const G3 = PART === 1 ? ["m302m", "m303m", "m304m"] : ["n302p", "n303p", "n304p"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins (5 s rings as EP1-10; the Showdown 6 s): ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 5, "m402", ["m403b", "m404p", "m405m"]); lock("hold", 5, null, []); if (has("m802")) E(W("m802", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "n402", ["n403m", "n404p", "n405b"]); lock("show", 6, "n703", ["n704b"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("coin1") !== undefined && PART === 1) E(mk("coin1") + .2, "coin", 1); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // Part 1's journey (be a steel paper clip): a deep hush, the clips' faint jingle round you, a soft rising shimmer as the iron nail's pull
  // comes (a stylised "pull": real magnets are silent), a tinkling rush as you jump up, a thin weak shimmer for the steel nail, a soft "hm?"
  if (mk("jmany") !== undefined) { E(mk("jlie") + .3, "jingle"); E(mk("jmany"), "rumble"); E(mk("jpull") - .3, "sfx", { f: "riser.wav", g: .05, bus: "wonder" }); E(mk("jpull") + .4, "sparkle"); E(mk("jpull") + .45, "jingle"); E(mk("jweak") - .2, "pip", 0); E(mk("jwonder"), "curious"); E(mk("jturns") + .5, "boop", 1); }
  // Part 2's journey (counted again and again): the nail comes down (a low rumble), you jump (a tinkle), a soft tap per count, a slide back
  if (mk("jdown") !== undefined) { E(mk("jdown"), "rumble"); E(mk("jup") + .05, "jingle"); E(mk("jup") + .1, "sparkle"); for (let i = 0; i < 9; i++) E(mk("jcount") + .8 + i * 1.4 / 9, "tok"); E(mk("jback") + .1, "whoosh"); E(mk("jagain") + .1, "jingle"); [mk("c1"), mk("c2"), mk("c3")].forEach((t, i) => E(t - .05, "softpop", i)); }
  // Part 1 look-closer 1: a low two-note for each red "different", a soft tick for each green "same"; the "?" pops; the strip's chime
  if (mk("kind") !== undefined) { E(mk("kind") + .3, "boop", 0); E(mk("turns") + .3, "boop", 1); E(mk("turns") + 2.2, "tick", 1); E(mk("turns") + 2.6, "tick", 1); E(mk("which") - .1, "pop", 1); }
  // Part 1 look-closer 2: a soft whirr as the coils change, a tick per green "same", the dip's tinkle
  if (mk("twenty") !== undefined) { for (let i = 0; i < 12; i++) E(mk("twenty") + .2 + i * .16, "rub"); ["samebat", "samewire", "sameclips"].forEach((k) => E(mk(k), "tick", 1)); E(mk("dipfair") + .3, "creak"); E(mk("dipfair") + 1.0, "pop", 2); E(mk("onlynail") + .3, "boop", 0); }
  if (mk("boardfill") !== undefined) E(mk("boardfill") - .2, "scribble");
  // HOLD ON!: the magnet race (pins tinkle as they jump), the fix: a ruler set down, a soft slide, a click as both magnets reach the mark
  if (S.holdon) { E(S.holdon.t0 + .4, "jingle"); if (mk("level") !== undefined) { E(mk("level") - .3, "tok"); E(mk("level") + .1, "rub"); E(mk("level") + 1.0, "click"); E(mk("level") + 1.1, "jingle"); } }
  // Part 2: the answer's unwinding coil; the table's rows (a pen squeak each); the counts; the crane
  if (mk("unwind") !== undefined || (PART === 2 && mk("ansglow") !== undefined)) for (let i = 0; i < 10; i++) E(mk("ansglow") + 1.7 + i * .15, "rub");
  ["row1", "row2", "row3"].forEach((k) => mk(k) !== undefined && E(mk(k), "squeak")); ["k1", "k2", "k3", "k4"].forEach((k) => mk(k) !== undefined && E(mk(k), "softpop", 1));
  if (mk("slip") !== undefined) { E(mk("slip") + .2, "clink"); E(mk("counts2"), "scribble"); E(mk("counts1"), "scribble"); E(mk("right"), "sparkle"); }
  if (mk("carry") !== undefined) { E(SCN.crane.t0 + .3, "creak"); E(SCN.crane.t0 + .95, "clink"); E(mk("carry"), "whoosh"); E(mk("drop") - .05, "click"); E(mk("drop") + .4, "clang"); E(mk("drop") + .5, "reveal"); E(mk("drop") + .6, "sparkle"); }
  if (mk("swing") !== undefined && PART === 2) { E(mk("push") - .05, "tok"); E(mk("shut") + .5, "potthud"); }
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  if (mk("strip") !== undefined) E(mk("strip") + .2, "chime", 0);
  
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m706", "m707"], ["m905", "m906"]] : [["n606", "n607"], ["n906", "n907"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1001" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { const L = PART === 1 ? "m1002" : "n1102"; E(S.liz.t0 + .1, "whoosh"); E(W(L, HIDDEN[0]) + .2, "sparkle"); E(W(L, HIDDEN[0]) + .5, "pip", 1); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  if (mk("dareIn") !== undefined) { [0, .25, .5].forEach((d) => E(W("n1201", "one") - .7 + d, "slide")); E(W("n1201", "lock") - .1, "sting"); }
  // the Showdown's paper and the fix (Momo's poster lines, the strike, the green rewrite)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); } }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // the places' own life (one-shots inside the place scenes)
  { const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }); const SCS = (names) => TL.scenes.filter((sc) => names.includes(sc.name) && sc.t1 - sc.t0 > 2.5);
    SCS(["cold", "back", "today", "answer", "lc1q", "holdon", "lc2q", "cliff", "lab", "r1ans", "show", "fix", "crane"]).forEach((sc, i) => { if (sc.t1 - sc.t0 > 4) E(sc.t0 + 2.2, "drip", i); if (sc.t1 - sc.t0 > 8) sfx(sc.t0 + 5, "footsteps.wav", .025); if (i % 3 === 1) sfx(sc.t0 + 1.5, "ep05_kids.wav", .02); });
    if (S.cold) { E(S.cold.t0 + 4.5, "chirp"); sfx(S.cold.t0 + 6.5, "ep05_kids.wav", .02); }
    if (PART === 1) { if (S.game) for (let i = 0; i < 14; i++) E(S.game.t0 + 1.4 + i * .08, "step", .15); if (S.liz) { for (let i = 0; i < 10; i++) E(W("m1002", "woodlouse") + .5 + i * .08, "step", .15); E(W("m1002", "cupboard") + .2, "boing"); } }
    else { if (S.game) { E(S.game.t0 + 1.4, "chirp"); E(S.game.t0 + 2.6, "chirp"); } if (S.liz) { E(W("n1102", "sparrow") + .5, "chirp"); E(W("n1102", "sparrow") + 1.3, "chirp"); } if (S.dare) sfx(S.dare.t0 + .3, "ep05_kids.wav", .015); }
    // no ambience one-shot under a countdown (only the ticks keep time)
    const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "clunk", "clank", "drip", "chirp", "jingle", "slide"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
