import type { FC } from 'react'

import type { AdminIPNRecordsItemProps } from './AdminIPNRecordsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

const AdminIPNRecordsItem: FC<AdminIPNRecordsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='AdminIPNRecordsItem'>
        <td>{data.id}</td>
        <ConditionalTableCell condition={fields.Created}>{data.created.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields.Validated}>{data.validation.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields['Payment Status']}>
            {data.payment_status.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={fields['Payment Amount']}>
            {data.payment_amount.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={fields['Payment Currency']}>
            {data.payment_currency.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={fields['Payer Email']}>
            {data.payer_email.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={fields['Item Name']}>{data.item_name.toLocaleString()}</ConditionalTableCell>
        <ConditionalTableCell condition={fields['Item Number']}>
            {data.item_number.toLocaleString()}
        </ConditionalTableCell>
        <ConditionalTableCell condition={fields.Raw}>{data.raw.toLocaleString()}</ConditionalTableCell>
    </TablePageRow>
)

export default AdminIPNRecordsItem
