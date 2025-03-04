import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isMetricServiceGetMembersResult } from '@/lib/validators/guards'
import { zMetricServiceGetMembersResult } from '@/lib/validators/records'

import type { MetricServiceGroupType, MetricServiceGetMembersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetMembers'

const getNewMembersFetcher = async (
    start: string,
    end: string,
    group: MetricServiceGroupType
): Promise<MetricServiceGetMembersResult> => {
    const result = await MetricService2.getInstance().GetMembers(start, end, group)

    if (!isMetricServiceGetMembersResult(result))
        throw new Error(
            `MetricService2.getInstance().GetMembers returned an invalid value[${typeof result}]: ${JSON.stringify(result)}`
        )

    if (Array.isArray(result.created)) result.created = {}
    if (Array.isArray(result.expired)) result.expired = {}
    if (Array.isArray(result.total)) result.total = {}

    const validated = zMetricServiceGetMembersResult.safeParse(result)

    if (!validated.success)
        throw new Error(
            `Invalid server input: ${validated.error.errors.map((issue) => issue.message.toString()).join(', ')}`
        )

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
