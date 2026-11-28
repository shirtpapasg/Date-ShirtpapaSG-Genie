// shrink.js: the first-person journeys (the series' signature). The camera IS the thing.
// EP13: Part 1 = BE A BOOK (inside the school bag: the other books like walls; the metal zip closes overhead like a bright track; the
//      fabric straps pull tight and you go up; a bump on a wet floor: the plastic base keeps the water out, you stay dry). Part 2 = BE THE NEW
//      STRAP (hanging from EP9's stand: your own woven length like a long orange road down to the hanger; a weight, then another, pulled
//      tight; six, seven, eight, nine; you do not tear: STRONG).
// Stage 1: both are phScene placeholders in p1.js / p2.js (SC.shrink). EP12's metal and drop-of-water journeys (ep12/shrink.js) and EP11's
// (ep11/shrink.js) are the models. STAGE 2 (Fable) draws SC.shrink for each part here; the timeline marks are listed in SCENES_TODO.md.
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

/* ====================================================================================================================================
   STAGE 2 (drawn, 2026-11-22). Part 1: BE A BOOK. Part 2: BE THE NEW STRAP. Calm, first person, present tense; no buddies, no score.
   ==================================================================================================================================== */
if (PART === 1) SC.shrink = (t, s) => { const tin = MK("jin"), tz = MK("jzipclose"), tst = MK("jstraps"), tt = MK("jtight"), tu = MK("jup"), tb = MK("jbump"), tw_ = MK("jwater"), tg = MK("wpglow"), CUT = tb + 1.5;
  let out = "";
  if (t < CUT + .4) {   // looking UP from inside the bag: the other books like tall walls, the open top bright above, the ceiling fan far away
    const zc = clamp((t - tz) / 1.8), dark = eio(zc), settle = eio((t - s.t0) / 2.0), sway = (t >= tst ? 14 * Math.sin((t - tst) * 3.2) * (t < tb ? 1 : Math.exp(-(t - tb) * 2)) : 0), rise = t >= tu && t < tb ? (t - tu) : 0, bump = t >= tb ? 34 * wob(t, tb, .6) : 0;
    const drop = t >= tb - .25 && t < tb ? -40 * (t - (tb - .25)) / .25 : 0, oy = 250 + bump + drop, orx = lerp(1000, 520, settle), ory = lerp(520, 190, settle);
    const wall = (sd, i, col) => { const x0 = 960 + sd * (330 + i * 190) + sway * (1 + i * .3), x1 = 960 + sd * (620 + i * 330) + sway * .3; return `<path d="M${n2(x0)} ${oy - 20} L${n2(x0 + sd * 150)} ${oy - 60} L${n2(x1 + sd * 420)} 1180 L${n2(x1)} 1180z" fill="${col}" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/><path d="M${n2(x0 + sd * 30)} ${oy + 40} L${n2(x1 + sd * 90)} 1180" stroke="#fff" stroke-width="10" opacity=".25"/>`; };
    const fabric = hexL("#B4500A", "#E8731A", dark * .6);
    let teeth = ""; const zx = lerp(960 - orx, 960 + orx, eio(zc)); for (let i = 0; i < 26; i++) { const x = 960 - orx + (i + .5) * (2 * orx / 26); if (x > zx) continue; teeth += `<rect x="${n2(x - 13)}" y="${n2(oy - 22)}" width="26" height="20" rx="5" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="3"/><rect x="${n2(x + 4)}" y="${n2(oy + 2)}" width="26" height="20" rx="5" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="3"/>`; }
    const fan = `<g transform="translate(960 ${n2(oy - 20)}) scale(.5)">${ceilingFan(0, 0, t * 150)}</g>`;
    const taut = ss(tt - .5, tt, t), strapsUp = t >= tst - .3 ? OP(ramp(t, tst - .3, .5), [-1, 1].map((sd) => { const x = 960 + sd * 420 + sway * .5; return `<path d="M${n2(x)} ${oy - 30} Q${n2(x + sd * 90 * (1 - taut))} ${n2(oy - 160)} ${n2(x + sd * 30)} -40" fill="none" stroke="#7A3606" stroke-width="70" opacity=".55" stroke-linecap="round"/>`; }).join("")) : "";
    let specks = ""; if (rise > 0) for (let i = 0; i < 16; i++) { const v = ((rise * 1.5 + hash(i, 3)) % 1), x = 200 + hash(i, 7) * 1520; specks += `<path d="M${n2(x)} ${n2(v * 1000)} v${n2(60 + 80 * hash(i, 5))}" stroke="#FFE3BF" stroke-width="6" stroke-linecap="round" opacity="${n2(.5 * Math.sin(Math.PI * v))}"/>`; }
    out += `<rect width="1920" height="1080" fill="${fabric}"/><rect width="1920" height="1080" fill="url(#sWv)" opacity=".5"/>`
      + `<clipPath id="jo"><ellipse cx="960" cy="${n2(oy)}" rx="${n2(orx)}" ry="${n2(ory * (1 - .97 * eio(zc)))}"/></clipPath>` + (zc < 1 ? `<g clip-path="url(#jo)"><rect width="1920" height="1080" fill="#FFF6E0"/><rect y="${n2(oy - 40)}" width="1920" height="12" fill="#D9C8A4"/>${fan}</g><ellipse cx="960" cy="${n2(oy)}" rx="${n2(orx)}" ry="${n2(ory * (1 - .97 * eio(zc)))}" fill="none" stroke="#7A3606" stroke-width="16"/>` : "")
      + (t >= tz - .1 ? `<path d="M${n2(960 - orx)} ${n2(oy)} H${n2(zx)}" stroke="#5E6B7C" stroke-width="10"/>` + teeth + (zc < 1 ? `<g transform="translate(${n2(zx)} ${n2(oy)})"><rect x="-26" y="-34" width="52" height="68" rx="14" fill="url(#sSteel)" stroke="#5E6B7C" stroke-width="6"/></g>` : "") : "")
      + strapsUp + wall(-1, 1, BOOKC[1]) + wall(1, 1, BOOKC[3]) + wall(-1, 0, BOOKC[2]) + wall(1, 0, BOOKC[4]) + specks
      + `<path d="M-40 1090 L260 ${n2(900 + bump * .4)} H1660 L1960 1090z" fill="${BOOKC[0]}" stroke="${P.ink}" stroke-width="8" stroke-linejoin="round"/><rect x="760" y="${n2(940 + bump * .4)}" width="400" height="110" rx="14" fill="#fff" opacity=".9"/><path d="M800 ${n2(980 + bump * .4)} H1120 M800 ${n2(1016 + bump * .4)} H1010" stroke="${P.ink}" stroke-width="8" opacity=".4" stroke-linecap="round"/>`
      + `<rect width="1920" height="1080" fill="#3A1A00" opacity="${n2(.3 * dark)}"/>`
      // EP13 v2 (teacher, 22 Nov: "Can we bring the 3 pet buddies along? Or even include the audience"): the three buddies, shrunk, ride along on
      // the top edge of YOUR book (Momo from behind, looking up with you); they hold on as the zip closes, wobble as the bag lifts, cheer when the
      // straps hold; your own bookmark ribbon hangs from your cover. Small and low, so the view still reads.
      + (() => { const wob_ = (t >= tst ? 6 * Math.sin((t - tst) * 3.2) * (t < tb ? 1 : Math.exp(-(t - tb) * 2)) : 0), by = 905 + bump * .4, kin = (d) => s.t0 + 1.2 + d;
        const rib = `<path d="M1500 ${n2(by - 4)} Q${n2(1520 + 14 * Math.sin(t * 2.2))} ${n2(by + 70)} ${n2(1505 + 10 * Math.sin(t * 2.2 + 1))} 1090" fill="none" stroke="#E11D48" stroke-width="30" stroke-linecap="butt"/><path d="M1490 1060 L1505 1090 L1520 1060" fill="#E11D48"/>`;
        const ride = (who, x, h, ps, fl, jmp) => buddy(who, x, by + 6, h, t, { aura: true, auraO: .55, flip: fl, in: kin(x / 2000), poses: ps, look: wob_ * (fl ? -1 : 1), jump: jmp, tag: false });
        return rib + ride("pip", 470, 220, [[s.t0, "sit"], [tz - .2, "surprised"], [tz + 1.6, "thinking"], [tst + .2, "arms_crossed"], [tt + .1, "cheer"], [tb, "oops"], [tb + .7, "sit"]], false, [[tt + .15, 26]])
          + ride("momo", 960, 210, [[s.t0, "back"], [tt + .05, "cheer"], [tb, "surprised"], [tb + .8, "back"]], false, [[tt + .2, 30]])
          + ride("basil", 1440, 210, [[s.t0, "sit"], [tz - .1, "arms_crossed"], [tu, "surprised"], [tt + .15, "cheer"], [tb, "surprised"]], true, [[tt + .25, 26]]); })()
      + feelTag(t, tz + .5, tst - .3, "metal zip · closes", 640) + feelTag(t, tt + .2, tb - .2, "fabric straps · no tear", 640);
  }
  if (t >= CUT - .4) {   // a cut-away at the bottom of the bag: you and the other books on the dry floor; outside, a thin shining line of water against the plastic base
    const WX = 1300, FYy = 800, sh = t < CUT + 1 ? 8 * wob(t, CUT, .5) : 0; let v = `<rect width="1920" height="1080" fill="#E8731A"/><rect width="1920" height="1080" fill="url(#sWv)" opacity=".45"/><rect x="${WX + 70}" width="560" height="1080" fill="#EAF3F8"/><rect x="${WX + 70}" y="${FYy + 80}" width="560" height="300" fill="#C9D6DC"/>`
      + `<g transform="translate(${WX + 430} ${FYy + 80})"><path d="M-70 0 L-12 -240 H12 L70 0z" fill="#FFD60A" stroke="#C98200" stroke-width="7" stroke-linejoin="round"/>${T(0, -70, "WET", 34, P.ink)}${T(0, -34, "FLOOR", 28, P.ink)}</g>`;
    [[230, BOOKC[1], 560], [470, BOOKC[0], 620], [760, BOOKC[2], 540], [1010, BOOKC[3], 590]].forEach(([x, c, h], i) => { v += `<rect x="${x}" y="${FYy - h + sh}" width="${i === 1 ? 250 : 200}" height="${h}" rx="10" fill="${c}" stroke="${P.ink}" stroke-width="7"/><rect x="${x + 40}" y="${FYy - h + 60 + sh}" width="110" height="70" rx="10" fill="#fff" opacity=".85"/>`; });
    v += `<path d="M-40 ${FYy} H${WX} V${FYy - 210} Q${WX} ${FYy - 250} ${WX + 40} ${FYy - 250} H${WX + 70} V${FYy + 80} H-40z" fill="url(#sBase)" stroke="#2B2147" stroke-width="8" stroke-linejoin="round"/><path d="M0 ${FYy + 22} H${WX - 30}" stroke="#fff" stroke-width="8" opacity=".3" stroke-linecap="round"/><rect x="-40" y="${FYy + 80}" width="2000" height="300" fill="#C9D6DC"/><path d="M-40 ${FYy + 80} H1960" stroke="#A9B8C0" stroke-width="5"/>`;
    const wk = ramp(t, tw_ - .6, .8); v += OP(wk, `<path d="M${WX + 70} ${FYy + 50} Q${WX + 200} ${n2(FYy + 44 + 4 * Math.sin(t * 3))} ${WX + 330} ${FYy + 52} T${WX + 640} ${FYy + 50} V${FYy + 80} H${WX + 70}z" fill="#9BD8FF" opacity=".9"/><path d="M${WX + 74} ${FYy + 50} Q${WX + 200} ${n2(FYy + 44 + 4 * Math.sin(t * 3))} ${WX + 330} ${FYy + 52} T${WX + 640} ${FYy + 50}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>` + lcGlint(WX + 180, FYy + 44, 18, t) + lcGlint(WX + 400, FYy + 48, 14, t, 2));
    v += t >= tw_ ? ltag(t, tw_ + .1, WX + 330, FYy - 330, "water", WX + 300, FYy + 44, { size: 44 }) + ltag(t, tw_ + .9, 620, FYy + 190, "dry", 700, FYy + 30, { size: 44, fill: GOODC, ink: "#fff" }) + [0, 1, 2].map((i) => lcGlint(300 + i * 330, FYy + 36, 14, t, i * 1.7)).join("") : "";
    // EP13 v2: the buddies peek over the tops of the books beside you; YOUR book is named; they gasp at the water, cheer when you stay dry
    v += TF(595, FYy - 650 + sh, spring(t, CUT + .2, .4), tpill(0, 0, "you", 40, P.sun, P.ink, { w: 700 }))
      + buddy("pip", 330, FYy - 560 + sh + 8, 170, t, { aura: true, auraO: .6, in: CUT + .3, poses: [[CUT, "sit"], [tw_ - .1, "surprised"], [tg, "cheer"]], tag: false, jump: [[tg + .05, 30]] })
      + buddy("momo", 860, FYy - 540 + sh + 8, 160, t, { aura: true, auraO: .6, in: CUT + .45, poses: [[CUT, "back"], [tw_ + .4, "surprised"], [tg, "cheer"]], tag: false, jump: [[tg + .12, 30]] })
      + buddy("basil", 1110, FYy - 590 + sh + 8, 170, t, { aura: true, auraO: .6, flip: true, in: CUT + .6, poses: [[CUT, "sit"], [tw_, "arms_crossed"], [tg, "cheer"]], tag: false, jump: [[tg + .2, 30]] });
    v += feelTag(t, tw_ - .8, s.t1 - .5, "plastic base · water stays out", 540) + (t >= tg ? TF(960, 520, spring(t, tg, .5) * (1 + .05 * Math.sin(t * 5)), `<g filter="url(#glowS)">${propChip("WATERPROOF", 80)}</g>`) : "");
    out = t < CUT ? out : v; }
  return out + dip(t, CUT, "#FFF6D8", .4) + youTag(t, tin, "You: a book") + OP(ramp(t, tin + .6, .4) * (1 - ramp(t, tz, .3)), tpill(960, 76, "inside the bag", 36, P.ink, P.sun, { w: 700 })) + wipe(t, s.t0, "#FFF6D8") + logo(t); };

if (PART === 2) SC.shrink = (t, s) => { const th = MK("jhang"), w1 = MK("jw1"), w2 = MK("jw2"), tt = MK("jtight"), tws = [MK("jw6"), MK("jw7"), MK("jw8"), MK("jw9")], tS = W("j604", "strong"), all = [w1, w2, ...tws];
  const VX = 960, VY = 330, taut = Math.min(1, .25 * ramp(t, w1, .3) + .35 * ramp(t, w2, .3) + .4 * ss(tt - .6, tt, t)), nw = all.filter((x) => t >= x).length, last = nw ? all[nw - 1] : -9, dipk = nw ? pulse(t, last, .02, .5) : 0, z = 1 + .035 * dipk;
  // the far end: the table, the padded tray, the hanger and its weights seen from above; the garden small and far; the pond glints
  const far = `<rect width="1920" height="1080" fill="#8FCF74"/><ellipse cx="1560" cy="250" rx="230" ry="90" fill="#6FBFE6" stroke="#8C8272" stroke-width="8"/>${lcGlint(1500, 230, 20, t)}${lcGlint(1620, 270, 14, t, 2)}<ellipse cx="1500" cy="280" rx="44" ry="18" fill="#3FAE56"/><ellipse cx="1640" cy="220" rx="34" ry="14" fill="#3FAE56"/>
    <rect x="-100" y="620" width="900" height="600" fill="#E9DDC4" transform="rotate(-8 400 800)"/><rect x="560" y="120" width="800" height="430" rx="24" fill="url(#sWood)" stroke="#7A4C26" stroke-width="8"/>${wgrain(590, 1330, 200, 6, 3)}${wgrain(590, 1330, 460, 6, 7)}<rect x="760" y="230" width="400" height="200" rx="30" fill="#FF9E8A" stroke="#C8604E" stroke-width="6"/>`;
  let wts = ""; for (let i = 0; i < nw; i++) wts += `<circle cx="${VX + (i % 2 ? 3 : -3)}" cy="${VY + 6 - i * 5}" r="${96 + i * 1.5}" fill="url(#vdBrass)" stroke="#8E6416" stroke-width="5"/>`;
  const sl = all.find((x) => t >= x - .5 && t < x); if (sl !== undefined) { const u = eio((t - (sl - .5)) / .5); wts += `<circle cx="${n2(lerp(1700, VX, u))}" cy="${VY + 6 - nw * 5}" r="${96 + nw * 1.5}" fill="url(#vdBrass)" stroke="#8E6416" stroke-width="5"/>`; }
  wts += `<circle cx="${VX}" cy="${VY + 6 - nw * 5}" r="16" fill="#7C8898" stroke="#4A5564" stroke-width="5"/>` + (nw ? `<path d="M${VX - 60} ${VY - 30 - nw * 5} q30 -30 70 -24" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".6"/>` : "");
  // you: your own woven length, like a long orange road going straight down to the hanger
  const wv = (1 - taut) * 26, eL = (u) => lerp(VX - 60, 260, u * u) + wv * Math.sin(u * 9 + t * 1.5) * u, eR = (u) => lerp(VX + 60, 1660, u * u) - wv * Math.sin(u * 8 + 1 + t * 1.5) * u, yy = (u) => lerp(VY + 30, 1100, u);
  let L = "", R = "", rows = ""; for (let i = 0; i <= 20; i++) { const u = i / 20; L += (i ? "L" : "M") + n2(eL(u)) + " " + n2(yy(u)) + " "; R = "L" + n2(eR(u)) + " " + n2(yy(u)) + " " + R; }
  for (let i = 1; i < 26; i++) { const u = Math.pow(i / 26, 1.6); rows += `<path d="M${n2(eL(u))} ${n2(yy(u))} L${n2(eR(u))} ${n2(yy(u))}" stroke="#A84808" stroke-width="${n2(2 + 9 * u)}" opacity=".45"/>`; }
  for (let j = 1; j < 8; j++) { let p = ""; for (let i = 0; i <= 20; i++) { const u = i / 20; p += (i ? "L" : "M") + n2(lerp(eL(u), eR(u), j / 8)) + " " + n2(yy(u)) + " "; } rows += `<path d="${p}" fill="none" stroke="#FFD9A8" stroke-width="5" opacity=".5"/>`; }
  const road = `<path d="${L}${R}z" fill="#F47A14" stroke="#8A3A06" stroke-width="12" stroke-linejoin="round"/>` + rows;
  // the numbers rising past you
  let nums = ""; tws.forEach((x, i) => { const u = (t - x) / 1.3; if (u <= 0 || u >= 1) return; nums += TF(VX + (i % 2 ? 150 : -150) * (1 + 2 * u), lerp(VY + 60, 1000, u * u), .5 + 2.6 * u, `<text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="120" text-anchor="middle" fill="#fff" stroke="${P.ink}" stroke-width="16" stroke-linejoin="round" paint-order="stroke" opacity="${n2(Math.sin(Math.PI * Math.min(1, u * 1.15)))}">${6 + i}</text>`); });
  return `<g transform="translate(960 ${n2(540 + 10 * dipk)}) scale(${n2(z)}) translate(-960 -540)">${far}${wts}${road}</g>` + nums
    // EP13 v2: the three buddies ride along on YOUR woven length (Momo from behind, looking down the road with you); they wobble as each weight
    // pulls, hold on as you go tight, cheer at six to nine and at "strong"
    + (() => { const wb = dipk * 8, ride = (who, x, h, ps, fl, jm) => buddy(who, x, 1062 + 6 * dipk, h, t, { aura: true, auraO: .55, flip: fl, in: th + .6 + x / 4000, poses: ps, look: (fl ? -1 : 1) * wb, jump: jm, tag: false });
      return ride("pip", 560, 220, [[s.t0, "sit"], [w1 - .05, "surprised"], [tt, "arms_crossed"], [tws[0], "cheer"]], false, tws.map((x) => [x + .05, 22]))
        + ride("momo", 960, 210, [[s.t0, "back"], [tS - .2, "cheer"]], false, [[tS, 30]])
        + ride("basil", 1370, 220, [[s.t0, "sit"], [w2 - .05, "surprised"], [tt, "arms_crossed"], [tws[1], "cheer"]], true, tws.map((x) => [x + .1, 22])); })()
    + feelTag(t, tt, tws[0] - .3, "pulled tight", 640) + feelTag(t, tws[3] + .5, s.t1 - .4, "9 weights · you do not tear", 640) + (t >= tS ? TF(960, 520, spring(t, tS, .5) * (1 + .05 * Math.sin(t * 5)), `<g filter="url(#glowS)">${propChip("STRONG", 90)}</g>`) : "")
    + youTag(t, th, "You: the new strap") + OP(ramp(t, th + .6, .4) * (1 - ramp(t, w1 - .3, .3)), tpill(960, 76, "hanging from the stand", 36, P.ink, P.sun, { w: 700 })) + wipe(t, s.t0, "#FFF6D8") + logo(t); };
