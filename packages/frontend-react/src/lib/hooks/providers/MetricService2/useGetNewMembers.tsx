import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { isNewMembersResult } from '@/lib/validators/guards'
import { zNewMembersResult } from '@/lib/validators/records'

import type { NewMembersResult } from '@/types/validators/records'

const baseUri = '/services/v2/MetricService2.svc/GetNewMembers'

const getNewMembersFetcher = async (start: string, end: string): Promise<NewMembersResult> => {
    const result = await MetricService2.getInstance().GetNewMembers(start, end)

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetNewMembers returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    if (!isNewMembersResult(result)) {
        const validated = zNewMembersResult.safeParse(result)

        throw new Error(
            `Invalid server input: ${validated.error?.errors.map((issue) => issue.message.toString()).join(', ')}`
        )
    }
    return result
}

const useGetNewMembers = (start: string, end: string): SWRResponse<NewMembersResult> => {
    const uri = useMemo(() => `${baseUri}?start_range=${start}&end_range=${end}`, [start, end])

    return useSWR<NewMembersResult>(uri, async (_uri: string): Promise<NewMembersResult> => {
        return await getNewMembersFetcher(start, end)
    })
}

export default useGetNewMembers
