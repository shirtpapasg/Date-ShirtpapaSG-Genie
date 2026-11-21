// p2cues.js: Part 2's sound events (called from sound_cues.js with its helpers). Every event hangs on the same cue as the picture.
window.CUES2 = (E, R, h) => { const S = SCN, { lock, chant, sayit, G, C, mark, splash } = h;
  // 1-3 the recap, "Last time", goals, the game
  E(S.recap.t0 + .1, "softpop", 0); E(W("f201", "reptiles") - .3, "softpop", 1); E(LT("f202") - .25, "softpop", 2); E(LE("f202") + .1, "curious");   // the calm recap: one soft pop per picture (no clacks) C(S.recap.t0 + .2, S.lasttime.t0 + .4); R.night.push([S.lasttime.t0, S.goals.t0]);
  E(LT("f201"), "pluck", 0); E(W("f201", "six") - .2, "softpop", 0); E(W("f201", "reptiles") - .1, "softpop", 2); E(W("f201", "basil") - .1, "chime"); E(LE("f202") - .3, "rise", 5);
  ["f3g1", "f3g2", "f3g3"].forEach((id, i) => E(LT(id) - .1, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("f301", "animal") - .1, "curious"); E(W("f301", "spot") - .1, "softpop", 1);
  // 4 Palm Valley at dusk: crickets, soft wingbeats; Round 1
  R.night.push([S.palms.t0, S.r1card.t0 + .2]); E(S.palms.t0 + .9, "flap", 0); E(S.palms.t0 + 1.3, "flap", 1); E(S.r1card.t0, "roundcard");
  lock(MK("ring0_1"), 5, "f402", ["f403", "f404", "f405"], [W("f401", "one", 1), W("f401", "two")]);
  // 5 be a hair: the calm pad, a rustle of fur, the long whoosh and wind, a heartbeat-like pulse under the flight, a tiny squeak
  E(W("f501", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .3, S.reveal.t0 + .6]); R.night.push([MK("dive") + .5, MK("fly")]);
  E(W("f502", "soft") - .1, "rustle"); E(W("f502", "forest") - .1, "breath", 1); E(MK("wings") + .2, "stretch"); E(W("f503", "thin") - .1, "chime2", 0); E(W("f503", "feathers") - .1, "boop", 1);
  E(MK("fly") - .1, "whoosh"); E(W("f504", "whoosh") - .05, "whooshout"); for (let t = MK("fly") + .6; t < MK("back") - .4; t += .9) E(t, "heart"); for (let t = MK("fly") + .2; t < MK("back") - .3; t += .36) E(t, "flap", 2); E(W("f504", "warm") - .2, "warm");
  E(MK("back") + .1, "rustle"); E(W("f505", "baby") - .2, "squeak"); E(W("f505", "milk") - .2, "milk"); R.night.push([MK("back"), S.reveal.t0 + 3]);
  // 6 the reveal: a mammal
  E(S.reveal.t0, "whooshout"); E(W("f601", "two") - .1, "tag"); E(W("f601", "mammal") - .1, "reveal"); E(MK("stampMam"), "stamp"); E(W("f602", "one", 1) - .1, "coin"); E(LT("f603") - .1, "pop", 2);
  mark("f604", "f605");
  // 7 fur, milk, warm-blooded
  ["monkeys", "cats", "bats", "you"].forEach((w, i) => E(W("f701", w) - .2, "pop", i)); E(W("f701", "hair") - .1, "softpop", 1); E(LT("f702") - .2, "sparkle"); E(LT("f702b") - .1, "pop", 1);
  E(S.milk.t0 + .3, "purr"); E(W("f703", "most") - .1, "softpop", 3); E(W("f703", "milk") - .1, "milk");
  { const t0 = S.warm.t0 + .2; E(t0, "warm"); E(t0 + 3.8, "breath"); E(t0 + 4.8, "softpop", 0); E(t0 + 4.9, "softpop", 2); }
  // 8 exam tip
  E(S.tip.t0 + .1, "paper"); E(W("f802", "similar") - .1, "softpop", 1); E(W("f802", "wings") - .1, "chime2", 0); E(W("f802", "different") - .1, "softpop", 3); E(W("f802", "fur") - .1, "chime2", 1); E(W("f802", "feathers") - .1, "chime2", 0);
  // 9 Round 2: the odd one out
  E(S.r2card.t0, "roundcard"); lock(MK("ring0_2"), 5, "f902", ["f903", "f904", "f905"], [W("f901", "one"), W("f901", "two", 1), W("f901", "three")]);
  { const L = "f906"; E(W(L, "share") - .2, "chime"); E(W(L, "fur") - .1, "tag", 1); E(W(L, "dry") - .4, "slide"); E(W(L, "three") - .1, "tag"); E(W("f907", "one", 1) - .1, "coin"); E(LT("f908") - .1, "boop", 0); E(LT("f908b") - .1, "pop", 1); }
  // 10 the Showdown: the mystery creature
  E(S.showcard.t0, "roundcard"); { const a = "f1001", c = "f1002", r0 = MK("ring0_4"); E(S.show.t0 + .1, "paper"); R.roll.push([LT(c), W(c, "one", 1)]); E(LT(a) + .5, "softpop", 0); [W(c, "one", 1), W(c, "two"), W(c, "three")].forEach((t, i) => E(t - .05, "pip", i));
    ringTicks(r0, 6).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 6, "bell"); E(r0, "bellicon"); E(LT("f1003") + .06, "stamp"); E(LT("f1004") + .01, "pick", 0); E(LT("f1005") + .01, "pick", 1); E(LT("f1006"), "boop", 2); }
  E(S.fixed.t0 + .15, "rub"); E(S.fixed.t0 + .65, "scribble"); splash(W("f1007", "sea") - .3); E(W("f1007", "reptile") - .1, "tag"); E(W("f1008", "two") - .1, "coin2"); E(W("f1008", "two") + .5, "coin2", 1); E(LT("f1009") - .1, "sparkle");
  // 11 six tiles, the chant
  E(S.six.t0 + .1, "reveal"); for (let i = 0; i < 6; i++) E(S.six.t0 + .2 + i * .22, "rise", i); sayit("u1002"); chant("c1103");
  // 12 Exam corner
  E(S.exambanner.t0 + .05, "slam", 1); E(S.exambanner.t0 + .2, "bell"); mark("f1202", "f1203");
  // 13-14 the score hand, the lizard, the dare
  E(S.final.t0 + .1, "sting"); E(W("f1301", "high") + .2, "slap"); E(W("f1301", "four") - .1, "pip", 2); E(S.liz.t0 + .5, "softpop", 1); E(W("f1302", "squirrel") - .1, "softpop", 2);
  { const L = "f1401"; E(W(L, "mould") - .2, "pop", 0); E(W(L, "yeast") - .2, "pop", 2); E(W(L, "useful") - .2, "curious"); E(W(L, "lock") - .1, "sting"); }
  G(S.lasttime.t0 + .5, S.palms.t0); G(S.r1.t0, MK("ring0_1")); G(LT("f403") - .5, S.waitw.t1 - 1.5); G(S.reveal.t0 + 1.4, LT("f605") - .4); G(S.fur4.t0, S.milk.t0);
  C(S.milk.t0 + .3, S.tip.t0); C(S.tip.t0 + .3, S.r2card.t0); G(S.r2.t0, MK("ring0_2")); G(LT("f903") - .5, S.showcard.t0); G(S.show.t0 + .3, MK("ring0_4")); G(LT("f1004") - .5, LT("u1002") - .3);
  G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2); };
