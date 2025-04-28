import type { FC } from 'react'

import type { AccessHistoryItemProps } from './AccessHistoryItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import EnabledCheckMark from '@/components/02-molecules/EnabledCheckMark/EnabledCheckMark'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const AccessHistoryItem: FC<AccessHistoryItemProps> = ({ fields, data }) => {
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
                <EnabledCheckMark checked={data.authorized} negativeIcon='close' negativeHighlight />
            </TableDataCell>
            <TableDataCell className='text-center' condition={fields['From IP']}>
                {data.from_ip}
            </TableDataCell>
        </TablePageRow>
    )
}

export default AccessHistoryItem
