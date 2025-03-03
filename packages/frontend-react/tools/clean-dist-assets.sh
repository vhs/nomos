#!/usr/bin/env bash

cd "$(dirname "$(realpath "$0")")/../" || exit 255

FIX_PATH="s:$(pwd):.:g"

HTML_INCLUDES=$(grep '/assets/' index.html | cut -f2 -d'"' | awk '{ print "./public" $1 }' | xargs)

while read -r CSS_FILE; do
    CSS_FILE_DIR=$(dirname "${CSS_FILE}")

    HTML_INCLUDES="${HTML_INCLUDES} $(grep url "${CSS_FILE}" | sed 's/[;, ]/\n/g;s/src:url/url/g;s/"//g' | grep url | cut -f1 -d')' | cut -f2 -d'(' | xargs -I% realpath "${CSS_FILE_DIR}/%" | sed "${FIX_PATH}" | xargs)"
done < <(echo "${HTML_INCLUDES}" | xargs -n1 | grep '\.css')

# echo "${HTML_INCLUDES}" | xargs | tr ' ' '|' | sed 's/\./\\./g'

find ./public/assets/ | grep -v -E "$(echo "${HTML_INCLUDES}" | xargs | tr ' ' '|')" | sed 's/ /\\ /g' | xargs rm

find ./public/assets/ -mindepth 2 -maxdepth 2 -type d | while read -r ASSET_DIR; do
    if [ "$(find "${ASSET_DIR}" -type f)" = "" ]; then
        rm -vfR "${ASSET_DIR}"
    fi
done
