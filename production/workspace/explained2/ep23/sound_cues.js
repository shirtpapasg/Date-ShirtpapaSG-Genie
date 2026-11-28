// sound_cues.js: EP23's sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p<N>.json;
// song.js plays it. As in EP15 to EP22, every sound hangs on the SAME mark the picture uses (script.py lists them).
// MUSIC (teacher, 25 Nov 2026: "For future episodes we use the original music"; SERIES_FORMAT 9): the series' own beds again, as in EP1-EP10
// (song.js: the game groove R.groove under the game scenes, the calm bed R.calm under the teaching scenes, the micro-world pad R.wonder in
// the journeys), NOT Kampong Walk (finish.sh does not run add_lofi.py). song.js keeps ONE bar clock per part (a bed always resumes on the
// beat) and every change between beds, or around a countdown, is a 0.8 s crossfade. The journeys are QUIET: no groove and no calm bed from
// the "Be a ...! Shrink down. Quietly." scene (waitw) to the end of the pull-out; the micro-world pad plays in the journey itself.
// PLACES (SERIES_FORMAT 9, "every place sounds alive"): Part 1 the COFFEE SHOP across from the scrapyard (R.deck: voices far off, birds in
// the rain trees; the fans' soft whoosh; spoons clinking in cups, the auntie calling an order, a lorry passing, the scrapyard's far clank and
// the crane's low hum); Part 2 the SCHOOL SCIENCE ROOM (R.room: a soft room hum, birds through the window; the fans, children's voices fading
// down the corridor, footsteps, a tap dripping into the sink, the old electric bell ringing at the start). Foley on every action: the wire's
// rustle as it is coiled, the tiny click at the battery, the clips' tinkle as they jump and their jingle as they drop, the crane's clank and
// the scrap's crash into the lorry, the bolt's clink, the bell's dings, the poster's paper, the strike and the rewrite.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, M_ = TL.marks,
  R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [], deck: [] };
  const has = (id) => !!TL.lines[id], mk = (k) => M_[k];
  const G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  const GAME = /^(game|goals|count|r1card|r1|showcard|show|holdon|final|answer|r1ans|fix|dare|cliff|crane|today|lab)$/, CALM = /^(lasttime|lc1q|lc2q|lcon|lcparts|lcturns|lcbatt|mark|kwrecap|back|liz)/;
  for (const s of TL.scenes) { if (s.name === "shrink") R.wonder.push([s.t0 - .3, s.t1 + .4]); else if (GAME.test(s.name)) G(s.t0, s.t1); else if (CALM.test(s.name)) C(s.t0, s.t1);
    if (/^lc[a-z]/.test(s.name) && !/^lc1q|^lc2q/.test(s.name)) E(s.t0 - .1, "whoosh"); if (/card$/.test(s.name)) E(s.t0 + .05, "roundcard"); if (s.name === "waitw") E(s.t1 - .6, "shrink"); if (s.name === "pullout") E(s.t0, "whooshout"); }
  // the place's bed (Part 1: the outdoor R.deck under every coffee-shop scene; Part 2: the indoor R.room under every science-room scene); joined across short gaps
  { const OUT = PART === 1 ? ["cold", "back", "title", "today", "answer", "lc1q", "holdon", "lc2q", "liz", "cliff", "waitw"] : ["lab", "r1ans", "lc1q", "show", "fix", "lc2q", "crane", "dare", "liz", "waitw"], key = PART === 1 ? "deck" : "room";
    for (const sc of TL.scenes) if (OUT.includes(sc.name)) { const last = R[key][R[key].length - 1]; if (last && sc.t0 - last[1] < .5) last[1] = sc.t1; else R[key].push([sc.t0, sc.t1]); }
    R[key] = R[key].filter(([a, b]) => b - a > 1); }
  // the cold open: the wire's soft rustle as each turn goes round (ten), the tiny clicks at the battery, the clips' tinkle as they jump
  if (mk("coil0") !== undefined) { const n = 10, d = (mk("join0") - .7 - mk("coil0")) / n; for (let i = 0; i < n; i++) E(mk("coil0") + i * d + .1, "cloth"); E(mk("join0") + .02, "click"); E(mk("join0") + .42, "click"); E(mk("clips0") + .2, "jingle"); E(mk("clips0") + .25, "sparkle"); }
  if (mk("board") !== undefined) E(mk("board") + .1, "chime");
  if (mk("caps") !== undefined) { E(mk("caps") + .2, "pop", 2); E(mk("caps") + .5, "clink"); }
  // the title slam, the game's push-in and the hidden animal's name
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); [.26, .61].forEach((d, i) => E(mk("title") + d, "slam", i)); }
  if (S.game) { E(S.game.t0 + .05, "whoosh"); E(S.game.t0 + 1.1, "sting"); const a = PART === 1 ? "m204" : "n202"; E(W(a, HIDDEN[0]) - .1, "curious"); E(W(a, "spot") - .1, "pip", 2); }
  if (has("m103")) ["one", "two"].forEach((w, i) => E(W("m103", w) - .05, "softpop", i));
  if (S.lasttime && PART === 2) ["pic1", "pic2", "pic3"].forEach((k, i) => E(mk(k), "softpop", i));
  // goals, countdown
  const G3 = PART === 1 ? ["m302b", "m303b", "m304b"] : ["n302p", "n303p", "n304p"]; G3.forEach((id, i) => E(LT(id) - .1, "softpop", i));
  if (has("h501")) { ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal"); }
  // lock-ins: ring ticks that speed up, the bell, the LOCKED IN! stamp, the picks
  const lock = (n, dur, lockId, picks) => { const r0 = mk("ring0_" + n); if (r0 === undefined) return; ringTicks(r0, dur).forEach((t) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, "bell"); E(r0, "bellicon"); if (lockId && has(lockId)) E(LT(lockId) - .08 + .14, "stamp"); picks.forEach((id, i) => has(id) && E(LT(id) - .1 + .11, "pick", i)); };
  if (PART === 1) { lock("r1", 3, "m402", ["m403b", "m404p", "m405m"]); lock("hold", 5, null, []); if (has("m802")) E(W("m802", "hold") - .1, "stamp"); }
  else { lock("r1", 5, "n402", ["n403p", "n404b", "n405m"]); lock("show", 5, "n803", ["n804b"]); }
  ["coin1", "coin2"].forEach((k) => mk(k) !== undefined && E(mk(k) - .1, "coin")); if (mk("coin1") !== undefined) E(mk("coin1") + .2, "coin", 1); if (mk("ansglow") !== undefined) E(mk("ansglow"), "chime2", 0);
  if (mk("stroked") !== undefined) E(mk("stroked") - .1, "softpop", 1); if (mk("crane") !== undefined && PART === 1) E(mk("crane") - .1, "softpop", 2);
  // Part 1's journey: a long soft rustle as each turn of wire goes round you, a tiny click as the ends are joined, a soft rising shimmer as
  // the pull comes (a stylised "pull" sound: real electromagnets are silent), a tinkling rush as the clips jump; a click as the holder comes
  // away, the shimmer falls, a light jingle as the clips drop into the tray
  if (mk("jcoil") !== undefined) { const n = 10, d = (mk("jon") - .9 - mk("jcoil")) / n; for (let i = 0; i < n; i++) E(mk("jcoil") + i * d + .2, "rub"); E(mk("jlie") + .3, "creak");
    E(mk("jon") + .05, "click"); E(mk("jpull") - .3, "sfx", { f: "riser.wav", g: .05, bus: "wonder" }); E(mk("jjump") + .1, "sparkle"); E(mk("jjump") + .15, "jingle"); E(mk("joff") + .1, "click"); E(mk("jdrop") + .1, "jingle"); E(mk("jdrop") + .45, "clink"); }
  // Part 2's journey: a faint jingle of caps and ring-pulls round you, a weak short shimmer as the ten-turn hook comes (it fades), you tip and
  // slip back (a clink), a stronger rising shimmer for the twenty-turn hook, a heavy clink as you jump
  if (mk("jtray") !== undefined) { E(mk("jtray") + .3, "jingle"); E(mk("jten"), "rumble"); E(mk("jtip") - .1, "pip", 0); E(mk("jslip") + .2, "clink"); E(mk("jtwenty"), "rumble"); E(mk("jtwenty") + .9, "sfx", { f: "riser.wav", g: .06, bus: "wonder" }); E(mk("jjump") + .05, "clang"); E(mk("jjump") + .3, "sparkle"); E(mk("jstay") + .1, "jingle"); }
  // look-closer 1 of Part 1: a held hush over the still clips, a click and a tinkle as the battery is joined, a jingle as they drop (twice);
  // the crane across the road: its engine, a heavy clank as the disc lands, a long clattering crash as the scrap drops into the lorry
  if (PART === 1 && mk("on1") !== undefined) { E(mk("dipn") + .3, "tok"); const sw = [[mk("on1") + .1, 1], [mk("off1") + .1, 0], [mk("loses") - 2.1, 1], [mk("loses") - .3, 0]];
    sw.forEach(([t, on]) => { E(t, "click"); if (on) { E(t + .3, "jingle"); E(t + .35, "sparkle"); } else E(t + .3, "jingle"); });
    E(mk("crane2") + .2, "rumble"); E(mk("craneon") - .2, "clunk"); E(mk("craneon") + .1, "clang"); E(mk("craneoff") + .1, "click"); for (let i = 0; i < 6; i++) E(mk("craneoff") + .45 + i * .09, "clink"); E(mk("craneoff") + .5, "potthud"); }
  // look-closer 2 of Part 1: a held hush (three times), a tiny click for the one end, a click, a soft rising shimmer and a tinkling rush for both
  if (mk("alone1") !== undefined) { E(mk("alone1") + 1.2, "boop", 0); E(mk("alone2") + 1.2, "boop", 1); E(mk("one"), "click"); E(mk("nothing"), "boop", 2); E(mk("both") + .05, "click"); E(mk("flow") - .2, "sfx", { f: "riser.wav", g: .05, bus: "game" }); E(mk("becomes") - .2, "jingle"); E(mk("becomes") - .15, "sparkle"); }
  // HOLD ON!: the idea's sparkle, a low "uh-oh" on the socket's red cross, the main electrical supply tag, a soft chime per strip line
  if (mk("idea") !== undefined) E(mk("idea"), "curious");
  if (mk("stop") !== undefined) { E(mk("stop") + .05, "boop", 3); E(mk("stop") + .1, "stamp"); E(mk("stop") + .6, "set"); }
  if (mk("mains") !== undefined) E(mk("mains") + .1, "softpop", 3);
  if (has("m805s")) { const L = TL.lines.m805s, ws = L.words, i2 = ws.findIndex((w, i) => i > 3 && w.w === "Do"), i3 = ws.findIndex((w, i) => i > i2 && w.w === "Do"); [0, i2, i3].forEach((i, j) => E(ws[i].a - .1, "chime2", j % 2)); }
  // the cliffhanger: the crane's string creaks down, the bolt tips up and slips off (a clink), the empty packet, a low drum, PART 2
  if (mk("lift") !== undefined) { E(mk("lift") - .2, "creak"); E(mk("lift") + 1.35, "clink"); E(mk("nobatt"), "paper"); }
  if (S.cliff && has("m1102")) { E(LT("m1102") - .2, "lowdrum"); E(W("m1102", "part") - .1, "slam", 1); }
  // Part 2: the bell rings at the start; look-closer 1 (a soft tick per turn as the arrows appear, two dips, the second with a bigger tinkle;
  // the bell slowed down: a soft ding per hammer stroke, then speeding into a ring); look-closer 2 (a click per battery, the dips); the crane
  if (mk("ring") !== undefined) { for (let i = 0; i < 26; i++) E(mk("ring") + i * .07, "rim", i); }
  if (mk("dip") !== undefined && PART === 2) { E(mk("dip") + .5, "jingle"); E(mk("dip") + 1.4, "jingle"); E(mk("dip") + 1.45, "sparkle"); for (let i = 0; i < 20; i++) E(mk("why") - .2 + i * .06, "tick", 0); }
  if (mk("bell") !== undefined) { const t0 = mk("bell") + .8; for (let i = 0; i < 7; i++) if (t0 + i * 2.2 < mk("fast")) E(t0 + i * 2.2 + .2, "ding"); for (let i = 0; i < 30; i++) E(mk("fast") + i * .06, "rim", i); }
  if (mk("one1") !== undefined) { E(mk("one1"), "click"); E(mk("two2"), "click"); E(mk("two2") + .2, "click"); E(mk("dip2") + .5, "jingle"); E(mk("dip2") + 1.4, "jingle"); E(mk("dip2") + 1.45, "sparkle"); E(mk("flow2") - .3, "sfx", { f: "riser.wav", g: .05, bus: "game" }); }
  if (mk("swing") !== undefined) { E(mk("swing"), "creak"); E(mk("swing") + .2, "clink"); E(mk("swing") + .5, "whoosh"); E(mk("slip") + .4, "clink"); }
  if (mk("carry") !== undefined) { E(SCN.crane.t0 + .3, "creak"); E(SCN.crane.t0 + .95, "clink"); E(mk("carry"), "whoosh"); E(mk("drop") - .05, "click"); E(mk("drop") + .4, "clang"); E(mk("drop") + .5, "reveal"); E(mk("drop") + .6, "sparkle"); }
  if (mk("chart") !== undefined) E(mk("chart") + .2, "scribble");
  if (mk("rows") !== undefined) { E(mk("rows"), "scribble"); E(mk("rows") + .6, "scribble"); }
  if (mk("coil") !== undefined && PART === 2) { E(mk("coil"), "cloth"); E(mk("coil") + .3, "cloth"); }
  // key words: a chime as each pops; verdicts: the stamp + a chime
  for (const k of KW) E(k.t, "chime2", 1);
  for (const [k, v] of Object.entries(M_)) if (/^v_/.test(k)) { E(v + .12, "stamp"); E(v + .35, "chime2", 1); }
  if (mk("strip") !== undefined) E(mk("strip") + .2, "chime", 0);
  if (mk("box1") !== undefined) E(mk("box1") + .1, "scribble"); if (mk("need") !== undefined) [0, .25, .5, .75].forEach((d) => E(mk("need") + d, "tick", 1));
  // Mark Sentences: "Say it with me!" (a soft pop), the chime after the card
  for (const [say, read] of (PART === 1 ? [["m707", "m708"], ["m906", "m907"]] : [["n706", "n707"], ["n906", "n907"]])) if (has(say)) { E(LT(say) - .05, "softpop", 2); E(LE(read) + .25, "chime"); }
  // the chant (Part 2): clap-clap-stomp, YOUR TURN!
  if (has("c1003")) { E(LT("u1002") - .05, "softpop", 2); const L = TL.lines.c1003; for (const [bt, k, soft] of chantBeats(L)) E(bt, k === "c" ? "clap" : "stomp", soft ? .35 : 1); E(L.end - .28, "sparkle"); for (let i = 0; i < L.ncall; i++) E(L.t + (L.slots[i][1] + 1) * L.bar, "turn", i); }
  // the score hand, the reveal, the fun fact
  if (S.final) { E(S.final.t0 + .1, "sting"); const L = PART === 1 ? "m1001" : "n1101"; E(W(L, "high") + .2, "slap"); }
  if (S.liz) { const L = PART === 1 ? "m1002" : "n1102"; E(S.liz.t0 + .1, "whoosh"); E(W(L, HIDDEN[0]) + .2, "sparkle"); E(W(L, HIDDEN[0]) + .5, "pip", 1); Object.keys(M_).filter((k) => /^ff_/.test(k)).forEach((k, i) => E(M_[k] - .05, "pop", i % 3)); }
  if (mk("dareIn") !== undefined) { [0, .25].forEach((d) => E(W("n1201", "one") - .8 + d, "slide")); E(W("n1201", "lock") - .1, "sting"); }
  // the Showdown's paper and the fix (Momo's poster lines, the strike, the green rewrite)
  if (PART === 2) { ["l1", "l2", "l3"].forEach((k) => mk(k) !== undefined && E(mk(k), "paper")); if (mk("strike") !== undefined) { E(mk("strike"), "scribble"); E(mk("rewrite"), "squeak"); E(mk("rewrite") + .1, "scribble"); } }
  // the read-along and "Now you know!" (EP1's routine)
  E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle");
  E(S.nyk.t0 + .1, "whoosh"); E(LT("u1300") - .05, "softpop", 2); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); R.outro = [TL.lines.h1305.know + 1.0, TL.END];
  // the places' own life (one-shots inside the place scenes)
  { const sfx = (t, f, g, bus = "amb") => E(t, "sfx", { f, g, bus }); const SCS = (names) => TL.scenes.filter((sc) => names.includes(sc.name) && sc.t1 - sc.t0 > 2.5);
    if (PART === 1) {
      SCS(["cold", "back", "today", "answer", "lc1q", "holdon", "lc2q", "cliff"]).forEach((sc, i) => { sfx(sc.t0 + 1.2 + (i % 3) * .4, "ep06_clink.wav", .035);
        if (sc.t1 - sc.t0 > 5) { E(sc.t0 + 3.4, "clunk"); sfx(sc.t0 + 4.2, "pass_by.wav", .03); } if (sc.t1 - sc.t0 > 9) { sfx(sc.t0 + 7, "ep05_laugh.wav", .015); E(sc.t0 + 8.2, "clank"); } });
      if (S.cold) { E(S.cold.t0 + 2.2, "clank"); sfx(S.cold.t0 + 5.5, "ep05_horn.wav", .012); }
      if (S.game) for (let i = 0; i < 14; i++) E(S.game.t0 + 1.4 + i * .08, "step", .2);
      if (S.liz) { for (let i = 0; i < 12; i++) E(W("m1002", "millipede") + .5 + i * .08, "step", .2); if (mk("ff_coil") !== undefined) E(mk("ff_coil") + .1, "boing"); }
    } else {
      SCS(["lab", "r1ans", "lc1q", "show", "fix", "lc2q", "crane", "dare"]).forEach((sc, i) => { if (sc.t1 - sc.t0 > 4) E(sc.t0 + 2.2, "drip", i); if (sc.t1 - sc.t0 > 8) sfx(sc.t0 + 5, "footsteps.wav", .025); if (i % 3 === 1) sfx(sc.t0 + 1.5, "ep05_kids.wav", .02); });
      if (S.game) { E(S.game.t0 + 1.4, "chirp"); E(S.game.t0 + 2.6, "chirp"); }
      if (S.liz) { E(W("n1102", "cricket") + .5, "chirp"); E(mk("ff_bell") + .1, "ding"); E(mk("ff_bell") + .4, "chirp"); }
    }
    // no ambience one-shot under a countdown (only the ticks keep time)
    const CW = Object.keys(M_).filter((k) => k.startsWith("ring0_")).map((k) => [M_[k] - .4, M_["bell_" + k.slice(6)] + .5]); for (let i = ev.length - 1; i >= 0; i--) if (["sfx", "clunk", "clank", "drip", "chirp", "jingle", "slide"].includes(ev[i].k) && CW.some(([a, b]) => ev[i].t > a && ev[i].t < b)) ev.splice(i, 1); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
