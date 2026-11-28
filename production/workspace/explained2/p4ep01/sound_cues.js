// sound_cues.js: P4 EP1's sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p1.json; song.js
// plays it. Every sound hangs on the SAME mark the picture uses (script.py). The music (script section 3): the ORIGINAL series music and the P4
// "Scoop Parade" family from the pilot EP27 (never Kampong Walk):
// R.theme  Scoop Parade (theme): cold open, fix cards, picks, fix 1, fix 2, fix 3, the ride, the callback
// R.lite   Scoop Parade lite (the teaching bed): the chain look-closer, the think card, inside Pip, the words that earn marks
// R.tense  Scoop Parade tense (D minor, the ticking clock): the brakes twist, e707b to e710
// R.party  Scoop Parade finale (brass stabs, strings, claps): from the rain tree (e807) to the end card, the link to EP2, the blooper
// R.wonder the series micro-world pad (EP1-10), alone: from "Be one little link..." to the end of the pull-out
// R.calm   the series calm bed (EP1-10): the key-word read-along
// The lock-in is silent but for the woodblock ticks, the bell and LOCKED IN!; "Now you know!" ends on the series blast (in F).
// Stings: the title sting, the "plan goes wrong" sad trombone (EP1-EP3 only), the slow-motion replay cue, rimshots under Basil's one-liners,
// the record scratch and clapper (blooper). Heart mystery hint #2: one tiny second "ting" an octave up with a digital edge under the bell.
// Ambience: R.deck (the void deck on a Saturday morning: mynahs, a koel far off, children at the playground, a lift chime, a bike bell far off),
// R.park (the park connector and the rain tree: birds, a far road, wind in the leaves).
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, mk = (k) => TL.marks[k];
  const R = { theme: [], lite: [], tense: [], party: [], wonder: [], calm: [], deck: [], park: [] };
  const add = (key, a, b) => { if (b > a + .5) R[key].push([a, b]); };
  const tidy = () => { for (const k of Object.keys(R)) { const L = R[k].sort((x, y) => x[0] - y[0]), out = []; for (const r of L) { const q = out[out.length - 1]; if (q && r[0] - q[1] < .3) q[1] = Math.max(q[1], r[1]); else out.push([...r]); } R[k] = out; } };
  const THEME = /^(cold|title|fixcards|picks|pedal|rope|chainfix|ride|callback)$/, LITE = /^(lcchain|inpip|words)$/, PARTY = /^(next|blooper)$/;
  for (const s of TL.scenes) { if (THEME.test(s.name)) add("theme", s.t0, s.t1); else if (LITE.test(s.name)) add("lite", s.t0, s.t1); else if (PARTY.test(s.name)) add("party", s.t0, s.t1);
    if (/^(cold|pedal|replay|rope|chainfix|brakes|next|blooper)$/.test(s.name)) add("deck", s.t0, s.t1); if (/^(ride|tree|callback)$/.test(s.name)) add("park", s.t0, s.t1); }
  // the brakes: tense from e707b to the end of e710 (the deadline), then lite from the think card to the end of the scene
  if (S.brakes) { add("tense", S.brakes.t0, LE("e710") + .4); add("lite", LE("e710") + .4, S.brakes.t1); }
  // the ride's theme; from the rain tree (e807) the finale voicing to the end card
  if (S.tree) { add("party", S.tree.t0, S.tree.t1); }
  if (S.callback) { R.theme = R.theme.filter(([a]) => a < S.callback.t0 - .1); add("party", S.callback.t0, S.callback.t1); }
  if (S.nyk) add("party", S.nyk.t0 + (TL.lines.h1305.know - S.nyk.t0), S.nyk.t1);
  // the replay: no theme (the slow-motion cue carries it)
  // the quiet journey: no theme from "Be one little link" to the end of the pull-out; the wonder pad there (fade out 1.2 s, back in 1.5 s)
  if (S.shrink) R.wonder.push([S.waitw.t0 + .6, S.pullout.t1 + .4]);
  if (S.kwrecap) add("calm", S.kwrecap.t0, S.kwrecap.t1);
  // ---- the cold open: the clock pill, the pedals whirring, the topple (sad trombone, grass thump, helmet bonk), the rimshots
  if (mk("clock") !== undefined) E(mk("clock") - .1, "clockpop");
  if (mk("sign") !== undefined) E(mk("sign") - .1, "softpop", 0);
  if (mk("pedal0") !== undefined) { E(mk("pedal0") + .1, "whirr", mk("topple") - mk("pedal0")); E(mk("tip") + .2, "sadtrombone"); E(mk("topple"), "thump"); E(mk("topple") + .12, "bonk"); E(mk("topple") + .3, "rustle"); }
  if (LT("e104b")) E(LE("e104b") - .1, "rimshot");
  if (LT("e107b")) E(LE("e107b") - .05, "rimshot");
  if (mk("box") !== undefined) E(mk("box"), "pat");
  // the title
  if (mk("title") !== undefined) { E(mk("title") - .05, "whoosh"); E(mk("title"), "titlesting"); [0, .35, .7].forEach((d, i) => E(mk("title") + d, "slam", i === 2 ? 2 : 0)); E(S.title.t0 + .1, "roll"); }
  // the fix cards and the lock-in (silent but for the ticks, the bell and the stamp)
  ["c1", "c2", "c3"].forEach((k, i) => E(mk(k) - .1, "cardpop", i));
  if (mk("ring0_fix") !== undefined) { const r0 = mk("ring0_fix"), d = mk("bell_fix") - r0; for (let s = 0; s < d - .01; s += .5) E(r0 + s, "tick", Math.abs(s - Math.round(s)) < .01 ? 1 : 0); for (let s = d - 2; s < d - .01; s += .25) if (Math.abs((s * 2) - Math.round(s * 2)) > .01) E(r0 + s, "tick", 0); E(mk("bell_fix"), "bell"); E(mk("bell_fix") + .05, "stamp"); }
  [["e206p", 0], ["e207b", 1], ["e208m", 2]].forEach(([id, i]) => { if (TL.lines[id]) E(LT(id) - .1, "pick", i); });
  if (mk("roll55") !== undefined) E(mk("roll55"), "clockpop");
  // fix 1: the pedals whirr (rising), the replay (rewind, slow-motion cue, Pip's line slowed), STILL STUCK
  if (S.pedal) { E(LT("e302p") - .1, "whirr", LE("e303m") - LT("e302p") + .4); E(LE("e306b") - .1, "rimshot"); }
  if (S.replay) { E(S.replay.t0, "rewind"); E(mk("slow0") - .3, "slowmo"); E(mk("stuck") + .35, "stamp"); E(mk("stuck") + .4, "tag", 1); }
  // fix 2: the clock, the rope tied, the slide, the zip, the flop, the sad trombone
  if (S.rope) { E(LT("e401") - .05, "clockpop"); E(mk("tie"), "ropetie"); E(mk("lift") + .1, "lift"); E(mk("slide"), "ropehiss"); E(mk("slide") + .6, "twitch"); E(mk("flop") - .45, "zip"); E(mk("flop"), "flopsoft"); E(mk("flop") + .2, "sadtrombone"); E(LE("e403m") - .1, "rimshot"); }
  // the look-closer: whoosh in, the gear's chain clicks, the labels, the verdict, the key word
  if (S.lcchain) { E(S.lcchain.t0 - .1, "whoosh"); for (let t = mk("pulls") - .3; t < mk("pulls") + 2; t += .25) E(t, "chainclick"); for (let t = mk("drive"); t < mk("kw_function") - .3; t += .3) E(t, "chainclick", 1); E(mk("tooth") - .1, "tagpop", 0); E(mk("gaps") - .2, "tagpop", 1); E(mk("v_chain"), "tag", 0); E(LE("e505b") - .1, "rimshot"); }
  // the journey
  if (S.waitw) E(S.waitw.t1 - .6, "shrink");
  if (S.shrink) { E(mk("jpush"), "metalhum"); E(mk("jgrab") - .05, "clunk"); for (let t = mk("jgrab") + .8; t < S.shrink.t1 - .3; t += t < LT("e605") ? .8 : .25) E(t, "clunk", 1); E(mk("jwheel"), "warmswell"); for (let i = 0; i < 4; i++) E(mk("jtug") + i * 1.2, "softwhoo", i); }
  if (S.pullout) E(S.pullout.t0, "whooshout");
  // fix 3: the clock, the chain fitted (sped up), the test: chain clicks, the back wheel spins, freewheel ticking; the four pictures; INTERACT
  if (S.chainfix) { E(LT("e701") - .05, "clockpop"); for (let i = 0; i < 6; i++) E(mk("fit") + i * .25, "chainclick"); E(mk("lift3") + .1, "lift"); for (let t = mk("crank"); t < mk("crank") + 1.4; t += .12) E(t, "chainclick", 1);
    E(mk("crank") + 1.4, "freewheel", 4.5); E(mk("spins"), "warmchord"); E(mk("spins") + .25, "tag", 0); ["p1", "p2", "p3", "p4"].forEach((k, i) => E(mk(k), "rise", i)); E(LE("e706b") - .1, "rimshot"); }
  // the brakes: the clock, the squeezes (two air squeaks, one sad trombone note), the insets, the parts going back on, the think card, the side by side
  if (S.brakes) { E(LT("e707b") - .05, "clockpop"); E(mk("squeeze"), "squeak"); E(mk("squeeze") + .75, "squeak"); E(mk("ohno") + .1, "sadnote"); E(mk("brk") - .1, "softpop", 0); E(mk("bellw") - .1, "softpop", 1);
    for (let i = 0; i < 5; i++) E(mk("refit") + .2 + i * .35, "spanner"); E(mk("refit") + 2.1, "bellting"); E(mk("think") - .1, "curious"); [0, 1, 2].forEach((i) => E(mk("think0") + .05 + i * 1.17, "softtick"));
    E(mk("side") - .1, "softpop", 2); E(mk("kw_system") - .2, "sparkle"); }
  // the ride, inside Pip, the rain tree
  if (S.ride) { E(S.ride.t0 + .1, "go"); E(mk("go"), "bellting"); E(S.ride.t0 + 2.6, "farbell"); for (let t = S.ride.t0 + .2; t < S.ride.t1; t += .42) E(t, "jogstep", .5); }
  if (S.inpip) { E(S.inpip.t0 - .1, "whoosh"); for (let t = mk("heart"); t < S.inpip.t1 - .3; t += t > mk("widen") ? .48 : .66) E(t, "heartbeat"); for (let t = mk("breath"); t < S.inpip.t1 - .3; t += t > mk("widen") ? 1.05 : 1.5) E(t, "breathe"); E(LE("e805b") - .1, "rimshot"); }
  if (S.tree) { ["lv", "stm", "rts"].forEach((k, i) => E(mk(k) - .1, "softpop", i)); }
  // the callback: rimshot; the bell, twice, with Heart's hint under the second ring; the coin
  if (S.callback) { E(LE("e1002b") - .1, "rimshot"); const r0 = W("e1003p", "ring"), r1 = W("e1003p", "ring", 1); E(r0, "bellting"); E(r1, "bellting"); E(r1 + .08, "hint"); E(mk("coin1"), "coin", 0); E(mk("coin1") + .05, "cheerhit"); }
  // the link to EP2: the hops, the help-desk bell
  if (S.next) { for (let i = 1; i <= 4; i++) E(mk("hop") + i * 1.5 / 4, "hop", i); E(LT("e1102g") - .15, "deskbell"); }
  // key words: the chime as each lands (the series' term sound)
  for (const k of KW) E(k.t, "term");
  if (S.words) E(S.words.t0 + .1, "paper");
  if (S.kwrecap) { KWLINE.forEach((id, i) => { if (TL.lines[id]) E(LT(id) - .05, "glow", i); }); if (TL.lines.h864) E(LT("h864"), "sting"); }
  if (TL.lines.h1305) { const kn = TL.lines.h1305.know; E(kn, "blast"); E(LT("h1304o"), "drum", 0); E(LT("h1304t"), "drum", 1); }
  if (S.blooper) { E(S.blooper.t0, "scratch"); E(LT("e1601p") + .1, "bellting"); E(mk("boing"), "boing"); E(mk("boing") + .9, "thump"); E(mk("take2"), "clapper"); }
  tidy();
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
