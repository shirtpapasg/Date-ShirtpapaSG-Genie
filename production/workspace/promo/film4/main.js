// main.js: the permanent defs (style, art, sprites, the app's real screens), then window.render(t) (a pure function of t).
(function () {
  const perm = document.getElementById("perm"), dyn = document.getElementById("dyn"); let imgs = ""; const urls = ["img/logo.png"];
  for (const [k, s] of Object.entries(SPR)) { imgs += `<image id="s_${k}" href="${s.file}" width="${s.w}" height="${s.h}"/>`; urls.push(s.file); }
  ["shop", "shop2", "dress", "dress2", "boss", "boss2", "claw"].forEach((k) => urls.push(`shots/${k}.jpg`));
  perm.innerHTML = defs().replace("</defs>", ARTDEFS() + imgs + "</defs>");
  function sceneAt(t) { const S = TL.scenes; for (let i = S.length - 1; i >= 0; i--) if (t >= S[i].t0) return S[i]; return S[0]; }
  window._noAuto = true;
  window.render = (t) => { t = Math.max(0, Math.min(TL.END - .001, t)); const s = sceneAt(t); window._S = s; window._BP = {}; window._SAID = {}; const f = SC[s.name];
    dyn.innerHTML = (f ? f(t, s) : `<rect width="1920" height="1080" fill="#221A57"/>${T(960, 540, s.name, 90, "#fff")}`) + (location.search.includes("nocap") ? "" : caption(t)) + vignette(.55); };
  const dec = urls.map((u) => { const im = new Image(); im.src = u; return im.decode().catch(() => console.error("image failed", u)); });
  Promise.all([...dec, document.fonts.load('700 20px Fredoka'), document.fonts.load('600 20px Fredoka'), document.fonts.load('500 20px Fredoka')])
    .then(() => document.fonts.ready).then(() => { window.READY = true; });
})();
