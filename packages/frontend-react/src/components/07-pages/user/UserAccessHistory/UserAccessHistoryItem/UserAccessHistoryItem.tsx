import type { FC } from 'react'

import type { UserAccessHistoryItemProps } from './UserAccessHistoryItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'

const UserAccessHistoryItem: FC<UserAccessHistoryItemProps> = ({ data }) => {
    return (
        <tr key={data.time.toLocaleString()}>
            {'time' in data && <td className='text-center'>{data.time.toLocaleString()}</td>}
            {'key' in data && <td className='shortened text-center'>{data.key}</td>}
            {'type' in data && <td className='text-center'>{data.type}</td>}
            {'userid' in data && <td className='text-center'>{data.userid}</td>}
            {'authorized' in data && (
                <td className='text-center'>
                    <FontAwesomeIcon className='h-5 w-5' icon={data.authorized ? 'check-circle' : 'close'} size='2x' />
                </td>
            )}
            {'from_ip' in data && <td className='text-center'>{data.from_ip}</td>}
        </tr>
    )
}

export default UserAccessHistoryItem
