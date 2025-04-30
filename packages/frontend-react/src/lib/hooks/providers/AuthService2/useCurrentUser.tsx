import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import { useConfigProviderContext } from '@/components/09-providers/ConfigProvider/ConfigProvider.hook'

import PrincipalUserObject from '@/lib/db/models/PrincipalUser'
import { fetcher } from '@/lib/fetcher'
import { isCurrentUser } from '@/lib/guards/records'

import type { CurrentUser, User } from '@/types/validators/records'

import useGetUser from '../UserService2/useGetUser'

export const currentUserFetchConfig = {
    refreshInterval: 15000,
    revalidateOnFocus: true,
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true
}

interface CurrentUserHookData {
    currentUser: PrincipalUserObject | null | undefined
    isUserError?: unknown
    isUserLoading: boolean
    mutateUser: SWRResponse<User>['mutate']
}

export const useCurrentUserUrl = (): string | null => {
    const { getFullUri } = useConfigProviderContext()

    const currentUserUrl = useMemo(() => getFullUri(`/services/v2/AuthService2.svc/CurrentUser`), [getFullUri])

    return currentUserUrl
}

const useCurrentUser = (): CurrentUserHookData => {
    const currentUserUrl = useCurrentUserUrl()

    const {
        data: currentUserData,
        error: currentUserError,
        isLoading: isCurrentUserLoading
    } = useSWR<CurrentUser, Error>(currentUserUrl, fetcher, currentUserFetchConfig)

    const principalUserResult = useGetUser(isCurrentUser(currentUserData) ? currentUserData.id : null)

    const principalUser = useMemo(() => {
        return principalUserResult.data != null ? new PrincipalUserObject(principalUserResult.data) : undefined
    }, [principalUserResult.data])

    const error = useMemo<unknown>(() => {
        if (currentUserError != null) return currentUserError
        if (principalUserResult.error != null) return principalUserResult.error
    }, [currentUserError, principalUserResult])

    return {
        currentUser: principalUser,
        isUserError: error,
        isUserLoading: isCurrentUserLoading || principalUserResult.isLoading,
        mutateUser: principalUserResult.mutate
    }
}

export default useCurrentUser
