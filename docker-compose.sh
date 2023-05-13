#!/usr/bin/env bash

SCRIPT_DIR=$(realpath "$(dirname "$0")")

export COMPOSE_FILE=$(< docker-compose.conf grep -E -v '^(#|;|$)' | xargs | tr ' ' ':')

# --env-file is passed in here to make the variables inside available for
# expansion *inside rules definitions*. This is separate from the
# service.SVC.env_file directive, which defines the environment *inside* the
# container.
exec docker-compose --env-file "$SCRIPT_DIR"/docker/nomos.env "$@"
