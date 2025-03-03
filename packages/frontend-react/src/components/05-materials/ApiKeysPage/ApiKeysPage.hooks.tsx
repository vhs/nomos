import { useMemo } from 'react'

import useSWR, { type SWRResponse } from 'swr'

import type { ApiKeysScope } from './ApiKeysPage.types'

import useAuth from '@/lib/hooks/useAuth'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'
import PrivilegeService2 from '@/lib/providers/PrivilegeService2'

import type { BasePrivileges, Keys } from '@/types/records'

export const useAvailableKeys = (scope: ApiKeysScope): SWRResponse<Keys> => {
    const { currentUser } = useAuth()

    const virtualGetScopeApiKeysUrl = useMemo(() => {
        if (currentUser?.id == null) return null

        return scope === 'system'
            ? '/services/v2/VirtualService1.svc/GetScopedKeys?scope=system'
            : `/services/v2/VirtualService1.svc/GetScopedKeys?scope=user&id=${currentUser?.id}`
    }, [currentUser?.id, scope])

    return useSWR<Keys>(virtualGetScopeApiKeysUrl, async (_url: string): Promise<Keys> => {
        if (currentUser?.id == null) throw new Error('Unexcepted null currentUser')

        const result =
            scope === 'user'
                ? await ApiKeyService2.getInstance().GetUserApiKeys(currentUser?.id)
                : await ApiKeyService2.getInstance().GetSystemApiKeys()

        if (!Array.isArray(result)) throw new Error(`Invalid response data: ${JSON.stringify(result)}`)

        return result
    })
}

export const useAvailablePrivileges = (scope: ApiKeysScope): SWRResponse<BasePrivileges> => {
    const { currentUser } = useAuth()

    const virtualGetScopePrivilegesUrl = useMemo(() => {
        if (currentUser?.id == null) return null

        return scope === 'system'
            ? '/services/v2/VirtualService1.svc/GetScopedPrivileges?scope=system'
            : `/services/v2/VirtualService1.svc/GetScopedPrivileges?scope=user&id=${currentUser?.id}`
    }, [currentUser?.id, scope])

    return useSWR<BasePrivileges>(virtualGetScopePrivilegesUrl, async (_url: string): Promise<BasePrivileges> => {
        if (currentUser?.id == null) throw new Error('Unexcepted null currentUser')

        const result =
            scope === 'user'
                ? await PrivilegeService2.getInstance().GetUserPrivileges(currentUser?.id)
                : await PrivilegeService2.getInstance().GetAllPrivileges()

        if (!Array.isArray(result)) throw new Error(`Invalid response data: ${JSON.stringify(result)}`)

        return result
            .filter(Boolean)
            .map((p) => {
                if (typeof p !== 'string')
                    return {
                        code: p.code,
                        name: p.name
                    }
                else return null
            })
            .filter((p) => p != null) as BasePrivileges
    })
}
