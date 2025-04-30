import { createContext } from 'react'

import type { ConfigProviderContextValue } from './ConfigProvider.types'

export const ConfigProviderContext = createContext<ConfigProviderContextValue | undefined>(undefined)
