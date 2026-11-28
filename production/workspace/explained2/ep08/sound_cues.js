// sound_cues.js: every sound of EP8 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN, KW, NAMES, MAT ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12,
// script columns "Sound". R regions: groove (the game bed), calm (teaching), wonder (the journeys), canteen (children far away), birds.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, K = (a, b) => { if (b > a + 1) R.canteen.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  // LOOK CLOSER (closer.js): a soft whoosh as the camera pushes in; the verdict tag lands with the stamp and a chime
  const lcin = (id) => E(LT(id) - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  if (PART === 1) { const tB = MK("boardIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: canteen sounds, a spoon on a bowl, one curious note, the board slides in), the new chapter, the title
  K(0, tT - .2); E(.8, "clink"); E(1.6, "curious"); E(tB, "slide"); [0, 1, 2].forEach((i) => E(tB + .25 + i * .22, "hop", i)); E(tP, "pop", 0); E(tP + .15, "pop", 2);
  { const a = "g201", b = "g202"; ["plastic", "metal", "glass"].forEach((w, i) => E(W(a, w) - .1, "pip", i)); fx(W(a, "sand") - .1, "hiss.wav", .12, "amb"); E(W(a, "sand"), "curious");
    [0, 1, 2, 3].forEach((i) => E(W(b, "living") - .1 + i * .14, "softpop", i)); E(W(b, "now") - .1, "slide"); E(W(b, "non-living") - .05, "chime"); E(W(b, "made") - .1, "chime2", 1); }
  { const c = "g203"; ["plastic", "metal", "glass"].forEach((w, i) => E(W(c, w) - .1, "pip", i)); E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i)); }
  // 3 the game; 4 goals, countdown
  E(S.game.t0 + .15, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); E(W(b, HIDDEN[0]) + .15, "cheep", .6); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["g402", "g403", "g404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 the spoon: a soft pop, the magnifier slides, a clink on "Metal!"; Mark Sentence 1
  K(S.spoon.t0, S.mark1.t0); E(LT("g501") - .1, "softpop", 1); E(W("g502", "what") - .2, "slide"); E(W("g502", "metal") - .05, "clink"); E(W("g502", "metal", 1) - .05, "tag", 1); mark("g503", "g504");
  // 6 HOLD ON! Basil's rule
  E(S.listcard.t0, "roundcard"); { const a = "g601", b = "g602", c = "g603", r0 = MK("ring0_hold"); E(S.rule.t0 + .2, "scribble"); E(W(a, "window") - .15, "rise", 0); E(W(a, "so") - .1, "boop", 1); E(LT(a) + 1.2, "chek", .45);
    E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp"); ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon");
    E(W(c, "one") - .1, "coin"); E(W(c, "glass") - .1, "rub"); E(W(c, "material") - .1, "softpop", 1); E(W(c, "object") - .1, "softpop", 3); E(LT("g604") + .1, "boop", 0); }
  // 7 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "g701"; ["plastic", "metal", "glass"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); lock(MK("ring0_r1"), 5, "g702", ["g703", "g704", "g705"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(W("g705", "ice") - .1, "boing"); }
  // 8 be a grain of sand: the calm pad, a hiss of sand; the scoop and the furnace's roar; melting; the pour; three glassy notes; one "ting"
  E(W("g801", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]); fx(MK("pile") + .2, "hiss.wav", .1, "wonder"); fx(MK("pile") + 2.2, "hiss.wav", .07, "wonder");
  E(MK("scoop") + .1, "rub"); E(MK("scoop") + .4, "whirr", .7); fx(W("g803", "slide") - .2, "flame_roar.wav", .07, "wonder"); fx(W("g803", "furnace"), "flame_roar.wav", .1, "wonder");
  fx(MK("melt"), "hum.wav", .12, "wonder"); for (let i = 0; i < 5; i++) E(MK("melt") + 1 + i * .7, "bubble", i); E(MK("mould") + .2, "stretch"); E(W("g805", "mould") - .05, "clunk");
  ["cool", "hard", "clear"].forEach((w, i) => E(W("g806", w) - .05, "chime2", i % 2)); E(W("g807", "glass") - .1, "tag", 1);
  // 9 the reveal: glass
  E(S.reveal.t0, "whooshout"); E(W("g901", "three") - .1, "tag"); if (MK("uses_glass") !== undefined) [0, 1, 2].forEach((i) => E(MK("uses_glass") + .1 + i * .25, "softpop", i)); E(W("g903", "one") - .1, "coin");
  // 10 metal and plastic
  // look closer, glass: the furnace's roar as the sand is heated, bubbles as it melts, glassy notes as it clears
  lcin("g904"); fx(W("g905", "heated") - .2, "flame_roar.wav", .08); for (let i = 0; i < 4; i++) E(W("g905", "melts") + i * .45, "bubble", i); E(W("g905", "clear") - .05, "chime2", 0); E(W("g905", "clear") + .5, "chime2", 1); verdict("v_glass");
  // look closer, metal: the board slides in, the magnifying glass, glints on "Shiny bits!", two knocks on "dug"
  E(S.lcmetal.t0 + .15, "slide"); lcin("g1011"); E(W("g1011", "shiny") - .1, "sparkle"); E(W("g1011", "metal") - .05, "clink"); E(W("g1002", "dug") - .1, "knock"); E(W("g1002", "dug") + .25, "knock"); verdict("v_metal");
  ["gold", "iron", "copper", "aluminium"].forEach((w, i) => E(W("g1003", w) - .1, "softpop", i));
  // look closer, plastic: the oil's glug, the machine's hum, a pop as each box comes out
  E(S.lcplastic.t0 + .15, "slide"); lcin("g1012"); fx(W("g1012", "dark") - .1, "ep06_gurgle.wav", .16); fx(W("g1012", "goes"), "hum.wav", .1); [0, 1, 2].forEach((i) => E(W("g1012", "plastic") + i * 1.3, "pop", i)); verdict("v_plastic");
  if (has("g1006")) E(W("g1006", "good") - .1, "boing");
  // 11 Round 2: ceramic; clay; the kiln; Mark Sentence 2
  E(S.r2card.t0, "roundcard"); { const L = "g1102"; lock(MK("ring0_r2"), 5, "g1103", ["g1104", "g1105", "g1106"], [W(L, "one"), W(L, "two"), W(L, "three")]); E(MK("ring0_r2") + 1.1, "cheep", .5); E(MK("ring0_r2") + 1.4, "cheep", 1); }
  K(S.clay.t0, S.mark2.t0); E(W("g1107", "two") - .1, "tag"); E(LT("g1108") - .4, "slide"); E(W("g1109", "shaped") - .1, "knock"); fx(W("g1109", "baked") - .1, "flame_roar.wav", .07);
  // look closer, the kiln: a soft squeeze on "soft", a hop in, the fire, the ceramic "tok" when it comes out hard
  lcin("g1113"); fx(W("g1113", "soft") - .1, "squeeze.wav", .1); E(W("g1113", "into") - .1, "hop", 1); fx(LE("g1113") - .1, "flame_roar.wav", .08); E(W("g1114", "hardens") + .5, "hop", 2); E(W("g1114", "hardens") + 1.5, "tok"); E(W("g1114", "hardens") + 1.72, "tok"); verdict("v_ceramic");
  mark("g1110", "g1111"); E(W("g1112", "one") - .1, "coin");
  // 12 the score hand, the lizard; 13 the cliffhanger
  E(S.final.t0 + .1, "sting"); E(W("g1201", "high") + .2, "slap"); E(W("g1201", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "cheep", 0); E(S.liz.t0 + 1.4, "cheep", 1);
  { const L = "g1301"; [0, 1, 2].forEach((i) => E(S.cliff.t0 + .3 + i * .3, "pip", i)); E(W(L, "sole") - .4, "whoosh"); [0, 1, 2].forEach((i) => E(W(L, "white") + .1 + i * .55, "drip", i)); E(W(L, "where") - .1, "lowdrum"); E(W(L, "find") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); C(S.spoon.t0 + .3, LT("g504") - .4); G(S.rule.t0, LT("g602") - .1); G(LT("g603"), S.rule.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("g703") - .5, S.waitw.t1 - 1.5);
  G(S.reveal.t0 + 1.4, S.lcglass.t0); C(S.lcglass.t0 + .2, S.plastic.t1 - (has("g1006") ? 3 : 0)); G(S.r2.t0, MK("ring0_r2")); G(LT("g1104") - .5, S.clay.t0 + .4); C(S.clay.t0 + .5, LT("g1111") - .4); G(LE("g1111") + 1.5, S.final.t0);
  G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2); K(S.cliff.t0, W("g1301", "white"));
  } else {
  // 1-3 the recap, "Last time", goals, the game
  if (S.recap) { for (let i = 0; i < 3; i++) E(S.recap.t0 + i * 1.0 + .02, "clack"); E(S.recap.t0 + 1.4, "tag", 1); E(S.recap.t0 + 2.4, "drip", 2); C(S.recap.t0 + .2, S.lasttime.t0 + .4); }
  { const L = "j201"; K(S.lasttime.t0, S.goals.t0); E(W(L, "objects") - .2, "softpop", 0); E(W(L, "sand") - .1, "chime2", 0); E(W(L, "clay") - .1, "chime2", 1); [0, 1, 2].forEach((i) => E(W(L, "three") - .1 + i * .2, "pip", i)); }
  [0, 1, 2].forEach((i) => E(LT(["j312", "j313", "j314"][i]) - .1, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("j301", HIDDEN[0]) - .1, "curious"); E(W("j301", HIDDEN[0]) + .2, "baa"); E(W("j301", "spot") - .1, "pip", 2);
  // 4 wood: a knock on wood, the pencil, the trees, a saw stroke, a page flip
  K(S.wood.t0, S.r1card.t0); E(W("j401", "bench") - .1, "knock"); E(W("j401", "bench") + .15, "knock"); E(W("j401", "pencil") - .1, "softpop", 2); E(S.trees.t0 + .1, "slide");
  // look closer, wood: the saw (a whirr and rubs), planks landing, two knocks on the bench
  lcin("j405"); E(W("j403", "cut") - .2, "whirr", .6); E(W("j403", "cut") + .5, "rub"); [0, 1, 2].forEach((i) => E(W("j403", "planks") + i * .3, "knock")); E(W("j406", "lines") - .1, "softpop", 1); E(W("j406", "bench") - .1, "knock"); E(W("j406", "bench") + .25, "knock"); verdict("v_wood"); E(W("j404", "paper") - .1, "flip");
  // 5 Round 1: three drips, the lock-in, Basil's joke
  E(S.r1card.t0, "roundcard"); { const L = "j502"; [0, 1, 2].forEach((i) => E(W(L, "white") + i * .32, "drip", i)); lock(MK("ring0_r1"), 5, "j503", ["j504", "j505", "j506"], [W(L, "one"), W(L, "two"), W(L, "three")]); E(W("j506", "nobody") - .1, "boing"); }
  // 6 be a drop of sap: a slow woody creak, leaves far away; the cut, the ooze; the trickle and the drip into the cup; the rollers; the press; two squeaks
  E(W("j601", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]); E(MK("intree") + .4, "creak"); R.birds.push([MK("cut"), MK("factory") - .2]);
  E(W("j603", "thin") - .1, "rub"); E(W("j603", "ooze") - .05, "pop", 1); for (let i = 0; i < 4; i++) E(MK("cup") + .3 + i * .3, "drip", i); E(W("j604", "drip") + .3, "bubble", 2);
  fx(MK("factory") + .2, "hum.wav", .1, "wonder"); fx(W("j605", "made") - .3, "squeeze.wav", .12, "wonder"); fx(MK("sole") + .2, "ep03_press.wav", .2, "wonder"); E(W("j606", "shape") + .1, "pomf");
  E(MK("steps") + .5, "squeak"); E(MK("steps") + 1.3, "squeak");
  // 7 the reveal: rubber, Mark Sentence 1, the uses
  E(S.reveal.t0, "whooshout"); E(W("j701", "two") - .1, "tag"); E(W("j701", "tree") + .2, "slide");
  // look closer, the cut in the bark: drips into the cup, the factory's squeeze, a pomf for the sole
  lcin("j705"); E(W("j705", "white") - .1, "pop", 1); for (let i = 0; i < 6; i++) E(W("j705", "drop") + .2 + i * .42, "drip", i); fx(LT("j706") + .2, "squeeze.wav", .1); E(W("j706", "rubber") - .1, "softpop", 2); E(W("j706", "rubber") + .4, "pomf"); verdict("v_rubber");
  mark("j702", "j703"); E(W("j703", "oil") - .1, "softpop", 2);
  if (MK("uses_rubber") !== undefined) [0, 1, 2, 3].forEach((i) => E(MK("uses_rubber") + .1 + i * .22, "softpop", i)); E(W("j704", "one") - .1, "coin");
  // 8 fabric; Round 2: cotton
  K(S.fabric.t0, S.r2card.t0); E(S.fabric.t0 + .15, "cloth");
  // look closer, the weave: cloth, a note on each "over" and "under"
  lcin("j811"); E(W("j811", "threads") - .1, "cloth"); TL.lines.j811.words.filter((w) => /^(over|under)/i.test(w.w)).forEach((w, i) => E(w.a - .08, "pip", i % 2 ? 0 : 2)); verdict("v_fabric"); E(S.r2card.t0, "roundcard"); { const L = "j803"; lock(MK("ring0_r2"), 5, "j804", ["j805", "j806", "j807"], [W(L, "one"), W(L, "two", 1)]); }
  { const L = "j808"; E(W(L, "two") - .1, "tag"); ["cotton", "wool", "silk"].forEach((w, i) => E(W(L, w) - .1, "softpop", i * 2)); E(W(L, "sheep") + .1, "baa"); E(W("j809", "one") - .1, "coin"); E(LT("j810") + .1, "boop", 0); }
  // 9 the Showdown: Pip's notes, the drum roll, the counting hand; count the parts (four pips rising), the rub, the scribble, two coins
  E(S.showcard.t0, "roundcard"); { const a = "j901", b = "j902", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); R.roll.push([LT(b), W(b, "one")]); [W(b, "one"), W(b, "two"), W(b, "three")].forEach((t, i) => E(t - .05, "pip", i));
    lock(r0, 6, "j903", ["j904", "j905"]); E(r0 + 1.2, "tok", .4); E(LE("j905") + .1, "boop", 2); }
  { const L = "j906"; ["sole", "top", "rings", "lace"].forEach((w, i) => E(W(L, w) - .1, "rise", i * 2)); E(W("j907", "one") - .1, "tag"); E(LT("j908"), "rub"); E(LT("j908") + .5, "scribble"); E(W("j909", "two") - .1, "coin2"); E(W("j909", "two") + .5, "coin2", 1); }
  // 10 seven tiles: seven rising notes as each name is read; the chant
  E(S.seven.t0 + .1, "reveal"); sayit("j1001"); ["wood", "metal", "ceramic", "rubber", "glass", "plastic", "fabric"].forEach((w, i) => E(W("j1002", w) - .05, "rise", i)); E(LE("j1002") + .25, "chime");
  sayit("u1002"); chant("c1003");
  // 11-12 the score hand, the lizard, the dare
  E(S.final.t0 + .1, "sting"); E(W("j1101", "high") + .2, "slap"); E(W("j1101", "four") - .1, "pip", 2); E(S.liz.t0 + .6, "baa"); E(W("j1102", "sheep") + .3, "pip", 1);
  { const L = "j1201"; E(W(L, "band") - .25, "pop", 0); E(W(L, "stick") - .25, "pop", 2); E(W(L, "which") - .1, "curious"); E(LT("j1202") + .2, "twang"); E(W("j1203", "lock") - .1, "sting"); }
  if (S.recap) G(S.lasttime.t0 + .5, S.wood.t0); else G(S.lasttime.t0 + .3, S.wood.t0); C(S.wood.t0 + .3, S.r1card.t0); G(S.r1.t0, MK("ring0_r1")); G(LT("j504") - .5, S.waitw.t1 - 1.5);
  G(S.reveal.t0 + 1.4, S.lcsap.t0); C(S.lcsap.t0 + .2, S.mark1.t0); G(LE("j703") + 1.5, S.fabric.t0); C(S.fabric.t0 + .3, S.r2card.t0); G(S.r2.t0, MK("ring0_r2")); G(LT("j805") - .5, S.showcard.t0); G(S.show.t0 + .3, MK("ring0_show"));
  G(LT("j904") - .5, LT("j906") - .3); C(LT("j906") - .2, LE("j909")); C(S.seven.t0 + .3, LE("j1002") + 1.5); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf; material names: the chime, then a hop onto the tile; a tile fills: the stamp
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  for (const n of NAMES) { if (!n.shelf) { E(n.t, "term"); E(n.th + .55, "hop", 2); } else E(n.th + .7, "hop", 1); }
  for (const m of MAT) { const mk = tileT(m.k); if (mk !== undefined) E(mk + .15, "stamp"); }   // Stage 2: a tile fills when its name lands on it (tileT in materials.js)
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
