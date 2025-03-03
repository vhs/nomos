import { useState, useMemo, useEffect } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import PrincipalUserObject from '@/lib/db/models/PrincipalUser'
import { fetcher } from '@/lib/fetcher'

import type { NOMOSResponse } from '@/types/api'
import type { ReactAction } from '@/types/ui'
import type { User } from '@/types/validators/records'

import useGetUser from '../UserService2/useGetUser'

interface UserHookData {
    currentUser?: PrincipalUserObject
    isUserError?: unknown
    isUserLoading: boolean
    mutateUser: SWRResponse<User>['mutate']
    pollUser: boolean
    setPollUser: ReactAction<boolean>
}

const backendCurrentUserUrl = '/services/v2/AuthService2.svc/CurrentUser'

const useCurrentUser = (): UserHookData => {
    const [pollUser, setPollUser] = useState<boolean>(false)

    const currentUserUrl = useMemo(() => (pollUser ? backendCurrentUserUrl : null), [pollUser])

    const {
        data: currentUserData,
        error: currentUserError,
        isLoading: isCurrentUserLoading
    } = useSWR<User, Error>(
        currentUserUrl,
        async (url: string): Promise<User> => {
            const result: NOMOSResponse<User> = await fetcher(url)

            return result
        },
        {
            refreshInterval: 15000,
            revalidateOnFocus: true,
            revalidateIfStale: true,
            revalidateOnMount: true,
            revalidateOnReconnect: true
        }
    )

    const principalUserResult = useGetUser(currentUserData?.id)

    const principalUser = useMemo(() => {
        return principalUserResult.data != null ? new PrincipalUserObject(principalUserResult.data) : undefined
    }, [principalUserResult.data])

    const error = useMemo<unknown>(() => {
        if (currentUserError != null) return currentUserError
        if (principalUserResult.error != null) return principalUserResult.error
    }, [currentUserError, principalUserResult])

    useEffect(() => {
        const initialCurrectUserFetch = async (): Promise<void> => {
            try {
                const initialCurrentUserResult = await fetcher<User>(backendCurrentUserUrl)

                if (typeof initialCurrentUserResult.id === 'number') {
                    setPollUser(true)
                }
            } catch (err) {
                console.error('initialCurrentUserFetch', err)
            }
        }

        void initialCurrectUserFetch()
    }, [])

    return {
        currentUser: principalUser,
        isUserError: error,
        isUserLoading: isCurrentUserLoading || principalUserResult.isLoading,
        mutateUser: principalUserResult.mutate,
        pollUser,
        setPollUser
    }
}

export default useCurrentUser
