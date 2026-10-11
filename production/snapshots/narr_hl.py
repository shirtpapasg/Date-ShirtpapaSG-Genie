import json,sys
S="/tmp/claude-0/-home-user-Date-ShirtpapaSG-Genie/8764a423-5385-5445-b38a-c2c2633ecdb7/scratchpad"
n=int(sys.argv[1]); tl=json.load(open(f'{S}/ep{n}/tl.json'))
for sc in tl['scenes']:
  if sc['scene'] in sys.argv[2:]:
    words=[w for c in tl['caps'] if sc['t0']<=c['t0']<sc['t1'] for w in c['w']]
    print(sc['scene'], sc['t0'], sc['t1']); print(' '.join(f"{w['t']}" for w in words)); print()
