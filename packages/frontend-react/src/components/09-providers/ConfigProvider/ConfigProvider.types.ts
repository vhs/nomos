import type { ReactNode } from 'react'

import type {
    zConfigProviderContextError,
    zConfigProviderContextLoading,
    zConfigProviderContextReady,
    zConfigState,
    zSiteConfig
} from './ConfigProvider.schemas'
import type { z } from 'zod'

export interface ConfigProviderProps {
    children?: ReactNode
}

export type SiteConfig = z.infer<typeof zSiteConfig>

export type ConfigState = z.infer<typeof zConfigState>

export interface BaseContextProviderContextValue {
    getFullUri: (endpoint: string) => string | null
}

export type GenericContextProviderContextValue<T> = BaseContextProviderContextValue & T

export type ConfigProviderContextReady = GenericContextProviderContextValue<z.infer<typeof zConfigProviderContextReady>>
export type ConfigProviderContextError = GenericContextProviderContextValue<z.infer<typeof zConfigProviderContextError>>
export type ConfigProviderContextLoading = GenericContextProviderContextValue<
    z.infer<typeof zConfigProviderContextLoading>
>

export type ConfigProviderContextValue =
    | ConfigProviderContextReady
    | ConfigProviderContextError
    | ConfigProviderContextLoading
