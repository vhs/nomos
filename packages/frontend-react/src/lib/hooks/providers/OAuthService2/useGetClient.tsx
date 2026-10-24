import useSWR, { type SWRResponse } from 'swr'

import type { AppClient } from '@/types/validators/records'

export const useGetClient = (id?: number, secret?: string): SWRResponse<AppClient> => {
    return useSWR<AppClient>(id != null ? `/services/v2/OAuthService2.svc/GetClient?id=${id}&secret=${secret}` : null)
}
