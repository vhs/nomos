import type { FC } from 'react'

import type { AdminIPNRecordsItemProps } from './AdminIPNRecordsItem.types'

const AdminIPNRecordsItem: FC<AdminIPNRecordsItemProps> = ({ data }) => (
    <tr className='' data-testid='AdminIPNRecordsItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <td key={k}>{v.toString()}</td>
            ))}
    </tr>
)

export default AdminIPNRecordsItem
