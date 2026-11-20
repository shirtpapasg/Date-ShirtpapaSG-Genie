// sound_cues.js: every sound of the three moments, hung on the SAME cue the picture uses (runs in the page: W, LT, MK, SCN ...).
// dump_cues.js writes window.CUES to cues_p<N>.json; song.js plays it. Nothing is timed twice.
window.CUES = (() => { const ev = [], E = (t, k, v) => ev.push({ t: Math.round(t * 1000) / 1000, k, v }), S = SCN, R = { groove: [], calm: [], rain: [], birds: [], night: [], wonder: [], roll: [] };
  const sayit = (id) => E(LT(id) - .05, "softpop", 2), G = (a, b) => { if (b > a + 1) R.groove.push([a, b]); }, C = (a, b) => { if (b > a + 1) R.calm.push([a, b]); };
  if (PART === 1) { const a = "c101", b = "c102", c = "c103", d = "c104", h = "c106";
    // the silent open: morning birds, the spider lets itself down, the buddies pop in
    R.birds.push([0, S.dare.t0 + .3]); E(.5, "pop", 1); E(.9, "curious"); E(1.5, "whirr", .5); E(2.0, "pluck", 7); E(1.75, "squeak"); E(2.5, "pop", 0); E(3.4, "pop", 2); E(3.7, "whirr", .9); E(2.2, "koel");
    E(W(a, "ant") - .25, "pop", 0); E(W(a, "spider") - .25, "pop", 2); E(W(a, "only") - .1, "slam", 0); E(W(a, "only") + .05, "curious");
    [0, 1].forEach((i) => E(W(b, "both") - .05 + i * .12 + .1, "tag", 1)); E(W(c, "small") - .05, "rub"); E(W(c, "small") + .4, "tap"); E(W(c, "small") + .5, "tap");
    E(W(c, "count") - .12 + .14, "slam", 2); E(W(c, "count") - .2, "whoosh"); E(W(c, "count") + .4, "sting"); E(LT(d) - .1, "softpop", 1); E(W(d, "hold") - .1, "softpop", 3);
    for (let i = 0; i < 4; i++) E(LT(d) - .1 + i * .7, "tick", i % 2);
    // today's big dare
    E(S.dare.t0 + .02, "whoosh"); E(W("c105", "count") - .1, "slide"); E(W("c105", "count") + .4, "squeak"); E(W(h, "todays") - .15 + .14, "slam", 1);
    ["insect", "reptile", "mammal"].forEach((w, i) => { E(W(h, w) - .2, "pop", i); E(W(h, w) - .1, "rise", i * 2); }); E(W(h, "which") - .12 + .14, "slam", 0); E(W(h, "which") + .1, "curious");
    E(LE("c107") + .1, "sparkle"); E(LE("c108") - .5, "boop", 2); E(LE("c109") + .1, "sting"); for (let i = 0; i < 5; i++) E(MK("lockit") + i * .55, "pip", i % 3);
    G(LT(b) - .4, LT(c) + 1.6); G(S.dare.t0 + .2, TL.END); }
  if (PART === 2) { const td = MK("dive"), tW = MK("walk"), tS = MK("sun"), tC = MK("cloud"), tP = MK("pullout"), B = "j209";
    R.birds.push([0, td + .6]); E(.15, "pop", 1); sayit("j200"); E(LT("j201") - .1, "softpop", 0); E(td - .55, "shrink");
    R.wonder.push([td + .4, tP + 1.2]); R.birds.push([td + 1.2, tP + .5]);
    E(LT("j202") - .2, "chime2", 0); E(W("j203", "dry") - .15, "softpop", 0); E(W("j203", "moist") - .1, "softpop", 1); E(W("j203", "scales") - .5, "chime2", 1);
    // footsteps: slow in the shade, quicker on the way into the sun
    for (let t = td + 1.4, i = 0; t < tW; t += 1.2, i++) E(t, "step", .5); for (let t = tW + .2, i = 0; t < tS + .3; t += .28, i++) E(t, "step", .8);
    E(W("j204", "cool") - .15, "drip", 0); E(W("j204", "cool", 1) - .15, "drip", 2); E(MK("cool") - .5, "softpop", 2); E(MK("cool") - .3, "softpop", 3);
    E(tS - .4, "leafrise"); E(W("j206", "warm") - .15, "chime2", 1); E(W("j206", "warms") - .3, "chime"); E(tC + .2, "stretch"); E(W("j207", "cool") - .15, "drip", 1); E(W("j207", "cool") + .4, "drip", 3);
    E(tP, "whooshout"); E(tP + 1.0, "paper"); E(W("j208", "cold-blooded") - .05, "chime2", 1); E(W("j208", "humans") - .5, "pop", 1); E(W("j208", "changes") - .2, "softpop", 4); E(tP + 4.2, "leafrise");
    E(W(B, "dry") - .1, "pick", 0); E(W(B, "cold-blooded") - .1, "pick", 1); E(W(B, "me") - .15, "slam", 0); E(W(B, "reptile") - .15 + .14, "reveal"); E(LE(B) + .2, "sparkle");
    C(tP + 1.4, LT(B) - .2); G(LT(B) + .3, TL.END); }
  if (PART === 3) { const L = "e301";
    E(S.kwrecap.t0 + .1, "whoosh"); KWLINE.forEach((id, i) => E(LT(id), "glow", i)); E(LT("h864"), "sparkle"); C(S.kwrecap.t0 + .3, S.next.t0);
    E(S.next.t0 + .02, "whoosh"); E(S.next.t0 + .39, "slam", 1); E(W(L, "mushroom") - .3, "pop", 1); E(W(L, "soil") - .2, "softpop", 0); E(W(L, "stays") - .15, "softpop", 2); E(W(L, "so") - .6, "pop", 2); E(W(L, "so") - .1 + .14, "slam", 0); E(W(L, "so") + .2, "curious");
    E(W("e302", "leaves") - .2, "chime2", 1); E(W("e302", "leaves") + .3, "softpop", 3); E(LE("e304") + .1, "boop", 0); E(LE("e304") + .25, "boop", 2); E(LT("e303") - .1, "sting"); for (let i = 0; i < 4; i++) E(LT("e303") + .5 + i * .6, "tick", i % 2);
    G(S.next.t0 + .3, S.nyk.t0 - .2);
    E(S.nyk.t0 + .1, "whoosh"); sayit("u1300"); E(LT("h1304o") + .008, "drum", 0); E(LT("h1304t") + .008, "drum", 1); E(LT("h1305") + .007, "drum", 2); E(TL.lines.h1305.know, "blast"); [0, 1, 2].forEach((i) => E(TL.lines.h1305.know + .5 + i * .22, "pick", i)); R.outro = [TL.lines.h1305.know + 1.0, TL.END]; }
  // key words: a soft chime as the term pops, a pop as it lands on the shelf
  for (const k of KW) { if (k.big) { E(k.t, "term"); E(k.tl, "shelfpop", k.i); } }
  return { ev: ev.sort((a, b) => a.t - b.t), R, END: TL.END, lines: TL.order.map((id) => ({ id, t: TL.lines[id].t, who: TL.lines[id].who })) }; })();
