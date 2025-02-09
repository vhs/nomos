import type { ReactNode } from 'react'

import type PrincipalUserObject from '@/lib/db/PrincipalUser'

export interface AuthenticationProviderProps {
    children?: ReactNode
}

export type AuthenticationStates = -1 | 0 | 1

export interface AuthenticationContextProps {
    authenticationState: AuthenticationStates
    currentUser: PrincipalUserObject | null | undefined
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}
