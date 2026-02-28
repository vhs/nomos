#!/bin/sh

{
    echo "<?php "

    env | grep "NOMOS_" | while read -r ENV_LINE; do
        KEY="${ENV_LINE%=*}"
        VALUE=$(printenv "${KEY}")

        echo "define('$KEY', '$VALUE');"
    done
} > /var/www/html/conf/env.php
