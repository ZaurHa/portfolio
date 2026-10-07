"""Bildfolge -> 30-fps-Zwischenvideo -> nahtlose Schleife (Überblendung an der Naht), H.264."""
import json, subprocess, sys, os
REC = os.environ.get('REC_DIR', '/tmp/rec')

def build_full(name):
    """Gibt den Zeitversatz zurück, um den die verworfenen Startbilder die Zeitachse verschieben."""
    from PIL import Image
    d = f'{REC}/{name}'
    fr = json.load(open(f'{d}/meta.json'))['frames']
    t0 = fr[0]['t']
    fr = [f for f in fr if Image.open(f"{d}/f{f['i']:05d}.jpg").size == (1280, 800)]
    offset = fr[0]['t'] - t0
    lines = ['ffconcat version 1.0']
    for k, f in enumerate(fr):
        dur = (fr[k + 1]['t'] - f['t']) if k + 1 < len(fr) else 0.04
        lines += [f"file 'f{f['i']:05d}.jpg'", f'duration {max(dur, 0.001):.5f}']
    lines.append(f"file 'f{fr[-1]['i']:05d}.jpg'")
    open(f'{d}/list.txt', 'w').write('\n'.join(lines) + '\n')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{d}/list.txt',
                    '-vf', 'fps=30,scale=in_range=pc:out_range=tv,format=yuv420p', '-color_range', 'tv', '-c:v', 'libx264', '-preset', 'fast', '-crf', '14',
                    f'{d}/full.mp4'], check=True)
    json.dump({'offset': offset}, open(f'{d}/full.json', 'w'))
    return offset

def loop(name, out, S, L, C, w, h, crf):
    d = f'{REC}/{name}'
    fc = (f"[0:v]split[a][b];"
          f"[a]trim=start={S}:end={S + L},setpts=PTS-STARTPTS[main];"
          f"[b]trim=start={S + L}:end={S + L + C},setpts=PTS-STARTPTS,format=yuva420p,"
          f"fade=t=out:st=0:d={C}:alpha=1[tail];"
          f"[main][tail]overlay=eof_action=pass,scale={w}:{h}:flags=lanczos,format=yuv420p[v]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{d}/full.mp4', '-filter_complex', fc, '-map', '[v]',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', str(crf), '-profile:v', 'high',
                    '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', '-an', '-r', '30', out], check=True)
    print(f'{os.path.basename(out):24} {os.path.getsize(out) // 1024:5d} KB  ({L:.1f} s, {w}x{h}, crf {crf})')

if __name__ == '__main__':
    clips = json.loads(sys.argv[1])
    for c in clips:
        if c.get('rebuild', True):
            build_full(c['name'])
        off = json.load(open(f"{REC}/{c['name']}/full.json"))['offset']
        loop(c['name'], c['out'], round(c['S'] - off, 3), c['L'], c['C'], c['w'], c['h'], c['crf'])
