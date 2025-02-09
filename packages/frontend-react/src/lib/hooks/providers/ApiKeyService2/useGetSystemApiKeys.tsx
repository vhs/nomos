import useSWR from 'swr'

import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import type { NOMOSSWRResponse } from '@/types/custom'
import type { Keys } from '@/types/records'

/* eslint-disable */
export const useGetSystemApiKeys = () => {
    return useSWR<NOMOSSWRResponse<Keys>>(
        '/services/v2/ApiKeyService2.svc/GetSystemApiKeys',
        async (_url: string): Promise<NOMOSSWRResponse<Keys>> => {
            const result = await ApiKeyService2.getInstance().GetSystemApiKeys()

            return result
        }
    )
}
