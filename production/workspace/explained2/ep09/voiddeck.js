// voiddeck.js: EP9's sets and props (Stage 2). Loaded after tests.js, before common.js.
// Sets (baked in bg/): BG.voiddeck (the void deck of an HDB block, bright afternoon), BG.voiddeckL (the same in long afternoon light),
// BG.playground (the playground beside the block, late afternoon). Views: deckView(t, o, cam), playView(t, o, cam).
// Props: OUR TEST STAND with its strips, hangers, weights, mat and counters (testStand, stripSvg, hangerSvg, counterPill), the gloved hands
// (glovePinch, gloveFinger), the fabric bag, the tray of weights, the two cups, the DROP BOX, the safety card, the rubber band and the
// ice-cream stick (bandPts / bandSvg, stickSvg), the trays, the three tubes (tubeSvg), the hidden animals (spiderArt, caterpillarArt).
const XDEFS9 = () => `${lg("vdFloor", [[0, "#F1EADF"], [1, "#CFC5B4"]])}${lg("vdStone", [[0, "#F8F4EC"], [1, "#E4DCCE"]])}${lg("vdCeil", [[0, "#C9C1B4"], [1, "#E6E0D5"]])}${lg("vdSkyL", [[0, "#FFB978"], [.6, "#FFDDAE"], [1, "#FFF0D2"]])}
  ${lg("vdSteel", [[0, "#F2F5F9"], [.5, "#C9D1DC"], [1, "#9AA5B4"]], 1, 0)}${lg("vdBrass", [[0, "#F5D27A"], [1, "#C9922E"]])}${lg("vdGlass", [[0, "#EAF8FF", .75], [1, "#BFE3F5", .55]], 1, 0)}${lg("vdTub", [[0, "#EAF6FF", .5], [1, "#CDE8F7", .34]])}
  ${lg("pgSky", [[0, "#9ED3F4"], [.7, "#FFE9C8"], [1, "#FFD9A6"]])}${lg("pgFloor", [[0, "#DB7B60"], [1, "#B9563F"]])}${lg("vdGlove", [[0, "#FFD76A"], [1, "#F0A93A"]])}${lg("vdCanvas", [[0, "#5CC3BA"], [1, "#3C9C95"]])}
  <pattern id="vdWeave" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 3 H12 M0 9 H12" stroke="#B9A47C" stroke-width="1.6" opacity=".7"/><path d="M3 0 V12 M9 0 V12" stroke="#fff" stroke-width="1.6" opacity=".7"/></pattern>
  <pattern id="vdWeaveB" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 3.5 H14 M0 10.5 H14" stroke="#2B7F79" stroke-width="2" opacity=".55"/><path d="M3.5 0 V14 M10.5 0 V14" stroke="#9BE3DC" stroke-width="2" opacity=".5"/></pattern>`;
const TYD = 872, TYP = 852;                         // where things stand: the stone table (void deck), the bench (playground)
const PAPERC = "#FFFFFF", PAPERL = "#7FB2F0", FABC = "#F3E4C0", FABL = "#C9AE78";

/* ====================================================================================================================================
   The gloved hands of the adult (thick yellow work gloves, a cream cuff, a blue sleeve). Never a child's hand.
   glovePinch(open): thumb and finger closed on (0, 0); the arm runs off to +x. gloveFinger(): one finger pointing at (0, 0), arm to +x.
   ==================================================================================================================================== */
const _gl = `fill="url(#vdGlove)" stroke="#B5791F" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const _sleeve = (x) => `<rect x="${x + 56}" y="-58" width="900" height="116" rx="30" fill="#5B7BD6" stroke="#3A56A8" stroke-width="5"/><rect x="${x}" y="-70" width="74" height="140" rx="22" fill="#FFF3DC" stroke="#C9A772" stroke-width="5"/><path d="M${x + 24} -56 V56 M${x + 48} -56 V56" stroke="#C9A772" stroke-width="3" opacity=".6"/>`;
function glovePinch(open = 0) { const o = 16 * open;
  return _sleeve(196) + `<g ${_gl}><rect x="58" y="-66" width="150" height="132" rx="48"/><path d="M96 -34 Q40 -${48 + o} 4 -${16 + o} Q-10 -${8 + o} 2 -${2 + o} Q46 -${10 + o} 100 6z"/><path d="M92 44 Q40 ${52 + o} 6 ${18 + o} Q-8 ${8 + o} 4 ${2 + o} Q50 ${14 + o} 104 2z"/>
    <path d="M80 -62 Q58 -50 76 -30 M112 -66 Q92 -52 108 -32" fill="none"/></g><path d="M86 -50 Q150 -60 190 -44" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".45"/>`; }
function gloveFinger() {
  return _sleeve(206) + `<g ${_gl}><rect x="78" y="-58" width="140" height="124" rx="46"/><rect x="0" y="-52" width="132" height="42" rx="21"/><rect x="62" y="-8" width="64" height="30" rx="15"/><rect x="66" y="18" width="60" height="28" rx="14"/><rect x="74" y="40" width="54" height="26" rx="13"/></g><path d="M14 -42 H96" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".45"/>`; }

/* ====================================================================================================================================
   The strips. One function for the small stand on the table and for the close-ups (scale it).
   stripSvg(kind, o): kind "paper" | "fabric"; o: x (centre), y0, y1 (top, bottom), w, bend (px the middle is pushed to the left),
   tear (0..1: how far the tear has run across, from the LEFT edge), ty (the tear's height), gap (px the lower piece has dropped), taut (fabric)
   ==================================================================================================================================== */
const stripOff = (o, y) => { const u = clamp((y - o.y0) / (o.y1 - o.y0)); return -(o.bend || 0) * (Math.sin(Math.PI * Math.min(1, u * 1.08)) * .86 + .3 * u); };
function stripPiece(kind, o, ya, yb, dy, jagTop, jagBot) { const w = o.w, n = 14, L = [], R = [];
  for (let i = 0; i <= n; i++) { const y = lerp(ya, yb, i / n), off = stripOff(o, y); L.push([o.x - w / 2 + off, y + dy]); R.push([o.x + w / 2 + off, y + dy]); }
  const jag = (y) => { const out = [], m = 9; for (let i = 0; i <= m; i++) out.push([lerp(o.x - w / 2, o.x + w / 2, i / m) + stripOff(o, y), y + dy + (i === 0 || i === m ? 0 : (i % 2 ? 1 : -1) * w * .04 + (hash(i, 5) - .5) * w * .05)]); return out; };
  const top = jagTop ? jag(ya) : [L[0], R[0]], bot = jagBot ? jag(yb).reverse() : [R[n], L[n]];
  const d = ptsPath([...top, ...R.slice(1, n), ...bot, ...L.slice(1, n).reverse()], false);
  const id = "sp" + kind[0] + Math.round(o.x) + "_" + Math.round(ya) + "_" + Math.round(dy * 10); let lines = "";
  if (kind === "paper") { const st = w * .27; for (let y = o.y0 + st * .8; y < yb; y += st) if (y > ya) { const off = stripOff(o, y); lines += `<path d="M${n2(o.x - w / 2 + off)} ${n2(y + dy)} H${n2(o.x + w / 2 + off)}" stroke="${PAPERL}" stroke-width="${n2(w * .035)}"/>`; }
    const off0 = stripOff(o, ya), off1 = stripOff(o, yb), offm = stripOff(o, (ya + yb) / 2); lines += `<path d="M${n2(o.x - w * .3 + off0)} ${n2(ya + dy)} Q${n2(o.x - w * .3 + 2 * offm - (off0 + off1) / 2)} ${n2((ya + yb) / 2 + dy)} ${n2(o.x - w * .3 + off1)} ${n2(yb + dy)}" fill="none" stroke="#F58DA0" stroke-width="${n2(w * .03)}"/>`; }
  else { const st = w * .11, tt = o.taut || 0; for (let y = o.y0 + st; y < yb; y += st) if (y > ya) { const off = stripOff(o, y); lines += `<path d="M${n2(o.x - w / 2 + off)} ${n2(y + dy)} H${n2(o.x + w / 2 + off)}" stroke="${FABL}" stroke-width="${n2(w * .028)}" opacity=".75"/>`; }
    for (let i = 1; i < 8; i++) { const xx = o.x - w / 2 + w * i / 8, wav = (1 - tt) * w * .012; let p = ""; for (let j = 0; j <= 12; j++) { const y = lerp(ya, yb, j / 12); p += (j ? "L" : "M") + n2(xx + stripOff(o, y) + wav * Math.sin(j * 1.7 + i)) + " " + n2(y + dy) + " "; } lines += `<path d="${p}" fill="none" stroke="#fff" stroke-width="${n2(w * .028)}" opacity=".8"/>`; } }
  return `<clipPath id="${id}"><path d="${d}z"/></clipPath><path d="${d}z" fill="${kind === "paper" ? PAPERC : FABC}" stroke="${kind === "paper" ? "#9AA6C0" : "#A88C55"}" stroke-width="${n2(Math.max(2.5, w * .045))}" stroke-linejoin="round"/><g clip-path="url(#${id})">${lines}</g>`; }
function stripSvg(kind, o) { const ty = o.ty === undefined ? lerp(o.y0, o.y1, .36) : o.ty, tr = o.tear || 0, gap = o.gap || 0;
  if (tr >= 1) return stripPiece(kind, o, o.y0, ty, 0, false, true) + stripPiece(kind, o, ty, o.y1, gap + o.w * .06, true, false);
  let s = stripPiece(kind, o, o.y0, o.y1, 0, false, false);
  if (tr > 0) { const x0 = o.x - o.w / 2 + stripOff(o, ty), x1 = x0 + o.w * tr, hw = o.w * .05 * Math.min(1, tr * 3); s += `<path d="M${n2(x0 - 2)} ${n2(ty - hw)} L${n2(x1)} ${n2(ty)} L${n2(x0 - 2)} ${n2(ty + hw)}z" fill="#3B2A5C" opacity=".85"/><path d="M${n2(x0)} ${n2(ty - hw)} L${n2(x1)} ${n2(ty)} L${n2(x0)} ${n2(ty + hw)}" fill="none" stroke="#C9D2E2" stroke-width="${n2(o.w * .03)}" stroke-linejoin="round"/>`; }
  return s; }
// a flat round weight (a brass disc seen from the side), centred on (0, 0): 76 x 10
const weightDisc = (w = 76, h = 10) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .45}" fill="url(#vdBrass)" stroke="#8E6416" stroke-width="2.5"/><path d="M${-w / 2 + 6} ${-h / 2 + 2.6} H${w / 2 - 6}" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/>`;
// the clip, the hanger and its weights; origin = the lower end of the strip. n = weights on it; slide = [i, u] one weight sliding on from the right (u 0..1)
function hangerSvg(n = 0, o = {}) { const rod = o.rod || 84, wt = 10; let s = `<path d="M0 6 V${rod}" stroke="#5E6B7C" stroke-width="5" stroke-linecap="round"/><rect x="-42" y="${rod - 4}" width="84" height="8" rx="4" fill="#7C8898" stroke="#4A5564" stroke-width="2.5"/>
    <rect x="-22" y="-12" width="44" height="22" rx="5" fill="#2B2147"/><path d="M-12 -12 Q0 -26 12 -12" fill="none" stroke="#8E9AA8" stroke-width="4"/>`;
  for (let i = 0; i < n; i++) s += TF(0, rod - 4 - wt / 2 - i * wt, 1, weightDisc());
  if (o.slide) { const [i, u] = o.slide; s += TF(lerp(190, 0, eio(u)), rod - 4 - wt / 2 - i * wt, 1, weightDisc()); }
  return s; }
// the counter pill that stands beside a strip. WEIGHTS: n (the number bumps when it changes: k = pulse)
const counterPill = (n, k = 0, sc = 1) => TF(0, 0, sc * (1 + .16 * k), `<g filter="url(#dropS)"><rect x="-118" y="-30" width="236" height="60" rx="30" fill="${P.ink}"/><rect x="48" y="-22" width="58" height="44" rx="14" fill="${P.sun}"/></g>${T(-28, 11, "WEIGHTS:", 28, "#fff", { ls: 1 })}${T(77, 14, n, 38, P.ink)}`);
/* OUR TEST STAND. Origin = the middle of the base, on the table. A base with its label, an upright rod, a cross bar with two clamps (left: paper,
   right: fabric), a soft mat. o.paper / o.fabric: false, or { n (weights), tear, gap, bend, taut, hanger: false, slide, ck (counter bump), count: false, tag }
   o.empty = no strips. Geometry (local): clamps at x = -/+120, strip y -430..-190 (60 wide), hanger rod 84, mat top y -66 */
const STD = { cx: 120, y0: -430, y1: -190, w: 60, rod: 84, mat: -66 };
function testStand(o = {}) { let s = `<ellipse cx="0" cy="4" rx="270" ry="16" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><rect x="-7" y="-478" width="14" height="430" rx="6" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="2.5"/>
    <rect x="-230" y="-54" width="460" height="54" rx="12" fill="#4A5670" stroke="#2B2147" stroke-width="4"/><rect x="-230" y="-54" width="460" height="12" rx="6" fill="#6C7A98"/>${T(0, -12, "OUR TEST STAND", 27, "#fff", { ls: 2 })}
    <rect x="-204" y="-68" width="408" height="16" rx="8" fill="#FF9E8A" stroke="#C8604E" stroke-width="3"/><path d="M-190 -62 H190" stroke="#fff" stroke-width="3" opacity=".45" stroke-linecap="round"/>
    <rect x="-186" y="-482" width="372" height="16" rx="8" fill="url(#vdSteel)" stroke="#6E7A88" stroke-width="2.5"/><circle cx="0" cy="-474" r="13" fill="#4A5670" stroke="#2B2147" stroke-width="3"/>`;
  for (const [kind, sg] of [["paper", -1], ["fabric", 1]]) { const p = o[kind], x = sg * STD.cx;
    if (p) { const so = { x, y0: STD.y0, y1: STD.y1, w: STD.w, bend: p.bend, tear: p.tear, gap: p.gap, taut: p.taut }; s += stripSvg(kind, so);
      if (p.hanger !== false) s += TF(x + stripOff(so, STD.y1), STD.y1 + ((p.tear || 0) >= 1 ? (p.gap || 0) + 3.6 : 0), 1, hangerSvg(p.n || 0, { rod: STD.rod, slide: p.slide }));
      if (p.count !== false) s += TF(x + sg * 190, -300, 1, counterPill(p.n || 0, p.ck || 0, .8));
      if (p.tag) s += TF(x + sg * 176, -400, 1, tpill(0, 0, kind, 28, "#fff", P.ink, { w: 700 })); }
    s += `<rect x="${x - 40}" y="-470" width="80" height="42" rx="8" fill="#39435A" stroke="#2B2147" stroke-width="3"/><rect x="${x - 34}" y="-438" width="68" height="12" rx="4" fill="#6C7A98"/><circle cx="${x}" cy="-452" r="9" fill="${P.sun}" stroke="#2B2147" stroke-width="3"/>`; }
  return s + (o.front || ""); }
// the two strips lying flat on the table, side by side (the cold open). origin = the middle of the pair
const stripsFlat = () => `<ellipse cx="0" cy="8" rx="150" ry="10" fill="${P.ink}" opacity=".16" filter="url(#b4)"/><g transform="translate(0 -18) scale(1 .42) rotate(-90)">${stripSvg("paper", { x: -16, y0: -120, y1: 120, w: 60 })}</g><g transform="translate(0 14) scale(1 .42) rotate(-90)">${stripSvg("fabric", { x: 16, y0: -120, y1: 120, w: 60 })}</g>`;
// a small tray of flat round weights. origin = the middle of its foot
const weightTray = (n = 8) => { let s = `<ellipse cx="0" cy="6" rx="120" ry="10" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M-110 -22 H110 L96 0 H-96z" fill="#8E9AA8" stroke="#4A5564" stroke-width="4" stroke-linejoin="round"/><path d="M-104 -22 H104" stroke="#DDE3EA" stroke-width="5" stroke-linecap="round"/>`;
  for (let i = 0; i < n; i++) s += TF(i % 2 ? 44 : -44, -28 - Math.floor(i / 2) * 10, 1, weightDisc()); return s; };

/* ---------- the fabric school bag (the book's example: a fabric bag that holds heavy books). origin = the middle of its foot; 300 wide, 330 tall with its handles.
   full = 0..1: five books stand in it and it bulges ---------- */
function fabricBag(full = 0) { const b = 12 * full, bookC = ["#E8604E", "#F2B84B", "#5B7BD6", "#8B6BE8", "#43BF6C"]; let books = "";
  if (full > 0) for (let i = 0; i < 5; i++) books += `<rect x="${-112 + i * 46}" y="${n2(-250 - 34 * full + (i % 2) * 8)}" width="40" height="120" rx="5" fill="${bookC[i]}" stroke="#2B2147" stroke-width="3"/><path d="M${-104 + i * 46} ${n2(-240 - 34 * full + (i % 2) * 8)} v90" stroke="#fff" stroke-width="4" opacity=".5"/>`;
  return `<ellipse cx="0" cy="6" rx="170" ry="16" fill="${P.ink}" opacity=".24" filter="url(#b4)"/>
    <path d="M-70 -224 Q-80 -330 -20 -330 Q10 -330 14 -226" fill="none" stroke="#2B7F79" stroke-width="20" stroke-linecap="round"/><path d="M-70 -224 Q-80 -330 -20 -330 Q10 -330 14 -226" fill="none" stroke="#5CC3BA" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 9"/>${books}
    <path d="M${-140 - b} -226 H${140 + b} Q${156 + b} -110 ${138 + b} -18 Q134 0 114 0 H-114 Q-134 0 ${-138 - b} -18 Q${-156 - b} -110 ${-140 - b} -226z" fill="url(#vdCanvas)" stroke="#226B66" stroke-width="6" stroke-linejoin="round"/>
    <path d="M${-140 - b} -226 H${140 + b} Q${156 + b} -110 ${138 + b} -18 Q134 0 114 0 H-114 Q-134 0 ${-138 - b} -18 Q${-156 - b} -110 ${-140 - b} -226z" fill="url(#vdWeaveB)"/>
    <path d="M${-136 - b} -206 H${136 + b}" stroke="#226B66" stroke-width="5" stroke-dasharray="10 8" opacity=".8"/><path d="M-14 -224 Q-24 -318 36 -318 Q72 -318 74 -224" fill="none" stroke="#2B7F79" stroke-width="20" stroke-linecap="round"/><path d="M-14 -224 Q-24 -318 36 -318 Q72 -318 74 -224" fill="none" stroke="#8FE0D8" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 9"/>
    <rect x="-78" y="-150" width="156" height="104" rx="16" fill="#3C9C95" stroke="#226B66" stroke-width="5"/><rect x="-78" y="-150" width="156" height="104" rx="16" fill="url(#vdWeaveB)"/><path d="M-62 -126 H62" stroke="#226B66" stroke-width="4" stroke-dasharray="8 7"/>
    <path d="M${-122 - b} -190 Q${-132 - b} -110 ${-120 - b} -40" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".3"/>`; }

/* ---------- the two cups (the book's pair). origin = the middle of the base ---------- */
// the stainless-steel cup of a drinks stall (with its handle); no dent is ever drawn
const metalCup = () => `<path d="M46 -92 Q96 -92 92 -52 Q88 -18 44 -24" fill="none" stroke="#8E9AA8" stroke-width="13" stroke-linecap="round"/><path d="M46 -92 Q96 -92 92 -52 Q88 -18 44 -24" fill="none" stroke="#E6EBF2" stroke-width="5" stroke-linecap="round"/>
  <path d="M-52 -118 H52 L44 -6 Q42 0 34 0 H-34 Q-42 0 -44 -6z" fill="url(#vdSteel)" stroke="#5E6B7C" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-118" rx="54" ry="10" fill="#EEF2F7" stroke="#5E6B7C" stroke-width="5"/><ellipse cx="0" cy="-117" rx="42" ry="6" fill="#8E9AA8"/>
  <path d="M-34 -100 L-28 -14" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".8"/><path d="M20 -100 L16 -14" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/><path d="M-46 -30 H46" stroke="#8E9AA8" stroke-width="3" opacity=".6"/>`;
// the glass cup: crack 0..1 = a crack runs up its side from the base
const glassCup = (crack = 0) => `<path d="M-48 -124 H48 L38 -4 Q36 0 30 0 H-30 Q-36 0 -38 -4z" fill="url(#vdGlass)" stroke="#6FA8C9" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="-124" rx="48" ry="9" fill="#F4FCFF" fill-opacity=".8" stroke="#6FA8C9" stroke-width="4"/>
  <path d="M-36 -8 H36 L38 -22 H-38z" fill="#BFE3F5" opacity=".8"/><path d="M-32 -106 L-26 -20" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".9"/><path d="M26 -108 L22 -40" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>`
  + (crack > 0 ? `<path d="M-10 0 L-2 -24 L-14 -46 L2 -70 L-8 -96 L4 -122" fill="none" stroke="#2B5E80" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" pathLength="1" stroke-dasharray="${n2(crack)} 1"/>${crack > .5 ? `<path d="M-14 -46 L-34 -58 M2 -70 L26 -62" fill="none" stroke="#2B5E80" stroke-width="3.5" stroke-linecap="round" opacity="${n2(crack * 2 - 1)}"/>` : ""}` : "");
// the glass cup broken into five BIG pieces lying together (k 0..1 = how far they have come apart). Rounded, calm, no flying bits
const GLP = [[[-48, -124], [-4, -124], [-14, -70], [-44, -58]], [[-4, -124], [48, -124], [42, -66], [2, -70], [-14, -70]], [[-44, -58], [-14, -70], [2, -70], [-2, -24], [-40, -14]], [[2, -70], [42, -66], [38, -10], [-2, -24]], [[-40, -14], [-2, -24], [38, -10], [36, 0], [-36, 0]]];
const GLE = [[-92, -20, -66], [96, -22, 74], [-40, -22, -20], [46, -22, 98], [2, -9, 0]];
const glassPieces = (k = 1) => GLP.map((pts, i) => { const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length, e = GLE[i], d = ptsPath(pts.map((p) => [p[0] - cx, p[1] - cy]));
  return `<g transform="translate(${n2(lerp(cx, e[0], k))} ${n2(lerp(cy, e[1], k))}) rotate(${n2(e[2] * k)})"><path d="${d}" fill="url(#vdGlass)" stroke="#6FA8C9" stroke-width="4.5" stroke-linejoin="round"/><path d="M${n2(pts[0][0] - cx + 8)} ${n2(pts[0][1] - cy + 8)} L${n2((pts[1][0] - cx) * .5)} ${n2((pts[1][1] - cy) * .5 + 6)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/></g>`; }).join("");
/* the DROP BOX: a deep clear plastic tub standing on the ground. origin = the middle of its foot; w x h. inner = what is inside (drawn between back and front) */
function dropBox(inner = "", w = 560, h = 330) { const a = w / 2, b = a - 30;
  return `<ellipse cx="0" cy="8" rx="${a + 20}" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M${-a} ${-h} H${a} L${b} 0 H${-b}z" fill="url(#vdTub)" stroke="#7FB5D6" stroke-width="5" stroke-linejoin="round"/><path d="M${-b + 6} -14 H${b - 6}" stroke="#7FB5D6" stroke-width="4" opacity=".6"/>
    ${inner}<path d="M${-a} ${-h} H${a} L${b} 0 H${-b}z" fill="#EAF6FF" opacity=".18"/><rect x="${-a - 12}" y="${-h - 12}" width="${w + 24}" height="24" rx="12" fill="#DFF1FB" stroke="#7FB5D6" stroke-width="5"/>
    <path d="M${-a + 30} ${-h + 36} L${-b + 34} -30" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".55"/><path d="M${a - 44} ${-h + 36} L${b - 40} -60" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".4"/>
    <g transform="translate(0 ${-h * .2})"><rect x="-128" y="-30" width="256" height="60" rx="12" fill="#FFF8EA" stroke="${P.ink}" stroke-width="4"/>${T(0, 13, "DROP BOX", 38, P.ink, { ls: 3 })}</g>`; }
// the cream safety card standing on the table. origin = the middle of its foot. lines: [bold, small]
function safetyCard(k2 = 1) { const a = "Never break things to test them.", b = "Broken glass is sharp.", w = tw(a, 40, 700) + 110;
  return `<ellipse cx="0" cy="4" rx="${n2(w / 2)}" ry="12" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M${n2(-w / 2 + 40)} 0 l-24 -34 M${n2(w / 2 - 40)} 0 l24 -34" stroke="#C9A772" stroke-width="10" stroke-linecap="round"/>
    <g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="-190" width="${n2(w)}" height="164" rx="22" fill="url(#gPaper)" stroke="${P.coral}" stroke-width="7"/></g>
    <g transform="translate(${n2(-w / 2 + 52)} -128)"><path d="M0 -30 L30 22 H-30z" fill="${P.sun}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M0 -10 V6" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/><circle cy="15" r="3.6" fill="${P.ink}"/></g>
    ${T(36, -116, a, 40, P.ink)}${OP(k2, T(36, -62, b, 34, "#C2412E", { w: 600 }))}`; }

/* ====================================================================================================================================
   The rubber band and the wooden ice-cream stick as real things.
   bandPts(f, w, a, h): the band as a closed curve. f = 0..1 folded in half (its two ends are brought together and up), w = 0..1 twisted
   into a figure of eight. A rubber band BENDS in smooth curves (it is never drawn stretched).
   ==================================================================================================================================== */
function bandPts(f = 0, w = 0, a = 200, h0 = 120) { const n = 72, th = Math.max(.001, f * Math.PI * .96), kap = th / (2 * a), h = lerp(h0, 36, Math.min(1, f * 1.3)), pts = [], sh = f > 0 ? (1 - Math.cos(th / 2)) / kap * .5 : 0;
  for (let i = 0; i < n; i++) { const u = i / n * 2 * Math.PI, x = a * Math.cos(u), y = h * Math.sin(u), ph = kap * x;
    let X = f > 0 ? Math.sin(ph) / kap + y * Math.sin(ph) : x, Y = f > 0 ? -(1 - Math.cos(ph)) / kap + y * Math.cos(ph) + sh : y;
    if (w > 0) { const ex = a * .95 * Math.cos(u), ey = h0 * .78 * Math.sin(2 * u); X = lerp(X, ex, w); Y = lerp(Y, ey, w); }
    pts.push([X, Y]); } return pts; }
const ptsPath = (pts, close = true) => pts.map((p, i) => (i ? "L" : "M") + n2(p[0]) + " " + n2(p[1])).join(" ") + (close ? "z" : "");
function bandSvg(f = 0, w = 0, o = {}) { const a = o.a || 200, h = o.h || 120, sw = o.sw || 26, d = ptsPath(bandPts(f, w, a, h));
  return `<path d="${d}" fill="none" stroke="#7A4A22" stroke-width="${sw + 8}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#C8925A" stroke-width="${sw}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#F0C89A" stroke-width="${n2(sw * .22)}" stroke-linejoin="round" stroke-dasharray="${n2(a * .5)} ${n2(a * 1.1)}" transform="translate(0 ${n2(-sw * .2)})" opacity=".9"/>`; }
/* the wooden ice-cream stick, half-length a, half-thickness h. bend = degrees the whole stick is bowed (its ends go down, the middle up);
   crack 0..1 = a pale crack opens on the OUTSIDE (top) of the bend; snap 0..1 = it has snapped into two pieces with splintered ends. */
function stickPts(a, h, deg, s0, s1, jag) { const th = Math.max(.0001, deg * Math.PI / 180), kap = th / (2 * a), P_ = (s, y) => { const ph = kap * s; return [Math.sin(ph) / kap - y * Math.sin(ph), (1 - Math.cos(ph)) / kap + y * Math.cos(ph)]; };
  const top = [], bot = [], n = 16; for (let i = 0; i <= n; i++) { const s = lerp(s0, s1, i / n); top.push(P_(s, -h)); bot.push(P_(s, h)); }
  const end = (s, sg) => { const out = []; for (let j = 1; j < 8; j++) { const an = -Math.PI / 2 + Math.PI * j / 8, p = P_(s, 0), ph = kap * s; out.push([p[0] + sg * h * Math.cos(an) * Math.cos(ph) - h * Math.sin(an) * Math.sin(ph), p[1] + sg * h * Math.cos(an) * Math.sin(ph) + h * Math.sin(an) * Math.cos(ph)]); } return out; };
  const jg = (s, sg) => { const out = []; for (let j = 1; j < 6; j++) out.push(P_(s + sg * h * (j % 2 ? .55 : .05) * (.6 + .8 * hash(j, 9)), lerp(-h, h, j / 6))); return out; };
  return { top, bot, endA: jag === "a" ? jg(s0, 1).reverse() : end(s0, -1).reverse(), endB: jag === "b" ? jg(s1, -1) : end(s1, 1), P_ }; }
function stickPiece(a, h, deg, s0, s1, jag) { const g = stickPts(a, h, deg, s0, s1, jag), pts = [...g.top, ...g.endB, ...g.bot.slice().reverse(), ...g.endA], d = ptsPath(pts); let gr = "";
  for (const [yy, sa, sb] of [[-.45, .08, .7], [.1, .2, .95], [.5, .0, .55], [-.1, .55, .98]]) { const q = []; for (let i = 0; i <= 8; i++) { const s = lerp(lerp(s0, s1, sa), lerp(s0, s1, sb), i / 8); q.push(g.P_(s, yy * h)); } gr += `<path d="${ptsPath(q, false)}" fill="none" stroke="#A8742E" stroke-width="${n2(h * .07)}" stroke-linecap="round" opacity=".55"/>`; }
  const hl = []; for (let i = 0; i <= 8; i++) hl.push(g.P_(lerp(lerp(s0, s1, .06), lerp(s0, s1, .94), i / 8), -h * .62));
  return `<path d="${d}" fill="#E8C08A" stroke="#A8742E" stroke-width="${n2(Math.max(3, h * .16))}" stroke-linejoin="round"/>${gr}<path d="${ptsPath(hl, false)}" fill="none" stroke="#fff" stroke-width="${n2(h * .14)}" stroke-linecap="round" opacity=".5"/>`; }
function stickSvg(o = {}) { const a = o.a || 260, h = o.h || 30, deg = o.bend || 0, crack = o.crack || 0, snap = o.snap || 0;
  if (snap > 0) { const dr = 16 * snap, gp = a * .06 * snap; return `<g transform="translate(${n2(-gp)} ${n2(h * .5 * snap)}) rotate(${n2(dr)} ${-a} 0)">${stickPiece(a, h, .01, -a, -a * .03, "b")}</g><g transform="translate(${n2(gp)} ${n2(h * .5 * snap)}) rotate(${n2(-dr)} ${a} 0)">${stickPiece(a, h, .01, a * .03, a, "a")}</g>`; }
  const g = stickPts(a, h, deg, -a, a), base = (1 - Math.cos(deg * Math.PI / 360)) / (Math.max(.0001, deg * Math.PI / 180) / (2 * a)); let s = `<g transform="translate(0 ${n2(-base * .5)})">` + stickPiece(a, h, deg, -a, a);
  if (crack > 0) { const p0 = g.P_(0, -h), dep = h * 1.5 * crack, wd = h * .34 * crack; s += `<path d="M${n2(p0[0] - wd)} ${n2(p0[1] - 1)} L${n2(p0[0] - wd * .2)} ${n2(p0[1] + dep * .45)} L${n2(p0[0] + wd * .1)} ${n2(p0[1] + dep * .62)} L${n2(p0[0] - wd * .1)} ${n2(p0[1] + dep)} L${n2(p0[0] + wd * .5)} ${n2(p0[1] + dep * .5)} L${n2(p0[0] + wd)} ${n2(p0[1] - 1)}z" fill="#FFF6E0" stroke="#8A5A22" stroke-width="${n2(h * .08)}" stroke-linejoin="round"/>`; }
  return s + `</g>`; }
// the small tray with the rubber band and the stick (the lock-in picture, the bench). origin = the middle of its foot. o.band / o.stick: false to leave one out; o.snapped
const trayBase = (w = 420, col = "#B98A55", line = "#7A4C26") => `<ellipse cx="0" cy="6" rx="${w * .52}" ry="12" fill="${P.ink}" opacity=".2" filter="url(#b4)"/><path d="M${-w / 2} -34 H${w / 2} L${w / 2 - 22} 0 H${-w / 2 + 22}z" fill="${col}" stroke="${line}" stroke-width="5" stroke-linejoin="round"/><path d="M${-w / 2 + 8} -34 H${w / 2 - 8}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>`;
function bandTray(o = {}) { return trayBase(440, "#F4F7FA", "#8E9AA8") + (o.band === false ? "" : `<g transform="translate(-112 -40) scale(.42 .2)">${bandSvg(0, 0, { sw: 40 })}</g>`)
    + (o.stick === false ? "" : `<g transform="translate(110 -44) scale(.36)">${o.snapped ? `<g transform="scale(1 .8)">${stickSvg({ snap: .5 })}</g>` : stickSvg()}</g>`); }
// the trays FLEXIBLE (green) and RIGID (blue). origin = the middle of the foot; 360 wide. inner = what lies on it
const ansTray = (kind, inner = "") => { const col = kind === "FLEXIBLE" ? GOODC : WEAKC, dk = kind === "FLEXIBLE" ? "#1F8A4C" : "#1F5FD0";
  return `<ellipse cx="0" cy="6" rx="200" ry="13" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-190 -78 H190 L168 0 H-168z" fill="${col}" stroke="${dk}" stroke-width="6" stroke-linejoin="round"/><path d="M-178 -78 H178" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>${inner}
    <rect x="-150" y="-58" width="300" height="50" rx="14" fill="#fff" opacity=".95"/>${T(0, -20, kind, 36, dk, { ls: 3 })}`; };

/* ---------- a tube clamped at its left end (origin = where it leaves the clamp), length L, bent by its weight: droop = the angle of its free end in degrees ---------- */
function tubeCurve(L, deg) { const n = 26, pts = [[0, 0]]; let x = 0, y = 0; for (let i = 1; i <= n; i++) { const u = (i - .5) / n, ph = deg * Math.PI / 180 * (1 - (1 - u) * (1 - u)); x += L / n * Math.cos(ph); y += L / n * Math.sin(ph); pts.push([x, y]); } return pts; }
const TUBEC = { rubber: ["#C8925A", "#7A4A22", "#F0C89A"], plastic: ["#8FD3F2", "#3F8FB8", "#EAF8FF"], metal: ["#C3CBD8", "#5E6B7C", "#FFFFFF"] };
function tubeSvg(kind, L, deg, o = {}) { const [c, dk, hi] = TUBEC[kind], pts = tubeCurve(L, deg), d = ptsPath(pts, false), sw = o.sw || 40, e = pts[pts.length - 1];
  return { end: e, svg: `<path d="${d}" fill="none" stroke="${dk}" stroke-width="${sw + 8}" stroke-linecap="butt"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="butt"/><path d="${d}" fill="none" stroke="${hi}" stroke-width="${n2(sw * .2)}" transform="translate(0 ${n2(-sw * .24)})" opacity=".8"/>
    <g transform="translate(${n2(e[0])} ${n2(e[1])}) rotate(${n2(deg)})"><ellipse rx="${n2(sw * .2)}" ry="${n2(sw / 2 + 3)}" fill="${dk}"/><ellipse rx="${n2(sw * .1)}" ry="${n2(sw * .26)}" fill="#2B2147" opacity=".7"/></g>` }; }
// the clamp on its post (origin = where the tube leaves the clamp); the post goes down to y = foot
const tubeClamp = (foot = 300) => `<rect x="-86" y="-16" width="26" height="${foot + 16}" rx="8" fill="url(#vdSteel)" stroke="#5E6B7C" stroke-width="3"/><rect x="-104" y="-40" width="110" height="80" rx="12" fill="#39435A" stroke="#2B2147" stroke-width="4"/><rect x="-96" y="-32" width="94" height="14" rx="5" fill="#6C7A98"/><circle cx="-50" cy="6" r="13" fill="${P.sun}" stroke="#2B2147" stroke-width="4"/><path d="M-50 -2 V14" stroke="#2B2147" stroke-width="4"/>`;
// the small hook weight that hangs on a tube's free end (origin = where its string leaves the tube)
const hookWeight = () => `<path d="M0 0 V46" stroke="#5E6B7C" stroke-width="4"/><path d="M0 46 q10 0 10 9" fill="none" stroke="#5E6B7C" stroke-width="4"/><rect x="-26" y="58" width="52" height="60" rx="10" fill="url(#vdBrass)" stroke="#8E6416" stroke-width="4"/><path d="M-14 66 V110" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/><rect x="-10" y="50" width="20" height="12" rx="4" fill="#8E6416"/>`;

/* ====================================================================================================================================
   The hidden animals (SERIES_FORMAT section 6: cute AND alive; true shapes: a spider has 8 legs and 2 body parts, a caterpillar has a long
   soft body of segments that arches up and stretches out as it inches along).
   ==================================================================================================================================== */
// the spider: origin = the middle of its body; about 100 px wide at scale 1. It bobs on its thread (the caller moves it); here: legs wiggle, it blinks, wave = one leg waves
function spiderBody(t, wave = 0) { let legs = ""; const bl = aBlink(t, 1.3) < .5;
  for (const sg of [-1, 1]) for (let i = 0; i < 4; i++) { const wg = 5 * Math.sin(t * 3.1 + i * 1.4 + (sg > 0 ? 1 : 0)), up = sg > 0 && i === 0 ? wave : 0, a0 = [-46, -18, 14, 40][i], kx = sg * (34 + i * 2), ky = -6 + i * 9, ex = sg * (58 - Math.abs(i - 1.5) * 5), ey = lerp([-34, -6, 26, 46][i] + wg, -64 + 12 * Math.sin(t * 9), up);
      legs += `<path d="M${sg * 16} ${ky - 6} Q${n2(kx + sg * 10 * up)} ${n2(ky - 22 + a0 * .2 - 20 * up)} ${n2(ex)} ${n2(ey)}" fill="none" stroke="#3B2A5C" stroke-width="6.5" stroke-linecap="round"/>`; }
  return legs + `<ellipse cx="0" cy="12" rx="30" ry="27" fill="#5B4A8C" stroke="#3B2A5C" stroke-width="4"/><ellipse cx="-9" cy="4" rx="9" ry="6" fill="#fff" opacity=".28"/><path d="M-10 26 Q0 32 10 26" fill="none" stroke="#8B7BC8" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    <circle cx="0" cy="-20" r="23" fill="#6B59A6" stroke="#3B2A5C" stroke-width="4"/>${[-9, 9].map((x, i) => bl ? `<path d="M${x - 7} -22 q7 6 14 0" fill="none" stroke="#2B2147" stroke-width="3.5" stroke-linecap="round"/>` : `<circle cx="${x}" cy="-22" r="8.6" fill="#fff"/><circle cx="${x + 1}" cy="-21" r="5.2" fill="#2B2147"/><circle cx="${x + 3}" cy="-24" r="2.1" fill="#fff"/>`).join("")}
    <path d="M-7 -9 Q0 -3 7 -9" fill="none" stroke="#2B2147" stroke-width="3" stroke-linecap="round"/><circle cx="-17" cy="-12" r="4" fill="#FF8FB1" opacity=".7"/><circle cx="17" cy="-12" r="4" fill="#FF8FB1" opacity=".7"/>`; }
// the spider for the badge and the thumbnails: on its thread, bobbing (centred on 0, 0, about 200 px)
const spiderArt = (t) => { const b = 10 * Math.sin(t * 2.2); return `<path d="M0 -150 V${n2(-52 + b)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M0 -150 V${n2(-52 + b)}" stroke="#9AA6C0" stroke-width="2"/><g transform="translate(0 ${n2(8 + b)}) scale(1.5) rotate(${n2(3 * Math.sin(t * 1.1))})">${spiderBody(t, .5 + .5 * Math.sin(t * 1.5) > .8 ? 1 : 0)}</g>`; };
// the caterpillar: origin = the middle of its feet line; it faces +x; about 150 px long at scale 1. arch 0..1 = it humps up in the middle (inching)
function caterpillarBody(t, arch = 0) { const n = 6, bl = aBlink(t, 2.2) < .5, len = lerp(150, 104, arch); let s = "", feet = "";
  for (let i = n - 1; i >= 0; i--) { const u = i / (n - 1), x = -len / 2 + len * u, y = -20 - 30 * arch * Math.sin(Math.PI * u) - 1.5 * Math.sin(t * 5 + i), r = i === n - 1 ? 26 : 21 - (i === 0 ? 3 : 0);
    if (i < n - 1) feet += `<path d="M${n2(x - 6)} ${n2(y + r - 4)} v${n2(Math.max(2, -y - r + 6))} M${n2(x + 6)} ${n2(y + r - 4)} v${n2(Math.max(2, -y - r + 6))}" stroke="#2F8A4A" stroke-width="5" stroke-linecap="round"/>`;
    s = `<circle cx="${n2(x)}" cy="${n2(y)}" r="${r}" fill="${i === n - 1 ? "#8FDB5A" : i % 2 ? "#FFE15A" : "#7CCB4E"}" stroke="#2F8A4A" stroke-width="4"/>` + (i < n - 1 ? `<circle cx="${n2(x - 5)}" cy="${n2(y - 8)}" r="5" fill="#fff" opacity=".35"/>` : "") + s; }
  const hx = len / 2, hy = -22 - 1.5 * Math.sin(t * 5 + 5);
  return feet + s + `<g transform="translate(${n2(hx)} ${n2(hy)})"><path d="M-8 -22 Q-14 -40 -22 -42 M8 -22 Q10 -40 20 -44" fill="none" stroke="#2F8A4A" stroke-width="4" stroke-linecap="round"/><circle cx="-23" cy="-43" r="4.5" fill="#FF8FB1"/><circle cx="21" cy="-45" r="4.5" fill="#FF8FB1"/>
    ${[-8, 10].map((x) => bl ? `<path d="M${x - 7} -4 q7 6 14 0" fill="none" stroke="#2B2147" stroke-width="3.5" stroke-linecap="round"/>` : `<circle cx="${x}" cy="-4" r="8.4" fill="#fff"/><circle cx="${x + 2}" cy="-3" r="5" fill="#2B2147"/><circle cx="${x + 4}" cy="-6" r="2" fill="#fff"/>`).join("")}
    <path d="M-4 9 Q3 16 11 9" fill="none" stroke="#2B2147" stroke-width="3" stroke-linecap="round"/><circle cx="-16" cy="7" r="4" fill="#FF8FB1" opacity=".75"/><circle cx="19" cy="7" r="4" fill="#FF8FB1" opacity=".75"/></g>`; }
const catArch = (t) => Math.pow(.5 - .5 * Math.cos(t * 2.6), 1.4);
const caterpillarArt = (t) => `<rect x="-140" y="44" width="280" height="20" rx="10" fill="#3A8DFF" stroke="#1F5FD0" stroke-width="4"/><path d="M-128 50 H128" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/><g transform="translate(${n2(-8 + 10 * Math.sin(t * 1.3))} 44) scale(1.22)">${caterpillarBody(t, catArch(t))}</g>`;
HIDDEN[1] = PART === 1 ? spiderArt : caterpillarArt;

/* ====================================================================================================================================
   BG.voiddeck: the void deck of an HDB block (static, baked). The lift lobby wall with a bank of metal letterboxes at the left, two pillars,
   a notice board and a bicycle rack at the right, the playground in sunlight beyond, the round stone table with its stone stools in front.
   long = the same place in long afternoon light (the cliffhanger).
   ==================================================================================================================================== */
const SPIDER = [430, 338];                          // the spider on its thread, between the letterboxes and the pillar (world)
const miniSlide = () => `<path d="M0 0 V-150 M90 0 V-150" stroke="#D8452E" stroke-width="9"/><path d="M-14 -150 L45 -200 L104 -150z" fill="#2EA3A0"/><rect x="-6" y="-104" width="102" height="10" fill="#F2B84B"/><path d="M96 -100 Q170 -90 230 0" fill="none" stroke="#F2B84B" stroke-width="20" stroke-linecap="round"/><path d="M-6 -100 L-50 0" stroke="#3A8DFF" stroke-width="8"/>`;
const miniSwing = () => `<path d="M0 0 L40 -170 L80 0 M260 0 L220 -170 L180 0 M40 -170 H220" fill="none" stroke="#3A8DFF" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/><path d="M100 -170 V-50 M140 -170 V-50" stroke="#6E7A88" stroke-width="3"/><rect x="92" y="-54" width="56" height="10" rx="4" fill="#D8452E"/>`;
function bicycle(col = "#E8604E") { return `<g fill="none" stroke-linecap="round"><circle cx="-62" cy="-44" r="44" stroke="#3B3B4A" stroke-width="8"/><circle cx="62" cy="-44" r="44" stroke="#3B3B4A" stroke-width="8"/><circle cx="-62" cy="-44" r="36" stroke="#C9D2E2" stroke-width="2"/><circle cx="62" cy="-44" r="36" stroke="#C9D2E2" stroke-width="2"/>
    <path d="M-62 -44 L-18 -110 H44 L62 -44 M-18 -110 L4 -44 L44 -110 M4 -44 H-62" stroke="${col}" stroke-width="9" stroke-linejoin="round"/><path d="M44 -110 L38 -136 M26 -138 H56" stroke="#3B3B4A" stroke-width="7"/><path d="M-18 -110 L-24 -128 M-40 -130 H-8" stroke="#3B3B4A" stroke-width="8"/></g>`; }
function deckBG(long) { const r = rndm(31); let s = "";
  // outside: the sky, the next blocks, trees, the playground in sunlight
  s += `<rect x="-192" y="-108" width="2304" height="780" fill="url(#${long ? "vdSkyL" : "cSky"})"/><g filter="url(#b2)">${hdbBlock(590, 300, 96, "#F6EBDD", "#E86A5A")}${hdbBlock(1010, 330, 20, "#F1ECF7", "#8B6BE8")}
    ${[[560, 430, 110], [640, 380, 90], [960, 420, 100], [1330, 400, 120], [1250, 450, 90], [900, 470, 70]].map(([x, y, rr], i) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="${i % 2 ? "#5BB86E" : "#4BA862"}"/>`).join("")}<rect x="548" y="470" width="24" height="130" fill="#7A5A3E"/><rect x="1322" y="460" width="26" height="140" fill="#7A5A3E"/></g>
    <rect x="-192" y="540" width="2304" height="46" fill="#8FD07A"/><rect x="-192" y="578" width="2304" height="64" fill="#E08A6E"/><ellipse cx="860" cy="612" rx="240" ry="22" fill="#57C4BE"/><ellipse cx="1180" cy="620" rx="130" ry="14" fill="#F2D06B"/>
    <g transform="translate(720 612) scale(.62)">${miniSlide()}</g><g transform="translate(1040 616) scale(.56)">${miniSwing()}</g><rect x="-192" y="-108" width="2304" height="780" fill="${long ? "#FF9E4A" : "#fff"}" opacity="${long ? .16 : .16}"/>`;
  // the floor of the void deck: pale tiles in perspective; sunlight comes in from outside
  s += `<rect x="-192" y="636" width="2304" height="560" fill="url(#vdFloor)"/>`; for (let i = -14; i <= 14; i++) s += `<path d="M${960 + i * 74} 636 L${960 + i * 290} 1200" stroke="#B5A995" stroke-width="2" opacity=".45"/>`;
  [644, 660, 684, 720, 774, 854, 972, 1140].forEach((y) => { s += `<path d="M-192 ${y} H2112" stroke="#B5A995" stroke-width="2" opacity=".45"/>`; });
  s += long ? `<path d="M570 636 H1375 L2112 900 V1188 H1500 L640 760z" fill="#FFE2A8" opacity=".55"/><path d="M470 640 H570 L1560 1188 H1250z" fill="#5A4A6E" opacity=".24" filter="url(#b4)"/><path d="M1375 640 H1475 L2112 880 V1010z" fill="#5A4A6E" opacity=".24" filter="url(#b4)"/><rect x="-192" y="-108" width="2304" height="1296" fill="#FF9838" opacity=".07"/>`
    : `<path d="M570 636 H1375 L1470 720 H480z" fill="#FFF8DC" opacity=".7"/><path d="M470 640 H570 L600 700 H486z" fill="#5A4A6E" opacity=".14" filter="url(#b4)"/><path d="M1375 640 H1475 L1500 700 H1392z" fill="#5A4A6E" opacity=".14" filter="url(#b4)"/>`;
  // the lift lobby wall with the letterboxes (left)
  let boxes = ""; for (let c = 0; c < 5; c++) for (let rw = 0; rw < 5; rw++) { const x = 70 + c * 62, y = 262 + rw * 56; boxes += `<rect x="${x}" y="${y}" width="56" height="50" rx="5" fill="url(#vdSteel)" stroke="#7C8898" stroke-width="2.5"/><rect x="${x + 10}" y="${y + 10}" width="36" height="6" rx="3" fill="#4A5564"/><rect x="${x + 18}" y="${y + 26}" width="20" height="13" rx="3" fill="#FFF8EA" stroke="#9AA6C0" stroke-width="1.5"/><circle cx="${x + 46}" cy="${y + 38}" r="3" fill="#4A5564"/>`; }
  s += `<rect x="-192" y="84" width="662" height="556" fill="#F4EDE1"/><rect x="-192" y="596" width="662" height="44" fill="#D9CDBA"/><rect x="-192" y="84" width="662" height="60" fill="#E9E0D0"/>
    <g filter="url(#dropS)"><rect x="56" y="248" width="334" height="296" rx="10" fill="#8E9AA8" stroke="#5E6B7C" stroke-width="4"/></g>${boxes}
    <g transform="translate(223 206)"><rect x="-150" y="-26" width="300" height="52" rx="10" fill="#2B2147"/><g transform="translate(-114 0)"><rect x="-22" y="-15" width="44" height="30" rx="4" fill="#FFF8EA"/><path d="M-22 -15 L0 4 L22 -15" fill="none" stroke="#2B2147" stroke-width="3.5"/></g>${T(24, 11, "LETTERBOXES", 28, "#fff", { ls: 2 })}</g>`;
  // the right wall: a notice board, the bicycle rack
  s += `<rect x="1470" y="84" width="650" height="556" fill="#F4EDE1"/><rect x="1470" y="596" width="650" height="44" fill="#D9CDBA"/><rect x="1470" y="84" width="650" height="60" fill="#E9E0D0"/>
    <g filter="url(#dropS)"><rect x="1540" y="210" width="310" height="230" rx="10" fill="#3F8F6A" stroke="#8A5A36" stroke-width="12"/></g>${[[1562, 232, 100, 76, "#FFF8EA"], [1676, 236, 76, 110, "#FFE9A8"], [1764, 232, 70, 80, "#DDF4FF"], [1564, 328, 96, 84, "#FFD3E0"], [1764, 330, 70, 82, "#FFF8EA"]].map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}"/><path d="M${x + 12} ${y + 22} h${w - 24} M${x + 12} ${y + 38} h${w - 40}" stroke="#8D97B2" stroke-width="4" stroke-linecap="round"/><circle cx="${x + w / 2}" cy="${y + 8}" r="5" fill="#E8604E"/>`).join("")}
    <g transform="translate(1610 690) scale(.8)">${bicycle("#E8604E")}</g><g transform="translate(1780 690) scale(.8)">${bicycle("#3A8DFF")}</g>${[1530, 1700].map((x) => `<path d="M${x} 694 V600 Q${x} 580 ${x + 20} 580 Q${x + 40} 580 ${x + 40} 600 V694" fill="none" stroke="#8E9AA8" stroke-width="10" stroke-linecap="round"/>`).join("")}`;
  // the ceiling slab and its beams, two round lights
  s += `<rect x="-192" y="-108" width="2304" height="180" fill="url(#vdCeil)"/><rect x="-192" y="60" width="2304" height="26" fill="#B9B0A2"/>${[-60, 520, 1425, 1990].map((x) => `<rect x="${x - 60}" y="-108" width="120" height="172" fill="#D8D1C5" opacity=".7"/>`).join("")}${[760, 1180].map((x) => `<ellipse cx="${x}" cy="40" rx="54" ry="12" fill="#FFFBEA" stroke="#B9B0A2" stroke-width="4"/>`).join("")}`;
  // two pillars, each with a coloured band; the block's number on the right one
  const pillar = (x) => `<rect x="${x - 50}" y="72" width="100" height="576" fill="#FBF7EE"/><rect x="${x - 50}" y="72" width="22" height="576" fill="#fff"/><rect x="${x + 26}" y="72" width="24" height="576" fill="#E3DACA"/><rect x="${x - 54}" y="520" width="108" height="130" fill="#E86A5A"/><rect x="${x - 54}" y="520" width="108" height="12" fill="#F58D7C"/>`;
  s += pillar(520) + pillar(1425) + `<g transform="translate(1425 250)"><rect x="-40" y="-60" width="80" height="120" rx="8" fill="#2B2147"/>${T(0, -14, "BLK", 24, "#fff", { ls: 2 })}${T(0, 34, "9", 50, P.sun)}</g>`;
  // the round stone table, with stone stools
  const stool = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-120" y="0" width="240" height="260" fill="#CFC6B6"/><rect x="-120" y="0" width="60" height="260" fill="#DAD2C4"/><rect x="70" y="0" width="50" height="260" fill="#BDB3A2"/><ellipse cx="0" cy="0" rx="120" ry="30" fill="url(#vdStone)" stroke="#B5AA97" stroke-width="4"/></g>`;
  let speck = ""; for (let i = 0; i < 150; i++) { const an = r() * 6.283, rr = Math.sqrt(r()), x = 960 + Math.cos(an) * rr * 800, y = 862 + Math.sin(an) * rr * 108; speck += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + r() * 3)}" fill="${["#B9AE9A", "#D9A08A", "#8FA5A0", "#fff"][i % 4]}" opacity=".55"/>`; }
  s += stool(610, 724, .8) + stool(1310, 724, .8) + `<ellipse cx="960" cy="1120" rx="900" ry="60" fill="${P.ink}" opacity=".2" filter="url(#b10)"/><path d="M720 960 Q760 1080 700 1188 H1220 Q1160 1080 1200 960z" fill="#C4BAA9"/><path d="M720 960 Q760 1080 700 1188 H840 Q860 1080 830 960z" fill="#D3CABB"/>
    <ellipse cx="960" cy="908" rx="842" ry="124" fill="#BFB5A4"/><rect x="118" y="862" width="1684" height="46" fill="#BFB5A4"/><ellipse cx="960" cy="862" rx="842" ry="124" fill="url(#vdStone)" stroke="#fff" stroke-width="4"/>${speck}
    <path d="M330 800 Q960 730 1590 800" fill="none" stroke="#fff" stroke-width="22" opacity=".3" stroke-linecap="round"/>` + stool(540, 1066, 1.05) + stool(1380, 1066, 1.05);
  return s; }
BG.voiddeck = () => deckBG(false);
BG.voiddeckL = () => deckBG(true);
// the live things over the baked set: the spider on its thread (hide 0 = seen, 1 = not there), wave = it waves one leg
const spiderOnThread = (t, wave = 0, k = 1) => { const b = 9 * Math.sin(t * 2.1) + 3 * Math.sin(t * 5.3), y = SPIDER[1] + b; return `<path d="M${SPIDER[0]} 86 V${n2(y - 30 * k)}" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".9"/><path d="M${SPIDER[0]} 86 V${n2(y - 30 * k)}" stroke="#8E9AA8" stroke-width="1.5"/><g transform="translate(${SPIDER[0]} ${n2(y)}) scale(${n2(.66 * k)}) rotate(${n2(4 * Math.sin(t * 1.05))})">${spiderBody(t, wave)}</g>`; };
/* deckView(t, o, cam): the void deck with what stands on the table. o.long (the long-shadow set), o.spider: false to hide, o.wave,
   o.back / o.items / o.front (world svg), o.stand (testStand options, or false), o.bag (false | 0..1 full), o.tray, o.flat, o.board (board3 options or false), o.dim */
const DK = { bag: 400, tray: 668, stand: 960, flat: 1262, board: 1520 };
function deckView(t, o = {}, cam = [1, 960, 540]) {
  return CAM(bg(o.long ? "voiddeckL" : "voiddeck") + (o.spider === false ? "" : spiderOnThread(t, o.wave || 0)) + (o.back || "")
    + (o.bag === false || o.bag === undefined ? "" : TF(o.bagX || DK.bag, TYD + 20, .78, fabricBag(o.bag === true ? 0 : o.bag))) + (o.tray ? TF(DK.tray, TYD + 30, .9, weightTray(o.tray === true ? 8 : o.tray)) : "")
    + (o.stand === false ? "" : TF(DK.stand, TYD, .82, testStand(o.stand || {}))) + (o.flat ? TF(DK.flat, TYD + 24, .9, stripsFlat()) : "") + (o.items || "")
    + (o.board ? TF(o.boardX || DK.board, TYD + 20, o.boardS || .5, board3(t, o.board)) : "") + (o.front || ""), cam[0], cam[1], cam[2]); }
const CAMD = [1.04, 960, 600];

/* ====================================================================================================================================
   BG.playground: the playground beside the block, late afternoon (static, baked): the HDB block behind, trees, the rubber floor, a slide
   with a blue handrail (left), a swing (right), a long wooden bench in front where the tests stand.
   ==================================================================================================================================== */
const CATP = [470, 428], RAIL = [[360, 372], [640, 520]];     // the caterpillar on the slide's handrail (world): it inches along the rail
BG.playground = () => { const r = rndm(47); let s = `<rect x="-192" y="-108" width="2304" height="800" fill="url(#pgSky)"/>`;
  s += `<g filter="url(#b2)">${hdbBlock(120, 1680, -150, "#F6EBDD", "#E86A5A")}<rect x="120" y="470" width="1680" height="150" fill="#5A4E6E"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${150 + i * 200}" y="470" width="70" height="150" fill="#FBF7EE"/><rect x="${150 + i * 200}" y="560" width="70" height="60" fill="#E86A5A"/>`).join("")}<rect x="120" y="456" width="1680" height="18" fill="#D9CDBA"/>
    ${[[-60, 420, 170], [60, 330, 130], [1880, 400, 180], [1990, 300, 140], [1760, 470, 110]].map(([x, y, rr], i) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="${i % 2 ? "#5BB86E" : "#4BA862"}"/>`).join("")}<rect x="-70" y="500" width="34" height="140" fill="#7A5A3E"/><rect x="1880" y="500" width="36" height="140" fill="#7A5A3E"/></g>
    <rect x="-192" y="-108" width="2304" height="800" fill="#FFE2B8" opacity=".42"/><rect x="-192" y="600" width="2304" height="40" fill="#8FD07A"/>`;
  // the rubber floor: terracotta with a teal island and a yellow sun shape, fine speckles
  s += `<rect x="-192" y="628" width="2304" height="570" fill="url(#pgFloor)"/><ellipse cx="560" cy="700" rx="520" ry="66" fill="#3FAFA6"/><ellipse cx="1560" cy="716" rx="330" ry="50" fill="#F2C860"/><path d="M-192 1010 Q600 930 1200 1000 T2112 960 V1200 H-192z" fill="#3FAFA6" opacity=".9"/>`;
  for (let i = 0; i < 260; i++) s += `<circle cx="${n2(-192 + r() * 2304)}" cy="${n2(632 + r() * 560)}" r="${n2(1.5 + r() * 2.5)}" fill="${i % 3 ? "#fff" : "#2B2147"}" opacity=".16"/>`;
  s += `<path d="M300 640 L1700 1188 H2112 V820z" fill="#5A3A4E" opacity=".1"/>`;
  // the swing (right, behind)
  s += `<g transform="translate(1330 706)"><ellipse cx="190" cy="8" rx="250" ry="16" fill="${P.ink}" opacity=".18" filter="url(#b4)"/><path d="M0 0 L60 -330 L120 0 M380 0 L320 -330 L260 0 M60 -330 H320" fill="none" stroke="#3A8DFF" stroke-width="16" stroke-linejoin="round" stroke-linecap="round"/><path d="M60 -330 H320" stroke="#8FC0FF" stroke-width="5" stroke-linecap="round" transform="translate(0 -4)"/></g>`;
  // the slide (left): steps, a platform with a roof, the yellow chute, the BLUE HANDRAIL along the top of the chute
  s += `<g><ellipse cx="520" cy="712" rx="330" ry="18" fill="${P.ink}" opacity=".2" filter="url(#b4)"/>
    <path d="M250 704 V330 M430 704 V330" stroke="#D8452E" stroke-width="18" stroke-linecap="round"/><path d="M222 334 L340 240 L458 334z" fill="#2EA3A0" stroke="#1C7774" stroke-width="5" stroke-linejoin="round"/><path d="M250 330 L340 260" stroke="#57C4BE" stroke-width="8" opacity=".7"/>
    <path d="M120 704 L250 470" stroke="#3A8DFF" stroke-width="14" stroke-linecap="round"/><path d="M168 704 L286 492" stroke="#3A8DFF" stroke-width="14" stroke-linecap="round"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${132 + i * 26} ${680 - i * 46} h46" stroke="#F2B84B" stroke-width="10" stroke-linecap="round"/>`).join("")}
    <rect x="236" y="462" width="208" height="20" rx="8" fill="#F2B84B" stroke="#B5791F" stroke-width="4"/><path d="M250 400 H430" stroke="#D8452E" stroke-width="10"/>
    <path d="M430 478 Q560 478 640 600 Q690 680 800 700" fill="none" stroke="#B5791F" stroke-width="64" stroke-linecap="round"/><path d="M430 478 Q560 478 640 600 Q690 680 800 700" fill="none" stroke="#F7CB55" stroke-width="54" stroke-linecap="round"/><path d="M440 464 Q560 462 636 566" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".5"/>
    <path d="M446 432 V470 M560 458 V500 M640 524 V590" stroke="#1F5FD0" stroke-width="9" stroke-linecap="round"/><path d="M${RAIL[0][0]} ${RAIL[0][1]} L${RAIL[1][0]} ${RAIL[1][1]}" stroke="#1F5FD0" stroke-width="22" stroke-linecap="round"/><path d="M${RAIL[0][0]} ${RAIL[0][1]} L${RAIL[1][0]} ${RAIL[1][1]}" stroke="#3A8DFF" stroke-width="14" stroke-linecap="round"/><path d="M${RAIL[0][0] + 6} ${RAIL[0][1] - 3} L${RAIL[1][0] - 6} ${RAIL[1][1] - 9}" stroke="#BFE0FF" stroke-width="3.5" stroke-linecap="round"/><path d="M${RAIL[0][0]} ${RAIL[0][1]} V470" stroke="#1F5FD0" stroke-width="9" stroke-linecap="round"/></g>`;
  // the long wooden bench in front (things stand on it at y = TYP)
  let slats = ""; for (let i = 0; i < 5; i++) { const y0 = 764 + i * 28, y1 = y0 + 24, k0 = (y0 - 764) / 140, k1 = (y1 - 764) / 140; slats += `<path d="M${n2(lerp(150, 40, k0))} ${y0} H${n2(lerp(1770, 1880, k0))} L${n2(lerp(1770, 1880, k1))} ${y1} H${n2(lerp(150, 40, k1))}z" fill="url(#cWood)" stroke="#7A4C26" stroke-width="3"/>${wgrain(lerp(150, 40, k0) + 40, lerp(1770, 1880, k0) - 40, y0 + 12, 9, 60 + i, "#7A4C26", .35)}`; }
  s += `<ellipse cx="960" cy="1090" rx="980" ry="44" fill="${P.ink}" opacity=".2" filter="url(#b10)"/><path d="M190 930 V1090 M1730 930 V1090" stroke="url(#cSteelH)" stroke-width="34"/><path d="M230 780 V930 M1690 780 V930" stroke="#6E7A88" stroke-width="18" opacity=".5"/>${slats}<path d="M40 904 H1880 V934 Q1880 944 1870 944 H50 Q40 944 40 934z" fill="#A8743C" stroke="#7A4C26" stroke-width="3"/>`;
  return s; };
// the live things over the baked playground: the swing's seat sways a little; the caterpillar inches along the handrail
const catOnRail = (t, k = 1) => { const u = .5 + .32 * Math.sin(t * .42), x = lerp(RAIL[0][0], RAIL[1][0], u), y = lerp(RAIL[0][1], RAIL[1][1], u), ang = Math.atan2(RAIL[1][1] - RAIL[0][1], RAIL[1][0] - RAIL[0][0]) * 180 / Math.PI, dir = Math.cos(t * .42) >= 0 ? 1 : -1;
  return `<g transform="translate(${n2(x)} ${n2(y - 11)}) rotate(${n2(ang)}) scale(${n2(.5 * k * dir)} ${n2(.5 * k)})">${caterpillarBody(t, catArch(t))}</g>`; };
const catXY = (t) => { const u = .5 + .32 * Math.sin(t * .42); return [lerp(RAIL[0][0], RAIL[1][0], u), lerp(RAIL[0][1], RAIL[1][1], u) - 22]; };
const swingSeat = (t) => { const a = 5 * Math.sin(t * 1.5); return `<g transform="translate(1520 376) rotate(${n2(a)})"><path d="M-40 0 V230 M40 0 V230" stroke="#6E7A88" stroke-width="5"/><rect x="-56" y="226" width="112" height="18" rx="7" fill="#D8452E" stroke="#8E2A1A" stroke-width="4"/></g>`; };
const PK = { stand: 960, tray: 560, board: 1440 };
/* playView(t, o, cam): o.cat: false to hide; o.stand (testStand options, or false / undefined = none), o.board (board3 options), o.items, o.back, o.front */
function playView(t, o = {}, cam = [1, 960, 540]) {
  return CAM(bg("playground") + swingSeat(t) + (o.cat === false ? "" : catOnRail(t)) + (o.back || "") + (o.stand ? TF(o.standX || PK.stand, TYP, .78, testStand(o.stand === true ? {} : o.stand)) : "") + (o.items || "")
    + (o.board ? TF(o.boardX || PK.board, TYP + 14, o.boardS || .5, board3(t, o.board)) : "") + (o.front || ""), cam[0], cam[1], cam[2]); }

/* ====================================================================================================================================
   Small pictures: the five property tiles (the book's list, 3.11), the goal icons, the "pulled" / "pushed" pictures.
   ==================================================================================================================================== */
const PROP5 = [["strength", (k) => `<rect x="-60" y="-78" width="120" height="14" rx="6" fill="#6C7A98"/><rect x="-17" y="-66" width="34" height="70" fill="#fff" stroke="#9AA6C0" stroke-width="4"/><path d="M-17 -44 h34 M-17 -22 h34" stroke="${PAPERL}" stroke-width="3"/><path d="M0 4 V30" stroke="#5E6B7C" stroke-width="5"/><g transform="translate(0 44) scale(1.1 2.6)">${weightDisc(76, 10)}</g><g transform="translate(0 70) scale(1.1 2.6)">${weightDisc(76, 10)}</g>`],
  ["flexibility", (k) => `<rect x="-86" y="-40" width="34" height="80" rx="8" fill="#39435A"/><g transform="translate(-52 -6)">${tubeSvg("rubber", 150, 62, { sw: 26 }).svg}</g>`],
  ["float or sink", (k) => `<path d="M-74 -40 H74 L64 76 H-64z" fill="#DDF4FF" stroke="#6FA8C9" stroke-width="5" stroke-linejoin="round"/><path d="M-71 -8 H71 L64 76 H-64z" fill="#7CC7F2" opacity=".75"/><rect x="-48" y="-30" width="44" height="34" rx="6" fill="#E8C08A" stroke="#A8742E" stroke-width="4"/><circle cx="34" cy="56" r="15" fill="#AEB7C4" stroke="#5E6B7C" stroke-width="4"/><path d="M-66 -8 q11 -8 22 0 t22 0 t22 0 t22 0 t22 0 t22 0" fill="none" stroke="#fff" stroke-width="4"/>`],
  ["waterproof", (k) => `<path d="M-84 40 L70 -10 L84 30 L-70 80z" fill="#FFD75A" stroke="#C9922E" stroke-width="5" stroke-linejoin="round"/><path d="M-10 -78 Q22 -34 14 -18 Q6 -2 -10 -2 Q-26 -2 -34 -18 Q-42 -34 -10 -78z" fill="#5FB0FF" stroke="#1F5FD0" stroke-width="5" transform="translate(4 14)"/><ellipse cx="-12" cy="-12" rx="6" ry="10" fill="#fff" opacity=".7"/><path d="M-50 70 q8 -12 16 0 M10 50 q8 -12 16 0" fill="none" stroke="#5FB0FF" stroke-width="5" stroke-linecap="round"/>`],
  ["transparency", (k) => `<path d="M-40 0 L60 -62 V62z" fill="#FFE27A" opacity=".75"/><rect x="-90" y="-22" width="58" height="44" rx="10" fill="#E8604E" stroke="#8E2A1A" stroke-width="4"/><rect x="-40" y="-30" width="18" height="60" rx="6" fill="#FFD75A" stroke="#8E2A1A" stroke-width="4"/><rect x="22" y="-76" width="18" height="152" rx="6" fill="#BFE6FF" stroke="#6FA8C9" stroke-width="5" opacity=".9"/><path d="M40 -44 L84 -62 M40 0 H88 M40 44 L84 62" stroke="#FFC83A" stroke-width="7" stroke-linecap="round"/>`]];
// one tile, 270 x 300, origin = its middle. lit 0..1, dim 0..1
const propTile = (i, lit = 0, dim = 0) => `<g opacity="${n2(1 - .62 * dim)}">${lit > .03 ? `<rect x="-146" y="-166" width="292" height="332" rx="40" fill="${P.sun}" opacity="${n2(Math.min(1, lit))}" filter="url(#b10)"/>` : ""}<g filter="url(#dropS)"><rect x="-135" y="-155" width="270" height="310" rx="32" fill="#fff" stroke="${lit > .3 ? P.sun : "#E3C9A8"}" stroke-width="7"/></g><g transform="translate(0 -38)">${PROP5[i][1]()}</g>
  <rect x="-121" y="78" width="242" height="60" rx="18" fill="${P.ink}"/>${T(0, 119, PROP5[i][0], PROP5[i][0].length > 11 ? 31 : 36, "#fff")}</g>`;
// goal icons (about 120 px, centred)
const icoProperty = () => TF(-50, 0, .86, eyeIcon(0)) + TF(50, 0, .86, counterIcon(0, 1));
const icoStrength = () => `<g transform="scale(.62)">${PROP5[0][1]()}</g>`;
const icoCups = () => TF(-46, 42, .62, metalCup()) + TF(50, 42, .62, glassPieces(1));
const icoBand = () => `<g transform="translate(0 -10) scale(.4)">${bandSvg(1, 0, { sw: 44 })}</g>`;
const icoTrays = () => `<g transform="scale(1.6)"><rect x="-78" y="-18" width="70" height="36" rx="9" fill="${GOODC}" stroke="#1F8A4C" stroke-width="4"/><rect x="8" y="-18" width="70" height="36" rx="9" fill="${WEAKC}" stroke="#1F5FD0" stroke-width="4"/></g>`;
const icoNotSame = () => `<g transform="scale(1.25)"><g transform="translate(-44 0) scale(.5)">${stripSvg("paper", { x: 0, y0: -70, y1: 70, w: 50, bend: 26 })}</g><g transform="translate(40 0) scale(.5)">${stripSvg("paper", { x: 0, y0: -70, y1: 70, w: 50, tear: 1, gap: 14 })}</g>${T(0, 12, "≠", 44, P.ink)}</g>`;
// under Mark Sentence 2 (strength): "pulled" (the fabric strip pulled by its weights) and "pushed" (a gloved hand pushes down on a stone stool)
const pullPic = () => `<circle r="96" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/><rect x="-60" y="-78" width="120" height="14" rx="6" fill="#6C7A98"/><g transform="translate(0 6)">${stripSvg("fabric", { x: 0, y0: -72, y1: 6, w: 38, taut: 1 })}</g><path d="M0 14 V30" stroke="#5E6B7C" stroke-width="5"/>${[0, 1, 2].map((i) => TF(0, 62 - i * 11, .86, weightDisc())).join("")}<path d="M52 -30 V26 l-10 -12 m10 12 l10 -12" fill="none" stroke="${P.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
const pushPic = (u = 0) => `<circle r="96" fill="#FFF8EA" stroke="${P.ink}" stroke-width="5"/><clipPath id="ppc"><circle r="92"/></clipPath><g clip-path="url(#ppc)"><rect x="-54" y="30" width="108" height="80" fill="#CFC6B6"/><rect x="-54" y="30" width="26" height="80" fill="#DAD2C4"/><ellipse cx="0" cy="30" rx="54" ry="14" fill="#F4EFE6" stroke="#B5AA97" stroke-width="4"/><g transform="translate(0 ${n2(18 - 6 * u)}) rotate(-90) scale(.36)">${glovePinch(0)}</g></g><path d="M58 -40 V8 l-10 -12 m10 12 l10 -12" fill="none" stroke="${P.ink}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;

/* ====================================================================================================================================
   Part 2's pictures: the three-tube rig on the bench (small), the tile boards (the book's pair, p. 55), Momo's notes, the EP10 dare boards.
   ==================================================================================================================================== */
// the three tubes on one base, small (the bench): origin = the middle of the base's foot; 620 wide. k = [droop 0..1 for each]
function tubeRig(k = [0, 0, 0]) { let s = `<ellipse cx="0" cy="4" rx="330" ry="14" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><rect x="-310" y="-26" width="620" height="26" rx="10" fill="#4A5670" stroke="#2B2147" stroke-width="4"/>`;
  TUBES.forEach(([kind, , dmax], i) => { const x = -230 + i * 205, tb = tubeSvg(kind, 150, dmax * k[i], { sw: 16 }); s += `<g transform="translate(${x} -210)"><g transform="scale(.5)">${tubeClamp(370)}</g>${tb.svg}${k[i] > .02 ? `<g transform="translate(${n2(tb.end[0] - 4)} ${n2(tb.end[1] + 4)}) scale(.5)">${hookWeight()}</g>` : ""}</g>`; });
  return s; }
PIC.rtile = () => pbg("#E8F8EC", "#CFEFD6", 96) + `<g transform="translate(0 6)"><path d="M-118 34 Q0 -92 118 34 L100 56 Q0 -52 -100 56z" fill="#3B3B4A" stroke="#1E1E2A" stroke-width="5" stroke-linejoin="round"/><path d="M-96 34 Q0 -64 96 34" fill="none" stroke="#6E6E80" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
  <g transform="translate(-128 44) rotate(24) scale(-.3 .3)">${glovePinch(0)}</g><g transform="translate(128 44) rotate(-24) scale(.3)">${glovePinch(0)}</g></g>`;
PIC.ctile = () => pbg("#E6F0FF", "#CFE0FA", 96) + `<ellipse cx="0" cy="78" rx="130" ry="9" fill="${P.ink}" opacity=".15"/><g transform="translate(0 20)"><path d="M-128 -34 L-10 -40 L-2 -8 L-16 14 L-8 40 L-124 46z" fill="#FBFBF6" stroke="#8D97B2" stroke-width="5" stroke-linejoin="round" transform="translate(-10 4) rotate(-5)"/><path d="M10 -42 L126 -36 L122 44 L12 40 L4 14 L18 -8z" fill="#FBFBF6" stroke="#8D97B2" stroke-width="5" stroke-linejoin="round" transform="translate(12 6) rotate(6)"/>
  <path d="M-110 -18 L-40 -20 M-104 26 L-36 24" stroke="#9FC3F2" stroke-width="5" stroke-linecap="round" transform="translate(-10 4) rotate(-5)"/><path d="M40 -22 L108 -18 M38 22 L104 24" stroke="#9FC3F2" stroke-width="5" stroke-linecap="round" transform="translate(12 6) rotate(6)"/></g>`;
// EP10's dare (reused by EP10's opening): a metal spoon on the bottom of a clear tub of water; a giant metal ship on the sea, its hull partly under the waterline
PIC.spoonTub = () => pbg("#FFF3DC", "#FFE3BC", 104) + `<path d="M-120 -86 H120 L104 100 H-104z" fill="#EAF8FF" stroke="#6FA8C9" stroke-width="6" stroke-linejoin="round"/><path d="M-116 -44 H116 L104 100 H-104z" fill="#6CBDEC" opacity=".8"/><path d="M-116 -44 q14 -9 29 0 t29 0 t29 0 t29 0 t29 0 t29 0 t29 0 t29 0" fill="none" stroke="#fff" stroke-width="5"/>
  <g transform="translate(-6 84) rotate(-4)"><ellipse cx="-52" cy="0" rx="32" ry="13" fill="url(#vdSteel)" stroke="#5E6B7C" stroke-width="4"/><rect x="-24" y="-6" width="104" height="12" rx="6" fill="url(#vdSteel)" stroke="#5E6B7C" stroke-width="4"/><ellipse cx="-56" cy="-3" rx="16" ry="5" fill="#fff" opacity=".7"/></g>${[[-60, 20], [40, -6], [70, 40]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${5 + i * 2}" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>`).join("")}<path d="M-100 -70 L-92 60" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>`;
PIC.ship = () => `<rect x="-165" y="-145" width="330" height="290" fill="#BFE6FF"/><circle cx="110" cy="-96" r="26" fill="#FFE27A"/><ellipse cx="-90" cy="-100" rx="50" ry="14" fill="#fff" opacity=".9"/><rect x="-165" y="40" width="330" height="105" fill="#2E86C9"/>
  <path d="M-150 -6 H150 L124 104 H-112z" fill="#5E6B7C" stroke="#2B2147" stroke-width="6" stroke-linejoin="round"/><path d="M-150 -6 H150 L143 22 H-144z" fill="#D8452E"/><rect x="-96" y="-56" width="150" height="50" fill="#F4F7FA" stroke="#2B2147" stroke-width="5"/><rect x="-60" y="-92" width="80" height="38" fill="#F4F7FA" stroke="#2B2147" stroke-width="5"/><rect x="70" y="-84" width="30" height="78" rx="6" fill="#E8604E" stroke="#2B2147" stroke-width="5"/>
  ${[-80, -48, -16, 16].map((x) => `<rect x="${x}" y="-44" width="20" height="16" rx="3" fill="#6CBDEC"/>`).join("")}<path d="M-165 40 H165 V145 H-165z" fill="#2E86C9" opacity=".62"/><path d="M-165 40 q14 -10 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0" fill="none" stroke="#fff" stroke-width="5"/>`;
// Momo's notes on an easel; 980 x 700; origin = the middle of the easel's feet. o: lit [3], badge [3], x (the cross on line 2), rub, write (0..1), fixing
const NOTE = [["Rubber bends the most,", "so it is the most flexible."], ["Paper bends easily,", "so paper is strong."], ["Metal bends the least,", "so it is the least flexible."]], NOTEFIX = ["Paper bends easily,", "so paper is flexible."];
function momoNotes(t, o = {}) { const lit = o.lit || [0, 0, 0], rub = o.rub || 0, wr = o.write === undefined ? 1 : o.write; let s = "";
  const pics = [`<g transform="translate(-58 -26)"><g transform="scale(.42)">${tubeClamp(60)}</g>${tubeSvg("rubber", 110, 62, { sw: 14 }).svg}</g>`, `<g transform="translate(-10 0)">${stripSvg("paper", { x: 0, y0: -52, y1: 52, w: 34, bend: 18 })}<g transform="translate(24 0) scale(.26)">${gloveFinger()}</g></g>`, `<g transform="translate(-58 0)"><g transform="scale(.42)">${tubeClamp(60)}</g>${tubeSvg("metal", 110, 2.5, { sw: 14 }).svg}</g>`];
  NOTE.forEach((ln, i) => { const y = -660 + i * 176, fx = i === 1 && o.fixing, txt = (L, col, extra = "") => L.map((l, j) => `<text x="-330" y="${-10 + j * 50}" font-family="Fredoka" font-weight="600" font-size="40" fill="${col}" ${extra}>${esc(l)}</text>`).join("");
    s += `<g transform="translate(0 ${y})">${lit[i] > .05 ? `<rect x="-446" y="-78" width="892" height="156" rx="24" fill="${P.sun}" opacity="${n2(.55 * lit[i])}"/>` : ""}<g transform="translate(-392 0) scale(${n2(1 + .18 * (o.badge || [0, 0, 0])[i])})"><circle r="40" fill="${P.momo}"/>${T(0, 18, i + 1, 52, "#fff")}</g>
      ${fx ? `<g opacity="${n2(1 - rub)}">${txt(ln, P.ink)}</g>` + txt(NOTEFIX, "#1F8A4C", `style="clip-path:inset(-40px ${n2(100 - 100 * wr)}% -40px 0)"`) : txt(ln, P.ink)}<g transform="translate(366 0)">${pics[i]}</g>${i === 1 && o.x ? TF(-458, -4, o.x, xBadge(24)) : ""}</g>${i < 2 ? `<path d="M-430 ${y + 88} H430" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".4"/>` : ""}`; });
  return `<ellipse cx="0" cy="4" rx="330" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-200 0 L-90 -400 M200 0 L90 -400 M0 0 V-300" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-330" y="-176" width="660" height="20" rx="10" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-490" y="-870" width="980" height="700" rx="26" fill="url(#gPaper)" stroke="${P.momo}" stroke-width="8"/></g>${T(0, -786, "Momo’s notes", 54, P.ink)}${s}${o.tick ? TF(430, -250, o.tick, tickBadge(40)) : ""}`; }
