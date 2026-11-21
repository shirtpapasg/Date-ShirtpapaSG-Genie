// sound_cues.js: every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const splash = (t) => { E(t, "splash"); for (let i = 0; i < 5; i++) E(t + .08 + i * .08, "drip", i); };
  if (PART === 1) { const tb = MK("coldCard");
  // 1-2 the cold open (morning birds, a koel far away), the callback, the title
  R.birds.push([0, S.title.t0 + .3]); E(.7, "curious"); E(1.9, "koel"); E(4.6, "koel"); E(.6, "softpop", 1); E(tb, "slide"); E(tb + .7, "pop", 0); E(tb + 1.1, "pop", 2);
  ["amphibians", "birds", "fish"].forEach((w, i) => E(W("e201", w) - .05, "softpop", i)); [0, 1, 2].forEach((i) => E(W("e201", "three", 1) + i * .35, "rise", 3 + i * 2)); E(LT("e202") - .3, "curious"); E(W("e202", "ant") - .15, "pip", 0); E(W("e202", "spider") - .15, "pip", 2);
  E(S.title.t0 + .02, "whoosh"); E(S.title.t0 + .26, "slam", 0); E(S.title.t0 + .66, "slam", 2); E(S.title.t0 + 1.0, "softpop", 2);
  // 3 the game
  E(S.game.t0 + .15, "sting"); { const b = "e301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, "animal") - .1, "curious"); E(W(b, "spot") - .1, "softpop", 1); }
  // 4 Round 1
  E(S.r1card.t0, "roundcard"); lock(MK("ring0_1"), 5, "e402", ["e403", "e404", "e405"], [W("e401", "one", 2), W("e401", "two")]); E(LE("e405") + .1, "softpop", 3);
  // 5 goals, countdown
  ["e5g1", "e5g2", "e5g3"].forEach((id, i) => E(LT(id) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 6 count the legs
  E(S.ant.t0 + .1, "whoosh"); E(MK("antIn") - .1, "whooshout"); ["one", "two", "three", "four", "five", "six"].forEach((w, i) => E(W("e601", w) - .04, "xylo", i)); E(W("e601", "six", 1), "tag", 1);
  E(W("e602", "feelers") - .1, "chime2", 0); E(W("e602", "feelers") + .15, "chime2", 1); [0, 1, 2].forEach((i) => E(W("e602", "three") - .05 + i * .5, "softpop", i * 2));
  { const L = "e603", t8 = W(L, "eight") - .05, tq = LT(L) + .15; for (let i = 0; i < 8; i++) E(lerp(tq, t8 - .1, i / 7), "xylo", i); E(W(L, "no") - .1, "boop", 1); E(W(L, "two") - .05, "softpop", 0); E(W(L, "two") + .4, "softpop", 2); E(S.spider.t0, "whoosh"); }
  E(W("e604", "insect") - .1, "tag"); E(W("e604", "not") - .1, "rub"); E(MK("stampIns"), "stamp"); E(W("e605", "one", 1) - .1, "coin"); E(LT("e606") - .1, "boop", 0); E(LE("e606") + .1, "pop", 1);
  mark("e607", "e608"); ["head", "thorax", "abdomen"].forEach((w, i) => E(W("e608", w) - .1, "softpop", i));
  E(S.shell.t0, "whoosh"); E(S.shell.t0 + .45, "shine"); E(S.shell.t0 + 3.05, "shine"); E(W("e609", "hard") - .1, "knock");
  // 7 wings
  [W("e701", "many"), W("e701", "some"), W("e701", "some", 1)].forEach((t, i) => E(t - .2, "softpop", i)); E(W("e701", "many") + .3, "flutter"); E(W("e701", "some") + .3, "whine");
  // 8 HOLD ON!
  E(S.listcard.t0, "roundcard"); { const a = "e801", b = "e802", c = "e803", r0 = MK("ring0_2"); E(S.rule.t0 + .2, "scribble"); ["butterfly", "pigeon"].forEach((w, i) => E(W(a, w) - .15, "rise", i)); E(W(a, "both") - .1, "boop", 1); E(LT(a) + 1.0, "flick");
    E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp"); ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "bird") - .1, "tag"); E(W(c, "feathers") - .1, "softpop", 1); E(W(c, "count") - .1, "rub"); E(LT("e804") + .1, "boop", 0); }
  // 9-10 Round 2, the reveal
  E(S.r2card.t0, "roundcard"); { const L = "e901"; E(W(L, "monitor") - .1, "flick"); E(W(L, "skin") - .15, "rustle"); lock(MK("ring0_3"), 5, "e902", ["e903", "e904", "e905"], [W(L, "one"), W(L, "two", 1), W(L, "three")]); }
  E(W("e1001", "two") - .1, "tag"); E(MK("stampRep"), "stamp"); E(W("e1002", "one", 1) - .1, "coin"); E(LT("e1003") - .1, "reveal");
  [0, 1, 2, 3].forEach((i) => E(S.rep4.t0 + .1 + i * .14, "pop", i)); E(W("e1004", "four") - .1, "tap"); [1, 2].forEach((i) => E(W("e1004", "four") - .1 + i * .25, "tap")); E(W("e1004", "snakes") - .1, "boop", 2);
  E(W("e1005", "dry") - .1, "rustle"); E(W("e1005", "breathe") - .15, "breath"); E(W("e1005", "breathe") + 1.4, "breath");
  { const tE = W("e1006", "eggs") - .1; E(tE + .4, "crack", 1); E(tE + .9, "crack"); E(tE + 1.5, "squeak"); E(LT("e1007") - .1, "sparkle"); }
  // 11 be a scale: the calm pad, the lizard breathing, the warm swell as the sunlight lands, the splash and the underwater hush
  E(W("e1101", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .3, S.pullout.t0 + 1.0]); R.birds.push([MK("dive") + .5, W("e1105", "splash")]);
  for (let t = MK("dive") + 1.2; t < W("e1105", "splash") - .5; t += 3.0) E(t, "breath", 1);
  E(MK("sun") + .2, "stretch"); E(W("e1104", "sunlight") - .4, "warm"); E(W("e1104", "lands") - .1, "chime2", 1); E(W("e1105", "hot") - .1, "warm", 1);
  { const tSp = W("e1105", "splash") - .05; E(tSp - .3, "whoosh"); splash(tSp); for (let i = 0; i < 8; i++) E(tSp + .7 + i * .45, "bubble", i); }
  E(S.pullout.t0, "whooshout"); E(S.pullout.t0 + 1.0, "softpop", 1); E(S.pullout.t0 + 1.5, "softpop", 3); E(S.pullout.t0 + .3, "drip", 2);
  // 12 cold-blooded
  mark("e1201", "e1202"); E(W("e1203", "sun") - .2, "warm"); E(S.basilsun.t0 + .3, "softpop", 2);
  // 13 the score hand, the lizard
  E(S.final.t0 + .1, "sting"); E(W("e1301", "high") + .2, "slap"); E(W("e1301", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "flick"); E(W("e1302", "grasshopper") - .1, "softpop", 2);
  // 14 the cliffhanger: evening crickets, soft wingbeats, a low drum, the slam
  { const L = "e1401", tW = W(L, "wings") - .2; R.night.push([S.cliff.t0 + 1.2, S.nyk.t0 - .2]); E(S.cliff.t0 + .1, "whoosh"); for (let i = 0; i < 4; i++) E(tW - .3 + i * .45, "flap", i); E(W(L, "bird") - .2, "curious"); E(W(L, "is") - .1, "lowdrum"); E(W(L, "find") - .1, "slam", 1); }
  G(S.title.t0 + .8, MK("ring0_1")); G(LT("e403") - .3, S.count.t0 - .2); C(S.ant.t0 + .3, LT("e608") - .4); C(S.shell.t0 + .3, S.listcard.t0); G(S.rule.t0, LT("e802") - .1); G(LT("e803"), S.r2card.t0); G(S.r2.t0, MK("ring0_3")); G(LT("e903") - .5, S.rep4.t0); C(S.rep4.t0 + .3, S.waitw.t1 - 1.0);
  C(S.basilsun.t0, S.final.t0); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0);
  } else { if (window.CUES2) CUES2(E, R, { lock, chant, sayit, G, C, mark, splash }); }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
