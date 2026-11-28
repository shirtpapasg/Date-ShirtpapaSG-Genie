// sound_cues.js: P4 EP3's sound plan (script section 3; runs in the page: LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to
// cues_p1.json; song.js plays it. Every sound hangs on the SAME mark the picture uses (script.py). The ORIGINAL series music, the P4
// "Scoop Parade" family (never Kampong Walk), one bar clock, 0.8 s crossfades, ducked under every voice:
// R.noir    Scoop Parade NOIR (the Case File voicing, new in EP3): cold open, witness, fix cards, picks, colour, size (out under the replay),
//           the suspects (to the CASE CLOSED stamp), the reveal
// R.action  Scoop Parade ACTION: the 1-bar brass stab on "Hold it!" (it resolves) and on Basil's too-early CASE CLOSED! (cut short)
// R.lite    Scoop Parade lite: o405, the look-closer, NET VEINS, the words that earn marks
// R.theme   the help-desk voicing (desk-bell ding): the GLITCH scene (quiet) and the 2-bar EP4 tag
// R.party   the finale: from the CASE CLOSED stamp through the high-five; the cosy end; after "Now you know!"; the blooper
// R.wonder  the series micro-world pad, alone: the journey (fades out 1.2 s into j701, back 1.5 s after the pull-out)
// R.calm    the series calm bed: the read-along
// Silence (no bed): the lock-in (ticks, the bell, LOCKED IN!), the freeze on Basil's stamp (record scratch), and GLITCH'S FINAL STING: no
// music, no ambience, a faint charger hum, the stutter, then 1.8 s of TRUE silence, his line dry, silence over black.
// The SAD TROMBONE exactly three times (the pun, "They're ALL green!", the pandan flop); rimshots three times (a202, o406, k1105).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, mk = (k) => TL.marks[k];
  const R = { theme: [], lite: [], tense: [], party: [], wonder: [], calm: [], deck: [], park: [], action: [], noir: [] };
  const add = (key, a, b) => { if (b > a + .5) R[key].push([a, b]); };
  const tidy = () => { for (const k of Object.keys(R)) { const L = R[k].sort((x, y) => x[0] - y[0]), out = []; for (const r of L) { const q = out[out.length - 1]; if (q && r[0] - q[1] < .3) q[1] = Math.max(q[1], r[1]); else out.push([...r]); } R[k] = out; } };
  // ---- the beds
  add("noir", S.cold.t0, mk("holdit") - .1); add("action", mk("holdit") - .1, S.cold.t1 - .2);
  add("noir", S.witness.t0, S.fixcards.t1); add("noir", S.picks.t0 + .2, LT("o405") - .2); add("lite", LT("o405") - .2, S.colour.t1);
  add("noir", S.size.t0, LT("s506")); add("noir", LT("s507") - .2, S.size.t1); add("lite", S.lcleaf.t0, S.dive.t0 + 1.2);
  R.wonder.push([S.dive.t0 + 1.2, S.pullout.t1 + .3]); add("lite", S.pullout.t1 + 1.5, S.netveins.t1);
  add("noir", S.suspects.t0, mk("rush") - .1); add("action", mk("rush") - .1, mk("rush") + 1.0); add("noir", LT("q809") - .2, mk("stamp") - .05); add("party", mk("stamp") - .05, S.suspects.t1);
  add("theme", S.glitch.t0 + 2.4, S.glitch.t1); add("noir", S.reveal.t0, S.reveal.t1); add("lite", S.words.t0, S.words.t1);
  add("party", S.finish.t0, S.finish.t1); add("theme", S.next.t0, S.next.t1 - .6); add("calm", S.kwrecap.t0, S.kwrecap.t1);
  add("party", TL.lines.h1305.know, S.nyk.t1); add("party", S.blooper.t0 + .5, S.blooper.t1 - .2);
  // ambience: the void deck in the morning (mynahs, a koel far off, a lift chime), in every scene at the void deck
  for (const n of ["cold", "witness", "colour", "size", "suspects", "glitch", "reveal", "finish", "next"]) if (S[n]) add("deck", S[n].t0, S[n].t1);
  // ---- the cold open: the cap's flump, the magnifier, SKRRRITCH! + GLITCH's fanfare + the wheels, the scanner + BEEP-BOOP!, the pigeon's
  // KOO!, the whip whooshes, SKRITCH!, the ACTION stab (it resolves)
  E(mk("cap") - .15, "capflump"); E(LT("c104") + .3, "shing"); E(mk("skr"), "taperip"); E(mk("skr") + .15, "glitchfan"); E(mk("skr"), "whirr", 1.1);
  E(LT("c105") + .05, "scanner"); E(LT("c105") + .15, "beepboop"); E(mk("koo") + .05, "pigeonkoo", 1.12);
  E(mk("whip") - .08, "whoosh"); E(LT("c107") - .15, "whoosh"); E(LT("c108") - .15, "whoosh"); E(mk("rip1") - .05, "tapestrip");
  E(mk("holdit") - .05, "actionsting"); E(mk("holdit") + 1.0, "resolve");
  // the title (the noir "dun-dun"), the witness (the push-in, a soft "ting" on the badge), rimshot 1
  E(mk("title") - .05, "whoosh"); E(mk("title"), "dundun"); [0, .35].forEach((d) => E(mk("title") + d, "slam", 0));
  E(mk("snailin") - .6, "softwhoo", 0); E(mk("snailin") + .7, "bellting"); E(LE("a202") + .05, "rimshot");
  // the fix cards: card pops, the swatches' fwip, three toks (Pip's tools), SAD TROMBONE 1 (the pun), GLITCH's smug ding
  ["c1", "c2", "c3"].forEach((k, i) => E(mk(k) - .1, "cardpop", i)); E(mk("swatches"), "paper"); [0, 1, 2].forEach((i) => E(mk("tools") - .5 + i * .28, "tok"));
  { const t0 = mk("flop1") + .05, room = LT("f204") - t0 - .15; E(t0, "sadtrombone", Math.max(.6, Math.min(1.6, room))); } E(LE("f204") + .05, "smugding");
  // the lock-in (silent but for the ticks, the bell and the stamp)
  { const r0 = mk("ring0_fix"), d = mk("bell_fix") - r0; for (let s = 0; s < d - .01; s += .5) E(r0 + s, "tick", Math.abs(s - Math.round(s)) < .01 ? 1 : 0); for (let s = d - 2; s < d - .01; s += .25) if (Math.abs((s * 2) - Math.round(s * 2)) > .01) E(r0 + s, "tick", 0); E(mk("bell_fix"), "bell"); E(mk("bell_fix") + .05, "stamp"); }
  [0, 1, 2].forEach((i) => E(S.picks.t0 + .3 + i * .25, "pick", i)); E(mk("miss1"), "whiff");
  // clue 1: three leaf rustles and three identical boops, SAD TROMBONE 2, SKRITCH! x3, rimshot 2
  [.2, .7, 1.6].forEach((d) => { E(mk("swatch") + d - .1, "rustle"); E(mk("swatch") + d, "boop"); });
  { const t0 = mk("flop2") + .05, room = LT("o403") - t0 - .1; E(t0, "sadtrombone", Math.max(.6, Math.min(1.6, room))); }
  [0, 1, 2].forEach((i) => E(mk("three3") + i * .25, "tapestrip")); E(mk("notenough") + .3, "stamp"); E(LE("o406") + .05, "rimshot");
  // clue 2: the smug ding, two ruler clacks, the leafy FLOP + SAD TROMBONE 3, the slow-motion replay cue, WEAK CLUE stamp
  E(LE("s502") + .05, "smugding"); E(mk("measure") + .1, "clack"); E(mk("measure") + 1.2, "clack");
  E(mk("flop3") + .1, "leafflop"); { const t0 = mk("flop3") + .75, room = LT("s505") - t0 - .1; E(t0, "sadtrombone", Math.max(.6, Math.min(1.6, room))); }
  E(LT("s506") + .3, "rewind"); E(mk("slow0") - .2, "slowmo"); E(mk("weak") + .1, "stamp");
  // the look-closer: whoosh, paper rustle, a chime per key word (below), the magnifier
  E(S.lcleaf.t0 - .1, "whoosh"); E(S.lcleaf.t0 + .3, "rustle"); E(mk("magv") - .1, "shing");
  // the journey: shrink, a soft trickle in the stalk, a bell chord on the net, the pull-out
  E(S.dive.t1 - .6, "shrink"); E(mk("jstalk"), "trickle"); for (let i = 0; i < 3; i++) E(mk("jmain") + i * 1.2, "softwhoo", i); E(mk("jnet"), "warmswell"); E(S.pullout.t0, "whooshout");
  // the suspects: CLEARED thumps (small), the snack sniff, the ACTION stab cut short, the record scratch on the frozen stamp, the THINK card's
  // three soft ticks, the three rising tick notes, the big CASE CLOSED thump (the noir resolves into the finale), CLAP! and laughter
  E(mk("clr1"), "stamp"); E(mk("rush") - .05, "actionsting"); E(mk("rush") + .8, "stingcut"); E(LE("q807") + .05, "smugding"); E(mk("freeze") + .05, "scratch");
  [0, 1, 2].forEach((i) => E(mk("think0") + .3 + i * .9, "softtick")); E(mk("think0") - .1, "curious"); E(mk("clr2"), "stamp");
  ["tk1", "tk2", "tk3"].forEach((k, i) => E(mk(k), "rise", i)); E(mk("stamp"), "bigstamp"); E(mk("stamp") + .05, "resolve"); E(mk("clap"), "clap"); E(mk("clap") + .1, "laughter");
  // GLITCH: wheels, BEEP-BOOP, the scanner and three soft beeps, BZZT! and a falling beep, the upgrade chime and the file click; one low hum
  // under the counter tick (the chill); SKRITCH!; Uncle Lim's slurp after his line; SKRITCH! SKRITCH! (the tape coming off); a rustle into the basket
  E(S.glitch.t0, "whirr", 1.6); E(LT("g901") - .2, "beepboop"); E(mk("scan"), "scanner"); [0, 1, 2].forEach((i) => E(mk("scan") + .5 + i * .6, "beep", i)); E(mk("bzzt") + .02, "bzzt"); E(mk("bzzt") + .45, "fallbeep");
  E(mk("upd") - .1, "servo"); E(mk("stored") + .2, "upgrade"); E(mk("stored") + .9, "click"); E(mk("weakc") + 1.0, "lowhum"); E(LT("g907") + .3, "tapestrip"); E(LT("g907"), "whirr", 1.2);
  E(LE("g908") + .3, "slurp"); E(mk("peel") + .3, "tapestrip"); E(mk("peel") + .7, "tapestrip"); E(mk("peel") + .5, "rustle"); E(mk("peel"), "whirr", 1.2);
  // the reveal: the push-in, the ring, the badge ting, the fun fact
  E(S.reveal.t0 + .1, "softwhoo", 1); E(mk("rsnail") + .1, "bellting"); E(mk("ff_in") - .2, "cardpop", 0);
  // the cosy end: wheels, the scanner beep, the rimshot, the coin
  E(LT("k1101") - 1.4, "whirr", 1.4); E(LT("k1101") - .3, "beep", 0); E(LE("k1103") - .2, "whirr", 1.8); E(LE("k1105") + .05, "rimshot"); E(mk("coin1"), "coin", 0); E(mk("coin1") + .05, "cheerhit");
  // the cactus: three hop thumps, the desk bell DING!, a small guilty BEEP-BOOP, then silence
  { const t0 = mk("ding") + .1; for (let i = 1; i <= 3; i++) E(t0 + i * .38, "hop", i); } E(mk("ding"), "deskbell"); E(LT("n1201") - .3, "beep", 1);
  // key words: the chime as each lands
  for (const k of KW) E(k.t, "term");
  if (S.words) E(S.words.t0 + .1, "paper");
  KWLINE.forEach((id, i) => { if (TL.lines[id]) E(LT(id) - .05, "glow", i); }); E(LT("h864"), "sting");
  { const kn = TL.lines.h1305.know; E(kn, "blast"); E(LT("h1304o"), "drum", 0); E(LT("h1304t"), "drum", 1); for (let i = 1; i <= 4; i++) E(kn + 1.0 + i * .4, "hop", i); E(kn + 1.2, "whirr", 1.2); E(kn + 2.0, "beep", 0); }
  // the blooper: the record scratch, the folder SLAP, the leaf fluttering down, the clapper
  E(S.blooper.t0, "scratch"); E(mk("slap") - .05, "folderslap"); E(mk("flutter") - .2, "leafflutter"); E(mk("take2"), "clapper");
  // GLITCH'S FINAL STING (not on the humour bus): a faint charger hum, the hard digital stutter, then TRUE SILENCE; his line dry
  E(S.glitchend.t0, "chargerhum", mk("stutter") - S.glitchend.t0); E(mk("stutter"), "gstutter");
  tidy();
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
