const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const ROOT = '/home/user/theoneapp-video';
const PORT = fs.readFileSync(path.join(__dirname, 'port'), 'utf8').trim();
const BASE = 'http://127.0.0.1:' + PORT;
const SNAP = '/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/snaps/';
const ID = process.env.VID === 'empty' ? '' : 'dQw4w9WgXcQ';

const STUB = `
(function(){
  window.__yt = { calls: [], created: 0 };
  function P(el, opts){
    var self=this; window.__yt.created++; window.__ytp=self;
    self.state = window.__ytStartState==null ? 1 : window.__ytStartState; self.muted = true; self.vol=100;
    function rec(n,a){ window.__yt.calls.push(n); }
    self.getPlayerState=function(){ return self.state; };
    self.pauseVideo=function(){ rec('pauseVideo'); self.state=2; };
    self.playVideo=function(){ rec('playVideo'); self.state=1; opts.events.onStateChange && opts.events.onStateChange({data:1,target:self}); };
    self.unMute=function(){ rec('unMute'); self.muted=false; };
    self.mute=function(){ rec('mute'); self.muted=true; };
    self.isMuted=function(){ return self.muted; };
    self.getVolume=function(){ return self.vol; };
    self.setVolume=function(v){ rec('setVolume'); self.vol=v; };
    setTimeout(function(){ opts.events.onReady && opts.events.onReady({target:self}); }, window.__ytReadyDelay||30);
  }
  window.YT = { Player: P, PlayerState: {PLAYING:1,PAUSED:2} };
  if (typeof window.onYouTubeIframeAPIReady === 'function') window.onYouTubeIframeAPIReady();
})();`;

async function setup(ctx, opts = {}) {
  const net = [];
  await ctx.route('**/*', async (route) => {
    const u = route.request().url();
    if (/youtube|ytimg|googlevideo/.test(u)) net.push(u);
    if (u.endsWith('/mindlab-video.js')) {
      let src = fs.readFileSync(path.join(ROOT, 'mindlab-video.js'), 'utf8');
      src = src.replace("var MINDLAB_VIDEO_ID = '';", "var MINDLAB_VIDEO_ID = '" + ID + "';");
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: src });
    }
    if (u.startsWith('https://www.youtube.com/iframe_api')) {
      if (opts.noApi) return route.abort();
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: STUB });
    }
    if (u.startsWith('https://www.youtube-nocookie.com/embed/')) {
      return route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body style="margin:0;background:#222;color:#fff;font:20px sans-serif;display:grid;place-items:center;height:100vh">FAKE YOUTUBE EMBED</body></html>' });
    }
    if (u.startsWith(BASE)) return route.continue();
    if (u.includes('three.min.js')) return route.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync('/tmp/claude-0/-home-user/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad/dl-three/package/build/three.min.js', 'utf8') });
    if (/fonts\.g/.test(u)) return route.abort();
    return route.continue();
  });
  return net;
}

module.exports = { setup, BASE, SNAP, ID, chromium };
