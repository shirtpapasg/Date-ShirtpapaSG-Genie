// sound_cues.js: every sound of the episode as an event hung on the SAME cue the picture uses (runs in the page: W, LT, MK, R1, SORT...).
// dump_cues.js writes window.CUES to cues.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const lock = (q, r0, dur, lockId, picks, tL, tR, o = {}) => { if (tL) { E(tL, "cardL"); E(tR, "cardR"); } ringTicks(r0, dur).forEach((t, i) => E(t, "tick", (t - r0) % 1 < .01 ? 1 : 0)); E(r0 + dur, o.peep ? "peep" : "bell"); E(LT(lockId) - .08 + .14, "stamp"); E(r0, "bellicon");
    picks.forEach((id, i) => E(LT(id) - .1 + .11, "pick", i)); };
  const chant = (id) => { const L = TL.lines[id]; for (let b = -1; b < 4; b++) { const t0 = L.t + b * L.bar; if (t0 + L.bar * .25 < L.t - .8) { if (t0 + L.bar * .5 >= L.t - .8) E(t0 + L.bar * .5, "stomp"); continue; } if (t0 >= L.t - .8) E(t0, "clap"); E(t0 + L.bar * .25, "clap"); E(t0 + L.bar * .5, "stomp"); } E(L.t + 4 * L.bar - .28, "sparkle"); };
  if (PART === 1) {
  // ---- 1 cold open
  const tb = MK("coldBox"), tl = MK("coldLid"), t30 = MK("coldD30"), tc = MK("coldCut");
  R.rain.push([0, t30]); E(.5, "koel"); E(1.7, "koel"); E(.9, "mrt");
  ["clink", "jingle", "tap", "potthud", "rustle", "set"].forEach((k, i) => E(tb + .15 + i * .78 + .42, k));
  { const land = tb + .15 + 5 * .78 + .42; for (let i = 0; i < 4; i++) E(land + .15 + i * .15, "ratchet"); for (let i = 0; i < 6; i++) E(land + .75 + (i + 1) * .26, "step", i); let t = land + .75 + 7 * .26; while (t < tl + 1.6) { E(t, "step", 1); t += .26; } }
  E(tl + .4, "lid"); E(tl + .75 + .16, "clack"); E(t30, "whirr", .45); E(t30 + .45, "clack"); E(t30 + .75, "lowdrum"); E(t30 + 1.2, "lowdrum", .6);
  // ---- 2 hook, title, practice
  E(LT("h201"), "pluck", 0); E(W("h201", "this", 1), "pluck", 4); E(W("h201", "one"), "pop", 0); E(W("h201", "one", 1), "pop", 2);
  E(S.title.t0 + .1, "whoosh"); [.26, .66, 1.11].forEach((d, i) => E(S.title.t0 + d, "slam", i));
  lock("h203", MK("ring0_p"), 5, "h204", ["p205", "b206", "m207"], W("h203", "left"), W("h203", "right"));
  E(WE("h208", "thing") - .25, "tag"); E(W("h208", "eyes"), "pop", 1);
  // ---- 3 game, goals
  E(S.game.t0 + .15, "sting"); ["pip", "basil", "momo"].forEach((w, i) => E(W("h301", w) - .08, "pop", i * 2));
  { const b = "h302", c = [W(b, "one"), W(b, "one") + .5, W(b, "one") + 1.0]; c.forEach((t, i) => E(t, "pip", i)); E(W(b, "cicak") - .1, "chek"); E(W(b, "cicak") + .9, "chek"); E(W(b, "no"), "boop"); }
  [.6, 1.5, 2.4].forEach((d, i) => E(S.goals.t0 + d - .12, "softpop", i));
  // ---- 4 garden
  R.birds.push([S.garden.t0, S.mark1.t0], [S.garden2.t0, S.count.t0]); E(S.garden.t0 + 1.2, "bikebell");
  ["mynah", "ants", "papaya", "bench", "bicycle", "blue"].forEach((w, i) => E(W("h402", w), "rise", i)); [W("h402", "so"), W("h402", "so") + .12, W("h402", "many"), W("h402", "many") + .12, W("h402", "different")].forEach((t, i) => E(t, "rise", 6 + i));
  for (let i = 0; i < 4; i++) E(S.garden.t0 + .3 + (i + 1) * .3, "hop", i);
  E(LE("h403") + .25, "chime");
  for (let i = 0; i < 6; i++) { E(W("h405", "groups") + i * .09, "softpop", i); E(W("h405", "six") - .1 + i * .16 + .5, "hop", i); }
  // ---- 5 countdown, Day 1
  ["three", "two", "one"].forEach((w, i) => E(W("h501", w), "drum", i)); E(W("h501", "go"), "cymbal");
  E(S.day1.t0 + .25, "clack"); [1.0, 2.0, 2.9, 3.8].forEach((d, i) => E(S.day1.t0 + d, "softpop", i));
  // ---- 6 Round 1
  E(S.r1card.t0, "roundcard");
  R1.steps.forEach((t, i) => E(t, i === R1.steps.length - 1 ? "clunk" : "step", t > R1.cut && t < S.r1ev.t0 ? .6 : 1));
  lock("h601", MK("ring0_1"), 5, "h602", ["b603", "p604", "m605"], W("h601", "left"), W("h601", "right"));
  { const a = "h606", b = "h606b", c = "h607"; E(W(a, "spring") - .15, "window"); R.night.push([W(b, "all") - .2, W(b, "all", 1) - .15]); E(W(b, "all", 1) - .1, "morning"); E(W(b, "day"), "clack");
    ["water", "food", "air"].forEach((k, i) => E(W(c, k) - .05, "boop", i)); E(W(c, "grow") - .1, "boop", 3); E(W(c, "non-living") - .2 + .1, "tag"); }
  E(WE("h608", "right") + .15, "coin"); E(WE("h608", "right") + .7, "coin", 1);
  // ---- 7 Round 2 and the shrink
  E(S.r2card.t0, "roundcard"); E(S.r2.t0 + .15, "clack");
  lock("h701", MK("ring0_2"), 5, "h702", ["p703", "m704", "b705"], W("h701", "living"), W("h701", "non-living"));
  E(MK("dive"), "shrink"); R.wonder.push([MK("dive") + .6, S.r2out.t0 + .4]);
  { const d0 = MK("dive") + 2; for (let i = 0; i < 16; i++) E(d0 + i * 1.37 + hash(i, 5) * .5, "drip", i); E(MK("crack") - .9, "creak"); E(MK("crack"), "crack"); E(LT("h709"), "crack", 1); E(W("h709", "a") - .3, "stretch"); }
  E(S.r2out.t0, "whooshout"); E(S.r2out.t0 + 1.25, "clack"); E(S.r2out.t0 + 2.2, "clack"); E(WE("h711", "thing") - .05, "tag");
  E(WE("h712", "left") + .15, "coin"); E(W("h714", "green", 1) - .2, "softpop", 1); E(W("h714", "non-living") - .05, "tag", 1); E(LT("p713") + 1.1, "scribble");
  // ---- Part 1's ending
  { const L = "h850", tq = W(L, "what") - .15; E(tq, "whirr", .7); E(tq + .7, "clack"); E(tq + .45, "potthud"); E(tq + .9, "lowdrum"); E(tq + 1.5, "lowdrum", .6); E(W(L, "find") - .1, "sting"); E(S.p1score.t0 + .1, "sting"); E(W("h851", "score") - .1, "pip", 0); E(W("h851", "score") + .4, "pip", 1); }
  E(MK("crack") * 0 + (W("h606b", "all") + .5), "chek", .5); E(W("h606b", "all") + 1.3, "chek", .5);
  E(LT("h1305") - .05, "final");
  } else {
  // ---- Part 2's silent open: the recap
  { const t0 = S.recap.t0; ["clink", "jingle", "tap", "potthud", "rustle", "set"].forEach((k, i) => E(t0 + (.1 + .15 + i * .78 + .42) / 2.3, k)); E(t0 + (5.0 + .4 + .1) / 2.3, "lid"); E(t0 + (5.0 + .91 + .1) / 2.3, "clack");
    const n = S.recap.t1 - t0 - 2.7 - .35; for (let i = 1; i <= 9; i++) E(t0 + 2.7 + i / 9 * n, "clack"); R.calm.push([t0 + .2, S.recapline.t0 + .4]);
    const L = "h880"; E(W(L, "non-living") - .05, "tag", 1); E(W(L, "living") - .05, "tag", 1); E(W(L, "so") - .15, "sting"); for (let i = 0; i < 5; i++) E(W(L, "the") - .2 + i * .27, "step", .7); }
  // ---- 8 clue, chant
  E(W("h801", "not"), "boop", 0); E(W("h801", "not", 1), "boop", 1); E(W("h801", "what") - .1, "chime2", 0); E(W("h801", "what", 1) - .1, "chime2", 1);
  ["water", "food", "air", "grow", "respond", "reproduce"].forEach((w, i) => E(W("h802", w), "softpop", i));
  chant("c803");
  // ---- 9 the sort
  E(S.sort.t0 + .3, "clack"); E(S.sort.t0 + .5, "sting");
  for (const [k, t] of Object.entries(SORT.mv)) { E(t, "slide"); if (k !== "dish") E(t - .16, (k in SOFTX) ? "squeak" : "knock"); }
  lock("h903", MK("ring0_3"), 5, "h904", [], null, null, { peep: true }); E(WE("h904", "crossed") + .2, "coin"); E(W("h904", "soft") - .1, "flip"); E(W("h904", "hard") - .1, "flip"); E(LE("h907") + .25, "chime");
  E(W("h907", "similarities") + .4, "softpop", 2); E(W("h908", "living") - .15, "flip"); E(W("h908", "living") + .2, "flip");
  // ---- 10 Showdown
  E(S.showcard.t0, "roundcard"); E(S.show.t0 + .1, "paper"); R.roll.push([LT("h1002"), W("h1002", "pip")]);
  ["one", "two", "three"].forEach((w, i) => E(W("h1003", w) - .08, "pip", i));
  lock("h1003", MK("ring0_4"), 6, "h1004", ["b1005", "m1006", "p1007"], null, null);
  { const L = "h1008"; E(W(L, "from") - .1, "leafrise"); E(W(L, "it"), "chek", .5); E(W(L, "it") + .8, "chek", .5); E(W(L, "living") - .05, "tag"); }
  E(S.fixed.t0 + .25, "rub"); E(S.fixed.t0 + .95, "scribble"); E(LT("p1009") + .35, "softpop", 3); E(WE("h1010", "fingers") + .25, "coin2"); E(WE("h1010", "fingers") + .85, "coin2", 1);
  // ---- 11 ways
  E(S.ways.t0 + .15, "softpop", 0); E(W("h1101", "other") - .1, "softpop", 1); E(W("h1101", "other") + .12, "softpop", 2); ["pictures", "table", "graphic"].forEach((w, i) => E(W("h1102", w), "rise", i * 2)); E(LE("h1102") + .25, "chime");
  // ---- 12 Day 30
  E(S.day30.t0 + .1, "whirr", 1.1); E(S.day30.t0 + 1.2, "clack"); E(S.day30.t0 + .9, "lowdrum"); E(MK("reveal") - .5, "lowdrum", .6); E(MK("reveal"), "reveal");
  E(W("h1203", "three") - .1, "softpop", 0); E(W("h1203", "three", 1) - .1, "softpop", 2); chant("c1204");
  // ---- 13 ending
  E(S.final.t0 + .1, "sting"); E(W("h1301", "high") + .2, "slap"); E(W("h1301", "three") - .1, "pip", 2);
  E(S.cicak.t0 + .5, "chek"); E(S.cicak.t0 + 1.4, "chek"); E(S.day31.t0 + .35, "clack"); E(S.day31.t0 + .7, "curious"); E(LT("h1305") - .05, "final");
  }
  const G = (a, b) => R.groove.push([a, b]), C = (a, b) => R.calm.push([a, b]);
  if (PART === 1) { G(S.title.t0 + 1.2, MK("ring0_p")); G(LT("p205") - .5, S.game.t0); G(S.game.t0 + .6, S.garden.t0); C(S.garden.t0 + 1, S.mark1.t0 - .3); G(S.garden2.t0, S.count.t0 - .2); C(S.day1.t0 + .5, S.r1card.t0);
    G(S.r1.t0, MK("ring0_1")); G(LT("b603") - .5, S.r1ev.t0); C(S.r1ev.t0 + .5, W("h606b", "all") - .5); G(S.r1score.t0, S.r2card.t0); G(S.r2.t0, MK("ring0_2")); G(LT("p703") - .5, S.lean.t0 + .5);
    G(S.r2out.t0 + 1.3, S.tease.t0); C(S.tease.t0 + .3, W("h850", "what") - .3); G(S.p1score.t0, S.nyk.t0 - .3); }
  else { G(S.recapline.t0 + .5, S.clue.t0); C(S.clue.t0 + .3, S.chant.t0 - .2); G(S.sort.t0 + .6, MK("ring0_3")); G(LT("h904"), S.mark2.t0 + 2); G(S.relabel.t0, S.showcard.t0); G(S.show.t0 + .3, MK("kw_table")); G(MK("kw_table") + 2, MK("ring0_4")); G(LT("b1005") - .5, S.replay.t0);
    C(S.replay.t0 + .4, S.fixed.t0); G(S.fixed.t0 + 1, S.ways.t0 + 2.2); G(MK("reveal") + 1.6, S.piles.t0 + 1); G(S.final.t0, S.day31.t0); }
  // ---- key words: a soft chime as the term pops, a pop as it lands on the shelf; the recap glow
  for (const k of KW) { if (k.big) E(k.t, "term"); E(k.tl, "shelfpop", k.i); } KW.forEach((k, i) => E(MK("recap") + i * .4, "glow", i));
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
