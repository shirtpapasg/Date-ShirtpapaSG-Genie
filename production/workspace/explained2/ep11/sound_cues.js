// sound_cues.js: every sound of EP11 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN, KW, TL ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12, the
// script's "Sound" column. R regions: groove (the game bed), calm (teaching), wonder (the journeys), tank (the goldfish tank's soft bubbles in
// the living room, Part 1), night (crickets in the corridor, Part 2). LOOK CLOSER: the calm bed low, a soft whoosh in, the thing's own sounds,
// the stamp + a chime on the verdict. EP10 Stage 3's lesson: every action sound sits on the action's own MARK (on1.., off1.., robot1.., swap,
// mat, tray, doorIn, ...: script.py), the same mark the picture uses, never on a guess; Stage 2 keeps its drawing on those marks.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, K = (a, b) => { if (b > a + 1) R.sea.push([a, b]); }, TK = (a, b) => { if (b > a + 1) R.tank.push([a, b]); }, NT = (a, b) => { if (b > a + 1) R.night.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  const lcin = (t) => E(t - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  const tick = (mk) => { if (MK(mk) !== undefined) { E(MK(mk), "stamp"); E(MK(mk) + .2, "chime2", 0); } };
  const click = (t, g = .2) => fx(t, "click.wav", g), hum = (t, g = .03) => fx(t, "hum.wav", g, "wonder"), ting = (t, g = .07) => fx(t, "ping.wav", g, "wonder"), shh = (t, g = .035) => fx(t, "hiss.wav", g, "wonder");
  if (PART === 1) { const tB = MK("boardsIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: a far bus, the tank's soft bubbles, one curious note, three board slides), "Last time" (EP10's dare), the board, the title
  TK(0, S.lasttime.t0 + .4); fx(1.2, "pass_by.wav", .05, "amb"); E(2.9, "curious"); [0, .3, .6].forEach((d) => E(tB + d, "slide")); E(tP, "pop", 0); E(tP + .15, "pop", 1); E(tP + .3, "pop", 2); E(tP + .9, "boing");
  { const a = "g202"; E(S.lasttime.t0 + .1, "pluck", 0); [W(a, "one", 1), W(a, "two"), W(a, "three")].forEach((t, i) => E(t - .05, "softpop", i)); click(LE(a) + .3, .12); C(S.lasttime.t0 + .2, S.tests.t0); }
  TK(S.tests.t0, tT); E(S.tests.t0 + .15, "slide"); [0, 1, 2].forEach((i) => E(S.tests.t0 + .7 + i * .18, "pip", i));
  E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i));
  // 3 the game (the goldfish: a soft bloop); 4 goals (Pip reads), countdown
  E(S.game.t0 + .15, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); fx(W(b, HIDDEN[0]) + .2, "bubble.wav", .12); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["g402", "g403", "g404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 the torch test: three soft taps as each thing lifts, a soft warning chime; Basil's robot slides in (a slide, a wind-up tick-tick, a boing)
  TK(S.setup.t0, S.lcclear.t0 + .3); { const a = "g501"; E(W(a, "torch", 1) - .1, "tap"); E(W(a, "sheet") - .1, "tap"); E(W(a, "card") - .1, "tap"); E(LT("g502") - .1, "chime2", 0); }
  E(S.robot.t0 + .1, "slide"); [0, 1, 2, 3].forEach((i) => E(S.robot.t0 + .5 + i * .09, "ratchet", i)); E(LE("g503") - .3, "boing");
  // 6 sheet one: a soft wooden tok as the glass goes in. LOOK CLOSER: click (on1), a soft hum of light, a ting as the spot lands (spot1); a second click (off1); the robot's tick-tick (robot1)
  E(S.sheet1.t0 + .55, "tok"); lcin(S.lcclear.t0 + .1); click(MK("on1")); hum(MK("on1") + .05); ting(MK("spot1") + .1); click(MK("off1"), .16); [0, 1, 2].forEach((i) => E(MK("robot1") + .5 + i * .09, "ratchet", i)); verdict("v_clear");
  TK(S.clearans.t0, S.mark1.t0); if (has("g605")) E(LT("g605") - .05, "softpop", 2);
  // 7 Mark Sentence 1 (TRANSPARENT pops beside it: the key-word chime below); row 1: a low hop, a stamp, the strip
  if (has("g701")) E(W("g701", "words") - .1, "chime2", 0); mark("g702", "g703");
  TK(S.row1.t0, S.holdon.t1); E(MK("row1") + .2, "hop", 0); E(MK("row1") + 1.0, "stamp"); E(W("g704", "clearly") - .1, "softpop", 0);
  // 8 HOLD ON! (Basil moves the torch): a tok (the sheets change), a boing, the slide, the stamp, ticks that speed up, a bell, a coin; the slide back
  { const a = "g801", b = "g802", c = "g803", r0 = MK("ring0_hold"); E(MK("swap1") + .6, "tok"); E(LT(a) - .05, "boing"); E(MK("push"), "slide"); E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp");
    ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "torch") - .1, "softpop", 1); E(W(c, "sheet") - .1, "softpop", 2); }
  E(MK("back"), "slide"); E(MK("back") + .55, "tok"); if (has("g804")) E(LT("g804") - .05, "pop", 1);
  // 9 Round 1: the round card, the short ring
  E(S.r1card.t0, "roundcard"); { const L = "g901"; lock(MK("ring0_r1"), 3, "g902", ["g903", "g904", "g905"], [W(L, "clear"), W(L, "frosted"), W(L, "wooden") - .2]); E(W("g905", "bathroom") - .1, "boing"); }
  // 10 LOOK CLOSER frosted glass: click (on2), a softer hum, a faint shh as the glow lands (glow2); the split (a ting on the left, the shh on the right); a click (off2); the robot's tick-tick, muffled (robot2)
  lcin(S.lcfrost.t0 + .1); click(MK("on2")); hum(MK("on2") + .05, .022); shh(MK("glow2")); E(MK("split") - .05, "whoosh"); ting(MK("split") + .25, .05); shh(MK("split") + .7, .03); click(MK("off2"), .16);
  [0, 1, 2].forEach((i) => E(MK("robot2") + .5 + i * .1, "ratchet", i)); verdict("v_frost");
  E(W("g1005", "two") - .1, "tag"); if (has("g1006")) E(LT("g1006") - .05, "boop", 0); E(W("g1007", "one") - .1, "coin");
  // 11 Mark Sentence 2; row 2: a low hop, a stamp, the strip
  mark("g1101", "g1102"); TK(S.row2.t0, S.waitw.t1 - .6); E(MK("row2") + .2, "hop", 1); E(MK("row2") + 1.0, "stamp"); E(W("g1103", "cannot") - .1, "softpop", 0);
  // 12 be the light: the calm pad; a soft click; a smooth rushing hum; a tiny glassy ting as the frame passes; a bright ting on the card; a softer hum, a hushed shh at the cloudy wall
  E(W("g1201", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]);
  click(W("g1202", "click") - .05, .18); fx(W("g1202", "out") - .2, "rush.wav", .04, "wonder"); ting(MK("glass") + 1.2, .04); ting(W("g1204", "land") - .05, .09); E(MK("card") + 1.2, "sparkle");
  hum(MK("frost") - .3, .02); shh(W("g1206", "only") - .1, .04); shh(W("g1206", "soft") - .1, .03);
  // 13 pull back out; the score hand, the goldfish (a soft bloop, a sparkle)
  E(S.pullout.t0, "whooshout"); E(S.final.t0 + .1, "sting"); E(W("g1301", "high") + .2, "slap"); E(W("g1301", "two") - .1, "pip", 2); TK(S.liz.t0, S.kwrecap.t0); fx(S.liz.t0 + .5, "bubble.wav", .12); E(W("g1302", "goldfish") + .2, "sparkle");
  // 14 the cliffhanger: a wooden tok as the door goes in (doorIn), the robot's slide, a curious note, a low drum, the slam
  { const L = "g1402"; TK(S.cliff.t0, S.nyk.t0 + .3); E(MK("doorIn") + .5, "tok"); E(MK("doorIn") + .9, "slide"); E(LT("g1401") + .1, "boing"); E(W(L, "white") - .1, "softpop", 0); E(W(L, "how") - .1, "curious"); E(LT("g1403") - .2, "lowdrum"); E(W("g1403", "find") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); C(S.setup.t0 + .2, S.lcclear.t0); C(S.lcclear.t0 + .2, S.clearans.t1); C(S.mark1.t0 + .2, LT("g703") - .4); C(S.row1.t0, S.holdon.t0); G(S.holdon.t0, LE("g803")); G(S.fixtorch.t0, MK("ring0_r1")); G(LT("g903") - .5, S.lcfrost.t0);
  C(S.lcfrost.t0 + .2, S.frostans.t0); G(S.frostans.t0, S.mark2.t0); C(S.mark2.t0 + .2, LT("g1102") - .4); C(S.row2.t0, S.waitw.t1 - 1.5); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the calm recap (three soft pops, a torch click), the new place (crickets, a far television = none: crickets only), the game (the moth: a soft flutter), goals (Basil reads)
  { const L = "j101"; C(S.lasttime.t0 + .2, S.place.t0); E(S.lasttime.t0 + .1, "pluck", 0); E(LT(L) - .05, "softpop", 0); E(W(L, "frosted") - .1, "softpop", 1); E(W(L, "now") - .1, "softpop", 2); click(W(L, "door") + .3, .12); }
  NT(S.place.t0, S.goals.t1 - .3); E(S.game.t0 + .15, "sting"); E(W("j201", HIDDEN[0]) - .1, "curious"); fx(W("j201", HIDDEN[0]) + .15, "ep09_wings.wav", .03, "amb"); E(W("j201", "spot") - .1, "pip", 2);
  [0, 1, 2].forEach((i) => E(LT(["j302", "j303", "j304"][i]) - .1, "softpop", i));
  // 4 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "j401"; lock(MK("ring0_r1"), 5, "j402", ["j403", "j404", "j405"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(LE("j404") + .05, "boing"); }
  // 5 LOOK CLOSER the white door: click (on3), a hum of light that stops short with a soft thud at the door; behind it only the crickets; a click (off3); the robot's tick-tick as the door lifts (lift), a wooden tok as it goes back
  lcin(S.lcdoor.t0 + .1); NT(S.lcdoor.t0 + .3, S.doorans.t0); click(MK("on3")); fx(MK("on3") + .05, "hum.wav", .02, "wonder"); fx(MK("on3") + .25, "thud.wav", .08); E(MK("behind") + .1, "whoosh");
  click(MK("off3"), .16); [0, 1, 2].forEach((i) => E(MK("lift") + .3 + i * .09, "ratchet", i)); E(MK("lift") + 1.3, "tok"); verdict("v_door");
  E(W("j504", "three") - .1, "tag"); if (has("j505")) E(LT("j505") - .05, "boop", 0); E(W("j506", "one") - .1, "coin");
  // 6 Mark Sentence 1 (OPAQUE pops beside it); row 3: a hop and a stamp; two toks and two clicks (the mat, the tray), two more hops; the strip
  mark("j601", "j602"); NT(S.row3.t0, S.lcthree.t0 + .3); E(MK("row3") + .2, "hop", 2); E(MK("row3") + 1.0, "stamp");
  E(MK("mat") - .35, "tok"); click(MK("mat") + .15, .14); E(MK("mat") - .1, "hop", 0); E(MK("tray") - .35, "clink"); click(MK("tray") + .15, .14); E(MK("tray") - .1, "hop", 1);
  { const L = "j604"; ["rubber,", "wood", "metal"].forEach((w, i) => E(W(L, w.replace(",", "")) - .1, "softpop", i)); }
  // 7 LOOK CLOSER three in a row: three clicks; a bright ting, a faint shh, then quiet; a chime on the bracket
  lcin(S.lcthree.t0 + .1); [0, .25, .5].forEach((d) => click(S.lcthree.t0 + 1.0 + d, .12)); ting(MK("c1"), .06); shh(MK("c2"), .03); E(MK("c3") + .1, "boop", 1); E(MK("bracket") - .05, "chime2", 1); verdict("v_three");
  // 8 Mark Sentence 2 (TRANSPARENCY pops beside it); the heading is stamped on the board
  mark("j801", "j802"); E(MK("heading"), "stamp"); E(MK("heading") + .2, "chime2", 0);
  // 9 be the light of the lamp: the calm pad; a soft lamp hum; a soft thud at the door; a hushed shh at the frosted pane; a tiny glassy ting, then the crickets, clear and close
  E(W("j901", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.showcard.t0 + .5]);
  hum(MK("lamp") + .1, .025); fx(W("j903", "stop") - .15, "thud.wav", .08); shh(W("j904", "only") - .1, .04); ting(MK("clear") + .6, .05); NT(W("j905", "out") - .3, S.showcard.t0 + .3);
  // 10 the Showdown: whoosh out, the round card; Pip's notes (paper, a soft tick on each line), the drum roll, the counting hand; Pip's oops
  E(S.showcard.t0, "whooshout"); E(S.showcard.t0 + .1, "roundcard"); { const a = "j1001", b = "j1002", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); ["one", "two", "three"].forEach((w, i) => { if (TL.lines[a].words.some((x) => norm(x.w) === w)) E(W(a, w) - .05, "pip", i); }); R.roll.push([LT(b), W(b, "one", 1)]);
    lock(r0, 6, "j1003", ["j1004", "j1005"]); E(LT("j1006") - .05, "boop", 2); }
  // 11 LOOK CLOSER two plastic boxes: a soft tok as the clear box goes in; click (on4), a bright ting; two soft plastic toks as the boxes change (swap); a faint shh; the split; the verdict
  lcin(S.lcbox.t0 + .1); E(S.lcbox.t0 + .5, "tok"); click(MK("on4")); ting(MK("on4") + .35, .07); E(MK("swap") + .3, "knock"); E(MK("swap") + 1.0, "knock"); shh(W("j1103", "soft") - .1, .035); E(MK("split2") - .05, "whoosh");
  if (has("j1104")) E(W("j1104", "plastic") - .1, "softpop", 1); verdict("v_box");
  // the fix: two low hops (the boxes' tiles), the strips, a rub and a scribble (line 2 rewritten), the tip card, two coins
  { const L = "j1105"; E(S.fix.t0 + .3, "hop", 0); E(S.fix.t0 + .7, "hop", 1); E(W(L, "some") - .1, "softpop", 0); E(W(L, "some", 1) - .1, "softpop", 1); E(LE(L) - .8, "chime2", 0); E(LE(L) - 1.6, "rub"); E(LE(L) - 1.1, "scribble"); E(W("j1106", "two") - .1, "coin2"); E(W("j1106", "two") + .5, "coin2", 1); }
  // 12 the chant
  sayit("u1002"); chant("c1003");
  // 13-14 the score hand, the moth (a soft flutter, a sparkle); the dare: a trolley's wheel squeak, three soft pops, a boing, a sting
  E(S.final.t0 + .1, "sting"); E(W("j1301", "high") + .2, "slap"); E(W("j1301", "three") - .1, "pip", 2); NT(S.liz.t0, S.liz.t1); fx(S.liz.t0 + .4, "ep09_wings.wav", .03, "amb"); E(W("j1302", "moth") + .3, "sparkle");
  { const L = "j1401"; [0, .3, .6].forEach((d) => E(S.dare.t0 + .5 + d, "slide")); E(W(L, "trolley") - .1, "squeak"); E(W(L, "trolley") + .15, "squeak"); ["one", "two", "three"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); if (has("j1402")) E(W("j1402", "glass") - .1, "boing"); E(W(L, "lock") - .1, "sting"); }
  G(S.game.t0, S.goals.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("j403") - .5, S.lcdoor.t0); C(S.lcdoor.t0 + .2, S.doorans.t0); G(S.doorans.t0, S.mark1.t0); C(S.mark1.t0 + .3, S.waitw.t0);
  C(S.show.t0 + .2, S.show.t0 + .3); G(S.show.t0 + .3, MK("ring0_show")); G(LT("j1004") - .5, S.lcbox.t0); C(S.lcbox.t0 + .2, S.chant.t0); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
