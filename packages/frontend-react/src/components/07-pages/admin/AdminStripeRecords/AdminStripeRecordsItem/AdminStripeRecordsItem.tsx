import type { FC } from 'react'

import type { AdminStripeRecordsItemProps } from './AdminStripeRecordsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const AdminStripeRecordsItem: FC<AdminStripeRecordsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminStripeRecordsItem'>
        <TableDataCell condition={fields.Timestamp}>{data.ts.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Status}>{data.status.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Created}>{data.created.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Event Id']}>{data.event_id.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Type}>{data.type.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Object}>{data.object.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Request}>{data.request.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['API Version']}>{data.api_version.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Raw}>{data.raw.toLocaleString()}</TableDataCell>
    </TablePageRow>
)

export default AdminStripeRecordsItem
