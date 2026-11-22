// v3.js: EP12 v3 (22 Nov 2026, the teacher's EP1 standard). Shared pieces drawn for the redo; loaded after shrink.js, before p1.js / p2.js.
// - the hidden animals' fun-fact pictures (the nest with its materials, colour-coded and labelled, in step with Basil's words)
// - lcPeek: a buddy's face peeking into a look-closer panel from a lower corner, reacting on the beats
// - riders: the three buddies, shrunk down, riding along in a journey, reacting at each stop (never covering what is shown)

/* ---------- the fun-fact card: a cream card on the stage, a FUN FACT tab, the picture, the labels joined to their parts ---------- */
function factCard(t, t0, x, y, w, h, inner, o = {}) { if (t < t0) return ""; const k = spring(t, t0, .5);
  return TF(x, y, k, `<g filter="url(#drop)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="34" fill="url(#gPaper)" stroke="#E3C9A8" stroke-width="7"/></g>`
    + TF(-w / 2 + 150, -h / 2, 1, tpill(0, 0, "FUN FACT!", 40, P.basil, "#fff", { w: 700, ls: 3 })) + inner) + popSpark(t, t0, x - w / 2 + 150, y - h / 2, 140); }
// a coloured label joined to its part by a line in the same colour (teacher, 22 Nov: tags point to what they describe, colour-coded)
const cLab = (t, t0, x, y, txt, px, py, col, size = 34) => t < t0 ? "" : OP(ramp(t, t0, .2), `<path d="M${x} ${y} L${px} ${py}" stroke="${col}" stroke-width="7" stroke-linecap="round"/><circle cx="${px}" cy="${py}" r="10" fill="${col}" stroke="#fff" stroke-width="3"/>`)
  + TF(x, y, spring(t, t0, .4), tpill(0, 0, txt, size, col, "#fff", { w: 700 }));
// Part 1: a mynah's nest in a hole: dry grass, twigs, string and bits of plastic (Singapore's mynahs line their nests with all of these)
function mynahNest(t, L) { const at = (w, d = 0) => (TL.lines[L] ? W(L, w) : 1e9) + d; let s = "";
  s += `<path d="M-250 120 Q-260 -40 -150 -60 Q0 -80 150 -60 Q260 -40 250 120 Q0 190 -250 120z" fill="#C9B79A" stroke="#8A7656" stroke-width="7"/><ellipse cx="0" cy="40" rx="220" ry="70" fill="#5B4A3A"/>`;   // the hole in the wall
  const r = rndm(7); for (let i = 0; i < 26; i++) { const a = -Math.PI * r(), x0 = Math.cos(a) * 200, y0 = 60 + Math.sin(a) * 50; s += `<path d="M${n2(x0)} ${n2(y0)} q${n2(60 - 120 * r())} ${n2(-30 + 40 * r())} ${n2(120 - 240 * r())} ${n2(-10 + 30 * r())}" stroke="${i % 3 ? "#D9C46A" : "#BFA94A"}" stroke-width="6" fill="none" stroke-linecap="round"/>`; }   // dry grass
  for (let i = 0; i < 6; i++) { const x0 = -200 + i * 70; s += `<path d="M${x0} ${80 - (i % 2) * 20} l${110 + 10 * (i % 3)} ${-30 + 14 * (i % 2)}" stroke="#7A5226" stroke-width="10" stroke-linecap="round"/>`; }   // twigs
  s += `<path d="M-120 40 q40 -40 80 0 t80 0 t60 10" stroke="#E8604E" stroke-width="7" fill="none" stroke-linecap="round"/>`;   // string
  s += `<path d="M90 20 l60 -22 l20 34 l-58 18z" fill="#7FC4F5" stroke="#3A86C8" stroke-width="5" stroke-linejoin="round"/><path d="M-170 70 l44 -10 l6 26 l-42 8z" fill="#FFFFFF" stroke="#9AA7BD" stroke-width="5" opacity=".95"/>`;   // bits of plastic
  s += TF(-10, 10, 1.5, mynahBird(t, {}));
  return s + cLab(t, at("dry", -.1), -330, -170, "dry grass", -150, 40, "#A8922E") + cLab(t, at("twigs", -.1), 300, -170, "twigs", 120, 66, "#7A5226") + cLab(t, at("string", -.1), -330, 190, "string", -60, 40, "#E8604E") + cLab(t, at("plastic", -.1), 320, 190, "bits of plastic", 140, 20, "#3A86C8"); }
// Part 2: a squirrel's nest (a drey) in the fork of a branch: strong twigs outside, a cut-away window shows the soft leaves inside
function squirrelNest(t, L) { const at = (w, d = 0, n = 0) => (TL.lines[L] ? W(L, w, n) : 1e9) + d; let s = "";
  s += `<path d="M-330 160 Q-100 120 60 40 Q160 -10 330 -60" stroke="#7A5226" stroke-width="34" fill="none" stroke-linecap="round"/><path d="M40 50 Q120 120 300 140" stroke="#7A5226" stroke-width="24" fill="none" stroke-linecap="round"/>`;
  s += `<circle cx="20" cy="-30" r="160" fill="#9A6E3E" stroke="#6A4520" stroke-width="7"/>`; const r = rndm(11); for (let i = 0; i < 34; i++) { const a = r() * Math.PI * 2, d = 40 + 115 * r(), x0 = 20 + Math.cos(a) * d, y0 = -30 + Math.sin(a) * d; s += `<path d="M${n2(x0)} ${n2(y0)} l${n2(50 - 100 * r())} ${n2(30 - 60 * r())}" stroke="#5E3F1E" stroke-width="7" stroke-linecap="round"/>`; }
  const ko = ss(at("soft", -.4), at("soft", .2), t);   // the window opens on "soft"
  if (ko > .01) { s += `<clipPath id="sqW"><circle cx="30" cy="-20" r="${n2(95 * ko)}"/></clipPath><g clip-path="url(#sqW)"><rect x="-80" y="-130" width="220" height="220" fill="#F3E6C0"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<ellipse cx="${n2(-50 + (i % 4) * 50)}" cy="${n2(-70 + (i >> 2) * 60 + 10 * (i % 2))}" rx="34" ry="16" fill="${i % 2 ? "#8DC26F" : "#B9D98A"}" stroke="#5E8F3E" stroke-width="3" transform="rotate(${-30 + i * 25} ${n2(-50 + (i % 4) * 50)} ${n2(-70 + (i >> 2) * 60)})"/>`).join("")}</g><circle cx="30" cy="-20" r="${n2(95 * ko)}" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="14 9"/>`; }
  s += TF(170, 90, 1.25, squirrelBody(t, { up: .6 }));
  return s + cLab(t, at("twigs", -.1), -300, -190, "strong twigs outside", -110, -110, "#7A5226") + cLab(t, at("leaves", -.1), 300, -210, "soft leaves inside", 60, -40, "#5E8F3E")
    + (t >= at("different", -.1) ? TF(0, 210, spring(t, at("different", -.1), .4), tpill(0, 0, "different materials, different jobs", 34, GOODC, "#fff", { w: 700 })) : ""); }
// the fact beat of a reveal: Basil pops in big at the right and says it; the card stands between him and the animal's circle
function factBeat(t, id, pic) { if (!TL.lines[id]) return ""; const L = TL.lines[id], t0 = L.t - .5;
  return factCard(t, t0 + .1, 1250, 430, 800, 540, TF(0, 40, 1.15, pic(t, id))) + buddy("basil", 1700, 1066, 380, t, { aura: true, flip: true, in: t0, poses: [[t0, "cheer"], [L.t - .14, "sit"], [L.end + .15, "cheer"]], nohop: true }); }

/* ---------- a buddy's face peeking into a look-closer panel from a lower corner (teacher, 22 Nov: "insert one of the pet buddies in, focusing
   on its face, looking shocked / agreeing"). Drawn inside the panel's clip by lookCloser (o.peek). side "l" / "r"; ev = [[t, pose], ...]
   (the reactions on the beats; between them it reacts to every sentence by itself). ---------- */
function lcPeek(t, s, pk) { if (!pk) return ""; const tin = s.t0 + 1.2 + (pk.dt || 0); if (t < tin - .05 || (pk.t1 && t > pk.t1 + .3)) return ""; const W_ = LCW, x0 = W_.x - W_.w / 2, y1 = W_.y + W_.h / 2, side = typeof pk.side === "function" ? pk.side(t) : pk.side;
  const h = pk.h || 470, up = eo((t - tin) / .45) * (pk.t1 ? 1 - ei((t - pk.t1) / .3) : 1), x = side === "l" ? x0 + (pk.dx || 170) : x0 + W_.w - (pk.dx || 170), y = y1 + h * (pk.dy || .5) + (1 - up) * h * .75;
  return buddy(pk.who, x, y, h, t, { poses: [[tin, "sit"], ...(pk.ev || [])], tag: false, shadow: false, flip: side === "r", nofx: false }); }

/* ---------- riders: the three buddies, shrunk down, riding along in a journey (teacher, 22 Nov: "Can we bring the 3 pet buddies along?").
   They sit along the bottom edge (no discs: they are IN the micro-world), small (h 150-170), never in the middle of the view; each stop gets
   its reactions (poses = per buddy [[t, pose]]); jolt = shake times. ---------- */
function riders(t, s, o = {}) { const tin = o.tin || s.t0 + .8, P0 = o.at || { pip: [210, 1040], basil: [1690, 1048], momo: [380, 1034] }; let out = "";
  for (const who of ["momo", "pip", "basil"]) { const [x, y] = P0[who], j = (o.jolts || []).reduce((a, tj) => a + (t >= tj && t < tj + .4 ? 1 : 0), 0);
    out += buddy(who, x, y, o.h || 165, t, { in: tin + ({ pip: 0, basil: .15, momo: .3 })[who], poses: (o.poses || {})[who] || [], flip: x > 960, tag: false, rim: "rimB", jump: (o.jolts || []).map((tj) => [tj, 34]), noreact: !!o.noreact }); }
  return out; }
