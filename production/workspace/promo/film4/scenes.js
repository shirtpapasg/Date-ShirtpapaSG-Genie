// scenes.js: promo film 4, "The Grey Platform". Each scene is SC[name](t, s) -> SVG. Times come from tl.js (lines, marks).
const SC = window.SC = {};
const sc = (n) => SCN[n];
const B = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, { tag: false, ...o });   // the caption carries the name (no tag under the buddy)
// the crowd of other pupils on the platform: [avatar, x, y, h, phase]
const CROWD = [["a", 1180, 860, 250, 0], ["d", 1330, 840, 236, 1.3], ["c", 1480, 862, 250, 2.1], ["b", 1640, 845, 240, .7], ["e", 1800, 860, 248, 2.9], ["f", 1960, 842, 238, 1.8]];
const idle = (t, ph, a = 1) => ({ rot: a * 1.6 * Math.sin(t * 1.7 + ph), sy: 1 + .012 * a * Math.sin(t * 3.4 + ph) });

/* 1 the Station at night: the camera eases out from the dome; the train glides in on the viaduct */
SC.station = (t, s) => {
  const u = (t - s.t0) / 6.7, z = lerp(1.28, 1.0, eio(clamp(u / .75)));
  const ti = MK("trainIn"), tsp = MK("trainStop"), tx = t < ti ? -300 : lerp(-300, 1640, eo((t - ti) / (tsp - ti)));
  let w = station(t, { trainX: tx, screen: "dress" });
  // the three buddies and a few pupils' characters on the grass in front of the dome
  w += avFront("a", 560, 905, 150, idle(t, 0)) + avFront("b", 690, 900, 144, idle(t, .6)) + avFront("d", 1440, 900, 146, idle(t, 1.2)) + avFront("e", 1570, 908, 150, idle(t, 2.4));
  w += B("pip", 1110, 918, 118, t) + B("momo", 1220, 920, 118, t) + B("basil", 1330, 918, 118, t);
  return CAM(w, z, 960, 560) + fadeIn(t, s.t0, .5);
};
const fadeIn = (t, t0, d = .4) => t < t0 + d ? `<rect width="1920" height="1080" fill="#05030F" opacity="${n2(1 - clamp((t - t0) / d))}"/>` : "";
const fadeOut = (t, t1, d = .4) => t > t1 - d ? `<rect width="1920" height="1080" fill="#05030F" opacity="${n2(clamp((t - (t1 - d)) / d))}"/>` : "";
const flash = (t, t0, d = .35) => t >= t0 && t < t0 + d ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.85 * (1 - (t - t0) / d))}"/>` : "";

/* the platform: a carriage at the left with its door, the platform floor, the pupils, the Gift Shop at the far end (world x up to 2700) */
function platform(t, o = {}) { const d = o.door || 0; let s = sky(t, 0);
  s += moon(1500, 130, 46) + beams(t, .7);
  // the dome far behind, soft
  s += `<g opacity=".55" filter="url(#b6)"><path d="M700 620 A420 420 0 0 1 1540 620z" fill="url(#dome)"/><path d="M700 620 A420 420 0 0 1 1540 620" fill="none" stroke="url(#domeRim)" stroke-width="10"/></g>`;
  s += block(1700, 380, 110, 300, 1, 13) + block(1850, 430, 90, 260, 1, 17) + block(2300, 400, 120, 300, 1, 19) + block(-60, 420, 120, 280, 1, 23);
  // the canopy: beams and a row of warm lights
  s += `<rect x="-300" y="0" width="3200" height="70" fill="#15123A"/><rect x="-300" y="64" width="3200" height="10" fill="#2E2A70"/>`;
  for (let i = 0; i < 16; i++) { const x = -200 + i * 190; s += `<path d="M${x} 74 L${x} 110" stroke="#2E2A70" stroke-width="4"/><circle cx="${x}" cy="118" r="11" fill="#FFE7A6"/><circle cx="${x}" cy="118" r="40" fill="url(#glowY)" opacity=".5"/>`; }
  // the floor and its yellow line
  s += `<rect x="-300" y="690" width="3200" height="500" fill="url(#tileG)"/><rect x="-300" y="712" width="3200" height="14" fill="#E9C23A"/>`;
  for (let i = 0; i < 30; i++) s += `<path d="M${-300 + i * 110} 726 L${-420 + i * 150} 1100" stroke="#3A3A7A" stroke-width="2" opacity=".5"/>`;
  // the carriage (big, the films' white and pink), its door at x 420..620
  s += `<g filter="url(#dropS)"><rect x="-260" y="250" width="1000" height="450" rx="40" fill="url(#carG)"/></g><rect x="-260" y="600" width="1000" height="22" fill="${C.pink}"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="${-200 + i * 190}" y="320" width="140" height="150" rx="18" fill="#FFE7A6"/><rect x="${-200 + i * 190}" y="320" width="140" height="40" rx="12" fill="#fff" opacity=".35"/>`;
  s += `<rect x="410" y="290" width="220" height="400" rx="14" fill="#FFE7A6"/>`;   // the lit inside, seen when the door opens
  s += `<rect x="${n2(410 - 108 * d)}" y="290" width="110" height="400" rx="10" fill="#E4E0F2" stroke="#BEB8D8" stroke-width="4"/><rect x="${n2(520 + 108 * d)}" y="290" width="110" height="400" rx="10" fill="#E4E0F2" stroke="#BEB8D8" stroke-width="4"/>`;
  s += `<rect x="${n2(430 - 108 * d)}" y="330" width="70" height="120" rx="10" fill="#FFE7A6" opacity=".9"/><rect x="${n2(540 + 108 * d)}" y="330" width="70" height="120" rx="10" fill="#FFE7A6" opacity=".9"/>`;
  // the Gift Shop at the end of the platform
  s += giftShop(2080, 230, 560, 480, o.shop || 0, t);
  return s; }

/* 2 the mystery: the doors open; a grey character steps out; the pupils and buddies stare; Basil points out the dark Gift Shop */
SC.mystery = (t, s) => {
  const td = MK("doors"), ts = MK("stepOut"), d = eio((t - td) / .6), tl = W("b01", "look"), pan = 760 * eio((t - tl) / 1.3) * (1 - eio((t - LT("h02") - .9) / 1.1) * .45);
  let w = platform(t, { door: d, shop: 0 }) + tourPoster(1090, 712, t);
  // the crowd turn to look (they lean towards the door)
  for (const [n, x, y, h, ph] of CROWD) w += avFront(n, x, y, h, { ...idle(t, ph, .6), rot: -3 + idle(t, ph, .6).rot });
  // the grey character: walks out of the door (side view, facing right), then turns to us, a little slumped
  const wk = clamp((t - ts) / 1.3);
  if (t >= ts - .2) { if (wk < 1) w += avSide("you0", lerp(520, 780, wk), lerp(700, 850, eo(wk)), 300, (t - ts) * 9, { flip: true }).replace("<g transform", `<g filter="url(#sat0)" transform`);
    else w += avFront("you0", 780, 850, 300, { sat: 0, rot: -2 + .8 * Math.sin(t * 1.2), sy: 1 - .02 * Math.sin(t * 1.2) }) + sigh(t, ts + 1.6, 830, 570); }
  // the buddies: Momo and Pip by the door, Basil further along (he points at the shop)
  w += B("momo", 1010, 912, 222, t, { poses: [[LT("m01"), "surprised"]] }) + B("pip", 1250, 918, 214, t, { poses: [[LE("p01") + .2, "thinking"]], look: -7 * ss(LT("p01") - .15, LT("p01") + .2, t) * (1 - ss(LE("p01"), LE("p01") + .4, t)) });   // p01, an aside: Pip leans in towards the grey character
  w += B("basil", 1640, 918, 224, t, { poses: [[W("b01", "look"), "pointing"]], flip: false });
  return `<filter id="sat0"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope=".82"/><feFuncG type="linear" slope=".82"/><feFuncB type="linear" slope=".9"/></feComponentTransfer></filter>` +
    `<g transform="translate(${n2(-pan)} 0)">${w}</g>` + (t < td + .3 ? flash(t, s.t0, .25) : "");
};
// the easter egg (teacher, 24 Nov 2026): a small poster on the platform, the app's welcome gift (tour2.js GIFT = 100, once, when a new
// pupil finishes the tour). Always there in the background; while Pip says "100 free credits" its rim glows a little.
function tourPoster(x, yf, t) { const g = ss(W("p01", "100") - .1, W("p01", "100") + .3, t) * (1 - ss(LE("p01") + .3, LE("p01") + 1, t));
  return `<rect x="${x - 3}" y="${yf - 130}" width="6" height="130" fill="#2E2A70"/>` + TF(x, yf - 180, .72, `<rect x="-86" y="-74" width="172" height="148" rx="16" fill="#0C1638" stroke="${C.cyan}" stroke-width="${n2(4 + 3 * g)}" stroke-opacity="${n2(.55 + .45 * g)}"${g > .02 ? ` filter="url(#neon)"` : ""}/>` +
    TX(0, -40, "Finish the tour", 22, "#DDEBFF") + TX(0, 22, "+100", 56, C.gold) + TX(0, 54, "credits", 24, "#fff")); }
// a small grey sigh cloud
function sigh(t, t0, x, y) { const u = (t - t0) % 3.2; if (t < t0 || u > 1.4) return ""; const e = u / 1.4;
  return OP(Math.sin(Math.PI * e) * .8, `<g transform="translate(${n2(x + 40 * e)} ${n2(y - 60 * e)}) scale(${n2(.6 + .5 * e)})"><circle r="22" fill="#C9C3E0"/><circle cx="20" cy="6" r="16" fill="#C9C3E0"/><circle cx="-18" cy="8" r="14" fill="#C9C3E0"/></g>`); }

/* 3 the quiz: film 1's TAP TO BEGIN, with the three cards */
SC.quiz = (t, s) => {
  const tc = MK("cards"), tp = MK("tap"), pk = MK("pick"), tk = MK("tick"), tco = MK("coins"), th = LT("h03");
  let w = `<g filter="url(#b18)" opacity=".55">${platform(t, { door: 1 })}</g><rect width="1920" height="1080" fill="#170F3E" opacity=".72"/>`;
  // drifting question words (the films' "Why...?" "How...?")
  ["Why...?", "How...?", "What if...?", "Which...?", "Why not...?"].forEach((q, i) => { const x = (hash(i, 31) * 1600 + 160 + t * (8 + i * 3)) % 1900, y = 140 + hash(i, 32) * 700; w += TX(x, y, q, 64 + 20 * hash(i, 33), "#8C7BD8", { op: .16 }); });
  // the question
  const qa = ramp(t, W("p02", "which") - .1, .3); w += OP(qa, TF(960, 120, .9 + .1 * qa, `<rect x="-470" y="-46" width="940" height="92" rx="46" fill="#0C1638" stroke="${C.cyan}" stroke-width="4" filter="url(#neon)"/>${TX(0, 17, "Which one will a magnet attract?", 50, "#fff")}`));
  // the three cards
  const K = [["duck", "rubber duck", 540], ["nail", "iron nail", 960], ["marble", "glass marble", 1380]];
  K.forEach(([k, lab, x], i) => { const t0 = tc + i * .18; if (t < t0) return; const right = k === "nail", lit = right && t >= pk ? 1 : 0, dim = !right && t >= pk ? ramp(t, pk, .3) : 0;
    let lift = 0; if (right && t > tk) lift = -36 * eo((t - tk) / .5);
    w += card(x, 380 + lift * 0, k, lab, { k: spring(t, t0, .5), lit, dim, tick: right && t >= tk ? t - tk : 0, cross: 0 }); });
  // the magnet swoops over the iron nail and pulls it
  if (t >= tk - .3) { const u = eo((t - tk + .3) / .45); w += OP(clamp(u * 2), TF(960, lerp(-60, 190, u), .62, itemIcon("magnet"))) + (t >= tk ? sparks(t, tk, 960, 300) : ""); }
  // the logo and TAP TO BEGIN, then the fact
  const ta = ramp(t, tp - .2, .35) * (1 - ramp(t, pk + .6, .3));
  w += OP(ta, logo(960, 660, 74, t)) + tapToBegin(960, 800, t, ta, t >= pk && t < pk + .25 ? 1 : 0);
  w += tapFX(t, pk, 960, 410);
  if (t >= th - .1) { const k = spring(t, th - .1, .5) * (1 - ramp(t, tco - .1, .3)); if (k > .02) w += TF(960, 660, k, `<rect x="-560" y="-50" width="1120" height="100" rx="50" fill="#2FA85A" filter="url(#dropS)"/>${TX(0, 18, "A magnet attracts things made of iron.", 48, "#fff")}`); }
  // + 10 credits: the coins fly to the till
  if (t >= tco - .1) { const k = spring(t, tco - .1, .5); w += TF(960, 650, k, `<rect x="-250" y="-62" width="500" height="124" rx="62" fill="url(#goldG)" filter="url(#dropS)"/>${coinIc(-170, 0, 40)}${TX(40, 24, "+10 credits", 60, "#3A2400")}`) + coinFly(t, tco + .3, 960, 650, 1680, 90, 10, .9); }
  const n = t < tco + 1.0 ? 0 : 10; w += OP(ramp(t, tco - .3, .3), till(1680, 90, n, 1, pulse(t, tco + 1.0, .02, .3)));
  // the buddies: Pip big at the left, Momo and Basil at the right (as film 1's TAP TO BEGIN)
  w += B("pip", 250, 1090, 430, t, { poses: [[s.t0, "waving"], [pk + .2, "cheer"]], achieved: true, flip: false });
  w += B("momo", 1560, 1060, 330, t, { poses: [[pk + .25, "cheer"]], achieved: true, flip: true }) + B("basil", 1790, 1070, 330, t, { poses: [[s.t0 + .1, "pointing"], [pk + .3, "cheer"]], achieved: true, flip: true });
  return w + fadeIn(t, s.t0, .3);
};
function sparks(t, t0, x, y, col = "#FFE27A") { let s = ""; const u = (t - t0) / .7; if (u < 0 || u > 1) return "";
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + .2, r = 40 + 150 * eo(u); s += `<g transform="translate(${n2(x + Math.cos(a) * r)} ${n2(y + Math.sin(a) * r * .8)}) scale(${n2(.8 * (1 - u))})"><path d="M0-22 Q3-3 22 0 Q3 3 0 22 Q-3 3 -22 0 Q-3-3 0-22z" fill="${col}"/></g>`; }
  return s; }

/* 4 day by day: the Station turns from night to day and back, twice; the till fills to 50 */
SC.days = (t, s) => {
  const D = s.t1 - s.t0, u = clamp((t - s.t0) / D), day = Math.max(0, Math.sin(Math.PI * 2 * u * 1.0 - .2)) ** .6, dayN = u < .5 ? 1 : 2;
  let w = station(t, { day, sunU: (u * 2) % 1, trainX: 1640 + ((t - s.t0) * 900) % 2600, screen: "shop" });
  w += avFront("you0", 700, 905, 170, { sat: 0 }) + B("pip", 1110, 918, 118, t) + B("momo", 1220, 920, 118, t) + B("basil", 1330, 918, 118, t);
  // the till and what earned it (the app's rules: a quiz finished 10, an experiment finished 10; up to 30 a day)
  const EV = [[.12, "+10 an experiment"], [.3, "+10 a quiz"], [.58, "+10 an experiment"], [.78, "+10 a quiz"]]; let n = 10, last = -9;
  EV.forEach(([e, txt], i) => { const te = s.t0 + e * D; if (t >= te + .5) { n += 10; last = te + .5; } if (t >= te) { const k = spring(t, te, .4) * (1 - ramp(t, te + .9, .25)); if (k > .02) w += TF(960 + (i % 2 ? 330 : -330), 300, k, tpill(0, 0, txt, 40, "#2FA85A", "#fff", { w: 700 })) + coinFly(t, te + .05, 960 + (i % 2 ? 330 : -330), 300, 960, 180, 5, .45); } });
  w += till(960, 180, n, 1.35, pulse(t, last, .02, .3));
  w += TF(170, 110, 1, tpill(0, 0, `Day ${dayN}`, 44, day > .5 ? "#FFB14A" : "#3B2A8C", "#fff", { w: 700 }));
  return w;
};

/* 5 the Gift Shop: the shop lights up; then the REAL Gift Shop screen: trying on the safety goggles, buying them for 50 credits */
SC.shop = (t, s) => {
  const ton = MK("shopOn"), lit = ss(ton + .1, ton + .7, t) * (t < ton + .35 ? (Math.sin(t * 60) > 0 ? 1 : .3) : 1), tb = MK("buy"), tbo = MK("bought");
  let w = sky(t, 0) + beams(t, .6) + `<rect x="0" y="760" width="1920" height="320" fill="url(#tileG)"/><rect x="0" y="780" width="1920" height="12" fill="#E9C23A"/>`;
  w += giftShop(560, 250, 800, 520, lit, t);
  w += avFront("you0", 470, 900, 300, { sat: 0, rot: 2 * Math.sin(t * 1.3) });
  // the real screen slides up over it
  const tu = s.t0 + 1.05, k = eo((t - tu) / .45);   // the screen rises at 1.05 s
  if (t >= tu) { const shot = t < tb ? "shop" : "shop2", y = lerp(1500, 440, k);
    const tp = t >= tb - .35 ? tapFX(t, tbo - .45, 0, 0) : "";
    w += tablet(1000, y, 1120, shot, { label: "In the app · The Gift Shop", zoom: shot === "shop" ? lerp(1, 1.12, clamp((t - tu) / 3)) : 1.18, zx: shot === "shop" ? 900 : 960, zy: shot === "shop" ? 470 : 560, inner: (t >= tbo - .8 ? `<g transform="translate(960 733)">${tapFX(t, tbo - .45, 0, 0, "#FFD23F")}</g>` : "") }); }
  if (t >= tbo) { const k2 = spring(t, tbo, .45); w += TF(1000, 440, k2 * 1.2, `<g transform="rotate(-8)"><rect x="-210" y="-62" width="420" height="124" rx="22" fill="#2FA85A" stroke="#fff" stroke-width="8"/>${TX(0, 26, "BOUGHT!", 76, "#fff", { ls: 4 })}</g>`); }
  // the till: 50, then 0 when bought (coins fly into the shop)
  w += till(1680, 80, t < tbo ? 50 : 0, 1, pulse(t, tbo, .02, .3)) + (t >= tbo - .1 ? coinFly(t, tbo - .1, 1680, 80, 1000, 440, 8, .55) : "");
  w += B("pip", 170, 1090, 330, t, { poses: [[ton + .3, "cheer"]], achieved: true }) + B("momo", 1800, 1080, 300, t, { poses: [[ton + .5, "surprised"], [tbo, "cheer"]], achieved: true, flip: true, tag: false });
  return w + flash(t, s.t0, .2);
};

/* 6 the Dressing Room (the app's: the lit mirror, the turntable, the try-on card): the colours are free, the goggles are now owned */
function dressRoom(t) { let s = `<rect width="1920" height="1080" fill="#271F33"/>`;
  for (let i = 0; i < 30; i++) s += `<rect x="${i * 68 + 34}" y="0" width="34" height="1080" fill="#fff" opacity=".035"/>`;
  s += `<rect x="0" y="96" width="1920" height="14" fill="#7A4F30"/><rect x="0" y="110" width="1920" height="6" fill="#56351F"/>`;
  s += `<rect x="0" y="830" width="1920" height="250" fill="#3B2A22"/>`; for (let i = 0; i < 18; i++) s += `<rect x="${i * 118}" y="830" width="3" height="250" fill="#000" opacity=".3"/>`;
  s += `<rect x="0" y="826" width="1920" height="10" fill="#56351F"/>`;
  // the sign
  s += `<g transform="translate(40 26)"><rect width="430" height="78" rx="14" fill="#56351F" stroke="#B98A35" stroke-width="5"/>${TX(215, 52, "The Dressing Room", 40, "#FFF4DC")}</g>`;
  return s; }
function mirror(cx, top, w, h, t) { let s = `<path d="M${cx - w / 2} ${top + h} V${top + w / 2} A${w / 2} ${w / 2} 0 0 1 ${cx + w / 2} ${top + w / 2} V${top + h}z" fill="#B98A35" stroke="#7D5A1D" stroke-width="6"/>`;
  const iw = w - 60; s += `<path d="M${cx - iw / 2} ${top + h - 26} V${top + w / 2} A${iw / 2} ${iw / 2} 0 0 1 ${cx + iw / 2} ${top + w / 2} V${top + h - 26}z" fill="#1F2A45"/>`;
  s += `<path d="M${cx - 60} ${top + 60} L${cx + 40} ${top + 60} L${cx - 150} ${top + h - 30} L${cx - 250} ${top + h - 30}z" fill="#fff" opacity=".07"/><path d="M${cx + 70} ${top + 40} L${cx + 110} ${top + 40} L${cx - 60} ${top + h - 30} L${cx - 100} ${top + h - 30}z" fill="#fff" opacity=".05"/>`;
  // bulbs round the arch
  const R = w / 2 - 10; for (let i = 0; i <= 12; i++) { const a = Math.PI + i * Math.PI / 12, x = cx + Math.cos(a) * R, y = top + w / 2 + Math.sin(a) * R; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="30" fill="url(#glowY)" opacity=".8"/><circle cx="${n2(x)}" cy="${n2(y)}" r="13" fill="#FFE7A3"/>`; }
  for (let j = 1; j <= 4; j++) for (const sg of [-1, 1]) { const x = cx + sg * R, y = top + w / 2 + j * (h - w / 2 - 40) / 4; s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="30" fill="url(#glowY)" opacity=".8"/><circle cx="${n2(x)}" cy="${n2(y)}" r="13" fill="#FFE7A3"/>`; }
  return s; }
function turntable(cx, y, t, spin) { let s = `<ellipse cx="${cx}" cy="${y + 26}" rx="300" ry="56" fill="#000" opacity=".35"/><ellipse cx="${cx}" cy="${y + 12}" rx="280" ry="50" fill="#8A5532"/><ellipse cx="${cx}" cy="${y}" rx="280" ry="50" fill="url(#woodG)"/>`;
  for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2 + spin, x = cx + Math.cos(a) * 250; if (Math.sin(a) < 0) continue; s += `<path d="M${n2(x)} ${n2(y - 30 + 50 * Math.sin(a) * .6)} L${n2(cx + Math.cos(a) * 270)} ${n2(y + 30 * Math.sin(a))}" stroke="#F3D2A6" stroke-width="6" opacity=".45"/>`; }
  for (const sg of [-1, 1]) s += `<g transform="translate(${cx + sg * 370} ${y})"><circle r="46" fill="#2A2238" stroke="#4A3A60" stroke-width="5"/><path d="M${sg * 14} -16 A20 20 0 1 ${sg > 0 ? 1 : 0} ${sg * -14} 14" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M${sg * 14} -28 L${sg * 14} -12 L${sg * 28} -14z" fill="#fff"/></g>`;
  return s; }
SC.dress = (t, s) => {
  const tcol = W("b03", "colours"), tgog = W("b03", "goggles"), tyou = W("b03", "yours"), tspin = W("h05", "spin"), tgame = W("h05", "take");
  let w = dressRoom(t) + mirror(720, 150, 560, 660, t);
  // the turntable and the character on it: grey, then its colours, then the goggles; then it spins in the mirror
  const spinU = clamp((t - tspin) / 1.7), a = Math.PI * 2 * eio(spinU), ca = Math.cos(a), sa = Math.sin(a);
  w += turntable(720, 850, t, a);
  const sat = ss(tcol, tcol + .9, t), name = t >= tyou ? "you" : "you0", hop = t >= tgame ? hopK(t, tgame + .1) : 0;
  if (Math.abs(ca) > .42 || spinU <= 0 || spinU >= 1) w += avFront(name, 720, 850 - hop, 560, { sat, sx: spinU > 0 && spinU < 1 ? ca : 1, sy: 1 + .03 * pulse(t, tyou, .02, .3) });
  else w += avSide(name, 720, 850, 500, 0, { flip: sa < 0, amp: 0 });
  if (t >= tcol) w += sparks(t, tcol, 720, 560, "#FFB4E0") + sparks(t, tcol + .25, 720, 420, "#9FE7FF");
  if (t >= tyou) w += sparks(t, tyou, 720, 340, "#FFE27A") + sparks(t, tyou + .2, 720, 340, "#FFFFFF");
  // the chips: colours are free
  if (t >= tcol) { const k = spring(t, tcol, .4) * (1 - ramp(t, tyou + 1.2, .3)); if (k > .02) w += TF(720, 300, k, tpill(0, 0, "Colours: free", 40, "#3A8DFF", "#fff", { w: 700 })); }
  // the try-on card (On The Head): Safety Goggles, Uncommon · 50, locked (greyed) until owned
  const ck = spring(t, s.t0 + .2, .5), own = ss(tyou, tyou + .35, t), pls = pulse(t, tgog, .03, .4);
  w += TF(1460, 430, ck * (1 + .06 * pls), `<g filter="url(#drop)"><rect x="-260" y="-300" width="520" height="600" rx="34" fill="#1D1A2C" stroke="#3A3350" stroke-width="4"/></g>
    ${TX(-220, -236, "🎩 On The Head", 40, "#F3EEFC", { a: "start" })}<path d="M-220 -206 H220" stroke="#3A3350" stroke-width="3" stroke-dasharray="8 8"/>
    <rect x="-200" y="-180" width="400" height="300" rx="26" fill="#24203A" stroke="${own > .5 ? "#7BE08F" : "#4A4268"}" stroke-width="${own > .5 ? 8 : 4}"/>
    <g transform="translate(-150 -170) scale(1.5)"><g opacity="${n2(lerp(.35, 1, own))}" ${own < .99 ? 'filter="url(#sat0d)"' : ""}>${AVICON.goggles.replace(/^<svg class="av-icon" viewBox="([^"]+)" width="\d+" height="\d+"/, '<svg viewBox="$1" width="200" height="200"')}</g></g>
    ${TX(0, 166, "Safety Goggles", 44, "#fff")}
    <g transform="translate(0 236)">${own < .5 ? `<rect x="-150" y="-30" width="300" height="60" rx="30" fill="#EAF7EE"/><text x="0" y="12" font-family="Fredoka" font-weight="700" font-size="32" text-anchor="middle" fill="#1F6B3A">🔒 U Uncommon · 50</text>`
      : `<g transform="scale(${n2(spring(t, tyou + .1, .4))})"><rect x="-150" y="-32" width="300" height="64" rx="32" fill="#2FA85A"/>${TX(0, 13, "✓ Yours to keep", 36, "#fff")}</g>`}</g>`);
  w += `<filter id="sat0d"><feColorMatrix type="saturate" values="${n2(own)}"/></filter>`;
  w += B("basil", 1740, 1090, 300, t, { poses: [[tyou + .1, "cheer"]], achieved: true, flip: true });
  return w + flash(t, s.t0, .2);
};
const hopK = (t, t0) => hop(t, t0, .4, 40) + hop(t, t0 + .45, .35, 26);

/* 7 into every game: the REAL Boss Clash screen (the pupil's own character as "My Hero"); the character walks in proudly */
SC.games = (t, s) => {
  const u = t - s.t0; let w = `<rect width="1920" height="1080" fill="#14112E"/>` + sky(t, 0);
  const zoom = lerp(1, 1.18, eio(clamp(u / 3.2)));
  w += tablet(1150, 450, 1240, "boss2", { label: "In the app · Boss Clash", zoom, zx: 960, zy: 600 });
  if (u > 1.6) { const k = spring(t, s.t0 + 1.6, .45); w += TF(560, 770, k, `<g transform="rotate(-6)"><rect x="-170" y="-40" width="340" height="80" rx="40" fill="${C.gold}" filter="url(#dropS)"/>${TX(0, 15, "⭐ My Hero", 44, "#2B2147")}</g>`); }
  // the character struts in from the left, then turns to us
  const wk = clamp(u / 1.5);
  if (wk < 1) w += avSide("you", lerp(-160, 300, wk), 1000, 400, u * 9, { flip: true });
  else w += avFront("you", 300, 1000 - hopK(t, s.t0 + 1.55), 440, { rot: 2 * Math.sin(t * 2) });
  return w + flash(t, s.t0, .2);
};

/* 8 Versus at the Science Claw: the REAL Vs Pip screen, then the two halves (You against Pip), one question, one grab each */
function clawHalf(cx, t, side, o) { // side 0 = you (blue), 1 = Pip (purple). o: tx (claw x offset), drop (0..1), closed, took (item held)
  const col = side ? "#C04BE0" : "#2A8BFF", L = cx - 340, Wd = 680; let s = "";
  s += `<rect x="${L}" y="230" width="${Wd}" height="560" rx="26" fill="#0E1230" stroke="${col}" stroke-width="6" filter="url(#neon)"/><rect x="${L}" y="230" width="${Wd}" height="560" rx="26" fill="url(#glass)" opacity=".4"/>`;
  s += `<path d="M${L + 40} 260 L${L + 110} 260 L${L + 10} 770" stroke="#fff" stroke-width="12" opacity=".05"/><rect x="${L + 20}" y="700" width="${Wd - 40}" height="70" rx="16" fill="#1A1F4A"/>`;
  // the pile: the quiz's three things and two of the claw cabinet's own (a battery, an iron bolt)
  const P = [["battery", -250, .5], ["duck", -120, .7], ["nail", 30, .72], ["marble", 170, .62], ["bolt", 270, .5]];
  for (const [k, dx, sc_] of P) { if (o.took === k) continue; s += TF(cx + dx, 712, sc_, pileItem(k)); }
  // the claw on its rail
  const cxw = cx + o.tx, cy = 290 + 330 * o.drop; s += `<rect x="${L + 20}" y="258" width="${Wd - 40}" height="12" rx="6" fill="#9AA4C8"/><path d="M${n2(cxw)} 270 L${n2(cxw)} ${n2(cy)}" stroke="#C9CFE6" stroke-width="5"/>`;
  const open = o.closed ? 4 : 24; s += `<g transform="translate(${n2(cxw)} ${n2(cy)})">`;
  if (o.took) s += `<g transform="translate(0 112)">${TF(0, 0, .72, pileItem(o.took))}</g>`;
  s += `<rect x="-30" y="-8" width="60" height="30" rx="9" fill="#B8C0DA"/><path d="M-18 20 Q${-18 - open} 56 -10 92 M18 20 Q${18 + open} 56 10 92" fill="none" stroke="#B8C0DA" stroke-width="11" stroke-linecap="round"/></g>`;
  return s; }
function pileItem(k) { if (k === "battery") return `<rect x="-36" y="-70" width="72" height="140" rx="12" fill="#2B2147" stroke="#4A3F6B" stroke-width="4"/><rect x="-36" y="-70" width="72" height="50" rx="12" fill="${C.gold}"/><rect x="-14" y="-84" width="28" height="16" rx="4" fill="#9AA4B8"/>`;
  if (k === "bolt") return `<rect x="-14" y="-60" width="28" height="110" fill="#8A93A8"/><path d="M-40 -60 L40 -60 L30 -90 L-30 -90z" fill="#6E778C"/>` + [0, 1, 2, 3, 4].map((i) => `<path d="M-14 ${-50 + i * 20} L14 ${-40 + i * 20}" stroke="#5A6278" stroke-width="4"/>`).join("");
  return itemIcon(k); }
const badge = (ok) => ok ? `<circle r="58" fill="#2FA85A" stroke="#fff" stroke-width="8"/><path d="M-25 2 L-7 20 L27 -18" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`
  : `<circle r="58" fill="#E2475B" stroke="#fff" stroke-width="8"/><path d="M-21 -21 L21 21 M21 -21 L-21 21" stroke="#fff" stroke-width="13" stroke-linecap="round"/>`;
SC.versus = (t, s) => {
  const u = t - s.t0, tq = MK("question"), td = MK("drop"), tpg = MK("pipGrab"), tyg = MK("youGrab"), tw_ = MK("win"), th6 = LT("h06"), split = s.t0 + 2.4;
  let w = "";
  if (t < split + .3) { w += `<rect width="1920" height="1080" fill="#14112E"/>` + sky(t, 0); const k = eo((t - s.t0) / .4); w += tablet(900, 470, 1220, "claw", { label: "In the app · Science Claw · Vs Pip", s: lerp(.85, 1, k), zoom: lerp(1, 1.1, clamp(u / 2.4)) });
    w += B("pip", 1740, 1060, 300, t, { flip: true }); if (t < split) return w + flash(t, s.t0, .2); }
  const sp = eo((t - split) / .4); let v = `<rect x="0" y="0" width="960" height="1080" fill="url(#halfL)"/><rect x="960" y="0" width="960" height="1080" fill="url(#halfR)"/><rect x="0" y="0" width="1920" height="1080" fill="#0B0A22" opacity=".5"/><rect x="956" y="0" width="8" height="1080" fill="#fff" opacity=".25"/>`;
  // the claws move over their pick, drop, close, lift. You: the iron nail. Pip: the rubber duck
  const mv = (tg) => lerp(0, tg, eio(clamp((t - tq) / .8))), dropU = (tg) => t < td ? 0 : t < tg ? eio(clamp((t - td) / .7)) : 1 - .75 * eio(clamp((t - tg) / .5));
  v += clawHalf(480, t, 0, { tx: mv(30), drop: dropU(tyg), closed: t >= tyg - .05, took: t >= tyg ? "nail" : null });
  v += clawHalf(1440, t, 1, { tx: mv(-120), drop: dropU(tpg), closed: t >= tpg - .05, took: t >= tpg ? "duck" : null });
  // the names (YOU becomes YOU WIN!)
  if (t < tw_) v += `<g transform="translate(480 175)">${tpill(0, 0, "YOU", 46, "#2A8BFF", "#fff", { w: 700, ls: 4 })}</g>`;
  else v += TF(480, 175, spring(t, tw_, .5), `<g transform="rotate(-4)"><rect x="-230" y="-58" width="460" height="116" rx="58" fill="${C.gold}" stroke="#fff" stroke-width="7" filter="url(#drop)"/>${TX(0, 26, "YOU WIN!", 76, "#2B2147", { ls: 3 })}</g>`) + confetti(t, tw_);
  v += `<g transform="translate(1440 175)">${tpill(0, 0, "PIP", 46, "#B24BE0", "#fff", { w: 700, ls: 4 })}</g>`;
  // the question across both halves
  const qk = spring(t, tq, .45); if (qk > .02) v += TF(960, 78, qk, `<rect x="-480" y="-46" width="960" height="92" rx="46" fill="#0C1638" stroke="${C.gold}" stroke-width="5" filter="url(#neon)"/>${TX(0, 18, "Which one will a magnet attract?", 50, "#fff")}`);
  // the verdicts beside what each claw holds
  if (t >= tpg + .35) v += TF(1440 - 120 + 150, 470, spring(t, tpg + .35, .4), badge(false));
  if (t >= tyg + .35) v += TF(480 + 30 + 150, 470, spring(t, tyg + .35, .4), badge(true)) + sparks(t, tyg + .35, 510, 520);
  // you and Pip at the bottom of your halves
  v += avFront("you", 210, 1075, 340, { rot: t >= tw_ ? 4 * Math.sin(t * 6) : 1.5 * Math.sin(t * 1.6), sy: 1 + (t >= tw_ ? .02 * Math.sin(t * 12) : 0) });
  v += B("pip", 1730, 1075, 290, t, { poses: [[tpg + .45, "oops"]], flip: true });
  // Momo pops in to cheer, in the gap between the halves
  v += faceCam("momo", t, LT("m03") - .15, LE("m03") + .4, 960, 560, 112, [[LT("m03") - .15, "cheer"]], { noreact: true });
  w += OP(sp, v);
  // What you learn, you keep. What you earn, you wear: the character, big, with its two prizes
  if (t >= th6 - .2) { const a = ramp(t, th6 - .2, .4); w += `<rect width="1920" height="1080" fill="#0E0A2A" opacity="${n2(.9 * a)}"/>` + OP(a, `<circle cx="960" cy="560" r="420" fill="url(#glowC)" opacity=".35"/>`);
    w += avFront("you", 960, 905, 600, { rot: 2 * Math.sin(t * 2), op: a }) + OP(a, sparks(t, th6 + .1, 960, 480) + sparks(t, th6 + .6, 960, 480, "#9FE7FF"));
    const k1 = spring(t, W("h06", "learn") - .1, .45), k2 = spring(t, W("h06", "earn") - .1, .45);
    if (k1 > .02) w += TF(420, 360, k1, `<rect x="-310" y="-104" width="620" height="208" rx="40" fill="#2FA85A" filter="url(#dropS)"/>${TX(0, -34, "What you learn", 44, "#DFF7E6")}${TX(0, 46, "A magnet attracts iron ✓", 46, "#fff")}`);
    if (k2 > .02) w += TF(1500, 360, k2, `<rect x="-310" y="-104" width="620" height="208" rx="40" fill="url(#goldG)" filter="url(#dropS)"/>${TX(0, -34, "What you earn", 44, "#5A3A00")}${TX(0, 46, "Safety Goggles ✓", 50, "#3A2400")}`); }
  return w;
};
function confetti(t, t0) { let s = ""; const u = t - t0; if (u < 0 || u > 5) return "";
  for (let i = 0; i < 60; i++) { const x = hash(i, 41) * 960, y = -40 + (u * (240 + 180 * hash(i, 42)) + hash(i, 43) * 300) % 1160, r = u * 200 * (hash(i, 44) - .5);
    s += `<rect x="${n2(x)}" y="${n2(y)}" width="14" height="22" rx="3" fill="${["#FFD23F", "#FF6FA8", "#4FD8FF", "#7BE08F", "#B07BFF"][i % 5]}" transform="rotate(${n2(r)} ${n2(x + 7)} ${n2(y + 11)})"/>`; }
  return s; }

/* 9 the end: the Station with fireworks; Earn it. Wear it. Play it. The only app you need to learn Science: TheOneApp */
SC.end = (t, s) => {
  const tl = MK("logo"), tf = MK("fade");
  let w = station(t, { fw: s.t0 + .2, screen: "boss2" });
  w += avFront("you", 960, 925, 300, { rot: 2 * Math.sin(t * 2), sy: 1 + .015 * Math.sin(t * 4) });
  w += B("pip", 700, 940, 180, t, { poses: [[LT("p05"), "cheer"]], achieved: true, tag: false }) + B("momo", 1220, 940, 180, t, { poses: [[LT("m04"), "cheer"]], achieved: true, tag: false, flip: true }) + B("basil", 1400, 945, 180, t, { poses: [[LT("b04"), "cheer"]], achieved: true, tag: false, flip: true });
  // the three words
  const WRD = [["Earn it.", "m04", 610, "#2FA85A"], ["Wear it.", "b04", 960, "#FB7158"], ["Play it.", "p05", 1310, "#8B5CF6"]];
  for (const [txt, id, x, col] of WRD) { const k = spring(t, LT(id) - .05, .45) * (1 - ramp(t, tl - .1, .35)); if (k > .02) w += TF(x, 330, k, `<rect x="-165" y="-58" width="330" height="116" rx="58" fill="${col}" stroke="#fff" stroke-width="6" filter="url(#drop)"/>${TX(0, 22, txt, 64, "#fff")}`); }
  // the end card (film 1's): the logo, the line, the name
  if (t >= tl - .1) { const k = ramp(t, tl - .1, .5);
    w += OP(k, `<rect width="1920" height="1080" fill="#0B0726" opacity=".5"/>`) + TF(960, 170, spring(t, tl - .1, .6), logo(0, 0, 100, t));
    w += OP(ramp(t, tl + .3, .4), TX(960, 380, "The only app you need to learn Science", 58, "#fff", { stroke: "#1A1240", sw: 10 }));
    w += TF(960, 500, spring(t, W("h07", "theoneapp") - .1, .55), `<text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" stroke="#1A1240" stroke-width="16" stroke-linejoin="round" paint-order="stroke" filter="url(#glowS)"><tspan fill="#fff">The</tspan><tspan fill="#FFA531">One</tspan><tspan fill="#fff">App</tspan></text>`);
    w += OP(ramp(t, W("h07", "theoneapp") + .4, .4), tpill(960, 588, "theoneapp.sg", 38, "#FFF6E4", "#2B2147", { w: 700 })); }
  return w + fadeOut(t, tf + 1.0, 1.0);
};

/* the YouTube thumbnail (thumb.js renders it at 1920x1080, then it is scaled to 1280x720): the grey character becomes the styled one */
window.renderThumb = () => { const t = 3.3; let w = station(t, { trainX: 1900, screen: "dress" }) + `<rect width="1920" height="1080" fill="#0B0726" opacity=".45"/>`;
  w += `<circle cx="1260" cy="640" r="430" fill="url(#glowY)" opacity=".55"/>`;
  w += avFront("you0", 520, 1010, 560, { sat: 0, rot: -3 }) + avFront("you", 1260, 1040, 760, { rot: 3 }) + sparks(3.3, 3.0, 1260, 600) + sparks(3.3, 3.12, 1260, 520, "#9FE7FF");
  w += `<g transform="translate(860 700)"><path d="M-110 -40 H40 V-90 L130 0 L40 90 V40 H-110z" fill="${C.gold}" stroke="#1A1240" stroke-width="12" stroke-linejoin="round"/></g>`;
  w += `<text x="960" y="200" font-family="Fredoka" font-weight="700" font-size="160" text-anchor="middle" stroke="#1A1240" stroke-width="26" stroke-linejoin="round" paint-order="stroke"><tspan fill="#fff">EARN </tspan><tspan fill="${C.gold}">YOUR STYLE</tspan></text>`;
  w += TF(520, 420, 1, `<rect x="-140" y="-46" width="280" height="92" rx="46" fill="#6B6488" stroke="#fff" stroke-width="6"/>${TX(0, 18, "BEFORE", 52, "#fff", { ls: 3 })}`);
  w += buddy("momo", 1760, 1075, 330, t, { pose: "surprised", tag: false, flip: true }) + buddy("pip", 170, 1075, 300, t, { pose: "cheer", achieved: true, tag: false });
  w += TF(870, 930, 1, logo(0, 0, 86, t));
  document.getElementById("dyn").innerHTML = w + vignette(.4); };
