import { type FC, useState } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import type { AdminSystemPreferencesItemProps } from './AdminSystemPreferencesItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import PreferenceService2 from '@/lib/providers/PreferenceService2'

const AdminSystemPreferencesItem: FC<AdminSystemPreferencesItemProps> = ({ data }) => {
    const router = useRouter()

    const { mutate } = useTablePageContext()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    const openDeleteModal = (): void => {
        setShowDeleteModal(true)
    }

    const deleteSystemPreference = async (): Promise<void> => {
        await toast
            .promise(
                async (): Promise<void> => {
                    await PreferenceService2.getInstance().DeleteSystemPreference(data.key.toString())

                    await mutate()
                },
                {
                    error: 'Failed to update this API key. Please contact your administrators',
                    pending: 'Deleting API key',
                    success: 'Deleted API key'
                }
            )
            .then(() => {
                closeDeleteModal()
            })
    }

    return (
        <tr data-testid='AdminSystemPreferencesItem'>
            <ConditionalTableCell key={'key'} condition={'key' in data}>
                {String(data.key)}
            </ConditionalTableCell>
            <ConditionalTableCell key={'value'} condition={'value' in data}>
                {String(data.value)}
            </ConditionalTableCell>
            <ConditionalTableCell key={'enabled'} condition={'enabled' in data}>
                {String(data.enabled ? 'Yes' : 'No')}
            </ConditionalTableCell>
            <ConditionalTableCell key={'notes'} condition={'notes' in data}>
                {String(data.notes)}
            </ConditionalTableCell>
            <TableActionsCell>
                <Button
                    className='btn-circle'
                    onClick={() => {
                        void router.navigate({ to: `/admin/systempreferences/${data.id}` })
                    }}
                >
                    <FontAwesomeIcon icon='edit' />
                </Button>
                <Button variant='danger' className='btn-circle' onClick={openDeleteModal}>
                    <FontAwesomeIcon icon='times' />
                </Button>
                <Conditional condition={showDeleteModal}>
                    <OverlayCard
                        title='Confirm Delete'
                        actions={[
                            <Button
                                key='Delete'
                                variant='primary'
                                onClick={() => {
                                    void deleteSystemPreference()
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
                        Are you sure you want to delete this System Preference?
                    </OverlayCard>
                </Conditional>
            </TableActionsCell>
        </tr>
    )
}

export default AdminSystemPreferencesItem
