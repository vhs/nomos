import { createContext, useContext } from 'react'

import type { OAuthPageContextValue } from './OAuthPage.types'

export const OAuthPageContext = createContext<OAuthPageContextValue | null>(null)

export function useOAuthPageContext(): OAuthPageContextValue {
    const context = useContext(OAuthPageContext)

    if (context == null) {
        throw new Error('useOAuthPageContext must be used within an OAuthPageProvider')
    }

    return context
}
