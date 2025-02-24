import { useMemo } from 'react'

import { coerceStringObject } from '@/lib/utils'

import type { PagedApiRequestParams } from '@/types/api'

const baseUrl = '/services/v2/AuthService2.svc/ListUserAccessLog'

interface ListUserAccessLogParams extends PagedApiRequestParams {
    [key: string]: unknown
    userid?: number
}

const useListUserAccessLogUrl = (opts: ListUserAccessLogParams): string | null => {
    return useMemo(() => {
        if (opts.userid == null) return null

        const searchParams = new URLSearchParams(coerceStringObject(opts))

        return `${baseUrl}?${searchParams.toString()}`
    }, [opts])
}
const useListUserAccessLog = ({
    userid,
    page,
    size,
    columns,
    order,
    search,
    filters
}: ListUserAccessLogParams): void => {
    console.log({
        userid,
        page,
        size,
        columns,
        order,
        search,
        filters
    })
}

export default useListUserAccessLog
