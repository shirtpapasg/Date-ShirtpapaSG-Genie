// sound_cues.js (EP7): every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, LE, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice. The sounds follow the script's "Sound" column.
// Regions: groove (the light game bed), calm (soft chords), wonder (the journeys' pad), birds (outside the window), hum (the fridge),
// water (a running tap), chatter (the far canteen, in the bacterium journey), roll (the Showdown drum roll).
// DAYSTEP: in the ten-day time-lapse the day pill shows DAY 2 at MK("lapse0") and one more day every DAYSTEP seconds (DAY 10 at + 8 x DAYSTEP).
window.DAYSTEP = .85;
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], hum: [], water: [], chatter: [] };
  const lock = (r0, dur, lockId, picks, tc) => { (tc || []).forEach((t, i) => E(t, i % 2 ? "cardR" : "cardL")); ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon"); picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); if (L.slots[L.ncall]) E(L.t + L.slots[L.ncall][1] * L.bar, "softpop", 3); };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const mark = (say, read) => { sayit(say); E(LE(read) + .25, "chime"); };
  if (PART === 1) { const tb = MK("coldBoards"), L0 = MK("lapse0"), DS = window.DAYSTEP;
  // 1 the silent cold open: a kettle far off, a bird outside, the fridge hum, one curious note; two soft board slides; no music
  R.hum.push([0, S.title.t0 + .2]); R.birds.push([.3, S.title.t0]); E(.5, "kettle"); E(2.0, "koel"); E(1.1, "curious"); E(tb + .1, "slide"); E(tb + .55, "slide"); [0, 1, 2].forEach((i) => E(tb + 1.4 + i * .12, "pop", i));
  // 2 the callback, the title
  E(W("g201", "mould") - .1, "softpop", 0); E(W("g201", "yeast") - .1, "softpop", 2); E(W("g201", "fungi") - .1, "chime"); ["slice", "bag", "days"].forEach((w, i) => E(W("g202", w) - .1, "pip", i));
  E(S.title.t0 + .05, "whoosh"); E(MK("slam1") + .2, "slam", 0);
  // 3 the game
  E(S.game.t0 + .15, "sting"); { const b = "g301"; [0, .5, 1].forEach((d, i) => E(W(b, "one") + d, "pip", i)); E(W(b, "little") - .1, "curious"); E(W(b, "spot") - .1, "softpop", 2); }
  // 4 goals, countdown
  ["g402", "g403", "g404"].forEach((id, i) => E(LT(id) - .06, "softpop", i)); ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  // 5 Day 1: the slice slides into the bag, the zip, a click
  R.hum.push([S.day1.t0, S.patches.t1]); E(W("g501", "slice") - .1, "slide"); E(W("g501", "seal") - .05, "zip"); E(W("g501", "seal") + .55, "click"); E(W("g501", "one") - .15, "pip", 0);
  // 6 ten days (calm bed, a soft tick per day, a low "ooh" on Day 4, two quiet soft pops while the hidden snail is on the window), HOLD ON!
  C(S.days.t0 + .1, S.holdon.t0 + .3); for (let d = 2; d <= 10; d++) E(L0 + (d - 2) * DS, "tick", 0); E(L0 + 2 * DS + .05, "lowooh"); E(L0 + 2.5 * DS, "softpop", 3); E(L0 + 6.5 * DS, "softpop", 3);   // the hidden snail is on the window during these two nights E(MK("day10") - .05, "tag", 1);
  { const a = "g602", b = "g603", c = "g604", r0 = MK("ring0_1"); E(W(a, "fuzzy") - .1, "curious"); E(W(a, "sniff") - .1, "boop", 1);
    E(W(b, "something") - .1, "boop", 2); E(W(b, "hold") - .1 + .14, "stamp"); ringTicks(r0, 5).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 5, "bell"); E(r0, "bellicon"); E(W(c, "one") - .1, "coin"); E(W(c, "never") - .1, "pop", 1); E(W(c, "bag") - .1, "chime2", 0); E(LT("g605") + .1, "boop", 0); }
  // 7 what the fuzzy patches are ("Is it dust?" was cut): three soft pops (Day 4, 6, 10), the key-word chime, two pips (one fungus, many fungi)
  [0, 1, 2].forEach((i) => E(LT("g702") + .1 + i * .35, "softpop", i)); E(W("g704", "fungus") - .1, "pip", 0); E(W("g704", "fungi") - .1, "pip", 2);
  // 8 Round 1
  E(S.r1card.t0, "roundcard"); { const L = "g801"; E(W(L, "nobody") - .1, "boop", 1); lock(MK("ring0_2"), 5, "g802", ["g803", "g804"], [W(L, "one", 1), W(L, "two"), W(L, "three")]); E(MK("momoFlip") + .1, "pick", 2); }
  // 9 BE A SPORE: the calm wonder pad; a soft thud on landing; the zip far away; drips; a slow rise. No game sounds.
  E(W("g901", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.reveal.t0 + .5]);
  for (let i = 0; i < 3; i++) E(MK("dive") + 1.4 + i * 1.3, "drip", i); E(MK("land") + .25, "softthud"); E(W("g904", "closes") - .05, "zipfar");
  for (let i = 0; i < 4; i++) E(MK("threads") + .5 + i * .9, "drip", i + 1); E(W("g906", "breaks") - .1, "crack", 1); for (let i = 0; i < 4; i++) E(MK("absorb") + .3 + i * .55, "drip", i + 2); E(W("g907", "absorb") - .1, "chime2", 1); E(MK("patch") + .3, "leafrise");
  // 10 the reveal, Mark Sentence 1
  E(S.reveal.t0, "whooshout"); E(W("g1001", "two") - .1, "tag"); E(W("g1001", "bread") - .1, "pop", 2); mark("g1002", "g1003"); E(W("g1004", "one") - .1, "coin");
  // 11 the mushroom: a slide, three soft pops, a boing; the spores on the wind; Mark Sentence 2
  E(S.mushroom.t0 + .1, "slide"); ["cap", "stalk", "gills"].forEach((w, i) => E(W("g1101", w) - .1, "softpop", i)); E(W("g1102", "cap") - .05, "boing"); E(MK("gillsdust") + .3, "flip");
  E(W("g1103", "wind") - .2, "wind"); E(W("g1103", "dispersed") - .1, "wind"); mark("g1104", "g1105");
  // 12 Round 2 (a short 3 s ring), the trays, the four boards
  E(S.r2card.t0, "roundcard"); lock(MK("ring0_3"), 3, "g1202", [], [W("g1201", "one"), W("g1201", "two")]); [0, 1, 2].forEach((i) => E(LT("u1203") + .01 + i * .05, "pick", i)); E(W("g1205", "yes") - .05, "chime");
  E(LT("g1206") - .05, "boop", 1); E(MK("traysIn") + .05, "slide"); E(MK("traysIn") + .4, "slide"); E(LE("g1207") + .1, "chime2", 0);
  ["b_mush", "b_dough", "b_tempeh", "b_mould"].forEach((k, i) => { E(MK(k) + .05, "hop", i); E(MK(k) + .35, "softpop", i); });
  E(W("g1209", "never") - .1, "pop", 1); E(W("g1210", "rise") - .6, "leafrise"); E(MK("b_mould") + .5, "lowdrum", .35); E(W("g1213", "one") - .1, "coin");
  // 13 the score hand, the hidden animal (the snail on the window)
  E(S.final.t0 + .1, "sting"); E(W("g1301", "high") + .2, "slap"); E(W("g1301", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "softpop", 1); E(S.liz.t0 + 1.4, "chime2", 0);
  // 14 the cliffhanger: the bin lid, running water, a low drum, a slam
  { const L = "g1401"; E(S.cliff.t0 + .1, "whoosh"); E(W(L, "bin") + .1, "binlid"); R.water.push([W(L, "wash") - .3, LE("g1403") + .3]); E(W("g1402", "clean") + .1, "curious"); E(W("g1403", "what") - .1, "lowdrum"); E(W("g1403", "find") - .1, "slam", 1); }
  G(S.title.t0 + 1.0, S.count.t0 - .2); G(S.day1.t0 + .2, S.days.t0); G(S.holdon.t0, LT("g603") - .1); G(LT("g604"), S.patches.t0 + .2); C(LE("g702"), S.r1card.t0); G(S.r1.t0, MK("ring0_2")); G(LT("g803") - .5, S.waitw.t1 - 1.5);
  G(S.reveal.t0 + 1.0, LT("g1002") - .3); C(LE("g1003") + .3, S.mushroom.t0); G(S.mushroom.t0 + .3, MK("gillsdust")); C(MK("gillsdust") + .2, S.mark2.t0); C(LE("g1105") + .3, S.r2card.t0);
  G(S.r2.t0, MK("ring0_3")); G(LT("u1203") - .3, MK("traysIn")); C(MK("traysIn") + .2, S.final.t0); G(S.final.t0, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.cliff.t0); C(S.cliff.t0 + .3, S.nyk.t0 - .2);
  } else {
  // 1-2 the calm recap under "Last time..." (rulebook section 2, 21 Nov: no montage, no clacks): the calm bed, a pluck, one soft pop as each of
  // the three pictures settles (the picture changes at RECAP2 and RECAP3, set in p2.js from the same words), running water for the hands
  C(S.lasttime.t0 + .1, S.pipclean.t0); R.hum.push([S.lasttime.t0, S.goals.t0]); E(LT("j201"), "pluck", 0); E(S.lasttime.t0 + .25, "softpop", 0); E(W("j201", "yeast") - .3, "softpop", 1); E(W("j201", "then") - .3, "softpop", 2); R.water.push([W("j201", "washed") - .3, S.pipclean.t0 + 1.2]);
  E(LT("j202") - .05, "boop", 1); E(W("j203", "microscope") - .1, "curious");
  // 3 goals, the game
  ["j252", "j253", "j254"].forEach((id, i) => E(LT(id) - .06, "softpop", i)); E(S.game.t0 + .15, "sting"); E(W("j301", "little") - .1, "curious"); E(W("j301", "spot") - .1, "softpop", 2);
  // 4 the microscope (a slide, a pop, the key-word chime), three microscopes (three rising notes, a soft zoom), the three shapes
  E(S.microscope.t0 + .1, "slide"); E(S.microscope.t0 + .55, "softpop", 1); [0, 1, 2].forEach((i) => E(S.scopes.t0 + .3 + i * .55, "rise", i * 2)); E(W("j402", "smaller") - .3, "whoosh");
  ["rod-shaped", "sphere-shaped", "spiral-shaped"].forEach((w, i) => E(W("j403", w) - .1, "softpop", i)); E(W("j404", "bacterium") - .1, "pip", 0); E(W("j404", "bacteria") - .1, "pip", 2); E(LE("j405") + .1, "chime");
  // 5 BE A BACTERIUM: the calm pad; far canteen chatter; water; bubbles; a long soft whoosh down the drain
  E(W("j501", "be") - .2, "pop", 2); E(S.waitw.t1 - .6, "shrink"); R.wonder.push([MK("dive") + .5, S.pullout.t0 + .4]); for (let i = 0; i < 3; i++) E(MK("dive") + 1.4 + i * 1.4, "drip", i);
  R.chatter.push([MK("recess") - .2, MK("wash") + .6]); R.water.push([W("j505", "water") - .2, MK("drain") + 1.0]); E(W("j505", "soap") - .1, "bubbles"); E(W("j505", "bubbles") - .1, "bubbles"); E(W("j505", "lift") - .1, "stretch");
  E(W("j506", "whoosh") - .1, "drain"); E(MK("clean") + .3, "leafrise");
  E(S.pullout.t0, "whooshout"); E(W("j508", "soap") - .05, "boing");
  // 6 harmful bacteria: running water, the key-word chime, a soft pop for the reminder card
  R.water.push([S.harmful.t0, LT("j601") + 2.6]); E(LT("j602") - .05, "softpop", 2); E(LT("j601") + .5, "softpop", 3); E(LT("j601") + 2.2, "softpop", 3);   // the hidden ant walks by the soap pump
  // 7 Round 1 , the yoghurt, Mark Sentence 1, the body
  E(S.r1card.t0, "roundcard"); { const L = "j701"; lock(MK("ring0_1"), 5, "j702", ["j703", "j704", "j705"], [W(L, "one", 1), W(L, "two")]); }
  E(S.yoghurt.t0 + .1, "fridge"); E(S.yoghurt.t0 + .55, "slide"); E(W("j706", "two") - .1, "tag"); mark("j707", "j708");
  E(W("j709", "body") - .1, "softpop", 0); E(W("j710", "yoghurt") - .1, "softpop", 2); E(W("j711", "one") - .1, "coin");
  // 8 the Showdown: paper, a soft tick on each clue, a drum roll, ticks, the bell, the stamp; the fix: a rub, a scribble, three pops, two coins
  E(S.showcard.t0, "roundcard"); { const a = "j801", b = "j802", c = "j803", r0 = MK("ring0_2"); E(S.show.t0 + .1, "paper");
    [["spores", 0], ["food", 0], ["spores", 1], ["food", 1], ["feathers", 0], ["food", 2]].forEach(([w, n], i) => E(W(a, w, n) - .05, "tick", 0));
    [W(b, "one"), W(b, "two"), W(b, "three")].forEach((t, i) => E(t - .05, "pip", i)); R.roll.push([LT(c), W(c, "one", 1)]); [W(c, "one", 1), W(c, "two"), W(c, "three")].forEach((t, i) => E(t - .05, "pip", i));
    ringTicks(r0, 6).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + 6, "bell"); E(r0, "bellicon"); E(LT("j804") + .06, "stamp"); E(LT("j805") + .01, "pick", 0); E(LT("j806") + .01, "pick", 1); E(LT("j807"), "boop", 2); }
  E(S.fixed.t0 + .15, "rub"); E(S.fixed.t0 + .65, "scribble"); [0, 1, 2].forEach((i) => E(S.fixed.t0 + 1.4 + i * .3, "pop", i)); E(W("j809", "two") - .1, "coin2"); E(W("j809", "two") + .5, "coin2", 1);
  // 9 the chapter map: a slide, rising notes as the branches open, soft pops for the sub-branches, a chime
  E(S.map.t0 + .1, "slide"); E(W("j901", "living") - .1, "rise", 0); [["j902", "plants"], ["j903", "animals"], ["j904", "fungi"], ["j904", "bacteria"]].forEach(([id, w], i) => E(W(id, w) - .1, "rise", 2 + i * 2));
  ["flowering", "non-flowering"].forEach((w, i) => E(W("j902", w) - .1, "softpop", i)); ["amphibians", "birds", "fish", "insects", "reptiles", "mammals"].forEach((w, i) => E(W("j903", w) - .1, "softpop", i % 4)); E(LE("j905") + .1, "chime");
  // 10 the chant (call and response)
  sayit("u1002"); chant("c1003");
  // 11 the Exam corner: a bell, Mark Sentence 2, four rising notes as the four branches light
  E(W("j1101", "exam") - .1, "bell"); sayit("j1102"); ["plants", "animals", "fungi", "bacteria"].forEach((w, i) => E(W("j1103", w, w === "plants" || w === "animals" ? 0 : 0) - .1, "rise", 3 + i * 2)); E(LE("j1103") + .25, "chime");
  // 12 the score hand, the hidden animal (the ant by the soap)
  E(S.final.t0 + .1, "sting"); E(W("j1201", "high") + .2, "slap"); E(W("j1201", "three") - .1, "pip", 2); E(S.liz.t0 + .5, "softpop", 1); E(S.liz.t0 + 1.4, "chime2", 0);
  // 13 the dare for Episode 8: three soft pops, a soft pour of sand, a curious note, a boing, a sting
  { const L = "j1301"; ["plastic", "metal", "glass"].forEach((w, i) => E(W(L, w) - .15, "softpop", i)); E(W(L, "sand") - .05, "pour"); E(W(L, "which") - .1, "curious"); E(W(L, "lock") - .1, "sting"); E(W("j1302", "crunchy") - .05, "boing"); }
  G(S.pipclean.t0 + .3, S.microscope.t0 + .2); C(S.microscope.t0 + .3, S.waitw.t0); G(S.pullout.t0 + .4, S.harmful.t0 + .3); C(S.harmful.t0 + .3, S.r1card.t0);
  G(S.r1.t0, MK("ring0_1")); G(LT("j703") - .5, S.mark1.t0); C(LE("j708") + .3, S.showcard.t0); G(S.show.t0 + .3, MK("ring0_2")); G(LT("j805") - .5, S.map.t0); C(S.map.t0 + .3, LT("u1002") - .3);
  C(S.exambanner.t0 + .4, S.final.t0); G(S.final.t0, S.dare.t0 + .3); C(S.dare.t0 + .5, S.kwrecap.t0); C(S.kwrecap.t0 + .3, S.nyk.t0 - .2);
  }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); }
  // the key-word read-along; the ending: "Say it with us!", "Ready? One, two...", "Now you know!", then the outro plays out
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
