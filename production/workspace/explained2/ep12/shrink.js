// shrink.js: the first-person journeys (the series' signature). The camera IS the thing.
// EP10: Part 1 = BE THE AIR (over the sea, in through a door of a giant metal ship, a huge room with metal walls, the door shuts: trapped air,
//      water outside the wall, the ship floats on). Part 2 = BE A RAINDROP (falling past the flats, onto a plastic raincoat: no way in, rolling
//      off onto a fabric school shoe, soaking in between the threads, passing through onto a sock).
// Stage 1: both are phScene placeholders in p1.js / p2.js (SC.shrink). EP8's sand and sap journeys (ep08/shrink.js) and EP9's (ep09/shrink.js,
// once drawn) are the models.
// STAGE 2 (Fable) draws SC.shrink for each part here; the timeline marks are listed in SCENES_TODO.md. EP5's frog and mudskipper
// journeys (ep05/shrink.js) and EP6's are the models: dive, youTag, feelTag, wipe in and out.
// The generic helpers below are EP5's, kept as they were.
const hexL = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.substr(i, 2), 16)); return "#" + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, "0")).join(""); };
const youTag = (t, t0, txt) => OP(ramp(t, t0, .4), tpill(60 + tw(txt, 46, 700) / 2 + 34, 86, txt, 46, P.ink, P.sun, { w: 700 }));   // v3: bigger, sun-yellow words (YOU)
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

/* ====================================================================================================================================
   EP12 STAGE 2. Part 1 = BE THE METAL (you are one bar at the bottom of the trolley: the bars run away like shining rails, the sack lands on
   you, the floor rushes past between the bars, the back of the next trolley rushes up: a knock; you do not bend, you do not break).
   Part 2 = BE A DROP OF WATER (out of the watering can's spout, onto the windscreen: you cannot pass through; the dry fabric seats seen
   through the glass; down the painted metal body, past the rubber tyre, to the ground). Calm; nothing said about why.
   ==================================================================================================================================== */
const JC12 = "#FFF6D8";
if (PART === 1) { (() => {
  // the view from on top of one bar: the bars run away on both sides to a far point (VX, VY); above, the walkway's ceiling
  const VX = 960, VY = 470;
  const rails = (shade = 0) => { let s = ""; [-1500, -900, -420, 420, 900, 1500].forEach((dx) => { const w = Math.abs(dx) < 500 ? 90 : 60; s += `<path d="M${VX} ${VY} L${VX + dx - w} 1100 H${VX + dx + w}z" fill="url(#wSteelH)" stroke="${METD}" stroke-width="5"/><path d="M${VX} ${VY} L${VX + dx - w * .3} 1100" stroke="#fff" stroke-width="6" opacity=".8"/>`; });
    for (let i = 1; i <= 6; i++) { const v = i / 6, y = VY + (1100 - VY) * v * v; s += `<rect x="-20" y="${n2(y - 4 - 10 * v)}" width="1960" height="${n2(8 + 22 * v)}" rx="8" fill="url(#wSteel)" stroke="${METD}" stroke-width="${n2(2 + 3 * v)}" opacity=".95"/>`; }
    return s + (shade ? `<rect y="${VY}" width="1920" height="${1080 - VY}" fill="${P.ink}" opacity="${n2(.22 * shade)}"/>` : ""); };
  const walls = () => { let s = ""; for (let i = -9; i <= 9; i++) s += `<path d="M${VX + i * 110} ${VY + 4} L${VX + i * 150} 150" stroke="${MET}" stroke-width="${5 + Math.abs(i) * .5}" opacity=".7"/>`; for (let j = 0; j < 4; j++) s += `<path d="M-40 ${VY - 60 - j * 80} H1960" stroke="${MET}" stroke-width="5" opacity=".6"/>`; return s; };
  const ceil = `<rect width="1920" height="1080" fill="#F6E7C6"/><rect width="1920" height="150" fill="#D9C7A6"/>${[500, 1420].map((x) => `<rect x="${x - 150}" y="60" width="300" height="34" rx="14" fill="#FFFDF0" stroke="#C9B58F" stroke-width="5"/>`).join("")}`;
  // the floor rushing past below, seen between the bars (d = how far you have rolled)
  const floorRush = (d) => { let s = `<rect width="1920" height="1080" fill="#D9C7A6"/><rect width="1920" height="${VY}" fill="#F6E7C6"/>`; for (let i = 0; i < 10; i++) { const v = ((i / 10 + d) % 1), y = VY + (1100 - VY) * v * v; s += `<path d="M0 ${n2(y)} H1920" stroke="#A8936C" stroke-width="${n2(3 + 16 * v)}" opacity="${n2(.3 + .6 * v)}"/>`; }
    for (let i = -6; i <= 6; i++) s += `<path d="M${VX} ${VY} L${VX + i * 420} 1100" stroke="#A8936C" stroke-width="4" opacity=".4"/>`;
    for (let i = 0; i < 4; i++) { const px = ((i * 620 - d * 260) % 2480 + 2480) % 2480 - 280; s += `<rect x="${n2(px)}" y="150" width="120" height="${VY - 150}" fill="#EBD8B8" stroke="#D2BC96" stroke-width="5"/>`; }
    return s + `<rect width="1920" height="150" fill="#D9C7A6"/>`; };
  const sackUnder = (k) => TF(960, lerp(-700, 150, k), 1, `<path d="M-900 -900 H900 V140 Q900 330 600 330 H-600 Q-900 330 -900 140z" fill="#FFF6DE" stroke="#C9A772" stroke-width="14"/><path d="M-860 200 Q0 300 860 200" stroke="#E8604E" stroke-width="26" fill="none"/>${T(0, 150, "RICE 10 kg", 120, "#C4502E", { ls: 8 })}<path d="M-700 290 Q0 340 700 290" stroke="#C9A772" stroke-width="8" fill="none" opacity=".6"/>`);
  const nextBack = (k) => { let g = ""; for (let i = -6; i <= 6; i++) g += `<path d="M${i * 60} -200 V200" stroke="${MET}" stroke-width="9"/>`; for (let j = -3; j <= 3; j++) g += `<path d="M-380 ${j * 60} H380" stroke="${MET}" stroke-width="9"/>`;
    return TF(VX, VY - 30, k, `<rect x="-380" y="-210" width="760" height="420" rx="16" fill="#E9EEF7" opacity=".6"/>${g}<rect x="-380" y="-210" width="760" height="420" rx="16" fill="none" stroke="${METD}" stroke-width="26"/><rect x="-420" y="190" width="840" height="60" rx="30" fill="url(#wSteel)" stroke="${METD}" stroke-width="10"/>`); };
  SC.shrink = (t, s) => { const tB = MK("jbar"), tR = MK("jrice"), tT = MK("jthump"), tO = MK("jroll"), tK = MK("jknock"), tC = MK("jclang"), tS = MK("strongchip"), tNo = W("g1203", "you") - .15, tNb = W("g1205", "you") - .15;
    let v;
    if (t < tO) { const k = t < tR ? 0 : t < tT ? ei((t - tR) / (tT - tR)) : 1, dp = t >= tT ? 12 * wob(t, tT, .5) + 5 * (1 - Math.exp(-(t - tT) * 6)) : 0, z = 1 + .03 * eio((t - s.t0) / 6);
      v = `<g transform="translate(960 ${n2(540 + dp)}) scale(${n2(z)}) translate(-960 -540)">${ceil}${walls()}${k > 0 ? sackUnder(k) : ""}${rails(k)}</g>`; }
    else { const d = (t - tO) * 1.25, stopU = clamp((t - tC) / .4), dd = t < tC ? d : (tC - tO) * 1.25, kk = t < tK - .9 ? 0 : t < tC ? lerp(.12, 2.3, ei((t - (tK - .9)) / (tC - tK + .9))) : 2.3, sh = t >= tC ? 26 * wob(t, tC, .45) * Math.cos((t - tC) * 40) : 0, bump = t < tC ? 5 * Math.sin(t * 31) : 0;
      v = `<g transform="translate(${n2(sh)} ${n2(bump)})">${floorRush(dd)}${kk > 0 ? nextBack(kk) : ""}<g opacity=".97">${rails(.6)}</g>${TF(960, -200, 1, `<path d="M-1000 0 H1000 V250 Q0 330 -1000 250z" fill="#FFF6DE" stroke="#C9A772" stroke-width="12"/>`)}</g>`
        + (t >= tC ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.95 * pulse(t, tC + .01, .01, .45))}"/>` : ""); }
    // v3 (teacher, 22 Nov): YOU are the bar (your own bar glows under you, a YOU tag on it, as EP5's frog hands); the three buddies ride along,
    // shrunk down, on the bars at the edges: they look up at the sack, bump on the THUMP, cheer as you roll, and at the CLANG the view jolts,
    // a burst lands where the next trolley hits and Basil's face pops in big: shocked, rubbing his head, then a cheer: "No crack!"
    const mine = t < tO ? `<path d="M${VX} ${VY} L${VX - 110} 1100 H${VX + 110}z" fill="url(#wSteelH)" stroke="${P.sun}" stroke-width="12" stroke-linejoin="round" opacity=".95"/><path d="M${VX} ${VY} L${VX - 30} 1100" stroke="#fff" stroke-width="8" opacity=".85"/>` : "";
    v = JOLT(t, [tT, tC], v + mine, 34) + OP(ramp(t, tB, .4), TF(960, 1012, 1, youPill(0, 0, 1.15)));
    const rp = { pip: [[tR - .2, "surprised"], [tT + .05, "oops"], [tO + .2, "cheer"], [tK - .6, "surprised"], [tC + .05, "oops"], [tNb, "cheer"]],
      basil: [[tR, "surprised"], [tT + .05, "surprised"], [tT + 1.0, "sit"], [tO + .3, "cheer"], [tK - .5, "arms_crossed"], [tC + .05, "oops"], [tNb + .1, "cheer"]],
      momo: [[s.t0 + .8, "back"], [tT + .05, "surprised"], [tT + 1.1, "back"], [tO + .4, "cheer"], [tO + 2.2, "back"], [tC + .05, "surprised"], [tNb + .2, "cheer"]] };
    v += riders(t, s, { tin: tB + .3, poses: rp, jolts: [tT, tC], noreact: true })
      + impactFX(t, tT, 960, 360, "THUMP!", { s: .8, flash: false }) + impactFX(t, tC, 960, 420, "CLANG!", { s: 1.25, d: 1.1 })
      + faceCam("basil", t, tC + .08, tNb + 1.2, 1560, 520, 175, [[tC + .08, "surprised"], [tC + .75, "oops"], [tNb - .05, "cheer"]], { rot: 6, noreact: true })
      + (t >= tNb ? TF(1560, 760, spring(t, tNb, .4) * (1 - ramp(t, tNb + 1.4, .3)), tpill(0, 0, "No crack!", 46, GOODC, "#fff", { w: 700 })) : "");
    return v + `<radialGradient id="jV1" cx=".5" cy=".5" r=".75"><stop offset=".62" stop-color="${P.ink}" stop-opacity="0"/><stop offset="1" stop-color="${P.ink}" stop-opacity=".4"/></radialGradient><rect width="1920" height="1080" fill="url(#jV1)"/>` + dip(t, tO, JC12, .3) + wipe(t, s.t0, JC12)
      + TF(0, 62, 1, youTag(t, tB, "You: a metal bar")) + feelTag(t, tB + .5, tR - .2, "the bottom of the trolley") + feelTag(t, tR + .2, tNo - .1, "a heavy bag of rice") + feelTag(t, tNo, tO - .3, "you do not bend") + feelTag(t, tO + .2, tK - .5, "rolling")
      + feelTag(t, tC + .5, tNb - .1, "a hard knock") + feelTag(t, tNb, tS - .1, "you do not break") + (t >= tS ? TF(960, 780, spring(t, tS, .45) * (1 + .04 * Math.sin(t * 5)), `<circle r="150" fill="${JC12}" opacity=".6" filter="url(#b30)"/>` + propChip("STRONG", 76)) : "") + logo(t); };
})(); }
if (PART === 2) { (() => {
  const SKY = `<rect width="1920" height="1080" fill="url(#wSky)"/><ellipse cx="1400" cy="260" rx="260" ry="60" fill="#fff" opacity=".8"/><ellipse cx="500" cy="420" rx="200" ry="46" fill="#fff" opacity=".7"/>`;
  // you are water: the edges of the view wobble softly
  const wob2 = (t) => `<radialGradient id="jW2" cx=".5" cy=".5" r=".74"><stop offset=".66" stop-color="#BDEBFF" stop-opacity="0"/><stop offset="1" stop-color="#8ED3F2" stop-opacity=".75"/></radialGradient><rect width="1920" height="1080" fill="url(#jW2)"/><ellipse cx="960" cy="540" rx="${n2(1010 + 26 * Math.sin(t * 2.3))}" ry="${n2(590 + 22 * Math.sin(t * 2.9 + 1))}" fill="none" stroke="#fff" stroke-width="${n2(22 + 8 * Math.sin(t * 3.1))}" opacity=".5"/>`;
  const rings = (t, t0, x = 960, y = 560) => [0, 1, 2].map((i) => { const u = (t - t0 - i * .22) / 1.3; return u <= 0 || u >= 1 ? "" : `<ellipse cx="${x}" cy="${y}" rx="${n2(50 + 760 * eo(u))}" ry="${n2(36 + 520 * eo(u))}" fill="none" stroke="#fff" stroke-width="${n2(22 * (1 - u))}" opacity="${n2(1 - u)}"/>`; }).join("");
  // inside the spout: a round opening, bright sky beyond (k = its size)
  const spout = (t, k) => `<rect width="1920" height="1080" fill="#14532D"/><g transform="translate(960 540) scale(${n2(k)})">${[[900, "#1F7A40"], [640, "#2F9A57"], [430, "#43BF6C"]].map(([r, c]) => `<circle r="${r}" fill="${c}"/>`).join("")}<circle r="250" fill="#DDF4FF"/><circle r="250" fill="url(#wSky)"/><ellipse cx="60" cy="40" rx="130" ry="30" fill="#fff" opacity=".8"/><circle r="250" fill="none" stroke="#14532D" stroke-width="26"/><path d="M-560 -420 Q-400 -520 -200 -560" stroke="#fff" stroke-width="30" stroke-linecap="round" fill="none" opacity=".25"/></g>`;
  // through the glass: the two front seats, large and sharp, their woven cloth, dry
  const seat = (x) => `<rect x="${x - 130}" y="130" width="260" height="170" rx="60" fill="url(#wWeave)" stroke="#51477A" stroke-width="10"/><path d="M${x - 220} 340 Q${x - 250} 900 ${x - 190} 1100 H${x + 190} Q${x + 250} 900 ${x + 220} 340 Q${x} 290 ${x - 220} 340z" fill="url(#wWeave)" stroke="#51477A" stroke-width="10"/><path d="M${x - 150} 420 Q${x - 170} 800 ${x - 140} 1000" stroke="#A69BD0" stroke-width="10" fill="none" opacity=".6"/>`;
  const inside = (t) => `<rect width="1920" height="1080" fill="#3B3560"/><rect width="1920" height="200" fill="#514A7C"/><g transform="scale(2.2) translate(-524 -295)" opacity="1"></g>${seat(520)}${seat(1400)}<circle cx="520" cy="900" r="210" fill="none" stroke="#2B2147" stroke-width="44"/><path d="M0 980 Q960 900 1920 980 V1080 H0z" fill="#2B2147"/>
    <rect width="1920" height="1080" fill="#DDF4FF" opacity=".16"/><path d="M200 120 L80 700 M330 100 L270 380" stroke="#fff" stroke-width="40" stroke-linecap="round" opacity=".4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${n2(120 + hash(i, 3) * 1680)}" cy="${n2(80 + hash(i, 5) * 900 + 14 * Math.sin(t + i))}" r="${n2(14 + hash(i, 7) * 22)}" fill="#BDEBFF" opacity=".55" stroke="#fff" stroke-width="4"/>`).join("")}`;
  const slope = (d) => { let s = `<rect width="1920" height="1080" fill="url(#wCar)"/><path d="M0 0 H1920 V260 Q960 420 0 260z" fill="#BFE6FF" opacity=".5"/><ellipse cx="1300" cy="200" rx="300" ry="50" fill="#fff" opacity=".5"/>`; for (let i = 0; i < 9; i++) { const v = ((i / 9 + d) % 1); s += `<path d="M${n2(200 + hash(i, 4) * 1500)} ${n2(-200 + 1500 * v)} v${n2(-160 - 200 * v)}" stroke="#fff" stroke-width="${n2(8 + 14 * v)}" stroke-linecap="round" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; } return s; };
  const tyreWall = (d) => { let s = `<rect width="1920" height="1080" fill="#2A2A36"/>`; for (let i = 0; i < 8; i++) { const y = ((i / 8 + d) % 1) * 1400 - 160; s += `<path d="M0 ${n2(y + 120)} L640 ${n2(y)} L1280 ${n2(y + 120)} L1920 ${n2(y)}" stroke="#15151E" stroke-width="54" fill="none" stroke-linejoin="round"/><path d="M0 ${n2(y + 150)} L640 ${n2(y + 30)} L1280 ${n2(y + 150)} L1920 ${n2(y + 30)}" stroke="#4A4A5A" stroke-width="8" fill="none" stroke-linejoin="round"/>`; } return s; };
  const ground = (t, t0) => `<rect width="1920" height="1080" fill="url(#wSky)"/><rect y="380" width="1920" height="700" fill="url(#wRoad)"/><path d="M0 380 H1920" stroke="#D9D5E6" stroke-width="10"/><path d="M1500 380 L2300 1080" stroke="#fff" stroke-width="26" opacity=".85"/><path d="M-300 300 Q200 60 420 380 Q200 400 -300 380z" fill="#2A2A36"/>
    <g transform="translate(1250 520)"><ellipse rx="230" ry="62" fill="#4A4A5A" stroke="#2A2A36" stroke-width="10"/>${[-150, -90, -30, 30, 90, 150].map((x) => `<path d="M${x} -${n2(Math.sqrt(1 - (x / 230) ** 2) * 50)} V${n2(Math.sqrt(1 - (x / 230) ** 2) * 50)}" stroke="#15151E" stroke-width="16" stroke-linecap="round"/>`).join("")}</g>
    <ellipse cx="960" cy="800" rx="${n2(140 + 200 * eo((t - t0) / 1.2))}" ry="${n2(30 + 44 * eo((t - t0) / 1.2))}" fill="#7FD0F5" opacity=".7"/>${rings(t, t0, 960, 800)}`;
  SC.shrink = (t, s) => { const tSp = MK("jspout"), tG = MK("jglass"), tPl = MK("jsplash"), tSe = MK("jseats"), tSl = MK("jslope"), tTy = MK("jtyre"), tGr = MK("jground"), tOut = tG - 1.5, tNo = W("j903", "cannot") - .2;
    let v;
    if (t < tOut + .5) { const u = clamp((t - tOut) / .5); v = spout(t, 1 + .04 * Math.sin(t * 1.4) + .12 * eio((t - s.t0) / 5) + 6 * ei(u)); }
    else if (t < tPl) { const u = clamp((t - (tOut + .5)) / (tPl - tOut - .5)), y = lerp(1250, 160, u * u);   // falling: the windscreen comes up from below like a huge clear wall, tilted
      v = SKY + `<g transform="translate(0 ${n2(y)})"><path d="M-200 0 L260 -200 H1660 L2120 0 V1400 H-200z" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="14"/><path d="M60 60 L340 -110 H1580 L1860 60 V1300 H60z" fill="#CFEFFF" stroke="#7FB6D6" stroke-width="16"/><path d="M300 80 L420 -40 M420 120 L500 30" stroke="#fff" stroke-width="40" stroke-linecap="round" opacity=".7"/></g>` + [0, 1, 2, 3, 4].map((i) => `<path d="M${200 + i * 380} ${n2(((t * 900 + i * 300) % 1300) - 200)} v-140" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".5"/>`).join(""); }
    else if (t < tSl) { const k = ramp(t, tSe - .5, .8); v = inside(t) + OP(1 - .55 * k, `<rect width="1920" height="1080" fill="#CFEFFF" opacity=".75"/>`) + rings(t, tPl) + (t < tPl + .5 ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.7 * pulse(t, tPl + .01, .01, .4))}"/>` : ""); }
    else if (t < tTy) v = slope((t - tSl) * 1.3);
    else if (t < tGr) v = tyreWall((t - tTy) * 1.2);
    else v = ground(t, tGr);
    // v3: YOU are the drop (its clear front edge under you, a YOU tag), the three buddies ride along inside it at the edges, reacting at each
    // stop: the SPLASH jolts and bursts; they peer at the dry seats, whoosh down the slope, gasp at the tyre, cheer on the ground
    v = JOLT(t, [tPl], v, 30) + OP(ramp(t, tSp, .4), `<path d="M560 1100 Q600 930 960 900 Q1320 930 1360 1100z" fill="#BDEBFF" opacity=".55" stroke="#fff" stroke-width="10"/><path d="M700 1000 Q780 950 880 940" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/>` + TF(960, 1000, 1, youPill(0, 0, 1.15)));
    const rp = { pip: [[tG - .4, "surprised"], [tPl + .05, "oops"], [tSe + .3, "pointing"], [tSl + .1, "cheer"], [tTy, "surprised"], [tGr + .2, "cheer"]],
      basil: [[tG - .3, "surprised"], [tPl + .05, "surprised"], [tSe + .5, "arms_crossed"], [tSl + .15, "cheer"], [tTy + .1, "surprised"], [tGr + .3, "cheer"]],
      momo: [[s.t0 + .8, "back"], [tPl + .05, "surprised"], [tSe + .2, "back"], [tSl + .2, "cheer"], [tTy + .1, "back"], [tGr + .4, "cheer"]] };
    v += riders(t, s, { tin: tSp + .3, poses: rp, jolts: [tPl], noreact: true, at: { pip: [230, 1040], momo: [400, 1046], basil: [1690, 1048] } }) + impactFX(t, tPl, 960, 560, "SPLASH!", { s: .9, col: "#7FD0F5" })
      + faceCam("pip", t, tPl + .1, tPl + 1.6, 1560, 500, 160, [[tPl + .1, "surprised"], [tPl + .9, "cheer"]], { rot: -5, noreact: true });
    return v + wob2(t) + dip(t, tSl, "#BDEBFF", .22) + dip(t, tTy, "#8ED3F2", .18) + dip(t, tGr, "#BDEBFF", .18) + wipe(t, s.t0, JC12)
      + TF(0, 62, 1, youTag(t, tSp, "You: a drop of water")) + feelTag(t, tSp + .6, tOut, "in the watering can") + ""
      + feelTag(t, tPl + 1.0, tSe - .4, t < tNo ? "glass" : "glass · you cannot pass through") + feelTag(t, tSe + .1, tSl - .25, "fabric seats · dry inside") + feelTag(t, tSl + .05, tTy - .2, "metal body") + feelTag(t, tTy + .05, tGr - .2, "rubber tyre") + feelTag(t, tGr + .1, s.t1 + 1, "the ground") + logo(t); };
})(); }
