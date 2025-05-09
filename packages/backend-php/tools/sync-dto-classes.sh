#!/bin/bash

cd "$(dirname "$(realpath "$0")")/.." || exit 255

find app/domain/ -type f -name '*.php' -print0 | xargs -0 -I% basename % .php | sort | while read -r DOMAIN_CLASS_NAME; do
    DTO_FILE="app/dto/${DOMAIN_CLASS_NAME}.php"

    cat << EOF > "${DTO_FILE}"
<?php

namespace app\dto;

/** @typescript */
class ${DOMAIN_CLASS_NAME} {
}
EOF
done
