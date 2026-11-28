// render.js: frames -> out/chunks/c_NNNN.mp4 (300 frames each; finished chunks are kept, so a restart loses little), then out/video.mp4.
//   NODE_PATH=$(npm root -g) node render.js <part> [workers=3] [t0 t1]     With t0 t1 it renders only that span to out/clip_<t0>.mp4 (with sound).
const { chromium } = require('playwright'); const { spawn, spawnSync } = require('child_process'); const fs = require('fs'), path = require('path');
const PART = +(process.argv[2] || 1), TL = JSON.parse(fs.readFileSync(path.join(__dirname, `tl_p${PART}.json`))), FPS = 30, CH = 300, OUT = process.env.RENDER_OUT || path.join(__dirname, 'out');   /* RENDER_OUT=/dev/shm/...: chunks and the joined video in RAM when the disk is tight */
const W = +(process.argv[3] || 3), clip = process.argv[4] !== undefined ? [+process.argv[4], +process.argv[5]] : null;
const F0 = clip ? Math.round(clip[0] * FPS) : 0, F1 = clip ? Math.round(clip[1] * FPS) : Math.ceil(TL.END * FPS), dir = path.join(OUT, clip ? 'clipchunks' : `chunks_p${PART}`);
if (clip) fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
const jobs = []; for (let f = F0; f < F1; f += CH) jobs.push([f, Math.min(F1, f + CH)]);
const name = (j) => path.join(dir, `c_${String(j[0]).padStart(6, '0')}.mp4`);
async function worker(id) { const b = await chromium.launch({ ignoreDefaultArgs: ['--disable-dev-shm-usage'] });   /* Chromium's shared memory in /dev/shm (RAM), not as deleted files in /tmp */ const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + path.join(__dirname, 'page.html') + '?part=' + PART); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 });
  while (jobs.length) { const j = jobs.shift(), out = name(j); if (fs.existsSync(out)) continue; const tmp = out + '.part.mp4';
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = j[0]; i < j[1]; i++) { await p.evaluate(t => window.render(t), i / FPS); const buf = await p.screenshot({ type: 'jpeg', quality: 95 }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); fs.renameSync(tmp, out); console.log(`worker ${id}: frames ${j[0]}-${j[1]} done (${jobs.length} chunks left)`); }
  await b.close(); }
(async () => { const all = jobs.map(name); const t0 = Date.now(); await Promise.all(Array.from({ length: W }, (_, i) => worker(i)));
  const list = path.join(dir, 'list.txt'); fs.writeFileSync(list, all.map(f => `file '${f}'`).join('\n'));
  const vid = path.join(OUT, clip ? `clip_${clip[0]}_v.mp4` : `video_p${PART}.mp4`); spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', vid], { stdio: 'inherit' });
  if (clip && fs.existsSync(path.join(OUT, `mix_p${PART}.wav`))) spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', vid, '-ss', String(clip[0]), '-t', String(clip[1] - clip[0]), '-i', path.join(OUT, `mix_p${PART}.wav`), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', path.join(OUT, `clip_${clip[0]}.mp4`)], { stdio: 'inherit' });
  console.log('done in', ((Date.now() - t0) / 1000 | 0), 's ->', vid); })();
