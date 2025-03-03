import useSWR from 'swr'

import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import type { NOMOSSWRResponse } from '@/types/api'
import type { Keys } from '@/types/validators/records'

/* eslint-disable */
const useGetSystemApiKeys = () => {
    return useSWR<NOMOSSWRResponse<Keys>>(
        '/services/v2/ApiKeyService2.svc/GetSystemApiKeys',
        async (_url: string): Promise<NOMOSSWRResponse<Keys>> => {
            const result = await ApiKeyService2.getInstance().GetSystemApiKeys()

            return result
        }
    )
}

export default useGetSystemApiKeys
