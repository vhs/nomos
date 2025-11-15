import useSWR, { type SWRResponse } from 'swr'

import type { AppClient } from '@/types/validators/records'

export const useGetClientDetails = (id?: number): SWRResponse<AppClient> => {
    return useSWR<AppClient>(id != null ? `/services/v2/OAuthService2.svc/GetClientDetails?id=${id}` : null)
}
