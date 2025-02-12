import useSWR from 'swr'

import PrivilegeService2 from '@/lib/providers/PrivilegeService2'

import type { NOMOSSWRResponse } from '@/types/custom'
import type { Privileges } from '@/types/records'

/* eslint-disable */
export const useGetAllPrivileges = () => {
    return useSWR<NOMOSSWRResponse<Privileges>>(
        '/services/v2/PrivilegeService2.svc/GetAllPrivileges',
        async (_url: string): Promise<NOMOSSWRResponse<Privileges>> => {
            const result = await PrivilegeService2.getInstance().GetAllPrivileges()

            return result
        }
    )
}
