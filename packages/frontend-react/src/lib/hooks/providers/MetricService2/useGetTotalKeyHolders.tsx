import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isTotalKeyHoldersResult } from '@/lib/validators/guards'
import { zTotalKeyHoldersResult } from '@/lib/validators/records'

import type { TotalKeyHoldersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetTotalKeyHolders'

const getTotalKeyHoldersFetcher = async (): Promise<TotalKeyHoldersResult> => {
    const result = await MetricService2.getInstance().GetTotalKeyHolders()

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetTotalKeyHolders returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    if (!isTotalKeyHoldersResult(result)) {
        const validated = zTotalKeyHoldersResult.safeParse(result)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }

    return result
}

const useGetTotalKeyHolders = (): SWRResponse<TotalKeyHoldersResult> => {
    const uri = baseUri

    return useSWR<TotalKeyHoldersResult>(uri, async (_uri: string): Promise<TotalKeyHoldersResult> => {
        return await getTotalKeyHoldersFetcher()
    })
}

export default useGetTotalKeyHolders
