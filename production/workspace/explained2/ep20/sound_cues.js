// sound_cues.js: EP20 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP19, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and
// driven by the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps,
// journeys, the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for
// teaching, wonder for the journeys, EP14's indoor bed R.room under the science room (Part 1) and Pip's HDB kitchen (Part 2)), plus the
// marks' main foley (the floating ring's boing, the clicks, the flip). STAGE 2 adds the places' own life and foley on their marks
// (SERIES_FORMAT 9; the Sound line of each scene in SCENES_TODO.md): the SCHOOL SCIENCE ROOM after school (the ceiling fan's hum, a far-off
// school bell, children's voices fading down the corridor, a bird outside; the clips' bright tinkle as they leap and hang: lift / bunch; a
// soft clatter as they drop back; six pops for the shapes; the pencils' rolling rattle: roll; a whoosh as a magnet rolls away: away), Pip's
// HDB KITCHEN that evening (a fan, a pot lid's clink from a neighbour's kitchen, a far-off TV, a bus outside, the lizard's soft "chik-chik-
// chik" at the game, the reveal and its fun fact; the train's wooden rattle: train; a click per pull and a whoosh per push in lclike; a soft
// clack per pull and a roll back for the push in lctest; the string's creak and a slow whirr: string, spin), the journeys (the ring's soft
// wooden slide down the pencil and a springy hum that rises as the gap shrinks: jslide .. jspring; wooden wheels on the track, a rising hum,
// a giant paw's thump and a bright CLICK: jtrack .. jclick).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|r1ans|fix|dare|cliff)$/, CALM = /^(lasttime|today|bench|pushpull|fridge|bars|lc|mark|kitchen|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the place's indoor bed (EP14's R.room: a far bird, a soft room hum) under every science-room / kitchen scene; joined across short gaps
  { const ROOM = PART === 1 ? ["cold", "back", "title", "today", "answer", "bench", "holdon", "pushpull", "liz", "cliff"] : ["kitchen", "r1ans", "fridge", "show", "fix", "bars", "dare", "liz"];
    for (const sc of TL.scenes) if (ROOM.includes(sc.name)) { const last = R.room[R.room.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R.room.push([sc.t0, sc.t1]); }
    R.room = R.room.filter(([a, b]) => b - a > 1); }
  // the cold open: the pencil set down, the floating ring's gentle boing, the buddies lean in, Basil's paw swishes through the gap
  if (mk("ringsIn") !== undefined) { E(mk("ringsIn"), "tok"); E(mk("ringsIn") + .35, "boing"); }
  if (mk("budsIn") !== undefined) [0, .15].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (mk("paw") !== undefined) E(mk("paw"), "whoosh");
  if (mk("board") !== undefined) E(mk("board") + .1, "chime");
  if (mk("train") !== undefined) E(mk("train"), "rumble");
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "m302" : "n202"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (has("m203")) ["one", "two"].forEach((w, i) => E(W("m203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["m402", "m403", "m404"] : ["n302", "n303", "n304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "m502", ["m503m", "m504p", "m505b"]); lock("hold", 5, null, []); if (has("m902")) E(W("m902", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "n402", ["n403m", "n404p", "n405b"]); lock("show", 5, "n803", ["n804b"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // the magnets' own foley on their marks: the press and spring of the floating ring; the flip and the CLICK; the pull and the push
  if (mk("press") !== undefined) E(mk("press") + .3, "boing");
  for (const k of ["jspring", "flipback", "floats"]) if (mk(k) !== undefined) E(mk(k) + .2, "boing");
  for (const k of ["flip", "flipr", "jturn"]) if (mk(k) !== undefined) E(mk(k) + .1, "flip");
  for (const k of ["click", "click2", "jclick", "snap", "ns", "sn"]) if (mk(k) !== undefined) E(mk(k) + .25, "clack");
  for (const k of ["away", "jaway", "nn", "ss", "push"]) if (mk(k) !== undefined) E(mk(k) + .3, "whoosh");
  if (mk("pairs1") !== undefined) { E(mk("pairs1") + .4, "clack"); E(mk("pairs2") + .4, "whoosh"); E(mk("blueends") + .3, "lowdrum"); }
  if (mk("lift") !== undefined) E(mk("lift") + .3, "sparkle");
  if (mk("shapes") !== undefined) [0, .35, .7, 1.05, 1.4, 1.75].forEach((d, i) => E(mk("shapes") + d, "pop", i % 3));
  if (mk("spin") !== undefined) { E(mk("string"), "creak"); E(mk("spin"), "whirr"); }
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m809", "m810"], ["m1009", "m1010"]] : [["n711", "n712"], ["n907", "n908"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1101" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "m1102" : "n1102", HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  if (S.cliff && has("m1202")) { E(LT("m1202") - .2, "lowdrum"); E(W("m1202", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("n1201", "lock") - .1, "sting"); }
  // the Showdown's paper and the fix (Pip's homework lines, the strike, the green rewrite)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); E(mk("qnail"), "pop", 1); } }
  if (mk("note") !== undefined) E(mk("note") + .3, "clack");
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
