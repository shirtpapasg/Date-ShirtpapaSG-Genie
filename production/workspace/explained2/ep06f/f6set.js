// f6set.js: EP6's places and animals (the three Fable moments).
//   BG.gardens = the Singapore Botanic Gardens by the Bandstand (the cold open); BG.lake = a lake bank in the Gardens with a rock in the sun (the journey).
//   monitor() = a monitor lizard, side view (a wild lizard: the buddies are never drawn in code). thermo() = a plain thermometer, no numbers.
const XDEFS6 = () => `${lg("gdSky", [[0, "#6FBBFF"], [.55, "#C9E9FF"], [1, "#F6F4DC"]])}${lg("gdLawn", [[0, "#9BE07C"], [1, "#58B45E"]])}${lg("gdPath", [[0, "#F1E2C4"], [1, "#D9C39C"]])}${lg("gdTrunk", [[0, "#6E4A30"], [.5, "#8B6140"], [1, "#5E3E28"]], 1, 0)}
  ${lg("gdRoof", [[0, "#5C6B66"], [1, "#3F4C48"]])}${lg("lzBody", [[0, "#7E8C62"], [1, "#56634A"]])}${lg("gdRock", [[0, "#D9D2C2"], [.5, "#B5AD9C"], [1, "#8C8576"]])}${lg("gdWater", [[0, "#A8DDE8"], [1, "#5FB2C4"]])}
  ${lg("thGlass", [[0, "#FFFFFF"], [1, "#E4ECF5"]], 1, 0)}${rg("sunG", [[0, "#FFF9D8", 1], [.35, "#FFE48A", .7], [1, "#FFD66B", 0]])}${lg("mCap", [[0, "#D99A5E"], [1, "#A9683A"]])}
  <clipPath id="webC"><circle r="170"/></clipPath>`;

/* ---------- the Bandstand: the white eight-sided gazebo on its little hill, ringed by yellow rain trees. origin = the middle of its floor ---------- */
const bandstand = () => { let posts = ""; [-150, -92, -32, 32, 92, 150].forEach((x) => { posts += `<rect x="${x - 7}" y="-170" width="14" height="172" rx="5" fill="#FFFFFF" stroke="#B9C4CC" stroke-width="3"/>`; });
  let rail = ""; for (let x = -150; x < 150; x += 20) rail += `<path d="M${x + 10} -52 V-4" stroke="#DCE4EA" stroke-width="5"/>`;
  return `<ellipse cx="0" cy="26" rx="250" ry="26" fill="#3F8F4E" opacity=".35"/><path d="M-190 8 H190 L206 30 H-206z" fill="#E9EDF0" stroke="#B9C4CC" stroke-width="3"/><rect x="-172" y="-8" width="344" height="18" rx="5" fill="#FFFFFF" stroke="#B9C4CC" stroke-width="3"/>
  <rect x="-150" y="-170" width="300" height="165" fill="#CFE7F5" opacity=".35"/>${rail}<path d="M-158 -54 H158" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>${posts}
  <path d="M-196 -168 L-70 -268 H70 L196 -168z" fill="url(#gdRoof)" stroke="#34403C" stroke-width="5" stroke-linejoin="round"/><path d="M-70 -268 L-40 -168 M70 -268 L40 -168 M0 -268 V-168" stroke="#34403C" stroke-width="3" opacity=".5"/>
  <path d="M-196 -168 H196" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/><path d="M-44 -268 Q0 -318 44 -268z" fill="url(#gdRoof)" stroke="#34403C" stroke-width="5"/><path d="M0 -300 V-336" stroke="#34403C" stroke-width="6" stroke-linecap="round"/><circle cy="-340" r="8" fill="#FFD75A" stroke="#34403C" stroke-width="3"/>`; };
const tree = (x, y, s, c1, c2, tr = "#7A5438") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0 Q-8 -80 -30 -150 M10 0 Q8 -90 34 -150 M0 0 V-140" stroke="${tr}" stroke-width="16" stroke-linecap="round" fill="none"/>
  <circle cx="-70" cy="-170" r="74" fill="${c2}"/><circle cx="70" cy="-176" r="80" fill="${c2}"/><circle cx="0" cy="-226" r="92" fill="${c1}"/><circle cx="-36" cy="-150" r="60" fill="${c1}"/><circle cx="44" cy="-146" r="58" fill="${c1}"/><circle cx="-20" cy="-250" r="34" fill="#fff" opacity=".12"/></g>`;
BG.gardens = () => { const r = rndm(61); let far = "", tufts = "", bark = "", leaves = "";
  for (let i = 0; i < 20; i++) far += `<circle cx="${-160 + i * 122}" cy="${n2(486 - 40 * r())}" r="${n2(84 + 50 * r())}" fill="${i % 3 ? "#4FA765" : "#3F9458"}"/>`;
  for (let i = 0; i < 46; i++) { const x = -150 + r() * 2250, y = 640 + r() * 250; tufts += `<path d="M${n2(x)} ${n2(y)} l-7 -17 M${n2(x + 6)} ${n2(y)} l1 -22 M${n2(x + 12)} ${n2(y)} l8 -16" stroke="#3F9A52" stroke-width="4" stroke-linecap="round" opacity=".55"/>`; }
  for (let i = 0; i < 16; i++) { const x = 40 + r() * 250, y = -90 + i * 80; bark += `<path d="M${n2(x)} ${y} q${n2(-14 + 28 * r())} 30 0 62" stroke="#4E3422" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>`; }
  for (let i = 0; i < 15; i++) { const x = -190 + i * 62 + 20 * r(), y = -70 + 80 * r() + (i > 6 ? -14 * (i - 6) : 0); leaves += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(70 + 30 * r())}" ry="${n2(40 + 14 * r())}" fill="${i % 2 ? "#2F8A4C" : "#3F9A52"}" transform="rotate(${n2(-20 + 40 * r())} ${n2(x)} ${n2(y)})"/>`; }
  return `<rect x="-200" y="-120" width="2320" height="760" fill="url(#gdSky)"/><circle cx="1560" cy="120" r="330" fill="url(#sunG)"/><circle cx="1560" cy="120" r="74" fill="#FFF6C8"/>
  <g fill="#fff" opacity=".85"><ellipse cx="640" cy="130" rx="150" ry="34"/><ellipse cx="730" cy="108" rx="100" ry="34"/><ellipse cx="1130" cy="230" rx="120" ry="26"/></g>
  <g opacity=".5"><rect x="330" y="300" width="120" height="200" rx="6" fill="#C9C2E8"/><rect x="470" y="340" width="90" height="160" rx="6" fill="#D6D0EE"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="340" y="${316 + i * 34}" width="100" height="10" fill="#fff" opacity=".6"/>`).join("")}</g>
  <g filter="url(#b4)">${far}</g>
  <path d="M-200 600 Q500 520 960 548 Q1500 520 2120 590 V1200 H-200z" fill="url(#gdLawn)"/><path d="M430 640 Q960 470 1500 640z" fill="#A9E68A" opacity=".8"/>
  ${tree(560, 600, 1.0, "#E4DC62", "#C9C84E")}${tree(1420, 596, 1.1, "#E9E06A", "#CFCB52")}${tree(760, 566, .7, "#DAD65A", "#BFC048")}${tree(1230, 560, .66, "#E4DC62", "#C4C44C")}
  <g transform="translate(990 586) scale(.92)">${bandstand()}</g>
  <path d="M900 1200 Q860 900 1000 760 Q1070 690 1010 622 L962 622 Q1000 690 900 760 Q640 900 560 1200z" fill="url(#gdPath)" opacity=".95"/>
  ${tufts}
  <g><ellipse cx="1830" cy="930" rx="210" ry="40" fill="#2F8A4C" opacity=".4"/>${[[1760, -34], [1830, -8], [1900, 16], [1960, 34], [1700, -50]].map(([x, a], i) => `<path d="M${x} 960 Q${x + a * 3} 640 ${x + a * 7} ${330 + i * 40}" stroke="#2F8A4C" stroke-width="14" fill="none" stroke-linecap="round"/><ellipse cx="${x + a * 7}" cy="${330 + i * 40}" rx="38" ry="120" fill="${i % 2 ? "#3FA85A" : "#56BF62"}" stroke="#2F8A4C" stroke-width="5" transform="rotate(${a} ${x + a * 7} ${330 + i * 40})"/>`).join("")}
  <path d="M1876 560 q40 -40 20 -90 q50 30 30 86z" fill="#FF8F4A" stroke="#D9601E" stroke-width="4"/><path d="M1790 640 q-40 -34 -24 -84 q-46 30 -20 84z" fill="#FFB03A" stroke="#D9601E" stroke-width="4"/></g>
  <g><rect x="1478" y="330" width="34" height="640" rx="10" fill="#8A5A36" stroke="#5E3F28" stroke-width="5"/><ellipse cx="1495" cy="968" rx="60" ry="12" fill="#2B2147" opacity=".2"/>
  <g transform="translate(1495 760) rotate(-2)"><rect x="-150" y="-62" width="300" height="124" rx="16" fill="url(#gPaper)" stroke="#8A5A36" stroke-width="8"/>${T(0, -14, "SINGAPORE", 30, "#2F6B45", { ls: 3 })}${T(0, 24, "BOTANIC GARDENS", 27, "#2F6B45", { ls: 1 })}${T(0, 50, "Bandstand", 20, P.ink2, { w: 600 })}</g></g>
  <rect x="-200" y="930" width="2320" height="270" fill="url(#wDeck)"/><path d="M-200 932 H2120" stroke="#8A6A40" stroke-width="5"/><g stroke="#8A6A40" stroke-width="3" opacity=".5">${Array.from({ length: 13 }, (_, i) => `<path d="M${-200 + i * 196} 932 L${-320 + i * 214} 1200"/>`).join("")}<path d="M-200 1040 H2120"/></g>
  <g><path d="M-200 -120 H330 Q296 300 322 700 Q330 880 372 970 H-200z" fill="url(#gdTrunk)"/><path d="M330 -120 Q296 300 322 700 Q330 880 372 970" fill="none" stroke="#4E3422" stroke-width="7"/>${bark}<path d="M300 968 q60 -20 130 6 M250 972 q-30 -30 -90 -10" stroke="#5E3E28" stroke-width="16" stroke-linecap="round" fill="none"/></g>
  <g>${leaves}</g>`; };

/* ---------- a lake bank in the Gardens: a tree's cool shade on the left, a flat rock in the sun on the right ---------- */
const ROCK = [1250, 800];   // the middle of the rock's flat top
BG.lake = () => { const r = rndm(77); let far = "", tufts = "", pads = "", leaves = "";
  for (let i = 0; i < 20; i++) far += `<circle cx="${-160 + i * 122}" cy="${n2(360 - 36 * r())}" r="${n2(80 + 50 * r())}" fill="${i % 3 ? "#4FA765" : "#3F9458"}"/>`;
  for (let i = 0; i < 60; i++) { const x = -150 + r() * 2250, y = 640 + r() * 480; tufts += `<path d="M${n2(x)} ${n2(y)} l-7 -17 M${n2(x + 6)} ${n2(y)} l1 -22 M${n2(x + 12)} ${n2(y)} l8 -16" stroke="#3F9A52" stroke-width="4" stroke-linecap="round" opacity=".5"/>`; }
  [[420, 500, 70], [760, 470, 52], [1040, 520, 80], [1500, 480, 60], [1800, 530, 76], [140, 540, 64]].forEach(([x, y, rx], i) => { pads += `<g transform="translate(${x} ${y})">${lilyPad(rx, i % 2 ? "#6FD06A" : "#5CC455")}</g>`; });
  for (let i = 0; i < 16; i++) { const x = -190 + i * 70 + 20 * r(), y = -60 + 90 * r() + (i > 7 ? -12 * (i - 7) : 0); leaves += `<ellipse cx="${n2(x)}" cy="${n2(y)}" rx="${n2(80 + 30 * r())}" ry="${n2(44 + 14 * r())}" fill="${i % 2 ? "#2F8A4C" : "#3F9A52"}" transform="rotate(${n2(-20 + 40 * r())} ${n2(x)} ${n2(y)})"/>`; }
  return `<rect x="-200" y="-120" width="2320" height="560" fill="url(#gdSky)"/><g fill="#fff" opacity=".8"><ellipse cx="700" cy="120" rx="150" ry="32"/><ellipse cx="1100" cy="200" rx="110" ry="24"/></g>
  <g filter="url(#b4)">${far}</g><g transform="translate(1120 392) scale(.34)" opacity=".9">${bandstand()}</g>
  <rect x="-200" y="400" width="2320" height="250" fill="url(#gdWater)"/><path d="M-200 402 H2120" stroke="#fff" stroke-width="4" opacity=".6"/><g stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".4" fill="none">${Array.from({ length: 9 }, (_, i) => `<path d="M${n2(-100 + r() * 2100)} ${n2(430 + r() * 180)} q30 -8 60 0"/>`).join("")}</g>${pads}
  <path d="M-200 640 Q500 596 960 620 Q1500 600 2120 640 V1200 H-200z" fill="url(#gdLawn)"/><path d="M-200 640 Q500 596 960 620 Q1500 600 2120 640" fill="none" stroke="#3F9A52" stroke-width="6"/>${tufts}
  <path d="M-200 640 Q300 610 760 640 Q900 820 760 1200 H-200z" fill="#1F4E5E" opacity=".34" style="mix-blend-mode:multiply"/>
  <g><ellipse cx="${ROCK[0]}" cy="${ROCK[1] + 150}" rx="430" ry="46" fill="#2B2147" opacity=".22" filter="url(#b10)"/><path d="M${ROCK[0] - 400} ${ROCK[1] + 150} Q${ROCK[0] - 430} ${ROCK[1] + 20} ${ROCK[0] - 300} ${ROCK[1] - 6} Q${ROCK[0]} ${ROCK[1] - 40} ${ROCK[0] + 290} ${ROCK[1] - 4} Q${ROCK[0] + 430} ${ROCK[1] + 30} ${ROCK[0] + 400} ${ROCK[1] + 150}z" fill="url(#gdRock)" stroke="#6E685C" stroke-width="7" stroke-linejoin="round"/>
  <path d="M${ROCK[0] - 300} ${ROCK[1] + 6} Q${ROCK[0]} ${ROCK[1] - 28} ${ROCK[0] + 290} ${ROCK[1] + 8} Q${ROCK[0]} ${ROCK[1] + 44} ${ROCK[0] - 300} ${ROCK[1] + 6}z" fill="#FFF3C9" opacity=".55"/><path d="M${ROCK[0] - 200} ${ROCK[1] + 80} q50 -20 100 6 M${ROCK[0] + 100} ${ROCK[1] + 96} q60 -24 130 0 M${ROCK[0] - 60} ${ROCK[1] + 120} q40 -10 80 4" stroke="#6E685C" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/></g>
  <g><path d="M-200 -120 H250 Q220 300 246 760 Q250 900 300 1000 H-200z" fill="url(#gdTrunk)"/><path d="M250 -120 Q220 300 246 760 Q250 900 300 1000" fill="none" stroke="#4E3422" stroke-width="7"/><path d="M240 996 q60 -20 120 8" stroke="#5E3E28" stroke-width="16" stroke-linecap="round" fill="none"/></g><g>${leaves}</g>`; };

/* ---------- a monitor lizard, side view, facing right. origin = the ground under its middle. o: walk (phase, radians), tongue 0..1, warm 0..1, blink, breathe ---------- */
function monitor(o = {}) { const ph = o.walk || 0, tg = clamp(o.tongue || 0), w = clamp(o.warm === undefined ? .5 : o.warm), br = o.breathe || 0, ln = "#35402E";
  const body = hexL("#5F7468", "#8E8A52", w), bel = hexL("#B9C7B4", "#E4D9A4", w), dot = hexL("#C4D2B0", "#F6E48A", w);
  const leg = (x, sw, far) => { const kx = x + 34 * sw, fx = x + 62 * sw + (far ? 8 : 0), lift = Math.max(0, Math.sin(ph + (far ? Math.PI : 0) + (x > 0 ? 0 : Math.PI))) * 12, fy = -2 - lift * (o.walk === undefined ? 0 : 1);
    return `<g opacity="${far ? .75 : 1}"><path d="M${x} -62 L${n2(kx)} -34 L${n2(fx)} ${n2(fy)}" stroke="${ln}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M${x} -62 L${n2(kx)} -34 L${n2(fx)} ${n2(fy)}" stroke="${far ? hexL(body, "#2B2147", .25) : body}" stroke-width="27" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${[-14, 0, 14, 26].map((d) => `<path d="M${n2(fx)} ${n2(fy)} l${n2(d * sw + 14 * sw)} ${n2(6 - Math.abs(d) * .12)}" stroke="${ln}" stroke-width="7" stroke-linecap="round"/>`).join("")}</g>`; };
  let dots = ""; for (let i = 0; i < 9; i++) for (let j = 0; j < 3; j++) { const x = -150 + i * 36 + (j % 2) * 14, y = -112 + j * 20 + 8 * Math.sin(i * .5); dots += `<circle cx="${x}" cy="${n2(y)}" r="${j === 1 ? 6 : 4.5}" fill="${dot}"/>`; }
  for (let i = 0; i < 9; i++) dots += `<circle cx="${-200 - i * 34}" cy="${n2(-78 + i * 6.6)}" r="${n2(6 - i * .45)}" fill="${dot}"/>`;
  const sw = o.walk === undefined ? 0 : Math.sin(ph) * .5;
  return `<ellipse cx="-40" cy="2" rx="330" ry="16" fill="#2B2147" opacity=".25" filter="url(#b4)"/>${leg(-120, -1 + sw * .4, true)}${leg(96, 1 + sw * .4, true)}
  <path d="M-150 -116 Q-340 -100 ${n2(-520 + 10 * Math.sin(ph))} ${n2(-22 + 6 * Math.sin(ph + 1))} Q-360 -30 -150 -40z" fill="${body}" stroke="${ln}" stroke-width="6" stroke-linejoin="round"/>
  <g transform="scale(1 ${n2(1 + .025 * br)})"><ellipse cx="-20" cy="-80" rx="176" ry="50" fill="${body}" stroke="${ln}" stroke-width="6"/><path d="M-170 -58 Q-20 -22 130 -62 Q-20 -40 -170 -58z" fill="${bel}" opacity=".9"/></g>
  <path d="M110 -116 Q190 -150 262 -150 L262 -100 Q190 -84 120 -50z" fill="${body}" stroke="${ln}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M236 -160 Q300 -176 356 -146 Q384 -132 380 -118 Q372 -104 330 -100 Q276 -94 236 -102z" fill="${body}" stroke="${ln}" stroke-width="6" stroke-linejoin="round"/><path d="M300 -112 Q346 -110 378 -122" stroke="${ln}" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${tg > .02 ? `<path d="M380 -122 l${n2(46 * tg)} ${n2(2 * tg)} l${n2(18 * tg)} ${n2(-9 * tg)} M${n2(380 + 46 * tg)} ${n2(-122 + 2 * tg)} l${n2(18 * tg)} ${n2(10 * tg)}" stroke="#E8607A" stroke-width="5" stroke-linecap="round" fill="none"/>` : ""}
  ${o.blink ? `<path d="M296 -146 q12 6 24 0" stroke="${ln}" stroke-width="5" fill="none" stroke-linecap="round"/>` : `<circle cx="308" cy="-146" r="11" fill="#FFE9A8" stroke="${ln}" stroke-width="4"/><ellipse cx="310" cy="-146" rx="4" ry="8" fill="#1B1430"/><circle cx="306" cy="-150" r="2.5" fill="#fff"/>`}<circle cx="364" cy="-134" r="2.5" fill="${ln}"/>
  ${dots}${leg(-130, -1 - sw * .4, false)}${leg(110, 1 - sw * .4, false)}`; }

/* ---------- a plain thermometer (no numbers). origin = the middle of the bulb; level 0..1; lab = the word above it ---------- */
function thermo(x, y, level, lab, o = {}) { const H = o.H || 300, lv = clamp(level), col = hexL("#3A8DFF", "#FF5A3C", lv), top = -46 - H, yL = -40 - (H - 26) * lv, k = o.k === undefined ? 1 : o.k; if (k < .02) return "";
  let ticks = ""; for (let i = 0; i <= 6; i++) ticks += `<path d="M24 ${n2(-52 - i * (H - 40) / 6)} h${i % 3 ? 12 : 20}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round" opacity=".55"/>`;
  return TF(x, y, k, `<g filter="url(#dropS)"><rect x="-23" y="${top}" width="46" height="${H + 40}" rx="23" fill="url(#thGlass)" stroke="${P.ink}" stroke-width="6"/><circle r="44" fill="url(#thGlass)" stroke="${P.ink}" stroke-width="6"/></g><rect x="-17" y="-30" width="34" height="34" fill="#F4F7FB"/>
    <rect x="-11" y="${n2(yL)}" width="22" height="${n2(-yL + 4)}" rx="9" fill="${col}"/><circle r="31" fill="${col}"/><ellipse cx="-11" cy="-11" rx="9" ry="6" fill="#fff" opacity=".6"/>${ticks}
    ${o.glow ? `<circle r="${n2(52 + 8 * o.glow)}" fill="none" stroke="${col}" stroke-width="6" opacity="${n2(.6 * o.glow)}"/>` : ""}
    <g transform="translate(0 ${top - 44})">${tpill(0, 0, lab, o.size || 30, o.fill || P.ink, o.ink || "#fff", { w: 700, ls: 1 })}</g>`); }
// a value that follows its target late (how a body warms and cools): from value a at t0 towards b, time constant tau
const follow = (t, t0, a, b, tau) => t <= t0 ? a : b + (a - b) * Math.exp(-(t - t0) / tau);

/* ---------- a mushroom in the soil; a spider's web ---------- */
const mushroom = (s = 1) => `<g transform="scale(${s})"><ellipse cx="0" cy="4" rx="150" ry="22" fill="#6B4A32"/><ellipse cx="0" cy="-2" rx="150" ry="20" fill="#7E5A3E" stroke="#4E3422" stroke-width="5"/>
  <path d="M-30 -4 Q-40 -110 -24 -190 H24 Q40 -110 30 -4z" fill="#FFF3DC" stroke="#B89A72" stroke-width="6" stroke-linejoin="round"/><path d="M-150 -180 Q-140 -330 0 -336 Q140 -330 150 -180 Q0 -214 -150 -180z" fill="url(#mCap)" stroke="#7A4A2B" stroke-width="7" stroke-linejoin="round"/>
  <path d="M-150 -180 Q0 -214 150 -180 Q0 -150 -150 -180z" fill="#F4DDB8" stroke="#7A4A2B" stroke-width="6" stroke-linejoin="round"/>${[-110, -70, -34, 0, 34, 70, 110].map((x) => `<path d="M${x} ${n2(-186 - 14 * (1 - Math.abs(x) / 150))} L${n2(x * .82)} ${n2(-164 + 4 * (1 - Math.abs(x) / 150))}" stroke="#B89A72" stroke-width="4" stroke-linecap="round"/>`).join("")}
  <path d="M-96 -262 q40 -44 100 -48" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".35"/>
  <g transform="translate(118 -4) scale(.42)"><path d="M-30 -4 Q-40 -110 -24 -190 H24 Q40 -110 30 -4z" fill="#FFF3DC" stroke="#B89A72" stroke-width="10"/><path d="M-150 -180 Q-140 -330 0 -336 Q140 -330 150 -180 Q0 -214 -150 -180z" fill="url(#mCap)" stroke="#7A4A2B" stroke-width="12" stroke-linejoin="round"/></g></g>`;
const web = (R = 150) => { let s = ""; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + .2; s += `<path d="M0 0 L${n2(Math.cos(a) * R * 1.5)} ${n2(Math.sin(a) * R * 1.5)}"/>`; }
  for (let k = 1; k <= 4; k++) { let d = ""; for (let i = 0; i <= 8; i++) { const a = i * Math.PI / 4 + .2, a2 = a - Math.PI / 8, rr = R * k / 4; d += (i ? ` Q${n2(Math.cos(a2) * rr * .86)} ${n2(Math.sin(a2) * rr * .86)} ` : "M") + `${n2(Math.cos(a) * rr)} ${n2(Math.sin(a) * rr)}`; } s += `<path d="${d}"/>`; }
  return `<g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85" clip-path="url(#webC)">${s}</g>`; };
