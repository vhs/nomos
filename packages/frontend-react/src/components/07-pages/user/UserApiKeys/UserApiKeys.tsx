import { useMemo, type FC } from 'react'

import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { UserApiKeysProps } from './UserApiKeys.types'

import ApiKeysPage from '@/components/05-materials/ApiKeysPage/ApiKeysPage'
import { backendCurrentUserUrl } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.utils'

import useAuth from '@/lib/hooks/useAuth'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import type { BasePrivileges, Keys } from '@/types/records'

const UserApiKeys: FC<UserApiKeysProps> = () => {
    const { currentUser } = useAuth()

    const keys: Keys = useMemo(() => (currentUser?.keys ?? []).filter((e) => e.type === 'api'), [currentUser?.keys])

    const createAPIKey = async (note: string): Promise<void> => {
        if (currentUser?.id == null) throw new Error('Missing current user information')

        await toast.promise(ApiKeyService2.getInstance().GenerateUserApiKey(currentUser.id, note), {
            error: 'Failed to create a new API key. Please contact your administrator!',
            pending: 'Creating new API key',
            success: 'Created new API key'
        })

        await mutate(backendCurrentUserUrl)
    }

    const userPrivileges: BasePrivileges = useMemo(() => {
        return [...(currentUser?.privileges ?? []), ...[{ code: 'inherit', name: 'Inherit (acts as you)' }]]
    }, [currentUser?.privileges])

    return (
        <ApiKeysPage
            data-testid='UserApiKeys'
            scope='user'
            basePath='/apikeys'
            onCreate={(note) => {
                void createAPIKey(note)
            }}
            availablePrivileges={userPrivileges}
            keys={keys}
        />
    )
}

export default UserApiKeys
