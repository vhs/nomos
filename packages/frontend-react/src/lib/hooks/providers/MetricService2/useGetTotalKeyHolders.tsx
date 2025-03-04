import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isTotalKeyHoldersResult } from '@/lib/validators/guards'
import { zMetricServiceTotalKeyHoldersResult } from '@/lib/validators/records'

import type { MetricServiceTotalKeyHoldersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetTotalKeyHolders'

const getTotalKeyHoldersFetcher = async (): Promise<MetricServiceTotalKeyHoldersResult> => {
    const result = await MetricService2.getInstance().GetTotalKeyHolders()

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetTotalKeyHolders returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    if (!isTotalKeyHoldersResult(result)) {
        const validated = zMetricServiceTotalKeyHoldersResult.safeParse(result)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }

    return result
}

const useGetTotalKeyHolders = (): SWRResponse<MetricServiceTotalKeyHoldersResult> => {
    const uri = baseUri

    return useSWR<MetricServiceTotalKeyHoldersResult>(
        uri,
        async (_uri: string): Promise<MetricServiceTotalKeyHoldersResult> => {
            return await getTotalKeyHoldersFetcher()
        }
    )
}

export default useGetTotalKeyHolders
