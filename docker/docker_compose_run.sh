#!/bin/bash

docker_env_config.sh >/var/www/html/conf/env.php

(cd /var/www/html/tools && php migrate.php -b -m -t)

exec /usr/local/bin/docker-php-entrypoint "$@"
