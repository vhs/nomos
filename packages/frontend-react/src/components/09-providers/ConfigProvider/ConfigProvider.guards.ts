import type {
    SiteConfig,
    ConfigState,
    ConfigProviderContextValue,
    ConfigProviderContextReady,
    ConfigProviderContextError,
    ConfigProviderContextLoading
} from './ConfigProvider.types'

import {
    zSiteConfig,
    zConfigState,
    zConfigProviderContextValue,
    zConfigProviderContextReady,
    zConfigProviderContextError,
    zConfigProviderContextLoading
} from './ConfigProvider.schemas'

export const isSiteConfig = (inp: unknown): inp is SiteConfig => zSiteConfig.safeParse(inp).success
export const isConfigState = (inp: unknown): inp is ConfigState => zConfigState.safeParse(inp).success
export const isConfigProviderContextValue = (inp: unknown): inp is ConfigProviderContextValue =>
    zConfigProviderContextValue.safeParse(inp).success

export const isConfigProviderContextReady = (inp: unknown): inp is ConfigProviderContextReady =>
    zConfigProviderContextReady.safeParse(inp).success
export const isConfigProviderContextError = (inp: unknown): inp is ConfigProviderContextError =>
    zConfigProviderContextError.safeParse(inp).success
export const isConfigProviderContextLoading = (inp: unknown): inp is ConfigProviderContextLoading =>
    zConfigProviderContextLoading.safeParse(inp).success
