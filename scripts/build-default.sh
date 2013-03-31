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

echo "===> YEOMAN TEST <==="

yeoman test

echo $?


echo "===> YEOMAN BUILD <==="

yeoman build
echo $?

if [ -f app/styles/bootstrap.css ]; then
    rm app/styles/bootstrap.css
fi

cp dist/styles/*.bootstrap.css app/styles/bootstrap.css
