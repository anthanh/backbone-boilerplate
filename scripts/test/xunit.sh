#!/bin/bash
#
# FRONT-END TEST RUNNER (XUNIT REPORTER)
# Anthanh Pham Trinh
# 
# bash xunit.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "===> XUNIT <==="

cd $DIR
cd ..
cd ..

yeoman test
echo $?

mocha-phantomjs $DIR/../../test/index.html | grep '^<' > $DIR/../../test/output/xunit.xml

echo $?
