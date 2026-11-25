// sound_cues.js: EP26's sound plan (EP23's engine; EP26's marks; Part 1 the science room, Part 2 Pip's kitchen (R.room)) (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
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
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|r1ans|fix|cliff|today|home|genie)$/, CALM = /^(lasttime|lc1q|lc2q|lcbasil|lcbuild|lcfair|lcfridge|mark|kwrecap|liz|cold|question)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 - .3, s.t1 + .4]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0, s.t1);
    if (/^lc[a-z]/.test(s.name) && !/^lc1q|^lc2q/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the place's bed (Part 1: the outdoor R.deck under every coffee-shop scene; Part 2: the indoor R.room under every science-room scene); joined across short gaps
  { const OUT = PART === 1 ? ["cold", "title", "today", "answer", "lc1q", "holdon", "lc2q", "liz", "cliff", "waitw"] : ["home", "r1ans", "lc1q", "show", "fix", "lc2q", "liz", "waitw"], key = "room";
    for (const sc of TL.scenes) if (OUT.includes(sc.name)) { const last = R[key][R[key].length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R[key].push([sc.t0, sc.t1]); }
    R[key] = R[key].filter(([a, b]) => b - a > 1); }
  // EP26: the papers, the lamp's glow, the genie's rise, the game, the questions, the TRY rings (a soft tick each second, a chime at the end)
  if (mk("papers") !== undefined) { E(mk("papers"), "paper"); E(mk("mark13") + .1, "boop", 0); }
  if (mk("lamp") !== undefined) { E(mk("lamp"), "sparkle"); E(mk("lamp") + .2, "chime"); }
  if (mk("genie") !== undefined) { E(mk("genie") - .2, "sfx", { f: "riser.wav", g: .05, bus: "game" }); E(mk("genie") + .8, "reveal"); E(mk("tiles"), "sparkle"); }
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "m202" : "n202"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  if (S.question) E(S.question.t0 + .1, "paper");
  const G3 = PART === 1 ? ["m302p", "m303p", "m304p"] : ["n302b", "n303b", "n304b"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 5, "m403", ["m404b", "m405p", "m406m"]); lock("hold", 5, null, []); if (has("m802")) E(W("m802", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "n403", ["n404p", "n405b", "n406m"]); lock("show", 6, "n703", ["n704m"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("coin1") !== undefined && PART === 2) E(mk("coin1") + .2, "coin", 1); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  for (const k of Object.keys(M_).filter((k) => /^try\d$/.test(k))) { for (let i = 0; i < 6; i++) E(M_[k] + i, "tick", 0); E(M_[k] + 6, "chime2", 1); }
  ["cred", "eblue", "b1", "b2", "b3", "b4", "e1", "c1", "l1", "fe", "fl"].forEach((k, i) => mk(k) !== undefined && E(mk(k), "softpop", i % 3));
  if (mk("jred") !== undefined) { ["jred", "jblue", "jyellow", "jgreen"].forEach((k) => E(mk(k), "click")); E(mk("jpen"), "whoosh"); for (let i = 0; i < 4; i++) E(mk("jtick") + i * .35, "scribble"); E(mk("jfull"), "sparkle"); }
  if (mk("jstretch") !== undefined) { E(mk("jstretch"), "sfx", { f: "riser.wav", g: .05, bus: "wonder" }); E(mk("jclick"), "click"); E(mk("jclick") + .1, "sparkle"); }
  if (mk("rule") !== undefined) { E(mk("own"), "boop", 1); E(mk("rule"), "chime2", 0); }
  if (mk("rewrite") !== undefined) { E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); }
  if (mk("tapq") !== undefined) { E(mk("tapq"), "tok"); E(mk("tapg"), "tok"); E(mk("tapg") + 1.2, "sparkle"); E(mk("members"), "softpop", 1); }
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  if (mk("strip") !== undefined) E(mk("strip") + .2, "chime", 0);
  
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m707", "m708"], ["m908", "m909"]] : [["n608", "n609"], ["n907", "n908"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1001" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { const L = PART === 1 ? "m1002" : "n1102"; E(S.liz.t0 + .1, "whoosh"); E(W(L, HIDDEN[0]) + .2, "sparkle"); E(W(L, HIDDEN[0]) + .5, "pip", 1); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  
  // the Showdown's paper and the fix (Momo's poster lines, the strike, the green rewrite)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); } }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // the places' own life (one-shots inside the place scenes)
  { const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }); const SCS = (names) => TL.scenes.filter((sc) => names.includes(sc.name) && sc.t1 - sc.t0 > 2.5);
    SCS(["cold", "today", "answer", "lc1q", "holdon", "lc2q", "cliff", "home", "r1ans", "show", "fix"]).forEach((sc, i) => { if (sc.t1 - sc.t0 > 4) E(sc.t0 + 2.2, "drip", i); if (sc.t1 - sc.t0 > 6) sfx(sc.t0 + 3.5, "ep05_kids.wav", .015); });
    if (S.liz) E(S.liz.t0 + 1.4, "rub");
    // no ambience one-shot under a countdown (only the ticks keep time)
    const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "clunk", "clank", "drip", "chirp", "jingle", "slide"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
