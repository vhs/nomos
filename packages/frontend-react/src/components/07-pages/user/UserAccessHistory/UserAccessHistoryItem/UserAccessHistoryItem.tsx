import type { FC } from 'react'

import type { UserAccessHistoryItemProps } from './UserAccessHistoryItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const UserAccessHistoryItem: FC<UserAccessHistoryItemProps> = ({ data }) => {
    return (
        <tr key={data.time.toLocaleString()}>
            <ConditionalTableCell className='text-center' condition={'time' in data}>
                {data.time.toLocaleString()}
            </ConditionalTableCell>
            <ConditionalTableCell className='shortened text-center' condition={'key' in data}>
                {data.key}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'type' in data}>
                {data.type}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'userid' in data}>
                {data.userid}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'authorized' in data}>
                <FontAwesomeIcon className='h-5 w-5' icon={data.authorized ? 'check-circle' : 'close'} size='2x' />
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={'from_ip' in data}>
                {data.from_ip}
            </ConditionalTableCell>
        </tr>
    )
}

export default UserAccessHistoryItem
