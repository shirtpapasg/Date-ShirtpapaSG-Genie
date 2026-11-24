// sound_cues.js: EP22 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP21, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and
// driven by the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps,
// journeys, the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for
// teaching, wonder for the journeys, EP18's outdoor bed R.deck (voices far off, birds) under the hardware shop and the neighbourhood
// centre's square (Part 1) and EP14's indoor room bed R.room (a soft room hum, birds through a window) under the school maker space (Part 2)), plus the marks' main foley (the
// strokes' metal swish, the lift's whoosh, the clips' tinkle as they jump, the box lid's clap, the new nail's click onto the magnet, the
// stroke ticks, the back-and-forth scratch, the paper fish's splash, the reel's click, the coil's click on the battery holder).
// STAGE 2 adds the places' own life and foley on their marks (SERIES_FORMAT 9; the Sound line of each scene in SCENES_TODO.md): the
// HARDWARE SHOP at an HDB neighbourhood centre on Saturday morning (shoppers' chatter, a market trolley's wheels, the shop's wind chime, a
// bicycle bell, cups clinking at a coffee shop far off, a radio inside the shop, the woodpecker's tap-tap-tap from the trees), the SCHOOL
// MAKER SPACE on Monday after school (the ceiling fans, the 3D printer's soft hum and clicks, children's voices in the corridor, a far-off
// school bell, a stapler's clack, the ant's tiny patter at the reveal), the journeys (the table's creak and a long warm metal whoosh as the
// giant magnet slides along you, a soft rising whoosh as it lifts away; a faint metal jingle as the clips settle round you, a low weak hum
// for Basil's nail that fades, a stronger rising hum for Pip's, a bright tinkling rush as you jump, a soft clink as a friend clings).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|r1ans|fix|dare|cliff|pond)$/, CALM = /^(lasttime|today|pipclaim|lcq2|ask|lc2q|lc|mark|maker|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^lc[a-z]/.test(s.name) && !/^lc2q|^lcq2/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the place's bed (Part 1: EP18's outdoor R.deck under every hardware-shop scene; Part 2: the indoor R.room under every maker-space
  // scene); joined across short gaps
  { const OUT = PART === 1 ? ["cold", "back", "title", "today", "answer", "pipclaim", "holdon", "lcq2", "liz", "cliff"] : ["maker", "r1ans", "ask", "show", "fix", "lc2q", "pond", "dare", "liz"], key = PART === 1 ? "deck" : "room";
    for (const sc of TL.scenes) if (OUT.includes(sc.name)) { const last = R[key][R[key].length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R[key].push([sc.t0, sc.t1]); }
    R[key] = R[key].filter(([a, b]) => b - a > 1); }
  // the cold open: Pip's three strokes (a soft metal swish each, a rising whoosh on each lift), the buddies lean in
  if (mk("stroke0") !== undefined) [0, 1.4, 2.8].forEach((d) => { E(mk("stroke0") + d, "rub"); E(mk("stroke0") + d + .8, "rise"); });
  if (mk("budsIn") !== undefined) [0, .15].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (mk("board") !== undefined) E(mk("board") + .1, "chime");
  if (mk("rods") !== undefined) E(mk("rods"), "softpop", 1);
  if (mk("pondIn") !== undefined) { E(mk("pondIn"), "chime"); E(mk("pondIn") + .3, "plip"); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "m303" : "n201"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (has("m203")) ["one", "two"].forEach((w, i) => E(W("m203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["m402", "m403", "m404"] : ["n302", "n303", "n304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "m502", ["m503m", "m504p", "m505b"]); lock("hold", 5, null, []); if (has("m902")) E(W("m902", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "n402", ["n403b", "n404p", "n405m"]); lock("show", 5, "n803", ["n804b"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // the picks' little pictures (Part 1 Round 1: the magnet moving away; the uncle's screwdriver)
  if (mk("away") !== undefined && PART === 1) E(mk("away") + .1, "whoosh");
  if (mk("uncle") !== undefined) E(mk("uncle") + .2, "click");
  // the topic's own foley on its marks. Part 1's journey: the giant magnet lands on your head (a soft bump), slides to your tip (a long
  // metal swish), lifts up and away (a rising whoosh), comes back (a bump), again (swish, rise), the carry (a whoosh), the clips jump
  // (a bright tinkle). Part 2's journey: the giant nail comes (a low rumble), Basil's nail hardly pulls (a faint wobble), it goes (a fall),
  // Pip's nail (a rumble), you jump (a tinkle), a friend clings (a click)
  if (mk("jhead") !== undefined) E(mk("jhead") + .1, "thup");
  for (const k of ["jslide"]) if (mk(k) !== undefined) E(mk(k), "rub");
  for (const k of ["jlift", "lift"]) if (mk(k) !== undefined) E(mk(k) + .1, "rise");
  if (mk("jback") !== undefined) E(mk("jback") + .2, "thup");
  if (mk("jagain") !== undefined) [0, 1.2, 2.4].forEach((d) => { E(mk("jagain") + d, "rub"); E(mk("jagain") + d + .6, "tick", 1); });
  if (mk("jcarry") !== undefined) E(mk("jcarry"), "whoosh");
  for (const k of ["jclips", "pipjump", "jumpmag", "jjump", "test", "dip"]) if (mk(k) !== undefined) E(mk(k) + .15, "sparkle");
  for (const k of ["jnail1", "jpip"]) if (mk(k) !== undefined) E(mk(k), "rumble");
  if (mk("jwobble") !== undefined) E(mk("jwobble") + .1, "pip", 0);
  if (mk("jgone") !== undefined) E(mk("jgone") + .3, "whoosh");
  if (mk("jfriend") !== undefined) E(mk("jfriend") + .1, "click");
  // the look-closers and the scenes: the paper bag's rustle, the new nail's click onto the magnet, the box lid's clap (every time the magnet
  // is put away), the strokes' ticks, the stacked arrows' ticks, Basil's back-and-forth scratch, the fish's splash, the reel and the big fish
  if (mk("new") !== undefined) E(mk("new"), "cloth");
  if (mk("pull") !== undefined) E(mk("pull") + .3, "clack");
  for (const k of ["boxed", "boxit", "away2"]) if (mk(k) !== undefined) E(mk(k) + .3, "thup");
  if (PART === 2 && mk("away") !== undefined) E(mk("away") + .3, "thup");
  if (mk("try") !== undefined) E(mk("try"), "rub");
  if (mk("chipfar") !== undefined) E(mk("chipfar") + .2, "chime", 0);
  if (mk("stroke") !== undefined) [0, .5, 1.0, 1.5].forEach((d) => E(mk("stroke") + d, "rub"));
  if (mk("check") !== undefined) [0, .6, 1.2, 1.8].forEach((d) => E(mk("check") + d, "tick", 0));
  if (mk("list") !== undefined) [0, .25, .5, .75, 1.0].forEach((d) => E(mk("list") + d, "tick", 1));
  if (mk("slide") !== undefined) E(mk("slide"), "rub");
  if (mk("never") !== undefined) E(mk("never") + .2, "scribble");
  if (mk("again") !== undefined) [0, .5, 1.0, 1.5].forEach((d) => E(mk("again") + d, "tick", 1));
  if (mk("count") !== undefined) [0, .3, .6, .9, 1.2, 1.5].forEach((d) => E(mk("count") + d, "tick", 0));
  for (const k of ["rub", "compare"]) if (mk(k) !== undefined) [0, .2, .4].forEach((d) => E(mk(k) + d, "rub"));
  if (mk("flip") !== undefined) E(mk("flip") + .1, "flip");
  if (mk("slip") !== undefined) E(mk("slip") + .4, "plip");
  if (mk("bigfish") !== undefined) { E(mk("bigfish"), "click"); E(mk("bigfish") + .3, "reveal"); E(mk("bigfish") + .5, "sparkle"); }
  if (mk("chart") !== undefined) E(mk("chart"), "scribble");
  if (mk("coil") !== undefined) { E(mk("coil"), "cloth"); E(mk("coil") + .4, "click"); }
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  if (mk("nopoint") !== undefined) E(mk("nopoint") + .1, "softpop", 0);
  // the cream book strips (7.2 step 4, 7.2 step 3): a soft chime as the strip lands
  if (mk("strip") !== undefined) E(mk("strip") + .2, "chime", 0);
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m808", "m809"], ["m1006", "m1007"]] : [["n706", "n707"], ["n907", "n908"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1101" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { const L = PART === 1 ? "m1102" : "n1102"; E(S.liz.t0 + .1, "whoosh"); E(W(L, HIDDEN[0]) + .2, "sparkle"); E(W(L, HIDDEN[0]) + .5, PART === 1 ? "cheep" : "pip"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  if (S.cliff && has("m1202")) { E(LT("m1202") - .2, "lowdrum"); E(W("m1202", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("n1201", "lock") - .1, "sting"); }
  // the Showdown's paper and the fix (Pip's poster lines, the strike, the green rewrite)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); } }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
