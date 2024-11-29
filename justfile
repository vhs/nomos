set export


help:
    just -l

format target:
    @echo 'Formatting {{target}}…'
    just "format_{{target}}"

format_all:
    #!/usr/bin/env bash
    set -eo pipefail

    node_modules/.bin/prettier -w ${FILES:-.}

format_php:
    #!/usr/bin/env bash
    set -eo pipefail

    vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.php ${FILES:-app/ tests/ tools/ vhs/}

setup target:
    @echo 'Setting up {{target}}…'
    just "setup_{{target}}"

install_composer:
    #!/usr/bin/env bash
    set -euo pipefail

    if [ ! -f ./tools/composer.phar ]; then
        TMPFILE=$(mktemp)

        EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')"
        php -r "copy('https://getcomposer.org/installer', '${TMPFILE}');"
        ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', '${TMPFILE}');")"

        if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then
            echo >&2 'ERROR: Invalid installer checksum'
            rm "${TMPFILE}"
            exit 1
        fi

        php "${TMPFILE}" --install-dir ./tools --quiet
        rm "${TMPFILE}"
    else
        echo "composer has already been set up!"
    fi

    ./tools/composer.sh install

run_composer:
    echo "Running composer"
    ./tools/composer.sh install

setup_vendor: install_composer run_composer

setup_husky:
    #!/usr/bin/env bash
    set -euo pipefail

    if [ ! -d .husky/_/ ]; then
        node_modules/.bin/husky
    else
        echo "husky has already been set up!"
    fi

setup_webhooker:
    #!/usr/bin/env bash
    set -euo pipefail

    cd webhooker/ && npm install

test target:
    @echo 'Testing {{target}}…'
    just "test_{{target}}"

test_php:
    #!/usr/bin/env bash
    set -eo pipefail

    vendor/bin/phpunit ${FILES:-app/ tests/ tools/ vhs/}

test_webhooker:
    #!/usr/bin/env bash
    set -eo pipefail

    if [ "${FILES}" != "" ] ; then
        cd webhooker && npm run test
    fi
