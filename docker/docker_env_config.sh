#!/bin/bash

echo "<?php "

env | grep "NOMOS_" | while read envline; do
  key=${envline%=*}
  value=$(printenv $key)
  echo "define('$key', '$value');"
done
