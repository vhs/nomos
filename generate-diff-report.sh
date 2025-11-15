#!/bin/bash

git diff --numstat origin/master..HEAD | perl -pe 's/\s{1,}=>\s{1,}/=>/g' | column -t | grep -vw v2 | grep -vw packages | grep -v ' 0 ' | grep -v '^0' | awk '{ print $3 }' | grep -v -E '^\+ +(\/\*\*|\*)' | grep -v '=>' | grep -P '^(app|tests|vhs)\/' | while read -r CHANGED_FILE; do

    RESULT=$(git diff origin/master..HEAD "${CHANGED_FILE}" | grep -P '^[-+]' | grep -v -P '^[-+]{3}' | grep -v -P '^[-+]($|\/\/|\/\*\*|\s+(\/\*\*|\*|\/\/)|    public static function Define|    .+con?vertType)')

    if [ "${RESULT}" != "" ]; then
        echo "============================================================"
        echo "========== ${CHANGED_FILE}"
        echo "============================================================"
        echo "${RESULT}"
    fi
done > diff-report.txt && echo "$(grep -c -P '^========== (app|tests|vhs)\/' diff-report.txt) files changed"
