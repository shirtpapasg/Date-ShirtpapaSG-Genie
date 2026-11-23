// faces_sheet.js: close-ups of every buddy pose actually on screen (out/poses_p<part>.json from pose_audit.js), one crop per pose moment,
// for the teacher's face review. NODE_PATH=$(npm root -g) node faces_sheet.js <part>  -> out/faces_p<part>/NN.png + list.json; then
// /home/user/heart-tts/venv/bin/python faces_sheet.py <part> -> qa/buddy_faces_p<part>.jpg (labelled with the time and the REASON).
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const P = +(process.argv[2] || 1), iv = JSON.parse(fs.readFileSync(path.join(__dirname, `out/poses_p${P}.json`))), dir = path.join(__dirname, `out/faces_p${P}`);
  fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'page.html') + '?part=' + P); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  const list = [];
  for (const [i, v] of iv.entries()) { const t = v.t0 + Math.min(.6, (v.t1 - v.t0) / 2);
    const e = await p.evaluate(([t, who]) => { window._POSE = []; window.render(t); const a = window._POSE.filter((q) => q.who === who).pop(); window._POSE = null; return a; }, [t, v.who]);
    const g = e || v, w = Math.min(1920, g.h * 1.3), x0 = Math.max(0, Math.min(1920 - w, g.x - w / 2)), y0 = Math.min(900, Math.max(0, g.y - g.h * 1.15)), y1 = Math.max(y0 + 120, Math.min(1080, g.y + g.h * .05));
    const f = path.join(dir, `${String(i).padStart(2, '0')}.png`); await p.screenshot({ path: f, clip: { x: x0, y: y0, width: w, height: Math.max(40, y1 - y0) } });
    list.push({ ...v, t, file: f }); }
  fs.writeFileSync(path.join(dir, 'list.json'), JSON.stringify(list, null, 1)); await b.close(); console.log(list.length, 'crops'); })();
