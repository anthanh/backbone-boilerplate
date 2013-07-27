#!/bin/bash
#
# FRONT-END DEPLOY
# Anthanh Pham Trinh
# 
# bash deploy.sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR
cd ..

SERVER="host.com"
USER="user"

CERT=~/Documents/Amazon/id_rsa

FILENAME=dist.tar.gz
du -k $FILENAME

echo "===> UPLOAD SERVER <==="

scp -i $CERT $FILENAME $USER@$SERVER:~/frontend/

echo "===> DEPLOY SERVER <==="

ssh $USER@$SERVER -i $CERT sudo tar -xzf /home/$USER/frontend/$FILENAME -C /home/$USER/frontend/
# ssh $USER@$SERVER -i $CERT sudo tar -xzf /home/$USER/frontend/$FILENAME -C /home/$USER/frontend/  --strip-components=1 # en la raiz
ssh $USER@$SERVER -i $CERT sudo cp -R /home/$USER/frontend/dist/* /var/www/nginx-default/
ssh $USER@$SERVER -i $CERT sudo chown -R www-data /var/www/nginx-default/
ssh $USER@$SERVER -i $CERT sudo rm /home/$USER/frontend/$FILENAME
ssh $USER@$SERVER -i $CERT sudo rm -R /home/$USER/frontend/dist/

exit $?