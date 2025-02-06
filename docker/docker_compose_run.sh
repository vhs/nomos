#!/bin/sh
# shellcheck shell=bash

if [ ! -d /sessions ]; then
    mkdir -p /sessions
fi

chown nobody:nobody /sessions && chmod 1777 /sessions

/usr/local/bin/docker_env_config.sh

(cd /var/www/html/tools && php migrate.php -b -m -t)

CMD="$*"

if [ "${CMD:0:1}" = "-" ]; then
    CMD="php-fpm83 ${CMD}"
fi

exec "${CMD}"
