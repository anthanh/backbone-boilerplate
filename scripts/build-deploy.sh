#!/bin/bash
#
# FRONT-END BUILDER-DEPLOY
# Anthanh Pham Trinh
# 
# bash build-deploy.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR
cd ..

start_time=$(date +%s)

bash -e scripts/build-min.sh
bash -e scripts/deploy.sh

finish_time=$(date +%s)
echo "Time duration: $((finish_time - start_time)) secs."