import { type FC, useState } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import type { SystemPreferencesItemProps } from './SystemPreferencesItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import EnabledCheckMark from '@/components/02-molecules/EnabledCheckMark/EnabledCheckMark'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'
import ItemDeleteModal from '@/components/03-particles/ItemDeleteModal/ItemDeleteModal'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import PreferenceService2 from '@/lib/providers/PreferenceService2'

const SystemPreferencesItem: FC<SystemPreferencesItemProps> = ({ fields, data }) => {
    const router = useRouter()

    const { mutate } = useTablePageContext()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    const openDeleteModal = (): void => {
        setShowDeleteModal(true)
    }

    const deleteHandler = async (): Promise<void> => {
        await toast
            .promise(
                async (): Promise<void> => {
                    await PreferenceService2.getInstance().DeleteSystemPreference(data.key.toString())

                    await mutate()
                },
                {
                    error: 'Failed to delete this API key. Please contact your administrators',
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
            <TablePageRow data-testid='SystemPreferencesItem'>
                <TableDataCell key={'key'} condition={fields.Key}>
                    {String(data.key)}
                </TableDataCell>
                <TableDataCell key={'value'} condition={fields.Value}>
                    {String(data.value)}
                </TableDataCell>
                <TableDataCell key={'enabled'} condition={fields.Enabled}>
                    <EnabledCheckMark checked={data.enabled} />
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

            <ItemDeleteModal
                show={showDeleteModal}
                actionHandler={() => {
                    void deleteHandler()
                }}
                closeHandler={() => {
                    closeDeleteModal()
                    return false
                }}
            >
                Are you sure you want to delete this System Preference?
            </ItemDeleteModal>
        </>
    )
}

export default SystemPreferencesItem
