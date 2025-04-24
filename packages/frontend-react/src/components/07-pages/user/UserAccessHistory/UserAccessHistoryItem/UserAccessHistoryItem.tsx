import type { FC } from 'react'

import type { UserAccessHistoryItemProps } from './UserAccessHistoryItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const UserAccessHistoryItem: FC<UserAccessHistoryItemProps> = ({ fields, data }) => {
    return (
        <tr key={JSON.stringify(data)}>
            <ConditionalTableCell className='text-center' condition={fields.Time}>
                {data.time?.toLocaleString()}
            </ConditionalTableCell>
            <ConditionalTableCell className='shortened text-center' condition={fields.Key}>
                {data.key}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields.Type}>
                {data.type}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields['User ID']}>
                {data.userid}
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields.Authorized}>
                <FontAwesomeIcon className='h-5 w-5' icon={data.authorized ? 'check-circle' : 'close'} size='2x' />
            </ConditionalTableCell>
            <ConditionalTableCell className='text-center' condition={fields['From IP']}>
                {data.from_ip}
            </ConditionalTableCell>
        </tr>
    )
}

export default UserAccessHistoryItem
