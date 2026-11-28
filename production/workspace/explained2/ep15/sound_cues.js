// sound_cues.js: EP15 STAGE 1 sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP14, every sound hangs on the SAME mark the picture uses (script.py lists them). Stage 1 is GENERIC and driven by
// the timeline: the rituals (round cards, lock-in ticks / bell / stamp, picks, Mark Sentences, key-word chimes, verdict stamps, journeys,
// the chant, the score hand, the reveal, the read-along, the "Now you know!" blast) and the beds (groove for the game, calm for teaching,
// wonder for the journeys, birds outdoors). STAGE 2 adds the places' own life and foley on their marks (SERIES_FORMAT 9: rain drips and a
// wind chime in the corridor; birds, a far bus, the pond in the garden; a knife on the board (cutmango, cutfruit), soil pats (soilpat), a
// little water (water), a pencil on paper (write), a sniff (smell), the root's soft creak (root), the shoot's pop (shoot), the ruler's clack
// (rulerin, rtable, rzero), tile hops (tseed, tyoung, tadult, tback), a strike (strike), the seed bank's cold-room door hum (cold) ...).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); }, BD = (a, b) => { if (b > a + 1) R.birds.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|adultans|seedans|fix|dare|cliff)$/, CALM = /^(lasttime|plant|lc|mark|measure|strip|seeds|nomore|ring|fruitcut|place|kwrecap|back|pullout)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 + .5, s.t1 + .5]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0 + .2, s.t1);
    if (/^(place|plant|measure|holdon|seeds|nomore|fruitcut|ring|dare|cold|back)$/.test(s.name)) BD(s.t0, s.t1);
    if (/^lc/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "g301a" : "j201a"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (mk("boardsIn") !== undefined) [0, .3, .6].forEach((d) => E(mk("boardsIn") + d, "slide"));
  if (mk("budsIn") !== undefined) [0, .15, .3].forEach((d, i) => E(mk("budsIn") + d, "pop", i));
  if (has("g203")) ["one", "two", "three"].forEach((w, i) => E(W("g203", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["g402", "g403", "g404"] : ["j302", "j303", "j304"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "g502", ["g503", "g504", "g505"]); lock("hold", 5, null, []); if (has("g1202")) E(W("g1202", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "j402", ["j403", "j404", "j405"]); lock("show", 5, "j903", ["j904", "j905p"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["g701", "g702"], ["g1001", "g1002"]] : [["j806", "j807"], ["j1101", "j1102"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "g1301" : "j1201"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { E(S.liz.t0 + .1, "whoosh"); E(W(PART === 1 ? "g1302" : "j1202", HIDDEN[0]) + .2, "sparkle"); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); BD(S.liz.t0, S.liz.t1); }
  if (S.cliff && has("g1503")) { E(LT("g1503") - .2, "lowdrum"); E(W("g1503", "part") - .1, "slam", 1); }
  if (mk("dareIn") !== undefined) { [0, .25, .5].forEach((d) => E(mk("dareIn") + .5 + d, "slide")); E(W("j1301", "lock") - .1, "sting"); }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // STAGE 2 (SERIES_FORMAT 9, "every place sounds alive"): each real place has its own low bed under everything said there. Part 1: the HDB
  // kitchen after rain (drips from the wet ledge, birds, the fan) and the common corridor (birds, a far bus, the neighbour's wind chime);
  // Part 2: the community garden (birds, far children at the void deck, leaves) and the seed bank's cold-room hum. Plus foley ON the marks.
  { const ROOM = ["cold", "back", "title", "plant", "lcobserve", "lcseed", "seedans", "waitw", "pullout", "measure", "strip", "holdon", "cliff"],
      GARDEN = ["place", "lcadult", "adultans", "seeds", "waitw", "pullout", "fruitcut", "ring", "show", "fix", "nomore", "dare"], LIST = PART === 1 ? ROOM : GARDEN, out = [];
    for (const sc of TL.scenes) if (LIST.includes(sc.name)) { const last = out[out.length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else out.push([sc.t0, sc.t1]); }
    (PART === 1 ? R.room : R.garden).push(...out.filter(([a, b]) => b - a > 1));
    const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus });
    if (PART === 1) {
      // the kitchen: drips on the wet ledge; the corridor: the neighbour's wind chime now and then
      for (const n of ["cold", "back", "title"]) if (S[n]) for (let t = S[n].t0 + .4, i = 0; t < S[n].t1; t += 1.3 + .4 * (i % 3), i++) sfx(t, "drip.wav", .05 + .02 * (i % 2));
      for (const n of ["plant", "seedans", "measure", "holdon", "cliff", "waitw"]) if (S[n]) for (let t = S[n].t0 + 1.2, i = 0; t < S[n].t1 - .5; t += 4.5 + 1.5 * (i % 2), i++) E(t, "windchime", i);
      // the cold open: the knife on the board, the seed set on the saucer; the boards slide (wired); the planting: the seed into the soil, two pats, water
      E(mk("cutmango") + .35, "knock"); E(mk("cutmango") + .5, "sfx", { f: "ep07_squish.wav", g: .14 }); E(mk("cutmango") + 2.3, "tok");
      E(mk("potin"), "pomf"); E(mk("soilpat"), "pomf"); E(mk("soilpat") + .4, "pomf"); for (let i = 0; i < 6; i++) E(mk("water") + i * .17, "drip", i);
      // the look-closers: the journal opens, a magnifier glint, a gentle touch, a sniff, the pencil; the root's soft creak, the shoot's pop, leaves unfold
      E(mk("journal"), "flip"); E(mk("look"), "window"); E(mk("touch"), "rub"); sfx(mk("smell"), "ep07_sniff.wav", .3, "game"); E(mk("write"), "scribble"); E(mk("write") + .9, "scribble");
      ["d10", "d20", "d30", "d45"].forEach((k) => E(mk(k), "rise", 1)); E(mk("root"), "creak"); E(mk("shoot"), "crack", 1); E(mk("leaves"), "leafrise"); E(mk("green"), "chime2", 0); E(mk("oldseed"), "softpop", 1);
      // the journey: the soil creaks as you swell, the root, the shoot breaking into the light
      E(mk("jswell"), "stretch"); E(mk("jroot"), "creak"); E(mk("jshoot"), "creak"); E(mk("jlight"), "reveal"); E(mk("jleaves"), "leafrise");
      // the ruler: it slides in, clacks on the table, slides into the pot; the measurements
      E(mk("rulerin") - .5, "slide"); E(mk("rtable") - .2, "clack"); E(mk("r20"), "pop", 1); E(mk("rzero"), "slide"); E(mk("rsoil") + .3, "clack"); E(mk("r12"), "tag", 0);
      E(mk("q"), "curious"); E(mk("treein"), "whoosh");
    } else {
      E(mk("potdown") + .9, "pomf");
      for (const n of ["seeds", "nomore"]) if (S[n]) E(S[n].t0 + 1.5, "sfx", { f: "ep05_leaf.wav", g: .08, bus: "amb" });
      ["stem", "trunk", "flowers", "tips"].forEach((k, i) => E(mk(k), "pop", i)); E(mk("tagadult"), "tag", 0);
      E(mk("jpetals"), "leafrise"); E(mk("jgreen"), "softpop", 2); E(mk("jbig"), "stretch"); E(mk("jseed"), "window"); E(mk("jripe"), "chime2", 1);
      E(mk("cutfruit") + .3, "knock"); E(mk("cutfruit") + .45, "sfx", { f: "ep07_squish.wav", g: .16 });
      ["tseed", "tyoung", "tadult"].forEach((k, i) => E(mk(k), "hop", i)); E(mk("tback"), "sparkle");
      E(mk("l3"), "pop", 2); E(mk("strike"), "scribble"); E(mk("bend"), "tag", 0);
      // the seed bank: the cold room's steady hum, the trays, a jar set down, the heavy door
      if (S.lcbank) for (let t = mk("bankin"); t < S.lcbank.t1 - .5; t += 5) sfx(t, "hum.wav", .06);
      E(mk("dry"), "rustle"); E(mk("jars"), "tok"); E(mk("jars") + .5, "tok"); E(mk("cold"), "clunk");
      if (S.dare) { E(S.dare.t0 + .4, "sfx", { f: "ep06_plop.wav", g: .12, bus: "amb" }); E(S.dare.t0 + 1.6, "bubble", 1); E(S.dare.t0 + 2.4, "bubble", 2); }
    } }
  // no ambience one-shots under a countdown (only the ticks keep time)
  { const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["windchime", "sfx", "drip"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
