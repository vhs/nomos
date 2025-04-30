import { useEffect, useMemo, useState, type FC } from 'react'

import { toast } from 'react-toastify'

import type { AuthenticationProviderProps } from './AuthenticationProvider.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

import useCurrentUser from '@/lib/hooks/providers/AuthService2/useCurrentUser'
import AuthService2 from '@/lib/providers/AuthService2'
import { stripResultMessageQuotes } from '@/lib/utils'

import type { AuthenticationStates } from '@/types/common'

import { useConfigProviderContext } from '../ConfigProvider/ConfigProvider.hook'

import { AuthenticationContext } from './AuthenticationProvider.context'

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }) => {
    const { state } = useConfigProviderContext()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [authenticationState, setAuthenticationState] = useState<AuthenticationStates>(-1)

    const { currentUser, mutateUser } = useCurrentUser()

    const login = async (username: string, password: string): Promise<void> => {
        const loginResult = await AuthService2.getInstance().Login(username, password)

        const loggedIn = loginResult != null && /"?Access Granted"?/.test(loginResult) ? 1 : 0

        toast(stripResultMessageQuotes(loginResult ?? 'An unknown error occured.'), {
            type: loggedIn === 1 ? 'success' : 'warning'
        })

        setAuthenticationState(loggedIn)
        setIsAuthenticated(Boolean(loggedIn))
    }

    const logout = async (): Promise<void> => {
        await AuthService2.getInstance().Logout()

        setAuthenticationState(0)
        setIsAuthenticated(false)
    }

    const authenticationContextValue = useMemo(
        () => ({
            authenticationState,
            currentUser,
            isAuthenticated,
            login,
            logout,
            mutateUser
        }),
        [authenticationState, currentUser, isAuthenticated, mutateUser]
    )

    useEffect(() => {
        if (currentUser != null) {
            setIsAuthenticated(true)
            setAuthenticationState(1)
        } else {
            setIsAuthenticated(false)
            setAuthenticationState(0)
        }
    }, [currentUser])

    if (state === 'loading') <LoadingOverlay />

    return (
        <AuthenticationContext.Provider value={authenticationContextValue}>{children}</AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
