#!/bin/sh

cd "$(dirname "$(realpath "$0")")/../" || exit 255

{
    cat << EOF
// WARNING:
// This file is automatically generated.
// Do not edit manually.

EOF
    echo "import { $(grep 'export const z' ./src/lib/validators/common.ts | awk '{ print $3 }' | cut -c2- | sort | xargs | tr ' ' ',')} from '@/types/common'"
    echo "import { $(grep 'export const z' ./src/lib/validators/records.ts | awk '{ print $3 }' | cut -c2- | sort | xargs | tr ' ' ',')} from '@/types/records'"
    echo "import { $(grep 'export const z' ./src/lib/validators/common.ts | awk '{ print $3 }' | sort | xargs | tr ' ' ',')} from '@/lib/validators/common'"
    echo "import { $(grep 'export const z' ./src/lib/validators/records.ts | awk '{ print $3 }' | sort | xargs | tr ' ' ',')} from '@/lib/validators/records'"
    echo ""
    cat ./src/lib/validators/records.ts ./src/lib/validators/common.ts | grep 'export const z' | awk '{ print $3 }' | cut -c2- | sort | grep -v 'BaseFields' | xargs -I% echo -e 'export const is% = (inp: unknown): inp is % => z%.safeParse(inp).success\nexport const is%s = (inp: unknown): inp is % => z%.array().safeParse(inp).success\n' | sed 's/ss = /ses = /g'
} > ./src/lib/validators/guards.ts

OUTPUT_FILES="./src/lib/validators/guards.ts"

VALIDATORS="common records"

for VALIDATOR in ${VALIDATORS}; do
    VALIDATOR_FILE="./src/lib/validators/${VALIDATOR}.ts"
    VALIDATOR_IMPORT="@/lib/validators/${VALIDATOR}.ts"
    TYPE_FILE="./src/types/${VALIDATOR}.ts"

    {
        cat << EOF
        import type { z } from 'zod'

EOF
        echo "import { $(grep 'export const z' "${VALIDATOR_FILE}" | awk '{ print $3 }' | sort | xargs | tr ' ' ',')} from '${VALIDATOR_IMPORT}'"
        echo ""
        grep 'export const z' "${VALIDATOR_FILE}" | awk '{ print $3 }' | cut -c2- | sort | xargs -I% echo -e "export type % = z.infer<typeof z%>\nexport type %s = %[]"
    } > "${TYPE_FILE}"

    OUTPUT_FILES="${OUTPUT_FILES} ${TYPE_FILE}"
done

# shellcheck disable=SC2086
echo "Formatting output files..." \
    && pnpm exec eslint --fix ${OUTPUT_FILES} \
    && pnpm exec prettier -w ${OUTPUT_FILES}
