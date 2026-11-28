// sound_cues.js: every sound of EP12 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN, KW, TL ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12, the
// script's "Sound" column. R regions: groove (the game bed), calm (teaching), wonder (the journeys), birds (outdoors: the walkway and the car
// park, soft), tank (the aquarium shop's tank bubbling, Part 1). LOOK CLOSER: the calm bed low, a soft whoosh in, the thing's own sounds, the
// stamp + a chime on the verdict. EP10 Stage 3's lesson (kept in EP11): every action sound sits on the action's own MARK (rice, bottles, tins,
// push, clang, slowmo, bagin, fold, land, palm, press, pour, knock, jthump, jclang, jsplash ...: script.py), the same mark the picture uses,
// never on a guess; Stage 2 keeps its drawing on those marks (a thing that lands, lands AT its mark; the plastic bottle is let go .42 s before
// MK land).
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); }, TK = (a, b) => { if (b > a + 1) R.tank.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  const lcin = (t) => E(t - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  const rattle = (t, d = 1.4, g = 1) => E(t, "whirr", d) /* the trolley's wheels */, clinks = (t, n, dt = .18) => { for (let i = 0; i < n; i++) E(t + i * dt, "clink"); };
  if (PART === 1) { const tB = MK("boardsIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: a far bus, a trolley's wheels somewhere, the mynah's two-note call, one curious note, three board slides), "Last time" (EP11's dare), the board, the title
  BD(0, S.lasttime.t0 + .4); fx(1.0, "pass_by.wav", .05, "amb"); rattle(1.6, 1.0); E(2.4, "mynah"); E(3.4, "curious"); [0, .3, .6].forEach((d) => E(tB + d, "slide")); E(tP, "pop", 0); E(tP + .15, "pop", 1); E(tP + .3, "pop", 2); E(tP + .9, "boing");
  { const a = "g202"; E(S.lasttime.t0 + .1, "pluck", 0); [W(a, "one"), W(a, "two"), W(a, "three")].forEach((t, i) => E(t - .05, "softpop", i)); E(W(a, "trolley") - .1, "squeak"); C(S.lasttime.t0 + .2, S.board.t0); }
  BD(S.board.t0, tT); E(MK("boardIn") + .15, "slide"); [0, 1, 2].forEach((i) => E(MK("boardIn") + .7 + i * .18, "pip", i));
  E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i));
  // 3 the game (the mynah's call); 4 goals (Momo reads), countdown
  E(S.game.t0 + .15, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); E(W(b, HIDDEN[0]) + .2, "mynah"); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["g402", "g403", "g404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 what is a trolley for (a soft pop, a low hop: the tile); LOOK CLOSER: the rice's soft heavy whump (rice), four bottle clinks (bottles), tin taps (tins), the wheels' rattle (push .. stop)
  BD(S.trolley.t0, S.lcjob.t0 + .3); E(W("g501", "trolley") - .1, "softpop", 0); E(MK("row1o") + .2, "hop", 0);
  lcin(S.lcjob.t0 + .1); E(MK("rice"), "pomf"); E(MK("rice") + .05, "potthud"); clinks(MK("bottles"), 4); [0, .2, .4].forEach((d) => E(MK("tins") + d, "tap")); rattle(MK("push"), MK("stop") - MK("push")); E(MK("stop"), "tap"); verdict("v_job");
  // 6 Mark Sentence 1; the pencil scribble on the board (row1p); the basket slides in, three soft pops (towel, scissors, raincoat)
  mark("g601", "g602"); E(MK("row1p"), "scribble"); BD(S.things.t0, S.r1card.t0); E(S.things.t0 + .1, "slide"); ["towel", "scissors", "raincoat"].forEach((k, i) => E(MK(k) - .05, "softpop", i));
  // 7 Round 1: the round card, the short ring; Basil's snacks (a boing)
  E(S.r1card.t0, "roundcard"); { const L = "g701"; lock(MK("ring0_r1"), 3, "g702", ["g703", "g704", "g705"], [W(L, "glass"), W(L, "metal"), W(L, "fabric")]); E(W("g703", "snacks") - .1, "boing"); }
  // 8 LOOK CLOSER the metal trolley: the load's soft creak and a bottle clink (bars), the guide line (a soft tap), the wheels' rattle into the bay, a bright metal CLANG on "Clang!" (clang) with the bottles rattling,
  //   the same clang long and low in slow motion (slowmo), a soft tok at the close-up; the verdict; RIGHT FOR THE JOB on the metal board (goodtag)
  lcin(S.lcmetal.t0 + .1); E(MK("bars"), "creak"); E(MK("bars") + .5, "clink"); E(MK("line") + .1, "tap"); E(MK("pullbk"), "whoosh"); rattle(MK("clang") - 1.0, .95); E(MK("clang"), "clang"); E(MK("clang") + .05, "jingle");
  E(MK("slowmo"), "whoosh"); E(MK("slowmo") + .8, "clangslow"); E(MK("closeup"), "tok"); verdict("v_metal"); E(MK("goodtag"), "tag", 0);
  // 8b glass: a soft pop (EP9's picture), a far small tinkle (the memory of EP9, not a new break), the strip; NOT FOR THIS JOB (badglass); Basil's boing
  E(MK("ep9") + .2, "softpop", 1); fx(MK("ep9") + .7, "ep06_clink.wav", .04); E(W("g805", "fragile") - .1, "softpop", 0); E(MK("badglass"), "tag", 1); if (has("g806")) E(LT("g806") - .05, "boing");
  // 8c fabric: a soft whump as the rice goes in (bagin), cloth as it is lifted (baglift), a soft whump as it is set down (bagdown), a cloth rustle as it folds (fold), a pop (FLEXIBLE), NOT FOR THIS JOB (badfabric)
  BD(S.fabric.t0, S.metalans.t0); E(MK("bagin"), "pomf"); E(MK("baglift"), "cloth"); E(MK("bagdown"), "pomf"); E(MK("fold"), "cloth"); E(MK("fold") + .3, "softpop", 2); E(MK("badfabric"), "tag", 1); E(LT("g808") - .05, "boop", 0);
  // 8d the answer: a tag, a coin, a low hop (row1m)
  E(W("g809", "two") - .1, "tag"); E(W("g809", "one") - .1, "coin"); E(MK("row1m"), "hop", 1); E(MK("row1m") + .3, "hop", 2);
  // 9 Mark Sentence 2 (PHYSICAL PROPERTIES pops: the key-word chime below)
  mark("g901", "g902");
  // 10 HOLD ON!: the glass card's slide (slideout), the stamp, ticks that speed up, a bell, a coin; Basil: a slide back (slideback), a boing
  { const b = "g1002", c = "g1003", r0 = MK("ring0_hold"); BD(S.holdon.t0, S.lctank.t0); E(MK("slideout") + .3, "slide"); E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp");
    ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "use") - .1, "softpop", 2); }
  E(MK("turn"), "whoosh"); E(MK("slideback"), "slide"); E(LT("g1004") - .05, "boing");
  // 11 LOOK CLOSER the fish tank: the tank's soft bubbling and the pump's faint hum; a ting on the magnifier (lens), a soft glide (glide), a soft pop on the dry shelf (dry); the verdict; the row's four hops
  TK(MK("turn"), S.waitw.t0); lcin(S.lctank.t0 + .1); fx(S.lctank.t0 + .4, "hum.wav", .015, "wonder"); fx(MK("lens") + .05, "ping.wav", .05, "wonder"); E(MK("glide"), "whoosh"); E(MK("dry") + .1, "softpop", 1); verdict("v_tank");
  [0, 1, 2, 3].forEach((i) => E(MK("row2") + .1 + i * .3, "hop", i)); if (has("g1105")) E(LT("g1105") - .05, "pop", 2);
  // 12 be the metal: the calm pad; a soft heavy thump (jthump), the wheels' hum close (jroll), a long ringing clang that fades (jclang); STRONG glows (a sparkle)
  E(W("g1201", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]);
  E(MK("jthump"), "pomf"); fx(MK("jroll") + .1, "rush.wav", .04, "wonder"); rattle(MK("jroll") + .1, 2.6); E(MK("jclang"), "clangslow"); E(MK("strongchip") + .1, "sparkle");
  // 13 pull back out; the score hand, the mynah (its call, a sparkle)
  E(S.pullout.t0, "whooshout"); E(S.final.t0 + .1, "sting"); E(W("g1301", "high") + .2, "slap"); E(W("g1301", "two") - .1, "pip", 2); BD(S.liz.t0, S.kwrecap.t0); E(S.liz.t0 + .6, "mynah"); E(W("g1302", "mynah") + .2, "sparkle");
  // 14 the cliffhanger: three soft clinks (dull, bright, ringing) as each bottle lifts (b1, b2, b3), a curious note on the ?, a low drum, the slam
  { const L = "g1402"; BD(S.cliff.t0, S.nyk.t0); E(LT("g1401") + .1, "boing"); E(MK("b1"), "tap"); E(MK("b2"), "clink"); E(MK("b3"), "jingle"); E(MK("q") - .1, "curious"); E(LT("g1403") - .2, "lowdrum"); E(W("g1403", "find") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); C(S.trolley.t0 + .2, S.lcjob.t0); C(S.lcjob.t0 + .2, S.mark1.t0); C(S.mark1.t0 + .2, LT("g602") - .4); C(S.things.t0, S.r1card.t0); G(S.r1.t0, S.lcmetal.t0);
  C(S.lcmetal.t0 + .2, S.metalans.t0); G(S.metalans.t0, S.mark2.t0); C(S.mark2.t0 + .2, LT("g902") - .4); G(S.holdon.t0, S.lctank.t0); C(S.lctank.t0 + .2, S.waitw.t1 - 1.5); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the calm recap (a soft pop under each picture, three bottle clinks), the car park (a bird, leaves, a far bus), the game (the squirrel's tiny chk-chk), goals (Pip reads)
  { const L = "j101"; C(S.lasttime.t0 + .2, S.place.t0); E(S.lasttime.t0 + .1, "pluck", 0); E(LT(L) - .05, "softpop", 0); E(W(L, "the", 1) - .1, "softpop", 1); E(W(L, "now") - .1, "softpop", 2); E(W(L, "bottles") - .2, "tap"); E(W(L, "bottles"), "clink"); E(W(L, "bottles") + .2, "jingle"); }
  BD(S.place.t0, S.goals.t1 - .3); fx(S.place.t0 + .3, "pass_by.wav", .04, "amb"); E(S.game.t0 + .15, "sting"); E(W("j201", HIDDEN[0]) - .1, "curious"); E(W("j201", HIDDEN[0]) + .2, "chek", .7); E(W("j201", "spot") - .1, "pip", 2);
  [0, 1, 2].forEach((i) => E(LT(["j302", "j303", "j304"][i]) - .1, "softpop", i));
  // 4 Round 1 (6 s ring)
  E(S.r1card.t0, "roundcard"); { const L = "j401"; lock(MK("ring0_r1"), 6, "j402", ["j403", "j404", "j405"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(LE("j404") + .05, "boing"); }
  // 5 LOOK CLOSER three bottles: three soft taps as the ticks land (ticks1), a soft slosh in each clear bottle (see1, see2), a boop (see3); the drop: a hollow plastic tok-tok and a roll (land), a tick (tick3);
  //   a soft warning chime on the small print (noglass), the strip; a boop (xg), a tap (tm); the verdict
  lcin(S.lcbottles.t0 + .1); BD(S.lcbottles.t0, S.bottleans.t1); E(MK("dry"), "whoosh"); [0, .3, .6].forEach((d) => E(MK("ticks1") + d, "tap")); E(MK("backlight"), "chime2", 0);
  [["see1", 0], ["see2", 1]].forEach(([k, i]) => { E(MK(k), "tap"); E(MK(k) + .1, "bubble", i); E(MK(k) + .22, "bubble", i + 2); }); E(MK("see3"), "boop", 1);
  E(MK("land"), "knock"); E(MK("land") + .24, "knock"); E(MK("land") + .4, "whirr", .5); E(MK("tick3"), "tap"); E(MK("rest") + .1, "tap"); E(MK("noglass") - .05, "chime2", 0); E(LT("j506") - .05, "softpop", 0); E(MK("xg"), "boop", 2); E(MK("tm"), "tap"); verdict("v_bottle");
  E(W("j507", "one") - .1, "tag"); E(W("j507", "one", 2) - .1, "coin"); [0, 1, 2, 3].forEach((i) => E(MK("row3") + .1 + i * .3, "hop", i)); if (has("j508")) E(LT("j508") - .05, "boop", 0);
  // 6 Mark Sentence 1 (USE pops: the key-word chime below)
  mark("j601", "j602");
  // 7 the boot: a soft whump (bagin2), the boot's soft thump (bootshut). LOOK CLOSER the car: a dull rubber thud (palm), a soft cloth pff (press), water pattering and running on glass (pour .. +2.6), two firm metal toks (knock); four soft pops (allfour); the verdict; four hops (carrows)
  BD(S.boot.t0, S.mark2.t0); E(MK("bagin2"), "pomf"); E(MK("bootshut"), "potthud"); lcin(S.lccar.t0 + .1);
  fx(MK("palm"), "thud.wav", .07); E(MK("press"), "pomf"); E(MK("press") + .05, "cloth"); for (let k = 0; k < 18; k++) E(MK("pour") + k * .15, "drip", k); E(MK("knock"), "knock"); E(MK("knock") + .25, "knock");
  [0, .2, .4, .6].forEach((d, i) => E(MK("allfour") + d, "softpop", i)); verdict("v_car"); [0, 1, 2, 3].forEach((i) => E(MK("carrows") + .2 + i * .25, "hop", i));
  // 8 Mark Sentence 2; Heart's re-say: four soft pips as the parts pulse (p1..p4)
  mark("j801", "j802"); [1, 2, 3, 4].forEach((i) => E(MK("p" + i), "pip", i - 1));
  // 9 be a drop of water: the calm pad; a soft pour (jspout), a round gentle plip on glass (jsplash), a long smooth slide (jslope), a second, smaller plip (jground)
  E(W("j901", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.showcard.t0 + .5]);
  E(MK("jspout") + .4, "stretch"); E(MK("jsplash"), "drip", 0); E(MK("jsplash") + .08, "bubble", 1); E(MK("jslope"), "stretch"); E(MK("jground") + .1, "drip", 3);
  // 10 the Showdown: whoosh out, the round card; Momo's notes (paper, a soft tick on each line), the drum roll, the counting hand; Momo's oops
  E(S.showcard.t0, "whooshout"); E(S.showcard.t0 + .1, "roundcard"); { const a = "j1001", b = "j1002", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); ["one", "two", "three"].forEach((w, i) => { if (TL.lines[a].words.some((x) => norm(x.w) === w)) E(W(a, w) - .05, "pip", i); }); R.roll.push([LT(b), W(b, "one", 1)]);
    lock(r0, 6, "j1003", ["j1004", "j1005"]); E(LT("j1004") - .1, "boop", 2); }
  // the fix: a rub and a scribble (rub), the tip card's low slide (tip), two coins; the board: seven soft ticks (ticks), the strip (SUITABLE pops: the key-word chime below)
  BD(S.fix.t0, S.chant.t0); E(MK("rub"), "rub"); E(MK("rub") + .5, "scribble"); E(MK("tip"), "slide"); E(W("j1006", "two") - .1, "coin2"); E(W("j1006", "two") + .5, "coin2", 1);
  for (let r = 0; r < 7; r++) E(MK("ticks") + r * .14, "tap"); E(LT("j1008") - .05, "softpop", 0);
  // 11 the chant
  sayit("u1002"); chant("c1003");
  // 12-13 the score hand, the squirrel (chk-chk, a sparkle); the dare: three board slides, a zip's zzip, three soft pops, a boing, a sting
  E(S.final.t0 + .1, "sting"); E(W("j1201", "high") + .2, "slap"); E(W("j1201", "three") - .1, "pip", 2); BD(S.liz.t0, S.liz.t1); E(S.liz.t0 + .5, "chek", .7); E(W("j1202", "squirrel") + .3, "sparkle");
  { const L = "j1301"; BD(S.dare.t0, S.kwrecap.t0); [0, .3, .6].forEach((d) => E(S.dare.t0 + .5 + d, "slide")); fx(W(L, "bag") + .1, "ep09_zip.wav", .08); ["one", "two", "three"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); if (has("j1302")) E(LT("j1302") + .1, "boing"); E(W(L, "lock") - .1, "sting"); }
  G(S.game.t0, S.goals.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("j403") - .5, S.lcbottles.t0); C(S.lcbottles.t0 + .2, S.bottleans.t0); G(S.bottleans.t0, S.mark1.t0); C(S.mark1.t0 + .3, S.waitw.t0);
  C(S.show.t0 + .2, S.show.t0 + .3); G(S.show.t0 + .3, MK("ring0_show")); G(LT("j1004") - .5, S.board.t0); C(S.board.t0 + .2, S.chant.t0); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // v3: the iris closing round the hidden animal (game, reveal), the fun-fact card's pop and its sparkle, the countdown's last-second gasp
  E(S.game.t0 + 1.12, "whoosh"); E(S.liz.t0 + 1.5, "whoosh"); { const f = PART === 1 ? "g1302f" : "j1202f"; if (TL.lines[f]) { E(LT(f) - .4, "pop", 2); E(LT(f) - .38, "sparkle"); } }
  if (PART === 1) { E(MK("rice") + .02, "potthud"); E(MK("jclang") + .02, "slam", 1); } else { E(MK("land") + .02, "pomf"); E(MK("jsplash"), "sfx", { f: "splash.wav", g: .35 }); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
