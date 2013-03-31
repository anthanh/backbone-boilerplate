#!/bin/bash
#
# FRONT-END TEST-ALL (TESTS, COVERAGE, PHANTOM)
# Anthanh Pham Trinh
# 
# bash test-all.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

bash -e $DIR/test/xunit.sh
bash -e $DIR/test/coverage.sh
bash -e $DIR/test/phantom.sh

echo $?