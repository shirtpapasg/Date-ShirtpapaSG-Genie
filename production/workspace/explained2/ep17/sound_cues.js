// sound_cues.js: EP17 sound plan (Stage 1 rituals and beds + Stage 2 places and foley, 23 Nov) (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 / EP16, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and
// driven by the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps,
// journeys, the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for
// teaching, wonder for the journeys, birds outdoors). STAGE 2 adds each place's own life and the foley on their marks (SERIES_FORMAT 9;
// SCENES_TODO's Sound line per scene): the garden at dawn (a bulbul, far traffic, a soft steady munch ON munch, leaf rustle), the lime plant
// (munching, a tick per leg pair ON front, a tiny click-click ON hooks / grip), the butterfly journey (a tiny crack ON jhatch, munching ON
// jmunch, a tight creak ON jtight, a soft split ON jsplit), the pupa (a soft pulse in the window, a crackle ON split, an unfolding rustle ON
// wings, a flutter ON fly), the pail after rain (drips, a plip ON rain / pail, still-water hush, a plink as a wriggler touches the surface),
// the mosquito journey (a pop ON jhatch, underwater hush, a split ON jsplit, a thin soft whine of new wings ON jfly: never scary), the HDB
// corridor (a fan from a flat, a far lift ding, a neighbour's radio low; a splash ON tip, a soft 'off' tone per dimming tile from dim), the
// easel's strike (strike), the void deck (the dare). song.js's garden bed says "no hens" (EP15): right for EP17 too.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer1|mosqans|fix|dare|cliff)$/, CALM = /^(lasttime|lime|lc|mark|larva|plate|ring|place|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^(place|lime|answer1|larva|holdon|ring|mosqans|show|fix|dare|cold|back|cliff)$/.test(s.name)) BD(s.t0, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "a301a" : "b201a"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (mk("cardsIn") !== undefined) [0, .3, .6].forEach((d) => E(mk("cardsIn") + d, "slide"));
  if (mk("budsIn") !== undefined) [0, .15, .3].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (has("a203")) ["one", "two"].forEach((w, i) => E(W("a203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["a402", "a403", "a404"] : ["b302", "b303", "b304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "a502", ["a503", "a504", "a505"]); lock("hold", 5, null, []); if (has("a1002")) E(W("a1002", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "b402", ["b403", "b404", "b405"]); lock("show", 5, "b803", ["b804p"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["a707", "a708"], ["a1202", "a1203"]] : [["b705", "b706"], ["b908", "b909"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "a1301" : "b1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "a1302" : "b1102", HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); BD(S.liz.t0, S.liz.t1); }
  if (S.cliff && has("a1402")) { E(LT("a1402") - .2, "lowdrum"); E(W("a1402", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("b1401", "lock") - .1, "sting"); }
  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): the community garden (R.garden: birds, far children at the void deck, leaves) on
  // the lime-plant side and at the far corner after rain (drips from the tap and the leaves, plips and rings on the pail); the HDB corridor and
  // the void deck (R.room: a soft hum of the block, birds far off, a passing car below; a fan, a lift's ding). Foley ON the marks. No ambience
  // one-shot under a countdown (only the ticks keep time).
  { const P1 = ["cold", "back", "title", "answer1", "lime", "lclegs", "waitw", "pullout", "larva", "holdon", "lcpupa", "ring", "cliff"], P2 = ["place", "lcwriggler", "waitw", "pullout", "mosqans", "show", "fix"], LIST = PART === 1 ? P1 : P2, out = [];
    for (const sc of TL.scenes) if (LIST.includes(sc.name)) { const last = out[out.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else out.push([sc.t0, sc.t1]); }
    R.garden.push(...out.filter(([a, b]) => b - a > 1)); R.birds = R.birds.filter(([a, b]) => !out.some(([x, y]) => a >= x - .1 && b <= y + .1));
    const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }), clk = (t, i = 0) => E(t, "pop", i % 3);
    if (PART === 1) {
      // dawn at the lime plant: a bulbul's call, the caterpillar's soft steady munch (munch), a leaf rustle
      E(.4, "morning"); E(3.2, "mynah");
      for (const n of ["cold", "back", "title"]) if (S[n]) for (let t = Math.max(S[n].t0, mk("munch")), i = 0; t < S[n].t1 - .2; t += .55, i++) sfx(t, "ep05_munch.wav", .07 + .02 * (i % 2), "amb");
      sfx(1.0, "ep05_leaf.wav", .1, "amb");
      // the answer: a soft slide as the butterfly card comes in (pair); the worm idea's bubble; the look-closer: a tick per leg pair, Pip's count,
      // a click-click of the tiny hooks, the walk
      E(mk("pair"), "slide"); if (S.lime) { E(W("a701m", "worm") - .2, "softpop", 1); for (let t = S.lime.t0 + .4; t < S.lime.t1 - .5; t += 1.6) sfx(t, "ep05_leaf.wav", .05, "amb"); }
      [0, .35, .7].forEach((d, i) => E(mk("front") + .1 + d, "tok")); ["one", "two", "three"].forEach((w, i) => clk(W("a703p", w), i)); [0, 1, 2, 3, 4].forEach((i) => clk(W("a705", "prolegs") + i * .12, i));
      E(mk("hooks"), "click"); E(mk("hooks") + .18, "click"); E(mk("grip"), "click"); E(mk("grip") + .2, "click"); E(mk("grip") + .5, "rustle");
      // the journey: a tiny crack as you hatch, munching, a tight creak, the moult's stretch, the last soft split, a hush as the case closes
      E(mk("jhatch"), "crack"); E(mk("jhatch") + .3, "crack", 1); E(mk("jhatch") + .5, "rise", 1);
      for (let k = 0; k < 6; k++) sfx(mk("jmunch") + k * .55, "ep05_munch.wav", .14, "wonder"); E(mk("jtight"), "creak"); E(mk("jtight") + 1, "stretch"); E(mk("jbig"), "rise", 2);
      E(mk("jhang") + .2, "stretch"); E(mk("jsplit"), "crack", 1); E(mk("jsplit") + .4, "creak"); E(mk("jpupa"), "hum"); E(mk("jpupa") + .2, "chime2", 0);
      // HOLD ON!: Pip's paper on the easel; the glow inside his drawing
      E(mk("pupastill") - .1, "paper"); E(W("a1004b", "inside") - .1, "softpop", 3);
      // the pupa look-closer: a soft pulse in the window, a crackle as the case splits, an unfolding rustle as the wings spread, a flutter on fly
      E(mk("window") - .2, "window"); E(mk("case"), "pop", 0); for (let t = mk("form"), i = 0; t < mk("dark") - .4; t += 1.25, i++) E(t, "heartbeat"); E(mk("dark") + .2, "hum");
      E(mk("split"), "crack"); E(mk("split") + .25, "crack", 1); E(mk("out") + .2, "rustle"); E(mk("wings"), "cloth"); E(mk("wings") + 1.6, "cloth"); E(mk("wings") + 3.2, "cloth"); E(mk("fly"), "flutter"); E(mk("fly") + .5, "flutter");
      if (S.lcpupa) E(W("a1103m", "cake") - .1, "softpop", 2);
      // the board's tiles land; the last arrow lights and the loop runs round
      ["ltegg", "ltlarva", "ltpupa", "ltadult"].forEach((k, i) => E(mk(k) + (i ? 0 : .3), "rise", i)); E(mk("ltback"), "whoosh"); E(mk("ltback") + .2, "sparkle");
      // the moth's reveal: a soft wing flutter on its name; the cliffhanger: drips, a plip as a drop falls in (pail), tiny plinks as they wriggle
      E(W("a1302", "moth") + .3, "flutter"); E(W("a301a", "moth") + .2, "flutter");
      if (S.cliff) { for (let t = S.cliff.t0 + .3, i = 0; t < S.cliff.t1 - .3; t += 1.4, i++) E(t, "drip", i); E(mk("pail"), "plip"); E(mk("pail") + 2.8, "plip"); E(mk("wrig"), "bubble", 1); E(mk("wrig") + .5, "bubble", 2); E(mk("wrig") + .2, "curious"); }
    } else {
      // after rain at the far corner: drips from the tap and the leaves, a plip on rain, a far bus
      for (const n of ["place", "mosqans", "show", "fix", "pullout"]) if (S[n]) for (let t = S[n].t0 + .4, i = 0; t < S[n].t1 - .3; t += 1.5 + .4 * (i % 3), i++) E(t, "drip", i);
      E(mk("rain"), "plip"); E(mk("rain") + 5.5, "plip"); sfx(S.place.t0 + .3, "pass_by.wav", .05, "amb"); E(W("b201a", "dragonfly") + .2, "buzz");
      // the wrigglers: plinks as they touch the surface (hang, up), a soft swish as they dive, a click on the tube
      E(mk("hang"), "plip"); E(mk("tube"), "pop", 1); E(mk("up") - 2.4, "whoosh"); E(mk("up"), "plip"); E(mk("up") + .4, "bubble", 1); if (S.lcwriggler) sfx(S.lcwriggler.t0 + 1, "underwater.wav", .04, "amb");
      // the journey: a pop as you hatch, the underwater hush, tiny nibbles, a squeeze and the old skin, a tumble, the split, the new wings' soft hum
      if (S.shrink) for (let t = mk("jhatch"); t < mk("jfly") - .5; t += 5) sfx(t, "underwater.wav", .07, "wonder");
      E(mk("jhatch"), "pop", 2); E(mk("jhatch") + .1, "bubble", 3); for (let k = 0; k < 6; k++) sfx(mk("jeat") + .3 + k * .45, "ep08_nibble.wav", .1, "wonder"); E(mk("jbig"), "creak"); E(mk("jbig") + .9, "stretch");
      E(mk("jpupa"), "boop", 1); E(mk("jpupa") + 2, "bubble", 2); E(mk("jsplit"), "crack", 1); E(mk("jsplit") + .3, "rise", 2); E(mk("jfly"), "flutter"); E(mk("jfly") + .6, "flutter"); E(mk("jfly") + .3, "chime2", 0);
      // the answer: a plip as a pupa tumbles; the Showdown: paper on each line; the fix: a strike, a green scribble
      E(mk("ansglow") + .8, "plip"); ["l1", "l2", "l3"].forEach((k) => E(mk(k), "paper")); E(mk("strike"), "scribble"); E(mk("rewrite"), "scribble"); E(mk("rewrite") + .3, "chime2", 0);
      if (S.fix) E(LT("b807m") - .3, "softpop", 2);
      // the HDB corridor: the block's hum and birds (R.room), a lift's far ding, Pip's thought bubble; the plate: a splash as it is tipped, a soft
      // "off" tone per dimming tile, a pop per life picture
      for (const n of ["plate", "lcplate"]) if (S[n]) R.room.push([S[n].t0, S[n].t1]); if (S.plate) { E(S.plate.t0 + 1.4, "lift"); E(W("b902p", "surely") - .2, "softpop", 1); }
      E(mk("water"), "pop", 0); E(mk("wrigglers"), "bubble", 1); E(mk("tip") + .7, "sfx", { f: "splash.wav", g: .14, bus: "game" }); [0, 1, 2, 3].forEach((i) => E(mk("dim") + i * .9, "boop", i));
      E(W("b907m", "plates") - .2, "pop", 0); E(mk("pail2"), "pop", 1); E(mk("vase"), "pop", 2);
      // the dragonfly's reveal: its wings' soft buzz; the nymph's gulp; the void deck (R.room) with a pigeon's coo
      E(W("b1102", "dragonfly") + .3, "buzz"); E(mk("ff_gobble") + .45, "sfx", { f: "ep03_gulp.wav", g: .14, bus: "game" });
      if (S.dare) { R.room.push([S.dare.t0, S.dare.t1]); E(S.dare.t0 + 2.5, "hoo"); }
    } }
  // no ambience one-shots under a countdown (only the ticks keep time)
  { const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "drip", "bubble", "plip", "buzz", "flutter"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
