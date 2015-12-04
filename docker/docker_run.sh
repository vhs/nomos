#!/bin/bash

docker_env_config.sh > /www/conf/env.php

service php5-fpm start
nginx
