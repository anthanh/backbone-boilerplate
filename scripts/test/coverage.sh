#!/bin/bash
#
# FRONT-END TEST RUNNER (JSON-Coverage REPORTER)
# Anthanh Pham Trinh
# 
# bash coverage.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "===> COVERAGE <==="

# echo "===> COVERAGE: CLEAN <==="

# # Remove latest test-run if exist
# bash -e $DIR/../clean.sh

if [ -d $DIR/../../app-cov ]; then
    rm -r $DIR/../../app-cov
fi

if [ -d $DIR/../../test/res/locales ]; then
    rm -r $DIR/../../test/res/locales
fi

# test could need all resources dependencies
cp -r $DIR/../../app/res/locales $DIR/../../test/res/locales

# echo "===> COVERAGE: TEST <==="

# bash -e $DIR/xunit.sh

echo "===> COVERAGE: INSTRUMENTALIZE <==="

# instrumentalize app source code, except libraries
cp -r $DIR/../../app $DIR/../../app-cov
rm -r $DIR/../../app-cov/scripts
jscoverage --no-highlight $DIR/../../app/scripts $DIR/../../app-cov/scripts

# Prepare index with JSONCov reporter and app-cov sources
sed 's/logLevel = 4/logLevel = 0/g' $DIR/../../app/scripts/common.js > $DIR/../../app-cov/scripts/common.js
sed -e 's/XUnit/JSONCov/g' -e 's/app/app-cov/g' $DIR/../../test/index.html > $DIR/../../test/index-cov.html

echo "===> COVERAGE: MOCHA-PHANTOM <==="

# Run tests with mocha under headless browser (set_test_url.sh could change this url)
mocha-phantomjs http://192.168.1.90/welvi/test/index-cov.html > $DIR/temp.json

echo http://192.168.1.90/welvi/test/index-cov.html

# Remove last line of the output
sed '$d' $DIR/temp.json > $DIR/../../test/output/coverage.json

# clean up
rm $DIR/temp.json
rm $DIR/../../test/index-cov.html
rm -r $DIR/../../app-cov
rm -r $DIR/../../test/res/locales

echo "===> COVERAGE: JSON-COV TO HTML-COV <==="

# Convert JSONCov to HTMLCov
node $DIR/../../test/lib/json2htmlcov/bin/json2htmlcov $DIR/../../test/output/coverage.json > $DIR/../../test/output/index.html

exit $?