import type { FC } from 'react'

import type { AdminStripeRecordsItemProps } from './AdminStripeRecordsItem.types'

const AdminStripeRecordsItem: FC<AdminStripeRecordsItemProps> = ({ data }) => (
    <tr className='' data-testid='AdminStripeRecordsItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <td key={k}>{v.toString()}</td>
            ))}
    </tr>
)

export default AdminStripeRecordsItem
