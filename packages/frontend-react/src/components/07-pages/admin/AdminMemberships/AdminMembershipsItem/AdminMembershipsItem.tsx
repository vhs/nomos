import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { AdminMembershipsItemProps } from './AdminMembershipsItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminMembershipsItem: FC<AdminMembershipsItemProps> = ({ data }) => {
    const router = useRouter()

    return (
        <TablePageRow data-testid='AdminMembershipsItem'>
            <ConditionalTableCell className='text-center' condition={'title' in data}>
                {data.title}
            </ConditionalTableCell>
            <ConditionalTableCell className='break-words text-center' condition={'code' in data}>
                {data.code}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'description' in data}>
                {data.description}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'price' in data}>
                {data.price}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'active' in data}>
                {data.active ? 'Yes' : 'No'}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'private' in data}>
                {data.private ? 'Yes' : 'No'}
            </ConditionalTableCell>
            <td>
                <div className='grid w-full grid-flow-row justify-around'>
                    <Button
                        variant='link'
                        className='btn-icon m-auto w-full'
                        onClick={() => {
                            void router.navigate({ to: `/admin/memberships/${data.id}` })
                        }}
                    >
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                </div>
            </td>
        </TablePageRow>
    )
}

export default AdminMembershipsItem
