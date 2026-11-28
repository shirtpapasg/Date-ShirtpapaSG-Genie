// sound_cues.js: EP16 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and driven by
// the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps, journeys,
// the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for teaching,
// wonder for the journeys, birds outdoors). STAGE 2 adds the garden's own life and foley on their marks (SERIES_FORMAT 9; the script's Sound
// column): the pond at dawn (frogs calling, fading as the light comes; drips from the leaves; ripples as the tadpoles pass: wriggle), the
// grass (rustle, grasshopper clicks: hop; the hen's clucks and the chicks' peeps: henIn, peck; a far bus); underwater hush and bubbles in
// the frog-egg journey (a soft bloop as the fish bumps the jelly: fish; a pop as you hatch: jhatch; a splash and birds at jpad); munching
// (jeat), a tight creak (jtight), a soft crack (jsplit), an unfolding rustle (jwings); a click per label in the look-closers; the easel's
// strike (strike); a croak on the tree frog's name. song.js's garden bed has "no hens" (EP15): EP16's grassy edge DOES have the hen.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|frogans|nymphans|fix|dare|cliff)$/, CALM = /^(lasttime|pond|lc|mark|hen|skin|moult|ring|place|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^(place|pond|frogans|holdon|ring|hen|skin|moult|show|fix|dare|cold|back)$/.test(s.name)) BD(s.t0, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "e301a" : "f201a"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (mk("cardsIn") !== undefined) [0, .3, .6].forEach((d) => E(mk("cardsIn") + d, "slide"));
  if (mk("budsIn") !== undefined) [0, .15, .3].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (has("e203")) ["one", "two", "three"].forEach((w, i) => E(W("e203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["e402", "e403", "e404"] : ["f302", "f303", "f304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "e502", ["e503", "e504", "e505"]); lock("hold", 5, null, []); if (has("e902")) E(W("e902", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "f402", ["f403", "f404", "f405"]); lock("show", 5, "f1104", ["f1105b", "f1106m"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["e1001", "e1002"], ["e1201", "e1202"]] : [["f601", "f602"], ["f1001", "f1002"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "e1301" : "f1301"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "e1302" : "f1302", HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); BD(S.liz.t0, S.liz.t1); }
  if (S.cliff && has("e1502")) { E(LT("e1502") - .2, "lowdrum"); E(W("e1502", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("f1401", "lock") - .1, "sting"); }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): ONE place, the community garden. The pond side: birds, far children at the void
  // deck, leaves (R.garden), plus frogs calling at dawn (fading as the light comes), drips from the big leaf, a trickle and bubbles; the grassy
  // corner: the same bed, grasshopper clicks, and the HEN (R.hens: her low clucks and the chicks' peeps) only while she is on screen. Foley ON
  // the marks. No ambience one-shot under a countdown (only the ticks keep time).
  { const P1 = ["cold", "back", "title", "pond", "lceggs", "waitw", "pullout", "frogans", "holdon", "ring", "hen", "lcchick", "cliff"], P2 = ["place", "lcnymph", "nymphans", "skin", "lcskin", "waitw", "pullout", "moult", "show", "fix", "dare"], LIST = PART === 1 ? P1 : P2, out = [];
    for (const sc of TL.scenes) if (LIST.includes(sc.name)) { const last = out[out.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else out.push([sc.t0, sc.t1]); }
    R.garden.push(...out.filter(([a, b]) => b - a > 1)); R.birds = R.birds.filter(([a, b]) => !out.some(([x, y]) => a >= x - .1 && b <= y + .1));
    const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }), clk = (t, i = 0) => E(t, "pop", i % 3);
    if (PART === 1) {
      // the pond at dawn: a frog chorus that fades as the light comes; drips from the big leaf; ripples as the tadpoles pass
      for (let t = .2, i = 0; t < 5.6; t += .55 + .25 * (i % 3) + .12 * t, i++) E(t, "ribbit", i);
      for (const n of ["cold", "back", "title", "pond", "frogans", "ring"]) if (S[n]) for (let t = S[n].t0 + .5, i = 0; t < S[n].t1 - .3; t += 1.6 + .5 * (i % 3), i++) E(t, "drip", i);
      for (const n of ["pond", "frogans", "holdon"]) if (S[n]) for (let t = S[n].t0 + 1, i = 0; t < S[n].t1 - 1; t += 5.5, i++) sfx(t, "ep07_flow.wav", .05);
      E(mk("wriggle"), "bubble", 1); E(mk("wriggle") + .4, "bubble", 2);
      E(W("e301a", "frog") + .3, "ribbit"); E(W("e301b", "sticky") + .1, "pop", 2);
      if (S.pond) E(W("e602m", "mother") - .2, "softpop", 1);
      // the eggs: a click per label; the fish's soft bloop on the jelly; a warm shimmer as the sun comes out; the underwater hush
      if (S.lceggs) for (let t = S.lceggs.t0 + 1.2; t < S.lceggs.t1 - .5; t += 5) sfx(t, "underwater.wav", .05);
      clk(mk("clump") + .2, 0); clk(mk("dots") + .2, 1); clk(mk("kw_jelly_like_covering"), 2); sfx(mk("fish") + .5, "ep06_plop.wav", .16, "game"); E(mk("fish") + .6, "boing"); E(mk("sun") - .1, "reveal"); clk(mk("sun") + 1.4, 1);
      // the journey: underwater hush and little bubbles; a bloop as the fish bumps the jelly; a pop as you hatch; tiny kicks; a splash and birds
      if (S.shrink) { for (let t = mk("jegg"); t < mk("jpad"); t += 5) sfx(t, "underwater.wav", .07, "wonder"); for (let t = mk("jegg") + .7, i = 0; t < mk("jpad"); t += 1.1 + .4 * (i % 3), i++) E(t, "bubble", i); }
      sfx(W("e702", "fish") + 1.3, "ep06_plop.wav", .14, "wonder"); E(mk("jhatch"), "pop", 2); E(mk("jhatch") + .1, "stretch"); [0, .35].forEach((d, i) => { E(mk("jback") + d, "hop", i); E(mk("jfront") + d, "hop", i + 2); }); E(mk("jtail"), "boop");
      sfx(mk("jpad") + .2, "splash.wav", .18, "wonder"); sfx(mk("jpad") + .6, "ep08_birds.wav", .12, "wonder"); E(mk("jfrog"), "rise", 1); E(mk("jfrog") + .3, "ribbit");
      // the answer: the little frog's croak and plop; HOLD ON!: Pip's paper rustles, the bracket, the row slides into a loop; the board's tiles
      E(mk("ansglow") + .6, "ribbit"); sfx(W("e803m", "hops") - .05, "ep06_plop.wav", .12, "game");
      E(mk("board") - .1, "paper"); E(mk("bracket"), "scribble"); E(mk("tegg") - .3, "whoosh"); E(mk("tyoung"), "hop", 1); E(mk("tadult"), "hop", 2); E(mk("tback"), "sparkle");
      // the hen and her chicks (only here): clucks and peeps on henIn, little pecks; the look-closer: a click per part, pecks on peck
      if (S.hen) { R.hens.push([mk("henIn") - .6, S.hen.t1]); E(mk("henIn"), "cluck"); E(mk("henIn") + .5, "peep"); for (let t = mk("henIn") + 1.6, i = 0; t < S.hen.t1 - .4; t += .9 + .5 * (i % 3), i++) sfx(t, "ep05_peck.wav", .08, "amb"); }
      if (S.lcchick) R.hens.push([S.lcchick.t0, mk("pairs")]);
      clk(mk("beak"), 0); clk(mk("wings"), 1); clk(mk("legs"), 2); for (let k = 0; k < 4; k++) sfx(mk("peck") + k * 2.4, "ep05_peck.wav", .18, "game"); E(mk("pairs"), "tag", 0);
      // the tree frog's reveal: a croak on its name; the cliffhanger: a grasshopper's click as it hops on, the skin's ? (wired drum)
      E(W("e1302", "frog") + .2, "ribbit"); E(mk("hop"), "chek", .7); E(mk("hop") + .1, "hop", 1); E(mk("skin") + .2, "curious");
    } else {
      // the grassy corner: grasshopper clicks now and then; the little one hops on (hop)
      for (const n of ["place", "nymphans", "skin", "moult", "dare"]) if (S[n]) for (let t = S[n].t0 + .8, i = 0; t < S[n].t1 - .4; t += 3.2 + (i % 3), i++) E(t, "chek", .45);
      E(mk("hop"), "hop", 1); E(W("f201a", "mantis") + .2, "rustle");
      // the nymph look-closer: a click per part; the empty skin: clicks, a soft creak as the old skin goes tight
      ["legs", "feelers", "jump", "wings"].forEach((k, i) => clk(mk(k), i)); clk(mk("split"), 0); clk(mk("hollow"), 1); clk(mk("hollow") + .6, 2); E(mk("tight") - .6, "creak");
      if (S.skin) E(W("f701m", "dry") - .2, "softpop", 1);
      // the journey: munching, a tight creak, a soft crack, a wriggle rustle, small ticks for the old skins, the wings unfolding
      for (let k = 0; k < 5; k++) sfx(mk("jeat") + k * .5, "ep05_munch.wav", .14, "wonder"); E(mk("jtight"), "creak"); E(mk("jtight") + .8, "stretch"); E(mk("jsplit"), "crack"); E(mk("jout"), "rustle"); E(mk("jhard"), "chime2", 0);
      for (let k = 0; k < 4; k++) E(mk("jagain") + k * .9, "tok"); sfx(mk("jwings"), "ep09_wings.wav", .14, "wonder"); E(mk("jwings") + .2, "rise", 1);
      // moulting: the grasshopper hops away after Momo's line; the Showdown: paper on each line; the fix: a strike, a green scribble, the egg case
      if (S.moult) E(LE("f902m") + .3, "hop", 2);
      ["l1", "l2", "l3"].forEach((k) => E(mk(k), "paper")); E(mk("strike"), "scribble"); E(mk("rewrite"), "scribble"); E(mk("case") - .1, "pop", 2); E(mk("case") + 1.2, "window");
      // the dare: the caterpillar munching on the lime plant
      if (S.dare) for (let k = 0; k < 4; k++) sfx(S.dare.t0 + .4 + k * .55, "ep05_munch.wav", .1, "amb");
    } }
  // no ambience one-shots under a countdown (only the ticks keep time)
  { const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "drip", "chek", "ribbit", "cluck", "peep", "bubble"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
