#!/bin/bash

export COMPOSE_FILE=$(cat docker-compose.conf | egrep -v '^(#|;|$)' | xargs | tr ' ' ':')

docker-compose $@
