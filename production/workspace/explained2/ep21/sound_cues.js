// sound_cues.js: EP21 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP20, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and
// driven by the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps,
// journeys, the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for
// teaching, wonder for the journeys, EP18's outdoor bed R.deck (children far off, birds) under the school field (Part 1) and EP10's small
// waves R.sea under Pulau Ubin's jetty and boardwalk (Part 2)), plus the marks' main foley (the string's creak, the spin's whoosh, the
// settle chimes, the cones, the bench scrape, the compass's tick and click, the push whoosh and the pull clack, the nail's strokes).
// STAGE 2 adds the places' own life and foley on their marks (SERIES_FORMAT 9; the Sound line of each scene in SCENES_TODO.md): the SCHOOL
// FIELD after school (children's voices far off, a PE whistle, a football thud, birds in the rain tree, a soft breeze, the swallow's
// twitter), the classroom panel (a fan, a far-off school bell), the basin (a splash and a ripple), the Earth (a long rising whoosh, a deep
// soft space hum), PULAU UBIN (waves lapping the jetty, a bumboat's putt-putt engine fading, a far ship's horn, birds in the mangroves,
// footsteps on the boards, the turtle's soft breath and splash), the night ship (a deep engine hum, waves at night), the fog (a damp hush, a
// far bird call), the journeys (a slow deep whoosh, the string's long creak, a soft rising hum as you swing back; a thin metal hum on the
// pin, a deep rumble as the giant magnet comes, a soft push whoosh, a pull swish, a settle chime).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|r1ans|fix|dare|cliff)$/, CALM = /^(lasttime|today|goal|earthq|trail|bwalk|lc|mark|jetty|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the place's outdoor bed (Part 1: EP18's R.deck, children far off and birds, under every school-field scene; Part 2: EP10's R.sea, small
  // waves, under the jetty and the boardwalk); joined across short gaps
  { const OUT = PART === 1 ? ["cold", "back", "title", "today", "answer", "goal", "holdon", "earthq", "liz", "cliff"] : ["jetty", "r1ans", "trail", "show", "fix", "bwalk", "dare", "liz"], key = PART === 1 ? "deck" : "sea";
    for (const sc of TL.scenes) if (OUT.includes(sc.name)) { const last = R[key][R[key].length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R[key].push([sc.t0, sc.t1]); }
    R[key] = R[key].filter(([a, b]) => b - a > 1); }
  // the cold open: Basil's gentle spin (a soft whoosh, the string's creak), the buddies lean in
  if (mk("spin0") !== undefined) { E(mk("spin0"), "whoosh"); E(mk("spin0") + .4, "creak"); }
  if (mk("budsIn") !== undefined) [0, .15].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (mk("chart") !== undefined) E(mk("chart") + .1, "chime");
  if (mk("boat") !== undefined) { E(mk("boat"), "step"); E(mk("boat") + .3, "step"); }
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
  else { lock("r1", 5, "n402", ["n403p", "n404m", "n405b"]); lock("show", 5, "n803", ["n804b"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // the topic's own foley on its marks: the spin and the settle (a soft chime as the magnet / needle comes to rest), the cones, the bench
  // scrape, the hang-up, the Earth, the compass's tick and click, the push and the pull, the rose's boxes, the route, the nail's strokes
  for (const k of ["jfinger", "jagain"]) if (mk(k) !== undefined) E(mk(k) + .1, "whoosh");
  for (const k of ["jback"]) if (mk(k) !== undefined) E(mk(k) + .1, "rise", 2);
  for (const k of ["jstop", "jstop2", "jnorth", "jns", "freeturn", "shipneedle", "hiker"]) if (mk(k) !== undefined) E(mk(k) + .3, "chime", 0);
  if (mk("cones") !== undefined) { E(mk("cones") + .2, "thup"); E(mk("cones") + .5, "thup"); }
  if (mk("tangle") !== undefined) E(mk("tangle") + .1, "cloth");
  if (mk("try") !== undefined) [0, .9, 1.8].forEach((d) => E(mk("try") + d, "rub"));
  if (mk("hangup") !== undefined) E(mk("hangup") + .3, "creak");
  if (mk("basin") !== undefined) E(mk("basin") + .2, "plip");
  if (mk("up") !== undefined) E(mk("up"), "rise", 4);
  if (mk("everywhere") !== undefined) [0, .4, .8, 1.2, 1.6, 2.0].forEach((d, i) => E(mk("everywhere") + d, "pop", i % 3));
  if (mk("compass") !== undefined) E(mk("compass") + .2, "tick", 0);
  if (mk("jcome") !== undefined) E(mk("jcome"), "rumble");
  for (const k of ["jpush"]) if (mk(k) !== undefined) E(mk(k) + .2, "whoosh");
  for (const k of ["jturn"]) if (mk(k) !== undefined) E(mk(k) + .1, "flip");
  for (const k of ["jpull"]) if (mk(k) !== undefined) E(mk(k) + .2, "clack");
  if (mk("turn") !== undefined) E(mk("turn") + .2, "click");
  if (mk("setN") !== undefined) E(mk("setN") + .3, "click");
  if (mk("rose") !== undefined) [0, .4, .8, 1.2].forEach((d) => E(mk("rose") + d, "tick", 1));
  if (mk("route") !== undefined) { E(mk("route"), "reveal"); E(mk("route") + .2, "sparkle"); }
  if (mk("ship") !== undefined) E(mk("ship"), "rumble");
  if (mk("stroke") !== undefined && S.dare) for (let x = mk("stroke"); x < S.dare.t1 - .5; x += 1.5) E(x + .05, "rub");   // Stage 2: one soft metal swish per stroke (p2.js strokeAt: every 1.5 s)
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m808", "m809"], ["m1007", "m1008"]] : [["n706", "n707"], ["n906", "n907"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1101" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "m1102" : "n1102", HIDDEN[0]) + .2, "sparkle"); E(W(PART === 1 ? "m1102" : "n1102", HIDDEN[0]) + .5, PART === 1 ? "cheep" : "bubble"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  if (S.cliff && has("m1202")) { E(LT("m1202") - .2, "lowdrum"); E(W("m1202", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("n1201", "lock") - .1, "sting"); }
  // the Showdown's paper and the fix (Momo's checklist lines, the strike, the green rewrite)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); } }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];

  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): the places' own life and the foley ON the marks (SCENES_TODO's Sound lines)
  { const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus });
    if (PART === 1) {
      // the school field after school: a PE whistle now and then, a football thud far off, the swallow's twitter, a soft breeze
      const FLD = ["cold", "back", "today", "answer", "goal", "holdon", "earthq", "cliff"];
      for (const sc of TL.scenes) if (FLD.includes(sc.name) && sc.t1 - sc.t0 > 3) { sfx(sc.t0 + .6, "wind.wav", .03); if (sc.t1 - sc.t0 > 6) E(sc.t0 + 2.2, "cheep", .5); }
      [["cold", 3.4], ["answer", 6.5], ["holdon", 2.2], ["earthq", 4.5]].forEach(([n, d]) => { if (S[n]) sfx(S[n].t0 + d, "ep07_whistle.wav", .025); });
      [["back", .4], ["goal", 3.2], ["holdon", 30.5]].forEach(([n, d]) => { if (S[n]) E(S[n].t0 + d, "thup", 0); });
      if (S.game) E(W("m302", "swallow") + .4, "cheep", .8);
      // be the hanging magnet: the breeze as a slow deep whoosh, the string's long creak as you turn
      if (S.shrink) { sfx(mk("dive") + .3, "wind.wav", .05, "wonder"); [mk("jspin") + .8, mk("jslow"), mk("jagain") + 1].forEach((x) => E(x, "creak")); E(mk("jstop") + .1, "hum"); E(mk("jstop2") + .1, "hum"); }
      // which way?: the string's creak in the field panel, the classroom's fan and a far-off school bell, the basin's splash
      if (S.lcplaces) { E(mk("field") + .2, "creak"); sfx(mk("room") + .1, "ep05_bell.wav", .03); E(mk("room") + .8, "hum"); [mk("field") + 2.8, mk("room") + 4.2, mk("basin") + 4.8].forEach((x) => E(x, "chime2", 0)); }
      // fly up: a deep, soft space hum under the Earth
      if (S.lcearth) { E(mk("earth") + .2, "hum"); E(mk("earth") + 2.8, "hum"); sfx(mk("up") + .1, "space_warp.wav", .05, "wonder"); }
      // HOLD ON!: the tangled string; the swing that stops on the line (a soft settle)
      if (mk("freeturn") !== undefined) E(mk("freeturn") + 1.0, "set");
      if (S.liz) E(W("m1102", "swallow") + 1.2, "cheep", .7);
      if (S.cliff) E(mk("compass") + 1.2, "tick", 0);
    } else {
      // Pulau Ubin: a bumboat's putt-putt engine fading, a far ship's horn now and then, birds in the mangroves, footsteps on the boards
      const UBN = ["jetty", "r1ans", "trail", "show", "fix", "bwalk", "dare"];
      for (const sc of TL.scenes) if (UBN.includes(sc.name) && sc.t1 - sc.t0 > 3) { sfx(sc.t0 + .8, "ep08_birds.wav", .04); }
      if (S.jetty) { sfx(S.jetty.t0, "generator_hum.wav", .03); E(mk("boat") + .5, "step"); }
      [["r1ans", 5], ["show", 4], ["dare", 9]].forEach(([n, d]) => { if (S[n]) sfx(S[n].t0 + d, "ep05_horn.wav", .02); });
      if (S.game) { E(W("n202", "turtle") + .4, "bubble", 1); sfx(W("n202", "turtle") + .8, "breath.wav", .05); }
      if (S.bwalk) { E(S.bwalk.t0 + .3, "step"); E(S.bwalk.t0 + .8, "step"); }
      if (S.trail) [0, .5, 1.0].forEach((d) => E(S.trail.t0 + 1.2 + d, "click"));
      // be the compass needle: a thin metal hum on the pin as you turn
      if (S.shrink) { E(mk("jfree") + .1, "hum"); E(mk("jpull") + .4, "hum"); }
      // night and far away: the ship's deep engine hum and the wash of waves at night; a damp hush of fog and a far bird call
      if (S.lcnight) { sfx(mk("ship"), "sea_wash.wav", .08); E(mk("ship") + 1.2, "hum"); sfx(mk("fog"), "wind.wav", .04); E(mk("fog") + 1.5, "cheep", .3); }
      if (S.liz) { sfx(W("n1102", "turtle") + .6, "splash.wav", .05); sfx(mk("ff_ocean"), "sea_wash.wav", .06); }
      if (S.dare) E(MK("dareIn") + .2, "clink");
    }
    const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "cheep", "thup", "step"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
