// ep09drop.js: EP9's drop box and its two cups (drawn in ep09/voiddeck.js, EP9 Stage 2; copied unchanged) and its gradients, for the ONE
// held picture of Part 1 (script segment 8: "a held picture from Episode 9, in a plain frame (tag from Episode 9): the drop box, the glass
// cup broken inside it, the metal cup whole"). No glass is broken in EP12: this is EP9's picture, already live (EP9 p2.js recap, picture 2).
// PIC.ep9drop (for picBoard / a frame) and ep9DropPic(o) (the picture alone, origin = the middle of the box's foot; o.lab: its two labels).
const XDEFS9 = () => `${lg("vdSteel", [[0, "#F2F5F9"], [.5, "#C9D1DC"], [1, "#9AA5B4"]], 1, 0)}${lg("vdGlass", [[0, "#EAF8FF", .75], [1, "#BFE3F5", .55]], 1, 0)}${lg("vdTub", [[0, "#EAF6FF", .5], [1, "#CDE8F7", .34]])}${lg("vdStone", [[0, "#F8F4EC"], [1, "#E4DCCE"]])}`;
const ptsPath = (pts, close = true) => pts.map((p, i) => (i ? "L" : "M") + n2(p[0]) + " " + n2(p[1])).join(" ") + (close ? "z" : "");
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
// EP9's recap picture 2 (ep09/p2.js SC.lasttime): the metal cup whole on its side in the drop box, the glass cup in big pieces beside it
const ep9DropPic = (o = {}) => dropBox(`<g transform="translate(-70 -64) rotate(-90)">${metalCup()}</g><g transform="translate(140 -10)">${glassPieces(1)}</g>`)
  + (o.lab === false ? "" : TF(-170, -400, 1, tpill(0, 0, "not broken", 34, "#fff", P.ink, { w: 700 })) + TF(190, -400, 1, tpill(0, 0, "broken", 34, "#fff", P.ink, { w: 700 })));
PIC.ep9drop = () => pbg("#FBF4E4", "#EFE2C6", 118) + TF(0, 112, .42, ep9DropPic({ lab: false }));
