#!/usr/bin/env bash

echo "<?php "

env | grep "NOMOS_" | while read -r envline; do
  key=${envline/=*/}
  value=$(printenv "$key")
  echo "define('$key', '$value');"
done
