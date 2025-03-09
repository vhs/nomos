import type { BackendResult } from '@/types/api'

import { getter, postWithParams } from './fetcher'

export const backendCall = async <T = null | undefined>(
    endpoint: string,
    data?: Record<string, unknown>
): BackendResult<T> => {
    try {
        const response = data != null ? await postWithParams(endpoint, data) : await getter(endpoint)

        return typeof response === 'string' ? response : (response as T)
    } catch (err) {
        console.error(new Error(`backendCall: ${JSON.stringify(err)}`))

        return null
    }
}
