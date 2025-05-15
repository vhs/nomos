#!/bin/sh

set -e

cd "$(dirname "$(realpath "$0")")/../" || exit 255

exec pnpm exec bower "$@"
