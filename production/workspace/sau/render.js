// render.js: frames f0..f1 of a page into an mp4 (no audio). node render.js page.html out.mp4 f0 f1 fps W H
const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => { const [file, out, f0s, f1s, fpss, Ws, Hs] = process.argv.slice(2); const f0 = +f0s, f1 = +f1s, FPS = +fpss, W = +Ws, H = +Hs;
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], {stdio: ['pipe', 'inherit', 'inherit']});
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + require('path').resolve(file)); await p.waitForFunction(() => window.READY === true);
  for (let i = f0; i < f1; i++) { await p.evaluate(t => window.render(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((i - f0) % 600 === 0) console.log(out, i - f0, '/', f1 - f0); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); })();
