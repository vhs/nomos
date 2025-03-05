#!/bin/bash

PROVIDER_TYPES_PATH=src/types/providers

cd "$(dirname "$(realpath "$0")")/../" || exit 255

BASEDIR=${1:-../..}

# shellcheck disable=SC2001
BASEDIR=$(echo "${BASEDIR}" | sed 's:/$::g')

find "${BASEDIR}/app/handlers/v2/" -type f | sort | while read -r SERVICE_FILE; do

    TS_FILE="${PROVIDER_TYPES_PATH}/I$(basename "${SERVICE_FILE/Handler2.php/2}").ts"

    {
        cat << EOF
/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { $(grep -E '^export (type|interface)' src/lib/db/utils/query-filters.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/lib/db/utils/query-filters'

import { $(grep -E '^export (type|interface)' src/types/api.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/api'
import { $(grep -E '^export (type|interface)' src/types/validators/common.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/validators/common'
import { $(grep -E '^export (type|interface)' src/types/validators/records.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/validators/records'

EOF

        php "${BASEDIR}/tools/generate-ts-contract-interface.php" "${SERVICE_FILE}"
    } | perl -pe 's/\bint\b/number/g;s/\bmixed\b/unknown/g;s/\bbool\b/boolean/g;s/\\?(app|vhs)\\\w+\\\w+\\//g;s/\\?(app|vhs)\\\w+\\//g;s/\bprivate\b/privateVal/g;s/([A-Z]\w+)\[\]/$1s/g;s/v2\\//g' > "${TS_FILE}"
done && {
    pnpm exec eslint --fix "${PROVIDER_TYPES_PATH}"
    pnpm exec prettier -w "${PROVIDER_TYPES_PATH}"
}
