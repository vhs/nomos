set export := true

help:
    @just -l

format target:
    @echo 'Formatting {{target}}…'
    @just "format_{{target}}"

format_all:
    #!/usr/bin/env bash

    echo ${FILES:-.} | xargs -n1 | grep -v -E $(find . -type l | grep -vw node_modules | cut -f2- -d/  | xargs | tr ' ' '|') | xargs pnpm exec prettier -w

format_php:
    @pnpm -r run format:php

git_hooks:
    #!/usr/bin/env bash
    echo "Available git hooks:"
    @just --summary | xargs -d' ' -I% echo '- %' | grep 'git_hook_'

git_hook_pre_commit:
    #!/usr/bin/env bash

    set -e

    FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')

    if [ "${FILES}" != "" ]; then
        PHP_FILES=$(echo "${FILES}" | grep '\.php' | xargs)
        STORYBOOK_FILES=$(echo "${FILES}" | grep -E 'packages/frontend-react/.+\.stories\.tsx' | xargs)
        VALIDATOR_FILES=$(echo "${FILES}" | grep -E 'packages/frontend-react/src/lib/validators/(common|records).ts' | xargs)
        WEBHOOKER_FILES=$(echo "${FILES}" | grep 'packages/webhooker/' | xargs)

        if [ "${PHP_FILES}" != "" ]; then
            FILES=$(echo "${PHP_FILES}" | xargs) pnpm exec just format php
            pnpm exec just test php
        fi

        if [ "${STORYBOOK_FILES}" != "" ]; then
            pnpm --filter @vhs/nomos-frontend-react run fix:storybook:titles
        fi

        if [ "${VALIDATOR_FILES}" != "" ]; then
            pnpm --filter @vhs/nomos-frontend-react run generate:validator:implementations
        fi

        if [ "${WEBHOOKER_FILES}" != "" ]; then
            pnpm exec just test webhooker
        fi

        FILES=$(echo "${FILES}" | xargs) pnpm exec just format all

        git update-index --again

        exit 0
    fi

git_hook_pre_push:
    #!/usr/bin/env bash

    set -e

    if git show-ref "$(git branch --show-current)" | awk '{ print $2 }' | xargs | sed 's/ /../g' | xargs git diff --numstat | grep packages/frontend-react > /dev/null; then
        pnpm run -r build
    fi

    exit 0


install target:
    @echo 'Installing {{target}}…'
    @just "install_{{target}}"

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

    ./tools/composer.sh install ${COMPOSER_INSTALL_OPT:-}

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
    @just "setup_{{target}}"

setup_webcomponents: make_webcomponents_directories install_webcomponents run_bower

setup_husky:
    #!/usr/bin/env bash
    set -euo pipefail

    if [ ! -d .husky/_/ ]; then
        node_modules/.bin/husky
    elif [ "$(grep 'hooksPath = .husky/_' .git/config)" = "" ] ; then
        node_modules/.bin/husky
    else
        echo "husky has already been set up!"
    fi

setup_vendor: install_composer run_composer

test target:
    @echo 'Testing {{target}}…'
    @just "test_{{target}}"

test_all:
    @echo "Testing all packages..."
    @pnpm -r test

test_php:
    @echo "Testing all packages..."
    @pnpm -r test:php

test_webhooker:
    #!/usr/bin/env bash
    set -eo pipefail

    if [ "${FILES}" != "" ] ; then
       pnpm --filter="@vhs/webhooker" run test
    fi

update target:
    @echo 'Updating {{target}}…'
    @just "update_{{target}}"
