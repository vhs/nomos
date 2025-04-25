import { type FC, useState } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import type { AdminSystemPreferencesItemProps } from './AdminSystemPreferencesItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import PreferenceService2 from '@/lib/providers/PreferenceService2'

const AdminSystemPreferencesItem: FC<AdminSystemPreferencesItemProps> = ({ fields, data }) => {
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
        <>
            <TablePageRow data-testid='AdminSystemPreferencesItem'>
                <TableDataCell key={'key'} condition={fields.Key}>
                    {String(data.key)}
                </TableDataCell>
                <TableDataCell key={'value'} condition={fields.Value}>
                    {String(data.value)}
                </TableDataCell>
                <TableDataCell key={'enabled'} condition={fields.Enabled}>
                    {String(data.enabled ? 'Yes' : 'No')}
                </TableDataCell>
                <TableDataCell key={'notes'} condition={fields.Notes}>
                    {String(data.notes)}
                </TableDataCell>
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
                </TableActionsCell>
            </TablePageRow>
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
        </>
    )
}

export default AdminSystemPreferencesItem
