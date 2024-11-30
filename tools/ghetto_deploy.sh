#!/bin/bash

set -e

cd "$(dirname "$(realpath "$0")")/../" || exit 255

APP_NAME=membership.vanhack.ca
DEPLOY_PATH=/var/www/sites

echo Ghetto Deploy!

NOMOS=$(pwd)

LATEST=$(git log --format="%H" -n 1)

git pull

CURRENT=$(git log --format="%H" -n 1)

if [ "${CURRENT}" != "${LATEST}" ]; then
    echo "New release available. Re-running..."
    bash "$0"
    exit
fi

DEPLOY_NAME=${APP_NAME}-$(git log --format="%H" -n 1)

echo Continue?

read -r

if [ ! -e "config.ini.php" ]; then
    echo -e "\e[31mExpected config.php.ini for nomos to be in .\e[0m"
    cp "${NOMOS}/conf/config.ini.php.template" ./config.ini.php
    echo "Copied templates to local"
    nano ./config.ini.php

    echo -e "\e[33mI assume you've setup \e[34mconfig.ini.php\e[33m properly? Continue?\e[0m"
    read -r
fi

if [ ! -e "config.js" ]; then
    echo -e "\e[31mExpected config.js for webhooker to be in .\e[0m"
    cp "${NOMOS}/webhooker/config.js.template.js" ./config.js
    echo "Copied templates to local"
    nano ./config.js

    echo -e "\e[33mI assume you've setup \e[34mconfig.js\e[33m properly? Continue?\e[0m"
    read -r
fi

echo Configs ready

if [ -e "${DEPLOY_NAME}" ]; then
    echo -e "\e[33mPurging previous deploy\e[0m"
    rm -rf "${DEPLOY_NAME}"
fi

echo Building "${DEPLOY_NAME}"

mkdir "${DEPLOY_NAME}"

cp -R "${NOMOS}/app" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/vhs" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/web" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/webhooker" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/logs" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/conf" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/migrations" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/tools" "${DEPLOY_NAME}/"
cp -R "${NOMOS}/composer.json" "${DEPLOY_NAME}/"

cp config.ini.php "${DEPLOY_NAME}/conf/"
cp config.js "${DEPLOY_NAME}/webhooker/"

curl -sS https://getcomposer.org/installer | php -- --install-dir="${DEPLOY_NAME}"

cd "${DEPLOY_NAME}"

php composer.phar install --no-dev

cd webhooker/

chmod 755 webhooker.sbin

npm install --production

cd ..

echo Clean up composer

rm composer.json
rm composer.phar
rm composer.lock

cd "${NOMOS}"

sudo cp -R "${DEPLOY_NAME}" "${DEPLOY_PATH}/."

echo Making logs accessible for weak proccesses

sudo chmod 777 "${DEPLOY_PATH}/${DEPLOY_NAME}/logs"

echo Purge temp deploy path "${DEPLOY_NAME}"

rm -rf "${DEPLOY_NAME}"

cd "${DEPLOY_PATH}"

echo "Updating ${APP_NAME} link to ${DEPLOY_PATH}/${DEPLOY_NAME}"

if [ -e "${APP_NAME}" ]; then
    echo "Backing up the current deployment before we move over or migrate"
    cd "${APP_NAME}/tools/" && sudo php migrate.php -b && cd "${DEPLOY_PATH}"
    sudo rm "${APP_NAME}"
fi

sudo ln -s "${DEPLOY_PATH}/${DEPLOY_NAME}" "${APP_NAME}"

echo Reloading php7.0-fpm to destroy apc cache

sudo /etc/init.d/php7.0-fpm reload

cd /lib/systemd/system

if [ -e webhooker.service ]; then
    echo -e "\e[33mStopping webhooker\e[0m"
    sudo systemctl stop webhooker
    echo -e "\e[34mDone\e[0m"
fi

cd "${DEPLOY_PATH}/${APP_NAME}/tools/"

echo Starting backup and migrate

sudo php migrate.php -b -m

echo Updating webhooker sbin

cd /usr/sbin

if [ -e webhooker ]; then
    sudo rm webhooker
fi

sudo ln -s "${DEPLOY_PATH}/${APP_NAME}/webhooker/webhooker.sbin" webhooker

cd /lib/systemd/system

echo Updating systemd webhooker.service

sudo cp -R "${DEPLOY_PATH}/${APP_NAME}/webhooker/webhooker.service" webhooker.service

sudo systemctl enable webhooker.service

echo Starting webhooker

sudo systemctl start webhooker.service

echo -e "\e[32mDeploy successful!\e[0m"
