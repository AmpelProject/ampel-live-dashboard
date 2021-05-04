#!/bin/sh

npm run build
tar cvzf dashboard.tgz -C dist live
scp dashboard.tgz burst.ifh.de:/scratch
