import { useState, type FC } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import type { EmailTemplateItemProps } from './EmailTemplateItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'
import ItemDeleteModal from '@/components/03-particles/ItemDeleteModal/ItemDeleteModal'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import EmailService2 from '@/lib/providers/EmailService2'

const EmailTemplateItem: FC<EmailTemplateItemProps> = ({ fields, data }) => {
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
                    await EmailService2.getInstance().DeleteTemplate(data.id)

                    await mutate()
                },
                {
                    error: 'Failed to delete email template',
                    pending: 'Deleting email template',
                    success: 'Deleted email template'
                }
            )
            .then(() => {
                closeDeleteModal()
            })
    }

    return (
        <>
            <TablePageRow data-testid='EmailTemplateItem' fields={8}>
                <TableDataCell condition={fields.Name}>{data.name}</TableDataCell>
                <TableDataCell condition={fields.Code}>{data.code}</TableDataCell>
                <TableDataCell condition={fields.Subject}>{data.subject}</TableDataCell>
                <TableDataCell condition={fields.Help}>{data.help}</TableDataCell>
                <TableDataCell className='text-nowrap lg:text-wrap' condition={fields['Text Body']}>
                    {data.body}
                </TableDataCell>
                <TableDataCell className='text-nowrap lg:text-wrap' condition={fields['HTML Body']}>
                    {data.html}
                </TableDataCell>
                <TableActionsCell>
                    <Button
                        className='btn-circle'
                        onClick={() => {
                            void router.navigate({ to: `/admin/emailtemplates/${data.id}` }) // NOSONAR
                        }}
                    >
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                    <Button
                        className='btn-circle'
                        variant='danger'
                        onClick={() => {
                            openDeleteModal()
                        }}
                    >
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
                title='Delete email template?'
            >
                Do you want to delete email template &apos;{data.name}&apos;?
            </ItemDeleteModal>
        </>
    )
}

export default EmailTemplateItem
