// sound_cues.js: every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const splash = (t) => { E(t, "whooshout"); for (let i = 0; i < 5; i++) E(t + .05 + i * .07, "drip", i); };
  if (PART === 1) { const tb = MK("coldCard");
  // 1-2 the cold open, the callback, the title
  R.birds.push([0, S.title.t0 + .3]); E(.7, "curious"); E(1.9, "koel"); E(tb + .15, "slide"); E(tb, "pop", 0); E(tb + 1.2, "pop", 2);
  [0, 1, 2, 3].forEach((i) => E(W("a201", "four") - .1 + i * .14, "softpop", i)); E(W("a201", "animals") - .1, "chime"); ["frog", "bird", "fish"].forEach((w, i) => E(W("a203", w) - .15, "pip", i));
  E(S.title.t0 + .05, "whoosh"); [.26, .61, LT("a204") - S.title.t0 + .16].forEach((d, i) => E(S.title.t0 + d, "slam", i));
  // 3 the game
  E(S.game.t0 + .15, "sting"); { const b = "a302"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, "duck") - .1, "curious"); E(W(b, "spot") - .2, "softpop", 2); }
  // 4 Round Zero
  E(S.r0card.t0, "roundcard"); lock(MK("ring0_0"), 5, "a402", ["u403"], [W("a401", "one"), W("a401", "two")]); E(LT("u403") + .35, "tag"); E(LT("a404") + .3, "chime"); E(W("a405", "one") - .1, "coin");
  // 5 goals, countdown
  ["g101", "g102", "g103"].forEach((id, i) => E(LT(id) - .12, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 6 what an animal is
  R.birds.push([S.parts.t0, S.mark1.t0]); ["head", "body", "limbs"].forEach((w, i) => E(W("a501", w) - .1, "softpop", i)); E(W("a501", "legs") - .1, "pop", 1); mark("a502", "a503");
  // 7 homes, coverings, observable characteristics
  ["land", "water", "both"].forEach((w, i) => E(W("a601", w) - (i < 2 ? .5 : .3), "softpop", i)); [0, 1, 2].forEach((i) => { E(S.cover.t0 + .15 + i * .15, "pop", i); E(W("a602", "outer") - .1 + i * .4, "softpop", i); });
  E(W("a701", "similarities") - .1, "pip", 0); E(W("a701", "differences") - .1, "pip", 2); E(W("a702", "see") - .2, "slide"); E(W("a702", "measure") - .2, "clack");
  // 8 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "a801"; splash(W(L, "splash") + .4); lock(MK("ring0_1"), 5, "a802", ["a803", "a804", "a805"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); }
  // 9 be the frog
  E(W("a901", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]); R.birds.push([MK("dive") + .3, MK("jump") + .8]);
  E(W("a903", "moist") - .1, "chime2", 1); E(MK("jump") - .15, "stretch"); E(MK("jump"), "whoosh"); splash(MK("jump") + .85);
  for (let k = MK("under") + .5; k < MK("up") - .3; k += 1.35) { E(k + .3, "whooshout"); for (let i = 0; i < 3; i++) E(k + .5 + i * .2, "drip", i); }
  E(MK("up") + .2, "leafrise"); splash(MK("up") + 1.05); R.birds.push([MK("up") + 1.1, S.reveal.t0]); E(W("a908", "land") - .1, "softpop", 0); E(W("a908", "water") - .1, "softpop", 2);
  // 10 the reveal, amphibians
  E(S.reveal.t0, "whooshout"); E(W("a1001", "three") - .1, "tag"); mark("a1002", "a1003");
  R.birds.push([S.skin.t0, S.listcard.t0]); E(W("a1004", "skin") - .1, "softpop", 0); E(W("a1004", "lungs") - .1, "softpop", 2); E(W("a1005", "moist") - .1, "chime2", 1); E(W("a1005", "drying") - .2, "pop", 1);
  E(W("a1006", "eggs") - .1, "drip", 2); ["frogs", "toads", "salamanders"].forEach((w, i) => E(W("a1007", w) - .1, "softpop", i)); E(MK("stamp1") + .25, "stamp"); E(LT("a1008") + .4, "pop", 2); E(W("a1009", "one") - .1, "coin");
  // 11 HOLD ON!
  E(S.listcard.t0, "roundcard"); { const a = "a1101", b = "a1102", c = "a1103", r0 = MK("ring0_2"); E(S.rule.t0 + .2, "scribble"); ["frog", "duck"].forEach((w, i) => E(W(a, w) - .15, "rise", i)); E(W(a, "so") - .1, "boop", 1); E(LT(a) + 1.2, "drip", 1);
    E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp"); ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "many") - .1, "rub"); E(W(c, "look") - .1, "tag"); E(LT("a1104") + .1, "boop", 0); }
  // 12 the score hand, the lizard
  E(S.final.t0 + .1, "sting"); E(W("a1201", "high") + .2, "slap"); E(W("a1201", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "curious"); E(W("a1202", "it") - .1, "tag");
  // 13 the cliffhanger
  { const L = "a1301", tH = W(L, "hops") - .2; R.birds.push([S.cliff.t0, S.nyk.t0]); E(S.cliff.t0 + .1, "whoosh"); E(W(L, "fins") - .2, "curious"); [0, 1, 2].forEach((i) => { E(tH + i * .42, "hop", i); E(tH + i * .42 + .34, "tap"); }); E(W(L, "is") - .1, "lowdrum"); E(W(L, "find") - .1, "slam", 1); }
  G(S.title.t0 + 1.0, MK("ring0_0")); G(LT("u403") - .3, S.count.t0 - .2); C(S.parts.t0 + .3, LT("a503") - .4); G(S.homes.t0, S.r1card.t0); G(S.r1.t0, MK("ring0_1")); G(LT("a803") - .5, S.waitw.t1 - 1.5);
  G(S.reveal.t0 + 1.4, LT("a1003") - .4); C(S.skin.t0 + .3, LT("a1007") - .3); G(LT("a1007"), S.listcard.t0); G(S.rule.t0, LT("a1102") - .1); G(LT("a1103"), S.rule.t1); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the recap, "Last time", goals, the game
  // the calm recap: no clacks, no splash; a soft pop as each label arrives, calm music under Heart
  { const L = "b201"; E(S.recap.t0 + .5, "softpop", 0); E(W(L, "moist") - .15, "softpop", 1); E(W(L, "its") - .3, "chime"); E(W(L, "observable") - .15, "softpop", 2); E(W(L, "two") - .1, "pop", 1); E(W(L, "two") + .2, "pop", 2); C(S.recap.t0 + .2, S.goals.t0 + .3); R.birds.push([S.recap.t0, S.goals.t0]); }
  ["g201", "g202", "g203"].forEach((id, i) => E(LT(id) - .12, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("b301", "frog") - .1, "curious"); E(W("b301", "spot") - .2, "softpop", 2);
  // 4 the kingfisher, Round 1, the bird clues
  R.birds.push([S.bird.t0, S.r1card.t0]); E(S.bird.t0 + .1, "whoosh"); E(S.bird.t0 + .6, "koel"); E(W("b401", "beak") - .1, "softpop", 0); E(W("b401", "wings") - .1, "softpop", 2); E(W("b401", "wings") + .1, "rustle"); E(W("b401", "outer") - .2, "curious");
  E(S.r1card.t0, "roundcard"); { const L = "b402"; E(W(L, "cannot") - .1, "rustle"); lock(MK("ring0_1"), 5, "b403", ["b404", "b405", "b406"], [W(L, "one", 1), W(L, "two")]); }
  E(W("b408", "beaks") - .2, "softpop", 0); E(W("b409", "wings") - .2, "softpop", 1); E(W("b409", "wings"), "rustle"); E(W("b409", "usually") - .05, "pop", 3); E(W("b410", "ostriches") - .2, "softpop", 2); E(W("b411", "eggs") - .3, "softpop", 3); E(W("b411", "eggs"), "knock");
  mark("b412", "b413"); E(W("b414", "one") - .1, "tag"); E(W("b414", "feathers") - .1, "softpop", 1); E(W("b414", "bird") - .1, "reveal"); E(MK("stamp2") + .25, "stamp"); E(W("b416", "one", 1) - .1, "coin");
  // 5 fish
  E(W("b501", "down") - .1, "whoosh"); splash(W("b501", "fish") - .35); R.wonder.push([W("b501", "fish"), S.mark2.t0 - .3]); E(W("b502", "fins") - .1, "softpop", 0); E(W("b502", "fins") + .4, "softpop", 2); for (let i = 0; i < 4; i++) E(S.fish.t0 + 3 + i * 1.7, "drip", i);
  mark("b503", "b504"); R.wonder.push([S.gills.t0, S.r2card.t0 - .2]); E(W("b505", "gills") - .15, "softpop", 1); for (let i = 0; i < 5; i++) E(W("b505", "gills") + .3 + i * .5, "drip", i); E(W("b506", "cod") - .2, "pop", 0); E(W("b506", "guppy") - .2, "pop", 2);
  // 6 Round 2
  E(S.r2card.t0, "roundcard"); { const L = "b601", tH = W(L, "hops") - .2; [0, 1, 2].forEach((i) => { E(tH + i * .4, "hop", i); E(tH + i * .4 + .34, "tap"); }); ["fins", "scales", "gills"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); lock(MK("ring0_2"), 5, "b602", ["b603", "b604", "b605"], [W(L, "one"), W(L, "two", 1), W(L, "three")]); }
  // 7 be the mudskipper
  E(LT("b701"), "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]); for (let i = 0; i < 5; i++) E(MK("dive") + .8 + i * 1.1, "drip", i); E(W("b702", "gills") - .3, "chime2", 1);
  E(MK("tide") + .4, "stretch"); E(MK("tide") + 1.6, "whooshout"); R.birds.push([MK("hop") - .8, S.reveal.t0]); E(W("b704", "push") - .1, "rub");
  [W("b704", "hop") - .12, W("b704", "hop", 1) - .12].forEach((t, i) => { E(t, "hop", i); E(t + .45, "potthud"); E(t + .5, "squeak"); }); E(W("b705", "skin") - .4, "chime2", 1); ["fins", "scales", "gills"].forEach((w, i) => E(W("b706", w) - .1, "softpop", i)); E(W("b706", "still") - .1, "tag");
  // 8 the reveal
  E(S.reveal.t0, "whooshout"); E(W("b801", "three") - .1, "tag"); E(LT("b802") + .3, "chime"); E(MK("stamp3") + .25, "stamp"); E(W("b803", "one") - .1, "coin");
  // 9 the Showdown
  E(S.showcard.t0, "roundcard"); { const b = "b902", c = "b903", r0 = MK("ring0_3"); E(S.show.t0 + .1, "paper"); R.roll.push([LT(c), W(c, "one", 1)]); E(LT(b) + .6, "drip", 1); [W(c, "one", 1), W(c, "two"), W(c, "three")].forEach((t, i) => E(t - .05, "pip", i));
    ringTicks(r0, 6).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 6, "bell"); E(r0, "bellicon"); E(LT("b904") + .06, "stamp"); E(LT("b905") + .01, "pick", 0); E(LT("b906") + .01, "pick", 1); E(LT("b907"), "boop", 2); }
  E(S.fixed.t0 + .15, "rub"); E(S.fixed.t0 + .65, "scribble"); E(LE("b908") - .2, "softpop", 3); E(LT("b909") - .2, "pop", 1); E(W("b909", "scales") - .1, "boop", 0); E(W("b909", "gills") - .1, "boop", 1); E(W("b910", "two") - .1, "coin2"); E(W("b910", "two") + .5, "coin2", 1);
  // 10 three stamps, the chant
  E(S.stamps.t0 + .1, "reveal"); [0, 1, 2].forEach((i) => E(LT("b1001") + .2 + i * .5, "rise", i * 2)); sayit("u1002"); chant("c1003");
  // 12-13 the score hand, the lizard, the dare
  E(S.final.t0 + .1, "sting"); E(W("b1201", "high") + .2, "slap"); E(W("b1201", "four") - .1, "pip", 2); E(S.liz.t0 + .5, "curious"); E(W("b1202", "it") - .1, "tag");
  { const L = "b1301"; for (let i = 0; i < 6; i++) E(S.dare.t0 + .1 + i * .1, "softpop", i % 4); ["insects", "reptiles", "mammals"].forEach((w, i) => E(W(L, w) - .1, "rise", i * 2)); E(W(L, "ant") - .25, "pop", 0); E(W(L, "spider") - .25, "pop", 2); E(W(L, "only") - .1, "curious"); E(W(L, "counting") - .2, "clack"); E(W(L, "lock") - .1, "sting"); }
  G(S.goals.t0 + .3, S.bird.t0); C(S.bird.t0 + .3, S.r1card.t0); G(S.r1.t0, MK("ring0_1")); G(LT("b404") - .5, LT("b413") - .4); G(S.birdans.t0, S.fish.t0 + 1.5); G(S.r2.t0, MK("ring0_2")); G(LT("b603") - .5, S.waitw.t1 - 1.5);
  G(S.reveal.t0 + 1.4, S.showcard.t0); G(S.show.t0 + .3, MK("ring0_3")); G(LT("b905") - .5, LT("u1002") - .3); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
