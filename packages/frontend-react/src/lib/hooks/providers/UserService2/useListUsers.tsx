import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { isFilter, type Filter } from '@/lib/db/utils/query-filters'
import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isNumber } from '@/lib/guards/common'
import { isPartialUsers } from '@/lib/guards/records'
import UserService2 from '@/lib/providers/UserService2'
import { coerceStringObject } from '@/lib/utils'

import type { Users } from '@/types/validators/records'

const baseUrl = `/services/v2/UserService2.svc/ListUsers`

const useListUsers = (
    page: number,
    pageSize: number,
    columns: string,
    order: string,
    filters: Filter | null
): SWRResponse<Users> => {
    const params = useMemo((): {
        filters: Filter | null
        page: number
        size: number
        columns: string
        order: string
    } | null => {
        return isNumber(page) && isNumber(pageSize) && (filters == null || isFilter(filters))
            ? {
                  filters,
                  page: page - 1 < 0 ? 0 : page - 1,
                  size: pageSize,
                  columns,
                  order
              }
            : null
    }, [columns, filters, order, page, pageSize])

    const listUrl = useMemo<string | null>(
        () => (params != null ? `${baseUrl}?${new URLSearchParams(coerceStringObject(params)).toString()}` : null),
        [params]
    )

    return useSWR<Users>(
        listUrl ?? null,
        async (_url: string) => {
            if (listUrl == null || params == null) {
                throw new Error('Missing args or params')
            }

            const { filters, page, size, columns, order } = params

            const result = await UserService2.getInstance().ListUsers(page, size, columns, order, filters)

            if (!isPartialUsers(result)) {
                const error = new HTTPException('Response is not PartialUsers')

                error.data = result
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

export default useListUsers
