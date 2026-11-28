// sound_cues.js: every sound of EP9 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN, KW, TL ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12, the
// script's "Sound" column. R regions: groove (the game bed), calm (teaching), wonder (the journeys), canteen (children far away: the void deck
// and the playground), birds. LOOK CLOSER: the calm bed low, a soft whoosh in, the thing's own sounds, the stamp + a chime on the verdict.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, K = (a, b) => { if (b > a + 1) R.canteen.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  const lcin = (t) => E(t - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  const tick = (mk) => { if (MK(mk) !== undefined) { E(MK(mk), "stamp"); E(MK(mk) + .2, "chime2", 0); } };
  // the counter's weights: a "tok" as each weight slides on, rising in pitch (rise i), and a counter click (pip)
  const weights = (id, words, i0 = 0) => words.forEach((w, i) => { const t = W(id, w) - .08; E(t, "tok"); E(t + .05, "rise", Math.min(10, i0 + i)); });
  if (PART === 1) { const tB = MK("boardsIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: children far off at the playground, a bicycle bell, a mynah, one curious note, two board slides), "Last time", OUR 3 TESTS, the title
  K(0, S.lasttime.t0 + .4); E(.7, "bikebell"); E(1.5, "cheep", .7); E(2.6, "curious"); E(tB, "slide"); E(tB + .45, "slide"); E(tP, "pop", 0); E(tP + .15, "pop", 1); E(tP + .3, "pop", 2); E(tP + .9, "boing");
  { const a = "g201"; E(S.lasttime.t0 + .1, "pluck", 0); E(W(a, "seven") - .1, "softpop", 0); E(W(a, "and") - .1, "softpop", 1); E(W(a, "rubber") - .1, "twang"); E(W(a, "which") - .1, "curious"); C(S.lasttime.t0 + .2, S.tests.t0); }
  { const b = "g202", c = "g203"; K(S.tests.t0, tT - .2); E(LT(b) - .1, "boing"); E(LE(b) + .1, "slide"); [0, 1, 2].forEach((i) => E(W(c, "three") + .1 + i * .18, "pip", i)); E(W(c, "pull") - .05, "chime2", 0); }
  E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i));
  // 3 the game (the spider on its thread: a soft boing); 4 goals (Momo reads), countdown
  E(S.game.t0 + .15, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); E(W(b, HIDDEN[0]) + .2, "boing"); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["g402", "g403", "g404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 the paper strip: a clamp click; LOOK CLOSER: rustle as the finger pushes, a tok and a counter click as the weight goes on; Mark Sentence 1; the five tiles
  K(S.strip.t0, S.mark1.t0); fx(LT("g501") + .3, "click.wav", .25); lcin(S.lcpaper.t0 + .1);
  E(W("g503", "pushes") - .1, "rustle"); E(W("g503", "bends") - .1, "stretch"); E(W("g503", "observe") - .1, "softpop", 0); E(W("g504", "weight") - .1, "tok"); E(W("g504", "one", 1) - .05, "pip", 1); E(W("g504", "measure") - .1, "softpop", 2); verdict("v_property");
  mark("g505", "g506");
  { const L = "g507"; ["strength", "flexibility", "float", "waterproof", "transparency"].forEach((w, i) => E(W(L, w) - .1, "softpop", i % 4)); if (has("g508")) { E(W("g508", "first") - .1, "pip", 0); E(W("g508", "two") - .1, "pip", 1); } }
  // 6 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "g601"; lock(MK("ring0_r1"), 5, "g602", ["g603", "g604", ...(has("g605") ? ["g605"] : [])], [W(L, "one", 1), W(L, "two", 1), W(L, "three")]); E(W("g604", "ten") - .1, "boing"); }
  // 7 LOOK CLOSER, the slow pull test: a tok for each weight, a soft slow rip, a padded thud; the fabric's weights rising in pitch, a soft creak of thread; two rising notes as the bars grow
  lcin(S.lcpull.t0 + .1); weights("g701", ["one", "two", "three"]); E(W("g702", "tear") - .1, "rub"); E(W("g702", "tears") - .15, "stretch"); E(W("g702", "tears") + .25, "pomf");
  weights("g703", ["three", "four", "five", "six", "seven", "eight"], 3); E(W("g704", "tight") - .1, "creak"); E(MK("bars") + .3, "rise", 2); E(MK("bars") + .7, "rise", 7); verdict("v_stronger");
  if (has("g706")) E(LT("g706") - .1, "boop", 1); E(W("g707", "one") - .1, "coin");
  // 8 be a thread: the calm "wonder" pad; five soft thuds, each lower; a slow creak as the threads go taut; footsteps far away
  E(W("g801", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]); E(MK("weave") + .3, "cloth");
  for (let i = 0; i < 5; i++) E(W("g804", "drop") + .2 + i * .42, "potthud", i); E(W("g805", "lift") - .1, "creak"); E(W("g805", "tight") - .1, "stretch");
  fx(MK("home") + .2, "footsteps.wav", .08, "wonder");
  // 9 pull back out, Mark Sentence 2, tick 1 PULL
  E(S.pullout.t0, "whooshout"); E(W("g901", "strength") - .05, "chime"); mark("g902", "g903"); tick("tick1");
  // 10 test two: DROP, HOLD ON!
  { const a = "g1001", b = "g1002", c = "g1003", r0 = MK("ring0_hold"); E(S.drop.t0 + .1, "pip", 1); E(W(a, "throw") - .1, "boing"); E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp");
    ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "never") - .1, "softpop", 1); if (has("g1004")) E(LT("g1004") + .1, "boop", 0); }
  // 11 the drop box: a slide, a soft pat; LOOK CLOSER: a long metal clang and a ringing roll; a soft glass crack and a few low clinks (not harsh)
  E(S.dropbox.t0 + .1, "slide"); E(W("g1101", "box") - .05, "tap"); lcin(S.lcdrop.t0 + .1);
  fx(W("g1102", "clang") - .12, "ep03_clank.wav", .22); E(W("g1102", "bounces") - .05, "clink"); E(W("g1102", "bounces") + .4, "clink"); fx(W("g1103", "crack") - .1, "ep05_crack.wav", .14); [0, 1, 2].forEach((i) => E(W("g1103", "breaks") + .1 + i * .22, "clink")); verdict("v_fragile");
  tick("tick2");
  // 12 the score hand, the spider; 13 the cliffhanger: two stamps, two low hops, a twang, a low drum, the slam
  E(S.final.t0 + .1, "sting"); E(W("g1201", "high") + .2, "slap"); E(W("g1201", "two") - .1, "pip", 2); E(S.liz.t0 + .5, "boing"); E(W("g1202", "spider") + .2, "sparkle");
  { const L = "g1301"; E(W(L, "done") - .1, "stamp"); E(W(L, "bend") - .1, "pip", 2); E(W(L, "rubber") - .3, "hop", 0); E(W(L, "stick") - .3, "hop", 1); E(LT("g1302") + .1, "twang"); E(LT("g1303") - .2, "lowdrum"); E(W("g1303", "find") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); C(S.strip.t0 + .2, S.lcpaper.t0); C(S.lcpaper.t0 + .2, LT("g506") - .4); C(S.five.t0, S.r1card.t0); G(S.r1.t0, MK("ring0_r1")); G(LT("g603") - .5, S.lcpull.t0); C(S.lcpull.t0 + .2, S.pullans.t0);
  G(S.pullans.t0, S.waitw.t1 - 1.5); C(S.pullout.t0 + .4, LT("g903") - .4); G(LE("g903") + 1.5, S.drop.t1); C(S.dropbox.t0, S.final.t0); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2); K(S.cliff.t0, S.nyk.t0);
  } else {
  // 1-3 the calm recap, the new place (children far off, a swing's creak), the game (the caterpillar: boop-boop), goals (Pip reads)
  { const L = "j101"; C(S.lasttime.t0 + .2, S.place.t0); E(S.lasttime.t0 + .1, "pluck", 0); E(W(L, "fabric") - .1, "softpop", 0); E(W(L, "a") - .1, "softpop", 1); E(W(L, "now") - .1, "softpop", 2); E(W(L, "bend") - .05, "curious"); }
  K(S.place.t0, S.goals.t1); E(S.place.t0 + .5, "creak"); E(S.game.t0 + .15, "sting"); E(W("j201", HIDDEN[0]) - .1, "curious"); E(W("j201", HIDDEN[0]) + .2, "boop", 1); E(W("j201", HIDDEN[0]) + .45, "boop", 2); E(W("j201", "spot") - .1, "pip", 2);
  [0, 1, 2].forEach((i) => E(LT(["j302", "j303", "j304"][i]) - .1, "softpop", i));
  // 4 Round 1 (a short ring); a twang after Basil's pick
  E(S.r1card.t0, "roundcard"); { const L = "j401"; lock(MK("ring0_r1"), 3, "j402", ["j403", "j404", "j405"], [W(L, "one", 2), W(L, "two")]); E(LE("j404") + .05, "twang"); }
  // 5 LOOK CLOSER, the slow bend test: a soft rubbery creak, a twang as it springs back; a dry wooden creak that rises, a clean snap, two light taps
  lcin(S.lcbend.t0 + .1); E(W("j501", "half") - .1, "stretch"); E(W("j501", "twist") - .1, "stretch"); E(W("j501", "break") + .3, "twang");
  E(W("j502", "little") - .1, "creak"); E(W("j502", "crack") - .1, "creak"); fx(W("j502", "snap") - .08, "ep08_snap.wav", .25); E(W("j502", "breaks") + .3, "tap"); E(W("j502", "breaks") + .55, "tap"); verdict("v_bend");
  E(W("j503", "one") - .1, "tag"); if (has("j504")) E(LT("j504") - .05, "boop", 0); E(W("j505", "one", 1) - .1, "coin"); tick("tick3");
  // 6-7 Mark Sentences; the trays slide in; the tile boards hop
  mark("j601", "j602"); E(S.mark2.t0 + .2, "slide"); E(S.mark2.t0 + .5, "slide"); E(S.mark2.t0 + .9, "hop", 1); mark("j701", "j702");
  if (has("j703")) { E(W("j703", "rubber") - .2, "hop", 0); E(W("j703", "ceramic") - .2, "hop", 1); }
  // 8 be a rubber band: the calm pad; far hawker-centre sounds, soft; a rubbery creak at each bend; a rustle of paper; a soft twang
  E(W("j801", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]); K(MK("hook"), MK("ride"));
  for (let i = 0; i < 4; i++) E(MK("hook") + .4 + i * .7, "clack", i % 2); E(W("j803", "bend") - .1, "stretch"); E(W("j804", "packet") - .1, "rustle"); for (let i = 0; i < 4; i++) E(W("j804", "corner") - .3 + i * .25, "stretch");
  E(MK("ride") + .1, "rustle"); E(W("j805", "pull") - .1, "stretch"); E(W("j806", "flexible") - .1, "twang");
  E(S.pullout.t0, "whooshout"); if (has("j807")) E(LT("j807") + .1, "boing");
  // 9 LOOK CLOSER, three tubes: three soft toks as the weights go on; a long creak for rubber, a short one for plastic, a tiny tink for metal
  lcin(S.lctubes.t0 + .1); E(W("j901", "same") - .1, "tok"); E(W("j901", "same") + .3, "tok"); E(W("j901", "same") + .6, "tok"); E(W("j901", "most") - .2, "creak"); E(W("j901", "least") - .2, "clink"); verdict("v_tubes");
  // 10 the Showdown: Momo's notes, the drum roll, the counting hand; the rub, the scribble, two coins
  E(S.showcard.t0, "roundcard"); { const a = "j1001", b = "j1002", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); ["one", "two", "three"].forEach((w, i) => E(W(a, w) - .05, "pip", i)); R.roll.push([LT(b), W(b, "one", 1)]);
    lock(r0, 6, "j1003", ["j1004", "j1005"]); E(LT("j1006") - .05, "boop", 2); }
  { const L = "j1007"; E(S.fix.t0 + .2, "rub"); E(S.fix.t0 + .7, "scribble"); E(W(L, "bends") - .1, "softpop", 0); E(W(L, "tears") - .1, "softpop", 1); E(W(L, "different") - .1, "chime2", 0); E(W("j1008", "two") - .1, "coin2"); E(W("j1008", "two") + .5, "coin2", 1); }
  // 11 the chant
  sayit("u1002"); chant("c1003");
  // 12-13 the score hand, the caterpillar, the dare: a splash and a low glug, a ship's horn far off, three soft pops, a boing, a sting
  E(S.final.t0 + .1, "sting"); E(W("j1201", "high") + .2, "slap"); E(W("j1201", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "boop", 1); E(S.liz.t0 + .75, "boop", 2); E(W("j1202", "caterpillar") + .3, "sparkle");
  { const L = "j1301"; E(W(L, "spoon") - .1, "drip", 0); E(W(L, "sinks") - .05, "bubble", 1); fx(W(L, "ship") - .1, "ep05_horn.wav", .08); ["one", "two", "three"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); if (has("j1302")) E(W("j1302", "how") - .1, "boing"); E(W(L, "lock") - .1, "sting"); }
  G(S.game.t0, S.goals.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("j403") - .5, S.lcbend.t0); C(S.lcbend.t0 + .2, S.bendans.t0); G(S.bendans.t0, S.mark1.t0); C(S.mark1.t0 + .3, S.waitw.t0);
  C(S.lctubes.t0 + .2, S.showcard.t0); G(S.show.t0 + .3, MK("ring0_show")); G(LT("j1004") - .5, S.fix.t0); C(S.fix.t0 + .2, S.chant.t0); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
