import type { FC } from 'react'

import type { AdminIPNRecordsItemProps } from './AdminIPNRecordsItem.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminIPNRecordsItem: FC<AdminIPNRecordsItemProps> = ({ data }) => (
    <tr data-testid='AdminIPNRecordsItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <ConditionalTableCell condition={k in data} key={k}>
                    {v.toString()}
                </ConditionalTableCell>
            ))}
    </tr>
)

export default AdminIPNRecordsItem
