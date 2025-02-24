import type { FC } from 'react'

import { clsx } from 'clsx'

import type { AdminAccessLogsItemProps } from './AdminAccessLogsItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminAccessLogsItem: FC<AdminAccessLogsItemProps> = ({ data }) => {
    return (
        <tr key={JSON.stringify(data)} data-testid='AdminAccessLogsItem'>
            <ConditionalTableCell condition={'time' in data} className='text-center'>
                {data.time.toLocaleString()}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'key' in data} className='shortened text-center'>
                {data.key}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'type' in data} className='text-center'>
                {data.type}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'userid' in data} className='text-center'>
                {data.userid}
            </ConditionalTableCell>
            <ConditionalTableCell condition={'authorized' in data} className='text-center'>
                <FontAwesomeIcon
                    className={clsx(['h-5 w-5', data.authorized ? 'text-green-500' : 'text-red-500'])}
                    icon={data.authorized ? 'check-circle' : 'close'}
                    size='2x'
                />
            </ConditionalTableCell>
            <ConditionalTableCell condition={'from_ip' in data} className='text-center'>
                {data.from_ip}
            </ConditionalTableCell>
        </tr>
    )
}
export default AdminAccessLogsItem
