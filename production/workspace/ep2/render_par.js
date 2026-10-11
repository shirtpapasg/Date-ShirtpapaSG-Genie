const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => { const [file, out, f0s, f1s, fpss] = process.argv.slice(2); const f0 = +f0s, f1 = +f1s, FPS = +fpss;
  const ff = spawn('ffmpeg', ['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','17','-pix_fmt','yuv420p','-r',String(FPS),out], {stdio:['pipe','inherit','inherit']});
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + file); await p.waitForFunction(() => window.READY === true);
  for (let i = f0; i < f1; i++) { await p.evaluate(t => window.render(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((i - f0) % 600 === 0) console.log(out, i - f0, '/', f1 - f0); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); })();
