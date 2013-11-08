#!/bin/bash
#
# FRONT-END TEST RUNNER (XUNIT REPORTER)
# Anthanh Pham Trinh
# 
# bash xunit.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


cd $DIR
cd ..
cd ..

for f in test-selenium/frontend-test/target/surefire-reports/*.xml
do
  if ! grep -E "failures=\"0\" time=\"[0-9|.]*\" errors=\"0\"" $f
  then
      echo "===> Selenium: Fail <==="
      exit 1
  fi
done
echo "===> Selenium: Pass <==="
exit $?