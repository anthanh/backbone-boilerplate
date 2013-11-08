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
if [ -f dist.tar.gz ]; then
    rm dist.tar.gz
fi

# dev workspace
if [ -d dev ]; then
    rm -rf dev
fi

# test-coverage workspace
if [ -d app-cov ]; then
    rm -rf app-cov
fi

# test opuput
if [ -d test/locales ]; then
    rm -rf test/locales
fi

if [ -f test/index-cov.html ]; then
    rm test/index-cov.html
fi

if [ -f test/output/xunit.xml ]; then
    rm -rf test/output/xunit.xml
fi

if [ -f test/output/xunit.tmp ]; then
    rm -rf test/output/xunit.tmp
fi

if [ -f test/output/coverage.json ]; then
    rm test/output/coverage.json
fi

if [ -f test/output/index.html ]; then
    rm -rf test/output/index.html
fi

if [ -f test/output/imagen.png ]; then
    rm -rf test/output/imagen.png
fi

exit $?