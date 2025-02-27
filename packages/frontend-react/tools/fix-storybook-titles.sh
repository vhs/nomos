#!/bin/bash

cd "$(dirname "$(realpath "$0")")/../" || exit 255

find src/components/ -type f -name '*.stories.*' | sort | while read -r SBF; do
    STORY_PATH=$(dirname "${SBF}" | cut -f3- -d/)
    STORY_TITLE=$(echo "${STORY_PATH}" | perl -pe 's/(atoms|molecules|particles|composites|materials|layouts|pages|app|providers|user|admin|templates)/\u$1/g')

    perl -i -pe "s|  title: '.+'|  title: '${STORY_TITLE}'|g" "${SBF}"

done
