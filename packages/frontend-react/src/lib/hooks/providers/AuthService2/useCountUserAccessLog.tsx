import { useMemo } from 'react'

import { coerceStringObject } from '@/lib/util'

import type { PageUserApiRequestParams } from '@/types/api'

const baseUrl = '/services/v2/AuthService2.svc/CountUserAccessLog'

interface CountUserAccessLogParams {
    [key: string]: unknown
    userid?: number | string
    filters?: PageUserApiRequestParams['filters']
}

export const useCountUserAccessLogUrl = (opts: CountUserAccessLogParams): string | null => {
    return useMemo(() => {
        if (opts.userid == null) return null

        const searchParams = new URLSearchParams(coerceStringObject(opts))

        return `${baseUrl}?${searchParams.toString()}`
    }, [opts])
}

export const useCountUserAccessLog = ({ userid }: CountUserAccessLogParams): void => {
    console.log('useCountUserAccessLog:', { userid })
}
