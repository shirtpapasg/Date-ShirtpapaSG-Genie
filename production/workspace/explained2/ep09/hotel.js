// hotel.js: EP2's set and props: the Buddy Hotel on EP1's Toa Payoh window ledge (seen a little further along: the wall with its clock on
// the left, the window on the right), the check-in board, the jar, the pots, the answer cards, the pupil. Pure functions of their arguments.
const XDEFS2 = () => `${lg("hCard", [[0, "#E9C592"], [1, "#C99A62"]])}${lg("hCardIn", [[0, "#7A5230"], [1, "#A1744A"]])}${lg("hSky", [[0, "#FFFFFF"], [1, "#CFE9FB"]])}
  ${lg("hLid", [[0, "#F2F5FB"], [.5, "#B9C2D8"], [1, "#8D97B2"]])}${lg("hJar", [[0, "#DDF1FF", .34], [.5, "#fff", .06], [1, "#BFE6FF", .3]], 1, 0)}${lg("hCan", [[0, "#7FD6E8"], [1, "#2E9DB8"]])}
  ${lg("hBis", [[0, "#F1C27A"], [1, "#D49A4A"]])}${lg("hWood", [[0, "#D9A871"], [1, "#A8743F"]])}${lg("hTub", [[0, "#EAF6FF", .75], [1, "#B9D8EE", .75]])}${lg("hPale", [[0, "#FBF3B0"], [1, "#E6D77A"]], 1, 1)}
  ${lg("hShirt", [[0, "#FFFFFF"], [1, "#E4ECF8"]])}${lg("hWaterG", [[0, "#8FD0FF"], [1, "#3A8DFF"]])}${lg("hSoil", [[0, "#6B4630"], [1, "#3E2618"]])}
  <clipPath id="lgW"><rect x="640" y="-60" width="1500" height="860"/></clipPath>`;

const HT = { fy: 870, rx: [775, 1040, 1515], box: 1275, bd: 1775, clock: [430, 270], sign: 330 };
/* ---------- the answer colours: WATER blue, FOOD orange, AIR pale sky-white (green keeps EP1's LIVING meaning) ---------- */
const NEEDS = [["WATER", "blue", "water"], ["FOOD", "orange", "food"], ["AIR", "sky", "air"]];
const NCOL = { blue: ["url(#gBlue)", "#fff", P.blueDeep, "#1F5FD0", "#BFE0FF"], orange: ["url(#gOrange)", "#fff", P.orangeDeep, "#B4580C", "#FFE0B8"], sky: ["url(#hSky)", P.ink, "#7FB4D6", "#4E93B4", "#EAF6FF"] };
// a tick that is not green: ink on a lilac disc
const tickMark = (r = 30) => `<circle r="${r}" fill="#DDD3FF" stroke="${P.ink}" stroke-width="${n2(r * .13)}"/><path d="M${n2(-r * .46)} ${n2(r * .04)} L${n2(-r * .12)} ${n2(r * .4)} L${n2(r * .5)} ${n2(-r * .34)}" fill="none" stroke="${P.ink}" stroke-width="${n2(r * .26)}" stroke-linecap="round" stroke-linejoin="round"/>`;
// an answer card: number, picture, word. 280 x 380, origin = its centre
function needCard(i, o = {}) { const [word, kind, ic] = NEEDS[i], c = NCOL[kind], w = 280, h = 380, pls = o.pulse || 0, lit = o.lit || 0, dim = o.dim === undefined ? 1 : o.dim;
  return `<g transform="rotate(${[-2, 1, -1.5][i]}) scale(${n2(1 + .04 * pls + .06 * lit)})" opacity="${n2(dim)}">${lit ? `<rect x="${-w / 2 - 14}" y="${-h / 2 - 20}" width="${w + 28}" height="${h + 36}" rx="60" fill="${P.sun}" opacity="${n2(.85 * lit)}" filter="url(#b10)"/>` : ""}
    <g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="44" fill="${c[2]}"/><rect x="${-w / 2}" y="${-h / 2 - 10}" width="${w}" height="${h}" rx="44" fill="${c[0]}"/></g>
    <rect x="${-w / 2 + 16}" y="${-h / 2}" width="${w - 32}" height="${h * .26}" rx="32" fill="#fff" opacity="${kind === "sky" ? .5 : .16}"/>
    <g transform="translate(0 -112)"><circle r="54" fill="${P.ink}"/>${T(0, 27, i + 1, 80, "#fff")}</g>
    <g transform="translate(0 16) scale(1.5)"><circle r="42" fill="${P.paper}"/>${needIcon(ic, c[3], c[4])}</g>
    ${T(0, 150, word, 60, c[1], { ls: 5 })}</g>`; }
// a small standing answer chip (number + word), for the board's columns and labels
function needChip(i, size = 34, o = {}) { const [word, kind] = NEEDS[i], c = NCOL[kind], txt = o.num === false ? word : `${i + 1} ${word}`, w = tw(txt, size, 700, "Fredoka", 2) + size * 1.3, h = size * 1.6;
  return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h * .32)}" fill="${c[0]}" stroke="${c[2]}" stroke-width="3"/></g>${T(0, n2(size * .35), txt, size, c[1], { ls: 2 })}`; }

/* ---------- the hotel's pieces. Each has its origin at the middle of its base (where it stands on the ledge). ---------- */
// a cardboard room front: 250 wide, 330 tall, a doorway cut out, a big number
function roomFront(n) { return `<ellipse cx="0" cy="3" rx="150" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <path d="M-125 0 V-256 L-4 -332 L125 -260 V0z" fill="url(#hCard)" stroke="#9A6E3C" stroke-width="5" stroke-linejoin="round"/>
  <g stroke="#B58A52" stroke-width="2.5" opacity=".55"><path d="M-118 -40 H-100 M100 -60 H118 M-118 -150 H-100 M100 -170 H118 M-60 -262 H60 M-90 -246 H90"/></g>
  <path d="M-98 0 V-178 Q-98 -226 -50 -226 H50 Q98 -226 98 -178 V0z" fill="url(#hCardIn)" stroke="#9A6E3C" stroke-width="4" stroke-linejoin="round"/>
  <path d="M-98 -8 H98 V0 H-98z" fill="#F4E3C3" opacity=".5"/>
  <g transform="translate(-2 -280) rotate(-4)"><circle r="34" fill="#FFF8EA" stroke="#9A6E3C" stroke-width="4"/>${T(0, 18, n, 52, P.ink)}</g>
  <rect x="-128" y="-120" width="22" height="34" rx="4" fill="#F3EBD2" opacity=".85" transform="rotate(-8 -117 -103)"/><rect x="104" y="-212" width="22" height="34" rx="4" fill="#F3EBD2" opacity=".85" transform="rotate(10 115 -195)"/>`; }
// the hand-painted sign on two legs: 380 wide, top at -300
function hotelSign() { return `<ellipse cx="0" cy="3" rx="170" ry="11" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>
  <g stroke="#8A5E34" stroke-width="4"><rect x="-150" y="-190" width="20" height="190" rx="5" fill="url(#hWood)"/><rect x="130" y="-190" width="20" height="190" rx="5" fill="url(#hWood)"/></g>
  <g transform="rotate(-2 0 -230)"><g filter="url(#dropS)"><rect x="-192" y="-306" width="384" height="150" rx="18" fill="#FFF8EA" stroke="#9A6E3C" stroke-width="6"/></g>
  <path d="M-170 -176 q20 10 40 0 M96 -292 q22 -8 44 2" stroke="${P.coral}" stroke-width="6" stroke-linecap="round" fill="none" opacity=".7"/>
  ${T(0, -238, "BUDDY", 58, P.coral, { ls: 6 })}${T(0, -180, "HOTEL", 58, P.ink, { ls: 9 })}
  <g transform="translate(-156 -262) scale(.5)" fill="${P.purple}"><ellipse cx="0" cy="6" rx="16" ry="13"/><circle cx="-16" cy="-12" r="6.5"/><circle cx="-5" cy="-20" r="6.5"/><circle cx="8" cy="-19" r="6.5"/><circle cx="18" cy="-9" r="6.5"/></g>
  <g transform="translate(158 -196) scale(.5) rotate(20)" fill="${P.aqua}"><ellipse cx="0" cy="6" rx="16" ry="13"/><circle cx="-16" cy="-12" r="6.5"/><circle cx="-5" cy="-20" r="6.5"/><circle cx="8" cy="-19" r="6.5"/><circle cx="18" cy="-9" r="6.5"/></g></g>`; }
// the wall clock: h = hours as a number (9.5 = half past nine). Origin = its centre, radius 92
function wallClock(h = 9) { const ha = (h % 12) * 30, ma = (h % 1) * 360; let tk = ""; for (let i = 0; i < 12; i++) tk += `<path d="M0 -76 V${i % 3 ? -68 : -60}" stroke="${P.ink}" stroke-width="${i % 3 ? 4 : 7}" stroke-linecap="round" transform="rotate(${i * 30})"/>`;
  return `<g filter="url(#dropS)"><circle r="92" fill="${P.coral}"/><circle r="78" fill="#FFF8EA"/></g>${tk}${T(0, -34, "12", 26, P.ink)}${T(48, 9, "3", 26, P.ink)}${T(0, 54, "6", 26, P.ink)}${T(-48, 9, "9", 26, P.ink)}
  <path d="M0 6 V-40" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" transform="rotate(${n2(ha)})"/><path d="M0 8 V-62" stroke="${P.ink}" stroke-width="6" stroke-linecap="round" transform="rotate(${n2(ma)})"/><circle r="8" fill="${P.coral}"/>`; }
// the check-in board: 3 rooms x 3 needs. Local frame 0..400 x 0..430 (top-left origin). ticks: { "1w": time, "2f": time, ... }; o.flash = [w, f, a] 0..1; o.blink = key
function checkBoard(t, ticks = {}, o = {}) { let s = `<g filter="url(#drop)"><rect x="0" y="0" width="400" height="430" rx="24" fill="url(#gPaper)" stroke="#C9A772" stroke-width="6"/></g><rect x="150" y="-16" width="100" height="36" rx="10" fill="url(#hLid)" stroke="#7F89A8" stroke-width="4"/>${T(200, 66, "CHECK-IN", 34, P.ink, { ls: 5 })}`;
  NEEDS.forEach(([w, k], i) => { const x = 138 + i * 100, f = (o.flash && o.flash[i]) || 0, c = NCOL[k]; s += `<g transform="translate(${x} 112) scale(${n2(1 + .18 * f)})">${f > .05 ? `<rect x="-52" y="-28" width="104" height="56" rx="16" fill="${P.sun}" opacity="${n2(f)}" filter="url(#b4)"/>` : ""}<rect x="-46" y="-23" width="92" height="46" rx="12" fill="${c[0]}" stroke="${c[2]}" stroke-width="3"/>${T(0, 9, w, 24, c[1], { ls: 1 })}</g>`; });
  for (let r = 0; r < 3; r++) { const y = 190 + r * 84; s += `<g transform="translate(46 ${y})"><circle r="27" fill="#E9C592" stroke="#9A6E3C" stroke-width="4"/>${T(0, 14, r + 1, 40, P.ink)}</g>`;
    for (let c = 0; c < 3; c++) { const key = (r + 1) + "wfa"[c], x = 138 + c * 100, tt = ticks[key], bl = o.blink === key ? .5 + .5 * Math.sin(t * 9) : 0;
      s += `<rect x="${x - 35}" y="${y - 35}" width="70" height="70" rx="14" fill="#fff" stroke="${bl ? P.coral : "#C9A772"}" stroke-width="${n2(4 + 5 * bl)}"/>` + (o.sun === key && !(tt !== undefined && t >= tt) ? `<g transform="translate(${x} ${y}) scale(.62)" opacity=".9"><circle r="20" fill="${P.sun}" stroke="${P.sunDeep}" stroke-width="5"/><g stroke="${P.sunDeep}" stroke-width="6" stroke-linecap="round"><path d="M0 -30 v-10 M0 30 v10 M-30 0 h-10 M30 0 h10 M-21 -21 l-7 -7 M21 -21 l7 -7 M-21 21 l-7 7 M21 21 l7 7"/></g></g>` : "");
      if (tt !== undefined && t >= tt) s += `<g transform="translate(${x} ${y}) scale(${n2(spring(t, tt, .4))})">${tickMark(28)}</g>`; } }
  return s; }
// the board on its little easel, standing. Origin = the middle of its feet; the board is 400 x 430 at scale k
function boardEasel(t, ticks, o = {}) { return `<ellipse cx="0" cy="3" rx="150" ry="11" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><g stroke="#8A5E34" stroke-width="5" stroke-linecap="round"><path d="M-70 -560 L-150 0 M70 -560 L150 0 M0 -560 L0 -40" stroke="#A8743F" stroke-width="16"/></g>
  <rect x="-170" y="-108" width="340" height="18" rx="8" fill="url(#hWood)" stroke="#8A5E34" stroke-width="4"/><g transform="translate(-200 -536) rotate(-1.5 200 215)">${checkBoard(t, ticks, o)}</g>`; }
// a wide glass jar: 200 wide, 230 tall. o.lid: "tight" | "holes" | null; o.lidY, o.lidX = lift; inner = svg inside (drawn behind the glass)
function jarLid(kind) { let holes = ""; if (kind === "holes") for (let i = 0; i < 7; i++) holes += `<ellipse cx="${-66 + i * 22}" cy="${-262 + (i % 2) * 7}" rx="6.5" ry="3.6" fill="${P.night}" opacity=".85"/>`;
  return `<rect x="-96" y="-256" width="192" height="40" rx="10" fill="url(#hLid)" stroke="#6E7896" stroke-width="4"/><g stroke="#6E7896" stroke-width="3" opacity=".6">${Array.from({ length: 11 }, (_, i) => `<path d="M${-80 + i * 16} -248 V-222"/>`).join("")}</g>
  <ellipse cx="0" cy="-258" rx="96" ry="17" fill="#EEF2FA" stroke="#6E7896" stroke-width="4"/>${kind === "holes" ? holes : `<ellipse cx="-22" cy="-261" rx="46" ry="6" fill="#fff" opacity=".8"/>`}`; }
function jar(inner = "", o = {}) { const lid = o.lid === undefined ? "tight" : o.lid;
  return `<ellipse cx="0" cy="3" rx="118" ry="12" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><path d="M-100 -200 Q-104 -222 -84 -226 H84 Q104 -222 100 -200 V-26 Q100 0 74 0 H-74 Q-100 0 -100 -26z" fill="#EAF6FF" opacity=".42"/>${inner}
  <path d="M-100 -200 Q-104 -222 -84 -226 H84 Q104 -222 100 -200 V-26 Q100 0 74 0 H-74 Q-100 0 -100 -26z" fill="url(#hJar)" stroke="#F4FAFF" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-80 -196 L-58 -196 L-66 -30 L-80 -30z" fill="#fff" opacity=".45"/><path d="M62 -190 L74 -190 L74 -60 L66 -60z" fill="#fff" opacity=".25"/>
  ${lid ? `<g transform="translate(${n2(o.lidX || 0)} ${n2(o.lidY || 0)}) rotate(${n2(o.lidR || 0)} 0 -240)">${jarLid(lid)}</g>` : `<ellipse cx="0" cy="-226" rx="88" ry="12" fill="none" stroke="#F4FAFF" stroke-width="5"/>`}`; }
// the mealworm's own tub: a low clear tub, a blue lid with air holes
function tub(inner = "", o = {}) { const lid = o.lid === undefined ? 1 : o.lid; let holes = ""; for (let i = 0; i < 6; i++) holes += `<ellipse cx="${-90 + i * 36}" cy="-138" rx="8" ry="4.5" fill="${P.night}" opacity=".8"/>`;
  return `<ellipse cx="0" cy="3" rx="150" ry="12" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><path d="M-140 -124 H140 L122 -8 Q120 0 110 0 H-110 Q-120 0 -122 -8z" fill="#EAF6FF" opacity=".5"/>${inner}
  <path d="M-140 -124 H140 L122 -8 Q120 0 110 0 H-110 Q-120 0 -122 -8z" fill="url(#hTub)" stroke="#F4FAFF" stroke-width="6" stroke-linejoin="round" fill-opacity=".5"/><path d="M-118 -110 L-92 -110 L-100 -20 L-112 -20z" fill="#fff" opacity=".45"/>
  <g transform="translate(40 -54) rotate(-3)"><rect x="-62" y="-18" width="124" height="36" rx="8" fill="${P.paper}" stroke="${P.sunDeep}" stroke-width="3"/>${T(0, 8, "MEALWORM", 19, P.ink, { ls: 1 })}</g>
  ${lid ? `<g transform="translate(0 ${n2(o.lidY || 0)})" opacity="${n2(lid)}"><rect x="-152" y="-150" width="304" height="30" rx="12" fill="#5FB0FF" stroke="#2C6FE8" stroke-width="4"/><rect x="-142" y="-146" width="284" height="8" rx="4" fill="#fff" opacity=".35"/>${holes}</g>` : ""}`; }
// the mealworm's dish as it sits inside a small container (jar, glass box, tub)
const dishIn = (o = {}) => TF(o.x || 0, o.y === undefined ? -8 : o.y, o.s || .62, wormDish({ bites: o.bites === undefined ? 1 : o.bites, wx: o.wx === undefined ? -40 : o.wx, wl: 78, wb: o.wb === undefined ? .3 : o.wb, id: o.id || "cbj" }));
// a small spotted cloth over a pot: about 190 wide, 250 tall. o.peek: 0..1 a thin pale tip under the edge; o.tag
function coveredPot(o = {}) { const tall = o.tall || 250; let dots = ""; for (let i = 0; i < 14; i++) dots += `<circle cx="${n2(-70 + (i % 4) * 46 + (Math.floor(i / 4) % 2) * 22)}" cy="${n2(-tall + 44 + Math.floor(i / 4) * 54)}" r="8"/>`;
  return `<ellipse cx="0" cy="3" rx="112" ry="12" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><path d="M-50 -110 H50 L40 -6 Q0 6 -40 -6z" fill="url(#gPot)" stroke="#9C4423" stroke-width="5" stroke-linejoin="round"/>
  ${o.peek ? `<path d="M-64 -30 q-22 4 -34 ${n2(-10 - 12 * o.peek)}" fill="none" stroke="#E9DE8A" stroke-width="7" stroke-linecap="round"/><ellipse cx="${n2(-100)}" cy="${n2(-42 - 12 * o.peek)}" rx="13" ry="7" fill="#F4EBA0" stroke="#C9B85A" stroke-width="3" transform="rotate(-30 -100 ${n2(-42 - 12 * o.peek)})"/>` : ""}
  <g filter="url(#dropS)"><path d="M-78 -40 Q-96 ${-tall * .6} -44 ${-tall + 8} Q0 ${-tall - 12} 44 ${-tall + 8} Q96 ${-tall * .6} 80 -44 Q62 -30 44 -44 Q22 -58 0 -42 Q-22 -28 -44 -44 Q-62 -56 -78 -40z" fill="url(#xCloth)" stroke="#C4476A" stroke-width="4" stroke-linejoin="round"/></g>
  <g fill="#fff" opacity=".45">${dots}</g><path d="M-40 ${-tall + 26} Q0 ${-tall + 6} 40 ${-tall + 26}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".35"/>
  ${o.tag ? `<g transform="translate(96 -150) rotate(7)"><path d="M-70 -6 L-98 -22" stroke="${P.ink2}" stroke-width="3"/><g filter="url(#dropS)"><rect x="-74" y="-36" width="170" height="72" rx="10" fill="${P.paper}" stroke="${P.sunDeep}" stroke-width="3"/></g><circle cx="-60" cy="-22" r="5" fill="${P.ink2}"/>${T(12, -4, "from Pip’s", 23, P.ink, { w: 600 })}${T(12, 24, "cupboard", 23, P.ink, { w: 600 })}</g>` : ""}`; }
// a bean plant in a pot. o.pale 0..1 (0 = green and strong, 1 = pale yellow, thin and weak), o.k = size 0..1, o.lit = leaves lit, o.sway
function beanPot(o = {}) { const pale = o.pale || 0, k = o.k === undefined ? 1 : o.k, h = (pale ? 232 : 200) * k, sw = o.sway || 0;
  const stemC = pale ? "#DDD27E" : "#2C9A55", stemL = pale ? "#F6F0B8" : "#9BE08F", lf = (L, lit) => pale ? `<path d="M0 0 C${n2(L * .3)} ${n2(-L * .3)} ${n2(L * .8)} ${n2(-L * .22)} ${n2(L)} 0 C${n2(L * .8)} ${n2(L * .2)} ${n2(L * .3)} ${n2(L * .26)} 0 0z" fill="url(#hPale)" stroke="#C2B052" stroke-width="3" stroke-linejoin="round"/>` : bleaf(L, lit);
  // the pale plant is thin and leans over a little; the green plant stands straight with wide leaves
  const tx = pale ? 46 * k + sw : sw, st = `M0 -108 C${n2(-6 + tx * .1)} ${n2(-108 - h * .4)} ${n2(pale ? 30 * k : 6)} ${n2(-108 - h * .72)} ${n2(tx)} ${n2(-108 - h)}`;
  let s = `<ellipse cx="0" cy="3" rx="92" ry="11" fill="${P.ink}" opacity=".24" filter="url(#b4)"/><ellipse cx="0" cy="-110" rx="54" ry="13" fill="url(#hSoil)" stroke="#3A2420" stroke-width="4"/>`;
  if (k > .02) { s += `<path d="${st}" fill="none" stroke="${stemC}" stroke-width="${pale ? 6 : 10}" stroke-linecap="round"/><path d="${st}" fill="none" stroke="${stemL}" stroke-width="${pale ? 2 : 4}" stroke-linecap="round" opacity=".7"/>`;
    const L = (pale ? 34 : 78) * Math.max(.3, k), pr = (u, sc, da) => { const px = tx * u * u + (pale ? 14 * k * Math.sin(u * 3) : 0), py = -108 - h * u; return `<g transform="translate(${n2(px)} ${n2(py)})"><g transform="rotate(${n2(-160 + da + (pale ? 34 : 0))})">${lf(L * sc, true)}</g><g transform="rotate(${n2(-20 - da + (pale ? 30 : 0))})">${lf(L * sc, false)}</g></g>`; };
    if (!pale) s += pr(.5, .95, 8); s += pr(1, pale ? 1 : 1.1, pale ? 0 : 16) + (pale ? "" : `<g transform="translate(${n2(tx)} ${n2(-108 - h)}) rotate(-90) scale(.5)">${bleaf(L, true)}</g>`); }
  return s + `<path d="M-50 -110 H50 L40 -6 Q0 6 -40 -6z" fill="url(#gPot)" stroke="#9C4423" stroke-width="5" stroke-linejoin="round"/><rect x="-58" y="-124" width="116" height="26" rx="10" fill="url(#gPot)" stroke="#9C4423" stroke-width="5"/><path d="M-46 -116 h48" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/>`; }
// a small watering can; tilt in degrees (pouring to the left), pour 0..1 = the stream of water, drops fall from the spout. Origin = middle of its base
function wateringCan(tilt = 0, pour = 0, t = 0) { let w = ""; if (pour > .02) { for (let i = 0; i < 7; i++) { const u = ((t * 2.2 + i / 7) % 1), x = -126 - 36 * u, y = -112 + 190 * u * u * pour + 30 * u; w += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="6" ry="${n2(9 + 5 * u)}" fill="#6FC3FF" opacity="${n2(pour * (1 - u * .5))}"/>`; } }
  return `<g transform="rotate(${n2(-tilt)} -20 -40)"><ellipse cx="0" cy="3" rx="${n2(84 * (1 - tilt / 90))}" ry="9" fill="${P.ink}" opacity="${n2(.22 * (1 - tilt / 60))}" filter="url(#b4)"/>
  <path d="M56 -30 Q112 -40 100 -96 Q92 -128 52 -112" fill="none" stroke="#2A8FA8" stroke-width="13" stroke-linecap="round"/><path d="M-52 -78 L-118 -118" stroke="#2A8FA8" stroke-width="15" stroke-linecap="round"/><path d="M-52 -78 L-116 -117" stroke="#5CC4D8" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="-124" cy="-121" rx="13" ry="19" fill="#5CC4D8" stroke="#2A8FA8" stroke-width="4" transform="rotate(-58 -124 -121)"/>
  <path d="M-58 -116 H58 L50 0 H-50z" fill="url(#hCan)" stroke="#1F7F98" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-116" rx="58" ry="11" fill="#9FE3F0" stroke="#1F7F98" stroke-width="4"/><path d="M-40 -96 V-20" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/>${w}</g>`; }
const biscuit = (bites = 0) => `<g filter="url(#dropS)"><circle r="44" fill="url(#hBis)" stroke="#A8742E" stroke-width="5"/>${bites ? `<circle cx="34" cy="-30" r="24" fill="#000" opacity="0"/>` : ""}</g><g fill="#7A4A2B"><circle cx="-16" cy="-12" r="6"/><circle cx="12" cy="-20" r="5"/><circle cx="18" cy="12" r="6"/><circle cx="-8" cy="18" r="5"/><circle cx="-26" cy="8" r="4"/></g><path d="M-26 -28 q14 -10 30 -6" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/>`;
// an adult's hand and forearm coming down from above (origin = the fingertips; the arm goes up out of frame): a long sleeve with a cuff
const adultArm = (sleeve = "#5B7BD6", line = "#3A56A8") => `<path d="M-52 -760 Q-56 -400 -46 -150 H46 Q56 -400 52 -760z" fill="${sleeve}" stroke="${line}" stroke-width="5" stroke-linejoin="round"/><rect x="-54" y="-176" width="108" height="34" rx="10" fill="#fff" stroke="${line}" stroke-width="4"/>
  <path d="M-40 -146 Q-48 -70 -36 -18 Q-30 4 -10 2 L24 0 Q42 -4 42 -40 Q46 -100 40 -146z" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5" stroke-linejoin="round"/><path d="M-12 -4 V-46 M10 -2 V-48 M30 -8 V-44" stroke="${SKIN2}" stroke-width="4" stroke-linecap="round"/><path d="M42 -92 Q66 -80 60 -50 Q56 -36 44 -40" fill="${SKIN}" stroke="${SKIN2}" stroke-width="5" stroke-linejoin="round"/>`;
// a thin swirl of air drifting along a path (drawn, moving with t). x, y = start; dx, dy = where it goes; ph = phase
function airSwirl(t, x, y, dx, dy, ph = 0, col = "#fff", op = .9) { const u = ((t * .45 + ph) % 1), cx = x + dx * u, cy = y + dy * u + 10 * Math.sin(u * 9 + ph * 7), a = Math.sin(Math.PI * u);
  return `<g transform="translate(${n2(cx)} ${n2(cy)}) rotate(${n2(Math.atan2(dy, dx) * 180 / Math.PI)})" opacity="${n2(a * op)}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round"><path d="M-34 0 H6 a9 9 0 1 0 -9 -9"/><path d="M-26 12 H16"/></g>`; }
// sparkles on leaves ("making food"): n small four-point stars around (x, y)
function leafSparkles(t, x, y, rx, ry, n = 7, seed = 1) { let s = ""; for (let i = 0; i < n; i++) { const life = 1.0 + hash(i, seed) * .7, v = ((t + hash(i, seed + 2) * 3) % life) / life, px = x + (hash(i, seed + 4) - .5) * 2 * rx, py = y + (hash(i, seed + 6) - .5) * 2 * ry - 14 * v;
    s += `<g transform="translate(${n2(px)} ${n2(py)}) scale(${n2((.35 + hash(i, seed + 8) * .4) * Math.sin(Math.PI * v))}) rotate(${n2(60 * v)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#FFF6C8" stroke="${P.sun}" stroke-width="3"/></g>`; } return s; }
// a dust puff at the foot of something that slides or lands
const dust = (x, y, u, k = 1) => u <= 0 || u >= 1 ? "" : `<ellipse cx="${n2(x - 30 * k * u)}" cy="${n2(y - 8 * u)}" rx="${n2((16 + 26 * u) * k)}" ry="${n2((8 + 10 * u) * k)}" fill="#fff" opacity="${n2(.5 * (1 - u))}" filter="url(#b4)"/><ellipse cx="${n2(x + 30 * k * u)}" cy="${n2(y - 8 * u)}" rx="${n2((16 + 26 * u) * k)}" ry="${n2((8 + 10 * u) * k)}" fill="#fff" opacity="${n2(.5 * (1 - u))}" filter="url(#b4)"/>`;
// something slides along the ledge from x0 to x1 (t0 .. t0+d), with a little settle wobble; returns [x, dustSvg, squash]
function slideX(t, t0, d, x0, x1, y) { const u = clamp((t - t0) / d), x = lerp(x0, x1, eio(u)); let ds = ""; if (u > 0 && u < 1) for (let i = 0; i < 3; i++) ds += dust(x + (x0 < x1 ? -60 : 60), y, ((t - t0) * 3 + i / 3) % 1, .7); ds += dust(x1, y, (t - t0 - d) / .35, 1); return [x, ds, t > t0 + d ? 1 - .06 * wob(t, t0 + d, .3) : 1]; }

/* ---------- the place: the window ledge (static, baked). mode: am | pm | sunset ---------- */
BG.ledge = (mode = "am") => { const pm = mode === "pm", sn = mode === "sunset";
  const sky = sn ? [[0, "#5D55B0"], [.45, "#E8866E"], [.8, "#FFBE66"], [1, "#FFE2A0"]] : pm ? [[0, "#6FAEF5"], [.6, "#D6E8FA"], [1, "#FFE0B0"]] : [[0, "#7FB7FF"], [.6, "#CFE6FF"], [1, "#FFE9C8"]];
  const wall = sn ? [[0, "#5E4CA8"], [.6, "#A86FA6"], [1, "#DD9488"]] : pm ? [[0, "#9083DA"], [.7, "#CBAFE4"], [1, "#EEC6CC"]] : [[0, "#8E86E0"], [.7, "#C5B1EE"], [1, "#E6C4DA"]];
  const bl = sn ? [["#B8707A", "#FF8A66"], ["#9A6FA6", "#9B6BFF"], ["#C98A6E", "#2EC4B6"], ["#A8687E", "#FF8A66"]] : [["#E9A7A0", "#FF8A66"], ["#D9B3D6", "#9B6BFF"], ["#F1B79A", "#2EC4B6"], ["#E6B0B6", "#FFC83A"]];
  return `<defs>${lg("lgSky" + mode, sky)}${lg("lgWall" + mode, wall)}</defs>
  <rect x="-200" y="-120" width="2320" height="1320" fill="url(#lgWall${mode})"/>
  <g clip-path="url(#lgW)"><rect x="640" y="-60" width="1500" height="860" fill="url(#lgSky${mode})"/>
    ${sn ? `<circle cx="1290" cy="650" r="120" fill="#FFF0B0" filter="url(#b10)"/><circle cx="1290" cy="650" r="420" fill="#FFB060" opacity=".6" filter="url(#b60)"/>` : pm ? `<circle cx="1560" cy="230" r="260" fill="#FFEFB0" opacity=".85" filter="url(#b60)"/>` : `<circle cx="1820" cy="170" r="260" fill="#FFF3B8" opacity=".9" filter="url(#b60)"/>`}
    <g filter="url(#b4)">${hdbBlock(700, 300, 250, bl[0][0], bl[0][1])}${hdbBlock(1070, 240, 380, bl[1][0], bl[1][1])}${hdbBlock(1400, 330, 190, bl[2][0], bl[2][1])}${hdbBlock(1800, 320, 310, bl[3][0], bl[3][1])}
      <path d="M640 760 Q900 700 1200 750 T1800 735 T2140 730 V820 H640z" fill="${sn ? "#4E8A66" : "#57B77A"}"/></g>
    <rect x="640" y="-60" width="1500" height="860" fill="${sn ? "#FF8A4A" : "#FFD9A0"}" opacity="${sn ? .2 : pm ? .16 : .1}"/></g>
  <g filter="url(#b2)"><g fill="none" stroke="#F7F1FF" stroke-width="26"><rect x="640" y="-60" width="1500" height="860"/><path d="M1015 -60 V800 M1390 -60 V800 M1765 -60 V800"/></g>
  <g stroke="#F7F1FF" stroke-width="8" opacity=".9"><path d="M640 150 H2140 M640 370 H2140 M640 590 H2140"/></g></g>
  <g style="mix-blend-mode:screen"><path d="M700 -60 L1700 -60 L1000 1200 L-200 1200z" fill="${sn ? "#FF9A4A" : "#FFE27A"}" opacity="${sn ? .3 : pm ? .2 : .15}" filter="url(#b30)"/></g>
  <rect x="-200" y="800" width="2320" height="400" fill="url(#xLedge)"/><rect x="-200" y="800" width="2320" height="8" fill="#fff" opacity=".7"/>
  ${sn ? `<rect x="-200" y="-120" width="2320" height="1320" fill="#FF7A3A" opacity=".14"/><rect x="-200" y="800" width="2320" height="400" fill="#E8866E" opacity=".25"/>` : pm ? `<rect x="-200" y="-120" width="2320" height="1320" fill="#FFB060" opacity=".06"/>` : ""}`; };
BG.ledge_am = () => BG.ledge("am"); BG.ledge_pm = () => BG.ledge("pm"); BG.ledge_sunset = () => BG.ledge("sunset");

/* ---------- the hotel, wide. st: { mode, mode2, mix, clock, sign, rooms: [k, k, k], board (k), ticks, bopt, wall (svg on the wall), items (svg, world), over }.
   Everything stands on the ledge at y = HT.fy. cam = [zoom, cx, cy] ---------- */
function hotelView(t, st = {}, cam = [1, 960, 540]) { const m = st.mode || "am"; let w = bg("ledge_" + m); if (st.mode2 && st.mix > 0) w += OP(st.mix, bg("ledge_" + st.mode2));
  w += (st.wall0 || "") + TF(HT.clock[0], HT.clock[1], 1, wallClock(st.clock === undefined ? 9 : st.clock)) + (st.wall || "");
  const sg = st.sign === undefined ? 1 : st.sign, rm = st.rooms || [1, 1, 1], bd = st.board === undefined ? 1 : st.board;
  if (sg > .02) w += TF(HT.sign + (st.signDx || 0), HT.fy - 4, sg, hotelSign());
  rm.forEach((k, i) => { if (k > .02) w += TF(HT.rx[i] + ((st.roomDx || [])[i] || 0), HT.fy - 30, 1, `<g transform="scale(${n2(k)})">${roomFront(i + 1)}</g>`); });
  if (bd > .02) w += TF(HT.bd, HT.fy - 24, .56 * bd, boardEasel(t, st.ticks || {}, st.bopt || {}));
  w += (st.items || "") + (st.over || "");
  const warm = m === "sunset" ? `<rect width="1920" height="1080" fill="#FF8A4A" opacity=".1" style="mix-blend-mode:multiply"/>` : "";
  return CAM(w, cam[0], cam[1], cam[2]) + warm; }
// where a world point lands on screen for a camera
const camX = (cam, x) => cam[1] + (x - cam[1]) * cam[0], camY = (cam, y) => cam[2] + (y - cam[2]) * cam[0];   // CAM zooms ABOUT (cx, cy)
// the guests, in world coordinates
const gPlant = (o = {}, x = HT.rx[0], s = .86) => TF(x, HT.fy - 54 * s + (o.dy || 0), s, potPlant(o));
const gBox = (inner = "", o = {}, x = HT.box) => TF(x, HT.fy + 6, .8, ourBox(inner, o));
const gJar = (inner = "", o = {}, x = HT.rx[1]) => TF(x, HT.fy, .9, jar(inner, o));
const gCover = (o = {}, x = HT.rx[2]) => TF(x, HT.fy, .86, coveredPot({ tag: true, ...o }));
const gBean = (o = {}, x = HT.rx[2]) => TF(x, HT.fy, .9, beanPot(o));
// a paw pushing from below (the arm goes down out of frame). kind 0 Momo, 1 Pip, 2 Basil
const pawUp = (x, y, kind = 1, s = .8) => TF(x, y, s, `<g transform="rotate(180)">${paw(kind === 2 ? "#DCE4DE" : kind === 0 ? "#E4E1EC" : "#D9D4EA", "#9C96B8", kind)}</g>`);
const pawDown = (x, y, kind = 1, s = .8) => TF(x, y, s, paw(kind === 2 ? "#DCE4DE" : kind === 0 ? "#E4E1EC" : "#D9D4EA", "#9C96B8", kind));

/* ---------- the pupil (drawn simply; PE kit: white T-shirt with a coloured collar, dark shorts). Origin = the feet. About 300 tall.
   o: armL, armR (degrees, 0 = down, 90 = out to the side, 180 = up), legL, legR (degrees), mouth: smile | open | o, hair, lean, bottle, sweat ---------- */
function kid(o = {}) { const { armL = 14, armR = 14, legL = 0, legR = 0, mouth = "smile", lean = 0, col = "#2EC4B6" } = o, hairC = "#3A2A22";
  const arm = (sx, a, extra = "") => `<g transform="translate(${sx * 44} -178) rotate(${n2(sx * -a)})"><rect x="-13" y="0" width="26" height="86" rx="13" fill="${SKIN}" stroke="${SKIN2}" stroke-width="4"/><rect x="-16" y="-6" width="32" height="38" rx="12" fill="url(#hShirt)" stroke="#B9C6DE" stroke-width="4"/>${extra}</g>`;
  const leg = (sx, a) => `<g transform="translate(${sx * 22} -92) rotate(${n2(a)})"><rect x="-14" y="0" width="28" height="84" rx="13" fill="${SKIN}" stroke="${SKIN2}" stroke-width="4"/><rect x="-18" y="72" width="${42}" height="22" rx="10" fill="#fff" stroke="#8D97B2" stroke-width="4" transform="translate(${sx > 0 ? 0 : -6} 0)"/></g>`;
  const m = mouth === "open" ? `<ellipse cx="0" cy="-222" rx="11" ry="9" fill="#8E3A4A"/>` : mouth === "o" ? `<ellipse cx="0" cy="-222" rx="7" ry="8" fill="#8E3A4A"/>` : mouth === "flat" ? `<path d="M-9 -222 h18" stroke="#8E3A4A" stroke-width="4" stroke-linecap="round"/>` : `<path d="M-12 -226 q12 12 24 0" fill="none" stroke="#8E3A4A" stroke-width="4.5" stroke-linecap="round"/>`;
  return `<g transform="rotate(${n2(lean)})"><ellipse cx="0" cy="3" rx="70" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>${leg(-1, legL)}${leg(1, legR)}
    <rect x="-40" y="-118" width="80" height="50" rx="14" fill="#34406E" stroke="#232C52" stroke-width="4"/>${arm(-1, armL, o.exL || "")}
    <rect x="-46" y="-192" width="92" height="96" rx="24" fill="url(#hShirt)" stroke="#B9C6DE" stroke-width="4"/><path d="M-20 -192 Q0 -172 20 -192" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>${arm(1, armR, o.exR || "")}
    <circle cx="0" cy="-246" r="56" fill="${SKIN}" stroke="${SKIN2}" stroke-width="4"/><path d="M-56 -252 Q-58 -312 0 -308 Q58 -312 56 -252 Q40 -284 0 -282 Q-40 -284 -56 -252z" fill="${hairC}"/>${o.hair === "tails" ? `<circle cx="-62" cy="-268" r="20" fill="${hairC}"/><circle cx="62" cy="-268" r="20" fill="${hairC}"/><circle cx="-50" cy="-278" r="7" fill="${P.coral}"/><circle cx="50" cy="-278" r="7" fill="${P.coral}"/>` : ""}
    ${o.eyes === "shut" ? `<path d="M-28 -248 q8 -8 16 0 M12 -248 q8 -8 16 0" fill="none" stroke="${P.ink}" stroke-width="4.5" stroke-linecap="round"/>` : `<circle cx="-20" cy="-248" r="7" fill="${P.ink}"/><circle cx="20" cy="-248" r="7" fill="${P.ink}"/><circle cx="-18" cy="-250" r="2.4" fill="#fff"/><circle cx="22" cy="-250" r="2.4" fill="#fff"/>`}
    <ellipse cx="-36" cy="-232" rx="10" ry="6" fill="#FF9CA8" opacity=".55"/><ellipse cx="36" cy="-232" rx="10" ry="6" fill="#FF9CA8" opacity=".55"/>${m}
    ${o.sweat ? `<path d="M52 -290 q-9 14 0 20 q9 -6 0 -20z M70 -262 q-7 11 0 16 q7 -5 0 -16z" fill="#8CC8FF" stroke="#3A8DFF" stroke-width="3"/>` : ""}</g>`; }
const bottle = () => `<rect x="-14" y="-64" width="28" height="64" rx="9" fill="#8CC8FF" stroke="#2C6FE8" stroke-width="4"/><rect x="-9" y="-80" width="18" height="18" rx="5" fill="#2C6FE8"/><rect x="-9" y="-50" width="7" height="34" rx="3.5" fill="#fff" opacity=".6"/>`;
// a picture card standing on the ledge: 380 x 430 with a label strip. Origin = the middle of its base. inner is drawn in a 340 x 300 window (centre 0, -240)
function picCard(inner, label, o = {}) { const w = o.w || 380, h = o.h || 430, id = o.id || "pc", sky = o.sky || ["#BFE6FF", "#FFF3DC"];
  return `<ellipse cx="0" cy="4" rx="${w * .52}" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-60 0 L-40 -40 H40 L60 0z" fill="url(#hWood)" stroke="#8A5E34" stroke-width="4" stroke-linejoin="round"/>
  <g transform="rotate(${o.rot || 0} 0 ${-h / 2})"><g filter="url(#drop)"><rect x="${-w / 2}" y="${-h - 20}" width="${w}" height="${h}" rx="26" fill="url(#gPaper)"/></g><defs><clipPath id="${id}"><rect x="${-w / 2 + 18}" y="${-h - 2}" width="${w - 36}" height="${h - 110}" rx="16"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
  <g clip-path="url(#${id})"><rect x="${-w / 2 + 18}" y="${-h - 2}" width="${w - 36}" height="${h - 110}" fill="url(#${id}g)"/>${inner}</g>
  ${label ? T(0, -52, label, o.size || 40, P.ink, { w: 700 }) : ""}</g>`; }
