import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'

import type { MembershipsItemProps } from './MembershipsItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import EnabledCheckMark from '@/components/02-molecules/EnabledCheckMark/EnabledCheckMark'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const MembershipsItem: FC<MembershipsItemProps> = ({ fields, data }) => {
    const router = useRouter()

    return (
        <TablePageRow data-testid='MembershipsItem'>
            <TableDataCell className='text-center' condition={fields.Title}>
                {data.title}
            </TableDataCell>
            <TableDataCell className='break-words text-center' condition={fields.Code}>
                {data.code}
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields.Description}>
                {data.description}
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields.Price}>
                {data.price}
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields.Active}>
                <EnabledCheckMark checked={data.active} />
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields.Private}>
                <EnabledCheckMark checked={data.private} />
            </TableDataCell>
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

export default MembershipsItem
