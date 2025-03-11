import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import type { Filter } from '@/lib/db/utils/query-filters'
import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isNumber } from '@/lib/guards/common'
import UserService2 from '@/lib/providers/UserService2'
import { coerceStringObject } from '@/lib/utils'

const baseUrl = `/services/v2/UserService2.svc/CountUsers`

const useCountUsers = (filters: Filter | null): SWRResponse<number> => {
    const params = useMemo((): { filters: Filter | null } => ({ filters }), [filters])

    const [countUrl, countUrlReal, countUrlParams] = useMemo(
        () => [`${baseUrl}?${new URLSearchParams(coerceStringObject(params)).toString()}`, baseUrl, params],
        [params]
    )

    return useSWR<number>(
        countUrl != null && countUrlReal != null && countUrlParams != null ? countUrl : null,
        async (_url: string) => {
            if (countUrl == null || countUrlReal == null || countUrlParams == null) throw new Error('Missing args')

            const result = await UserService2.getInstance().CountUsers(JSON.stringify(filters))

            if (!isNumber(result)) {
                const error = new HTTPException('Not a number response')
                error.info = result
                error.status = 503

                throw error
            }

            return result
        },
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            refreshWhenHidden: true
        }
    )
}

export default useCountUsers
