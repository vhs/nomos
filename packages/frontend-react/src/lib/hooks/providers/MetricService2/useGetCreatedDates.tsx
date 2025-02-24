import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import MetricService2 from '@/lib/providers/MetricService2'
import { zMetricServiceGetCreatedDatesResult } from '@/lib/validators/records'

import type { MetricServiceGetCreatedDatesResult } from '@/types/records'

const baseUri = '/services/v2/MetricService2.svc/GetCreatedDates'

const getNewCreatedDatesFetcher = async (start: string, end: string): Promise<MetricServiceGetCreatedDatesResult> => {
    const result = await MetricService2.getInstance().GetCreatedDates(start, end)

    if (result == null || typeof result === 'string')
        throw new Error(
            `MetricService2.getInstance().GetCreatedDates returned an invalid value[${typeof result}]: ${result ?? 'null'}`
        )

    const validated = zMetricServiceGetCreatedDatesResult.safeParse(result)

    if (!validated.success)
        throw new Error(
            `Invalid server input: ${validated.error.errors.map((issue) => issue.message.toString()).join(', ')}`
        )

    return result
}

const useGetCreatedDates = (start: string, end: string): SWRResponse<MetricServiceGetCreatedDatesResult> => {
    const uri = useMemo(() => `${baseUri}?start_range=${start}&end_range=${end}`, [start, end])

    return useSWR<MetricServiceGetCreatedDatesResult>(
        uri,
        async (_uri: string): Promise<MetricServiceGetCreatedDatesResult> => {
            return await getNewCreatedDatesFetcher(start, end)
        }
    )
}

export default useGetCreatedDates
