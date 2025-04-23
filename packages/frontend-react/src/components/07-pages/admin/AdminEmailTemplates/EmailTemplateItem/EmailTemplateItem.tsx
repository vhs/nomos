import { useState, type FC } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import type { EmailTemplateItemProps } from './EmailTemplateItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import EmailService2 from '@/lib/providers/EmailService2'

const EmailTemplateItem: FC<EmailTemplateItemProps> = ({ data }) => {
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
                <ConditionalTableCell condition={'name' in data}>{data.name}</ConditionalTableCell>
                <ConditionalTableCell condition={'code' in data}>{data.code}</ConditionalTableCell>
                <ConditionalTableCell condition={'subject' in data}>{data.subject}</ConditionalTableCell>
                <ConditionalTableCell condition={'help' in data}>{data.help}</ConditionalTableCell>
                <ConditionalTableCell className='text-nowrap lg:text-wrap' condition={'body' in data}>
                    {data.body}
                </ConditionalTableCell>
                <ConditionalTableCell className='text-nowrap lg:text-wrap' condition={'html' in data}>
                    {data.html}
                </ConditionalTableCell>
                <td>
                    <div className='grid w-full grid-flow-col justify-around gap-x-0.5'>
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
                    </div>
                </td>
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
