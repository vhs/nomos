import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isPrivileges } from '@/lib/guards/records'
import PrivilegeService2 from '@/lib/providers/PrivilegeService2'

import type { Privileges } from '@/types/validators/records'

const useGetUserPrivileges = (userId?: number): SWRResponse<Privileges> => {
    const getUserPrivilegesUrl = useMemo(
        () => (userId != null ? `/services/v2/PrivilegeService2.svc/GetUserPrivileges?userid=${userId}` : null),
        [userId]
    )

    return useSWR<Privileges>(getUserPrivilegesUrl, async (_url: string): Promise<Privileges> => {
        const result = await PrivilegeService2.getInstance().GetUserPrivileges(Number(userId))

        if (!isPrivileges(result)) {
            const error = new HTTPException('An error occurred while fetching the data.')
            error.info = result
            throw error
        }

        return result
    })
}

export default useGetUserPrivileges
