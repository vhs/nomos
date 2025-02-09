import type { FC } from 'react'

import type { AdminEventsItemProps } from './AdminEventsItem.types'

const AdminEventsItem: FC<AdminEventsItemProps> = ({ data }) => (
    <tr className='' data-testid='AdminEventsItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <td key={k}>{v.toString()}</td>
            ))}
    </tr>
)

export default AdminEventsItem
