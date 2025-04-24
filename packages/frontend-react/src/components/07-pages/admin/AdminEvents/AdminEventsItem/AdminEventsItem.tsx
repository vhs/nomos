import type { FC } from 'react'

import type { AdminEventsItemProps } from './AdminEventsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminEventsItem: FC<AdminEventsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminEventsItem'>
        <ConditionalTableCell condition={fields.Name}>{data.name.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Domain}>{data.domain.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Event}>{data.event.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Description}>{data.description.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Enabled}>{data.enabled ? 'Yes' : 'No'}</ConditionalTableCell>
        {/* <ConditionalTableCell condition={fields['Privileges']}>
            {data.privileges.toLocaleString()}
        </ConditionalTableCell> */}
    </TablePageRow>
)

export default AdminEventsItem
