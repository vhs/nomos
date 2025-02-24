import useSWR, { type SWRResponse } from 'swr'

import PrivilegeService2 from '@/lib/providers/PrivilegeService2'

import type { NOMOSSWRResponse } from '@/types/custom'
import type { Privileges } from '@/types/records'

const useGetAllPrivileges = (): SWRResponse<NOMOSSWRResponse<Privileges>> => {
    return useSWR<NOMOSSWRResponse<Privileges>>(
        '/services/v2/PrivilegeService2.svc/GetAllPrivileges',
        async (_url: string): Promise<NOMOSSWRResponse<Privileges>> => {
            const result = await PrivilegeService2.getInstance().GetAllPrivileges()

            return result
        }
    )
}

export default useGetAllPrivileges
