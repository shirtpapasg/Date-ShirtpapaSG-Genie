// lc00.js: EP0's look-closer pictures, the journey "Be an idea", and the small pictures (ring pictures, answer cards, "Last time", the fun
// facts, the dare cards, Pip's steps poster). Every art(t) for lookCloser() is centred on (0, 0) inside +-830 x +-395.

/* ================================================================ Part 1 · [LOOK CLOSER] read it or make it? (lcmaps) ================================================================ */
// LEFT, "read it": TheOneApp's Magnets poster big; Pip's eye-line (a dotted trail and a soft eye dot) sliding along its branches, again and
// again, with a counter read ×2, ×3 ...; the poster stays as it is (nothing new is written). RIGHT, "make it": Basil's sheet becomes a map
// stroke by stroke; his pencil stops (a magnifier circle on the paused tip: he stops and thinks), then he writes his own branches, each word
// glowing gold for a moment (his own words). Times from a501h / a502h / a503m.
const LCM = () => { const tR = MK("slide") - .6, tM = MK("bmake"), tS = MK("stops"), tC = MK("chooses");
  const at = { c: tM + .1, b0: tC, "b0.0": tC + .6, "b0.1": tC + 1.2, b1: tC + 1.9, "b1.0": tC + 2.5, "b1.1": tC + 3.1 }; return { tR, tM, tS, tC, at }; };
function lcMapsArt(t) { const { tR, tS, tC, at } = LCM(); let s = "";
  // the two halves
  s += `<rect x="-830" y="-395" width="830" height="790" fill="#EEEAF6"/><rect x="0" y="-395" width="830" height="790" fill="#FFF6E2"/><path d="M0 -395 V395" stroke="${P.ink}" stroke-width="5" opacity=".3"/>`;
  s += TF(-415, -340, 1, tpill(0, 0, "read it", 44, "#8E82B8", "#fff", { w: 700 })) + TF(415, -340, 1, tpill(0, 0, "make it", 44, "#E0A33A", "#fff", { w: 700 }));
  // LEFT: the poster (the app's own picture), Pip's eyes sliding along its branches
  const PW = 720, PH = PW * APP.posterP.h / APP.posterP.w, px = -415 - PW / 2, py = -40 - PH / 2;
  s += `<g filter="url(#drop)"><rect x="${n2(px - 8)}" y="${n2(py - 8)}" width="${PW + 16}" height="${n2(PH + 16)}" rx="10" fill="#fff"/></g>` + appImg("posterP", px, py, PW, PH);
  if (t >= tR) { const per = 2.4, u = ((t - tR) % per) / per, n = Math.floor((t - tR) / per) + 1, row = [[.12, .38], [.38, .38], [.64, .38], [.2, .7], [.6, .7]], k = Math.min(4, Math.floor(u * 5)), f = u * 5 - k, a = row[k], b = row[Math.min(4, k + 1)];
    const ex = px + lerp(a[0], b[0], f) * PW + 60, ey = py + lerp(a[1], b[1], f) * PH; let trail = "";
    for (let j = 1; j < 9; j++) { const uu = u - j * .018; if (uu < 0) break; const kk = Math.min(4, Math.floor(uu * 5)), ff = uu * 5 - kk, aa = row[kk], bb = row[Math.min(4, kk + 1)]; trail += `<circle cx="${n2(px + lerp(aa[0], bb[0], ff) * PW + 60)}" cy="${n2(py + lerp(aa[1], bb[1], ff) * PH)}" r="${9 - j}" fill="#8E82B8" opacity="${n2(.7 - j * .07)}"/>`; }
    s += trail + `<g transform="translate(${n2(ex)} ${n2(ey)})"><ellipse rx="34" ry="20" fill="#fff" stroke="#6E5FA8" stroke-width="5"/><circle r="10" fill="#3A2E52"/><circle cx="-3" cy="-4" r="3" fill="#fff"/></g>`
      + TF(-230, 300, 1 + .12 * pulse(t, tR + (n - 1) * per, .03, .3), tpill(0, 0, `read ×${n}`, 40, "#fff", "#6E5FA8", { w: 700 })) + lcLab(t, tR + .4, -230, 222, "the words stay the same", -230, 150, { size: 30 }); }
  // RIGHT: Basil's sheet becomes a map
  s += TF(415, 10, 1, sheet00(780, 640, { lines: false }));
  const pk = ["b0", "b0.0", "b0.1", "b1", "b1.0", "b1.1"], cur = pk.filter((k) => t >= at[k]).pop(), glow = {}; pk.forEach((k) => { glow[k] = at[k]; });
  // where the pencil is: the newest word being written; between tS and tC it waits, paused, above the first branch's place
  const P0 = [330, -40], pen = t < at.c ? P0 : t < tC ? [430 + 6 * Math.sin(t * 1.5), -110] : (() => { const i = pk.indexOf(cur); const pos = [[530, -80], [640, -190], [640, -10], [550, 140], [680, 60], [680, 230]][i]; return [pos[0] - 180 + 40 * clamp((t - at[cur]) / .45), pos[1] + 20]; })();
  s += TF(250, 20, .86, handMap(t, MAPB.slice(0, 2), { at, glow, size: 40, R: 260 }));
  s += TF(pen[0], pen[1], 1, pencil00(t >= tS && t < tC ? 0 : 6 * Math.sin(t * 14)));
  if (t >= tS && t < tC + .4) { const k = spring(t, tS, .4) * (1 - ss(tC, tC + .4, t)); s += OP(Math.min(1, k), `<circle cx="${pen[0]}" cy="${pen[1]}" r="${n2(70 * k)}" fill="#fff" opacity=".25" stroke="${P.sun}" stroke-width="8"/>` + pline(pen[0] + 60, pen[1] - 60, 560, -270, 1) + TF(560, -270, k, tpill(0, 0, "he stops and thinks", 34, P.sun, P.ink, { w: 700 }))); }
  if (t >= tC) s += lcLab(t, tC + .2, 470, 300, "his own words", 470, 120, { size: 32, fill: "#FFD75A" });
  return s; }

/* ================================================================ Part 1 · [LOOK CLOSER] the memory test (lcmem) ================================================================ */
// two small whiteboards, Pip's (left) and Basil's (right), each six lines written from memory as Heart speaks; Pip's "needle" is written,
// then fades out COMPLETELY (tag gone); the cloth lifts (lift): the six cards come back beside the lists and the three worked-out words glow
// gold on both; the answer cards (1, 2, 3) along the bottom: card 2 ticked at ansglow
const MEMW = { pip: ["repel", "South", "iron", "pull", "needle", ""], basil: ["repel", "South", "iron", "pull", "wood", ""] };
function lcMemArt(t) { const t0 = MK("pipl") - .2, tN = MK("needle"), tL = MK("lift"), tA = MK("ansglow"); let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#F3F6FA"/>`;
  [["pip", -525], ["basil", 525]].forEach(([who, x]) => { const tw0 = who === "pip" ? t0 + .3 : MK("basl") + .1;
    s += `<g transform="translate(${x} -20)"><rect x="-285" y="-300" width="570" height="560" rx="18" fill="#9AA4AE"/><rect x="-267" y="-282" width="534" height="524" rx="10" fill="#FFFFFF"/>`
      + T(0, -238, who === "pip" ? "Pip remembers" : "Basil remembers", 40, P[who], { w: 700 });
    MEMW[who].forEach((w, i) => { const tw1 = tw0 + i * .35, y = -170 + i * 72, gold = i < 3, g = gold && t >= tL ? pulse(t, tL + .4, .05, 1.6) : 0;
      let a = w ? ramp(t, tw1, .3) : 0; if (who === "pip" && w === "needle") a *= 1 - clamp((t - tN) / 1.0);   // gone: it fades out completely
      s += `<path d="M-230 ${y + 16} H230" stroke="#DCE4EC" stroke-width="3"/>` + T(-250, y + 8, (i + 1) + ".", 30, "#A0A8B2", { a: "start", w: 600 });
      if (a > .005) s += OP(a, (g > .03 ? `<rect x="-140" y="${y - 40}" width="280" height="60" rx="20" fill="#FFD75A" opacity="${n2(.8 * g)}"/>` : "") + `<text x="0" y="${y + 8}" font-family="Caveat, Fredoka" font-weight="700" font-size="54" text-anchor="middle" fill="${gold ? "#B9741A" : "#5A6470"}">${w}</text>`);
      if (who === "pip" && w === "needle" && t >= tN) s += lcLab(t, tN + .2, 200, y - 10, "gone", 60, y - 10, { size: 32, fill: "#FF9A8F" }); });
    if (t >= tL) s += OP(ramp(t, tL + .6, .3), `<path d="M120 -205 Q150 -205 150 -175 V-85 Q150 -60 172 -60 Q150 -60 150 -35 V20 Q150 50 120 50" stroke="#E0A33A" stroke-width="6" fill="none" transform="translate(-10 0)"/>` + TF(186, -60, spring(t, tL + .6, .4), tpill(0, 0, "worked out", 24, "#FFD75A", P.ink, { w: 700 })));
    s += `</g>`; });
  // the cloth lifts: the six cards come back, small, between the boards (the worked-out ones glow)
  if (t >= tL) { const k = eio((t - tL) / .8); s += OP(k, TF(0, -170 + 40 * (1 - k), .29, puzzleCards(t, { fill: [0, 0, 0] }))); }
  // the answer: three small numbered cards along the bottom
  if (t >= tA - .3) { const k = spring(t, tA - .3, .45); ["The words I read", "The words I worked out", "Both the same"].forEach((l, i) => { s += TF(0, 40 + i * 112, .82 * k, choiceCard3(i + 1, l, "", { w: 520, h: 120, size: 34, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "m" + i })); });
    s += xChip16(t, tA + .3, 225, 40, .7) + xChip16(t, tA + .4, 225, 264, .7); }
  return s; }

/* ================================================================ Part 2 · [LOOK CLOSER] Mark my mind map, then check and fix (lccheck) ================================================================ */
// TheOneApp's own screens, frame by frame (capture.js): the map board fills the panel; the ✓ badges pop in one by one at the app's own pace
// (mk1_f*, 130 ms apart from `ticks`); the marks box with the gold row "＋ Something from the poster is missing" (mk1_done); Compare with the
// poster (poster2: Making a magnet glows, a magnifier on it); Back to my mind map (back0); the new branch typed (ed20-ed22); Mark it again
// (mk2_f*, mk2_done "Every idea is right and your map is complete. Well done!"). The panels stay still or zoom smoothly (never stepped).
function frameAt(t, t0, pre, n, step = .13) { const i = clamp(Math.floor((t - t0) / step), 0, n - 1); return pre + String(i).padStart(2, "0"); }
// show an app image fitted into (w x h) centred at (0, 0), with an optional smooth zoom towards a point (fx, fy) of the image
const fitApp = (name, w, h, z = 1, fx = .5, fy = .5) => { const A = APP[name]; if (!A) return T(0, 0, "missing " + name, 30, "#f00"); const s = Math.min(w / A.w, h / A.h), W_ = A.w * s, H_ = A.h * s;
  return `<g transform="translate(${n2(-(fx - .5) * W_ * (z - 1))} ${n2(-(fy - .5) * H_ * (z - 1))}) scale(${n2(z)})"><g filter="url(#drop)"><rect x="${n2(-W_ / 2 - 6)}" y="${n2(-H_ / 2 - 6)}" width="${n2(W_ + 12)}" height="${n2(H_ + 12)}" rx="14" fill="#fff"/></g>${appImg(name, -W_ / 2, -H_ / 2, W_, H_)}</g>`; };
// a box of the FULL screen `shot` mapped into its hi crop `hi` drawn by fitApp(hi, w, h): -> [x, y, bw, bh] in panel units
const hiBox = (shot, key, hi, w, h) => { const b = ((APP[shot] || {}).boxes || {})[key], H = APP[hi]; if (!b || !H || !H.at) return null; const s = Math.min(w / H.w, h / H.h), W_ = H.w * s, Hh = H.h * s;
  return [-W_ / 2 + (b[0] - H.at[0]) / H.at[2] * W_, -Hh / 2 + (b[1] - H.at[1]) / H.at[3] * Hh, b[2] / H.at[2] * W_, b[3] / H.at[3] * Hh]; };
const LCK = () => ({ tT: MK("ticks"), tM: MK("missing"), tC: MK("compare"), tTh: MK("thereitis"), tB: MK("backto"), tA: MK("addit"), tM2: MK("mark2") + .6 });
// a point (u, v: fractions of the picture) of fitApp(name, w, h, z, fx, fy) -> panel coordinates
const fitPt = (name, w, h, z, fx, fy, u, v) => { const A = APP[name], k = Math.min(w / A.w, h / A.h), W_ = A.w * k, H_ = A.h * k; return [z * (-W_ / 2 + u * W_) - (fx - .5) * W_ * (z - 1), z * (-H_ / 2 + v * H_) - (fy - .5) * H_ * (z - 1), k * z]; };
const MAKING = [.52, .735, .23, .1];   // "MAKING A MAGNET" on the printed poster crop (posterP), read off the picture
function lcCheckArt(t) { const { tT, tM, tC, tTh, tB, tA, tM2 } = LCK(), n1 = (APP.mk1_frames || { n: 26 }).n, n2_ = (APP.mk2_frames || { n: 30 }).n, d1 = tT + n1 * .13 + .45, d2 = tM2 + n2_ * .13 + .45;
  let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#FFF6E8"/>`, img, z = 1, f = [.5, .5];
  const W_ = 1560, H_ = 740;
  if (t < tC - .2) { img = t < tT ? "mk1_f00_hi" : t < d1 ? frameAt(t, tT, "mk1_f", n1) + "_hi" : "mk1_done_hi"; const u = eio(clamp((t - d1) / 1.2)); z = lerp(1.75, 1.1, u); f = [.5, lerp(.2, .55, u)]; }
  else if (t < tB - .1) { img = "posterP"; const u = eio((t - tTh + .3) / 1.4); z = 1 + .7 * u; f = [MAKING[0] + MAKING[2] / 2, MAKING[1] + MAKING[3] / 2]; }
  else if (t < tM2) img = t < tA ? "back0" : t < tA + .8 ? "ed20_hi" : t < tA + 1.6 ? "ed21_hi" : "ed22_hi";
  else { img = t < d2 ? frameAt(t, tM2, "mk2_f", n2_) + "_hi" : "mk2_done_hi"; const u = eio(clamp((t - d2) / 1.2)); z = lerp(1.75, 1.1, u); f = [.5, lerp(.2, .5, u)]; }
  if (!APP[img]) img = "mk1_done_hi";
  s += fitApp(img, W_, H_, z, f[0], f[1]);
  // the missing row: a ring round it; the poster's Making a magnet: its ring and tag
  if (img === "mk1_done_hi" && t >= tM) { const b = APP.mk1_done.boxes.miss, a = APP.mk1_done_hi.at, u0 = (b[0] - a[0]) / a[2], v0 = (b[1] - a[1]) / a[3], u1 = u0 + b[2] / a[2], v1 = v0 + b[3] / a[3];
    const [x0, y0] = fitPt(img, W_, H_, z, f[0], f[1], u0, v0), [x1, y1] = fitPt(img, W_, H_, z, f[0], f[1], u1, v1), k = spring(t, tM, .4);
    s += OP(Math.min(1, k), `<rect x="${n2(x0 - 12)}" y="${n2(y0 - 10)}" width="${n2(x1 - x0 + 24)}" height="${n2(y1 - y0 + 20)}" rx="20" fill="none" stroke="${P.sun}" stroke-width="${n2(8 + 3 * Math.sin(t * 6))}"/>`); }
  if (img === "posterP" && t >= tTh) { const [x0, y0] = fitPt(img, W_, H_, z, f[0], f[1], MAKING[0], MAKING[1]), [x1, y1] = fitPt(img, W_, H_, z, f[0], f[1], MAKING[0] + MAKING[2], MAKING[1] + MAKING[3]), k = spring(t, tTh, .45), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    s += OP(Math.min(1, k), `<ellipse cx="${n2(cx)}" cy="${n2(cy)}" rx="${n2((x1 - x0) * .62)}" ry="${n2((y1 - y0) * 1.0)}" fill="none" stroke="${P.sun}" stroke-width="12"/>` + pline(cx - 120, cy - 150, cx - 40, cy - (y1 - y0) * .9, 1) + TF(cx - 160, cy - 190, k, tpill(0, 0, "missing from Basil's map", 40, P.sun, P.ink, { w: 700 }))); }
  return s; }

/* ================================================================ Part 2 · [LOOK CLOSER] two blank pages next Monday (lcpages) ================================================================ */
const MAPP = [MAPB[0], MAPB[2]];   // Pip's page: two branches (Two poles; Magnetic materials)
function lcPagesArt(t) { const tP = MK("pipp"), tB = MK("basp"), tA = MK("ansglow"); let s = `<rect x="-830" y="-395" width="1660" height="790" fill="#EEF4E8"/>`;
  // Basil's three practice maps from Mon, Tue and Thu, small, behind his page
  ["Mon", "Tue", "Thu"].forEach((d, i) => { const k = ramp(t, tB + .6 + i * .25, .3); if (k <= 0) return; s += OP(k, TF(720 + (i - 1) * 40, -230 + (i - 1) * 60, .2, `<g transform="rotate(${(i - 1) * 8})">${sheet00(700, 520, { lines: false })}${TF(0, 0, .6, handMap(t, MAPB, { size: 38 }))}</g>`) + TF(790, -230 + (i - 1) * 60, .9, tpill(0, 0, d, 22, "#fff", P.ink, { w: 700 }))); });
  if (t >= tB + 1.4) s += lcLab(t, tB + 1.4, 560, -350, "drawn from memory 3 times", 700, -300, { size: 26 });
  [["pip", -410, MAPP, tP, "2 branches"], ["basil", 410, MAPB, tB, "5 branches"]].forEach(([who, x, B, tt, lab]) => {
    s += TF(x, 40, 1, sheet00(760, 560, { lines: false }) + TF(0, 0, .66, handMap(t, B, { size: 40, R: 250 })) + T(-300, -238, who === "pip" ? "Pip" : "Basil", 34, P[who], { a: "start", w: 700 }));
    if (t >= tt) s += TF(x, 310, spring(t, tt, .45), tpill(0, 0, lab, 44, who === "pip" ? "#8E82B8" : "#E0A33A", "#fff", { w: 700 })); });
  if (t >= tA - .3) { const k = spring(t, tA - .3, .45); ["Pip", "Basil", "Both the same"].forEach((l, i) => { s += TF(-330 + i * 240, -340, .36 * k, choiceCard3(i + 1, l, nextCardPic(i, t), { w: 520, h: 200, size: 40, lit: i === 1 && t >= tA ? spring(t, tA, .45) : 0, id: "p" + i })); }); }
  return s; }

/* ================================================================ the journey: BE AN IDEA (a picture of Basil's memory: a garden of paths) ================================================================ */
// First person at ground level: you stand on a sandy path in a soft green meadow; at your feet the sign "like poles repel" (two small bar
// magnets, red North ends facing, pushing apart; tag "repel"); the path winds back to a far gate "Basil" (where he comes in to find you);
// faint other paths lead to "North pole" and "iron and steel". Between the days the grass grows over the path (blade by blade, from the
// ground); on Tuesday and Thursday a gentle light comes along the path from the gate (Basil remembering), parting the grass: the path is
// clearer, then wide and bright, and stays parted. A day counter and a "speeded up" tag. It is a picture, not a real brain.
const barMag = (x, y, rot, k = 1) => TF(x, y, k, `<g transform="rotate(${rot})"><rect x="-70" y="-20" width="70" height="40" fill="#E0453A" stroke="${P.ink}" stroke-width="4"/><rect x="0" y="-20" width="70" height="40" fill="#2F6FD6" stroke="${P.ink}" stroke-width="4"/>${T(-35, 12, "N", 26, "#fff")}${T(35, 12, "S", 26, "#fff")}</g>`);
function pathState(t) { const g1 = MK("grow1"), tu = MK("tue"), w1 = MK("walk1"), c1 = MK("clear1"), g2 = MK("grow2"), th = MK("thu"), w2 = MK("walk2"), wd = MK("wide");
  // clear: how clear the path is (0 grown over .. 1 the first, freshly made path .. 2 wide and bright); light: where the light is (0 gate .. 1 at you)
  let c = 1; c -= .62 * eio(clamp((t - g1 - .3) / Math.max(1, tu - g1 - .2)));
  c += .82 * eio(clamp((t - w1 - .4) / Math.max(.8, c1 - w1)));
  c -= .22 * eio(clamp((t - g2 - .2) / Math.max(1, th - g2)));
  c += .82 * eio(clamp((t - w2 - .2) / Math.max(.8, wd - w2)));
  const L1 = clamp((t - w1 + .2) / Math.max(.8, c1 - w1 + .3)), L2 = clamp((t - w2 + .1) / Math.max(.6, wd - w2 + .2));
  const light = t >= w1 - .2 && t < c1 + 1.2 ? L1 : t >= w2 - .1 && t < wd + 1.2 ? L2 : -1;
  const day = t < g1 + 1 ? "Mon" : t < tu ? "Mon → Tue" : t < g2 ? "Tue" : t < th ? "Tue → Thu" : "Thu";
  return { c, light, day, grow: (t >= g1 && t < tu) || (t >= g2 && t < th) }; }
function gardenArt(t, cam = 1) { const st = pathState(t); let s = `<rect width="1920" height="1080" fill="url(#vdMeadowSky)"/>`;
  // far hills and soft trees (every leaf on a twig: the far trees are drawn as whole crowns on trunks, no loose leaves)
  s += `<path d="M-20 520 Q300 420 640 500 Q980 560 1300 470 Q1640 400 1940 500 V1080 H-20z" fill="#B7DFA0"/><path d="M-20 600 Q420 540 900 590 Q1400 640 1940 570 V1080 H-20z" fill="#9CD07E"/>`;
  [[260, 520, .5], [1580, 470, .45], [1180, 560, .3]].forEach(([x, y, k]) => { s += TF(x, y, k, tree22(RAIN_B, 1, ["#8ED06A", "#6CBF52", "#4E9E44"], 7)); });
  // the meadow
  s += `<path d="M-20 640 Q960 600 1940 640 V1080 H-20z" fill="url(#vdGrass)"/>`;
  // the faint other paths
  s += `<path d="M960 1080 Q760 820 420 700" stroke="#E9D2A0" stroke-width="34" fill="none" opacity=".35" stroke-linecap="round"/><path d="M960 1080 Q1180 840 1520 690" stroke="#E9D2A0" stroke-width="34" fill="none" opacity=".35" stroke-linecap="round"/>`
    + TF(420, 690, .8, `<path d="M0 0 V-70" stroke="#8A5A30" stroke-width="8"/><rect x="-90" y="-120" width="180" height="56" rx="10" fill="#FFF8EA" opacity=".8"/>${T(0, -82, "North pole", 30, "#6A6A7A", { w: 700 })}`)
    + TF(1520, 680, .8, `<path d="M0 0 V-70" stroke="#8A5A30" stroke-width="8"/><rect x="-110" y="-120" width="220" height="56" rx="10" fill="#FFF8EA" opacity=".8"/>${T(0, -82, "iron and steel", 30, "#6A6A7A", { w: 700 })}`);
  // the far gate marked Basil
  s += TF(960, 640, .9, `<path d="M-80 0 V-150 M80 0 V-150" stroke="#8A5A30" stroke-width="14"/><path d="M-96 -150 Q0 -200 96 -150" stroke="#8A5A30" stroke-width="14" fill="none"/><rect x="-80" y="-232" width="160" height="50" rx="12" fill="#14B8A6"/>${T(0, -196, "Basil", 34, "#fff", { w: 700 })}`);
  // OUR path: from your feet to the gate; its width and brightness follow how clear it is
  const c = st.c, pw = lerp(40, 300, clamp(c / 2)), op = clamp(.25 + .45 * c, .2, 1);
  s += `<path d="M1000 1120 C 760 940, 1200 790, 960 650" stroke="#D9A85E" stroke-width="${n2(pw + 10)}" fill="none" opacity="${n2(op * .6)}" stroke-linecap="round"/><path d="M1000 1120 C 760 940, 1200 790, 960 650" stroke="#F0CC8A" stroke-width="${n2(pw)}" fill="none" opacity="${n2(op)}" stroke-linecap="round"/>`
    + `<path d="M1000 1120 C 760 940, 1200 790, 960 650" stroke="#FFF6D8" stroke-width="${n2(pw * .4)}" fill="none" opacity="${n2(clamp(c - 1, 0, 1) * .8)}" stroke-linecap="round"/>`;
  // grass growing over the path: blades rooted in the ground along the path, their height = how grown over it is (never floating)
  const gh = clamp(1.25 - c * .7, 0, 1); let bl = "";
  const bz = (u) => { const a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, c2 = 3 * (1 - u) * u * u, d = u ** 3; return [a * 1000 + b * 760 + c2 * 1200 + d * 960, a * 1120 + b * 940 + c2 * 790 + d * 650]; };
  if (gh > .02) for (let i = 0; i < 170; i++) { const u = .05 + .9 * hash(i, 11), p = bz(u);
    const sc = lerp(2.0, .4, u), off = (hash(i, 13) - .5) * pw * .95, x = p[0] + off, y = p[1], h = (30 + 30 * hash(i, 17)) * sc * gh * (st.grow ? 1 + .05 * Math.sin(t * 6 + i) : 1);
    bl += `<path d="M${n2(x - 4 * sc)} ${n2(y)} Q${n2(x + 6 * Math.sin(t * 1.5 + i))} ${n2(y - h * .6)} ${n2(x + 3 * sc)} ${n2(y - h)} Q${n2(x + 2)} ${n2(y - h * .5)} ${n2(x + 5 * sc)} ${n2(y)}z" fill="${["#6CBF52", "#58AE48", "#7FCF60"][i % 3]}"/>`; }
  s += bl;
  // the light coming along the path from the gate (Basil remembering): parts the grass ahead of it
  if (st.light >= 0) { const u = eio(st.light), x = lerp(960, 960, u) + 120 * Math.sin(u * Math.PI) * (u < .5 ? 1 : -1), y = lerp(650, 980, u), r = lerp(40, 160, u);
    s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r * 2.2)}" fill="#FFF3C0" opacity=".35" filter="url(#b40)"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="#FFF8DC" opacity=".8" filter="url(#b10)"/>`; }
  // the sign at your feet: like poles repel (two bar magnets, red North ends facing, pushing apart)
  const sp = 10 * Math.sin(t * 3);
  s += TF(640, 1010, .9, `<path d="M0 0 V-120" stroke="#8A5A30" stroke-width="14"/><g filter="url(#drop)"><rect x="-260" y="-300" width="520" height="190" rx="22" fill="#FFF8EA" stroke="#E0A33A" stroke-width="8"/></g>${T(0, -232, "like poles repel", 50, P.ink, { w: 700 })}`
    + barMag(-110 - sp, -160, 180, .8) + barMag(110 + sp, -160, 0, .8) + `<path d="M-40 -160 l-26 -14 M-40 -160 l-26 14 M40 -160 l26 -14 M40 -160 l26 14" stroke="#E0453A" stroke-width="5" stroke-linecap="round"/>` + TF(0, -128, 1, tpill(0, 0, "repel", 24, "#E0453A", "#fff", { w: 700 })));
  return s; }

/* ================================================================ small pictures ================================================================ */
// Part 1 Round 1's three answer cards: 1 a page with words and an eye; 2 a pencil filling a gap; 3 an = sign between the two
function r1CardPic(i) { if (i === 0) return `<rect x="-70" y="-52" width="140" height="104" rx="8" fill="#fff" stroke="#9A96A8" stroke-width="4"/>${[-28, -6, 16].map((y) => `<path d="M-50 ${y} H50" stroke="#9A96A8" stroke-width="7" stroke-linecap="round"/>`).join("")}<g transform="translate(60 -40)"><ellipse rx="30" ry="18" fill="#fff" stroke="#6E5FA8" stroke-width="5"/><circle r="9" fill="#3A2E52"/></g>`;
  if (i === 1) return `<rect x="-80" y="-30" width="160" height="60" rx="10" fill="#fff" stroke="#14B8A6" stroke-width="4"/>${T(-44, 16, "re", 40, INK16)}<rect x="-14" y="-22" width="30" height="44" rx="5" fill="#E8FBF8" stroke="#14B8A6" stroke-width="3"/>${T(1, 15, "p", 38, "#0E8C80")}${T(46, 16, "el", 40, INK16)}${TF(30, -10, .45, pencil00(0))}`;
  return `<g transform="translate(-60 0) scale(.6)">${r1CardPic(0)}</g>${T(0, 22, "=", 70, P.ink)}<g transform="translate(62 0) scale(.6)">${r1CardPic(1)}</g>`; }
// the cards Next Monday: 1 Pip with the poster (reads it 5 times), 2 Basil drawing on a blank sheet (draws it again), 3 both the same
function nextCardPic(i, t) { if (i === 0) return `<g transform="translate(-40 0) scale(.42)">${easelPoster(t, 0, 140, 1)}</g>` + `<use href="#s_pip_sit_closed" transform="translate(30 -70) scale(${n2(150 / SPR.pip_sit_closed.bh)}) translate(0 0)"/>` + TF(10, 70, 1, tpill(0, 0, "reads it 5 times", 20, "#8E82B8", "#fff", { w: 700 }));
  if (i === 1) return TF(-30, 10, .8, sheet00(150, 110, { lines: false }) + TF(0, 0, .14, handMap(0, MAPB))) + `<use href="#s_basil_sit_closed" transform="translate(20 -80) scale(${n2(150 / SPR.basil_sit_closed.bh)})"/>` + TF(10, 70, 1, tpill(0, 0, "draws it again", 20, "#E0A33A", "#fff", { w: 700 }));
  return T(0, 24, "=", 90, P.ink); }
// Pip's steps poster (the Showdown): HOW TO MAKE A MIND MAP (for our class), three numbered lines with small pictures; line 2 struck at
// `strike` (kept, never removed) and Basil's green rewrite under it at `rewrite`. Origin = the easel's foot; o.lit = [l1, l2, l3] 0..1
const PIP_LINES = ["Make your own map in TheOneApp.", "Tap Compare with the poster first, and copy it.", "Tap Mark my mind map, and fix what you missed."];
function stepsPoster(t, o = {}) { const W_ = 900, H_ = 620, lit = o.lit || [0, 0, 0], st = o.strike || 0, rw = o.rewrite || 0;
  let s = `<path d="M-300 0 L-140 -${H_ + 60} M300 0 L140 -${H_ + 60}" stroke="#8A5A30" stroke-width="16" stroke-linecap="round"/><rect x="${-W_ / 2 - 14}" y="-30" width="${W_ + 28}" height="18" rx="6" fill="#9C6A38"/>`;
  s += `<g filter="url(#drop)"><rect x="${-W_ / 2}" y="${-H_ - 40}" width="${W_}" height="${H_}" rx="12" fill="#FFFDF4"/></g>` + T(0, -H_ + 30, "HOW TO MAKE A MIND MAP", 52, P.pip, { w: 700 }) + T(0, -H_ + 76, "(for our class)", 32, P.ink2, { w: 600 });
  const pics = [(x, y) => TF(x, y, .1, tablet00(0, (a, b, w, h) => `<rect x="${a}" y="${b}" width="${w}" height="${h}" fill="#FFF8E6"/>`, 0, 0, 700, { stand: false })),
    (x, y) => TF(x, y, .16, easelPoster(0, 0, 160, 1)) + `<path d="M${x + 30} ${y - 20} l40 0" stroke="#8E82B8" stroke-width="6"/><path d="M${x + 62} ${y - 30} l10 10 l-10 10" stroke="#8E82B8" stroke-width="6" fill="none"/>`,
    (x, y) => TF(x, y - 20, .9, tickBadge(30))];
  PIP_LINES.forEach((l, i) => { const y = -H_ + 160 + i * 150, L = lit[i];
    s += (L > .02 ? `<rect x="${-W_ / 2 + 20}" y="${y - 56}" width="${W_ - 40}" height="100" rx="16" fill="#FFE9A8" opacity="${n2(.8 * L)}"/>` : "") + TF(-W_ / 2 + 60, y - 6, 1, `<circle r="30" fill="url(#gSun)" stroke="${P.ink}" stroke-width="4"/>${T(0, 12, i + 1, 36, P.ink)}`) + pics[i](-W_ / 2 + 150, y)
      + wrap(l, 34, 620, 700).map((ln, j, a) => T(-W_ / 2 + 210, y + 10 + (j - (a.length - 1) / 2) * 40, ln, 34, P.ink, { a: "start", w: 700 })).join("");
    if (i === 1 && st > 0) s += `<path d="M${-W_ / 2 + 200} ${y + 2} L${n2(-W_ / 2 + 200 + 660 * st)} ${y - 4}" stroke="#D84A3A" stroke-width="9" stroke-linecap="round"/>`;
    if (i === 1 && rw > 0) s += OP(rw, `<text x="${-W_ / 2 + 210}" y="${y + 58}" font-family="Fredoka" font-weight="700" font-size="28" fill="${GOODC}">Draw it from memory first.</text><text x="${-W_ / 2 + 210}" y="${y + 90}" font-family="Fredoka" font-weight="700" font-size="28" fill="${GOODC}">Then compare with the poster.</text>`); });
  return s; }
// the fun-fact pictures. Part 1 (the crow): a scientist in a long coat wearing a PLAIN cartoon mask (a round face with a big frown, not a
// real person's face), a notebook, crows on a branch above, one scolding; years later (a calendar flipping); our crow on the letterboxes
const ffCrowBranch = (t, w) => `<path d="M${-w / 2 - 10} -60 Q0 -84 ${w / 2 + 10} -70" stroke="#7A5226" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M60 -76 q22 -26 52 -26 q-26 14 -46 30z" fill="#58B56C" stroke="#2F8048" stroke-width="3"/>`
  + TF(-50, -70, .42, crow00(t, { caw: Math.floor(t * .8) / .8 + .1 })) + TF(40, -74, .38, crow00(t, { ph: 1.1, flip: true }));
const ffMask = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#CFEAFB"/>` + ffCrowBranch(t, w) + TF(56, -126, 1, tpill(0, 0, "caw caw!", 20, "#fff", P.ink, { w: 700 }))
  + `<g transform="translate(0 120)"><path d="M-46 0 L-40 -110 H40 L46 0z" fill="#F2EEE6" stroke="#8A8478" stroke-width="3"/><rect x="-14" y="-104" width="28" height="40" fill="#5B7BD6"/><circle cy="-132" r="30" fill="#FFF3C4" stroke="#8A8478" stroke-width="4"/><circle cx="-10" cy="-136" r="4" fill="#333"/><circle cx="10" cy="-136" r="4" fill="#333"/><path d="M-12 -118 Q0 -128 12 -118" stroke="#333" stroke-width="4" fill="none"/>
    <rect x="30" y="-90" width="30" height="40" rx="3" fill="#E0A33A" stroke="#8A5A30" stroke-width="3"/></g>`;
const ffYears = (t, w, h) => { const n = Math.floor((t * 1.6) % 8); return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#DFF0D8"/>` + ffCrowBranch(t, w) + `<g transform="translate(0 70)"><rect x="-56" y="-50" width="112" height="100" rx="10" fill="#fff" stroke="${P.ink}" stroke-width="4"/><rect x="-56" y="-50" width="112" height="30" rx="10" fill="#D84A3A"/>${T(0, 34, 2026 + n, 30, P.ink)}</g>`; };
const ffUs = (t, w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#E8E2D6"/><rect x="${-w / 2 + 20}" y="0" width="${w - 40}" height="${h / 2}" fill="#BCC3CB"/>` + [...Array(8)].map((_, i) => `<rect x="${-w / 2 + 26 + (i % 4) * (w - 52) / 4}" y="${8 + Math.floor(i / 4) * 60}" width="${(w - 52) / 4 - 6}" height="54" rx="3" fill="${i % 2 ? "#C8CED5" : "#D3D8DE"}"/>`).join("") + TF(0, 2, .7, crow00(t, { ph: .4 }));
// Part 2 (the cat): a pet cat on a sofa, its ears turning as a voice says words, its head lifting on its own name; a stranger says it
const ffName = (t, w, h, stranger) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#FCE9D6"/><rect x="${-w / 2 + 10}" y="40" width="${w - 20}" height="80" rx="20" fill="#D9776A"/><rect x="${-w / 2 + 10}" y="-30" width="${w - 20}" height="80" rx="20" fill="#E88A7A"/>`
  + TF(-30, 70, .8, cat00(t, { pose: "sit" })) + (stranger ? `<g transform="translate(${w / 2 - 50} -40)"><circle r="26" fill="#C99A72"/><path d="M-26 -6 Q0 -34 26 -6" fill="#2A2220"/><rect x="-24" y="26" width="48" height="60" rx="16" fill="#3F8A6A"/></g>` : `<g transform="translate(${w / 2 - 50} -30)"><rect x="-26" y="-40" width="52" height="80" rx="10" fill="#3A3F48"/><circle cy="-10" r="14" fill="#6A7280"/><circle cy="20" r="8" fill="#6A7280"/></g>`)
  + TF(w / 2 - 70, -120, 1, tpill(0, 0, stranger ? "“Mimi!”" : (Math.floor(t * 1.2) % 3 === 2 ? "“Mimi!”" : Math.floor(t * 1.2) % 3 ? "“chair”" : "“apple”"), 22, "#fff", P.ink, { w: 700 }));
const ffName1 = (t, w, h) => ffName(t, w, h, false), ffName2 = (t, w, h) => ffName(t, w, h, true);
// the dare: three cards, each a small picture of TheOneApp's real screen
const DARE = [["Today: ✏️ Make my own mind map · Magnets", "mmpage", "make"], ["Tomorrow: ＋ Start a new mind map, from memory", "sheet1", "start"], ["✅ Mark my mind map", "mk2_done", "mark"]];
