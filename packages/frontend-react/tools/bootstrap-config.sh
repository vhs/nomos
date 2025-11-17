#!/usr/bin/env bash

if [ ! -f public/config.json ]; then
    cp skel/config.json public/config.json
fi
