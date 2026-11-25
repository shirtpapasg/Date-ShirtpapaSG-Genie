// facing_scan.js <epdir> <part> [--dt 0.1] [--from s] [--to s] [--all] [--movers]   (teacher, 2026-11-25: "the fish swims backwards ... ensure
//   this dont happened in future rendering"; SERIES_FORMAT 6x)
//   cd explained2 && NODE_PATH=$(npm root -g) node qa/facing_scan.js ep18 1          -> the movers of EP18 Part 1, and any that go BACKWARDS
//   STATIC=1 node qa/facing_scan.js ep18                                             -> the quick source-only check (no browser), all parts
// What it checks: every drawing that travels left or right across the frame must face the way it travels (head, nose or front wheel leads).
//  * Facing comes from a `FACES: right|left|none` note at the drawing's definition: a JS comment on the line of (or the line just above)
//    `function fish16(` / `const bird15 = (`, or, for a drawing written inline in a scene, an SVG comment `<!--FACES:right name-->` as the
//    first thing inside the group that moves it. `none` = seen from the front or above (no left/right facing).
//  * The scan serves the episode over a local http server, wraps each annotated drawing function (and, to find NEW movers, every
//    function whose name looks like an animal, person or vehicle) so its output is tagged, steps render(t) every dt seconds (default
//    0.1 s; no screenshots) and measures each tagged drawing: its centre in camera space (a CAM() zoom or pan is taken out) and whether
//    it is mirrored on screen (the sign of its transform's x scale: TF(x, y, -k, art, rot, k) mirrors it). Both are taken in the frame
//    of what carries the drawing (the nearest transformed group at least 3x its area: a camera, a look-closer world, a card sliding in).
//  * BACKWARDS: an annotated drawing whose centre moves faster than 50 px/s, for at least 60 px and 0.8 s, the way its tail points
//    (quicker jumps are cuts, whip pans and cards sliding in, not travel). Listed with
//    the time span, the 10 s render chunks to redo, the drawing and where it is called from. Exit code 1 when any.
//  * EYE REVIEW: unannotated animal/person/vehicle functions that travel (annotate them), and buddies whose x travels inside a scene
//    (the pet buddies are drawn from the front, so check by eye that a walk across looks right). Check these on stills.
//  * --movers: also every other <g transform> (30-700 px wide) that travels 200 px or more over 1.2 s or more, with the start of
//    its markup, to find creatures drawn inline with no FACES note (slow-ish and noisy: clouds, cards and labels show up too).
//  * A call line with a `facing-ok` comment is skipped (e.g. a picture card sliding in that happens to hold a fish).
//  * STATIC=1: a source-only pass (no browser): TF(lerp(a, b, ...), y, k, <annotated drawing>...) lines whose travel (b - a) and the
//    sign of k disagree with the drawing's facing. It sees only that one pattern; the browser pass is the real check.
//  It cannot see a creature drawn inline without an SVG FACES comment: look at the contact sheet for anything crossing the frame too.
const path = require('path'), fs = require('fs'), http = require('http');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [ep, P = 1] = args.filter((a, i) => !a.startsWith('--') && !['--dt', '--from', '--to'].includes(args[i - 1]));
const DIR = path.resolve(ROOT, ep), DT = +opt('--dt', .1), VMIN = 50, DMIN = 60, TMIN = .8, ALL = args.includes('--all'), MOVERS = args.includes('--movers');
const CREATURE = /fish|bird|mynah|myna|pigeon|crow|sparrow|swallow|heron|egret|bus|bike|cycl|car$|train|ship|boat|mosq|fly|flie|bee|bfly|butter|moth|dragon|dfly|cicada|beetle|ant\d|^ant|weaverAnt|frog|tadpole|cat\d|^cat$|dog|hen|chick|snail|worm|lizard|gecko|kid|child|person|shopper|walk|swim|turtle|roach|mantis|hopper|caterp|larva|wrig|spider|turtle|kids|auntie|uncle|plane/i;

// the scripts page.html loads, in order
function pageScripts() { const h = fs.readFileSync(path.join(DIR, 'page.html'), 'utf8'); return [...h.matchAll(/<script src="([^"']+)"/g)].map(m => m[1]).filter(s => !s.startsWith('..') && !s.includes('/')); }
// FACES notes: { name: { face, file, line } }
function facesOf(files) { const F = {};
  for (const f of files) { const p = path.join(DIR, f); if (!fs.existsSync(p)) continue; const L = fs.readFileSync(p, 'utf8').split('\n');
    L.forEach((ln, i) => { const m = ln.match(/(?:\/\/|\/\*)\s*FACES:\s*(right|left|none)/); if (!m) return;
      for (const j of [i, i + 1]) { const d = (L[j] || '').match(/^\s*(?:function\s+(\w+)\s*\(|(?:const|let|var)\s+(\w+)\s*=)/); if (d) { F[d[1] || d[2]] = { face: m[1], file: f, line: j + 1 }; break; } } }); }
  return F; }
// top-level function definitions: { name: { kind: 'function'|'const', file, line } }
function defsOf(files) { const D = {};
  for (const f of files) { const p = path.join(DIR, f); if (!fs.existsSync(p)) continue;
    fs.readFileSync(p, 'utf8').split('\n').forEach((ln, i) => { let m = ln.match(/^function\s+(\w+)\s*\(/); if (m) D[m[1]] = { kind: 'function', file: f, line: i + 1 };
      m = ln.match(/^const\s+(\w+)\s*=\s*(\(|\w+\s*=>|function)/); if (m) D[m[1]] = { kind: 'const', file: f, line: i + 1 }; }); }
  return D; }
const chunk = (a, b) => `${Math.floor(a / 10) * 10}-${Math.ceil((b + .001) / 10) * 10}`;

// the top-level arguments of a call whose "(" is at i (strings and template literals skipped over)
function callArgs(src, i) { const out = []; let d = 0, cur = '', q = null;
  for (let j = i + 1; j < src.length && j < i + 20000; j++) { const c = src[j];
    if (q) { cur += c; if (c === '\\') { cur += src[++j]; continue; } if (c === q && q !== '`') q = null; else if (q === '`' && c === '`') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; cur += c; continue; }
    if ('([{'.includes(c)) d++; if (')]}'.includes(c)) { if (d === 0) { out.push(cur.trim()); return out; } d--; }
    if (c === ',' && d === 0) { out.push(cur.trim()); cur = ''; continue; } cur += c; } return out; }
function staticScan() { const files = pageScripts(), F = facesOf(files); let bad = 0, seen = 0;
  for (const f of files) { const p = path.join(DIR, f); if (!fs.existsSync(p)) continue;
    fs.readFileSync(p, 'utf8').split('\n').forEach((ln, i) => { if (/facing-ok/.test(ln)) return;
      for (const m of ln.matchAll(/\bTF\(/g)) { const A = callArgs(ln, m.index + 2); if (A.length < 4) continue;
        // travel: TF(lerp(a, b, ..), ..) or TF(x, ..) with x = lerp(a, b, ..) earlier on the line
        let lp = A[0].match(/^lerp\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,/); if (!lp && /^\w+$/.test(A[0])) lp = ln.slice(0, m.index).match(new RegExp('\\b' + A[0] + '\\s*=\\s*lerp\\(\\s*(-?[\\d.]+)\\s*,\\s*(-?[\\d.]+)\\s*,'));
        if (!lp) continue; const a = +lp[1], b = +lp[2]; if (a === b) continue;
        const k = A[2].replace(/\s/g, ''); if (!/^-?[\d.]+$/.test(k)) continue; const sk = +k < 0 ? -1 : 1;
        let face = null, who = null; const sv = A[3].match(/^`\s*<!--\s*FACES:\s*(right|left|none)\s*(\w*)/); if (sv) { face = sv[1]; who = sv[2] || 'inline'; }
        if (!face) { const c = A[3].match(/^(\w+)\s*\(/); if (c && F[c[1]]) { face = F[c[1]].face; who = c[1]; } }
        if (!face || face === 'none') continue; seen++; const go = Math.sign(b - a), look = (face === 'right' ? 1 : -1) * sk;
        if (go !== look) { bad++; console.log(`STATIC BACKWARDS ${ep}/${f}:${i + 1}  ${who} (FACES ${face}, x scale ${k}) travels ${go > 0 ? 'right' : 'left'} (lerp ${a} -> ${b})`); } } }); }
  console.log(bad ? `${bad} static hit(s)` : `static: no backwards TF(lerp(..)) mover (${seen} checked, ${Object.keys(F).length} FACES notes)`); return bad; }

if (process.env.STATIC) { process.exit(staticScan() ? 1 : 0); }

(async () => { const { chromium } = require('playwright');
  const files = pageScripts(), F = facesOf(files), D = defsOf(files);
  // a drawing with no note here borrows the note on the same name in another episode's copy (EP16's art16.js copied into EP17 ...)
  for (const e of fs.readdirSync(ROOT).filter(d => /^ep\d+/.test(d) && path.resolve(ROOT, d) !== DIR).sort().reverse()) { const d = path.join(ROOT, e);
    for (const f of fs.readdirSync(d).filter(f => f.endsWith('.js'))) { const L = fs.readFileSync(path.join(d, f), 'utf8').split('\n');
      L.forEach((ln, i) => { const m = ln.match(/(?:\/\/|\/\*)\s*FACES:\s*(right|left|none)/); if (!m) return; for (const j of [i, i + 1]) { const dd = (L[j] || '').match(/^\s*(?:function\s+(\w+)\s*\(|(?:const|let|var)\s+(\w+)\s*=)/); if (dd) { const n = dd[1] || dd[2]; if (D[n] && !F[n]) F[n] = { face: m[1], file: e + '/' + f, line: j + 1, borrowed: true }; break; } } }); } }
  const wrap = Object.keys(D).filter(n => F[n] || n === 'buddy0' || (CREATURE.test(n) && !/Card|card|Board|board|Pic$|Sheet|PH$|Tile|Label|Icon|Idea|Dish|Basket|Cut|Seed|Whole|Hang|Plant|plant|Journey$|Path$/.test(n)));
  const relet = new Set(wrap.filter(n => D[n].kind === 'const').concat(['CAM']));
  const srcLines = {}; for (const f of files) { const p = path.join(DIR, f); if (fs.existsSync(p)) srcLines[f] = fs.readFileSync(p, 'utf8').split('\n'); }
  // a local server for explained2/: the episode's own scripts get `const NAME =` -> `let NAME =` for the functions we wrap
  const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]), p = path.join(ROOT, u); if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
    const ext = path.extname(p), ty = { '.js': 'text/javascript', '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.svg': 'image/svg+xml' }[ext] || 'application/octet-stream';
    let body = fs.readFileSync(p); if (ext === '.js' && path.dirname(p) === DIR) body = body.toString('utf8').replace(/^const\s+(\w+)(\s*=)/gm, (m, n, e) => relet.has(n) ? `let ${n}${e}` : m);
    r.writeHead(200, { 'content-type': ty }); r.end(body); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const port = srv.address().port;
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } }); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto(`http://127.0.0.1:${port}/${ep}/page.html?part=${P}`); await pg.waitForFunction(() => window.READY === true, null, { timeout: 180000 });
  const movers = MOVERS; const miss = await pg.evaluate(([movers, wrap, kinds, faces]) => { Error.stackTraceLimit = 6; const miss = [];
    const where = () => { const s = (new Error().stack || '').split('\n').slice(3, 6).map(l => (l.match(/\/([\w.]+\.js):(\d+)/) || []).slice(1).join(':')).filter(Boolean); return s.join('<'); };
    window.__fw = (f, n) => function (...a) { const r = f.apply(this, a); if (typeof r !== 'string' || r[0] !== '<') return r; return `<g data-fn="${n}" data-cs="${where()}"${faces[n] ? ` data-face="${faces[n]}"` : ''}>${r}</g>`; };
    for (const n of wrap) { try { if (kinds[n] === 'function') { if (typeof window[n] === 'function') window[n] = window.__fw(window[n], n); else miss.push(n); }
      else (0, eval)(`if (typeof ${n} === 'function') ${n} = __fw(${n}, ${JSON.stringify(n)})`); } catch (e) { miss.push(n + ' (' + e.message + ')'); } }
    try { (0, eval)(`{ const c = CAM; CAM = (...a) => c(...a).replace('<g ', '<g data-cam="1" ') }`); } catch (e) { miss.push('CAM'); }
    // measure every tagged drawing at time t
    window.__measure = (t) => { window.render(t); const dyn = document.getElementById('dyn'), out = [], nth = {};
      let bgRef = null, bgA = 0; for (const u of dyn.querySelectorAll('use')) { if (!/^#bg_(?!_)/.test(u.getAttribute('href') || '') || u.closest('defs,clipPath,mask,pattern')) continue; const r = u.getBoundingClientRect(), a = r.width * r.height; if (a > bgA) { bgA = a; bgRef = u; } }
      if (bgA < 1920 * 1080 * .5) bgRef = null;
      const one = (el, fn, cs, face) => { if (el.closest('defs,clipPath,mask,pattern,symbol,marker')) return; const r = el.getBoundingClientRect(); if (!(r.width > 2 && r.height > 2)) return;
        if (r.right < -200 || r.left > 2120) return; let op = 1; for (let e = el; e && e !== dyn; e = e.parentNode) { const a = e.getAttribute && e.getAttribute('opacity'); if (a !== null && a !== undefined && a !== '') op *= +a; if (e.getAttribute && e.getAttribute('display') === 'none') op = 0; }
        if (op < .05) return; if (!face && el.querySelector('[data-face]')) return;   // a picture or helper that holds an annotated drawing: that one is measured
        // measured in the frame of what carries it: the nearest enclosing group at least 3x its area (a camera group, a look-closer
        // world, a picture card sliding in), else the nearest CAM() group, else the scene's baked background picture. So a camera pan
        // or zoom, or a card sliding in with a creature on it, is not travel; the creature moving across its scene is.
        let cam = null; for (let e = el.parentNode; e && e !== dyn; e = e.parentNode) { if (e.tagName !== 'g' || !e.getAttribute('transform')) continue; const q = e.getBoundingClientRect(); if (q.width * q.height >= 3 * r.width * r.height) { cam = e; break; } }
        if (!cam) cam = (el.parentNode.closest && el.parentNode.closest('[data-cam]')) || bgRef; let x = r.left + r.width / 2, y = r.top + r.height / 2;
        let o = el; while (o.children.length === 1 && o.children[0].tagName === 'g') o = o.children[0]; let m = o.getScreenCTM();
        if (cam) { const ci = cam.getScreenCTM().inverse(); const pt = new DOMPoint(x, y).matrixTransform(ci); x = pt.x; y = pt.y; m = ci.multiply(m); }
        const k = `${window._S.name}|${fn}|${cs}`; nth[k] = (nth[k] || 0) + 1;
        out.push({ k: k + '|' + nth[k], fn, cs, face, x: +x.toFixed(1), y: +y.toFixed(1), w: Math.round(r.width), sx: Math.abs(m.a) < 1e-3 ? 0 : Math.sign(m.a), sc: window._S.name }); };
      for (const el of dyn.querySelectorAll('[data-fn]')) one(el, el.getAttribute('data-fn'), el.getAttribute('data-cs'), el.getAttribute('data-face'));
      if (window.__MOVERS) for (const el of dyn.querySelectorAll('g[transform]')) { if (el.closest('[data-fn]') || el.querySelector('[data-fn]') || el.closest('[data-cam]') === el || [...el.childNodes].some(n => n.nodeType === 8 && /FACES:/.test(n.data))) continue;
        const r = el.getBoundingClientRect(); if (r.width < 30 || r.width > 700 || r.height > 700) continue; const sig = el.innerHTML.slice(0, 400).replace(/-?[\d.]+/g, '#').replace(/\s+/g, ' ').slice(0, 90); one(el, '(group)', sig, null); }
      const tw = document.createTreeWalker(dyn, NodeFilter.SHOW_COMMENT); let c; while ((c = tw.nextNode())) { const m = c.data.match(/FACES:\s*(right|left|none)\s*(\w*)/); if (m && c.parentNode.tagName === 'g') one(c.parentNode, m[2] || 'inline', 'svg-comment', m[1]); }
      return out; };
    window.__MOVERS = movers; return miss; }, [movers, wrap, Object.fromEntries(wrap.map(n => [n, D[n].kind])), Object.fromEntries(Object.entries(F).map(([n, v]) => [n, v.face]))]);
  const TL = JSON.parse(fs.readFileSync(path.join(DIR, `tl_p${P}.json`))), T0 = +opt('--from', 0), T1 = Math.min(+opt('--to', TL.END), TL.END - .01);
  const tracks = {}; const ts = []; for (let t = T0; t <= T1 + 1e-9; t += DT) ts.push(+t.toFixed(3));
  for (let i = 0; i < ts.length; i += 50) { const part = await pg.evaluate((ts) => ts.map(t => [t, window.__measure(t)]), ts.slice(i, i + 50));
    for (const [t, L] of part) for (const m of L) (tracks[m.k] = tracks[m.k] || []).push({ t, ...m }); }
  await b.close(); srv.close();
  const okLine = (cs) => (cs || '').split('<').some(s => { const [f, l] = s.split(':'); return srcLines[f] && /facing-ok/.test(srcLines[f][+l - 1] || ''); });
  const bad = [], eye = [], ok = [];
  for (const [k, L] of Object.entries(tracks)) { const fn = L[0].fn, face = L[0].face || (F[fn] && F[fn].face) || null; if (okLine(L[0].cs)) continue;
    // moving spans: consecutive samples with |vx| > VMIN, split where the direction or the mirroring changes
    let cur = null; const spans = [];
    for (let i = 1; i < L.length; i++) { const a = L[i - 1], c = L[i], dt = c.t - a.t; if (dt > DT * 1.6) { cur = null; continue; } const vx = (c.x - a.x) / dt;
      if (Math.abs(vx) < VMIN || Math.abs(c.y - a.y) > 3 * Math.abs(c.x - a.x) + 40) { cur = null; continue; } const go = Math.sign(vx);
      if (!cur || cur.go !== go || cur.sx !== c.sx) { cur = { go, sx: c.sx, t0: a.t, t1: c.t, dx: 0, w: c.w }; spans.push(cur); } cur.t1 = c.t; cur.dx += c.x - a.x; }
    for (const s of spans) { if (Math.abs(s.dx) < DMIN || s.t1 - s.t0 < TMIN) continue; const row = { fn, cs: L[0].cs, sc: L[0].sc, t0: s.t0, t1: s.t1, dx: Math.round(s.dx), sx: s.sx, face, w: s.w };
      if (fn === 'buddy0') { eye.push({ ...row, why: 'buddy travels' }); continue; }
      if (fn === '(group)') { if (Math.abs(s.dx) >= 200 && s.t1 - s.t0 >= 1.2) eye.push({ ...row, why: 'an untagged group travels: is it a creature or vehicle?' }); continue; }
      if (!face) { eye.push({ ...row, why: 'no FACES note' }); continue; } if (face === 'none' || !s.sx) { ok.push(row); continue; }
      const look = (face === 'right' ? 1 : -1) * s.sx; (look === s.go ? ok : bad).push(row); } }
  const fmt = (r) => `${r.t0.toFixed(1).padStart(7)}-${r.t1.toFixed(1).padEnd(7)} ${r.sc.padEnd(16)} ${r.fn.padEnd(14)} ${r.dx > 0 ? 'moves RIGHT' : 'moves LEFT '} ${String(Math.abs(r.dx)).padStart(5)} px  ${r.face ? 'FACES ' + r.face + (r.sx < 0 ? ' (mirrored)' : '') : ''}  from ${r.fn === '(group)' ? '"' + r.cs + '"' : r.cs}`;
  const merge = (L) => { const o = []; for (const r of L.sort((a, b) => a.t0 - b.t0)) { const p = o.find(q => q.fn === r.fn && q.cs === r.cs && Math.sign(q.dx) === Math.sign(r.dx) && r.t0 <= q.t1 + 1); if (p) { p.t1 = Math.max(p.t1, r.t1); p.dx += r.dx; } else o.push({ ...r }); } return o; };
  console.log(`facing_scan ${ep} part ${P}: ${ts.length} samples ${T0}-${T1.toFixed(1)} s every ${DT} s; ${Object.keys(F).length} FACES notes; ${wrap.length} functions watched${miss.length ? '; not wrapped: ' + miss.join(', ') : ''}`);
  if (errs.length) console.log('PAGE ERRORS', [...new Set(errs)].join(' | '));
  for (const r of merge(bad)) console.log('BACKWARDS  ' + fmt(r) + `   re-render ${chunk(r.t0, r.t1)} s`);
  for (const r of merge(eye)) console.log('EYE REVIEW ' + fmt(r) + `  [${r.why}]`);
  if (ALL) for (const r of merge(ok)) console.log('ok         ' + fmt(r));
  console.log(bad.length ? `${merge(bad).length} backwards mover(s)` : `no backwards movers (${merge(ok).length} annotated movers face the right way${merge(eye).length ? ', ' + merge(eye).length + ' for eye review' : ''})`);
  process.exit(bad.length ? 1 : 0); })();
