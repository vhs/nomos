import { createContext, useContext } from 'react'

import type { AuthenticationContextProps } from './AuthenticationProvider.types'

export const AuthenticationContext = createContext<AuthenticationContextProps | undefined>(undefined)

export const useAuthenticationContext = (): AuthenticationContextProps => {
    const authenticationContext = useContext(AuthenticationContext)

    if (authenticationContext == null) throw new Error('Authentication context not initialized')

    return authenticationContext
}
