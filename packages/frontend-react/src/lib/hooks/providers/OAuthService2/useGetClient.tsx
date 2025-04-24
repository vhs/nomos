import useSWR, { type SWRResponse } from 'swr'

import type { AppClient } from '@/types/validators/records'

export const useGetClient = (id?: number): SWRResponse<AppClient> => {
    return useSWR<AppClient>(id != null ? `/services/web/AuthService2.svc/GetClient?id=${id}` : null)
}
