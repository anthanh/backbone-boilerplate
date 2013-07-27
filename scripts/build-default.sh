#!/bin/bash
#
# FRONT-END BUILDER
# Anthanh Pham Trinh
# 
# bash build-default.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR
cd ..

bash -e scripts/clean.sh

# No longer works since we need phantomJS to know the frontend-domain
# echo "===> YEOMAN TEST <==="
# yeoman test

# bash -e $DIR/test/xunit.sh


echo "===> YEOMAN BUILD <==="

yeoman build

if [ -f app/styles/bootstrap.css ]; then
    rm app/styles/bootstrap.css
fi

cp dist/styles/*.bootstrap.css app/styles/bootstrap.css
