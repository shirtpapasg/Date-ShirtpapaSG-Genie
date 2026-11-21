// sound_cues.js: every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  if (PART === 1) { const tb = MK("coldCard");
  // 1-2 the cold open, the callback, the title
  R.birds.push([0, S.title.t0 + .3]); E(.7, "curious"); E(1.6, "mrt"); E(tb + .15, "slide"); E(tb, "pop", 0); E(tb + 1.4, "pop", 2); E(tb + 2.15, "set"); E(tb + 2.3, "tap");
  E(LT("a201"), "pluck", 0); E(W("a201", "folded") - .3, "pop", 1); E(S.title.t0 + .05, "whoosh"); [.26, .61, LT("a203") - S.title.t0 + .16].forEach((d, i) => E(S.title.t0 + d, "slam", i));
  // 3 the trip, the game
  E(S.trip.t0 + .1, "slide"); E(W("a301", "field") - .1, "bikebell"); [0, 1, 2].forEach((i) => E(W("a301", "three") + i * .28, "softpop", i)); E(W("a301", "three"), "stamp");
  E(S.game.t0 + .15, "sting"); { const b = "a302"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, "lizard") - .1, "chek"); E(W(b, "lizard") + .9, "chek"); }
  // 4 Round Zero
  E(S.r0card.t0, "roundcard"); lock(MK("ring0_0"), 5, "a402", ["u403"], [W("a401", "one"), W("a401", "two"), W("a401", "three")]); E(LT("u403") + .35, "tag"); E(LT("a404") + .3, "chime"); E(W("a405", "one") - .1, "coin");
  // 5 goals, countdown
  [0, 1, 2].forEach((i) => E(S.goals.t0 + .4 + i * 1.22 - .12, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 6 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "a601", tT = W(L, "touched") + .1; E(tT, "tap"); for (let i = 0; i < 5; i++) E(tT + .2 + i * .17, "crack", 1); E(tT + 1.1, "stretch"); E(W(L, "one", 1) - .1, "softpop", 1); lock(MK("ring0_1"), 5, "a602", ["a603", "a604", "a605"], [W(L, "one", 3), W(L, "two"), W(L, "three")]); }
  // 7 the wait and the shrink
  E(LT("a701") + .3, "clack"); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]); E(MK("fold") - .3, "tap");
  for (let i = 0; i < SHN; i++) E(shFoldT(i) + .2, "crack", i ? 1 : 0); E(LT("a705") + .2, "stretch"); for (let i = 0; i < 4; i++) E(MK("waiting") + .6 + i * .75, "drip", i); E(MK("reopen") + 1.2, "chime"); E(MK("reopen") + 1.3, "leafrise");
  // 8 the reveal
  E(S.reveal.t0, "whooshout"); E(W("a801", "two") - .1, "tag"); ["touch", "mimosa", "it"].forEach((w, i) => E(W("a803", w) - .2, "softpop", i)); mark("a804", "a805");
  E(MK("stamp1") + .25, "stamp"); E(LT("a807") + .4, "pop", 2); E(W("a808", "one") - .1, "coin");
  // 9 you respond too
  E(W("a901", "bright") + .05, "chime2", 1); E(W("a901", "eyelids") + .25, "pop", 1); mark("a902", "a903"); E(W("a905", "grows") - .2, "leafrise");
  // 10 HOLD ON!
  E(S.listcard.t0, "roundcard"); { const a = "a1001", b = "a1002", c = "a1003", r0 = MK("ring0_2"); E(S.list.t0 + .2, "scribble"); ["snail", "ice", "door"].forEach((w, i) => E(W(a, w) - .1, "rise", i)); E(LE(a) + .15, "sparkle"); E(LT(a) + 1.5, "chek", .45); E(LT(a) + 2.4, "chek", .45);
    E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp"); ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(W(c, "one") - .1, "coin"); E(W(c, "sun") - .1, "boop", 0); E(W(c, "wind") - .1, "boop", 1); E(W(c, "non-living") - .1, "tag", 1); }
  E(W("a1004", "touched") - .15, "tap"); E(W("a1004", "pulled") - .1, "squeak"); E(W("a1004", "responding") - .2, "tag"); E(LT("a1005") + .2, "scribble");
  // 11-12 try it, the score hand, the lizard
  ["one", "stem", "never", "wash"].forEach((w, i) => E(W("a1101", w) - .1, "softpop", i)); E(W("a1101", "mimosa") + .4, "clack");
  E(S.final.t0 + .1, "sting"); E(W("a1201", "high") + .2, "slap"); E(W("a1201", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "chek"); E(S.liz.t0 + 1.4, "chek");
  // 13 the cliffhanger
  { const L = "a1301", tH = W(L, "this") - .3; E(S.cliff.t0 + .05, "mrt"); E(S.cliff.t0 + .3, "bikebell"); R.birds.push([tH, S.nyk.t0]); E(tH, "whoosh"); E(W(L, "will") - .1, "lowdrum"); E(W(L, "find") - .1, "slam", 1); E(MK("eggtap") + .2, "tap"); E(MK("eggtap") + .34, "tap"); }
  G(S.title.t0 + 1.0, MK("ring0_0")); G(LT("u403") - .3, S.count.t0 - .2); G(S.r1.t0, MK("ring0_1")); G(LT("a603") - .5, S.waitw.t1 - 1.5); G(S.reveal.t0 + 1.4, LT("a805") - .4); G(S.notshy.t0, LT("a903") - .4); C(S.ledge.t0 + .3, S.listcard.t0);
  G(S.list.t0, LT("a1002") - .1); G(LT("a1003"), S.tryit.t1); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(W("a1301", "this"), MK("eggtap"));
  } else {
  // 1-3 the recap, "Last time", goals, the game
  for (let i = 0; i < 5; i++) E(S.recap.t0 + i * 1.0 + .02, "clack"); E(S.recap.t0 + 2.4, "stamp"); C(S.recap.t0 + .2, S.lasttime.t0 + .4); R.birds.push([S.lasttime.t0, S.goals.t0]); E(LT("b201"), "pluck", 0); E(W("b201", "farm") - .3, "pop", 1);
  [0, 1, 2].forEach((i) => E(S.goals.t0 + .4 + i * 1.22 - .12, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("b301", "lizard") - .1, "chek"); E(W("b301", "lizard") + .8, "chek");
  // 4 Round 1 and the hatch
  E(S.r1card.t0, "roundcard"); E(S.r1.t0 + .2, "rustle"); lock(MK("ring0_1"), 5, "b403", ["b404", "b405"], [W("b402", "one", 1), W("b402", "two")]);
  { const L = "b407", c1 = MK("crack1"), T = [W(L, "one") - .1, W(L, "two") - .1, W(L, "three") - .1, W(L, "four") - .1]; R.birds.push([S.hatch.t0, S.boards.t0]); E(c1 - .5, "tap"); E(c1 - .2, "tap"); E(c1 + .2, "crack", 0); E(W(L, "beak") - .15, "pop", 3);
    T.forEach((t, i) => { if (i) E(t - .6, "crack", 1); E(t, "pop", i); for (let k = 0; k <= i; k++) E(t + .35 + k * .21, "cheep", k); }); for (let k = 0; k < 4; k++) E(MK("still") - .7 + k * .3, "cheep", k); E(MK("still") + .15, "lowdrum", .45); E(W("b408", "two") - .1, "tag"); }
  for (let k = 0; k < 6; k++) E(S.after.t0 + .8 + k * 1.7, "cheep", k); E(W("b411", "one") - .1, "coin");
  // 5 reproduce
  E(W("b501", "yesterday") - .25, "softpop", 0); E(W("b501", "today") - .25, "softpop", 2); mark("b502", "b503"); E(S.animals.t0 + .15, "softpop", 0); E(LT("b506") - .35, "softpop", 2); E(LT("b506") + .2, "cheep", 1); E(LT("b506") + 1.4, "cheep", 2);
  E(LT("b508") - .3, "softpop", 0); E(LT("b508") + .1, "knock"); E(LT("b509") + .1, "pop", 2); E(LT("b510") - .35, "softpop", 2); E(W("b511", "look") - .1, "rustle"); E(W("b511", "look") + .7, "pop", 3);
  // 6 extinct, the stamp
  for (let i = 0; i < 7; i++) E(S.extinct.t0 + .2 + i * .22, "rise", i); E(W("b601", "without") - .2, "lowdrum", .5); E(S.stamp2.t0 + .6, "stamp"); E(S.stamp2.t0 + .7, "tag");
  // 7 grow
  E(S.grow.t0 + .4, "cheep", 0); E(S.grow.t0 + 1.2, "cheep", 2); E(W("b702", "giant") - .3, "boop", 3); ["wing", "red", "tail"].forEach((w, i) => E(W("b703", w) - .1, "softpop", i)); mark("b704", "b705");
  [0, 1, 2, 3].forEach((i) => E(S.growline.t0 + .25 + i * .32, "rise", i * 2)); ["seed", "small", "bigger"].forEach((w, i) => E(W("b708", w) - .25, "softpop", i)); E(MK("stamp3") + .2, "stamp"); E(MK("stamp3") + .3, "reveal");
  // 8 the Showdown
  E(S.showcard.t0, "roundcard"); { const b = "b802", c = "b803", r0 = MK("ring0_2"); E(S.show.t0 + .1, "paper"); R.roll.push([LT(c), W(c, "one", 1)]); E(LT(b) + .6, "chek", .45); E(LT(b) + 1.5, "chek", .45); [W(c, "one", 1), W(c, "two"), W(c, "three")].forEach((t, i) => E(t - .05, "pip", i));
    ringTicks(r0, 6).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 6, "bell"); E(r0, "bellicon"); E(LT("b804") + .06, "stamp"); E(LT("b805") + .01, "pick", 0); E(LT("b806") + .01, "pick", 1); E(LT("b807"), "boop", 2); }
  E(S.fixed.t0 + .15, "rub"); E(S.fixed.t0 + .65, "scribble"); E(LE("b808") - .2, "softpop", 3); E(W("b809", "two") - .1, "coin2"); E(W("b809", "two") + .5, "coin2", 1);
  // 9 three stamps, the chant
  E(S.stamps.t0 + .1, "reveal"); ["grow", "respond", "reproduce"].forEach((w, i) => E(W("b901", w) - .1, "rise", i * 2)); mark("b902", "b903"); sayit("u1002"); chant("c1003");
  // 10-11 the score hand, the lizard, the dare
  E(S.final.t0 + .1, "sting"); E(W("b1001", "high") + .2, "slap"); E(W("b1001", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "chek"); E(S.liz.t0 + 1.4, "chek");
  { const L = "b1101", tF = W(L, "four") - .2; R.birds.push([S.dare.t0, S.kwrecap.t0]); ["hen", "cat", "tomato", "fern"].forEach((w, i) => E(W(L, w) - .15, "softpop", i)); E(WE(L, "fern") + .35, "curious"); for (let i = 0; i < 4; i++) E(tF + i * .16 + .4, "knock"); E(W(L, "can") - .1, "sting"); }
  G(S.lasttime.t0 + .5, MK("ring0_1")); G(LT("b404") - .5, S.hatch.t0 + .3); G(S.after.t0 + .2, LT("b503") - .4); G(S.animals.t0, S.extinct.t0 + .2); C(S.extinct.t0 + .4, S.stamp2.t0); G(S.stamp2.t0 + .5, LT("b705") - .4); G(S.growline.t0, S.showcard.t0);
  G(S.show.t0 + .3, MK("ring0_2")); G(LT("b805") - .5, LT("b903") - .4); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
