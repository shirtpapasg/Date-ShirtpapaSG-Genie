// six.js: what both parts of EP6 share: the six-tile board (SIX ANIMAL GROUPS, EP5's dare, carried through the Gardens), its stamps,
// the lake view (the set + its live animals), the close-up "macro" backgrounds, small tags. Pure functions of their arguments.
const SIXT = [["AMPHIBIANS", "#2FA65A", "#1F8A4C"], ["BIRDS", "#F08A24", "#C0620C"], ["FISH", "#3A8DFF", "#1F5FD0"], ["INSECTS", "#8B4A2B", "#6A3418"], ["REPTILES", "#5E6B73", "#424C54"], ["MAMMALS", "#B5476B", "#8A2E4E"]];
const tileXY = (i) => [-210 + (i % 3) * 210, -372 + Math.floor(i / 3) * 176];
function sixIcon(i) { if (i < 3) return `<g transform="scale(.82)">${stampIcon(i)}</g>`;
  if (i === 3) return `<g fill="#fff"><ellipse cx="0" cy="-22" rx="9" ry="9"/><ellipse cx="0" cy="-4" rx="8" ry="10"/><ellipse cx="0" cy="20" rx="12" ry="16"/></g><g stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"><path d="M-6 -8 L-24 -18 M6 -8 L24 -18 M-6 -2 L-26 0 M6 -2 L26 0 M-6 4 L-22 18 M6 4 L22 18 M-4 -28 L-12 -40 M4 -28 L12 -40"/></g>`;
  if (i === 4) return `<g transform="scale(.62)">${houseLiz({ col: "#fff", line: "#fff" }).replace('filter="url(#rimS)"', "")}</g>`;
  return `<g fill="#fff"><ellipse cx="0" cy="10" rx="18" ry="15"/><ellipse cx="-20" cy="-10" rx="7" ry="9"/><ellipse cx="-7" cy="-20" rx="7" ry="9"/><ellipse cx="7" cy="-20" rx="7" ry="9"/><ellipse cx="20" cy="-10" rx="7" ry="9"/></g>`; }
/* the board on its little stand. st = {3|4|5: time the stamp landed} (0-2 are EP5's stamps, always there); o.flash/o.pulse/o.glow = [6] 0..1 */
function sixBoard(t, st = {}, o = {}) { let c = "";
  SIXT.forEach(([nm, col, dk], i) => { const [x, y] = tileXY(i), ts = i < 3 ? -1 : st[i], on = i < 3 || (ts !== undefined && t >= ts), fl = (o.flash || [])[i] || 0, pl = (o.pulse || [])[i] || 0, gl = (o.glow || [])[i] || 0, k = (on && ts > 0 ? 1 + .3 * pulse(t, ts, .01, .35) : 1) + .14 * fl + .08 * pl;
    c += `<g transform="translate(${x} ${y}) scale(${n2(k)})">${fl + gl > .05 ? `<rect x="-104" y="-74" width="208" height="148" rx="30" fill="${P.sun}" opacity="${n2(.85 * Math.max(fl, gl))}" filter="url(#b10)"/>` : ""}
      ${on ? `<rect x="-92" y="-64" width="184" height="128" rx="24" fill="${col}"/><rect x="-86" y="-58" width="172" height="116" rx="20" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/><g transform="translate(0 -18) rotate(-6)"><circle r="30" fill="${dk}"/><circle r="25" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="3 5" opacity=".7"/>${sixIcon(i)}</g>${T(0, 42, nm, 25, "#fff", { ls: 1 })}`
        : `<rect x="-92" y="-64" width="184" height="128" rx="24" fill="#fff" stroke="${col}" stroke-width="5" stroke-dasharray="13 9"/>${pl > .05 ? `<rect x="${n2(-92 - 10 * pl)}" y="${n2(-64 - 10 * pl)}" width="${n2(184 + 20 * pl)}" height="${n2(128 + 20 * pl)}" rx="28" fill="none" stroke="${col}" stroke-width="6" opacity="${n2(pl)}"/>` : ""}<g transform="translate(0 -14)"><circle r="26" fill="url(#gSun)"/>${T(0, 12, "?", 36, P.ink)}</g>${T(0, 42, nm, 25, dk, { ls: 1 })}`}</g>`; });
  return `<ellipse cx="0" cy="4" rx="250" ry="18" fill="${P.ink}" opacity=".22" filter="url(#b4)"/><path d="M-90 0 L-26 -100 M90 0 L26 -100" stroke="#8A5A36" stroke-width="16" stroke-linecap="round"/><rect x="-140" y="-12" width="280" height="18" rx="9" fill="#8A5A36"/>
  <g filter="url(#drop)"><rect x="-352" y="-596" width="704" height="500" rx="28" fill="#C99A62" stroke="#8A5A36" stroke-width="6"/><rect x="-328" y="-572" width="656" height="452" rx="16" fill="url(#gPaper)"/></g>
  ${T(0, -506, "SIX ANIMAL GROUPS", 38, P.ink, { ls: 2 })}<path d="M-280 -482 H280" stroke="${P.ink2}" stroke-width="2.5" stroke-dasharray="3 9" opacity=".5"/>${c}`; }
// the rubber stamp pressing tile i of a board drawn at (x, y, s)
function sixPress(t, t0, x, y, s, i) { const u = t - t0 + .22; if (u < 0 || u > .7) return ""; const dn = u < .22 ? eo(u / .22) : 1, up = ss(.3, .7, u), [tx, ty] = tileXY(i), cx = x + tx * s, cy = y + ty * s;
  return OP(1 - ss(.5, .7, u), TF(cx, cy - (1 - dn) * 90 * s - up * 50 * s, s * 1.3, `<g filter="url(#dropS)"><rect x="-70" y="-26" width="140" height="30" rx="8" fill="#5E3F28"/><rect x="-22" y="-96" width="44" height="76" rx="14" fill="#B4532E" stroke="#7A3218" stroke-width="5"/><circle cx="0" cy="-104" r="30" fill="#D9703E" stroke="#7A3218" stroke-width="5"/></g>`)); }

/* ---------- the lake view: the baked set + its live things (all in world coordinates; cam = [zoom, cx, cy]) ----------
   o: dusk (0..1), mon (false | monitor options + {x, y, k}), ants (false), web (false), hop (false), liz (0 shown .. 1 hidden; undefined = none),
      lampLit, items (extra svg, world coords), back (svg under the animals) */
function lakeView(t, o = {}, cam = [1, 960, 540]) { const dk = o.dusk || 0; let s = "";
  s += dk < 1 ? bg("lake") : ""; if (dk > 0) s += OP(dk, bg("lakedusk"));
  // the lake glints, ripples drift
  s += `<g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${n2(.4 * (1 - dk * .6))}">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const x = ((i * 331 + t * (12 + i * 3)) % 2300) - 180, y = 530 + ((i * 97) % 170); return `<path d="M${n2(x)} ${y} q22 -7 44 0"/>`; }).join("")}</g>`;
  for (let i = 0; i < 10; i++) { const a = Math.max(0, Math.sin(t * 1.7 + i * 2.1)); if (a > .6) s += `<g transform="translate(${n2(200 + hash(i, 4) * 1500)} ${n2(520 + hash(i, 6) * 150)}) scale(${n2((a - .6) * 1.6)})"><path d="M0-14 Q2-2 14 0 Q2 2 0 14 Q-2 2 -14 0 Q-2-2 0-14z" fill="#fff" opacity="${n2(1 - dk * .5)}"/></g>`; }
  s += o.back || "";
  if (o.web !== false) s += TF(GD.web[0], GD.web[1], .28, spiderWeb(330, t, { op: .8, w: 3.4 }) + `<g transform="rotate(${n2(1.5 * Math.sin(t * .8))})">${spiderBig({ id: "lk" })}</g>`);
  if (o.hop !== false && !(o.liz !== undefined && o.liz < 1)) s += TF(GD.hopper[0], GD.hopper[1], .13, `<g transform="rotate(-62)">${grasshopper({})}</g>`);
  if (o.mon !== false) { const m = o.mon || {}; s += TF(m.x || GD.liz[0], m.y || GD.liz[1], m.k || .34, monitor({ t, breath: .5 + .5 * Math.sin(t * 2.1), tongue: m.tongue !== undefined ? m.tongue : tongueAt(t, 2.0, 7.3), ...m })); }
  if (o.ants !== false) for (let i = 0; i < 7; i++) { const x = 860 + ((i * 52 + t * 18) % 380), ph = t * 9 + i * 1.7; s += TF(x, 898 - (i % 2) * 6, .075, antSmall(ph)); }
  if (dk > .01) s += `<rect x="-400" y="-300" width="2720" height="1700" fill="#5A4A8A" opacity="${n2(.32 * dk)}" style="mix-blend-mode:multiply"/>`;
  s += TF(GD.lamp[0], GD.lamp[1], 1, lampPost(o.lampLit || 0, LAMPH));
  // the hidden animal (teacher, 21 Nov: a related animal, not always the lizard): the grasshopper hops from its grass blade up onto the lamp post's arm
  if (o.liz !== undefined && o.liz < 1) s += `<g transform="translate(${GD.lamp[0] - 2} ${GD.lamp[1] - LAMPH - 96 - 60 * o.liz}) scale(${n2(.34 * (1 - o.liz))})">${hopperF(t)}</g>`;
  s += o.items || "";
  return CAM(s, cam[0], cam[1], cam[2]); }
// a forked tongue flick every few seconds (0..1)
const tongueAt = (t, ph = 0, per = 6) => { const u = ((t + ph) % per); return u < .5 ? Math.sin(Math.PI * u / .5) : 0; };
// a near-plane branch of leaves, dark and blurred, at the frame edge (style 4: three planes)
const nearLeaves = (t, x, y, k = 1, flip = 1) => `<g transform="translate(${x} ${y}) scale(${k * flip} ${k}) rotate(${n2(2 * Math.sin(t * .6))})" filter="url(#b10)" opacity=".92">${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${-120 + i * 40}" cy="${n2(40 * Math.sin(i))}" rx="70" ry="26" fill="${i % 2 ? "#1E4A30" : "#163A26"}" transform="rotate(${-30 + i * 9} ${-120 + i * 40} ${n2(40 * Math.sin(i))})"/>`).join("")}<path d="M-200 0 Q0 -30 220 20" stroke="#2A2014" stroke-width="12" fill="none"/></g>`;
// dust motes in the sunlight
const motes = (t, n = 24, seed = 4, col = "#FFF6D8") => { let s = ""; for (let i = 0; i < n; i++) { const x = (hash(i, seed) * 1920 + t * (8 + 10 * hash(i, seed + 1))) % 1920, y = 80 + hash(i, seed + 2) * 700 + 20 * Math.sin(t * .7 + i), a = .25 + .45 * Math.abs(Math.sin(t * .9 + i * 1.3)); s += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(2 + 3 * hash(i, seed + 3))}" fill="${col}" opacity="${n2(a)}"/>`; } return s; };

/* ---------- close-up worlds: soft garden bokeh behind, the paved path as a ground plane (for the ant), or a web among leaves (for the spider) ---------- */
function macroBg(t, o = {}) { const g = o.ground !== false; let b = `<rect width="1920" height="1080" fill="${o.sky || "#CDEBC8"}"/><rect width="1920" height="700" fill="#A8D8A0" opacity=".6"/>`;
  for (let i = 0; i < 22; i++) { const x = hash(i, 21) * 2000 - 40 + 10 * Math.sin(t * .3 + i), y = hash(i, 23) * 760, r = 50 + hash(i, 25) * 120; b += `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r)}" fill="${["#7CC46A", "#5EAA58", "#B8E2A0", "#FFF2B8"][i % 4]}" opacity="${n2(.35 + .3 * hash(i, 27))}"/>`; }
  b = `<g filter="url(#b30)">${b}</g>`;
  if (g) b += `<path d="M-50 ${o.gy || 800} Q960 ${(o.gy || 800) - 30} 1970 ${o.gy || 800} V1100 H-50z" fill="#E6D8BC"/><g opacity=".5">${Array.from({ length: 60 }, (_, i) => `<ellipse cx="${n2(hash(i, 31) * 1920)}" cy="${n2((o.gy || 800) + 20 + hash(i, 33) * 260)}" rx="${n2(6 + hash(i, 35) * 14)}" ry="${n2(3 + hash(i, 37) * 5)}" fill="${i % 2 ? "#C8B48E" : "#F4EAD4"}"/>`).join("")}</g><rect x="-50" y="${(o.gy || 800) - 40}" width="2020" height="60" fill="#E6D8BC" opacity=".6" filter="url(#b10)"/>`;
  return b; }
// a picture board standing on the ground (EP5's wboard): inner drawn in a 600 x 600 box around (0, 0)
const pboard = (inner, w, h, id, lab, size = 34, bgc = "#EAF6E8") => wboard(`<rect x="-300" y="-300" width="600" height="600" fill="${bgc}"/>` + inner, w, h, id, lab ? { lab, size } : {});
// a little tag joined to a point by one plain line (style 7.8)
const lineTag = (t, t0, tx, ty, px, py, txt, size = 32, fill = "#fff", ink = P.ink) => t < t0 ? "" : OP(ramp(t, t0, .2), `<path d="M${tx} ${ty} L${n2(px)} ${n2(py)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="${n2(px)}" cy="${n2(py)}" r="7" fill="#fff"/>`) + TF(tx, ty, spring(t, t0, .4), tpill(0, 0, txt, size, fill, ink, { w: 700 }));
// a number popping beside a leg as it is counted
const numPop = (t, t0, x, y, n, k = 1) => t < t0 ? "" : TF(x, y, k * spring(t, t0, .4) * (1 + .15 * pulse(t, t0, .02, .3)), `<g filter="url(#dropS)"><circle r="40" fill="url(#gSun)"/><circle r="40" fill="none" stroke="#fff" stroke-width="4"/></g>${T(0, 17, n, 50, P.ink)}`);
const popTag = (t, t0, x, y, txt, size = 40, fill = P.sun, ink = P.ink, t1 = 1e9) => t < t0 || t > t1 + .3 ? "" : TF(x, y, spring(t, t0, .4) * (1 - ramp(t, t1, .25)), tpill(0, 0, txt, size, fill, ink, { w: 700 }));
const greyX = (t, t0, x, y, r = 46) => t < t0 ? "" : TF(x, y, spring(t, t0, .4), `<circle r="${r}" fill="#EDEAF2" stroke="#8D87A0" stroke-width="5"/><path d="M${-r * .4} ${-r * .4} L${r * .4} ${r * .4} M${r * .4} ${-r * .4} L${-r * .4} ${r * .4}" stroke="#8D87A0" stroke-width="9" stroke-linecap="round"/>`);
