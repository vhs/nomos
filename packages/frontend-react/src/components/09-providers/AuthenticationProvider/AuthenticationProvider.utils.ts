import PrincipalUserObject from '@/lib/db/models/PrincipalUser'
import { fetcher } from '@/lib/fetcher'

import type { CurrentUser, User } from '@/types/validators/records'

export const backendCurrentUserUrl = '/services/v2/AuthService2.svc/CurrentUser'

export const currentUserFetcher = async (): Promise<PrincipalUserObject | null | undefined> => {
    const currentUserResult: CurrentUser = await fetcher<CurrentUser>(backendCurrentUserUrl)

    if (currentUserResult.id == null) return undefined

    const principalUserResult: User = await fetcher<User>(
        `/services/v2/UserService2.svc/GetUser?userid=${currentUserResult.id}`
    )

    if (principalUserResult == null) return null

    return new PrincipalUserObject(principalUserResult, currentUserResult.permissions)
}

export const currentUserFetchConfig = {
    refreshInterval: 15000,
    revalidateOnFocus: true,
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true
}
