import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isMetricServiceNewMembersResult } from '@/lib/validators/guards'
import { zMetricServiceNewMembersResult } from '@/lib/validators/records'

import type { MetricServiceNewMembersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetNewMembers'

const getNewMembersFetcher = async (start: string, end: string): Promise<MetricServiceNewMembersResult> => {
    const result = await MetricService2.getInstance().GetNewMembers(start, end)

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetNewMembers returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    if (!isMetricServiceNewMembersResult(result)) {
        const validated = zMetricServiceNewMembersResult.safeParse(result)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }
    return result
}

const useGetNewMembers = (start: string, end: string): SWRResponse<MetricServiceNewMembersResult> => {
    const uri = useMemo(() => `${baseUri}?start_range=${start}&end_range=${end}`, [start, end])

    return useSWR<MetricServiceNewMembersResult>(uri, async (_uri: string): Promise<MetricServiceNewMembersResult> => {
        return await getNewMembersFetcher(start, end)
    })
}

export default useGetNewMembers
