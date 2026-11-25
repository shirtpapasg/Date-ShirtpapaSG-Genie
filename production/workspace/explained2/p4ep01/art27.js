// art27.js: EP27's own art (the P3-to-P4 Bridge, "The Great Ice Cream Rescue"; drawn 2026-11-25, Opus). Loaded after art22.js / sets22.js
// (their helpers camOn, camMix, camPt, pawPt, fatArrow, melt are used), before common.js and p1.js.
// THE PLACES (one HDB estate on a hot afternoon, the last day of P3): the MAMA SHOP (a provision shop at the foot of a block: the red sign,
// the snack shelves, the drinks fridge, the glass-topped ICE CREAM chest freezer out front, a thermometer on the pillar), the SUNNY PATH to
// the void deck (no shade, the sun high, heat shimmer), the COVERED WALKWAY (the shade, the drain along its edge with a steel grating), the
// VOID DECK set up for the party (bunting BYE BYE P3! HELLO P4!, balloons tied to the pillars, a long table, a standing fan).
// THE SCIENCE IN THE PICTURES (checked against SERIES_FORMAT 6 "Science pictures must never plant a misconception"): heat is drawn ONLY as
// orange-red arrows that point from the hotter thing to the colder thing (never anything "cold" flowing; never a blue arrow); the wool never
// glows or gives off anything (it only SLOWS the arrows: they get thinner and slower inside it); temperatures in degrees Celsius; the bar
// magnet is ONE piece of metal (red and blue paint only); the steel opener comes up, the aluminium ring pull does not move at all.
// FACES notes (SERIES_FORMAT 6x): the drawings that travel are the buddies (front views; mirrored when they go left), the drips (straight
// down) and the heat / air arrows (they point the way they move). The standing fan's face is drawn facing RIGHT and mirrored to turn.

/* ================================================================ defs ================================================================ */
const XDEFS27 = () => `${lg("msSky", [[0, "#7CC8FF"], [.7, "#CDEBFF"], [1, "#FFF2D6"]])}${lg("msHot", [[0, "#FFE6A8", 0], [1, "#FFD27A", .55]])}${lg("msFloor", [[0, "#E8E1D3"], [1, "#CFC5B2"]])}
  ${lg("msPath", [[0, "#F3E3C0"], [1, "#E2C893"]])}${lg("msShop", [[0, "#5B4636"], [1, "#3E2F25"]])}${lg("msBox", [[0, "#F1CF97"], [1, "#D9A866"]])}${lg("msChest", [[0, "#FFFFFF"], [1, "#DDE6EE"]])}
  ${lg("msGlass", [[0, "#D8F1FF", .9], [1, "#9FD3F0", .7]])}${lg("msBlock", [[0, "#F6F1E8"], [1, "#DDD4C4"]])}${lg("msShade", [[0, "#3B4A63", .38], [1, "#3B4A63", .18]])}
  ${lg("msGrass", [[0, "#9CD66B"], [1, "#6FB548"]])}${lg("wlRoof", [[0, "#8E9AAE"], [1, "#6D788C"]])}${lg("vdCloth", [[0, "#FFFFFF"], [1, "#EAF2FF"]])}
  ${rg("hotGlow", [[0, "#FF7A2E", .75], [.6, "#FF9A3C", .3], [1, "#FFB347", 0]])}${rg("coldGlow", [[0, "#7FD3FF", .7], [.6, "#A9E4FF", .3], [1, "#CFF1FF", 0]])}
  ${rg("sunDisc", [[0, "#FFFDE8"], [.45, "#FFF0A0"], [1, "#FFD24A", 0]])}${rg("airPocket", [[0, "#FFFFFF", .5], [.8, "#E8F6FF", .25], [1, "#FFFFFF", 0]])}
  ${lg("woolA", [[0, "#B79CFF"], [1, "#7C5CE0"]])}${lg("woolB", [[0, "#FFF4E2"], [1, "#E8D6B8"]])}
  <filter id="glitchC" x="-10%" y="-10%" width="120%" height="120%"><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .8 0"/></filter>
  <filter id="glitchM" x="-10%" y="-10%" width="120%" height="120%"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 .8 0"/></filter>
  <filter id="shimmer" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="10"/></filter>`;

/* ================================================================ small helpers ================================================================ */
const R27 = (x, y, w, h, fill, o = "") => `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}" fill="${fill}" ${o}/>`;
const BOX27 = { w: 300, h: 190 };                     // the ice-cream box, origin = the middle of its bottom edge
// a buddy turned to look at an object at screen x ox (until the watching paintings arrive: flip and lean), as EP23's watchO
const watchO = (x, ox, extra = {}) => ({ watch: ox, flip: ox < x, look: (ox < x ? -1 : 1) * 5, ...extra });
// the party clock: anchors [t, seconds left]; between anchors it ticks down in real time; at each anchor it rolls to the new value in .7 s
function clockLeft(t, A) { let v = A[0][1], tA = A[0][0];
  for (let i = 0; i < A.length; i++) { const [ta, va] = A[i]; if (t < ta) break; const prev = i ? Math.max(0, A[i - 1][1] - (ta - A[i - 1][0])) : va; const u = eio((t - ta) / .7); v = lerp(prev, va, u); tA = ta; if (u >= 1) v = va - (t - ta - .7); }
  return Math.max(0, v); }
function clockPill(t, secs, k = 1, x = 960, y = 62) { if (k <= .01) return ""; const s = Math.max(0, Math.ceil(secs)), mm = Math.floor(s / 60), ss_ = s % 60, txt = `${mm}:${String(ss_).padStart(2, "0")}`, low = s < 300;
  const col = low ? "#FF5A4E" : P.ink, pl = low ? 1 + .05 * Math.max(0, Math.sin(t * 6.3)) : 1;
  return TF(x, y, k * pl, `<g filter="url(#dropS)"><rect x="-230" y="-40" width="460" height="80" rx="40" fill="${col}"/></g><circle cx="-182" cy="0" r="24" fill="#fff"/><circle cx="-182" cy="0" r="18" fill="${P.sun}"/>
    <path d="M-182 0 V-12 M-182 0 L${n2(-182 + 9 * Math.cos(t * 2))} ${n2(9 * Math.sin(t * 2))}" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`
    + T(-140, 13, "PARTY IN", 34, "#fff", { a: "start", w: 600 }) + T(170, 15, txt, 46, P.sun, { a: "end", w: 700 })); }
// a wall thermometer (degrees Celsius), origin = its middle
const therm27 = (val, k = 1, glow = 0) => TF(0, 0, k, `<g filter="url(#dropS)"><rect x="-46" y="-150" width="92" height="300" rx="46" fill="#fff" stroke="${P.ink}" stroke-width="6"/></g>
  <rect x="-10" y="-118" width="20" height="206" rx="10" fill="#EAF2F8" stroke="#9FB3C8" stroke-width="3"/><circle cx="0" cy="108" r="26" fill="#F0453A" stroke="${P.ink}" stroke-width="5"/>
  <rect x="-7" y="${n2(98 - 196 * clamp((val + 20) / 70))}" width="14" height="${n2(196 * clamp((val + 20) / 70) + 4)}" rx="7" fill="#F0453A"/>
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M14 ${n2(98 - i * 28)} h12" stroke="${P.ink}" stroke-width="3"/>`).join("")}`
  + (glow > .02 ? OP(glow, `<circle cx="0" cy="${n2(98 - 196 * clamp((val + 20) / 70))}" r="40" fill="#FF7A2E" opacity=".35" filter="url(#b10)"/>`) : ""));
const tempTag = (x, y, txt, hot, k = 1) => TF(x, y, k, `<g filter="url(#dropS)"><rect x="${n2(-tw(txt, 44, 700) / 2 - 30)}" y="-36" width="${n2(tw(txt, 44, 700) + 60)}" height="72" rx="36" fill="${hot ? "#FF6A3D" : "#3AA6E8"}"/></g>` + T(0, 15, txt, 44, "#fff"));
// heat arrow (orange-red): from (x1,y1) to (x2,y2); w = width; u = growth 0..1
const heatArrow = (x1, y1, x2, y2, w = 18, u = 1) => u <= .01 ? "" : fatArrow(x1, y1, lerp(x1, x2, eo(u)), lerp(y1, y2, eo(u)), "#FF6A2E", w);
// a soft label joined to a point
const plabel = (x, y, txt, px, py, size = 34, fill = "#fff", ink = P.ink) => `<path d="M${n2(x)} ${n2(y)} L${n2(px)} ${n2(py)}" stroke="${P.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(px)}" cy="${n2(py)}" r="8" fill="${P.ink}"/>` + tpill(x, y, txt, size, fill, ink, { w: 700 });

/* ================================================================ props ================================================================ */
// the ice-cream box (a cardboard carton of twelve cups), origin = middle of its bottom edge. o: open (0..1 the flaps open, the cups' lids
// show), melt (0..1: drips at the corners and a puddle), wrap (0..1: Pip's purple and cream wool scarf wound round it), frost (0..1: a cold
// mist when it is opened at the party), sweat (0..1: shiny wet patches as it starts to soften)
function iceBox27(t, o = {}) { const { w, h } = BOX27, m = o.melt || 0, wr = o.wrap || 0, op = o.open || 0; let s = "";
  if (m > .01) s += `<ellipse cx="0" cy="6" rx="${n2(60 + 150 * m)}" ry="${n2(10 + 16 * m)}" fill="#F6C9D7" opacity="${n2(.85 * Math.min(1, m * 2))}"/><ellipse cx="${n2(-30 * m)}" cy="4" rx="${n2(30 + 70 * m)}" ry="${n2(5 + 8 * m)}" fill="#FFF1E6" opacity=".7"/>`;
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="10" fill="url(#msBox)" stroke="#8A5A2B" stroke-width="5"/>`
    + `<rect x="${-w / 2 + 14}" y="${-h + 58}" width="${w - 28}" height="70" rx="12" fill="#3A8DFF"/>` + T(0, -h + 104, "ICE CREAM CUPS", 30, "#fff", { w: 700 })
    + [-1, 0, 1].map((i) => `<g transform="translate(${i * 70} ${-34})"><path d="M-20 -26 L20 -26 L14 14 L-14 14z" fill="#FFF3DC" stroke="#8A5A2B" stroke-width="3"/><path d="M-22 -26 Q0 -50 22 -26z" fill="${["#FF9EB5", "#FFF0C8", "#B98A5E"][i + 1]}" stroke="#8A5A2B" stroke-width="3"/></g>`).join("")
    + T(w / 2 - 30, -12, "×12", 26, "#8A5A2B", { a: "end", w: 700 });
  // the flaps on top (closed: a seam; open: two flaps up, four lids showing)
  if (op < .5) s += `<path d="M${-w / 2 + 4} ${-h + 2} H${w / 2 - 4}" stroke="#8A5A2B" stroke-width="4"/><path d="M0 ${-h} V${-h + 26}" stroke="#8A5A2B" stroke-width="4"/><rect x="-40" y="${-h - 4}" width="80" height="22" rx="4" fill="#E9D9B6" opacity=".9"/>`;
  else { const a = (op - .5) * 2; s += [0, 1, 2, 3].map((i) => `<ellipse cx="${-105 + i * 70}" cy="${-h + 4}" rx="30" ry="12" fill="${["#FF9EB5", "#FFF0C8", "#B98A5E", "#FF9EB5"][i]}" stroke="#8A5A2B" stroke-width="3"/>`).join("")
    + `<path d="M${-w / 2} ${-h} L${n2(-w / 2 - 40 * a)} ${n2(-h - 90 * a)} L${n2(-10 - 20 * a)} ${n2(-h - 90 * a)} L-4 ${-h}z" fill="#E9BD80" stroke="#8A5A2B" stroke-width="4"/><path d="M${w / 2} ${-h} L${n2(w / 2 + 40 * a)} ${n2(-h - 90 * a)} L${n2(10 + 20 * a)} ${n2(-h - 90 * a)} L4 ${-h}z" fill="#E9BD80" stroke="#8A5A2B" stroke-width="4"/>`; }
  if ((o.sweat || 0) > .02) s += OP(o.sweat, [[-110, -60], [-40, -150], [60, -80], [120, -140], [100, -30]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="${7 + (i % 2) * 3}" ry="${10 + (i % 3) * 3}" fill="#fff" opacity=".7"/>`).join(""));
  if (m > .01) for (let i = 0; i < 4; i++) { const x = [-w / 2 + 12, w / 2 - 14, -40, 70][i], per = 1.4 + .3 * i, ph = ((t * 1.0 + i * .37) % per) / per, L = 18 + 26 * m;
    s += `<path d="M${x - 7} -2 Q${x} ${n2(L)} ${x + 7} -2z" fill="#F7B8CB" stroke="#D9849E" stroke-width="2"/>`;
    if (m > .25) s += `<ellipse cx="${x}" cy="${n2(L + 40 * ph * ph * 3)}" rx="6" ry="${n2(8 + 4 * ph)}" fill="#F7B8CB" opacity="${n2(1 - ph)}"/>`; }
  if (wr > .01) s += woolWrap27(t, w, h, wr);
  if ((o.frost || 0) > .02) for (let i = 0; i < 6; i++) { const u = ((t * .45 + i / 6) % 1); s += `<ellipse cx="${n2(-100 + i * 40 + 20 * Math.sin(t + i))}" cy="${n2(-h - 20 - 120 * u)}" rx="${n2(30 + 30 * u)}" ry="${n2(16 + 14 * u)}" fill="#fff" opacity="${n2(o.frost * .55 * Math.sin(Math.PI * u))}" filter="url(#b10)"/>`; }
  return s; }
// Pip's wool scarf wound round a box of width w, height h (wr 0..1 = how far it is wound): purple and cream knitted stripes, a fringe
function woolWrap27(t, w, h, wr) { let s = ""; const bands = 5, shown = Math.ceil(bands * wr);
  for (let i = 0; i < shown; i++) { const y = -h - 10 + i * (h + 20) / bands, k = clamp(bands * wr - i), hh = (h + 30) / bands + 6;
    s += `<g opacity="${n2(Math.min(1, k * 1.5))}"><rect x="${n2(-w / 2 - 14)}" y="${n2(y)}" width="${n2((w + 28) * k)}" height="${n2(hh)}" rx="12" fill="${i % 2 ? "url(#woolB)" : "url(#woolA)"}" stroke="#5B3FB8" stroke-width="4"/>`
      + [...Array(Math.floor((w + 20) * k / 22))].map((_, j) => `<path d="M${n2(-w / 2 - 6 + j * 22)} ${n2(y + 8)} l9 ${n2(hh / 2 - 6)} l9 ${n2(-hh / 2 + 6)}" fill="none" stroke="${i % 2 ? "#D9C29B" : "#6A4BD0"}" stroke-width="3" opacity=".8"/>`).join("") + `</g>`; }
  if (wr > .95) s += `<g transform="translate(${w / 2 + 6} ${-h * .55})">${[0, 1, 2, 3, 4, 5].map((j) => `<path d="M${j * 7 - 14} 0 q${n2(4 * Math.sin(t * 3 + j))} 30 ${j % 2 ? 4 : -3} 58" stroke="${j % 2 ? "#E8D6B8" : "#8B5CF6"}" stroke-width="6" stroke-linecap="round" fill="none"/>`).join("")}<rect x="-26" y="-34" width="52" height="40" rx="10" fill="url(#woolA)" stroke="#5B3FB8" stroke-width="4"/></g>`;
  return s; }
// Pip's scarf in his paws before he wraps (a long loop), origin = the paw
const scarfHeld27 = (t) => `<path d="M0 0 C-60 40 -90 120 -40 170 C10 220 90 190 110 130" fill="none" stroke="#5B3FB8" stroke-width="44" stroke-linecap="round"/><path d="M0 0 C-60 40 -90 120 -40 170 C10 220 90 190 110 130" fill="none" stroke="url(#woolA)" stroke-width="36" stroke-linecap="round" stroke-dasharray="40 26"/><path d="M0 0 C-60 40 -90 120 -40 170 C10 220 90 190 110 130" fill="none" stroke="#FFF4E2" stroke-width="36" stroke-linecap="round" stroke-dasharray="26 40" stroke-dashoffset="-40"/>`
  + `<g transform="translate(110 130)">${[0, 1, 2, 3, 4].map((j) => `<path d="M${j * 8 - 16} 0 q${n2(3 * Math.sin(t * 3 + j))} 24 0 46" stroke="${j % 2 ? "#E8D6B8" : "#8B5CF6"}" stroke-width="6" stroke-linecap="round" fill="none"/>`).join("")}</g>`;
// a single ice-cream cup (paper cup, a scoop on top), origin = bottom middle. o.melt 0..1, o.wrap: null | "bag" | "wool", o.n: number badge
function cup27(t, o = {}) { const m = o.melt || 0; let s = "";
  if (m > .02) s += `<ellipse cx="0" cy="4" rx="${n2(30 + 60 * m)}" ry="${n2(6 + 8 * m)}" fill="#F7B8CB" opacity=".85"/>`;
  s += `<path d="M-58 -150 L58 -150 L44 0 L-44 0z" fill="#FFF3DC" stroke="#8A5A2B" stroke-width="5" stroke-linejoin="round"/><path d="M-54 -112 L54 -112 L50 -74 L-50 -74z" fill="#FF8FB1"/>` + T(0, -84, "ICE CREAM", 20, "#fff", { w: 700 });
  const dome = 1 - .75 * m; s += `<path d="M-62 -150 Q-60 ${n2(-150 - 70 * dome)} 0 ${n2(-150 - 78 * dome)} Q60 ${n2(-150 - 70 * dome)} 62 -150z" fill="#FFB3C7" stroke="#D9849E" stroke-width="4"/>`;
  if (m > .05) s += [-40, -5, 32].map((x, i) => `<path d="M${x - 8} -150 Q${x} ${n2(-150 + (26 + 14 * i) * m * 1.4)} ${x + 8} -150z" fill="#FFB3C7" stroke="#D9849E" stroke-width="2"/>`).join("");
  if (o.wrap === "bag") s += `<path d="M-74 -250 Q-80 -120 -62 8 L62 8 Q80 -120 74 -250 Q30 -270 0 -236 Q-30 -270 -74 -250z" fill="#E8F6FF" opacity=".42" stroke="#9FC9E6" stroke-width="3"/><path d="M-50 -210 Q-56 -120 -44 -20" stroke="#fff" stroke-width="6" opacity=".7" fill="none"/>`;
  if (o.wrap === "wool") s += TF(0, 8, .42, woolWrap27(t, 300, 560, 1));
  if (o.n) s += TF(-78, -230, 1, `<g filter="url(#dropS)"><circle r="34" fill="${P.sun}" stroke="${P.ink}" stroke-width="5"/></g>` + T(0, 14, String(o.n), 40, P.ink));
  return s; }
// a measuring cup (millilitres) with ml of melted ice cream, origin = bottom middle; fill k 0..1 animates the pour
function jug27(ml, k = 1, n) { const maxH = 170, H = maxH * clamp(ml / 40) * k; let s = `<path d="M-60 -200 L60 -200 L56 0 L-56 0z" fill="#EEF7FF" opacity=".6" stroke="#6C8BA8" stroke-width="5"/>`;
  if (H > .5) s += `<path d="M-56 ${n2(-H)} L56 ${n2(-H)} L56 -4 L-56 -4z" fill="#F7B8CB"/><path d="M-56 ${n2(-H)} L56 ${n2(-H)}" stroke="#D9849E" stroke-width="4"/>`;
  for (let i = 1; i <= 4; i++) s += `<path d="M-60 ${n2(-maxH * i / 4)} h18" stroke="#6C8BA8" stroke-width="3"/>` + T(-34, n2(-maxH * i / 4 + 7), String(i * 10), 18, "#6C8BA8", { a: "start", w: 600 });
  s += `<path d="M60 -170 q34 0 34 40 q0 40 -34 40" fill="none" stroke="#6C8BA8" stroke-width="7"/>`;
  if (k > .9) s += TF(0, 50, 1, tpill(0, 0, `${ml} ml`, 34, n === 3 ? P.leaf : P.ink, "#fff", { w: 700 }));
  return s; }
// Momo's paper folding fan (red with gold ribs), origin = the handle's end; open 0..1; swing = rotation degrees
const fan27 = (open = 1, sw = 0) => { const a = 70 * open; let rib = ""; for (let i = -6; i <= 6; i++) { const an = (-90 + i * a / 6) * Math.PI / 180; rib += `<path d="M0 0 L${n2(150 * Math.cos(an))} ${n2(150 * Math.sin(an))}" stroke="#B8862E" stroke-width="3"/>`; }
  const a0 = (-90 - a) * Math.PI / 180, a1 = (-90 + a) * Math.PI / 180;
  return `<g transform="rotate(${n2(sw)})"><path d="M0 0 L${n2(160 * Math.cos(a0))} ${n2(160 * Math.sin(a0))} A160 160 0 0 1 ${n2(160 * Math.cos(a1))} ${n2(160 * Math.sin(a1))}z" fill="#FF5A4E" stroke="${P.ink}" stroke-width="5"/><path d="M${n2(110 * Math.cos(a0))} ${n2(110 * Math.sin(a0))} A110 110 0 0 1 ${n2(110 * Math.cos(a1))} ${n2(110 * Math.sin(a1))}" fill="none" stroke="#FFD27A" stroke-width="5"/>${rib}<rect x="-8" y="-6" width="16" height="44" rx="6" fill="#8A5A2B"/></g>`; };
// wind lines (white, travelling the way they point): from x0 towards +x when dir = 1
const wind27 = (t, x0, y0, len, dir = 1, n = 4, warm = false) => { let s = ""; for (let i = 0; i < n; i++) { const u = ((t * 1.6 + i / n) % 1), x = x0 + dir * len * u, y = y0 + (i - n / 2) * 30 + 6 * Math.sin(t * 5 + i);
  s += `<path d="M${n2(x)} ${n2(y)} q${n2(dir * 30)} -14 ${n2(dir * 60)} 0 t${n2(dir * 60)} 0" fill="none" stroke="${warm ? "#FFB066" : "#fff"}" stroke-width="7" stroke-linecap="round" opacity="${n2(.9 * Math.sin(Math.PI * u))}"/>`; } return s; };
// heat shimmer: wavy pale lines rising off hot ground
const shimmer27 = (t, x0, x1, y, n = 8, o = .5) => { let s = ""; for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + .5) / n), u = ((t * .35 + hash(i, 3)) % 1);
  s += `<path d="M${n2(x)} ${n2(y - 120 * u)} q12 -16 0 -32 t0 -32" fill="none" stroke="#FFF6D8" stroke-width="5" stroke-linecap="round" opacity="${n2(o * Math.sin(Math.PI * u))}"/>`; } return s; };
// the sun (a disc with slow rays)
const sun27 = (t, x, y, r = 120) => { let rays = ""; for (let i = 0; i < 14; i++) { const an = i * 360 / 14 + t * 6; rays += `<path d="M0 ${-r - 20} L14 ${-r - 70} L-14 ${-r - 70}z" fill="#FFE27A" opacity=".85" transform="rotate(${n2(an)})"/>`; }
  return `<g transform="translate(${x} ${y})"><circle r="${r * 2.4}" fill="url(#sunDisc)" opacity=".8"/>${rays}<circle r="${r}" fill="#FFF0A0" stroke="#FFD24A" stroke-width="8"/></g>`; };
// a bar magnet hanging on a string (ONE piece of metal; red / blue are paint), origin = its top middle where the string ties on
const magnetOnString = (L, sw = 0) => `<g transform="rotate(${n2(sw)})"><path d="M0 ${-L} V0" stroke="#5B4636" stroke-width="4"/><g transform="translate(0 4)"><rect x="-24" y="0" width="48" height="140" rx="8" fill="#9AA3AE" stroke="${P.ink}" stroke-width="5"/><rect x="-21" y="3" width="42" height="66" rx="6" fill="#F0453A"/><rect x="-21" y="71" width="42" height="66" rx="6" fill="#3A8DFF"/>${T(0, 50, "N", 34, "#fff")}${T(0, 118, "S", 34, "#fff")}<path d="M-16 8 V60" stroke="#fff" stroke-width="5" opacity=".35"/></g></g>`;
// the steel bottle opener (grey, a hole at one end), origin = its middle; the aluminium ring pull (pale silver, thin)
const opener27 = () => `<path d="M-70 -14 H40 a30 30 0 1 1 0 28 H-70 a14 14 0 0 1 0 -28z" fill="#8E98A6" stroke="${P.ink}" stroke-width="5"/><circle cx="58" cy="0" r="14" fill="#3A3A4A"/><path d="M-60 -6 H30" stroke="#fff" stroke-width="4" opacity=".5"/>`;
const ringPull27 = () => `<path d="M-30 -18 h40 a18 18 0 0 1 0 36 h-40 a18 18 0 0 1 0 -36z" fill="#DDE3EA" stroke="#7B8794" stroke-width="4"/><ellipse cx="-12" cy="0" rx="14" ry="9" fill="#2A2A36"/><path d="M14 -8 h12 v16 h-12z" fill="#C9D1DA" stroke="#7B8794" stroke-width="3"/>`;
// a steel drain grating seen from above-front, origin = its middle; w wide
const grating27 = (w = 520) => { let s = `<rect x="${-w / 2}" y="-60" width="${w}" height="120" rx="8" fill="#2E2A30"/>`; for (let i = 0; i <= 12; i++) s += `<rect x="${n2(-w / 2 + i * w / 12 - 7)}" y="-60" width="14" height="120" fill="#7F8791" stroke="#3E434A" stroke-width="3"/>`;
  return s + `<rect x="${-w / 2}" y="-66" width="${w}" height="12" fill="#9AA2AC"/><rect x="${-w / 2}" y="54" width="${w}" height="12" fill="#9AA2AC"/>`; };
// the void deck's standing fan, its face drawn turned to the RIGHT (FACES: right) (blow towards +x); spin = blade angle; origin = the floor
// FACES: right
const standFan27 = (spin) => { let bl = ""; for (let i = 0; i < 3; i++) bl += `<ellipse cx="0" cy="-52" rx="22" ry="52" fill="#BFE6FF" stroke="#5B7FA6" stroke-width="3" transform="rotate(${n2(spin + i * 120)})"/>`;
  return `<ellipse cx="0" cy="0" rx="90" ry="20" fill="#5B6B80"/><rect x="-10" y="-330" width="20" height="330" fill="#8C9BB0" stroke="#4A5A70" stroke-width="3"/>
    <g transform="translate(20 -420) scale(.55 1)">${bl}<circle r="24" fill="#4A5A70"/><circle r="118" fill="none" stroke="#4A5A70" stroke-width="7"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M0 0 L${n2(118 * Math.cos(i * Math.PI / 4))} ${n2(118 * Math.sin(i * Math.PI / 4))}" stroke="#4A5A70" stroke-width="2"/>`).join("")}</g>
    <path d="M-10 -420 h-40 a26 30 0 0 0 0 60 h40z" fill="#8C9BB0" stroke="#4A5A70" stroke-width="3"/>`; };
// Pip's P4 safety goggles (worn up on his forehead), Basil's P4 lab badge, Momo's P4 magnifier
const goggles27 = () => `<rect x="-118" y="-14" width="236" height="22" rx="10" fill="#5B3FB8"/><g filter="url(#dropS)"><rect x="-100" y="-40" width="92" height="70" rx="30" fill="#BFEAFF" stroke="${P.ink}" stroke-width="6"/><rect x="8" y="-40" width="92" height="70" rx="30" fill="#BFEAFF" stroke="${P.ink}" stroke-width="6"/></g><path d="M-80 -24 l24 -6 M28 -24 l24 -6" stroke="#fff" stroke-width="7" stroke-linecap="round"/><rect x="-10" y="-16" width="20" height="22" fill="${P.ink}"/>`;
const badge27 = (who) => `<g filter="url(#dropS)"><rect x="-74" y="-50" width="148" height="100" rx="14" fill="#fff" stroke="${P.ink}" stroke-width="5"/></g><rect x="-74" y="-50" width="148" height="34" rx="14" fill="${P[who] || P.basil}"/>${T(0, -24, "P4 LAB", 22, "#fff")}${T(0, 30, "SCIENTIST", 22, P.ink)}<circle cx="0" cy="-58" r="10" fill="#C9D1DA" stroke="${P.ink}" stroke-width="3"/>`;
const magnifier27 = () => `<path d="M0 0 L-90 90" stroke="#8A5A2B" stroke-width="22" stroke-linecap="round"/><circle cx="34" cy="-34" r="62" fill="#DFF4FF" opacity=".7" stroke="${P.ink}" stroke-width="10"/><path d="M8 -64 a40 40 0 0 1 40 -6" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
// a clapperboard (the blooper), origin = middle
const clapper27 = (open = 0) => `<g filter="url(#drop)"><rect x="-200" y="-110" width="400" height="230" rx="12" fill="#2B2147"/></g><g transform="translate(-200 -110) rotate(${n2(-22 * open)})"><rect x="0" y="-46" width="400" height="46" rx="8" fill="#fff"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${i * 80 + 20} -46 l40 0 l-30 46 l-40 0z" fill="#2B2147"/>`).join("")}</g>${T(0, -20, "BLOOPER", 58, P.sun)}${T(0, 60, "TAKE 2", 52, "#fff", { w: 600 })}`;

/* ================================================================ the fix cards ================================================================ */
// the three FIX CARDS (one set, big and numbered; the picture shows the difference): 1 run faster, 2 fan it, 3 wrap it in wool. origin = middle
function fixPic27(t, n) { if (n === 1) return `<g transform="translate(0 30)">${[0, 1, 2].map((i) => `<path d="M${-150 + i * 10} ${-40 + i * 36} h${80 - i * 14}" stroke="${P.ink}" stroke-width="9" stroke-linecap="round" opacity=".45"/>`).join("")}${TF(30, 60, .55, iceBox27(t, {}))}<g transform="translate(40 120)"><path d="M-60 0 q30 -30 60 -10 q40 10 60 -6 l10 26 h-140z" fill="#FF6A3D" stroke="${P.ink}" stroke-width="6"/><path d="M-50 22 h140" stroke="#fff" stroke-width="10"/></g></g>`;
  if (n === 2) return `<g transform="translate(-40 40)">${TF(80, 70, .5, iceBox27(t, {}))}${TF(-90, 40, .9, fan27(1, -20 + 12 * Math.sin(t * 9)))}${wind27(t, -40, -40, 130, 1, 3)}</g>`;
  return `<g transform="translate(0 70)">${TF(0, 60, .62, iceBox27(t, { wrap: 1 }))}</g>`; }
function fixCard27(t, n, o = {}) { const col = ["#FF6A3D", "#3AA6E8", "#8B5CF6"][n - 1], lab = ["Run faster", "Fan it", "Wrap it in wool"][n - 1], k = o.k === undefined ? 1 : o.k;
  let s = `<g filter="url(#drop)"><rect x="-230" y="-250" width="460" height="500" rx="34" fill="#FFF8EA" stroke="${col}" stroke-width="12"/></g>` + fixPic27(t, n)
    + `<rect x="-230" y="150" width="460" height="100" rx="0" fill="${col}"/><path d="M-230 150 h460 v66 a34 34 0 0 1 -34 34 h-392 a34 34 0 0 1 -34 -34z" fill="${col}"/>` + T(0, 218, lab, lab.length > 12 ? 44 : 52, "#fff")
    + `<g transform="translate(-196 -214)" filter="url(#dropS)"><circle r="54" fill="${P.sun}" stroke="${P.ink}" stroke-width="7"/></g>` + T(-196, -194, String(n), 64, P.ink);
  if (o.glow) s = `<rect x="-252" y="-272" width="504" height="544" rx="44" fill="none" stroke="${P.sun}" stroke-width="${n2(14 * o.glow)}" opacity="${n2(o.glow)}"/>` + s;
  if (o.stamp) { const [txt, good, ts] = o.stamp, a = spring(t, ts, .4); if (t >= ts) s += TF(0, -10, lerp(2, 1, eo((t - ts) / .15)) * (a > 0 ? 1 : 0), `<g transform="rotate(-12)"><rect x="${n2(-tw(txt, 54, 700) / 2 - 34)}" y="-50" width="${n2(tw(txt, 54, 700) + 68)}" height="100" rx="18" fill="${good ? P.leaf : "#E5484D"}" stroke="#fff" stroke-width="8"/>${T(0, 18, txt, 54, "#fff")}</g>`); }
  if (o.dim) s += `<rect x="-232" y="-252" width="464" height="504" rx="34" fill="#2B2147" opacity="${n2(o.dim * .45)}"/>`;
  return TF(0, 0, k, s); }

/* ================================================================ the places (baked) ================================================================ */
const window27 = (x, y, w, h, lit) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${lit ? "#9FD3F0" : "#7DB3D6"}" stroke="#C9BFAE" stroke-width="4"/><path d="M${x + w / 2} ${y} v${h}" stroke="#C9BFAE" stroke-width="3"/>`;
const hdbBlock27 = (x, y, w, h, c = "#F3E6CF", acc = "#E58A6B") => { let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/><rect x="${x}" y="${y}" width="${w}" height="16" fill="${acc}"/>`;
  for (let r = 0; r < Math.floor((h - 40) / 46); r++) for (let c2 = 0; c2 < Math.floor(w / 58); c2++) s += window27(x + 14 + c2 * 58, y + 34 + r * 46, 36, 26, (r + c2) % 3 === 0);
  return s; };
const tree27 = (x, y, s = 1, ph = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0 C-10 -80 -20 -150 -6 -230 L10 -230 C18 -150 10 -80 16 0z" fill="#8A5A3B"/><path d="M0 -180 L-70 -250 M4 -200 L70 -270" stroke="#8A5A3B" stroke-width="14" stroke-linecap="round"/>
  ${[[-80, -270, 90], [70, -290, 95], [0, -330, 110], [-40, -230, 70], [50, -230, 70]].map(([cx, cy, r], i) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${["#6CBF52", "#4E9E44", "#7FCB5B", "#5DAF4D", "#6CBF52"][i]}"/>`).join("")}</g>`;
// THE MAMA SHOP (world -192..2112 x -108..1188): the ground floor of an HDB block; the shop under it at the left two thirds; the open, sunny
// side at the right (a path, grass, a tree, a far block, the bright sky). The ice-cream chest freezer stands in front of the shop (live: its box).
BG.ms27 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#msSky)"/>`;
  s += hdbBlock27(1320, 40, 420, 760, "#F2E2C4", "#7BB0E0") + hdbBlock27(1760, 120, 380, 680, "#EAD9F0", "#E58A6B");
  s += `<rect x="1180" y="700" width="1000" height="120" fill="url(#msGrass)"/>` + tree27(1560, 760, 1.05) + tree27(2000, 760, .8);
  s += `<rect x="1180" y="800" width="1000" height="420" fill="url(#msPath)"/><path d="M1180 800 H2120" stroke="#D2B37A" stroke-width="6"/>`;
  // the block's ground floor: a ceiling slab and pillars; the shop inside
  s += `<rect x="-200" y="-120" width="1400" height="300" fill="#EFE7D8"/><rect x="-200" y="160" width="1400" height="40" fill="#D9CDB8"/>`;
  s += `<rect x="-200" y="200" width="1380" height="600" fill="url(#msShop)"/>`;
  s += `<rect x="20" y="210" width="1080" height="110" rx="10" fill="#D93A35" stroke="#9E2622" stroke-width="6"/>` + T(560, 290, "PROVISION SHOP", 76, "#FFE27A", { ls: 6 });
  // shelves of snacks and drinks
  for (let r = 0; r < 4; r++) { s += `<rect x="40" y="${360 + r * 100}" width="460" height="12" fill="#A57B52"/>`; for (let i = 0; i < 9; i++) s += `<rect x="${52 + i * 50}" y="${300 + r * 100}" width="40" height="60" rx="6" fill="${["#FF8FB1", "#FFC83A", "#43BF6C", "#3A8DFF", "#FF9838", "#9B6BFF"][(i + r * 2) % 6]}"/><rect x="${58 + i * 50}" y="${312 + r * 100}" width="28" height="12" rx="3" fill="#fff" opacity=".6"/>`; }
  s += `<rect x="560" y="320" width="230" height="420" rx="12" fill="#E8EEF2" stroke="#8C9BB0" stroke-width="6"/><rect x="578" y="340" width="194" height="380" rx="6" fill="#BFE6FF" opacity=".8"/>`;
  for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) s += `<rect x="${592 + i * 46}" y="${356 + r * 92}" width="24" height="70" rx="8" fill="${["#43BF6C", "#FF6F61", "#FFC83A", "#2EC4B6"][(i + r) % 4]}"/>`;
  s += `<rect x="840" y="520" width="300" height="220" rx="10" fill="#B88A5E" stroke="#8A5A2B" stroke-width="5"/><rect x="880" y="470" width="90" height="60" rx="8" fill="#5B6B80"/><rect x="890" y="478" width="70" height="26" fill="#9FE8C0"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${860 + i * 46} 340 v40" stroke="#666" stroke-width="3"/><rect x="${846 + i * 46}" y="380" width="30" height="50" rx="6" fill="${["#FFC83A", "#FF8FB1", "#43BF6C"][i % 3]}"/>`;
  // the floor: tiles under the block, the step down to the sunny path
  s += `<rect x="-200" y="740" width="1380" height="500" fill="url(#msFloor)"/>`; for (let i = 0; i < 12; i++) s += `<path d="M${-200 + i * 120} 740 L${-320 + i * 150} 1200" stroke="#C9BFAE" stroke-width="3" opacity=".6"/>`;
  s += `<path d="M-200 880 H1180 M-200 1040 H1180" stroke="#C9BFAE" stroke-width="3" opacity=".6"/>`;
  // the pillar (the thermometer hangs on it, live), the shade line
  s += `<rect x="1150" y="160" width="90" height="660" fill="#E9E0CF" stroke="#CFC3AD" stroke-width="5"/><rect x="1150" y="790" width="90" height="30" fill="#CFC3AD"/>`;
  s += `<path d="M1240 800 L2120 800 L2120 1200 L1180 1200z" fill="url(#msHot)" opacity=".5"/>`;
  // the ice-cream chest freezer (white, a glass sliding top, a cone sticker)
  s += `<g transform="translate(690 640)"><rect x="0" y="0" width="420" height="230" rx="18" fill="url(#msChest)" stroke="#8C9BB0" stroke-width="6"/><rect x="14" y="-26" width="392" height="40" rx="10" fill="url(#msGlass)" stroke="#8C9BB0" stroke-width="5"/>
    <rect x="110" y="60" width="200" height="110" rx="16" fill="#3A8DFF"/>${T(210, 104, "ICE", 40, "#fff")}${T(210, 150, "CREAM", 40, "#fff")}<path d="M40 70 l20 70 l20 -70z" fill="#E0A458"/><circle cx="60" cy="60" r="22" fill="#FF9EB5"/>
    <rect x="20" y="230" width="40" height="14" fill="#5B6B80"/><rect x="360" y="230" width="40" height="14" fill="#5B6B80"/></g>`;
  return s; };
// THE SUNNY PATH from the shop to the void deck: wide open sky, the sun high at the right, far blocks, a long pale path along the frame,
// grass, a few young trees too small for shade (the VOID DECK signpost is drawn live: signpost27, only in the fix scenes, where no key-word chip is up yet)
BG.path27 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#msSky)"/>`;
  s += hdbBlock27(-120, 150, 380, 520, "#EAD9F0", "#E58A6B") + hdbBlock27(360, 230, 300, 440, "#F2E2C4", "#7BB0E0") + hdbBlock27(1380, 200, 340, 470, "#DCEBD9", "#43BF6C") + hdbBlock27(1800, 260, 340, 410, "#F2E2C4", "#E58A6B");
  s += `<rect x="-200" y="640" width="2320" height="120" fill="url(#msGrass)"/>` + [-40, 700, 1260, 1900].map((x, i) => tree27(x, 690, .55 + .08 * (i % 2))).join("");
  s += `<rect x="-200" y="740" width="2320" height="460" fill="url(#msPath)"/><path d="M-200 744 H2120" stroke="#D2B37A" stroke-width="8"/><path d="M-200 1130 H2120" stroke="#D2B37A" stroke-width="5" opacity=".6"/>`;
  for (let i = 0; i < 16; i++) s += `<path d="M${-180 + i * 150} 900 h80" stroke="#E7D3A6" stroke-width="5" opacity=".8"/>`;
  return s; };
// THE COVERED WALKWAY: a long roof on posts (cool shade underneath), the sunny grass and blocks beyond; a drain along the near edge with a
// steel grating at the middle (drawn live for the close-up)
BG.walk27 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="url(#msSky)"/>`;
  s += hdbBlock27(-100, 220, 420, 460, "#F2E2C4", "#7BB0E0") + hdbBlock27(1500, 200, 420, 480, "#EAD9F0", "#E58A6B") + tree27(700, 690, .7) + tree27(1200, 700, .6);
  s += `<rect x="-200" y="640" width="2320" height="140" fill="url(#msGrass)"/>`;
  s += `<rect x="-200" y="760" width="2320" height="440" fill="#D8D1C3"/><rect x="-200" y="760" width="2320" height="440" fill="url(#msShade)"/>`;
  for (let i = 0; i < 14; i++) s += `<path d="M${-200 + i * 180} 760 L${-260 + i * 200} 1200" stroke="#BDB4A3" stroke-width="3" opacity=".7"/>`;
  s += `<rect x="-200" y="1060" width="2320" height="30" fill="#8C8577"/><rect x="-200" y="1090" width="2320" height="110" fill="#5E584F"/>`;
  s += `<rect x="-200" y="-120" width="2320" height="190" fill="url(#wlRoof)"/><rect x="-200" y="60" width="2320" height="26" fill="#55606F"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${-120 + i * 420}" y="80" width="34" height="690" fill="#9AA6B6" stroke="#6D788C" stroke-width="4"/>`;
  return s; };
// THE VOID DECK, set up for the party: pillars, the ceiling with its lights, the letterboxes, a long table with a white cloth, bunting
// (BYE BYE P3! HELLO P4!), balloons tied to the pillars (live: they bob), the standing fan (live)
BG.vd27 = () => { let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="#EFE7D8"/>`;
  s += `<rect x="-200" y="-120" width="2320" height="170" fill="#E3D9C6"/>` + [0, 1, 2, 3].map((i) => `<rect x="${60 + i * 520}" y="20" width="220" height="16" rx="8" fill="#fff"/>`).join("");
  s += `<rect x="540" y="160" width="900" height="520" fill="#BFE6FF"/>` + hdbBlock27(600, 260, 300, 420, "#F2E2C4", "#7BB0E0") + hdbBlock27(1040, 220, 340, 460, "#EAD9F0", "#E58A6B") + `<rect x="540" y="600" width="900" height="80" fill="url(#msGrass)"/>`;
  s += `<rect x="-200" y="50" width="740" height="680" fill="#F3ECDF"/><rect x="1440" y="50" width="700" height="680" fill="#F3ECDF"/>`;
  s += `<g transform="translate(40 300)"><rect x="0" y="0" width="300" height="230" rx="8" fill="#9AA6B6" stroke="#6D788C" stroke-width="5"/>${[...Array(20)].map((_, i) => `<rect x="${14 + (i % 5) * 56}" y="${14 + Math.floor(i / 5) * 52}" width="46" height="40" rx="4" fill="#C9D3DE"/>`).join("")}</g>`;
  s += [470, 1440].map((x) => `<rect x="${x}" y="50" width="100" height="700" fill="#E9E0CF" stroke="#CFC3AD" stroke-width="5"/>`).join("");
  s += `<rect x="-200" y="730" width="2320" height="470" fill="url(#msFloor)"/>`; for (let i = 0; i < 12; i++) s += `<path d="M${-200 + i * 200} 730 L${-300 + i * 230} 1200" stroke="#C9BFAE" stroke-width="3" opacity=".6"/>`;
  return s; };

/* ================================================================ live set dressing ================================================================ */
// the bunting across the void deck (flags in a dip, letters on them)
function bunting27(t) { const L = "BYE BYE P3!  HELLO P4!", n = L.length; let s = `<path d="M60 120 Q960 260 1860 120" fill="none" stroke="#8A5A2B" stroke-width="4"/>`;
  for (let i = 0; i < n; i++) { const u = (i + .5) / n, x = lerp(60, 1860, u), y = 120 + 4 * 140 * u * (1 - u) * .95 + 2 * Math.sin(t * 2 + i), ch = L[i]; if (ch === " ") continue;
    const col = ["#FF6F61", "#FFC83A", "#43BF6C", "#3A8DFF", "#9B6BFF", "#FF8FB1"][i % 6];
    s += `<g transform="translate(${n2(x)} ${n2(y)}) rotate(${n2(3 * Math.sin(t * 1.6 + i))})"><path d="M-36 0 H36 L0 84z" fill="${col}" stroke="#fff" stroke-width="3"/>${T(0, 44, ch, 40, "#fff")}</g>`; }
  return s; }
const balloon27 = (t, x, y, col, ph = 0) => { const dx = 8 * Math.sin(t * 1.3 + ph), dy = 6 * Math.sin(t * 1.7 + ph); return `<path d="M${x} ${y + 200} Q${n2(x + dx * .5 + 10)} ${y + 120} ${n2(x + dx)} ${n2(y + dy + 60)}" stroke="#666" stroke-width="2" fill="none"/><ellipse cx="${n2(x + dx)}" cy="${n2(y + dy)}" rx="46" ry="58" fill="${col}"/><ellipse cx="${n2(x + dx - 14)}" cy="${n2(y + dy - 20)}" rx="10" ry="16" fill="#fff" opacity=".45"/><path d="M${n2(x + dx - 6)} ${n2(y + dy + 58)} l6 10 l6 -10z" fill="${col}"/>`; };
// the party table (a long table with a white cloth, paper plates and cups), origin = its top middle; w wide
const table27 = (w = 900) => `<rect x="${-w / 2}" y="0" width="${w}" height="40" fill="url(#vdCloth)" stroke="#C9D6E6" stroke-width="4"/><path d="M${-w / 2} 40 h${w} v120 h${-w}z" fill="#F4F8FF" stroke="#C9D6E6" stroke-width="4"/>${[...Array(9)].map((_, i) => `<path d="M${n2(-w / 2 + 20 + i * (w - 40) / 8)} 40 v120" stroke="#DCE6F2" stroke-width="3"/>`).join("")}
  ${[-1, -.6, .6, 1].map((f, i) => `<ellipse cx="${n2(f * w * .4)}" cy="0" rx="46" ry="10" fill="#fff" stroke="#C9D6E6" stroke-width="3"/><rect x="${n2(f * w * .4 + 50)}" y="-40" width="26" height="40" rx="4" fill="${["#FF8FB1", "#FFC83A", "#43BF6C", "#3A8DFF"][i]}"/>`).join("")}`;

/* ================================================================ the journey: inside the wool ================================================================ */
// the micro-world: big curly wool fibres (purple and cream ropes) across the frame; the pocket of trapped air (YOU) in the middle; the hot
// side at the left (an orange glow, "HOT AIR 33 °C"), the frozen box at the right (icy blue, "FROZEN BOX −18 °C"); heat arrows travel from
// the hot side to the cold side ONLY, slowly, thinning inside the wool (they never turn into anything else). zoom = camera, t, marks
function woolWorld27(t, o = {}) { const tt = t * .4; let s = `<rect x="-200" y="-120" width="2320" height="1320" fill="#2C2350"/>`;
  s += `<rect x="-200" y="-120" width="700" height="1320" fill="url(#hotGlow)" opacity="${n2(o.hot || 0)}"/><rect x="1420" y="-120" width="700" height="1320" fill="url(#coldGlow)" opacity="${n2(o.cold || 0)}"/>`;
  // fibres: thick wavy ropes, two depths (far ones blurred)
  const fib = (y0, amp, ph, w, col, col2, blur) => { let d = `M-260 ${y0}`; for (let x = -260; x <= 2180; x += 60) d += ` L${x} ${n2(y0 + amp * Math.sin(x / 170 + ph + tt * .3))}`;
    return `<g ${blur ? 'filter="url(#b4)" opacity=".6"' : ""}><path d="${d}" fill="none" stroke="${col2}" stroke-width="${w + 10}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${n2(w * .18)}" stroke-dasharray="18 30" opacity=".35" stroke-linecap="round"/></g>`; };
  s += fib(120, 70, 0, 70, "#9B7BF0", "#6A4BD0", 1) + fib(980, 80, 1.7, 70, "#EBDDC2", "#C9B48F", 1) + fib(250, 90, 2.2, 110, "url(#woolA)", "#5B3FB8") + fib(820, 100, .6, 120, "url(#woolB)", "#BFA57D")
    + fib(560, 60, 4.1, 46, "#B79CFF", "#7C5CE0", 1);
  return s; }
// the viewer's pocket of trapped air (YOU): a soft round bubble of air with a gentle glow, two eyes peeking (the viewer's presence), origin =
// its middle
const airYou27 = (t, r = 150) => { const b = 1 + .03 * Math.sin(t * 2); return `<g transform="scale(${n2(b)})"><circle r="${r}" fill="url(#airPocket)" stroke="#fff" stroke-width="5" stroke-dasharray="10 14" opacity=".9"/>${[[-.3, -.15], [.3, -.15]].map(([x, y]) => `<ellipse cx="${n2(x * r)}" cy="${n2(y * r)}" rx="${n2(r * .08)}" ry="${n2(r * .11)}" fill="#2B2147"/><circle cx="${n2(x * r - 4)}" cy="${n2(y * r - 6)}" r="${n2(r * .03)}" fill="#fff"/>`).join("")}<path d="M${n2(-r * .15)} ${n2(r * .12)} q${n2(r * .15)} ${n2(r * .12)} ${n2(r * .3)} 0" stroke="#2B2147" stroke-width="5" fill="none" stroke-linecap="round"/></g>`; };
// the hot side's heat arrows: a stream of orange arrows that travel right; in the wool (x > xw) they slow down (k) and thin; FACES: right
// (an arrow points the way it travels)
function heatStream27(t, t0, y, xw, xEnd, o = {}) { if (t < t0) return ""; let s = ""; const n = o.n || 5;
  for (let i = 0; i < n; i++) { const age = t - t0 - i * .9; if (age < 0) continue; const fast = 520, slow = o.slow || 60;   // px/s outside, px/s inside the wool
    const tw_ = (xw - (-120)) / fast; let x = age < tw_ ? -120 + fast * age : xw + slow * (age - tw_); if (x > xEnd) x = xEnd - ((x - xEnd) % 40);
    const inside = x > xw, w = inside ? 16 : 24, a = clamp(age / .3) * (inside ? 1 - .5 * clamp((x - xw) / (xEnd - xw)) : 1), yy = y + (i % 3 - 1) * 70 + 10 * Math.sin(t * 1.5 + i);
    s += OP(a, fatArrow(x - 110, yy, x, yy, "#FF6A2E", w)); }
  return s; }

// the VOID DECK signpost on the sunny path (an arrow pointing right, the way to the party); drawn live in the fix scenes only (run, fan,
// replay), so it never shares the top right with the key-word chips (coordinator, 25 Nov)
const signpost27 = (x = 1720, y = 760) => `<g transform="translate(${x} ${y})"><rect x="-8" y="-260" width="16" height="260" fill="#8C9BB0"/><g filter="url(#dropS)"><rect x="-150" y="-300" width="300" height="84" rx="16" fill="#2E7D5B"/></g>${T(-20, -244, "VOID DECK", 38, "#fff")}<path d="M100 -274 l30 16 l-30 16z" fill="#fff"/></g>`;
