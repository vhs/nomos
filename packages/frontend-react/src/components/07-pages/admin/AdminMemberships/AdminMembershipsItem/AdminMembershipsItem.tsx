import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { AdminMembershipsItemProps } from './AdminMembershipsItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminMembershipsItem: FC<AdminMembershipsItemProps> = ({ fields, data }) => {
    const router = useRouter()

    return (
        <TablePageRow data-testid='AdminMembershipsItem'>
            <ConditionalTableCell className='text-center' condition={fields.Title}>
                {data.title}
            </ConditionalTableCell>
            <ConditionalTableCell className='break-words text-center' condition={fields.Code}>
                {data.code}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields.Description}>
                {data.description}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields.Price}>
                {data.price}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields.Active}>
                {data.active ? 'Yes' : 'No'}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields.Private}>
                {data.private ? 'Yes' : 'No'}
            </ConditionalTableCell>
            <TableActionsCell>
                <Button
                    variant='link'
                    className='btn-icon m-auto w-full'
                    onClick={() => {
                        void router.navigate({ to: `/admin/memberships/${data.id}` })
                    }}
                >
                    <FontAwesomeIcon icon='edit' />
                </Button>
            </TableActionsCell>
        </TablePageRow>
    )
}

export default AdminMembershipsItem
