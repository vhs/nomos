#!/bin/sh

cd "$(dirname "$(realpath "$0")")/../" || exit 255

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
    } > "${TYPE_FILE}" && pnpm exec eslint --fix "${TYPE_FILE}" && pnpm exec prettier -w "${TYPE_FILE}"
done
