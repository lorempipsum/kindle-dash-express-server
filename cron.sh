#!/bin/bash

dir=$(cd `dirname $0` && pwd)
envFile=$(ls -l $dir/.env | awk '{print $NF}')

# load config
source $envFile

# generate data
cd $dir

# create screenshot
cd $dir/public

echo "running firefox"
firefox --headless --screenshot https://kindlethings-express-app.herokuapp.com --window-size=1024,758
echo "running pngcrush"
pngcrush -c 0 screenshot.png display.png
echo "done doing the screenshot"