// scenes_c.js: segments 7-8: Round 2 (the green bean), the first-person shrink, the score, the clue card, the chant.
SC.r2card = (t, s) => roundCard(t, s, "ROUND 2");

/* ============ 7 · Round 2: the green bean ============ */
const R2 = { cut: W("h701", "living") - .3 };
// the bean on its wet cotton wool, big (for the ring and the close-up). day 2: a little fatter than its DAY 1 outline
const beanBig = (day, ghost) => (ghost ? `<g opacity=".55" filter="url(#ghostF)">${TF(0, -30, .42, beanSeed(0, 0))}</g>` : "") + beanPlant(day);
SC.r2 = (t, s) => { const L = "h701", B = BOX;
  if (t < R2.cut) { const z = lerp(2.6, 3.4, (t - s.t0) / (R2.cut - s.t0));   // close on the bean: it has not moved at all
    return boxView(t, { cam: [z, B.bean, B.floor - 40], st: { day: 2, robotX: B.robot1, robot: robotWalkStop(0, 0), bites: 1, wx: 12, cid: "cb3" },
      inside: OP(.5, `<g filter="url(#ghostF)">${TF(B.bean, B.floor - 31, 1.05 * .42, beanSeed(0, 0))}</g>`) })
      + OP(ramp(t, W(L, "the") - .05, .25), TF(1240, 200, 1, tpill(0, 0, "The green bean", 56, P.ink, "#fff", { w: 700 }))) + OP(ramp(t, W(L, "seed") - .05, .25), TF(1240, 300, 1, tpill(0, 0, "a seed", 44, "#fff", P.ink, { w: 700 })))
      + counter(t, 2, s.t0 + .15) + HUD(t); }
  return lockScene(t, { s: { t0: R2.cut }, q: "The green bean. Is it…", tq: R2.cut, tL: W(L, "living"), tR: W(L, "non-living"), ring0: MK("ring0_2"), dur: 5, lock: "h702",
    obj: () => TF(960, 566, 1.55, beanBig(2, false)),
    picks: [{ who: "pip", id: "p703", word: "NON-LIVING", kind: "blue", x: true }, { who: "basil", id: "b705", word: "LIVING", kind: "green" }, { who: "momo", id: "m704", word: "LIVING", kind: "green" }] }); };

// the three buddies lean in to the glass; the room light dims to night
SC.lean = (t, s) => { const u = (t - s.t0) / (s.t1 - s.t0), B = BOX, night = ss(.15, .9, u), z = lerp(1.5, 2.1, eio(u));
  const lean = (who, x, y, h, flip, d) => buddy(who, x, y, h, t, { flip, look: (flip ? -1 : 1) * 5 * eo((t - s.t0 - d) / .6), in: s.t0 + d, rim: "rimC" });
  return boxView(t, { cam: [z, B.bean, B.floor - 80], mode: "day", mode2: "night", mix: night, dark: night * .8, st: { day: 2.2, robotX: B.robot1, robot: robotWalkStop(0, 0), bites: 1, wx: 12, cid: "cb3" } })
    + `<rect width="1920" height="1080" fill="${P.night}" opacity="${n2(night * .25)}"/>` + lean("pip", 250, 1150, 520, false, .05) + lean("momo", 1680, 1150, 520, true, .15) + lean("basil", 1330, 1210, 430, true, .3)
    + counter(t, 2, -9) + HUD(t); };

/* ============ the first-person shrink: DAY 3, night. The calm micro-world (style: micro-world mode; no part labels at P3) ============ */
const MW = { bx: 1040, by: 400, rx: 600, ry: 380 };   // the bean in the micro-world
// a cotton fibre: a thick soft rope. pts = [x0,y0, cx,cy, x1,y1], w = width
const fibre = (p, w, o = {}) => `<path d="M${p[0]} ${p[1]} Q${p[2]} ${p[3]} ${p[4]} ${p[5]}" fill="none" stroke="${o.dark || "#9FB4D6"}" stroke-width="${w}" stroke-linecap="round"/><path d="M${p[0]} ${p[1] - w * .16} Q${p[2]} ${p[3] - w * .16} ${p[4]} ${p[5] - w * .16}" fill="none" stroke="${o.lite || "#F4F8FF"}" stroke-width="${n2(w * .6)}" stroke-linecap="round"/><path d="M${p[0]} ${p[1] - w * .3} Q${p[2]} ${p[3] - w * .3} ${p[4]} ${p[5] - w * .3}" fill="none" stroke="#fff" stroke-width="${n2(w * .12)}" stroke-linecap="round" opacity=".9"/>`;
// a hanging drop of water: glossy, with a gold glint
const drop = (x, y, r, tw_ = 0, jig = 0) => `<g transform="translate(${n2(x + jig)} ${n2(y)}) scale(${n2(1 + jig * .01)} ${n2(1 - jig * .012)})"><ellipse cx="0" cy="0" rx="${r}" ry="${n2(r * 1.12)}" fill="#8FD0FF" opacity=".5"/><ellipse cx="0" cy="${n2(r * .1)}" rx="${n2(r * .82)}" ry="${n2(r * .9)}" fill="#D9F1FF" opacity=".55"/><ellipse cx="${n2(-r * .3)}" cy="${n2(-r * .38)}" rx="${n2(r * .28)}" ry="${n2(r * .2)}" fill="#fff" opacity="${n2(.75 + .25 * tw_)}"/><circle cx="${n2(r * .34)}" cy="${n2(r * .44)}" r="${n2(r * .16)}" fill="#FFE9A8" opacity="${n2(.6 + .4 * tw_)}"/></g>`;
const MFIB = [[-300, 900, 400, 740, 1100, 860, 84], [600, 980, 1300, 770, 2200, 900, 100], [-300, 1080, 700, 900, 1700, 1090, 120], [900, 1130, 1600, 950, 2300, 1100, 110], [-200, 800, 300, 890, 760, 790, 56], [1300, 840, 1700, 770, 2200, 810, 64], [200, 1180, 900, 1010, 1500, 1200, 90], [-300, 990, 100, 930, 520, 1040, 44], [1500, 990, 1900, 900, 2300, 1000, 50]];
const MTHIN = [[-200, 760, 500, 860, 1200, 770], [300, 950, 1000, 820, 1900, 960], [800, 800, 1400, 900, 2200, 760], [-100, 1040, 600, 960, 1300, 1060], [1000, 1010, 1600, 1090, 2200, 960]];
const MDROPS = [[250, 812, 38], [660, 915, 28], [1260, 890, 46], [1650, 900, 30], [420, 1030, 34], [1900, 1010, 40], [980, 1030, 26], [120, 965, 24], [1500, 1050, 34], [1780, 800, 22], [60, 860, 30], [1110, 800, 20], [760, 1080, 30]];
// static far planes: night-blue space inside the box, soft gold light from the room, far fibres, the robot standing like a statue
BG.micro = () => { const r = rndm(41);
  return `<defs>${lg("mwSky", [[0, "#0A1E3F"], [.55, "#123F5E"], [1, "#0B2C40"]])}${rg("mwGlow", [[0, "#FFE9A8", .55], [1, "#FFE9A8", 0]])}${rg("mwMoon", [[0, "#BFE6FF", .5], [1, "#BFE6FF", 0]])}</defs>
  <rect x="-200" y="-120" width="2320" height="1320" fill="url(#mwSky)"/><ellipse cx="300" cy="120" rx="900" ry="620" fill="url(#mwMoon)"/><ellipse cx="1750" cy="900" rx="800" ry="520" fill="url(#mwGlow)" opacity=".5"/>
  <g filter="url(#b10)">${Array.from({ length: 26 }, () => `<circle cx="${n2(r() * 2200 - 150)}" cy="${n2(r() * 800 - 60)}" r="${n2(14 + r() * 50)}" fill="${["#BFE6FF", "#FFE9A8", "#7FE3C4"][Math.floor(r() * 3)]}" opacity="${n2(.05 + r() * .12)}"/>`).join("")}</g>
  <!-- far behind: the robot stands like a statue -->
  <g filter="url(#b4)" opacity=".7"><g transform="translate(1560 700) scale(2.6)">${robotWalkStop(0, 0).replace(/url\(#(gBot|gMetal|gSun|xWin)\)/g, "#23608A").replace(/#FF8A66|#FFE27A|#fff|#FF6F61|#FFC83A|#3A8DFF|#2B2147/g, "#2E77A6").replace(/stroke="#[0-9A-F]{6}"/g, 'stroke="#8FD0FF"')}</g></g>
  <g filter="url(#b10)" opacity=".55">${fibre([-300, 640, 500, 520, 1200, 660], 70, { dark: "#3E6890", lite: "#6E9CC0" })}${fibre([800, 700, 1500, 560, 2300, 680], 80, { dark: "#3E6890", lite: "#6E9CC0" })}</g>
  <rect x="-200" y="700" width="2320" height="500" fill="#0B2C40" opacity=".35"/>`; };
// the bean, huge. split: 0..1 hairline, open: 0..1 the skin opens, root: 0..1 the root pushes out and curves down past the camera
function microBean(t, split, open, root) { const { bx, by, rx, ry } = MW; const sx = bx - rx * .56, sy = by + ry * .52;   // where the skin splits (near the pale scar)
  let s = `<g transform="rotate(-8 ${bx} ${by})"><ellipse cx="${bx}" cy="${by + 30}" rx="${rx}" ry="${ry}" fill="#0B2C40" opacity=".5" filter="url(#b30)"/>
    <ellipse cx="${bx}" cy="${by}" rx="${rx}" ry="${ry}" fill="url(#mwBean)"/><ellipse cx="${bx}" cy="${by}" rx="${rx}" ry="${ry}" fill="url(#mwBeanSh)"/>
    <ellipse cx="${bx}" cy="${by}" rx="${rx}" ry="${ry}" fill="none" stroke="#DFF5B8" stroke-width="8" opacity=".55"/>
    <path d="M${bx - rx * .62} ${by - ry * .5} Q${bx - rx * .2} ${by - ry * .92} ${bx + rx * .42} ${by - ry * .74}" stroke="#fff" stroke-width="34" stroke-linecap="round" fill="none" opacity="${n2(.34 + .06 * Math.sin(t * .9))}" filter="url(#b4)"/>
    <ellipse cx="${bx + rx * .5}" cy="${by - ry * .45}" rx="60" ry="26" fill="#fff" opacity=".3" filter="url(#b4)"/>
    <rect x="${bx - rx * .2}" y="${by + ry * .2}" width="${rx * .34}" height="${ry * .16}" rx="${ry * .08}" fill="#F3F6DC" stroke="#7FA05A" stroke-width="6" opacity=".95"/></g>`;
  if (split > 0) { // the split: a hairline that runs along the skin at the bean's end, then the skin opens there
    const A0 = 172, A1 = 172 - 62 * split, arc = (k, a0, a1) => { let d = ""; for (let i = 0; i <= 12; i++) { const a = (a0 + (a1 - a0) * i / 12) * Math.PI / 180; d += `${i ? "L" : "M"}${n2(bx + rx * k * Math.cos(a))} ${n2(by + ry * k * Math.sin(a))}`; } return d; };
    const kin = .93 - .16 * open, kout = .93 + .02 * open;
    s = s.replace("</g>", "") + (open > .02 ? `<path d="${arc(kout, A0, A1)} ${arc(kin, A1, A0).replace("M", "L")}z" fill="#F4F6DC" stroke="#3F6A28" stroke-width="7" stroke-linejoin="round"/><path d="${arc((kin + kout) / 2, A0 - 4, A1 + 4)}" fill="none" stroke="#fff" stroke-width="${n2(10 * open)}" stroke-linecap="round" opacity=".7"/>` : `<path d="${arc(.93, A0, A1)}" fill="none" stroke="#3F6A28" stroke-width="5" stroke-linecap="round"/>`) + "</g>"; }
  return s; }
function microRoot(t, root) { if (root <= 0) return ""; const sx = 640, sy = 640; let s = "";
  // the root's path: out of the split, curving slowly down, past the camera (bottom left, growing as it nears us)
  const P0 = [sx, sy], P1 = [sx - 150, sy + 70], P2 = [sx - 250, sy + 330], P3 = [sx - 150, sy + 820], N = 26, n = Math.max(2, Math.ceil(N * root)); const pt = (u) => { const a = 1 - u; return [a * a * a * P0[0] + 3 * a * a * u * P1[0] + 3 * a * u * u * P2[0] + u * u * u * P3[0], a * a * a * P0[1] + 3 * a * a * u * P1[1] + 3 * a * u * u * P2[1] + u * u * u * P3[1]]; };
  for (const [col, wk, op] of [["#B9C8A8", 1, 1], ["#FBFBEF", .78, 1], ["#fff", .3, .9]]) for (let i = 0; i < n; i++) { const u0 = i / N * 1, u1 = Math.min(root, (i + 1) / N), a = pt(u0), b = pt(u1); if (u1 <= u0) break; const w = (64 + 170 * u0 * u0) * wk * Math.min(1, (root - u0) * 9 + .35);
    s += `<path d="M${n2(a[0] - (wk < .5 ? w * .9 : 0))} ${n2(a[1])} L${n2(b[0] - (wk < .5 ? w * .9 : 0))} ${n2(b[1])}" stroke="${col}" stroke-width="${n2(w)}" stroke-linecap="round" opacity="${op}"/>`; }
  return `<g filter="url(#rimC)">${s}</g>`; }
SC.shrink = (t, s) => { const td = MK("dive"), a = "h707", tBC = MK("beanClose"), tCr = MK("crack"), c = "h709", d = "h710", B = BOX;
  if (t < td + 1.0) { // the dive: through one air hole in the lid
    const u = (t - td) / 1.0, z = 2.1 * Math.pow(26, ei(u) * .9 + u * .1), hx = 470 + 3 * 109, cx = lerp(B.bean, hx, eo(u * 1.6)), cy = lerp(B.floor - 80, 216, eo(u * 1.6));
    return boxView(t, { cam: [z, cx, cy], mode: "night", dark: .8, st: { day: 2.6, robotX: B.robot1, robot: robotWalkStop(0, 0), bites: 1, wx: 12, cid: "cb3" } }) + `<rect width="1920" height="1080" fill="#0A1E3F" opacity="${n2(.25 + .75 * ss(.55, 1, u))}"/>`; }
  // inside: float down, land on the cotton wool; the bean; the split; the root
  const u1 = clamp((t - td - 1.0) / 2.4), fall = 1 - eo(u1);
  const close = ss(tBC - 1.2, tBC + 1.6, t), split = ss(tCr, tCr + 1.6, t), open = ss(LT(c) - .2, LT(c) + 2.2, t), root = clamp((t - (W(c, "a") - .3)) / (s.t1 - W(c, "a") + 1.5)) , rootE = Math.pow(root, .8) * .9;
  const z = lerp(lerp(.62, .72, u1), 1.16, close) + .05 * ss(LT(d), s.t1, t), cx = lerp(1000, 820, close) , cy = lerp(520, 560, close) + 170 * ss(LT(c) + 1, s.t1, t) - 700 * fall;
  const drift = 6 * Math.sin(t * .5);
  const pass = ss(.08, .5, rootE);   // the drops tremble as the root passes
  let drops = ""; MDROPS.forEach(([x, y, r], i) => { const near = Math.exp(-Math.pow((x - 420) / 500, 2)) * pass * (1 - ss(.75, 1, rootE) * .6); drops += drop(x, y, r, .5 + .5 * Math.sin(t * 1.3 + i * 2.1), near * 7 * Math.sin(t * 17 + i)); });
  // drops fall slowly off a fibre now and then (close water)
  let fibs = ""; MTHIN.forEach((f) => { fibs += `<path d="M${f[0]} ${f[1]} Q${f[2]} ${f[3]} ${f[4]} ${f[5]}" fill="none" stroke="#E6F0FF" stroke-width="9" stroke-linecap="round" opacity=".8"/>`; }); MFIB.forEach((f) => { fibs += fibre(f, f[6]); });
  const shafts = `<g style="mix-blend-mode:screen" opacity="${n2(.5 + .08 * Math.sin(t * .6))}"><path d="M-200 -200 L500 -200 L1500 1300 L500 1300z" fill="#BFE6FF" opacity=".16" filter="url(#b30)"/><path d="M700 -200 L980 -200 L2100 1300 L1640 1300z" fill="#FFE9A8" opacity=".12" filter="url(#b30)"/></g>`;
  const world = `<defs>${lg("mwBean", [[0, "#DFF2A8"], [.5, "#A9D06E"], [1, "#5E9A46"]], .4, 1)}${rg("mwBeanSh", [[0, "#fff", .25], [.6, "#fff", 0], [1, "#123F5E", .4]], .32, .28, .8)}</defs>`
    + fibre([-300, 820, 600, 700, 1500, 800], 80, { dark: "#6E8FBA", lite: "#C9DCF2" }) + `<g filter="url(#rimC)">${microBean(t, split, open, rootE)}</g>` + `<ellipse cx="1500" cy="330" rx="150" ry="230" fill="#FFE9A8" opacity=".22" filter="url(#b30)"/>` + microRoot(t, rootE) + fibs + drops + shafts;
  const near = `<g filter="url(#b10)" opacity=".8">${fibre([-400, 1330, 300, 1150, 900, 1380], 190, { dark: "#16466A", lite: "#3C7AA6" })}${fibre([1300, 1400, 1800, 1140, 2400, 1280], 210, { dark: "#16466A", lite: "#3C7AA6" })}</g>`;
  const specks = Array.from({ length: 24 }, (_, i) => { const x = (hash(i, 2) * 2100 + t * (6 + hash(i, 4) * 10)) % 2100 - 90, y = (hash(i, 6) * 1100 + 1100 - t * (4 + hash(i, 8) * 8)) % 1100; return `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + hash(i, 3) * 4)}" fill="#FFF3DC" opacity="${n2(.2 + .3 * hash(i, 5))}"/>`; }).join("");
  const tCard = td + 1.2, tHands = LT(a) - .4;
  return CAM(bg("micro"), z, cx, cy, .25) + CAM(`<g transform="translate(${n2(drift)} 0)">${world}</g>`, z, cx, cy, 1) + specks + CAM(near, z, cx, cy, 1.5)
    + `<rect width="1920" height="1080" fill="none" stroke="${P.sun}" stroke-width="26" opacity=".16" filter="url(#b10)"/>`
    + OP(ramp(t, tCard, .4) * (1 - ramp(t, tCard + 2.4, .4)), `<g transform="translate(960 150)"><rect x="-330" y="-44" width="660" height="88" rx="44" fill="${P.ink}" opacity=".85"/>${T(0, 16, `DAY 3 <tspan fill="${P.sun}">· night ·</tspan> speeded up`, 46, "#fff", { w: 600 })}</g>`)
    + OP(ramp(t, tHands, .5), TF(1920 - 210, 60 + 0, 1, "") + `<g transform="translate(60 60)"><rect x="0" y="0" width="${n2(tw("You: smaller than an ant", 30, 600) + 60)}" height="58" rx="29" fill="${P.ink}" opacity=".8"/>${T(30, 39, "You: smaller than an ant", 30, "#fff", { a: "start", w: 600 })}</g>`
      + TF(600, 1040 + 60 * (1 - ramp(t, tHands, .6)) + 6 * Math.sin(t * 1.1), 1.1, `<g transform="rotate(14)">${countHand(5)}</g>`) + TF(1320, 1040 + 60 * (1 - ramp(t, tHands, .6)) + 6 * Math.sin(t * 1.1 + 1), 1.1, `<g transform="scale(-1 1) rotate(14)">${countHand(5)}</g>`) + youPill(960, 1010, 1.15))
    + OP(1 - ss(td + 1.0, td + 1.7, t), `<rect width="1920" height="1080" fill="#0A1E3F"/>`) + vignette(.5); };

// pull back out through the lid: DAY 3 -> DAY 5, a shoot stands up and two leaves open
SC.r2out = (t, s) => { const L = "h711", B = BOX, u = (t - s.t0) / 1.2, f1 = s.t0 + 1.25, f2 = f1 + .95, day = lerp(3.3, 5, eio((t - f1 + .2) / 2.4));
  const z = lerp(4.2, 2.5, eo(u)), tT = WE(L, "thing") - .15, [d, tf] = dayAt(t, [[0, 3], [f1, 4], [f2, 5]]);
  return boxView(t, { cam: [z + .05 * (t - s.t0) / 8, B.bean + 110, B.floor - 110], st: { day, robotX: B.robot1, robot: robotWalkStop(0, 0), bites: t > f1 ? 2 : 1, wx: t > f1 ? -52 : 12, cid: "cb4" } })
    + tag(t, tT, 760, 330, true, 1.5) + counter(t, d, tf) + speeded(t, s.t0 + .6, f2 + 1.6) + (u < 1 ? `<circle cx="960" cy="540" r="1200" fill="none" stroke="#0A1E3F" stroke-width="${n2(1700 * (1 - eo(u)))}"/>` : "") + HUD(t); };

/* ============ the score after Round 2 ============ */
SC.r2score = (t, s) => { const tc = WE("h712", "left") + .15, tn = tc + .6, tPen = W("h714", "green", 1) - .2, tTag = W("h714", "non-living") - .15, tw2 = LT("p713") + 1.1;
  const note = t > tw2 ? TF(640, 800, spring(t, tw2, .4), `<g transform="rotate(-5)" filter="url(#dropS)"><rect x="-120" y="-76" width="240" height="152" rx="12" fill="${P.paper}"/><rect x="-120" y="-76" width="240" height="26" rx="10" fill="${P.coral}"/><path d="M-96 -20 H96 M-96 20 H96 M-96 56 H96" stroke="#BFD0F0" stroke-width="2.5"/>${T(0, 12, "watch", 36, P.ink2, { w: 600 })}${T(0, 50, "longer", 36, P.ink2, { w: 600 })}</g>`) : "";
  return bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 170, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.3)}</g>` + coin(t, tc, 720, 320, "+1", "if you pointed left") + (t >= tn ? TF(1210, 330, spring(t, tn, .4) * (1 - eo((t - tn - 2.6) / .3)), tpill(0, 0, "needs two good reasons", 30, P.ink, "#DDD3FF")) : "")
    + buddy("pip", 360, 1050, 380, t, { aura: true, poses: [[s.t0, "thinking"], [LT("p713") - .1, "sit"], [LE("p713") + .15, "oops"], [LE("p713") + 1.4, "sit"]] }) + note
    + buddy("momo", 1560, 1050, 380, t, { aura: true, flip: true, poses: [[s.t0, "cheer"], [LT("h714") + .3, "sit"], [W("h714", "but"), "surprised"], [tTag, "oops"], [LT("m715") - .1, "sit"], [W("m715", "so"), "thinking"]] })
    + (t >= tPen ? TF(980, 700, spring(t, tPen, .45) * 1.5, `<g filter="url(#rim)">${pencil()}</g>`) + tag(t, tTag, 980, 850, false, 1.1) + (t >= tPen ? OP(ramp(t, tPen + .2, .3), tpill(980, 560, "green pencil", 34, "#fff", P.ink)) : "") : "")
    + say("p713", 420, 520, t, { size: 44, maxW: 560, tail: -40 }) + say("m715", 1480, 520, t, { size: 46, maxW: 560, tail: 60 }) + logo(t); };
SCORE.push([WE("h712", "left") + .15, 2, 1]);

/* ============ 8 · the real clues ============ */
SC.clue = (t, s) => { const a = "h801", b = "h802", tN = W(a, "what") - .1, tD = W(a, "what", 1) - .1, x1 = W(a, "not"), x2 = W(a, "not", 1);
  const xchip = (x, txt, t0) => t < t0 ? "" : TF(x, 150, spring(t, t0, .4), `<g filter="url(#dropS)"><rect x="${-(tw(txt, 40, 600) + 110) / 2}" y="-40" width="${tw(txt, 40, 600) + 110}" height="80" rx="40" fill="${P.paper}"/></g><g transform="translate(${-(tw(txt, 40, 600) + 110) / 2 + 44} 0)"><path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/></g>${T(26, 14, txt, 40, P.ink, { w: 600 })}`);
  const panel = (x, t0, head, key, kinds, words, cols) => { const k = spring(t, t0, .5); if (k < .02) return ""; let ic = "";
    kinds.forEach((kd, i) => { const tw0 = W(b, words[i]), bump = 1 + .25 * pulse(t, tw0, .04, .45), lit = t >= tw0 - .05; ic += TF(-220 + i * 220, 50, 1.55 * bump, `<g filter="url(#${lit ? "glowS" : "dropS"})"><circle r="50" fill="${P.paper}"/></g>${needIcon(kd, cols[i][0], cols[i][1])}`); });
    return TF(x, 430, k, `<g transform="rotate(${x < 960 ? -1.2 : 1.2})"><g filter="url(#drop)"><rect x="-400" y="-190" width="800" height="390" rx="46" fill="url(#gPaper)"/><path d="M-400 -144 Q-400 -190 -354 -190 H354 Q400 -190 400 -144 V-70 H-400z" fill="url(#gSun)"/></g>
      <text x="0" y="-106" font-family="Fredoka" font-weight="700" font-size="58" fill="${P.ink}" text-anchor="middle">${head}<tspan font-size="70" dx="14">${key}</tspan><tspan>?</tspan></text>${ic}</g>`); };
  // the book's two sentences, each on a gold strip, word by word (said once: a preview)
  const strip = (y, sw, sent) => { const L = TL.lines[b], toks = sent.split(" "), size = 54, sp = tw(" ", size, 700, "Atkinson Hyperlegible"), total = tw(sent, size, 700, "Atkinson Hyperlegible"), a0 = ramp(t, L.words[sw].a - .25, .3); if (a0 <= 0) return ""; let tx = "", cx = 0;
    toks.forEach((w, i) => { const wt = L.words[sw + i].a, o = ramp(t, wt - .05, .15); if (o > 0) tx += `<text x="${n2(960 - total / 2 + cx)}" y="${y + 19}" font-family="Atkinson Hyperlegible" font-weight="700" font-size="${size}" fill="${P.ink}" opacity="${n2(o)}">${esc(w)}</text>`; cx += tw(w, size, 700, "Atkinson Hyperlegible") + sp; });
    return OP(a0, `<g filter="url(#dropS)"><rect x="${n2(960 - total / 2 - 50)}" y="${y - 46}" width="${n2(total + 100)}" height="92" rx="22" fill="#FFE27A"/><rect x="${n2(960 - total / 2 - 50)}" y="${y - 46}" width="16" height="92" rx="8" fill="${P.sunDeep}"/></g>`) + tx; };
  const tTest = W(b, "you") - .1;
  return bg("stage2") + xchip(600, "how it looks", x1) + xchip(1290, "whether it moves", x2)
    + panel(500, tN, "What does it", "NEED", ["water", "food", "air"], ["water", "food", "air"], [["#1F5FD0", "#8CC8FF"], ["#B4760C", "#F3DDB0"], ["#2E8FB8", "#BFE6FF"]])
    + panel(1420, tD, "What can it", "DO", ["grow", "respond", "reproduce"], ["grow", "respond", "reproduce"], [["#1F8A4C", "#9BE08F"], ["#E36A12", "#FFD08A"], ["#8A4FD0", "#D9C2FF"]])
    + strip(740, 0, "Living things need water, food and air.") + strip(852, 7, "Living things grow, respond to changes and reproduce.")
    + (t >= tN + .5 ? TF(960, 990, spring(t, tN + .6, .4) * (1 + .1 * pulse(t, tTest + .2, .1, .6)), tpill(0, 0, "More in Episodes 2 and 3", 38, P.ink, P.sun, { w: 600 })) : "")
    + buddy("basil", 170, 1070, 230, t, { aura: true, poses: [[s.t0, "arms_crossed"], [tN, "surprised"], [tD + .6, "sit"], [tTest, "cheer"]] }) + HUD(t); };

/* ============ the chant: clap, clap, stomp ============ */
function chantScene(t, id, o = {}) { const L = TL.lines[id], bar = L.bar, PH = ["Does it move?", "That's NOT the clue!", "What does it NEED?", "What can it DO?"], KEY = ["move?", "NOT", "NEED?", "DO?"];
  const tb = t - L.t, cur = clamp(Math.floor(tb / bar), -1, 3); let lines = "";
  const y0 = o.y0 || 190, dy = o.dy || 128, size = o.size || 96;
  PH.forEach((ph, i) => { const on = cur === i, done = cur > i, ws = ph.split(" "), total = tw(ph, size, 700, "Fredoka", 2), sc = 1 + .12 * pulse(t, L.t + i * bar, .04, .5); let cx = -total / 2, tx = "";
    ws.forEach((w, j) => { const widx = PH.slice(0, i).reduce((n, p) => n + p.split(" ").length, 0) + j, wt = L.words[widx].a, lit = t >= wt - .03, ww = tw(w, size, 700, "Fredoka", 2), isKey = w === KEY[i];
      tx += `<text x="${n2(cx)}" y="0" font-family="Fredoka" font-weight="700" font-size="${size}" letter-spacing="2" fill="${lit ? (isKey ? P.sun : "#fff") : "#fff"}" opacity="${lit ? 1 : .28}" ${lit && isKey ? `transform="translate(${n2(cx + ww / 2)} 0) scale(${n2(1 + .18 * pulse(t, wt, .03, .35))}) translate(${n2(-cx - ww / 2)} 0)"` : ""}>${esc(w)}</text>`; cx += ww + tw(" ", size, 700); });
    lines += `<g transform="translate(${o.x || 960} ${y0 + i * dy}) scale(${n2(sc)})">${tx}</g>`; });
  // the beat: clap, clap, stomp (two bars of it before the words, then under every phrase)
  const beats = []; for (let b = -1; b < 4; b++) { beats.push([L.t + b * bar, "c"], [L.t + b * bar + bar * .25, "c"], [L.t + b * bar + bar * .5, "s"]); }
  let fx = "", clap = 0, stomp = 0; for (const [bt, k] of beats) { if (bt < L.t - .8) continue; if (k === "c") clap = Math.max(clap, pulse(t, bt, .03, .18)); else stomp = Math.max(stomp, pulse(t, bt, .03, .25)); }
  const jumps = beats.filter((b) => b[1] === "s" && b[0] > L.t - .8).map((b) => [b[0] - .2, 30]);
  const by = o.by || 1066, bh = o.bh || 300, xs = o.xs || [400, 960, 1520];
  let buds = ""; ["pip", "basil", "momo"].forEach((w, i) => { const sq = 1 - .05 * clap; buds += `<g transform="translate(${xs[i]} ${by}) scale(${n2(1 / sq)} ${n2(sq)}) translate(${-xs[i]} ${-by})">${buddy(w, xs[i], by, bh, t, { aura: true, jump: jumps, poses: [[L.t - .9, "sit"], [L.t + 4 * bar - .28, "cheer"]] })}</g>`;
    fx += OP(clap, `<g stroke="${P.sun}" stroke-width="7" stroke-linecap="round"><path d="M${xs[i] - bh * .5} ${by - bh * .8} l-26 -22 M${xs[i] + bh * .5} ${by - bh * .8} l26 -22 M${xs[i]} ${by - bh * 1.08} v-30"/></g>`) + OP(stomp, `<ellipse cx="${xs[i]}" cy="${by}" rx="${n2(bh * (.5 + .4 * (1 - stomp)))}" ry="${n2(22 + 16 * (1 - stomp))}" fill="none" stroke="#fff" stroke-width="6"/>`); });
  return lines + buds + fx; }
SC.chant = (t, s) => bg("stage2") + chantScene(t, "c803") + OP(ramp(t, s.t0 + .2, .3), youPill(250, 150, 1.1) + bubble(250, 250, ["Say it with us!"], t, s.t0 + .25, s.t1, { size: 38, down: false, tail: 0 })) + HUD(t);
