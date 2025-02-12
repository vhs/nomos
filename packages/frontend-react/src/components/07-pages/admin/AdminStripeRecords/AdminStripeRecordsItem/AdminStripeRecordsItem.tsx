import type { FC } from 'react'

import type { AdminStripeRecordsItemProps } from './AdminStripeRecordsItem.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminStripeRecordsItem: FC<AdminStripeRecordsItemProps> = ({ data }) => (
    <tr data-testid='AdminStripeRecordsItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <ConditionalTableCell condition={k in data} key={k}>
                    {v.toString()}
                </ConditionalTableCell>
            ))}
    </tr>
)

export default AdminStripeRecordsItem
