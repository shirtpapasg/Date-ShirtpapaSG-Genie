// sound_cues.js: every sound of EP14 as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN, KW, TL ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. Sound palette: STYLE_GUIDE section 12, the
// script's "Sound" column. R regions: groove (the game bed), calm (teaching), wonder (the journeys), birds (the estate at dawn and by day; the
// garden), night (the soft night shimmer: the time-lapse's nights, the journey's night). LOOK CLOSER: the calm bed low, a soft whoosh in, the
// thing's own sounds, the stamp + a chime on the verdict. EP10 Stage 3's lesson (kept in EP11 to EP13): every action sound sits on the
// action's own MARK (curtains, sticker, torchon, turn, lampG / lampA / lampR / lampG2, tileday, tilenight, tick1, tick2, tagcycle, tilesoff,
// pen1..pen3, penrow, penchg, pentag, lighttiles, card1..card3; photo, pair1..3, nestwalk, settle, chicksout, tegg, tchick, tadult, tback,
// strike, bend, h_gm / h_m / h_c, jcrack, jtap1..jtap3 ...: script.py), the same mark the picture uses, never on a guess; Stage 2 keeps its
// drawing on those marks (a tile lands AT its mark; each lamp lights AT its word).
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots.length > L.ncall) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); }, NT = (a, b) => { if (b > a + 1) R.night.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  const fx = (t, f, g = .3, bus = "game") => E(t, "sfx", { f, g, bus });
  const has = (id) => !!TL.lines[id];
  const lcin = (t) => E(t - .1, "whoosh"), verdict = (mk) => { E(MK(mk) + .12, "stamp"); E(MK(mk) + .35, "chime2", 1); };
  if (PART === 1) { const tB = MK("boardsIn"), tP = MK("budsIn"), tT = MK("title");
  // 1-2 the cold open (no music: an estate before seven: a far bus, one bird, then more birds, the ceiling fan's soft hum, three board slides,
  //     the buddies' pops), "Last time" (EP13's dare: a pluck, a soft pop per card, one morning bird), back, the title
  BD(.8, S.lasttime.t0 + .4); fx(.2, "hum.wav", .02, "amb"); E(.3, "mrt"); E(1.1, "cheep", 0); E(2.9, "morning");
  [0, .3, .6].forEach((d) => E(tB + d, "slide")); E(tP, "pop", 0); E(tP + .15, "pop", 1); E(tP + .3, "pop", 2); E(tP + .8, "yawn");
  { const a = "g203"; E(S.lasttime.t0 + .1, "pluck", 0); [W(a, "one"), W(a, "two"), W(a, "three")].forEach((t, i) => E(t - .05, "softpop", i)); E(W("g202", "morning") + .2, "cheep", 1); C(S.lasttime.t0 + .2, S.back.t0); }
  BD(S.back.t0, tT); [0, 1, 2].forEach((i) => E(LT("g204") - .3 + i * .1, "pip", i));
  E(tT - .05, "whoosh"); [.26, .61].forEach((d, i) => E(tT + d, "slam", i));
  // 3 the game: the push-in onto the owl (a soft whoosh), a tiny soft "hoo" on its name; 4 goals (Pip reads), countdown
  E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, HIDDEN[0]) - .1, "curious"); E(W(b, HIDDEN[0]) + .2, "hoo"); E(W(b, "spot") - .1, "pip", 2); }
  [0, 1, 2].forEach((i) => E(LT(["g402", "g403", "g404"][i]) - .1, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 Round 1: the round card, the short ring (3 s); Basil's pick (a boing)
  E(S.r1card.t0, "roundcard"); { const L = "g501"; lock(MK("ring0_r1"), 3, "g502", ["g503", "g504", "g505"], [W(L, "why"), W(L, "come"), W(L, "show")]); E(LE("g505") + .05, "boing"); }
  // 6 LOOK CLOSER the sky: a soft tick from the clock pill each time it runs on (clk0, dusk, tue7, tue730, wed7); morning birds and a far school
  //   bell (sunup), evening: a koel stops, then the night shimmer (crickets) from lampson; birds again at tue7, night at tue730, birds at wed7,
  //   each a little shorter; a soft pop as each small sky lands in the row (row1..row4); the verdict
  { lcin(S.lcsky.t0 + .1); ["clk0", "dusk", "tue7", "tue730", "wed7"].forEach((k, i) => E(MK(k), "tap")); BD(MK("clk0") - .3, MK("dusk") + .6); fx(MK("sunup") + .4, "ep05_bell.wav", .015, "amb"); E(MK("dusk") + .2, "koel");
    NT(MK("lampson"), MK("tue7") - .1); E(MK("lampson") + .6, "lift"); BD(MK("tue7"), MK("tue730")); NT(MK("tue730"), MK("wed7")); BD(MK("wed7"), MK("v_sky") + 2.5); E(MK("wed7") + .1, "morning");
    for (let i = 1; i <= 4; i++) E(MK("row" + i), "softpop", i - 1); E(MK("noclouds"), "softpop", 0); E(MK("nosun") + .05, "softpop", 2); E(MK("tagday"), "chime2", 0); E(MK("tagnight"), "chime2", 0); verdict("v_sky"); }
  // 7 the curtains (curtain rings, curtains), a small pat (sticker); LOOK CLOSER the globe: the torch's click (torchon), the globe's soft slow rumble from
  //   turn without a stop (a low swell every .9 s), a soft chime on each cream tag; the verdict; the answer: a tag, the x chips, a coin; the curtains open
  { E(MK("curtains"), "curtain"); E(MK("sticker"), "tap"); lcin(S.lcglobe.t0 + .1); E(MK("torchon"), "click"); ["lab_earth", "lab_sun", "lab_sg"].forEach((k, i) => E(MK(k), "pip", i)); E(MK("pin"), "tap");
    for (let x = MK("turn"); x < MK("v_globe") + 2.2; x += .9) E(x, "rumble"); E(MK("dday") + .1, "chime2", 0); E(MK("dnight") + .05, "chime2", 0); E(MK("dlight") + .1, "chime2", 1); verdict("v_globe");
    E(MK("curtainsopen"), "curtain"); BD(MK("curtainsopen") + .3, S.waitw.t0); E(MK("ansglow") - .1, "tag", 0); [0, .15, .3].forEach((d, i) => E(MK("ticks") + d, "pop", i)); E(MK("coin1") - .1, "coin"); if (has("g709")) E(LE("g709") + .05, "boing"); }
  // 8 Momo (a pop, a soft chime); 9 be the little red dot: the calm pad, a low slow hum that never stops (the turn), night: a soft high shimmer, morning: one bird
  { if (has("g801")) E(LT("g801") - .05, "pop", 1); E(LT("g802") + .1, "chime2", 0); E(W("g901", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]);
    for (let x = MK("jdot"); x < S.pullout.t0; x += 2.2) E(x, "hum"); NT(MK("jnight") - .2, MK("jlight")); E(MK("jstars") + .1, "sparkle"); E(MK("jmorning") + .1, "morning"); }
  // 10 pull back out; Mark Sentence 1
  E(S.pullout.t0, "whooshout"); mark("g1001", "g1002");
  // 11 the board slides in (boardIn), two soft hops (tileday, tilenight), the arrows' soft pips (ringrun), two ticks, the green tag, the key-word chime; Mark Sentence 2
  { E(MK("boardIn") + .15, "slide"); E(MK("tileday"), "hop", 0); E(MK("tilenight"), "hop", 1); [0, 1, 2, 3].forEach((i) => E(MK("ringrun") + i * .2, "pip", i % 3)); E(MK("tick1"), "tap"); E(MK("tick2"), "tap"); E(MK("tagcycle"), "tag", 0); mark("g1102", "g1103"); }
  // 12 HOLD ON!: two hops off (tilesoff), three quick hops (pen1..pen3), the stamp, ticks that speed up, a bell, a coin; the pencils settle (penrow), one tick (penchg), the blue tag (pentag); Basil's boing
  { const b = "g1202", c = "g1203", r0 = MK("ring0_hold"); E(MK("tilesoff"), "hop", 3); E(MK("tilesoff") + .1, "hop", 2); ["pen1", "pen2", "pen3"].forEach((k, i) => E(MK(k), "hop", i)); E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp");
    ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(MK("penrow"), "slide"); E(MK("penchg"), "tap"); E(MK("pentag"), "tag", 1); if (has("g1204")) E(LT("g1204") - .05, "boing"); }
  // 13 Pip (a pop); LOOK CLOSER the traffic light: the glide (a whoosh), far traffic, the soft "tock" of a signal changing ON each lamp; the small board's tiles (lighttiles); the verdict
  { E(LT("g1301") - .05, "pop", 0); E(MK("glide") + .1, "whoosh"); for (let x = MK("glide") + .5; x < MK("v_light") + 2; x += 2.6) E(x, "mrt"); ["lampG", "lampA", "lampR", "lampG2"].forEach((k) => E(MK(k), "signal")); E(MK("lighttiles"), "hop", 1); E(MK("lighttiles") + .25, "tap"); verdict("v_light"); }
  // 14 score hand, the owl (the score hand melts into the room: a soft whoosh; a tiny soft hoo; the ring's sparkle on its name)
  E(S.final.t0 + .1, "sting"); E(W("g1401", "high") + .2, "slap"); E(W("g1401", "two") - .1, "pip", 2); BD(S.liz.t0, S.kwrecap.t0); E(S.liz.t0 + .1, "whoosh"); E(S.liz.t0 + 1.6, "hoo"); E(W("g1402", "owl") + .2, "sparkle");
  // 15 the cliffhanger: a soft pluck, the curious note on the ? (q), three low hops (card1..card3), a low drum, the slam
  { BD(S.cliff.t0, S.nyk.t0); E(LT("g1501") - .05, "pluck", 2); E(MK("q") - .05, "curious"); ["card1", "card2", "card3"].forEach((k, i) => E(MK(k), "hop", i)); E(LT("g1503") - .2, "lowdrum"); E(W("g1503", "part") - .1, "slam", 1); }
  G(tT + .9, S.count.t0 - .2); G(S.r1.t0, S.lcsky.t0); C(S.lcsky.t0 + .2, S.globeans.t0); G(S.globeans.t0, S.momo.t0); C(S.momo.t0, S.waitw.t0); C(S.mark1.t0 + .2, LT("g1002") - .4);
  C(S.cyclecheck.t0, S.mark2.t0); C(S.mark2.t0 + .2, LT("g1103") - .4); G(S.holdon.t0, S.pipdown.t1); C(S.lclight.t0 + .2, S.final.t0); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-3 the calm recap (a soft pop under each picture, a low drum on the last), the garden (leaves, a hen's low clucks, chicks cheeping, a far rooster), the game (the push-in, a tiny buzz on the ladybird), goals (Basil reads)
  { const L = "j101"; C(S.lasttime.t0 + .2, S.place.t0); E(S.lasttime.t0 + .1, "pluck", 0); E(LT(L) - .05, "softpop", 0); E(MK("pic2") - .1, "softpop", 1); E(MK("pic3") - .1, "softpop", 2); E(MK("pic3") + .1, "lowdrum", .5); }
  BD(S.place.t0, S.goals.t1 - .3); E(S.place.t0 + .3, "cluck"); E(S.place.t0 + .9, "cheep", 1); E(S.place.t0 + 1.4, "rooster"); E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); E(W("j201", HIDDEN[0]) - .1, "curious"); E(W("j201", HIDDEN[0]) + .2, "buzz"); E(W("j201", "spot") - .1, "pip", 2);
  [0, 1, 2].forEach((i) => E(LT(["j302", "j303", "j304"][i]) - .1, "softpop", i));
  // 4 Round 1 (6 s ring): the photo's paper (photo)
  E(S.r1card.t0, "roundcard"); { const L = "j401"; E(MK("photo") + .1, "paper"); lock(MK("ring0_r1"), 6, "j402", ["j403", "j404", "j405"], [W(L, "one", 1), W(L, "two"), W(L, "three", 1)]); E(LE("j404") + .05, "boing"); }
  // 5 LOOK CLOSER then and now: a photo's soft flick (thenpic), leaves; a soft rising note under the first two pairs (line1, line2), a flat bup under the third (line3); the two tags; the verdict; the answer: a tag, a coin
  { lcin(S.lcthen.t0 + .1); BD(S.lcthen.t0, S.thenans.t1); E(MK("thenpic"), "flip"); E(MK("line1"), "rise", 2); E(MK("line2"), "rise", 5); E(MK("line3"), "boop", 0); E(MK("tagliving"), "tag", 0); E(MK("tagnon"), "tag", 1); verdict("v_then"); E(MK("ansglow") - .1, "tag", 0); E(MK("coin1") - .1, "coin"); }
  // 6 LOOK CLOSER one chick: a soft tick from the week pill (wk1..wk24, later3), cheeps that turn picture by picture into low clucks, scratching on dry leaves;
  //   the walk to the bush (nestwalk), dry leaves as she settles (settle), three thin cheeps as the chicks walk out (chicksout); the verdict; the strip
  { lcin(S.lcchick.t0 + .1); BD(S.lcchick.t0, S.strip.t1); ["wk1", "wk6", "wk12", "wk24", "later3"].forEach((k) => E(MK(k), "tap")); E(MK("wk1") + .4, "cheep", 0); E(MK("wk6") + .3, "cheep", 1); E(MK("wk6") + 1.0, "rustle"); E(MK("wk12") + .4, "cheep", 2); E(MK("wk24") + .3, "cluck");
    for (let k = 0; k < 6; k++) E(MK("nestwalk") + k * .22, "step", .5); E(MK("settle"), "rustle"); E(MK("settle") + .3, "cluck"); [0, .25, .5].forEach((d, i) => E(MK("chicksout") + d, "cheep", i)); E(MK("labyoung"), "softpop", 1); verdict("v_chick"); if (has("j605")) E(LT("j605") - .05, "softpop", 0); }
  // 7 be a chick: the calm pad; inside the egg a soft slow heartbeat and the hen's muffled clucks; a crisp crack (jcrack); pecking (jpeck); a rustle as you settle (jnest); three small taps from inside a shell (jtap1..jtap3)
  { E(W("j701", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .5]);
    for (let x = MK("jegg"); x < MK("jhatch"); x += .9) E(x, "heartbeat"); E(MK("jegg") + 1.2, "cluck", .4); E(MK("jcrack"), "crack"); E(MK("jcrack") + .45, "crack", 1); E(MK("jlight") + .1, "sparkle");
    [0, .35, .7].forEach((d) => E(MK("jpeck") + d, "tap")); E(MK("jnest"), "rustle"); ["jtap1", "jtap2", "jtap3"].forEach((k) => E(MK(k), "crack", 1)); E(MK("jnew") + .1, "cheep", 2); }
  // 8 pull back out; the ring: three hops (tegg, tchick, tadult), a soft rising pip as the last arrow lights back to the egg (tback), two ticks, the green tag; Mark Sentence 1
  { E(S.pullout.t0, "whooshout"); ["tegg", "tchick", "tadult"].forEach((k, i) => E(MK(k), "hop", i)); E(MK("tback"), "rise", 4); E(MK("tick1"), "tap"); E(MK("tick2"), "tap"); E(MK("tagcycle"), "tag", 0); mark("j802", "j803"); }
  // 9 the Showdown: the round card; Pip's easel (paper, a soft tick on each line he reads), the drum roll, the counting hand; the fix: a scribble (strike), a soft stretch (bend), two coins
  E(S.showcard.t0, "roundcard"); { const b = "j901", r0 = MK("ring0_show"); E(S.show.t0 + .1, "paper"); ["l1", "l2", "l3"].forEach((k, i) => { if (TL.marks[k] !== undefined) E(MK(k) - .05, "pip", i); }); R.roll.push([LT(b), W(b, "one")]);
    lock(r0, 6, "j903", ["j904", "j905"]); E(LT("j904") - .1, "boop", 2); }
  E(MK("strike"), "scribble"); E(MK("bend"), "stretch"); E(MK("bend") + .3, "softpop", 3); E(W("j906", "two") - .1, "coin2"); E(W("j906", "two") + .5, "coin2", 1); if (has("j907")) E(LT("j907") - .05, "boing");
  // 10 LOOK CLOSER three chickens: three small sips, low clucks, one cheep; a soft pip on each label (h_gm, h_m, h_c); the heads lift together (heads); the verdict; Mark Sentence 2
  { lcin(S.lchens.t0 + .1); BD(S.lchens.t0, S.mark2.t0); [0, .5, 1.0].forEach((d, i) => E(S.lchens.t0 + 1.5 + d, "sip", i)); ["h_gm", "h_m", "h_c"].forEach((k, i) => E(MK(k), "pip", i)); E(MK("h_gm") + .4, "cluck"); E(MK("h_c") + .3, "cheep", 1); E(MK("heads"), "softpop", 2); verdict("v_hens"); mark("j1002", "j1003"); }
  // 11 the chant
  sayit("u1002"); chant("c1003");
  // 12-13 the score hand, the ladybird (the score hand melts into the garden: a soft whoosh; a tiny buzz as it flies to the next leaf; a sparkle); the dare: three board slides, a juicy squish, a boing, a sting
  E(S.final.t0 + .1, "sting"); E(W("j1201", "high") + .2, "slap"); E(W("j1201", "three") - .1, "pip", 2); BD(S.liz.t0, S.liz.t1); E(S.liz.t0 + .1, "whoosh"); E(S.liz.t0 + 1.8, "buzz"); E(W("j1202", "ladybird") + .3, "sparkle");
  { const L = "j1301"; BD(S.dare.t0, S.kwrecap.t0); [0, .3, .6].forEach((d) => E(MK("dareIn") + .2 + d, "slide")); ["one", "two", "three"].forEach((w, i) => E(W(L, w) - .1, "softpop", i)); E(W(L, "mango") + .1, "squish"); if (has("j1302")) E(LT("j1302") + .1, "boing"); E(W(L, "lock") - .1, "sting"); }
  G(S.game.t0, S.goals.t1); G(S.r1.t0, MK("ring0_r1")); G(LT("j403") - .5, S.lcthen.t0); C(S.lcthen.t0 + .2, S.thenans.t0); G(S.thenans.t0, S.lcchick.t0); C(S.lcchick.t0 + .2, S.waitw.t0); C(S.ring.t0, S.mark1.t0); C(S.mark1.t0 + .3, LT("j803") - .4);
  G(S.show.t0 + .3, MK("ring0_show")); G(LT("j904") - .5, S.lchens.t0); C(S.lchens.t0 + .2, S.mark2.t0); C(S.mark2.t0 + .3, LT("j1003") - .4); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
