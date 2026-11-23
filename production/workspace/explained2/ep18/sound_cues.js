// sound_cues.js: EP18 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP17, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and
// driven by the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps,
// journeys, the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for
// teaching, wonder for the journeys, birds outdoors). STAGE 2 adds the places' own life and foley on their marks (SERIES_FORMAT 9; the Sound
// line of each scene in SCENES_TODO.md): the VOID DECK (a ceiling fan's hum, children's voices far off, a bicycle bell, a far bus; the
// cicada's buzz from the rain tree in Part 1, fading as we look for it), the GARDEN'S EDGE (the hen's soft clucks: henIn, hen, nest; bees
// humming among the ixora; a bulbul), rain then the pond and a plate in the raindrop journey (a plop: jpond; frogs: jfrog; a splash:
// jsplash; a thin soft whine: jmosq), a warm hush under the hen in the egg journey (a crack: jhatch; peeps: jchick; a cluck: jhen; a
// rustle: jlay), board slides (loopsIn), a tick per chip on the SAME strip (same1, same2, same3) and a soft bong on DIFFERENT (diff3), the
// finger's whoosh round the loop (finger), day birds and night crickets (daynight), the bran rustle of the mealworm tub (beetle, meal),
// still water (wrig), the easel's strike and rewrite (strike, rewrite), a soft flutter (butterfly, lay), a magnet's clack (dareIn).
// song.js's garden bed says "no hens" (EP15): EP18's garden edge HAS the hen.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|eggans|fix|dare|cliff)$/, CALM = /^(lasttime|board|lc|mark|beetle|closure|place|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^(place|board|answer|eggans|holdon|beetle|closure|show|fix|dare|cold|back|cliff)$/.test(s.name)) BD(s.t0, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "k301a" : "d201a"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (mk("loopsIn") !== undefined) [0, .3].forEach((d) => E(mk("loopsIn") + d, "slide"));
  if (mk("cardsIn") !== undefined) [0, .3].forEach((d) => E(mk("cardsIn") + d, "slide"));
  if (mk("budsIn") !== undefined) [0, .15, .3].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (has("k203")) ["one", "two"].forEach((w, i) => E(W("k203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["k402", "k403", "k404"] : ["d302", "d303", "d304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "k502", ["k503", "k504", "k505"]); lock("hold", 5, null, []); if (has("k1002")) E(W("k1002", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "d402", ["d403", "d404", "d405"]); lock("show", 5, "d803", ["d804b"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["k901", "k902"], ["k1106", "k1107"]] : [["d705", "d706"], ["d905", "d906"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "k1201" : "d1201"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "k1202" : "d1202", HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); BD(S.liz.t0, S.liz.t1); }
  if (S.cliff && has("k1302")) { E(LT("k1302") - .2, "lowdrum"); E(W("k1302", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25, .5].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("d1301", "lock") - .1, "sting"); }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): the VOID DECK (R.deck: the fan's hum, far children, birds outside, a far bus) and
  // the GARDEN'S EDGE (R.garden: birds, far children, leaves; R.hens: the hen's clucks only while she is on screen); rain over the pond; foley ON
  // the marks. No ambience one-shot under a countdown (only the ticks keep time).
  { const DECK = PART === 1 ? ["cold", "back", "title", "board", "answer", "holdon", "liz"] : ["show", "fix", "beetle", "dare"], GARD = PART === 1 ? ["cliff"] : ["place", "waitw", "pullout", "eggans", "closure", "liz"];
    const spans = (L) => { const out = []; for (const sc of TL.scenes) if (L.includes(sc.name)) { const last = out[out.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else out.push([sc.t0, sc.t1]); } return out.filter(([a, b]) => b - a > 1); };
    R.deck.push(...spans(DECK)); R.garden.push(...spans(GARD)); const all = [...R.deck, ...R.garden]; R.birds = R.birds.filter(([a, b]) => !all.some(([x, y]) => a >= x - .1 && b <= y + .1));
    const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }), clk = (t, i = 0) => E(t, "pop", i % 3);
    if (PART === 1) {
      // the void deck: a cicada's buzz from the rain tree that fades as we look for it; a bicycle bell as the child passes; the cicada on its name
      E(.3, "cicada", 2.4); E(1.4, "bikebell"); E(W("k301a", "cicada") + .1, "cicada", 1.0); E(W("k1202", "cicada") + .3, "cicada", 1.0);
      if (S.board) E(LT("k601m") + .3, "tap");
      // the look-closer: a tick as each chip lands on the SAME strip; a soft bong as the ? waits on DIFFERENT
      E(mk("same1") + .5, "tick", 1); E(mk("same1"), "plip"); E(mk("same2") + .6, "tick", 1); E(mk("same2") + .1, "boop", 1); E(mk("count") + .3, "boop", 2);
      // be a raindrop: the shower; a plop into the pond, bubbles, frogs calling, a splash, still water, a thin soft whine
      if (S.waitw) R.rain.push([S.waitw.t0 + .3, S.pullout.t0]);
      if (S.shrink) { for (let t = mk("jpond") + .6, i = 0; t < mk("jsplash"); t += 1.1 + .4 * (i % 3), i++) E(t, "bubble", i); sfx(mk("jpond") + .3, "underwater.wav", .06, "wonder"); }
      sfx(mk("jpond") - .05, "ep06_plop.wav", .2, "wonder"); E(mk("jtadpole") + .3, "bubble", 2); E(mk("jfrog") + .2, "ribbit"); E(mk("jfrog") + 1.6, "ribbit"); sfx(mk("jsplash") - .05, "splash.wav", .2, "wonder");
      E(mk("jwrig"), "drip", 1); E(mk("jpupa"), "rise", 1); E(mk("jmosq") + .4, "whine"); E(mk("jmosq") + 1.5, "whine");
      // the answer: two soft dot-pops; HOLD ON!: Pip's sheet rustles, the empty chip pops
      E(mk("three"), "softpop", 0); E(mk("four"), "softpop", 1); E(mk("pipboard") - .1, "paper"); E(W("k1004b", "young") - .2, "pop", 2);
      // the young: a frog's croak, a grasshopper's click, a tick and a bong on the chips
      E(mk("tad") + .1, "ribbit"); E(mk("nymph") + .1, "chek", .7); E(mk("same3"), "tick", 1); E(mk("diff3"), "boop", 1);
      // the cliffhanger: the hen's soft clucks
      if (S.cliff) R.hens.push([S.cliff.t0, S.cliff.t1]); E(mk("hen"), "cluck"); E(mk("nest"), "cluck", .8); E(mk("nest") + .3, "rustle");
    } else {
      // the garden: the hen stands and turns her eggs; bees hum among the ixora; the bee's buzz on its name
      for (const n of ["place", "waitw", "pullout", "eggans"]) if (S[n]) R.hens.push([S[n].t0, S[n].t1]);
      E(mk("henIn"), "cluck"); E(mk("henIn") + .7, "rustle"); E(13.9, "bzz", 1.2); E(W("d201a", "honeybee") + .1, "bzz", .9); E(W("d1202", "honeybee") + .3, "bzz", .9);
      // be an egg: a warm hush and a heartbeat under the hen; crack!; peeps; a cluck; a rustle; a whoosh round the golden circle
      if (S.shrink) { for (let t = mk("jegg") + .4; t < mk("jhatch") - .3; t += 1.1) E(t, "heartbeat"); }
      E(mk("jhatch"), "crack"); E(mk("jhatch") + .25, "crack", 1); E(mk("jchick") - .2, "peep"); E(mk("jchick") + 1.2, "cheep", 1); for (let k = 0; k < 4; k++) sfx(mk("jchick") + 2 + k * 1.3, "ep05_peck.wav", .12, "wonder");
      E(mk("jhen"), "cluck"); E(mk("jlay"), "rustle"); E(mk("jagain") + .2, "leafrise");
      // the loop: a soft tick as the finger lands and a whoosh round; day birds then night crickets
      E(mk("finger"), "tick", 1); E(mk("finger") + .2, "whoosh"); E(mk("finger") + 3.8, "tick", 1); E(mk("daynight"), "morning"); R.night.push([mk("daynight") + 2, mk("daynight") + 4.2]);
      // the Showdown: paper on each line; the fix: a marker strike and a squeak of the green marker
      ["l1", "l2", "l3"].forEach((k) => E(mk(k), "paper")); E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble");
      // the mealworm tub: bran rustling; the larvae: a drip of still water, dry bran
      if (S.beetle) { E(S.beetle.t0 + .3, "rustle"); sfx(S.beetle.t0 + 1.2, "ep05_leaf.wav", .1, "game"); }
      E(mk("wrig") + .1, "drip", 2); E(mk("meal") + .1, "rustle");
      // why life cycles matter: a soft flutter, a tiny tick as the egg is laid, a warm chime as the board's answers light
      E(mk("butterfly") - 1.2, "flutter"); E(mk("butterfly") - .3, "flutter"); E(mk("lay") + .3, "plip"); E(mk("plant") + .2, "leafrise"); E(mk("theme") - .5, "chime");
      // the dare: the magnet's soft clack on the board
      E(mk("dareIn") + .2, "clack");
    } }
  // no ambience one-shots under a countdown (only the ticks keep time)
  { const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "drip", "chek", "ribbit", "cluck", "peep", "bubble", "cicada", "bzz"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
