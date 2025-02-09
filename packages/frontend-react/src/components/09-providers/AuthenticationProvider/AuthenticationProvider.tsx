import { useEffect, useMemo, useState, type FC } from 'react'

import useSWR from 'swr'

import type { AuthenticationProviderProps, AuthenticationStates } from './AuthenticationProvider.types'

import AuthService2 from '@/lib/providers/AuthService2'

import { AuthenticationContext } from './AuthenticationProvider.context'
import { backendCurrentUserUrl, currentUserFetchConfig, currentUserFetcher } from './AuthenticationProvider.utils'

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [pollUser, setPollUser] = useState<boolean>(false)
    const [authenticationState, setAuthenticationState] = useState<AuthenticationStates>(-1)

    const {
        data: currentUser
        // isLoading: isCurrentUserLoading,
        // error: isCurrentUserError
    } = useSWR(pollUser ? backendCurrentUserUrl : null, currentUserFetcher, currentUserFetchConfig)

    const login = async (username: string, password: string): Promise<void> => {
        const loginResult = await AuthService2.getInstance().Login(username, password)

        const loggedIn = loginResult != null && /"?Access Granted"?/.test(loginResult) ? 1 : 0

        setAuthenticationState(loggedIn)
        setIsAuthenticated(Boolean(loggedIn))
        setPollUser(true)
    }

    const logout = async (): Promise<void> => {
        await AuthService2.getInstance().Logout()

        setAuthenticationState(0)
        setIsAuthenticated(false)
        setPollUser(false)
    }

    const authenticationContextValue = useMemo(
        () => ({
            authenticationState,
            currentUser,
            isAuthenticated,
            login,
            logout
        }),
        [authenticationState, currentUser, isAuthenticated]
    )

    useEffect(() => {
        const initialCurrectUserFetch = async (): Promise<void> => {
            try {
                const initialCurrentUserResult = await currentUserFetcher()

                if (typeof initialCurrentUserResult?.id === 'number') {
                    setPollUser(true)
                    setAuthenticationState(1)
                    setIsAuthenticated(true)
                } else {
                    setAuthenticationState(0)
                }
            } catch (err) {
                console.error('initialCurrentUserFetch', err)
            }
        }

        void initialCurrectUserFetch()
    }, [])

    useEffect(() => {
        setIsAuthenticated(currentUser != null)
    }, [currentUser])

    return (
        <AuthenticationContext.Provider value={authenticationContextValue}>{children}</AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
