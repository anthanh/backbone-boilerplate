#!/bin/bash
#
# FRONT-END JSON-COV TO HTML-COV
# Anthanh Pham Trinh
# 
# bash jsontohtmlcov.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "===> JSON-COV TO HTML-COV <==="

# Convert JSONCov to HTMLCov
node $DIR/../../test/lib/json2htmlcov/bin/json2htmlcov $DIR/../../test/output/coverage.json > $DIR/../../test/output/index.html

exit $?