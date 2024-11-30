#!/bin/sh

set -e

cd "$(dirname "$(realpath "$0")")/../" || exit 255

exec node_modules/.bin/bower "$@"
