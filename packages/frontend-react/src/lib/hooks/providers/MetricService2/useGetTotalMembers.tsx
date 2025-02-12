import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { zTotalMembersResult } from '@/lib/validators/records'

import type { TotalMembersResult } from '@/types/records'

const baseUri = '/services/v2/MetricService2.svc/GetTotalMembers'

export const useGetTotalMembersUrl = (): string => {
    return baseUri
}

const getTotalMembersFetcher = async (): Promise<TotalMembersResult> => {
    const result = await MetricService2.getInstance().GetTotalMembers()

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetTotalMembers returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    const validated = zTotalMembersResult.safeParse(result)

    if (!validated.success)
        throw new Error(
            `Invalid server input: ${validated.error.errors.map((issue) => issue.message.toString()).join(', ')}`
        )

    return result
}

export const useGetTotalMembers = (): SWRResponse<TotalMembersResult> => {
    const uri = baseUri

    return useSWR<TotalMembersResult>(uri, async (_uri: string): Promise<TotalMembersResult> => {
        return await getTotalMembersFetcher()
    })
}
