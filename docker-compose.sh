#!/bin/bash

HAS_COMPOSE_PLUGIN=0

if docker compose > /dev/null 2>&1 ; then
    HAS_COMPOSE_PLUGIN=1
fi

COMPOSE_FILE_ARGS=$(grep -E -v '^(#|;|$)' docker-compose.conf | xargs -n 1 echo -f | xargs)

if [ "${HAS_COMPOSE_PLUGIN}" = "1" ] ; then
    # shellcheck disable=SC2086
    docker compose ${COMPOSE_FILE_ARGS} "$@"
else
    # shellcheck disable=SC2086
    /usr/bin/env docker-compose ${COMPOSE_FILE_ARGS} "$@"
fi
