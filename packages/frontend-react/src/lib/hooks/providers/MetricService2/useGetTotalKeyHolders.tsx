import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { zTotalKeyHoldersResult } from '@/lib/validators/records'

import type { TotalKeyHoldersResult } from '@/types/records'

const baseUri = '/services/v2/MetricService2.svc/GetTotalKeyHolders'

export const useGetTotalKeyHoldersUrl = (): string => {
    return baseUri
}

const getTotalKeyHoldersFetcher = async (): Promise<TotalKeyHoldersResult> => {
    const result = await MetricService2.getInstance().GetTotalKeyHolders()

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetTotalKeyHolders returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    const validated = zTotalKeyHoldersResult.safeParse(result)

    if (!validated.success)
        throw new Error(
            `Invalid server input: ${validated.error.errors.map((issue) => issue.message.toString()).join(', ')}`
        )

    return result
}

export const useGetTotalKeyHolders = (): SWRResponse<TotalKeyHoldersResult> => {
    const uri = baseUri

    return useSWR<TotalKeyHoldersResult>(uri, async (_uri: string): Promise<TotalKeyHoldersResult> => {
        return await getTotalKeyHoldersFetcher()
    })
}
