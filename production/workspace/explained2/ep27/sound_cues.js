// sound_cues.js: EP27's sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p1.json; song.js
// plays it. Every sound hangs on the SAME mark the picture uses (script.py). The MUSIC is NEW for EP27 (the teacher, 25 Nov: "New music"):
// R.theme  the P4 theme "Scoop Parade" (bright, F major, 112 BPM: electric piano offbeats, a bouncy bass, a glockenspiel hook, shaker and soft claps)
// R.lite   the same theme thinned (piano and bass only) under the look-closer, the wool talk and the fair test (teaching)
// R.tense  the deadline bed (D minor, the same bar clock: a ticking clock, a low pizzicato ostinato, a rising string pad) when time runs out
// R.party  the warm finale (the theme with brass, strings and claps) at the void deck, the P3 year and the P4 teaser
// R.wonder the quiet journey pad (EP1-EP10's micro-world pad, unchanged) from "Shrink down. Quietly." to the end of the pull-out
// One-shots: "plan goes wrong" (a sad trombone), the slow-motion replay cue (a long reversed whoosh, a deep slowed hit, a low pad, slow
// heartbeats), the title sting, the lock-in ticks / bell / LOCKED IN!, key-word chimes, verdict tags, and every action's foley.
// Ambience: R.shop (cicadas in the sun, birds, the freezer's hum, children far off), R.deck (the void deck: children's voices, the fan's hum).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, mk = (k) => TL.marks[k];
  const R = { theme: [], lite: [], tense: [], party: [], wonder: [], shop: [], deck: [], groove: [], calm: [], rain: [], birds: [], night: [], roll: [], canteen: [], sea: [], tank: [], room: [], garden: [], hens: [] };
  const add = (key, a, b) => { if (b <= a + .5) return; const L = R[key][R[key].length - 1]; if (L && a - L[1] < .3) L[1] = b; else R[key].push([a, b]); };
  const THEME = /^(cold|title|fixcards|picks|run|fan)$/, LITE = /^(lcfan|wool|test|words)$/, TENSE = /^(scarf|walk|drain)$/, PARTY = /^(party|year|p4|kwrecap|blooper)$/;
  for (const s of TL.scenes) { if (THEME.test(s.name)) add("theme", s.t0, s.t1); else if (LITE.test(s.name)) add("lite", s.t0, s.t1); else if (TENSE.test(s.name)) add("tense", s.t0, s.t1); else if (PARTY.test(s.name)) add("party", s.t0, s.t1);
    if (/^(cold|run|fan|scarf|wool|test)$/.test(s.name)) add("shop", s.t0, s.t1); if (/^(walk|drain)$/.test(s.name)) add("shop", s.t0, s.t1); if (/^(party|year)$/.test(s.name)) add("deck", s.t0, s.t1); }
  // the quiet journey: no theme from the "Be a tiny bit of air" scene to the end of the pull-out; the wonder pad there
  if (S.shrink) { R.wonder.push([S.waitw.t0 + 1.0, S.pullout.t1 + .4]); }
  // the title: a bright sting on the slam
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); E(mk("title"), "titlesting"); [0, .35, .7].forEach((d, i) => E(mk("title") + d, "slam", i === 2 ? 2 : 0)); }
  // the cold open: the clock pill, the thermometer, Pip's "three plans"
  if (mk("clock") !== undefined) E(mk("clock") - .1, "clockpop");
  if (mk("therm") !== undefined) E(mk("therm"), "sizzle");
  if (LE("e105b")) E(LE("e105b") + .05, "uhoh");
  // the fix cards and the lock-in
  ["c1", "c2", "c3"].forEach((k, i) => E(mk(k) - .1, "cardpop", i));
  if (mk("ring0_fix") !== undefined) { const r0 = mk("ring0_fix"), d = mk("bell_fix") - r0; for (let s = 0; s < d - .01; s += .5) E(r0 + s, "tick", Math.abs(s - Math.round(s)) < .01 ? 1 : 0); for (let s = d - 2; s < d - .01; s += .25) if (Math.abs((s * 2) - Math.round(s * 2)) > .01) E(r0 + s, "tick", 0); E(mk("bell_fix"), "bell"); E(mk("bell_fix") + .05, "stamp"); }
  [["e203p", 0], ["e204m", 1], ["e205b", 2]].forEach(([id, i]) => { if (TL.lines[id]) E(LT(id) - .1, "pick", i); });
  // fix 1: the dash, the flop, the puffing, the sad trombone; the heat arrows; the verdict stamp
  if (S.run) { E(mk("zoom") + .1, "whoosh"); E(mk("zoom") + .15, "dash"); for (let i = 0; i < 6; i++) E(mk("zoom") + .25 + i * .18, "step", .6); E(mk("flop"), "flop"); E(mk("flop") + .25, "sadtrombone");
    E(mk("hug") - .1, "cloth"); E(mk("outflow"), "heatwhoosh"); E(mk("v_run"), "tag", 1); E(mk("v_run") + .35, "stamp"); E(LE("e306b") - .2, "rimshot"); }
  // fix 2: the fan's flaps, the drip, the sad trombone
  if (S.fan) { for (let t = mk("fanon"), i = 0; t < S.fan.t1 - .2; t += .24, i++) E(t, "flap", i); E(mk("drip"), "plip"); E(mk("drip") + .1, "sadtrombone"); E(mk("drip") + .6, "plip", 1); }
  // the replay: rewind, then the slow-motion cue; the drip in slow motion
  if (S.replay) { E(S.replay.t0, "rewind"); E(mk("slow0") - .3, "slowmo"); E(mk("slow0") + 4.4, "plipslow"); }
  // the look-closer: the whoosh in, the temperatures, the heat arrows, the key word, the verdict
  if (S.lcfan) { E(S.lcfan.t0 - .1, "whoosh"); E(mk("t33"), "tagpop", 0); E(mk("t18"), "tagpop", 1); E(mk("arrows"), "heatwhoosh"); E(mk("v_fan"), "tag", 1); E(mk("v_fan") + .9, "stamp"); E(LE("e604b") - .1, "rimshot"); }
  // fix 3: the scarf, the wrap; the dive
  if (S.scarf) { E(mk("clock15") - .1, "clockpop"); E(LE("e701m") + .1, "uhoh"); for (let i = 0; i < 4; i++) E(mk("wrap") + i * .4, "cloth"); E(mk("wrap") + 1.6, "sparkle"); }
  if (S.waitw) E(S.waitw.t1 - .6, "shrink");
  if (S.shrink) { E(mk("jhot"), "warmswell"); E(mk("jcold"), "coldtwinkle"); for (let i = 0; i < 6; i++) E(mk("jin") + i * .9, "softwhoo", i); E(mk("jslow"), "slowdown"); }
  if (S.pullout) E(S.pullout.t0, "whooshout");
  if (S.wool) { E(mk("neck") - .1, "softpop", 0); E(mk("today") - .1, "softpop", 1); E(mk("v_wool"), "tag", 0); }
  // the fair test: cups, wrappers, the think pause, the time-lapse, the pours, the result, the fix-card stamps
  if (S.test) { E(mk("freezer"), "freezerdoor"); for (let i = 0; i < 3; i++) E(LT("e904p") + .2 + i * .15, "softpop", i); E(mk("cup2"), "bag"); E(mk("cup3"), "cloth");
    E(mk("think") - .1, "curious"); E(mk("lapse"), "timelapse"); ["r1", "r2", "r3"].forEach((k, i) => E(mk(k), "pour", i)); E(mk("v_test"), "tag", 0); E(mk("v_test") + 1, "whoosh"); [1, 2, 3].forEach((n) => E(mk("v_test") + 1.4 + n * .2, n === 3 ? "win" : "stamp")); }
  // the rescue: footsteps; the drain: the clink, the magnet lowered, the click, the lift
  if (S.walk) for (let t = S.walk.t0 + .4; t < S.walk.t1 - .2; t += .5) E(t, "step", .5);
  if (S.drain) { E(mk("clink"), "clink"); E(mk("clink") + .35, "clink"); E(mk("lower"), "lower"); E(mk("snap"), "snap"); E(mk("liftup"), "rise", 3); E(mk("liftup") + .9, "sparkle"); E(LE("e1007b") - .3, "rimshot"); }
  // the party: the box opened (cold mist), "solved!", the fan's click and whirr, the turn, the coin
  if (S.party) { E(mk("open"), "cloth"); E(mk("open") + .7, "lid"); E(mk("open") + 1.0, "coldtwinkle"); E(mk("solved"), "cheerhit"); E(mk("fanclick"), "fanclick"); E(mk("fanclick") + .1, "fanrun", (mk("turnfan") + 3) - mk("fanclick"));
    E(mk("turnfan"), "turn", 0); E(mk("coin1"), "coin", 0); }
  // the P3 year, the level-up, the P4 tiles, Heart's flicker (a tiny digital blip, nothing more)
  if (S.year) { ["y1", "y2", "y3", "y4"].forEach((k, i) => E(mk(k) - .1, "softpop", i)); E(mk("lvl"), "levelup"); E(mk("items"), "sparkle"); }
  if (S.p4) { ["p1", "p2", "p3", "p4", "p5"].forEach((k, i) => E(mk(k) - .1, "rise", i + 2)); E(mk("glitch") + .02, "blip"); }
  // key words: the chime as each lands (the series' term sound)
  for (const k of KW) E(k.t, "term");
  // Mark Sentence: "Say it with me!" lands with a soft pop, the card with a paper sound
  if (S.words) E(S.words.t0 + .1, "paper");
  // the read-along, "Now you know!", the outro
  if (S.kwrecap) { KWLINE.forEach((id, i) => { if (TL.lines[id]) E(LT(id) - .05, "glow", i); }); if (TL.lines.h864) E(LT("h864"), "sting"); }
  if (TL.lines.h1305) { const kn = TL.lines.h1305.know; E(kn, "blast"); E(LT("h1304o"), "drum", 0); E(LT("h1304t"), "drum", 1); }
  // the blooper: a record scratch, the clapper
  if (S.blooper) { E(S.blooper.t0, "scratch"); E(mk("take2"), "clapper"); E(LE("e1603m") - .1, "rimshot"); }
  // buddy pops: each buddy's entrance pop (the buddy() pops are the picture's; the sound is light)
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
