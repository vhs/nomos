#!/bin/sh

echo "<?php "

grep "NOMOS_" ./docker/nomos.env | while read -r ENV_LINE; do
    KEY="${ENV_LINE%=*}"
    VALUE=$(grep "${KEY}" ./docker/nomos.env | cut -f2- -d=)

    echo "define('$KEY', '$VALUE');"
done
