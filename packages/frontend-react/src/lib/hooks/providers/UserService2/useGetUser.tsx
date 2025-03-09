import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { fetcher } from '@/lib/fetcher'

import type { User } from '@/types/validators/records'

export const useGetUserUrl = (userId?: string | number): string | null =>
    useMemo(() => (userId != null ? `/services/v2/UserService2.svc/GetUser?userid=${userId}` : null), [userId])

const useGetUser = (userId?: string | number): SWRResponse<User> => {
    const getUserUrl = useGetUserUrl(userId)

    const result = useSWR<User>(getUserUrl, fetcher)

    return result
}

export default useGetUser
