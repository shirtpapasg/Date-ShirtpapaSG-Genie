// sound_cues.js: P4 EP1 v2's sound plan (runs in the page: W, LT, LE, MK, SCN, KW, TL ...). dump_cues.js writes window.CUES to cues_p1.json;
// song.js plays it. Every sound hangs on the SAME mark the picture uses (script.py). The music (script section 3): the ORIGINAL series music
// and the P4 "Scoop Parade" family (never Kampong Walk), one bar clock for the whole video, 0.8 s crossfades, ducked under every voice:
// R.theme   Scoop Parade (theme): cold open (2 bars, then the record scratch), title, fix cards, picks, the flashback stops, the reversal
// R.action  Scoop Parade ACTION (new voicing: big toms, brass stabs, rising strings, a choir "ahh"): the runaway set piece, the race start
// R.lite    Scoop Parade lite (e-piano and bass): the look-closer, the think card, the body and the tree, the words that earn marks
// R.party   the finale voicing: from SYSTEM's battle cry to the cosy end; after "Now you know!"; the blooper
// R.wonder  the series micro-world pad, alone: the journey (fade out 1.2 s into j901, back in 1.5 s after the pull-out)
// R.calm    the series calm bed: the read-along
// Silence (no bed): the freeze-frame (record scratch, one ice clink), the lock-in (ticks, the bell, LOCKED IN!), the moment the bike starts
// to roll (one low cello note), Heart's trailer aside (BWAAM, a riser, silence between phrases, a needle-skip back), the split-screen race
// (the ACTION music deflates as Uncle Lim crosses). FIX PASS 6 (27 Nov): the kazoos are gone; the low SAD TROMBONE (kit/sad_trombone.js)
// plays at four joke flops only, each in the pause after the punchline (see the block before the return).
// Stings: Basil's battle cries (a 1-bar ACTION sting that COLLAPSES into the sad kazoo; the last one, v1013, resolves to the major chord),
// the slow-motion replay cue, rimshots under Basil's deadpan lines (3 at most), the record scratch and clapper (blooper). Heart mystery hint
// #2: one tiny second "ting" an octave up with a digital edge under the second ring of the restored bell (v1009).
// The toot (teacher's addition, 26 Nov): one tiny sound only, as Basil slumps (`toot`), nothing shown.
window.CUES = (() => { const ev = [], E = (t, k, v) => { if (isFinite(t)) ev.push({ t: Math.round(t * 1000) / 1000, k, v }); }, S = SCN, mk = (k) => TL.marks[k];
  const R = { theme: [], lite: [], tense: [], party: [], wonder: [], calm: [], deck: [], park: [], action: [] };
  const add = (key, a, b) => { if (b > a + .5) R[key].push([a, b]); };
  const tidy = () => { for (const k of Object.keys(R)) { const L = R[k].sort((x, y) => x[0] - y[0]), out = []; for (const r of L) { const q = out[out.length - 1]; if (q && r[0] - q[1] < .3) q[1] = Math.max(q[1], r[1]); else out.push([...r]); } R[k] = out; } };
  // ---- the beds
  add("theme", S.cold.t0, mk("frz") - .05); add("theme", mk("thaw"), S.cold.t1); add("theme", S.title.t0, S.fixcards.t1);
  add("theme", S.picks.t0 + .2, S.brakes.t1 - (S.brakes.t1 - mk("click")) - .2);   // to the kickstand's click (then one low cello note)
  add("action", S.runaway.t0 - .1, mk("bonk") + .8);
  add("theme", LT("k612") + .3, S.runaway.t1);
  add("theme", LE("r701") + .5, mk("racego") - .1); add("action", mk("racego"), LT("r703") - .2);
  add("theme", LT("r703m") - .3, S.race.t1);
  add("lite", S.lcbike.t0, S.lcbike.t1); add("lite", S.pullout.t1 + .3, S.interact.t1); R.wonder.push([S.waitw.t0 + .6, S.pullout.t1 + .4]);
  add("theme", S.reverse.t0, LT("v1006") - .2); add("lite", LT("v1006") - .2, LE("v1008") + .2); add("theme", S.rbell.t0, mk("cry4") - .1);
  add("party", mk("cry4") - .1, S.ride.t1); add("lite", S.inbasil.t0, S.words.t1); add("party", S.finish.t0, S.finish.t1);
  add("calm", S.kwrecap.t0, S.kwrecap.t1); add("party", TL.lines.h1305.know, S.nyk.t1); add("party", S.blooper.t0, S.blooper.t1);
  // ambience: the void deck on a Saturday morning everywhere outdoors; the rain tree's birds and leaves
  for (const n of ["cold", "fixcards", "picks", "bay", "bell", "chain", "snailcam", "tease", "brakes", "runaway", "race", "interact", "reverse", "rchain", "rbell", "system", "finish"]) if (S[n]) add("deck", S[n].t0, S[n].t1);
  for (const n of ["ride", "tree"]) if (S[n]) add("park", S[n].t0, S[n].t1);
  const cry = (t, collapse = false) => { E(t - .05, "actionsting"); if (collapse) E(t + 1.05, "kazoo"); };   // (fix pass 6) no kazoo: the sad trombone is kept for the real flops (at most four)
  // ---- the cold open: the freeze-frame and the record scratch; the clock; the bloops; battle cry 1; plip
  E(mk("frz") - .02, "scratch"); E(mk("frz") + .02, "freeze"); E(mk("frz") + .6, "clink"); E(mk("thaw"), "unfreeze");
  E(LT("c103") - .45, "dash"); E(mk("clock") - .1, "clockpop"); E(LT("c103") + .4, "slurp"); E(LT("c104") - .45, "dash"); ["ob", "oc", "obr"].forEach((k, i) => E(mk(k) - .05, "bloop", i));
  cry(mk("cry1")); E(LT("c106") + .8, "plip"); E(LT("c106") + 1.3, "ice");
  // the title
  E(mk("title") - .05, "whoosh"); E(mk("title"), "titlesting"); [0, .35, .7].forEach((d, i) => E(mk("title") + d, "slam", i === 2 ? 2 : 0)); E(mk("title") + .7, "brasshit");
  // the fix cards, the lock-in (silent but for the ticks, the bell and the stamp), the picks, MISS 1, the rewind
  E(S.fixcards.t0 + .2, "clocktick"); ["c1", "c2", "c3"].forEach((k, i) => E(mk(k) - .1, "cardpop", i)); E(LT("f202") + .3, "whirrblip"); E(mk("clip") - .2, "paper"); E(LE("f206") - .05, "rimshot");
  { const r0 = mk("ring0_fix"), d = mk("bell_fix") - r0; for (let s = 0; s < d - .01; s += .5) E(r0 + s, "tick", Math.abs(s - Math.round(s)) < .01 ? 1 : 0); for (let s = d - 2; s < d - .01; s += .25) if (Math.abs((s * 2) - Math.round(s * 2)) > .01) E(r0 + s, "tick", 0); E(mk("bell_fix"), "bell"); E(mk("bell_fix") + .05, "stamp"); }
  [0, 1, 2].forEach((i) => E(S.picks.t0 + .3 + i * .25, "pick", i)); E(mk("miss1"), "whiff"); E(mk("miss1") + .35, "kazoobwop"); E(mk("rew") - .3, "rewind");
  // the bay: Uncle Lim's bell far off, his slurp; battle cry 2 (shorter)
  E(S.bay.t0 + 1.8, "farbell"); E(S.bay.t0 + 4.8, "slurp"); cry(mk("cry2"));
  // stop 1: the bell
  E(mk("flick") + .02, "bellting"); E(LT("b402") + .1, "hmm"); E(LT("b404") + .3, "shing"); E(mk("clink") + .55, "clink");
  E(mk("rideoff"), "actionrise"); E(mk("rideoff") + 1.0, "pat"); for (let t = mk("rideoff") + .2; t < mk("flap"); t += .5) E(t, "freewheel", .45);
  E(mk("flap") - .15, "brakesqueak"); E(mk("flap"), "pigeontakeoff", 7); E(mk("flap") + .55, "sadtrombone", 1.7);   /* (fix pass 6) the low sad trombone replaces the kazoo */ E(LT("b408") + .6, "pigeoncoo"); E(LE("b408") - .05, "rimshot");
  // stop 2: the chain; YOUR TURN; SPROING; the snail-cam (whirr, squelch, the epic overtake swell); the replay; battle cry 3
  E(LT("n502") + .1, "hmm"); E(mk("yt2") + .1, "yourturn"); E(mk("sproing") + .02, "sproing"); E(mk("sproing") + .65, "chainheap");
  E(S.snailcam.t0, "whirr", 4.2); E(S.snailcam.t0 + .3, "actionrev"); E(mk("pedt") - 1.4, "squelch"); E(mk("ovt") - 1.0, "overtake"); E(mk("ovt") + .8, "squelch");
  E(S.replay.t0, "rewind"); E(mk("slow0") - .3, "slowmo"); E(mk("rp0") + .6, "squelchslow"); 
  cry(mk("cry3"));
  // stop 3: the brakes; the squeeze; YOUR TURN; rimshot; CLANG; the click; the roll
  E(mk("sqz"), "brakesqueak"); E(mk("yt3") + .1, "yourturn"); E(LE("k603") - .05, "rimshot"); E(mk("clang") + .02, "clang"); E(mk("lean") + .3, "standdown"); E(mk("click") + .02, "click"); E(mk("click") + .1, "cello"); E(mk("click") + .4, "creak");
  // the runaway: WHOOSH, CLATTER, BOING, FLAP, the castors, BONK, KER-SPLOOSH, plip, brrr
  E(S.runaway.t0 + .9, "whooshbig"); for (let t = S.runaway.t0 + .1; t < mk("bonk"); t += .62) E(t, "rollrumble");
  E(mk("chainrx") + .5, "clatter"); E(mk("chainrx") + 1.3, "boing"); E(mk("chainrx") + 1.8, "flutter");
  for (let t = LT("k608") - .3; t < mk("splash") - .5; t += .3) E(t, "runstep");
  E(mk("push") - .4, "castors"); E(mk("bonk"), "bonk2");  E(mk("splash"), "splash"); E(mk("splash") + 1.1, "plip"); E(mk("cold") - .2, "brrr"); E(LE("k613") - .05, "rimshot");
  // the race: the trailer boom, the riser, the needle-skip; the whistle; the split screen (pedal whirr, Lim's freewheel, his bell, a brake
  // squeak, the ribbon); the action deflates into the kazoo; the slurp; the TOOT (sound only); rimshot; STILL STUCK
  E(LT("r701") - .1, "trailerboom"); E(mk("tr2") - .1, "trailerboom"); E(mk("tr3") - .2, "riser"); E(LE("r701") + .3, "needleskip");
  E(MK("go") + .05, "whistle"); E(mk("racego"), "whirr", 5.2); for (let t = mk("racego") + .3; t < LT("r703") - .5; t += .5) E(t, "freewheel", .3);
  E(mk("racego") + 1.4, "bellring2"); E(mk("racego") + 2.3, "brakesqueak"); E(LT("r703") - .65, "ribbon");  E(LE("r703") + .1, "slurp");
  E(mk("toot"), "toot"); E(LE("r706") - .05, "rimshot"); E(mk("stuck") + .35, "stamp"); E(mk("stuck") + .4, "tag", 1);
  // the look-closer: whoosh in, the labels, the magnifier, the verdict, FUNCTION; tok; the see-saw; MISS 2 (whiff + slurp)
  E(S.lcbike.t0 - .1, "whoosh"); ["lbell", "lbrk", "lchain"].forEach((k, i) => E(mk(k) - .05, "tagpop", i)); E(mk("lchain") + .3, "shing"); for (let t = mk("lchain"); t < mk("kw_function") - .3; t += .3) E(t, "chainclick", 1);
  E(mk("v_chain"), "tag", 0); E(mk("tok"), "tok"); E(mk("scale"), "seesaw"); E(mk("miss2") + .35, "whiff"); E(mk("miss2") + .5, "slurp");
  // the journey
  E(S.waitw.t1 - .6, "shrink"); E(LT("j902"), "metalhum"); E(mk("jgrab") - .05, "clunk"); for (let t = mk("jgrab") + .8; t < S.shrink.t1 - .3; t += .8) E(t, "clunk", 1); E(mk("jwheel"), "warmswell"); for (let i = 0; i < 3; i++) E(mk("jtug") + i * 1.2, "softwhoo", i);
  E(S.pullout.t0, "whooshout");
  // INTERACT; the Gruffalo turn
  ["p1", "p2", "p3", "p4", "p5"].forEach((k, i) => E(mk(k), "rise", i)); E(mk("turn") + .2, "tadaa");
  // the reversal: spanner clicks, squeak, ticks; chain clicks, freewheel; Race time!; MISS 3; pen tap; Ring, ring?; the think card; the bell
  for (let i = 0; i < 5; i++) E(S.reverse.t0 + .2 + i * .3, "spanner"); E(mk("rbrk") + .1, "brakesqueak"); E(mk("tick1") - .6, "penTick");
  for (let i = 0; i < 6; i++) E(S.rchain.t0 + .2 + i * .25, "chainclick"); for (let t = mk("spin"); t < mk("spin") + 1.2; t += .12) E(t, "chainclick", 1); E(mk("spin") + 1.2, "freewheel", 3); E(mk("spin") + 1.4, "penTick");
  E(mk("miss3"), "whiff"); E(LT("v1004") + .6, "pentap"); E(LE("v1005") - .05, "rimshot"); E(LE("v1005") - .3, "pigeoncoo"); E(mk("think") - .1, "curious"); [0, 1, 2].forEach((i) => E(mk("think0") + .05 + i * 1.17, "softtick")); E(mk("side") - .1, "softpop", 2); E(mk("likely") + .3, "stamp");
  E(S.rbell.t0 + .3, "spanner"); E(mk("ring1"), "bellting"); E(mk("ring2"), "bellting"); E(mk("ring2") + .04, "hint"); E(mk("ring1") + .1, "pigeontakeoff", 1); E(mk("ring1") + .5, "penTick");
  // SYSTEM, the battle cry turned round (does NOT collapse: it resolves)
  E(mk("kw_system") + 1.6, "stamp"); E(mk("kw_system") + .2, "ooh"); E(mk("cry4") - .05, "actionsting"); E(mk("cry4") + 1.05, "resolve");
  // the ride, the body, the tree
  E(S.ride.t0 + 1.6, "bellring2"); E(S.ride.t0 + 2.6, "brakesqueak"); E(S.ride.t0 + .3, "cheerhit"); for (let t = LT("e1101") - .5; t < S.ride.t1; t += .9) E(t, "breathe");
  E(S.inbasil.t0 - .1, "whoosh"); for (let t = mk("heart"); t < S.inbasil.t1 - .3; t += t > mk("breath") ? .48 : .66) E(t, "heartbeat"); for (let t = mk("breath"); t < S.inbasil.t1 - .3; t += 1.05) E(t, "breathe");
  ["rts", "stm", "lv"].forEach((k, i) => E(mk(k) - .1, "softpop", i)); E(S.tree.t0 + .2, "leaves");
  // the cosy end: drum roll, the crossing fanfare (full size, for a snail), CLAP!, laughter, the coin
  E(LT("e1302") - .1, "drumroll"); E(mk("cross"), "squelch"); E(mk("cross") + .1, "fanfare"); E(mk("cross") + 1.0, "confetti"); E(mk("clap"), "clap"); E(mk("clap") + .1, "laughter"); E(mk("coin1"), "coin", 0); E(mk("coin1") + .05, "cheerhit");
  // key words: the chime as each lands
  for (const k of KW) E(k.t, "term");
  if (S.words) E(S.words.t0 + .1, "paper");
  KWLINE.forEach((id, i) => { if (TL.lines[id]) E(LT(id) - .05, "glow", i); }); E(LT("h864"), "sting");
  { const kn = TL.lines.h1305.know; E(kn, "blast"); E(LT("h1304o"), "drum", 0); E(LT("h1304t"), "drum", 1); for (let i = 1; i <= 4; i++) E(kn + 1.0 + i * .4, "hop", i); E(kn + 3.2, "deskbell"); }
  // the blooper
  E(S.blooper.t0, "scratch"); E(LT("e1601b") - .05, "actionsting"); E(mk("landp") - .45, "pigeonland", 1); E(mk("landp") + .15, "pigeonland", 1)   /* the two flights (probed: 430.8-431.3, 431.4-431.9) */; E(mk("frozen"), "stingcut"); E(mk("frozen") + .2, "pigeoncoo"); E(mk("take2"), "clapper"); E(LE("e1602b") - .1, "laughter");
  tidy();
  // ---- PIGEONS (fix pass 6, the teacher: "add sound effects of pigeon"): wherever pigeons are on screen (probed frame by frame): soft
  // coo-roos while they sit, wing-flap bursts on the drawn take-off / landing / hop frames, a few pecks while they peck; a coo or a peck
  // only where no line is being spoken (free), so nothing sits on Heart's or a buddy's words
  // ---- the SAD TROMBONE (fix pass 6): four joke-flop beats, each in the pause after the punchline (never on a word): the pigeons land on
  // the bell-less Basil; "Because it's LIGHTER!" (he lost to a snail); the teacher's toot ("Was that the bike?" "Yes."); and the teacher's
  // 3:34, after Momo's "Your bike didn't even move." The two race pauses are short (.6 s), so those two are the quick version.
  { const gapAfter = (id) => { const e = LE(id); let nx = 1e9; for (const k of TL.order) { const L = TL.lines[k]; if (L.t > e - .01 && L.t < nx) nx = L.t; } return [e + .03, nx - e - .1]; };
    for (const id of ["n509", "r703b", "r705"]) { const [t0, room] = gapAfter(id); E(t0, "sadtrombone", Math.max(.5, Math.min(1.6, room))); } }
  { const free = (t, d) => TL.order.every((id) => { const L = TL.lines[id]; return t + d + .15 < L.t || t - .15 > L.end; });
    const at = (a, b, d) => { for (let t = a; t <= b - d; t += .05) if (free(t, d)) return t; return null; };
    const coo = (a, b, k = "pigeoncoo", d = .75) => { const t = at(a, b, d); if (t !== null) E(t, k); return t; };
    const pecks = (a, b, n) => { let c = 0; for (let t = a; t < b && c < n; t += .35) if (free(t, .12)) { E(t, "pigeonpeck"); c++; t += .5 + .3 * (c % 2); } };
    const tF = mk("flap"), tB = tF + 1.0;
    pecks(S.bay.t0 + .6, S.bay.t1 - .3, 4); coo(S.bay.t0 + 1.0, S.bay.t1 - .2);                          // the bay: one pigeon pecking by the bike
    pecks(mk("rideoff") + .3, tF - .25, 4); coo(mk("rideoff") + .6, tF - .3);                             // the ride-off: the flock pecks ahead of him
    E(tB, "pigeonland", 3); coo(LE("b407") + .1, LT("b408") - .1, "pigeoncoo2", 1.3) || coo(LE("b407") + .1, LT("b408") - .1);   // (the trombone has the pause after the landing)   // three land on Basil
    pecks(155.8, 157.5, 3); E(157.6, "pigeontakeoff", 5);                                                  // the runaway: the flock by the wall takes off
    E(mk("racego") + .5, "pigeonhop", 3); coo(mk("racego") + 1.6, MK("slump") + 1.0);                       // the race: they hop aside as he rings past
    E(LT("v1005") + .3 - .5, "pigeonland", 1);                                                              // the think card: one lands on Basil's helmet
    E(345.3, "pigeonhop", 4); E(345.9, "pigeonhop", 3); coo(346.3, S.ride.t1);                              // the victory lap: they hop as the riders pass
  }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
