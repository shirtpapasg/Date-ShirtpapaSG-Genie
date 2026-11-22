// sound_cues.js: every sound of EP13 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN, KW, TL ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12, the
// script's "Sound" column. R regions: groove (the game bed), calm (teaching), wonder (the journeys), birds (outside the classroom window,
// very soft; the eco-garden; the zoo), tank (the garden pond's soft trickle, Part 2). LOOK CLOSER: the calm bed low, a soft whoosh in, the
// thing's own sounds, the stamp + a chime on the verdict. EP10 Stage 3's lesson (kept in EP11 and EP12): every action sound sits on the
// action's own MARK (lay1-3, clear, clip, books, lift, booksin, zip1, hang, u_zip, u_base, drop1, drop2, zo1..zc2, w1..w9, push1, push2,
// jzipclose, jbump, jw1, jw6..jw9 ...: script.py), the same mark the picture uses, never on a guess; Stage 2 keeps its drawing on those marks
// (a thing that lands, lands AT its mark; each weight slides on AT its number).
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); }, TK = (a, b) => { if (b > a + 1) R.tank.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  const lcin = (t) => E(t - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  const zip = (t, g = .08) => fx(t, "ep09_zip.wav", g);
  if (PART === 1) { const tB = MK("boardsIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: a school after the bell: the ceiling fan's soft hum, a far ball bouncing, a chair scraped somewhere, one bird,
  //     a strap's soft flop, three board slides), "Last time" (EP12's dare: a pluck, a soft pop per card, a zip's zzip), back, the title
  BD(0, S.lasttime.t0 + .4); fx(.2, "hum.wav", .02, "amb"); [.9, 1.45, 1.9].forEach((d, i) => E(d, "knock", i)); fx(2.6, "ep03_slide.wav", .03, "amb"); E(3.1, "cheep", 1); E(1.3, "cloth"); E(1.35, "pomf");
  [0, .3, .6].forEach((d) => E(tB + d, "slide")); E(tP, "pop", 0); E(tP + .15, "pop", 1); E(tP + .3, "pop", 2); E(tP + .9, "boing");
  { const a = "g203"; E(S.lasttime.t0 + .1, "pluck", 0); [W(a, "one"), W(a, "two"), W(a, "three")].forEach((t, i) => E(t - .05, "softpop", i)); zip(W("g202", "bag") + .1, .06); C(S.lasttime.t0 + .2, S.back.t0); }
  BD(S.back.t0, tT); [0, 1, 2].forEach((i) => E(LT("g204") - .3 + i * .1, "pip", i));
  E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i));
  // 3 the game (a tiny flutter on the butterfly); 4 goals (Basil reads), countdown
  E(S.game.t0 + .15, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); E(W(b, HIDDEN[0]) + .2, "flutter"); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["g402", "g403", "g404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 Round 1: the round card, the short ring (3 s); Basil's pick (a boing)
  E(S.r1card.t0, "roundcard"); { const L = "g501"; lock(MK("ring0_r1"), 3, "g502", ["g503", "g504", "g505"], [W(L, "fabric"), W(L, "metal"), W(L, "wood")]); E(LE("g503") + .05, "boing"); }
  // 6 LOOK CLOSER three straps: a soft cloth flop (lay1), a light metal tink and a wooden tok, each rocking once (lay2, lay3); the bar and the stick lifted
  //   away (clear), a click (clip), five soft book thups .3 s apart (books), the strap's creak as it goes tight (lift); a soft pop on each chip; the verdict
  lcin(S.lcstraps.t0 + .1); E(MK("lay1"), "cloth"); E(MK("lay1") + .05, "pomf"); E(MK("flexchip") + .1, "softpop", 0);
  E(MK("lay2"), "clink"); E(MK("lay2") + .28, "tap"); E(MK("lay3"), "tok"); E(MK("lay3") + .3, "knock", 1);
  E(MK("clear"), "cloth"); E(MK("clip"), "tap"); E(MK("clip") + .08, "pip", 1); [0, 1, 2, 3, 4].forEach((i) => E(MK("books") + i * .3, "thup", i));
  E(MK("lift"), "creak"); E(MK("notear") - .05, "softpop", 1); E(MK("strongchip") + .1, "softpop", 2); verdict("v_straps");
  // the answer: SUITABLE (a chord) and NOT FOR THIS JOB on EP12's boards (boardtags), the card, a coin; Basil's oops (a boing)
  E(MK("boardtags"), "tag", 0); E(MK("boardtags") + .2, "tag", 1); E(MK("boardtags") + .4, "tag", 1); E(W("g605", "one") - .1, "softpop", 1); E(W("g605", "one", 2) - .1, "coin"); if (has("g606")) E(LT("g606") - .05, "boing");
  // 7 what engineers do (ENGINEERS pops: the key-word chime below); Momo's cheer; Mark Sentence 1 (DESIGN pops after the card)
  E(LT("g702") - .05, "pop", 2); mark("g704", "g705");
  // 8 the plan: the board slides in (planIn), five soft pips, a glow on the first box (box1). LOOK CLOSER the bag: book thups (booksin), the zip's zzip
  //   (zip1), a soft whump as it is hung (hang), a hop and a tick (fill1); a soft pip as each part lights (p_*); the jobs: a creak (u_straps), cloth as
  //   the top opens (u_body), the zip's zzip (u_zip), a soft thump on the floor (u_base); the verdict; two hops (fill23)
  E(MK("planIn") + .15, "slide"); [0, 1, 2, 3, 4].forEach((i) => E(MK("planIn") + .8 + i * .12, "pip", i % 3)); E(MK("box1"), "chime2", 0);
  lcin(S.lcbag.t0 + .1); [0, 1, 2, 3, 4].forEach((i) => E(MK("booksin") + .1 + i * .22, "thup", i)); zip(MK("zip1"), .08); E(MK("hang"), "pomf"); E(MK("fill1"), "hop", 0); E(MK("fill1") + .15, "tap");
  E(MK("glow23"), "chime2", 0); ["p_straps", "p_body", "p_zip", "p_base"].forEach((k, i) => E(MK(k), "pip", i % 3));
  E(MK("u_straps"), "creak"); E(MK("u_body"), "cloth"); zip(MK("u_zip"), .08); E(MK("u_base"), "potthud"); verdict("v_bag"); E(MK("fill23"), "hop", 1); E(MK("fill23") + .3, "hop", 2);
  // 9 HOLD ON!: four quick hops (fabhop), the stamp, ticks that speed up, a bell, a coin; four hops back (fabback); Basil: a slide, a boing, one drip (wetpic)
  { const b = "g902", c = "g903", r0 = MK("ring0_hold"); [0, 1, 2, 3].forEach((i) => E(MK("fabhop") + i * .08, "hop", i)); E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp");
    ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); [0, 1, 2, 3].forEach((i) => E(MK("fabback") + i * .08, "hop", 3 - i)); }
  E(LT("g904") - .05, "boing"); E(MK("wetpic"), "slide"); E(MK("wetpic") + .5, "drip", 1);
  // 10 draw: a paper slide (paper), a glow (glow4). LOOK CLOSER the drawing: a pencil's scratch while it draws (pencil .. fill4), a hop and a tick (fill4), a glow
  //   (glow5); a plip on plastic (drop1), a softer pff on fabric (drop2), a hop (plastichop); the zip four times (zo1, zc1, zo2, zc2), a hop (ziphop), hops (fabhop2),
  //   soft pops on the chips; the verdict; five soft ticks (fill5)
  E(MK("paper"), "paper"); E(MK("glow4"), "chime2", 0); lcin(S.lcdraw.t0 + .1);
  for (let x = MK("pencil"); x < MK("fill4") - .2; x += .7) E(x, "scribble"); E(MK("fill4"), "hop", 0); E(MK("fill4") + .15, "tap"); E(MK("glow5"), "chime2", 0);
  E(MK("drop1"), "plip"); E(MK("drop2"), "pff"); E(MK("plastichop"), "hop", 1); E(MK("wpchip") + .1, "softpop", 0);
  ["zo1", "zc1", "zo2", "zc2"].forEach((k) => zip(MK(k), .06)); E(MK("ziphop"), "hop", 2); E(MK("zipchip") + .1, "softpop", 1); E(MK("fabhop2"), "hop", 3); E(MK("flexchip2") + .1, "softpop", 2); E(MK("strongchip2") + .1, "softpop", 3);
  verdict("v_draw"); for (let r = 0; r < 5; r++) E(MK("fill5") + r * .14, "tap");
  if (has("g1006")) E(LT("g1006") - .05, "pop", 1);
  // 11 Mark Sentence 2
  mark("g1101", "g1102");
  // 12 be a book: the calm pad; a long soft zzzip, close (jzipclose), a creak and a sway (jtight, jup), a soft bump (jbump), one far drip (jwater), a sparkle (wpglow)
  E(W("g1201", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]);
  fx(MK("jzipclose"), "ep09_zip.wav", .05, "wonder"); E(MK("jtight"), "creak"); E(MK("jup"), "stretch"); E(MK("jbump"), "pomf"); E(MK("jwater") + .1, "drip", 2); E(MK("wpglow") + .1, "sparkle");
  // 13 pull back out; the score hand, the butterfly (a tiny flutter, a sparkle)
  E(S.pullout.t0, "whooshout"); E(S.final.t0 + .1, "sting"); E(W("g1301", "high") + .2, "slap"); E(W("g1301", "two") - .1, "pip", 2); BD(S.liz.t0, S.kwrecap.t0); E(S.liz.t0 + .6, "flutter"); E(W("g1302", "butterfly") + .2, "sparkle");
  // 14 the cliffhanger: a cheer (boing), a record-scratch wup on "Not yet" with the card's slide (testcard), a curious note on the ? (q), a low drum, the slam
  { BD(S.cliff.t0, S.nyk.t0); E(LT("g1401") + .1, "boing"); E(MK("testcard") - .05, "boop", 2); E(MK("testcard") + .1, "slide"); E(MK("q") - .1, "curious"); E(LT("g1403") - .2, "lowdrum"); E(W("g1403", "part") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); G(S.r1.t0, S.lcstraps.t0); C(S.lcstraps.t0 + .2, S.strapans.t0); G(S.strapans.t0, S.engineers.t0); C(S.engineers.t0 + .2, S.mark1.t0); C(S.mark1.t0 + .2, LT("g705") - .4);
  C(S.plan.t0, S.holdon.t0); G(S.holdon.t0, S.draw.t0); C(S.draw.t0, S.mark2.t0); C(S.mark2.t0 + .2, LT("g1102") - .4); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the calm recap (a soft pop under each picture, a low drum on the last), the eco-garden (leaves, water trickling, a far school bell), the game (a tiny ribbit), goals (Momo reads)
  { const L = "j101"; C(S.lasttime.t0 + .2, S.place.t0); E(S.lasttime.t0 + .1, "pluck", 0); E(LT(L) - .05, "softpop", 0); E(MK("pic2") - .1, "softpop", 1); E(MK("pic3") - .1, "softpop", 2); E(MK("pic3") + .1, "lowdrum", .5); }
  BD(S.place.t0, S.goals.t1 - .3); TK(S.place.t0, S.goals.t0); fx(S.place.t0 + .5, "ep05_bell.wav", .02, "amb"); E(S.game.t0 + .15, "sting"); E(W("j201", HIDDEN[0]) - .1, "curious"); E(W("j201", HIDDEN[0]) + .2, "ribbit"); E(W("j201", "spot") - .1, "pip", 2);
  [0, 1, 2].forEach((i) => E(LT(["j302", "j303", "j304"][i]) - .1, "softpop", i));
  // 4 Round 1 (6 s ring)
  E(S.r1card.t0, "roundcard"); { const L = "j401"; lock(MK("ring0_r1"), 6, "j402", ["j403", "j404", "j405"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(LE("j404") + .05, "boing"); }
  // 5 LOOK CLOSER the test: two soft taps (rulerL, rulerW); for each weight a small tok and a counter click ON its number (w1..w9), each a little higher from six on;
  //   the strap's soft creak; a chime as the two fives pulse (link5); a held breath of quiet at nine, a soft pop (lens9); the verdict; a tick on the test card (testtick)
  lcin(S.lctest.t0 + .1); BD(S.lctest.t0, S.testans.t1); E(MK("rulerL"), "tap"); E(MK("rulerW"), "tap");
  for (let i = 1; i <= 9; i++) { E(MK("w" + i), "tok"); E(MK("w" + i) + .06, "tick", i >= 6 ? 1 : 0); if (i === 3 || i === 7) E(MK("w" + i) + .2, "creak"); }
  E(MK("link5") - .2, "chime2", 0); E(MK("lens9") + .1, "softpop", 1); E(MK("side"), "softpop", 2); verdict("v_test"); E(MK("testtick"), "tag", 0);
  E(W("j506", "three") - .1, "tag"); E(W("j506", "one") - .1, "coin");
  // 6 be the new strap: the calm pad; a soft deep tok for each weight (jw1, jw2, jw6..jw9), close; a low creak that settles (jtight); a sparkle (strongchip)
  E(W("j601", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.zooplan.t0 + .5]);
  ["jw1", "jw2", "jw6", "jw7", "jw8", "jw9"].forEach((k) => E(MK(k), "pomf")); E(MK("jtight"), "creak"); E(W("j604", "strong") + .1, "sparkle");   /* Stage 2: the journey's STRONG is on Heart's word (the mark "strongchip" is the goat fence's chip in this part) */
  // 7 the plan again: five quick hops off (wipe), a goat's small meh (goatcard), four low hops (zfill1..zfill4), a glow (zglow5). LOOK CLOSER the goat home:
  //   hooves on packed earth (goatwalk), a soft wooden thunk as the goat leans (push1, push2), a meh, hay rustling (glide); the verdict; a hop and five ticks (woodtile); Basil: NOT FOR THIS JOB (glasstag), a boing
  E(S.zooplan.t0, "whooshout"); BD(S.zooplan.t0, S.mark1.t0); [0, 1, 2, 3, 4].forEach((i) => E(MK("wipe") + i * .09, "hop", 4 - i)); E(MK("goatcard"), "meh"); ["zfill1", "zfill2", "zfill3", "zfill4"].forEach((k, i) => E(MK(k), "hop", i)); E(MK("zglow5"), "chime2", 0); E(MK("zglow5") + .3, "curious");
  lcin(S.lcgoat.t0 + .1); for (let k = 0; k < 6; k++) E(MK("goatwalk") + k * .16, "step", .6); E(MK("push1"), "knock"); E(MK("push2"), "knock"); E(MK("push2") + .8, "meh"); E(MK("strongchip") + .1, "softpop", 2); E(MK("glide"), "whoosh"); E(MK("glide") + .3, "rustle"); E(MK("seegoats") + .4, "meh"); verdict("v_goat");
  E(MK("woodtile"), "hop", 3); for (let r = 0; r < 5; r++) E(MK("woodtile") + .2 + r * .12, "tap"); E(MK("glasstag"), "tag", 1); if (has("j706")) E(LE("j706") + .05, "boing");
  // 8 Mark Sentence 1
  mark("j801", "j802");
  // 9 the Showdown: the round card; Basil's map (paper, a soft tick on each line as he reads it), the drum roll, the counting hand; the fix: a hop, a scribble (dfly), two coins
  E(S.showcard.t0, "roundcard"); { const a = "j902", b = "j903", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); ["one", "two", "three"].forEach((w, i) => { if (TL.lines[a].words.some((x) => norm(x.w) === w)) E(W(a, w) - .05, "pip", i); }); R.roll.push([LT(b), W(b, "one", 1)]);
    lock(r0, 6, "j904", ["j905", "j906"]); E(LT("j905") - .1, "boop", 2); }
  E(MK("dfly"), "hop", 2); E(MK("dfly") + .4, "scribble"); E(W("j907", "two") - .1, "coin2"); E(W("j907", "two") + .5, "coin2", 1); if (has("j908")) E(LT("j908") - .05, "boing");
  // 10 the zoo map: six soft pops (zones), the strip (DIVERSITY pops: the key-word chime below); Mark Sentence 2 (EXTINCT pops after it); a warm chord as all twelve glow (glowall)
  [0, 1, 2, 3, 4, 5].forEach((i) => E(MK("zones") + i * .15, "softpop", i)); E(LT("j1002") - .05, "softpop", 0); mark("j1003", "j1004"); E(MK("glowall"), "chime2", 1);
  // 11 the chant
  sayit("u1002"); chant("c1003");
  // 12-13 the score hand, the frog (a tiny ribbit, a small plip as it hops, a sparkle); the dare: three board slides, an evening bird, three soft pops, a boing, a sting
  E(S.final.t0 + .1, "sting"); E(W("j1201", "high") + .2, "slap"); E(W("j1201", "three") - .1, "pip", 2); BD(S.liz.t0, S.liz.t1); E(S.liz.t0 + .5, "ribbit"); E(S.liz.t0 + 1.6, "plip"); E(W("j1202", "frog") + .3, "sparkle");
  { const L = "j1301"; BD(S.dare.t0, S.kwrecap.t0); [0, .3, .6].forEach((d) => E(S.dare.t0 + .3 + d, "slide")); E(S.dare.t0 + 1.4, "cheep", 2); ["one", "two", "three"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); if (has("j1302")) E(LT("j1302") + .1, "boing"); E(W(L, "lock") - .1, "sting"); }
  G(S.game.t0, S.goals.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("j403") - .5, S.lctest.t0); C(S.lctest.t0 + .2, S.testans.t0); G(S.testans.t0, S.waitw.t0); C(S.waitw.t0, S.waitw.t1 - .8);
  C(S.zooplan.t0 + .3, S.notglass.t0); C(S.notglass.t0, S.mark1.t0); C(S.mark1.t0 + .3, LT("j802") - .4); G(S.show.t0 + .3, MK("ring0_show")); G(LT("j905") - .5, S.zoomap.t0); C(S.zoomap.t0 + .2, S.chant.t0); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
