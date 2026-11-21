// sound_cues.js: every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  if (PART === 1) { const tb = MK("coldBuild");
  // 1-2 the cold open (no music: birds, a bus far away, one low note), the callback, the title
  R.birds.push([0, S.title.t0 + .3]); E(.5, "morning"); E(.9, "mrt"); E(1.7, "curious"); E(1.7, "pop", 2); E(tb - .1, "pop", 1); E(tb + .1, "slide"); E(tb + .9, "pop", 0); [0, 1, 2].forEach((i) => { E(tb + 1.1 + i * .5, "slide"); E(tb + 1.55 + i * .5, "tap"); }); E(tb + 2.95, "clack");
  E(LT("a201"), "pluck", 0); E(W("a201", "sad") - .2, "pop", 1); E(S.title.t0 + .05, "whoosh"); [.26, .66, W("a203", "it") - S.title.t0 + .06].forEach((d, i) => E(S.title.t0 + d, "slam", i));
  // 3 the Buddy Hotel, the game
  { const a = "a301", b = "a302"; [0, 1, 2].forEach((i) => { E(W(a, "three") + i * .14, "tap"); E(W(a, "three", 1) + i * .14, "softpop", i); }); [0, 1, 2].forEach((i) => E(W(a, "everything") + i * .3, "pip", i)); E(W(a, "sunset") - .1, "clack");
    E(W(b, "plant") - .45, "slide"); E(W(b, "mealworm") - .1, "pop", 1); E(W(b, "mystery") - .5, "slide"); E(W(b, "mystery") + .3, "pop", 2); }
  E(S.game.t0 + .15, "sting"); { const b = "a303"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, "no") - .05, "boop", 1); E(W(b, "lizard") - .1, "chek"); E(W(b, "lizard") + .9, "chek"); }
  // 4 goals, countdown
  [["what"], ["why"], ["why", 1]].forEach(([w, n], i) => E(W("a401", w, n || 0) - .12, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "a501"; E(W(L, "room") - .1, "softpop", 0); E(W(L, "the") - .1, "softpop", 1); lock(MK("ring0_1"), 5, "a502", ["a503", "a504", "a505"], [W(L, "one", 2), W(L, "two"), W(L, "three")]); E(LT("a503") + .9, "pop", 1); E(W("a504", "soil") - .1, "pop", 0); E(W("a505", "nobody") - .1, "pop", 2); }
  // 6 the test and the shrink: you follow the water
  { const L = "a601", tW = W(L, "pip", 1) - .2; E(tW - .45, "slide"); for (let i = 0; i < 6; i++) E(tW + .4 + i * .2, "drip", i); E(W(L, "this") - .1, "softpop", 1); for (let i = 0; i < 4; i++) E(W(L, "this") + .2 + i * .45, "tick", 0); E(S.test.t1 - .75, "shrink"); }
  R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]); for (let i = 0; i < 4; i++) E(MK("dive") + .6 + i * .7, "drip", i); E(MK("toRoot") + .1, "drip", 1); E(MK("toRoot") + 1.2, "drip", 3); E(MK("toStem") + .2, "stretch"); E(MK("toLeaf") + .9, "chime"); E(MK("leafUp") - 1.4, "leafrise");
  // 7 the reveal: it was wilting
  { const L = "a701"; E(S.reveal.t0, "whooshout"); E(W(L, "look") - .2, "rise", 2); E(W(L, "look") + .25, "rise", 4); E(W(L, "look") + .1, "pop", 0); E(W(L, "the", 1) - .1, "tag"); }
  mark("a702", "a703"); { const a = "a704"; E(W(a, "not") + .0, "pop", 2); E(W(a, "wilting") - .1, "softpop", 2); E(WE(a, "wilting") + .1, "chime2", 1); }
  E(WE("a706", "finger") + .2, "coin"); E(WE("a706", "finger") + .8, "coin", 1); E(LT("a707") - .5, "pop", 1); E(LT("a707") + .2, "tap"); E(LE("a707"), "tap");
  // 8 who else needs water?
  ["plant", "mealworm", "you"].forEach((w, i) => E(W("a802", w) - (i === 2 ? .25 : .15), "softpop", i)); [0, 1, 2].forEach((i) => E(W("a803", "we", i) - .15, "softpop", i));
  // 9 HOLD ON! Room 2 is not ready
  E(S.r2card.t0, "roundcard"); { const a = "a901", h = "a902", c = "a903", r0 = MK("ring0_2"); E(S.room2.t0 + .15, "slide"); E(S.room2.t0 + .85, "clink"); E(LT(a) + .45, "chek", .4); E(LT(a) + 1.6, "chek", .4); E(LE(a) + .1, "sparkle");
    E(W(h, "something") - .1, "boop", 2); E(W(h, "cross") - .1, "pop", 1); E(WE(h, "on") - .25 + .14, "stamp"); ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon");
    E(WE(c, "crossed") + .2, "coin"); E(W(c, "lid") - .2, "softpop", 0); E(W(c, "air") - .1, "boop", 0); E(W("a904", "holes") - .2, "softpop", 2); E(W("a904", "holes") - .7, "pop", 1); }
  { const t0 = S.newlid.t0 + .1; E(t0 + .35, "lid"); E(t0 + 2.0, "lid"); E(W("a906", "air") - .2, "window"); }
  mark("a907", "a908");
  { const L = "a910", t0 = S.movein.t0 + .1; E(t0 + 2.0, "set"); E(t0 + 2.6, "lid"); ["air", "oats", "carrot"].forEach((w, i) => E(W(L, w) - .1, "chime2", i % 2)); E(W(L, "carrot") + .7, "tap"); E(W(L, "carrot") + 1.0, "tap"); }
  E(S.plantair.t0 + .6, "window"); E(WE("a912", "air") - .1, "chime2", 1);
  // 10 the chant
  E(LT("a1001") - .1, "softpop", 1); sayit("u1002"); chant("c1003");
  // 11 the score hand, the lizard
  E(S.final.t0 + .1, "sting"); E(W("a1101", "high") + .2, "slap"); E(W("a1101", "two") - .1, "pip", 1); E(S.liz.t0 + .5, "chek"); E(S.liz.t0 + 1.4, "chek");
  // 12 the cliffhanger: Room 3
  { const a = "a1201", L = "a1203"; E(S.cliff.t0 + .3, "clack"); E(LT(a), "softpop", 0); E(W(a, "four") - .1, "softpop", 2); E(LE("a1202") - .4, "curious"); E(S.room3.t0 + .3, "slide"); E(W(L, "water") - .1, "chime2", 0); E(W(L, "air") - .1, "chime2", 1);
    E(W(L, "wrong") - .2, "lowdrum", .6); E(W(L, "wrong") + .1, "rustle"); E(W(L, "what") - .15, "pop", 3); E(W(L, "find") - .1, "slam", 1); }
  G(S.title.t0 + 1.0, MK("ring0_1")); G(LT("a503") - .5, S.test.t1 - 1.6); G(S.reveal.t0 + 1.4, LT("a703") - .4); G(S.notsad.t0, W("a902", "something") - .2); G(LT("a903"), LT("a908") - .4); G(S.movein.t0, LT("u1002") - .3);
  G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); G(S.cliff.t0 + .2, W("a1203", "wrong") - .4);
  } else {
  // 1-3 the recap, "Last time", goals, the game
  for (let i = 0; i < 5; i++) E(S.recap.t0 + i * 1.32 + .02, "clack"); E(S.recap.t0 + 1.32 + .5, "rise", 2); E(S.recap.t0 + 2.64 + .7, "lid"); C(S.recap.t0 + .2, S.lasttime.t0 + .4);
  { const L = "b201"; E(LT(L), "pluck", 0); ["plant", "mealworm", "room"].forEach((w, i) => E(W(L, w) - .2, "softpop", i)); E(W(L, "what") - .1, "pop", 3); }
  [["why"], ["how"], ["three"]].forEach(([w], i) => E(W("b301", w) - .12, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("b302", "lizard") - .1, "chek"); E(W("b302", "lizard") + .7, "chek");
  // 4 food gives energy
  { const L = "b401", tE = W(L, "eat") - .05; E(W(L, "food") - .1, "pop", 1); ["after", "so", "our"].forEach((w, i) => E(W(L, w) - .2, "softpop", i)); E(W(L, "hungry") - .1, "boop", 3); E(W(L, "hungry") + .25, "boop", 4); for (let i = 0; i < 5; i++) E(tE + i * .17, "rise", i); E(W(L, "our") + .5, "tap"); E(W(L, "our") + .85, "tap"); }
  mark("b402", "b403"); { const m = "b404"; E(W(m, "oats") - .5, "softpop", 1); E(W(m, "nobody") - .2, "boop", 1); E(W(m, "who") - .2, "curious"); }
  // 5 Round 1: the bean plant from the dark cupboard
  E(S.r1card.t0, "roundcard"); { const L = "b501", tT = MK("today"); E(S.notebook.t0 + .15, "paper"); E(S.notebook.t0 + .5, "scribble"); E(W(L, "two", 1) - .15, "pop", 0); E(W(L, "two", 1) - .03, "pop", 1); [0, 1, 2].forEach((i) => E(W(L, "same", i) - .12, "softpop", i));
    for (let i = 0; i < 3; i++) E(W(L, "same", 2) + .3 + i * .22, "drip", i); E(W(L, "one") - .15, "window"); E(W(L, "one", 1) - .15, "pop", 2); E(WE(L, "cupboard") + .45, "clunk"); E(tT + .02, "slam", 0); E(tT + .15, "slide"); E(tT + .85, "set"); }
  { const L = "b502"; E(W(L, "water") - .1, "chime2", 0); E(W(L, "air") - .1, "chime2", 1); lock(MK("ring0_1"), 5, "b503", ["b504", "b505", "b506"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(W("b506", "only") - .1, "pop", 0); }
  { const L = "b507", tr = MK("reveal"); E(tr - .45, "pop", 0); E(tr, "paper"); E(tr + .12, "paper"); E(tr + .55, "lowdrum", .45); E(W(L, "two") - .1, "tag"); E(W(L, "green") - .15, "softpop", 3); E(W(L, "pale") - .15, "softpop", 0); }
  { const L = "b508"; E(S.evidence.t0 + .1, "pop", 1); E(W(L, "air") - .15, "window"); E(W(L, "air") + .35, "softpop", 1); E(W(L, "two") - .1, "chime2", 1); E(W(L, "but") - .1, "softpop", 0); E(W(L, "but") + .08, "softpop", 2); E(W(L, "nobody") - .15, "tap"); E(W(L, "nobody") + .05, "tap"); E(LT("b509") - .1, "pop", 2); }
  E(S.light.t0 + .1, "pop", 1); E(S.light.t0 + .5, "sparkle"); E(S.light.t0 + 1.2, "chime"); mark("b510", "b511"); E(S.dark.t0 + .15, "lowdrum", .4);
  { const a = "b513", b = "b514"; E(WE(a, "fingers") + .2, "coin"); E(WE(a, "fingers") + .9, "boop", 2); E(LT(b) - .1, "slide"); E(LT(b) + .7, "set"); E(LT(b) + 1.0, "chime2", 0); E(LT(b) + 1.4, "chime2", 1); E(LE(b) - .3, "chime2", 1); E(LT(b) + 1.7, "softpop", 3); }
  // 6 the Showdown
  E(S.showcard.t0, "roundcard"); { const c = "b603", r0 = MK("ring0_2"); E(S.show.t0 + .1, "paper"); ["b602a", "b602b", "b602c"].forEach((id, i) => E(LT(id) - .1, "softpop", i)); R.roll.push([LT(c), W(c, "one", 1)]); [W(c, "one", 1), W(c, "two"), W(c, "three")].forEach((t, i) => E(t - .05, "pip", i));
    ringTicks(r0, 6).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 6, "bell"); E(r0, "bellicon"); E(LT("b604") + .06, "stamp"); E(LT("b605") + .01, "pick", 0); E(LT("b605") + .5, "boop", 0); E(LT("b606") + .01, "pick", 1); E(LT("b607"), "boop", 2); E(LT("b607") + .51, "pick", 2); }
  { const b = "b608", h = "b609"; E(S.fixed.t0 + .15, "rub"); E(S.fixed.t0 + .65, "scribble"); E(W(b, "makes") - .1, "softpop", 3); E(LE(b) - .2, "chime2", 1); E(W(h, "two") - .15, "softpop", 1); E(W(h, "two", 1) - .1, "coin2"); E(W(h, "two", 1) + .5, "coin2", 1); }
  // 7 sunset: the last box
  { const L = "b701", lz0 = S.sunset.t0 + .9; E(S.sunset.t0 + .1, "lowdrum", .7); E(S.sunset.t0 + .6, "clack"); E(lz0 + .4, "chek", .4); E(lz0 + 1.6, "chek", .4); E(W(L, "eight") - .1, "softpop", 2); E(W(L, "one") - .1, "boop", 1); E(W(L, "room") - .15, "softpop", 0); E(W(L, "food") - .1, "boop", 3); }
  { const m = "b702", h = "b703"; E(S.lastbox.t0 + .3, "sparkle"); E(W(m, "made") - .2, "softpop", 3); E(LE(m) - .15, "chime2", 1); E(LE(m) + .0, "reveal"); ["plant", "mealworm", "bean"].forEach((w, i) => E(W(h, w) - .15, "rise", i * 2)); E(W(h, "three") - .1, "softpop", 2); E(W(h, "same") - .25, "tag", 1); }
  mark("b704", "b705"); ["water", "food", "air"].forEach((w, i) => E(W("b705", w) - .05, "pip", i)); E(LT("b706") - .05, "softpop", 3);
  // 8 the chant
  sayit("u1002"); chant("c1003");
  // 9 the score hand, the lizard
  E(S.final.t0 + .1, "sting"); E(W("b901", "high") + .2, "slap"); E(W("b901", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "chek"); E(S.liz.t0 + 1.4, "chek");
  // 10 check-out, and the dare for Episode 3
  { const t0 = S.day32.t0 + 1.1; R.birds.push([S.day32.t0, S.kwrecap.t0]); E(S.day32.t0 + .3, "clack"); E(S.day32.t0 + .5, "morning"); E(t0 + .35, "lid"); E(t0 + 2.0, "set"); E(t0 + 2.6, "lid"); E(t0 + 3.0, "lid"); }
  { const tT = S.dare.t0 + .75, h = "b1003"; E(tT, "tap"); for (let i = 0; i < 5; i++) E(tT + .12 + i * .1, "crack", 1); E(tT + .2, "hop", 1); E(tT + .95, "curious"); E(W(h, "touch") - .15, "slam", 1); E(W(h, "lock") - .1, "softpop", 3); }
  G(S.lasttime.t0 + .5, LT("b403") - .4); G(S.whofeeds.t0, MK("ring0_1")); G(LT("b504") - .5, S.cloths.t0 + .2); G(LT("b507") - .2, S.light.t0); G(S.r1score.t0, S.showcard.t0); G(S.show.t0 + .3, LT("b603"));
  G(LT("b605") - .5, S.sunset.t0 - .3); G(LT("b703") - .2, LT("b705") - .4); G(S.final.t0, S.day32.t0); C(S.day32.t0 + .2, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
