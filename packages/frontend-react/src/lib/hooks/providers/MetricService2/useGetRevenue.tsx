import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { zMetricServiceGetRevenueResult } from '@/lib/validators/records'

import type { MetricServiceGroupTypes, MetricServiceGetRevenueResult } from '@/types/records'

const baseUri = '/services/v2/MetricService2.svc/GetRevenue'

const getNewMembersFetcher = async (
    start: string,
    end: string,
    group: MetricServiceGroupTypes
): Promise<MetricServiceGetRevenueResult> => {
    const result = await MetricService2.getInstance().GetRevenue(start, end, group)

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetRevenue returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    const validated = zMetricServiceGetRevenueResult.safeParse(result)

    if (!validated.success) {
        console.error(validated.error)

        throw new Error(
            `Invalid server input: ${validated.error.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }

    return result
}

export const useGetRevenue = (
    start: string,
    end: string,
    group: MetricServiceGroupTypes
): SWRResponse<MetricServiceGetRevenueResult, string> => {
    const uri = useMemo(() => `${baseUri}?start_range=${start}&end_range=${end}&group=${group}`, [start, end, group])

    return useSWR<MetricServiceGetRevenueResult, string>(
        uri,
        async (_uri: string): Promise<MetricServiceGetRevenueResult> => {
            return await getNewMembersFetcher(start, end, group)
        }
    )
}
