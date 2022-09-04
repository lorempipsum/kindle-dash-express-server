#!/bin/bash

dir=$(cd `dirname $0` && pwd)
envFile=$(ls -l $dir/.env | awk '{print $NF}')

# load config
source $envFile

# generate data
cd $dir
./data.sh

# create screenshot
cd $dir/public

echo "running firefox"
firefox --headless --screenshot http://localhost:$DISPLAY_SERVER_PORT --window-size=758,1024
echo "running pngcrush"
pngcrush -c 0 screenshot.png display.png
echo "done doing the screenshot"