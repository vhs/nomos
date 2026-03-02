import useSWR, { type SWRResponse } from 'swr'

import { HTTPException } from '@/lib/exceptions/HTTPException'
import { isPrivileges } from '@/lib/guards/records'
import PrivilegeService2 from '@/lib/providers/PrivilegeService2'

import type { Privileges } from '@/types/validators/records'

const useGetAllPrivileges = (): SWRResponse<Privileges> => {
    return useSWR<Privileges>(
        '/services/v2/PrivilegeService2.svc/GetAllPrivileges',
        async (_url: string): Promise<Privileges> => {
            const result = await PrivilegeService2.getInstance().GetAllPrivileges()

            if (!isPrivileges(result)) {
                const error = new HTTPException('Invalid privilege data from server.')

                error.data = result
                error.status = 503

                throw error
            }

            return result
        }
    )
}

export default useGetAllPrivileges
