import useSWR, { type SWRResponse } from 'swr'

import PrivilegeService2 from '@/lib/providers/PrivilegeService2'

import type { NOMOSSWRResponse } from '@/types/api'
import type { Privileges } from '@/types/validators/records'

const useGetAllPrivileges = (): SWRResponse<NOMOSSWRResponse<Privileges>> => {
    return useSWR<NOMOSSWRResponse<Privileges>>(
        '/services/v2/PrivilegeService2.svc/GetAllPrivileges',
        async (_url: string): Promise<NOMOSSWRResponse<Privileges>> => {
            return await PrivilegeService2.getInstance().GetAllPrivileges()
        }
    )
}

export default useGetAllPrivileges
