import useSWR, { type SWRResponse } from 'swr'

import type { AppClient } from '@/types/validators/records'

export const useGetClientInfo = (id?: number): SWRResponse<AppClient> => {
    return useSWR<AppClient>(id != null ? `/services/v2/OAuthService2.svc/GetClientInfo?id=${id}` : null)
}
