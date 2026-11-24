// scenes.js: promo film 4, "The Grey Platform". Each scene is SC[name](t, s) -> SVG. Times come from tl.js (lines, marks).
const SC = window.SC = {};
const sc = (n) => SCN[n];
const B = (who, x, y, h, t, o = {}) => buddy(who, x, y, h, t, { tag: false, ...o });   // the caption carries the name (no tag under the buddy)
// the crowd of other pupils on the platform: [avatar, x, y, h, phase]
const CROWD = [["a", 1180, 860, 268, 0], ["d", 1330, 842, 254, 1.3], ["c", 1480, 864, 268, 2.1], ["b", 1640, 846, 258, .7], ["e", 1800, 862, 266, 2.9], ["f", 1960, 844, 256, 1.8]];
const idle = (t, ph, a = 1) => ({ rot: a * 1.6 * Math.sin(t * 1.7 + ph), sy: 1 + .012 * a * Math.sin(t * 3.4 + ph) });

/* 1 the Station at night: the camera eases out from the dome (parallax: the sky barely moves, the grass moves most); the train glides in */
SC.station = (t, s) => {
  const u = (t - s.t0) / 6.7, z = lerp(1.32, 1.04, eio(clamp(u / .8)));
  const ti = MK("trainIn"), tsp = MK("trainStop"), tx = t < ti ? -300 : lerp(-300, 1640, eo((t - ti) / (tsp - ti)));
  const o = { trainX: tx, screen: "dress", z, cx: 960, cy: 880 };
  let w = station(t, o);
  // a few pupils' characters and the three buddies on the grass in front of the dome (bigger than v2, as films 1-3)
  let n = avFront("a", 500, 902, 196, idle(t, 0)) + avFront("b", 660, 896, 188, idle(t, .6)) + avFront("d", 1480, 898, 190, idle(t, 1.2)) + avFront("e", 1640, 904, 196, idle(t, 2.4));
  n += B("pip", 1030, 908, 168, t) + B("momo", 1200, 910, 168, t) + B("basil", 1370, 908, 168, t);
  w += stationNear(o, n) + stationNear(o, foreGrass(t, 1090, { sides: true }), 1.3);
  return w + fadeIn(t, s.t0, .5);
};
const fadeIn = (t, t0, d = .4) => t < t0 + d ? `<rect width="1920" height="1080" fill="#05030F" opacity="${n2(1 - clamp((t - t0) / d))}"/>` : "";
const fadeOut = (t, t1, d = .4) => t > t1 - d ? `<rect width="1920" height="1080" fill="#05030F" opacity="${n2(clamp((t - (t1 - d)) / d))}"/>` : "";
const flash = (t, t0, d = .35) => t >= t0 && t < t0 + d ? `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.85 * (1 - (t - t0) / d))}"/>` : "";

/* the platform (v3: films 1-3's richness): the night city beyond the glass rail (parallax), the canopy with its trusses and light cones, the
   carriage (roof, lit windows with passengers, the door, its warm spill and its reflection in the glossy floor), benches and plants, the Gift
   Shop at the far end (world x up to 2700). o: door (0..1), shop (0 dark .. 1 lit), pan (world x shift, for the parallax) */
function carriage(d, t) { let s = "";
  s += `<g filter="url(#dropS)"><path d="M-300 290 Q-300 250 -250 250 H700 Q750 250 750 300 V690 H-300z" fill="url(#carG)"/></g>`;
  s += `<path d="M-280 250 H730 Q745 250 748 268 H-296 Q-292 250 -280 250z" fill="url(#roofG)"/><rect x="-150" y="226" width="300" height="26" rx="8" fill="#C9C3E2"/><rect x="-130" y="232" width="260" height="6" rx="3" fill="#A69FCB"/>`;
  s += `<rect x="-240" y="270" width="320" height="34" rx="8" fill="#12102A"/>` + TX(-80, 297, "TheOneApp Station", 24, "#FFB14A", { ls: 1 });
  for (let i = 0; i < 3; i++) { const x = -250 + i * 210; s += `<rect x="${x}" y="318" width="170" height="170" rx="20" fill="#2A2554"/><rect x="${x + 6}" y="324" width="158" height="158" rx="16" fill="url(#winWarm)"/>`;
    s += `<rect x="${x + 6}" y="430" width="158" height="52" fill="#E2475B" opacity=".55"/><rect x="${x + 16}" y="400" width="60" height="36" rx="8" fill="#4F6BD8" opacity=".7"/><rect x="${x + 92}" y="400" width="60" height="36" rx="8" fill="#4F6BD8" opacity=".7"/><path d="M${x + 6} 350 H${x + 164}" stroke="#B5AED2" stroke-width="4"/>`;
    if (i !== 1) s += `<circle cx="${x + 50 + i * 20}" cy="384" r="17" fill="${["#6B4A3A", "#2E2A44", "#8A5A3A"][i]}"/><path d="M${x + 26 + i * 20} 432 q24 -40 48 0" fill="${["#4FA8FF", "#7BE08F", "#FFB14A"][i]}"/>`;
    s += `<path d="M${x + 20} 330 L${x + 60} 330 L${x + 20} 400z" fill="#fff" opacity=".28"/>`; }
  // the door: lit inside, two leaves sliding apart (d), handrail, LED strip above
  s += `<rect x="410" y="290" width="220" height="400" rx="14" fill="#FFE7A6"/><rect x="410" y="290" width="220" height="400" rx="14" fill="url(#glowWarm)"/><rect x="505" y="300" width="10" height="380" rx="5" fill="#C9C3E2" opacity=".8"/><rect x="430" y="610" width="180" height="80" fill="#E8C98A" opacity=".6"/>`;
  s += `<rect x="${n2(410 - 108 * d)}" y="290" width="110" height="400" rx="10" fill="#E4E0F2" stroke="#BEB8D8" stroke-width="4"/><rect x="${n2(520 + 108 * d)}" y="290" width="110" height="400" rx="10" fill="#E4E0F2" stroke="#BEB8D8" stroke-width="4"/>`;
  s += `<rect x="${n2(430 - 108 * d)}" y="330" width="70" height="120" rx="10" fill="#FFE7A6" opacity=".9"/><rect x="${n2(540 + 108 * d)}" y="330" width="70" height="120" rx="10" fill="#FFE7A6" opacity=".9"/>`;
  s += `<rect x="410" y="270" width="220" height="10" rx="5" fill="${d > .05 ? "#7BE08F" : "#FF6F6F"}"/><circle cx="520" cy="275" r="${d > .05 ? 26 : 18}" fill="url(#glow${d > .05 ? "C" : "P"})"/>`;
  s += `<rect x="-300" y="600" width="1050" height="20" fill="${C.pink}"/><rect x="-300" y="624" width="1050" height="5" fill="${C.cyan}"/><rect x="-300" y="660" width="1050" height="30" fill="url(#skirtG)"/>`;
  s += `<circle cx="720" cy="560" r="12" fill="#FFFBE8"/><circle cx="720" cy="560" r="60" fill="url(#glowW)" opacity=".8"/>`;
  return s; }
function platform(t, o = {}) { const d = o.door || 0, pan = o.pan || 0, shop = o.shop || 0; let s = `<g transform="translate(${n2(pan)} 0)">${sky(t, 0)}</g>`;
  // far: the city beyond the rail, moving at a third of the pan
  let far = moon(1500, 130, 46) + beams(t, .8) + skyline(700, 0, t, { seed: 31, h0: 200, h1: 240, col: "#191548", rim: "#3A3290", lit: .75 });
  far += `<g transform="translate(1250 0)">${dome(t, 0, 700, 300)}</g>` + `<g transform="translate(-120 30) scale(.75)">${lighthouse(t, 520, 900, 520, 0).replace(/<g transform="translate\(\d+ -?\d+\)"><rect[^]*$/, "")}</g>`;
  far += skyline(720, 0, t, { seed: 57, h0: 80, h1: 160, col: "#221C5C", lit: .95 });
  s += `<g transform="translate(${n2(pan * .65)} 0)">${far}</g>`;
  // the canopy: a dark roof, a truss of triangles, lamps hanging with cones of light down to the floor
  let c = `<rect x="-300" y="0" width="3300" height="64" fill="#15123A"/><rect x="-300" y="62" width="3300" height="8" fill="#2E2A70"/><rect x="-300" y="122" width="3300" height="6" fill="#2E2A70"/>`;
  for (let i = 0; i < 40; i++) { const x = -300 + i * 84; c += `<path d="M${x} 70 L${x + 42} 124 L${x + 84} 70" fill="none" stroke="#2E2A70" stroke-width="5"/>`; }
  for (let i = 0; i < 16; i++) { const x = -200 + i * 200; c += `<path d="M${x - 46} 150 L${x - 230} 712 L${x + 230} 712 L${x + 46} 150z" fill="url(#cone)" opacity=".55"/><path d="M${x} 128 L${x} 140" stroke="#2E2A70" stroke-width="4"/><path d="M${x - 30} 152 Q${x} 132 ${x + 30} 152z" fill="#2B2147"/><circle cx="${x}" cy="152" r="9" fill="#FFF3C4"/><circle cx="${x}" cy="152" r="46" fill="url(#glowY)" opacity=".7"/>`; }
  // the columns, the glass rail at the platform's far edge, the hanging sign
  for (let i = 0; i < 7; i++) { const x = -80 + i * 480; c += `<rect x="${x}" y="128" width="34" height="580" fill="#262262"/><rect x="${x}" y="128" width="8" height="580" fill="#4B43A8" opacity=".7"/><rect x="${x - 6}" y="560" width="46" height="10" fill="${C.cyan}" opacity=".6"/>`; }
  c += `<rect x="-300" y="600" width="3300" height="94" fill="#8FB8FF" opacity=".07"/><rect x="-300" y="598" width="3300" height="6" rx="3" fill="#BFE9FF" opacity=".7"/>`;
  for (let i = 0; i < 70; i++) c += `<rect x="${-300 + i * 48}" y="604" width="3" height="90" fill="#BFE9FF" opacity=".18"/>`;
  c += `<path d="M1300 128 V176 M1560 128 V176" stroke="#2E2A70" stroke-width="4"/><g transform="translate(1430 214)"><rect x="-210" y="-40" width="420" height="80" rx="14" fill="#12203F" stroke="${C.cyan}" stroke-width="4"/>${TX(-30, 14, "TheOneApp Station", 36, "#fff")}<rect x="140" y="-26" width="52" height="52" rx="10" fill="${C.gold}"/>${TX(166, 17, "1", 38, "#2B2147")}</g>`;
  // benches and plants by the rail
  for (const bx of [960, 1760, 2420]) c += `<rect x="${bx - 90}" y="652" width="180" height="16" rx="6" fill="#7A4F30"/><rect x="${bx - 90}" y="628" width="180" height="12" rx="6" fill="#8A5A36"/><rect x="${bx - 80}" y="668" width="10" height="34" fill="#3A2A55"/><rect x="${bx + 70}" y="668" width="10" height="34" fill="#3A2A55"/>`;
  for (const px of [800, 1180, 2000]) c += `<path d="M${px - 30} 700 L${px - 24} 660 H${px + 24} L${px + 30} 700z" fill="#B0633A"/><circle cx="${px - 16}" cy="638" r="24" fill="#2E7A4E"/><circle cx="${px + 16}" cy="640" r="22" fill="#3C8F5E"/><circle cx="${px}" cy="620" r="24" fill="#3C8F5E"/>` + flower(px - 12, 626, 7, "#FF6FA8") + flower(px + 14, 632, 7, "#FFD23F");
  s += c;
  // the floor: glossy, the tactile strip and the yellow line, the tile lines, the lamps' reflections
  s += `<rect x="-300" y="700" width="3300" height="500" fill="url(#glossFloor)"/>`;
  for (let i = 0; i < 16; i++) { const x = -200 + i * 200; s += `<rect x="${x - 26}" y="730" width="52" height="340" fill="url(#cone)" opacity=".18"/>`; }
  for (let i = 0; i < 34; i++) s += `<path d="M${-300 + i * 110} 726 L${-420 + i * 150} 1100" stroke="#3A3A7A" stroke-width="2" opacity=".45"/>`;
  for (const y of [790, 880, 990]) s += `<path d="M-300 ${y} H3000" stroke="#3A3A7A" stroke-width="2" opacity=".35"/>`;
  // the carriage's reflection in the floor (mirrored, fading), the door's warm spill
  s += `<g opacity=".3" transform="translate(0 1396) scale(1 -1)"><g transform="translate(0 0)">${carriage(d, t).replace(' filter="url(#dropS)"', "")}</g></g><rect x="-300" y="700" width="1100" height="420" fill="url(#floorFade)"/>`;
  if (d > .02) s += `<path d="M410 700 L630 700 L760 1080 L300 1080z" fill="url(#cone)" opacity="${n2(.8 * d)}"/>`;
  s += `<rect x="-300" y="700" width="3300" height="12" fill="#3A3A8A"/><rect x="-300" y="712" width="3300" height="14" fill="#E9C23A"/>`;
  for (let i = 0; i < 160; i++) s += `<circle cx="${-296 + i * 21}" cy="736" r="3" fill="#E9C23A" opacity=".5"/>`;
  s += carriage(d, t);
  // the Gift Shop at the end of the platform
  s += giftShop(2080, 230, 560, 480, shop, t);
  return s; }

/* 2 the mystery: the doors open; a grey character steps out; the pupils and buddies stare; Basil points out the dark Gift Shop */
SC.mystery = (t, s) => {
  const td = MK("doors"), ts = MK("stepOut"), d = eio((t - td) / .6), tl = W("b01", "look"), pan = 760 * eio((t - tl) / 1.3) * (1 - eio((t - LT("h02") - .9) / 1.1) * .45);
  let w = platform(t, { door: d, shop: 0, pan }) + tourPoster(1090, 712, t);
  // the crowd turn to look (they lean towards the door)
  for (const [n, x, y, h, ph] of CROWD) w += avFront(n, x, y, h, { ...idle(t, ph, .6), rot: -3 + idle(t, ph, .6).rot });
  // the grey character: walks out of the door (side view, facing right), then turns to us, a little slumped
  const wk = clamp((t - ts) / 1.3);
  if (t >= ts - .2) { if (wk < 1) w += avSide("you0", lerp(520, 780, wk), lerp(700, 858, eo(wk)), 340, (t - ts) * 9, { flip: true }).replace("<g transform", `<g filter="url(#sat0)" transform`);
    else w += avFront("you0", 780, 858, 345, { sat: 0, rot: -2 + .8 * Math.sin(t * 1.2), sy: 1 - .02 * Math.sin(t * 1.2) }) + sigh(t, ts + 1.6, 840, 520); }
  // the buddies: Momo and Pip by the door, Basil further along (he points at the shop)
  w += B("momo", 1010, 914, 250, t, { poses: [[LT("m01"), "surprised"]] }) + B("pip", 1260, 918, 244, t, { poses: [[LE("p01") + .2, "thinking"]], look: -7 * ss(LT("p01") - .15, LT("p01") + .2, t) * (1 - ss(LE("p01"), LE("p01") + .4, t)) });   // p01, an aside: Pip leans in towards the grey character
  w += B("basil", 1650, 918, 252, t, { poses: [[W("b01", "look"), "pointing"]], flip: false });
  return `<filter id="sat0"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope=".82"/><feFuncG type="linear" slope=".82"/><feFuncB type="linear" slope=".9"/></feComponentTransfer></filter>` +
    CAM(`<g transform="translate(${n2(-pan)} 0)">${w}</g>`, 1 + .06 * eio((t - s.t0) / 6) - .03 * eio((t - tl) / 1.3), 760, 760) + (t < td + .3 ? flash(t, s.t0, .25) : "");
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
  let w = `<g filter="url(#b18)" opacity=".7">${platform(t, { door: 1 })}</g><rect width="1920" height="1080" fill="#170F3E" opacity=".55"/><ellipse cx="960" cy="420" rx="900" ry="460" fill="url(#nebV)"/>`;
  // v3: film 1's question fog: big soft swirls drifting behind the cards, and motes of light
  for (let i = 0; i < 6; i++) w += swirl(((hash(i, 131) * 1900 + t * (10 + 6 * i)) % 2200) - 140, 160 + hash(i, 132) * 760, 70 + 60 * hash(i, 133), t * (.2 + .1 * i) + i, .16 + .08 * hash(i, 134));
  w += motes(t, 20, 120, 1000, { cols: ["#BFEFFF", "#FFC2E6", "#FFF3B0"] });
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
function swirl(x, y, r, rot, op) { let d = ""; for (let k = 0; k <= 60; k++) { const a = k * .21, rr = r * k / 60; d += (k ? " L" : "M") + n2(x + Math.cos(a + rot) * rr) + " " + n2(y + Math.sin(a + rot) * rr * .8); }
  return `<path d="${d}" fill="none" stroke="#9B7BFF" stroke-width="${n2(r * .16)}" stroke-linecap="round" opacity="${n2(op)}"/>`; }
function sparks(t, t0, x, y, col = "#FFE27A") { let s = ""; const u = (t - t0) / .7; if (u < 0 || u > 1) return "";
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + .2, r = 40 + 150 * eo(u); s += `<g transform="translate(${n2(x + Math.cos(a) * r)} ${n2(y + Math.sin(a) * r * .8)}) scale(${n2(.8 * (1 - u))})"><path d="M0-22 Q3-3 22 0 Q3 3 0 22 Q-3 3 -22 0 Q-3-3 0-22z" fill="${col}"/></g>`; }
  return s; }

/* 4 day by day: the Station turns from night to day and back, twice; the till fills to 50 */
SC.days = (t, s) => {
  const D = s.t1 - s.t0, u = clamp((t - s.t0) / D), day = Math.max(0, Math.sin(Math.PI * 2 * u * 1.0 - .2)) ** .6, dayN = u < .5 ? 1 : 2;
  const o = { day, sunU: (u * 2) % 1, trainX: 1640 + ((t - s.t0) * 900) % 2600, screen: "shop", z: lerp(1.04, 1.12, u), cx: 960, cy: 880, shipX: 470 };
  let w = station(t, o);
  w += stationNear(o, avFront("you0", 700, 900, 214, { sat: 0 }) + B("pip", 1080, 908, 160, t) + B("momo", 1240, 910, 160, t) + B("basil", 1400, 908, 160, t) + foreGrass(t, 1090, { sides: true, col: mix("#100F2C", "#244A2C", day) }));
  // the till and what earned it (the app's rules: a quiz finished 10, an experiment finished 10; up to 30 a day)
  const EV = [[.12, "+10 an experiment"], [.3, "+10 a quiz"], [.58, "+10 an experiment"], [.78, "+10 a quiz"]]; let n = 10, last = -9;
  EV.forEach(([e, txt], i) => { const te = s.t0 + e * D; if (t >= te + .5) { n += 10; last = te + .5; } if (t >= te) { const k = spring(t, te, .4) * (1 - ramp(t, te + .9, .25)); if (k > .02) w += TF(960 + (i % 2 ? 330 : -330), 300, k, tpill(0, 0, txt, 40, "#2FA85A", "#fff", { w: 700 })) + coinFly(t, te + .05, 960 + (i % 2 ? 330 : -330), 300, 960, 180, 5, .45); } });
  w += till(960, 180, n, 1.35, pulse(t, last, .02, .3));
  w += TF(170, 110, 1, tpill(0, 0, `Day ${dayN}`, 44, day > .5 ? "#FFB14A" : "#3B2A8C", "#fff", { w: 700 }));
  return w;
};

/* 5 the Gift Shop (v3: inside, warm and full): the lights flicker on over shelves of the shop's real things; then the REAL Gift Shop screen:
   trying on the safety goggles, buying them for 50 credits */
SC.shop = (t, s) => {
  const ton = MK("shopOn"), lit = ss(ton + .1, ton + .7, t) * (t < ton + .35 ? (Math.sin(t * 60) > 0 ? 1 : .3) : 1), tb = MK("buy"), tbo = MK("bought");
  const z = lerp(1.0, 1.06, eio((t - s.t0) / 6));
  let w = CAM(shopInside(t, lit, { st: 0, sign: 0 }) + avFront("you0", 470, 905, 340, { sat: 0, rot: 2 * Math.sin(t * 1.3) }), z, 560, 640);
  w += OP(lit, motes(t, 14, 200, 900, { cols: ["#FFF3B0", "#FFE0A8"] }));
  // the real screen slides up over the right of the shop (the shelves on the left stay in view)
  const tu = s.t0 + 1.05, k = eo((t - tu) / .45);   // the screen rises at 1.05 s
  if (t >= tu) { const shot = t < tb ? "shop" : "shop2", y = lerp(1500, 450, k);
    w += tablet(1190, y, 960, shot, { label: "In the app · The Gift Shop", zoom: shot === "shop" ? lerp(1, 1.12, clamp((t - tu) / 3)) : 1.18, zx: shot === "shop" ? 900 : 960, zy: shot === "shop" ? 470 : 560, inner: (t >= tbo - .8 ? `<g transform="translate(960 733)">${tapFX(t, tbo - .45, 0, 0, "#FFD23F")}</g>` : "") }); }
  if (t >= tbo) { const k2 = spring(t, tbo, .45); w += TF(1190, 450, k2 * 1.2, `<g transform="rotate(-8)"><rect x="-210" y="-62" width="420" height="124" rx="22" fill="#2FA85A" stroke="#fff" stroke-width="8"/>${TX(0, 26, "BOUGHT!", 76, "#fff", { ls: 4 })}</g>`) + sparks(t, tbo, 1190, 450); }
  // the till: 50, then 0 when bought (coins fly into the shop)
  w += till(1700, 70, t < tbo ? 50 : 0, 1, pulse(t, tbo, .02, .3)) + (t >= tbo - .1 ? coinFly(t, tbo - .1, 1700, 70, 1190, 450, 8, .55) : "");
  w += B("pip", 160, 1090, 330, t, { poses: [[ton + .3, "cheer"]], achieved: true }) + B("momo", 1810, 1080, 300, t, { poses: [[ton + .5, "surprised"], [tbo, "cheer"]], achieved: true, flip: true, tag: false });
  return w + flash(t, s.t0, .2);
};

/* 5b the legendary looks (v3, teacher 24 Nov 2026): the Gift Shop's stage. "Legendary looks" lights up, the curtains open on the Winter
   Wonderland Pack (S Legendary, 300; on sale 13 Nov to 31 Dec), with snow; then the stage turns to the Space Explorer Pack (SS Mythical,
   500): the pupil's own character in the Space Suit, Planet Band and Mini Telescope, hovering on the Rocket Pack. Tiers and prices as the
   shop shows them (avatar.js TIERS, AVSHOP); every outfit drawn by the app's own avatar.js (avatars.js). */
function stageWinter(t, a, sx) { if (a < .01) return ""; let s = `<rect x="600" y="150" width="720" height="660" fill="url(#snowSky)"/><circle cx="1130" cy="300" r="46" fill="#F4F7FF"/><circle cx="1130" cy="300" r="140" fill="url(#glowW)" opacity=".6"/>`;
  s += `<ellipse cx="760" cy="760" rx="300" ry="130" fill="#DDE8FA"/><ellipse cx="1180" cy="780" rx="330" ry="150" fill="#C8D8F2"/><ellipse cx="960" cy="800" rx="420" ry="110" fill="#EEF4FF"/>`;
  s += snow(t * .8, 40, { x0: 640, x1: 1290, y0: 160, y1: 800 });
  // the riser with fairy lights
  s += `<ellipse cx="960" cy="778" rx="290" ry="40" fill="#2A3E7A"/><ellipse cx="960" cy="770" rx="290" ry="40" fill="#F4F7FF"/>`;
  for (let i = 0; i < 18; i++) { const u = i / 17, x = 960 + Math.cos(Math.PI * u) * 290, y = 770 + Math.sin(Math.PI * u) * 40, on = .5 + .5 * Math.sin(t * 6 + i); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="5" fill="${["#FF6F6F", "#FFD23F", "#7BE08F", "#6FA8FF"][i % 4]}"/><circle cx="${n2(x)}" cy="${n2(y)}" r="16" fill="url(#glowY)" opacity="${n2(on * .7)}"/>`; }
  s += avFront("wGreenD", 760, 742, 300, idle(t, .3)) + avFront("wRedJ", 1160, 742, 300, idle(t, 1.1));
  s += avFront("wRed", 870, 782, 372, idle(t, 2.0)) + avFront("wGreenJ", 1060, 784, 372, idle(t, .8));
  return `<g opacity="${n2(a)}" transform="translate(${n2(sx)} 0)">${s}</g>`; }
function stageSpace(t, a, sx, lift, noKid) { if (a < .01) return ""; let s = `<rect x="600" y="150" width="720" height="660" fill="url(#spaceSky)"/><ellipse cx="900" cy="420" rx="360" ry="220" fill="url(#nebV)"/><ellipse cx="1120" cy="300" rx="240" ry="160" fill="url(#nebB)"/>`;
  for (let i = 0; i < 70; i++) { const x = 640 + hash(i, 101) * 640, y = 170 + hash(i, 102) * 560, k = .4 + .6 * Math.abs(Math.sin(t * (1 + hash(i, 103)) + i)); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(1 + 1.8 * hash(i, 104))}" fill="#fff" opacity="${n2(k)}"/>`; }
  // a ringed planet and a little blue one; a shooting star
  s += `<circle cx="1140" cy="290" r="62" fill="#FFB25A"/><path d="M1090 270 Q1140 250 1196 276" stroke="#E98A3A" stroke-width="10" fill="none" opacity=".7"/><ellipse cx="1140" cy="296" rx="112" ry="24" fill="none" stroke="#FFE3A8" stroke-width="9" transform="rotate(-14 1140 296)"/><circle cx="1140" cy="290" r="150" fill="url(#glowO)" opacity=".35"/>`;
  s += `<circle cx="760" cy="260" r="30" fill="#4DA6FF"/><path d="M742 252 q10 -12 24 -4 q-4 14 -18 12z" fill="#5AD17A"/><circle cx="760" cy="260" r="70" fill="url(#glowC)" opacity=".5"/>`;
  { const u = ((t * .5) % 1.6) / .6; if (u < 1) { const x = lerp(1240, 720, u), y = lerp(200, 380, u); s += `<path d="M${n2(x)} ${n2(y)} l120 -42" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="${n2(Math.sin(Math.PI * u))}"/>`; } }
  // the launch pad riser, cyan lights
  s += `<ellipse cx="960" cy="778" rx="290" ry="40" fill="#141038"/><ellipse cx="960" cy="770" rx="290" ry="40" fill="#2A2470" stroke="${C.cyan}" stroke-width="4"/><ellipse cx="960" cy="770" rx="200" ry="26" fill="none" stroke="${C.cyan}" stroke-width="2" opacity=".6"/>`;
  for (let i = 0; i < 18; i++) { const u = i / 17, x = 960 + Math.cos(Math.PI * u) * 290, y = 770 + Math.sin(Math.PI * u) * 40, on = .5 + .5 * Math.sin(t * 8 - i); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="4" fill="#BFEFFF"/><circle cx="${n2(x)}" cy="${n2(y)}" r="15" fill="url(#glowC)" opacity="${n2(on * .8)}"/>`; }
  if (!noKid) s += rocketHover("space", 960, 772, 410, t, 0, { lift });
  return `<g opacity="${n2(a)}" transform="translate(${n2(sx)} 0)">${s}</g>`; }
function snowflakeIc(x, y, r, col = "#BFE6FF") { let s = ""; for (let k = 0; k < 3; k++) s += `<path d="M0 ${-r} V${r} M-${r * .3} ${-r * .7} L0 ${-r * .45} L${r * .3} ${-r * .7} M-${r * .3} ${r * .7} L0 ${r * .45} L${r * .3} ${r * .7}" transform="rotate(${k * 60})"/>`;
  return `<g transform="translate(${n2(x)} ${n2(y)})" stroke="${col}" stroke-width="${n2(r * .16)}" stroke-linecap="round" fill="none">${s}</g>`; }
function rocketIc(x, y, r) { return TF(x, y, r / 30, `<path d="M0 -30 Q16 -14 12 16 L-12 16 Q-16 -14 0 -30z" fill="#F4F2FB"/><circle cy="-6" r="7" fill="#4DA6FF" stroke="#9AA4B8" stroke-width="2"/><path d="M-12 6 L-22 22 L-12 18z M12 6 L22 22 L12 18z" fill="#FF5C8A"/><path d="M-7 18 Q0 36 7 18z" fill="#FFB347"/>`, 35); }
function packCard(x, y, k, o) { if (k < .02) return ""; const it = AVSHOP.items.find((q) => q.id === o.id);
  let c = `<g filter="url(#drop)"><rect x="-235" y="-290" width="470" height="580" rx="36" fill="#1D1A2C" stroke="${o.rim}" stroke-width="6"/></g><rect x="-223" y="-278" width="446" height="556" rx="30" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="3"/>`;
  c += `<circle cx="0" cy="-118" r="150" fill="url(#${o.glow})" opacity=".45"/>` + iconAt(AVICON[o.id], 0, -118, 250);
  c += TX(0, 54, esc(o.name), 40, "#fff") + TX(0, 96, esc(o.sub), 28, "#C9C2E8", { w: 600 });
  c += tierTag(0, 158, it.tier, 32, o.t);   // the app's tag: "S Legendary · 300" / "SS Mythical · 500"
  c += `<g transform="translate(0 228)"><rect x="-190" y="-28" width="380" height="56" rx="28" fill="${o.chipBg}"/>${o.chipIc || ""}${TX(o.chipIc ? 18 : 0, 11, esc(o.chip), 28, o.chipInk)}</g>`;
  return TF(x, y, k, c, o.rot || 0); }
SC.legend = (t, s) => {
  const t0 = s.t0, tlg = W("h08", "legendary"), twi = W("h08", "winter"), tor = W("h08", "or"), trk = W("h08", "rocket"), te = LE("h08");
  const sign = ss(tlg - .2, tlg + .2, t), st = ss(tlg + .25, tlg + 1.05, t), sp = ss(tor - .2, tor + .4, t), lift = .35 + .65 * ss(trk - .1, trk + .5, t);
  const z = lerp(1.0, 1.22, eio((t - t0) / 1.7)) + .025 * clamp((t - t0 - 1.7) / 7);
  const fill = (tt) => stageWinter(tt, 1 - sp, -520 * sp) + stageSpace(tt, sp, 520 * (1 - sp), lift);
  let w = CAM(shopInside(t, 1, { st, sign, fill }), z, 960, 330);
  // snow drifting in front during the winter half; a whoosh of light streaks as the stage turns
  w += OP((1 - sp) * ss(twi - .6, twi, t), snow(t, 46, { y0: -60, y1: 1120 }));
  if (sp > 0 && sp < 1) { const a = Math.sin(Math.PI * sp); for (let i = 0; i < 16; i++) { const y = 140 + hash(i, 111) * 760, x = lerp(1900, -300, (sp * 1.3 + hash(i, 112) * .4) % 1.2); w += `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(260 + 300 * hash(i, 113))}" height="${n2(3 + 5 * hash(i, 114))}" rx="3" fill="${i % 3 ? "#BFEFFF" : "#FFE3A8"}" opacity="${n2(.7 * a)}"/>`; } }
  if (sp > .3) w += OP(sp, motes(t, 18, 150, 900, { cols: ["#BFEFFF", "#FFC2E6", "#FFF3B0"] }));
  // the BOUGHT! stamp from the shop, leaving
  if (t < t0 + .5) w += OP(1 - (t - t0) / .5, TF(1190, 450, 1.2, `<g transform="rotate(-8)"><rect x="-210" y="-62" width="420" height="124" rx="22" fill="#2FA85A" stroke="#fff" stroke-width="8"/>${TX(0, 26, "BOUGHT!", 76, "#fff", { ls: 4 })}</g>`));
  // the pack cards, as the shop names and prices them
  const kw = spring(t, twi - .25, .5) * (1 - ss(tor - .25, tor + .1, t)), ks = spring(t, tor + .1, .5);
  w += packCard(1655, 430, kw, { id: "wintertide", name: "Winter Wonderland", sub: "Pack · 4 sets", rim: "#E0A800", glow: "glowC", chip: "Only until 31 Dec", chipBg: "#DFF1FF", chipInk: "#1F4F86", chipIc: snowflakeIc(-150, 0, 16, "#4D8FD8"), t, rot: 2 });
  w += packCard(1655, 430, ks, { id: "space", name: "Space Explorer", sub: "Pack · 4 pieces", rim: "#8C7BFF", glow: "glowV", chip: "Rocket Pack included", chipBg: "#2A2470", chipInk: "#BFEFFF", chipIc: rocketIc(-162, 0, 18), t, rot: -2 });
  // earned, never bought: the outfits are bought with the credits the quizzes earn
  { const k = spring(t, te - 1.1, .5); if (k > .02) w += TF(300, 560, k, `<g transform="rotate(-4)"><rect x="-230" y="-58" width="460" height="116" rx="26" fill="#2FA85A" stroke="#fff" stroke-width="6" filter="url(#dropS)"/>${coinIc(-170, 0, 30)}${TX(28, -8, "Bought with credits", 34, "#fff")}${TX(28, 30, "you earn", 34, "#DFF7E6")}</g>`); }
  w += B("momo", 200, 1088, 300, t, { poses: [[twi, "surprised"], [tor + .6, "cheer"]], achieved: true }) + B("pip", 1800, 1092, 270, t, { poses: [[trk, "cheer"]], achieved: true, flip: true });
  return w;
};

/* 6 the Dressing Room (the app's: the lit mirror, the turntable, the try-on card): the colours are free, the goggles are now owned */
function dressRoom(t) { let s = `<rect width="1920" height="1080" fill="#271F33"/><rect width="1920" height="830" fill="url(#wallWarm)" opacity=".35"/>`;
  for (let i = 0; i < 30; i++) s += `<rect x="${i * 68 + 34}" y="0" width="34" height="1080" fill="#fff" opacity=".035"/>`;
  s += `<rect x="0" y="96" width="1920" height="14" fill="#7A4F30"/><rect x="0" y="110" width="1920" height="6" fill="#56351F"/>`;
  // wall sconces with warm pools of light
  for (const x of [250, 1190, 1700]) s += `<circle cx="${x}" cy="330" r="150" fill="url(#glowWarm)"/><path d="M${x - 22} 340 L${x - 30} 300 H${x + 30} L${x + 22} 340z" fill="#FFE7A3"/><rect x="${x - 6}" y="340" width="12" height="40" fill="#B98A35"/>`;
  s += `<rect x="0" y="830" width="1920" height="250" fill="#3B2A22"/>`; for (let i = 0; i < 18; i++) s += `<rect x="${i * 118}" y="830" width="3" height="250" fill="#000" opacity=".3"/>`;
  s += `<rect x="0" y="826" width="1920" height="10" fill="#56351F"/>`;
  // velvet curtains at both sides, gathered with gold ties, and a pelmet along the top
  for (const [x0, fl] of [[0, 1], [1920, -1]]) { let c = `<path d="M0 0 H190 Q150 300 120 520 Q160 700 190 1080 H0z" fill="url(#velvet)"/>`; for (let i = 1; i < 5; i++) c += `<path d="M${i * 36} 0 Q${i * 30} 300 ${i * 24} 520 Q${i * 30} 700 ${i * 36} 1080" stroke="#4A0A1C" stroke-width="5" fill="none" opacity=".55"/>`;
    c += `<ellipse cx="128" cy="520" rx="26" ry="14" fill="#E9B44C"/>`; s += `<g transform="translate(${x0} 0) scale(${fl} 1)">${c}</g>`; }
  s += `<path d="M0 0 H1920 V54 Q1800 96 1680 54 Q1560 96 1440 54 Q1320 96 1200 54 Q1080 96 960 54 Q840 96 720 54 Q600 96 480 54 Q360 96 240 54 Q120 96 0 54z" fill="url(#velvet)"/><path d="M0 54 Q120 96 240 54 Q360 96 480 54 Q600 96 720 54 Q840 96 960 54 Q1080 96 1200 54 Q1320 96 1440 54 Q1560 96 1680 54 Q1800 96 1920 54" stroke="#E9B44C" stroke-width="6" fill="none"/>`;
  // the sign
  s += `<g transform="translate(1245 18)"><rect width="430" height="78" rx="14" fill="#56351F" stroke="#B98A35" stroke-width="5" filter="url(#dropS)"/>${TX(215, 52, "The Dressing Room", 40, "#FFF4DC")}</g>`;
  return s; }
// a spotlight from above onto the turntable, with dust motes in the beam
function spotlight(t, cx, top, bot, w0, w1, a = 1) { let s = `<path d="M${cx - w0} ${top} L${cx - w1} ${bot} L${cx + w1} ${bot} L${cx + w0} ${top}z" fill="url(#cone)" opacity="${n2(.75 * a)}"/><ellipse cx="${cx}" cy="${bot}" rx="${w1 * 1.1}" ry="${w1 * .2}" fill="url(#glowWarm)" opacity="${n2(a)}"/>`;
  for (let i = 0; i < 16; i++) { const u = hash(i, 121), y = top + ((hash(i, 122) * (bot - top) + t * 18 * (1 + u)) % (bot - top)), half = lerp(w0, w1, (y - top) / (bot - top)), x = cx + (hash(i, 123) - .5) * 1.6 * half + 8 * Math.sin(t + i);
    s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(1.5 + 1.5 * u)}" fill="#FFF3C4" opacity="${n2(a * (.3 + .5 * Math.abs(Math.sin(t * 2 + i))))}"/>`; }
  return s + `<path d="M${cx - 40} ${top - 6} Q${cx} ${top - 40} ${cx + 40} ${top - 6}z" fill="#2B2147"/><circle cx="${cx}" cy="${top - 4}" r="14" fill="#FFF8DC"/><circle cx="${cx}" cy="${top - 4}" r="60" fill="url(#glowY)" opacity="${n2(a)}"/>`; }
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
  let w = dressRoom(t) + mirror(720, 150, 560, 660, t) + spotlight(t, 720, 120, 862, 50, 330, .9);
  // the turntable and the character on it: grey, then its colours, then the goggles; then it spins in the mirror
  const spinU = clamp((t - tspin) / 1.7), a = Math.PI * 2 * eio(spinU), ca = Math.cos(a), sa = Math.sin(a);
  w += `<ellipse cx="720" cy="900" rx="430" ry="80" fill="url(#glowWarm)"/>` + turntable(720, 850, t, a);
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
    <g transform="translate(0 236)">${own < .5 ? tierTag(0, -2, "U", 30, t)
      : `<g transform="scale(${n2(spring(t, tyou + .1, .4))})"><rect x="-150" y="-32" width="300" height="64" rx="32" fill="#2FA85A"/>${TX(0, 13, "✓ Yours to keep", 36, "#fff")}</g>`}</g>`);
  w += `<filter id="sat0d"><feColorMatrix type="saturate" values="${n2(own)}"/></filter>`;
  w += B("basil", 1740, 1090, 300, t, { poses: [[tyou + .1, "cheer"]], achieved: true, flip: true });
  return w + flash(t, s.t0, .2);
};
// a character in the Space Explorer Pack hovering on its Rocket Pack: two flames (from the app's rocket nozzles) and a warm glow below
function rocketHover(name, x, yFeet, h, t, t0, o = {}) { const k = h / 216, lift = (o.lift === undefined ? 1 : o.lift), y = yFeet - lift * (34 + 9 * Math.sin(t * 2.2)) * k;
  let f = ""; const fl = (o.flame === undefined ? 1 : o.flame) * (.85 + .15 * Math.sin(t * 31) + .1 * Math.sin(t * 17));
  if (fl > .02) { for (const sx of [-27.4, 27.4]) { const fx = x + sx * k, fy = y - 62 * k, L = (50 + 50 * lift) * k * fl;
      f += `<path d="M${n2(fx - 7 * k)} ${n2(fy)} Q${n2(fx)} ${n2(fy + L * 1.15)} ${n2(fx + 7 * k)} ${n2(fy)}z" fill="url(#flameG)"/><path d="M${n2(fx - 3.5 * k)} ${n2(fy)} Q${n2(fx)} ${n2(fy + L * .6)} ${n2(fx + 3.5 * k)} ${n2(fy)}z" fill="#FFFBEA"/>`; }
    f = `<ellipse cx="${n2(x)}" cy="${n2(y - 30 * k)}" rx="${n2(70 * k)}" ry="${n2(70 * k)}" fill="url(#glowO)" opacity="${n2(.7 * fl)}"/>` + f + `<ellipse cx="${n2(x)}" cy="${n2(yFeet + 4)}" rx="${n2(60 * k * fl)}" ry="${n2(10 * k)}" fill="url(#glowO)" opacity="${n2(.8 * fl * lift)}"/>`; }
  return f + avFront(name, x, y, h, { rot: (o.rot || 0) + 2 * Math.sin(t * 1.7), shadow: lift < .3 }); }
const hopK = (t, t0) => hop(t, t0, .4, 40) + hop(t, t0 + .45, .35, 26);

/* v3: arcade energy for the games: a deep purple room, rays turning behind the screen, a neon grid floor rushing towards us, chasing
   bulbs on neon pillars, sparks in the air. cx, cy: where the rays come from; tint: [left colour, right colour] */
function arcadeBG(t, o = {}) { const cx = o.cx || 960, cy = o.cy || 460, hz = o.hz || 760; let s = `<rect width="1920" height="1080" fill="#120A30"/>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="1100" ry="700" fill="url(#nebV)" opacity=".9"/>`;
  for (let i = 0; i < 20; i++) { const a = (i * 18 + t * 8) * Math.PI / 180, b = a + .09; s += `<path d="M${cx} ${cy} L${n2(cx + Math.cos(a) * 2200)} ${n2(cy + Math.sin(a) * 2200)} L${n2(cx + Math.cos(b) * 2200)} ${n2(cy + Math.sin(b) * 2200)}z" fill="${i % 2 ? "#FF5CF0" : "#4FD8FF"}" opacity=".07"/>`; }
  // the neon grid floor
  s += `<rect x="0" y="${hz}" width="1920" height="${1080 - hz}" fill="#1A0838"/><rect x="0" y="${hz}" width="1920" height="${1080 - hz}" fill="url(#gridFade)" opacity=".35"/>`;
  for (let k = 0; k < 12; k++) { const u = ((k + (t * 1.4) % 1) / 12), y = hz + (1080 - hz) * u * u; s += `<path d="M0 ${n2(y)} H1920" stroke="#FF5CF0" stroke-width="${n2(1 + 3 * u)}" opacity="${n2(.25 + .6 * u)}"/>`; }
  for (let k = -14; k <= 14; k++) s += `<path d="M${cx + k * 40} ${hz} L${cx + k * 260} 1080" stroke="#4FD8FF" stroke-width="2" opacity=".45"/>`;
  s += `<rect x="0" y="${hz - 3}" width="1920" height="6" fill="#FFB0F8" opacity=".9"/><rect x="0" y="${hz - 30}" width="1920" height="60" fill="url(#gridFade)" opacity=".5"/>`;
  // neon pillars with chasing bulbs at both edges
  for (const x of o.pillars || [60, 1860]) { s += `<rect x="${x - 22}" y="60" width="44" height="${hz - 60}" rx="22" fill="#24104E" stroke="#FF5CF0" stroke-width="4"/>`;
    for (let j = 0; j < 14; j++) { const on = (Math.floor(t * 10) + j) % 3 === 0 ? 1 : .25; s += `<circle cx="${x}" cy="${90 + j * (hz - 120) / 13}" r="7" fill="${j % 2 ? "#FFD23F" : "#4FD8FF"}" opacity="${on}"/>` + (on > .5 ? `<circle cx="${x}" cy="${n2(90 + j * (hz - 120) / 13)}" r="22" fill="url(#glowY)" opacity=".7"/>` : ""); } }
  return s + motes(t, 18, 80, hz, { cols: ["#FFC2E6", "#BFEFFF", "#FFF3B0"] }); }
// chasing marquee bulbs round a rounded box (x, y, w, h)
function marquee(t, x, y, w, h, col = "#FFD23F", n = 40) { let s = ""; const P = 2 * (w + h);
  for (let i = 0; i < n; i++) { let d = i * P / n, px, py; if (d < w) { px = x + d; py = y; } else if (d < w + h) { px = x + w; py = y + d - w; } else if (d < 2 * w + h) { px = x + w - (d - w - h); py = y + h; } else { px = x; py = y + h - (d - 2 * w - h); }
    const on = (Math.floor(t * 12) + i) % 4 < 2; s += `<circle cx="${n2(px)}" cy="${n2(py)}" r="6" fill="${on ? col : "#4A3A6A"}"/>` + (on ? `<circle cx="${n2(px)}" cy="${n2(py)}" r="16" fill="url(#glowY)" opacity=".6"/>` : ""); }
  return s; }

/* 7 into every game: the REAL Boss Clash screen (the pupil's own character as "My Hero"); the character walks in proudly */
SC.games = (t, s) => {
  const u = t - s.t0; let w = arcadeBG(t, { cx: 1150, cy: 450 });
  const zoom = lerp(1, 1.18, eio(clamp(u / 3.2)));
  w += marquee(t, 1150 - 680, 450 - 395, 1360, 790, "#FFD23F", 56) + tablet(1150, 450, 1240, "boss2", { label: "In the app · Boss Clash", zoom, zx: 960, zy: 600 });
  if (u > 1.6) w += sparks(t, s.t0 + 1.6, 420, 640, "#FFE27A") + sparks(t, s.t0 + 1.8, 260, 520, "#9FE7FF");
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
  if (t < split + .3) { w += arcadeBG(t, { cx: 900, cy: 470 }); const k = eo((t - s.t0) / .4); w += TF(900, 470, lerp(.85, 1, k), marquee(t, -670, -390, 1340, 780, "#4FD8FF", 54)) + tablet(900, 470, 1220, "claw", { label: "In the app · Science Claw · Vs Pip", s: lerp(.85, 1, k), zoom: lerp(1, 1.1, clamp(u / 2.4)) });
    w += B("pip", 1740, 1060, 300, t, { flip: true }); if (t < split) return w + flash(t, s.t0, .2); }
  const sp = eo((t - split) / .4); let v = arcadeBG(t, { cx: 960, cy: 500, hz: 820, pillars: [] }) + `<rect x="0" y="0" width="960" height="1080" fill="url(#halfL)" opacity=".55"/><rect x="960" y="0" width="960" height="1080" fill="url(#halfR)" opacity=".55"/><rect x="954" y="0" width="12" height="1080" fill="#fff" opacity=".35"/><rect x="930" y="0" width="60" height="1080" fill="url(#glowW)" opacity=".25"/>`;
  v += marquee(t, 140 - 14, 230 - 14, 680 + 28, 560 + 28, "#4FD8FF", 48) + marquee(t + .17, 1100 - 14, 230 - 14, 680 + 28, 560 + 28, "#FF8AF0", 48);
  // the claws move over their pick, drop, close, lift. You: the iron nail. Pip: the rubber duck
  const mv = (tg) => lerp(0, tg, eio(clamp((t - tq) / .8))), dropU = (tg) => t < td ? 0 : t < tg ? eio(clamp((t - td) / .7)) : 1 - .75 * eio(clamp((t - tg) / .5));
  v += clawHalf(480, t, 0, { tx: mv(30), drop: dropU(tyg), closed: t >= tyg - .05, took: t >= tyg ? "nail" : null });
  v += clawHalf(1440, t, 1, { tx: mv(-120), drop: dropU(tpg), closed: t >= tpg - .05, took: t >= tpg ? "duck" : null });
  // the names (YOU becomes YOU WIN!)
  if (t < tw_) v += `<g transform="translate(480 175)">${tpill(0, 0, "YOU", 46, "#2A8BFF", "#fff", { w: 700, ls: 4 })}</g>`;
  else v += TF(480, 175, spring(t, tw_, .5), `<g transform="rotate(-4)"><rect x="-230" y="-58" width="460" height="116" rx="58" fill="${C.gold}" stroke="#fff" stroke-width="7" filter="url(#drop)"/>${TX(0, 26, "YOU WIN!", 76, "#2B2147", { ls: 3 })}</g>`) + confetti(t, tw_);
  v += `<g transform="translate(1440 175)">${tpill(0, 0, "PIP", 46, "#B24BE0", "#fff", { w: 700, ls: 4 })}</g>`;
  { const k = spring(t, split + .15, .5) * (1 - ramp(t, tq + .2, .3)); if (k > .02) v += TF(960, 520, k, `<circle r="110" fill="url(#glowY)" opacity=".8"/><circle r="78" fill="#1A0838" stroke="${C.gold}" stroke-width="8" filter="url(#neon)"/>` + TX(0, 30, "VS", 84, "url(#goldText)", { stroke: "#2B1240", sw: 8 }), -8); }
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
  const o = { fw: s.t0 + .2, screen: "boss2", z: lerp(1.0, 1.07, clamp((t - s.t0) / 10)), cx: 960, cy: 880 };
  let w = station(t, o), n = "";
  // the legendary looks join the party on the grass: a Winter Wonderland set at the left, the Space Explorer hovering at the right
  n += avFront("wRed", 300, 900, 250, idle(t, .4)) + avFront("wGreenJ", 470, 906, 240, idle(t, 1.9)) + rocketHover("space", 1660, 880, 270, t, s.t0);
  n += avFront("you", 960, 905, 300, { rot: 2 * Math.sin(t * 2), sy: 1 + .015 * Math.sin(t * 4) });
  n += B("pip", 720, 912, 190, t, { poses: [[LT("p05"), "cheer"]], achieved: true, tag: false }) + B("momo", 1200, 912, 190, t, { poses: [[LT("m04"), "cheer"]], achieved: true, tag: false, flip: true }) + B("basil", 1390, 916, 190, t, { poses: [[LT("b04"), "cheer"]], achieved: true, tag: false, flip: true });
  w += stationNear(o, n) + stationNear(o, foreGrass(t, 1090, { sides: true }), 1.3);
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

/* the YouTube thumbnail (thumb.js renders it at 1920x1080, then it is scaled to 1280x720). v3: the legendary looks: the pupil's own
   character in the Space Explorer Pack on its Rocket Pack, a Winter Wonderland set in the snow, the tier tags as the shop shows them */
window.renderThumb = () => { const t = 52.3; let w = CAM(shopInside(t, 1, { st: 1, sign: 1, fill: (tt) => stageSpace(tt, 1, 0, 1, true) }), 1.0, 960, 330) + `<rect width="1920" height="1080" fill="#0B0726" opacity=".55"/>`;
  w += `<circle cx="1330" cy="620" r="470" fill="url(#glowV)" opacity=".9"/><circle cx="560" cy="700" r="380" fill="url(#glowC)" opacity=".45"/>` + snow(3.1, 40, { x0: 120, x1: 960, y0: 200, y1: 1080 });
  w += avFront("wRed", 520, 1060, 640, { rot: -3 }) + rocketHover("space", 1340, 1080, 800, 3.3, 0, { lift: 1.2, rot: 3 }) + sparks(3.3, 3.0, 1340, 520) + sparks(3.3, 3.12, 540, 560, "#BFEFFF");
  w += `<text x="960" y="196" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" stroke="#1A1240" stroke-width="26" stroke-linejoin="round" paint-order="stroke"><tspan fill="#fff">LEGENDARY </tspan><tspan fill="${C.gold}">LOOKS</tspan></text>`;
  w += tierTag(520, 330, "S", 46, 1.3, { rot: -4 }) + tierTag(1350, 330, "SS", 46, 1.3, { rot: 3 });
  w += TF(960, 990, 1, `<rect x="-330" y="-56" width="660" height="112" rx="56" fill="#2FA85A" stroke="#fff" stroke-width="8"/>${coinIc(-262, 0, 36)}${TX(34, 21, "EARN IT. WEAR IT.", 54, "#fff")}`);
  w += buddy("momo", 1800, 1085, 300, t, { pose: "surprised", tag: false, flip: true }) + buddy("pip", 130, 1085, 280, t, { pose: "cheer", achieved: true, tag: false });
  document.getElementById("dyn").innerHTML = w + vignette(.4); };
