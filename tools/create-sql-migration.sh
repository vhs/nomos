#!/bin/bash

cd "$(dirname "$(realpath "$0")")/.." || exit 255

if [ $# -le 1 ]; then
    echo "Missing migration id and description"
    echo ""
    echo "$(basename "$0") <migration id | 'new'> <description>"

    exit 254
fi

SQLDIR=$(realpath "./migrations")

if [ ! -d "${SQLDIR}" ]; then
    mkdir -p "${SQLDIR}"
fi

TS=$(node -e 'console.log(Date.now())')

VERSION="$1"

if [ "${VERSION}" = "new" ] ; then
    VERSION=$(find migrations/ -mindepth 1 -maxdepth 1 -type d -print0 | xargs -0 -n 1 basename | sort -V | tail -1 | awk '{ print $1 + 1 }')
fi

shift

ARGS=$*

SQLDIR="${SQLDIR}/${VERSION}"

DESCRIPTION=${ARGS// /_}

SQLFILE="${SQLDIR}/V${VERSION}.${TS}__${DESCRIPTION}.sql"

if [ ! -d "${SQLDIR}" ] ; then
    mkdir -p "${SQLDIR}"
fi

touch "$SQLFILE"

{
    cat << EOF
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;



COMMIT;
EOF
} > "${SQLFILE}"

echo "$SQLFILE"
