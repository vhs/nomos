import type { ReactNode } from 'react'

import type { SWRResponse } from 'swr'

import type PrincipalUserObject from '@/lib/db/models/PrincipalUser'

import type { AuthenticationStates } from '@/types/common'
import type { User } from '@/types/validators/records'

export interface AuthenticationProviderProps {
    children?: ReactNode
}

export interface AuthenticationContextProps {
    authenticationState: AuthenticationStates
    currentUser: PrincipalUserObject | null | undefined
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
    mutateUser: SWRResponse<User>['mutate']
}
