// sound_cues.js: P4 EP2's sound plan (script section 3; runs in the page: LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to
// cues_p1.json; song.js plays it. Every sound hangs on the SAME mark the picture uses (script.py). The ORIGINAL series music, the P4
// "Scoop Parade" family (never Kampong Walk), one bar clock, 0.8 s crossfades, ducked under every voice:
// R.theme   Scoop Parade, help-desk voicing (+ a desk-bell "ding" on beat 1 every four bars, song.js): cold open, fix cards, picks, water,
//           lunch, repair, the cosy end
// R.action  Scoop Parade ACTION: a short burst as the pigeon flock lands (the battle cry is the 1-bar ACTION sting, which resolves)
// R.lite    Scoop Parade lite: u406, both look-closers, the system, TRANSPORT, the words that earn marks
// R.party   the finale voicing: from the time-lapse to "Shrink down"; after "Now you know!"; the blooper
// R.wonder  the series micro-world pad, alone: the journey (fade out 1.2 s into j801, back 1.5 s after the pull-out)
// R.calm    the series calm bed: the read-along
// Silence (no bed): the lock-in (ticks, the bell, LOCKED IN!), the freeze-frame (record scratch), GLITCH's entrance (his own fanfare, then
// the theme quiet), and GLITCH'S FINAL STING: no music, no ambience, a faint charger hum, the stutter, then 1.8 s of TRUE silence, his line
// dry, silence over black. The SAD TROMBONE exactly three times (the pun, "I feel worse.", the pigeons fly off with the lunch).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, mk = (k) => TL.marks[k];
  const R = { theme: [], lite: [], tense: [], party: [], wonder: [], calm: [], deck: [], park: [], action: [] };
  const add = (key, a, b) => { if (b > a + .5) R[key].push([a, b]); };
  const tidy = () => { for (const k of Object.keys(R)) { const L = R[k].sort((x, y) => x[0] - y[0]), out = []; for (const r of L) { const q = out[out.length - 1]; if (q && r[0] - q[1] < .3) q[1] = Math.max(q[1], r[1]); else out.push([...r]); } R[k] = out; } };
  // ---- the beds
  add("theme", S.cold.t0, S.fixcards.t1); add("theme", S.picks.t0 + .2, S.water.t1); add("theme", S.lunch.t0, mk("koo") - .1); add("action", mk("koo") - .1, mk("koo") + 2.0);
  add("theme", mk("koo") + 2.0, LT("u406") - .2); add("lite", LT("u406") - .2, S.lunch.t1); add("lite", S.lcparts.t0, S.system.t1);
  add("theme", S.glitch.t0 + 4.4, S.glitch.t1); add("theme", S.repair.t0, S.wait.t0 + 4.0); add("party", mk("lapse") - .3, S.waitw.t0 + .6);
  R.wonder.push([S.waitw.t0 + .6, S.pullout.t1 + .4]); add("lite", S.pullout.t1 + .3, S.words.t1);
  add("party", S.finish.t0, LT("n1101") - 1.8); add("calm", S.kwrecap.t0, S.kwrecap.t1); add("party", TL.lines.h1305.know, S.nyk.t1); add("party", S.blooper.t0 + .5, S.blooper.t1 - .2);
  // ambience: the void deck early on a Saturday morning (every desk scene); the HDB corridor (the recovery, TRANSPORT)
  for (const n of ["cold", "fixcards", "picks", "water", "lunch", "system", "glitch", "repair", "finish", "next"]) if (S[n]) add("deck", S[n].t0, S[n].t1);
  add("deck", S.wait.t0, mk("weeks") - .3); add("park", mk("weeks") - .3, S.waitw.t1); add("park", S.pullout.t0, S.transport.t1);
  // ---- the cold open: GLITCH far back (wheels), Chilli's hops (a thump on each landing), DING!, the sparkle, SAD TROMBONE 1 (the pun)
  E(.4, "whirr", 3.6); { const tH = mk("hop1") - 5 * .42 + .02; for (let i = 1; i <= 5; i++) E(tH + i * .42, "hop", i); E(mk("hop1") + .02, "deskbell"); }
  E(mk("sparkle"), "sparkle"); E(LE("c102") + .1, "sigh");
  { const t0 = LE("c103") + .1, room = LT("c104") - t0 - .15; E(t0, "sadtrombone", Math.max(.6, Math.min(1.6, room))); }
  // the title
  E(mk("title") - .05, "whoosh"); E(mk("title"), "titlesting"); [0, .35, .7].forEach((d, i) => E(mk("title") + d, "slam", i === 2 ? 2 : 0)); E(mk("title") + .9, "deskbell");
  // the fix cards: card pops, the battle cry (an ACTION sting that RESOLVES), the lunchbox click, the woodblock "tok"
  ["c1", "c2", "c3"].forEach((k, i) => E(mk(k) - .1, "cardpop", i)); E(mk("cry1") - .05, "actionsting"); E(mk("cry1") + 1.05, "resolve"); E(mk("box") - .15, "lid"); E(LE("f205") + .05, "tok");
  // the lock-in (silent but for the ticks, the bell and the stamp)
  { const r0 = mk("ring0_fix"), d = mk("bell_fix") - r0; for (let s = 0; s < d - .01; s += .5) E(r0 + s, "tick", Math.abs(s - Math.round(s)) < .01 ? 1 : 0); for (let s = d - 2; s < d - .01; s += .25) if (Math.abs((s * 2) - Math.round(s * 2)) > .01) E(r0 + s, "tick", 0); E(mk("bell_fix"), "bell"); E(mk("bell_fix") + .05, "stamp"); }
  [0, 1, 2].forEach((i) => E(S.picks.t0 + .3 + i * .25, "pick", i)); E(mk("miss1"), "whiff"); E(mk("miss1") + .05, "pour", 3);
  // the water: GLUG-GLUG-GLUG, the rising pizzicato, SPLOSH!, the drips, SAD TROMBONE 2, the magnifier shing, the rimshot
  for (let i = 0; i < 6; i++) E(mk("pour") + i * .26, "glug", i); E(mk("pour"), "pizzrise"); for (let i = 0; i < 3; i++) E(LE("w303") + .05 + i * .25, "glug", i + 2);
  E(mk("spill") + .05, "splash"); for (let i = 0; i < 4; i++) E(mk("spill") + .5 + i * .3, "plip", i % 2);
  { const t0 = LE("w304") + .05, room = LT("w305") - t0 - .15; E(t0, "sadtrombone", Math.max(.6, Math.min(1.6, room))); }
  E(LT("w305") + .7, "shing"); E(LE("w307") + .05, "rimshot");
  // the lunch: four tiny placements, a cricket, KOO! + wings + landing, pecks, Momo's run and skid, KOO-ROO!, the take-off, SAD TROMBONE 3
  for (let i = 0; i < 4; i++) E(mk("lay") - .9 + i * .5, "softpop", i); E(mk("nothing") + .3, "cricket");
  E(mk("koo") + .05, "pigeonkoo", 1.06); E(mk("koo") + .45, "pigeonland", 5); E(mk("koo") + .3, "brasshit");
  for (let t = LT("u404") - .3; t < LT("u404") + .6; t += .18) E(t, "runstep"); E(LT("u404") + .6, "skid");
  E(mk("kooroo") + .1, "pigeonkoo", 1.2); E(mk("liftoff") + .02, "pigeontakeoff", 5);
  { const t0 = mk("liftoff") + .75, room = LT("u406") - t0 - .1; E(t0, "sadtrombone", Math.max(.6, Math.min(1.6, room))); }
  // look closer 1: whoosh, leaf rustle, stem creak, one heroic note, SQUELCH + the wet rude PFFRRRT (sound only), the record scratch on the
  // freeze-frame, the window's "whum", a slow drip and a low bubble, the magnifier shings
  E(S.lcparts.t0 - .1, "whoosh"); E(mk("leaves"), "rustle"); E(mk("stem") + .3, "creak"); E(LE("d505") - .1, "heronote");
  E(mk("press") + .05, "squelch"); E(mk("press") + .3, "pffrt"); E(mk("press") + .35, "scratch"); E(LT("d506") - .05, "unfreeze");
  E(mk("win"), "whum"); E(mk("winhold") + .3, "plipslow"); E(mk("winhold") + 1.2, "bubble"); E(mk("nohole") + .1, "shing"); E(mk("roots") + .1, "shing");
  // look closer 2: the THINK card's three soft ticks; ABSORB (the term chime, below)
  E(S.lcroots.t0 - .1, "whoosh"); [0, 1, 2].forEach((i) => E(mk("think0") + .2 + i * .75, "softtick")); E(mk("think0") - .1, "curious");
  // the system: each part lights (a soft pop), the "ooh"; BEEP-BOOP! BEEP-BOOP!
  ["sr", "ss", "sl"].forEach((k, i) => E(mk(k) - .05, "softpop", i)); E(mk("sys") + .2, "ooh"); E(mk("alarm") + .05, "beepboop"); E(mk("alarm") + .5, "beepboop");
  // GLITCH: his pompous fanfare, the wheels and servos, the smug ding, the rimshot, the scanner and three beeps, BZZT! and a falling beep,
  // the upgrade chime and the file click; under the counter tick one low hum (quiet)
  E(S.glitch.t0 + .1, "glitchfan"); E(S.glitch.t0, "whirr", 1.7); E(S.glitch.t0 + 1.7, "servo"); E(LE("g453") + .05, "smugding"); E(LE("g454") + .05, "rimshot");
  E(mk("scan"), "scanner"); [0, 1, 2].forEach((i) => E(mk("scan") + .5 + i * .6, "beep", i)); E(mk("bzzt") + .02, "bzzt"); E(mk("bzzt") + .45, "fallbeep");
  E(mk("upd") - .1, "servo"); E(mk("stored") + .2, "upgrade"); E(mk("stored") + .9, "click"); E(mk("req") + .9, "lowhum");
  // the repair: Uncle Lim's slurp (before he speaks), the screen unfolding, BZZZT! SNIP! SNIP! SPLOSH! FLUMP. (each loud), the screen's
  // clack, the careful pour, drip... drip... drip., the rule saved
  E(LT("r703") - .9, "slurp"); E(mk("screen") - .4, "screenfold"); ["drill", "snip", "splashsmall", "flump"].forEach((k, i) => E(mk("screen") + i * .6, k)); E(LT("r705") - .1, "screenfold");
  E(LT("r706") + .5, "pour", 1); [0, 1, 2].forEach((i) => E(mk("test") + .3 + i * .6, "plip", i % 2)); E(mk("rule") - .1, "upgrade");
  // two weeks: the slurp after Uncle Lim's line, the time-lapse ticks, a rising marimba; Heart's hint #3: nothing added
  E(LE("t751") + .2, "slurp"); E(mk("lapse"), "timelapse"); [0, 1, 2, 3, 4].forEach((i) => E(mk("lapse") + .3 + i * .55, "rise", i)); E(LT("t753") - .1, "cheerhit");
  // the journey
  E(S.waitw.t1 - .6, "shrink"); E(mk("trickle"), "trickle"); E(mk("jroot"), "gloop"); E(mk("jleaf"), "warmswell"); for (let i = 0; i < 3; i++) E(mk("jup") + i * 1.2, "softwhoo", i);
  E(S.pullout.t0, "whooshout");
  // the cosy end: GLITCH's wheels, the sensor beep, the rimshot, his two-note fanfare as he rolls off, the marker squeak, CLAP!, the coin
  E(LT("k1001") - 1.6, "whirr", 1.6); E(LE("k1003") - .3, "beep", 0); E(LE("k1004") + .05, "rimshot"); E(LE("k1005") + .1, "glitchfan2"); E(LE("k1005") + .1, "whirr", 1.6);
  E(mk("sign"), "marker"); E(mk("sign") + .5, "marker"); E(mk("clap"), "clap"); E(mk("clap") + .1, "laughter"); E(mk("coin1"), "coin", 0); E(mk("coin1") + .05, "cheerhit");
  // the mystery leaf: a paper rustle, one glockenspiel note, the 2-bar noir tease, the CASE FILE stamp
  E(mk("leaf") + .2, "rustle"); E(mk("leaf") + 1.5, "glow", 0); E(mk("leaf") + .1, "noirtease"); E(mk("case"), "stamp");
  // key words: the chime as each lands
  for (const k of KW) E(k.t, "term");
  if (S.words) E(S.words.t0 + .1, "paper");
  KWLINE.forEach((id, i) => { if (TL.lines[id]) E(LT(id) - .05, "glow", i); }); E(LT("h864"), "sting");
  { const kn = TL.lines.h1305.know; E(kn, "blast"); E(LT("h1304o"), "drum", 0); E(LT("h1304t"), "drum", 1); for (let i = 1; i <= 4; i++) E(kn + 1.0 + i * .4, "hop", i); E(kn + 2.2, "whirr", 1.2); E(kn + 2.9, "beep", 0); }
  // the blooper: the record scratch, the battle cry sting (cut off), SPLOSH!, a drip, the clapper
  E(S.blooper.t0, "scratch"); E(LT("e1601b") - .05, "actionsting"); E(mk("splosh") + .05, "stingcut"); E(mk("splosh") + .08, "splash"); E(mk("drip") + .3, "plip", 0); E(mk("take2"), "clapper");
  // GLITCH'S FINAL STING (not on the humour bus): a faint charger hum (.6 s), the hard digital stutter (1.0 s: bit-crushed clicks,
  // "k-k-k-tsch", a 60 ms dropout), then TRUE SILENCE; his line dry; silence over black
  E(S.glitchend.t0, "chargerhum", mk("stutter") - S.glitchend.t0); E(mk("stutter"), "gstutter");
  tidy();
  // ---- PIGEONS: soft coos while they sit round the pot, only where no line is spoken
  { const free = (t, d) => TL.order.every((id) => { const L = TL.lines[id]; return t + d + .15 < L.t || t - .15 > L.end; });
    const at = (a, b, d) => { for (let t = a; t <= b - d; t += .05) if (free(t, d)) return t; return null; };
    const pecks = (a, b, n) => { let c = 0; for (let t = a; t < b && c < n; t += .35) if (free(t, .12)) { E(t, "pigeonpeck"); c++; t += .4; } };
    pecks(mk("koo") + 1.6, mk("liftoff") - .2, 5); const tc = at(LE("u404") + .1, mk("kooroo"), .75); if (tc !== null) E(tc, "pigeoncoo"); }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
