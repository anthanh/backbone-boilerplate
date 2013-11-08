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

# No longer works since we need phantomJS to know the frontend-domain
# echo "===> YEOMAN TEST <==="
# yeoman test

# bash -e $DIR/test/xunit.sh

echo "===> BUILD-MIN <==="

yeoman build:minify

if [ -f app/styles/bootstrap.css ]; then
    rm app/styles/bootstrap.css
fi

# cp dist/styles/*.bootstrap.css app/styles/bootstrap.css


echo "===> CLEAN UP <==="

rm -rf dist/components
rm -rf dist/designs
# rm -rf dist/styles/sass
# rm -rf dist/styles/bootstrap/tests
# rm -rf dist/styles/*.sass
# rm -rf dist/styles/*.scss
# rm -rf dist/styles/**/*.scss
# rm -rf dist/styles/**/*.sass 

# Remove all css except index.css
mkdir dist/styles_dist
mv dist/styles/*.index.css dist/styles_dist/
rm -rf dist/styles
mv dist/styles_dist dist/styles

# Remove all js except amd-app.css
mkdir dist/scripts_dist
mv dist/scripts/*.amd-app.js dist/scripts_dist/
rm -rf dist/scripts
mv dist/scripts_dist dist/scripts

platform='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
   platform='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
   platform='darwin'
fi

if [[ $platform == 'linux' ]]; then
   sed -i '/^http:\/\/localhost/ d' dist/manifest.appcache
   sed -i '/^http:\/\/www.google-analytics/ d' dist/manifest.appcache
elif [[ $platform == 'darwin' ]]; then
   sed -i '' '/^http:\/\/localhost/ d' dist/manifest.appcache
   sed -i '' '/^http:\/\/www.google-analytics/ d' dist/manifest.appcache
fi

echo "===> TAR GZ <==="

if [ -f dist.tar.gz ]; then
    rm dist.tar.gz
fi

tar -czf dist.tar.gz dist/  --exclude=.git --exclude=.DS_Store --exclude=.buildignore

# uncompress with:
# tar -xzf archivo.tar.gz

exit $?