import type { FC } from 'react'

import { clsx } from 'clsx'

import type { AdminAccessLogsItemProps } from './AdminAccessLogsItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminAccessLogsItem: FC<AdminAccessLogsItemProps> = ({ fields, data }) => {
    return (
        <TablePageRow key={JSON.stringify(data)} data-testid='AdminAccessLogsItem'>
            <ConditionalTableCell condition={fields.Time} className='text-center'>
                {data.time.toLocaleString()}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields.Key} className='shortened text-center'>
                {data.key}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields.Type} className='text-center'>
                {data.type}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields['User ID']} className='text-center'>
                {data.userid}
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields.Authorized} className='text-center'>
                <FontAwesomeIcon
                    className={clsx(['h-5 w-5', data.authorized ? 'text-green-500' : 'text-red-500'])}
                    icon={data.authorized ? 'check-circle' : 'close'}
                    size='2x'
                />
            </ConditionalTableCell>
            <ConditionalTableCell condition={fields['From IP']} className='text-center'>
                {data.from_ip}
            </ConditionalTableCell>
        </TablePageRow>
    )
}
export default AdminAccessLogsItem
