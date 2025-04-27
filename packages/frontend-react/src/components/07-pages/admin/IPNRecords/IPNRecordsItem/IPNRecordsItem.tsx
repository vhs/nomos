import type { FC } from 'react'

import type { IPNRecordsItemProps } from './IPNRecordsItem.types'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

const IPNRecordsItem: FC<IPNRecordsItemProps> = ({ fields, data }) => (
    <TablePageRow data-testid='IPNRecordsItem'>
        <TableDataCell>{data.id}</TableDataCell>
        <TableDataCell condition={fields.Created}>{data.created.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Validated}>{data.validation.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Payment Status']}>{data.payment_status.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Payment Amount']}>{data.payment_amount.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Payment Currency']}>{data.payment_currency.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Payer Email']}>{data.payer_email.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Item Name']}>{data.item_name.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields['Item Number']}>{data.item_number.toLocaleString()}</TableDataCell>
        <TableDataCell condition={fields.Raw}>{data.raw.toLocaleString()}</TableDataCell>
    </TablePageRow>
)

export default IPNRecordsItem
