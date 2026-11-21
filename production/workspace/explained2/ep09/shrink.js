// shrink.js: the first-person journeys (the series' signature). The camera IS the thing.
// EP9: Part 1 = BE A THREAD in a fabric bag (the weave, five books drop in, the handles lift, pulled tight, no tear, all the way home).
//      Part 2 = BE A RUBBER BAND at the chicken rice stall (the hook, bent in half, looped round a packet of rice, the bag, home, flexible).
// Stage 1: both are phScene placeholders in p1.js / p2.js (SC.shrink). EP8's sand and sap journeys (ep08/shrink.js) are the models.
// STAGE 2 (Fable) draws SC.shrink for each part here; the timeline marks are listed in SCENES_TODO.md. EP5's frog and mudskipper
// journeys (ep05/shrink.js) and EP6's are the models: dive, youTag, feelTag, wipe in and out.
// The generic helpers below are EP5's, kept as they were.
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 34, 600) / 2 + 26, 76, txt, 34, P.ink, "#fff", { w: 600 }));
// a soft tag that names what you feel (bottom centre, above the bottom fifth)
const feelTag = (t, t0, t1, txt, y = 790, x = 960) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 46, "#fff", P.ink, { w: 700 }));
// light rays under water
const uwRays = (t, col = "#fff", o = .13) => [0, 1, 2, 3, 4].map((i) => { const x = 200 + i * 400 + 60 * Math.sin(t * .5 + i * 1.3); return `<path d="M${n2(x)} -20 L${n2(x + 150)} -20 L${n2(x - 120 + 80 * Math.sin(t * .3 + i))} 1100 L${n2(x - 380)} 1100z" fill="${col}" opacity="${n2(o * (.6 + .4 * Math.sin(t * .8 + i * 2)))}"/>`; }).join("");
// specks drifting past as you move forward: d = how far you have swum (in "screens")
const uwSpecks = (d, n = 36, col = "#fff") => { let s = ""; for (let i = 0; i < n; i++) { const an = hash(i, 3) * Math.PI * 2, v = (hash(i, 7) + d * (.6 + .8 * hash(i, 5))) % 1, r = 60 + v * v * 1300, x = 960 + Math.cos(an) * r, y = 470 + Math.sin(an) * r * .62; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 9 * v)}" fill="${col}" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; } return s; };

/* ====================================================================================================================================
   STAGE 2. Shared by both journeys: a soft dip through one colour between two stops, and the tag at the top for the hot section.
   ==================================================================================================================================== */
const dip = (t, tc, col, d = .4) => { const a = 1 - Math.abs(t - tc) / d; return a <= 0 ? "" : `<rect width="1920" height="1080" fill="${col}" opacity="${n2(ss(0, 1, a))}"/>`; };
const topTag = (t, t0, t1, txt) => t < t0 || t > t1 + .3 ? "" : TF(960, 76, spring(t, t0, .45) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, 36, P.ink, P.sun, { w: 700 }));
const wordStrip = (t, t0, t1, word, rest, y = 960) => { const a = ramp(t, t0, .3) * (1 - ramp(t, t1, .3)); if (a <= 0) return ""; const fam = "Atkinson Hyperlegible", txt = word + rest, w = tw(txt, 52, 700, fam), x = 960 - w / 2;
  return OP(a, `<g filter="url(#dropS)"><rect x="${n2(x - 44)}" y="${y - 52}" width="${n2(w + 88)}" height="104" rx="22" fill="url(#gPaper)"/><rect x="${n2(x - 44)}" y="${y - 52}" width="14" height="104" rx="7" fill="${P.sun}"/></g><rect x="${n2(x - 4)}" y="${y - 6}" width="${n2(tw(word, 52, 700, fam) + 8)}" height="26" rx="5" fill="#FFD75A"/><text x="${n2(x)}" y="${y + 18}" font-family="${fam}" font-weight="700" font-size="52" fill="${P.ink}">${esc(txt)}</text>`); };
