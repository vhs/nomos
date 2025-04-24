import type { FC } from 'react'

import type { AdminStripeRecordsItemProps } from './AdminStripeRecordsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminStripeRecordsItem: FC<AdminStripeRecordsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminStripeRecordsItem'>
        <ConditionalTableCell condition={fields.Timestamp}>{data.ts.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Status}>{data.status.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Created}>{data.created.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields['Event Id']}>{data.event_id.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Type}>{data.type.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Object}>{data.object.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Request}>{data.request.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields['API Version']}>
            {data.api_version.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={fields.Raw}>{data.raw.toLocaleString()}</ConditionalTableCell>
    </TablePageRow>
)

export default AdminStripeRecordsItem
