import type { FC } from 'react'

import type { AdminEventsItemProps } from './AdminEventsItem.types'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminEventsItem: FC<AdminEventsItemProps> = ({ data }) => (
    <tr data-testid='AdminEventsItem'>
        {Object.entries(data)
            .filter(([k, _v]) => k !== 'id')
            .map(([k, v]) => (
                <ConditionalTableCell condition={k in data} key={k}>
                    {v.toString()}
                </ConditionalTableCell>
            ))}
    </tr>
)

export default AdminEventsItem
