#!/bin/bash

APP_NAME=membership.hackspace.ca
DEPLOY_PATH=/tmp

echo Ghetto Deploy!

echo This assumes you are in a directory . relative to ./nomos/tools/ghetto_deploy.sh

CW=`pwd`
NOMOS=`dirname $0`

cd $NOMOS
cd ..
NOMOS=`pwd`

LATEST=`git log --format="%H" -n 1`

git pull

CURRENT=`git log --format="%H" -n 1`

if [ $CURRENT != $LATEST ]; then
    cd $CW
    chmod 755 ./nomos/tools/ghetto_deploy.sh
    ./nomos/tools/ghetto_deploy.sh
    exit
fi

DEPLOY_NAME=$APP_NAME-`git log --format="%H" -n 1`

cd $CW

echo Continue?

read

if [ ! -e "config.ini.php" ]; then
    echo -e "\e[31mExpected config.php.ini for nomos to be in .\e[0m"
    cp $NOMOS/conf/config.ini.php.template ./config.ini.php
    echo "Copied templates to local"
    nano ./config.ini.php

    echo "I assume you've setup config.ini.php properly? Continue?"
    read
fi

if [ ! -e "config.js" ]; then
    echo -e "\e[31mExpected config.js for webhooker to be in .\e[0m"
    cp $NOMOS/webhooker/config.js.template.js ./config.js
    echo "Copied templates to local"
    nano ./config.js

    echo "I assume you've setup config.ini.php properly? Continue?"
    read
fi

echo Configs ready

if [ -e $DEPLOY_NAME ]; then
    echo "Purging previous deploy"
    rm -rf $DEPLOY_NAME
fi

echo Building $DEPLOY_NAME

mkdir $DEPLOY_NAME

cp -R $NOMOS/app $DEPLOY_NAME/
cp -R $NOMOS/vhs $DEPLOY_NAME/
cp -R $NOMOS/web $DEPLOY_NAME/
cp -R $NOMOS/webhooker $DEPLOY_NAME/
cp -R $NOMOS/logs $DEPLOY_NAME/
cp -R $NOMOS/conf $DEPLOY_NAME/
cp -R $NOMOS/migrations $DEPLOY_NAME/
cp -R $NOMOS/tools $DEPLOY_NAME/

cp config.ini.php $DEPLOY_NAME/conf/
cp config.js $DEPLOY_NAME/webhooker/

curl -sS https://getcomposer.org/installer | php -- --install-dir=$DEPLOY_NAME

cd $DEPLOY_NAME

php composer.phar install

cd webhooker/

chmod 755 webhooker.sbin
chmod 755 webhooker.upstart

npm install

cd $CW

cp -R $DEPLOY_NAME $DEPLOY_PATH/.

chmod 777 $DEPLOY_PATH/logs

rm -rf $DEPLOY_NAME

cd $DEPLOY_PATH

if [ -e $APP_NAME ]; then
    sudo rm $APP_NAME
fi

sudo ln -s $DEPLOY_PATH/$DEPLOY_NAME $APP_NAME

cd /etc/init.d

if [ -e webhooker ]; then
    sudo service webhooker stop
fi

cd $DEPLOY_PATH/$APP_NAME/tools/

php migrate.php -b -m

cd /usr/sbin

if [ -e webhooker ]; then
    sudo rm webhooker
fi

sudo ln -s $DEPLOY_PATH/$APP_NAME/webhooker/webhooker.sbin webhooker

cd /etc/init.d

if [ -e webhooker ]; then
    sudo rm webhooker
fi

sudo ln -s $DEPLOY_PATH/$APP_NAME/webhooker/webhooker.upstart webhooker

sudo service webhooker start
