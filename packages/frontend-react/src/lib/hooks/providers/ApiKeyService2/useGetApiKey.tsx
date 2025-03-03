import useSWR, { type SWRResponse } from 'swr'

import type { Key } from '@/types/validators/records'

const useGetApiKey = (keyId?: number): SWRResponse<Key> =>
    useSWR<Key>(keyId != null ? `/services/v2/ApiKeyService2.svc/GetApiKey?keyid=${keyId}` : null)

export default useGetApiKey
