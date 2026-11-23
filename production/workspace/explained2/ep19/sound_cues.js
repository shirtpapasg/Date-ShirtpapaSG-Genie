// sound_cues.js: EP19 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP18, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and
// driven by the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps,
// journeys, the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for
// teaching, wonder for the journeys, EP18's void deck bed R.deck under every void deck scene, birds outdoors). STAGE 2 adds the places' own
// life and foley on their marks (SERIES_FORMAT 9; the Sound line of each scene in SCENES_TODO.md): the VOID DECK on a Saturday afternoon
// (the ceiling fan's hum, children's voices from the playground, a bicycle bell, the lift's soft ding, a pigeon's coo from above: cold, the
// game, the reveal), the RECYCLING CORNER after a shower (drips from the void deck's edge, a gurgling drain, birds, a far-off rubbish truck,
// a tinny rattle of cans: cans), the PLAYGROUND (a swing's creak: swing); the magnet's foley (a soft clack as it is lifted off the frame:
// magOff; a pin's tiny tick and the wire's soft clink: pinIn; three card slides: cardsIn; a scrape as the paint peels back: inside; six pops
// for the shapes: shapes; a heavy wok's scrape and a strain wobble: wok; a soft clack as the magnet holds on: letgo; a slow-motion whoosh and
// a click: slow, gap); the steel-pin journey (the fan becomes a deep slow hum; a low rumble as the magnet slides near: jfar; a rising
// shimmer: jtug; a whoosh and a bright CLICK: jslide, jclick; a whoosh up: jlift); the aluminium-can journey (a hollow clunk: jclunk; a
// truck's rumble: jtruck; the belt's steady rattle: jbelt; the big magnet's hum: jmagnet; a ringing CLANG: jclang; rolling on: jroll); the
// look-closers (a soft whoosh as the magnet passes each object and a little silence where nothing moves: pass; a gentle bong per blue tag; a
// tick for each object that moves and a hush for each that does not: near; two tray chimes: groups); the easel's strike and rewrite; two soft
// magnet clicks and a gentle boing as the top ring floats (rings).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|tinans|fix|dare|cliff)$/, CALM = /^(lasttime|table|theme|sticky|interact|lc|mark|place|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^(place|interact)$/.test(s.name)) BD(s.t0, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the void deck's bed (EP18's R.deck: the fan's hum, far children, a far bus) under every void deck scene; joined across short gaps
  { const DECK = PART === 1 ? ["cold", "back", "title", "theme", "table", "answer", "holdon", "sticky", "liz", "cliff"] : ["tinans", "table", "show", "fix", "dare", "liz"];
    for (const sc of TL.scenes) if (DECK.includes(sc.name)) { const last = R.deck[R.deck.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R.deck.push([sc.t0, sc.t1]); }
    R.deck = R.deck.filter(([a, b]) => b - a > 1); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "m302" : "n202"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (mk("theme") !== undefined) E(mk("theme") + .3, "chime");
  if (mk("magOff") !== undefined) E(mk("magOff") + .1, "clack");
  if (mk("pinIn") !== undefined) [0, .3].forEach((d, i) => E(mk("pinIn") + d, "softpop", i));
  if (mk("cardsIn") !== undefined) [0, .3, .6].forEach((d) => E(mk("cardsIn") + d, "slide"));
  if (mk("budsIn") !== undefined) [0, .15, .3].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (has("m203")) ["one", "two", "three"].forEach((w, i) => E(W("m203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["m402", "m403", "m404"] : ["n302", "n303", "n304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "m502", ["m503m", "m504p", "m505b"]); lock("hold", 5, null, []); if (has("m902")) E(W("m902", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "n402", ["n403m", "n404p", "n405b"]); lock("show", 5, "n803", ["n804m"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m608", "m609"], ["m1008", "m1009"]] : [["n708", "n709"], ["n907", "n908"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1101" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "m1102" : "n1102", HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  if (S.cliff && has("m1202")) { E(LT("m1202") - .2, "lowdrum"); E(W("m1202", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("n1201", "lock") - .1, "sting"); }
  // the Showdown's paper and the fix (generic: the easel's lines, the marker)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); } }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): the void deck's life and foley ON the marks (SCENES_TODO's Sound lines).
  { const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus });
    if (PART === 1) {
      E(.4, "coo"); E(2.6, "bikebell"); E(3.1, "lift"); if (S.game) E(W("m302", "pigeon") + .15, "coo", .9);
      // the look-closer: wind over the hills and a far bell in the story; nails clink on the lodestone; the paint peels back; six pops for the shapes
      if (S.lcmagnet) { sfx(mk("rock") - .2, "wind.wav", .05); E(mk("rock") + .6, "windchime", 1); E(mk("lodestone") + .2, "clink"); E(mk("lodestone") + .5, "clink"); E(mk("inside") + .05, "rub"); for (let i = 0; i < 6; i++) E(mk("shapes") + i * .35, "softpop", i); }
      // be a steel pin: the fan's deep slow hum, the magnet's rumble, a rising shimmer, a whoosh and a bright CLICK, a whoosh up
      if (S.shrink) { for (let t = mk("dive") + .3; t < S.shrink.t1 - 1; t += 2.4) E(t, "hum"); E(mk("jfar"), "rumble"); E(mk("jfar") + 1.2, "rumble"); sfx(mk("jtug"), "riser.wav", .08, "wonder"); E(mk("jslide"), "whoosh"); E(mk("jclick"), "click"); E(mk("jclick") + .02, "clink"); E(mk("jlift"), "whoosh"); }
      // the answer: the pin's tiny click into the tray; the wire's soft slide
      E(mk("trayPin"), "tap"); E(mk("trayWire") - .5, "slide");
      // HOLD ON!: the heavy wok set down and a strain wobble; the magnet's soft clack as it holds on; the fridge door's soft thud
      E(mk("wok") - .6, "potthud"); E(mk("wok") + .4, "rub"); E(mk("wok") + 1.4, "rub"); E(mk("letgo"), "clack"); E(mk("fridge"), "thup");
      if (has("m1001b")) E(LT("m1001b") + .3, "tap");
      // slow motion: a slow whoosh; a soft tick as the pin starts to move, a click as it lands
      E(mk("slow"), "clangslow"); E(mk("gap") + .3, "tick"); E(mk("gap") + 2.2, "click");
      // the reveal: a coo; wings on ff_fly; a coo at home
      if (S.liz) { E(W("m1102", "pigeon") + .5, "coo"); E(mk("ff_fly"), "flutter"); E(mk("ff_home") + .9, "coo", .8); }
      if (S.cliff) E(mk("wire") + .1, "whoosh");
    } else {
      // after the shower: drips at the void deck's edge, a gurgling drain, a far rubbish truck; Part 2's void deck scenes also get the deck bed
      const WET = ["place", "waitw", "pullout", "tinans", "table", "show", "fix", "dare", "liz"];
      for (const sc of TL.scenes) if (WET.includes(sc.name)) { for (let t = sc.t0 + .4, i = 0; t < sc.t1 - .3; t += 1.3 + .5 * (i % 3), i++) E(t, "drip", i % 3); const last = R.deck[R.deck.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = Math.max(last[1], sc.t1); else R.deck.push([sc.t0, sc.t1]); }
      if (S.place) { sfx(S.place.t0 + .2, "ep06_gurgle.wav", .05); E(S.place.t0 + 1.0, "rumble"); }
      E(mk("cans"), "jingle"); E(mk("cans") + .4, "set"); E(mk("cans") + .7, "set"); if (S.game) E(W("n202", "snail") + .2, "plip");
      // be an aluminium can: clunk, the truck, the belt's rattle, the big magnet's hum, CLANG x3, rolling on, the cans tumble
      if (S.shrink) { E(mk("jclunk"), "clunk"); E(mk("jclunk") + .05, "lid"); E(mk("jtruck"), "mrt"); sfx(mk("jbelt"), "ep03_belt.wav", .1, "wonder"); for (let t = mk("jmagnet"); t < mk("jroll") + 3; t += 2.4) E(t, "hum");
        [0, 1.3, 2.6].forEach((d) => E(mk("jclang") + d + .45, "clang")); sfx(mk("jroll"), "ep03_roll.wav", .1, "wonder"); [0, .2, .45].forEach((d, i) => E(S.shrink.t1 - 3.3 + d, "clink")); }
      if (S.pullout) E(S.pullout.t0 + .4, "clack"); E(mk("ansglow") + .1, "set");
      // not all metals: a soft whoosh as the magnet passes each object, a gentle bong as each blue tag lands; two ticks as iron and steel jump
      if (S.lcmetals) { for (let i = 0; i < 8; i++) { const ta = mk("pass") + (i >= 4 ? 3 : 0) + (i % 4) * .7 + .35; E(ta - .25, "whoosh"); E(ta, "boop", i % 3); } E(mk("metals") + 1.0, "tick", 1); E(mk("metals") + 1.6, "tick", 1); }
      E(mk("test") + .2, "whoosh");
      // the playground: birds, drips; the swing's creak three times
      if (S.interact) { R.birds.push([S.interact.t0, mk("kw_interact")]); E(mk("swing"), "creak"); E(mk("swing") + 1.3, "creak"); E(mk("swing") + 2.6, "creak"); E(W("n903p", "pulls"), "click"); }
      // how magnets interact: a tick for each object that moves, a hush for each that does not; two tray chimes as the halves are named
      if (S.lcinteract) { [1, 0, 1, 0, 1, 0].forEach((mg, i) => { const a = mk("near") + i * 1.2; E(a - .2, "whoosh"); E(a + .3, mg ? "click" : "pff"); }); E(mk("groups"), "chime2", 0); E(mk("groups") + .3, "chime2", 1); }
      if (S.liz) { [0, .3, .7].forEach((d, i) => E(mk("ff_deep") + d, "bubble", i)); E(mk("ff_magnet") + .4, "click"); }
      if (S.dare) { E(mk("rings"), "click"); E(mk("rings") + .5, "click"); E(mk("float"), "boing"); }
    }
    // no ambience one-shot under a countdown (only the ticks keep time)
    const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "drip", "coo", "bikebell", "lift", "plip"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
