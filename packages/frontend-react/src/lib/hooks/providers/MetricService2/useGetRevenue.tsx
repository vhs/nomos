import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isMetricServiceGetRevenueResult } from '@/lib/validators/guards'
import { zMetricServiceGetRevenueResult } from '@/lib/validators/records'

import type { MetricServiceGroupType, MetricServiceGetRevenueResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetRevenue'

const getNewMembersFetcher = async (
    start: string,
    end: string,
    group: MetricServiceGroupType
): Promise<MetricServiceGetRevenueResult> => {
    const result = await MetricService2.getInstance().GetRevenue(start, end, group)

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetRevenue returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    if (!isMetricServiceGetRevenueResult(result)) {
        const validated = zMetricServiceGetRevenueResult.safeParse(result)

        console.error(validated.error)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }

    return result
}

const useGetRevenue = (
    start: string,
    end: string,
    group: MetricServiceGroupType
): SWRResponse<MetricServiceGetRevenueResult, string> => {
    const uri = useMemo(
        () => `${baseUri}?start_range=${start}&end_range=${end}&group=${String(group)}`,
        [start, end, group]
    )

    return useSWR<MetricServiceGetRevenueResult, string>(
        uri,
        async (_uri: string): Promise<MetricServiceGetRevenueResult> => {
            return await getNewMembersFetcher(start, end, group)
        }
    )
}

export default useGetRevenue
