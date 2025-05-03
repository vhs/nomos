#!/bin/bash

git diff --numstat origin/master..HEAD | perl -pe 's/\s{1,}=>\s{1,}/=>/g' | column -t | grep -vw v2 | grep -vw packages | grep -v ' 0 ' | grep -v '^0' | awk '{ print $3 }' | grep -v -E '^\+ +(\/\*\*|\*)' | grep -v '=>' | grep -P '^(app|tests|vhs)\/' | while read -r CHANGED_FILE; do
    echo "============================================================"
    echo "========== ${CHANGED_FILE}"
    echo "============================================================"

    RESULT=$(git diff origin/master..HEAD "${CHANGED_FILE}" | grep -P '^[-+]' | grep -v -P '^[-+]{3}' | grep -v -P '^[-+]($|\/\/|\/\*\*|\s+(\/\*\*|\*|\/\/)|    public static function Define)')

    if [ "${RESULT}" = "" ]; then
        echo "No functional changes"
    else
        echo "${RESULT}"
    fi
done
