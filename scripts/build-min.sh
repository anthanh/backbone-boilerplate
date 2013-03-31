#!/bin/bash
#
# FRONT-END BUILDER-MIN
# Anthanh Pham Trinh
# 
# bash build-min.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR
cd ..

bash -e scripts/clean.sh

echo "===> YEOMAN TEST <==="

yeoman test

echo $?


echo "===> BUILD-MIN <==="

yeoman build:minify


echo "===> CLEAN UP <==="

rm -rf dist/components
rm -rf dist/designs
rm -rf dist/styles/sass
rm -rf dist/styles/bootstrap/tests
rm -rf dist/styles/*.sass
rm -rf dist/styles/*.scss
rm -rf dist/styles/**/*.scss
rm -rf dist/styles/**/*.sass 

echo $?