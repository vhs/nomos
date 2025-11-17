import useSWR, { type SWRResponse } from 'swr'

import type { Memberships } from '@/types/validators/records'

const useGetAll = (): SWRResponse<Memberships> => {
    return useSWR<Memberships>('/services/v2/MembershipService2.svc/GetAll')
}

export default useGetAll
