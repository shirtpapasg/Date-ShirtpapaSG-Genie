// gardens.js: EP6's places. The Singapore Botanic Gardens: the lake in the morning (and at dusk, for the cliffhanger), seen from the
// paved path (a rain tree, the lawn, the white gazebo across the lake, a palm grove on the right, a lamp post by the path), and Palm
// Valley at dusk (tall palms against a violet sky, a path lamp, the city's glow behind the trees). Static parts are baked by bake.js
// (BG.lake, BG.lakedusk, BG.palmvalley); the animals are drawn live on top (bugs.js, beasts.js).
const XDEFS6 = () => `${lg("gdSky", [[0, "#8CCBFF"], [.55, "#CDEBFF"], [1, "#FFF4DA"]])}${lg("gdSkyD", [[0, "#2E2470"], [.35, "#6A3F9E"], [.7, "#E0708A"], [1, "#FFB46A"]])}
  ${lg("gdSkyN", [[0, "#1A1446"], [.45, "#4B2E8C"], [.8, "#A2508F"], [1, "#F08A68"]])}${lg("gdLake", [[0, "#A8DCE0"], [.45, "#5FB0BE"], [1, "#2E7F92"]])}${lg("gdLakeD", [[0, "#F2A07A"], [.4, "#9A6A9E"], [1, "#3A2E6A"]])}
  ${lg("gdLawn", [[0, "#9CDB6E"], [1, "#58AE4A"]])}${lg("gdLawnF", [[0, "#7CC85A"], [1, "#4A9C40"]])}${lg("gdPath", [[0, "#EFE3CB"], [1, "#D2C09E"]])}${lg("gdBank", [[0, "#B59A70"], [1, "#8E7552"]])}
  ${lg("gdTrunk", [[0, "#7A5E46"], [.5, "#5E4632"], [1, "#4A3626"]], 1, 0)}${lg("gdPalm", [[0, "#B8A58A"], [.5, "#9A8466"], [1, "#7A6650"]], 1, 0)}${lg("gdLamp", [[0, "#3E4A48"], [.5, "#2A3432"], [1, "#1E2624"]], 1, 0)}
  ${rg("gdLampG", [[0, "#FFF2C0", 1], [.35, "#FFD27A", .7], [1, "#FFB040", 0]])}${rg("gdSun", [[0, "#FFFBE6", 1], [.3, "#FFF0B0", .8], [1, "#FFE08A", 0]])}
  <filter id="gdB6" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>`;

const GD = { liz: [740, 744], web: [262, 772], ants: [560, 902], hopper: [1060, 800], lamp: [1250, 902], palms: 1720, gazebo: [1080, 478] };
// a rain tree: a wide, flat umbrella of small leaf clusters over a leaning trunk; darker underneath, lit on top. origin = the foot of the trunk
function rainTree(r, s = 1, dark = 0) { let under = "", c = "", hi = "";
  const cols = dark ? ["#2F5E48", "#3A6E50", "#244E3E"] : ["#4E9E52", "#5DB05C", "#43904C"];
  for (let i = 0; i < 70; i++) { const a = r(), x = (-640 + a * 1280) * s, y = (-600 - 150 * Math.sin(Math.PI * a) + r() * 70) * s, rr = (44 + r() * 46) * s;
    under += `<circle cx="${n2(x)}" cy="${n2(y + 46 * s)}" r="${n2(rr)}" fill="${dark ? "#1E3E30" : "#2F6E40"}"/>`; c += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(rr)}" fill="${cols[i % 3]}"/>`;
    if (i % 2 === 0) hi += `<circle cx="${n2(x - rr * .3)}" cy="${n2(y - rr * .4)}" r="${n2(rr * .5)}" fill="${dark ? "#4F7E5E" : "#8ED676"}" opacity=".6"/>`; }
  const tr = dark ? "#3A2E28" : "url(#gdTrunk)", bc = dark ? "#3A2E28" : "#5E4632";
  return `<path d="M${-46 * s} 0 Q${-30 * s} ${-260 * s} ${-80 * s} ${-460 * s} L${-48 * s} ${-476 * s} Q${10 * s} ${-300 * s} ${46 * s} 0z" fill="${tr}"/><path d="M${-20 * s} ${-60 * s} Q${-10 * s} ${-260 * s} ${-50 * s} ${-420 * s}" fill="none" stroke="#fff" stroke-width="${6 * s}" opacity="${dark ? 0 : .15}"/>
    <path d="M${-70 * s} ${-430 * s} Q${-300 * s} ${-500 * s} ${-480 * s} ${-560 * s}" fill="none" stroke="${bc}" stroke-width="${28 * s}" stroke-linecap="round"/><path d="M${-60 * s} ${-450 * s} Q${160 * s} ${-530 * s} ${420 * s} ${-570 * s}" fill="none" stroke="${bc}" stroke-width="${26 * s}" stroke-linecap="round"/>
    <path d="M${-70 * s} ${-460 * s} Q${-60 * s} ${-560 * s} ${-20 * s} ${-640 * s}" fill="none" stroke="${bc}" stroke-width="${20 * s}" stroke-linecap="round"/><path d="M${-300 * s} ${-500 * s} Q${-360 * s} ${-560 * s} ${-330 * s} ${-620 * s} M${200 * s} ${-530 * s} Q${260 * s} ${-600 * s} ${240 * s} ${-650 * s}" fill="none" stroke="${bc}" stroke-width="${14 * s}" stroke-linecap="round"/>${under}${c}${hi}`; }
// a palm: a tall ringed trunk and a crown of fronds. type 0 = a feather palm (arching fronds with drooping leaflets), 1 = a fan palm. origin = the foot
function palmTree(h, r, type = 0, dark = 0, lean = 0) { const top = [lean, -h]; let fr = "", rings = "";
  const fc = dark ? ["#1E3A36", "#284A40", "#1A322E"] : ["#3E9A50", "#56B05C", "#2F8A48"], tc = dark ? "#2E2A30" : "url(#gdPalm)";
  for (let i = 1; i < 14; i++) { const y = -h * i / 14, x = lean * Math.pow(i / 14, 1.5); rings += `<path d="M${n2(x - 15)} ${n2(y)} q15 6 30 0" fill="none" stroke="${dark ? "#1E1A20" : "#6E5A44"}" stroke-width="3" opacity=".55"/>`; }
  if (type === 0) { const order = []; for (let i = 0; i < 12; i++) order.push(i); order.sort((a, b) => Math.abs(b - 5.5) - Math.abs(a - 5.5));
    for (const i of order) { const an = (-190 + i * 18.5 + (r() - .5) * 8) * Math.PI / 180, L = 240 + r() * 80, ex = top[0] + Math.cos(an) * L, ey = top[1] + Math.sin(an) * L * .5 + L * .55 * (.4 + Math.abs(Math.cos(an))) , cx = top[0] + Math.cos(an) * L * .55, cy = top[1] + Math.sin(an) * L * .55 - 70;
      let lf = ""; for (let k = 1; k < 12; k++) { const u = k / 12, px = (1 - u) * (1 - u) * top[0] + 2 * u * (1 - u) * cx + u * u * ex, py = (1 - u) * (1 - u) * top[1] + 2 * u * (1 - u) * cy + u * u * ey, d = 46 * (1 - u * .55);
        lf += `<path d="M${n2(px)} ${n2(py)} q${n2(-d * .2)} ${n2(d * .5)} ${n2(-d * .45)} ${n2(d)} M${n2(px)} ${n2(py)} q${n2(d * .2)} ${n2(d * .5)} ${n2(d * .45)} ${n2(d)}" fill="none" stroke="${fc[(k + i) % 3]}" stroke-width="8" stroke-linecap="round"/>`; }
      fr += `${lf}<path d="M${top[0]} ${top[1]} Q${n2(cx)} ${n2(cy)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="${dark ? "#1A2E2A" : "#2E7A40"}" stroke-width="7" stroke-linecap="round"/>`; } }
  else for (let i = 0; i < 9; i++) { const an = (-205 + i * 28 + (r() - .5) * 8) * Math.PI / 180, L = 120 + r() * 50, cx = top[0] + Math.cos(an) * L, cy = top[1] + Math.sin(an) * L * .75;
      let pts = ""; const n = 13; for (let k = 0; k <= n; k++) { const a2 = an - 1.15 + 2.3 * k / n, rr = 120 * (k % 2 ? .82 : 1); pts += `${k ? "L" : "M"}${n2(cx + Math.cos(a2) * rr)} ${n2(cy + Math.sin(a2) * rr * .8)}`; }
      let rib = ""; for (let k = 1; k < n; k += 2) { const a2 = an - 1.15 + 2.3 * k / n; rib += `<path d="M${n2(cx)} ${n2(cy)} L${n2(cx + Math.cos(a2) * 96)} ${n2(cy + Math.sin(a2) * 77)}" stroke="${fc[2]}" stroke-width="3" opacity=".7"/>`; }
      fr += `<path d="M${top[0]} ${top[1]} L${n2(cx)} ${n2(cy)}" stroke="${dark ? "#2E2A30" : "#7A6650"}" stroke-width="7"/><path d="${pts}L${n2(cx)} ${n2(cy)}z" fill="${fc[i % 2]}" stroke="${fc[2]}" stroke-width="3" stroke-linejoin="round"/>${rib}`; }
  return `<path d="M-20 0 Q${n2(lean * .3 - 15)} ${n2(-h * .5)} ${n2(lean - 11)} ${-h} L${n2(lean + 11)} ${-h} Q${n2(lean * .3 + 15)} ${n2(-h * .5)} 20 0z" fill="${tc}"/>${rings}${fr}<circle cx="${lean}" cy="${-h + 4}" r="16" fill="${dark ? "#1A2E2A" : "#5E7A3A"}"/>`; }
// the white Victorian gazebo across the lake (cast iron, eight posts, a dome). origin = its floor centre
const gazebo = (k = 1) => `<g transform="scale(${k})"><rect x="-70" y="-6" width="140" height="10" rx="3" fill="#F2EFE6"/>${[-60, -30, 0, 30, 60].map((x) => `<rect x="${x - 3}" y="-92" width="6" height="88" fill="#FBFAF4"/>`).join("")}
  <path d="M-78 -92 H78 L64 -106 H-64z" fill="#FBFAF4"/><path d="M-64 -106 Q-60 -150 0 -166 Q60 -150 64 -106z" fill="#F4F1E8"/><path d="M-40 -110 Q-30 -146 0 -158" fill="none" stroke="#D8D2C2" stroke-width="3"/><circle cx="0" cy="-172" r="7" fill="#FBFAF4"/><path d="M0 -179 v-12" stroke="#FBFAF4" stroke-width="3"/>
  ${[-45, -15, 15, 45].map((x) => `<path d="M${x - 12} -86 q12 14 24 0" fill="none" stroke="#E2DDCD" stroke-width="3"/>`).join("")}</g>`;
// a Victorian lamp post (dark green cast iron, a lantern on top). origin = its foot. lit 0..1
const lampPost = (lit = 0, h = 430) => `<ellipse cx="0" cy="4" rx="44" ry="9" fill="${P.ink}" opacity=".25" filter="url(#b4)"/><path d="M-26 0 L-18 -60 H18 L26 0z" fill="url(#gdLamp)"/><rect x="-9" y="${-h + 70}" width="18" height="${h - 130}" fill="url(#gdLamp)"/><rect x="-16" y="-80" width="32" height="20" rx="4" fill="url(#gdLamp)"/>
  <rect x="-14" y="${-h + 60}" width="28" height="14" rx="4" fill="url(#gdLamp)"/>${lit > .01 ? `<circle cx="0" cy="${-h + 22}" r="${n2(120 + 30 * lit)}" fill="url(#gdLampG)" opacity="${n2(lit)}"/>` : ""}<path d="M-22 ${-h + 60} L-28 ${-h} H28 L22 ${-h + 60}z" fill="${lit > .01 ? "#FFE7A0" : "#E8EEF0"}" opacity="${lit > .01 ? 1 : .55}" stroke="#1E2624" stroke-width="5"/><path d="M0 ${-h + 60} V${-h}" stroke="#1E2624" stroke-width="3"/>
  <path d="M-36 ${-h} L0 ${-h - 30} L36 ${-h}z" fill="url(#gdLamp)"/><circle cx="0" cy="${-h - 36}" r="8" fill="#2A3432"/>`;
// two shrubs with the garden spider's web strung between them is drawn live (bugs.js); here only the shrubs
const shrub = (r, x, y, w, h, dark = 0) => { let s = ""; for (let i = 0; i < 16; i++) { const a = r(), b = r(); s += `<circle cx="${n2(x - w / 2 + a * w)}" cy="${n2(y - b * h * Math.sin(Math.PI * a) - 20)}" r="${n2(30 + r() * 26)}" fill="${dark ? ["#24423A", "#2E5044"][i % 2] : ["#3E9A50", "#4FAA58", "#2F8A48"][i % 3]}"/>`; } return s; };

/* ---------- the lake, seen from the path. mode "am" (morning, sun from the left) or "dusk" ---------- */
function lakeSet(mode) { const r = rndm(606), dk = mode === "dusk"; let far = "", towers = "", refl = "", tufts = "", rocks = "", pave = "";
  for (let i = 0; i < 7; i++) towers += `<rect x="${n2(1100 + i * 150 + r() * 60)}" y="${n2(180 + r() * 120)}" width="${n2(60 + r() * 40)}" height="400" rx="6" fill="${dk ? "#5A4A8A" : "#C9DCEB"}" opacity="${dk ? .5 : .55}"/>`;
  for (let i = 0; i < 30; i++) { const x = -220 + i * 82 + r() * 30, rr = 50 + r() * 50; far += `<circle cx="${n2(x)}" cy="${n2(452 - r() * 50 - (i % 5 === 2 ? 40 : 0))}" r="${n2(rr)}" fill="${dk ? (i % 3 ? "#3A3A62" : "#2E3056") : (i % 3 ? "#5FA87A" : "#4E9870")}"/>`; }
  for (let i = 0; i < 18; i++) refl += `<rect x="${n2(-200 + r() * 2300)}" y="${n2(500 + r() * 40)}" width="${n2(50 + r() * 110)}" height="${n2(40 + r() * 90)}" rx="28" fill="${dk ? "#2E2856" : "#2F7F6A"}" opacity=".18"/>`;
  for (let i = 0; i < 60; i++) { const x = -200 + r() * 2320, y = 760 + r() * 120; tufts += `<path d="M${n2(x)} ${n2(y)} q-4 -16 -10 -24 M${n2(x)} ${n2(y)} q2 -18 4 -28 M${n2(x)} ${n2(y)} q6 -14 14 -20" fill="none" stroke="${dk ? "#2E5A3E" : (i % 2 ? "#3E9A4A" : "#7CCB5E")}" stroke-width="4" stroke-linecap="round"/>`; }
  for (let i = 0; i < 14; i++) { const x = -150 + i * 170 + r() * 60; rocks += `<ellipse cx="${n2(x)}" cy="${n2(712 + r() * 12)}" rx="${n2(18 + r() * 22)}" ry="${n2(8 + r() * 5)}" fill="${dk ? "#4E4660" : "#A8A08E"}" stroke="${dk ? "#3A3448" : "#7E7666"}" stroke-width="3"/>`; }
  for (let i = 0; i < 26; i++) pave += `<path d="M${-200 + i * 96} 920 L${n2(-420 + i * 118)} 1200" stroke="${dk ? "#6A5E6E" : "#BBA884"}" stroke-width="3" opacity=".45"/>`;
  const shade = dk ? "" : `<ellipse cx="560" cy="752" rx="560" ry="70" fill="#1E5A3A" opacity=".28" filter="url(#b10)"/>`;
  const tr = rndm(11), tr2 = rndm(19);
  let palms = ""; [[1600, 470, 1, 0], [1960, 520, 1, 10], [1700, 600, 0, -40], [1830, 680, 0, 20], [2040, 640, 0, -30]].forEach(([x, h, ty, ln], i) => { palms += TF(x, 800 + (i % 2) * 14, 1, palmTree(h, rndm(40 + i), ty, dk, ln)); });
  return `<rect x="-200" y="-120" width="2320" height="640" fill="url(#${dk ? "gdSkyD" : "gdSky"})"/>
  ${dk ? `<circle cx="1500" cy="440" r="260" fill="#FFB46A" opacity=".55" filter="url(#b60)"/><circle cx="1500" cy="452" r="70" fill="#FFD9A0" opacity=".9"/>` : `<circle cx="160" cy="40" r="300" fill="url(#gdSun)"/><circle cx="160" cy="40" r="64" fill="#FFFBEA"/>`}
  <g fill="${dk ? "#E9A2C0" : "#fff"}" opacity="${dk ? .45 : .85}" filter="url(#b4)"><ellipse cx="700" cy="120" rx="190" ry="34"/><ellipse cx="840" cy="94" rx="110" ry="30"/><ellipse cx="1500" cy="200" rx="160" ry="28"/></g>
  <g filter="url(#b4)">${towers}</g><g filter="url(#b2)">${far}</g>
  <rect x="-200" y="476" width="2320" height="22" fill="${dk ? "#3E4A54" : "#7DBF68"}"/>${TF(GD.gazebo[0], GD.gazebo[1] + 2, .36, bandstandF(dk))}
  <rect x="-200" y="494" width="2320" height="230" fill="url(#${dk ? "gdLakeD" : "gdLake"})"/><g filter="url(#b10)">${refl}</g>
  <g transform="translate(${GD.gazebo[0]} 506) scale(.36 -.2)" opacity=".28" filter="url(#b2)">${bandstandF(dk)}</g>${[[300, 560, 46], [560, 610, 60], [900, 566, 40], [1330, 600, 56], [1560, 560, 40], [1100, 650, 66], [120, 640, 60], [1850, 630, 54]].map(([x, y, rx], i) => TF(x, y, 1, lilyPad(rx, dk ? (i % 2 ? "#4E6E6A" : "#445E62") : (i % 2 ? "#6FD06A" : "#5CC455")) + (i % 3 === 0 ? `<g transform="translate(${rx * .4} -10)"><path d="M0 0 q-14 -22 0 -34 q14 12 0 34z M0 0 q-26 -8 -30 -26 q22 0 30 26z M0 0 q26 -8 30 -26 q-22 0 -30 26z" fill="${dk ? "#C88AB0" : "#FF9EC4"}" stroke="${dk ? "#8A5A86" : "#D9608E"}" stroke-width="3"/></g>` : ""))).join("")}
  ${dk ? `<rect x="1380" y="498" width="240" height="220" fill="#FFC890" opacity=".35" filter="url(#b10)"/>` : ""}
  <path d="M-200 497 H2120" stroke="#fff" stroke-width="4" opacity=".55"/>
  <g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35">${Array.from({ length: 22 }, () => { const x = -150 + r() * 2200, y = 520 + r() * 170; return `<path d="M${n2(x)} ${n2(y)} h${n2(30 + r() * 80)}"/>`; }).join("")}</g>
  <path d="M-200 700 Q300 690 700 712 Q1200 730 1700 700 Q1950 690 2120 698 V800 H-200z" fill="url(#gdBank)"/>${rocks}
  <path d="M-200 730 Q400 716 800 740 Q1300 760 2120 726 V940 H-200z" fill="url(#gdLawn)"/>${shade}${tufts}
  ${TF(GD.palms, 0, 1, "")}${palms}${baskRock(dk)}
  <g>${TF(500, 812, 1, rainTree(tr, 1.05, dk))}</g>
  ${shrub(tr2, 150, 900, 240, 150, dk)}${shrub(tr2, 400, 906, 230, 130, dk)}${shrub(tr2, 1530, 900, 260, 120, dk)}${heliconia(1560, 890, dk)}${heliconia(60, 900, dk, -1)}
  <path d="M-200 880 Q900 870 2120 884 V1200 H-200z" fill="url(#gdPath)"/>${pave}<path d="M-200 880 Q900 870 2120 884" fill="none" stroke="${dk ? "#8A7A88" : "#B9A47E"}" stroke-width="10"/><path d="M-200 892 Q900 882 2120 896" fill="none" stroke="#fff" stroke-width="4" opacity=".45"/>
  ${dk ? `<rect x="-200" y="500" width="2320" height="700" fill="#4A2E7A" opacity=".38" style="mix-blend-mode:multiply"/>` : `<g style="mix-blend-mode:screen"><path d="M-200 -120 L500 -120 L1500 1200 L200 1200z" fill="#FFF0B8" opacity=".12" filter="url(#b30)"/></g>`}`; }
// (Fable redraw) the Bandstand across the lake; a flat rock on the bank, out in the sun (the monitor lizard's warm rock); heliconias by the path
const bandstandF = (dk = 0) => { const wh = dk ? "#C9B8DE" : "#FFFFFF", ln = dk ? "#6A5A8E" : "#B9C4CC", rf = dk ? "#3A3460" : "#55645F", rl = dk ? "#2A2448" : "#34403C"; let posts = "", rail = ""; [-150, -92, -32, 32, 92, 150].forEach((x) => { posts += `<rect x="${x - 7}" y="-170" width="14" height="172" rx="5" fill="${wh}" stroke="${ln}" stroke-width="3"/>`; }); for (let x = -150; x < 150; x += 20) rail += `<path d="M${x + 10} -52 V-4" stroke="${wh}" stroke-width="5" opacity=".8"/>`;
  return `<path d="M-190 8 H190 L206 30 H-206z" fill="${wh}" stroke="${ln}" stroke-width="3"/><rect x="-172" y="-8" width="344" height="18" rx="5" fill="${wh}" stroke="${ln}" stroke-width="3"/><rect x="-150" y="-170" width="300" height="165" fill="${dk ? "#FFC890" : "#CFE7F5"}" opacity=".3"/>${rail}<path d="M-158 -54 H158" stroke="${wh}" stroke-width="9" stroke-linecap="round"/>${posts}
  <path d="M-196 -168 L-70 -268 H70 L196 -168z" fill="${rf}" stroke="${rl}" stroke-width="5" stroke-linejoin="round"/><path d="M-70 -268 L-40 -168 M70 -268 L40 -168 M0 -268 V-168" stroke="${rl}" stroke-width="3" opacity=".5"/><path d="M-196 -168 H196" stroke="${wh}" stroke-width="12" stroke-linecap="round"/>
  <path d="M-44 -268 Q0 -318 44 -268z" fill="${rf}" stroke="${rl}" stroke-width="5"/><path d="M0 -300 V-336" stroke="${rl}" stroke-width="6" stroke-linecap="round"/><circle cy="-340" r="8" fill="#FFD75A" stroke="${rl}" stroke-width="3"/>`; };
const ROCKW = [1068, 742];   // the middle of the warm rock's flat top
const baskRock = (dk = 0) => { const [x, y] = ROCKW; return `<ellipse cx="${x}" cy="${y + 42}" rx="170" ry="16" fill="#2B2147" opacity=".22" filter="url(#b4)"/><path d="M${x - 156} ${y + 44} Q${x - 170} ${y + 4} ${x - 112} ${y - 6} Q${x} ${y - 18} ${x + 110} ${y - 4} Q${x + 168} ${y + 8} ${x + 156} ${y + 44}z" fill="${dk ? "#6E668A" : "url(#fRock)"}" stroke="${dk ? "#4A4468" : "#6E685C"}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M${x - 112} ${y} Q${x} ${y - 12} ${x + 110} ${y + 2} Q${x} ${y + 16} ${x - 112} ${y}z" fill="#FFF3C9" opacity="${dk ? .12 : .6}"/><path d="M${x - 80} ${y + 24} q24 -8 46 2 M${x + 30} ${y + 28} q30 -10 60 0" stroke="${dk ? "#4A4468" : "#6E685C"}" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".5"/>`; };
const heliconia = (x, y, dk = 0, f = 1) => `<g transform="translate(${x} ${y}) scale(${f} 1)">${[[-60, -30], [0, -8], [60, 14], [110, 30]].map(([dx, a], i) => `<path d="M${dx * .3} 0 Q${dx * .6} -140 ${dx} ${-250 + i * 22}" stroke="${dk ? "#24483A" : "#2F8A4C"}" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="${dx}" cy="${-250 + i * 22}" rx="26" ry="88" fill="${dk ? (i % 2 ? "#2E5A44" : "#3A6A4E") : (i % 2 ? "#3FA85A" : "#56BF62")}" stroke="${dk ? "#24483A" : "#2F8A4C"}" stroke-width="4" transform="rotate(${a} ${dx} ${-250 + i * 22})"/>`).join("")}
  <path d="M26 -150 q30 -30 16 -66 q36 22 22 62z" fill="${dk ? "#B86A6A" : "#FF8F4A"}" stroke="${dk ? "#7A4A5A" : "#D9601E"}" stroke-width="3"/><path d="M-20 -110 q-30 -24 -18 -60 q-34 22 -16 60z" fill="${dk ? "#B88A5A" : "#FFB03A"}" stroke="${dk ? "#7A4A5A" : "#D9601E"}" stroke-width="3"/></g>`;
BG.lake = () => lakeSet("am");
BG.lakedusk = () => lakeSet("dusk");
// the lamp post is drawn live (it lights up at dusk and the lizard sits on it)
const LAMPH = 440;

/* ---------- Palm Valley at dusk: the lawn in a hollow ringed with palms; the path lamp; the city's glow behind the trees ---------- */
const PV = { roost: [470, 250], lamp: [1300, 900], trunk: [1430, 900] };
BG.palmvalley = () => { const r = rndm(808); let far = "", tw = "", star = "", palms = "", tufts = "";
  for (let i = 0; i < 9; i++) tw += `<rect x="${n2(500 + i * 170 + r() * 60)}" y="${n2(250 + r() * 140)}" width="${n2(50 + r() * 50)}" height="400" rx="5" fill="#5E3E8E" opacity=".55"/>${Array.from({ length: 6 }, (_, j) => `<rect x="${n2(510 + i * 170 + r() * 40)}" y="${n2(280 + r() * 200)}" width="8" height="10" fill="#FFD9A0" opacity=".7"/>`).join("")}`;
  for (let i = 0; i < 40; i++) star += `<circle cx="${n2(-200 + r() * 2320)}" cy="${n2(-110 + r() * 260)}" r="${n2(1.5 + r() * 2)}" fill="#fff" opacity="${n2(.3 + r() * .5)}"/>`;
  for (let i = 0; i < 34; i++) { const x = -220 + i * 72 + r() * 30; far += `<circle cx="${n2(x)}" cy="${n2(560 - r() * 50)}" r="${n2(50 + r() * 50)}" fill="${i % 3 ? "#2E2A5A" : "#26234E"}"/>`; }
  [[160, 760, 0, 30], [330, 640, 1, -10], [780, 520, 0, 20], [980, 600, 0, -30], [1180, 480, 1, 0], [1560, 700, 0, 20], [1740, 560, 1, -10], [1950, 680, 0, -40], [2080, 600, 1, 0], [620, 420, 1, 0]].forEach(([x, h, ty, ln], i) => { palms += TF(x, 760 + (i % 3) * 20, 1, palmTree(h, rndm(80 + i), ty, 1, ln)); });
  for (let i = 0; i < 70; i++) { const x = -200 + r() * 2320, y = 800 + r() * 90; tufts += `<path d="M${n2(x)} ${n2(y)} q-4 -16 -10 -24 M${n2(x)} ${n2(y)} q2 -18 4 -28 M${n2(x)} ${n2(y)} q6 -14 14 -20" fill="none" stroke="${i % 2 ? "#24483A" : "#3A6A4A"}" stroke-width="4" stroke-linecap="round"/>`; }
  return `<rect x="-200" y="-120" width="2320" height="900" fill="url(#gdSkyN)"/>${star}<circle cx="1350" cy="640" r="420" fill="#FF9E6B" opacity=".4" filter="url(#b60)"/>
  <g fill="#C878B0" opacity=".35" filter="url(#b4)"><ellipse cx="500" cy="300" rx="220" ry="26"/><ellipse cx="1500" cy="380" rx="180" ry="22"/></g>
  <g filter="url(#b4)">${tw}</g><g filter="url(#b2)">${far}</g>
  <path d="M-200 700 Q600 650 1100 690 Q1600 730 2120 680 V1200 H-200z" fill="#3E6E52"/><path d="M-200 760 Q700 730 1200 770 Q1700 800 2120 760 V1200 H-200z" fill="#2E5A44"/>${palms}${tufts}
  <path d="M-200 920 Q900 900 2120 930 V1200 H-200z" fill="#6E6276"/><path d="M-200 920 Q900 900 2120 930" fill="none" stroke="#8E8296" stroke-width="10"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M${-200 + i * 110} 935 L${-420 + i * 136} 1200" stroke="#5A4E62" stroke-width="3" opacity=".5"/>`).join("")}
  <g transform="translate(${PV.trunk[0]} ${PV.trunk[1]})">${palmTree(1100, rndm(5), 0, 1, 40)}</g>
  <g transform="translate(-60 -40)">${fanCanopy(rndm(91))}</g>`; };
// the big fan-palm leaves the bats roost under (upper left of Palm Valley)
function fanCanopy(r) { let s = `<path d="M-200 -60 Q120 120 380 300" fill="none" stroke="#1E1A24" stroke-width="18" stroke-linecap="round"/>`;
  [[300, 230, 0], [560, 260, 1], [150, 160, 2], [800, 200, 3]].forEach(([cx, cy, k]) => { let rib = ""; for (let j = -6; j <= 6; j++) { const a = Math.PI / 2 + j * .2; rib += `<path d="M${cx} ${cy - 40} L${n2(cx + Math.cos(a) * 260 * (k % 2 ? .9 : 1))} ${n2(cy - 40 + Math.sin(a) * 120 - 140 + Math.abs(j) * 18)}" stroke="${j % 2 ? "#22402F" : "#2C4E3A"}" stroke-width="30" stroke-linecap="round"/>`; }
    s += `<path d="M${cx - 200} ${cy - 120} Q${cx} ${cy - 20} ${cx + 200} ${cy - 120}" fill="none" stroke="#1E1A24" stroke-width="10"/>` + rib; });
  return s; }
// stars twinkle, fireflies drift: live sparkle over a dusk scene
const dusks = (t, n = 14, seed = 3) => { let s = ""; for (let i = 0; i < n; i++) { const x = (hash(i, seed) * 1920), y = 40 + hash(i, seed + 1) * 300, a = .4 + .6 * Math.abs(Math.sin(t * (1 + hash(i, seed + 2)) + i)); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="2.5" fill="#fff" opacity="${n2(a * .8)}"/>`; } return s; };

/* ---------- the little house lizard (note 11: a rounder head, small eyes, a soft rim light). Top view, head up (rotate to place). origin = its middle ---------- */
const houseLiz = (o = {}) => { const c = o.col || "#D8C7A6", ln = o.line || "#7A6A52", w = 2 * Math.sin((o.t || 0) * 5);
  return `<g filter="url(#rimS)"><path d="M0 26 Q${n2(-10 + w)} 60 ${n2(6 + w * 2)} 92 Q${n2(16 + w * 2)} 110 ${n2(4 + w * 3)} 124" fill="none" stroke="${ln}" stroke-width="15" stroke-linecap="round"/><path d="M0 26 Q${n2(-10 + w)} 60 ${n2(6 + w * 2)} 92 Q${n2(16 + w * 2)} 110 ${n2(4 + w * 3)} 124" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
  ${[[-1, -14, -1], [1, -14, 1], [-1, 20, -1], [1, 20, 1]].map(([sd, y, k]) => `<path d="M${sd * 12} ${y} q${sd * 18} ${y < 0 ? -4 : 6} ${sd * 24} ${y < 0 ? -18 : 16}" fill="none" stroke="${ln}" stroke-width="10" stroke-linecap="round"/><path d="M${sd * 12} ${y} q${sd * 18} ${y < 0 ? -4 : 6} ${sd * 24} ${y < 0 ? -18 : 16}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>${[-1, 0, 1].map((q) => `<circle cx="${n2(sd * 36 + q * 5)}" cy="${n2(y + (y < 0 ? -18 : 16) + (y < 0 ? -4 : 4) + Math.abs(q) * 2)}" r="3.4" fill="${c}" stroke="${ln}" stroke-width="1.5"/>`).join("")}`).join("")}
  <ellipse cx="0" cy="4" rx="15" ry="30" fill="${c}" stroke="${ln}" stroke-width="3"/><ellipse cx="0" cy="-34" rx="17" ry="16" fill="${c}" stroke="${ln}" stroke-width="3"/><circle cx="-8" cy="-38" r="3.6" fill="${P.ink}"/><circle cx="8" cy="-38" r="3.6" fill="${P.ink}"/><circle cx="-7" cy="-39.5" r="1.3" fill="#fff"/><circle cx="9" cy="-39.5" r="1.3" fill="#fff"/>
  <ellipse cx="-3" cy="-2" rx="5" ry="16" fill="#fff" opacity=".3"/></g>`; };
