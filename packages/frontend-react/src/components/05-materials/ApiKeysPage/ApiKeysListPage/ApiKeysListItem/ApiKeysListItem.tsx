import { useState, type FC } from 'react'

import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { ApiKeysListItemProps } from './ApiKeysListItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Popover from '@/components/01-atoms/Popover/Popover'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import useAuth from '@/lib/hooks/useAuth'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import type { ValidRoutePath } from '@/types/routing'

import { useApiKeysPageContext } from '../../ApiKeysPage.context'
import { getApiKeysTermByScope } from '../../ApiKeysPage.utils'

import styles from './ApiKeysListItem.module.css'

const ApiKeysListItem: FC<ApiKeysListItemProps> = ({ apiKey }) => {
    const { currentUser } = useAuth()
    const { basePath, scope } = useApiKeysPageContext()
    const router = useRouter()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    const openDeleteModal = (): void => {
        setShowDeleteModal(true)
    }

    const openEditModal = (): void => {
        const to = `${basePath}/$keyId` as ValidRoutePath

        void router.navigate({ to, params: { keyId: apiKey.id.toString() } })
    }

    const deleteAPIKey = async (): Promise<void> => {
        await toast.promise(ApiKeyService2.getInstance().DeleteApiKey(apiKey.id), {
            error: getApiKeysTermByScope('deleteApiKeysError', scope),
            pending: getApiKeysTermByScope('deleteApiKeysPending', scope),
            success: getApiKeysTermByScope('deleteApiKeysSuccess', scope)
        })

        scope === 'system'
            ? await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
            : await mutate(`/services/v2/ApiKeyService2.svc/GetUserAPIKeys?userid=${currentUser?.id}`)

        scope === 'system'
            ? await mutate('/services/v2/VirtualService1.svc/GetScopedKeys?scope=system')
            : await mutate(`/services/v2/VirtualService1.svc/GetScopedKeys?scope=user&id=${currentUser?.id}`)

        closeDeleteModal()
    }

    return (
        <>
            <tr className='data-row'>
                <ConditionalTableCell
                    condition={'key' in apiKey}
                    className={clsx([styles.DataField])}
                    onClick={openEditModal}
                    onKeyUp={openEditModal}
                >
                    <Popover content={apiKey.key} popover={apiKey.key} />
                </ConditionalTableCell>
                <ConditionalTableCell className={styles.DataField} condition={'notes' in apiKey}>
                    {apiKey.notes}
                </ConditionalTableCell>
                <ConditionalTableCell className={styles.DataField} condition={'created' in apiKey}>
                    {apiKey.created?.toLocaleString()}
                </ConditionalTableCell>
                <ConditionalTableCell className={styles.DataField} condition={'expires' in apiKey}>
                    {apiKey.expires?.toLocaleString()}
                </ConditionalTableCell>
                <td className={styles.DataField}>
                    <Button variant='primary' className='btn-circle h-10 w-10 text-white' onClick={openEditModal}>
                        <PencilSquareIcon className='h-4 w-4' />
                    </Button>
                    <Button variant='danger' className='btn-circle mx-auto' onClick={openDeleteModal}>
                        <XMarkIcon className='h-4 w-4 font-bold' />
                    </Button>
                    <OverlayCard
                        show={showDeleteModal}
                        title='Confirm Delete'
                        actions={[
                            <Button
                                key='Delete'
                                variant='primary'
                                onClick={() => {
                                    void deleteAPIKey()
                                }}
                            >
                                Delete
                            </Button>
                        ]}
                        onClose={() => {
                            closeDeleteModal()
                            return false
                        }}
                    >
                        Are you sure you want to delete this API Key?
                    </OverlayCard>
                </td>
            </tr>
        </>
    )
}

export default ApiKeysListItem
