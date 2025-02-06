#!/bin/sh

/usr/local/bin/docker_env_config.sh

(cd /var/www/html/tools && php migrate.php -b -m -t)

exec /usr/local/bin/docker-php-entrypoint "$@"
