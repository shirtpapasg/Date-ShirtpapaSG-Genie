// pose_audit.js: every buddy pose actually on screen in a part (samples render(t) every 0.1 s through lib.js's debug hook window._POSE).
//   NODE_PATH=$(npm root -g) node pose_audit.js <part>   -> out/poses_p<part>.json [{who, pose, t0, t1, scene, why, x, y, h, peek}] + a table
// "why" = where the pose came from: scene (the scene's own pose list), outcome (lib.js OUTCOMES: right/wrong at a reveal), react:<line>
// (lib.js reactPose: a listener answering a line). Sitting/talking sprites are not listed. Used for the review sheets qa/buddy_faces_p*.jpg.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const P = +(process.argv[2] || 1), TL = JSON.parse(fs.readFileSync(path.join(__dirname, `tl_p${P}.json`))), b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.join(__dirname, 'page.html') + '?part=' + P); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  const res = await p.evaluate((END) => { const out = []; for (let i = 0; i * .1 < END; i++) { const t = i * .1; window._POSE = []; window.render(t); const seen = {};
      for (const e of window._POSE) seen[e.who] = e;   // the last one drawn is on top (a look-closer's face over the dimmed set behind it)
      for (const e of Object.values(seen)) if (!/_sit_/.test(e.name)) out.push({ t: +t.toFixed(2), scene: window._S.name, ...e }); }
    window._POSE = null; return out; }, TL.END);
  await b.close(); const iv = [];
  for (const e of res) { const pose = e.name.replace(e.who + '_', ''), last = iv.filter((v) => v.who === e.who).pop();
    if (last && last.pose === pose && last.scene === e.scene && e.t - last.t1 < .15) { last.t1 = e.t; continue; }
    iv.push({ who: e.who, pose, t0: e.t, t1: e.t, scene: e.scene, why: e.why, x: Math.round(e.x), y: Math.round(e.y), h: Math.round(e.h), peek: e.peek }); }
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true }); fs.writeFileSync(path.join(__dirname, `out/poses_p${P}.json`), JSON.stringify(iv, null, 1));
  const mm = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, '0')}`;
  for (const v of iv) console.log(`${mm(v.t0)}-${mm(v.t1)}  ${v.scene.padEnd(10)} ${v.who.padEnd(6)} ${v.pose.padEnd(13)} ${v.why}`);
  console.log(iv.length, 'pose moments'); })();
