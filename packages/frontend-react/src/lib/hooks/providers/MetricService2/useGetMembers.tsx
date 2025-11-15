import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { isMetricServiceGetMembersResult } from '@/lib/guards/records'
import MetricService2 from '@/lib/providers/MetricService2'
import { zMetricServiceGetMembersResult } from '@/lib/validators/records'

import type { MetricServiceGroupType, MetricServiceGetMembersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetMembers'

const getNewMembersFetcher = async (
    start: string,
    end: string,
    group: MetricServiceGroupType
): Promise<MetricServiceGetMembersResult> => {
    const result = await MetricService2.getInstance().GetMembers(start, end, group)

    if (!isMetricServiceGetMembersResult(result)) {
        const validated = zMetricServiceGetMembersResult.safeParse(result)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }

    return result
}

const useGetMembers = (
    start: string,
    end: string,
    group: MetricServiceGroupType
): SWRResponse<MetricServiceGetMembersResult> => {
    const uri = useMemo(
        () => `${baseUri}?start_range=${start}&end_range=${end}&group=${String(group)}`,
        [start, end, group]
    )

    return useSWR<MetricServiceGetMembersResult>(uri, async (_uri: string): Promise<MetricServiceGetMembersResult> => {
        return await getNewMembersFetcher(start, end, group)
    })
}

export default useGetMembers
