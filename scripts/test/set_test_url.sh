#!/bin/bash
#
# FRONT-END TEST URL SETTER
# Needed for phantomjs + CORS
# Anthanh Pham Trinh
# 
# bash set_test_url.sh [url]
# example: bash scripts/test/set_test_url.sh https://127.0.0.1/app/

EXPECTED_ARGS=1
E_BADARGS=65

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `bash set_test_url.sh` [url-to-frontend-root-with-final-slash]"
  exit $E_BADARGS
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

sed s#http://192.168.1.90/welvi/#$1#g $DIR/tap.sh > $DIR/tap.bak.sh
cat $DIR/tap.bak.sh > $DIR/tap.sh
rm $DIR/tap.bak.sh

sed s#http://192.168.1.90/welvi/#$1#g $DIR/xunit.sh > $DIR/xunit.bak.sh
cat $DIR/xunit.bak.sh > $DIR/xunit.sh
rm $DIR/xunit.bak.sh

sed s#http://192.168.1.90/welvi/#$1#g $DIR/coverage.sh > $DIR/coverage.bak.sh
cat $DIR/coverage.bak.sh > $DIR/coverage.sh
rm $DIR/coverage.bak.sh

exit $?