#!/bin/bash

PROVIDER_HOOKS_PATH=src/lib/hooks/providers
PROVIDER_LIB_PATH=src/lib/providers
PROVIDER_TYPES_PATH=src/types/providers

cd "$(dirname "$(realpath "$0")")/../" || exit 255

BASEDIR=${1:-../..}

# shellcheck disable=SC2001
BASEDIR=$(echo "${BASEDIR}" | sed 's:/$::g')

echo "Generating provider types files..." \
    && find "${BASEDIR}/app/handlers/v2/" -type f | sort | while read -r SERVICE_FILE; do
        TS_FILE="${PROVIDER_TYPES_PATH}/I$(basename "${SERVICE_FILE/Handler2.php/2}").ts"

        {
            cat << EOF
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { $(grep -E '^export (type|interface)' src/lib/db/utils/query-filters.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/lib/db/utils/query-filters'

import { $(grep -E '^export (type|interface)' src/types/api.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/api'
import { $(grep -E '^export (type|interface)' src/types/validators/common.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/validators/common'
import { $(grep -E '^export (type|interface)' src/types/validators/records.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/validators/records'

EOF

            php "${BASEDIR}/tools/generate-ts-contract-interface.php" "${SERVICE_FILE}"
        } | perl -pe 's/\\?(app|vhs)(\\\w+)+\\//g' > "${TS_FILE}"
    done \
    && echo "Generating provider implementation files..." \
    && find "${BASEDIR}/app/handlers/v2/" -type f | sort | while read -r SERVICE_FILE; do

        SERVICE_ENDPOINT=$(basename "${SERVICE_FILE/Handler2.php/2}")
        INTERFACE="I${SERVICE_ENDPOINT}"

        TS_FILE="${PROVIDER_LIB_PATH}/${SERVICE_ENDPOINT}.ts"

        {
            cat << EOF
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { $(grep -E '^export (type|interface)' src/lib/db/utils/query-filters.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/lib/db/utils/query-filters'

import { $(grep -E '^export (type|interface)' src/types/api.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/api'
import { $(grep -E '^export (type|interface)' src/types/validators/common.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/validators/common'
import { $(grep -E '^export (type|interface)' src/types/validators/records.ts | awk '{ print $3 }' | cut -f1 -d'<' | sort | xargs | tr ' ' ',') } from '@/types/validators/records'

import { backendCall } from '@/lib/backend'

import { ${INTERFACE} } from '@/types/providers/${INTERFACE}'

EOF

            php "${BASEDIR}/tools/generate-ts-contract-implementation.php" "${SERVICE_FILE}" | head -n-1

            cat << EOF

    private static _instance: ${SERVICE_ENDPOINT}

    public static getInstance(): ${SERVICE_ENDPOINT} {
        if (${SERVICE_ENDPOINT}._instance == null) {
            ${SERVICE_ENDPOINT}._instance = new ${SERVICE_ENDPOINT}()
        }

        return ${SERVICE_ENDPOINT}._instance
    }
}
EOF
        } | perl -pe 's/\\?(app|vhs)(\\\w+)+\\//g' > "${TS_FILE}"
    done \
    && echo "Generating provider hooks files..." \
    && find "${PROVIDER_LIB_PATH}" -name '*.ts' | while read -r PROVIDER_FILE; do
        PROVIDER_NAME=$(basename "${PROVIDER_FILE}" | cut -f1 -d.)

        grep -w 'async' "${PROVIDER_FILE}" | awk '{ print $2 }' | cut -f1 -d'(' | while read -r PROVIDER_METHOD; do
            PROVIDER_HOOK="use${PROVIDER_METHOD^}"

            # echo "${PROVIDER_NAME} ${PROVIDER_PREFIX} ${PROVIDER_METHOD} ${PROVIDER_HOOK}"

            HOOK_DIR="${PROVIDER_HOOKS_PATH}/${PROVIDER_NAME}/"

            HOOK_FILE="${PROVIDER_HOOKS_PATH}/${PROVIDER_NAME}/${PROVIDER_HOOK}.tsx"

            mkdir -p "${HOOK_DIR}"

            if [ ! -f "${HOOK_FILE}" ]; then
                echo "Creating ${HOOK_FILE}..."

                cat << EOF > "${HOOK_FILE}"
/* eslint-disable */
export const ${PROVIDER_HOOK} = () => {}
EOF
            fi
        done
    done && {
    echo "Linting provider files..." && find ${PROVIDER_HOOKS_PATH} ${PROVIDER_LIB_PATH} ${PROVIDER_TYPES_PATH} -type f -name '*.ts' -mmin -5 -print0 | xargs -0 -r -n4 -P4 pnpm exec eslint -o /dev/null --fix
    echo "Formatting provider files..." && find ${PROVIDER_HOOKS_PATH} ${PROVIDER_LIB_PATH} ${PROVIDER_TYPES_PATH} -type f -name '*.ts' -mmin -5 -print0 | xargs -0 -r -n4 -P4 pnpm exec prettier --log-level=silent -w
    echo "Relinting provider files..." && find ${PROVIDER_HOOKS_PATH} ${PROVIDER_LIB_PATH} ${PROVIDER_TYPES_PATH} -type f -name '*.ts' -mmin -5 -print0 | xargs -0 -r -n1 -P4 pnpm exec eslint -o /dev/null --fix
    echo "Reformatting provider files..." && find ${PROVIDER_HOOKS_PATH} ${PROVIDER_LIB_PATH} ${PROVIDER_TYPES_PATH} -type f -name '*.ts' -mmin -5 -print0 | xargs -0 -r -n4 -P4 pnpm exec prettier --log-level=silent -w
}
