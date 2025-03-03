import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import type { SystemPreference } from '@/types/validators/records'

const baseUrl = '/services/v2/PreferenceService2.svc/GetSystemPreference'

export const useGetSystemPreferenceUrl = (id?: string | number): string | null =>
    useMemo(() => (id != null ? `${baseUrl}?id=${id}` : null), [id])

const useGetSystemPreference = (id?: string | number): SWRResponse<SystemPreference> => {
    const url = useGetSystemPreferenceUrl(id)

    return useSWR<SystemPreference>(id != null ? url : null)
}

export default useGetSystemPreference
