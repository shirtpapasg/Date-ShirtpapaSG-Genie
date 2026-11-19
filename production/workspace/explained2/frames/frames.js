// frames.js: the style frames for "TheOneApp, Explained" (revamp). Pilot: P3 EP1, Living and non-living things.
// window.render(n) shows frame n (1..7). Each frame is a pure function: same input, same picture.
const F = {};
const lg = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`;
const rg = (id, stops, cx = .5, cy = .5, r = .5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</radialGradient>`;
let sd = 5; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;

/* ---------- small props used by several frames ---------- */
function hdbBlock(x, w, top, col, stripe) { let s = `<rect x="${x}" y="${top}" width="${w}" height="700" fill="${col}"/><rect x="${x}" y="${top}" width="${w}" height="14" fill="${stripe}"/><rect x="${x + w * .44}" y="${top - 26}" width="${w * .12}" height="30" fill="${col}"/>`;
  for (let y = top + 34; y < top + 600; y += 44) { s += `<rect x="${x + 8}" y="${y + 24}" width="${w - 16}" height="5" fill="#fff" opacity=".35"/>`;
    for (let c = 0; c < Math.floor(w / 40); c++) s += `<rect x="${x + 14 + c * 40}" y="${y}" width="22" height="18" rx="3" fill="${(c * 7 + y) % 5 < 2 ? "#FFE9A8" : "#7C6BB8"}" opacity=".8"/>`; }
  return s; }
function seedling(h = 120) { return `<path d="M0 0 C-6 ${-h * .4} 8 ${-h * .7} 0 ${-h}" fill="none" stroke="#3DAA5E" stroke-width="9" stroke-linecap="round"/>
  <g transform="translate(0 ${-h})"><path d="M0 0 C-50-50 -92-20 -88 10 C-50 26 -18 16 0 0z" fill="url(#gLeafLit)" stroke="#1F7F47" stroke-width="4"/><path d="M0 0 C50-56 96-30 92 4 C56 24 20 16 0 0z" fill="url(#gLeaf)" stroke="#1F7F47" stroke-width="4"/><path d="M0 0 L-60-4 M0 0 L62-8" stroke="#D8F6C8" stroke-width="2.5" opacity=".8"/></g>`; }
function snail() { return `<path d="M-90 40 Q-100 10 -70 6 L40 6 Q84 6 92-30 L100-58 M92-30 L116-50" fill="none" stroke="#C98E5E" stroke-width="7" stroke-linecap="round"/>
  <path d="M-96 44 Q-104 8 -66 8 L44 8 Q80 8 88-24 Q104-30 106-10 Q104 44 60 44z" fill="#F4C99A" stroke="#B7774A" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="100" cy="-60" r="7" fill="${P.ink}"/><circle cx="118" cy="-52" r="7" fill="${P.ink}"/>
  <circle cx="-14" cy="-22" r="60" fill="#E28A52" stroke="#9C4F26" stroke-width="5"/><path d="M-14-22 m-40 0 a40 40 0 1 1 40 40 a26 26 0 1 1 -26-26 a13 13 0 1 1 13 13" fill="none" stroke="#9C4F26" stroke-width="6" stroke-linecap="round"/>
  <path d="M-52-52 q30-26 66-8" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/>`; }
function rock() { return `<path d="M-80 40 Q-96-10 -50-40 Q-10-70 40-48 Q92-24 84 40z" fill="#A9A6C4" stroke="#6E6A92" stroke-width="5" stroke-linejoin="round"/><path d="M-50-30 Q-10-56 34-40" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".45"/><path d="M10-10 l24 18 M-30 6 l-14 16" stroke="#6E6A92" stroke-width="4" stroke-linecap="round" opacity=".6"/>`; }
function scoreboard(x, y, you, bud, s = 1) { return G(x, y, s, `<g filter="url(#drop)"><rect x="-290" y="-52" width="580" height="104" rx="52" fill="${P.ink}"/>
  <rect x="-282" y="-44" width="258" height="88" rx="44" fill="url(#gSun)"/><rect x="24" y="-44" width="258" height="88" rx="44" fill="#CFC2FF"/></g>
  ${T(-200, 12, "YOU", 34, P.ink, {ls: 2})}<rect x="-140" y="-34" width="92" height="68" rx="22" fill="${P.ink}"/>${T(-94, 20, you, 58, P.sun)}
  ${T(0, 14, "vs", 30, "#fff")}
  <rect x="48" y="-34" width="92" height="68" rx="22" fill="${P.ink}"/>${T(94, 20, bud, 58, "#DDD3FF")}${T(206, 12, "BUDDIES", 27, P.ink, {ls: 1})}`); }
function speech(x, y, w, h, text, size = 40, tail = -1) { return `<g filter="url(#dropS)"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff"/><path d="M${x + tail * w * .22} ${y + h / 2 - 4} l${tail * 34} 44 l${-tail * 4}-46z" fill="#fff"/></g>` + T(x, y + size * .34, text, size, P.ink, {w: 600}); }
const lower = (x, y, a, b) => `<g filter="url(#dropS)"><rect x="${x}" y="${y}" width="${40 + (a.length + b.length) * 17 + 60}" height="62" rx="31" fill="${P.ink}" opacity=".88"/></g><circle cx="${x + 32}" cy="${y + 31}" r="9" fill="${P.sun}"/>${T(x + 54, y + 41, `${a}<tspan fill="${P.sun}" dx="14">${b}</tspan>`, 30, "#fff", {a: "start", w: 600})}`;

/* ============ (a) cold open: a P3 pupil's HDB bedroom, late afternoon, silent ============ */
F[1] = () => { sd = 5;
  let floor = ""; for (let i = 0; i < 9; i++) floor += `<path d="M${-400 + i * 340} 1080 L${520 + i * 110} 700" stroke="#C98F5E" stroke-width="3" opacity=".35"/>`;
  return `<defs>${lg("aWall", [[0, "#8E86E0"], [.6, "#C5B1EE"], [1, "#F0C4C4"]])}${lg("aFloor", [[0, "#E7B284"], [1, "#B9794F"]])}${lg("aSky", [[0, "#7FB7FF"], [.55, "#FFC9A3"], [1, "#FFE9A8"]])}
  ${lg("aBeam", [[0, "#FFE27A", .75], [1, "#FFE27A", .08]])}${lg("aBed", [[0, "#3FD0C3"], [1, "#1B8F92"]])}${lg("aDesk", [[0, "#F6D3A4"], [1, "#D79D62"]])}
  <clipPath id="aWin"><rect x="250" y="150" width="600" height="400" rx="14"/></clipPath></defs>
  <rect width="1920" height="1080" fill="url(#aWall)"/>
  <rect y="700" width="1920" height="380" fill="url(#aFloor)"/>${floor}<rect y="690" width="1920" height="22" fill="#F7E3D3"/>
  <!-- window: the view is the far plane (soft, hazy) -->
  <g clip-path="url(#aWin)"><rect x="250" y="150" width="600" height="400" fill="url(#aSky)"/><circle cx="700" cy="300" r="150" fill="#FFF3B8" opacity=".9" filter="url(#b30)"/><circle cx="700" cy="300" r="52" fill="#FFF8D8"/>
    <g filter="url(#b2)">${hdbBlock(250, 150, 250, "#E9A7A0", "#FF8A66")}${hdbBlock(420, 110, 330, "#D9B3D6", "#9B6BFF")}${hdbBlock(770, 120, 210, "#F1B79A", "#2EC4B6")}
    <path d="M250 520 Q400 470 560 520 T850 500 V560 H250z" fill="#57B77A"/></g><rect x="250" y="150" width="600" height="400" fill="#FFD9A0" opacity=".18"/></g>
  <g fill="none" stroke="#F7F1FF" stroke-width="16"><rect x="250" y="150" width="600" height="400" rx="14"/><path d="M450 150 V550 M650 150 V550"/></g>
  <g stroke="#F7F1FF" stroke-width="5" opacity=".9"><path d="M250 250 H850 M250 350 H850 M250 450 H850"/></g>
  <rect x="220" y="545" width="660" height="30" rx="10" fill="#FBF3FF"/><rect x="220" y="570" width="660" height="10" fill="#B9A6E0" opacity=".6"/>
  <!-- wall: clock, shelf, drawing -->
  <g transform="translate(1090 240)"><circle r="62" fill="#FFF8EA" filter="url(#dropS)"/><circle r="62" fill="none" stroke="${P.coral}" stroke-width="10"/><path d="M0 0 L22 20 M0 0 L8-44" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/><circle r="6" fill="${P.ink}"/></g>
  <g transform="translate(1560 300)" filter="url(#dropS)"><rect x="-190" y="0" width="380" height="18" rx="6" fill="#F6D3A4"/><rect x="-160" y="-92" width="34" height="92" rx="5" fill="${P.blue}"/><rect x="-122" y="-78" width="28" height="78" rx="5" fill="${P.sun}"/><rect x="-90" y="-100" width="38" height="100" rx="5" fill="${P.coral}"/><rect x="-48" y="-70" width="30" height="70" rx="5" fill="${P.leaf}"/>
    <circle cx="80" cy="-44" r="44" fill="#5FB0FF"/><path d="M60-70 q20 10 10 30 q-14 6-18 22 M92-84 q24 14 26 38" stroke="#57B77A" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="72" y="-4" width="16" height="6" fill="${P.ink2}"/></g>
  <!-- the light: one warm key from the window -->
  <path d="M250 560 L850 560 L1260 1080 L120 1080z" fill="url(#aBeam)" style="mix-blend-mode:screen"/>
  <path d="M250 150 L850 150 L850 550 L250 550z" fill="#FFF3B8" opacity=".12" filter="url(#b30)"/>
  <!-- money plant on the ledge -->
  ${G(380, 488, 1.02, moneyPlant(), 'filter="url(#rim)"')}
  <!-- desk + hamster cage -->
  ${groundShadow(1110, 905, 240, 26, .25)}<rect x="900" y="640" width="420" height="34" rx="12" fill="url(#aDesk)"/><rect x="924" y="674" width="26" height="226" fill="#C98F5E"/><rect x="1270" y="674" width="26" height="226" fill="#C98F5E"/><rect x="900" y="640" width="420" height="10" rx="5" fill="#fff" opacity=".35"/>
  ${G(1110, 540, .88, cage(G(-36, 30, .62, hamster())), 'filter="url(#dropS)"')}
  <!-- bed + teddy -->
  ${groundShadow(1640, 960, 330, 30, .3)}
  <rect x="1380" y="560" width="600" height="250" rx="34" fill="#F2B880"/><rect x="1352" y="720" width="640" height="170" rx="36" fill="#FFF8EA"/>
  <path d="M1352 760 Q1500 720 1660 770 T1992 750 V880 Q1992 916 1956 916 H1388 Q1352 916 1352 880z" fill="url(#aBed)"/>
  <g fill="#fff" opacity=".35">${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${1420 + i * 84}" cy="${830 + (i % 2) * 34}" r="12"/>`).join("")}</g>
  <rect x="1660" y="640" width="250" height="110" rx="44" fill="#FFF8EA" filter="url(#dropS)"/>
  <rect x="1372" y="900" width="36" height="70" rx="10" fill="#C98F5E"/>
  ${G(1540, 668, 1.05, teddy(), 'filter="url(#rim)"')}
  <!-- the wind-up robot walking through the beam -->
  <path d="M640 965 Q470 990 300 1010 Q520 1030 760 975z" fill="${P.ink}" opacity=".3" filter="url(#b4)"/>
  ${G(700, 862, 1.22, robot(1), 'filter="url(#rim)"')}
  <g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".85"><path d="M868 820 q22 26 4 56"/><path d="M898 800 q34 44 6 94"/></g>
  <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"><path d="M560 968 h-40 M548 940 h-26"/></g>
  <!-- dust in the beam -->
  ${Array.from({length: 26}, () => `<circle cx="${300 + rnd() * 760}" cy="${580 + rnd() * 420}" r="${2 + rnd() * 5}" fill="#FFF8D8" opacity="${.25 + rnd() * .5}"/>`).join("")}
  <!-- near plane: school bag and chair, dark and soft -->
  <g filter="url(#b10)" fill="#2B2147" opacity=".92"><path d="M-40 1080 V820 Q-30 730 90 730 H210 Q320 740 330 850 V1080z"/><path d="M60 740 Q150 640 240 740" fill="none" stroke="#2B2147" stroke-width="26"/></g>
  <g filter="url(#b10)" fill="#3B2A6E" opacity=".9"><rect x="1700" y="930" width="300" height="60" rx="20"/><rect x="1860" y="700" width="46" height="400" rx="16"/></g>
  ${vignette(.9)}${grain()}
  ${lower(1130, 984, "Tampines, Singapore", "4.10 pm")}`; };

/* ============ (b) the shrink: you are tiny, looking up into the money plant ============ */
F[2] = () => { sd = 21;
  const bigLeaf = (x, y, r, a, lit, extra = "") => `<g transform="translate(${x} ${y}) rotate(${a})" ${extra}>${leaf(r, lit)}</g>`;
  return `<defs>${rg("bBg", [[0, "#FFFBD6"], [.35, "#E4F79A"], [.7, "#6FCF7F"], [1, "#157A52"]], .56, .3, .8)}${rg("bYou", [[.6, "#FFC83A", 0], [1, "#FFC83A", .55]], .5, .5, .72)}
  ${lg("bStem", [[0, "#B9F08A"], [1, "#2F9A55"]], 1, 0)}${lg("bSoil", [[0, "#6B4630"], [1, "#2E1C1F"]])}${lg("bNew", [[0, "#F4FFB0"], [1, "#8EE06E"]], 1, 0)}</defs>
  <rect width="1920" height="1080" fill="url(#bBg)"/>
  <!-- far plane: out-of-focus leaves and window light -->
  <g filter="url(#b30)" opacity=".8">${bigLeaf(260, 250, 330, 200, false)}${bigLeaf(1700, 420, 380, 150, false)}${bigLeaf(880, -40, 300, 180, true)}</g>
  <g opacity=".7">${Array.from({length: 16}, () => `<circle cx="${rnd() * 1920}" cy="${rnd() * 620}" r="${22 + rnd() * 50}" fill="#FFFBD6" opacity="${.12 + rnd() * .2}" filter="url(#b4)"/>`).join("")}</g>
  <!-- light shafts -->
  <g style="mix-blend-mode:screen" opacity=".5"><path d="M1040-40 L1260-40 L760 1080 L420 1080z" fill="#FFF6B8" filter="url(#b30)"/><path d="M1400-40 L1500-40 L1320 1080 L1160 1080z" fill="#FFF6B8" filter="url(#b30)"/></g>
  <!-- mid plane: the stem rises from where we stand; huge backlit leaves overhead -->
  <path d="M900 1100 C860 760 1080 560 1010 260 C990 160 1040 60 1100-40" fill="none" stroke="#1F7F47" stroke-width="86" stroke-linecap="round"/>
  <path d="M900 1100 C860 760 1080 560 1010 260 C990 160 1040 60 1100-40" fill="none" stroke="url(#bStem)" stroke-width="74" stroke-linecap="round"/>
  <path d="M872 1040 C850 760 1050 560 984 270" fill="none" stroke="#E9FFC0" stroke-width="10" stroke-linecap="round" opacity=".6"/>
  <path d="M1004 420 C1150 380 1300 330 1400 250" fill="none" stroke="#2F9A55" stroke-width="30" stroke-linecap="round"/>
  <path d="M990 600 C820 560 660 470 560 380" fill="none" stroke="#2F9A55" stroke-width="34" stroke-linecap="round"/>
  ${bigLeaf(1500, 190, 300, -118, true, 'filter="url(#rim)"')}
  ${bigLeaf(430, 300, 330, 122, true, 'filter="url(#rim)"')}
  <!-- the new leaf, still rolled up: the plant is growing -->
  <g transform="translate(1012 250) rotate(-16)" filter="url(#rim)"><path d="M-6 30 C-40-60 -30-190 6-290 C40-190 40-60 12 30z" fill="url(#bNew)" stroke="#3DAA5E" stroke-width="6" stroke-linejoin="round"/><path d="M2 20 C-14-70 -6-180 6-270" fill="none" stroke="#5CC76B" stroke-width="5" stroke-linecap="round"/><path d="M-22-60 q20-26 46-10" fill="none" stroke="#5CC76B" stroke-width="4"/></g>
  <circle cx="1010" cy="60" r="120" fill="#FFFBD6" opacity=".55" filter="url(#b30)"/>
  <!-- a water drop on the leaf: close-up detail -->
  <g transform="translate(520 430)"><ellipse rx="54" ry="44" fill="#DFF8FF" opacity=".55" stroke="#fff" stroke-width="4"/><ellipse cx="-18" cy="-16" rx="14" ry="9" fill="#fff" opacity=".95"/><ellipse cx="14" cy="18" rx="22" ry="10" fill="#8EE06E" opacity=".5"/></g>
  <!-- near plane: soil crumbs as boulders, soft and dark -->
  <path d="M-40 1080 V900 Q260 820 520 880 Q760 930 960 900 Q1240 850 1500 890 Q1760 930 1960 860 V1080z" fill="url(#bSoil)"/>
  <g filter="url(#b4)">${[[140, 900, 150, "#4A2E25"], [520, 960, 120, "#5A3A2A"], [1420, 950, 140, "#4A2E25"], [1800, 920, 170, "#3A2420"], [1120, 1010, 110, "#5A3A2A"]].map(([x, y, r, c]) => `<path d="M${x - r} ${y + r * .5} Q${x - r * 1.1} ${y - r * .4} ${x - r * .3} ${y - r * .7} Q${x + r * .6} ${y - r * .9} ${x + r} ${y} Q${x + r * 1.1} ${y + r * .6} ${x} ${y + r * .7}z" fill="${c}"/><path d="M${x - r * .5} ${y - r * .5} Q${x} ${y - r * .8} ${x + r * .5} ${y - r * .4}" stroke="#C99A6E" stroke-width="8" stroke-linecap="round" fill="none" opacity=".5"/>`).join("")}</g>
  <!-- this is you: a warm edge, your hands, the YOU tag -->
  <rect width="1920" height="1080" fill="url(#bYou)"/>
  <g filter="url(#drop)"><g transform="translate(610 1010) rotate(-62)">${hand("#FFE2C2")}</g><g transform="translate(1310 1010) rotate(62) scale(-1 1)">${hand("#FFE2C2")}</g></g>
  ${pill(960, 1010, 170, 72, "url(#gSun)", "YOU", 42, P.ink, {ls: 3})}
  ${grain()}
  ${speech(960, 118, 980, 104, "It never walks. It never talks. Is it <tspan fill=\"#1F8A4C\" font-weight=\"700\">alive</tspan>?", 48, 1).replace(/<path[^>]*z" fill="#fff"\/>/, "")}
  ${pill(250, 118, 330, 62, P.ink, "You: the size of an ant", 27, "#fff", {w: 600})}`; };

/* ============ (c) the lock-in ============ */
F[3] = () => { sd = 9;
  const R = 196, C = 2 * Math.PI * R, left = .62;
  const card = (x, grad, deep, label, sub, flip) => `<g transform="translate(${x} 470) rotate(${flip * 2.2})"><g filter="url(#drop)"><rect x="-290" y="-250" width="580" height="500" rx="56" fill="${deep}"/><rect x="-290" y="-262" width="580" height="500" rx="56" fill="url(#${grad})"/></g>
    <rect x="-270" y="-246" width="540" height="150" rx="44" fill="#fff" opacity=".16"/>
    <g transform="translate(${-flip * 20} -80) scale(${-flip * 1.35} 1.35)" filter="url(#dropS)">${hand("#fff")}</g>
    ${T(0, 120, label, label.length > 7 ? 86 : 108, "#fff", {ls: 2})}
    <g><rect x="-150" y="158" width="300" height="56" rx="28" fill="${P.ink}" opacity=".35"/>${T(0, 197, sub, 32, "#fff", {w: 600, ls: 1})}</g></g>`;
  return `<defs>${rg("cBg", [[0, "#4A36B0"], [.55, "#251B5C"], [1, "#120E2E"]], .5, .42, .75)}${lg("cFloor", [[0, "#3B2A8C", 0], [1, "#0D0A24", .9]])}</defs>
  <rect width="1920" height="1080" fill="url(#cBg)"/>
  <g opacity=".5">${Array.from({length: 40}, () => `<circle cx="${rnd() * 1920}" cy="${rnd() * 760}" r="${1.5 + rnd() * 3}" fill="#fff" opacity="${.15 + rnd() * .4}"/>`).join("")}</g>
  <g style="mix-blend-mode:screen" opacity=".55"><path d="M860-20 H1060 L1320 800 H600z" fill="#FFE9A8" opacity=".35" filter="url(#b30)"/></g>
  <ellipse cx="320" cy="470" rx="380" ry="330" fill="${P.blue}" opacity=".3" filter="url(#b60)"/><ellipse cx="1600" cy="470" rx="380" ry="330" fill="${P.orange}" opacity=".3" filter="url(#b60)"/>
  ${card(330, "gBlue", P.blueDeep, "LIVING", "point LEFT", 1)}${card(1590, "gOrange", P.orangeDeep, "NON-LIVING", "point RIGHT", -1)}
  <!-- the ring timer with the thing in question -->
  <circle cx="960" cy="470" r="${R + 34}" fill="${P.night}" opacity=".7"/><circle cx="960" cy="470" r="${R - 22}" fill="#fff" opacity=".1"/>
  <ellipse cx="960" cy="590" rx="120" ry="20" fill="${P.ink}" opacity=".5" filter="url(#b4)"/>
  ${G(960, 500, 1.18, robot(0), 'filter="url(#rim)"')}
  <circle cx="960" cy="470" r="${R}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="30"/>
  <circle cx="960" cy="470" r="${R}" fill="none" stroke="${P.sun}" stroke-width="42" opacity=".5" filter="url(#b10)" stroke-dasharray="${C * left} ${C}" transform="rotate(-90 960 470) scale(1 -1) translate(0 -940)"/>
  <circle cx="960" cy="470" r="${R}" fill="none" stroke="url(#gSun)" stroke-width="30" stroke-linecap="round" stroke-dasharray="${C * left} ${C}" transform="rotate(-90 960 470) scale(1 -1) translate(0 -940)"/>
  <g transform="translate(960 ${470 + R})" filter="url(#dropS)"><circle r="54" fill="url(#gSun)"/><circle r="54" fill="none" stroke="${P.night}" stroke-width="8"/>${T(0, 24, "3", 70, P.ink)}</g>
  <!-- question -->
  ${T(960, 106, "A wind-up toy robot. Is it a…", 62, "#fff", {w: 600})}
  ${T(960, 176, "LOCK IT IN!", 40, P.sun, {ls: 8})}
  ${logoPill(44, 34, .86)}${scoreboard(1640, 70, 0, 0, .62)}
  <!-- the buddies wait: their picks stay face down until you lock in -->
  <rect y="800" width="1920" height="280" fill="url(#cFloor)"/>
  ${[["pip", "sit", 600], ["basil", "stand", 960], ["momo", "sit", 1320]].map(([w, p, x]) => `${buddy(w, p, x, 1056, 224, {auraO: .85})}
    <g transform="translate(${x + 128} 938) rotate(8)" filter="url(#dropS)"><rect x="-44" y="-56" width="88" height="112" rx="18" fill="${P.ink}" stroke="${P[w]}" stroke-width="6"/>${T(0, 22, "?", 64, P[w])}</g>`).join("")}
  ${T(960, 838, "The buddies lock in after you", 30, "#DDD3FF", {w: 500, ls: 1})}
  ${vignette(.7)}${grain(.14)}`; };

/* ============ (d) Sort it: two gates, a two-group table, the scoreboard ============ */
F[4] = () => { sd = 13;
  const gate = (x, grad, deep, label) => `<g transform="translate(${x} 268)"><g filter="url(#drop)"><path d="M-250 70 V-40 Q-250-150 -140-150 H140 Q250-150 250-40 V70 H170 V-30 Q170-74 126-74 H-126 Q-170-74 -170-30 V70z" fill="url(#${grad})"/></g>
    <path d="M-236-40 Q-236-136 -140-136 H140" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".4"/>
    <rect x="-250" y="52" width="80" height="26" rx="8" fill="${deep}"/><rect x="170" y="52" width="80" height="26" rx="8" fill="${deep}"/>
    ${T(0, -88, label, label.length > 7 ? 50 : 58, "#fff", {ls: 2})}</g>`;
  const cell = (x, y, inner, s, name) => `${groundShadow(x, y + 78, 84, 14, .2)}${G(x, y, s, inner)}${T(x, y + 132, name, 32, P.ink, {w: 600})}`;
  return `<defs>${lg("dBg", [[0, "#BFE6FF"], [.6, "#E9F4FF"], [1, "#FFF3DC"]])}${rg("dSun", [[0, "#fff", .9], [1, "#fff", 0]])}</defs>
  <rect width="1920" height="1080" fill="url(#dBg)"/>
  <circle cx="960" cy="300" r="620" fill="url(#dSun)"/>
  <g opacity=".5" filter="url(#b4)"><ellipse cx="200" cy="200" rx="180" ry="52" fill="#fff"/><ellipse cx="1740" cy="330" rx="210" ry="56" fill="#fff"/><ellipse cx="1500" cy="130" rx="120" ry="34" fill="#fff"/></g>
  <!-- chutes from gate to table -->
  <path d="M510 330 H870 L900 520 H480z" fill="${P.blue}" opacity=".16"/><path d="M1050 330 H1410 L1440 520 H1020z" fill="${P.orange}" opacity=".2"/>
  ${gate(690, "gBlue", P.blueDeep, "LIVING")}${gate(1230, "gOrange", P.orangeDeep, "NON-LIVING")}
  <!-- the two-group table -->
  <g filter="url(#drop)"><rect x="330" y="500" width="1260" height="500" rx="44" fill="url(#gPaper)"/></g>
  <path d="M330 592 V544 Q330 500 374 500 H960 V592z" fill="url(#gBlue)"/><path d="M960 500 H1546 Q1590 500 1590 544 V592 H960z" fill="url(#gOrange)"/>
  ${T(645, 562, "Living things", 46, "#fff")}${T(1275, 562, "Non-living things", 46, "#fff")}
  <path d="M960 592 V1000" stroke="${P.ink}" stroke-width="5" opacity=".18" stroke-dasharray="4 14" stroke-linecap="round"/>
  ${cell(500, 760, hamster(), .92, "hamster")}${cell(790, 772, moneyPlant(), .62, "money plant")}${cell(1130, 772, teddy(), .68, "teddy bear")}
  <!-- the robot drops through its gate: stretch on the way down -->
  <g opacity=".55"><path d="M1380 120 V300 M1430 150 V330 M1480 120 V300" stroke="${P.orange}" stroke-width="12" stroke-linecap="round" opacity=".5"/></g>
  <g opacity=".22">${G(1430, 250, .74, robot(0))}</g><g opacity=".4">${G(1430, 340, .74, robot(0))}</g>
  <g transform="translate(1430 470) scale(.7 .84)" filter="url(#dropS)">${robot(0)}</g>
  <ellipse cx="1430" cy="842" rx="70" ry="12" fill="${P.ink}" opacity=".12"/>
  ${T(1430, 904, "toy robot", 32, P.ink, {w: 600, x: 'opacity=".35"'})}
  <!-- scoreboard + identity -->
  ${logoPill(44, 34, .86)}${scoreboard(1610, 78, 2, 1, .78)}
  ${pill(960, 80, 300, 76, P.ink, "SORT IT!", 44, P.sun, {ls: 4})}
  <!-- buddies -->
  ${buddy("pip", "happy", 170, 1040, 280)}${buddy("basil", "cheer", 1760, 1040, 280, {flip: true})}
  ${speech(238, 660, 300, 84, "Fair and square!", 34, -1)}
  ${grain(.12)}`; };

/* ============ (e) the Mark Sentence card ============ */
F[5] = () => { sd = 3;
  return `<defs>${rg("eBg", [[0, "#5B45C9"], [.6, "#2B1F6B"], [1, "#150F38"]], .62, .45, .8)}</defs>
  <rect width="1920" height="1080" fill="url(#eBg)"/>
  <g opacity=".35">${Array.from({length: 9}, (_, i) => `<circle cx="${1100 + Math.cos(i) * 700}" cy="${520 + Math.sin(i * 1.7) * 420}" r="${60 + (i % 4) * 34}" fill="#8E7BFF" opacity=".25" filter="url(#b10)"/>`).join("")}</g>
  <ellipse cx="1120" cy="560" rx="760" ry="360" fill="#FFE9A8" opacity=".14" filter="url(#b60)"/>
  <!-- the card -->
  <g transform="rotate(-1.2 1130 540)">
    <g filter="url(#drop)"><rect x="560" y="250" width="1180" height="590" rx="50" fill="#D9C7A8"/><rect x="548" y="234" width="1180" height="590" rx="50" fill="url(#gPaper)"/></g>
    <rect x="548" y="234" width="26" height="590" rx="0" fill="url(#gSun)" clip-path="inset(0 round 50px 0 0 50px)"/>
    <g filter="url(#dropS)"><rect x="620" y="186" width="470" height="92" rx="46" fill="url(#gSun)"/></g>
    <g transform="translate(672 232)"><circle r="30" fill="${P.ink}"/><path d="M-14 0 l10 11 l19-22" fill="none" stroke="${P.sun}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>
    ${T(888, 248, "MARK SENTENCE", 42, P.ink, {ls: 3})}
    ${T(1650, 300, "1 of 4", 30, P.ink2, {w: 600, a: "end", x: 'opacity=".7"'})}
    <foreignObject x="640" y="330" width="1020" height="360"><div xmlns="http://www.w3.org/1999/xhtml" class="mark">Living things need <b>air</b>, <b>food</b> and <b>water</b> to stay alive.</div></foreignObject>
    <path d="M640 716 H1650" stroke="${P.ink}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round" opacity=".3"/>
    ${T(640, 776, "Primary 3 Science  ·  Diversity  ·  Living and non-living things", 30, P.ink2, {a: "start", w: 500})}
  </g>
  ${buddy("momo", "cheer", 300, 900, 400)}
  ${speech(330, 330, 380, 96, "Say it with me!", 42, 1)}
  ${logoPill(44, 34, .86)}${scoreboard(1640, 70, 3, 1, .62)}
  ${T(1140, 960, "Write it this way in your exam.", 36, "#DDD3FF", {w: 500})}
  ${grain(.14)}`; };

/* ============ (f) the class trip: a farm in the Kranji countryside ============ */
function goat(c = "#FFF8EA") { const L = "#B79C7A"; return `<g stroke="${L}" stroke-width="5" stroke-linejoin="round" fill="${c}"><rect x="-56" y="20" width="16" height="60" rx="7"/><rect x="-24" y="24" width="16" height="56" rx="7"/><rect x="24" y="24" width="16" height="56" rx="7"/><rect x="50" y="20" width="16" height="60" rx="7"/>
  <ellipse cx="0" cy="0" rx="80" ry="46"/><path d="M-76-10 q-22-10-26 8" fill="none"/><path d="M60-30 L80-84 Q112-96 124-66 Q128-40 104-34 Q84-20 60-10z"/>
  <path d="M84-84 q-14-30 4-40 M100-86 q-2-30 20-34" fill="none" stroke="#C9B79A" stroke-width="7" stroke-linecap="round"/><path d="M76-78 q-26-4-30 12 q20 4 30-12z"/><path d="M104-36 q4 20-4 30" fill="none"/></g>
  <circle cx="104" cy="-66" r="5.5" fill="${P.ink}"/><ellipse cx="121" cy="-54" rx="5" ry="3.5" fill="#F0A0A8"/><path d="M-40-36 q40-14 80 0" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/>`; }
function hen(c = "#F2A65A") { return `<path d="M-12 44 v26 M10 44 v26" stroke="#F0B429" stroke-width="6" stroke-linecap="round"/><g stroke="#B36A2A" stroke-width="5" stroke-linejoin="round"><path d="M-60-10 Q-78-50 -44-40 Q-40 30 10 46 Q56 46 54 0 Q54-20 44-34 Q50-70 20-66 Q0-60 4-30 Q-20-10 -60-10z" fill="${c}"/></g>
  <path d="M22-66 q4-20 14-8 q8-14 12 6" fill="${P.coral}" stroke="#C4502E" stroke-width="4"/><path d="M50-44 l22 8 l-22 8z" fill="#F0B429"/><circle cx="36" cy="-46" r="5" fill="${P.ink}"/><path d="M-30 0 q20 24 44 6" fill="none" stroke="#B36A2A" stroke-width="5" stroke-linecap="round"/>`; }
function tractor() { return `<g stroke="#A93B2A" stroke-width="6" stroke-linejoin="round"><path d="M-150 20 H40 V-110 H-70 L-96-40 H-150z" fill="#FF6F61"/><rect x="40" y="-50" width="150" height="80" rx="14" fill="#FF6F61"/></g>
  <path d="M-58-96 H24 V-44 H-80z" fill="#BFE6FF" stroke="#5E9BD6" stroke-width="5"/><rect x="150" y="-110" width="16" height="64" rx="6" fill="${P.ink2}"/><rect x="50" y="-40" width="120" height="12" rx="6" fill="#fff" opacity=".35"/>
  <g><circle cx="-70" cy="40" r="76" fill="${P.ink}"/><circle cx="-70" cy="40" r="40" fill="url(#gSun)"/><circle cx="-70" cy="40" r="12" fill="${P.ink}"/><circle cx="140" cy="62" r="52" fill="${P.ink}"/><circle cx="140" cy="62" r="26" fill="url(#gSun)"/><circle cx="140" cy="62" r="8" fill="${P.ink}"/></g>`; }
function pump() { return `<g stroke="#1F5FD0" stroke-width="6" stroke-linejoin="round"><rect x="-70" y="-30" width="140" height="80" rx="18" fill="url(#gBlue)"/><circle cx="-10" cy="-50" r="36" fill="url(#gBlue)"/><rect x="60" y="-8" width="60" height="26" rx="8" fill="url(#gMetal)" stroke="#7F89A8"/></g>
  <rect x="-84" y="50" width="168" height="18" rx="8" fill="${P.ink2}"/><circle cx="-10" cy="-50" r="12" fill="#fff" opacity=".8"/><path d="M120 6 Q190 6 200 60 Q206 100 260 104" fill="none" stroke="#2C9A55" stroke-width="16" stroke-linecap="round"/><rect x="-50" y="-16" width="70" height="10" rx="5" fill="#fff" opacity=".35"/>`; }
function scarecrow() { return `<path d="M0 150 V-60 M-110-20 H110" stroke="#B9774A" stroke-width="14" stroke-linecap="round"/>
  <path d="M-110-44 H110 L96 10 H40 V90 H-40 V10 H-96z" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="5" stroke-linejoin="round"/><path d="M-40 30 H40" stroke="#1F5FD0" stroke-width="4"/><rect x="-14" y="20" width="26" height="26" fill="${P.sun}" stroke="#C98200" stroke-width="3"/>
  <g stroke="#E0B040" stroke-width="6" stroke-linecap="round"><path d="M-112-34 l-26-10 M-112-20 l-30 2 M-110-8 l-24 14 M112-34 l26-10 M112-20 l30 2 M110-8 l24 14"/></g>
  <circle cx="0" cy="-92" r="50" fill="#FFE2B0" stroke="#C9973A" stroke-width="5"/><path d="M-66-126 H66 L40-176 H-40z" fill="#D79D62" stroke="#9C6A32" stroke-width="5" stroke-linejoin="round"/><rect x="-80" y="-134" width="160" height="16" rx="8" fill="#D79D62" stroke="#9C6A32" stroke-width="5"/>
  <path d="M-24-100 l12 12 m0-12 l-12 12 M12-100 l12 12 m0-12 l-12 12" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><path d="M-20-66 q20 14 40 0" fill="none" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/>`; }
F[6] = () => { sd = 31;
  let beds = ""; const vx = 1020, vy = 520;
  for (let i = 0; i < 6; i++) { const x0 = 420 + i * 250, x1 = x0 + 190, k = .2; const ax = vx + (x0 - vx) * k, bx = vx + (x1 - vx) * k;
    beds += `<path d="M${x0} 1080 L${ax} ${vy + 60} L${bx} ${vy + 60} L${x1} 1080z" fill="#7A5236"/><path d="M${x0 + 8} 1080 L${ax + 2} ${vy + 60} L${ax + 12} ${vy + 60} L${x0 + 50} 1080z" fill="#9A6A46" opacity=".8"/>`;
    for (let j = 0; j < 9; j++) { const f = Math.pow(j / 9, 1.8), y = vy + 76 + f * 470, s = .25 + f * 1.1, cx = (vx + ((x0 + x1) / 2 - vx) * (k + (1 - k) * ((y - vy - 60) / (1080 - vy - 60))));
      beds += `<g transform="translate(${cx} ${y}) scale(${s})"><ellipse cx="-22" cy="-14" rx="26" ry="20" fill="#3DAA5E"/><ellipse cx="22" cy="-14" rx="26" ry="20" fill="#56C46E"/><ellipse cx="0" cy="-32" rx="24" ry="22" fill="#8EE06E"/></g>`; } }
  return `<defs>${lg("fSky", [[0, "#58B4FF"], [.55, "#BFE6FF"], [1, "#FFF3DC"]])}${lg("fGrass", [[0, "#9BE07A"], [1, "#3FA65C"]])}${lg("fRoof", [[0, "#DCE4F5"], [1, "#9AA6C6"]])}${lg("fShed", [[0, "#FFE2B0"], [1, "#F0B878"]])}</defs>
  <rect width="1920" height="1080" fill="url(#fSky)"/>
  <circle cx="1560" cy="170" r="210" fill="#FFF6B8" opacity=".8" filter="url(#b30)"/><circle cx="1560" cy="170" r="74" fill="#FFF8D8"/>
  <g opacity=".85" filter="url(#b2)"><ellipse cx="320" cy="160" rx="210" ry="54" fill="#fff"/><ellipse cx="470" cy="128" rx="130" ry="50" fill="#fff"/><ellipse cx="1100" cy="230" rx="170" ry="40" fill="#fff"/></g>
  <!-- far plane: tree line, hazy and blue-green -->
  <g filter="url(#b4)"><path d="M0 520 Q120 400 260 470 Q380 380 520 460 Q680 360 820 450 Q980 390 1120 460 Q1300 380 1460 450 Q1640 380 1920 470 V600 H0z" fill="#7CC7A8"/>
  <path d="M0 540 Q200 470 420 520 Q700 450 980 520 Q1300 460 1920 530 V620 H0z" fill="#5DB98A"/></g>
  ${[90, 1840, 1280].map((x, i) => `<g transform="translate(${x} 520) scale(${1 - i * .12})" filter="url(#b2)"><path d="M0 0 q-10-120 6-230" stroke="#9C6A46" stroke-width="16" fill="none"/><g fill="#3FA65C"><path d="M6-230 q-120-30-150 40 q90-40 150-40z M6-230 q120-30 150 40 q-90-40-150-40z M6-230 q-80-90-150-50 q100 0 150 50z M6-230 q80-90 150-50 q-100 0-150 50z"/></g></g>`).join("")}
  <rect y="560" width="1920" height="520" fill="url(#fGrass)"/>
  <path d="M0 640 Q500 590 1920 660 V700 Q500 640 0 690z" fill="#fff" opacity=".12"/>
  <!-- shed and water tank -->
  <g transform="translate(560 520)"><rect x="-200" y="-90" width="400" height="170" fill="url(#fShed)" stroke="#C98F5E" stroke-width="5"/><path d="M-236-90 L-170-170 H170 L236-90z" fill="url(#fRoof)" stroke="#7F89A8" stroke-width="5" stroke-linejoin="round"/>
    ${[-150, -90, -30, 30, 90, 150].map(x => `<path d="M${x * 1.25}-92 L${x}-168" stroke="#7F89A8" stroke-width="3" opacity=".6"/>`).join("")}<rect x="-60" y="-30" width="120" height="110" rx="6" fill="#7A5236"/><rect x="100" y="-50" width="70" height="56" rx="6" fill="#BFE6FF" stroke="#C98F5E" stroke-width="5"/></g>
  <g transform="translate(860 510)"><rect x="-46" y="-110" width="92" height="120" rx="20" fill="#2EC4B6" stroke="#188A80" stroke-width="5"/><path d="M-46-70 H46 M-46-30 H46" stroke="#188A80" stroke-width="4" opacity=".6"/><path d="M-30 10 V70 M30 10 V70" stroke="#7F89A8" stroke-width="8"/></g>
  <!-- tractor (back right) -->
  ${groundShadow(1560, 660, 200, 20, .25)}${G(1560, 560, .9, tractor())}
  <!-- vegetable beds in perspective -->
  ${beds}
  <!-- scarecrow in the beds, pump by the beds -->
  ${groundShadow(1010, 760, 70, 12, .25)}${G(1010, 640, .78, scarecrow(), 'filter="url(#rim)"')}
  ${groundShadow(1500, 880, 120, 16, .25)}${G(1480, 810, .95, pump(), 'filter="url(#rim)"')}
  <!-- goat pen (left) -->
  <g>${groundShadow(250, 800, 110, 14, .22)}${G(250, 712, 1.05, goat(), 'filter="url(#rim)"')}${groundShadow(100, 742, 70, 10, .2)}${G(96, 680, .7, goat("#E9D2B4"))}</g>
  <g stroke="#B9774A" stroke-width="14" stroke-linecap="round"><path d="M-20 770 H400 M-20 830 H400"/><path d="M40 730 V880 M220 730 V880 M400 730 V880" stroke="#9C6A46"/></g>
  <!-- hens -->
  ${G(1250, 930, .9, hen())}${G(1370, 990, 1.05, hen("#FFF3DC"))}${G(1700, 800, .7, hen("#C9774A"))}
  <!-- the buddies look straight at you and ask for help -->
  ${buddy("pip", "happy", 560, 1070, 300, {aura: false})}${buddy("momo", "cheer", 840, 1076, 270, {aura: false})}${buddy("basil", "cheer", 300, 1076, 250, {aura: false})}
  ${speech(700, 690, 620, 96, "Help us sort the whole farm!", 42, -1)}
  <!-- near plane: soft leaves -->
  <g filter="url(#b10)" opacity=".95"><g transform="translate(1840 80) rotate(200)">${leaf(240, false, false)}</g><g transform="translate(1700 -40) rotate(160)">${leaf(200, true, false)}</g><g transform="translate(-20 60) rotate(120)">${leaf(220, false, false)}</g></g>
  ${vignette(.55)}${grain(.13)}
  ${logoPill(44, 34, .86)}${lower(1260, 40, "Class trip:", "Kranji countryside")}`; };

/* ============ (g) the 30-day box ============ */
F[7] = () => { sd = 17;
  const bx = 400, by = 300, bw = 1120, bh = 600;
  return `<defs>${rg("gBg", [[0, "#5A3F9E"], [.5, "#2B1F6B"], [1, "#120E2E"]], .5, .5, .8)}${lg("gSoil", [[0, "#7A5236"], [1, "#3A2420"]])}${lg("gGlass", [[0, "#BFE6FF", .2], [.5, "#fff", .04], [1, "#BFE6FF", .16]], 1, 1)}${lg("gDesk", [[0, "#B9794F"], [1, "#5A3626"]])}
  <clipPath id="gBox"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="34"/></clipPath>${rg("gLamp", [[0, "#FFE9A8", .85], [1, "#FFE9A8", 0]])}</defs>
  <rect width="1920" height="1080" fill="url(#gBg)"/>
  <!-- far plane: the bedroom, out of focus (bokeh) -->
  <g filter="url(#b30)"><rect x="80" y="80" width="460" height="420" rx="20" fill="#3C5FB8" opacity=".6"/><circle cx="1650" cy="230" r="170" fill="#FFB86B" opacity=".55"/><rect x="1380" y="560" width="600" height="220" rx="40" fill="#2EC4B6" opacity=".35"/></g>
  ${Array.from({length: 22}, () => { const r = 14 + rnd() * 40; return `<circle cx="${rnd() * 1920}" cy="${rnd() * 560}" r="${r}" fill="${["#FFE9A8", "#FFB38A", "#B9A6FF", "#7FE3C4"][Math.floor(rnd() * 4)]}" opacity="${.1 + rnd() * .22}" filter="url(#b4)"/>`; }).join("")}
  <rect y="880" width="1920" height="200" fill="url(#gDesk)"/><rect y="880" width="1920" height="8" fill="#FFD9A8" opacity=".5"/>
  <ellipse cx="960" cy="560" rx="760" ry="420" fill="url(#gLamp)" opacity=".45"/>
  ${groundShadow(960, 912, 600, 30, .5)}
  <!-- inside the box -->
  <g clip-path="url(#gBox)"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#E9F4FF" opacity=".16"/>
    <ellipse cx="960" cy="420" rx="460" ry="220" fill="#FFF3B8" opacity=".3" filter="url(#b30)"/>
    <path d="M${bx} 760 Q600 730 800 752 Q1040 778 1240 748 Q1400 728 ${bx + bw} 756 V${by + bh} H${bx}z" fill="url(#gSoil)"/>
    <path d="M${bx} 760 Q600 730 800 752 Q1040 778 1240 748 Q1400 728 ${bx + bw} 756" fill="none" stroke="#A9744E" stroke-width="8" opacity=".7"/>
    ${Array.from({length: 40}, () => `<circle cx="${bx + rnd() * bw}" cy="${775 + rnd() * 110}" r="${3 + rnd() * 6}" fill="#2E1C1F" opacity=".5"/>`).join("")}
    <!-- time-lapse ghosts: where the bean was on earlier days -->
    <g opacity=".22">${G(650, 748, .9, seedling(40))}</g><g opacity=".38">${G(650, 748, .9, seedling(110))}</g>
    ${G(650, 748, 1, seedling(210), 'filter="url(#rim)"')}
    <ellipse cx="650" cy="752" rx="24" ry="13" fill="#F3D2AC" stroke="#B9774A" stroke-width="4"/>
    <path d="M650 760 q-10 40 -30 60 M650 760 q14 34 34 50 M650 760 v70" stroke="#FFF3DC" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>
    <!-- money plant cutting with a new leaf -->
    <path d="M1010 760 Q1000 660 1040 590" stroke="#2C9A55" stroke-width="10" fill="none" stroke-linecap="round"/>
    <g transform="translate(1046 578) rotate(200)" filter="url(#rim)">${leaf(62, true)}</g><g transform="translate(990 690) rotate(110)">${leaf(40)}</g><g transform="translate(1040 660) rotate(-110)" opacity=".95">${leaf(26, true, false)}</g>
    <!-- teddy, rock, robot: no change since day 1 -->
    ${G(1380, 720, .62, teddy())}${G(830, 742, .62, rock())}${G(1200, 705, .6, robot(0))}
  </g>
  <!-- snail on the glass with its slime trail (time-lapse path) -->
  <path d="M470 720 Q520 600 600 520 Q720 440 820 470" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity=".28" stroke-dasharray="1 0"/>
  <g opacity=".25">${G(520, 640, .5, snail())}</g><g opacity=".4">${G(640, 510, .5, snail())}</g>
  ${G(850, 455, .62, snail(), 'filter="url(#rim)"')}
  <!-- the clear box: glass, lid, air holes -->
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="34" fill="url(#gGlass)"/>
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="34" fill="none" stroke="#E9F4FF" stroke-width="9" opacity=".85"/>
  <path d="M${bx + 60} ${by + 60} L${bx + 260} ${by + 60} L${bx + 90} ${by + 520} L${bx + 60} ${by + 520}z" fill="#fff" opacity=".1"/><path d="M${bx + 300} ${by + 60} L${bx + 350} ${by + 60} L${bx + 180} ${by + 520} L${bx + 130} ${by + 520}z" fill="#fff" opacity=".07"/>
  <g filter="url(#dropS)"><rect x="${bx - 26}" y="${by - 46}" width="${bw + 52}" height="64" rx="24" fill="#3FD0C3"/><rect x="${bx - 14}" y="${by - 38}" width="${bw + 28}" height="18" rx="9" fill="#fff" opacity=".3"/></g>
  ${Array.from({length: 9}, (_, i) => `<ellipse cx="${bx + 160 + i * 100}" cy="${by - 6}" rx="16" ry="9" fill="${P.night}" opacity=".75"/>`).join("")}
  ${T(bx + bw / 2, by - 66, "air holes", 28, "#DDD3FF", {w: 500})}
  <!-- the day counter -->
  <g transform="translate(206 250)"><g filter="url(#drop)"><rect x="-150" y="-140" width="300" height="300" rx="46" fill="${P.ink}"/><rect x="-150" y="-140" width="300" height="84" rx="0" fill="url(#gSun)" clip-path="inset(0 round 46px 46px 0 0)"/></g>
    ${T(0, -78, "DAY", 54, P.ink, {ls: 10})}${T(0, 110, "17", 190, "#fff")}
    <path d="M-150 26 H150" stroke="${P.night}" stroke-width="5" opacity=".7"/></g>
  <g transform="translate(56 436)">${Array.from({length: 30}, (_, i) => `<circle cx="${12 + (i % 10) * 30}" cy="${12 + Math.floor(i / 10) * 30}" r="${i === 16 ? 12 : 9}" fill="${i < 17 ? P.sun : "#fff"}" opacity="${i < 17 ? 1 : .22}"/>`).join("")}</g>
  ${T(206, 566, "of 30", 32, "#DDD3FF", {w: 500})}
  <!-- buddies watching, lit by the box -->
  ${buddy("momo", "sit", 1730, 1050, 330, {aura: false, flip: true, rim: "rimC"})}${buddy("pip", "stand", 200, 1060, 260, {aura: false, rim: "rimC"})}
  ${speech(1640, 610, 470, 92, "Which ones changed?", 40, 1)}
  ${logoPill(44, 34, .86)}${scoreboard(1640, 70, 2, 2, .62)}
  ${vignette(1)}${grain(.15)}`; };

window.render = n => { const k = Math.round(n); document.getElementById("v").innerHTML = defs() + F[k](); };
document.fonts.ready.then(() => Promise.all(["700 40px Fredoka", "600 40px Fredoka", "500 40px Fredoka", "700 40px 'Atkinson Hyperlegible'"].map(f => document.fonts.load(f)))).then(() => { window.READY = true; });
