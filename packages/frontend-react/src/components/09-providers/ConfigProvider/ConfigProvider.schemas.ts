import { z } from 'zod'

import { zEmptyString, zMinString, zUrl } from '@/lib/validators/common'

export const zSiteConfig = z.object({
    baseApiUri: z.union([zEmptyString, zMinString, zUrl])
})

export const zConfigStateLoading = z.literal('loading')
export const zConfigStateReady = z.literal('ready')
export const zConfigStateError = z.literal('error')

export const zConfigState = z.union([zConfigStateLoading, zConfigStateReady, zConfigStateError])

export const zConfigProviderContextReady = z.object({
    config: zSiteConfig,
    state: zConfigStateReady
})

export const zConfigProviderContextError = z.object({
    config: z.undefined(),
    state: zConfigStateError
})

export const zConfigProviderContextLoading = z.object({
    config: z.undefined(),
    state: zConfigStateLoading
})

export const zConfigProviderContextValue = z.union([
    zConfigProviderContextReady,
    zConfigProviderContextError,
    zConfigProviderContextLoading
])
