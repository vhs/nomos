import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isTotalMembersResult } from '@/lib/validators/guards'
import { zMetricServiceTotalMembersResult } from '@/lib/validators/records'

import type { MetricServiceTotalMembersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetTotalMembers'

const getTotalMembersFetcher = async (): Promise<MetricServiceTotalMembersResult> => {
    const result = await MetricService2.getInstance().GetTotalMembers()

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetTotalMembers returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    if (!isTotalMembersResult(result)) {
        const validated = zMetricServiceTotalMembersResult.safeParse(result)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }

    return result
}

const useGetTotalMembers = (): SWRResponse<MetricServiceTotalMembersResult> => {
    const uri = baseUri

    return useSWR<MetricServiceTotalMembersResult>(
        uri,
        async (_uri: string): Promise<MetricServiceTotalMembersResult> => {
            return await getTotalMembersFetcher()
        }
    )
}

export default useGetTotalMembers
