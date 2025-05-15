set export := true

help:
    @just -l

build target:
    @echo 'Building {{target}}…'
    @just "build_{{target}}"

build_all:
    pnpm --filter "./packages/*/" build

format target:
    @echo 'Formatting {{target}}…'
    @just "format_{{target}}"

format_all:
    #!/usr/bin/env bash

    echo ${FILES:-.} | xargs -n1 | grep -v -E $(find . -type l | grep -vw node_modules | cut -f2- -d/  | xargs | tr ' ' '|') | xargs pnpm exec prettier -w

format_php:
    @pnpm --filter "./packages/*-php/" format:php

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
            pnpm --filter @vhs/nomos-frontend-react fix:storybook:titles
        fi

        if [ "${VALIDATOR_FILES}" != "" ]; then
            pnpm --filter @vhs/nomos-frontend-react generate:validator:implementations
        fi

        if [ "${WEBHOOKER_FILES}" != "" ]; then
            pnpm --filter="@vhs/webhooker" test
        fi

        FILES=$(echo "${FILES}" | xargs) pnpm exec just format all

        git update-index --again

        exit 0
    fi

git_hook_pre_push:
    #!/usr/bin/env bash

    set -e

    if git show-ref "$(git branch --show-current)" | awk '{ print $2 }' | xargs | sed 's/ /../g' | xargs git diff --numstat | grep packages/frontend-react > /dev/null; then
        pnpm --filter @vhs/nomos-frontend-react build
    fi

    exit 0

install target:
    @echo 'Installing {{target}}…'
    @just "install_{{target}}"

prepare: setup_husky

setup target:
    @echo 'Setting up {{target}}…'
    @just "setup_{{target}}"

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

test target:
    @echo 'Testing {{target}}…'
    @just "test_{{target}}"

test_all:
    @echo "Testing all packages..."
    @pnpm --filter "./packages/*/" test:php

test_php:
    @echo "Testing all php packages..."
    @pnpm --filter "./packages/*-php/" test:php
