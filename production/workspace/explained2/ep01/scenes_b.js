// scenes_b.js: segments 4-6: the void deck and garden (diversity), Mark Sentence 1, the countdown, Day 1, Round 1 (the wind-up robot).

/* ============ BG: the void deck and community garden of the block (Toa Payoh), sunny ============ */
// the things that light up, each drawn at its own origin so the same drawing is the background and the highlight
const GT = {
  // Javan mynah: black-grey, yellow beak and legs, a small crest, a white wing patch
  mynah: () => `<path d="M-8 40 v26 M12 40 v26" stroke="#F0B429" stroke-width="6" stroke-linecap="round"/><path d="M-64 6 Q-30 -40 22 -30 Q52 -24 52 6 Q46 44 0 44 Q-40 44 -64 6z" fill="#3A3550" stroke="#221E36" stroke-width="5" stroke-linejoin="round"/><path d="M-64 6 L-104 0 L-70 22z" fill="#2B2742" stroke="#221E36" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="38" cy="-36" r="27" fill="#2B2742" stroke="#221E36" stroke-width="5"/><path d="M44 -62 q10 -12 18 -2" fill="none" stroke="#221E36" stroke-width="6" stroke-linecap="round"/><path d="M60 -40 L92 -32 L60 -24z" fill="#F7C531" stroke="#C98200" stroke-width="4" stroke-linejoin="round"/><circle cx="46" cy="-40" r="5.5" fill="#F7C531"/><circle cx="46" cy="-40" r="2.6" fill="${P.ink}"/><path d="M-30 4 q24 -10 44 8" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>`,
  ants: () => [0, 1, 2, 3, 4].map((i) => `<g transform="translate(${-70 + i * 35} ${i % 2 * 5})"><ellipse cx="-8" cy="0" rx="7" ry="5" fill="#3A2420"/><circle cx="1" cy="0" r="4" fill="#3A2420"/><circle cx="8" cy="-1" r="4.5" fill="#3A2420"/><path d="M-6 3 l-4 7 M1 3 v8 M6 3 l4 7 M10 -4 l6 -6" stroke="#3A2420" stroke-width="1.8" stroke-linecap="round"/></g>`).join(""),
  // papaya tree: one straight trunk with leaf scars, a crown of big lobed leaves on long stalks, green fruit under the crown
  papaya: () => { let lv = "", sc = ""; const A = [-215, -180, -150, -120, -90, -60, -30, 0, 35];
    A.forEach((deg, i) => { const a = deg * Math.PI / 180, R = 150 + (i % 2) * 34, x = Math.cos(a) * R, y = -440 + Math.sin(a) * R * .8; lv += `<path d="M0 -440 Q${n2(x * .5)} ${n2(y - 26)} ${n2(x)} ${n2(y)}" stroke="#7FB85C" stroke-width="8" fill="none" stroke-linecap="round"/><g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(deg + 90)})">${[-78, -52, -26, 0, 26, 52, 78].map((d) => `<path d="M0 0 Q-30 -44 0 -${d === 0 ? 92 : 76} Q30 -44 0 0z" fill="url(#gLeaf)" stroke="#1F7F47" stroke-width="4" stroke-linejoin="round" transform="rotate(${d})"/>`).join("")}<circle r="13" fill="#2FA65A"/></g>`; });
    for (let y = -60; y > -400; y -= 44) sc += `<path d="M-16 ${y} q16 10 32 0" stroke="#8C7458" stroke-width="4" fill="none"/>`;
    return `<path d="M-26 0 Q-20 -220 -15 -440 H15 Q20 -220 26 0z" fill="#C9B08A" stroke="#8C7458" stroke-width="5" stroke-linejoin="round"/>${sc}${lv}${[[-24, -398, -14], [22, -394, 12], [-4, -372, 0], [-34, -360, -24], [30, -356, 20]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="19" ry="29" fill="#7FBF4A" stroke="#4E8F2E" stroke-width="4" transform="rotate(${r} ${x} ${y})"/>`).join("")}`; },
  bench: () => `<g stroke="#8A5A36" stroke-width="5" stroke-linejoin="round"><rect x="-150" y="-110" width="300" height="34" rx="10" fill="#D79D62"/><rect x="-150" y="-66" width="300" height="34" rx="10" fill="#D79D62"/><rect x="-160" y="-22" width="320" height="34" rx="10" fill="#E6B57C"/></g><path d="M-120 12 v54 M120 12 v54 M-128 -110 v122 M128 -110 v122" stroke="#5E5A78" stroke-width="12" stroke-linecap="round"/>`,
  bicycle: () => `<g fill="none" stroke="${P.ink2}" stroke-width="9"><circle cx="-92" cy="0" r="62"/><circle cx="92" cy="0" r="62"/></g><g fill="none" stroke="#C9D2E8" stroke-width="3"><path d="M-92 -62 V62 M-154 0 H-30 M92 -62 V62 M30 0 H154"/></g><g fill="none" stroke="${P.coral}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M-92 0 L-40 -86 H56 L92 0 M-40 -86 L8 0 H-92 M8 0 L56 -86"/><path d="M56 -86 L46 -124 H80"/><path d="M-40 -86 L-48 -108"/></g><rect x="-76" y="-122" width="56" height="16" rx="8" fill="${P.ink}"/><circle cx="8" cy="0" r="12" fill="${P.ink2}"/>`,
  // the blue recycling bin
  bin: () => `<g stroke="#1F5FD0" stroke-width="5" stroke-linejoin="round"><path d="M-70 -150 H70 L58 60 Q0 72 -58 60z" fill="url(#gBlue)"/><rect x="-82" y="-176" width="164" height="34" rx="12" fill="#5FB0FF"/><circle cx="-52" cy="62" r="16" fill="${P.ink2}" stroke="${P.ink}"/><circle cx="52" cy="62" r="16" fill="${P.ink2}" stroke="${P.ink}"/></g><rect x="-44" y="-112" width="88" height="96" rx="12" fill="#fff"/><g fill="none" stroke="#1F5FD0" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M-12 -92 L4 -92 L18 -68"/><path d="M24 -52 L10 -30 H-12"/><path d="M-22 -44 L-28 -66 L-16 -84"/></g><path d="M-60 -134 h70" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".4"/>`,
  butterfly: () => `<g stroke="#B4500C" stroke-width="3"><path d="M0 0 Q-44 -50 -50 -8 Q-44 20 0 0z M0 0 Q44 -50 50 -8 Q44 20 0 0z" fill="${P.orange}"/><path d="M0 0 Q-30 34 -22 6z M0 0 Q30 34 22 6z" fill="${P.sun}"/></g><ellipse cx="0" cy="0" rx="4" ry="16" fill="${P.ink}"/>`,
  pandan: () => Array.from({ length: 11 }, (_, i) => { const a = -150 + i * 12, L = 120 + (i % 3) * 26; return `<path d="M0 0 Q${n2(Math.cos(a * Math.PI / 180) * L * .5)} ${n2(Math.sin(a * Math.PI / 180) * L * .9)} ${n2(Math.cos(a * Math.PI / 180) * L)} ${n2(Math.sin(a * Math.PI / 180) * L * .7)}" stroke="${i % 2 ? "#43BF6C" : "#2FA65A"}" stroke-width="15" fill="none" stroke-linecap="round"/>`; }).join(""),
  letterboxes: () => `<rect x="-130" y="-170" width="260" height="170" rx="10" fill="#C9D2E8" stroke="#7F89A8" stroke-width="5"/>${Array.from({ length: 15 }, (_, i) => `<rect x="${-118 + (i % 5) * 48}" y="${-158 + Math.floor(i / 5) * 52}" width="40" height="42" rx="5" fill="#EEF2FA" stroke="#7F89A8" stroke-width="3"/><rect x="${-108 + (i % 5) * 48}" y="${-146 + Math.floor(i / 5) * 52}" width="20" height="4" fill="#7F89A8"/>`).join("")}`,
  lamp: () => `<rect x="-7" y="-520" width="14" height="520" rx="7" fill="#7F89A8"/><path d="M0 -520 q0 -30 60 -30" stroke="#7F89A8" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="72" cy="-544" rx="34" ry="13" fill="#EEF2FA" stroke="#7F89A8" stroke-width="4"/>`,
  ball: () => `<circle r="34" fill="${P.sun}" stroke="#C98200" stroke-width="5"/><path d="M-34 0 Q0 -22 34 0 M-20 -27 Q0 0 -20 27 M20 -27 Q0 0 20 27" stroke="#C98200" stroke-width="3" fill="none"/>`,
};
const GP = { mynah: [1270, 905, .8], ants: [1010, 992, 1], papaya: [1520, 850, 1], bench: [330, 842, .86], bicycle: [870, 866, .82], bin: [1110, 838, .78], butterfly: [1690, 470, .7], pandan: [1790, 880, .8], letterboxes: [300, 660, .62], lamp: [1205, 870, .9], ball: [700, 980, .8] };
BG.garden = () => { const g = (k) => TF(GP[k][0], GP[k][1], GP[k][2], GT[k]()); let beds = "";
  for (let b = 0; b < 3; b++) { const y = 800 + b * 46, x0 = 1330 - b * 20; beds += `<rect x="${x0}" y="${y}" width="${560 + b * 40}" height="34" rx="12" fill="#8A5E3E" stroke="#5E3F28" stroke-width="4"/>`; for (let i = 0; i < 9 + b; i++) beds += `<g transform="translate(${x0 + 30 + i * 58} ${y + 4})"><circle r="17" fill="${i % 2 ? "#43BF6C" : "#6FD86B"}" stroke="#1F8A4C" stroke-width="3"/><circle cx="-6" cy="-5" r="6" fill="#B9EE7A"/></g>`; }
  return `<defs>${lg("gdSky", [[0, "#7FC4FF"], [.7, "#CFEBFF"], [1, "#EAF6E0"]])}${lg("gdGrass", [[0, "#8FDB7A"], [1, "#4FB060"]])}${lg("gdPath", [[0, "#F1E3CF"], [1, "#D9C3A6"]])}${lg("gdDeck", [[0, "#5C4E9C"], [1, "#8A7CC4"]])}${lg("gdBlk", [[0, "#F6D9C8"], [1, "#EFC3B0"]])}</defs>
  <rect x="-200" y="-120" width="2320" height="1320" fill="url(#gdSky)"/><circle cx="1650" cy="150" r="230" fill="#FFF3B8" opacity=".8" filter="url(#b60)"/><circle cx="1650" cy="150" r="70" fill="#FFF8D8"/>
  <g fill="#fff" opacity=".85" filter="url(#b4)"><ellipse cx="1180" cy="150" rx="170" ry="38"/><ellipse cx="1300" cy="120" rx="110" ry="34"/><ellipse cx="1880" cy="330" rx="150" ry="32"/></g>
  <g filter="url(#b4)" opacity=".75">${hdbBlock(1000, 230, 250, "#E3BFD8", "#9B6BFF")}${hdbBlock(1270, 180, 360, "#F1C7A6", "#2EC4B6")}${hdbBlock(1800, 260, 300, "#E9B5AE", "#FF8A66")}<path d="M900 720 Q1100 640 1300 700 T1700 680 T2120 700 V800 H900z" fill="#6DBF7E"/><circle cx="1150" cy="650" r="80" fill="#5DB572"/><circle cx="1740" cy="640" r="100" fill="#5DB572"/></g>
  <rect x="-200" y="740" width="2320" height="460" fill="url(#gdGrass)"/>
  <!-- the block: flats above, the void deck below -->
  <rect x="-200" y="-120" width="1130" height="470" fill="url(#gdBlk)"/>${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${-90 + (i % 6) * 170} ${-30 + Math.floor(i / 6) * 180})"><rect x="0" y="0" width="120" height="84" rx="8" fill="#7C6BB8"/><path d="M40 0 V84 M80 0 V84" stroke="#F6D9C8" stroke-width="5"/><rect x="-10" y="100" width="140" height="10" rx="5" fill="#fff" opacity=".5"/></g>`).join("")}
  <rect x="-200" y="150" width="1130" height="16" fill="#FF8A66"/><rect x="-200" y="330" width="1130" height="26" fill="#E3A58E"/>
  <rect x="-200" y="356" width="1130" height="470" fill="url(#gdDeck)"/><rect x="-200" y="700" width="1130" height="130" fill="#B9AEDD" opacity=".55"/>
  <rect x="560" y="430" width="250" height="170" rx="10" fill="#C9A772" stroke="#8A5A36" stroke-width="6"/>${[[580, 450, "#FFF8EA"], [650, 446, P.sun], [724, 452, "#BFE6FF"], [590, 524, P.pink], [668, 520, "#FFF8EA"], [738, 528, P.mint]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="56" height="62" rx="4" fill="${c}"/>`).join("")}
  ${g("letterboxes")}
  <g transform="translate(700 800)"><ellipse cx="0" cy="26" rx="150" ry="18" fill="${P.ink}" opacity=".25"/><rect x="-16" y="-50" width="32" height="70" fill="#B9B4C9"/><ellipse cx="0" cy="-56" rx="92" ry="20" fill="#DAD6E6" stroke="#9C96B8" stroke-width="5"/>${[-132, 132].map((x) => `<rect x="${x - 26}" y="-22" width="52" height="46" rx="14" fill="#DAD6E6" stroke="#9C96B8" stroke-width="5"/>`).join("")}</g>
  ${[-60, 440, 890].map((x) => `<rect x="${x}" y="340" width="96" height="500" rx="10" fill="#FFF3DC"/><rect x="${x}" y="340" width="96" height="500" rx="10" fill="none" stroke="#E3C9A8" stroke-width="4"/><rect x="${x}" y="560" width="96" height="60" fill="#2EC4B6"/><rect x="${x + 70}" y="340" width="26" height="500" fill="#E3C9A8" opacity=".5"/>`).join("")}
  <path d="M-200 826 H2120 V1200 H-200z" fill="url(#gdPath)"/><path d="M-200 826 H2120" stroke="#fff" stroke-width="6" opacity=".6"/><g stroke="#C9B08A" stroke-width="3" opacity=".5"><path d="M-200 900 H2120 M-200 1000 H2120 M200 826 L120 1200 M700 826 L680 1200 M1200 826 L1260 1200 M1700 826 L1840 1200"/></g>
  <path d="M1250 826 H2120 V1010 Q1700 960 1250 890z" fill="url(#gdGrass)"/>
  <g stroke="#8A5A36" stroke-width="7" stroke-linecap="round">${Array.from({ length: 11 }, (_, i) => `<path d="M${1290 + i * 70} 770 v70"/>`).join("")}<path d="M1270 790 H2040 M1270 824 H2040"/></g>
  ${beds}${g("lamp")}${g("papaya")}${g("pandan")}${g("bench")}${g("bicycle")}${g("bin")}${g("ball")}${g("mynah")}${g("ants")}${g("butterfly")}
  ${groundShadow(330, 902, 150, 14, .2)}${groundShadow(870, 920, 150, 12, .2)}${groundShadow(1110, 892, 70, 10, .25)}${groundShadow(1520, 852, 80, 12, .25)}
  <g style="mix-blend-mode:screen"><path d="M1400 -120 L2120 -120 L2120 1200 L700 1200z" fill="#FFE9A8" opacity=".1" filter="url(#b30)"/></g>
  <g filter="url(#b10)" opacity=".9"><g transform="translate(1990 1150) rotate(-130)">${leaf(230, false, false).replace(/url\(#gLeaf\)/g, "#1B4D3A").replace(/#1F7F47|#D8F6C8/g, "#1B4D3A")}</g></g>`; };

// one garden thing lighting up: glow, a small pop, its name on a pill
function gLight(t, k, t0, name, lx, ly, o = {}) { if (t < t0 - .05) return ""; const [x, y, s] = GP[k], a = spring(t, t0, .4), hold = 1 - ss(t0 + 2.2, t0 + 2.8, t) * (o.keep ? 0 : .0);
  return `<g filter="url(#glowS)">${TF(x, y, s * (1 + .12 * pulse(t, t0, .05, .4)) * (o.mag || 1), GT[k]())}</g>` + (name ? TF(lx, ly, a, tpill(0, 0, name, 38, "#fff", P.ink, { w: 700 })) : ""); }
// the buddies hop in: a row of arcs (no walk cycle: they bounce along, squashing on each landing)
function hopIn(who, x0, x1, y, h, t, t0, o = {}) { const n = o.n || 4, d = .3, u = clamp((t - t0) / (n * d)), x = lerp(x0, x1, u), i = Math.floor((t - t0) / d), jumps = []; for (let k = 0; k < n; k++) jumps.push([t0 + k * d, 34]);
  return buddy(who, x, y, h, t, { ...o, jump: t < t0 + n * d ? jumps : (o.jump || []), flip: o.flip }); }

/* ============ 4 · where the six things came from ============ */
SC.garden = (t, s) => { const a = "h401", b = "h402", u = (t - s.t0) / (s.t1 - s.t0), z = 1.12 - .12 * eo((t - s.t0) / 2.2) + .05 * u;
  const cue = [["mynah", W(b, "mynah"), "mynah", 1270, 800], ["ants", W(b, "ants"), "ants", 1010, 925], ["papaya", W(b, "papaya"), "papaya tree", 1520, 250], ["bench", W(b, "bench"), "bench", 330, 700], ["bicycle", W(b, "bicycle"), "bicycle", 870, 710], ["bin", W(b, "blue"), "blue recycling bin", 1110, 640]];
  const more = [["butterfly", W(b, "so")], ["pandan", W(b, "so") + .12], ["letterboxes", W(b, "many")], ["lamp", W(b, "many") + .12], ["ball", W(b, "different")]];
  let hi = ""; for (const [k, t0, nm, lx, ly] of cue) hi += gLight(t, k, t0, nm, lx, ly);
  for (const [k, t0] of more) hi += gLight(t, k, t0, null);
  // the ants are tiny: a round magnifier shows them
  const ta = W(b, "ants"), mk = spring(t, ta, .45) * (1 - ramp(t, W(b, "bench"), .25));
  if (mk > .02) hi += TF(1010, 800, mk, `<g filter="url(#drop)"><circle r="96" fill="#F1E3CF" stroke="#fff" stroke-width="10"/></g><g transform="scale(2.1) translate(${n2(((t * 14) % 35) - 17)} 0)">${GT.ants()}</g><circle r="96" fill="none" stroke="#fff" stroke-width="10"/>`);
  const t0 = s.t0 + .3;
  const buds = hopIn("pip", -160, 150, 1070, 240, t, t0 + .3, { flip: true }) + hopIn("momo", -160, 560, 1070, 240, t, t0, { flip: true, poses: [[W(b, "so"), "surprised"], [W(b, "so") + 1.6, "sit"]] })
    + hopIn("basil", -160, 350, 1076, 245, t, t0 + .15, { poses: [[W(a, "look"), "cheer"], [W(a, "look") + 1.2, "sit"]] });
  const bx = lerp(-80, 800, clamp((t - t0) / 1.2)), by = 1040 - 24 * Math.abs(Math.sin(Math.PI * clamp((t - t0) / 1.2) * 4));
  return CAM(bg("garden") + hi, z, 960, 640) + OP(ramp(t, s.t0 + .5, .3) * (1 - ramp(t, LT(b) - .2, .3)), lowerPill(60, 150, "Void deck and community garden,", "Toa Payoh")) + buds + TF(bx, by, .95, miniBox()) + HUD(t); };

/* ============ Mark Sentence 1 ============ */
function markScene(t, s, o) { const L = TL.lines[o.id];
  return bg("stage2") + markCard(t, { ...o, t0: s.t0 + .1 })
    + buddy(o.who, 330, 960, 400, t, { aura: true, in: s.t0 + .15, poses: o.poses || [[s.t0, "pointing"]] }) + bubble(330, 380, ["Say it with me!"], t, s.t0 + .5, L.end + .3, { size: 40, tail: 0, col: P[o.who] }) + (o.extra || "") + HUD(t); }
SC.mark1 = (t, s) => markScene(t, s, { id: "h403", who: "momo", n: "1 of 3", text: "There is a great variety of living and non-living things around us. This is called diversity.", keys: ["variety", "living", "non-living", "diversity."],
  poses: [[s.t0, "pointing"], [WE("h403", "diversity") + .1, "cheer"]] });

/* ============ how do we keep track? Six things hop into the box ============ */
SC.garden2 = (t, s) => { const tg = W("h405", "groups"), t6 = W("h405", "six") - .1, z = 1.25;
  const six = [() => TF(0, 10, .8, pebble()), () => TF(0, 50, .62, teddyKey()), () => TF(0, 30, 1, beanPlant(1)), () => TF(0, 10, .62, potPlant({})), () => TF(0, 30, .78, wormDish({ id: "g2" })), () => TF(0, 60, .6, robotRig({}))]; let row = "";
  six.forEach((f, i) => { const tin = tg + i * .09, th = t6 + i * .16, k = spring(t, tin, .4); if (k < .02) return; const u = clamp((t - th) / .5), x0 = 900 + i * 166, y0 = 420, x = lerp(x0, 1420, u), y = lerp(y0, 860, u) - 260 * Math.sin(Math.PI * u), sc = k * lerp(1, .35, u); if (u >= 1) return;
    row += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(sc)})" filter="url(#glowS)"><circle r="92" fill="#fff" opacity=".85"/>${f()}</g>`; });
  const hopN = clamp(Math.floor((t - t6 - .5) / .16) + 1, 0, 6), bsq = 1 + .08 * pulse(t, t6 + .5 + (hopN - 1) * .16, .02, .16) * (hopN > 0 ? 1 : 0);
  return CAM(bg("garden"), z, 700, 760, 1) + `<rect width="1920" height="1080" fill="#fff" opacity=".18"/>`
    + buddy("basil", 420, 1050, 500, t, { poses: [[s.t0, "sit"], [LE("b404") + .15, "arms_crossed"], [tg, "surprised"], [t6 + .2, "cheer"]], in: s.t0 - .5 }) + TF(640, 560 + 8 * Math.sin(t * 5), 1.1, `<g filter="url(#rim)">${robotRig({ head: 4 * Math.sin(t * 5), ant: 8 * Math.sin(t * 7) })}</g>`)
    + say("b404", 420, 420, t, { size: 46 }) + TF(1420, 990, 2.2 * bsq, miniBox()) + row + (hopN ? TF(1420, 640, spring(t, t6 + .5 + (hopN - 1) * .16, .3), `<circle r="54" fill="url(#gSun)" filter="url(#dropS)"/>${T(0, 22, hopN, 64, P.ink)}`) : "") + HUD(t); };

/* ============ 5 · the countdown ============ */
SC.count = (t, s) => { const L = "h501", ws = [["Are you ready?", LT(L), 150, "#fff"], ["3", W(L, "three"), 520, P.sun], ["2", W(L, "two"), 520, P.sun], ["1", W(L, "one"), 520, P.sun], ["GO!", W(L, "go"), 460, "#7BE08F"]];
  let cur = 0; ws.forEach((w, i) => { if (t >= w[1] - .03) cur = i; }); const [txt, t0, size, col] = ws[cur], k = lerp(2.2, 1, eo((t - t0 + .03) / .16)) + .05 * wob(t, t0 + .13, .4), ringR = 300 + 500 * eo((t - t0) / .6);
  const jumps = ws.slice(1).map((w) => [w[1] - .18, 60]);
  return bg("stage") + (cur ? `<circle cx="960" cy="470" r="${n2(ringR)}" fill="none" stroke="${col}" stroke-width="${n2(22 * (1 - eo((t - t0) / .6)))}" opacity=".8"/><circle cx="960" cy="470" r="330" fill="${P.night}" opacity=".5"/>` : "")
    + `<g transform="translate(960 ${cur ? 470 : 430}) scale(${n2(k)})"><g transform="translate(0 ${size * .05})" opacity=".8">${T(0, size * .35, txt, size, P.ink, { ls: cur ? 0 : 4 })}</g>${T(0, size * .35 - 6, txt, size, col, { ls: cur ? 0 : 4 })}</g>`
    + buddy("pip", 300, 1050, 300, t, { aura: true, jump: jumps, poses: [[ws[4][1] - .05, "cheer"]] }) + buddy("basil", 960, 1070, 230, t, { aura: true, jump: jumps, poses: [[ws[4][1] - .05, "cheer"]] }) + buddy("momo", 1620, 1050, 300, t, { aura: true, jump: jumps, poses: [[ws[4][1] - .05, "cheer"]] }) + HUD(t); };

/* ============ Day 1: six things, one box; the care card ============ */
SC.day1 = (t, s) => { const L = "h502", V = HAS(L), z = lerp(1.0, .84, eo((t - s.t0) / .9)), cam = [z, 960, 500], tA = V ? W(L, "holes") : s.t0 + 1.0, tF = V ? W(L, "oats") : s.t0 + 2.0, tW = V ? W(L, "carrot") : s.t0 + 2.9, tP = V ? W(L, "plant") : s.t0 + 3.8, tLi = V ? W(L, "light") : s.t0 + 4.2;
  const wx = (x) => 960 + (x - 960) * z, wy = (y) => 500 + (y - 500) * z, B = BOX;
  const chip = (t0, x, y, kind, txt, px, py, col, fill) => { const k = spring(t, t0, .45); if (k < .02) return ""; return OP(clamp((t - t0) / .15), `<path d="M${x} ${y} L${n2(px)} ${n2(py)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(px)}" cy="${n2(py)}" r="8" fill="#fff"/>`) + TF(x, y, k, `<g filter="url(#drop)"><rect x="-130" y="-52" width="260" height="104" rx="52" fill="${P.paper}"/></g><g transform="translate(-76 0) scale(.82)">${needIcon(kind, col, fill)}</g>${T(34, 16, txt, 46, P.ink, { ls: 3 })}`); };
  const shaft = OP(pulse(t, tLi + .2, .3, 2.5) * .5, `<g style="mix-blend-mode:screen"><path d="M-80 -40 L560 -40 L${B.plant + 200} 900 L${B.plant - 240} 900z" fill="#FFE27A" filter="url(#b30)"/></g>`);
  return boxView(t, { cam, st: { day: 1 }, over: shaft })
    + chip(tA, 1180, 86, "air", "AIR", wx(1124), wy(216), "#2E8FB8", "#BFE6FF") + chip(tF, 1130, 950, "food", "FOOD", wx(B.dish - 30), wy(B.floor - 22), "#B4760C", "#F3DDB0") + chip(tW, 1500, 950, "water", "WATER", wx(B.dish + 64), wy(B.floor - 30), "#1F5FD0", "#8CC8FF")
    + chip(tP, 520, 950, "water", "WATER", wx(B.plant), wy(B.floor - 30), "#1F5FD0", "#8CC8FF")
    + OP(ramp(t, tA + .6, .4), `<g transform="translate(960 1040)"><rect x="-640" y="-25" width="1280" height="50" rx="25" fill="${P.ink}" opacity=".8"/>${T(0, 10, "An adult helps. Wash your hands. The mealworm goes back to its tub after Day 30.", 28, "#fff", { w: 500 })}</g>`)
    + `<g transform="scale(${n2(lerp(1.5, 1, eo((t - s.t0 - .25) / .18)))})" opacity="${n2(clamp((t - s.t0 - .2) / .1))}">${counter(t, 1, s.t0 + .25)}</g>` + HUD(t); };

/* ============ round cards ============ */
function roundCard(t, s, a, b, col = P.sun) { const u = t - s.t0, k = lerp(2.3, 1, eo(u / .16)) + .05 * wob(u, .16, .4);
  return bg("stage") + `<circle cx="960" cy="540" r="${n2(360 + 500 * eo(u / .7))}" fill="none" stroke="${col}" stroke-width="${n2(24 * (1 - eo(u / .7)))}"/><g transform="translate(960 540) scale(${n2(k)}) rotate(-4)"><g filter="url(#drop)"><rect x="${-(tw(a, 200, 700, "Fredoka", 10) + 160) / 2}" y="-150" width="${tw(a, 200, 700, "Fredoka", 10) + 160}" height="${b ? 380 : 300}" rx="60" fill="${col}"/></g>${T(0, 70, a, 200, P.ink, { ls: 10 })}${b ? T(0, 180, b, 64, P.ink, { ls: 8 }) : ""}</g>` + HUD(t); }
SC.r1card = (t, s) => roundCard(t, s, "ROUND 1");
const P1 = HAS("h601");

/* ============ 6 · Round 1: the wind-up robot ============ */
const R1 = { step: .27 };
if (P1) { R1.t0 = SCN.r1.t0; R1.cut = W("h601", "point") - .25; R1.back = SCN.r1ev.t0; R1.stop = WE("h606", "stops") + .25;
// the robot's walk: steps so far at t. Even steps until it is back in the box, then every step takes longer, then it stops in mid-step.
R1.steps = (() => { const a = []; let t = R1.t0 + .1; while (t < R1.back + .3) { a.push(t); t += R1.step; } let gap = R1.step * 1.18; while (t + gap < R1.stop - .1) { a.push(t); gap *= 1.24; t += gap; } a.push(R1.stop); return a; })();
R1.phase = (t) => { const S = R1.steps; if (t <= S[0]) return 0; if (t >= S[S.length - 1]) return S.length - 1 + .38; for (let i = 0; i < S.length - 1; i++) if (t < S[i + 1]) return i + (t - S[i]) / (S[i + 1] - S[i]); return S.length - 1; };
R1.x = (t) => { const p = R1.phase(t), pc = R1.phase(R1.cut), pb = R1.phase(R1.back), pe = R1.steps.length - 1; const xa = lerp(BOX.robot0, 960, clamp(p / pc)); return t < R1.back ? xa : lerp(960, BOX.robot1, clamp((p - pb) / (pe - pb))); };
}
const R1_FROZEN = () => robotWalk((R1.steps ? R1.steps.length - 1 : 23) + .38, .5);     // stopped in mid-step: exactly the same drawing from now on
SC.r1 = (t, s) => { const L = "h601";
  if (t < R1.cut) { const x = R1.x(t), z = 1.5;   // inside the box: it marches right past the mealworm, which lies still in its oats
    return boxView(t, { cam: [z, x + 40, 700], st: { day: 1, robotX: x, robot: robotWalk(R1.phase(t), 1) } }) + OP(ramp(t, W(L, "the") - .05, .25), TF(960, 150, 1, tpill(0, 0, "The wind-up robot", 56, P.ink, "#fff", { w: 700 }))) + counter(t, 1, -9, 60, 110, .8) + HUD(t); }
  return lockScene(t, { s: { t0: R1.cut }, q: "The wind-up robot. Is it…", tq: R1.cut, tL: W(L, "left"), tR: W(L, "right"), ring0: MK("ring0_1"), dur: 5, lock: "h602",
    obj: (tt) => TF(960, 596, 1.05, `<g filter="url(#rim)">${robotWalk(R1.phase(tt), 1)}</g>`),
    picks: [{ who: "pip", id: "p604", word: "NON-LIVING", kind: "blue" }, { who: "basil", id: "b603", word: "LIVING", kind: "green", x: true }, { who: "momo", id: "m605", word: "NON-LIVING", kind: "blue" }] }); };

// the evidence: the robot stops; a spring inside; all night; all of day two
SC.r1ev = (t, s) => { const a = "h606", b = "h606b", c = "h607", B = BOX, tSp = W(a, "spring") - .15, tN = W(b, "all") - .2, tD = W(b, "all", 1) - .15, tflip = W(b, "day"), tv = LT(c) - .2;
  const x = R1.x(t), stopped = t >= R1.stop, rob = stopped ? null : robotWalk(R1.phase(t), lerp(1, .5, clamp((t - R1.back) / (R1.stop - R1.back))));
  const win = spring(t, tSp, .4) * (1 - ss(tv - .5, tv - .1, t)), coil = eo((t - tSp - .2) / 1.2);
  // camera: follow, push in on the stop and the spring, pull out for the night ("time passes"), then hold wide
  const zin = ss(R1.stop - .6, R1.stop + .3, t) * (1 - ss(tN - .5, tN + .5, t)), zv = ss(tv - .4, tv + .3, t);
  const cam = [lerp(1.45, 2.3, zin) * lerp(1, .69, ss(tN - .5, tN + .5, t)) * lerp(1, 1.5, zv), lerp(lerp(x, 1090, ss(tN - .5, tN + .5, t)), 1180, zv), lerp(720, lerp(560, 700, zv), ss(tN - .5, tN + .5, t))];
  const night = ss(tN, tN + .7, t) * (1 - ss(tD, tD + .7, t)), day2 = t >= tflip;
  const crawl = ss(tN + .4, tD, t), bites = t > lerp(tN, tD, .75) ? 1 : 0;   // in the night the mealworm crawls over and eats
  const robot = stopped ? robotWalkStop(win, coil) : rob;
  // "It does not need water, food or air. It does not grow."
  let icons = ""; ["water", "food", "air"].forEach((k, i) => { const t0 = W(c, k) - .05, kk = spring(t, t0, .4); if (kk < .02) return; icons += TF(750 + i * 140, 300, kk * .95, iconChip(k) + `<g transform="rotate(-45)"><rect x="-56" y="-7" width="112" height="14" rx="7" fill="${P.ink}"/></g>` ); });
  const tg = W(c, "grow") - .1; icons += t >= tg ? TF(1170, 300, spring(t, tg, .4) * .95, iconChip("grow") + `<g transform="rotate(-45)"><rect x="-56" y="-7" width="112" height="14" rx="7" fill="${P.ink}"/></g>`) : "";
  const tT = W(c, "non-living") - .2;
  return boxView(t, { cam, farOver: OP(ss(tN + .5, tN + .9, t) * (1 - ss(tD - .2, tD + .3, t)) * .85, TF(842, 70, 1.5, `<g transform="rotate(-70)">${cicak("#9C92D6")}</g>`)), mode: "day", mode2: "night", mix: night, dark: night, st: { day: day2 ? 2 : 1 + crawl * .9, robotX: x, robot, bites, wx: lerp(-40, 12, eio(crawl)), wb: .3 + .25 * Math.sin(crawl * 20) * (crawl > 0 && crawl < 1 ? 1 : 0), cid: "cb2" } })
    + OP(zv, `<rect width="1920" height="1080" fill="${P.night}" opacity=".35"/>`) + icons + tag(t, tT, 960, 170, false, 1.4)
    + (t > tN - .2 && t < tv ? (() => { const [d, tf] = dayAt(t, [[0, 1], [tflip, 2]]); return counter(t, d, tf); })() : counter(t, t >= tflip ? 2 : 1, -9, 60, 110, .8))
    + speeded(t, tN, tflip + 1.2) + HUD(t); };
// the stopped robot: one fixed drawing (not one pixel moves), with the see-through window and its loose spring
function robotWalkStop(win, coil) { const p = (R1.steps ? R1.steps.length - 1 : 23) + .38, f = p % 1, odd = Math.floor(p) % 2, up = Math.sin(Math.PI * f) * .5;
  return robotRig({ liftL: odd ? 0 : up, liftR: odd ? up : 0, slideL: odd ? -3 : 3 * (f - .5), slideR: odd ? 3 * (f - .5) : -3, rock: (odd ? 1 : -1) * 1.6 * Math.cos(Math.PI * f), bob: 2 * Math.abs(Math.sin(Math.PI * f)), head: 0, ant: 0, arm: (odd ? 1 : -1) * 11 * Math.cos(Math.PI * f), key: p * 1.9, win, coil }); }

/* ============ the score after Round 1 ============ */
SC.r1score = (t, s) => { const tc = WE("h608", "right") + .15, tb = tc + .55;
  return bg("stage") + `<g transform="translate(960 ${n2(lerp(-200, 230, eo((t - s.t0) / .35)))})">${scoreboard(t, 0, 0, 1.5)}</g>` + coin(t, tc, 700, 400, "+1", "if you pointed right") + coin(t, tb, 1230, 400, "+1", "two good reasons")
    + TF(330, 760, spring(t, W("h608", "one") - .1, .4) * 1.5, `<g filter="url(#dropS)">${countHand(1)}</g>`) + (t > W("h608", "one") - .1 ? youPill(330, 520, 1.2) : "")
    + buddy("basil", 960, 1060, 400, t, { aura: true, poses: [[s.t0, "arms_crossed"], [tb, "oops"], [LT("b609") + .5, "sit"], [LE("b609") + .1, "cheer"], [LE("b609") + 1.2, "sit"]] }) + buddy("momo", 1560, 1050, 330, t, { aura: true, flip: true, poses: [[s.t0, "sit"], [LE("b609") - .3, "thinking"], [LT("m610") - .1, "sit"]] })
    + say("b609", 960, 560, t, { size: 46 }) + say("m610", 1470, 600, t, { size: 44, maxW: 600, tail: 60 }) + logo(t); };
if (P1) SCORE.push([WE("h608", "right") + .15, 1, 0], [WE("h608", "right") + .7, 1, 1]);
