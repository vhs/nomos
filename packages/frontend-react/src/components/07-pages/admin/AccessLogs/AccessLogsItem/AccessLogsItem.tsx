import type { FC } from 'react'

import { clsx } from 'clsx'

import type { AccessLogsItemProps } from './AccessLogsItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const AccessLogsItem: FC<AccessLogsItemProps> = ({ fields, data }) => {
    return (
        <TablePageRow key={JSON.stringify(data)} data-testid='AccessLogsItem'>
            <TableDataCell condition={fields.Time} className='text-center'>
                {data.time.toLocaleString()}
            </TableDataCell>
            <TableDataCell condition={fields.Key} className='shortened text-center'>
                {data.key}
            </TableDataCell>
            <TableDataCell condition={fields.Type} className='text-center'>
                {data.type}
            </TableDataCell>
            <TableDataCell condition={fields['User ID']} className='text-center'>
                {data.userid}
            </TableDataCell>
            <TableDataCell condition={fields.Authorized} className='text-center'>
                <FontAwesomeIcon
                    className={clsx(['h-5 w-5', data.authorized ? 'text-green-500' : 'text-red-500'])}
                    icon={data.authorized ? 'check-circle' : 'close'}
                    size='2x'
                />
            </TableDataCell>
            <TableDataCell condition={fields['From IP']} className='text-center'>
                {data.from_ip}
            </TableDataCell>
        </TablePageRow>
    )
}
export default AccessLogsItem
