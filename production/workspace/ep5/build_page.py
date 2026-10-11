import sys
ep, scenes, tag = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(scenes).read()
h = open('../ep1/ep1.html').read(); a = h.index('/* =================== SCENES'); b = h.index('/* ---------- confetti')
h = h[:a] + s + '\n' + h[b:]; h = h.replace('⚙ P4 SCIENCE · EP 1', tag)
open(f'{ep}.html', 'w').write(h); open(f'{ep}b.html', 'w').write(h.replace('__TL__', open('tl.json').read()))
