import { useMemo, type FC } from 'react'

import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { AdminApiKeysProps } from './AdminApiKeys.types'

import ApiKeysPage from '@/components/05-materials/ApiKeysPage/ApiKeysPage'

import { useGetSystemApiKeys } from '@/lib/hooks/providers/ApiKeyService2/useGetSystemApiKeys'
import { useGetAllPrivileges } from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import type { BasePrivileges } from '@/types/records'

const AdminApiKeys: FC<AdminApiKeysProps> = () => {
    const { data: systemApiKeys } = useGetSystemApiKeys()

    const { data: systemPrivileges } = useGetAllPrivileges()

    const availablePrivileges: BasePrivileges = useMemo(() => {
        return [...new Set([...(systemPrivileges ?? []), ...[{ code: 'inherit', name: 'Inherit (acts as you)' }]])]
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
    }, [systemPrivileges])

    const createAPIKey = async (note: string): Promise<void> => {
        await toast.promise(ApiKeyService2.getInstance().GenerateSystemApiKey(note), {
            error: 'Failed to create a new API key. Please contact your administrator!',
            pending: 'Creating new API key',
            success: 'Created new API key'
        })

        await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
    }

    return (
        <ApiKeysPage
            data-testid='AdminApiKeys'
            scope='system'
            basePath='/admin/systemkeys'
            onCreate={(note) => {
                void createAPIKey(note)
            }}
            availablePrivileges={availablePrivileges}
            keys={systemApiKeys}
        />
    )
}

export default AdminApiKeys
