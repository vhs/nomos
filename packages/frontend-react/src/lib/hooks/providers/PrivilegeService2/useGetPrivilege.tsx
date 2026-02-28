import useSWR, { type SWRResponse } from 'swr'

import type { Privilege } from '@/types/validators/records'

const useGetPrivilege = (privilegeId?: number): SWRResponse<Privilege> => {
    return useSWR<Privilege>(
        privilegeId != null ? `/services/v2/PrivilegeService2.svc/GetPrivilege?id=${privilegeId}` : null
    )
}

export default useGetPrivilege
