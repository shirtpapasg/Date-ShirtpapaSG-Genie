#!/usr/bin/env node
/*
 * make_thumbs.js - YouTube thumbnails for "TheOneApp Explained" (any level: P3, P4, ...).
 *
 * Teacher's rule: every thumbnail shows
 *   1. LEVEL + TOPIC, big and bold        (e.g. "P4 Systems")
 *   2. the brand "TheOneApp Explained"
 *   3. the MAIN IDEA in a few words        (e.g. "Parts work together")
 *   4. a colourful frame from the episode itself as the background.
 * Every episode uses the same layout, so a playlist reads as one set.
 *
 * usage:
 *   NODE_PATH=$(npm root -g) node make_thumbs.js p4.json --videos /path/to/videos [options]
 *
 * options:
 *   --videos DIR    folder holding <LEVEL>_EP<NN>_*.mp4 (files containing "_part" are ignored)
 *   --out DIR       output folder (default: the folder of the config file)
 *   --only 1,5,9    render only these episodes (contact/feed sheets still use every existing thumbnail)
 *   --feed 1,4,7    the 6 episodes shown in feedsize.jpg (default: the 6 longest texts)
 *   --no-sheets     skip contact.jpg and feedsize.jpg
 *   --chromium PATH Chromium executable (default /opt/pw-browsers/chromium if it exists)
 *
 * config (JSON array, one object per episode):
 *   { "ep": 1, "level": "P4", "topic": "Systems", "idea": "Parts work together",
 *     "frameTime": 43.9,              // seconds into the final video
 *     "crop": [x, y, w],              // optional: source-pixel window (height = w * 9/16); default DEFAULT_CROP.
 *                                     //   It may run past the frame edge: the edge pixels are smeared outwards.
 *     "erase": [[x, y, w, h], ...],   // optional: frame rectangles filled with the surrounding colour
 *                                     //   (removes stray in-frame chips/captions next to the thumbnail text)
 *     "video": "path.mp4",            // optional: overrides the --videos lookup
 *     "accent": "#ffd23f" }           // optional: colour of the idea ribbon
 *
 * outputs (in --out):
 *   <LEVEL>_EP<NN>_thumbnail.jpg   1280x720 JPG (< 2 MB)
 *   contact.jpg                    every thumbnail in a grid
 *   feedsize.jpg                   6 thumbnails at YouTube feed size (320x180)
 *   frames/                        cached source frames (PNG, 1920x1080)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const W = 1280, H = 720;                 // thumbnail size
const SRC_W = 1920, SRC_H = 1080;        // episode video size
// Default crop: skip the episode tag (top-left, y < 100), the KEY WORDS shelf (x > 1500)
// and the caption pill (y > 965). 1500 x 844 window, zoom 1.28x.
const DEFAULT_CROP = [0, 110, 1500];
const USABLE_H = 1066;                   // rows below this hold the episode progress bar: never shown, never smeared
const BRAND = 'TheOneApp Explained';
const NAVY = '#1b1b3a';
const YELLOW = '#ffd23f';

function parseArgs(argv) {
  const a = { config: null, videos: null, out: null, only: null, feed: null, sheets: true, chromium: null };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--videos') a.videos = argv[++i];
    else if (k === '--out') a.out = argv[++i];
    else if (k === '--only') a.only = argv[++i].split(',').map(Number);
    else if (k === '--feed') a.feed = argv[++i].split(',').map(Number);
    else if (k === '--no-sheets') a.sheets = false;
    else if (k === '--chromium') a.chromium = argv[++i];
    else if (!a.config) a.config = k;
    else throw new Error('unknown argument ' + k);
  }
  if (!a.config) throw new Error('usage: node make_thumbs.js config.json --videos DIR [--out DIR]');
  a.out = path.resolve(a.out || path.dirname(path.resolve(a.config)));
  return a;
}

const pad2 = n => String(n).padStart(2, '0');
const baseName = e => `${e.level}_EP${pad2(e.ep)}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function findVideo(e, videosDir) {
  if (e.video) return path.resolve(e.video);
  if (!videosDir) throw new Error(`EP${e.ep}: no --videos folder and no "video" in config`);
  const pre = baseName(e) + '_';
  const hits = fs.readdirSync(videosDir).filter(f => f.startsWith(pre) && f.endsWith('.mp4') && !f.includes('_part'));
  if (hits.length !== 1) throw new Error(`EP${e.ep}: expected one ${pre}*.mp4 in ${videosDir}, found ${JSON.stringify(hits)}`);
  return path.join(videosDir, hits[0]);
}

function grabFrame(video, t, outPng) {
  if (fs.existsSync(outPng) && fs.statSync(outPng).mtimeMs > fs.statSync(video).mtimeMs) return outPng;
  execFileSync('nice', ['-n', '10', 'ffmpeg', '-v', 'error', '-y', '-ss', String(t), '-i', video,
    '-frames:v', '1', '-update', '1', outPng]);
  return outPng;
}

function validate(e) {
  for (const k of ['ep', 'level', 'topic', 'idea', 'frameTime']) if (e[k] === undefined) throw new Error(`EP${e.ep}: missing "${k}"`);
  const words = e.idea.trim().split(/\s+/).length;
  if (words > 6) console.warn(`  ! EP${e.ep}: idea has ${words} words (aim for 5 or fewer)`);
  const [x, y, w] = e.crop || DEFAULT_CROP, h = w * 9 / 16;
  if (!(w > 0)) throw new Error(`EP${e.ep}: bad crop ${JSON.stringify(e.crop)}`);
  const pad = Math.max(-x, -y, x + w - SRC_W, y + h - USABLE_H, 0);
  if (pad > 0) console.log(`  EP${e.ep}: crop runs ${Math.round(pad)} px past the frame edge (edge pixels are smeared to fill it)`);
  for (const r of e.erase || []) if (r.length !== 4) throw new Error(`EP${e.ep}: erase entries are [x, y, w, h]`);
}

function fontFaces(fontDir) {
  return [500, 600, 700].map(wt =>
    `@font-face{font-family:Fredoka;font-weight:${wt};src:url("file://${fontDir}/fredoka-latin-${wt}-normal.woff2") format("woff2")}`).join('\n');
}

function thumbHtml(e, framePng, fontDir) {
  const accent = e.accent || YELLOW;
  const bgSpec = { crop: e.crop || DEFAULT_CROP, erase: e.erase || [], usableH: USABLE_H };
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces(fontDir)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${NAVY}}
#stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;font-family:Fredoka,sans-serif}
#bg{position:absolute;left:0;top:0;width:${W}px;height:${H}px}
/* readability: soft dark gradients behind the top and bottom text */
#shadeTop{position:absolute;left:0;top:0;width:100%;height:270px;
  background:linear-gradient(180deg,rgba(14,14,40,.66) 0%,rgba(14,14,40,.42) 50%,rgba(14,14,40,0) 100%)}
#shadeBot{position:absolute;left:0;bottom:0;width:100%;height:200px;
  background:linear-gradient(0deg,rgba(14,14,40,.50) 0%,rgba(14,14,40,.22) 55%,rgba(14,14,40,0) 100%)}
#brand{position:absolute;left:36px;top:22px;height:70px;padding:0 28px;border-radius:35px;
  background:${NAVY};border:4px solid #fff;color:#fff;font-weight:600;font-size:44px;line-height:62px;
  white-space:nowrap;box-shadow:0 5px 0 rgba(0,0,0,.35)}
#brand b{font-weight:700;color:${YELLOW}}
#topic{position:absolute;left:30px;top:100px;white-space:nowrap;font-weight:700;font-size:118px;line-height:1.08;
  color:#fff;-webkit-text-stroke:18px ${NAVY};paint-order:stroke fill;letter-spacing:1px;
  filter:drop-shadow(0 7px 0 rgba(0,0,0,.40))}
#topic .lvl{color:${YELLOW};margin-right:.24em}
#idea{position:absolute;left:36px;bottom:34px;white-space:nowrap;background:${accent};color:${NAVY};
  font-weight:700;font-size:78px;line-height:1.12;padding:6px 34px 10px;border:7px solid ${NAVY};border-radius:30px;
  box-shadow:0 9px 0 rgba(0,0,0,.40)}
</style></head><body><div id="stage">
<canvas id="bg" width="${W}" height="${H}"></canvas>
<div id="shadeTop"></div><div id="shadeBot"></div>
<div id="brand">TheOneApp <b>Explained</b></div>
<div id="topic"><span class="lvl">${esc(e.level)}</span>${esc(e.topic)}</div>
<div id="idea">${esc(e.idea)}</div>
</div>
<script>
const BG = ${JSON.stringify(bgSpec)};
// Paint the background: the crop window of the frame, scaled to ${W}x${H}.
// Where the window runs past the frame edge, the frame's edge band is smeared outwards (averaged across
// its depth and smoothed along its length), which continues the flat cartoon backgrounds seamlessly.
// "erase" rectangles (frame pixels) are refilled from their surroundings: the average colours of the
// strips above, below, left and right are blended across the rectangle (so gradients continue), and the
// patch is feathered into the frame. This removes stray in-frame chips/captions next to our own text.
window.paintBg = () => new Promise((resolve, reject) => {
  const img = new Image();
  img.onerror = () => reject(new Error('frame image failed to load'));
  img.onload = () => {
    const FW = img.naturalWidth, FH = Math.min(img.naturalHeight, BG.usableH);
    const src = document.createElement('canvas'); src.width = FW; src.height = FH;
    const sc = src.getContext('2d', { willReadFrequently: true });
    sc.drawImage(img, 0, 0, FW, FH, 0, 0, FW, FH);
    const avg = (x0, y0, x1, y1) => {                 // mean colour of a clipped rectangle, or null
      x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0));
      x1 = Math.min(FW, Math.round(x1)); y1 = Math.min(FH, Math.round(y1));
      if (x1 - x0 < 1 || y1 - y0 < 1) return null;
      const d = sc.getImageData(x0, y0, x1 - x0, y1 - y0).data; let r = 0, g = 0, b = 0;
      for (let k = 0; k < d.length; k += 4) { r += d[k]; g += d[k + 1]; b += d[k + 2]; }
      const n = d.length / 4; return [r / n, g / n, b / n];
    };
    for (let [x, y, w, h] of BG.erase) {
      x = Math.max(0, x); y = Math.max(0, y); w = Math.min(FW - x, w); h = Math.min(FH - y, h);
      if (w < 1 || h < 1) continue;
      const S = 8, F = 8;                                // sample strip depth, feather width
      let T = avg(x, y - S, x + w, y), Bo = avg(x, y + h, x + w, y + h + S);
      let L = avg(x - S, y, x, y + h), R = avg(x + w, y, x + w + S, y + h);
      const any = T || Bo || L || R; if (!any) continue;
      T = T || Bo || L || R; Bo = Bo || T; L = L || R || T; R = R || L;
      const id = sc.getImageData(x, y, w, h), d = id.data;
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
        const u = w > 1 ? i / (w - 1) : 0.5, v = h > 1 ? j / (h - 1) : 0.5;
        const edge = Math.min(i, j, w - 1 - i, h - 1 - j), a = Math.min(1, (edge + 1) / F);
        const k = (j * w + i) * 4;
        for (let c = 0; c < 3; c++) {
          const fill = ((1 - v) * T[c] + v * Bo[c] + (1 - u) * L[c] + u * R[c]) / 2;
          d[k + c] = a * fill + (1 - a) * d[k + c];
        }
      }
      sc.putImageData(id, x, y);
    }
    const [cx, cy, cw] = BG.crop, s = ${W} / cw;
    const c = document.getElementById('bg').getContext('2d');
    c.setTransform(s, 0, 0, s, -cx * s, -cy * s);
    const P = 4000, B = 12, O = 2, SM = 24;           // smear length, band depth, overlap, smoothing radius
    // One edge band -> a 1-px line: averaged across the band depth, then blurred along its length
    // (ends clamped, so the line stays fully opaque).
    const line = (sx, sy, sw, sh, horizontal) => {
      const len = horizontal ? sw : sh, M = 3 * SM, T = 4 * SM + 1;
      const a = document.createElement('canvas'); a.width = horizontal ? len : 1; a.height = horizontal ? 1 : len;
      const ac = a.getContext('2d'); ac.imageSmoothingQuality = 'high';
      ac.drawImage(src, sx, sy, sw, sh, 0, 0, a.width, a.height);
      const pad = document.createElement('canvas'), pc = pad.getContext('2d');
      if (horizontal) {
        pad.width = len + 2 * M; pad.height = T;
        pc.drawImage(a, 0, 0, len, 1, M, 0, len, T);
        pc.drawImage(a, 0, 0, 1, 1, 0, 0, M, T); pc.drawImage(a, len - 1, 0, 1, 1, M + len, 0, M, T);
      } else {
        pad.width = T; pad.height = len + 2 * M;
        pc.drawImage(a, 0, 0, 1, len, 0, M, T, len);
        pc.drawImage(a, 0, 0, 1, 1, 0, 0, T, M); pc.drawImage(a, 0, len - 1, 1, 1, 0, M + len, T, M);
      }
      const bl = document.createElement('canvas'); bl.width = pad.width; bl.height = pad.height;
      const bc = bl.getContext('2d'); bc.filter = 'blur(' + SM / 2 + 'px)'; bc.drawImage(pad, 0, 0);
      const out = document.createElement('canvas'); out.width = a.width; out.height = a.height;
      const oc = out.getContext('2d');
      if (horizontal) oc.drawImage(bl, M, 2 * SM, len, 1, 0, 0, len, 1);
      else oc.drawImage(bl, 2 * SM, M, 1, len, 0, 0, 1, len);
      return out;
    };
    const dot = (sx, sy) => { const e = document.createElement('canvas'); e.width = e.height = 1;
      const ec = e.getContext('2d'); ec.imageSmoothingQuality = 'high'; ec.drawImage(src, sx, sy, B, B, 0, 0, 1, 1); return e; };
    c.imageSmoothingQuality = 'high';
    c.drawImage(line(0, 0, B, FH, false), -P, 0, P + O, FH);                    // left
    c.drawImage(line(FW - B, 0, B, FH, false), FW - O, 0, P + O, FH);           // right
    c.drawImage(line(0, 0, FW, B, true), 0, -P, FW, P + O);                     // top
    c.drawImage(line(0, FH - B, FW, B, true), 0, FH - O, FW, P + O);            // bottom
    c.drawImage(dot(0, 0), -P, -P, P + O, P + O);                               // corners
    c.drawImage(dot(FW - B, 0), FW - O, -P, P + O, P + O);
    c.drawImage(dot(0, FH - B), -P, FH - O, P + O, P + O);
    c.drawImage(dot(FW - B, FH - B), FW - O, FH - O, P + O, P + O);
    c.drawImage(src, 0, 0);
    resolve({ FW, FH });
  };
  img.src = ${JSON.stringify('file://' + framePng)};
});
window.fit = () => {
  // shrink a nowrap element's font until it fits in maxW; report what happened
  const out = {};
  const shrink = (id, maxW, minPx) => {
    const el = document.getElementById(id);
    let px = parseFloat(getComputedStyle(el).fontSize);
    while (el.getBoundingClientRect().width > maxW && px > minPx) { px -= 1; el.style.fontSize = px + 'px'; }
    const r = el.getBoundingClientRect();
    out[id] = { px, left: r.left, right: r.right, top: r.top, bottom: r.bottom, fits: r.width <= maxW };
  };
  shrink('topic', ${W - 60}, 78);
  shrink('idea', ${W - 72}, 54);
  const b = document.getElementById('brand').getBoundingClientRect();
  out.brand = { left: b.left, right: b.right, top: b.top, bottom: b.bottom };
  return out;
};
</script></body></html>`;
}

async function render(page, htmlPath, outJpg) {
  await page.goto('file://' + htmlPath);
  await page.evaluate(async () => { await document.fonts.ready; await window.paintBg(); });
  const ok = await page.evaluate(() => document.fonts.check('700 40px Fredoka'));
  if (!ok) throw new Error('Fredoka did not load');
  const geo = await page.evaluate(() => window.fit());
  await page.screenshot({ path: outJpg, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1280, height: 720 } });
  return geo;
}

function checkGeometry(e, g) {
  const issues = [];
  for (const k of ['topic', 'idea']) if (!g[k].fits) issues.push(`${k} does not fit even at ${g[k].px}px`);
  if (g.topic.top < g.brand.bottom - 14) issues.push('topic overlaps brand');
  if (g.idea.top < g.topic.bottom + 120) issues.push('idea too close to topic');
  for (const k of ['topic', 'idea', 'brand']) if (g[k].left < 20 || g[k].right > W - 20 || g[k].top < 10 || g[k].bottom > H - 18) issues.push(`${k} outside safe area`);
  return issues;
}

async function sheetPage(page, html, outJpg, w, h) {
  await page.setViewportSize({ width: w, height: h });
  const tmp = outJpg.replace(/\.jpg$/, '.html');
  fs.writeFileSync(tmp, html);
  await page.goto('file://' + tmp);
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = r; i.onerror = r; }))); });
  await page.screenshot({ path: outJpg, type: 'jpeg', quality: 88, fullPage: false });
  fs.unlinkSync(tmp);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cfg = JSON.parse(fs.readFileSync(args.config, 'utf8'));
  const eps = Array.isArray(cfg) ? cfg : cfg.episodes;
  const fontDir = path.join(__dirname, 'fonts');
  const frameDir = path.join(args.out, 'frames');
  const workDir = path.join(args.out, '.work');
  [args.out, frameDir, workDir].forEach(d => fs.mkdirSync(d, { recursive: true }));
  eps.forEach(validate);

  const exe = args.chromium || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  let browser;
  const launchArgs = ['--allow-file-access-from-files'];     // lets the page read the local frame's pixels
  try { browser = await chromium.launch(exe ? { executablePath: exe, args: launchArgs } : { args: launchArgs }); }
  catch (err) { browser = await chromium.launch({ args: launchArgs }); }
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  const todo = eps.filter(e => !args.only || args.only.includes(e.ep));
  let problems = 0;
  for (const e of todo) {
    const video = findVideo(e, args.videos);
    const png = grabFrame(video, e.frameTime, path.join(frameDir, `${baseName(e)}_${Number(e.frameTime).toFixed(2)}.png`));
    const htmlPath = path.join(workDir, baseName(e) + '.html');
    fs.writeFileSync(htmlPath, thumbHtml(e, png, fontDir));
    const outJpg = path.join(args.out, baseName(e) + '_thumbnail.jpg');
    const g = await render(page, htmlPath, outJpg);
    const issues = checkGeometry(e, g);
    const kb = Math.round(fs.statSync(outJpg).size / 1024);
    if (kb > 2000) issues.push(`file is ${kb} KB (limit 2 MB)`);
    problems += issues.length;
    console.log(`${baseName(e)}  ${kb} KB  topic ${g.topic.px}px  idea ${g.idea.px}px  "${e.level} ${e.topic}" / "${e.idea}" @${e.frameTime}s` +
      (issues.length ? '\n    ! ' + issues.join('; ') : ''));
  }

  if (args.sheets) {
    const all = eps.map(e => ({ e, f: path.join(args.out, baseName(e) + '_thumbnail.jpg') })).filter(x => fs.existsSync(x.f));
    // contact sheet: 4 columns of 480x270
    const cols = 4, tw = 480, th = 270, gap = 14, lab = 30;
    const rows = Math.ceil(all.length / cols);
    const cw = cols * tw + (cols + 1) * gap, ch = rows * (th + lab) + (rows + 1) * gap;
    const cells = all.map(({ e, f }) => `<div class="c"><img src="file://${f}"><div class="l">EP${pad2(e.ep)} · ${esc(e.level + ' ' + e.topic)}</div></div>`).join('');
    await sheetPage(page, `<!doctype html><html><head><meta charset="utf-8"><style>${fontFaces(fontDir)}
      body{margin:0;background:#20202a;font-family:Fredoka,sans-serif}
      .g{display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:${gap}px;padding:${gap}px}
      .c img{width:${tw}px;height:${th}px;display:block;border-radius:8px}
      .l{color:#ddd;font-size:18px;font-weight:500;height:${lab}px;line-height:${lab}px;padding-left:4px}
      </style></head><body><div class="g">${cells}</div></body></html>`, path.join(args.out, 'contact.jpg'), cw, ch);

    // feed-size check: 6 thumbnails scaled to 320x180 with a good (lanczos) filter, as YouTube shows them
    let pick = args.feed ? all.filter(x => args.feed.includes(x.e.ep))
      : [...all].sort((a, b) => (b.e.topic.length + b.e.idea.length) - (a.e.topic.length + a.e.idea.length)).slice(0, 6).sort((a, b) => a.e.ep - b.e.ep);
    const small = pick.map(({ e, f }) => {
      const p = path.join(workDir, baseName(e) + '_320.png');
      execFileSync('nice', ['-n', '10', 'ffmpeg', '-v', 'error', '-y', '-i', f, '-vf', 'scale=320:180:flags=lanczos', '-update', '1', p]);
      return { e, p };
    });
    const fcells = small.map(({ e, p }) => `<div class="c"><img src="file://${p}"><div class="t">${esc(e.level + ' ' + e.topic)}: ${esc(e.idea)}</div><div class="m">TheOneApp Explained</div></div>`).join('');
    await sheetPage(page, `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#fff;font-family:Roboto,Arial,sans-serif}
      .g{display:grid;grid-template-columns:repeat(3,320px);gap:28px 16px;padding:24px}
      .c img{width:320px;height:180px;display:block;border-radius:10px}
      .t{font-size:14px;font-weight:600;color:#0f0f0f;margin-top:10px;line-height:18px}
      .m{font-size:12px;color:#606060;margin-top:4px}
      </style></head><body><div class="g">${fcells}</div></body></html>`, path.join(args.out, 'feedsize.jpg'), 3 * 320 + 2 * 16 + 48, 2 * 250 + 28 + 48);
    console.log(`sheets: contact.jpg (${all.length}), feedsize.jpg (EP ${pick.map(x => x.e.ep).join(', ')})`);
  }
  await browser.close();
  if (problems) { console.log(`${problems} layout problem(s) - see "!" lines`); process.exitCode = 1; }
}

main().catch(err => { console.error(err.stack || err); process.exit(1); });
