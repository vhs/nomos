import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isUser } from '@/lib/guards/records'
import UserService2 from '@/lib/providers/UserService2'

import type { User } from '@/types/validators/records'

export const useGetUserUrl = (userId?: string | number): string | null =>
    useMemo(() => (userId != null ? `/services/v2/UserService2.svc/GetUser?userid=${userId}` : null), [userId])

const useGetUser = (userId?: string | number): SWRResponse<User> => {
    const getUserUrl = useGetUserUrl(userId)

    return useSWR<User>(
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        getUserUrl != null && userId != null ? getUserUrl : null,
        async (_url: string) => {
            if (getUserUrl == null || userId == null) throw new Error('Missing url or userId')

            const result = await UserService2.getInstance().GetUser(Number(userId))

            if (!isUser(result)) {
                const error = new HTTPException('Not a user response')

                error.data = result
                error.status = 503

                throw error
            }

            return result
        },
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            refreshWhenHidden: true
        }
    )
}

export default useGetUser
