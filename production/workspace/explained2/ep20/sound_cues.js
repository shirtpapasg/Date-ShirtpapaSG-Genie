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
    const BED = PART === 1 ? R.deck : R.room;   // Stage 2: the science room's own bed (the fan's soft hum, children's voices far down the corridor, birds outside: EP18's R.deck); the flat keeps R.room
    for (const sc of TL.scenes) if (ROOM.includes(sc.name) || (PART === 1 && /^(waitw|pullout)$/.test(sc.name)) || (PART === 2 && /^(waitw|pullout)$/.test(sc.name))) { const last = BED[BED.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else BED.push([sc.t0, sc.t1]); }
    if (PART === 1) R.deck = R.deck.filter(([a, b]) => b - a > 1); else R.room = R.room.filter(([a, b]) => b - a > 1); }
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
  if (mk("press") !== undefined) { E(mk("press"), "tap"); E(mk("press") + 1.7, "boing"); }
  for (const [k, d] of [["jspring", .1], ["flipback", 1.5], ["floats", .2]]) if (mk(k) !== undefined) E(mk(k) + d, "boing");
  for (const [k, d] of [["flip", .9], ["flipr", .6], ["jturn", 1.3]]) if (mk(k) !== undefined) E(mk(k) + d, "flip");
  for (const [k, d] of [["click", 0], ["click2", 0], ["jclick", 0], ["snap", 0], ["ns", .45], ["sn", .45]]) if (mk(k) !== undefined) E(mk(k) + d, "clack");
  for (const k of ["away", "jaway", "nn", "ss", "push"]) if (mk(k) !== undefined) E(mk(k) + .3, "whoosh");
  if (mk("pairs1") !== undefined) { E(mk("pairs1"), "clack"); E(mk("pairs2") + .1, "whoosh"); E(mk("blueends") + .3, "lowdrum"); }
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

  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): the places' own life and the foley ON the marks (SCENES_TODO's Sound lines)
  { const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }), ROLL = (a, b) => { if (b > a + .2) R.roll.push([a, b]); };
    if (PART === 1) {
      // the science room: a far-off school bell now and then (under the bed), a bird outside; the pencil slid in along the bench
      if (S.back) sfx(S.back.t0 + .2, "ep05_bell.wav", .03); if (S.answer) sfx(S.answer.t0 + 4.5, "ep05_bell.wav", .025); if (S.cliff) sfx(S.cliff.t0 + .5, "ep05_bell.wav", .025);
      E(mk("ringsIn") - .6, "slide"); if (S.today) E(S.today.t1 - 1.4, "whoosh");
      // the stationery tray: a soft rattle of clips as Basil's magnet slides up to it
      if (S.bench) { E(S.bench.t0 + 1.4, "slide"); E(S.bench.t0 + 1.9, "jingle"); }
      // where is a magnet strongest?: the magnet dips in (a soft clatter), the clips leap and hang (a bright tinkle), the magnifiers, the clips dropped back
      if (S.lcpoles) { E(mk("dip") + 1.0, "jingle"); E(mk("lift") + .35, "jingle"); E(mk("lift") + .55, "jingle"); E(mk("bunch") + .2, "plip"); E(mk("bunch") + .5, "plip"); E(mk("middle"), "plip");
        [0, .12, .26, .4].forEach((d) => E(mk("shapes") - 1.5 + d, "clink")); E(mk("stars"), "sparkle"); E(mk("ringpoles") + 1.4, "softpop", 1); }
      // be the top ring magnet: the fan as a deep slow hum; the soft wooden slide down the pencil; a springy hum that rises as the gap shrinks
      if (S.shrink) { for (let t = mk("dive") + .3; t < S.shrink.t1 - 1; t += 2.4) E(t, "hum"); [0, .9, 1.8, 2.7].forEach((d) => E(mk("jslide") + d, "rub")); sfx(mk("jpress") - .2, "riser.wav", .07, "wonder"); E(mk("jpress"), "thup", 0); E(mk("jstop") + .1, "boing"); }
      // HOLD ON!: Pip presses the ring and lets go: it springs back (twice)
      if (mk("try") !== undefined) [0, 1.8].forEach((d) => { E(mk("try") + d, "tap"); E(mk("try") + d + .35, "boing"); });
      if (mk("flip") !== undefined) { E(mk("flip") + .1, "whoosh"); E(mk("click") + .02, "set"); E(mk("click") + .04, "click"); }
      // pull or push?: the pencils roll; a click; the gap that never closes (a hush)
      if (S.pushpull) E(S.pushpull.t0 + 1.2, "slide");
      if (S.lcpushpull) { ROLL(mk("pull") + .6, mk("click2")); E(mk("push") + .3, "flip"); ROLL(mk("away") + .2, mk("away") + 1.8); E(mk("board2") + .1, "softpop", 2); }
      // the spider: a soft swing on its silk; a breeze under the fun fact's sky
      if (S.liz) { E(W("m1102", "spider") + .4, "pluck", 7); sfx(mk("ff_up") - .2, "wind.wav", .05); }
      if (S.cliff) { E(mk("pairs1") - .8, "slide"); E(mk("pairs2") - .8, "flip"); E(mk("blueends") - .6, "flip"); E(mk("blueends") + .2, "slide"); }
    } else {
      // Pip's HDB flat that evening: a pot lid's clink from a neighbour's kitchen, a far-off TV, the lizard's soft "chik-chik-chik" now and then
      const KIT = ["kitchen", "r1ans", "fridge", "show", "fix", "bars", "dare"];
      for (const sc of TL.scenes) if (KIT.includes(sc.name) && sc.t1 - sc.t0 > 3) { sfx(sc.t0 + 1.2, "ep06_clink.wav", .035); if (sc.t1 - sc.t0 > 12) sfx(sc.t0 + 8, "ep05_laugh.wav", .02); }
      [["r1ans", 3.5], ["fix", 2.5], ["bars", 1.5]].forEach(([n, d]) => { if (S[n]) E(S[n].t0 + d, "chek", .5); });
      if (S.game) E(W("n202", "lizard") + .35, "chek", .8);
      // the train comes in along the table (a light wooden rattle)
      ROLL(mk("train") - .5, mk("train") + .1);
      // be a toy train carriage: wooden wheels on the track, a rising hum as the push builds, the engine rolling away, Basil's turn and set down, CLICK
      if (S.shrink) { ROLL(mk("jtrack") + .2, mk("jengine")); ROLL(mk("jroll"), mk("jaway")); ROLL(mk("jaway") + .2, mk("jaway") + 2.2); sfx(mk("jroll"), "riser.wav", .06, "wonder"); E(mk("jturn") + .1, "whoosh"); E(mk("jturn") + 2.5, "set"); ROLL(mk("jclick") - 2.4, mk("jclick")); E(mk("jclick") + .03, "click"); }
      // like and unlike poles: a tick as each box on the card fills; the snap's click
      if (S.lclike) { for (const k of ["ns", "sn", "nn", "ss"]) E(mk(k) + .15, "tick", 1); E(mk("snap") + .03, "set"); E(mk("rings") + .3, "softpop", 1); }
      if (mk("rule") !== undefined) { E(mk("rule"), "squeak"); E(mk("rule") + .1, "scribble"); }
      // is it a magnet?: the toolbox's metal clunk; a soft click for each pull; the roll back for the push
      if (S.bars) E(S.bars.t0 + .3, "clunk");
      if (S.lctest) { [mk("pullall"), mk("pullall") + 1.6, mk("pullall") + 3.2, mk("pullall") + 4.8, mk("never") + .2, mk("never") + 1.6].forEach((x) => E(x + .3, "click")); E(mk("turn") + .3, "flip"); ROLL(mk("push") + .1, mk("push") + .9); E(mk("bmagnet"), "chime2", 0); }
      // the lizard's reveal: its "chik-chik-chik"; a tiny chime on the magnifier
      if (S.liz) { E(W("n1102", "lizard") + .35, "chek", .9); E(mk("ff_toe") + .1, "plip"); }
      if (S.dare) E(mk("spin") - .2, "tap");
    }
    // no ambience one-shot under a countdown (only the ticks keep time)
    const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "chek", "jingle", "slide"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
