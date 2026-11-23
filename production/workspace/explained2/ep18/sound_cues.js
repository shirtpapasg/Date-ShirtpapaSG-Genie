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
window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and driven by
// the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps, journeys,
// the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for teaching,
// wonder for the journeys, birds outdoors). STAGE 2 adds the garden's own life and foley on their marks (SERIES_FORMAT 9; the script's Sound
// column): the pond at dawn (frogs calling, fading as the light comes; drips from the leaves; ripples as the tadpoles pass: wriggle), the
// grass (rustle, grasshopper clicks: hop; the hen's clucks and the chicks' peeps: henIn, peck; a far bus); underwater hush and bubbles in
// the frog-egg journey (a soft bloop as the fish bumps the jelly: fish; a pop as you hatch: jhatch; a splash and birds at jpad); munching
// (jeat), a tight creak (jtight), a soft crack (jsplit), an unfolding rustle (jwings); a click per label in the look-closers; the easel's
// strike (strike); a croak on the tree frog's name. song.js's garden bed has "no hens" (EP15): EP16's grassy edge DOES have the hen.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [] };
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
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
