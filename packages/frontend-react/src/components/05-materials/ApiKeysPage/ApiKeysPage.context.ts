import { createContext, useContext } from 'react'

import type { ApiKeysPageContextValue } from './ApiKeysPage.types'

export const ApiKeysPageContext = createContext<ApiKeysPageContextValue | null>(null)

export function useApiKeysPageContext(): ApiKeysPageContextValue {
    const context = useContext(ApiKeysPageContext)

    if (context == null) {
        throw new Error('useApiKeysPageContext must be used within an ApiKeysPageProvider')
    }

    return context
}
