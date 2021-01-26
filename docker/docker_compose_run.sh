#!/bin/bash

docker_env_config.sh >/var/www/html/conf/env.php

(cd /var/www/html/tools && php migrate.php -b -m)

/usr/local/bin/docker_entry_point "$@"
