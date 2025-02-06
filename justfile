set export := true

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

install target:
    @echo 'Installing {{target}}…'
    just "install_{{target}}"

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

    ./tools/composer.sh install "${COMPOSER_INSTALL_OPT}"

install_angular_ui_bootstrap:
    #!/usr/bin/env bash
    set -euo pipefail

    mkdir -p web/components/custom/angular-ui/ \
    && cd web/components/custom/angular-ui/ \
    && wget https://raw.githubusercontent.com/angular-ui/bootstrap/refs/heads/gh-pages/ui-bootstrap-tpls-0.12.0.js \
    && wget https://raw.githubusercontent.com/angular-ui/bootstrap/refs/heads/gh-pages/ui-bootstrap-tpls-0.12.0.min.js

install_webcomponents: install_angular_ui_bootstrap

make_webcomponents_directories:
    mkdir -p web/components/bower
    mkdir -p web/components/custom

run_bower:
    echo "Running bower"
    ./tools/bower.sh install

run_composer:
    echo "Running composer"
    ./tools/composer.sh install

setup target:
    @echo 'Setting up {{target}}…'
    just "setup_{{target}}"

setup_webcomponents: make_webcomponents_directories install_webcomponents run_bower

setup_husky:
    #!/usr/bin/env bash
    set -euo pipefail

    if [ ! -d .husky/_/ ]; then
        node_modules/.bin/husky
    else
        echo "husky has already been set up!"
    fi

setup_vendor: install_composer run_composer

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
       pnpm --filter="@vhs/webhooker" run test
    fi
