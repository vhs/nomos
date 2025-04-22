import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isEmptyArray } from '@/lib/guards/common'
import { isGetUserGrantablePrivilegesResult } from '@/lib/guards/records'
import UserService2 from '@/lib/providers/UserService2'

import type { StringStringRecord } from '@/types/validators/common'

const useGetUserGrantablePrivileges = (userId: number | null | undefined): SWRResponse<StringStringRecord> => {
    const getGrantUserPrivilegesUrl = useMemo(
        () => (userId != null ? `/services/v2/UserService2.svc/GetUserGrantablePrivileges?userid=${userId}` : null),
        [userId]
    )
    return useSWR<Record<number, string>>(
        getGrantUserPrivilegesUrl,
        async (_url: string): Promise<Record<number, string>> => {
            if (userId == null) throw new Error('Invalid userId')

            const result = await UserService2.getInstance().GetUserGrantablePrivileges(userId)

            if (!isGetUserGrantablePrivilegesResult(result)) {
                const error = new HTTPException('Invalid user grantable privileges result from server')

                error.data = result
                error.status = 503

                throw error
            }

            return isEmptyArray(result) ? {} : result
        }
    )
}

export default useGetUserGrantablePrivileges
