// items_sheet.js: comparison sheets for the P4 "level-up" item OPTIONS (items_options.js) and the bike fixes (26 Nov 2026).
// Nothing here changes the live build: page.html never loads items_options.js; this script injects it into a copy of the page in memory.
//   NODE_PATH=$(npm root -g) node items_sheet.js <outdir> [pip|momo|basil|bike|ride|all] [--big]
// pip_options.jpg / momo_options.jpg / basil_badge.jpg: one row per option (row 1 = what the live build draws now), one column per pose the
// buddy uses in P4 EP1 (the flipped ones too). bike_fix.jpg: the four-pictures row (pedals, chain icons centred) + the bike in every state.
// pip_on_bike_options.jpg: how Pip sits or stands with his bike (and where his name tag goes).
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const POSES = {
  pip: [["sit", 0], ["oops", 0], ["surprised", 0], ["thinking", 0], ["cheer", 0], ["sit", 0, 86, "fall (sit, turned 86°)"]],
  momo: [["sit", 0], ["sit", 1], ["arms_crossed", 1], ["pointing", 1], ["thinking", 0], ["waving", 1], ["surprised", 0], ["cheer", 1]],
  basil: [["sit", 0], ["sit", 1], ["oops", 0], ["pointing", 0], ["thinking", 1], ["worried", 1], ["surprised", 0], ["arms_crossed", 1], ["cheer", 1], ["laughing", 0]] };
const OPTS = process.env.GRID ? { pip: ["grid"], momo: ["grid"], basil: ["grid"] } : { pip: ["live", "A", "B", "C"], momo: ["live", "A", "B", "C"], basil: ["live", "A"] };
(async () => {
  const [out, which = "all", ...fl] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true }); const big = fl.includes("--big");
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + path.resolve(__dirname, 'page.html') + '?part=1'); await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  await p.addScriptTag({ path: path.resolve(__dirname, 'items_options.js') });
  await p.evaluate(() => { const v = document.getElementById('v'); v.style.position = 'absolute'; v.style.left = '-6000px'; document.body.style.overflow = 'visible'; document.body.style.background = '#fff'; });
  const shoot = async (name, W, H, svg) => { await p.setViewportSize({ width: W, height: H });
    await p.evaluate(([W, H, svg]) => { let s = document.getElementById('sheet'); if (!s) { s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.id = 'sheet'; document.body.appendChild(s); }
      s.setAttribute('width', W); s.setAttribute('height', H); s.setAttribute('viewBox', `0 0 ${W} ${H}`); s.style.position = 'absolute'; s.style.left = '0'; s.style.top = '0'; s.innerHTML = svg; }, [W, H, svg]);
    await p.waitForTimeout(150); await p.screenshot({ path: path.join(out, name), type: 'jpeg', quality: 90 }); console.log('wrote', name, W + 'x' + H); };
  const T0 = -20;   // a time before every line: no talking mouth, no blink, no nod
  for (const who of ["pip", "momo", "basil"]) { if (which !== "all" && which !== who) continue;
    const poses = POSES[who], opts = OPTS[who], cw = big ? 620 : 400, ch = big ? 640 : 430, top = 70, left = 260, bh = big ? 560 : 370;
    const W = left + cw * poses.length + 20, H = top + ch * opts.length + 20;
    const svg = await p.evaluate(([who, poses, opts, cw, ch, top, left, bh, T0, process_GRID]) => { let s = `<rect width="100%" height="100%" fill="#F4EFE6"/>`;
      poses.forEach(([pz, f, rot, lab], j) => { s += T(left + cw * j + cw / 2, 46, lab || (pz + (f ? " (flipped)" : "")), 30, P.ink); });
      opts.forEach((op, i) => { const y0 = top + ch * i; s += `<rect x="10" y="${y0 + 6}" width="${left + cw * poses.length}" height="${ch - 12}" rx="24" fill="${i % 2 ? "#FBF8F2" : "#FFFFFF"}"/>`;
        const L = (window.ITEM_LABEL[who] || {})[op] || [op];
        L.forEach((ln, k) => { s += T(24, y0 + 60 + k * 36, ln, k ? 24 : 34, k ? P.ink2 : P.ink, { a: "start", w: k ? 500 : 700 }); });
        window.ITEM_OPT = { [who]: op };
        poses.forEach(([pz, f, rot], j) => { const cx = left + cw * j + cw / 2, cy = y0 + ch - 22;
          s += `<g>${buddy0(who, cx + (rot ? -bh * .42 : 0), cy - (rot ? bh * .02 : 0), bh * (rot ? .8 : 1), T0, { pose: pz, keepPose: true, still: true, tag: false, shadow: false, noreact: true, flip: !!f && !process_GRID, mouth: 0, look: rot || 0 })}</g>`; }); });
      window.ITEM_OPT = {}; return s; }, [who, poses, opts, cw, ch, top, left, bh, T0, !!process.env.GRID]);
    await shoot({ pip: "pip_options.jpg", momo: "momo_options.jpg", basil: "basil_badge.jpg" }[who].replace(".jpg", big ? "_big.jpg" : ".jpg"), W, H, svg); }
  if (which === "all" || which === "bike") { const svg = await p.evaluate(() => window.bikeFixSheet()); await shoot("bike_fix.jpg", 1920, 1500, svg); }
  if (which === "all" || which === "ride") { const svg = await p.evaluate(() => window.pipBikeSheet()); await shoot("pip_on_bike_options.jpg", 1920, 1640, svg); }
  console.log(errs.length ? 'ERRORS ' + [...new Set(errs)].join(' | ') : 'no page errors'); await b.close(); })();
