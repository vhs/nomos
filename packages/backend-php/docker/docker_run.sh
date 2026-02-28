#!/bin/bash

docker_env_config.sh > /www/conf/env.php

service php83-fpm start
nginx
