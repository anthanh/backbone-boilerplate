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

# No longer works since we need phantomJS to know the frontend-domain
# yeoman test
# echo $?
# mocha-phantomjs $DIR/../../test/index.html | grep '^<' > $DIR/../../test/output/xunit.xml
 
# mocha-phantomjs http://192.168.1.90/webapp/test/index.html > $DIR/../../test/output/xunit.xml

# (set_test_url.sh could change this url)
echo http://192.168.1.90/webapp/test/index.html
mocha-phantomjs http://192.168.1.90/webapp/test/index.html > $DIR/../../test/output/xunit.tmp

# cat $DIR/../../test/output/xunit.tmp

cat $DIR/../../test/output/xunit.tmp | grep '^<' > $DIR/../../test/output/xunit.xml

if [ -f $DIR/../../test/output/xunit.tmp ]; then
    rm $DIR/../../test/output/xunit.tmp
fi

if grep -Fq "failures=\"0\" errors=\"0\"" $DIR/../../test/output/xunit.xml
then
    # code if found
    echo "===> XUNIT: PASS <==="
    # exit $?
    exit 0  
else
    # code if not found
    echo "===> XUNIT: EPIC-FAIL!!! <==="
    exit 1
fi