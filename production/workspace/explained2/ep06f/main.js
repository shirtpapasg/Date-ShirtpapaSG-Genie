// main.js: builds the permanent defs (style, sprites, baked backgrounds), then window.render(t).
const SC = window.SC || {};                        // scene name -> (t, scene) => svg
const NOBAKE = location.search.includes("nobake");
// a static background: the baked PNG when there is one, else the live SVG
function bg(name) { return (!NOBAKE && BAKED.includes(name)) ? `<use href="#bg_${name}"/>` : `<g>${BG[name]()}</g>`; }
const GRADE = () => (!NOBAKE && BAKED.includes("_grain") ? `<use href="#bg__grain" style="mix-blend-mode:soft-light" opacity=".5"/>` : "") + vignette(.7);
(function () {
  const perm = document.getElementById("perm"), dyn = document.getElementById("dyn"); let imgs = "";
  const urls = [];
  for (const [k, s] of Object.entries(SPR)) { imgs += `<image id="s_${k}" href="${s.file}" width="${s.w}" height="${s.h}"/>`; urls.push(s.file); }
  if (!NOBAKE) for (const k of BAKED) { imgs += `<image id="bg_${k}" href="bg/${k}.png" x="-192" y="-108" width="2304" height="1296"/>`; urls.push(`bg/${k}.png`); }
  perm.innerHTML = defs().replace("</defs>", XDEFS() + (typeof XDEFS3 === "function" ? XDEFS3() : "") + (typeof XDEFS5 === "function" ? XDEFS5() : "") + (typeof XDEFS6 === "function" ? XDEFS6() : "") + `<filter id="ghostF" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="3.5" result="d"/><feComposite in="d" in2="SourceAlpha" operator="out" result="o"/><feFlood flood-color="#fff"/><feComposite in2="o" operator="in"/></filter>` + imgs + "</defs>");
  function sceneAt(t) { const S = TL.scenes; for (let i = S.length - 1; i >= 0; i--) if (t >= S[i].t0) return S[i]; return S[0]; }
  window.render = (t) => { t = Math.max(0, Math.min(TL.END - .001, t)); const s = sceneAt(t); const f = SC[s.name];
    dyn.innerHTML = (f ? f(t, s) : `<rect width="1920" height="1080" fill="#221A57"/>${T(960, 540, s.name, 90, "#fff")}`) + (window.OVER ? OVER(t, s) : "") + (s.nograde ? "" : GRADE()); };
  window.bakeSVG = (name) => { dyn.innerHTML = `<g transform="translate(160 90) scale(.8333)">${BG[name]()}</g>`; };   // 2304x1296 world -> the 1920x1080 view
  const dec = urls.map((u) => { const im = new Image(); im.src = u; return im.decode().catch(() => console.error("image failed", u)); });
  Promise.all([...dec, document.fonts.load('700 20px Fredoka'), document.fonts.load('600 20px Fredoka'), document.fonts.load('500 20px Fredoka'), document.fonts.load('700 20px "Atkinson Hyperlegible"')])
    .then(() => document.fonts.ready).then(() => { window.READY = true; });
})();
