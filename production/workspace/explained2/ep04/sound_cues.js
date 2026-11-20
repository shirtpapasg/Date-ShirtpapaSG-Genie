// sound_cues.js: every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const hold = (b, c, r0, dur = 5) => { E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp"); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(W(c, "one") - .1, "coin"); };
  if (PART === 1) { const tb = MK("coldCard");
  // 1-3 the cold open, the callback, the title, the game
  R.birds.push([0, S.title.t0 + .3]); E(.4, "curious"); [0, 1, 2, 3].forEach((i) => { E(.6 + i * .4, "slide"); E(1.1 + i * .4, "set"); }); E(tb, "pop", 0); E(tb + .5, "pop", 1); E(tb + 1.0, "pop", 2); for (let k = 0; k < 4; k++) E(4.6 + k * .5, "cheep", k);
  E(LT("c201"), "pluck", 0); [0, 1, 2, 3].forEach((i) => E(W("c201", "four") - .1 + i * .22, "knock")); ["big", "small", "green", "scary"].forEach((w, i) => E(W("c202", w) - .1, "boop", i));
  E(S.title.t0 + .05, "whoosh"); [.26, .61, W("c203", "is") - S.title.t0 + .16].forEach((d, i) => E(S.title.t0 + d, "slam", i));
  E(S.game.t0 + .15, "sting"); { const b = "c301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, "lizard") - .1, "chek"); E(W(b, "lizard") + .9, "chek"); }
  // 4 why classify
  R.birds.push([S.why.t0, S.mark1.t0]); ["hen", "cat", "tomato", "fern", "mushroom"].forEach((w, i) => E(W("c401", w) - .15, "softpop", i)); E(W("c401", "hen") + .3, "cheep", 1); E(W("c403", "same") - .2, "slide"); E(W("c403", "same") + .7, "set"); E(W("c403", "different") - .2, "softpop", 3); mark("c404", "c405");
  // 5 goals, countdown
  [0, 1, 2].forEach((i) => E(S.goals.t0 + .4 + i * 1.22 - .12, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 6 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "c601"; lock(MK("ring0_1"), 5, "c602", ["c603", "c604", "c605"], [W(L, "one", 2), W(L, "two", 1), W(L, "three")]); }
  { const a = "c606", tA = W(a, "three") - .1; E(tA, "hop", 0); E(tA + .45, "set"); E(tA + .45, "flip"); E(tA + .5, "tag"); E(W(a, "not") - .1, "boop", 1); E(W(a, "fungi") - .2, "reveal"); E(W("c607", "one") - .1, "coin"); }
  // 7 crate four, the shrink
  ["plants", "animals", "fungi"].forEach((w, i) => E(W("c701", w) - .1, "rise", i * 2)); E(W("c701", "four") - .2, "lowdrum", .5); E(LT("c702") + .1, "boop", 3); E(W("c703", "much") - .1, "tap"); E(S.crate4.t1 - .6, "shrink");
  R.wonder.push([MK("dive") + .3, S.reveal.t0 + .5]); E(MK("sand") - .2, "shrink"); E(MK("bact") - .2, "shrink"); for (let i = 0; i < 5; i++) E(LT("c707") + .4 + i * .9, "drip", i); ["rods", "round", "spirals"].forEach((w, i) => E(W("c708", w) - .2, "chime2", i)); E(W("c709", "living") - .1, "chime");
  // 8 the reveal, four main groups
  E(S.reveal.t0, "whooshout"); E(S.reveal.t0 + .8, "pop", 2); E(W("c801", "bacteria") - .15, "flip"); E(W("c801", "bacteria") - .1, "tag"); E(LT("c802") + .3, "chime"); mark("c804", "c805"); [9, 10, 11, 13].forEach((wi, i) => E(TL.lines.c805.words[wi].a, "rise", i * 2));
  E(LT("c806") + .1, "boop", 2); E(W("c807", "size") - .1, "softpop", 1);
  // 9 plants and animals
  [.5, .75].forEach((d, i) => E(S.plant.t0 + d, "softpop", i)); ["leaves", "stems", "roots"].forEach((w, i) => E(W("c902", w) - .1, "softpop", i + 2)); E(W("c902", "light") - .5, "chime2", 1); E(W("c902", "make") - .1, "leafrise");
  E(S.animal.t0 + .4, "cheep", 0); E(S.animal.t0 + 1.3, "cheep", 2); E(W("c903", "depend") - .2, "softpop", 0); E(W("c903", "depend") + .05, "softpop", 2);
  // 10 HOLD ON!
  E(S.listcard.t0, "roundcard"); { const a = "c1001", b = "c1002", c = "c1003"; E(S.list.t0 + .2, "scribble"); ["tomato", "fern", "grasshopper"].forEach((w, i) => E(W(a, w) - .1, "rise", i)); [1, 2, 3].forEach((n) => E(W(a, "green", n), "pip", n - 1)); E(LE(a) + .15, "sparkle"); E(LT(a) + 1.5, "chek", .45); E(LT(a) + 2.4, "chek", .45);
    hold(b, c, MK("ring0_2")); E(W(c, "animal") - .15, "tag", 1); E(W(c, "eats") - .1, "softpop", 1); E(LT("c1004") + .2, "scribble"); E(LE("c1004") + .1, "sparkle"); }
  // 11-12 the score hand, the lizard, the tease
  E(S.final.t0 + .1, "sting"); E(W("c1201", "high") + .2, "slap"); E(W("c1201", "two") - .1, "pip", 2); E(S.liz.t0 + .5, "chek"); E(S.liz.t0 + 1.4, "chek");
  { const a = "c1301", b = "c1302", c = "c1303"; [0, 1].forEach((i) => E(W(a, "two") - .2 + i * .2, "softpop", i)); E(LT(b) - .6, "slide"); E(LT(b) - .05, "set"); E(W(c, "so") - .1, "lowdrum"); E(W(c, "find") - .1, "slam", 1); }
  G(S.title.t0 + 1.0, S.why.t0); C(S.why.t0 + .3, LT("c405") - .4); G(S.r1.t0, MK("ring0_1")); G(LT("c603") - .5, S.crate4.t1 - 1.5); G(S.reveal.t0 + 1.4, LT("c805") - .4); G(S.notsize.t0, S.plant.t0); C(S.plant.t0 + .3, S.listcard.t0);
  G(S.list.t0, LT("c1002") - .1); G(LT("c1003"), S.final.t0 - .2); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); G(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the recap, "Last time", goals, the game
  for (let i = 0; i < 5; i++) E(S.recap.t0 + i * 1.0 + .02, "clack"); E(S.recap.t0 + 1.25, "flip"); C(S.recap.t0 + .2, S.lasttime.t0 + .4); R.birds.push([S.lasttime.t0, S.goals.t0]); E(LT("d201"), "pluck", 0); ["plants", "animals", "fungi", "bacteria"].forEach((w, i) => E(W("d201", w) - .1, "rise", i * 2)); E(W("d201", "now") - .2, "pop", 1);
  [0, 1, 2].forEach((i) => E(S.goals.t0 + .4 + i * 1.22 - .12, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("d301", "lizard") - .1, "chek"); E(W("d301", "lizard") + .8, "chek");
  // 4 two groups, Round 1, the chilli grows
  R.birds.push([S.two.t0, S.r1card.t0]); E(W("d401", "flowering") - .2, "set"); E(W("d401", "non-flowering") - .2, "set"); E(LT("d401") + .3, "chime");
  E(S.r1card.t0, "roundcard"); E(S.r1.t0 + .2, "rustle"); lock(MK("ring0_1"), 5, "d404", ["d405", "d406"], [W("d403", "one", 1), W("d403", "two")]);
  { const b = "d408", c = "d409", t1 = MK("fl1"); R.birds.push([S.grow.t0, S.mark1.t0]); E(LT("d407") + 1.2, "clack"); E(t1, "leafrise"); E(t1 + .9, "pop", 3); for (let i = 0; i < 5; i++) E(W(b, "petals") + .1 + i * .16, "drip", i); E(W(b, "tiny") - .1, "stretch"); E(W(b, "tiny") + 1.4, "pop", 1);
    E(W(c, "one") - .1, "tag"); E(W(c, "inside") - .2, "knock"); E(W(c, "inside") + .3, "softpop", 2); }
  E(S.lucky.t0 + .3, "boop", 3); E(W("d411", "no") - .1, "boop", 0); E(W("d412", "one", 1) - .1, "coin");
  // 5 flowering plants
  mark("d501", "d502"); E(LE("d502") + .2, "softpop", 1);
  // 6 the fern, the shrink
  R.birds.push([S.fern.t0, S.fern.t1 - .5]); E(LT("d601") + .5, "chek", .45); E(LT("d601") + 1.4, "chek", .45); E(W("d602", "birds") - .2, "softpop", 2); E(W("d602", "look") - .2, "tap"); E(S.fern.t1 - .6, "shrink");
  R.wonder.push([MK("dive") + .3, S.reveal.t0 + .5]); E(MK("open"), "crack", 0); E(MK("open") + .4, "crack", 1); for (let i = 0; i < 6; i++) E(W("d606", "out") + i * .3, "drip", i); E(MK("wind") - .1, "whoosh"); E(MK("wind") + 1.4, "whoosh"); E(MK("land") - .2, "potthud"); E(MK("sprout") + .4, "leafrise"); E(MK("sprout") + 2.4, "chime");
  // 7 the reveal, non-flowering plants
  E(S.reveal.t0, "whooshout"); E(W("d701", "no") - .1, "boop", 0); E(W("d701", "no", 1) - .1, "boop", 1); E(W("d701", "spores") - .2, "pop", 2); mark("d702", "d703"); E(LE("d703") + .2, "softpop", 1);
  E(W("d704", "mushrooms") - .2, "softpop", 0); E(LE("d704") + .1, "boop", 2); E(W("d705", "makes") - .2, "chime2", 1); E(W("d705", "makes") + .2, "leafrise"); E(W("d705", "plant") - .1, "tag");
  // 8 the Showdown
  E(S.showcard.t0, "roundcard"); { const b = "d802", c = "d803", r0 = MK("ring0_2"); E(S.show.t0 + .1, "paper"); R.roll.push([LT(c), W(c, "one", 1)]); ["flowering", "non-flowering"].forEach((w, i) => E(W(b, w) - .1, "softpop", i)); E(W(b, "non-flowering", 1) - .1, "softpop", 2); [W(c, "one", 1), W(c, "two"), W(c, "three")].forEach((t, i) => E(t - .05, "pip", i));
    ringTicks(r0, 6).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 6, "bell"); E(r0, "bellicon"); E(LT("d804") + .06, "stamp"); E(LT("d805") + .01, "pick", 0); E(LT("d806") + .01, "pick", 1); E(LT("d807"), "boop", 2); }
  { const a = "d808"; E(S.fixed.t0 + .2, "pop", 1); E(W(a, "tiny") - .2, "leafrise"); R.roll.push([W(a, "cuts") - .2, W(a, "cuts") + .4]); E(LT("d809") + .1, "rub"); E(LT("d809") + .5, "scribble"); E(LT("d809") + .7, "softpop", 3); E(W("d810", "two") - .1, "coin2"); E(W("d810", "two") + .5, "coin2", 1); }
  // 9 the chant
  E(LT("d901") + .1, "reveal"); sayit("u1002"); chant("ch01");
  // 10-11 the score hand, the lizard, try it, the dare
  E(S.final.t0 + .1, "sting"); E(W("d1001", "high") + .2, "slap"); E(W("d1001", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "chek"); E(S.liz.t0 + 1.4, "chek");
  R.birds.push([S.tryit.t0, S.dare.t0]); ["flowering", "non-flowering", "look", "pick"].forEach((w, i) => E(W("d1101", w) - .1, "softpop", i));
  { const L = "d1102"; ["frog", "bird", "fish"].forEach((w, i) => E(W(L, w) - .2, "softpop", i)); ["feathers", "scales", "moist"].forEach((w, i) => E(W(L, w) - .1, "rise", i * 2)); E(W(L, "lock") - .1, "sting"); }
  G(S.lasttime.t0 + .5, S.two.t0); G(S.r1.t0, MK("ring0_1")); G(LT("d405") - .5, S.grow.t0 + .3); C(S.grow.t0 + .6, W("d409", "one") - .3); G(S.lucky.t0, LT("d502") - .4); C(S.fern.t0 + .3, S.fern.t1 - 1.5); G(S.reveal.t0 + 1.4, LT("d703") - .4); G(S.fungus.t0, S.showcard.t0);
  G(S.show.t0 + .3, MK("ring0_2")); G(LT("d805") - .5, LT("ch01") - 1.4); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
