// walk.js: EP12 STAGE 2 art. The supermarket trolley (side view, loaded, from above, in the bay), the shopping, the three bottles, the fish
// tank and its guppies, the car, the two sets (BG.walk = the covered walkway in front of a neighbourhood supermarket with the trolley bay and
// the aquarium shop next door; BG.park = the open-air car park beside the block), the two hidden animals (mynahArt, squirrelArt), the EP13
// dare boards (PIC.bagFabric / bagMetal / bagWood) and the small picture tiles of the board MATCH THE JOB (TILE).
// Loaded after ep09drop.js, before common.js. Bake the sets after any change: NODE_PATH=$(npm root -g) node bake.js walk park
const XDEFS12 = () => `${lg("wSteel", [[0, "#F4F7FB"], [.5, "#B9C3D4"], [1, "#8490A8"]])}${lg("wSteelH", [[0, "#8490A8"], [.35, "#F4F7FB"], [.7, "#B9C3D4"], [1, "#7A869E"]], 1, 0)}
  ${lg("wWall", [[0, "#FFF4DE"], [1, "#F3DDBB"]])}${lg("wFloor", [[0, "#E9DCC6"], [1, "#CDBB9E"]])}${lg("wCeil", [[0, "#B9A98F"], [1, "#E5D6BC"]])}${lg("wShop", [[0, "#FFFDF4"], [1, "#F6E7C6"]])}
  ${lg("wWater", [[0, "#BDEBFF", .75], [1, "#6FC7EE", .8]])}${lg("wWood", [[0, "#C98F56"], [1, "#9A6535"]])}${lg("wSky", [[0, "#7CCBFF"], [1, "#DDF4FF"]])}${lg("wRoad", [[0, "#8D8FA6"], [1, "#6E7089"]])}
  ${lg("wCar", [[0, "#6CC0F5"], [.55, "#3A8DDB"], [1, "#2A6DB8"]])}${lg("wGlassC", [[0, "#EAF8FF", .9], [1, "#A9DBF2", .8]])}${lg("wSeat", [[0, "#9A8FC2"], [1, "#6F6499"]])}${lg("wLeaf", [[0, "#6FD08A"], [1, "#2F9A57"]])}
  ${lg("wPlast", [[0, "#DDF3FF", .55], [.5, "#FFFFFF", .7], [1, "#BFE6FF", .55]], 1, 0)}${lg("wGlassB", [[0, "#CFF3EA", .6], [.4, "#FFFFFF", .85], [1, "#A6E0D2", .6]], 1, 0)}
  <filter id="wBlur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/></filter>
  <pattern id="wWeave" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#8478B0"/><path d="M0 3.5 H14 M0 10.5 H14" stroke="#A69BD0" stroke-width="3"/><path d="M3.5 0 V14 M10.5 0 V14" stroke="#6A5F96" stroke-width="2" opacity=".7"/></pattern>
  <pattern id="wBrush" width="6" height="40" patternUnits="userSpaceOnUse"><path d="M1.5 0 V40 M4.5 6 V30" stroke="#fff" stroke-width="1" opacity=".35"/></pattern>`;
const MET = "#8E99B5", METD = "#66718D", METL = "#E8EDF7";

/* ---------- the shopping ---------- */
// the sack RICE 10 kg (origin = its bottom centre; 124 x 88)
const riceSack = (k = 1) => TF(0, 0, k, `<path d="M-60 0 Q-66 -44 -56 -84 Q0 -94 56 -84 Q66 -44 60 0 Q0 8 -60 0z" fill="#FFF6DE" stroke="#C9A772" stroke-width="5" stroke-linejoin="round"/><path d="M-54 -70 H54" stroke="#E8604E" stroke-width="7"/><path d="M-54 -14 H54" stroke="#E8604E" stroke-width="4"/>${T(0, -38, "RICE", 26, "#C4502E", { ls: 2 })}${T(0, -20, "10 kg", 15, "#8A6A3A", { w: 600 })}`);
// a big drinks bottle (origin = base centre; 22 x 108) and a tin (origin = base centre; 30 x 22)
const drinkB = (i) => { const c = ["#FF9838", "#43BF6C", "#FF6F61", "#9B6BFF"][i % 4]; return `<path d="M-11 0 V-70 Q-11 -84 -5 -92 V-104 H5 V-92 Q11 -84 11 -70 V0z" fill="${c}" stroke="${P.ink}" stroke-width="3" stroke-linejoin="round" opacity=".95"/><rect x="-6" y="-110" width="12" height="9" rx="2" fill="#fff" stroke="${P.ink}" stroke-width="2.5"/><rect x="-11" y="-56" width="22" height="26" fill="#fff" opacity=".85"/><path d="M-6 -84 V-66" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`; };
const tinC = (i) => `<rect x="-15" y="-22" width="30" height="22" rx="4" fill="url(#wSteelH)" stroke="${METD}" stroke-width="3"/><rect x="-15" y="-17" width="30" height="12" fill="${["#FF6F61", "#3A8DFF", "#43BF6C"][i % 3]}"/>`;

/* ---------- the supermarket trolley, side view. origin = the ground under the basket's middle; it faces right (the handle is on the left).
   o.load = { rice: dy, bot: [dy x4], tins: [dy x3] } (dy = how far above its place a thing still is; undefined = not there), o.rot = wheel turn
   (degrees), o.dip = px the basket sinks on its wheels, o.rat = bottle rattle (px), o.flap = [kinds] three water bottles standing in the flap ---------- */
function trolleyS(o = {}) { const L = o.load || {}, d = o.dip || 0, st = `fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const wheel = (x) => `<g transform="translate(${x} -17)"><path d="M0 -4 L${x < 0 ? 8 : -8} -34" stroke="${METD}" stroke-width="9" stroke-linecap="round"/><circle r="17" fill="#3A4258" stroke="#232A3B" stroke-width="5"/><g transform="rotate(${n2(o.rot || 0)})"><path d="M-11 0 H11 M0 -11 V11" stroke="#9AA5BD" stroke-width="4" stroke-linecap="round"/></g><circle r="4.5" fill="${METL}"/></g>`;
  let inside = "";
  if (L.rice !== undefined) inside += TF(-22, -103 + L.rice, 1, riceSack());
  (L.tins || []).forEach((dy, i) => { if (dy !== undefined) inside += TF(-58 + i * 34, -193 + dy, 1, tinC(i)); });
  (L.bot || []).forEach((dy, i) => { if (dy !== undefined) inside += TF(52 + i * 22 + (o.rat || 0) * (i % 2 ? 1 : -1), -103 + dy - Math.abs(o.rat || 0) * .6, 1, drinkB(i)); });
  let grid = ""; for (let i = 0; i <= 10; i++) { const u = i / 10; grid += `<path d="M${n2(lerp(-124, 132, u))} -238 L${n2(lerp(-98, 104, u))} -98" stroke="${MET}" stroke-width="3.5"/>`; }
  for (let j = 1; j <= 4; j++) { const v = j / 5, y = lerp(-238, -98, v); grid += `<path d="M${n2(lerp(-124, -98, v))} ${n2(y)} H${n2(lerp(132, 104, v))}" stroke="${MET}" stroke-width="3.5"/>`; }
  const flap = (o.flap || []).map((k, i) => TF(-96 + i * 24, -150, .4, bottleSvg(k))).join("");
  return wheel(-84) + wheel(78)
    + `<g transform="translate(0 ${n2(d)})"><path d="M-92 -52 H84 M-98 -98 L-92 -52 M104 -98 L84 -52" ${st} stroke="${METD}" stroke-width="9"/><path d="M-92 -52 H84" ${st} stroke="${METL}" stroke-width="3" opacity=".8"/>
      <path d="M-124 -238 H132 L104 -98 H-98z" fill="#DCE4F2" opacity=".28"/>${inside}${flap}<g ${st}>${grid}</g>
      <path d="M-124 -238 H132 L104 -98 H-98z" ${st} stroke="${METD}" stroke-width="9"/><path d="M-120 -241 H128" ${st} stroke="${METL}" stroke-width="3"/><path d="M-98 -98 H104" ${st} stroke="${MET}" stroke-width="11"/><path d="M-96 -101 H102" ${st} stroke="${METL}" stroke-width="3" opacity=".9"/>
      <path d="M-122 -232 L-88 -150" ${st} stroke="${METD}" stroke-width="5"/>
      <path d="M-124 -238 L-166 -268" ${st} stroke="${METD}" stroke-width="10"/><rect x="-190" y="-281" width="40" height="22" rx="11" fill="#E8604E" stroke="#B8402E" stroke-width="4"/></g>`; }
// two trolleys pushed one into the next in the bay (origin = the ground under the BACK of the last one: where a new trolley's front meets it)
const bayRow = (n = 3) => { let s = ""; for (let i = n - 1; i >= 0; i--) s += TF(150 + i * 64, 0, 1, trolleyS()); return `<path d="M-10 -70 V0 M-10 -64 H${150 + n * 64 + 150} M${150 + n * 64 + 150} -70 V0" stroke="#F2B63C" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` + s; };
// the sign TROLLEYS on its post (origin = the foot of the post); the mynah sits on top of the sign at (0, -SIGN_H)
const SIGN_H = 432;
const baySign = () => `<rect x="-8" y="-360" width="16" height="360" rx="6" fill="#8490A8" stroke="#5E6B7C" stroke-width="4"/><g filter="url(#dropS)"><rect x="-150" y="-430" width="300" height="84" rx="16" fill="#2F9A57" stroke="#fff" stroke-width="6"/></g>${T(0, -372, "TROLLEYS", 46, "#fff", { ls: 3 })}`;
// the trolley from above, a little from the side (the cliffhanger). origin = its middle. The fold-down flap is the small section by the handle
function trolleyTop(o = {}) { let g = ""; for (let i = 0; i <= 12; i++) g += `<path d="M${-300 + i * 50} -150 V150" stroke="${MET}" stroke-width="4"/>`; for (let j = 0; j <= 6; j++) g += `<path d="M-300 ${-150 + j * 50} H300" stroke="${MET}" stroke-width="4"/>`;
  return `<path d="M-300 -150 H300 L270 150 H-300z" fill="#E9EEF7"/><g opacity=".55">${g}</g>
    ${TF(120, 96, 1.5, riceSack())}${[0, 1, 2].map((i) => TF(-70 + i * 46, -70 + (i % 2) * 22, 1.6, `<circle r="15" fill="url(#wSteelH)" stroke="${METD}" stroke-width="3"/><circle r="9" fill="none" stroke="${METD}" stroke-width="2"/>`)).join("")}${[0, 1].map((i) => TF(-20 + i * 60, 60, 1.5, `<circle r="13" fill="${["#FF9838", "#43BF6C"][i]}" stroke="${P.ink}" stroke-width="3"/><circle r="6" fill="#fff" stroke="${P.ink}" stroke-width="2"/>`)).join("")}
    <path d="M-300 -150 H300 L270 150 H-300z" fill="none" stroke="${METD}" stroke-width="12" stroke-linejoin="round"/><path d="M-100 -150 V150" stroke="${METD}" stroke-width="9"/><rect x="-294" y="-144" width="188" height="288" fill="#FFF8EA" opacity=".55"/>
    <path d="M-300 -120 H-350 V120 H-300" fill="none" stroke="${METD}" stroke-width="12" stroke-linejoin="round"/><rect x="-364" y="-90" width="28" height="180" rx="14" fill="#E8604E" stroke="#B8402E" stroke-width="5"/>`; }

/* ---------- the three water bottles: the same height and shape, full and closed. origin = base centre; 84 wide, 210 tall.
   kind plastic | glass | metal; o.glow = the water shows (0..1, the soft light from behind) ---------- */
const BSHAPE = "M-36 0 Q-42 0 -42 -8 V-128 Q-42 -150 -20 -164 V-184 H20 V-164 Q42 -150 42 -128 V-8 Q42 0 36 0z";
function bottleSvg(kind, o = {}) { const g = o.glow || 0, cap = (c, d) => `<rect x="-24" y="-210" width="48" height="30" rx="8" fill="${c}" stroke="${d}" stroke-width="5"/><path d="M-14 -204 V-186 M0 -204 V-186 M14 -204 V-186" stroke="${d}" stroke-width="3" opacity=".5"/>`;
  if (kind === "metal") return `<path d="${BSHAPE}" fill="url(#wSteelH)" stroke="#5E6B7C" stroke-width="6" stroke-linejoin="round"/><path d="${BSHAPE}" fill="url(#wBrush)"/><path d="M-41 -120 H41 M-41 -20 H41" stroke="#5E6B7C" stroke-width="3" opacity=".5"/><path d="M-24 -130 V-30" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".7"/>${cap("#3A4258", "#1E2433")}`;
  const gl = kind === "glass", ed = gl ? "#3E8E86" : "#5A9FD0", sw = gl ? 10 : 5;
  return (g > .02 ? `<ellipse cx="0" cy="-90" rx="90" ry="130" fill="#FFF7C8" opacity="${n2(.8 * g)}" filter="url(#b10)"/>` : "")
    + `<path d="${BSHAPE}" fill="url(#${gl ? "wGlassB" : "wPlast"})"/><clipPath id="bw${kind}${o.id || ""}"><path d="${BSHAPE}"/></clipPath><g clip-path="url(#bw${kind}${o.id || ""})"><rect x="-44" y="-142" width="88" height="150" fill="#4DB8F0" opacity="${n2(.5 + .25 * g)}"/><path d="M-44 -142 H44" stroke="#fff" stroke-width="${n2(4 + 5 * g)}" opacity=".95"/></g>
    <path d="${BSHAPE}" fill="none" stroke="${ed}" stroke-width="${sw}" stroke-linejoin="round"/>${gl ? `<path d="M-24 -134 L-24 -40" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M24 -120 l8 -14 l8 14 l-8 14z" fill="#fff"/>` : `<path d="M-26 -130 Q-30 -80 -26 -30" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".6" fill="none"/><path d="M-41 -100 H41 M-41 -70 H41" stroke="${ed}" stroke-width="2.5" opacity=".45"/>`}
    ${gl ? cap("#C9D1DC", "#7A869E") : cap("#3A8DFF", "#1F5FD0")}`; }
const BKINDS = ["plastic", "glass", "metal"];

/* ---------- the hidden animals: cute AND alive (round shapes, big friendly eyes with a highlight, a little smile, an idle loop) ---------- */
// a mynah (black body, yellow beak, eye patch and legs, a small white wing patch). origin = its feet; about 110 tall; it faces right.
// o.hop (px up), o.flap 0..1 (wings out), o.tilt (degrees of head tilt)
function mynahBird(t, o = {}) { const bob = 3 * Math.sin(t * 2.2), tilt = o.tilt !== undefined ? o.tilt : 14 * Math.sin(t * .9) * (Math.sin(t * .37) > 0 ? 1 : 0), bl = (t % 3.1) < .13, fl = o.flap || 0;
  return `<g transform="translate(0 ${n2(-(o.hop || 0))})"><path d="M-10 -8 V8 M-16 8 H-2 M12 -8 V8 M6 8 H20" stroke="#F2B21A" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M-34 -44 Q-70 -36 -78 -14 Q-52 -18 -30 -24z" fill="#1F1B2E"/><ellipse cx="0" cy="${n2(-42 + bob * .3)}" rx="40" ry="36" fill="#2A2540"/><ellipse cx="6" cy="${n2(-30 + bob * .3)}" rx="26" ry="20" fill="#3A3458"/>
    <g transform="translate(-8 ${n2(-46 + bob * .3)}) rotate(${n2(-70 * fl)})"><path d="M0 0 Q-34 ${n2(6 - 40 * fl)} -44 30 Q-16 30 6 14z" fill="#1F1B2E"/><path d="M-22 12 Q-30 16 -34 24 L-18 22z" fill="#fff"/></g>
    <g transform="translate(22 ${n2(-76 + bob)}) rotate(${n2(tilt)})"><circle r="29" fill="#2A2540"/><path d="M22 -6 L52 4 L22 14z" fill="#FFC83A" stroke="#D99A12" stroke-width="3" stroke-linejoin="round"/><path d="M24 6 Q34 12 44 6" stroke="#B87A08" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M2 -8 Q14 -22 26 -10 Q22 4 8 4z" fill="#FFC83A"/>${bl ? `<path d="M4 -4 H20" stroke="#1F1B2E" stroke-width="4" stroke-linecap="round"/>` : `<circle cx="12" cy="-5" r="9" fill="#fff"/><circle cx="14" cy="-5" r="6" fill="#1F1B2E"/><circle cx="16" cy="-8" r="2.4" fill="#fff"/>`}
      <ellipse cx="2" cy="12" rx="6" ry="4" fill="#FF8FB1" opacity=".7"/></g></g>`; }
const mynahArt = (t) => TF(-6, 62, 1.35, mynahBird(t, { hop: 8 * Math.max(0, Math.sin(t * 3.1)) * (Math.sin(t * .8) > .6 ? 1 : 0) }));
// a plantain squirrel (brown back, a cream and a black stripe along its side, an orange-brown belly, a bushy tail that flicks). origin = its
// feet on the branch; about 100 tall, 150 long; it faces left. o.up 0..1 (sits up), o.flick extra tail flick
function squirrelBody(t, o = {}) { const up = o.up || 0, fk = 12 * Math.sin(t * 5.2) * (Math.sin(t * 1.3) > .2 ? 1 : .15) + (o.flick || 0), bl = (t % 2.7) < .12, br = 1 + .02 * Math.sin(t * 3);
  return `<g transform="rotate(${n2(18 * up)})"><g transform="translate(46 -30) rotate(${n2(fk - 20 * up)})"><path d="M0 0 Q50 -10 60 -62 Q62 -104 22 -112 Q-14 -108 -6 -70 Q2 -40 -8 -8z" fill="#8A5A36"/><path d="M8 -14 Q40 -24 46 -62 Q46 -92 22 -98" stroke="#C99A62" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/></g>
    <ellipse cx="0" cy="-34" rx="${n2(52 * br)}" ry="34" fill="#9A6535"/><path d="M-40 -18 Q0 -2 44 -20 Q20 0 -20 0z" fill="#E88A3C"/><path d="M-44 -30 Q0 -18 46 -32" stroke="#FFF1D0" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-42 -23 Q0 -11 44 -25" stroke="#2B2147" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M-26 -6 V4 M22 -6 V4" stroke="#7A4C26" stroke-width="9" stroke-linecap="round"/>
    <g transform="translate(-52 -58) rotate(${n2(-14 * up + 3 * Math.sin(t * 1.7))})"><path d="M-2 -24 L4 -42 L14 -26z M12 -24 L22 -40 L28 -22z" fill="#7A4C26"/><ellipse rx="32" ry="27" fill="#A9713E"/><ellipse cx="-14" cy="10" rx="17" ry="12" fill="#FFE6C2"/>
      ${bl ? `<path d="M-14 -6 H-2" stroke="#2B2147" stroke-width="4" stroke-linecap="round"/>` : `<circle cx="-8" cy="-6" r="8.5" fill="#2B2147"/><circle cx="-10" cy="-9" r="3" fill="#fff"/>`}<circle cx="-32" cy="4" r="4.5" fill="#2B2147"/><path d="M-26 12 Q-18 19 -10 13" stroke="#7A4C26" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="2" cy="10" rx="6" ry="4" fill="#FF8FB1" opacity=".7"/></g></g>`; }
const squirrelArt = (t) => TF(10, 58, 1.25, squirrelBody(t, { up: .5 + .5 * Math.sin(t * .9) }));

/* ---------- an adult's hand and sleeve (lib adultHand: the fingers point right, the tips near (90, 0)); x, y = the fingertips ---------- */
const aHand = (x, y, rot = 0, sc = 1, flip = false) => `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(rot)}) scale(${flip ? -sc : sc} ${sc}) translate(-90 0)">${adultHand()}</g>`;

/* ---------- the planted glass fish tank on its wooden stand. origin = the floor under the stand's middle. Tank 520 x 300 (y -520..-220),
   the stand's shelf under it (y -220..-196), legs to the floor. Six guppies swim in a slow loop (guppyAt = where fish i is). ---------- */
const TKW = 520, TKTOP = -520, TKBOT = -220;
const guppyAt = (i, t) => { const ph = i * 1.9, sp = .22 + .05 * (i % 3), a = t * sp + ph, x = 190 * Math.sin(a) * (1 - .12 * (i % 2)), y = -370 + (i - 2.5) * 34 + 16 * Math.sin(t * .7 + i), dir = Math.cos(a) >= 0 ? 1 : -1; return [x, y, dir]; };
const GCOL = [["#FF8A3C", "#FFD15A"], ["#4FB3FF", "#B9E3FF"], ["#FF6F91", "#FFC2D4"], ["#7BD88F", "#F6F08A"], ["#B78BFF", "#FFB0E8"], ["#FFC83A", "#FF8A3C"]];
// one guppy, facing right (origin = its middle; body about 44 long, the fan tail 34 more)
const guppy = (i, t) => { const [c, c2] = GCOL[i % 6], w = 14 * Math.sin(t * 7 + i * 2); return `<g transform="translate(-22 0) rotate(${n2(w)})"><path d="M0 0 Q-20 -30 -40 -26 Q-34 0 -40 26 Q-20 30 0 0z" fill="${c2}" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M-8 0 L-34 -14 M-8 0 L-36 0 M-8 0 L-34 14" stroke="${c}" stroke-width="2" opacity=".7"/></g>
  <path d="M-4 -12 Q6 -26 14 -12z" fill="${c2}" stroke="${c}" stroke-width="2.5"/><ellipse rx="24" ry="13" fill="${c}"/><ellipse cx="4" cy="4" rx="16" ry="7" fill="#fff" opacity=".35"/><circle cx="13" cy="-3" r="5.5" fill="#fff"/><circle cx="14.5" cy="-3" r="3.2" fill="#2B2147"/><circle cx="15.5" cy="-4.2" r="1.2" fill="#fff"/><path d="M19 4 Q22 6 24 3" stroke="#2B2147" stroke-width="1.6" fill="none" stroke-linecap="round"/>`; };
function tankSvg(t, o = {}) { const id = "tk" + (o.id || ""), x0 = -TKW / 2;
  let plants = ""; [[-200, 150, "#2F9A57"], [-150, 110, "#43BF6C"], [-40, 90, "#2F9A57"], [150, 170, "#43BF6C"], [205, 120, "#2F9A57"], [90, 70, "#6FD08A"]].forEach(([x, h, c], i) => { const sw = 10 * Math.sin(t * .9 + i); plants += `<path d="M${x} ${TKBOT - 22} Q${n2(x - 16 + sw)} ${TKBOT - h * .6} ${n2(x + sw * 1.4)} ${TKBOT - 22 - h} Q${n2(x + 22 + sw)} ${TKBOT - h * .5} ${x + 14} ${TKBOT - 22}z" fill="${c}"/>`; });
  let bub = ""; for (let i = 0; i < 7; i++) { const v = ((t * .32 + i / 7) % 1), y = lerp(TKBOT - 34, TKTOP + 36, v); bub += `<circle cx="${n2(120 + 7 * Math.sin(t * 3 + i * 2))}" cy="${n2(y)}" r="${n2(4 + 3 * v)}" fill="#fff" opacity="${n2(.75 * (1 - v * .6))}" stroke="#8ED3F2" stroke-width="1.5"/>`; }
  let fish = ""; for (let i = 0; i < 6; i++) { const [x, y, d] = guppyAt(i, t); fish += `<g transform="translate(${n2(x)} ${n2(y)}) scale(${d} 1)">${guppy(i, t)}</g>`; }
  return `<path d="M${x0 + 30} -196 V0 M${-x0 - 30} -196 V0 M${x0 + 30} -70 H${-x0 - 30}" stroke="#8A5A36" stroke-width="22" stroke-linecap="round" fill="none"/><rect x="${x0 - 26}" y="-222" width="${TKW + 52}" height="30" rx="8" fill="url(#wWood)" stroke="#7A4C26" stroke-width="5"/><path d="M${x0 - 10} -208 H${-x0 + 10}" stroke="#E0B47E" stroke-width="3" opacity=".6"/>
    <clipPath id="${id}"><rect x="${x0}" y="${TKTOP}" width="${TKW}" height="${TKBOT - TKTOP}" rx="6"/></clipPath><g clip-path="url(#${id})"><rect x="${x0}" y="${TKTOP}" width="${TKW}" height="${TKBOT - TKTOP}" fill="#EAF8FF"/><rect x="${x0}" y="${TKTOP + 30}" width="${TKW}" height="${TKBOT - TKTOP}" fill="url(#wWater)"/>
      <path d="M${x0} ${TKBOT - 4} Q${x0 + 130} ${TKBOT - 44} ${x0 + 260} ${TKBOT - 24} T${-x0} ${TKBOT - 30} V${TKBOT} H${x0}z" fill="#E8D3A2"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${x0 + 40 + i * 62}" cy="${TKBOT - 12 - (i % 3) * 5}" r="${6 + (i % 2) * 3}" fill="${i % 2 ? "#C9B07A" : "#B8A8C8"}"/>`).join("")}
      ${plants}<rect x="104" y="${TKBOT - 38}" width="32" height="16" rx="6" fill="#7A869E"/>${bub}${fish}<path d="M${x0} ${TKTOP + 30} H${-x0}" stroke="#fff" stroke-width="5" opacity=".9"/></g>
    <rect x="${x0}" y="${TKTOP}" width="${TKW}" height="${TKBOT - TKTOP}" rx="6" fill="none" stroke="#7FB6D6" stroke-width="9"/><path d="M${x0 + 34} ${TKTOP + 60} L${x0 + 34} ${TKTOP + 190} M${x0 + 58} ${TKTOP + 60} L${x0 + 58} ${TKTOP + 110}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${n2(.5 + .25 * Math.sin(t * 1.3))}"/>
    <rect x="${x0 - 12}" y="${TKTOP - 22}" width="${TKW + 24}" height="26" rx="8" fill="#3A4258" stroke="#232A3B" stroke-width="4"/>`; }

/* ---------- the plain family car, side view (no badge, no number plate; parked, switched off, empty). origin = the ground under its middle;
   it faces right; 720 long. o.boot 0..1 (the boot lid, at the left end, open), o.lit = [tyres, seats, windscreen, body] 0..1 (a part lit),
   o.dim 0..1 (everything not lit is dimmed), o.door 0..1 (front door open: used small) ---------- */
function carSide(o = {}) { const lit = o.lit || [0, 0, 0, 0], dm = o.dim || 0, D = (i) => 1 - dm * (1 - lit[i]), gc = (i) => o.pc ? o.pc[i] : "#FFE27A", glowC = (i, inner) => lit[i] > .02 ? OP(lit[i], `<g filter="url(#b10)" opacity=".9">${inner}</g>`) : "";
  const bodyP = "M-350 -70 Q-356 -150 -330 -176 L-250 -262 Q-236 -278 -200 -278 H70 Q110 -278 150 -244 L232 -178 Q330 -168 344 -140 Q356 -110 350 -70 Q350 -52 330 -52 H-330 Q-350 -52 -350 -70z";
  const tyre = (x) => `<circle cx="${x}" cy="-56" r="58" fill="#2A2A36" stroke="#15151E" stroke-width="6"/><circle cx="${x}" cy="-56" r="44" fill="none" stroke="#4A4A5A" stroke-width="5" stroke-dasharray="7 9"/><circle cx="${x}" cy="-56" r="26" fill="#C9D1DC" stroke="#7A869E" stroke-width="5"/><circle cx="${x}" cy="-56" r="7" fill="#7A869E"/>`;
  const seat = (x) => `<rect x="${x - 26}" y="-250" width="46" height="34" rx="12" fill="url(#wSeat)" stroke="#51477A" stroke-width="4"/><path d="M${x - 34} -210 Q${x - 44} -150 ${x - 26} -150 H${x + 30} Q${x + 34} -200 ${x + 22} -214z" fill="url(#wSeat)" stroke="#51477A" stroke-width="4" stroke-linejoin="round"/>`;
  const win = "M-232 -182 L-186 -246 Q-178 -256 -160 -256 H-30 V-182z M-10 -182 V-256 H62 Q92 -256 120 -232 L180 -182z", screen = "M150 -244 L232 -178 L196 -182 L128 -240z";
  return glowC(3, `<path d="${bodyP}" fill="${gc(3)}" stroke="${gc(3)}" stroke-width="26"/>`) + glowC(0, `<circle cx="-212" cy="-56" r="74" fill="${gc(0)}"/><circle cx="216" cy="-56" r="74" fill="${gc(0)}"/>`)
    + OP(D(3), `<path d="${bodyP}" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="7" stroke-linejoin="round"/><path d="M-330 -120 H338" stroke="#fff" stroke-width="4" opacity=".35"/><path d="M-20 -182 V-60 M-246 -182 H190" stroke="#1F5FA0" stroke-width="4" opacity=".7" fill="none"/><rect x="-6" y="-166" width="44" height="12" rx="6" fill="#D6E9FA" stroke="#1F5FA0" stroke-width="3"/><rect x="-206" y="-166" width="44" height="12" rx="6" fill="#D6E9FA" stroke="#1F5FA0" stroke-width="3"/>
      <path d="M318 -150 Q346 -146 346 -124 L322 -124z" fill="#FFF3B8" stroke="#1F5FA0" stroke-width="4"/><path d="M-348 -150 Q-338 -160 -330 -150 V-126 H-350z" fill="#FF6F61" stroke="#1F5FA0" stroke-width="4"/>`)
    + `<path d="${win}" fill="#3B3560"/>` + OP(D(1), glowC(1, `<path d="${win}" fill="${gc(1)}"/>`) + seat(-110) + seat(60)) + `<path d="${win}" fill="url(#wGlassC)" opacity=".42"/><path d="${win}" fill="none" stroke="#1F5FA0" stroke-width="6" stroke-linejoin="round"/>`
    + OP(D(2), glowC(2, `<path d="${screen}" fill="${gc(2)}" stroke="${gc(2)}" stroke-width="22"/>`) + `<path d="${screen}" fill="#EAF8FF" stroke="#7FB6D6" stroke-width="6" stroke-linejoin="round"/><path d="M158 -230 L206 -190" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`)
    + (o.boot ? OP(D(3), `<path d="M-340 -168 L-262 -250 L-262 -84 H-346z" fill="#2B2147"/><path d="M-336 -96 H-266" stroke="#51477A" stroke-width="8"/>${o.bags || ""}<g transform="translate(-250 -264) rotate(${n2(84 * o.boot)})"><path d="M0 0 L-84 84 Q-106 108 -102 190 L-88 190 L-70 96 L10 12z" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="6" stroke-linejoin="round"/><path d="M-66 86 L-8 26 L-20 20 L-76 80z" fill="#EAF8FF" opacity=".8"/></g>`) : "")
    + OP(D(0), tyre(-212) + tyre(216)); }
// where the four parts are on carSide (for label lines): tyres, seats, windscreen, body
const CARPT = [[216, -56], [60, -200], [188, -208], [-120, -120]];

/* ---------- the folding table (origin = the ground under its middle; top at y -170, 300 wide) and the watering can (origin = its base middle; the spout points left) ---------- */
const foldTable = (w = 300) => `<path d="M${-w / 2 + 30} -160 L${w / 2 - 50} 0 M${w / 2 - 30} -160 L${-w / 2 + 50} 0" stroke="#4A5468" stroke-width="12" stroke-linecap="round"/><rect x="${-w / 2}" y="-176" width="${w}" height="20" rx="8" fill="#F4F7FB" stroke="#7A869E" stroke-width="5"/>`;
const canW = () => `<path d="M-60 -30 L-150 -112" stroke="#2F9A57" stroke-width="20" stroke-linecap="round"/><path d="M-150 -112 l-22 4 l12 -24z" fill="#2F9A57" stroke="#1F7A40" stroke-width="4" stroke-linejoin="round"/><path d="M60 -100 Q130 -100 130 -50 Q130 -10 66 -14" fill="none" stroke="#1F7A40" stroke-width="16" stroke-linecap="round"/>
  <path d="M-70 0 L-62 -120 H62 L70 0z" fill="#43BF6C" stroke="#1F7A40" stroke-width="7" stroke-linejoin="round"/><path d="M-40 -100 V-20" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".5"/><ellipse cx="0" cy="-120" rx="62" ry="12" fill="#2F9A57" stroke="#1F7A40" stroke-width="5"/>`;
const shopBag = (c = "#FFB86B") => `<path d="M-40 0 L-46 -86 H46 L40 0z" fill="${c}" stroke="#B8742E" stroke-width="5" stroke-linejoin="round"/><path d="M-22 -86 Q-22 -122 0 -122 Q22 -122 22 -86" fill="none" stroke="#B8742E" stroke-width="6"/><path d="M-10 -86 l6 -26 l10 20 l8 -16 l4 22z" fill="#43BF6C"/>`;

/* ---------- small things of segments 6 and 8 (origin = the ground under each) ---------- */
const basketS = () => `<path d="M-70 -100 Q0 -190 70 -100" fill="none" stroke="#B8402E" stroke-width="10" stroke-linecap="round"/><path d="M-96 -104 H96 L78 0 H-78z" fill="#FF8A75" stroke="#B8402E" stroke-width="7" stroke-linejoin="round"/>${[-56, -28, 0, 28, 56].map((x) => `<path d="M${x} -96 L${x * .82} -8" stroke="#B8402E" stroke-width="4" opacity=".6"/>`).join("")}<path d="M-90 -66 H90 M-84 -34 H84" stroke="#B8402E" stroke-width="4" opacity=".6"/>`;
const towelS = () => `<rect x="-78" y="-70" width="156" height="70" rx="16" fill="#7EC8F2" stroke="#3A8DBF" stroke-width="6"/><path d="M-78 -36 H78" stroke="#3A8DBF" stroke-width="5"/><path d="M-60 -54 H60 M-60 -18 H60" stroke="#fff" stroke-width="5" stroke-dasharray="3 9" stroke-linecap="round" opacity=".85"/><path d="M78 -62 q16 26 0 54" fill="none" stroke="#3A8DBF" stroke-width="6" stroke-linecap="round"/>`;
const scissorsS = () => `<rect x="-58" y="-150" width="116" height="150" rx="10" fill="#FFF8EA" stroke="#C9A772" stroke-width="6"/><circle cx="0" cy="-136" r="7" fill="#C9A772"/><g transform="translate(0 -26)"><path d="M-6 -6 L-12 -92 Q-4 -100 0 -86z M6 -6 L12 -92 Q4 -100 0 -86z" fill="url(#wSteelH)" stroke="${METD}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="-17" cy="8" rx="15" ry="19" fill="none" stroke="#FF6F61" stroke-width="9"/><ellipse cx="17" cy="8" rx="15" ry="19" fill="none" stroke="#FF6F61" stroke-width="9"/><circle cy="-10" r="4" fill="${METD}"/></g>`;
const raincoatS = () => `<path d="M-74 0 V-58 Q-74 -74 -58 -74 H58 Q74 -74 74 -58 V0z" fill="#FFD75A" stroke="#D99A12" stroke-width="6" stroke-linejoin="round"/><path d="M-30 -74 Q0 -40 30 -74" fill="#FFE99A" stroke="#D99A12" stroke-width="5"/><path d="M0 -50 V0" stroke="#D99A12" stroke-width="4"/><circle cx="12" cy="-34" r="4" fill="#D99A12"/><circle cx="12" cy="-14" r="4" fill="#D99A12"/><path d="M-58 -58 L-44 -20" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>`;
// Pip's plain cotton shopping bag (two handles). origin = the ground under it. o.rice 0..1 (the small bag of rice inside, a bulge),
// o.fold 0..1 (its empty upper half folds over and it lies flat on the rice), o.lift px
function clothBag(o = {}) { const f = o.fold || 0, r = o.rice || 0, top = lerp(-190, -78, f), hx = lerp(0, 56, f), st = `stroke="#8A6FC9" stroke-width="6" stroke-linejoin="round"`;
  const hnd = f < .5 ? `<path d="M-36 ${top} Q-36 ${top - 70 * (1 - 2 * f)} 0 ${top - 70 * (1 - 2 * f)} Q36 ${top - 70 * (1 - 2 * f)} 36 ${top}" fill="none" stroke="#8A6FC9" stroke-width="9" stroke-linecap="round"/>` : `<path d="M${40 + hx * .3} ${top + 6} Q${96 + hx * .4} ${top - 8} ${90 + hx * .4} ${top + 30}" fill="none" stroke="#8A6FC9" stroke-width="9" stroke-linecap="round"/>`;
  return `<g transform="translate(0 ${n2(-(o.lift || 0))})">${hnd}<path d="M${n2(-70 - 8 * r)} 0 Q${n2(-78 - 10 * r)} ${n2(lerp(-100, -50, f))} ${n2(-62 + hx * .2)} ${n2(top)} H${n2(62 + hx)} Q${n2(78 + 10 * r + hx * .4)} ${n2(lerp(-100, -40, f))} ${n2(70 + 8 * r)} 0z" fill="#D9CCFF" ${st}/>
    ${f > .05 ? `<path d="M${n2(-62 + hx * .2)} ${n2(top)} Q0 ${n2(top + 26 * f)} ${n2(62 + hx)} ${n2(top)}" fill="#C4B3F5" ${st}/>` : ""}<path d="M-40 ${n2(lerp(-150, -60, f))} Q-46 -60 -42 -14" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/></g>`; }
const riceSmall = () => `<path d="M-34 0 Q-38 -30 -32 -56 Q0 -64 32 -56 Q38 -30 34 0z" fill="#FFF6DE" stroke="#C9A772" stroke-width="4" stroke-linejoin="round"/><path d="M-30 -44 H30" stroke="#E8604E" stroke-width="5"/>${T(0, -16, "RICE", 17, "#C4502E", { ls: 1 })}`;

/* ====================================================================================================================================
   THE SETS (static; baked). World 1920 x 1080, drawn a little wider (-192..2112) for the camera.
   BG.walk: the covered walkway at the foot of an HDB block, mid-morning: the open front of a neighbourhood supermarket (plain sign), sacks of
   rice and crates of drinks by the door, the trolley bay under its TROLLEYS sign on a post, the aquarium shop next door with tanks on stands,
   pillars, floor tiles, a letterbox row, greenery beyond. WFLOOR = the line where the back wall meets the floor.
   ==================================================================================================================================== */
const WFLOOR = 790, BAYX = 96, SIGNX = 250, MYNAH = [250, WFLOOR - SIGN_H], TANKX = 1650, TANKS = .62;
BG.walk = () => { let tiles = ""; for (let i = -6; i <= 30; i++) tiles += `<path d="M${-192 + i * 96} ${WFLOOR} L${n2(960 + (-192 + i * 96 - 960) * 1.9)} 1190" stroke="#B9A684" stroke-width="3" opacity=".55"/>`;
  [0, 1, 2, 3].forEach((j) => { const y = WFLOOR + 40 + j * j * 26 + j * 46; tiles += `<path d="M-192 ${y} H2112" stroke="#B9A684" stroke-width="3" opacity=".55"/>`; });
  const shelf = (x, y, w) => { let b = `<rect x="${x}" y="${y}" width="${w}" height="12" fill="#C9A772"/>`; for (let i = 0; i * 34 < w - 20; i++) b += `<rect x="${x + 6 + i * 34}" y="${y - 44 - (i % 3) * 6}" width="26" height="${44 + (i % 3) * 6}" rx="5" fill="${["#FF9838", "#43BF6C", "#FF6F61", "#9B6BFF", "#3A8DFF", "#FFC83A"][(i + (y >> 4)) % 6]}" opacity=".75"/>`; return b; };
  const crate = (x, y, c) => `<rect x="${x}" y="${y - 60}" width="110" height="60" rx="8" fill="${c}" stroke="${P.ink}" stroke-width="4" opacity=".95"/>${[0, 1, 2, 3].map((i) => `<rect x="${x + 10 + i * 24}" y="${y - 84}" width="16" height="30" rx="5" fill="#fff" stroke="${P.ink}" stroke-width="3"/>`).join("")}<path d="M${x + 12} ${y - 30} H${x + 98}" stroke="#fff" stroke-width="6" opacity=".6"/>`;
  const smallTank = (x, y, w, c) => `<rect x="${x}" y="${y}" width="${w}" height="92" rx="5" fill="${c}" stroke="#7FB6D6" stroke-width="6"/><path d="M${x + 14} ${y + 70} q10 -40 20 0 M${x + w - 44} ${y + 74} q8 -50 22 0" fill="#43BF6C"/><rect x="${x - 8}" y="${y + 92}" width="${w + 16}" height="14" fill="#9A6535"/>`;
  return `<rect x="-192" y="-108" width="2304" height="1296" fill="url(#wWall)"/>
    <rect x="-192" y="250" width="232" height="${WFLOOR - 250}" fill="url(#wSky)"/><circle cx="-60" cy="700" r="120" fill="#2F9A57"/><circle cx="20" cy="730" r="90" fill="#43BF6C"/><circle cx="-150" cy="640" r="110" fill="#43BF6C"/><rect x="-192" y="250" width="232" height="${WFLOOR - 250}" fill="none" stroke="#D9C4A0" stroke-width="10"/>
    <rect x="-192" y="-108" width="2304" height="238" fill="url(#wCeil)"/><rect x="-192" y="118" width="2304" height="22" fill="#A8977C"/>${[360, 960, 1560].map((x) => `<rect x="${x - 90}" y="96" width="180" height="20" rx="8" fill="#FFFDF0" stroke="#C9B58F" stroke-width="4"/>`).join("")}
    <rect x="400" y="246" width="800" height="${WFLOOR - 246}" fill="url(#wShop)" stroke="#D9C4A0" stroke-width="10"/>${shelf(430, 380, 500)}${shelf(430, 500, 500)}${shelf(430, 620, 300)}${shelf(960, 380, 220)}${shelf(960, 500, 220)}
    <rect x="1000" y="560" width="150" height="120" rx="10" fill="#E8F1FA" stroke="#9AA5BD" stroke-width="6"/><rect x="1016" y="576" width="60" height="40" rx="6" fill="#3A4258"/><rect x="990" y="680" width="170" height="110" fill="#C9D1DC" stroke="#9AA5BD" stroke-width="6"/>
    <g filter="url(#dropS)"><rect x="380" y="150" width="840" height="96" rx="14" fill="#E8604E" stroke="#fff" stroke-width="7"/></g>${T(800, 220, "SUPERMARKET", 64, "#fff", { ls: 6 })}
    ${TF(480, WFLOOR + 4, 1, riceSack(1.1))}${TF(600, WFLOOR + 4, 1, riceSack(1.1))}${TF(540, WFLOOR - 88, 1, riceSack(1.1))}${crate(790, WFLOOR + 4, "#3A8DFF")}${crate(810, WFLOOR - 62, "#43BF6C")}
    <rect x="1220" y="130" width="74" height="${WFLOOR - 130}" fill="#EBD8B8" stroke="#D2BC96" stroke-width="5"/><rect x="1312" y="430" width="150" height="190" rx="8" fill="#B9C3D4" stroke="#7A869E" stroke-width="6"/>${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${1320 + c * 46}" y="${438 + r * 45}" width="40" height="38" rx="4" fill="#DDE4EC" stroke="#7A869E" stroke-width="3"/><path d="M${1330 + c * 46} ${450 + r * 45} h20" stroke="#5E6B7C" stroke-width="4"/>`).join("")).join("")}
    <rect x="1480" y="246" width="632" height="${WFLOOR - 246}" fill="#E6F6FF" stroke="#D9C4A0" stroke-width="10"/><g filter="url(#dropS)"><rect x="1480" y="150" width="632" height="96" rx="14" fill="#2A86C8" stroke="#fff" stroke-width="7"/></g>${T(1700, 218, "AQUARIUM", 58, "#fff", { ls: 5 })}
    ${smallTank(1900, 330, 170, "#BDEBFF")}${smallTank(1900, 470, 170, "#A9E3D8")}${smallTank(1900, 610, 170, "#BDEBFF")}${smallTank(1500, 300, 120, "#A9E3D8")}
    <rect x="-192" y="${WFLOOR}" width="2304" height="${1188 - WFLOOR}" fill="url(#wFloor)"/>${tiles}<path d="M-192 ${WFLOOR} H2112" stroke="#B9A684" stroke-width="6"/>
    <rect x="40" y="130" width="60" height="${WFLOOR - 130 + 16}" fill="#EBD8B8" stroke="#D2BC96" stroke-width="5"/>
    ${TF(BAYX, WFLOOR + 26, .82, bayRow(3))}${TF(SIGNX, WFLOOR + 6, 1, baySign())}
    <path d="M1238 ${WFLOOR + 10} l-20 -70 h76 l-20 70z" fill="#C9743E" stroke="#8A4A22" stroke-width="5"/><circle cx="1256" cy="${WFLOOR - 96}" r="46" fill="#43BF6C"/><circle cx="1226" cy="${WFLOOR - 70}" r="30" fill="#2F9A57"/><circle cx="1288" cy="${WFLOOR - 74}" r="32" fill="#6FD08A"/>`; };
BG.walkD = () => BG.walk() + `<rect x="-192" y="-108" width="2304" height="1296" fill="${P.night}" opacity=".62"/>`;
/* the walkway, live: the baked set + the tank at the aquarium shop's open front (the guppies swim) + the mynah on the TROLLEYS sign (o.mynah:
   false in a look-closer; { hop, flap, tilt } at the reveal) + o.items (svg in world coordinates, on the floor) under a camera [z, cx, cy] */
const cam3 = (inner, c) => c ? CAM(inner, c[0], c[1], c[2]) : inner;
const camL = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
function VW(t, o = {}, cam) { return cam3(bg(o.dim ? "walkD" : "walk") + (o.tank === false ? "" : OP(o.dim ? .5 : 1, TF(TANKX, WFLOOR + 14, TANKS, tankSvg(t, { id: "set" }))))
  + (o.mynah === false ? "" : OP(o.dim ? .55 : 1, TF(MYNAH[0], MYNAH[1] + 2, .62, mynahBird(t, o.mynah || {})))) + (o.items || ""), cam); }

/* BG.park: the open-air car park beside the block, bright: marked lots, a covered linkway behind, a grass verge with a rain tree, the block
   beyond. PGROUND = where the car stands; SQ = the squirrel's place on the low branch */
const PGROUND = 880, SQ = [1340, 442], CARX = 730, TABX = 1300, TRPX = 330;   // v3: the trolley a little further right, clear of Pip's bigger disc
BG.park = () => { let win = ""; for (let r = 0; r < 7; r++) for (let c = 0; c < 11; c++) win += `<rect x="${-150 + c * 86}" y="${70 + r * 62}" width="52" height="34" rx="4" fill="${(r * 3 + c) % 5 ? "#CFE9FB" : "#FFE9A8"}" stroke="#C9B58F" stroke-width="3"/>`;
  let lots = ""; [-40, 300, 1160, 1500, 1860].forEach((x) => { lots += `<path d="M${x} 660 L${n2(960 + (x - 960) * 1.5)} 1190" stroke="#fff" stroke-width="10" opacity=".9"/>`; });
  const leaf = (x, y, r, c) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.5}" ry="${r}" fill="${c}"/>`;
  return `<rect x="-192" y="-108" width="2304" height="800" fill="url(#wSky)"/><circle cx="1050" cy="60" r="60" fill="#fff" opacity=".8" filter="url(#b10)"/><ellipse cx="1000" cy="150" rx="150" ry="34" fill="#fff" opacity=".85"/><ellipse cx="1110" cy="130" rx="90" ry="30" fill="#fff" opacity=".85"/>
    <rect x="-192" y="30" width="1010" height="560" fill="#FFF1DC" stroke="#E3C9A8" stroke-width="8"/><rect x="-192" y="30" width="1010" height="26" fill="#FF9F7A"/>${win}
    <path d="M560 470 H1700 V500 H560z" fill="#E8604E" stroke="#B8402E" stroke-width="6"/>${[620, 900, 1180, 1460, 1650].map((x) => `<rect x="${x}" y="500" width="18" height="120" fill="#C9D1DC" stroke="#9AA5BD" stroke-width="4"/>`).join("")}
    <rect x="-192" y="590" width="2304" height="90" fill="url(#wLeaf)"/><path d="M-192 596 ${Array.from({ length: 60 }, (_, i) => `q20 -${14 + (i % 3) * 6} 40 0`).join(" ")}" fill="#6FD08A"/>
    <rect x="-192" y="660" width="2304" height="530" fill="url(#wRoad)"/><rect x="-192" y="660" width="2304" height="16" fill="#D9D5E6"/>${lots}
    <path d="M1560 640 Q1540 500 1575 380 Q1590 330 1560 250 L1640 250 Q1630 340 1650 400 Q1680 520 1670 640z" fill="#8A5A36" stroke="#6A4326" stroke-width="6"/>
    <path d="M1585 430 Q1470 470 1250 440 L1250 458 Q1470 500 1600 470z" fill="#8A5A36" stroke="#6A4326" stroke-width="5" stroke-linejoin="round"/><path d="M1640 380 Q1760 360 1900 400" stroke="#8A5A36" stroke-width="22" stroke-linecap="round" fill="none"/>
    ${leaf(1600, 170, 150, "#2F9A57")}${leaf(1330, 240, 110, "#43BF6C")}${leaf(1860, 230, 130, "#43BF6C")}${leaf(1500, 110, 120, "#43BF6C")}${leaf(1740, 100, 130, "#6FD08A")}${leaf(1960, 330, 90, "#2F9A57")}${leaf(1180, 300, 70, "#2F9A57")}${leaf(1620, 250, 120, "#6FD08A")}
    ${leaf(1240, 400, 34, "#43BF6C")}${leaf(1900, 430, 40, "#6FD08A")}`; };
BG.parkD = () => BG.park() + `<rect x="-192" y="-108" width="2304" height="1296" fill="${P.night}" opacity=".62"/>`;
/* the car park, live: the baked set + the squirrel on the low branch (o.sq: false | { up, run, flick }) + the car (o.car: carSide's options or
   false) + the trolley beside the boot (o.trolley) + the folding table with the three bottles (o.table, o.bottles) + o.items, under a camera */
function VP(t, o = {}, cam) { const sq = o.sq === false ? "" : OP(o.dim ? .55 : 1, TF(SQ[0] + ((o.sq || {}).run || 0), SQ[1], .6, squirrelBody(t, o.sq || {})));
  return cam3(bg(o.dim ? "parkD" : "park") + sq + OP(o.dim ? .45 : 1, (o.trolley === false ? "" : TF(TRPX, PGROUND + 30, .85, trolleyS(o.trolley || {})))
    + (o.car === false ? "" : `<ellipse cx="${CARX}" cy="${PGROUND + 2}" rx="380" ry="20" fill="${P.ink}" opacity=".22" filter="url(#b4)"/>` + TF(CARX, PGROUND, 1, carSide(o.car || {})))
    + (o.table === false ? "" : TF(TABX, PGROUND + 20, 1, foldTable(260)) + (o.bottles === false ? "" : BKINDS.map((k, i) => TF(TABX - 80 + i * 80, PGROUND - 156, .42, bottleSvg(k, { id: "pk" + i }))).join("")))) + (o.items || ""), cam); }

/* ---------- the small picture tiles of the board MATCH THE JOB (each about 60 x 56, centred on 0, 0) and the material swatches ---------- */
const tileBox = (inner, c = "#fff") => `<rect x="-32" y="-29" width="64" height="58" rx="10" fill="${c}" stroke="${P.ink}" stroke-width="3"/>${inner}`;
const TILE = { trolley: () => tileBox(TF(2, 24, .19, trolleyS())), "fish tank": () => tileBox(`<rect x="-24" y="-18" width="48" height="30" rx="3" fill="#BDEBFF" stroke="#7FB6D6" stroke-width="3"/><path d="M-14 0 l-8 -6 v12z" fill="#FF8A3C"/><ellipse cx="-8" cy="0" rx="8" ry="5" fill="#FF8A3C"/><path d="M10 10 q4 -18 8 0z" fill="#43BF6C"/><path d="M-26 14 H26 M-20 14 V24 M20 14 V24" stroke="#8A5A36" stroke-width="4"/>`),
  "water bottle for school": () => tileBox(TF(0, 25, .24, bottleSvg("plastic", { id: "tl" }))), car: () => TF(0, 20, .125, carSide()),
  tyres: () => tileBox(`<circle r="21" fill="#2A2A36"/><circle r="10" fill="#C9D1DC"/>`), seats: () => tileBox(`<rect x="-12" y="-22" width="20" height="14" rx="5" fill="url(#wSeat)"/><path d="M-16 -6 Q-20 20 -10 20 H16 Q18 2 10 -8z" fill="url(#wSeat)"/>`),
  windscreen: () => tileBox(`<path d="M-22 16 L-14 -16 H14 L22 16z" fill="#EAF8FF" stroke="#7FB6D6" stroke-width="4" stroke-linejoin="round"/><path d="M-8 -8 L-12 8" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`), body: () => tileBox(`<rect x="-22" y="-16" width="44" height="34" rx="6" fill="url(#wCar)" stroke="#1F5FA0" stroke-width="3"/><rect x="2" y="-4" width="14" height="5" rx="2" fill="#D6E9FA"/>`) };
const SWATCH = { metal: `<rect x="-17" y="-17" width="34" height="34" rx="8" fill="url(#wSteelH)" stroke="${METD}" stroke-width="3"/>`, glass: `<rect x="-17" y="-17" width="34" height="34" rx="8" fill="#DDF4FF" stroke="#7FB6D6" stroke-width="3"/><path d="M-8 -9 L-8 6" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`,
  plastic: `<rect x="-17" y="-17" width="34" height="34" rx="8" fill="#BFE6FF" stroke="#5A9FD0" stroke-width="3"/><path d="M-9 8 Q-9 -9 8 -9" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`, rubber: `<rect x="-17" y="-17" width="34" height="34" rx="8" fill="#2A2A36" stroke="#15151E" stroke-width="3"/><path d="M-10 -8 l6 6 l-6 6 M0 -8 l6 6 l-6 6" stroke="#5A5A6A" stroke-width="3" fill="none"/>`,
  fabric: `<rect x="-17" y="-17" width="34" height="34" rx="8" fill="url(#wWeave)" stroke="#51477A" stroke-width="3"/>` };

/* ---------- the dare for Episode 13: the SAME school bag three times, its strap torn off at one end, each with a new strap lying beside it:
   a fabric strap, a flat metal bar, a wooden stick (PIC.bagFabric / bagMetal / bagWood, for picBoard; EP13 opens with these same boards) ---------- */
// the school bag (origin = its base middle; about 170 wide, 210 tall). o.pocket = an empty bottle pocket at its side (Round 1's ring), o.torn = the torn strap
const bagS = (o = {}) => `${o.torn ? `<path d="M56 -192 Q150 -190 132 -92" fill="none" stroke="#8E2F56" stroke-width="16" stroke-linecap="round"/><path d="M132 -92 l-10 18 l10 -6 l4 16 l8 -18" fill="none" stroke="#8E2F56" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M92 -20 l14 -12 l-2 14 l12 -8" fill="none" stroke="#8E2F56" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M112 -66 l10 8 M124 -52 l12 4 M108 -46 l4 10" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" opacity=".6"/>` : ""}
  <path d="M-30 -196 Q0 -236 30 -196" fill="none" stroke="#C4547A" stroke-width="12" stroke-linecap="round"/><path d="M-80 0 Q-88 0 -88 -10 V-150 Q-88 -200 -40 -200 H40 Q88 -200 88 -150 V-10 Q88 0 80 0z" fill="#FF8FB1" stroke="#C4547A" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-86 -140 Q0 -112 86 -140" fill="none" stroke="#C4547A" stroke-width="5"/><path d="M-70 -150 Q0 -124 70 -150" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="5 9" stroke-linecap="round"/><rect x="-50" y="-92" width="100" height="72" rx="14" fill="#FFB3CA" stroke="#C4547A" stroke-width="6"/><path d="M-40 -74 H40" stroke="#fff" stroke-width="4" stroke-dasharray="5 8" stroke-linecap="round"/><rect x="30" y="-80" width="10" height="16" rx="4" fill="#FFC83A" stroke="#C98200" stroke-width="3"/>
  ${o.pocket ? `<path d="M88 -96 H128 Q134 -50 124 -8 H88z" fill="#FFD3E0" stroke="#C4547A" stroke-width="6" stroke-linejoin="round"/><path d="M92 -84 H126" stroke="#C4547A" stroke-width="4" stroke-dasharray="4 6"/>${T(108, -40, "?", 34, "#C4547A")}` : ""}`;
const STRAP = { Fabric: `<path d="M-60 0 Q-20 -30 20 -6 Q50 12 64 -14" fill="none" stroke="#7B5FD0" stroke-width="18" stroke-linecap="round"/><path d="M-60 0 Q-20 -30 20 -6 Q50 12 64 -14" fill="none" stroke="#D9CCFF" stroke-width="4" stroke-dasharray="7 9" stroke-linecap="round"/>`,
  Metal: `<rect x="-66" y="-12" width="132" height="20" rx="4" fill="url(#wSteel)" stroke="${METD}" stroke-width="5"/><path d="M-56 -6 H50" stroke="#fff" stroke-width="3" opacity=".8"/>`, Wood: `<rect x="-66" y="-12" width="132" height="20" rx="9" fill="url(#wWood)" stroke="#7A4C26" stroke-width="5"/><path d="M-50 -4 q20 -6 40 0 t40 0" stroke="#7A4C26" stroke-width="2.5" fill="none" opacity=".7"/>` };
["Fabric", "Metal", "Wood"].forEach((m) => { PIC["bag" + m] = () => pbg("#FFF3DC", "#EADFCB", 96) + TF(-56, 92, .8, bagS({ torn: true })) + TF(92, 92, .78, STRAP[m]); });
