#!/bin/bash
#
# FRONT-END TEST RUNNER (TAP REPORTER)
# Anthanh Pham Trinh
# 
# bash tap.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "===> TAP <==="

cd $DIR
cd ..
cd ..

# No longer works since we need phantomJS to know the frontend-domain
# yeoman test
# echo $?
# mocha-phantomjs $DIR/../../test/index.html | grep '^<' > $DIR/../../test/output/xunit.xml
 
# mocha-phantomjs http://192.168.1.90/welvi/test/index.html > $DIR/../../test/output/xunit.xml

# No log
sed 's/logLevel = 4/logLevel = 0/g' $DIR/../../app/scripts/common.js > $DIR/../../app/scripts/common.bak.js
cat $DIR/../../app/scripts/common.bak.js > $DIR/../../app/scripts/common.js
sed -e 's/XUnit/TAP/g' $DIR/../../test/index.html > $DIR/../../test/tap.html

# (set_test_url.sh could change this url)
echo http://192.168.1.90/welvi/test/index.html
mocha-phantomjs http://192.168.1.90/welvi/test/tap.html > $DIR/../../test/output/tap.tmp
rm $DIR/../../test/tap.html

# Restore log
sed 's/logLevel = 0/logLevel = 4/g' $DIR/../../app/scripts/common.js > $DIR/../../app/scripts/common.bak.js
cat $DIR/../../app/scripts/common.bak.js > $DIR/../../app/scripts/common.js
rm $DIR/../../app/scripts/common.bak.js

cat $DIR/../../test/output/tap.tmp

if grep -Fq "not ok" $DIR/../../test/output/tap.tmp
then
    # code if found
    rm $DIR/../../test/output/tap.tmp
    echo "===> TAP: EPIC-FAIL!!! <==="
    exit 1
else
    # code if not found
    rm $DIR/../../test/output/tap.tmp
    echo "===> TAP: PASS <==="
    exit 0
fi