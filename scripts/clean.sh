#!/bin/bash
#
# FRONT-END CLEAN
# Anthanh Pham Trinh
# 
# bash clean.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR
cd ..

# temp css

if [ -f app/styles/bootstrap.css ]; then
    rm app/styles/bootstrap.css
fi

# sass sprite
if [ -f app/images/icon-*.png ]; then
  rm app/images/icon-*.png
fi

if [ -d .sass-cache ]; then
    rm -rf .sass-cache
fi

# temp workspace
if [ -d temp ]; then
    rm -rf temp
fi

# dist workspace
if [ -d dist ]; then
    rm -rf dist
fi

# test-coverage workspace
if [ -d app-cov ]; then
    rm -rf app-cov
fi

# test opuput
if [ -f test/output/xunit.xml ]; then
    rm -rf test/output/xunit.xml
fi

if [ -f test/output/coverage.json ]; then
    rm -rf test/output/coverage.html
fi

if [ -f test/output/imagen.png ]; then
    rm -rf test/output/imagen.png
fi

echo $?