import { useState, type FC } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import type { EmailTemplateItemProps } from './EmailTemplateItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import EmailService2 from '@/lib/providers/EmailService2'

const EmailTemplateItem: FC<EmailTemplateItemProps> = ({ fields, data }) => {
    const router = useRouter()
    const { mutate } = useTablePageContext()

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteHandler = async (): Promise<void> => {
        await toast.promise(
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
    }

    return (
        <>
            <TablePageRow data-testid='EmailTemplateItem' fields={8}>
                <ConditionalTableCell condition={fields.Name}>{data.name}</ConditionalTableCell>
                <ConditionalTableCell condition={fields.Code}>{data.code}</ConditionalTableCell>
                <ConditionalTableCell condition={fields.Subject}>{data.subject}</ConditionalTableCell>
                <ConditionalTableCell condition={fields.Help}>{data.help}</ConditionalTableCell>
                <ConditionalTableCell className='text-nowrap lg:text-wrap' condition={fields['Text Body']}>
                    {data.body}
                </ConditionalTableCell>
                <ConditionalTableCell className='text-nowrap lg:text-wrap' condition={fields['HTML Body']}>
                    {data.html}
                </ConditionalTableCell>
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
                            setShowDeleteModal(true)
                        }}
                    >
                        <FontAwesomeIcon icon='times' />
                    </Button>
                </TableActionsCell>
            </TablePageRow>
            <Conditional condition={showDeleteModal}>
                <OverlayCard
                    title='Delete email template?'
                    onClose={() => {
                        setShowDeleteModal(false)
                        return false
                    }}
                    actions={[
                        <Button
                            key='Delete!'
                            variant='danger'
                            onClick={() => {
                                void deleteHandler()
                            }}
                        >
                            Delete
                        </Button>
                    ]}
                >
                    Do you want to delete email template &apos;{data.name}&apos;?
                </OverlayCard>
            </Conditional>
        </>
    )
}

export default EmailTemplateItem
