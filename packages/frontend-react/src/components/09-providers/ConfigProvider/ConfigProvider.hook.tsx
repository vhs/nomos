import { useContext } from 'react'

import type { ConfigProviderContextValue } from './ConfigProvider.types'

import { ConfigProviderContext } from './ConfigProvider.context'
import { isConfigProviderContextValue } from './ConfigProvider.guards'

export const useConfigProviderContext = (): ConfigProviderContextValue => {
    const configProviderContext = useContext(ConfigProviderContext)

    if (!isConfigProviderContextValue(configProviderContext)) {
        throw new Error('Config provider context has not been loaded yet')
    }

    return configProviderContext
}
