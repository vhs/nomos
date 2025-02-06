#!/bin/sh
# shellcheck shell=bash

/usr/local/bin/docker_env_config.sh

(cd /var/www/html/tools && php migrate.php -b -m -t)

CMD="$*"

if [ "${CMD:0:1}" = "-" ]; then
    CMD="php-fpm ${CMD}"
fi

exec "${CMD}"
