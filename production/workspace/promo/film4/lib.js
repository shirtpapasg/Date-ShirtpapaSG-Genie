// lib.js (promo film 4): copied from explained2/ep20/lib.js (the helpers, the v2 buddies with lip-sync, reactions, faceCam, bubbles); OUTCOMES emptied.
// lib.js: the engine's helpers (from EP1, adapted for EP5: key words; EP8: the new pace, a new term holds 2.0 s; EP10 to EP20: their key words; EP20: OUTCOMES `to`). Everything returns SVG strings and is a pure function of its arguments (a frame depends only on t).
// Needs kit/style.js (P, defs, T, pill, G, groundShadow, logoPill, hand, teddy, leaf ...), tl.js (TL) and spr/manifest.js (SPR).
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), lerp = (a, b, u) => a + (b - a) * u;
const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const eo = (u) => 1 - Math.pow(1 - clamp(u), 3), ei = (u) => clamp(u) ** 3, eio = (u) => ss(0, 1, u);
const ramp = (t, t0, d = .35) => eo((t - t0) / d);                       // 0 -> 1, ease-out arrival
const spring = (t, t0, d = .55) => { const u = (t - t0) / d; return u <= 0 ? 0 : 1 - Math.exp(-7.5 * u) * Math.cos(8 * u); };   // pop with overshoot
const wob = (t, t0, d = .5) => { const u = (t - t0) / d; return u <= 0 ? 0 : Math.exp(-4 * u) * Math.cos(10 * u + .5); };       // settle wobble after a hit
const pulse = (t, t0, a = .07, d = .3) => { const u = t - t0; return u < -a ? 0 : u < 0 ? ss(-a, 0, u) : Math.exp(-u / d * 3); };
const hop = (t, t0, d = .34, h = 1) => { const u = (t - t0) / d; return u <= 0 || u >= 1 ? 0 : 4 * u * (1 - u) * h; };          // an arc: up and down
const n2 = (v) => Math.round(v * 100) / 100;
const hash = (i, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
const rndm = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const lg = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</linearGradient>`;
const rg = (id, stops, cx = .5, cy = .5, r = .5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ""}/>`).join("")}</radialGradient>`;
const OP = (o, inner) => o <= .003 ? "" : o >= .997 ? inner : `<g opacity="${n2(o)}">${inner}</g>`;
const TF = (x, y, s, inner, rot = 0, sy) => `<g transform="translate(${n2(x)} ${n2(y)})${rot ? ` rotate(${n2(rot)})` : ""} scale(${n2(s)}${sy !== undefined ? " " + n2(sy) : ""})">${inner}</g>`;
// camera: zoom z about (cx, cy), then pan; depth scales the move (far 0.2, mid 1, near 1.6)
const CAM = (inner, z = 1, cx = 960, cy = 540, depth = 1) => { const k = 1 + (z - 1) * depth; return `<g transform="translate(${n2(960 + (960 - cx) * (k - 1))} ${n2(540 + (540 - cy) * (k - 1))}) scale(${n2(k * 1000) / 1000}) translate(-960 -540)">${inner}</g>`; };

/* ---------- the timeline ---------- */
const LN = (id) => TL.lines[id], LT = (id) => TL.lines[id].t, LE = (id) => TL.lines[id].end, MK = (n) => TL.marks[n];
const SCN = {}; TL.scenes.forEach((s) => { SCN[s.name] = s; });
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9-]/g, "");
function W(id, word, nth = 0) { const L = TL.lines[id]; if (!L) { console.error("no line", id); return 0; } const hits = L.words.filter((x) => norm(x.w) === word); if (!hits.length) { console.error("no word", word, "in", id); return L.t; } return (hits[nth] || hits[0]).a; }
function WE(id, word, nth = 0) { const L = TL.lines[id], hits = L.words.filter((x) => norm(x.w) === word); return hits.length ? (hits[nth] || hits[0]).b : L.end; }
const said = (id, t) => TL.lines[id].words.filter((w) => w.a <= t).length;    // how many words of the line have started
// the line a character is speaking at t (or null)
function speaking(who, t) { for (const id of TL.order) { const L = TL.lines[id]; if (L.who === who && t >= L.t - .04 && t < L.end + .05) return L; if (L.who === "chant" && who !== "heart" && t >= L.t && t < L.t + L.dur) return L; } return null; }
function mouthOf(who, t) { const L = speaking(who, t); if (!L) return 0; const tr = L.who === "chant" ? L.tracks[who] : L.mouth; const i = Math.floor((t - L.t) * 30 + 1 + 1e-6); return tr[i] || 0; }
function loud(who, t) { const L = speaking(who, t); if (!L || !L.open) return 0; const i = Math.floor((t - L.t) * 30 + 1e-6); return L.open[i] || 0; }
function nodOf(who, t) { const L = speaking(who, t); if (!L) return 0; let n = 0; if (L.who === "chant") { for (const w of L.words) n += pulse(t, w.a, .06, .22) * .5; return Math.min(n, 1.2); } for (const s of L.stress) n += pulse(t, s); return Math.min(n, 1.2); }

const PART = 1, HAS = (id) => !!TL.lines[id];
/* ---------- text ---------- */
const _cv = document.createElement("canvas").getContext("2d");
function tw(s, size, w = 700, fam = "Fredoka", ls = 0) { _cv.font = `${w} ${size}px "${fam}"`; return _cv.measureText(s).width + ls * s.length; }
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
// a soft pill sized to its text
function tpill(x, y, text, size = 32, fill = P.ink, ink = "#fff", o = {}) { const w = tw(text, size, o.w || 600, "Fredoka", o.ls || 0) + size * 1.5, h = size * 1.75;
  return `<g transform="translate(${n2(x)} ${n2(y)})" ${o.nosh ? "" : 'filter="url(#dropS)"'}><rect x="${n2(-w / 2)}" y="${-h / 2}" width="${n2(w)}" height="${h}" rx="${h / 2}" fill="${fill}" ${o.fo ? `opacity="${o.fo}"` : ""}/><rect x="${n2(-w / 2 + 6)}" y="${-h / 2 + 4}" width="${n2(w - 12)}" height="${h * .4}" rx="${h * .2}" fill="#fff" opacity=".14"/></g>` + T(n2(x), n2(y + size * .35), esc(text), size, ink, { w: o.w || 600, ls: o.ls }); }
// a label joined to its part by one plain line that touches it (style 7.8)
function label(x, y, text, px, py, size = 30) { return `<path d="M${x} ${y} L${px} ${py}" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="${px}" cy="${py}" r="6" fill="#fff"/>` + tpill(x, y, text, size, "#fff", P.ink); }
// location / tag pill: ink pill, sun dot, white then sun text
function lowerPill(x, y, a, b) { const wa = tw(a, 30, 600), wb = b ? tw(b, 30, 600) + 14 : 0, w = wa + wb + 86;
  return `<g filter="url(#dropS)"><rect x="${x}" y="${y}" width="${n2(w)}" height="62" rx="31" fill="${P.ink}" opacity=".9"/></g><circle cx="${x + 32}" cy="${y + 31}" r="9" fill="${P.sun}"/>` + T(x + 54, y + 41, `${esc(a)}${b ? `<tspan fill="${P.sun}" dx="14">${esc(b)}</tspan>` : ""}`, 30, "#fff", { a: "start", w: 600 }); }
// "speeded up" tag (time-lapse shots)
const speeded = (t, t0, t1, x = 1700, y = 1010) => OP(ramp(t, t0, .25) * (1 - ramp(t, t1, .25)), `<g transform="translate(${x} ${y})"><rect x="-128" y="-27" width="256" height="54" rx="27" fill="${P.ink}" opacity=".85"/><path d="M-98 -11 l14 11 l-14 11z M-82 -11 l14 11 l-14 11z" fill="${P.sun}"/>${T(18, 11, "speeded up", 30, "#fff", { w: 600 })}</g>`);

/* ---------- the buddies: the teacher's painted art as cut-out sprites ---------- */
// each buddy's SIGNATURE COLOUR (the teacher, 20 Nov: bright and saturated, not pastel; never green or blue: those mean LIVING / NON-LIVING)
P.pip = "#8B5CF6"; P.basil = "#14B8A6"; P.momo = "#FB7158";
const AURA = { pip: P.pip, basil: P.basil, momo: P.momo }, TINT = { pip: "#EDE4FF", basil: "#D5F7F2", momo: "#FFE3DC" }, BNAME = { pip: "Pip", basil: "Basil", momo: "Momo" };
// a small name tag: the name in white on the buddy's colour
const nameTag = (who, size = 32) => { const w = tw(BNAME[who], size, 700) + size * 1.5, h = size * 1.5; return `<g filter="url(#dropS)"><rect x="${n2(-w / 2)}" y="${n2(-h / 2)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(h / 2)}" fill="${P[who]}"/><rect x="${n2(-w / 2 + 3)}" y="${n2(-h / 2 + 3)}" width="${n2(w - 6)}" height="${n2(h - 6)}" rx="${n2(h / 2 - 3)}" fill="none" stroke="#fff" stroke-width="3" opacity=".85"/></g>` + T(0, n2(size * .35), BNAME[who], size, "#fff"); };
// EP15 v2 cast (prep_sprites.py): Momo v2 and Basil v2 have every pose (Basil also worried and laughing), so the old stand-ins are gone.
// Only "worried" (during a countdown, before the reveal) has no painting for Pip and Momo yet: it shows their thinking face.
const TRIAL = true;   // EP14 trial (teacher, 22 Nov): no aura discs; the buddies stand in the scene with a contact shadow
const POSE_SUB = { pip: { worried: "thinking" }, momo: { worried: "thinking" } };
const DISC_DX = { pip: -.06, basil: -.10, momo: -.08 };
/* v3 (teacher, 22 Nov: "no buddy ever frozen"): every buddy on screen reacts to every sentence someone else says. At each sentence start
   (Heart's or another buddy's) the buddy swaps to a reaction pose (squash, hard cut, overshoot, hop: never a cross-fade) chosen from what is
   said (a question: thinking; a "no / break / not": oops or surprised; an exclamation: cheer or surprised; else pointing / arms crossed or a
   nod-hop), holds it about 1.4 s, then pops back to the sitting (talking) sprite well before its own line. Explicit scene poses win: the
   auto reaction only runs while the scene's own pose is "sit". The three buddies are staggered so they never all pop on the same frame. */
const REACT_DLY = { pip: .12, basil: .27, momo: .42 };
let _trig = null;
function reactTriggers() { if (_trig) return _trig; const out = [];
  for (const id of TL.order) { const L = TL.lines[id]; if (!L || L.who === "chant" || !L.words || !L.words.length) continue; let st = true, cur = null;
    L.words.forEach((w, i) => { if (st) { cur = { t: w.a, who: L.who, id, txt: "" }; out.push(cur); } cur.txt += (cur.txt ? " " : "") + w.w; st = /[.!?]$/.test(w.w); }); }
  out.sort((a, b) => a.t - b.t); out.forEach((o, i) => { o.k = i; }); return (_trig = out); }
let _own = {};
function nextOwn(who, t) { const a = _own[who] || (_own[who] = TL.order.map((id) => TL.lines[id]).filter((L) => L && (L.who === who || (L.who === "chant"))).map((L) => L.t).sort((x, y) => x - y)); for (const x of a) if (x > t) return x; return 1e9; }
/* teacher, 22 Nov: "the pet buddies reactions [must] be logical and not random. The wrong answer should show shy face, whereas the
   correct one should be confident/smile. celebrate with hands high up only when achieved/learnt something new". */
let _learn = null;
function learnAt(t) { if (!_learn) { _learn = [];   // moments something new is learnt: a key word lands, a cycle/living tag lands, a mistake is fixed, "Now you know!"
    for (const [k, v] of Object.entries(TL.marks || {})) if (/^(kw_|v_|rule$)/.test(k))   /* EP20: a key word, a verdict, the rule written across the fridge card (the board complete). Not `rewrite`: Pip, whose mistake it is, stays shy */ _learn.push([v - .4, v + 4]);
    for (const s of TL.scenes || []) if (s.name === "nyk" || s.name === "kwrecap") _learn.push([s.t0, s.t1]); }
  return _learn.some(([a, b]) => t >= a && t < b); }
// EP20 (script section 3, OUTCOMES): Part 1 Round 1 (EP19's dare: answer 2, a push) Pip, Basil right / Momo (1, "attract means pull")
// wrong at ansglow (two right: the Buddies score too). HOLD ON! (Pip: "the ring must be broken") Basil, Momo right / Pip wrong at m903.
// Part 2 Round 1 (turn one magnet round: 2, they pull together) Momo, Pip right / Basil (1, "it still pushes") wrong at ansglow; Showdown
// (Pip's homework, line 3) Basil, Momo right / Pip wrong at Basil's reveal n804b. The two look-closer guesses (Basil: the middle; Momo: two
// North poles) score nothing and are shown by the peeking faces (peekEv, SCENES_TODO), not here.
// EP20 (teacher, 23 Nov: "the corrected buddy stays shy through the WHOLE fix; the right ones stay confident"): an outcome may carry `to`
// ("s:<scene>" its end, "l:<line>" its end, "m:<mark>"); the reaction then lasts until then instead of 4 s.
const OUTCOMES = [];   // film 4: no quiz rounds between the buddies
const outcomeEnd = (o, t0) => { if (!o.to) return t0 + 4; const [k, id] = o.to.split(":");
  const v = k === "s" ? (SCN[id] && SCN[id].t1) : k === "l" ? (HAS(id) ? LE(id) : undefined) : MK(id); return v === undefined ? t0 + 4 : Math.max(t0 + 4, v); };
function outcomeAt(who, t) { for (const o of OUTCOMES) { const [k, id] = o.at.split(":"), t0 = k === "m" ? MK(id) : (HAS(id) ? LT(id) : undefined); if (t0 === undefined || t < t0) continue; const t1 = outcomeEnd(o, t0); if (t > t1) continue;
    if (o.wrong.includes(who)) return { t0, t1, pose: "oops" };   // shy: paw on the head, a sheepish smile
    if (o.right.includes(who)) return { t0, t1, pose: SPR[`${who}_arms_crossed`] ? "arms_crossed" : "sit" }; }   // confident smile
  return null; }
function reactPose(who, txt, k) {   // teacher, 22 Nov: "the pet buddies movement are really random in some scene". A pose swap now only
  // answers something in the line: a question -> thinking; a problem word -> oops/surprised; a celebration -> cheer. Anything else: a nod.
  // EP15 (teacher, 23 Nov: "every reaction must have a reason"): one job per pose. The only automatic pose left is "thinking", right after a
  // real question; the viewer prompts ("Are you ready?", "Three fingers?", "One finger or more?") are not questions to think about.
  // Surprise, shyness, confidence and cheers are staged by the scenes (and OUTCOMES), never guessed from words.
  const q = /\?$/.test(txt) && !/^(are you ready|ready|arms crossed|one finger|two fingers|three fingers|more than one|show me)/i.test(txt.trim()) && txt.split(/\s+/).length >= 4;
  return q ? "thinking" : null; }
// only ONE listener answers a line with a pose (they take turns); the other nods; and no buddy swaps pose more than once in 6 s
function reactChosen(g) { const L = ["pip", "basil", "momo"].filter((w) => w !== g.who); return L[g.k % L.length]; }
function reactPoseAt(tr, i, who) { const g = tr[i]; if (g.who === who || reactChosen(g) !== who) return null; const ps = reactPose(who, g.txt, g.k); if (!ps || (ps === "cheer" && !learnAt(g.t))) return null;
  for (let j = i - 1; j >= 0 && g.t - tr[j].t < 6; j--) { const h = tr[j]; if (h.who !== who && reactChosen(h) === who && reactPose(who, h.txt, h.k)) return null; } return ps; }
// -> { t0, t1, pose (null = a nod-hop) } of the reaction running at t, or null
function reactAt(who, t, tsw, nxt, o) { const S = window._S; if (!S || o.noreact || o.still) return null; const T0 = Math.max(S.t0 - .05, o.in !== undefined ? o.in + .6 : -9), d = REACT_DLY[who] || .2;
  const tr = reactTriggers(); let i = -1; for (let j = tr.length - 1; j >= 0; j--) { if (tr[j].t + d <= t) { i = j; break; } } if (i < 0) return null;
  for (; i >= 0; i--) { const g = tr[i]; if (g.t < T0) return null; if (g.who === who) continue; const t0 = g.t + d; if (t0 < tsw + .7) return null;
    let nt = 1e9; for (let j = i + 1; j < tr.length; j++) if (tr[j].who !== who) { nt = tr[j].t + d; break; }
    const t1 = Math.min(t0 + 1.45, nt - .08, nextOwn(who, g.t) - .3, nxt - .2); if (t1 - t0 < .55) { if (t < t0 + .4) return { t0, t1: t0 + .4, pose: null }; continue; }
    const pose = reactPoseAt(tr, i, who); return { t0, t1, pose: pose && SPR[`${who}_${pose}`] ? pose : null, txt: g.txt }; }
  return null; }
function blinkAt(who, t) { const per = 3.9, ph = { pip: .9, basil: 2.1, momo: 3.0 }[who]; const k = Math.floor((t + ph) / per), tb = k * per - ph + hash(k, who.length) * 1.4; return t >= tb && t < tb + .1; }
/* buddy(who, x, y, h, t, o): feet at (x, y), sitting body height h.
   o.poses = [[time, pose], ...] (pose swaps POP with a squash and a stretch, never a cross-fade; default pose "sit")
   o.in = pop-in time; o.out = pop-out time; o.flip; o.aura (disc); o.rim; o.jump = [[t, height]] hops; o.rock = side-to-side rock amp (deg)
   o.mouth (0..2) / o.eyes "shut": a yawn or a doze in the sit pose (EP14); o.look = lean in degrees; o.k = extra scale; o.shadow = false to hide; o.still = no idle */
const SIZE_K = { basil: .94 };   // teacher, 23 Nov: keep the three in proportion. EP15 v2 cast: Basil v2 is slimmer than the old Basil; at .94 his painted area (tail included) equals Pip's and Momo's and his crest sits level with Pip's head (qa/size_check.jpg)
function buddy(who, x, y, h, t, o = {}) { h *= SIZE_K[who] || 1;
  if (location.search.includes("hide=" + who)) return "";   // thumbnails only
  let pose = o.pose || "sit", tsw = -99; const PS = (o.poses || []).slice().sort((a, b) => a[0] - b[0]);   // EP15: poses in time order
  for (const [tp, p] of PS) if (t >= tp) { pose = p; tsw = tp; }
  let why = o.pose ? "scene" : "scene";   // EP15 QA: where the pose came from (qa/buddy_faces, pose_audit.js)
  let nxt = 1e9; for (const [tp] of PS) if (tp > t) { nxt = tp; break; }
  // teacher, 22 Nov (EP14 P1 3:30): "both pip and basil mouth not moving". Pose paintings have no mouths, so a buddy SPEAKING always
  // shows its talking sprite (lip-sync + blinks), with the usual pose-swap pop at the start of the line; the pose returns after the line.
  { const spk = o.keepPose ? null : speaking(who, t);
    if (spk && pose !== "sit" && pose !== "back") { if (spk.t > tsw) tsw = spk.t; pose = "sit"; nxt = Math.min(nxt, spk.end + .05); }
    else if (!spk && pose !== "sit" && pose !== "back" && !o.keepPose) { for (const id of TL.order) { const L = TL.lines[id];   // back to the pose: pop again
      if (L.who === who && L.end + .05 > tsw && L.end + .05 <= t && t - L.end < 1.5) tsw = L.end + .05; } } }
  if (!speaking(who, t) && !o.keepPose) { const oc = outcomeAt(who, t);
    if (oc) { pose = oc.pose; why = "outcome"; if (oc.t0 > tsw) tsw = oc.t0; nxt = Math.min(nxt, oc.t1); }
    else if (pose === "cheer" && !learnAt(t) && !o.achieved) pose = "sit"; }   // hands up only when something is learnt or achieved (EP15: never a stand-in arms-crossed)
  let nodH = 0;
  if (pose === "sit" || pose === "back") { const R = reactAt(who, t, tsw, nxt, o);   // v3: never frozen
    if (R) { if (R.pose && pose === "sit") { if (t < R.t1) { pose = R.pose; why = "react:" + (R.txt || ""); tsw = R.t0; nxt = R.t1; } else if (t < R.t1 + .5) tsw = R.t1; }
      else if (!R.pose && t < R.t0 + .5) nodH = hop(t, R.t0, .36, 1); } }
  let k = o.k || 1; if (o.in !== undefined) { if (t < o.in) return ""; k *= spring(t, o.in, .5); } if (o.out !== undefined && t > o.out) { k *= 1 - eo((t - o.out) / .2); if (k < .02) return ""; }
  const ph = { pip: .9, basil: 0, momo: 1.9 }[who];
  let sy = 1, sx = 1, rot = 0, lift = 0;
  if (!o.still) { const br = Math.sin(2 * Math.PI * (t + ph) / 3); sy *= 1 + .012 * br; sx *= 1 - .004 * br; rot += .35 * Math.sin(2 * Math.PI * (t + ph) / 4.6); }
  if (o.in !== undefined) { const w = wob(t, o.in, .5); sy *= 1 + .09 * w; sx *= 1 - .07 * w; }
  // pose swap, as in the approved pose test: 3 frames of squash on the old picture, a hard cut to the new picture stretched tall,
  // an overshoot that settles in about 0.3 s, a tiny hop, a ring of sparkles and two dust puffs. Never a cross-fade.
  const ant = ss(nxt - .1, nxt, t); sy *= 1 - .10 * ant; sx *= 1 + .08 * ant; let fx = "";
  if (tsw > -90 && !(o.in !== undefined && Math.abs(tsw - o.in) < .3)) { const u = t - tsw, w = Math.exp(-u * 9) * Math.cos(u * 23); sy *= 1 + .13 * w; sx *= 1 - .09 * w; lift -= 15 * Math.sin(Math.PI * clamp(u / .22)) * (h / 380);
    if (u >= 0 && u < .4 && !o.nofx) { const e = 1 - Math.pow(1 - u / .4, 2), cy = y - h * .52;
      for (let i = 0; i < 6; i++) { const an = (-90 + (i - 2.5) * 44 + 8 * (who.length % 3)) * Math.PI / 180, r = h * (.5 + .22 * e), sc = (i % 2 ? .55 : .8) * Math.pow(Math.sin(Math.PI * Math.min(u / .4, 1)), .6) * h / 380; fx += `<g transform="translate(${n2(x + Math.cos(an) * r * 1.05)} ${n2(cy + Math.sin(an) * r * .92)}) scale(${n2(sc)}) rotate(${n2(40 * u)})"><path d="M0-32 Q4-4 32 0 Q4 4 0 32 Q-4 4 -32 0 Q-4-4 0-32z" fill="#FFF3DC"/></g>`; }
      for (const sg of [-1, 1]) fx += `<ellipse cx="${n2(x + sg * h * (.3 + .22 * e))}" cy="${n2(y + 4 - 10 * e)}" rx="${n2((26 + 30 * e) * h / 380)}" ry="${n2((12 + 12 * e) * h / 380)}" fill="#DDD3FF" opacity="${n2(.42 * (1 - e))}" filter="url(#b4)"/>`; }
    // cheering: little hops with a squash on each landing; waving: a side-to-side rock with the whole body
    if (pose === "cheer" && !o.nohop) { const e = ss(.1, .22, u) * (1 - ss(1.9, 2.3, u)), sA = Math.abs(Math.sin(Math.PI * 2.6 * (u - .1))); lift -= 24 * sA * e * (h / 380); const q2 = (.05 * Math.pow(1 - sA, 3) - .03 * sA) * e; sy *= 1 - q2; sx *= 1 + .8 * q2; rot += 1.6 * Math.sin(Math.PI * 2.6 * (u - .1)) * e; }
    if (pose === "waving" || (who === "basil" && o.wave && pose === "cheer")) { const e = ss(.2, .4, u) * (1 - ss(1.9, 2.3, u)), sA = Math.sin(2 * Math.PI * 2.1 * u); rot += 4.6 * sA * e; sy *= 1 - .02 * Math.abs(sA) * e; } }
  const nod = nodOf(who, t), q = (pose === "sit" ? .016 : .022) * nod; sy *= 1 - q; sx *= 1 + .8 * q; rot += 1.1 * nod * (o.flip ? -1 : 1); if (pose !== "sit") lift -= 5 * nod;
  for (const [tj, hj] of o.jump || []) { lift -= hop(t, tj, .36) * hj; const a = ss(tj - .12, tj, t) * (t < tj ? 1 : 0); sy *= 1 - .08 * a; sx *= 1 + .06 * a; const w = wob(t, tj + .36, .35); if (t > tj + .36) { sy *= 1 - .08 * w; sx *= 1 + .06 * w; } }
  if (o.rock) rot += o.rock * Math.sin(2 * Math.PI * t / .7);
  let twk = 1; for (const tw0 of o.twirl || []) { const u = clamp((t - tw0) / .7); if (u > 0 && u < 1) { twk = Math.cos(2 * Math.PI * eio(u)); lift -= 18 * Math.sin(Math.PI * u) * (h / 380); } }   // a little twirl (EP14 Momo, "I have my colours now!")
  if (nodH) { lift -= nodH * h * .05; rot += 3 * nodH * (o.flip ? -1 : 1); sy *= 1 + .03 * nodH; }
  rot += o.look || 0;
  let name;
  if (pose === "sit") { const m = ["closed", "half", "wide"][o.mouth !== undefined && !speaking(who, t) ? o.mouth : mouthOf(who, t)], b = o.eyes === "shut" || blinkAt(who, t); name = `${who}_sit_` + (b ? (m === "closed" ? "blink" : m + "_blink") : m); }
  else name = `${who}_${POSE_SUB[who] && POSE_SUB[who][pose] && !SPR[`${who}_${pose}`] ? POSE_SUB[who][pose] : pose}`;
  const S = SPR[name] || SPR[`${who}_sit_closed`]; if (!SPR[name]) name = `${who}_sit_closed`;
  const s0 = h / S.bh * k, fl = o.flip ? -1 : 1;
  if (window._POSE) window._POSE.push({ who, name, x, y: y + lift, h: h * k, peek: !!o.peek, why });   // EP15 QA (qa/buddy_faces): which face is on screen, where
  let out = "";
  if (o.tag !== false || o.peek) (window._BP = window._BP || {})[who] = { x, y, h: h * k, flip: !!o.flip, peek: !!o.peek };
  if (o.aura && !TRIAL) { const R = h * .62 * Math.min(1, k), cx = x + DISC_DX[who] * h * fl; out += `<circle cx="${n2(cx)}" cy="${n2(y - h * .46)}" r="${n2(R)}" fill="${AURA[who]}" opacity="${o.auraO || .9}"/><circle cx="${n2(cx)}" cy="${n2(y - h * .46)}" r="${n2(R)}" fill="url(#gSpot)"/>`; }
  if (o.shadow !== false) out += `<ellipse cx="${n2(x)}" cy="${n2(y - h * .01)}" rx="${n2(h * .36 * sx * k * (1 + lift / 400))}" ry="${n2(h * .06 * k)}" fill="${P.ink}" opacity="${n2(.3 * (1 + lift / 200))}" filter="url(#b4)"/>`;
  out += `<g transform="translate(${n2(x)} ${n2(y + lift)}) rotate(${n2(rot)}) scale(${n2(s0 * sx * twk * fl * 1000) / 1000} ${n2(s0 * sy * 1000) / 1000}) translate(${-S.ax} ${-S.ay})" ${o.rim === false ? "" : `filter="url(#${o.rim || "rimB"})"`}><use href="#s_${name}"/></g>`;
  if (o.tag !== false) { const sp = speaking(who, t), a = (o.in !== undefined ? spring(t, o.in + .15, .4) * (1 - ss(o.in + 2.4, o.in + 2.7, t)) : 0), b = sp ? spring(t, sp.t - .04, .35) : 0, kt = Math.max(a, b) * Math.min(1, k);
    if (kt > .03) { const size = clamp(h * .115, 26, 40); out += TF(x, Math.min(y + 4, 1080 - size * .95), kt, nameTag(who, size)); } }
  return out + fx;
}

/* v3 (teacher, 22 Nov: "this does not give me the 'hard knock' vibe… make use of Pip, Momo or Basil, showing an angry / shocked face"):
   every impact is FELT. jolt(t, t0, a) -> [dx, dy] a quick camera shake (a few frames); impactFX = a white flash, a cartoon burst with its
   word ("BONK!", "CLANG!", "THUD!") at the contact point, speed lines; faceCam = a buddy's face popping in big, in a round frame with the
   buddy's colour, reacting (poses swap with the usual pop). */
const jolt = (t, t0, a = 26) => { const u = t - t0; if (u < 0 || u > .5) return [0, 0]; const k = Math.exp(-u * 8); return [n2(a * k * Math.sin(u * 72)), n2(a * .7 * k * Math.cos(u * 57))]; };
const JOLT = (t, times, inner, a) => { let dx = 0, dy = 0; for (const t0 of times) { const [x, y] = jolt(t, t0, a); dx += x; dy += y; } return dx || dy ? `<g transform="translate(${dx} ${dy})">${inner}</g>` : inner; };
function impactFX(t, t0, x, y, word = "BONK!", o = {}) { const u = t - t0, d = o.d || .95; if (u < -.02 || u > d) return ""; const sc = o.s || 1, k = lerp(.4, 1, eo(u / .1)) * (1 + .08 * wob(t, t0 + .1, .35)), fade = 1 - ss(t0 + d - .3, t0 + d, t);
  let pts = ""; for (let i = 0; i < 24; i++) { const r = i % 2 ? 92 : 170 + 26 * hash(i, 5), an = i * Math.PI / 12 + .1; pts += `${n2(Math.cos(an) * r)},${n2(Math.sin(an) * r * .78)} `; }
  let lines = ""; for (let i = 0; i < 10; i++) { const an = i * Math.PI / 5 + .3, r0 = 200 + 160 * eo(u / .35), r1 = r0 + 90 * (1 - eo(u / .5)); lines += `<path d="M${n2(Math.cos(an) * r0)} ${n2(Math.sin(an) * r0 * .78)} L${n2(Math.cos(an) * r1)} ${n2(Math.sin(an) * r1 * .78)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/>`; }
  const flash = o.flash === false ? "" : `<rect width="1920" height="1080" fill="#fff" opacity="${n2(.55 * pulse(t, t0 + .01, .01, .22))}"/>`;
  return flash + OP(fade, `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(k * sc)}) rotate(${o.rot === undefined ? -8 : o.rot})">${lines}<polygon points="${pts}" fill="${o.col || P.sun}" stroke="${P.ink}" stroke-width="10" stroke-linejoin="round"/>
    <text x="0" y="${n2(o.size ? o.size * .36 : 26)}" font-family="Fredoka" font-weight="700" font-size="${o.size || 74}" text-anchor="middle" letter-spacing="2" fill="#fff" stroke="${P.ink}" stroke-width="14" stroke-linejoin="round" paint-order="stroke">${word}</text></g>`); }
// a buddy's face close-up, popping in at t0 and out at t1, in a round frame (x, y = centre, r = radius). poses = [[t, pose], ...]
function faceCam(who, t, t0, t1, x, y, r, poses, o = {}) { if (t < t0 - .01 || t > t1 + .3) return ""; const k = spring(t, t0, .45) * (1 - ei((t - t1) / .25)); if (k < .02) return "";
  const h = r * 3.1, id = "fc" + who + Math.round(x) + Math.round(y);
  return `<g transform="translate(${n2(x)} ${n2(y)}) scale(${n2(k)}) rotate(${o.rot || 0})"><g filter="url(#drop)"><circle r="${r + 12}" fill="${P[who]}"/></g><clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="${TINT[who]}"/>
    <g clip-path="url(#${id})">${buddy(who, (o.dx || 0) * r, h * .93 - r * .25, h, t, { poses, tag: false, shadow: false, flip: o.flip, nofx: true, noreact: !!o.noreact })}</g><circle r="${r}" fill="none" stroke="#fff" stroke-width="6" opacity=".9"/></g>`; }
/* ---------- speech bubble: white pill, Fredoka 600; a ✗ chip at the START for an idea that is not right ---------- */
function bubble(x, y, lines, t, t0, t1, o = {}) {
  if (t < t0 || t > t1 + .25) return ""; const size = o.size || 40, k = spring(t, t0, .4) * (1 - eo((t - t1) / .2));
  const w = Math.max(...lines.map((l) => tw(l, size, 600))) + 70 + (o.x ? 64 : 0), h = lines.length * size * 1.22 + 40, tail = o.tail === undefined ? 0 : o.tail, td = o.down === false ? -1 : 1;
  const col = o.col; let s = `<g filter="url(#dropS)">${col ? `<path d="M${tail - 26} ${td * (h / 2 - 2)} L${tail + (o.tdx || 0)} ${td * (h / 2 + 44)} L${tail + 26} ${td * (h / 2 - 2)}z" fill="${col}"/><rect x="${n2(-w / 2 - 7)}" y="${-h / 2 - 7}" width="${n2(w + 14)}" height="${h + 14}" rx="${Math.min(h / 2, 44) + 7}" fill="${col}"/>` : ""}<rect x="${n2(-w / 2)}" y="${-h / 2}" width="${n2(w)}" height="${h}" rx="${Math.min(h / 2, 44)}" fill="#FFF8EA"/>${col ? "" : `<path d="M${tail - 20} ${td * (h / 2 - 3)} L${tail + (o.tdx || 0)} ${td * (h / 2 + 34)} L${tail + 20} ${td * (h / 2 - 3)}z" fill="#FFF8EA"/>`}</g>`;
  const tx0 = o.x ? 32 : 0;
  lines.forEach((l, i) => { let h2 = esc(l); const m = i === 0 && o.pick !== false && /^(One, water[.!]|Two, food[.!]|Three, air[.!])/.exec(l);
    if (m) h2 = `<tspan fill="${m[1][1] === "n" ? P.blueDeep : m[1][1] === "w" ? P.orangeDeep : "#4E93B4"}" font-weight="700">${m[1]}</tspan>` + esc(l.slice(m[1].length));
    s += T(tx0, (i - (lines.length - 1) / 2) * size * 1.22 + size * .35, h2, size, P.ink, { w: 600 }); });
  if (o.x) s += `<g transform="translate(${n2(-w / 2 + 46)} 0)"><circle r="27" fill="${P.paper}" stroke="${P.ink}" stroke-width="3" opacity=".95"/><path d="M-11 -11 L11 11 M11 -11 L-11 11" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/></g>`;
  return TF(x, y, k, s);
}
// the sentences of a line as bubble pages: each sentence shows while it is said
function sentPages(id) { const L = TL.lines[id], pages = []; let cur = [], t0 = L.t; L.words.forEach((w, i) => { if (!cur.length) t0 = w.a; cur.push(w.w); if (/[.!?]$/.test(w.w) || i === L.words.length - 1) { pages.push({ text: cur.join(" "), t0, t1: w.b }); cur = []; } }); pages.forEach((p, i) => { p.t1 = pages[i + 1] ? pages[i + 1].t0 - .02 : L.end + .45; }); return pages; }
function wrap(text, size, maxW, wgt = 600, fam = "Fredoka") { const out = []; let cur = ""; for (const w of text.split(" ")) { const tr = cur ? cur + " " + w : w; if (tw(tr, size, wgt, fam) > maxW && cur) { out.push(cur); cur = w; } else cur = tr; } if (cur) out.push(cur); return out; }
// a buddy's whole line as a bubble (sentence by sentence, exact words). o.merge = show the whole line at once
function say(id, x, y, t, o = {}) { const L = TL.lines[id]; if (!L) return ""; if (window._SAID) window._SAID[id] = 1; if (t < L.t - .05 || t > L.end + .8) return ""; let s = "";
  const pages = o.merge ? [{ text: L.text, t0: L.t, t1: L.end + .45 }] : sentPages(id);
  if (!o.merge) for (let i = pages.length - 1; i > 0; i--) if (pages[i].text.split(" ").length + pages[i - 1].text.split(" ").length <= 5) { pages[i - 1].text += " " + pages[i].text; pages[i - 1].t1 = pages[i].t1; pages.splice(i, 1); }
  pages.forEach((p, i) => { s += bubble(x, y, wrap(p.text, o.size || 40, o.maxW || 560), t, i ? p.t0 : L.t - .04, p.t1, { ...o, col: P[L.who], x: o.x && i === 0 }); }); return s; }

