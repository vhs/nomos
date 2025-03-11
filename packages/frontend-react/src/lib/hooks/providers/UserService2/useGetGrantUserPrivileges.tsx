import useSWR, { type SWRResponse } from 'swr'

import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isStringStringRecord } from '@/lib/guards/common'
import UserService2 from '@/lib/providers/UserService2'

import type { StringStringRecord } from '@/types/validators/common'

const useGetGrantUserPrivileges = (userId: number | null | undefined): SWRResponse<StringStringRecord> => {
    return useSWR<Record<string, string>>(
        userId != null ? '/services/v2/UserService2.svc/GetGrantUserPrivileges' : null,
        async (_url: string): Promise<Record<string, string>> => {
            if (userId == null) throw new Error('Invalid userId')

            const result = await UserService2.getInstance().GetGrantUserPrivileges(userId)

            if (!isStringStringRecord(result)) {
                const error = new HTTPException('An error occurred while fetching the data.')
                error.info = result
                throw error
            }

            return result
        }
    )
}

export default useGetGrantUserPrivileges
