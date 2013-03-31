#!/bin/bash
#
# FRONT-END PHANTOM RUNNER
# Anthanh Pham Trinh
# 
# bash phantom.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "===> PHANTOMJS <==="

phantomjs $DIR/../../test/runner/phantom.js

echo "===> PHANTOMJS: RASTERIZE <==="

phantomjs $DIR/../../test/runner/rasterize.js 'http://localhost/bbb/test' $DIR/../../test/output/imagen.png

echo $?