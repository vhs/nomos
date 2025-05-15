#!/bin/sh

set -e

cd "$(dirname "$(realpath "$0")")/../" || exit 255

if [ ! -f ./tools/composer.phar ]; then
    npm exec just setup vendor
fi

exec php ./tools/composer.phar "$@"
