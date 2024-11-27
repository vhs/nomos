#!/usr/bin/env bash

SCRIPT_DIR=$(realpath "$(dirname "$0")")

COMPOSE_CMD=docker-compose

if docker compose > /dev/null 2>&1 ; then
    COMPOSE_CMD="docker compose"
fi

COMPOSE_FILE=$(< docker-compose.conf grep -E -v '^(#|;|$)' | xargs | tr ' ' ':')
export COMPOSE_FILE

# --env-file is passed in here to make the variables inside available for
# expansion *inside rules definitions*. This is separate from the
# service.SVC.env_file directive, which defines the environment *inside* the
# container.

# shellcheck disable=SC2086
/usr/bin/env ${COMPOSE_CMD} -p nomos --env-file "$SCRIPT_DIR"/docker/nomos.env "$@"
