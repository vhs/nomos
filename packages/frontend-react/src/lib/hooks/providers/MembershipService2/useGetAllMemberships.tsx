import useSWR, { type SWRResponse } from 'swr'

import type { Memberships } from '@/types/records'

const useGetAllMemberships = (): SWRResponse<Memberships> => {
    return useSWR<Memberships>('/services/v2/MembershipService2.svc/GetAll')
}

export default useGetAllMemberships
