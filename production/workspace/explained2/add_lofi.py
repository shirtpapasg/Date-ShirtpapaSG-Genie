#!/usr/bin/env python3
"""add_lofi.py: give a FINISHED Explained part the Kampong Walk background music, without re-rendering the picture.

    python3 add_lofi.py <epdir> <part>                       rebuild the soundtrack with the bed, re-mux <ep>_part<P>.mp4 (video copied)
    python3 add_lofi.py <epdir> <part> --sample <t0> <out>   only a 60 s 720p sample from t0 (the part's mp4 is not touched)
    python3 add_lofi.py <epdir> <part> --force               apply again even if music/applied.json says this mp4 already has it

The rule: SERIES_FORMAT.md section 9, "Background music: Kampong Walk". The tune: music/kampong_walk.wav (music/render_kampong.js,
music/README.md). The soundtrack is rebuilt from the episode's own song.js, cues_p<P>.json, tl_p<P>.json and voice/ (deterministic: the
same voices and effects as the finished part), with the old music beds left out and the bed added (music/lofi_song.js). Then:
  - the mp4's video stream is copied (-c:v copy), the new mix encoded AAC 192k, -movflags +faststart;
  - checks: the timeline's END matches the mp4 (so the cues belong to this render), the new mp4 decodes end to end with no error, the
    video packets and duration are unchanged, -16 LUFS integrated (+-0.5), true peak <= -1.5 dBTP;
  - the old audio track is kept as out/nolofi_p<P>.m4a (put it back: ffmpeg -i <mp4> -i out/nolofi_p<P>.m4a -map 0:v -map 1:a -c copy);
  - music/applied.json records the part, the levels and the new mp4's size and time.
Heavy ffmpeg steps hold /tmp/explained_render.lock (flock), like build_part.sh; finish.sh (already under that lock) sets
EXPLAINED_LOCK_HELD=1. In finish.sh, after the mux:  EXPLAINED_LOCK_HELD=1 python3 ../add_lofi.py . $P || exit 1
"""
import fcntl, json, os, re, shutil, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
MUSIC = os.path.join(HERE, 'music')
LOCK = '/tmp/explained_render.lock'
APPLIED = os.path.join(MUSIC, 'applied.json')


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode != 0:
        sys.exit(f'FAILED: {" ".join(cmd)}\n{r.stdout[-3000:]}\n{r.stderr[-3000:]}')
    return r


def probe(f):
    r = run(['ffprobe', '-v', 'error', '-count_packets', '-show_entries', 'stream=index,codec_type,codec_name,nb_read_packets,duration,width,height,sample_rate',
             '-show_entries', 'format=duration', '-of', 'json', f])
    return json.loads(r.stdout)


def loudness(f):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f, '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True)
    s = r.stderr[r.stderr.rfind('Summary:'):]
    i = float(re.search(r'I:\s+(-?[\d.]+) LUFS', s).group(1)); tp = float(re.search(r'Peak:\s+(-?[\d.]+|-inf) dBFS', s).group(1))
    return i, tp


class Lock:
    def __enter__(self):
        self.f = None
        if os.environ.get('EXPLAINED_LOCK_HELD'): return self   # finish.sh runs under build_part.sh's flock already
        self.f = open(LOCK, 'a'); t = time.time(); fcntl.flock(self.f, fcntl.LOCK_EX)
        if time.time() - t > 5: print(f'  (waited {time.time() - t:.0f} s for the render lock)')
        return self

    def __exit__(self, *a):
        if not self.f: return
        fcntl.flock(self.f, fcntl.LOCK_UN); self.f.close()


def mix(epdir, part, out, ceiling=None):
    env = dict(os.environ)
    if ceiling: env['LOFI_CEILING'] = str(ceiling)
    t = time.time()
    r = run(['node', os.path.join(MUSIC, 'lofi_song.js'), epdir, str(part), out], env=env)
    info = json.loads([l for l in r.stdout.splitlines() if l.startswith('LOFI ')][-1][5:])
    print(f'  mix built in {time.time() - t:.0f} s: bed {info["bed_under_voice_lufs_s"]} LUFS-S under voice, {info["bed_in_gaps_lufs_s"]} in gaps; '
          f'master {info["final_lufs"]} LUFS; silent under {", ".join(d[0] for d in info["dips"])}; '
          f'{info["continuity"]["beds"]} bed, {info["continuity"]["beat_restarts"]} beat restarts, {info["continuity"]["hard_cuts"]} hard cuts')
    if info['continuity']['hard_cuts']: sys.exit('the bed has a hard cut: check the dips')
    return info


def main():
    a = sys.argv[1:]
    force = '--force' in a; a = [x for x in a if x != '--force']
    sample = None
    if '--sample' in a:
        k = a.index('--sample'); sample = (float(a[k + 1]), a[k + 2]); del a[k:k + 3]
    if len(a) != 2: sys.exit(__doc__)
    epdir, part = os.path.abspath(a[0]), int(a[1]); ep = os.path.basename(epdir.rstrip('/'))
    mp4 = os.path.join(epdir, f'{ep}_part{part}.mp4')
    if not os.path.exists(mp4): sys.exit(f'no {mp4}: render the part first')
    tl = json.load(open(os.path.join(epdir, f'tl_p{part}.json'))); cues = json.load(open(os.path.join(epdir, f'cues_p{part}.json')))
    p0 = probe(mp4); dur = float(p0['format']['duration'])
    if abs(dur - tl['END']) > 0.2 or abs(cues['END'] - tl['END']) > 0.01:
        sys.exit(f'{mp4} is {dur:.2f} s but tl_p{part}.json END is {tl["END"]:.2f} s and cues END {cues["END"]:.2f}: the timeline does not belong to this render')
    missing = [i for i in tl['order'] if not os.path.exists(os.path.join(epdir, 'voice', i + '.wav'))]
    if missing: sys.exit(f'{len(missing)} voice wavs missing in {epdir}/voice (e.g. {missing[:3]}): re-make them with the episode\'s make_voice.py first')
    applied = json.load(open(APPLIED)) if os.path.exists(APPLIED) else {}
    key = f'{ep}_part{part}'; st = os.stat(mp4)
    if not sample and not force and key in applied and applied[key].get('size') == st.st_size and abs(applied[key].get('mtime', 0) - st.st_mtime) < 1:
        print(f'{key}: already has Kampong Walk (music/applied.json); --force to redo'); return
    free = shutil.disk_usage(epdir).free
    if free < st.st_size + 700e6: sys.exit(f'only {free / 1e9:.1f} GB free; need {(st.st_size + 700e6) / 1e9:.1f} GB')
    os.makedirs(os.path.join(epdir, 'out'), exist_ok=True)
    wav = os.path.join(epdir, 'out', f'lofi_mix_p{part}.wav')
    print(f'{key}: {dur:.2f} s')
    info = mix(epdir, part, wav)
    try:
        if sample:
            t0, out = sample; os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
            with Lock():
                run(['ffmpeg', '-y', '-v', 'error', '-ss', str(t0), '-t', '60', '-i', mp4, '-ss', str(t0), '-t', '60', '-i', wav, '-map', '0:v', '-map', '1:a',
                     '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k',
                     '-movflags', '+faststart', '-shortest', out])
            ps = probe(out); print(f'  sample {out}: {float(ps["format"]["duration"]):.1f} s'); return
        for attempt in range(3):
            tmp = os.path.join(epdir, f'_{key}_lofi.mp4')
            with Lock():
                run(['ffmpeg', '-y', '-v', 'error', '-i', mp4, '-i', wav, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
                     '-movflags', '+faststart', '-shortest', tmp])
                p1 = probe(tmp)
                v0 = [s for s in p0['streams'] if s['codec_type'] == 'video'][0]; v1 = [s for s in p1['streams'] if s['codec_type'] == 'video'][0]
                a1 = [s for s in p1['streams'] if s['codec_type'] == 'audio']
                if v0['nb_read_packets'] != v1['nb_read_packets'] or (v0['width'], v0['height']) != (v1['width'], v1['height']) or len(a1) != 1:
                    os.remove(tmp); sys.exit(f'video changed in the re-mux: {v0} -> {v1}')
                dec = subprocess.run(['ffmpeg', '-v', 'error', '-i', tmp, '-f', 'null', '-'], capture_output=True, text=True)
                if dec.returncode != 0 or dec.stderr.strip():
                    os.remove(tmp); sys.exit(f'{tmp} does not decode cleanly:\n{dec.stderr[-2000:]}')
                lu, tp = loudness(tmp)
            print(f'  re-muxed: {v1["nb_read_packets"]} video packets (unchanged), decodes end to end, {lu:.1f} LUFS, true peak {tp:.1f} dBTP')
            if tp <= -1.5 and abs(lu + 16) <= 0.5: break
            os.remove(tmp)
            if attempt == 2: sys.exit(f'loudness check failed: {lu} LUFS, {tp} dBTP')
            ceil = 0.84 * 10 ** ((-1.5 - tp - 0.15) / 20) if tp > -1.5 else 0.84
            print(f'  true peak over -1.5 dBTP after AAC: mixing again with the limiter ceiling at {ceil:.3f}')
            info = mix(epdir, part, wav, ceil)
        backup = os.path.join(epdir, 'out', f'nolofi_p{part}.m4a')
        if key not in applied or not os.path.exists(backup):   # the audio as rendered, before any Kampong Walk
            run(['ffmpeg', '-y', '-v', 'error', '-i', mp4, '-map', '0:a:0', '-c', 'copy', backup])
        os.replace(tmp, mp4)
        st = os.stat(mp4)
        info.update({'when': time.strftime('%Y-%m-%d %H:%M UTC', time.gmtime()), 'lufs': lu, 'true_peak': tp, 'duration': round(dur, 3), 'size': st.st_size, 'mtime': st.st_mtime,
                     'video_packets': int(v1['nb_read_packets']), 'backup': os.path.relpath(backup, HERE)})
        applied = json.load(open(APPLIED)) if os.path.exists(APPLIED) else {}
        applied[key] = info; json.dump(applied, open(APPLIED, 'w'), indent=1, sort_keys=True)
        print(f'{key}: DONE, Kampong Walk added ({mp4})')
    finally:
        if os.path.exists(wav): os.remove(wav)


if __name__ == '__main__':
    main()
