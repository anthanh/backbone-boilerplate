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

# if [ -f app/styles/bootstrap.css ]; then
#     rm app/styles/bootstrap.css
# fi

# cp dist/styles/*.bootstrap.css app/styles/bootstrap.css

echo "===> DEV VERSION <==="
if [ -d dev ]; then
    rm -R dev
fi
mkdir dev/
cp -R app/ dev/
cp dist/styles/*.index.css dev/styles/index.css

echo "===> TAR GZ <==="

if [ -d dist ]; then
    rm -R dist
fi

mv dev dist

if [ -f dist.tar.gz ]; then
    rm dist.tar.gz
fi

tar -czf dist.tar.gz dist/  --exclude=.git --exclude=.DS_Store --exclude=.buildignore

# uncompress with:
# tar -xzf archivo.tar.gz

exit $?
