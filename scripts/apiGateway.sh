#!/bin/bash
#
# FRONT-END APIGATEWAY SETTER
# Anthanh Pham Trinh
# 
# bash apiGateway.sh [url]

# Absolute path examples:
# bash apiGateway.sh http://192.168.1.163/gateway-dev/
# bash apiGateway.sh http://www.domain.com/api/
# bash apiGateway.sh http://api.domain.com/

# Relative path examples
# bash apiGateway.sh gateway-dev/
# bash apiGateway.sh gateway-pre/
# bash apiGateway.sh api/


EXPECTED_ARGS=1
E_BADARGS=65

if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `bash apiGateway.sh` [url]"
  exit $E_BADARGS
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CURRENT='gateway/'

if [ -f $DIR/apiGateway.cnf ]; then
    CURRENT=`cat $DIR/apiGateway.cnf`
fi

# sed s#http://192.168.1.163/gateway-dev/#$1#g $DIR/../app/scripts/common.js > $DIR/../app/scripts/common.bak.js
# sed 's|.*var apiGateway.*|    var apiGateway = "'$1'";|' $DIR/../app/scripts/common.bak.js
sed "s|var apiGateway = .*;|var apiGateway = '"$1"';|" $DIR/../app/scripts/common.js > $DIR/../app/scripts/common.bak.js
cat $DIR/../app/scripts/common.bak.js > $DIR/../app/scripts/common.js
rm $DIR/../app/scripts/common.bak.js

echo $1 > $DIR/apiGateway.cnf

# change apiGateway in deploy time
if [ -f $DIR/../dist/scripts/*.amd-app.js ]; then
    sed s#$CURRENT#$1#g $DIR/../dist/scripts/*.amd-app.js > $DIR/../dist/scripts/*.amd-app.bak.js
	cat $DIR/../dist/scripts/*.amd-app.bak.js > $DIR/../dist/scripts/*.amd-app.js
	rm $DIR/../dist/scripts/*.amd-app.bak.js
fi

exit $?