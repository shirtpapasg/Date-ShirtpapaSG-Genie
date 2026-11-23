// art16.js: EP16's boards, look-closers, journeys and small pictures (Stage 2, drawn 2026-11-23). Loaded after pond16.js.
// Part 1: the ring's tadpole, Momo's idea bubble, eggsArt (the frog eggs in their jelly, cut-away), eggJourney (BE A FROG EGG), Pip's board of
//   four (fourBoard: his row, the bracket, the row turning into a loop), the loop board OUR FROG'S LIFE CYCLE (loopBoard16), chickArt (the
//   chick beside the hen, then the 2x2), the swatches idea, the tree frog's fun-fact pictures (ffFoam, ffDrop).
// Part 2: grasshopper cards and ring, nymphArt, skinArt, nymphJourney (BE THE NYMPH), Pip's homework (roachSheet), the board of four loops
//   (fourLoops), the mantis's fun-fact pictures, the recap pictures, the dare's caterpillar card.

/* ---------------------------------------------------------------- shared helpers ---------------------------------------------------------------- */
// the camera inside a picture: ts[i] = when beat i starts, F[i] = [fx, fy, z] (a push of .9 s onto each beat)
const camSeq = (t, ts, F, d = .9) => { let k = 0; for (let i = 1; i < ts.length; i++) if (t >= ts[i] - .3) k = i; const u = ss(ts[k] - .3, ts[k] - .3 + d, t), A = F[Math.max(0, k - 1)], B = F[k]; return [lerp(A[0], B[0], u), lerp(A[1], B[1], u), lerp(A[2], B[2], u)]; };
const inCam = (c, inner) => `<g transform="scale(${n2(c[2])}) translate(${n2(-c[0])} ${n2(-c[1])})">${inner}</g>`;
// a buddy's IDEA as a thought bubble with a picture inside (never a fact: it carries a ?). origin = the bubble's centre
const ideaBubble16 = (t, t0, t1, x, y, pic, col, dir = 1, id = "ib") => { if (t < t0 || t > t1 + .25) return ""; const k = spring(t, t0, .4) * (1 - eo((t - t1) / .2));
  return TF(x, y, k, `<g filter="url(#dropS)"><ellipse rx="300" ry="190" fill="#FFF8EA" stroke="${col}" stroke-width="8"/><circle cx="${dir * 220}" cy="210" r="30" fill="#FFF8EA" stroke="${col}" stroke-width="6"/><circle cx="${dir * 280}" cy="270" r="16" fill="#FFF8EA" stroke="${col}" stroke-width="5"/></g><clipPath id="${id}"><ellipse rx="280" ry="172"/></clipPath><g clip-path="url(#${id})">${pic}</g>` + TF(250, -150, 1 + .06 * Math.sin(t * 4), `<g filter="url(#dropS)"><circle r="44" fill="url(#gSun)"/></g>${T(0, 22, "?", 66, P.ink)}`)); };
const xChip16 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, `<g filter="url(#dropS)"><circle r="30" fill="#fff" stroke="${P.ink}" stroke-width="4"/></g><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
const tickChip16 = (t, t0, x, y, s = 1) => t < t0 ? "" : TF(x, y, spring(t, t0, .4) * s, tickBadge(30));
// a little fish (origin = its middle, facing right)
const fish16 = (t, o = {}) => { const w = 10 * Math.sin(t * 10); return `<path d="M-40 0 L${n2(-86 + w * .3)} ${n2(-30 + w)} L${n2(-80 + w * .3)} ${n2(30 + w)}z" fill="#FF9838" stroke="#C4581E" stroke-width="4" stroke-linejoin="round"/><ellipse rx="56" ry="34" fill="#FFB36B" stroke="#C4581E" stroke-width="4"/><path d="M-6 -30 Q10 -50 24 -28" fill="#FF9838" stroke="#C4581E" stroke-width="3"/><path d="M-20 -24 Q-26 0 -20 24" stroke="#E36A12" stroke-width="3" fill="none"/>${eye16(30, -8, 9)}<path d="M50 6 q-6 6 -12 2" stroke="#C4581E" stroke-width="3" fill="none" stroke-linecap="round"/>`; };
// a picture inside a round frame (a tile)
const tile16 = (pic, r = 104, id = "t", ring = "#D9C9A8", bgc = "#fff") => `<circle r="${r}" fill="${bgc}" stroke="${ring}" stroke-width="${n2(r * .07)}"/><clipPath id="${id}"><circle r="${n2(r * .92)}"/></clipPath><g clip-path="url(#${id})">${pic}</g>`;
// the frog's three stages as tile pictures (each drawn in -100..100)
const frogPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#8FD3E0"/><rect x="-110" y="-110" width="220" height="40" fill="#CFEFF6"/>` + TF(0, 10, .95, eggClump(t, { n: 30, r: 13, R: 70 }))
  : i === 1 ? `<rect x="-110" y="-110" width="220" height="220" fill="#8FD3E0"/>` + TF(28, 6, 1.7, tadpole16(t, 0))
  : `<rect x="-110" y="-110" width="220" height="220" fill="#DFF3D2"/><ellipse cx="0" cy="70" rx="100" ry="26" fill="#58B56C" stroke="#2F8048" stroke-width="3"/>` + TF(-6, 74, 1.05, frog16(t));
const FROGN = ["the egg", "the young: a tadpole", "the adult"];

/* ---------------------------------------------------------------- PART 1 ---------------------------------------------------------------- */
// the ring's picture (lockN obj: drawn round (430, 470), r about 175): one big tadpole swimming in a small loop
const ringTad = (tt) => `<circle cx="430" cy="470" r="180" fill="url(#p16UW)"/>` + [0, 1, 2].map((i) => `<path d="M${330 + i * 90} 290 L${360 + i * 90} 290 L${300 + i * 90} 660 L${250 + i * 90} 660z" fill="#fff" opacity=".1"/>`).join("") + [0, 1, 2, 3, 4].map((i) => { const u = ((tt * .5 + i / 5) % 1); return `<circle cx="${n2(330 + 50 * i)}" cy="${n2(610 - 300 * u)}" r="${n2(4 + 3 * hash(i, 3))}" fill="none" stroke="#fff" stroke-width="2" opacity="${n2(.7 * (1 - u))}"/>`; }).join("")
  + TF(510 + 22 * Math.sin(tt * 1.3), 480 + 14 * Math.sin(tt * 2.1), 2.55, tadpole16(tt, 0), 8 * Math.sin(tt * 1.3 + 1));
// Momo's idea: a mother frog with her babies beside her, like a cat with kittens
const momIdea = (t) => `<rect x="-300" y="-200" width="600" height="400" fill="#DFF3D2"/><ellipse cx="0" cy="110" rx="300" ry="60" fill="#58B56C"/>` + TF(-120, 120, 1.5, frog16(t)) + `<ellipse cx="120" cy="110" rx="150" ry="34" fill="#8FD3E0" stroke="#4FA0B4" stroke-width="4"/>` + [0, 1, 2].map((i) => TF(50 + i * 70, 100 - 6 * Math.abs(Math.sin(t * 3 + i)), .9, tadpole16(t, 0, { ph: i }))).join("");
// LOOK CLOSER · the frog eggs in their jelly (a cut-away side view of the pond). Beats: clump, dots (the magnifier on one egg), the key word
// (the jelly-like covering), fish (a fish's mouth slides off the slippery jelly), sun (the water drops; the top eggs stay wet), the verdict
const JELLYC = "#8B5CF6";
function eggsArt(t) { const m = MK, tC = m("clump"), tD = m("dots"), tK = m("kw_jelly_like_covering"), tF = m("fish"), tS = m("sun"), tV = m("v_eggs"), s0 = SCN.lceggs.t0 + 1;
  const c = camSeq(t, [s0, tC, tD, tF, tS, tV - .8], [[0, 0, 1], [-110, -40, 1.32], [120, -20, 1], [120, 20, 1.08], [180, -60, 1.02], [60, -10, .98]]);
  const drop = 34 * ss(tS + .6, tS + 2.2, t), SY = -150 + drop, CX = -120, CY = -50;
  let w = `<rect x="-1300" y="-800" width="2600" height="1600" fill="url(#p16UW)"/><rect x="-1300" y="-800" width="2600" height="${n2(650 + SY)}" fill="#DDF2E8"/>`
    + `<rect x="-1300" y="-800" width="2600" height="${n2(650 + SY)}" fill="#FFE9A8" opacity="${n2(.6 * ss(tS, tS + 1.2, t))}"/>`;
  // reeds and the far bank above the surface
  for (let i = 0; i < 18; i++) { const x = -1000 + i * 120 + 30 * hash(i, 3), h = 260 + 160 * hash(i, 5); w += `<path d="M${n2(x)} ${n2(SY)} Q${n2(x + 20 * Math.sin(t * .8 + i))} ${n2(SY - h * .6)} ${n2(x + 30 * (hash(i, 7) - .5))} ${n2(SY - h)}" stroke="${i % 2 ? "#6CC36E" : "#4FA866"}" stroke-width="10" fill="none" stroke-linecap="round"/>`; }
  // the sun (comes out on "sun")
  if (t >= tS - .2) { const k = spring(t, tS - .2, .6); w += TF(560, -470, k, `<circle r="120" fill="#FFE27A" opacity=".35"/><circle r="84" fill="#FFD23A" stroke="#F2A81E" stroke-width="6"/>${[...Array(10)].map((_, i) => `<path d="M0 -104 V-150" stroke="#FFC83A" stroke-width="10" stroke-linecap="round" transform="rotate(${n2(i * 36 + 10 * Math.sin(t))})"/>`).join("")}`); }
  // light rays and specks under the water
  for (let i = 0; i < 6; i++) { const x = -900 + i * 330 + 40 * Math.sin(t * .5 + i); w += `<path d="M${n2(x)} ${n2(SY)} L${n2(x + 110)} ${n2(SY)} L${n2(x - 60)} 700 L${n2(x - 220)} 700z" fill="#fff" opacity="${n2(.08 + .05 * Math.sin(t + i))}"/>`; }
  for (let i = 0; i < 26; i++) { const x = -1000 + 2000 * hash(i, 11), y = ((SY + 40 + 700 * hash(i, 13) - t * 14 * (.5 + hash(i, 15))) % 700 + 700) % 700 + SY; w += `<circle cx="${n2(x)}" cy="${n2(Math.max(SY + 10, y))}" r="${n2(2 + 3 * hash(i, 17))}" fill="#fff" opacity=".4"/>`; }
  // the muddy bottom, pebbles, lily-pad stems down to the bottom like ropes
  w += `<path d="M-1300 420 Q-600 380 0 410 T1300 400 V900 H-1300z" fill="#7A6A48"/><path d="M-1300 430 Q-600 392 0 420 T1300 410" stroke="#9A8A62" stroke-width="10" fill="none"/>` + [...Array(14)].map((_, i) => `<ellipse cx="${-1000 + i * 150}" cy="${430 + 20 * hash(i, 4)}" rx="${18 + 14 * hash(i, 5)}" ry="10" fill="#B9AE92"/>`).join("");
  const PADS = [[-600, 1], [-260, 0], [320, 1], [700, 0], [980, 1]];
  PADS.forEach(([x, s], i) => { const sw = 14 * Math.sin(t * .9 + i); w += `<path d="M${x} ${n2(SY + 6)} Q${n2(x + sw)} 140 ${x - 20 + 40 * s} 430" stroke="#4E9A44" stroke-width="9" fill="none"/><ellipse cx="${x}" cy="${n2(SY - 2)}" rx="${110 + 20 * s}" ry="16" fill="#58B56C" stroke="#2F8048" stroke-width="5"/><ellipse cx="${x}" cy="${n2(SY - 8)}" rx="${80 + 20 * s}" ry="6" fill="#7CC97A"/>`; });
  // the clump of jelly, among the stems, just under the surface (its top touches the air when the water drops)
  w += TF(CX, CY + .3 * drop, 2.15, eggClump(t, { n: 74, r: 13, R: 96 }));
  // the top eggs stay wet: droplets and shine on the jelly above the water
  if (t >= tS + 1.2) { const a = ss(tS + 1.2, tS + 1.8, t); w += OP(a, [[-260, SY - 6], [-150, SY - 12], [-40, SY - 4], [40, SY + 4], [-200, SY + 10]].map(([x, y], i) => lcGlint(x, y, 18, t, i) + `<path d="M${x + 16} ${y + 10} q6 12 0 16 q-6 -4 0 -16z" fill="#BFE6FF" stroke="#7FB2D6" stroke-width="2"/>`).join("")); }
  // the fish: swims in from the right, its mouth bumps the jelly and slides off, it swims away (a curved arrow: slippery)
  if (t >= tF - .4 && t < tS + 1) { const u = clamp((t - tF + .4) / 3.6), bx = CX + 230, by = CY + 40;
    const x = u < .35 ? lerp(1000, bx + 70, eio(u / .35)) : u < .55 ? bx + 70 + 40 * Math.sin((u - .35) / .2 * Math.PI) : lerp(bx + 70, 1000, eio((u - .55) / .45)), y = u < .55 ? by + 60 * (u < .35 ? 0 : (u - .35) / .2) : lerp(by + 60, by + 260, eio((u - .55) / .45));
    w += TF(x, y, 1.25 * (u < .55 ? -1 : 1), fish16(t), u < .55 ? 0 : 14, 1.25);
    if (u > .3) w += OP(ss(.3, .4, u), `<path d="M${bx + 10} ${by - 40} Q${bx + 110} ${by + 20} ${bx + 60} ${by + 160}" stroke="#E36A12" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="${n2(400 * ss(.32, .5, u))} 500"/><g transform="translate(${bx + 60} ${by + 160}) rotate(110)"><path d="M-6 -20 L24 0 L-6 20z" fill="#E36A12"/></g>`); }
  // the magnifier on ONE egg (dots), the key word's label (the jelly round it)
  const mg = ss(tD - .2, tD + .3, t) * (1 - ss(tF - .6, tF - .2, t)), MX = 470, MY = -10, MR = 230, EX = CX + 70, EY = CY - 60;
  if (mg > .01) w += OP(mg, `<path d="M${EX} ${EY} L${n2(MX - MR * .9)} ${n2(MY - MR * .3)}" stroke="#fff" stroke-width="7"/><circle cx="${EX}" cy="${EY}" r="22" fill="none" stroke="#fff" stroke-width="6"/>`
    + TF(MX, MY, spring(t, tD - .2, .45), `<g filter="url(#drop)"><circle r="${MR + 18}" fill="#FFF8EA"/></g><clipPath id="mg16"><circle r="${MR}"/></clipPath><g clip-path="url(#mg16)"><rect x="-300" y="-300" width="600" height="600" fill="#7FC3B4"/><circle cx="-130" cy="-120" r="110" fill="url(#p16Jelly)" opacity=".7"/><circle cx="150" cy="140" r="100" fill="url(#p16Jelly)" opacity=".7"/>`
      + `<circle r="${n2(160 + 3 * Math.sin(t * 2))}" fill="url(#p16Jelly)" stroke="${t >= tK ? JELLYC : "#A9D6CC"}" stroke-width="${t >= tK ? 9 : 4}"/><circle cx="8" cy="6" r="64" fill="#2E2A36"/><circle cx="-14" cy="-16" r="18" fill="#fff" opacity=".6"/><ellipse cx="-70" cy="-90" rx="40" ry="16" fill="#fff" opacity=".8" transform="rotate(-30 -70 -90)"/></g><circle r="${MR}" fill="none" stroke="${P.ink}" stroke-width="10"/><path d="M${n2(MR * .72)} ${n2(MR * .72)} l70 70" stroke="${P.ink}" stroke-width="26" stroke-linecap="round"/>`)
    + lcLab(t, tD + .2, MX + 40, MY + 330, "an egg", MX + 10, MY + 10, { size: 46, t1: tF - .5 }) + lcLab(t, tK, MX - 10, MY - 330, "jelly-like covering", MX - 100, MY - 120, { size: 46, fill: JELLYC, ink: "#fff", t1: tF - .5 }));
  w += lcLab(t, tC + .2, CX - 80, CY + 300, "a clump of clear jelly", CX - 40, CY + 110, { size: 46, t1: tD - .3 });
  if (t >= tF + .6) w += lcLab(t, tF + .6, CX + 520, CY + 300, "slippery", CX + 250, CY + 160, { size: 50, fill: "#FFE2C0", ink: "#B4531A", t1: tS - .2 });
  if (t >= tS + 1.4) w += lcLab(t, tS + 1.4, CX + 420, SY - 200, "stays wet", CX + 40, SY - 10, { size: 50, fill: "#DDF4FF", ink: "#1E6E9A" });
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#DDF2E8"/>` + inCam(c, w); }

// BE A FROG EGG (the journey; the camera IS the egg, then the tadpole, then the frog). Riders and tags are drawn by p1.js
function eggJourney(t, s) { const m = MK, tE = m("jegg"), tH = m("jhatch"), tT = m("jtadpole"), tB = m("jback"), tFr = m("jfront"), tTl = m("jtail"), tP = m("jpad"), tF = m("jfrog"), tFi = W("e702", "fish") - .2;
  const out = t >= tP - .2, rise = eio((t - tP + .2) / 2.2), sway = 14 * Math.sin(t * 1.1), bob = 10 * Math.sin(t * 1.7);
  let s1 = "";
  if (t < tH + .6) { // inside the jelly: a soft glowing wall all round, the other eggs like dark moons
    const bump = pulse(t, tFi + 1.4, .05, .5), st = ss(tH - .8, tH + .2, t);
    s1 += `<rect width="1920" height="1080" fill="#5FA79A"/>` + uwRays(t, "#fff", .12);
    [[300, 260, 150], [1650, 300, 170], [1500, 860, 140], [380, 860, 130], [960, 120, 110], [1800, 620, 90], [120, 560, 100]].forEach(([x, y, r], i) => { s1 += `<circle cx="${x + sway * .5}" cy="${y + bob * .5}" r="${r * 1.7}" fill="#CFEDE4" opacity=".35"/><circle cx="${x + sway * .5}" cy="${y + bob * .5}" r="${r * .62}" fill="#2E2A36" opacity=".85"/><circle cx="${x + sway * .5 - r * .2}" cy="${y + bob * .5 - r * .2}" r="${r * .15}" fill="#fff" opacity=".4"/>`; });
    // the fish's huge blurry shape glides past outside and bumps off the jelly
    if (t > tFi - .2 && t < tFi + 3.2) { const u = (t - tFi) / 3.2; s1 += `<g opacity=".55" filter="url(#b16)">${TF(lerp(2300, -500, u), 430 + 60 * Math.sin(u * 3) - 80 * bump, 5.5, fish16(t), 0)}</g>`; }
    // the jelly wall (a ring of light round the frame), it wobbles on the bump and stretches as you wriggle out
    const R = 760 + 30 * Math.sin(t * 1.5) - 40 * bump + 900 * ei(st);
    s1 += `<mask id="jm16"><rect width="1920" height="1080" fill="#fff"/><ellipse cx="960" cy="540" rx="${n2(R * 1.3)}" ry="${n2(R)}" fill="#000" filter="url(#b60)"/></mask><rect width="1920" height="1080" fill="#E8FBF4" opacity=".92" mask="url(#jm16)"/>`
      + `<ellipse cx="960" cy="540" rx="${n2(R * 1.3)}" ry="${n2(R)}" fill="none" stroke="#fff" stroke-width="24" opacity=".5"/>` + `<ellipse cx="700" cy="250" rx="300" ry="60" fill="#fff" opacity=".25" transform="rotate(-18 700 250)"/>`;
    s1 += `<rect width="1920" height="1080" fill="#FFF6DA" opacity="${n2(.2 + .1 * Math.sin(t * 2))}" style="mix-blend-mode:soft-light"/>`; }
  if (t >= tH - .2) { // the open water: lily-pad stems like tree trunks, light from above; then up a stem, into the air
    const a = ss(tH - .2, tH + .6, t), dx = -200 * eio((t - tH) / 12), up = 1300 * rise;
    let w = `<rect width="1920" height="1080" fill="url(#p16UW)"/>` + uwRays(t, "#fff", .14) + uwSpecks((t - tH) * .2, 40);
    [[180, 22], [520, 30], [900, 18], [1350, 34], [1720, 24], [2100, 28]].forEach(([x, wd], i) => { const xx = x + dx * (.6 + .2 * (i % 3)) + 10 * Math.sin(t * .7 + i); w += `<path d="M${n2(xx)} -40 Q${n2(xx + 30 * Math.sin(i))} 540 ${n2(xx - 20)} 1120" stroke="${i % 2 ? "#3E8E4A" : "#4FA866"}" stroke-width="${wd * 2}" fill="none" stroke-linecap="round" opacity="${i === 3 ? 1 : .85}"/>`; });
    w += `<path d="M-100 1000 Q500 960 960 990 T2020 980 V1200 H-100z" fill="#5E5A3E"/>`;
    // the surface far above, lily pads from below (dark shapes)
    w += `<rect x="-100" y="-200" width="2120" height="160" fill="#CFEFF6" opacity=".5"/>` + [[300, 1.2], [900, 1], [1500, 1.3]].map(([x, k]) => `<ellipse cx="${x + dx * .3}" cy="-30" rx="${260 * k}" ry="40" fill="#2F6E4A" opacity=".7"/>`).join("");
    // other tadpoles nearby (friends)
    for (let i = 0; i < 4; i++) w += TF(400 + 360 * i + 80 * Math.sin(t * .6 + i), 360 + 160 * Math.sin(t * .4 + i * 2), .9 + .3 * hash(i, 3), tadpole16(t, t > tB ? 1 : 0, { ph: i }), 20 * Math.sin(t * .8 + i));
    s1 += OP(a, `<g transform="translate(0 ${n2(up)})">${w}</g>`);
    // above the surface: the garden HUGE around you (a bench leg like a building, the block beyond), a giant lily pad under you
    if (out) { const b = up - 1300; s1 += `<g transform="translate(0 ${n2(b)})"><rect x="-100" y="-200" width="2120" height="1360" fill="url(#p16Sky)"/>` + `<g opacity=".7">${farBlocks(-100, 2100, 700, 41, 2.2)}</g>`
        + `<path d="M1180 760 V160 M1840 760 V160" stroke="#6E4324" stroke-width="70" stroke-linecap="round"/><rect x="1000" y="60" width="1100" height="70" rx="20" fill="url(#f14Wood)" stroke="#6E4324" stroke-width="10"/><rect x="1000" y="-90" width="1100" height="60" rx="20" fill="url(#f14Wood)" stroke="#6E4324" stroke-width="10"/><rect x="980" y="200" width="1140" height="80" rx="24" fill="url(#f14Wood)" stroke="#6E4324" stroke-width="10"/>` + TF(560, 760, 2.4, bird15(t, 1, 0)) + `<rect x="-100" y="760" width="2120" height="420" fill="#4FA0B4"/><path d="M-100 770 Q960 740 2020 770" stroke="#BDEBF5" stroke-width="10" fill="none"/>`
        + `<path d="M-200 1200 Q-120 830 960 820 Q2040 830 2120 1200z" fill="#58B56C" stroke="#2F8048" stroke-width="14"/><path d="M960 1180 L640 880 M960 1180 L1280 880 M960 1180 L960 850 M960 1180 L300 980 M960 1180 L1620 980" stroke="#2F8048" stroke-width="7" opacity=".5"/><ellipse cx="700" cy="900" rx="200" ry="26" fill="#9EDB86" opacity=".6"/>`
        + [[380, 520, 18], [1600, 420, 14]].map(([x, y, k]) => `<path d="M${x} ${y} q20 -10 40 0 q-20 10 -40 0z" fill="#2B2147"/>`).join("") + `</g>`; }
    // YOUR body at the edges of the frame: the long tail sweeping at the bottom (it shrinks away), back legs, then front legs (olive, a
    // see-through fin round the tail); out of the water only your two green front feet show, on the lily pad
    const tl = 1 - ss(tTl, tTl + 2.2, t), sw = 60 * Math.sin(t * 6), TB = "#7A7450", TD = "#3E3A2C";
    if (t >= tT - .5 && tl > .02 && !out) { const pth = `M960 1200 Q${n2(960 + sw)} ${n2(1080 - 170 * tl)} ${n2(960 + sw * 2.2)} ${n2(1080 - 330 * tl)}`; s1 += OP(ss(tT - .5, tT, t), `<path d="${pth}" stroke="#C9C39A" stroke-width="${n2(170 * tl + 10)}" fill="none" stroke-linecap="round" opacity=".45"/><path d="${pth}" stroke="${TD}" stroke-width="${n2(80 * tl + 14)}" fill="none" stroke-linecap="round"/><path d="${pth}" stroke="${TB}" stroke-width="${n2(66 * tl + 8)}" fill="none" stroke-linecap="round"/><path d="${pth}" stroke="#A8A27C" stroke-width="${n2(14 * tl + 2)}" fill="none" stroke-linecap="round" transform="translate(-14 0)" opacity=".8"/>`)
      + (t < tB + 1 ? TF(960, 1060, 1, tpill(0, 0, "your tail", 34, "#fff", P.ink, { w: 700 })) : ""); }
    if (t >= tB - .3 && !out) { const k = ss(tB - .3, tB + .5, t), kk = 30 * Math.sin(t * 7); s1 += [-1, 1].map((sd) => { const fx = 960 + sd * (560 + kk), fy = 1120 - 200 * k; return `<path d="M${960 + sd * 260} 1140 Q${n2(960 + sd * (420 + kk))} ${n2(980 - 80 * k)} ${n2(fx)} ${n2(fy)}" stroke="${TD}" stroke-width="66" fill="none" stroke-linecap="round"/><path d="M${960 + sd * 260} 1140 Q${n2(960 + sd * (420 + kk))} ${n2(980 - 80 * k)} ${n2(fx)} ${n2(fy)}" stroke="${TB}" stroke-width="52" fill="none" stroke-linecap="round"/><path d="M${n2(fx)} ${n2(fy)} l${sd * 70} -50 l${sd * 10} 70 l${sd * 50} 40 z" fill="#A8A27C" stroke="${TD}" stroke-width="6" stroke-linejoin="round"/>`; }).join(""); }
    if (t >= tFr - .3) { const k = ss(tFr - .3, tFr + .5, t), g = out ? "#7E9A48" : TB, gd = out ? "#4E6428" : TD, y0 = out ? 1000 : 1080; s1 += [-1, 1].map((sd) => `<path d="M${960 + sd * 140} 1160 Q${960 + sd * 180} ${n2(y0 - 20 - 60 * k)} ${n2(960 + sd * 230)} ${n2(y0 - 120 * k)}" stroke="${gd}" stroke-width="58" fill="none" stroke-linecap="round"/><path d="M${960 + sd * 140} 1160 Q${960 + sd * 180} ${n2(y0 - 20 - 60 * k)} ${n2(960 + sd * 230)} ${n2(y0 - 120 * k)}" stroke="${g}" stroke-width="46" fill="none" stroke-linecap="round"/>${[-1, 0, 1].map((j) => `<circle cx="${n2(960 + sd * 230 + j * 28)}" cy="${n2(y0 - 120 * k - 34 + 8 * Math.abs(j))}" r="17" fill="${g}" stroke="${gd}" stroke-width="4"/>`).join("")}`).join("") + (out ? TF(960, 1040, spring(t, tP + .6, .4), tpill(0, 0, "your frog feet", 34, "#fff", P.ink, { w: 700 })) : ""); } }
  return s1 + dip(t, tH, "#E8FBF4", .35) + dip(t, tP + .3, "#FFFFFF", .3); }

// Pip's board on its low easel (origin = the easel's feet): FOUR pictures in a ROW with straight arrows, his numbers 1 2 3 4, "4 STAGES!".
// o.bracket 0..1 (a curly bracket groups the tadpole AND the tadpole with legs: "the young"), o.loop 0..1 (the pictures slide round into a
// loop, no numbers), o.lit [4]
const ROWP = (i, t) => i === 0 ? frogPic(0, t) : i === 1 ? frogPic(1, t) : i === 2 ? `<rect x="-110" y="-110" width="220" height="220" fill="#8FD3E0"/>` + TF(20, 0, 1.6, tadpole16(t, 1)) : frogPic(2, t);
function fourBoard(t, o = {}) { const br = o.bracket || 0, lp = o.loop || 0, nm = 1 - ss(0, .4, br), lit = o.lit || [0, 0, 0, 0];
  let s = `<ellipse cx="0" cy="6" rx="360" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-260 0 L-200 -320 M260 0 L200 -320 M0 0 V-280" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><rect x="-440" y="-300" width="880" height="24" rx="8" fill="#8A5A36"/>`
    + `<g filter="url(#drop)"><rect x="-430" y="-780" width="860" height="490" rx="18" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="6"/></g>` + OP(1 - lp, T(0, -712, "4 STAGES!", 58, P.pip, { ls: 3 }) + T(370, -720, "by Pip", 28, P.pip, { a: "end", w: 600 }));
  const RX = [-315, -105, 105, 315], RY = -520, LP = [[-150, -610], [150, -610], [150, -400], [-150, -400]];
  // the loop: the egg, the young (the tadpole and the tadpole with legs together), the adult: curved arrows one way, no numbers
  const pos = (i) => { const [x, y] = [RX[i], RY]; const L = i === 0 ? [0, -630] : i === 1 ? [190, -430] : i === 2 ? [190, -430] : [-190, -430]; return [lerp(x, L[0], eio(lp)), lerp(y, L[1], eio(lp))]; };
  if (lp < .9) for (let i = 0; i < 3; i++) s += OP(1 - lp * 1.5, `<path d="M${RX[i] + 80} ${RY} h48" stroke="${P.ink}" stroke-width="7"/><path d="M${RX[i] + 120} ${RY - 12} l14 12 l-14 12" fill="none" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`);
  if (lp > .5) s += OP(ss(.5, 1, lp), `<g stroke="${P.leaf}" stroke-width="12" fill="none" stroke-linecap="round"><path d="M80 -630 Q190 -620 196 -536"/><path d="M110 -420 Q0 -360 -110 -420"/><path d="M-196 -536 Q-190 -620 -80 -630"/></g>` + [[196, -526, 90], [-120, -416, 200], [-70, -630, 10]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-6 -20 L22 0 L-6 20z" fill="${P.leaf}"/></g>`).join("") + T(0, -700, "OUR FROG'S LIFE CYCLE", 40, P.ink, { ls: 2 }));
  for (let i = 0; i < 4; i++) { const [x, y] = pos(i), k = .62 - .14 * lp, hide = i === 2 ? ss(.6, 1, lp) : 0, sh = i === 1 ? -44 * eio(lp) : i === 2 ? 44 * eio(lp) : 0;
    s += OP(1 - hide, TF(x + sh, y, k * (1 + .1 * lit[i]), (lit[i] > .05 ? `<circle r="${n2(120 + 12 * lit[i])}" fill="${P.sun}" opacity="${n2(.6 * lit[i])}"/>` : "") + tile16(ROWP(i, t), 104, "fb" + i + (o.id || ""), P.leaf)));
    if (nm > .02) s += TF(x - 70, y - 80, nm * (1 + .1 * lit[i]), `<g filter="url(#dropS)"><circle r="30" fill="${P.pip}"/></g>${T(0, 12, String(i + 1), 34, "#fff")}`, -30 * (1 - nm)); }
  // the curly bracket under the two young pictures: "the young" (green)
  if (br > .02 && lp < .95) s += OP(Math.min(1, br * 2) * (1 - ss(.4, .8, lp)), `<path d="M-180 -410 Q-180 -370 -100 -370 Q-10 -370 0 -340 Q10 -370 100 -370 Q180 -370 180 -410" stroke="${P.leaf}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="${n2(700 * clamp(br * 1.5))} 800"/>` + TF(0, -320, spring(br, .4, .5), tpill(0, 0, "the young", 40, P.leaf, "#fff", { w: 700 })));
  return s; }

// the loop board OUR FROG'S LIFE CYCLE (origin = its stand's feet): three round slots, curved arrows all ONE way, no numbers, no START, no
// END. o.tiles [3] land times, o.back (the last arrow, the frog back to the eggs), o.flash [3], o.title, o.pics(i, t), o.names
const LOOP16 = [[0, -600], [210, -330], [-210, -330]];
function loopBoard16(t, o = {}) { const tl = o.tiles || [-9, -9, -9], fl = o.flash || [0, 0, 0], tb = o.back === undefined ? -9 : o.back, run = t >= tb + .6 ? (t - tb) : 0, pic = o.pics || frogPic, nm = o.names || FROGN;
  let s = `<ellipse cx="0" cy="6" rx="300" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-220 0 L-180 -150 M220 0 L180 -150 M0 0 V-150" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/>`
    + `<g filter="url(#drop)"><rect x="-400" y="-800" width="800" height="670" rx="30" fill="url(#gPaper)" stroke="#C9A974" stroke-width="8"/></g>` + T(0, -734, o.title || "OUR FROG'S LIFE CYCLE", 42, P.ink, { ls: 2 });
  const arc = (a, b, bend, lit) => { const [x1, y1] = LOOP16[a], [x2, y2] = LOOP16[b], mx = (x1 + x2) / 2, my = (y1 + y2) / 2, nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny), cx = mx + nx / L * bend, cy = my + ny / L * bend;
    const sx = x1 + (cx - x1) * .55, sy = y1 + (cy - y1) * .55, ex = x2 + (cx - x2) * .55, ey = y2 + (cy - y2) * .55, ang = Math.atan2(ey - cy, ex - cx) * 180 / Math.PI, col = lit ? P.leaf : "#C9B48F";
    return `<path d="M${n2(sx)} ${n2(sy)} Q${n2(cx)} ${n2(cy)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" ${run ? `stroke-dasharray="30 18" stroke-dashoffset="${n2(-run * 60)}"` : ""}/><g transform="translate(${n2(ex)} ${n2(ey)}) rotate(${n2(ang)})"><path d="M-6 -22 L26 0 L-6 22z" fill="${col}"/></g>`; };
  s += arc(0, 1, -60, t >= tl[1]) + arc(1, 2, -60, t >= tl[2]) + arc(2, 0, -60, t >= tb);
  if (t >= tb && t < tb + 1) s += OP(1 - (t - tb), `<circle cx="-160" cy="-520" r="${n2(30 + 80 * (t - tb))}" fill="none" stroke="${P.sun}" stroke-width="8"/>`);
  LOOP16.forEach(([x, y], i) => { const k = t >= tl[i] ? spring(t, tl[i], .45) : 0, f = fl[i];
    s += `<g transform="translate(${x} ${y})"><circle r="112" fill="#F3EAD8" stroke="#D9C9A8" stroke-width="5" stroke-dasharray="${k > .5 ? "0" : "14 10"}"/>`
      + (k > .02 ? TF(0, 0, k * (1 + .12 * f), (f > .05 ? `<circle r="${n2(118 + 14 * f)}" fill="${P.sun}" opacity="${n2(.5 * f)}"/>` : "") + tile16(pic(i, t), 104, "lb16" + i + (o.id || ""), P.leaf)) : "")
      + (k > .02 && o.labels !== false ? OP(k, tpill(0, 150, nm[i], 32, "#FFF8EA", P.ink, { w: 700 })) : "") + `</g>`; });
  return s; }

// Basil's idea (only the colour): two big colour swatches, yellow and brown, with a ? (his idea, not a fact)
const swatchIdea = (t) => `<rect x="-300" y="-200" width="600" height="400" fill="#FFF8EA"/>` + TF(-120, -10, 1, `<rect x="-100" y="-90" width="200" height="180" rx="30" fill="#FFE27A" stroke="#D9B44A" stroke-width="6"/>` + T(0, 140, "yellow", 44, P.ink)) + TF(120, -10, 1, `<rect x="-100" y="-90" width="200" height="180" rx="30" fill="#A9602E" stroke="#6E3814" stroke-width="6"/>` + T(0, 140, "brown", 44, P.ink)) + T(0, 0, "≠", 80, P.ink);
// LOOK CLOSER · the chick beside the hen: two halves, both big, both pecking; the parts (beak orange, wings violet, legs teal) joined to BOTH
// birds; then (pairs) the 2x2: chick + hen "looks like the adult" (green) · tadpole + frog "does not look like the adult" (orange)
const PARTC = { beak: ["#FFE2C0", "#B4531A"], wings: ["#EDE4FF", "#6D28D9"], legs: ["#D7F5EE", "#0F766E"] };
function chickArt(t) { const m = MK, tB = m("beak"), tW = m("wings"), tL = m("legs"), tP = m("peck"), tK = m("kw_chick"), tQ = m("pairs"), s0 = SCN.lcchick.t0 + 1, q = eio((t - tQ + .2) / 1.1);
  const pk = (k) => { const u = (t - tP) % 2.4; return t < tP ? 0 : u < .5 ? Math.sin(Math.PI * u / .5) : 0; }, pkd = pk();
  const c = camSeq(t, [s0, tB, tW, tL, tP + .5, tK, tQ], [[0, 0, 1], [60, -120, 1.1], [0, -40, 1.04], [0, 100, 1.06], [0, 0, 1], [-300, 40, 1.12], [0, 0, 1]]);
  let w = `<rect x="-1300" y="-800" width="2600" height="1600" fill="#FFF3DC"/><rect x="-1300" y="250" width="2600" height="600" fill="#B7E58F"/><path d="M-1300 250 H1300" stroke="#8FCB6A" stroke-width="6"/>`;
  // the two birds (the halves): fade to the 2x2's top row on "pairs"
  const CK = [lerp(-430, -300, q), lerp(250, -40, q), lerp(2.3, 1.5, q)], HN = [lerp(380, 460, q), lerp(250, -40, q), lerp(1.45, .74, q)];
  w += `<line x1="0" y1="-420" x2="0" y2="${n2(lerp(420, -400, q))}" stroke="#E3C9A8" stroke-width="5" stroke-dasharray="14 10" opacity="${n2(1 - q)}"/>`;
  if (t >= tP && t < tP + .8) w += [[CK[0] + 90 * CK[2] * .5, CK[1]], [HN[0] + 120 * HN[2] * .6, HN[1]]].map(([x, y]) => `<ellipse cx="${x + 30}" cy="${y}" rx="${n2(30 + 60 * (t - tP))}" ry="${n2(8 + 10 * (t - tP))}" fill="#C9A86A" opacity="${n2(.6 * (1 - (t - tP) / .8))}"/>`).join("");
  w += TF(CK[0], CK[1], CK[2], chick16(t, { peck: pkd })) + TF(HN[0], HN[1], HN[2], hen16(t, { peck: pkd }));
  w += OP(1 - q, TF(CK[0], CK[1] + 70, 1, tpill(0, 0, "chick", 44, "#fff", P.ink, { w: 700 })) + TF(HN[0], HN[1] + 70, 1, tpill(0, 0, "hen", 44, "#fff", P.ink, { w: 700 })));
  // the part labels: each joined to its part on BOTH birds (colour-coded), pulsing as named
  const parts = [["beak", tB, [CK[0] + 64 * CK[2], CK[1] - 74 * CK[2]], [HN[0] + 116 * HN[2], HN[1] - 156 * HN[2]], [-40, -330]], ["wings", tW, [CK[0] - 40 * CK[2], CK[1] - 42 * CK[2]], [HN[0] - 20 * HN[2], HN[1] - 100 * HN[2]], [-40, -180]], ["legs", tL, [CK[0] - 2 * CK[2], CK[1] - 8 * CK[2]], [HN[0], HN[1] - 20 * HN[2]], [-40, 360]]];
  for (const [nm, t0, a, b, [lx, ly]] of parts) { if (t < t0 || q > .99) continue; const col = PARTC[nm], k = spring(t, t0, .4), pl = pulse(t, t0, .05, .5), al = (1 - q) * (1 - ss(tK - .6, tK - .2, t));
    w += OP(al, [a, b].map(([px, py]) => `<path d="M${lx} ${ly} L${n2(px)} ${n2(py)}" stroke="${col[1]}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${n2(800 * ramp(t, t0, .3))} 900"/><circle cx="${n2(px)}" cy="${n2(py)}" r="${n2(14 + 10 * pl)}" fill="none" stroke="${col[1]}" stroke-width="6"/>`).join("")
      + TF(lx, ly, k, tpill(0, 0, { beak: "a beak", wings: "two wings", legs: "two legs" }[nm], 48, col[0], col[1], { w: 700 }))); }
  // the 2x2 (pairs): the bottom row tadpole + frog; the two pills
  if (q > .01) { w += OP(q, `<path d="M-900 120 H900" stroke="#E3C9A8" stroke-width="5"/><rect x="-900" y="130" width="1800" height="700" fill="#DDF2F6"/>` + TF(-270, 250, 1.4, tadpole16(t, 0)) + TF(460, 285, .8, frog16(t)) + `<path d="M-120 230 H300" stroke="${P.ink}" stroke-width="8" stroke-dasharray="16 12"/><path d="M290 216 l18 14 l-18 14" fill="none" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/><path d="M-120 -110 H300" stroke="${P.ink}" stroke-width="8" stroke-dasharray="16 12"/><path d="M290 -124 l18 14 l-18 14" fill="none" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>`
      + TF(-300, -340, 1, tpill(0, 0, "chick", 36, "#fff", P.ink, { w: 700 })) + TF(460, -340, 1, tpill(0, 0, "hen", 36, "#fff", P.ink, { w: 700 })) + TF(-300, 165, 1, tpill(0, 0, "tadpole", 36, "#fff", P.ink, { w: 700 })) + TF(460, 165, 1, tpill(0, 0, "frog", 36, "#fff", P.ink, { w: 700 })))
      + TF(90, -190, spring(t, tQ + .3, .45), tpill(0, 0, "looks like the adult", 36, LIKEC, "#fff", { w: 700 }))
      + TF(90, 155, spring(t, tQ + .6, .45), tpill(0, 0, "does not look like the adult", 30, UNLIKEC, "#fff", { w: 700 })); }
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#FFF3DC"/>` + inCam(c, w); }
// the small 2x2 under Mark Sentence 2
const mini2x2 = (t, k = 1) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-330" y="-150" width="660" height="300" rx="24" fill="#FFF8EA"/></g><rect x="-330" y="0" width="660" height="150" rx="24" fill="#DDF2F6"/>` + TF(-230, -14, .6, chick16(t, { peck: peckAt(t, 0) })) + TF(-90, -14, .34, hen16(t, { peck: peckAt(t, 1) })) + TF(-240, 70, .55, tadpole16(t, 0)) + TF(-90, 120, .34, frog16(t))
  + TF(170, -70, 1, tpill(0, 0, "looks like the adult", 26, LIKEC, "#fff", { w: 700 })) + TF(170, 74, 1, tpill(0, 0, "does not look like", 26, UNLIKEC, "#fff", { w: 700 })));

// the tree frog's fun fact: a ball of foam on a leaf over the water (ff_foam), the tadpoles dropping into the pond (ff_drop). The leaf hangs
// from its branch on a short stalk in both (SERIES_FORMAT 23 Nov: no leaf in mid-air); the frog sits on the branch
const ffFoam = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#CFEAF2"/><rect x="${-w / 2}" y="60" width="${w}" height="${h}" fill="#5FB7C9"/>` + `<path d="M${-w / 2} -40 Q0 -90 ${w / 2} -20" stroke="#4E9A44" stroke-width="10" fill="none"/><path d="M-151 -50 L-137 -39" stroke="#4E7A3A" stroke-width="6" stroke-linecap="round"/><g transform="translate(2 -20) rotate(8)"><path d="M-140 0 Q-60 -70 120 -10 Q20 50 -140 0z" fill="#58B56C" stroke="#2F7A45" stroke-width="5"/></g>` + TF(2, -30, 1.05, foamNest16(t)) + TF(120, -44, .3, treeFrog16(t, { lift: 0 }));
const ffDrop = (t, w, h) => { let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#CFEAF2"/><rect x="${-w / 2}" y="50" width="${w}" height="${h}" fill="#5FB7C9"/><path d="M${-w / 2} -118 Q0 -170 ${w / 2} -100" stroke="#4E9A44" stroke-width="10" fill="none"/><path d="M-181 -121 L-167 -109" stroke="#4E7A3A" stroke-width="6" stroke-linecap="round"/><g transform="translate(-30 -90) rotate(8)"><path d="M-140 0 Q-60 -70 120 -10 Q20 50 -140 0z" fill="#58B56C" stroke="#2F7A45" stroke-width="5"/></g>` + TF(-30, -100, .8, foamNest16(t));
  for (let i = 0; i < 4; i++) { const u = ((t * .5 + i / 4) % 1), x = -80 + 50 * i, y = lerp(-50, 70, ei(clamp(u / .7))); s += u < .7 ? TF(x, y, .7, tadpole16(t, 0, { ph: i }), 80) : `<ellipse cx="${x}" cy="54" rx="${n2(10 + 50 * (u - .7))}" ry="${n2(4 + 10 * (u - .7))}" fill="none" stroke="#fff" stroke-width="3" opacity="${n2(1 - (u - .7) / .3)}"/>`; }
  return s; };

/* ---------------------------------------------------------------- PART 2 ---------------------------------------------------------------- */
// the grasshopper's three stages as tile pictures (eggs in the soil, the nymph, the adult with wings) and the cockroach's
const hopPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#DCEFFB"/><rect x="-110" y="-20" width="220" height="140" fill="#8A6040"/>` + [...Array(9)].map((_, j) => `<ellipse cx="${-40 + (j % 3) * 30}" cy="${30 + Math.floor(j / 3) * 18}" rx="12" ry="7" fill="#F2D28A" stroke="#B88A3A" stroke-width="2" transform="rotate(-20 ${-40 + (j % 3) * 30} ${30 + Math.floor(j / 3) * 18})"/>`).join("")
  : i === 1 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/>` + TF(-10, 52, .95, hopper16(t, {})) : `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/>` + TF(-6, 52, .8, hopper16(t, { adult: true }));
const HOPN = ["the egg", "the young: a nymph", "the adult"];
const roachPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#FFF0D6"/>` + TF(0, 0, .9, eggCase16({})) : `<rect x="-110" y="-110" width="220" height="220" fill="#FFF0D6"/>` + TF(-14, 0, i === 1 ? 1 : .9, roach16(t, { adult: i === 2 }));
const chickPic = (i, t) => i === 0 ? `<rect x="-110" y="-110" width="220" height="220" fill="#FFF0D6"/><ellipse cx="0" cy="10" rx="46" ry="60" fill="#FFF8EA" stroke="#D9C9A8" stroke-width="5"/>` : i === 1 ? `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/>` + TF(0, 60, 1.3, chick16(t, { peck: peckAt(t, 2) })) : `<rect x="-110" y="-110" width="220" height="220" fill="#E8F5DC"/>` + TF(-10, 80, .62, hen16(t, { peck: peckAt(t, 1) }));
// the ring's picture (lockN obj): the little wingless grasshopper on its blade of grass, big
const ringHop = (tt) => `<circle cx="430" cy="470" r="180" fill="#DFF3D2"/><path d="M250 660 Q380 470 640 380" stroke="#6FBF4E" stroke-width="60" fill="none" stroke-linecap="round"/><path d="M250 660 Q380 470 640 380" stroke="#3F8A3A" stroke-width="4" fill="none" opacity=".5"/>` + TF(420, 520, 1.9, hopper16(tt, { ph: 2 }), -22);
// the two numbered cards' pictures (the young WITHOUT wings · the adult WITH long wings folded along its back)
const hopCard = (i, t) => `<rect x="-200" y="-140" width="400" height="280" fill="${i ? "#DCEFFB" : "#E8F5DC"}"/><path d="M-200 90 Q0 70 200 96 V140 H-200z" fill="#8FCB6A"/>` + TF(i ? 0 : 10, 96, i ? 1.35 : 1.15, hopper16(t, { adult: !!i }));
// LOOK CLOSER · the little grasshopper beside an adult: two blades of grass at the same angle; the parts joined to BOTH (six legs teal,
// two feelers orange, big back legs violet, each pulsing as named); wings: the adult's long wings (green), a dashed outline on the young's
// bare back (no wings yet); NYMPH pops on the young
const HOPC = { legs: ["#D7F5EE", "#0F766E"], feelers: ["#FFE2C0", "#B4531A"], jump: ["#EDE4FF", "#6D28D9"], wings: ["#DCF5DF", "#1F8A4C"] };
function nymphArt(t) { const m = MK, tP = m("pairin"), tL = m("legs"), tF = m("feelers"), tJ = m("jump"), tW = m("wings"), tK = m("kw_nymph"), s0 = SCN.lcnymph.t0 + 1;
  const c = camSeq(t, [s0, tP, tL, tF, tJ, tW, tK, tK + 2.6], [[0, 60, .92], [0, 0, 1], [0, 0, 1.04], [60, -100, 1.04], [-60, 0, 1.02], [0, -60, 1.06], [-380, 20, 1.2], [0, 0, 1]]);
  let w = `<rect x="-1300" y="-800" width="2600" height="1600" fill="#E3F4FF"/><rect x="-1300" y="230" width="2600" height="600" fill="#A6DE7E"/><path d="M-1300 230 H1300" stroke="#7FC566" stroke-width="6"/>`;
  // two blades at the same angle (as a floor under each)
  const Y = { x: -420, y: 120, k: 1.9 }, A = { x: 360, y: 120, k: 2.35 };
  w += [Y, A].map((b) => `<path d="M${b.x - 330} ${b.y + 40} Q${b.x} ${b.y - 20} ${b.x + 340} ${b.y + 10}" stroke="#6FBF4E" stroke-width="46" fill="none" stroke-linecap="round"/><path d="M${b.x - 330} ${b.y + 40} Q${b.x} ${b.y - 20} ${b.x + 340} ${b.y + 10}" stroke="#3F8A3A" stroke-width="4" fill="none" opacity=".5"/>`).join("");
  const lit = (k, t0) => ({ [k]: t >= t0 ? .4 + .6 * pulse(t, t0, .05, .9) : 0 }), L = { ...lit("legs", tL), ...lit("feelers", tF), ...lit("jump", tJ), ...lit("wings", tW) };
  w += TF(Y.x, Y.y, Y.k, hopper16(t, { lit: L, ph: 1 })) + TF(A.x, A.y, A.k, hopper16(t, { adult: true, lit: L, ph: 2.5 }));
  w += TF(Y.x + 170, Y.y + 120, 1, tpill(0, 0, "the little one", 40, "#fff", P.ink, { w: 700 })) + TF(A.x, A.y + 120, 1, tpill(0, 0, "an adult", 40, "#fff", P.ink, { w: 700 }));
  // the labels, each joined to the part on BOTH grasshoppers (a part's points in each animal's own coordinates)
  const P2 = (b, x, y) => [b.x + x * b.k, b.y + y * b.k];
  const parts = [["legs", tL, "six legs", [0, -250], [[24, -18], [52, -8]]], ["feelers", tF, "two feelers", [40, -420], [[110, -120], [120, -126]]], ["jump", tJ, "big back legs", [0, 360], [[-50, -50], [-50, -50]]]];
  for (const [k, t0, txt, [lx, ly], [py, pa]] of parts) { if (t < t0) continue; const col = HOPC[k], al = 1 - ss(tW - .5, tW - .1, t); if (al < .01) continue;
    w += OP(al, [P2(Y, py[0], py[1]), P2(A, pa[0], pa[1])].map(([x, y]) => `<path d="M${lx} ${ly} L${n2(x)} ${n2(y)}" stroke="${col[1]}" stroke-width="6" stroke-dasharray="${n2(1000 * ramp(t, t0, .3))} 1100"/><circle cx="${n2(x)}" cy="${n2(y)}" r="12" fill="none" stroke="${col[1]}" stroke-width="6"/>`).join("") + TF(lx, ly, spring(t, t0, .4), tpill(0, 0, txt, 48, col[0], col[1], { w: 700 }))); }
  // wings: the adult's long wings (green); the young's bare back: a dashed outline, "no wings yet"
  if (t >= tW) { const al = 1 - ss(tK - .6, tK - .2, t);
    w += OP(al, lcLab(t, tW, A.x + 60, A.y - 260, "long wings", A.x - 60 * A.k, A.y - 62 * A.k, { size: 48, fill: HOPC.wings[0], ink: HOPC.wings[1] })
      + OP(ramp(t, tW + .5, .3), `<path d="M${n2(Y.x + 36 * Y.k)} ${n2(Y.y - 66 * Y.k)} Q${n2(Y.x - 30 * Y.k)} ${n2(Y.y - 82 * Y.k)} ${n2(Y.x - 118 * Y.k)} ${n2(Y.y - 54 * Y.k)} Q${n2(Y.x - 116 * Y.k)} ${n2(Y.y - 42 * Y.k)} ${n2(Y.x - 96 * Y.k)} ${n2(Y.y - 44 * Y.k)} Q${n2(Y.x - 20 * Y.k)} ${n2(Y.y - 54 * Y.k)} ${n2(Y.x + 36 * Y.k)} ${n2(Y.y - 48 * Y.k)}z" fill="none" stroke="#1F8A4C" stroke-width="5" stroke-dasharray="14 10"/>`)
      + lcLab(t, tW + .5, Y.x - 80, Y.y - 260, "no wings yet", Y.x - 40 * Y.k, Y.y - 66 * Y.k, { size: 48, fill: "#fff", ink: "#1F8A4C" })); }
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#E3F4FF"/>` + inCam(c, w); }
// Momo's idea: a grasshopper lying in the hot sun, drying up (a ?)
const dryIdea = (t) => `<rect x="-300" y="-200" width="600" height="400" fill="#FFE9A8"/><circle cx="170" cy="-90" r="70" fill="#FFD23A" stroke="#F2A81E" stroke-width="6"/>${[...Array(8)].map((_, i) => `<path d="M170 -170 V-200" stroke="#FFB01E" stroke-width="8" stroke-linecap="round" transform="rotate(${i * 45} 170 -90)"/>`).join("")}<rect x="-300" y="80" width="600" height="140" fill="#D9C27A"/>`
  + TF(-50, 110, 1.4, hopper16(t, { feel: 0 }), 180, -1.4) + `<path d="M-160 -40 q10 -20 0 -40 M-110 -50 q10 -20 0 -40 M-60 -40 q10 -20 0 -40" stroke="#F2A81E" stroke-width="5" fill="none" stroke-linecap="round"/>`;
// LOOK CLOSER · the empty skin: back-lit, see-through; the split down its back (a magnifier), the empty legs and feelers (tubes); then the why
// as a picture model on the right: a nymph inside its hard outer skin grows, little arrows push out, the outline cannot grow and goes tight
function skinArt(t) { const m = MK, tS = m("split"), tH = m("hollow"), tM = LT("f705") - .2, tT = m("tight"), s0 = SCN.lcskin.t0 + 1, tV = m("v_skin");
  const c = camSeq(t, [s0, tS, tH, tH + 1.6, tM, tT, tV + .6], [[-200, 0, .95], [-180, -100, 1.1], [-300, 40, 1.15], [-240, -100, 1.15], [80, 0, 1], [300, -20, 1.15], [80, 0, 1]]);
  let w = `<rect x="-1300" y="-800" width="2600" height="1600" fill="#FFF1C8"/>` + `<circle cx="-700" cy="-500" r="420" fill="#FFE27A" opacity=".5"/><rect x="-1300" y="250" width="2600" height="600" fill="#B7E58F"/>`;
  // the blade it hangs on, and the empty skin, big, light shining through it
  w += `<path d="M-900 400 Q-500 200 -40 -120" stroke="#6FBF4E" stroke-width="60" fill="none" stroke-linecap="round"/>` + TF(-420, 120, 2.4, hopper16(t, { skin: true }), -20);
  for (let i = 0; i < 5; i++) w += lcGlint(-700 + 120 * i, -120 + 60 * Math.sin(i), 16, t, i);
  // the magnifier on the split down its back
  const mg = ss(tS - .2, tS + .3, t) * (1 - ss(tH - .5, tH - .1, t)), SX = -474, SY = -29;
  if (mg > .01) w += OP(mg, `<path d="M${SX} ${SY} L-110 -220" stroke="#fff" stroke-width="7"/><circle cx="${SX}" cy="${SY}" r="22" fill="none" stroke="#fff" stroke-width="6"/>` + TF(80, -240, spring(t, tS - .2, .45), `<g filter="url(#drop)"><circle r="208" fill="#FFF8EA"/></g><clipPath id="mgs"><circle r="190"/></clipPath><g clip-path="url(#mgs)"><rect x="-200" y="-200" width="400" height="400" fill="#F6EBC6"/><path d="M-200 -40 Q0 -70 200 -40 V200 H-200z" fill="#EADBA8" opacity=".7"/><path d="M-200 -10 Q-60 -36 0 -20 Q70 -6 200 -30" stroke="#8A6A34" stroke-width="16" fill="none" stroke-dasharray="4 0"/><path d="M-200 -10 Q-60 -36 0 -20 Q70 -6 200 -30" stroke="#FFF8EA" stroke-width="6" fill="none"/></g><circle r="190" fill="none" stroke="${P.ink}" stroke-width="10"/>`)
    + lcLab(t, tS + .2, -120, 40, "a split down the back", 40, -200, { size: 46 }));
  // the empty legs and feelers: tubes you can see through
  if (t >= tH - .1 && t < tM) { const a = 1 - ss(tM - .5, tM, t); w += OP(a, lcLab(t, tH, -360, 330, "empty legs", -330, 90, { size: 48, fill: "#D7F5EE", ink: "#0F766E" }) + lcLab(t, tH + .6, 20, -280, "empty feelers", -230, -230, { size: 48, fill: "#FFE2C0", ink: "#B4531A" })); }
  // the picture model (right half): a nymph inside its hard outer skin; it grows, the skin cannot stretch: too tight, a crack starts
  const mo = ss(tM - .3, tM + .4, t);
  if (mo > .01) { const g = ss(tM + 1.5, tT, t), sq = ss(tT - 1.2, tT, t), cx = 420, cy = 60;
    w += OP(mo, `<rect x="${cx - 400}" y="-380" width="800" height="700" rx="40" fill="#FFF8EA" stroke="#E3C9A8" stroke-width="6"/>` + T(cx, -320, "Why does the skin come off?", 40, P.ink)
      + TF(cx + 10, cy + 160, 2.2 * (1 + .14 * g), hopper16(t, { feel: .3 }))
      + `<g transform="translate(${cx + 10} ${cy + 160}) scale(2.2)"><path d="M-92 -40 Q-90 -68 -40 -68 L20 -72 Q42 -82 56 -70 Q${80 + 4 * sq} -80 ${84 + 4 * sq} -56 Q86 -30 64 -24 L-40 -20 Q-86 -20 -92 -40z" fill="none" stroke="${mixC("#8A6A34", "#E33B2E", sq)}" stroke-width="${n2(4 + 2 * sq)}" stroke-dasharray="${sq > .5 ? "0" : "10 6"}"/></g>`
      + (g > .2 ? [[cx - 180, cy + 20, -1, 0], [cx + 160, cy, 1, 0], [cx, cy - 60, 0, -1], [cx - 40, cy + 120, 0, 1]].map(([x, y, dx, dy]) => `<path d="M${x} ${y} l${dx * 50} ${dy * 50}" stroke="#E36A12" stroke-width="9" stroke-linecap="round"/><path d="M${x + dx * 66} ${y + dy * 66} l${-dx * 18 + dy * 14} ${-dy * 18 + dx * 14} l${-dy * 28} ${-dx * 28}z" fill="#E36A12"/>`).join("") : "")
      + lcLab(t, tM + .4, cx - 230, -230, "a hard outer skin", cx - 130, cy - 20, { size: 38 }) + (g > .3 ? lcLab(t, tM + 1.8, cx + 220, 250, "the nymph grows", cx + 80, cy + 120, { size: 38, fill: "#FFE2C0", ink: "#B4531A", t1: tV - .2 }) : "")
      + (t >= tT - .4 ? TF(cx + 230, -200, spring(t, tT - .4, .4) * (1 + .08 * Math.sin(t * 12)), tpill(0, 0, "too tight!", 50, "#E33B2E", "#fff", { w: 700 })) + `<path d="M${cx - 40} ${cy + 10} l20 -18 l10 16 l18 -20 l12 14" stroke="#E33B2E" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="${n2(140 * ss(tT - .2, tT + .4, t))} 200"/>` : "")); }
  return `<rect x="-900" y="-450" width="1800" height="900" fill="#FFF1C8"/>` + inCam(c, w); }

// BE THE NYMPH (the journey; the camera IS the nymph on a blade of grass as big as a road)
function nymphJourney(t, s) { const m = MK, tN = m("jnymph"), tE = m("jeat"), tTi = m("jtight"), tSp = m("jsplit"), tO = m("jout"), tHd = m("jhard"), tA = m("jagain"), tW = m("jwings");
  const sway = 18 * Math.sin(t * .9), grow = ss(tO, tO + 1.2, t) * .12 + ss(tA, tA + 3, t) * .2, pale = ss(tO - .2, tO + .3, t) * (1 - ss(tHd - .2, tHd + 1.2, t)), hang = ss(tTi - .4, tTi + .8, t) * (1 - ss(tHd, tHd + 1.4, t));
  let w = `<rect width="1920" height="1080" fill="url(#p16Sky)"/>`;
  // far grass blades and the sun through them; the huge blade (a road) under you, receding to a point
  for (let i = 0; i < 14; i++) { const x = -100 + i * 160 + 40 * Math.sin(t * .4 + i), h = 700 + 300 * hash(i, 3); w += `<path d="M${n2(x - 40)} 1100 Q${n2(x + 30 * Math.sin(t * .6 + i))} ${n2(1100 - h * .6)} ${n2(x + 60 * (hash(i, 5) - .5))} ${n2(1100 - h)} Q${n2(x + 20)} ${n2(1100 - h * .5)} ${n2(x + 40)} 1100z" fill="${i % 2 ? "#8FCB6A" : "#6FB85A"}" opacity=".8"/>`; }
  w += `<circle cx="1500" cy="160" r="90" fill="#FFF3B8" opacity=".9"/>`;
  // the blade: a long green road from under you to its tip far ahead, bending away; its veins run to the tip; dew drops shine on it
  w += `<g transform="rotate(${n2(sway * .2 + 26 * hang)} 960 1080)"><path d="M-160 1200 Q300 760 860 420 Q980 330 1060 ${n2(300 - 30 * hang)} Q1120 330 1160 420 Q1500 760 2080 1200z" fill="#7CC85A" stroke="#3F8A3A" stroke-width="10"/>`
    + `<path d="M-160 1200 Q300 760 860 420 Q980 330 1060 ${n2(300 - 30 * hang)} L1040 ${n2(330 - 30 * hang)} Q960 380 880 460 Q360 820 40 1200z" fill="#5FAE46" opacity=".8"/><path d="M2080 1200 Q1500 760 1160 420 Q1120 330 1060 ${n2(300 - 30 * hang)} L1080 ${n2(330 - 30 * hang)} Q1140 400 1200 470 Q1560 820 1880 1200z" fill="#5FAE46" opacity=".8"/>`
    + [-.66, -.33, 0, .33, .66].map((f) => `<path d="M${n2(960 + f * 1100)} 1200 Q${n2(990 + f * 340)} 700 1060 ${n2(310 - 30 * hang)}" stroke="#5FAE46" stroke-width="${f === 0 ? 10 : 5}" fill="none" opacity=".6"/>`).join("")
    + `<path d="M-160 1200 Q300 760 860 420 Q980 330 1060 ${n2(300 - 30 * hang)}" stroke="#B7E58F" stroke-width="16" fill="none" opacity=".6"/>` + [[700, 900, 22], [1300, 760, 16], [1040, 520, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#DDF4FF" stroke="#8FB8D6" stroke-width="3"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .3}" fill="#fff"/>`).join("");
  // the leaf edge you munch: bites appear (jeat)
  if (t >= tE - .5 && t < tTi + .5) { const nb = Math.floor(clamp((t - tE) / 2.6) * 5); w += OP(ss(tE - .5, tE, t) * (1 - ss(tTi, tTi + .5, t)), `<path d="M1040 300 Q1500 260 1700 500 Q1500 640 1040 600z" fill="#58B56C" stroke="#2F7A45" stroke-width="6"/>` + [...Array(nb)].map((_, i) => `<circle cx="${1050 + i * 4}" cy="${360 + i * 50}" r="34" fill="#BFE6FF"/>`).join("")); }
  w += `</g>`;
  // the old empty skin hangs on the stem below (after you wriggle out)
  if (t >= tO + .4) w += OP(ss(tO + .4, tO + 1.2, t), TF(1360, 820, 1.6, hopper16(t, { skin: true }), 100) + TF(1240, 660, 1, tpill(0, 0, "your old skin", 36, "#fff", P.ink, { w: 700 })));
  // a small counter of empty skins (jagain)
  if (t >= tA) { const n = Math.min(4, 1 + Math.floor((t - tA) / .9)); w += TF(1500, 240, spring(t, tA, .4), `<g filter="url(#dropS)"><rect x="-260" y="-70" width="520" height="140" rx="40" fill="#FFF8EA"/></g>` + [...Array(n)].map((_, i) => TF(-190 + i * 110, 28, .46, hopper16(t, { skin: true }), -10)).join("") + T(0, -32, "old skins: " + n, 30, P.ink)); }
  // YOUR body at the frame's edges: two green front legs at the bottom, two feelers at the top; on jwings, two long wings unfold at the sides
  const bc = pale > .02 ? mixC("#7CC84A", "#F2EBC8", pale) : "#7CC84A";
  w += [-1, 1].map((sd) => `<path d="M${960 + sd * 300} 1200 Q${960 + sd * 340} 980 ${n2(960 + sd * (460 + 10 * Math.sin(t * 5)))} 900 l${sd * 40} 60" stroke="#3F7F2A" stroke-width="84" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${960 + sd * 300} 1200 Q${960 + sd * 340} 980 ${n2(960 + sd * (460 + 10 * Math.sin(t * 5)))} 900 l${sd * 40} 60" stroke="${bc}" stroke-width="66" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    + `<path d="M${960 + sd * 120} -20 Q${960 + sd * 260} ${n2(160 + 20 * Math.sin(t * 3 + sd))} ${960 + sd * 520} ${n2(120 + 30 * Math.sin(t * 2.4 + sd))}" stroke="#3F7F2A" stroke-width="18" fill="none" stroke-linecap="round"/>`).join("");
  if (t >= tW - .2) { const u = eo((t - tW + .2) / 1.4); w += [-1, 1].map((sd) => `<g transform="translate(${960 + sd * 900} 760) scale(${sd} 1) rotate(${n2(-60 * (1 - u))})"><path d="M0 0 Q-300 -140 -720 ${n2(-60 + 40 * Math.sin(t * 4))} Q-420 40 0 60z" fill="#8CC84E" stroke="#3F7F2A" stroke-width="8" opacity=".95"/><path d="M0 20 Q-300 -60 -660 -40 M0 40 Q-300 0 -600 0" stroke="#4E7F2A" stroke-width="4" fill="none"/></g>`).join(""); }
  // tight: the view squeezes at the edges; split: a crack of light opens above you; out: everything pale and soft for a moment
  const tg = ss(tTi - .3, tTi + .6, t) * (1 - ss(tSp + .2, tSp + .8, t)), z = 1 + grow;
  let out = `<g transform="translate(960 540) scale(${n2(z)}) translate(-960 -540)">${w}</g>`;
  if (tg > .01) out += `<rect width="1920" height="1080" fill="none" stroke="#3F5A2A" stroke-width="${n2(200 * tg + 40 * tg * Math.sin(t * 8))}" opacity=".55"/>`;
  if (t >= tSp - .1 && t < tO + .6) { const a = ss(tSp - .1, tSp + .5, t) * (1 - ss(tO, tO + .6, t)), op = ss(tSp, tO, t); out += OP(a, `<path d="M960 -10 L${n2(940 - 60 * op)} 200 L${n2(980 + 50 * op)} 330 L${n2(950 - 40 * op)} 470" stroke="#FFF6DA" stroke-width="${n2(14 + 80 * op)}" fill="none" stroke-linejoin="round"/><path d="M960 -10 L${n2(940 - 60 * op)} 200 L${n2(980 + 50 * op)} 330 L${n2(950 - 40 * op)} 470" stroke="#fff" stroke-width="${n2(6 + 30 * op)}" fill="none" opacity=".9"/>`); }
  out += `<rect width="1920" height="1080" fill="#FFF8EA" opacity="${n2(.45 * pale)}"/>`;
  return out + dip(t, tO, "#FFFFFF", .3); }

// Pip's homework on his easel (origin = the easel's feet): three ruled lines, each with a small cute drawing. o.lit [3], o.strike 0..1, o.fix
// 0..1 (line 3 rewritten in green; its drawing: the nymph and the adult side by side, the ≠ becomes =), o.case 0..1 (the egg case pops out big)
const HWL16 = ["It has three stages.", "Its eggs are found in an egg case.", "Its young does not look like the adult."];
function roachSheet(t, o = {}) { const lit = o.lit || [0, 0, 0], st = o.strike || 0, fx = o.fix || 0;
  let s = `<ellipse cx="0" cy="6" rx="330" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-240 0 L-170 -360 M240 0 L170 -360 M0 0 L0 -300" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><rect x="-440" y="-330" width="880" height="24" rx="8" fill="#8A5A36"/>`
    + `<g filter="url(#drop)"><rect x="-420" y="-920" width="840" height="600" rx="14" fill="#FFFDF6" stroke="#D9C9A8" stroke-width="5"/></g>${[...Array(12)].map((_, i) => `<path d="M-400 ${-850 + i * 44} H400" stroke="#DCE8F4" stroke-width="2"/>`).join("")}<path d="M-350 -910 V-330" stroke="#F4A7A0" stroke-width="3"/>`
    + T(-320, -866, "My homework: the cockroach", 38, P.ink, { a: "start" }) + T(400, -866, "by Pip", 30, P.pip, { a: "end" });
  const LY = [-780, -630, -480];
  HWL16.forEach((txt, i) => { const y = LY[i], l = lit[i];
    if (l > .02) s += `<rect x="-410" y="${y - 50}" width="820" height="${i === 2 ? 170 : 110}" rx="12" fill="${P.sun}" opacity="${n2(.35 * l)}"/>`;
    s += TF(-380, y - 8, 1, `<circle r="26" fill="${P.ink}"/>${T(0, 10, String(i + 1), 30, "#fff")}`) + T(-336, y + 4, esc(txt), 34, i === 2 && fx > .5 ? "#9A8F86" : P.ink, { a: "start", w: 600 });
    if (i === 2 && st > .01) s += `<path d="M-340 ${y - 8} L${n2(-340 + 660 * st)} ${y - 8}" stroke="#E33B2E" stroke-width="6" stroke-linecap="round"/>`; });
  // the small drawings: line 1 a small loop, line 2 a small egg case, line 3 a nymph and an adult (≠, then = on the fix)
  s += TF(330, -790, .52, miniLoop(t, roachPic, "rsl")) + TF(330, -640, .34 * (1 - .2 * (o.case || 0)), eggCase16({}));
  const sign = fx < .5 ? T(150, -360, "≠", 60, "#E33B2E") : T(150, -360, "=", 60, P.leafDeep);
  s += OP(fx < .5 ? 1 - 2 * fx : 2 * fx - 1, TF(30, -378, .36, roach16(t, {})) + sign + TF(280, -378, .42, roach16(t, { adult: true })) + (fx > .5 ? T(30, -334, "nymph: no wings", 22, P.leafDeep, { w: 700 }) + T(280, -334, "adult: wings", 22, P.leafDeep, { w: 700 }) : ""));
  if (fx > .02) s += OP(clamp(fx * 1.6), T(-336, -432, "Its young looks like the adult. It has no wings yet.", 32, P.leafDeep, { a: "start", w: 700 }));
  return s; }

// the board of FOUR small loops (frog, chicken, grasshopper, cockroach): each egg · young · adult, curved arrows, no numbers. flash [3]:
// 0 every egg/young/adult slot, 1 the chick and the tadpole, 2 the grasshopper's empty skin
const miniLoop = (t, pic, id, fl, names) => { const P3 = [[0, -70], [70, 50], [-70, 50]]; let s = `<path d="M30 -82 Q90 -60 82 10 M44 72 Q0 100 -44 72 M-82 10 Q-90 -60 -30 -82" stroke="${P.leaf}" stroke-width="7" fill="none"/>`;
  P3.forEach(([x, y], i) => { const f = fl ? fl(i) : 0; s += TF(x, y, .36 * (1 + .14 * f), (f > .05 ? `<circle r="${n2(118 + 20 * f)}" fill="${P.sun}" opacity="${n2(.7 * f)}"/>` : "") + tile16(pic(i, t), 104, id + i, P.leaf)); }); return s; };
function fourLoops(t, flash = [0, 0, 0], k = 1) { const L = [["frog", frogPic], ["chicken", chickPic], ["grasshopper", hopPic], ["cockroach", roachPic]];
  let s = `<ellipse cx="0" cy="6" rx="330" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-240 0 L-200 -120 M240 0 L200 -120" stroke="#8A5A36" stroke-width="18" stroke-linecap="round"/><g filter="url(#drop)"><rect x="-400" y="-860" width="800" height="760" rx="30" fill="url(#gPaper)" stroke="#C9A974" stroke-width="8"/></g>` + T(0, -800, "THREE STAGES", 44, P.ink, { ls: 3 });
  L.forEach(([nm, pic], j) => { const x = j % 2 ? 190 : -190, y = j < 2 ? -590 : -270;
    const fl = (i) => Math.max(flash[0], j === 0 && i === 1 ? flash[1] : 0, j === 1 && i === 1 ? flash[1] : 0, j === 2 && i === 1 ? flash[2] : 0);
    s += TF(x, y, 1, miniLoop(t, pic, "fl" + j, fl)) + TF(x, y + 120, 1, tpill(0, 0, nm, 30, "#FFF8EA", P.ink, { w: 700 }));
    if (j === 2 && flash[2] > .05) s += TF(x + 120, y - 10, .3 * (1 + .2 * flash[2]), hopper16(t, { skin: true }), -20); });
  return TF(0, 0, k, s); }

// the mantis's fun fact: cousins (ff_cousin), its egg case on a twig (ff_case), lots of tiny nymphs hatching together (ff_babies)
const ffCousin = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#E8F5DC"/>` + TF(-70, 80, .9, mantis16(t, {})) + TF(70, 50, .55, roach16(t, { adult: true }), -90) + `<path d="M-70 -110 V-130 H70 V-60" stroke="${P.ink}" stroke-width="5" fill="none"/><circle cx="0" cy="-130" r="10" fill="${P.coral}"/>`;
const ffMCase = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/><path d="M${-w / 2} -60 Q0 -80 ${w / 2} -40" stroke="#7A5226" stroke-width="16" fill="none"/>` + TF(0, 10, 1, mantisCase16(1));
const ffMBabies = (t, w, h) => { let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FFF3DC"/><path d="M${-w / 2} -90 Q0 -110 ${w / 2} -70" stroke="#7A5226" stroke-width="16" fill="none"/>` + TF(0, -40, .7, mantisCase16(1));
  for (let i = 0; i < 9; i++) { const u = ((t * .35 + i / 9) % 1), x = -110 + 30 * i + 10 * Math.sin(t + i), y = lerp(-10, 120, eo(u)); s += TF(x, y, .26, mantis16(t, { ph: i }), 10 * Math.sin(i)); } return s; };
// Part 2's "Last time..." pictures: the frog loop board, the chick beside the hen, the empty grasshopper skin on its blade with a ?
const recapPic16 = (i, t) => { let s = `<rect x="-520" y="-300" width="1040" height="600" fill="${["#DCEFFB", "#FFF3DC", "#E8F5DC"][i]}"/>`;
  if (i === 0) s += TF(0, 300, .7, loopBoard16(t, { tiles: [0, 0, 0], back: 0, id: "rp" }));
  else if (i === 1) s += TF(-40, 0, 1.5, mini2x2(t));
  else s += `<rect x="-520" y="160" width="1040" height="160" fill="#8FCB6A"/><path d="M-200 300 Q-60 60 160 -160" stroke="#6FBF4E" stroke-width="54" fill="none" stroke-linecap="round"/>` + TF(-20, 60, 2.1, hopper16(t, { skin: true }), -52) + TF(260, -150, 1, `<g filter="url(#dropS)"><circle r="56" fill="url(#gSun)"/></g>${T(0, 28, "?", 86, P.ink)}`);
  return s; };
