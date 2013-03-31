#!/bin/bash
#
# FRONT-END TEST RUNNER (JSON-Coverage REPORTER)
# Anthanh Pham Trinh
# 
# bash coverage.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "===> COVERAGE <==="

echo "===> COVERAGE: CLEAN <==="

# Remove latest test-run if exist
if [ -f $DIR/../../test/output/coverage.json ]; then
    rm $DIR/../../test/output/coverage.json
fi

if [ -f $DIR/../../test/output/index.html ]; then
    rm $DIR/../../test/output/index.html
fi

if [ -d $DIR/../../app-cov ]; then
    rm -r $DIR/../../app-cov
fi

echo "===> COVERAGE: INSTRUMENTALIZE <==="

# instrumentalize app source code, except libraries
cp -r $DIR/../../app $DIR/../../app-cov
rm -r $DIR/../../app-cov/scripts
jscoverage --no-highlight $DIR/../../app/scripts $DIR/../../app-cov/scripts

# Prepare index with JSONCov reporter and app-cov sources
sed 's/logLevel = 4/logLevel = 0/g' $DIR/../../app/scripts/common.js > $DIR/../../app-cov/scripts/common.js
sed -e 's/XUnit/JSONCov/g' -e 's/app/app-cov/g' $DIR/../../test/index.html > $DIR/../../test/index-cov.html

echo "===> COVERAGE: MOCHA-PHANTOM <==="

# Run tests with mocha under headless browser
mocha-phantomjs -C -s web-security=false -s local-to-remote-url-access=true $DIR/../../test/index-cov.html > $DIR/temp.json

# Remove last line of the output
sed '$d' $DIR/temp.json > $DIR/../../test/output/coverage.json

# clean up
rm $DIR/temp.json
rm $DIR/../../test/index-cov.html
rm -r $DIR/../../app-cov

echo "===> COVERAGE: JSON-COV TO HTML-COV <==="

# Convert JSONCov to HTMLCov
node $DIR/../../test/lib/json2htmlcov/bin/json2htmlcov $DIR/../../test/output/coverage.json > $DIR/../../test/output/index.html

echo $?