// main.js (P4 EP3: + XDEFSE3 and window._T): builds the permanent defs (style, sprites, baked backgrounds), then window.render(t).
const SC = window.SC || {};                        // scene name -> (t, scene) => svg
const NOBAKE = location.search.includes("nobake");
// a static background: the baked PNG when there is one, else the live SVG
function bg(name) { return ((!NOBAKE && BAKED.includes(name)) ? `<use href="#bg_${name}"/>` : `<g>${BG[name]()}</g>`) + bgMarks(name); }
// invisible marks on a set that a bubble should keep clear of (kit/bubble_layout.js reads data-obst): BG_OBST[name] = [[x, y, w, h, label], ...]
function bgMarks(name) { const M = (window.BG_OBST || {})[name]; return M ? M.map(([x, y, w, h, l]) => `<rect data-obst="${l || name}" x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="none"/>`).join("") : ""; }
const GRADE = () => (!NOBAKE && BAKED.includes("_grain") ? `<use href="#bg__grain" style="mix-blend-mode:soft-light" opacity=".5"/>` : "") + vignette(.7);
/* P4 EP3 v2: THE DIRECTOR (teacher, 28 Nov 2026: "not to have still frames or same scene for more than 10 seconds"). window.DIRSHOTS
   (director_p1.js, written by plan_shots.py from a census of the base staging) = [t0, t1, z0, cx0, cy0, z1, cx1, cy1, kind, label]: inside a
   shot the whole scene is seen through a camera of zoom z centred on (cx, cy) of the base frame, eased from the first to the second set (a
   push-in, a pan, a rack); a new shot is a hard cut. The screen's own things (logo, score bar, shelf, bubbles, small print) are drawn through
   DHUD (lib.js) and stay put. ?nodir switches it off (the census). */
function dirAt(t) { const L = window.DIRSHOTS; if (!L || location.search.includes("nodir")) return null;
  let lo = 0, hi = L.length - 1, S = null; while (lo <= hi) { const m = (lo + hi) >> 1; if (L[m][0] <= t) { if (t < L[m][1]) { S = L[m]; break; } lo = m + 1; } else hi = m - 1; }
  if (!S) return null; const u = S[1] > S[0] ? eio(clamp((t - S[0]) / (S[1] - S[0]))) : 0, z = lerp(S[2], S[5], u); if (z <= 1.001) return null;
  const cx = clamp(lerp(S[3], S[6], u), 960 / z, 1920 - 960 / z), cy = clamp(lerp(S[4], S[7], u), 540 / z, 1080 - 540 / z); return [z, cx, cy]; }
{ const _lg = logo, _sb = scoreboard, _sh = shelf, _sy = say, _fr = typeof x2frozen === "function" ? x2frozen : null;
  logo = function (...a) { return DHUD(_lg(...a)); }; scoreboard = function (...a) { return DHUD(_sb(...a)); }; shelf = function (...a) { return DHUD(_sh(...a)); }; say = function (...a) { return DHUD(_sy(...a)); }; }
(function () {
  const perm = document.getElementById("perm"), dyn = document.getElementById("dyn"); let imgs = "";
  const urls = [];
  for (const [k, s] of Object.entries(SPR)) { imgs += `<image id="s_${k}" href="${s.file}" width="${s.w}" height="${s.h}"/>`; urls.push(s.file); }
  if (!NOBAKE) for (const k of BAKED) { imgs += `<image id="bg_${k}" href="bg/${k}.png" x="-192" y="-108" width="2304" height="1296"/>`; urls.push(`bg/${k}.png`); }
  perm.innerHTML = defs().replace("</defs>", XDEFS() + (typeof XDEFS3 === "function" ? XDEFS3() : "") + (typeof XDEFS5 === "function" ? XDEFS5() : "") + (typeof XDEFS9 === "function" ? XDEFS9() : "") + (typeof XDEFS10 === "function" ? XDEFS10() : "") + (typeof XDEFS12 === "function" ? XDEFS12() : "") + (typeof XDEFS12E === "function" ? XDEFS12E() : "") + (typeof XDEFS13E === "function" ? XDEFS13E() : "") + (typeof XDEFS14 === "function" ? XDEFS14() : "") + (typeof XDEFS14E === "function" ? XDEFS14E() : "") + (typeof XDEFS15 === "function" ? XDEFS15() : "") + (typeof XDEFS16 === "function" ? XDEFS16() : "") + (typeof XDEFS17 === "function" ? XDEFS17() : "") + (typeof XDEFS18 === "function" ? XDEFS18() : "") + (typeof XDEFS19 === "function" ? XDEFS19() : "") + (typeof XDEFS20 === "function" ? XDEFS20() : "") + (typeof XDEFS22 === "function" ? XDEFS22() : "") + (typeof XDEFS27 === "function" ? XDEFS27() : "") + (typeof XDEFSP4 === "function" ? XDEFSP4() : "") + (typeof XDEFSV2 === "function" ? XDEFSV2() : "") + (typeof XDEFSE3 === "function" ? XDEFSE3() : "") + `<filter id="ghostF" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="3.5" result="d"/><feComposite in="d" in2="SourceAlpha" operator="out" result="o"/><feFlood flood-color="#fff"/><feComposite in2="o" operator="in"/></filter>` + imgs + "</defs>");
  function sceneAt(t) { const S = TL.scenes; for (let i = S.length - 1; i >= 0; i--) if (t >= S[i].t0) return S[i]; return S[0]; }
  window.render = (t) => { t = Math.max(0, Math.min(TL.END - .001, t)); const s = sceneAt(t); window._S = s; window._T = t;   /* P4 EP3: the frame time, for items drawn inside a sprite (Basil's detective cap) */ window._BP = {}; window._SAID = {}; window._BUBAT = null; const f = SC[s.name];
    const D = dirAt(t); window._DIR = D; window._DINV = D ? `translate(${n2(D[1])} ${n2(D[2])}) scale(${(1 / D[0]).toFixed(5)}) translate(-960 -540)` : null;
    let body; try { body = f ? f(t, s) : `<rect width="1920" height="1080" fill="#221A57"/>${T(960, 540, s.name, 90, "#fff")}`; } finally { window._DINV = null; }
    if (D) body = `<g data-dir="1" transform="translate(960 540) scale(${D[0].toFixed(5)}) translate(${n2(-D[1])} ${n2(-D[2])})">${body}</g>`;
    dyn.innerHTML = body + (window.OVER ? OVER(t, s) : "") + autoSay(t) + (s.nograde ? "" : GRADE()); };
  window.bakeSVG = (name) => { dyn.innerHTML = `<g transform="translate(160 90) scale(.8333)">${BG[name]()}</g>`; };   // 2304x1296 world -> the 1920x1080 view
  const dec = urls.map((u) => { const im = new Image(); im.src = u; return im.decode().catch(() => console.error("image failed", u)); });
  Promise.all([...dec, document.fonts.load('700 20px Fredoka'), document.fonts.load('600 20px Fredoka'), document.fonts.load('500 20px Fredoka'), document.fonts.load('700 20px "Atkinson Hyperlegible"')])
    .then(() => document.fonts.ready).then(() => { window.READY = true; });
})();
