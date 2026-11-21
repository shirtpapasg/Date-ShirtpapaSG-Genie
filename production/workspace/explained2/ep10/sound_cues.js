// sound_cues.js: every sound of EP10 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN, KW, TL ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12, the
// script's "Sound" column. R regions: groove (the game bed), calm (teaching), wonder (the journeys), sea (small waves at the beach shelter,
// Part 1), rain (the first rain of Part 1's cliffhanger; the void deck in the rain, Part 2), birds. LOOK CLOSER: the calm bed low, a soft whoosh in, the thing's own sounds, the stamp + a chime on the verdict.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, K = (a, b) => { if (b > a + 1) R.sea.push([a, b]); }, RN = (a, b) => { if (b > a + 1) R.rain.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  const lcin = (t) => E(t - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  const tick = (mk) => { if (MK(mk) !== undefined) { E(MK(mk), "stamp"); E(MK(mk) + .2, "chime2", 0); } };
  if (PART === 1) { const tB = MK("boardsIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: small waves, a far ship's horn, a koel, one curious note, two board slides), "Last time" (EP9's dare), the board, the title
  K(0, S.lasttime.t0 + .4); E(1.0, "koel"); fx(1.6, "ep05_horn.wav", .05, "amb"); E(2.9, "curious"); E(tB, "slide"); E(tB + .45, "slide"); E(tP, "pop", 0); E(tP + .15, "pop", 1); E(tP + .3, "pop", 2); E(tP + .9, "boing");
  { const a = "e202"; E(S.lasttime.t0 + .1, "pluck", 0); E(W(a, "sinks") - .05, "bubble", 1); E(W(a, "sinks") + .15, "bubble", 2); fx(W(a, "ship") - .1, "ep05_horn.wav", .06, "amb"); ["one", "two", "three"].forEach((w, i) => E(W(a, w) - .05, "softpop", i)); C(S.lasttime.t0 + .2, S.tests.t0); }
  K(S.tests.t0, tT); E(S.tests.t0 + .15, "slide"); [0, 1, 2].forEach((i) => E(S.tests.t0 + .7 + i * .18, "pip", i));
  E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i));
  // 3 the game (the otter: a soft splash); 4 goals (Basil reads), countdown
  E(S.game.t0 + .15, "sting"); { const b = "e301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); fx(W(b, HIDDEN[0]) + .2, "splash.wav", .07); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["e402", "e403", "e404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 two blocks (two soft taps); LOOK CLOSER the tub: two plops, a bob, a line of bubbles, a soft tok on the bottom; the spoons the same; the strip; tick 1
  K(S.blocks.t0, S.lcblocks.t0 + .3); E(W("e501", "wood") - .1, "tap"); E(W("e501", "metal") - .1, "tap"); lcin(S.lcblocks.t0 + .1);
  fx(LT("e502") - .8, "ep06_plop.wav", .2); fx(LT("e502") - .7, "ep06_plop.wav", .16); E(W("e502", "bobs") - .05, "boop", 0);
  [0, 1, 2, 3].forEach((i) => E(W("e503", "goes") + i * .22, "bubble", i)); E(W("e503", "down") + .1, "tok");
  fx(MK("spoons") + .3, "ep06_plop.wav", .14); fx(MK("spoons") + .55, "ep06_plop.wav", .12); E(W("e504", "sinks") - .2, "bubble", 3); E(W("e504", "sinks") + .2, "tok"); verdict("v_wood");
  K(S.woodstrip.t0, S.holdon.t1); E(W("e505", "wood") - .1, "softpop", 0); E(W("e505", "metals") - .1, "softpop", 1); if (has("e506")) E(LT("e506") - .1, "boing"); tick("tick1");
  // 6 HOLD ON! (Momo's rule): a soft hmm, the stamp, ticks that speed up, a bell, a coin, a soft pop; Mark Sentence 1
  { const a = "e601", b = "e602", c = "e603", r0 = MK("ring0_hold"); E(LT(a) - .05, "boop", 1); E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp");
    ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "giant") - .1, "softpop", 1); E(W(c, "little") - .1, "softpop", 2); }
  E(W("e604", "rule") - .1, "chime2", 0); mark("e605", "e606");
  // 7 Round 1: a curious note, the round card, the short ring
  K(S.puzzle.t0, S.r1card.t0); E(LT("e701") - .1, "curious"); E(S.r1card.t0, "roundcard");
  { const L = "e702"; lock(MK("ring0_r1"), 3, "e703", ["e704", "e705", ...(has("e706") ? ["e706"] : [])], [W(L, "wood"), W(L, "air"), W(L, "more")]); E(W("e705", "float") - .1, "boing"); }
  // 8 LOOK CLOSER inside the ship: slow water against metal, a deep hollow boom as the window opens, a soft echo; a soft tok for the block
  lcin(S.lcship.t0 + .1); fx(S.lcship.t0 + .4, "sea_wash.wav", .08, "wonder"); fx(MK("hullwin") - .05, "boom.wav", .1); E(MK("hullwin") + .5, "clunk"); E(W("e802", "air") - .1, "chime2", 1);
  E(MK("split") + .2, "whoosh"); E(W("e803", "solid") - .1, "tok"); verdict("v_air");
  K(S.shipans.t0, S.waitw.t1 - .8); E(W("e804", "two") - .1, "tag"); if (has("e805")) E(LT("e805") - .05, "boop", 0); E(W("e806", "one") - .1, "coin");
  // 9 be the air: the calm pad; soft waves, a breath of wind; a long metal echo; a deep slow door clunk; water sliding past the wall
  E(W("e901", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]);
  fx(MK("sea") + .1, "sea_wash.wav", .07, "wonder"); fx(MK("door") + .2, "wind.wav", .05, "wonder"); E(MK("room") + .4, "clunk"); E(MK("room") + 1.4, "clunk");
  E(W("e905", "shuts") - .25, "potthud"); E(W("e905", "shuts") - .2, "lowdrum", .4); fx(MK("wall") + .2, "underwater.wav", .06, "wonder"); E(MK("floaton") + .3, "stretch");
  // 10 pull back out, Mark Sentence 2 (TRAPPED AIR pops beside the card: the key-word chime below)
  E(S.pullout.t0, "whooshout"); K(S.pullout.t0 + .3, S.mark2.t0); if (has("e1001")) E(W("e1001", "float") - .05, "chime"); mark("e1002", "e1003");
  // 11 the metal bowl: a soft ring of metal and a ripple; LOOK CLOSER: a thin pour rising in pitch, a glug, small bubbles, a soft tok on the bottom
  K(S.bowl.t0, S.lcbowl.t0 + .3); E(W("e1101", "bowl") - .05, "clink"); E(W("e1101", "bowl") + .3, "drip", 1); lcin(S.lcbowl.t0 + .1);
  fx(MK("pour") + .3, "ep06_gurgle.wav", .14); fx(W("e1103", "pours") + 1.2, "ep06_gurgle.wav", .1); [0, 1, 2, 3, 4].forEach((i) => E(W("e1103", "takes") + i * .3, "rise", i)); E(W("e1104", "lower") - .1, "bubble", 0); E(W("e1104", "lower", 1) - .1, "bubble", 1);
  E(W("e1104", "sinks") - .1, "bubble", 2); E(W("e1104", "sinks") + .5, "tok"); verdict("v_bowl");
  // 12 the score hand, the otter; 13 the cliffhanger: far thunder (soft), rain on the shelter roof, two slides, a low drum, the slam
  E(S.final.t0 + .1, "sting"); E(W("e1201", "high") + .2, "slap"); E(W("e1201", "two") - .1, "pip", 2); fx(S.liz.t0 + .5, "splash.wav", .07); E(W("e1202", "otter") + .2, "sparkle");
  { const L = "e1302"; RN(S.cliff.t0, S.nyk.t0 + .3); fx(S.cliff.t0 + .2, "thunder.wav", .05, "amb"); E(S.cliff.t0 + .5, "slide"); E(S.cliff.t0 + .95, "slide"); E(LT("e1301") + .1, "boing"); E(W(L, "raincoat") - .1, "softpop", 0); E(W(L, "shoe") - .1, "softpop", 1); E(W(L, "which") - .1, "curious"); E(LT("e1303") - .2, "lowdrum"); E(W("e1303", "find") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); C(S.blocks.t0 + .2, S.lcblocks.t0); C(S.lcblocks.t0 + .2, S.woodstrip.t1); G(S.holdon.t0, LE("e603")); C(S.mark1.t0 + .2, LT("e606") - .4); G(S.puzzle.t0 + .2, MK("ring0_r1")); G(LT("e704") - .5, S.lcship.t0);
  C(S.lcship.t0 + .2, S.shipans.t0); G(S.shipans.t0, S.waitw.t1 - 1.5); C(S.pullout.t0 + .4, LT("e1003") - .4); C(S.bowl.t0, S.final.t0); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the calm recap (rain beginning), the new place (rain on the walkway roof), the game (the snail: a soft bloop), goals (Momo reads)
  { const L = "f101"; C(S.lasttime.t0 + .2, S.place.t0); E(S.lasttime.t0 + .1, "pluck", 0); E(W(L, "wood") - .1, "softpop", 0); E(W(L, "a") - .1, "softpop", 1); E(W(L, "now") - .1, "softpop", 2); E(W(L, "rain") - .05, "drip", 0); RN(W(L, "now") - .2, S.goals.t1 - .3); }
  E(S.game.t0 + .15, "sting"); E(W("f201", HIDDEN[0]) - .1, "curious"); E(W("f201", HIDDEN[0]) + .2, "boop", 1); E(W("f201", HIDDEN[0]) + .45, "boop", 2); E(W("f201", "spot") - .1, "pip", 2);
  [0, 1, 2].forEach((i) => E(LT(["f302", "f303", "f304"][i]) - .1, "softpop", i));
  // 4 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "f401"; lock(MK("ring0_r1"), 5, "f402", ["f403", "f404", "f405"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(LE("f404") + .05, "boing"); }
  // 5 LOOK CLOSER the slow drop test: one clear plip, a tiny wobble, a soft roll, a far plip; a duller pat, a slow soaking hiss, one small drip
  lcin(S.lcdrip.t0 + .1); fx(W("f501", "lands") - .1, "drip.wav", .14); E(W("f501", "lands") - .05, "drip", 0); E(W("f501", "bead") - .1, "bubble", 2); E(W("f502", "rolls") - .1, "slide"); E(W("f502", "dry") - .3, "drip", 2);
  E(MK("toshoe") + .1, "whoosh"); E(W("f503", "drop") + .25, "tap"); E(W("f503", "soaks") - .05, "stretch"); E(W("f504", "absorbs") + .6, "stretch"); E(MK("sock") + .9, "drip", 3); verdict("v_absorb");
  E(W("f506", "two") - .1, "tag"); if (has("f507")) E(LT("f507") - .05, "boop", 0); E(W("f508", "one") - .1, "coin"); tick("tick2");
  // 6 Mark Sentence 1 (WATERPROOF pops after it); the trays slide in, the book's strip
  mark("f601", "f602"); RN(S.trays.t0, S.waitw.t0 + .5); E(S.trays.t0 + .2, "slide"); E(S.trays.t0 + .5, "slide"); E(W("f603", "fabric") - .1, "softpop", 0); E(W("f603", "not") - .1, "softpop", 1);
  // 7 be a raindrop: the calm pad; soft rain all round; a springy plip; a smooth roll; a soft pat, then a slow soaking hiss
  E(W("f701", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]); RN(MK("dive") + .5, S.pullout.t0 + .3);
  [0, 1, 2].forEach((i) => E(MK("fall") + .4 + i * .7, "drip", i)); E(W("f703", "splat") - .03, "drip", 3); E(W("f703", "splat") + .02, "pop", 1); E(W("f704", "roll") - .1, "slide"); E(W("f705", "soak") - .1, "tap"); E(W("f705", "soak") + .1, "stretch"); E(W("f706", "through") - .1, "drip", 1);
  // 8 pull back out; four tiles hop low onto the green tray, each with a soft plip
  E(S.pullout.t0, "whooshout"); RN(S.pullout.t0, S.lcwax.t0 + .3); { const L = "f801"; ["rubber", "plastic", "glass", "metals"].forEach((w, i) => { E(W(L, w) - .2, "hop", i); E(W(L, w) + .05, "drip", i); }); }
  // 9 the wax: three pips; LOOK CLOSER: a soft dry rubbing; a dull pat and a hiss on the left, a clear plip and a roll on the right
  [0, 1, 2].forEach((i) => E(S.wax.t0 + .2 + i * .18, "pip", i)); lcin(S.lcwax.t0 + .1); [0, .45, .9].forEach((d) => E(W("f902", "rubs") + d, "rub"));
  E(W("f903", "soaks") - .25, "tap"); E(W("f903", "soaks") + .05, "stretch"); E(W("f904", "sits") - .25, "drip", 0); E(W("f904", "rolls") - .1, "slide"); verdict("v_wax");
  if (has("f905")) E(LT("f905") - .05, "softpop", 2); tick("tick3");
  // 10 Mark Sentence 2; the waxed boot slides onto the green tray, the treatment strip
  mark("f1001", "f1002"); RN(S.treated.t0, S.showcard.t0); E(S.treated.t0 + .2, "slide"); E(W("f1003", "change") - .1, "softpop", 0); E(LE("f1003") - .4, "softpop", 1);
  // 11 the Showdown: Basil's notes, the drum roll, the counting hand; the rub, the scribble, two coins
  E(S.showcard.t0, "roundcard"); { const a = "f1101", b = "f1102", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); ["one", "two", "three"].forEach((w, i) => { if (TL.lines[a].words.some((x) => norm(x.w) === w)) E(W(a, w) - .05, "pip", i); }); R.roll.push([LT(b), W(b, "one", 1)]);
    lock(r0, 6, "f1103", ["f1104", "f1105"]); E(LT("f1106") - .05, "boop", 2); }
  { const L = "f1107"; E(S.fix.t0 + .2, "rub"); E(S.fix.t0 + .7, "scribble"); E(W(L, "all") - .1, "chime2", 0); E(W(L, "t-shirt") - .1, "softpop", 1); E(W("f1108", "two") - .1, "coin2"); E(W("f1108", "two") + .5, "coin2", 1); }
  // 12 the chant
  sayit("u1002"); chant("c1003");
  // 13-14 the score hand, the snail; the dare: the rain fading, three soft pops, a torch click, a boing, a sting
  E(S.final.t0 + .1, "sting"); E(W("f1301", "high") + .2, "slap"); E(W("f1301", "three") - .1, "pip", 2); RN(S.liz.t0, S.dare.t0 + 1.4); E(S.liz.t0 + .5, "boop", 1); E(S.liz.t0 + .75, "boop", 2); E(W("f1302", "snail") + .3, "sparkle");
  { const L = "f1401"; ["one", "two", "three"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); fx(W(L, "light", 1) - .1, "click.wav", .2); if (has("f1402")) E(W("f1402", "can") - .1, "boing"); E(W(L, "lock") - .1, "sting"); }
  G(S.game.t0, S.goals.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("f403") - .5, S.lcdrip.t0); C(S.lcdrip.t0 + .2, S.dripans.t0); G(S.dripans.t0, S.mark1.t0); C(S.mark1.t0 + .3, S.waitw.t0);
  C(S.pullout.t0 + .3, S.waxans.t1); C(S.mark2.t0 + .3, S.showcard.t0); G(S.show.t0 + .3, MK("ring0_show")); G(LT("f1104") - .5, S.fix.t0); C(S.fix.t0 + .2, S.chant.t0); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
