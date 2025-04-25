import type { FC } from 'react'

import type { UserAccessHistoryItemProps } from './UserAccessHistoryItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const UserAccessHistoryItem: FC<UserAccessHistoryItemProps> = ({ fields, data }) => {
    return (
        <TablePageRow key={JSON.stringify(data)}>
            <TableDataCell className='text-center' condition={fields.Time}>
                {data.time?.toLocaleString()}
            </TableDataCell>
            <TableDataCell className='shortened text-center' condition={fields.Key}>
                {data.key}
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields.Type}>
                {data.type}
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields['User ID']}>
                {data.userid}
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields.Authorized}>
                <FontAwesomeIcon className='h-5 w-5' icon={data.authorized ? 'check-circle' : 'close'} size='2x' />
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields['From IP']}>
                {data.from_ip}
            </TableDataCell>
        </TablePageRow>
    )
}

export default UserAccessHistoryItem
