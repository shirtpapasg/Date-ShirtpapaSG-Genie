#!/bin/bash
# all captures, one after another, under the shared render lock
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g)
flock /tmp/explained_render.lock node cap.js desk map title ep19 ep05 glitch end > cap_desk.log 2>&1
flock /tmp/explained_render.lock node cap.js phone title ep19 ep05 glitch end > cap_phone.log 2>&1
echo ALLDONE >> cap_phone.log
