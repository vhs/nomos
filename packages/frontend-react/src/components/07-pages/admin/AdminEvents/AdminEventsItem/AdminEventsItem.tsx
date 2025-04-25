import type { FC } from 'react'

import type { AdminEventsItemProps } from './AdminEventsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const AdminEventsItem: FC<AdminEventsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminEventsItem'>
        <TableDataCell condition={fields.Name}>{data.name.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Domain}>{data.domain.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Event}>{data.event.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Description}>{data.description.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Enabled}>{data.enabled ? 'Yes' : 'No'}</TableDataCell>
        {/* <TableDataCell condition={fields['Privileges']}>
            {data.privileges.toLocaleString()}
        </TableDataCell> */}
    </TablePageRow>
)

export default AdminEventsItem
