import type { FC } from 'react'

import { clsx } from 'clsx'

import type { AdminAccessLogsItemProps } from './AdminAccessLogsItem.types'

import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'

const AdminAccessLogsItem: FC<AdminAccessLogsItemProps> = ({ data }) => {
    return (
        <tr key={data.time.toLocaleString()} data-testid='AdminAccessLogsItem'>
            {'time' in data && <td className='text-center'>{data.time.toLocaleString()}</td>}
            {'key' in data && <td className='shortened text-center'>{data.key}</td>}
            {'type' in data && <td className='text-center'>{data.type}</td>}
            {'userid' in data && <td className='text-center'>{data.userid}</td>}
            {'authorized' in data && (
                <td className='text-center'>
                    <FontAwesomeIcon
                        className={clsx(['h-5 w-5', data.authorized ? 'text-green-500' : 'text-red-500'])}
                        icon={data.authorized ? 'check-circle' : 'close'}
                        size='2x'
                    />
                </td>
            )}
            {'from_ip' in data && <td className='text-center'>{data.from_ip}</td>}
        </tr>
    )
}
export default AdminAccessLogsItem
